import { useState,useEffect, useContext} from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined,
  CoffeeOutlined,
  CarryOutOutlined,
  TeamOutlined
} from "@ant-design/icons";

//Logout Call backend
//And remove user from localStorage (Context)

import { Context } from "../context";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";


const { Item,SubMenu,ItemGroup } = Menu;

const TopNav = () => {
  const[current,setCurrent]=useState("");

  const{state,dispatch}=useContext(Context);
  const{user} =state;
  const Router=useRouter();
  
  //sET Active Nav Links
  useEffect(()=>{
    process.browser  && setCurrent(window.location.pathname)
  console.log(window.location.pathname)
  },[ process.browser  && window.location.pathname]);

const logout =async () =>{
dispatch({type:"LOGOUT"});
window.localStorage.removeItem("user");
const {data}=await axios.get("/api/logout");
toast(data.message);
Router.push("/login");
}

  return (
    <Menu mode="horizontal" selectedKeys={[current]}>
      
      <Item key="/" 
      onClick={(e)=>setCurrent(e.key)}
       icon={<AppstoreOutlined />}>
        <Link href="/">
          <a>App</a>
        </Link>
      </Item>
{user && user.role && user.role.includes("Instructor")?(
    <Item key="/instructor/course/create" 
    onClick={(e)=>setCurrent(e.key)}
    icon={<CarryOutOutlined />}>
     <Link href="/instructor/course/create">
       <a>Create Course</a>
     </Link>
   </Item>
):(
  <Item key="/user/become-instructor" 
  onClick={(e)=>setCurrent(e.key)}
  icon={<TeamOutlined />}>
   <Link href="/user/become-instructor">
     <a>Become Instructor</a>
   </Link>
 </Item>
)}
{user && user.role && user.role.includes("Instructor") && (
  <Item key="/instructor" 
  onClick={(e)=>setCurrent(e.key)}
  icon={<TeamOutlined />}
  className="float-left"
  
  >
   <Link href="/instructor">
     <a>Instructor</a>
   </Link>
 </Item>
) }



      {user === null && (
        <>
        
      <Item key="/login" 
       onClick={(e)=>setCurrent(e.key)}
       icon={<LoginOutlined />}>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </Item>

      <Item key="/register" 
       onClick={(e)=>setCurrent(e.key)}
       icon={<UserAddOutlined />}>
        <Link href="/register">
          <a>Register</a>
        </Link>
      </Item>

        </>
      )}
        
      {user !== null  &&
      
      <SubMenu
      key="submenu" 
      style={{ marginLeft: 'auto' }}  
      icon={<CoffeeOutlined/>}  
      title={user && user.name}>
    <ItemGroup>
    <Item 
      key="/logout"
       style={{ marginLeft: 'auto' }}  
       onClick={logout}
       icon={<LogoutOutlined />} >
        Logout
      </Item>

      <Item key="/user" 
       onClick={(e)=>setCurrent(e.key)}
       icon={<UserAddOutlined />}>
        <Link href="/user">
          <a>Dashboard</a>
        </Link>
      </Item>

    </ItemGroup>

  
      </SubMenu>
      
    
     }



    
  
    </Menu>
  );
};

export default TopNav;