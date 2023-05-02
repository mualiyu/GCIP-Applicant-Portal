import React, { useState } from "react";
import "./styles/login.css";
import Logo from "../assets/Images/or_logo.png";
import { Header, RegularText } from "../components/Common";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import query from "../helpers/query";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import { Fade } from "react-awesome-reveal";
function Login() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callTetx, setCallText] = useState("");

  const setAlert = (text: string) => {
    setCallText(text);
    setTimeout(() => {
      setCallText("");
    }, 3000);
  };
  const validationSchema = Yup.object({
    person_incharge: Yup.string()
      .min(6, "Password must be more than six characters")
      .required(),
    email: Yup.string().email("Invalid email address").required(),
    rc_number: Yup.string().required(),
    name: Yup.string().required(),
    username: Yup.string().required(),
    phone: Yup.string().required(),
    address: Yup.string().required(),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      name: "",
      address: "",
      person_incharge: "",
      phone: "",
      rc_number: "",
    },
    onSubmit: async (values) => {
      setLoading(true);

      const response = await query({
        method: "POST",
        url: "/api/applicant/register",
        bodyData: values,
      });
      setLoading(false);
      setCallText(
        `${
          response.success
            ? "Kindly check your email for your password"
            : response.data.message
        }`
      );
      
      if (response.success) {
        formik.resetForm();
        setTimeout(() => {
          navigate("/");
          setCallText("");
        }, 2000);
      } else {
        
        setTimeout(() => {
          setCallText("");
        }, 2000);
      }
    },
    validationSchema,
  });
  return (
    <Fade>
      <div className="auth_container">
        <Loading loading={loading} />
        <Alert text={callTetx} />
        <div className="auth_inner_container">
          <img src="svg.svg" alt="logo" />
          <div className="inputs_container">
            <Header text="Sign up" />
            <RegularText
              text="To sign up, please type in the email address, Name and Confirm password

            "
            />
            <Input
              outlined
              value={formik.values.email}
              error={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ""
              }
              name="email"
              id="email"
              onChange={formik.handleChange}
              required
              type="email"
              placeholder="someone@example.com"
              label="Email Address"
            />
            <Input
              required
              error={
                formik.touched.username && formik.errors.username
                  ? formik.errors.username
                  : ""
              }
              outlined
              value={formik.values.username}
              name="username"
              onChange={formik.handleChange}
              label="Username"
              placeholder="Username"
            />
            <Input
              error={
                formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : ""
              }
              required
              outlined
              value={formik.values.name}
              name="name"
              onChange={formik.handleChange}
              label="Company Name"
              placeholder="Enter your company name here"
            />
            <Input
              error={
                formik.touched.rc_number && formik.errors.rc_number
                  ? formik.errors.rc_number
                  : ""
              }
              required
              outlined
              value={formik.values.rc_number}
              name="rc_number"
              onChange={formik.handleChange}
              label="RC Number"
              placeholder="Enter your RC number here"
            />
            <Input
              required
              error={
                formik.touched.phone && formik.errors.phone
                  ? formik.errors.phone
                  : ""
              }
              type="tel"
              outlined
              value={formik.values.phone}
              name="phone"
              onChange={formik.handleChange}
              label="Phone Number"
              placeholder="Enter your phone number here"
            />
            <Input
              outlined
              value={formik.values.person_incharge}
              error={
                formik.touched.person_incharge && formik.errors.person_incharge
                  ? formik.errors.person_incharge
                  : ""
              }
              name="person_incharge"
              onChange={formik.handleChange}
              required
              label="Authorized Representative"
              placeholder=""
            />
            <div className="txtArea">
              <RegularText
                style={{ fontWeight: "bold" }}
                text="Company Address"
              />
              <textarea
                name="address"
                onChange={formik.handleChange}
                value={formik.values.address}
                rows={5}
              />
            </div>

            <div className="terms">
              <input
                checked={checked}
                onChange={(e) => {
                  setChecked(e.target.checked);
                }}
                type="checkbox"
              />
              <span>
                By clicking on Signup, you agree to our <a>Terms of Service</a>
                and <a>policy & terms</a>
              </span>
            </div>
            <Button
              disabled={!checked}
              onClick={formik.handleSubmit}
              style={{
                width: 188,
                marginTop: 14,
              }}
              label="Sign Up"
            />
            <div className="have_account">
              <span>Already have an account ?</span>
            </div>
            <Button onClick={() => navigate("/")} lineButton label="Sign In" />
          </div>
        </div>
      </div>
    </Fade>
  );
}

export default Login;
