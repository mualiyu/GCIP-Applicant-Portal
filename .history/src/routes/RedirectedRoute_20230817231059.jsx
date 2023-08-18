import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const RedirectedRoute = ({children}) => {
    const user = useSelector((state) => state);
    let location = useLocation();
console.log(localStorage.getItem('authToken'));
    if(user.user.user.token) {
        return <Navigate to="/Home" state={{ from: location}} replace />
    }
    
 return children

};

export default RedirectedRoute;
