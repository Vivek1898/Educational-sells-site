import  express  from "express";

const router =express.Router();
//Middleware ->give current user
import { requireSignin } from "../middlewares";


//controllers
import {
   makeInstructor,
   getAccountStatus,
   currentInstructor,    
   instructorCourses, 
} from '../controllers/instructor'

router.post('/make-instructor',requireSignin, makeInstructor);
router.post('/get-account-status',requireSignin, getAccountStatus);
router.get('/current-instructor',requireSignin,currentInstructor);
router.get("/instructor-course",requireSignin,instructorCourses);


module.exports = router;