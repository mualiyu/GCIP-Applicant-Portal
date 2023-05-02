import React, { DOMElement, useRef } from "react";
import "../styles/layout.css";
import Logo from "../../assets/Images/logo.jpg";
import User from "../../assets/Svg/user.svg";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavLink from "../../components/NavLink";
import Drawer from "../../assets/Svg/drawer.svg";
import { FolderIcon, LogOutIcon, MessageIcon } from "../../assets/Svg/Index";
import { FcHome, FcSettings } from "react-icons/fc";
import {
  FaArrowLeft,
  FaFileArchive,
  FaHandHolding,
  FaHome,
  FaUser,
  FaWhatsapp,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import query from "../../helpers/query";
import { useState } from "react";
import Loading from "../../components/Loading";
function ProgramLayOut() {
  const location = useLocation();
  const asideRef = useRef();
  const programData = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Loading loading={loading} />
      <div className="layout_nav">
        <div className="home_user">
          <FaUser />
          <span>User</span>
        </div>
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
        {/* <div className="layout_nav">
        
        <img className="layout_user" src={User} alt="img" />
        <img
          onClick={() => {
            if (window.innerWidth <= 767) {
              asideRef.current.style.width = "100vw";
            }
          }}
          className="drawer_bar"Programme/Document
          src={Drawer}
          alt="img"
        />
      </div> */}

        <div ref={asideRef} className="layout_aside">
          <img className="aside_logo" src="/newLogo.png" alt="img" />
          <div className="divider" />
          <FaArrowLeft
            onClick={() => navigate("/Home")}
            style={{
              backgroundColor: "#9b9b9b16",
              height: 25,
              width: 25,
              borderRadius: 20,
              padding: 10,
              cursor: "pointer",
            }}
          />
          <NavLink
            param={programData.program.program.id}
            onClick={() => {
              if (window.innerWidth <= 767) {
                asideRef.current.style.width = "0px";
              }
            }}
            label="Program Home"
            route="/Programme"
            Icon={() => (
              <FaHome
                color={
                  location.pathname == "/Programme" ? "var(--primary)" : "#000"
                }
              />
            )}
          />
          <NavLink
            onClick={() => {
              if (window.innerWidth <= 767) {
                asideRef.current.style.width = "0px";
              }
            }}
            label="My Applications"
            route="/Programme/Application"
            Icon={() => (
              <FaFileArchive
                color={
                  location.pathname == "/Programme/Application"
                    ? "var(--primary)"
                    : "#000"
                }
              />
            )}
          />
          <NavLink
            onClick={() => {
              if (window.innerWidth <= 767) {
                asideRef.current.style.width = "0px";
              }
            }}
            label="Messages"
            route="/Programme/Message"
            Icon={() => <MessageIcon />}
          />
          <NavLink
            onClick={() => {
              if (window.innerWidth <= 767) {
                asideRef.current.style.width = "0px";
              }
            }}
            label="Documents"
            route="/Programme/Document"
            Icon={() => (
              <FolderIcon active={location.pathname == "/Programme/Document"} />
            )}
          />

          {/* <NavLink/>
          <NavLink/>
          <NavLink/> */}
          <div className="other-links">
            <div className="divider" />

          
            <NavLink
              onClick={async () => {
                setLoading(true);
                const { success, data } = await query({
                  method: "POST",
                  url: "/api/applicant/logout",
                  bodyData: {},
                  token: programData.user.user.token,
                });
                console.log(data);
                setLoading(false);

                if (success) {
                  navigate("/");
                }
              }}
              label="Logout"
              route=""
              Icon={() => <LogOutIcon />}
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

export default ProgramLayOut;
