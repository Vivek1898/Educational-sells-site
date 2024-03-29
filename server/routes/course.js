import  express  from "express";

const router =express.Router();
//Middleware ->give current user
import { requireSignin ,isInstructor } from "../middlewares";


//controllers
import {
     uploadImage ,
     removeImage,
     create,
     read
} from '../controllers/course'

router.post('/course/upload-image',uploadImage);
router.post('/course/remove-image',removeImage);

//course

router.post('/course',requireSignin,isInstructor,create);
router.get("/course/:slug",requireSignin,isInstructor,read);

module.exports = router;