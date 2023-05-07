import React, { useState } from "react";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import { FieldArray, FormikProvider, useFormik } from "formik";
import AddButton from "../../../components/AddButton";
import DeleteButton from "../../../components/DeleteButton";
import Button from "../../../components/Button";
import { RegularText } from "../../../components/Common";
import Modal from "react-modal";
import { FaCheck, FaEdit, FaWindowClose } from "react-icons/fa";
import { CancelIcon, DeleteIcon } from "../../../assets/Svg/Index";
import Loading from "../../../components/Loading";
import Alert from "../../../components/Alert";
import { useSelector } from "react-redux";
import MyModal from "../../../components/MyModal";
import { AiFillCloseSquare } from "react-icons/ai";
import query from "../../../helpers/query";
import * as Yup from "yup";
import { useEffect } from "react";
import Reference from "./Reference";
import Warning from "../components/Tab5/notify";
import { Fade } from "react-awesome-reveal";
import nProgress from "nprogress";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    width: 500,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 50,
  },
};

export default function StaffDetail({ moveToTab }) {
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
    dob: "",
    coren_license_number: "",
    coren_license_document: "",
    language: "",
    employer: [
      { name: "", start_date: "", end_date: "", position: "", description: "" },
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
  const formik2=useFormik({
    initialValues:{
      profile: {
        application_profile_id: appProfileId,
        brief_description: "",
        website: "",
        evidence_of_equipment_ownership: "",
      },
    },
    onSubmit:(val)=>{
     
    }
  })
  const getData = async () => {
    // setLoading2(true);
    nProgress.start();
    const respone = await query({
      method: "GET",
      url: `/api/applicant/application/get?program_id=${data.program.id}`,
      token: data.user.user.token,
    });
    setLoading2(false);
    nProgress.done();

    if (respone.success) {
      // console.log(respone.data.data.application, "popopo");
      setAppProfileId(respone.data.data.application.application_profile[0].id);
      formik2.setValues({
        profile: {
          application_profile_id:
            respone.data.data.application.application_profile[0].id,
          brief_description:
            respone.data.data.application.application_profile[0]
              .description,
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
        setTimeout(() => {
          setAlert("");
        }, 2000);
      }

      // setCurrent(data.data.application);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    dob: Yup.string().required(),
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
      const employersFilter=val.employer.filter(em=>em.name==''||em.description==''||em.position==''||em.start_date=='')
      if (val.name==''||val.current_position.position==''||val.current_position.start_date=='') {
        setAlert('Name and current position is required')
        setTimeout(()=>{
         setAlert('')
        },4000)
        return
      }
      if (employersFilter.length) {
        formik.values.employer=[]
      }
      if (editIndex == null) {
        setAllStaff((prev) => [...prev, formik.values]);
        formik.resetForm();
        setIsOpen(false);
      } else {
        const currentStaff = [...allStaff];
        currentStaff[editIndex] = formik.values;
        setAllStaff(currentStaff);
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
    if (allStaff.length==0) {
       if (formik2.values.profile.brief_description=='') {
         moveToTab()
         return
       }
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
      {loading2 && <img src="/loading.gif" id="loader" />}
      <h2>Profile</h2>
      <Warning msg="Applicant’s company profile showing capacity in renewable energy, off-grid, or rural electrification, agricultural facilities and productive use ventures including evidence of ownership or lease of relevant equipment for project execution e.g., Side Drop Crane, Pick Up Van, Test Equipment, etc. (Please attach proof of ownership or lease agreement where applicable)." />
      <div className="txtArea">
        <RegularText
          style={{ fontWeight: "bold" }}
          text="Brief Description of your business*"
        />
        <textarea
          value={formik2.values.profile.brief_description}
          onChange={formik2.handleChange}
          name="profile.brief_description"
          rows={5}
        />
      </div>
      <Input
        value={formik2.values.profile.website}
        onChange={formik2.handleChange}
        name="profile.website"
        outlined
        label="Website link if any?"
      />
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
                setAlert("Something went wrong. KIndly Upload again");
              }
              setTimeout(() => {
                setAlert("");
              }, 2000);
            })
            .catch(() => {
              setLoading(false);
            });
        }}
        outlined
        label="Evidence of equipment leasing/ownership"
      />
      {formik2.values.profile.evidence_of_equipment_ownership&&<span style={{marginTop:20}} className="suc">Uploaded <FaCheck/></span>}
      <h2>Employess</h2>
      <Warning msg="CVs of key personnel of the company possessing specific minigrid and agricultural sector experience; and evidence that at least one of the key personnel of the company is a COREN registered Electrical Engineer." />
      <Loading loading={loading} />
      <Alert text={alertText} />
      <Button
        style={{
          marginLeft: "auto",
          marginTop: 20,
          width: 200,
          marginBottom: 20,
        }}
        label="Add Staff"
        onClick={() => {
          setIsOpen(true);
          setEdit(null);
          // formik.handleSubmit();
        }}
      />
      {allStaff.length == 0 && !loading2 && (
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <img id="empty" src="/38.png" />
          <span id="empty">No added staff yet</span>
        </div>
      )}

      {allStaff.length > 0 && (
        <table className="home_table">
          <>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Membership</th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allStaff.length &&
                allStaff.map((stf, ind) => (
                  <tr key={ind.toString()}>
                    <td>{ind + 1}</td>
                    <td>{stf.name}</td>
                    <td>{stf.membership=='0'?"Not a COREN Member":"COREN Member"}</td>

                    <td>
                      <div className="table_actions">
                        <FaEdit
                          onClick={() => {
                            setIsOpen(true);
                            console.log(allStaff[ind]);
                            formik.setValues({
                              ...allStaff[ind],
                              profile: formik.values.profile,
                            });
                            setEdit(ind);
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

      <MyModal isOpen={modalIsOpen}>
        <Loading loading={loading} />
        <Alert text={alertText} />
        <div className="inner_modal2">
          <span
            onClick={() => {
              setIsOpen(false);
            }}
            style={{
              marginLeft: "auto",
              fontSize: 20,
              backgroundColor: "#000",
              fontWeight: "bold",
              color: "#fff",
              height: 30,
              width: 30,
              padding: 5,
              borderRadius: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            X
          </span>

          <RegularText
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
            text="Add Staff"
          />
          <div
            style={{
              width: "100%",
              minHeight: 1,
              backgroundColor: "lightgray",
            }}
            className="divider"
          />
          <>
            <FormikProvider value={formik}>
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
              />
              {/* <Input
                value={formik.values.dob}
                error={
                  formik.touched.dob && formik.errors.dob
                    ? formik.errors.dob
                    : ""
                }
                name="dob"
                onChange={formik.handleChange}
                type="date"
                outlined
                label="DOB"
              /> */}
              {/* <div className="txtArea">
                <RegularText
                  style={{ fontWeight: "bold" }}
                  text="Spoken Languages"
                />
                <textarea
                  value={formik.values.language}
                  rows={4}
                  name="language"
                  onChange={formik.handleChange}
                />
                {formik.touched.language && formik.errors.language
                  ? formik.errors.language
                  : ""}
              </div> */}

              <div
                style={{
                  marginTop: 10,
                }}
              >
                <RegularText
                  style={{ fontWeight: "bold" }}
                  text="COREN License? "
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
                />
              </div>
              {isAmember && (
                <Fade>
                  <>
                    <Input
                      name="coren_license_number"
                      onChange={formik.handleChange}
                      outlined
                      label="License Number"
                    />
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
                      outlined
                      label="License Document"
                    />
                  </>
                </Fade>
              )}
              {/* <Input
                value={formik.values.nationality}
                error={
                  formik.touched.nationality && formik.errors.nationality
                    ? formik.errors.nationality
                    : ""
                }
                name="nationality"
                onChange={formik.handleChange}
                label="Nationality"
                outlined
              /> */}
              <h2>Current Job*</h2>
              <div className="sub-group">
                <Input
                required
                  style={{ width: "40%" }}
                  onChange={formik.handleChange}
                  outlined
                  label="Current Position"
                  name="current_position.position"
                />

                <Input
                 required
                  name="current_position.start_date"
                  style={{ width: "40%" }}
                  onChange={formik.handleChange}
                  outlined
                  label="Start date"
                  type="date"
                />
              </div>
              <div className="txtArea">
                <RegularText
                  style={{ fontWeight: "bold" }}
                  text="Job Description"
                />
                <textarea
                  name="current_position.description"
                  onChange={formik.handleChange}
                  rows={5}
                />
              </div>

              <h2>Other relevant experience</h2>
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
                                error={
                                  formik.touched.employer &&
                                  formik.errors.employer
                                    ? formik.errors.employer
                                    : ""
                                }
                                style={{ width: "20%" }}
                                {...formik.getFieldProps(
                                  `employer.${ind}.name`
                                )}
                                onChange={formik.handleChange}
                                outlined
                                label="Name"
                              />
                              <Input
                                style={{ width: "20%" }}
                                {...formik.getFieldProps(
                                  `employer.${ind}.position`
                                )}
                                onChange={formik.handleChange}
                                outlined
                                label="Position"
                              />

                              <Input
                                style={{ width: "20%" }}
                                {...formik.getFieldProps(
                                  `employer.${ind}.start_date`
                                )}
                                onChange={formik.handleChange}
                                outlined
                                label="Start Date"
                                type="date"
                              />
                              <Input
                                style={{ width: "20%" }}
                                {...formik.getFieldProps(
                                  `employer.${ind}.end_date`
                                )}
                                onChange={formik.handleChange}
                                outlined
                                label="End date"
                                type="date"
                              />

                              {employer.length - 1 == ind && (
                                <AddButton
                                  onClick={() => {
                                    arrayHelpers.push({
                                      name: "",
                                      start_date: "",
                                      end_date: "",
                                      position: "",
                                      description: "",
                                    });
                                  }}
                                  label=""
                                />
                              )}
                              {employer.length - 1 !== ind && (
                                <DeleteButton
                                  label=""
                                  onClick={() => {
                                    arrayHelpers.remove(ind);
                                  }}
                                />
                              )}
                            </div>
                            <div className="txtArea">
                              <RegularText
                                style={{ fontWeight: "bold" }}
                                text="Job Description"
                              />
                              <textarea
                                {...formik.getFieldProps(
                                  `employer.${ind}.description`
                                )}
                                onChange={formik.handleChange}
                                rows={5}
                              />
                            </div>
                          </>
                        ))}
                    </>
                  );
                }}
              />

              {/* <div className="txtArea">
                <RegularText
                  style={{ fontWeight: "bold" }}
                  text="Countries Of Work Experience"
                />
                <textarea
                  value={formik.values.countries_experience}
                  rows={5}
                  name="countries_experience"
                  onChange={formik.handleChange}
                />
              </div> */}

              {/* <h2>Education Records</h2>
              <FieldArray
                name="education"
                render={(arrayHelpers) => {
                  const education = formik.values.education;
                  return (
                    <>
                      {education.length > 0 &&
                        education.map((stk, ind) => (
                          <div className="sub-group">
                            <Select
                              options={[
                                "Bsc/B-tech",
                                "MSC/MBA/MTECH",
                                "HND/ND",
                                "SSCE",
                                "FLSC",
                              ]}
                              style={{ width: "15%" }}
                              {...formik.getFieldProps(
                                `education.${ind}.qualification`
                              )}
                              onChange={formik.handleChange}
                              outlined
                              label="Qualification"
                            />
                            <Input
                              error={
                                formik.touched.education &&
                                formik.errors.education
                                  ? formik.errors.education
                                  : ""
                              }
                              style={{ width: "15%" }}
                              {...formik.getFieldProps(
                                `education.${ind}.course`
                              )}
                              onChange={formik.handleChange}
                              outlined
                              label="Course"
                            />
                            <Input
                              style={{ width: "15%" }}
                              {...formik.getFieldProps(
                                `education.${ind}.school`
                              )}
                              onChange={formik.handleChange}
                              outlined
                              label="School Name"
                            />
                            <Input
                              style={{ width: "15%" }}
                              {...formik.getFieldProps(
                                `education.${ind}.start_date`
                              )}
                              onChange={formik.handleChange}
                              outlined
                              label="Start Date"
                              type="date"
                            />
                            <Input
                              style={{ width: "15%" }}
                              {...formik.getFieldProps(
                                `education.${ind}.end_date`
                              )}
                              onChange={formik.handleChange}
                              outlined
                              label="End date"
                              type="date"
                            />

                            {education.length - 1 == ind && (
                              <AddButton
                                onClick={() => {
                                  arrayHelpers.push({
                                    qualification: "",
                                    course: "",
                                    start_date: "",
                                    end_date: "",
                                    school: "",
                                  });
                                }}
                                label=""
                              />
                            )}
                            {education.length - 1 !== ind && (
                              <DeleteButton
                                label=""
                                onClick={() => {
                                  arrayHelpers.remove(ind);
                                }}
                              />
                            )}
                          </div>
                        ))}
                    </>
                  );
                }}
              /> */}
              {/* <h2>Membership In Professional Societies</h2>
              <FieldArray
                name="membership"
                render={(arrayHelpers) => {
                  const membership = formik.values.membership;
                  return (
                    <>
                      {membership.length > 0 &&
                        membership.map((stk, ind) => (
                          <div className="sub-group">
                            <Input
                              style={{ width: "30%" }}
                              {...formik.getFieldProps(
                                `membership.${ind}.rank`
                              )}
                              onChange={formik.handleChange}
                              outlined
                              label="Rank"
                            />
                            <Input
                              error={
                                formik.touched.membership &&
                                formik.errors.membership
                                  ? formik.errors.membership
                                  : ""
                              }
                              style={{ width: "30%" }}
                              {...formik.getFieldProps(
                                `membership.${ind}.state`
                              )}
                              onChange={formik.handleChange}
                              outlined
                              label="Society"
                            />
                            <Input
                              style={{ width: "30%" }}
                              {...formik.getFieldProps(
                                `membership.${ind}.date`
                              )}
                              onChange={formik.handleChange}
                              outlined
                              label="Date"
                              type="date"
                            />

                            {membership.length - 1 == ind && (
                              <AddButton
                                onClick={() => {
                                  arrayHelpers.push({
                                    rank: "",
                                    state: "",
                                    date: "",
                                  });
                                }}
                                label=""
                              />
                            )}
                            {membership.length - 1 !== ind && (
                              <DeleteButton
                                label=""
                                onClick={() => {
                                  arrayHelpers.remove(ind);
                                }}
                              />
                            )}
                          </div>
                        ))}
                    </>
                  );
                }}
              /> */}
              {/* <h2>Trainings</h2>
              <FieldArray
                name="training"
                render={(arrayHelpers) => {
                  const training = formik.values.training;
                  return (
                    <>
                      {training.length > 0 &&
                        training.map((stk, ind) => (
                          <div className="sub-group">
                            <Input
                              style={{ width: "40%" }}
                              {...formik.getFieldProps(
                                `training.${ind}.course`
                              )}
                              onChange={formik.handleChange}
                              outlined
                              label="Course"
                            />

                            <Input
                              error={
                                formik.touched.training &&
                                formik.errors.training
                                  ? formik.errors.training
                                  : ""
                              }
                              style={{ width: "40%" }}
                              {...formik.getFieldProps(`training.${ind}.date`)}
                              onChange={formik.handleChange}
                              outlined
                              label="End date"
                              type="date"
                            />

                            {training.length - 1 == ind && (
                              <AddButton
                                onClick={() => {
                                  arrayHelpers.push({
                                    type: "",
                                    name: "",
                                    start_date: "",
                                    end_date: "",
                                    school: "",
                                  });
                                }}
                                label=""
                              />
                            )}
                            {training.length - 1 !== ind && (
                              <DeleteButton
                                label=""
                                onClick={() => {
                                  arrayHelpers.remove(ind);
                                }}
                              />
                            )}
                          </div>
                        ))}
                    </>
                  );
                }}
              /> */}
              {/* <div className="txtArea">
                <RegularText
                  style={{ fontWeight: "bold" }}
                  text="Work Undertaken that best describes your capability"
                />
                <textarea
                  value={formik.values.work_undertaken}
                  rows={5}
                  name="work_undertaken"
                  onChange={formik.handleChange}
                />
              </div> */}
              <Input
                error={
                  formik.touched.education_certificate &&
                  formik.errors.education_certificate
                    ? formik.errors.education_certificate
                    : ""
                }
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
                        formik.values.education_certificate = data.data.url;
                        setAlert("Uplaoded Succefully");
                      } else {
                        setAlert("Something went wrong. KIndly Upload again");
                      }
                      setTimeout(() => {
                        setAlert("");
                      }, 2000);
                    });
                }}
                outlined
                label="Educational Certificate"
                type="file"
              />
              {formik.values.education_certificate&&<span style={{marginTop:20}} className="suc">Uploaded <FaCheck/></span>}

              
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
                        formik.values.professional_certificate = data.data.url;
                        setAlert("Uplaoded Succefully");
                      } else {
                        setAlert("Something went wrong. KIndly Upload again");
                      }
                      setTimeout(() => {
                        setAlert("");
                      }, 2000);
                    });
                }}
                outlined
                label="Professional Certificate"
                type="file"
              />
               {formik.values.professional_certificate&&<span style={{marginTop:20}} className="suc">Uploaded <FaCheck/></span>}
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
                outlined
                label="CV"
                type="file"
              />
               {formik.values.cv&&<span style={{marginTop:20}} className="suc">Uploaded <FaCheck/></span>}
              <Button
                style={{ width: "50%", marginTop: 20 }}
                onClick={() => {
                  formik.handleSubmit();
                }}
                label={editIndex == null ? "Add" : "Save"}
              />
            </FormikProvider>
          </>
        </div>
      </MyModal>
      {/* <div className="save_next">
        <Button
          onClick={async () => {
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

            setLoading(true);
            const response = await query({
              method: "POST",
              url: "/api/applicant/application/create/staff",
              token: data.user.user.token,
              bodyData,
            });

            setLoading(false);
            if (response.success) {
              // dispatch(setApplication(response.data.data.application));
              setAlert("Data saved");
            } else {
              setAlert("Application failed, please try again");
            }
            setTimeout(() => {
              setAlert("");
            }, 2000);
          }}
          style={{
            width: 200,
            marginRight: 20,
            backgroundColor: "#1094ff",
          }}
          label="Save"
        />
        <Button
          onClick={async () => {
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

            setLoading(true);
            const response = await query({
              method: "POST",
              url: "/api/applicant/application/create/staff",
              token: data.user.user.token,
              bodyData,
            });

            setLoading(false);
            if (response.success) {
              // dispatch(setApplication(response.data.data.application));
              setAlert("Data saved");
              moveToTab(5);
            } else {
              setAlert("Application failed, please try again");
            }
            setTimeout(() => {
              setAlert("");
            }, 2000);
          }}
          style={{
            width: 200,
          }}
          label="Next"
        />
      </div> */}
      <Reference saveData={saveData} nextMove={nextMove} />
    </div>
  );
}
