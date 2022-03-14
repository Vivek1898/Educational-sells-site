import  express  from "express";

const router =express.Router();
//Middleware ->give current user
import { requireSignin } from "../middlewares";


//controllers
import {
   makeInstructor,
   getAccountStatus,     
} from '../controllers/instructor'

router.post('/make-instructor',requireSignin, makeInstructor);
router.post('/get-account-status',requireSignin, getAccountStatus);



module.exports = router;