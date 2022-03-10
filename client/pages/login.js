import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password });
    //Get data to this end point
   try{
     setLoading(true);
     //If there any api exist server will target backend through proxy
    const {data}=await axios.post(`api/login`,{
     
      email,
      password
    });
    console.log("Login  User" ,data)
  //  toast.success('Registration SucessFull');
  //  setLoading(false);
   }catch(err){
   toast.error(err.response.data);
   setLoading(false);
   }

  };

  return (
   
     <>
      <h1 className="jumbotron text-center bg-primary square">Login</h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>

          <input
            type="email"
            className="form-control mb-4 p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />

          <input
            type="password"
            className="form-control mb-4 p-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />

          <button type="submit" className="btn btn-block btn-primary"
          disabled={!email || !password || loading }
          >
           {loading ? <SyncOutlined spin/>: "Submit" }
           
          </button>
        </form>
        <p className="text-center p-3">
         Not Yet registered?{" "}
          <Link href="/register">
            <a>Register</a>
            </Link>  
          </p>
      </div>
      
    </>
  );
};

export default Login;
