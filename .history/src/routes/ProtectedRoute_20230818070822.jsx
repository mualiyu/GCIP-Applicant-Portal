import {useSelector} from "react-redux"
import { useState, useEffect } from "react";
import {Navigate, useLocation} from "react-router-dom"
// import IdleTimer from "react-idle-timer";

const ProtectedRoute = ({children}) => {
    const user = useSelector((state) => state);
    let location = useLocation();
    const [idle, setIdle] = useState(false);


    // useEffect(() => {
    //     if (idle) {
    //         return <Navigate to="/" state={{ from: location}} replace />
    //     }
    //   }, [idle]);



    if(!user.user.user.token) {
        return <Navigate to="/" state={{ from: location}} replace />
    }
    

 return(
//     <IdleTimer
//     timeout={0.05 * 60 * 1000}
//     onIdle={handleIdle}
//   >
    
    children

//    </IdleTimer> 
    
    ) 

};

export default ProtectedRoute;