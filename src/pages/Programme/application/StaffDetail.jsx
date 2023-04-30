import React, { useState } from "react";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import { FieldArray, FormikProvider, useFormik } from "formik";
import AddButton from "../../../components/AddButton";
import DeleteButton from "../../../components/DeleteButton";
import Button from "../../../components/Button";
import { RegularText } from "../../../components/Common";
import Modal from "react-modal";
import { FaWindowClose } from "react-icons/fa";
import { CancelIcon, DeleteIcon } from "../../../assets/Svg/Index";
import Loading from "../../../components/Loading";
import Alert from "../../../components/Alert";
import { useSelector } from "react-redux";
import MyModal from "../../../components/MyModal";
import { AiFillCloseSquare } from "react-icons/ai";
import query from "../../../helpers/query";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflow:'hidden',
    display:'flex',
    flexDirection:'column',
    width:500,
   
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding:50
    
  },
};

export default function StaffDetail({moveToTab}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [allStaff, setAllStaff] = useState([]);
  const [loading,setLoading]=useState(false)
  const [alertText,setAlert]=useState('')
  const data=useSelector(state=>state)
  const initialValues = {
    name: "",
    dob: "",
    language: "",
    employer: [{ name: "", start_date: "", end_date: "", position: "" }],
    nationality: "",
    education: [
      { type: "", name: "", start_date: "", end_date: "", school: "" },
    ],
    membership: [{ rank: "", state: "", year: "" }],
    training: [{ course: "", date: "" }],
    countries_experience: "",
    work_undertaken: "",
    education_certificate: "",
    professional_certificate: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (val) => {
      console.log(JSON.stringify(val));
    },
  });
  return (
    <div className="staff_detail_cont">
      <h2>Employess</h2>
      <Loading loading={loading}/>
        <Alert text={alertText}/>
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
          formik.handleSubmit();
        }}
      />
      {allStaff.length == 0 && (
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
                <th>Employement Catgory</th>
                <th>Nationality</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allStaff.map((stf, ind) => (
                <tr key={ind.toString()}>
                  <td>{ind + 1}</td>
                  <td>{stf.name}</td>
                  <td>{stf.employement_category}</td>
                  <td>{stf.nationality}</td>

                  <td>
                    <div className="table_actions">
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
     
      <MyModal
        isOpen={modalIsOpen}
      
      >
        <Loading loading={loading}/>
        <Alert text={alertText}/>
        <div className="inner_modal">
        <span onClick={()=>{
          setIsOpen(false)
        }} style={{
          marginLeft:'auto',
          fontSize:20,
          backgroundColor:'#000',
          fontWeight:'bold',
          color:'#fff',
          height:30,
          width:30,
          padding:5,
          borderRadius:50,
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          cursor:'pointer'
        }}>X</span>
          
          
         
          <RegularText
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
            text="Add Staff"
          />
        <div style={{width:'100%',minHeight:1,backgroundColor:'lightgray'}} className="divider" />
          <>
            <FormikProvider value={formik}>
              <Input
                name="name"
                onChange={formik.handleChange}
                outlined
                label="Name"
              />
              <Input
                name="dob"
                onChange={formik.handleChange}
                type="date"
                outlined
                label="DOB"
              />
              <div className="txtArea">
                <RegularText style={{ fontWeight: "bold" }} text="Spoken Languages" />
                <textarea
                  rows={4}
                  name="language"
                  onChange={formik.handleChange}
                />
              </div>
              <Input
                name="nationality"
                onChange={formik.handleChange}
                label="Nationality"
                outlined
              />

              <h2>Employers</h2>
              <FieldArray
                name="employer"
                render={(arrayHelpers) => {
                  const employer = formik.values.employer;
                  return (
                    <>
                      {employer.length > 0 &&
                        employer.map((stk, ind) => (
                          <div className="sub-group">
                            <Input
                              style={{ width: "20%" }}
                              {...formik.getFieldProps(`employer.${ind}.name`)}
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
                        ))}
                    </>
                  );
                }}
              />

              <div className="txtArea">
                <RegularText
                  style={{ fontWeight: "bold" }}
                  text="Countries Of Work Experience"
                />
                <textarea
                  rows={5}
                  name="countries_experience"
                  onChange={formik.handleChange}
                />
              </div>

              <h2>Education Records</h2>
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
                              options={["Bsc"]}
                              style={{ width: "15%" }}
                              {...formik.getFieldProps(`education.${ind}.type`)}
                              onChange={formik.handleChange}
                              outlined
                              label="Qualification"
                            />
                            <Input
                              style={{ width: "15%" }}
                              {...formik.getFieldProps(`education.${ind}.name`)}
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
              />
              <h2>Membership In Professional Societies</h2>
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
                                `membership.${ind}.year`
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
              />
              <h2>Trainings</h2>
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
              />
                <div className="txtArea">
                <RegularText
                  style={{ fontWeight: "bold" }}
                  text="Work Undertaken that best describes your capability"
                />
                <textarea
                  rows={5}
                  name="work_undertaken"
                  onChange={formik.handleChange}
                />
              </div>
              <Input onChange={(e) => {
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
                            Authorization:
                              "Bearer " + data.user.user.token,
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
                    }} outlined label="Educational Certificate" type="file" />
              <Input onChange={(e) => {
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
                            Authorization:
                              "Bearer " + data.user.user.token,
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
                    }} outlined label="Professional Certificate" type="file" />
            
              <Button
                style={{ width: "50%", marginTop: 20 }}
                onClick={() => {
                  console.log(formik.values)
                  setAllStaff((prev) => [...prev, formik.values]);
                  formik.resetForm();
                  setIsOpen(false);
                }}
                label="Add"
              />
            </FormikProvider>
          </>
        </div>
      </MyModal>
      <div className="save_next">
        <Button
          onClick={() => {}}
          style={{
            width: 200,
            marginRight: 20,
            backgroundColor: "#1094ff",
          }}
          label="Save"
        />
        <Button
          onClick={async () => {
            const bodyData = {
              application_id: data.applicant.application.id,
              staff:allStaff
            };

           
            
            setLoading(true);
            const response = await query({
              method: "POST",
              url: "/api/applicant/application/create/staff",
              token: data.user.user.token,
              bodyData,
            });
           
            setLoading(false)
            if (response.success) {
              // dispatch(setApplication(response.data.data.application));
              setAlert("Data saved");
              moveToTab(5);
            } else {
              setAlert("Application failed, please try again");
            }
            setTimeout(()=>{
         setAlert('')
            },2000)
          }}
          style={{
            width: 200,
          }}
          label="Next"
        />
        
      </div>
    </div>
  );
}
