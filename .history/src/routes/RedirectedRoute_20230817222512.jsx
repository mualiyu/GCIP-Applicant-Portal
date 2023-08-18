import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const RedirectedRoute = ({children}) => {
    const user = useSelector((state) => state);
    console.log(user);
    let location = useLocation();

    if(user.user.user.token) {
        return <Navigate to="/Home" state={{ from: location}} replace />
    } 
    // else {
    //     return <Navigate to="/"  />
    // }
    
 return children

};

export default RedirectedRoute;