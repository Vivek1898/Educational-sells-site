import axios from "axios";
import InstructorRoute from "../../components/routes/InstructorRoute";
import { useState,useEffect } from "react";
import { Avatar } from "antd";
import Link from "next/link";
import { CheckCircleOutlined ,CloseCircleOutlined} from "@ant-design/icons";

const InstructorIndex = () => {
  const[courses,setCourses]=useState([]);

  useEffect(()=>{
    loadCourses();
  }
  ,[]);

  const loadCourses=async()=>{
    const {data}=await axios.get("/api/instructor-course");
    setCourses(data);
  }


   
  return (
    <InstructorRoute>
     
      <h1 className="jumbotron text-center square">Instructor Index</h1>
        {/* <pre>{JSON.stringify(courses,null,4)}</pre> */}
   <>
   {courses && courses.map((course)=>( 
          <div className="media pt-2" key={course._id}>
            <Avatar size={80}
             src={course.image && course.image.Location} />
            <div className="media-body pl-2">
              <div className="row">

                <div className="col">
                  <Link href={`/instructor/course/view/${course.slug}`} className="pointer">
                    <a> <h5 className="mt-2 text-primary">{course.name}</h5></a>
                  </Link>
              
                  <p style={{ marginTop: "-10px" }}>
                    {course.lessons && course.lessons.length} Lessons
                  </p>

                  {course.lessons && course.lessons.length < 5 ? (
                    <p className="text-warning">
                      At least 5 lessons are required to publish a course
                      </p>
                      ) : course.published ? (     
                         <p className="text-info">Your Course is Live in marketPlace</p>): (
                        <p className="text-success">Ready to publish</p>
                      )}

                </div>

                <div className="col-md-3 text-center">
                 {course.published ? ( 
                  <CheckCircleOutlined className="h5 pointer text-success" />
                  ) : (
                    <CloseCircleOutlined className="h5 pointer text-warning" />
                  )}

                </div>

              </div>
            </div>
          </div>
        ))}
   </>
       
    </InstructorRoute>
  );
};

export default InstructorIndex;
