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
function ForgotPassword() {
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
        url: "/api/applicant/recover",
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
      }, 60000);
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
              <img
                src={Logo}
                alt="GCIP Logo"
                height="50"
                width="150"
              />
              <h2 className="title mt-xl heading">Oops! Forgotten </h2>
              <p className="sub_title mb-xl">
                {" "}
                Don't worry, provide your username or email and we'll send you
                an email with instructions on how to reset your password.
              </p>

              {/* <form className="mt-xxl"> */}
              <div className="form__group field col-12">
                <input
                  type="input"
                  className="form__field"
                  placeholder="Username"
                  value={resetValue}
                  onChange={(e) => {
                    setReset(e.target.value);
                  }}
                  required
                />
                <label for="username" className="form__label">
                  Username/Email
                </label>
              </div>
              <button
                className="btn btn-lg btn-accent bold mt-xxl"
                onClick={async () => {
                  if (resetValue == "") {
                    setAlert("Username is required");
                    setTimeout(() => {
                      setAlert("");
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
                    setAlert("Kindly check your email for your password!");

                    setReset("");
                  } else {
                    setAlert(response.data.message);
                  }

                  setTimeout(() => {
                    setAlert("");
                    if (response.success) {
                      setIsOpen(false);
                    }
                  }, 3000);
                }}>
                Continue
              </button>

              <div className="mt-xl">
                <p className="center m-md">Suddenly remember it? </p>
                <button
                  className="btn btn-lg btn-secondary bold"
                  onClick={() => navigate("/")}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fade>
  );
}

export default ForgotPassword;
