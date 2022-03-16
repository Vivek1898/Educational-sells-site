import AWS from "aws-sdk"
import { nanoid } from "nanoid";

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
}