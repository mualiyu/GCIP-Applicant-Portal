import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RedirectedRoute = ({children}) => {
    const user = useSelector((state) => state);
    console.log(user);
    let location = useLocation();

    const [inactivityTimer, setInactivityTimer] = useState(null);

    const handleUserActivity = () => {
        // Clear the existing inactivity timer
        clearTimeout(inactivityTimer);
    
        // Start a new inactivity timer
        setInactivityTimer(
          setTimeout(() => {
            console.log("User inactive for 30 minutes. Logging out...");
          }, 0.05 * 60 * 1000) // 30 minutes in milliseconds
        );
    }
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

        
    if(user.user.user.token) {
        return <Navigate to="/Home" state={{ from: location}} replace />
    } 
    
 return children

};

export default RedirectedRoute;