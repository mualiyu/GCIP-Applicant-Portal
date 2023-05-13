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
        <div className="auth_inner_container">
          <img src="svg.svg" alt="logo" />
          <div className="inputs_container">
            <Header text="Sign in" />
            <RegularText
              text="To sign in, please type in the user name for your AMP account and your password.

"
            />
            <Input
              outlined
              error={
                formik.touched.username && formik.errors.username
                  ? formik.errors.username
                  : ""
              }
              id="username"
              onChange={formik.handleChange}
              placeholder="username here"
              label="User Name"
            />
            <Input
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
              placeholder="type Password here..."
            />
            <div className="forgot_password">
              <RegularText text="Forgot Password ?" />
              <span
                onClick={() => {
                  setIsOpen(true);
                }}
                style={{ marginLeft: 10, color: "blue", cursor: "pointer" }}
              >
                Reset Password
              </span>
            </div>
            <Button
              onClick={formik.handleSubmit}
              style={{
                width: 188,
                marginTop: 14,
              }}
              label="Login"
            />
            <Button
              onClick={() => navigate("signup")}
              lineButton
              label="Create an account"
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        appElement={document.getElementById("root")}
        style={customStyles}
      >
        <Alert text={alertText} />
        <div style={{ position: "relative" }} className="inner_modal">
          <Loading loading={loading} />
          <Alert text={alertText2} />
          <FaWindowClose
            onClick={() => {
              setIsOpen(false);
            }}
            style={{ fontSize: 30, cursor: "pointer", marginLeft: "auto" }}
          />
          <RegularText
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
            text="Reset Password"
          />
          <div className="divider" />
          <Input
            value={resetValue}
            onChange={(e) => {
              setReset(e.target.value);
            }}
            label="Username"
            outlined
          />
          <Button
            onClick={async () => {
              if (resetValue == "") {
                setAlert2("Username is required");
                setTimeout(() => {
                  setAlert2("");
                }, 2000);
                return;
              }
              const values = {
                username: resetValue,
              };
              setLoading(true);
              const response = await query({
                method: "POST",
                url: "/api/applicant/recover",
                bodyData: values,
              });
              setLoading(false);

              if (response.success) {
                setAlert2("Kindly check your email for your password!");

                setReset("");
              } else {
                setAlert2(response.data.message);
              }

              setTimeout(() => {
                setAlert2("");
                if (response.success) {
                  setIsOpen(false);
                }
              }, 3000);
            }}
            style={{
              marginTop: 20,
              width: 200,
            }}
            label="Reset"
          />
        </div>
      </Modal>
    </Fade>
  );
}

export default Login;
