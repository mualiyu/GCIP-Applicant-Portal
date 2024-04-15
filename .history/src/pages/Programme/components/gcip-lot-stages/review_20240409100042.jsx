import React, { useEffect, useState } from "react";
import "../../../styles/profile.css";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import Modal from "react-modal";
import { FaWindowClose } from "react-icons/fa";
import { Header, RegularText } from "../../../../components/Common";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import query from "../../../../helpers/query";

import Loading from "../../../../components/Loading";
import Alert from "../../../../components/Alert";
import { MoonLoader } from "react-spinners";

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

export default function GcipSubmissionReview() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const programData = useSelector((state) => state);
  const [submissions, setSubmissions] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const pData = useSelector((state) => state);
  const [alertText, setAlert] = useState("");
  const myFormData = new FormData();
  const Pdata = useSelector((state) => state);

  const getApplicationDetails = async () => {
    const { success, data, error } = await query({
      method: "GET",
      url: `/api/applicant/application/get?program_id=${pData?.program.id}`,
      token: pData.user.user.token,
    });
    if (success) {
      console.log(data);
      setSubmissions(data);
    }
  };

  const initialValues = {
    name: "",
    address: "",
    person_incharge: "",
    phone: "",
    rc_number: "",
  };

  //   const formik = useFormik({
  //     initialValues: {
  //       name: "",
  //       address: "",
  //       person_incharge: "",
  //       phone: "",
  //       rc_number: "",
  //     },
  //     onSubmit: async (values) => {
  //       setLoading(true);
  //       let route = isJv ? "profile/add/jv" : "profile/update";
  //       if (isJv) {
  //         values.email = jvMail;
  //       }
  //       if (isJv && jvUpdate !== null) {
  //         route = `profile/update/jv/${jvUpdate}`;
  //       }
  //       for (const key in values) {
  //         myFormData.append(key, values[key]);
  //       }

  //       const response = await fetch(
  //         `https://api.grants.amp.gefundp.rea.gov.ng/api/applicant/${route}`,
  //         {
  //           method: "POST",
  //           body: myFormData,
  //           headers: {
  //             Authorization: "Bearer " + Pdata.user.user.token,
  //           },
  //         }
  //       );
  //       const myData = await response.json();

  //       // const { success } = await query({
  //       //   method: "POST",
  //       //   url: `/api/applicant/${route}`,
  //       //   bodyData: values,
  //       //   token: programData.user.user.token,
  //       // });
  //       setLoading(false);
  //       if (myData.status) {
  //         formik.setValues(values);
  //         setIsOpen(false);
  //         if (isJv) {
  //           getUserProfile();
  //           if (jvUpdate !== null) {
  //             setAlert("Jv Updated Successfuly");
  //           } else {
  //             setAlert("Jv Added Successfuly");
  //           }

  //           setIsJv(false);
  //           setIsJvUpdate(null);
  //         } else {
  //           dispatch(
  //             setUser({
  //               user: {
  //                 address: values.address,
  //                 email: programData.user.user.email,
  //                 id: programData.user.user.id,
  //                 inCharge: values.person_incharge,
  //                 isLoggedIn: true,
  //                 name: values.name,
  //                 phone: values.phone,
  //                 rcNumber: values.rc_number,
  //                 token: programData.user.user.token,
  //                 username: programData.user.user.username,
  //               },
  //             })
  //           );
  //           setAlert("Updated successfully");
  //         }
  //       } else {
  //         setAlert("An error occured while updating");
  //       }
  //       setTimeout(() => {
  //         setAlert("");
  //       }, 2000);
  //     },
  //   });
  useEffect(() => {
    console.log(pData);
    // formik.setValues({
    //   address: programData.user.user.address,
    //   name: programData.user.user.name,
    //   person_incharge: programData.user.user.inCharge,
    //   phone: programData.user.user.phone,
    //   rc_number: programData.user.user.rcNumber,
    // });
    getApplicationDetails();
  }, []);
  return (
    <div className="profile">
      <Loading loading={loading} />
      <Header text="Review Application" />
      <span>Review your Submissions and make adjustments where necessary</span>

      <div class="row" style={{ marginTop: 35 }}>
        <div class="col-xxl-8 col-xl-8 col-lg-8">
          <div class="card ">
            <div class="card-body">
              <div class="welcome-profile">
                <div class="card-header flex-row"></div>
                <div class="d-flex align-items-center">
                  <div className="short_name">
                    <span>
                      {pData?.user?.user?.name?.split("")[0]}{" "}
                      {pData?.user?.user?.name?.split("")[1]}
                    </span>
                  </div>
                  <div class="ms-3">
                    <h4>
                      Welcome,{" "}
                      {pData.user.user.inCharge
                        ? pData.user.user.inCharge
                        : "N/A"}{" "}
                      !
                    </h4>
                    <p>Here is a summary of your business profile</p>
                  </div>
                </div>
                <ul>
                  <li>
                    <a href="#">
                      <div class="user-info">
                        Company Name :{" "}
                        <span className="inffdgshd">
                          {pData.user.user.name}
                        </span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="user-info">
                        RC Number :{" "}
                        <span className="inffdgshd">
                          {pData.user.user.rcNumber}
                        </span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="user-info">
                        Username :{" "}
                        <span className="inffdgshd">
                          {pData.user.user.username}
                        </span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="user-info">
                        Email :{" "}
                        <span className="inffdgshd">
                          {pData.user.user.email}
                        </span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="user-info">
                        Phone :{" "}
                        <span className="inffdgshd">
                          0{pData.user.user.phone}
                        </span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="user-info">
                        Address :{" "}
                        <span className="inffdgshd">
                          {pData.user.user.address}
                        </span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xxl-4 col-xl-4 col-lg-4" style={{ marginLeft: 5 }}>
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">
                Eligibiity Documents{" "}
                {submissions?.data.application.application_documents.length}{" "}
              </h4>
            </div>
            <div class="card-body">
              <div class="app-link">
                {submissions?.data.application.application_documents.map(
                  (document, index) => (
                    <div class="card-header flex-row" key={document.id}>
                      <h5>{document.name}</h5>
                      <a class="" href="#">
                        {document.url}
                      </a>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Modal
        className="modal"
        isOpen={modalIsOpen}
        appElement={document.getElementById("root")}
        style={customStyles}>
        <div className="inner_modal">
          <RegularText
            style={{
              textAlign: "left",
              fontWeight: "900",
              textTransform: "uppercase",
              fontSize: 18,
            }}
            text={
              isJv
                ? jvUpdate !== null
                  ? "Update Joint Venture/Consourtium"
                  : "Add Joint Venture/Consourtium"
                : "Update Profile"
            }
          />

          <div className="divider" />
          {isJv || jvUpdate !== null ? (
            <div
              style={{
                width: "50%",
              }}
              className="sub-group">
              <div>
                <label style={{ marginRight: 15 }}>Joint venture</label>
                <input
                  name="company_type"
                  type="radio"
                  style={{ transform: "scale(1.7)" }}
                />
              </div>
              <div>
                <label style={{ marginRight: 15 }}>Consourtium</label>
                <input
                  name="company_type"
                  type="radio"
                  style={{ transform: "scale(1.7)" }}
                />
              </div>
            </div>
          ) : null}

          <Input
            outlined
            value={formik.values.name}
            name="name"
            onChange={formik.handleChange}
            label="Company Name"
            required
          />
          <div className="sub_input">
            <Input
              outlined
              value={formik.values.rc_number}
              name="rc_number"
              onChange={formik.handleChange}
              label="RC Number"
              required
              type="number"
              placeholder="1234567"
            />

            <Input
              type="tel"
              outlined
              value={formik.values.phone}
              name="phone"
              onChange={formik.handleChange}
              label="Phone Number"
              required
            />
          </div>
          {isJv && (
            <Input
              type="email"
              onChange={(e) => {
                setJvMail(e.target.value);
              }}
              outlined
              label="Email"
              value={jvMail}
              required
            />
          )}
          {!isJv && (
            <Input
              outlined
              value={formik.values.person_incharge}
              name="person_incharge"
              onChange={formik.handleChange}
              required
              label="Authorised Representative"
              placeholder="sample"
            />
          )}
          <div className="txtArea">
            <RegularText
              style={{
                textAlign: "left",
                fontWeight: "900",
                textTransform: "uppercase",
                fontSize: 11,
                paddingBottom: 10,
              }}
              text="Address"
            />
            <textarea
              value={formik.values.address}
              name="address"
              onChange={formik.handleChange}
              rows={5}
            />
          </div>
          {isJv && (
            <>
              <div className="sub_input">
                <div style={{ position: "relative" }}>
                  <Input
                    type="file"
                    onChange={(e) => {
                      const formData = new FormData();
                      const files = e.target.files;
                      files?.length && formData.append("file", files[0]);
                      setLoading(true);
                      fetch(
                        "https://api.grants.amp.gefundp.rea.gov.ng/api/applicant/application/create/projects/upload",
                        {
                          method: "POST",
                          body: formData,
                          headers: {
                            Authorization: "Bearer " + Pdata.user.user.token,
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((data) => {
                          console.log(data);
                          setLoading(false);
                          if (data.status) {
                            formik.values.evidence_of_cac = data.data.url;
                            setCaC(true);
                            setAlert("Uplaoded Succefully");
                          } else {
                            setAlert(
                              "Something went wrong. Kindly Upload again"
                            );
                          }
                          setTimeout(() => {
                            setAlert("");
                          }, 2000);
                        });
                    }}
                    label="Evidence of CAC Registration (CAC forms 1.1, CO2, and CO7)"
                  />
                  {cacEvidence && (
                    <span className="uploaded_text">
                      Uploaded, replace by uploading new file
                    </span>
                  )}
                </div>
                <div style={{ position: "relative" }}>
                  <Input
                    type="file"
                    onChange={(e) => {
                      // formik.values.uploads[index].file = "myUrlll";
                      const formData = new FormData();
                      const files = e.target.files;
                      files?.length && formData.append("file", files[0]);
                      setLoading(true);
                      // const response= await query({url:'/file',method:'POST',bodyData:formData})
                      fetch(
                        "https://api.grants.amp.gefundp.rea.gov.ng/api/applicant/application/create/projects/upload",
                        {
                          method: "POST",
                          body: formData,
                          headers: {
                            Authorization: "Bearer " + Pdata.user.user.token,
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((data) => {
                          setLoading(false);
                          if (data.status) {
                            formik.values.company_income_tax = data.data.url;
                            setCompanyIncome(true);
                            setAlert("Uplaoded Succefully");
                          } else {
                            setAlert(
                              "Something went wrong. Kindly Upload again"
                            );
                          }
                          setTimeout(() => {
                            setAlert("");
                          }, 2000);
                        });
                    }}
                    label="Company Income Tax Clearance certificate (2020,2021,2022)"
                  />
                  {formik.values.company_income_tax && (
                    <span className="uploaded_text">
                      Uploaded, replace by uploading new file
                    </span>
                  )}
                </div>
              </div>
              <div className="sub_input">
                <div style={{ position: "relative" }}>
                  <Input
                    type="file"
                    // outlined

                    onChange={(e) => {
                      const formData = new FormData();
                      const files = e.target.files;
                      files?.length && formData.append("file", files[0]);
                      setLoading(true);
                      fetch(
                        "https://api.grants.amp.gefundp.rea.gov.ng/api/applicant/application/create/projects/upload",
                        {
                          method: "POST",
                          body: formData,
                          headers: {
                            Authorization: "Bearer " + Pdata.user.user.token,
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((data) => {
                          setLoading(false);
                          if (data.status) {
                            formik.values.audited_account = data.data.url;
                            setAudited(true);
                            setAlert("Uplaoded Succefully");
                          } else {
                            setAlert(
                              "Something went wrong. Kindly Upload again"
                            );
                          }
                          setTimeout(() => {
                            setAlert("");
                          }, 2000);
                        });
                    }}
                    label="3 years audited account (2020,2021,2022)"
                  />
                  {auditedAcc && (
                    <span className="uploaded_text">
                      Uploaded, replace by uploading new file
                    </span>
                  )}
                </div>
                <div style={{ position: "relative" }}>
                  <Input
                    type="file"
                    // outlined
                    onChange={(e) => {
                      // formik.values.uploads[index].file = "myUrlll";
                      const formData = new FormData();
                      const files = e.target.files;
                      files?.length && formData.append("file", files[0]);
                      setLoading(true);
                      // const response= await query({url:'/file',method:'POST',bodyData:formData})
                      fetch(
                        "https://api.grants.amp.gefundp.rea.gov.ng/api/applicant/application/create/projects/upload",
                        {
                          method: "POST",
                          body: formData,
                          headers: {
                            Authorization: "Bearer " + Pdata.user.user.token,
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((data) => {
                          setLoading(false);
                          if (data.status) {
                            formik.values.sworn_affidavits = data.data.url;
                            setSwornAf(true);
                            setAlert("Uplaoded Succefully");
                          } else {
                            setAlert(
                              "Something went wrong. Kindly Upload again"
                            );
                          }
                          setTimeout(() => {
                            setAlert("");
                          }, 2000);
                        });
                    }}
                    label="Sworn affidavits"
                  />
                  {formik.values.sworn_affidavits && (
                    <span className="uploaded_text">
                      Uploaded, replace by uploading new file
                    </span>
                  )}
                </div>
              </div>
              <div style={{ position: "relative" }}>
                <Input
                  onChange={(e) => {
                    // formik.values.uploads[index].file = "myUrlll";
                    const formData = new FormData();
                    const files = e.target.files;
                    files?.length && formData.append("file", files[0]);
                    setLoading(true);
                    // const response= await query({url:'/file',method:'POST',bodyData:formData})
                    fetch(
                      "https://api.grants.amp.gefundp.rea.gov.ng/api/applicant/application/create/projects/upload",
                      {
                        method: "POST",
                        body: formData,
                        headers: {
                          Authorization: "Bearer " + Pdata.user.user.token,
                        },
                      }
                    )
                      .then((res) => res.json())
                      .then((data) => {
                        setLoading(false);
                        if (data.status) {
                          formik.values.letter_of_authorization = data.data.url;
                          setLetter(true);
                          setAlert("Uplaoded Succefully");
                        } else {
                          setAlert("Something went wrong. Kindly Upload again");
                        }
                        setTimeout(() => {
                          setAlert("");
                        }, 2000);
                      });
                  }}
                  type="file"
                  // outlined
                  label="Board resolution and letter authorizing the joint venture/Consourtium"
                />
                {formik.values.letter_of_authorization && (
                  <span className="uploaded_text">
                    Uploaded, replace by uploading new file
                  </span>
                )}
              </div>
            </>
          )}

          <div
            style={{
              display: "flex",
              width: "50%",
              marginTop: 20,
              justifyContent: "flex-end",
              marginLeft: "auto",
            }}>
            <Button
              onClick={() => {
                setIsOpen(false);
              }}
              fontStyle={{
                color: "var(--primary)",
              }}
              style={{
                width: 134,
                backgroundColor: "#fff",
                border: "1px solid var(--primary)",
                marginRight: 15,
              }}
              label="Cancel"
            />
            <Button
              onClick={() => {
                const name = myFormData.get("sworn_affidavits");

                formik.handleSubmit();
              }}
              label={
                isJv
                  ? jvUpdate !== null
                    ? "Update Jv/Consourtium"
                    : "Add Jv/Consourtium"
                  : "Update"
              }
            />
          </div>
        </div>
      </Modal>
      <Modal
        className="modal"
        isOpen={modalIsOpen2}
        appElement={document.getElementById("root")}
        style={{
          content: {
            ...customStyles.content,
            overflowY: "hidden",
            overflow: "hidden",
          },
          overlay: customStyles.overlay,
        }}>
        <div className="inner_modal">
          <Alert text={alertText} />
          <Loading loading={loading} />
          <RegularText
            style={{ textAlign: "left", fontWeight: "bold", fontSize: 18 }}
            text="Change Password"
          />
          <div className="divider" />
          <Input
            value={oldPass}
            onChange={(e) => {
              setOldPass(e.target.value);
            }}
            label="Current Password"
            outlined
          />
          <div className="sub_input">
            <Input
              value={newPass}
              onChange={(e) => {
                setNewPass(e.target.value);
              }}
              label="New Password"
              outlined
              type="password"
            />
            <Input
              value={confPass}
              onChange={(e) => {
                setConfPass(e.target.value);
              }}
              label="Confirm new Password"
              outlined
              type="password"
            />
          </div>

          <div
            style={{
              display: "flex",
              width: "50%",
              marginTop: 20,
              justifyContent: "flex-end",
              marginLeft: "auto",
            }}>
            <Button
              onClick={() => {
                setIsOpen2(false);
              }}
              fontStyle={{
                color: "var(--primary)",
              }}
              style={{
                width: 134,
                backgroundColor: "#fff",
                border: "1px solid var(--primary)",
                marginRight: 15,
              }}
              label="Cancel"
            />
            <Button
              label="update"
              onClick={async () => {
                if (oldPass == "" || newPass == "" || confPass == "") {
                  setAlert("All fields are required");
                  setTimeout(() => {
                    setAlert("");
                  }, 2000);
                  return;
                }
                const values = {
                  current_password: oldPass,
                  password: newPass,
                  password_confirmation: confPass,
                };
                setLoading(true);
                const response = await query({
                  method: "POST",
                  url: "/api/applicant/reset",
                  bodyData: values,
                  token: Pdata.user.user.token,
                });
                setLoading(false);

                if (response.success) {
                  setAlert("Password successfully changed!");

                  setNewPass("");
                  setOldPass("");
                  setConfPass("");

                  setTimeout(() => {
                    setIsOpen2(false);
                  }, 2000);
                } else {
                  setAlert(response.data.message);
                }

                setTimeout(() => {
                  setAlert("");
                }, 3000);
              }}
            />
          </div>
        </div>
      </Modal> */}
    </div>
  );
}
