import React, { DOMElement, useRef } from "react";
import "../styles/layout.css";
import Logo from "../../assets/Images/logo.jpg";
import User from "../../assets/Svg/user.svg";
import { Outlet, useLocation } from "react-router-dom";
import NavLink from "../../components/NavLink";
import Drawer from "../../assets/Svg/drawer.svg";
import { FolderIcon } from "../../assets/Svg/Index";
import { FaUser } from "react-icons/fa";
function LayOut() {
  const location = useLocation();
  const asideRef = useRef();
  return (
    <>
     <div className="layout_nav">
     <div className="home_user">
            <FaUser />
            <span>User</span>
          </div>
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

        {/* <NavLink/>
          <NavLink/>
          <NavLink/> */}
        <div className="other-links">
          <div className="divider"/>
        {/* <NavLink
          onClick={() => {
            if (window.innerWidth <= 767) {
              asideRef.current.style.width = "0px";
            }
          }}
          label="ADMIN"
          route="/"
          Icon={() => <FaUser color="#000"/>}
        /> */}
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
