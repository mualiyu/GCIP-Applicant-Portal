import React, { useState } from "react";
import "./styles/login.css";
import Logo from "../assets/Images/gcip_logo.png";
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
import { ArrowIcon } from "../assets/Svg/Index";
import { FaWindowClose } from "react-icons/fa";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
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
  const [openAdvisableModal, setOpenAdvisableModal] = useState(true);
  const [alertText2, setAlert2] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [resetValue, setReset] = useState("");
  const data = useSelector((data) => data);
  const [showPassword, setShowPassword] = useState(false);
  let location = useLocation();

  const dispatch = useDispatch();
  const initialValues = {
    username: "",
    password: "",
  };

  const togglePassword = () => {
    setShowPassword((prevState) => !prevState);
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
      setAlert("Oops! there seems to be an error. Confirm login credientials");
      setTimeout(() => {
        setAlert("");
      }, 5000);
      console.log(response);
      if (response.success) {
        setAlert("Logged In");
        console.log(response);
        localStorage.setItem("authToken", response.data.data.token);
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
      <section className="wrapper bubble">
        <Loading loading={loading} />
        <Alert text={alertText} />
        <div className="col-9 flex flex-center shadow_light auth mt-xl light bubble3">
          <div className="col-8 login-banner"></div>
          <div className="col-5 pl-xl pr-xl bubble2">
            <div className="form-container">
              <img src={Logo} alt="GCIP Logo" height="50" width="150" />
              <h2 className="title mt-xl heading">Login </h2>
              <p className="sub_title mb-xl">
                {" "}
                Welcome back, You've been missed!
              </p>

              {/* <form className="mt-xxl"> */}
              <div className="form__group field col-12">
                <input
                  type="input"
                  className="form__field"
                  placeholder="Username"
                  id="username"
                  onChange={formik.handleChange}
                  required
                />
                <label for="username" className="form__label">
                  Username/Email
                </label>
              </div>
              <div className="form__group field col-12">
                <div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form__field"
                    placeholder="******"
                    id="password"
                    onChange={formik.handleChange}
                    required
                  />
                  <span onClick={togglePassword} className="cnwjien">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <label for="password" className="form__label">
                  Password
                </label>
              </div>
              <p className="sub-title right uppercase mt-n20">
                {" "}
                <a
                  onClick={() => {
                    navigate("forgot");
                  }}
                  className="forgotten pointer bold">
                  Forgotten?
                </a>
              </p>
              <button
                className="btn btn-lg btn-accent bold mt-xxl"
                onClick={formik.handleSubmit}>
                Login
              </button>

              <div className="mt-xl">
                <p className="center m-md">Don't have an account yet? </p>
                <button
                  className="btn btn-lg btn-secondary bold"
                  onClick={() => navigate("signup")}>
                  Create account
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <Modal
          isOpen={openAdvisableModal}
          appElement={document.getElementById("root")}
          style={customStyles}>
          <div
            className=""
            style={{
              display: "flex",
              flexDirection: "column",
            }}>
            <Header text="Note" />
            <div className="">
              <p style={{ lineHeight: "2em" }}>
                For better experience, it is advisable you use the Google Chrome
                or Mozilla Firefox browser.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                width: "25%",
                marginTop: 48,
                justifyContent: "space-between",
                marginLeft: "auto",
              }}>
              <Button
                onClick={() => {
                  setOpenAdvisableModal(false);
                }}
                fontStyle={{
                  color: "var(--primary)",
                }}
                style={{
                  width: 134,
                  backgroundColor: "#fff",
                  border: "1px solid var(--primary)",
                }}
                label="CLOSE"
              />
            </div>
          </div>
        </Modal> */}
      {/* </div> */}
    </Fade>
  );
}

export default Login;
