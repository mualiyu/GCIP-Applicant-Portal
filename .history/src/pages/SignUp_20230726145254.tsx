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
import { ArrowIcon } from "../assets/Svg/Index";
import TextArea from "../components/TextArea";
function Login() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callTetx, setCallText] = useState("");
  const [hasDesigned, setHasdesigned] = useState(false);
  const [hasOperated, setHasOperated] = useState(false);
  const [recCert, setRcCert] = useState("");
  const [taxCert, setTax] = useState("");
  const [error, setError] = useState(false);

  const setAlert = (text: string) => {
    setCallText(text);
    setTimeout(() => {
      setCallText("");
    }, 3000);
  };
  const validationSchema = Yup.object({
    person_incharge: Yup.string().required(),
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
      const formData = new FormData();
      if (taxCert == "" || recCert == "") {
        setError(true);
        setTimeout(() => {
          setError(false);
          setLoading(false);
        }, 5000);
        return;
      }
      formData.append("tax_clearance_certificate", taxCert);
      formData.append("cac_certificate", recCert);
      setLoading(true);
      formData.append("has_designed", hasDesigned ? "1" : "0");
      formData.append("has_operated", hasOperated ? "1" : "0");
      Object.keys(values).forEach((key) => {
        const value = values[key];
        formData.append(key, value);
      });
      const response = await fetch(
        "https://api.grants.amp.gefundp.rea.gov.ng/api/applicant/register",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      setLoading(false);
      setCallText(
        `${
          response.status == 201
            ? "Kindly check your email INBOX or SPAM for further instructions"
            : data.message
        }`
      );

      console.log(data);
      if (response.status == 201) {
        formik.resetForm();
        setTimeout(() => {
          navigate("/");
          setCallText("");
        }, 5000);
      } else {
        setTimeout(() => {
          setCallText("");
        }, 5000);
      }
      setLoading(false);
    },
    validationSchema,
  });
  return (
    <Fade>
      <div className="auth_container">
        <Loading loading={loading} size={60} />
        
        {error && <Alert text="Upload CAC & Tax Clearance Certificates" />}
        <Alert text={callTetx} />
        <div className="auth_display">
          {/* <img src="sample_bg.png" /> */}
          <div className="display_message">
            <h2>Africa Minigrids Program (AMP) Grant Management Platform</h2>
            <p>Pilot Minigrids in Rural Communities </p>
          </div>
          {/* <div className="admin_tag">
            <ArrowIcon />
            <p style={{ marginLeft: 20 }}>Admin Login</p>
          </div> */}
        </div>

        <div className="auth_inner_container">
          <div className="auth_logos">
          <img src="main_logo.jpeg" alt="logo" />
          <img src="svg.svg" alt="logo" style={{position: 'absolute', left: '25%', top: '10%', width: '400px'}} />
            {/* <img src="log.png" alt="logo" />
            <img src="svg.svg" alt="logo" /> */}
            {/* <img src="main_logo.jpeg" alt="logo" /> */}
          </div>
          <Header text="Create account" />
          {/* <RegularText text="Welcome back!" /> */}

          <div className="inputs_container">
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
              label="COMPANY NAME"
              placeholder="e.g Hooli Agricultural Service Ltd"
            />

            <div className="sub_input">
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
                placeholder="1234567"
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
                placeholder=""
              />
            </div>

            <div className="sub_input">
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
                placeholder=""
                label="Email Address"
              />

              <Input
                required
                error={
                  formik.touched.phone && formik.errors.phone
                    ? formik.errors.phone
                    : ""
                }
                type="number"
                outlined
                value={formik.values.phone}
                name="phone"
                onChange={formik.handleChange}
                label="Phone Number"
                placeholder=""
              />
            </div>
           
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
              <TextArea
                outlined
                label="Company Address"
                name="address"
                onChange={formik.handleChange}
                value={formik.values.address}
                error={
                  formik.touched.address && formik.errors.address
                    ? formik.errors.address
                    : ""
                }
              />
            </div>
            <div className="sub_input">
            <Input
              type="file"
              required
              onChange={(e) => {
                const formData = new FormData();
                const files = e.target.files;
                files?.length && formData.append("file", files[0]);
                setLoading(true);
                fetch(
                  "https://api.grants.amp.gefundp.rea.gov.ng/api/applicant/registerUpload",

                  {
                    method: "POST",
                    body: formData
                  }
                )
                  .then((res) => res.json())
                  .then((data) => {
                    setLoading(false);
                    if (data.status) {
                      setAlert("CAC Uploaded Succefully");
                      setRcCert(data.data.url)
                      console.log(data);
                      setTimeout(() => {
                        setAlert("");
                      }, 3000);
                   
                    } 
                  })



              }}
              label="Upload CAC Certificate"
            />

            <Input
              type="file"
              required
              // outlined
              // onChange={(e) => {
              //   formik.handleChange
              //   const files = e.target.files;
              //   files?.length && setTax(files[0]);
              // }}
              onChange={(e) => {
                // formik.handleChange
                // const files = e.target.files;
                // files?.length && setRcCert(files[0]);
                const formData = new FormData();
                const files = e.target.files;
                files?.length && formData.append("file", files[0]);
                setLoading(true);
                fetch(
                  "https://api.grants.amp.gefundp.rea.gov.ng/api/applicant/registerUpload",

                  {
                    method: "POST",
                    body: formData
                  }
                )
                  .then((res) => res.json())
                  .then((data) => {
                    setLoading(false);
                    if (data.status) {
                      setAlert("Tax Document Uploaded Succefully");
                      setTax(data.data.url)
                      console.log(data);
                      setTimeout(() => {
                        setAlert("");
                      }, 3000);
                   
                    } 
                  })



              }}
              label="Upload TAX Clearance"
            />
</div>
            <div className="auth_bottom">
              <div className="terms">
                <input
                  checked={hasDesigned}
                  onChange={(e) => {
                    setHasdesigned(e.target.checked);
                  }}
                  type="checkbox"
                  style={{transform: "scale(1.7)"}}
                />
                <RegularText text="I/We have designed and built at least 1 minigrid since January 2016, and this mini grid is still in operation now" />
              </div>

              <div className="terms">
                <input
                  checked={hasOperated}
                  onChange={(e) => {
                    setHasOperated(e.target.checked);
                  }}
                  type="checkbox"
                  style={{transform: "scale(1.7)"}}
                />

                <RegularText text="I/We have operated at least 1 mini grid since January 2016, and this mini grid is still in operation now" />
              </div>
              {/* <div className="terms">
                <input
                  checked={checked}
                  onChange={(e) => {
                    setChecked(e.target.checked);
                  }}
                  type="checkbox"
                  style={{transform: "scale(1.7)"}}
                />
                <RegularText text="I agree to the Terms of Service, Policy and Terms" /> */}
              {/* </div> */}
              <Button
                // disabled={!checked}
                disabled={!hasDesigned || !hasOperated}
                onClick={formik.handleSubmit}
                style={{
                  marginTop: 40,
                }}
                label="Sign Up"
              />

              <div className="dont">
                <RegularText text="Already have an account ?" />
                <RegularText
                  style={{
                    fontWeight: "bold",
                    marginLeft: 5,
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/")}
                  text="Login"
                />
              </div>
            </div>
            {/* <Button
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
            <Button onClick={() => navigate("/")} lineButton label="Sign In" /> */}
          </div>
        </div>
      </div>
    </Fade>
  );
}

export default Login;
