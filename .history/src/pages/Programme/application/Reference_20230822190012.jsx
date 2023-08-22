import React, { useState } from "react";
import Input from "../../../components/Input";
import { RegularText } from "../../../components/Common";
import Select from "../../../components/Select";
import Button from "../../../components/Button";
import Modal from "react-modal";
import { FaCheck, FaEdit, FaWindowClose, FaPencilAlt } from "react-icons/fa";
import { useFormik } from "formik";
import { FaFolderOpen } from "react-icons/fa";
import { DeleteIcon } from "../../../assets/Svg/Index";
import Loading from "../../../components/Loading";
import Alert from "../../../components/Alert";
import { useSelector } from "react-redux";
import query from "../../../helpers/query";
import { MoonLoader } from "react-spinners";
import * as Yup from "yup";
import { useEffect } from "react";
import Warning from "../components/Tab5/notify";
import TextArea from "../../../components/TextArea";

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
    maxWidth: "70vw",
    boxSizing: "border-box",
    padding: 35,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

export default function Reference({ moveToTab, saveData, nextMove }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [allRef, setAllRef] = useState([]);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [awardUpload, setAwardUpload] = useState(false);
  const [completedProjectUpload, setCompletedProjectUpload] = useState(false);
  const [completionCertificate, setCompletionCertificate] = useState(false);
  const [equityUpload, setEquityUpload] = useState(false);

  const [alertText, setAlert] = useState("");
  const [editIndex, setEdit] = useState(null);
  const data = useSelector((state) => state);
  const getData = async () => {
    setLoading2(true);
    const respone = await query({
      method: "GET",
      url: `/api/applicant/application/get?program_id=${data.program.id}`,
      token: data.user.user.token,
    });
    setLoading2(false);

    if (respone.success) {
      if (respone.data.data.application.application_projects.length) {
        respone.data.data.application.application_projects.map(
          (sub) => (sub.subcontractor = sub.sub_contractors)
        );
        respone.data.data.application.application_projects.map(
          (sub) => (sub.subcontractor_role = sub.subcontactor_role)
        );
        respone.data.data.application.application_projects.map(
          (sub) => (sub.referee = sub.referees)
        );

        // setAlert("Continue with your previous application");
        setStarted(true);
        setAllRef([...respone.data.data.application.application_projects]);
        setTimeout(() => {
          setAlert("");
        }, 2000);
      }

      // setCurrent(data.data.application);
    }
  };
  const initialValues = {
    name: "",
    address: "",
    date_of_contract: "",
    employer: "",
    location: "",
    description: "",
    date_of_completion: "",
    project_cost: "",
    role_of_applicant: "",
    equity: "",
    implemented: "",
    referee: [{ name: "", phone: "" }],
    subcontractor: [{ name: "", address: "" }],
    subcontractor_role: "",
    award_letter: "",
    interim_valuation_cert: "",
    certificate_of_completion: "",
    evidence_of_equity: "",
    geocoordinate: "",
    evidence_of_completion: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required(),
    address: Yup.string().required(),
    date_of_contract: Yup.string().required(),
    date_of_completion: Yup.string().required(),
    award_letter: Yup.string().required(),
    role_of_applicant: Yup.string().required(),
    project_cost: Yup.string().required(),
    implemented: Yup.string().required(),
  });
  const formik = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: (val) => {
      if (editIndex == null) {
        if (
          val.name == "" ||
          val.employer == "" ||
          val.date_of_completion == ""
        ) {
          setAlert("Poject name, Eployer and Date of completion are required");
          setTimeout(() => {
            setAlert("");
          }, 4000);
          return;
        }
        setAllRef((prev) => [...prev, formik.values]);
        formik.resetForm();
        setIsOpen(false);
      } else {
        const currentRe = [...allRef];
        currentRe[editIndex] = formik.values;
        setAllRef(currentRe);
        formik.resetForm();
        setIsOpen(false);
        setEdit(null);
      }
    },
  });

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="ref-container" style={{ marginTop: "75px" }}>
      <Loading loading={loading} size={15} />
      <Alert text={alertText} />
      {/* {loading2 && <MoonLoader color="#36d7b7" size={15} speedMultiplier={0.6} id="loader" />} */}
      <div
        style={{
          display: "flex",
          marginTop: 20,
          fontSize: 13,
        }}
      >
        <span>PROJECT REFERENCES</span>
        <span
          onClick={() => {
            setIsOpen(true);
            setEdit(null);
            // formik.handleSubmit();
          }}
          style={{
            color: "var(--primary)",
            marginLeft: 20,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ADD PROJECT
        </span>
      </div>
      <Warning msg="Verifiable evidence of the applicant’s experience on 3 projects in the past 7 years relevant to design, building, operation, and maintenance of solar PV minigrids and implementation of solar powered equipment for use in agriculture value chain financed through acquisition of grants, equity, or debt." />

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

      {allRef.length == 0 && (
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
            Oops! No Reference Project added yet..{" "}
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
              Add a Reference Project
            </span>{" "}
          </span>
        </div>
      )}

      {allRef.length > 0 && (
        <table className="home_table">
          <>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Location</th>
                <th>Contract Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allRef.map((refr, ind) => (
                <tr key={ind.toString()}>
                  <td>{ind + 1}</td>
                  <td>{refr.name}</td>
                  <td>{refr.location}</td>
                  <td>{refr.date_of_contract}</td>

                  <td>
                    <div className="table_actions">
                      <FaPencilAlt
                        onClick={() => {
                          formik.setValues(allRef[ind]);
                          setIsOpen(true);
                          console.log(allRef[ind]);
                          setEdit(ind);
                        }}
                      />
                      <DeleteIcon
                        onClick={() => {
                          const filtered = allRef.filter(
                            (rf, index) => ind !== index
                          );
                          setAllRef(filtered);
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
      <div className="save_next">
        <Button
          fontStyle={{
            color: "var(--primary)",
          }}
          style={{
            width: 100,
            marginRight: 20,
            backgroundColor: "#fff",
            border: "1.5px solid var(--primary)",
            opacity: allRef.length == 0 ? 0.5 : 1,
          }}
          disabled={allRef.length == 0}
          onClick={async () => {
            const bodyData = {
              application_id: data.applicant.application.id,
              projects: allRef,
              update: started ? "1" : "0",
            };
            const filteredRef = allRef.filter(
              (rf) =>
                rf.name == "" ||
                rf.employer == "" ||
                rf.date_of_completion == ""
            );
            if (filteredRef.length) {
              setAlert(
                "Poject name, Eployer and Date of completion are required"
              );
              setTimeout(() => {
                setAlert("");
              }, 4000);
              return;
            }
            if (allRef.length == 0) {
              saveData();
              return;
            }

            setLoading(true);
            const response = await query({
              method: "POST",
              url: "/api/applicant/application/create/projects",
              token: data.user.user.token,
              bodyData,
            });

            setLoading(false);
            if (response.success) {
              // dispatch(setApplication(response.data.data.application));
              // setAlert("Data saved");
              saveData();
              // nextMove();
              // moveToTab(6);
            } else {
              setAlert(
                "Cannot proceed without submitting required imformation"
              );
            }
            setTimeout(() => {
              setAlert("");
            }, 2000);
          }}
          label="Save"
        />

        <Button
          style={{
            width: 100,
          }}
          onClick={async () => {
            const bodyData = {
              application_id: data.applicant.application.id,
              projects: allRef,
              update: started ? "1" : "0",
            };
            const filteredRef = allRef.filter(
              (rf) =>
                rf.name == "" ||
                rf.employer == "" ||
                rf.date_of_completion == ""
            );
            if (filteredRef.length) {
              setAlert(
                "Poject name, Eployer and Date of completion are required"
              );
              setTimeout(() => {
                setAlert("");
              }, 4000);
              return;
            }
            if (allRef.length == 0) {
              nextMove();
              return;
            }

            setLoading(true);
            const response = await query({
              method: "POST",
              url: "/api/applicant/application/create/projects",
              token: data.user.user.token,
              bodyData,
            });

            setLoading(false);
            if (response.success) {
              nextMove();
            } else {
              setAlert(
                "Cannot proceed without submitting required imformation"
              );
            }
            setTimeout(() => {
              setAlert("");
            }, 2000);
          }}
          label="Next"
        />
      </div>

      <Modal
        isOpen={modalIsOpen}
        appElement={document.getElementById("root")}
        style={customStyles}
      >
        <Alert text={alertText} />
        <div style={{ position: "relative" }} className="inner_modal">
          <h2>Add Project Reference</h2>
          <Loading loading={loading} />
          <Alert text={alertText} />
          {/* <FaWindowClose
            onClick={() => {
              setIsOpen(false);
            }}
            style={{ fontSize: 30, cursor: "pointer", marginLeft: "auto" }}
          /> */}
          {/* <Warning msg="Verifiable evidence of company’s experience in the past 5 years relevant to building, operating, and maintaining renewable mini grids, ownership of or partnership with agricultural facilities and productive use ventures in the selected Lot’s, and acquisition of co-funding (grants, third party equity or debt) for rural electrification projects" /> */}

          <>
            <div className="">
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
                label="Project Name"
              />
              {/* <Input
                value={formik.values.address}
                error={
                  formik.touched.address && formik.errors.address
                    ? formik.errors.address
                    : ""
                }
                name="address"
                onChange={formik.handleChange}
                outlined
                label="Address"
              /> */}
            </div>
            <div className="sub_input">
              <Input
                value={formik.values.date_of_contract}
                error={
                  formik.touched.date_of_contract &&
                  formik.errors.date_of_contract
                    ? formik.errors.date_of_contract
                    : ""
                }
                name="date_of_contract"
                onChange={formik.handleChange}
                outlined
                type="date"
                label="Date of contract"
              />
              <Input
                required
                value={formik.values.employer}
                error={
                  formik.touched.employer && formik.errors.employer
                    ? formik.errors.employer
                    : ""
                }
                name="employer"
                onChange={formik.handleChange}
                outlined
                label="Employer/ Contracting Authority"
              />
            </div>

            <TextArea
              value={formik.values.description}
              name="description"
              onChange={formik.handleChange}
              label="PROJECT DESCRIPTION"
              required
              outlined
            />

            <div
              style={{
                gridTemplateColumns: "1fr 1fr 1fr",
              }}
              className="sub_input"
            >
              <Input
                
                value={formik.values.date_of_completion}
                error={
                  formik.touched.date_of_completion &&
                  formik.errors.date_of_completion
                    ? formik.errors.date_of_completion
                    : ""
                }
                name="date_of_completion"
                onChange={formik.handleChange}
                outlined
                type="date"
                label="Date of completion"
              />
              <Input
                value={formik.values.project_cost}
                error={
                  formik.touched.project_cost && formik.errors.project_cost
                    ? formik.errors.project_cost
                    : ""
                }
                name="project_cost"
                onChange={formik.handleChange}
                outlined
                label="Reference Project Total Size(kW) "
              />
              <Input
                value={formik.values.role_of_applicant}
                error={
                  formik.touched.role_of_applicant &&
                  formik.errors.role_of_applicant
                    ? formik.errors.role_of_applicant
                    : ""
                }
                name="role_of_applicant"
                onChange={formik.handleChange}
                outlined
                label="Role of Applicant in the Reference Project"
              />
            </div>

            <div className="sub_input">
              <Input
                placeholder="include town/city, region/state, country"
                value={formik.values.location}
                name="location"
                onChange={formik.handleChange}
                outlined
                label="Address"
              />

              <Input
                label="Geocoordinate"
                value={formik.values.geocoordinate}
                name="geocoordinate"
                onChange={formik.handleChange}
                outlined
              />
            </div>

            {/* <Input
            value={formik.values.equity}
              name="equity"
              onChange={formik.handleChange}
              outlined
              label="Equity of applicant in the project"
            />
            <Select
              value={formik.values.implemented}
              name="implemented"
              onChange={formik.handleChange}
              options={["Yes", "No"]}
              label="Was the reference project implemented on Epc basics?"
            /> */}
            <h2 style={{ marginTop: 20 }}>Project Referee</h2>
            <div className="sub-group">
              <Input
                value={formik.values.referee[0].name}
                name="referee[0].name"
                onChange={formik.handleChange}
                style={{ width: "50%", marginRight: 10 }}
                outlined
                label="Name"
              />
              <Input
                value={formik.values.referee[0].phone}
                name="referee[0].phone"
                onChange={formik.handleChange}
                style={{ width: "50%" }}
                outlined
                label="Phone"
              />
            </div>
            <h2 style={{ marginTop: 20 }}>
              Project Associated Sub-contractors
            </h2>
            <div className="sub-group">
              <Input
                value={formik.values.subcontractor[0].name}
                name="subcontractor[0].name"
                onChange={formik.handleChange}
                style={{ width: "30%" }}
                outlined
                label="Name"
              />
              <Input
                value={formik.values.subcontractor_role}
                name="subcontractor_role"
                onChange={formik.handleChange}
                outlined
                label="Role of Associated Sub-Contractors"
                style={{ width: "30%" }}
              />
              <Input
                value={formik.values.subcontractor[0].address}
                name="subcontractor[0].address"
                onChange={formik.handleChange}
                style={{ width: "38%" }}
                outlined
                label="Address"
              />
            </div>

            <h2 style={{ marginTop: 20 }}>UPLOAD RELEVANT DOCUMENTS <a href="https://grants.amp.gefundp.rea.gov.ng/how-to-reduce-pdf.html"  target="_blank">(See Guide)</a></h2>
            <div className="sub_input">
              <Input
                required
                
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
                        Authorization: "Bearer " + data.user.user.token,
                      },
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      setLoading(false);
                      if (data.status) {
                        formik.values.award_letter = data.data.url;
                        setAwardUpload(true);
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
                style={{position: 'relative'}}
                type="file"
                label="Evidence Of Award"
              /> { formik.values.award_letter && <span className="uploaded_text">Uploaded, replace by uploading new file</span> }
              <Input
                // outlined
                style={{ marginTop: 0, position: 'relative' }}
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
                        Authorization: "Bearer " + data.user.user.token,
                      },
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      setLoading(false);
                      if (data.status) {
                        formik.values.evidence_of_completion = data.data.url;
                        setCompletedProjectUpload(true);
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
                label="Photo evidence of completed project"
              />{ formik.values.evidence_of_completion && <span className="uploaded_text">Uploaded, replace by uploading new file</span> }




            </div>
            <div className="sub_input">
              <div style={{  position: 'relative' }}>
              <Input
                style={{ marginTop: 0 }}
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
                        Authorization: "Bearer " + data.user.user.token,
                      },
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      setLoading(false);
                      if (data.status) {
                        formik.values.certificate_of_completion = data.data.url;
                        setCompletionCertificate(true);
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
                type="file"
                label="Certificate of completion"
              /> { formik.values.certificate_of_completion && <span className="uploaded_text">Uploaded, replace by uploading new file</span> }

              </div>
              
              <Input
                style={{ marginTop: 0 }}
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
                        Authorization: "Bearer " + data.user.user.token,
                      },
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      setLoading(false);
                      if (data.status) {
                        formik.values.evidence_of_equity = data.data.url;
                        setEquityUpload(true);
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
                type="file"
                label="Evidence of equity or debt raised for the project"
              /> { formik.values.evidence_of_equity && <span className="uploaded_text">Uploaded, replace by uploading new file</span> }
            </div>


            {/* {formik.values.evidence_of_completion && (
              <span style={{ marginTop: 20 }} className="suc">
                Uploaded <FaCheck />
              </span>
            )} */}
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
                  formik.values.description = ""
                  formik.values.date_of_contract = ""
                  formik.values.employer = ""
                  formik.values.name = ""
                  formik.values.date_of_completion = ""
                  formik.values.project_cost = ""
                  formik.values.role_of_applicant = ""
                  formik.values.location = ""
                  formik.values.geocoordinate = ""
                  formik.values.referee[0].name = ""
                  formik.values.referee[0].phone = ""
                  formik.values.subcontractor[0].name = ""
                  formik.values.subcontractor[0].address = ""
                  formik.values.subcontractor_role  = ""

                  
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
          </>
        </div>
      </Modal>
    </div>
  );
}
