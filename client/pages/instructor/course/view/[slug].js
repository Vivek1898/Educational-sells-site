import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import axios from "axios";

// sending slug to backend
// Path: client\pages\instructor\course\view\[slug].js
// finding course by slug
// Path: server\controllers\course.js
// getting refrence to instructor

const CourseView = () => {
    const router=useRouter();
    const {slug}=router.query;
    const [course,setCourse]=useState({});
    const [loading,setLoading]=useState(false);
    const [instructor,setInstructor]=useState({});
    
    useEffect(()=>{
        loadCourse();
    },[slug]);
    
    const loadCourse=async()=>{
        try {
        let {data}=await axios.get(`/api/course/${slug}`);
        console.log("SINGLE COURSE",data);
        setCourse(data);
        setInstructor(data.instructor);
        } catch (err) {
        console.log(err);
        }
    }
    
    return (
        <InstructorRoute>
        <h1 className="jumbotron text-center square">Course View</h1>
        {/* <pre>{JSON.stringify(course,null,4)}</pre>
        <pre>{JSON.stringify(instructor,null,4)}</pre> */}

        <div className="container-fluid">
        <div className="row">
        <div className="col-md-10">
        <div className="d-flex justify-content-between">
        <h2>{course.name}</h2>
        <h2>{course.lessons && course.lessons.length} Lessons</h2>
        </div>
        <hr />
        <p>{course.description}</p>
        <p>{course.category}</p>
        <p>{course.lessons && course.lessons.length} Lessons</p>
        <p>Published: {course.published ? "Yes" : "No"}</p>
        <p>Price: ${course.price}</p>
        <p>Instructor: {instructor.name}</p>
        </div>
        <div className="col-md-2">
        <img src={course.image && course.image.Location} className="img img-fluid" style={{height:"auto",width:"100%"}} />
        </div>
        </div>
        </div>

        

        </InstructorRoute>
    );
    }

export default CourseView;
