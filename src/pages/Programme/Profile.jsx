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

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "40%",
    height: "80vh",
    overflowY: "scroll",
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
        <div className="profile_buttons">
          <span
            onClick={() => {
              setIsJv(false);
              setIsOpen(true);
            }}
          >
            UPDATE PROFILE
          </span>
          <span
            onClick={() => {
              setIsJv(true);
              setIsOpen(true);
              formik.setValues(initialValues);
            }}
          >
            ADD JV/CONSORTIUM
          </span>
        </div>
        <span
          style={{
            color: "var(--primary)",
            marginLeft: 20,
          }}
        >
          COMPANY OVERVIEW
        </span>
        <div className="main_prof_details">
          <div>
            <h4>Company Name</h4>
            <span
              style={{
                color: "#514F4F",
              }}
            >
              {programData.user.user.name}
            </span>
          </div>

          <div>
            <h4>RC Number</h4>
            <span
              style={{
                color: "#514F4F",
              }}
            >
              {programData.user.user.rcNumber}
            </span>
          </div>

          <div>
            <h4>Email</h4>
            <span
              style={{
                color: "#514F4F",
              }}
            >
              {programData.user.user.email}
            </span>
          </div>

          <div>
            <h4>Authorised Personel</h4>
            <span
              style={{
                color: "#514F4F",
              }}
            >
              {programData.user.user.inCharge}
            </span>
          </div>

          <div>
            <h4>Company Address</h4>
            <span
              style={{
                color: "#514F4F",
              }}
            >
              {programData.user.user.address}
            </span>
          </div>

          <div>
            <h4>Phone</h4>
            <span
              style={{
                color: "#514F4F",
              }}
            >
              {programData.user.user.phone}
            </span>
          </div>
        </div>

        {jvLoading && <img src="/loading.gif" id="loader" />}
        {allJvs.map((myJv, ind) => {
          return (
            <div
              style={{
                marginTop: 30,
              }}
              key={ind}
              className="profile_detail"
            >
              <div className="prog-h">
                <span
                  style={{
                    color: "var(--primary)",
                    marginLeft: 20,
                  }}
                >
                  JOINT VENTURE
                </span>

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
                    color: "var(--primary)",
                    marginRight: 20,
                    cursor: "pointer",
                    color: "#5f3f3f",
                  }}
                >
                  Update
                </span>
              </div>
              <div className="main_prof_details">
                <div>
                  <h4>Name</h4>
                  <span
                    style={{
                      color: "#514F4F",
                    }}
                  >
                    {myJv.name}
                  </span>
                </div>

                <div>
                  <h4>Email</h4>
                  <span
                    style={{
                      color: "#514F4F",
                    }}
                  >
                    {myJv.email}
                  </span>
                </div>

                <div>
                  <h4>Address</h4>
                  <span
                    style={{
                      color: "#514F4F",
                    }}
                  >
                    {myJv.address}
                  </span>
                </div>

                <div>
                  <h4>RC Number</h4>
                  <span
                    style={{
                      color: "#514F4F",
                    }}
                  >
                    {myJv.rc_number}
                  </span>
                </div>

                <div>
                  <h4>Phone</h4>
                  <span
                    style={{
                      color: "#514F4F",
                    }}
                  >
                    {myJv.phone}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Button
        onClick={() => {
          setIsOpen2(true);
        }}
        style={{
          marginLeft: "auto",
          width: 100,
          backgroundColor: "lightcoral",
          marginBottom: 20,
          marginTop: 20,
        }}
        label="Change Password"
      />

      <Modal
        className="modal"
        isOpen={modalIsOpen}
        appElement={document.getElementById("root")}
        style={customStyles}
      >
        <div className="inner_modal">
          <FaWindowClose
            onClick={() => {
              setIsOpen(false);
            }}
            style={{ fontSize: 30, cursor: "pointer", marginLeft: "auto" }}
          />
          <RegularText
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
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
              className="sub-group"
            >
              <div>
                <label>Joint venture</label>
                <input name="company_type" type="radio" />
              </div>
              <div>
                <label>Consourtium</label>
                <input name="company_type" type="radio" />
              </div>
            </div>
          ) : null}

          <Input
            outlined
            value={formik.values.name}
            name="name"
            onChange={formik.handleChange}
            label="Company Name"
          />
          <Input
            outlined
            value={formik.values.rc_number}
            name="rc_number"
            onChange={formik.handleChange}
            label="RC Number"
          />
          {isJv && (
            <Input
              type="email"
              onChange={(e) => {
                setJvMail(e.target.value);
              }}
              outlined
              label="Email"
              value={jvMail}
            />
          )}
          <Input
            type="tel"
            outlined
            value={formik.values.phone}
            name="phone"
            onChange={formik.handleChange}
            label="Phone Number"
          />
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
            <RegularText style={{ fontWeight: "bold" }} text="Address" />
            <textarea
              value={formik.values.address}
              name="address"
              onChange={formik.handleChange}
              rows={5}
            />
          </div>
          {/* <Input
            outlined
            value={formik.values.address}
            name="address"
            onChange={formik.handleChange}
            required
            label="Address"
            placeholder="sample"
          /> */}
          {isJv && (
            <>
              <Input
                type="file"
                outlined
                onChange={(e) => {
                  // formik.values.uploads[index].file = "myUrlll";

                  const files = e.target.files;
                  files?.length &&
                    myFormData.append("evidence_of_cac", files[0]);
                }}
                label="Evidence of CAC Registration (CAC forms 1.1, CO2, and CO7)"
              />
              <Input
                type="file"
                outlined
                onChange={(e) => {
                  // formik.values.uploads[index].file = "myUrlll";

                  const files = e.target.files;
                  files?.length &&
                    myFormData.append("company_income_tax", files[0]);
                }}
                label="Company Income Tax (2020,2021,2022)"
              />
              <Input
                type="file"
                outlined
                onChange={(e) => {
                  // formik.values.uploads[index].file = "myUrlll";

                  const files = e.target.files;
                  files?.length &&
                    myFormData.append("audited_account", files[0]);
                }}
                label="3 years audited account (2020,2021,2022)"
              />
              <Input
                onChange={(e) => {
                  // formik.values.uploads[index].file = "myUrlll";

                  const files = e.target.files;
                  files?.length &&
                    myFormData.append("letter_of_authorization", files[0]);
                }}
                type="file"
                outlined
                label="Board resolution and letter authorizing the joint venture/Consourtium"
              />
              <Input
                type="file"
                outlined
                onChange={(e) => {
                  // formik.values.uploads[index].file = "myUrlll";

                  const files = e.target.files;
                  files?.length &&
                    myFormData.append("sworn_affidavits", files[0]);
                }}
                label="Sworn affidavits"
              />
            </>
          )}
          <Button
            onClick={() => {
              const name = myFormData.get("sworn_affidavits");

              formik.handleSubmit();
            }}
            style={{ width: "50%", marginTop: 20 }}
            label={
              isJv
                ? jvUpdate !== null
                  ? "Update Jv/Consourtium"
                  : "Add Jv/Consourtium"
                : "Update"
            }
          />
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
        }}
      >
        <div className="inner_modal">
          <Alert text={alertText} />
          <Loading loading={loading} />
          <FaWindowClose
            onClick={() => {
              setIsOpen2(false);
            }}
            style={{ fontSize: 30, cursor: "pointer", marginLeft: "auto" }}
          />
          <RegularText
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
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
          <Input
            value={newPass}
            onChange={(e) => {
              setNewPass(e.target.value);
            }}
            label="New Password"
            outlined
          />
          <Input
            value={confPass}
            onChange={(e) => {
              setConfPass(e.target.value);
            }}
            label="Confirm new Password"
            outlined
          />

          <Button
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
            label="Update Password"
            style={{
              width: 100,
              marginTop: 20,
            }}
          />
        </div>
      </Modal>
    </div>
  );
}
