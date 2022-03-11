import { useReducer,createContext,useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
//initial State

const intialState={
    user:null,
};

//Create Context

const Context=createContext()

//root reducer ->will update initial State

const rootReducer=(state,action)=>{
    switch(action.type){
        case "LOGIN":
            return {...state,user:action.payload};
            case "LOGOUT":
                return {...state,user:null};
                default:
                    return state;
    }

};

//context provider ->for all component dispatch to all fnkcns
const Provider = ({children}) =>{
 const [state,dispatch] = useReducer(rootReducer,intialState);
useEffect(()=>{
dispatch({
    type:"LOGIN",
    payload:JSON.parse(window.localStorage.getItem("user"))
})
},[]);
//Router
const Router=useRouter();

//Handling Expiry Using Interceptors
axios.interceptors.response.use(
    function(response){
        //200 Sucess 
        return response;
    },function(error){
        //Other than 200 failure
        //Execute Logout

        let res=error.response;
        if(res.status === 401 && res.config && !res.config.__isRetryRequest){
            return new Promise((resolve,reject) =>{
                axios.get('/api/logout')
                .then((data)=>{
                    console.log('/401 error > Logout');
                    dispatch({type:'LOGOUT'})
                    window.localStorage.removeItem('user');
                    Router.push("/login");
                })
                .catch(err =>{
                    console.log('AXIOS INTERCEPTOR ERR',err)
                    reject(err);
                });
            });
        }
        return Promise.reject(error);
    
    }
);

//Include csrf token header to axios
useEffect(()=>{
const geCsrfToken = async () =>{
    const {data} = await axios.get('/api/csrf-token');
    // console.log("CSRF => ",data);
    //Headers Match with backend
    axios.defaults.headers["X-CSRF-Token"]=data.getCsrfToken;

};
geCsrfToken();
},[])

 return(
     <Context.Provider value={{state,dispatch}}>
         {children}
         </Context.Provider>
 );

};

export {Context,Provider};