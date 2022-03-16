import { Select, Button, Avatar, Image,Badge } from "antd";
import { SaveOutlined } from "@ant-design/icons";
const { Option } = Select;

const CourseCreateForm = ({
  handleSubmit,
  handleImage,
  handleChange,
  values,
  setValues,
  preview,
  visible,
  setVisible,
  uploadButtonText,
  handleImageRemove
}) => {
  const children = [];
  for (let i = 99; i <= 2000; i+=100) {
    children.push(<Option key={i.toFixed(2)}>₹{i.toFixed(2)}</Option>);
  }
  return(
    <form  onSubmit={handleSubmit}>
  <div className="form-group">

    <input type="text" 
    name="name" 
    className="form-control"
    placeholder="Name"
    value={values.name}
    onChange={handleChange}/>
    
  </div>

  <div className="form-group">
     <textarea
       name="description"
       cols="7"
       rows="7"
       value={values.description}
       className="form-control"
       onChange={handleChange}
     ></textarea>
   </div>

   <div className="form-row">
     <div className="col">
       <div className="form-group p-2">
         <Select
            style={{ display: 'inline-block', width: '80%' }}
           size="large"
           value={values.paid}
           // paid --> T to F 
           onChange={(v) => setValues({ ...values, paid: !values.paid })}
         >
           <Option value={true}>Paid</Option>
           <Option value={false}>Free</Option>
         </Select>


         {values.paid && (
      
      <div className="form-group pt-2"  style={{ display: 'inline-block', width: '10%' }}>
        <Select
      
          defaultValue="₹ 99.00"

          onChange={(v) => setValues({ ...values, price: v })}
          tokenSeparators={[,]}
          size="large"
        >
          {children}
        </Select>
      </div>
      
    )}
       </div>
       <div className="form-group">

<input type="text" 
name="category" 
className="form-control"
placeholder="Category"
value={values.category}
onChange={handleChange}/>

</div>

     
    
     </div>

   
     
        
   </div>


   <div className="form-row p-2">
     <div className="col ">
       <div className="form-group">
         <label className="btn btn-outline-secondary btn-block text-left" style={{ display: 'inline-block', width: '40%' }}>
           {uploadButtonText}
           <input
             type="file"
             name="image"
             onChange={handleImage}
             accept="image/*"
             hidden
           />
         </label>

         {preview && 
   <div className="col-md-6 p-2" style={{ display: 'inline-block' }}>
 
  <Button type="primary" onClick={() => setVisible(true)}   >
        show image preview
      </Button>
      <Badge count="X" onClick={handleImageRemove} className="pointer">
      <Avatar src={preview}/>
      </Badge>
  <Image
        width={200}
        style={{ display: 'none' }}
        src={preview}
        preview={{
          visible,
          src: preview,
          onVisibleChange: value => {
            setVisible(value);
          },
        }}
        
      />
     
   </div>
   
   }
       </div>
     </div>
  

   </div>


   <div className="row">
     <div className="col pt-2">
       <Button
         onClick={handleSubmit}
         disabled={values.loading || values.uploading}
         className="btn btn-primary "
         loading={values.loading}
         
         icon={<SaveOutlined/>}
       >
         {values.loading ? "Saving..." : "Save & Continue"}
       </Button>
     </div>
   </div>


 </form>
  );
}
  


export default CourseCreateForm;
