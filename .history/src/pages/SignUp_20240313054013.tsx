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
          setCallText(data.error);
        }, 5000);
      }
      setLoading(false);
    },
    validationSchema,
  });
  return (
    <Fade>

<section className="wrapper bubble">
        <Loading loading={loading} size={60} />
        
        {error && <Alert text="Upload CAC & Tax Clearance Certificates" />}
        <Alert text={callTetx} />
        <div className="col-10 flex flex-center shadow_light auth_register mt-xl light bubble3">
          <div className="col-6 login-banner"></div>
          <div className="col-7 pl-xl pr-xl bubble2">
            <div className="form-container">
              <img
                src="../../src/assets/images/gcip_logo.png"
                alt="GCIP Logo"
                height="50"
                width="150"
              />
              <h2 className="title mt-xl heading">Welcome </h2>
              <p className="sub_title mb-xl"> Creating an account is as easy as ABC</p>

              <div className="flex">
                            <div className="form__group field col-8 mr-sm">
                <input
                  type="input"
                  className="form__field"
                  placeholder="ABC Company"
                  value={formik.values.name}
                  name="name"
                  onChange={formik.handleChange}
                  required
                />
                <label className="form__label">
                  Company Name
                </label>
              </div>
              <div className="form__group field col-5">
                <input
                  type="input"
                  className="form__field"
                  placeholder="ABC Company"
                  value={formik.values.rc_number}
                  name="rc_number"
                  onChange={formik.handleChange}
                  required
                />
                <label  className="form__label">
                  RC Number
                </label>
              </div>
              </div>


             
              <div className="flex">
                            <div className="form__group field col-12 mr-sm">
                                <input type="input" className="form__field" placeholder="" value={formik.values.username}
                  name="username"
                  onChange={formik.handleChange} required />
                                <label className="form__label">Username</label>
                            </div>
                            <div className="form__group field col-12 ml-sm">
                                <input type="email" className="form__field" placeholder="" value={formik.values.person_incharge} name="person_incharge"
                  onChange={formik.handleChange} required />
                                <label className="form__label">Person in Charge</label>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="form__group field col-12 mr-sm">
                                <input type="input" className="form__field" placeholder="" value={formik.values.phone}
                  name="phone"
                  onChange={formik.handleChange} required />
                                <label className="form__label">Phone</label>
                            </div>
                            <div className="form__group field col-12 ml-sm">
                                <input type="email" className="form__field" placeholder="youremail@email.com" name="email"
                  onChange={formik.handleChange} required />
                                <label className="form__label">Email</label>
                            </div>
                        </div>


                        <div className="flex">
                            <div className="form__group field col-12 mr-sm">
                            <input type="file" className="" onChange={(e) => {
                
                const formData = new FormData();
                const files = e.target.files;
                const fileSizeLimits = 10 * 1024 * 1024; // 5 MB
                files?.length && formData.append("file", files[0]);
                if(files[0].size > fileSizeLimits) {
                  setAlert('File size exceeds the limit (10 MB).');
                  setTimeout(() => {
                    setAlert("");
                  }, 3000);
                  e.target.value="";
                  return
                }
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



              }} />
                            <label className="form__label">Upload CAC</label>
                        </div>
                        <div className="form__group field col-12 ml-sm">
                        <input type="file" className="" onChange={(e) => {
                const formData = new FormData();
                const files = e.target.files;
                const fileSizeLimits = 10 * 1024 * 1024; // 5 MB
                files?.length && formData.append("file", files[0]);
                if(files[0].size > fileSizeLimits) {
                  setAlert('File size exceeds the limit (10 MB).');
                  setTimeout(() => {
                    setAlert("");
                  }, 3000);
                  e.target.value="";
                  return
                }
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



              }} required />
                            <label className="form__label">Upload TAX Clearance</label>
                        </div>
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
                onClick={formik.handleSubmit} >
                Create account
              </button>
              <div className="mt-xl">
              <p className="center m-md">Already have an account? <span onClick={() => navigate("signup")} className="bold">Login
                            </span></p>
                
              </div>
              
            </div>
          </div>
        </div>
      </section>



    </Fade>
  );
}

export default Login;
