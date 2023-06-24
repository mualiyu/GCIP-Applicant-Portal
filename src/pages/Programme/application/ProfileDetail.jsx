import React from "react";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";
import { Header, RegularText } from "../../../components/Common";
import "../../styles/profileDetail.css";
import { FieldArray, FormikProvider, useFormik } from "formik";
import Button from "../../../components/Button";
import AddButton from "../../../components/AddButton";
import DeleteButton from "../../../components/DeleteButton";
import { useSelector } from "react-redux";
import query from "../../../helpers/query";
import { useState } from "react";
import Loading from "../../../components/Loading";
import Alert from "../../../components/Alert";
import * as Yup from "yup";
import { useEffect } from "react";
import { useMemo } from "react";
import { Fade } from "react-awesome-reveal";
import Documents from "./Documents";
import Warning from "../components/Tab5/notify";
import nProgress from "nprogress";
import Modal from "react-modal";

export default function ProfileDetail({ moveToTab }) {
  const data = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [alertText, setAlert] = useState("");
  const [started, setStarted] = useState(false);
  const [isParent, setIsparent] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [isContact, setIsContact] = useState(false);
  const [director, setDirectors] = useState({
    name: "",
    phone: "",
  });

  const [contact, setContacts] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const getData = async () => {
    nProgress.start();

    const respone = await query({
      method: "GET",
      url: `/api/applicant/application/get?program_id=${data.program.id}`,
      token: data.user.user.token,
    });
    nProgress.done();

    if (respone.success) {
      if (respone.data.data.application.application_profile.length) {
        formik.setValues({
          applicant_name:
            respone.data.data.application.application_profile[0].name,
          date_of_incorporation:
            respone.data.data.application.application_profile[0]
              .registration_date,
          brief_description:
            respone.data.data.application.application_profile[0].description,
          website: respone.data.data.application.application_profile[0].website,
          share_holders:
            respone.data.data.application.application_profile[0].share_holders,

          ultimate_owner:
            respone.data.data.application.application_profile[0].owner,
          contact_person:
            respone.data.data.application.application_profile[0]
              .contact_persons,
        });

        setAlert("Continue with your previous application");
        setStarted(true);
        setTimeout(() => {
          setAlert("");
        }, 2000);
      }

      // setCurrent(data.data.application);
    }
  };
  const initialValues = {
    applicant_name: "",
    date_of_incorporation: "",
    brief_description: "",
    website: "none",
    share_holders: [],
    ultimate_owner: "",
    contact_person: [],
    // { name: "", phone: "" }
    // { name: "", phone: "", email: "", address: "" }
  };
  const validationSchema = Yup.object({
    applicant_name: Yup.string().required(),
    date_of_incorporation: Yup.string().required(),
    brief_description: Yup.string().required(),
    share_holders: Yup.array().required(),
    ultimate_owner: Yup.string().required(),
    contact_person: Yup.array().required(),
  });
  const formik = useFormik({
    initialValues,

    onSubmit: async (val) => {
      // if (started) {
      //   moveToTab(4);
      //   return;
      // }
      const bodyData = {
        application_id: data.applicant.application.id,
        authorised_personel: data.user.user.inCharge,
        update: started ? "1" : "0",
        ...val,
      };

      setLoading(true);
      const response = await query({
        method: "POST",
        url: "/api/applicant/application/create/profile",
        token: data.user.user.token,
        bodyData,
      });

      if (response.success) {
        // dispatch(setApplication(response.data.data.application));
        setAlert("Data saved");
        moveToTab(4);
      } else {
        setAlert("Cannot proceed without submitting required imformation");
      }
      setTimeout(() => {
        setAlert("");
      }, 2000);
    },
  });

  const saveData = async () => {
    const bodyData = {
      application_id: data.applicant.application.id,
      authorised_personel: data.user.user.inCharge,
      update: started ? "1" : "0",
      ...formik.values,
    };
    // const filtered = formik.values.share_holders.filter(
    //   (sh) => sh.name == "" || sh.phone == ""
    // );
    // const filtered2 = formik.values.contact_person.filter(
    //   (sh) =>
    //     sh.name == "" || sh.phone == "" || sh.email == "" || sh.address == ""
    // );
    // if (filtered.length || filtered2.length) {
    //   setAlert("Directors data and Contact person data is required");
    //   setTimeout(() => {
    //     setAlert("");
    //   }, 4000);
    //   return;
    // }
    // if (formik.values.contact_person.length == 0) {
    //   setAlert("Directors data and Contact person data is required");
    //   setTimeout(() => {
    //     setAlert("");
    //   }, 4000);
    //   return;
    // }
    // if (formik.values.share_holders.length == 0) {
    //   setAlert("Directors data and Contact person data is required");
    //   setTimeout(() => {
    //     setAlert("");
    //   }, 4000);
    //   return;
    // }
    setLoading(true);
    const response = await query({
      method: "POST",
      url: "/api/applicant/application/create/profile",
      token: data.user.user.token,
      bodyData,
    });
    setLoading(false);
    if (response.success) {
      // dispatch(setApplication(response.data.data.application));
      setAlert("Data saved");
      // moveToTab(4);
    } else {
      setAlert("Cannot proceed without submitting required imformation");
    }
    setTimeout(() => {
      setAlert("");
    }, 2000);
  };
  const nextMove = async () => {
    const bodyData = {
      application_id: data.applicant.application.id,
      authorised_personel: data.user.user.inCharge,
      update: started ? "1" : "0",
      ...formik.values,
    };
    // const filtered = formik.values.share_holders.filter(
    //   (sh) => sh.name == "" || sh.phone == ""
    // );
    // const filtered2 = formik.values.contact_person.filter(
    //   (sh) =>
    //     sh.name == "" || sh.phone == "" || sh.email == "" || sh.address == ""
    // );
    // if (filtered.length || filtered2.length) {
    //   setAlert("Directors data and Contact person data is required");
    //   setTimeout(() => {
    //     setAlert("");
    //   }, 4000);
    //   return;
    // }
    // if (formik.values.contact_person.length == 0) {
    //   setAlert("Directors data and Contact person data is required");
    //   setTimeout(() => {
    //     setAlert("");
    //   }, 4000);
    //   return;
    // }
    // if (formik.values.share_holders.length == 0) {
    //   setAlert("Directors data and Contact person data is required");
    //   setTimeout(() => {
    //     setAlert("");
    //   }, 4000);
    //   return;
    // }
    setLoading(true);
    const response = await query({
      method: "POST",
      url: "/api/applicant/application/create/profile",
      token: data.user.user.token,
      bodyData,
    });

    if (response.success) {
      // dispatch(setApplication(response.data.data.application));
      setAlert("Data saved");
      moveToTab(4);
    } else {
      setAlert("Application failed, please try again");
    }
    setTimeout(() => {
      setAlert("");
    }, 2000);
  };

  useEffect(() => {
    getData();
    console.log(data.program.id, "issss");
  }, []);

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
  return (
    <div className="profile_detail_container">
      <Loading loading={loading} />
      <Alert text={alertText} />
      <FormikProvider value={formik}>
        <div className="sub_input">
          <Input
            required
            error={
              formik.touched.applicant_name && formik.errors.applicant_name
                ? formik.errors.applicant_name
                : ""
            }
            onChange={formik.handleChange}
            name="applicant_name"
            outlined
            label="Applicant Name"
            value={formik.values.applicant_name}
          />
          <Input
            required
            style={{ width: "100%" }}
            value={formik.values.date_of_incorporation}
            error={
              formik.touched.date_of_incorporation &&
              formik.errors.date_of_incorporation
                ? formik.errors.date_of_incorporation
                : ""
            }
            onChange={formik.handleChange}
            name="date_of_incorporation"
            outlined
            type="date"
            label="Date of incorporation/registration"
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 30,
          }}
        >
          <h3>Have a parent company?</h3>
          <input
            onChange={(e) => {
              setIsparent(e.target.checked);
            }}
            type="checkbox"
          />
        </div>
        {isParent && (
          <Fade>
            <Input
              value={formik.values.ultimate_owner}
              error={
                formik.touched.ultimate_owner && formik.errors.ultimate_owner
                  ? formik.errors.ultimate_owner
                  : ""
              }
              onChange={formik.handleChange}
              name="ultimate_owner"
              outlined
              label="Ultimate parent company or owner"
            />
          </Fade>
        )}
        <div
          style={{
            display: "flex",
            marginTop: 50,
          }}
        >
          <span>DIRECTORS INFORMATION -</span>
          <span
            onClick={() => setModalOpen(true)}
            style={{
              color: "var(--primary)",
              marginLeft: 20,
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            ADD NEW DIRECTOR
          </span>
        </div>
        <div
          style={{
            borderStyle: "dashed",
            height: 0.001,
            backgroundColor: "transparent",
            borderWidth: 0.1,
            width: "100%",
          }}
          className="divider"
        />

        <table className="home_table">
          {formik.values.share_holders.length > 0 && (
            <thead>
              <tr>
                <th>S/N</th>
                <th>DIRECTOR</th>
                <th>TELEPHONE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
          )}
          <tbody>
            <FieldArray
              name="share_holders"
              render={(arrayHelpers) => {
                const stakeHolders = formik.values.share_holders;
                return (
                  <>
                    {stakeHolders.length > 0 &&
                      stakeHolders.map((stk, ind) => (
                        <tr key={ind.toString()}>
                          <td>{ind + 1}</td>
                          <td>{stk.name}</td>
                          <td>{stk.phone}</td>
                          <td>
                            <DeleteButton
                              label=""
                              onClick={() => {
                                arrayHelpers.remove(ind);
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                  </>
                );
              }}
            />

            {formik.values.share_holders.length == 0 && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 20,
                }}
              >
                {/* <img id="empty" src="/38.png" /> */}
                <span id="empty">No Directors addedd!</span>
              </div>
            )}
          </tbody>
        </table>

        <div
          style={{
            display: "flex",
            marginTop: 50,
          }}
        >
          <span>CONTACT PERSONS -</span>
          <span
            onClick={() => {
              setIsContact(true);
              setModalOpen(true);
            }}
            style={{
              color: "var(--primary)",
              marginLeft: 20,
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            ADD NEW CONTACT PERSON
          </span>
        </div>
        <div
          style={{
            borderStyle: "dashed",
            height: 0.001,
            backgroundColor: "transparent",
            borderWidth: 0.1,
            width: "100%",
          }}
          className="divider"
        />

        <table className="home_table">
          {formik.values.contact_person.length > 0 && (
            <thead>
              <tr>
                <th>S/N</th>
                <th>CONTACT PERSON</th>
                <th>TELEPHONE</th>
                <th>EMAIL</th>
                <th>ADDRESS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
          )}
          <tbody>
            <FieldArray
              name="contact_person"
              render={(arrayHelpers) => {
                const contacts = formik.values.contact_person;
                return (
                  <>
                    {contacts.length > 0 &&
                      contacts.map((stk, ind) => (
                        <tr key={ind.toString()}>
                          <td>{ind + 1}</td>
                          <td>{stk.name}</td>
                          <td>{stk.phone}</td>
                          <td>{stk.email}</td>
                          <td>{stk.address}</td>
                          <td>
                            <DeleteButton
                              label=""
                              onClick={() => {
                                arrayHelpers.remove(ind);
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                  </>
                );
              }}
            />

            {formik.values.contact_person.length == 0 && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 20,
                }}
              >
                <img id="empty" src="/38.png" />
                <span id="empty">No Contacts addedd!</span>
              </div>
            )}
          </tbody>
        </table>
      </FormikProvider>
      <Documents nextRun={nextMove} saveData={saveData} />

      <Modal
        isOpen={modalOpen}
        appElement={document.getElementById("root")}
        style={customStyles}
      >
        {!isContact && (
          <div
            className="director_form"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Header text="ADD DIRECTOR" />
            <span style={{ color: "#898989", marginTop: 10 }}>
              Add Directors to Hooli Group of Companies
            </span>
            <div className="sub_input">
              <Input
                onChange={(e) => {
                  setDirectors({
                    ...director,
                    name: e.target.value,
                  });
                }}
                outlined
                label="Director"
                required
              />
              <Input
                onChange={(e) => {
                  setDirectors({
                    ...director,
                    phone: e.target.value,
                  });
                }}
                outlined
                label="Phone"
                required
              />
            </div>

            <div
              style={{
                display: "flex",
                width: "50%",
                marginTop: 20,
                justifyContent: "space-between",
                marginLeft: "auto",
              }}
            >
              <Button
                onClick={() => {
                  setModalOpen(false);
                }}
                fontStyle={{
                  color: "var(--primary)",
                }}
                style={{
                  width: 134,
                  backgroundColor: "#fff",
                  border: "1px solid var(--primary)",
                }}
                label="Cancel"
              />
              <Button
                disabled={director.name == "" || director.phone == ""}
                onClick={() => {
                  const newArray = formik.values.share_holders;

                  newArray.push(director);

                  formik.setValues({
                    ...formik.values,
                    share_holders: newArray,
                  });
                  setDirectors({
                    name: "",
                    phone: "",
                  });
                  setModalOpen(false);
                }}
                label="Save"
              />
            </div>
          </div>
        )}

        {isContact && (
          <div
            className="director_form"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Header text="ADD CONTACT PERSON" />
            <span style={{ color: "#898989", marginTop: 10 }}>
              Add a Contact Person to Hooli Group of Companies
            </span>
            <div
              style={{
                gridTemplateColumns: "1fr 1fr 1fr",
              }}
              className="sub_input"
            >
              <Input
                onChange={(e) => {
                  setContacts({
                    ...contact,
                    name: e.target.value,
                  });
                }}
                outlined
                label="CONTACT PERSON"
                required
              />
              <Input
                onChange={(e) => {
                  setContacts({
                    ...contact,
                    phone: e.target.value,
                  });
                }}
                outlined
                label="TELEPHONE"
                required
              />
              <Input
                onChange={(e) => {
                  setContacts({
                    ...contact,
                    email: e.target.value,
                  });
                }}
                outlined
                label="EMAL"
                required
              />
            </div>
            <TextArea
              onChange={(e) => {
                setContacts({
                  ...contact,
                  address: e.target.value,
                });
              }}
              required
              outlined
              label="ADDRESS"
            />

            <div
              style={{
                display: "flex",
                width: "50%",
                marginTop: 20,
                justifyContent: "space-between",
                marginLeft: "auto",
              }}
            >
              <Button
                onClick={() => {
                  setIsContact(false);
                  setModalOpen(false);
                }}
                fontStyle={{
                  color: "var(--primary)",
                }}
                style={{
                  width: 134,
                  backgroundColor: "#fff",
                  border: "1px solid var(--primary)",
                }}
                label="Cancel"
              />
              <Button
                disabled={
                  contact.name == "" ||
                  contact.phone == "" ||
                  contact.address == "" ||
                  contact.email == ""
                }
                onClick={() => {
                  const newArray = formik.values.contact_person;

                  newArray.push(contact);

                  formik.setValues({
                    ...formik.values,
                    contact_person: newArray,
                  });
                  setContacts({
                    name: "",
                    phone: "",
                    email: "",
                    address: "",
                  });
                  setIsContact(false);
                  setModalOpen(false);
                }}
                label="Save"
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
