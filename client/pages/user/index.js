import {useContext } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";

//Only for logged Seesion
//Protected Route
const UserIndex = () =>{
    const {state:user}=useContext(Context);

    return (
        <UserRoute>
        <h1 className="jumbotron text-center bg-primary square">User</h1> 
      <pre>{JSON.stringify(user,null,4)}</pre>
        </UserRoute>
      
       
    )
}

export default UserIndex;