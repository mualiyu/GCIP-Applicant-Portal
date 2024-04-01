import React, { DOMElement, useRef } from "react";
import "../styles/layout.css";
import Logo from "../../assets/Images/gcip_logo_white.png";
import User from "../../assets/Svg/user.svg";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavLink from "../../components/NavLink";
import Drawer from "../../assets/Svg/drawer.svg";
import { FolderIcon, LogOutIcon, MessageIcon } from "../../assets/Svg/Index";
import { FcHome, FcSettings } from "react-icons/fc";
import {
  FaBook,
  FaEnvelope,
  FaFileContract,
  FaHouseChimney,
  FaReply,
  FaBookBookmark,
  FaUserTie,
  FaRegCircleUser,
  FaPowerOff,
  FaHouseCrack,
} from "react-icons/fa6";

import {
  FaArrowLeft,
  FaFileArchive,
  FaHandHolding,
  FaHome,
  FaUser,
  FaWhatsapp,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import query from "../../helpers/query";
import { useState } from "react";
import Loading from "../../components/Loading";
import { persistor } from "../../redux/store";
import { setUnread, setUser } from "../../redux/user/userSlice";
import { useEffect } from "react";
function ProgramLayOut() {
  const location = useLocation();
  const asideRef = useRef();
  const dispatch = useDispatch();
  const programData = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  console.log(programData);
  const getData = async () => {
    // setLoading2(true);
    // nProgress.start();
    const respone = await query({
      method: "GET",
      url: `/api/applicant/messages/get-unread/${programData.program.id}`,
      token: programData.user.user.token,
    });
    if (respone.success) {
      dispatch(setUnread(respone.data.data.unRead));
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Loading loading={loading} />
      <div className="layout_nav no-print">
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
        <div ref={asideRef} className="layout_aside no-print">
          <div className="name_container">
            <div className="short_name">
              <span>
                {programData?.user?.user?.name?.split("")[0]}{" "}
                {programData?.user?.user?.name?.split("")[1]}
              </span>
            </div>
            <div className="long_name">
              <span style={{ fontSize: 12 }}>{programData.user.user.name}</span>
              <span
                style={{
                  color: "rgba(243, 243, 243, 0.42)",
                  textTransform: "lowercase",
                  marginTop: 5,
                }}>
                {programData.user.user.email}
              </span>
            </div>
          </div>
          <div className="divider" />
          <NavLink
            param={programData.program.program.id}
            onClick={() => {
              if (window.innerWidth <= 767) {
                asideRef.current.style.width = "0px";
              }
            }}
            className="no-print"
            label="Home"
            route="/Home"
            Icon={() => <FaReply color={"#fff"} />}
          />

          <NavLink
            param={programData.program.program.id}
            onClick={() => {
              if (window.innerWidth <= 767) {
                asideRef.current.style.width = "0px";
              }
            }}
            className="no-print"
            label="Program Home"
            route="/Programme"
            Icon={() => <FaHouseChimney color={"#fff"} />}
          />
          <NavLink
            onClick={() => {
              if (window.innerWidth <= 767) {
                asideRef.current.style.width = "0px";
              }
            }}
            label="Business Profile"
            route="/Home/Profile"
            Icon={() => <FaRegCircleUser />}
          />
          <NavLink
            onClick={() => {
              if (window.innerWidth <= 767) {
                asideRef.current.style.width = "0px";
              }
            }}
            label="My Applications"
            route="/Programme/Application"
            Icon={() => <FaBook color={"#fff"} />}
          />
          {/* <NavLink
            onClick={() => {
              if (window.innerWidth <= 767) {
                asideRef.current.style.width = "0px";
              }
            }}
            label="Add JV/Consortium"
            route="/Home/Profile"
            Icon={() => <FaBookBookmark />}
          /> */}

          <NavLink
            unread={programData.user.unread}
            onClick={() => {
              if (window.innerWidth <= 767) {
                asideRef.current.style.width = "0px";
              }
            }}
            label="Messages"
            route="/Programme/Message"
            Icon={() => <FaEnvelope />}
          />
          {/* <NavLink
            onClick={() => {
              if (window.innerWidth <= 767) {
                asideRef.current.style.width = "0px";
              }
            }}
            label="Documents"
            route="/Programme/Document"
            Icon={() => (
              <FaFileContract active={location.pathname == "/Programme/Document"} />
            )}
          /> */}

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
              label="Log out"
              route=""
              Icon={() => <FaPowerOff />}
            />
            <div className="other-links">
              <div className="divider" />

              <div className="name_container">
                <img className="aside_logo" src={Logo} alt="img" />
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

export default ProgramLayOut;
