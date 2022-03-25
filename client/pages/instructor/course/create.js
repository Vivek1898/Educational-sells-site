import axios from "axios";
import { useState } from "react";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import { Select, Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import CourseCreateForm from "../../../components/forms/CourseCreateForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";


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
  const router=useRouter();

  //IMAGE NAME AND VISIBLITY
  const [image,setImage]=useState({});
  const [preview,setPreview]=useState('');
  const [visible, setVisible] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState('Upload Image');
  //State Change
  const handleChange = e =>{
    console.log(e.target.value)
    setValues({...values,[e.target.name] : e.target.value})
  };
  
  const handleImage = (e) => {
  let file=e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);
    setValues({...values,loading:true});
//It returns callback func with image data that we compressed
    Resizer.imageFileResizer(file,720,500,"JPEG",100,0, async (uri)=>{
      try {
        let {data}=await axios.post("/api/course/upload-image",{
          image:uri,
        });

        console.log("IMAGE DATA",data);
        setImage(data);
        setValues({...values,loading:false});
        
      } catch (err) {
        console.log(err);
        setValues({...values,loading:false});
        toast("Image Upload Falied Try Again  !!")
      }
    })


  };

  const handleImageRemove = async () =>{
    console.log("REMOVE IMAGE");
    try {
      setValues({...values,loading:true});
      const res=  await axios.post('/api/course/remove-image',{image})
      setImage({});
      setPreview('')
      setUploadButtonText('Upload Image')
      setValues({...values,loading:false});
      
    } catch (error) {
      console.log(error);
      setValues({...values,loading:false});
          toast("Image Upload Falied Try Again  !!")
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);
   try {
     
    const {data} = await axios.post('/api/course',{
      ...values,image
    });

    toast("Now you Can Start Adding Lesson");
    router.push("/instructor");

   } catch (error) {
     toast(err.response.data);
     console.log(error);
   }
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
        uploadButtonText={uploadButtonText}
        handleImageRemove={handleImageRemove}
        />
        
        </div>
      <pre>{JSON.stringify(values,null,4)}</pre>
<hr/>
<pre>{JSON.stringify(image,null,4)}</pre>

    </InstructorRoute>
  );
};

export default CourseCreate;
