import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Modal from "react-modal";
import { FaWindowClose } from "react-icons/fa";
import { Header, RegularText } from "../../components/Common";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import query from "../../helpers/query";
import Loading from "../../components/Loading";
import { setJv, setUser } from "../../redux/user/userSlice";
import Warning from "./components/Tab5/notify";
import Alert from "../../components/Alert";
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

export default function Profile() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const programData = useSelector((state) => state);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const [allJvs, setAlljv] = useState([]);
  const [isJv, setIsJv] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [jvMail, setJvMail] = useState("");
  const [alertText, setAlert] = useState("");
  const [jvLoading, setJvLoading] = useState(false);
  const [jvUpdate, setIsJvUpdate] = useState(null);
  const [cacEvidence, setCaC] = useState(null);
  const [companyIncomeTax, setCompanyIncome] = useState(null);
  const [auditedAcc, setAudited] = useState(null);
  const [letterOfAuth, setLetter] = useState(null);
  const [swornAf, setSwornAf] = useState(null);
  const myFormData = new FormData();
  const Pdata = useSelector((state) => state);
  const getUserProfile = async () => {
    setJvLoading(true);
    const { success, data, error } = await query({
      method: "GET",
      url: "/api/applicant/profile",
      token: programData.user.user.token,
    });
    setJvLoading(false);
    if (success) {
      setAlljv(data.data.user.jvs);
      console.log(data.data.user);
    }
  };

  const initialValues = {
    name: "",
    address: "",
    person_incharge: "",
    phone: "",
    rc_number: "",
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      person_incharge: "",
      phone: "",
      rc_number: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      let route = isJv ? "profile/add/jv" : "profile/update";
      if (isJv) {
        values.email = jvMail;
      }
      if (isJv && jvUpdate !== null) {
        route = `profile/update/jv/${jvUpdate}`;
      }
      for (const key in values) {
        myFormData.append(key, values[key]);
      }

      const response = await fetch(
        `https://api.grants.amp.gefundp.rea.gov.ng/api/applicant/${route}`,
        {
          method: "POST",
          body: myFormData,
          headers: {
            Authorization: "Bearer " + Pdata.user.user.token,
          },
        }
      );
      const myData = await response.json();

      // const { success } = await query({
      //   method: "POST",
      //   url: `/api/applicant/${route}`,
      //   bodyData: values,
      //   token: programData.user.user.token,
      // });
      setLoading(false);
      if (myData.status) {
        formik.setValues(values);
        setIsOpen(false);
        if (isJv) {
          getUserProfile();
          if (jvUpdate !== null) {
            setAlert("Jv Updated Successfuly");
          } else {
            setAlert("Jv Added Successfuly");
          }

          setIsJv(false);
          setIsJvUpdate(null);
        } else {
          dispatch(
            setUser({
              user: {
                address: values.address,
                email: programData.user.user.email,
                id: programData.user.user.id,
                inCharge: values.person_incharge,
                isLoggedIn: true,
                name: values.name,
                phone: values.phone,
                rcNumber: values.rc_number,
                token: programData.user.user.token,
                username: programData.user.user.username,
              },
            })
          );
          setAlert("Updated successfully");
        }
      } else {
        setAlert("An error occured while updating");
      }
      setTimeout(() => {
        setAlert("");
      }, 2000);
    },
  });
  useEffect(() => {
    formik.setValues({
      address: programData.user.user.address,
      name: programData.user.user.name,
      person_incharge: programData.user.user.inCharge,
      phone: programData.user.user.phone,
      rc_number: programData.user.user.rcNumber,
    });
    getUserProfile();
  }, []);
  return (
    <div className="profile">
      <Loading loading={loading} />
      <Header text="Profile" />
      <span>
        In case of a Joint Venture or Consortium applicant: All parties must
        submit a board resolution and letter authorizing the joint venture or
        consortium.
      </span>

      <div className="profile_container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            textTransform: "uppercase",
            margin: "20px",
            borderBottom: "1px dashed #ccc",
            paddingBottom: 20,
            fontSize: 11,
          }}>
          <div>
            <span
              style={{
                color: "var(--primary)",
                marginLeft: 20,
                fontSize: 11,
                fontWeight: 900,
              }}>
              COMPANY OVERVIEW
            </span>
          </div>
          <div
            style={{ padding: "0 20px", fontWeight: 900, cursor: "pointer" }}>
            <span
              onClick={() => {
                setIsJv(false);
                setIsOpen(true);
              }}
              style={{ padding: "0 20px", fontWeight: 900 }}>
              UPDATE PROFILE
            </span>
            <span
              onClick={() => setIsOpen2(true)}
              style={{
                marginLeft: "auto",
                width: 100,
                paddingRight: 20,
                marginBottom: 20,
                marginTop: 20,
              }}>
              Change Password
            </span>
            <span
              onClick={() => {
                setIsJv(true);
                setIsOpen(true);
                formik.setValues(initialValues);
              }}>
              ADD JV/CONSORTIUM
            </span>
          </div>
        </div>

        <div style={{ margin: 30 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              textTransform: "uppercase",
              margin: "20px",
              borderBottom: "1px dashed #ccc",
              paddingBottom: 20,
              fontSize: 11,
            }}>
            <div className="lh-2">
              <h2 className="review_title" style={{ fontSize: 11 }}>
                Business name
              </h2>
              <p> {programData.user.user.name} </p>
            </div>

            <div className="lh-2">
              <h2 className="review_title" style={{ fontSize: 11 }}>
                RC Number
              </h2>
              <p>{programData.user.user.rcNumber} </p>
            </div>

            <div className="lh-2">
              <h2 className="review_title" style={{ fontSize: 11 }}>
                contact
              </h2>
              <p> {programData.user.user.email} </p>
              <p> {programData.user.user.phone} </p>
            </div>

            <div className="lh-2">
              <h2 className="review_title" style={{ fontSize: 11 }}>
                Authorized Personnel
              </h2>
              <p>
                {" "}
                {programData.user.user.inCharge
                  ? programData.user.user.inCharge
                  : "N/A"}{" "}
              </p>
            </div>
          </div>

          <div className="lh-2" style={{ marginLeft: 65 }}>
            <h2 className="review_title" style={{ fontSize: 11 }}>
              Company Address
            </h2>
            <p style={{ fontSize: 11, textTransform: "uppercase" }}>
              {" "}
              {programData.user.user.address}{" "}
            </p>
          </div>
        </div>

        {allJvs.length == 0 && !loading && (
          <span
            style={{
              color: "var(--primary)",
              fontSize: 18,
              textAlign: "center",
              fontWeight: 900,
              marginLeft: 40,
              cursor: "pointer",
            }}
            onClick={() => {
              setIsJv(true);
              setIsOpen(true);
              formik.setValues(initialValues);
            }}>
            ADD JOINT VENTURE/CONSOURTIUM
          </span>
        )}

        {allJvs.length > 0 && (
          <span
            style={{
              color: "var(--primary)",
              fontSize: 11,
              fontWeight: 900,
              marginLeft: 40,
            }}>
            JOINT VENTURE/CONSOURTIUM
          </span>
        )}
        {jvLoading && (
          <MoonLoader
            size={25}
            cssOverride={{ position: "absolute", left: "50%", top: "50%" }}
          />
        )}
        {allJvs.map((myJv, ind) => {
          return (
            <>
              <div style={{ margin: 30 }} key={ind}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textTransform: "uppercase",
                    margin: "20px 0",
                    borderBottom: "1px dashed #ccc",
                    paddingBottom: 20,
                    fontSize: 11,
                  }}>
                  <div className="prog-h">
                    <span
                      onClick={() => {
                        setIsJv(true);
                        setIsOpen(true);
                        setIsJvUpdate(myJv.id);
                        setJvMail(myJv.email);
                        formik.setValues({
                          address: myJv.address,
                          name: myJv.name,
                          phone: myJv.phone,
                          rc_number: myJv.rc_number,
                        });
                      }}
                      style={{
                        marginRight: 20,
                        cursor: "pointer",
                        color: "#5f3f3f",
                      }}>
                      Update
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    textTransform: "uppercase",
                    margin: "20px 0",
                    paddingBottom: 20,
                    fontSize: 11,
                  }}>
                  <div className="lh-2">
                    <h2 className="review_title" style={{ fontSize: 11 }}>
                      Business name
                    </h2>
                    <p> {myJv.name} </p>
                  </div>

                  <div className="lh-2">
                    <h2 className="review_title" style={{ fontSize: 11 }}>
                      RC Number
                    </h2>
                    <p>{myJv.rc_number} </p>
                  </div>

                  <div className="lh-2">
                    <h2 className="review_title" style={{ fontSize: 11 }}>
                      contact
                    </h2>
                    <p> {myJv.email}</p>
                    <p> {myJv.phone} </p>
                  </div>

                  <div className="lh-2">
                    <h2 className="review_title" style={{ fontSize: 11 }}>
                      Address
                    </h2>
                    <p> {myJv.address} </p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    textTransform: "uppercase",
                    margin: "20px 0",
                    paddingBottom: 20,
                    fontSize: 11,
                  }}>
                  <div className="lh-2">
                    <h2 className="review_title" style={{ fontSize: 11 }}>
                      JV CAC
                    </h2>
                    <p>Uploaded </p>
                  </div>

                  <div className="lh-2">
                    <h2 className="review_title" style={{ fontSize: 11 }}>
                      BOARD RESOLUTION
                    </h2>
                    <p>Uploaded </p>
                  </div>

                  <div className="lh-2">
                    <h2 className="review_title" style={{ fontSize: 11 }}>
                      SWORN AFFIDAVITS
                    </h2>
                    <p> Uploaded </p>
                  </div>

                  <div className="lh-2">
                    <h2 className="review_title" style={{ fontSize: 11 }}>
                      COMPANY INCOME TAX CLEARANCE CERTIFICATE
                    </h2>
                    <p> Uploaded </p>
                  </div>
                  <div className="lh-2">
                    <h2 className="review_title" style={{ fontSize: 11 }}>
                      3 YEARS AUDITED ACCOUNT
                    </h2>
                    <p> Uploaded </p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>

      {/* <Button
            onClick={() => setIsOpen2(true)}
            style={{
              marginLeft: "auto",
              width: 100,
              // backgroundColor: "lightcoral",
              marginBottom: 20,
              marginTop: 20,
            }}
            label="Change Password"
          /> */}

      <Modal
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
                      files?.length &&
                        formData.append("evidence_of_cac", files[0]);
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
                          console.log(res);
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
                  {formik.values.evidence_of_cac && (
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
                      files?.length &&
                        formData.append("company_income_tax", files[0]);
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
                      // formik.values.uploads[index].file = "myUrlll";
                      const files = e.target.files;
                      files?.length &&
                        myFormData.append("audited_account", files[0]);
                    }}
                    // onChange={(e) => {
                    //   const formData = new FormData();
                    //   const files = e.target.files;
                    //   files?.length &&
                    //     formData.append("audited_account", files[0]);
                    //   setLoading(true);
                    //   fetch(
                    //     "https://api.grants.amp.gefundp.rea.gov.ng/api/applicant/application/create/projects/upload",
                    //     {
                    //       method: "POST",
                    //       body: formData,
                    //       headers: {
                    //         Authorization: "Bearer " + Pdata.user.user.token,
                    //       },
                    //     }
                    //   )
                    //     .then((res) => res.json())
                    //     .then((data) => {
                    //       setLoading(false);
                    //       if (data.status) {
                    //         formik.values.audited_account = data.data.url;
                    //         setAudited(true);
                    //         setAlert("Uplaoded Succefully");
                    //       } else {
                    //         setAlert(
                    //           "Something went wrong. Kindly Upload again"
                    //         );
                    //       }
                    //       setTimeout(() => {
                    //         setAlert("");
                    //       }, 2000);
                    //     });
                    // }}
                    label="3 years audited account (2020,2021,2022)"
                  />
                  {formik.values.audited_account && (
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
                      files?.length &&
                        formData.append("sworn_affidavits", files[0]);
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
                    files?.length &&
                      formData.append("letter_of_authorization", files[0]);
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
                {formik.values.award_letter && (
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
      </Modal>
    </div>
  );
}
