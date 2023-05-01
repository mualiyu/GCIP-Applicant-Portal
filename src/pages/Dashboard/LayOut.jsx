import React, { DOMElement, useRef } from "react";
import "../styles/layout.css";
import Logo from "../../assets/Images/logo.jpg";
import User from "../../assets/Svg/user.svg";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavLink from "../../components/NavLink";
import Drawer from "../../assets/Svg/drawer.svg";
import { FolderIcon, LogOutIcon } from "../../assets/Svg/Index";
import { FaLock, FaUser } from "react-icons/fa";
import Button from "../../components/Button";
import { useSelector } from "react-redux";
import query from "../../helpers/query";
import { useState } from "react";
import Loading from "../../components/Loading";
function LayOut() {
  const location = useLocation();
  const asideRef = useRef();
  const programData=useSelector(state=>state)
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
  return (
    <>
    <Loading loading={loading}/>
     <div className="layout_nav">
    
        <img
          onClick={() => {
            if (window.innerWidth <= 767) {
              console.log(asideRef.current.style.width)
             
              if (asideRef.current.style.width == "100vw") {
                asideRef.current.style.width = "0px"
              }else{
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
        <img className="aside_logo" src='logo.jpg' alt="img" />
        <div className="divider"/>
        <NavLink
          onClick={() => {
            if (window.innerWidth <= 767) {
              asideRef.current.style.width = "0px";
            }
          }}
          label="Home"
          route="/Home"
          Icon={() => <FolderIcon active={location.pathname == "/Home"} />}
        />
        <NavLink
              onClick={() => {
                if (window.innerWidth <= 767) {
                  asideRef.current.style.width = "0px";
                }
              }}
              label="Company Profile"
              route="/Home/Profile"
              Icon={() => <FaUser />}
              />

        {/* <NavLink/>
          <NavLink/>
          <NavLink/> */}
        <div className="other-links">
          <div className="divider"/>

        <NavLink
          onClick={ async () => {
            setLoading(true);
            const {success,data} = await query({
              method: "POST",
              url: "/api/applicant/logout",
              bodyData: {},
              token:programData.user.user.token
            });
            console.log(data)
            setLoading(false)

            if (success) {
              navigate('/')
            }
          }}
          label="Logout"
          route=""
          Icon={() => <LogOutIcon/>}
        />
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
