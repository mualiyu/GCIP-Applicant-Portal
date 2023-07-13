import React, { useState } from "react";
import "./styles/login.css";
import Logo from "../assets/Images/or_logo.png";
import { Navigate, useLocation } from "react-router-dom";
import { Header, RegularText } from "../components/Common";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/user/userSlice";
import * as Yup from "yup";
import { Fade } from "react-awesome-reveal";
import { useFormik } from "formik";
import Loading from "../components/Loading";
import query from "../helpers/query";
import Modal from "react-modal";
import Alert from "../components/Alert";
import {ArrowIcon} from '../assets/Svg/Index'
import { FaWindowClose } from "react-icons/fa";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "90vh",
    minWidth: "50vw",
    overflowX: "hidden",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

import {
  setEducatioanlQualification,
  setMembership,
  setPersonalDetails,
  setSupportingDocs,
} from "../redux/user/userDetailSlice";
import { useEffect } from "react";
function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alertText, setAlert] = useState("");
  const [alertText2, setAlert2] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [resetValue, setReset] = useState("");
  const data = useSelector((data) => data);
  let location = useLocation();

  const dispatch = useDispatch();
  const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Password must be more than six characters")
      .required(),
    username: Yup.string().required(),
  });
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      values.device_name = 1234;
      setLoading(true);
      const response = await query({
        method: "POST",
        url: "/api/applicant/login",
        bodyData: values,
      });
      setLoading(false);
      console.log(response);
      if (response.success) {
        setAlert("Logged In");
        dispatch(
          setUser({
            user: {
              email: response.data.data.user.email,
              name: response.data.data.user.name,
              isLoggedIn: true,
              token: response.data.data.token,
              phone: response.data.data.user.phone,
              id: response.data.data.user.id,
              username: response.data.data.user.username,
              address: response.data.data.user.address,
              rcNumber: response.data.data.user.rc_number,
              inCharge: response.data.data.user.person_incharge,
            },
          })
        );
        navigate("/Home");
      } else {
        console.log(response.data.message);
        setAlert(response.data.message);
      }

      setTimeout(() => {
        setAlert("");
      }, 3000);
    },
    validationSchema,
  });

  return (
    <Fade>
      <div className="auth_container">
        <Loading loading={loading} />
        <Alert text={alertText} />

        <div className="auth_display">
          {/* <img src="amp-banner.jpeg"/> */}
          {/* <img src="sample_bg.png" /> */}
          <div className="display_message">
            <h2>Africa Minigrids Program (AMP) 
Grant Management Platform</h2>
<p>Pilot Minigrids in Rural Communities </p>
          </div>
          {/* <div className="admin_tag">
            <ArrowIcon/>
            <p style={{marginLeft:20}}>Admin Login</p>
          
          </div> */}
        </div>


        <div className="auth_inner_container">
          <div className="auth_logos">
          <img src="main_logo.jpeg" alt="logo" />
          <img src="svg.svg" alt="logo" />
          </div>
          <Header text="Login to Continue" />
          {/* <RegularText text="Welcome back!"/> */}
          
          <div className="inputs_container">
            
            <Input
            required
              outlined
              error={
                formik.touched.username && formik.errors.username
                  ? formik.errors.username
                  : ""
              }
              id="username"
              onChange={formik.handleChange}
              placeholder=""
              label="UserName/email"
            />
            <Input
            required
              outlined
              error={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ""
              }
              id="password"
              onChange={formik.handleChange}
              type="password"
              label="Password"
              placeholder=""
            />
            <div className="forgot_password">
              <RegularText style={{marginLeft:'auto',cursor:'pointer', fontSize: 11}} onClick={() => {
                  navigate("forgot")
                }} text="Forgotten ?" />
            
            </div>

            <div className="auth_bottom">
            <Button
              onClick={formik.handleSubmit}
              
              label="Login"
            />

            <div className="dont">
            <RegularText text="Don't have an account yet?"/>
            <RegularText style={{
              fontWeight:'bold',
              marginLeft:5,
              cursor:'pointer'
            }} onClick={() => navigate("signup")} text="Create Account"/>
            
            </div>
         
            </div>
            
          </div>
        </div>
      </div>
     
    </Fade>
  );
}

export default Login;
