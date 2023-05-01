import React, { useState } from "react";
import "./styles/login.css";
import Logo from "../assets/Images/or_logo.png";
import { Header, RegularText } from "../components/Common";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user/userSlice";
import * as Yup from "yup";
import { Fade } from "react-awesome-reveal";
import { useFormik } from "formik";
import Loading from "../components/Loading";
import query from "../helpers/query";
import Alert from "../components/Alert";
import {
  setEducatioanlQualification,
  setMembership,
  setPersonalDetails,
  setSupportingDocs,
} from "../redux/user/userDetailSlice";
function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alertText, setAlert] = useState("");
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
      values.device_name=1234
        setLoading(true);
        const response = await query({
          method: "POST",
          url: "/api/applicant/login",
          bodyData: values,
        });
        setLoading(false);
        console.log(response)
        if (response.success) {
          setAlert('Logged In');
          dispatch(setUser({
            user:{
              email:response.data.data.user.email,
              name:response.data.data.user.name,
              isLoggedIn:true,
              token:response.data.data.token,
              phone:response.data.data.user.phone,
              id:response.data.data.user.id,
              username:response.data.data.user.username,
              address:response.data.data.user.address,
              rcNumber:response.data.data.user.rc_number,
              inCharge:response.data.data.user.person_incharge

            }
          }))
          navigate("/Home");
        }else{
          setAlert('Something went wrong with your login')
          
        }
       
        
        setTimeout(() => {
          setAlert("");
        }, 3000);
        
    
    },
    validationSchema
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
              <span style={{ marginLeft: 10 }}>Reset Password</span>
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
    </Fade>
  );
}

export default Login;
