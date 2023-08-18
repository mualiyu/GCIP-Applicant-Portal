import React, { DOMElement, useRef, useEffect } from "react";
import "../styles/layout.css";
import Logo from "../../assets/Images/logo.jpg";
import User from "../../assets/Svg/user.svg";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavLink from "../../components/NavLink";
import Drawer from "../../assets/Svg/drawer.svg";
import { FolderIcon, LogOutIcon } from "../../assets/Svg/Index";
import { FaLock, FaUser } from "react-icons/fa";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import query from "../../helpers/query";
import { useState } from "react";
import { persistor } from "../../redux/store";
import Loading from "../../components/Loading";
import { setUser } from "../../redux/user/userSlice";
import { FaBook, FaEnvelope, FaFileContract, FaHouseChimney, FaUserTie, FaBookBookmark } from "react-icons/fa6";
function LayOut() {
  const location = useLocation();
  const asideRef = useRef();
  const programData = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  useEffect(() => {
    let idleTimer;

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        // This code will run when there is no keyboard or mouse activity for a certain period
        console.log(localStorage.getItem("authToken"));
        localStorage.removeItem("authToken");
        // localStorage.removeItem(authToken)
        console.log('Logging out this user.');
        navigate("");
        // Perform any actions you want to take when no activity is detected
      }, 3000); // Adjust the time in milliseconds (3 seconds in this case)
    }
    
    const handleUserActivity = () => {
      resetIdleTimer();
      // Perform any other actions you want to take when there is user activity
    }
    
    // Add event listeners for keyboard and mouse events
    document.addEventListener('keydown', handleUserActivity);
    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('click', handleUserActivity);
    document.addEventListener('scroll', handleUserActivity);
    
    // Start the initial timer
    resetIdleTimer();
  
  
}, []);

  



  return (
    <>
      <Loading loading={loading} />
      <div className="layout_nav">
        <img
          onClick={() => {
            if (window.innerWidth <= 767) {
              console.log(asideRef.current.style.width);

              if (asideRef.current.style.width == "100vw") {
                asideRef.current.style.width = "0px";
              } else {
                asideRef.current.style.width = "100vw";
              }
            }
          }}
          className="drawer_bar"
          src={Drawer}
          alt="img"
        />
      </div>

      <div className="layout_container">
        <div ref={asideRef} className="layout_aside">
          <img className="aside_logo" src="svg.svg" alt="img" />
          <div className="divider" />
          <NavLink
            onClick={() => {
              if (window.innerWidth <= 767) {
                asideRef.current.style.width = "0px";
              }
            }}
            label="Home"
            route="/Home"
            Icon={() => <FaHouseChimney active={location.pathname == "/Home"} />}
          />
          <NavLink
            onClick={() => {
              if (window.innerWidth <= 767) {
                asideRef.current.style.width = "0px";
              }
            }}
            label="Company Profile"
            route="/Home/Profile"
            Icon={() => <FaUserTie />}
          />




          {/* <NavLink/>
          <NavLink/>
          <NavLink/> */}
          <div className="other-links">
            <NavLink
              onClick={async () => {
                setLoading(true);
                const { success, data } = await query({
                  method: "POST",
                  url: "/api/applicant/logout",
                  bodyData: {},
                  token: programData.user.user.token,
                });
                persistor.purge();
                dispatch(setUser({ user: { token: "" } }));
                // console.log(data)
                setLoading(false);

                if (success) {
                  navigate("/");
                }
              }}
              label="Logout"
              route=""
              Icon={() => <LogOutIcon />}
            />
            <div className="divider" />

            <div className="name_container">
              <div className="short_name">
                <span>
                  {programData?.user?.user?.name?.split("")[0]}{" "}
                  {programData?.user?.user?.name?.split("")[1]}
                </span>
              </div>
              <div className="long_name">
                <span style={{ fontSize: 12 }}>
                  {programData.user.user.name}
                </span>
                <span
                  style={{
                    color: "rgba(243, 243, 243, 0.42)",
                  }}
                >
                  applicant
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="layout_main">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default LayOut;
