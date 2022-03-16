import  express  from "express";
import cors from 'cors';
import fs from "fs";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import csurf from "csurf";
const morgan=require('morgan');
require("dotenv").config();

const csrfProtection=csurf({cookie : true});
const app=express();

//db

mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
  })
  .then(() => console.log("**DB CONNECTED**"))
  .catch((err) => console.log("DB CONNECTION ERR => ", err));


//MiddleWares

app.use(cors());
app.use(express.json({limit:"5mb"}));
app.use(cookieParser());
app.use(morgan("dev"));


//Auto Routing Using File System
fs.readdirSync('./routes').map((r)=>
app.use('/api',require(`./routes/${r}`))
);

//csrf
app.use(csrfProtection);

app.get("/api/csrf-token",(req,res)=>{
  //Req to get csrf token and we use in frotend to match this token
  res.json({csrfToken:req.csrfToken()});
  // console.log({csrfToken:req.csrfToken()})
})



const port=process.env.PORT || 8000;

app.listen(port,()=>`console.log(Server is running on port ${port})`);
