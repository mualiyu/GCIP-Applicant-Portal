// import {useSelector} from "react-redux"
// import {Navigate, useLocation} from "react-router-dom"

// const RedirectedRoute = ({children}) => {
//     const user = useSelector((state) => state);
//     let location = useLocation();
// console.log(localStorage.getItem('authToken'));
//     if(user.user.user.token) {
//         return <Navigate to="/Home" state={{ from: location}} replace />
//     }
    
//  return children

// };

// export default RedirectedRoute;


import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RedirectedRoute = ({ children }) => {
  const user = useSelector((state) => state); // Adjust this based on your actual state structure
  let location = useLocation();

  const [inactivityTimer, setInactivityTimer] = useState(null);

  const handleUserActivity = () => {
    // Clear the existing inactivity timer
    clearTimeout(inactivityTimer);

    // Start a new inactivity timer
    setInactivityTimer(
      setTimeout(() => {
        // User has been inactive for 30 minutes, navigate away
        // You might want to dispatch an action to reset the state or remove the token
        console.log("User inactive for 30 minutes. Logging out...");
            localStorage.removeItem('authToken')
            console.log('Token has been removed')
        // Perform logout action here (e.g., remove token from state)
        // For now, we'll just log a message and navigate to a logout page
        // You might need to customize this part based on your application's logic
        // This example uses <Navigate> to redirect to a /Logout route
      }, 0.005 * 60 * 1000) // 30 minutes in milliseconds
    );
  };

  useEffect(() => {
    // Add event listeners to track user activity
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    // Clean up event listeners when the component unmounts
    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
    };
  }, [inactivityTimer]);

  if (user.user.user.token) {
    return <Navigate to="/Home" state={{ from: location }} replace />;
  }

  return children;
};

export default RedirectedRoute;



