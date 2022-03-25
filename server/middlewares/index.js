//Check for token in headers
//verify using secret JWT_SECRET
//Sucess -> gives Valiad User
import expressJwt from 'express-jwt';
import User from "../models/user";
export const requireSignin =expressJwt({
    getToken:(req,res) => req.cookies.token,
    secret:process.env.JWT_SECRET,
    algorithms:["HS256"],
}); //


//Instructror middleware

export const isInstructor =  async (req,res,next) =>{
try {
    const user= await User.findById(req.user._id).exec();
   
    if(!user.role.includes("Instructor")){
      return res.status(403);
    }else{
        next();
    }
  
} catch (error) {
    console.log(error);
}
}