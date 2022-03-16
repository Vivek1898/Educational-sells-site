import axios from "axios";
import { useState } from "react";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import { Select, Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import CourseCreateForm from "../../../components/forms/CourseCreateForm";


const { Option } = Select;


const CourseCreate = () => {
  const [values,setValues]=useState({
    name:'',
    description:'',
    price:'9.99',
    uploading: false,
    paid:true,
    category:'',
    loading:false,
   
  });
  const [preview,setPreview]=useState('');
  const [visible, setVisible] = useState(false);
  //State Change
  const handleChange = e =>{
    console.log(e.target.value)
    setValues({...values,[e.target.name] : e.target.value})
  };
  
  const handleImage = (e) => {
    setPreview(window.URL.createObjectURL(e.target.files[0]));

  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    
  }
  
 
  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square">Create Course</h1>
      <div className="pt-3 pb-3"> 

      <CourseCreateForm 
        handleSubmit={handleSubmit}
        handleImage={handleImage}
        handleChange={handleChange}
        values={values}
        setValues={setValues}
        preview={preview}
        visible={visible}
        setVisible={setVisible}
        />
        
        </div>
      <pre>{JSON.stringify(values,null,4)}</pre>


    </InstructorRoute>
  );
};

export default CourseCreate;
