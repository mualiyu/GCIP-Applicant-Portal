import React, { useState } from "react";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import { FieldArray, FormikProvider, useFormik } from "formik";
import AddButton from "../../../components/AddButton";
import DeleteButton from "../../../components/DeleteButton";
import Button from "../../../components/Button";
import { Header, RegularText } from "../../../components/Common";
import Modal from "react-modal";
import { FaCheck, FaEdit, FaPencilAlt, FaWindowClose } from "react-icons/fa";

import { CancelIcon, DeleteIcon } from "../../../assets/Svg/Index";
import Loading from "../../../components/Loading";
import { FaFolderOpen } from "react-icons/fa";
import Alert from "../../../components/Alert";
import { useSelector } from "react-redux";
import MyModal from "../../../components/MyModal";
import { MoonLoader } from "react-spinners";
import { AiFillCloseSquare } from "react-icons/ai";
import query from "../../../helpers/query";
import * as Yup from "yup";
import { useEffect } from "react";
import Reference from "./Reference";
import Warning from "../components/Tab5/notify";
import { Fade } from "react-awesome-reveal";
import nProgress from "nprogress";
import TextArea from "../../../components/TextArea";
import { setActiveTab } from "../../../redux/applicant/applicantSlice";
import { json } from "react-router-dom";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "90vh",
    minWidth: "60vw",
    overflowX: "hidden",
    maxWidth: "70vw",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

export default function StaffDetail({ moveToTab, makeDone }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [allStaff, setAllStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [alertText, setAlert] = useState("");
  const [started, setStarted] = useState(false);
  const data = useSelector((state) => state);
  const [editIndex, setEdit] = useState(null);
  const [isAmember, setIsMember] = useState(false);
  const [appProfileId, setAppProfileId] = useState(null);
  const initialValues = {
    name: "",
    gender: "",
    coren_license_number: "",
    coren_license_document: "",
    language: "",
    employer: [
      {
        name: "p",
        start_date: "",
        end_date: "",
        position: "",
        description: "",
      },
    ],
    current_position: {
      position: "",
      start_date: "",
      description: "",
    },
    cv: "",
    nationality: "",
    education: [
      {
        qualification: "",
        course: "",
        start_date: "",
        end_date: "",
        school: "",
      },
    ],
    membership: "0",
    training: [{ course: "", date: "" }],
    countries_experience: "",
    work_undertaken: "",
    education_certificate: "",
    professional_certificate: "",
    website: "",
    brief_description: "",
  };
  const formik2 = useFormik({
    initialValues: {
      profile: {
        application_profile_id: appProfileId,
        brief_description: "",
        website: "",
        evidence_of_equipment_ownership: "",
      },
    },
    onSubmit: (val) => {},
  });

  const genderOptions =[
    { name: "Male", value: "male" },
    { name: "Female", value: "female" }
  ];

  const getData = async () => {
    nProgress.start();
    setLoading(true);
    const respone = await query({
      method: "GET",
      url: `/api/applicant/application/get?program_id=${data.program.id}`,
      token: data.user.user.token,
    });
    setLoading(false);
    nProgress.done();

    if (respone.success) {
      console.log(respone.data.data.application, "popopo");
      setAppProfileId(respone.data.data.application?.application_profile[0]?.id);
      formik2.setValues({
        profile: {
          application_profile_id:
            respone.data.data.application.application_profile[0].id,
          brief_description:
            respone.data.data.application.application_profile[0].description,
          website: respone.data.data.application.application_profile[0].website,
          evidence_of_equipment_ownership:
            respone.data.data.application.application_profile[0]
              .evidence_of_equipment_ownership,
        },
      });
      console.log(respone.data.data.application.application_staff, "pppa");
      if (respone.data.data.application.application_staff.length) {
        setAlert("Continue with your previous application");
        setStarted(true);
        respone.data.data.application.application_staff.map(
          (stf) => (stf.employer = stf.employers)
        );
        respone.data.data.application.application_staff.map(
          (stf) => (stf.education = stf.educations)
        );
        respone.data.data.application.application_staff.map(
          (stf) => (stf.membership = stf.memberships)
        );
        respone.data.data.application.application_staff.map(
          (stf) => (stf.training = stf.trainings)
        );
        // respone.data.data.application.application_staff.map((stf) => {
        //   stf.education.map((ed) => {
        //     ed.start_date = ed.start;
        //     ed.end_date = ed.end;
        //   });
        // });
        respone.data.data.application.application_staff.map((stf) => {
          stf.employer.map((em) => {
            em.start_date = em.start;
            em.end_date = em.end;
          });
        });
        setAllStaff([...respone.data.data.application.application_staff]);
        console.log(allStaff);
        setTimeout(() => {
          setAlert("");
        }, 2000);
      }

      // setCurrent(data.data.application);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    gender: Yup.string().required(),
    language: Yup.string().required(),
    employer: Yup.array().required(),
    nationality: Yup.string().required(),
    education: Yup.array().required(),
    membership: Yup.array().required(),
    training: Yup.array().required(),
    education_certificate: Yup.string().required(),
    professional_certificate: Yup.string().required(),
  });
  const formik = useFormik({
    initialValues,

    onSubmit: (val) => {
      const employersFilter = val.employer.filter(
        (em) =>
          em.name == "" ||
          em.description == "" ||
          em.position == "" ||
          em.start_date == ""
          
      );
      if (
        val.name == "" ||
        val.current_position.position == "" ||
        val.current_position.start_date == ""
      ) {
        setAlert("Name and current position is required");
        setTimeout(() => {
          setAlert("");
        }, 4000);
        return;
      }
      if (employersFilter.length) {
        formik.values.employer = [];
      }
      if (editIndex == null) {
        setAllStaff((prev) => [...prev, formik.values]);
        console.log(allStaff);
        formik.resetForm();
        setIsOpen(false);
      } else {
        const currentStaff = [...allStaff];
        currentStaff[editIndex] = formik.values;
        setAllStaff(currentStaff);
        console.log(allStaff);
        formik.resetForm();
        setIsOpen(false);
        setEdit(null);
      }
    },
  });
  const saveData = async () => {
    const bodyData = {
      application_id: data.applicant.application.id,
      staff: allStaff,
      update: started ? "1" : "0",
    };
    const bodyData2 = {
      application_id: data.applicant.application.id,
      application_profile_id: appProfileId,
      brief_description: formik2.values.profile.brief_description,
      website: formik2.values.profile.website,
      evidence_of_equipment_ownership:
        formik2.values.profile.evidence_of_equipment_ownership,
    };
    if (allStaff.length == 0) {
      setAlert("At lease one staff reqiured");
      setTimeout(() => {
        setAlert("");
      }, 3000);
      return;
    }
    if (formik2.values.profile.brief_description == "") {
      setAlert("company description is required");
      setTimeout(() => {
        setAlert("");
      }, 3000);
      return;
    }

    setLoading(true);
    const response = await query({
      method: "POST",
      url: "/api/applicant/application/create/staff",
      token: data.user.user.token,
      bodyData,
    });
    const response2 = await query({
      method: "POST",
      url: "/api/applicant/application/update/profile",
      token: data.user.user.token,
      bodyData: bodyData2,
    });

    setLoading(false);
    if (response2.success) {
      setAlert("Data saved");
      // moveToTab(5);
      // if (response2.success) {

      // } else {

      //   // dispatch(setApplication(response.data.data.application));
      // }
    } else {
      setAlert("Application failed, please try again");
    }
    setTimeout(() => {
      setAlert("");
    }, 2000);
  };

  const nextMove = async () => {
    // if (started) {
    // allStaff.map((staf,ind)=>{
    //   const isIncluded=staf.employers?.length
    //   if (isIncluded) {
    //     staf.employer=sta.employers
    //   }
    // })
    // }
    const bodyData = {
      application_id: data.applicant.application.id,
      staff: allStaff,
      update: started ? "1" : "0",
    };
    const bodyData2 = {
      application_id: data.applicant.application.id,
      application_profile_id: appProfileId,
      brief_description: formik2.values.profile.brief_description,
      website: formik2.values.profile.website,
      evidence_of_equipment_ownership:
        formik2.values.profile.evidence_of_equipment_ownership,
    };

    if (allStaff.length == 0) {
      setAlert("At least one staff is required");
      setTimeout(() => {
        setAlert("");
      }, 3000);
      moveToTab(5);
      return;
    }
    if (formik2.values.profile.brief_description == "") {
      setAlert("company description is required");
      setTimeout(() => {
        setAlert("");
      }, 3000);
      moveToTab(5);
      return;
    }

    setLoading(true);
    const response = await query({
      method: "POST",
      url: "/api/applicant/application/create/staff",
      token: data.user.user.token,
      bodyData,
    });
    const response2 = await query({
      method: "POST",
      url: "/api/applicant/application/update/profile",
      token: data.user.user.token,
      bodyData: bodyData2,
    });

    setLoading(false);
    if (response2.success) {
      setAlert("Data saved");

      moveToTab(5);
      makeDone(5);
      // if (response2.success) {

      // } else {

      //   // dispatch(setApplication(response.data.data.application));
      // }
    } else {
      setAlert("Application failed, please try again");
    }
    setTimeout(() => {
      setAlert("");
    }, 2000);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="staff_detail_cont">
      {loading && (
        <MoonLoader
          size={25}
          cssOverride={{ position: "absolute", left: "50%", top: "50%" }}
        />
      )}

      {!loading && (
        <>
          <Warning msg="Applicant’s company profile showing capacity in renewable energy, off-grid, or rural electrification, agricultural facilities and productive use ventures including evidence of ownership or lease of relevant equipment for project execution e.g., Side Drop Crane, Pick Up Van, Test Equipment, etc. (Please attach proof of ownership or lease agreement where applicable)." />

          <TextArea
            value={formik2.values.profile.brief_description}
            onChange={formik2.handleChange}
            name="profile.brief_description"
            label="DESCRIPTION OF BUSINESS"
            required
            outlined
          />

          <div className="sub_input">
            <Input
              value={formik2.values.profile.website}
              onChange={formik2.handleChange}
              name="profile.website"
              outlined
              label="Website link if any?"
            />
            {/* <Input
              type="file"
              onChange={(e) => {
                const formData = new FormData();
                const files = e.target.files;
                files?.length && formData.append("file", files[0]);
                setLoading(true);
                fetch(
                  "https://api.grants.amp.gefundp.rea.gov.ng/api/applicant/application/create/profile/upload",
                  {
                    method: "POST",
                    body: formData,
                    headers: {
                      Authorization: "Bearer " + data.user.user.token,
                    },
                  }
                )
                  .then((res) => res.json())
                  .then((data) => {
                    setLoading(false);
                    if (data.status) {
                      formik2.values.profile.evidence_of_equipment_ownership =
                        data.data.url;
                      setAlert("Uplaoded Succefully");
                    } else {
                      setAlert("Something went wrong. Kindly Upload again");
                    }
                    setTimeout(() => {
                      setAlert("");
                    }, 2000);
                  })
                  .catch(() => {
                    setLoading(false);
                  });
              }}
              label="Evidence of equipment leasing/ownership"
            /> */}
          </div>
          {formik2.values.profile.evidence_of_equipment_ownership && (
            <span style={{ marginTop: 20,position: 'absolute', top: '30%', right: '10%', fontSize: 9 }} >
              **Uploaded**
            </span>
          )}
        </>
      )}

      {!loading && (
        <>
         
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 13,
            }}
          >
            <span>COMPANY EMPLOYEES -</span>
            <span
              onClick={() => {
                setIsOpen(true);
                setEdit(null);
              }}
              style={{
                color: "var(--primary)",
                marginLeft: 20,
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              ADD NEW EMPLOYEE
            </span>
          </div>
          <Warning msg="CVs of 5 key personnels of the applicant comprising of 3 experts (at least 1 female and 1 being a COREN registered Electrical Engineer) with a minimum of 5 years’ experience relevant to design, building, operations, and maintenance of solar PV minigrid; and 2 experts (at least 1 female) with a minimum of 3 years’ experience relevant to the implementation of solar powered equipment in agriculture value chain." />

          <div
            style={{
              borderStyle: "dashed",
              height: 0.001,
              backgroundColor: "transparent",
              borderWidth: 0.1,
              width: "90%",
            }}
            className="divider"
          />
          {loading && (
            <MoonLoader
              size={25}
              cssOverride={{ position: "absolute", left: "50%", top: "50%" }}
            />
          )}
          <Alert text={alertText} />

          {allStaff.length == 0 && !loading2 && (
            <div
              style={{
                width: "100%",
                textAlign: "center",
                flexDirection: "column",
                marginTop: "7%",
              }}
            >
              <FaFolderOpen />
              <span id="empty">
                {" "}
                Oops! No Staff added yet..{" "}
                <span
                  style={{
                    color: "var(--primary)",
                    marginLeft: 20,
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  Add a New Staff
                </span>{" "}
              </span>
            </div>
          )}

          {allStaff.length > 0 && (
            <table className="home_table">
              <>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Name</th>
                    <th>Gender</th>
                    {/* <th>Membership</th> */}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>

                  {allStaff.length &&
                    allStaff.map((stf, ind) => (
                      <tr key={ind.toString()}>
                        <td>{ind + 1}</td>
                        <td>{stf.name}</td>
                        <td>{stf.gender}</td>
                        {/* <td>
                          {stf.membership == "0" || stf.membership == undefined
                            ? "Not a COREN Member"
                            : "COREN Member"}
                        </td> */}

                        <td>
                          <div className="table_actions">
                            <FaPencilAlt
                              onClick={() => {
                                setIsOpen(true);
                                console.log(allStaff[ind]);
                                // return
                                formik.setValues({
                                  ...allStaff[ind],
                                  current_position: {
                                    position:
                                      allStaff[ind].current_position?.position,
                                    start_date:
                                      allStaff[ind].current_position?.start,
                                    description: "",
                                  },
                                  profile: formik.values.profile,
                                });
                                setEdit(ind);
                                setAllStaff(stf);
                              }}
                            />
                            <DeleteIcon
                              onClick={() => {
                                const filtered = allStaff.filter(
                                  (_, index) => ind !== index
                                );
                                setAllStaff(filtered);
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </>
            </table>
          )}
        </>
      )}
      <Modal
        isOpen={modalIsOpen}
        appElement={document.getElementById("root")}
        style={customStyles}
      >
        <Loading loading={loading} />
        <Alert text={alertText} />
        <div
          style={{
            width: "90%",
            height: "100%",
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Header text="ADD EMPLOYEE" />
          <span style={{ marginTop: 10 }}>
            Add a New Employee and Attached Relevant Experiences
          </span>

          <>
            <FormikProvider value={formik}>
              <div className="sub-group">
                <Input
                  required
                  value={formik.values.name}
                  error={
                    formik.touched.name && formik.errors.name
                      ? formik.errors.name
                      : ""
                  }
                  name="name"
                  onChange={formik.handleChange}
                  outlined
                  label="Name"
                  style={{ width: "50%" }}
                />


        <Select
            outlined
            style={{
              width: "30%",
            }}
            name="gender"
            label="Gender"
            options={genderOptions}
            value={formik.values.selectedGender}
            onChange={(e) => {
              formik.values.gender = e.target.value;
            }}
          />

                <div
                  style={{
                    marginTop: 50,
                    marginRight: 35,
                  }}
                >
                  <RegularText
                    style={{
                      fontWeight: "bold",
                      paddingRight: "15px",
                      fontSize: 13,
                    }}
                    text="COREN LICENSE? "
                  />
                  <input
                    name="membership"
                    onChange={(e) => {
                      if (e.target.checked) {
                        formik.values.membership = "1";
                        setIsMember(true);
                      } else {
                        formik.values.membership = "0";
                        setIsMember(false);
                      }
                    }}
                    type="checkbox"
                    style={{ transform: "scale(1.7)" }}
                  />
                </div>
              </div>
              {/* <> */}
              {isAmember && (
                <Fade>
                  <div className="sub-group" style={{ marginBottom: "20px" }}>
                    <Input
                      name="coren_license_number"
                      onChange={formik.handleChange}
                      outlined
                      label="License Number"
                      style={{ width: "50%", marginRight: "15px" }}
                    />
                    <Input
                      onChange={(e) => {
                        const formData = new FormData();
                        const files = e.target.files;
                        files?.length && formData.append("file", files[0]);
                        setLoading(true);
                        fetch(
                          "https://api.grants.amp.gefundp.rea.gov.ng/api/applicant/application/create/staff/upload",
                          {
                            method: "POST",
                            body: formData,
                            headers: {
                              Authorization: "Bearer " + data.user.user.token,
                            },
                          }
                        )
                          .then((res) => res.json())
                          .then((data) => {
                            setLoading(false);
                            if (data.status) {
                              formik.values.coren_license_document =
                                data.data.url;
                              setAlert("Uplaoded Succefully");
                            } else {
                              setAlert(
                                "Something went wrong. KIndly Upload again"
                              );
                            }
                            setTimeout(() => {
                              setAlert("");
                            }, 2000);
                          });
                      }}
                      type="file"
                      // outlined
                      style={{ width: "50%" }}
                      label="License Document"
                    />
                  </div>
                </Fade>
              )}
              <h2 style={{ marginTop: 20 }}>Current Job*</h2>
              <div className="sub-group">
                <Input
                  value={formik.values.current_position.position}
                  required
                  style={{ width: "50%", marginRight: "15px" }}
                  onChange={formik.handleChange}
                  outlined
                  label="Current Position"
                  name="current_position.position"
                />

                <Input
                  value={formik.values.current_position.start_date}
                  required
                  name="current_position.start_date"
                  style={{ width: "50%" }}
                  onChange={formik.handleChange}
                  outlined
                  label="Start date"
                  type="date"
                />
              </div>

              <TextArea
                name="current_position.description"
                onChange={formik.handleChange}
                required
                outlined
                label="Job Description"
              />

              <h2 style={{ marginTop: 40 }}>Other relevant experience</h2>
              <FieldArray
                name="employer"
                render={(arrayHelpers) => {
                  const employer = formik.values.employer;
                  return (
                    <>
                      {employer.length > 0 &&
                        employer.map((stk, ind) => (
                          <>
                            <div className="sub-group">
                              <Input
                                style={{ width: "25%", marginRight: "10px" }}
                                {...formik.getFieldProps(
                                  `employer.${ind}.position`
                                )}
                                onChange={formik.handleChange}
                                outlined
                                label="Position"
                              />

                              <Input
                                style={{ width: "25%", marginRight: "10px" }}
                                {...formik.getFieldProps(
                                  `employer.${ind}.start_date`
                                )}
                                onChange={formik.handleChange}
                                outlined
                                label="Start Date"
                                type="date"
                              />
                              <Input
                                style={{ width: "25%" }}
                                {...formik.getFieldProps(
                                  `employer.${ind}.end_date`
                                )}
                                onChange={formik.handleChange}
                                outlined
                                label="End date"
                                type="date"
                              />

                              {employer.length - 1 == ind && (
                                <>
                                  {employer.length !== 2 && (
                                    <AddButton
                                      onClick={() => {
                                        arrayHelpers.push({
                                          name: formik.values.name || "p",
                                          start_date: "",
                                          end_date: "",
                                          position: "",
                                          description: "",
                                        });
                                      }}
                                      label=""
                                    />
                                  )}
                                </>
                              )}
                              {employer.length - 1 !== ind && (
                                <>
                                  {employer.length == 2 && (
                                    <DeleteButton
                                      label=""
                                      onClick={() => {
                                        arrayHelpers.remove(ind);
                                      }}
                                    />
                                  )}
                                </>
                              )}
                            </div>
                            <TextArea
                              {...formik.getFieldProps(
                                `employer.${ind}.description`
                              )}
                              onChange={formik.handleChange}
                              outlined
                              label="Job Description"
                            />
                          </>
                        ))}
                    </>
                  );
                }}
              />
              <div className="sub_input">
                <Input
                  error={
                    formik.touched.education_certificate &&
                    formik.errors.education_certificate
                      ? formik.errors.education_certificate
                      : ""
                  }
                  onChange={(e) => {
                    const formData = new FormData();
                    const files = e.target.files;
                    files?.length && formData.append("file", files[0]);
                    setLoading(true);
                    fetch(
                      "https://api.grants.amp.gefundp.rea.gov.ng/api/applicant/application/create/staff/upload",
                      {
                        method: "POST",
                        body: formData,
                        headers: {
                          Authorization: "Bearer " + data.user.user.token,
                        },
                      }
                    )
                      .then((res) => res.json())
                      .then((data) => {
                        setLoading(false);
                        if (data.status) {
                          formik.values.education_certificate = data.data.url;
                          setAlert("Uplaoded Succefully");
                        } else {
                          setAlert("Something went wrong. Kindly Upload again");
                        }
                        setTimeout(() => {
                          setAlert("");
                        }, 2000);
                      });
                  }}
                  // outlined
                  label="UPLOAD Educational Certificate"
                  type="file"
                />
                <Input
                  onChange={(e) => {
                    const formData = new FormData();
                    const files = e.target.files;
                    files?.length && formData.append("file", files[0]);
                    setLoading(true);
                    fetch(
                      "https://api.grants.amp.gefundp.rea.gov.ng/api/applicant/application/create/staff/upload",
                      {
                        method: "POST",
                        body: formData,
                        headers: {
                          Authorization: "Bearer " + data.user.user.token,
                        },
                      }
                    )
                      .then((res) => res.json())
                      .then((data) => {
                        setLoading(false);
                        if (data.status) {
                          formik.values.professional_certificate =
                            data.data.url;
                          setAlert("Uplaoded Succefully");
                        } else {
                          setAlert("Something went wrong. KIndly Upload again");
                        }
                        setTimeout(() => {
                          setAlert("");
                        }, 2000);
                      });
                  }}
                  // outlined
                  label="UPLOAD Professional Certificate"
                  type="file"
                />
              </div>
              <Input
                onChange={(e) => {
                  // formik.values.uploads[index].file = "myUrlll";
                  const formData = new FormData();
                  const files = e.target.files;
                  files?.length && formData.append("file", files[0]);
                  setLoading(true);
                  // const response= await query({url:'/file',method:'POST',bodyData:formData})
                  fetch(
                    "https://api.grants.amp.gefundp.rea.gov.ng/api/applicant/application/create/staff/upload",
                    {
                      method: "POST",
                      body: formData,
                      headers: {
                        Authorization: "Bearer " + data.user.user.token,
                      },
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      setLoading(false);
                      if (data.status) {
                        formik.values.cv = data.data.url;
                        setAlert("Uplaoded Succefully");
                      } else {
                        setAlert("Something went wrong. KIndly Upload again");
                      }
                      setTimeout(() => {
                        setAlert("");
                      }, 2000);
                    });
                }}
                // outlined
                label="UPLOAD CV (Only CVs presented in the format of the template in Appendix of the Prequalification Document will be evaluated.)"
                type="file"
              />
              {formik.values.cv && (
                <span style={{ marginTop: 20 }} className="suc">
                  Uploaded <FaCheck />
                </span>
              )}

              <div
                style={{
                  display: "flex",
                  width: "50%",
                  marginTop: 20,
                  justifyContent: "flex-end",
                  marginLeft: "auto",
                }}
              >
                <Button
                  onClick={() => {
                    setIsOpen(false);
                    formik.values.name = ""
                    formik.values.current_position.position = ""
                    formik.values.current_position.start_date = ""
                    formik.values.current_position.description = ""
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
                    formik.handleSubmit();
                  }}
                  label={editIndex == null ? "Add" : "Save"}
                />
              </div>
            </FormikProvider>
          </>
        </div>
      </Modal>
      {!loading && (
        <Reference
          saveData={saveData}
          nextMove={nextMove}
          style={{ marginTop: "60px" }}
        />
      )}
    </div>
  );
}
