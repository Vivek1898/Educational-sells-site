import {useContext } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";

//Only for logged Seesion
//Protected Route
//User Route --> USER NAV--> AND WE ARE PASSING CHILDREN FOR USER ROUTE
const UserIndex = () =>{
    const {state:user}=useContext(Context);
    // console.log(user.user.name)

    return (
        <UserRoute>
        <h1 className="jumbotron text-center bg-primary square">User DashBoard</h1> 
        {/* <li>{user.user.name}</li> */}

      <pre>{JSON.stringify(user,null,4)}</pre>


        </UserRoute>
      
       
    )
}

export default UserIndex;