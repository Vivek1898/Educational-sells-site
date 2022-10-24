import AWS from "aws-sdk"
import { nanoid } from "nanoid";
import Course from "../models/course";
import slugify from "slugify";
const awsConfig={
    accessKeyId: process.env.AWS_ACESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECTRET_ACESS_KEY,
    region: process.env.AWS_REGION,
    apiVersion: process.env.AWS_API_VERSION
  }

const S3=new AWS.S3(awsConfig);

export const uploadImage = async (req,res) => {
    //console.log(req.body);
    try {
    const {image}=req.body;
    if(!image) return res.status(400).send("No Image");

    //Formatting Binary Image using buffer
      // prepare the image
      const base64Data = new Buffer.from(
        image.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
  
      //Getting JPEG extension
      const type = image.split(";")[0].split("/")[1];
  
      // image params
      const params = {
        Bucket: "lms-vivek-image-bucket",
        Key: `${nanoid()}.${type}`,
        Body: base64Data,
        ACL: "public-read",
        ContentEncoding: "base64",
        ContentType: `image/${type}`,
      };
  
      // upload to s3
      S3.upload(params, (err, data) => {
        if (err) {
          console.log(err);
          return res.sendStatus(400);
        }
        console.log(data);
        res.send(data);
      });
        
    } catch (error) {
        console.log(error);
    }
};

export const removeImage =async (req,res) => {
    try {
        const {image}=req.body;
         const params = {
        Bucket: "lms-vivek-image-bucket",
        Key: image.Key,
       
      };

      //Send Remove request
      S3.deleteObject(params,(err,data) => {
          if(err){
              console.log(err);
              res.sendStatus(400);
          }
          res.send({ok:true});
      })

    } catch (error) {
        console.log(error);
    }
};

// slug is the unique identifier for the course
// we will use slug to create the course
// any empty space in the title will be replaced by -
export const create = async (req,res) =>{
  //  console.log("Create Course ",req.body)
  //  return;
  try{
    const alreadyExist = await Course.findOne({
      slug:slugify(req.body.name.toLowerCase()),
    }).exec();

    if(alreadyExist){
      return res.status(400).send("Course Title already exist");
    }
   // const {name,description,price,category,uploading,loading, paid,instructor,lessons} = req.body;
    const course = await new Course({
      slug:slugify(req.body.name),
      instructor:req.user._id,
     ...req.body
    }).save();
    res.json(course);
  } catch(err){
    console.log(err);
    return res.status(400).send("Create Course Failed");
  }
}
export const read = async (req,res) =>{
  let course = await Course.findOne({slug:req.params.slug})
  .populate("instructor","_id name")
  .exec();
  res.json(course);
}