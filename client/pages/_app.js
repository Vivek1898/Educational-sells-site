import TopNav from '../components/TopNav'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css'
import '../public/css/styles.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MyApp({Component,PageProps}){
    return(
        <>
         <ToastContainer position='top-center'/>
        <TopNav />
        <Component {...PageProps} />
        </>
    );
   
    
}

export default MyApp;