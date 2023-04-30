import React, { useState } from "react";
import Input from "../../../components/Input";
import { RegularText } from "../../../components/Common";
import Select from "../../../components/Select";
import Button from "../../../components/Button";
import Modal from "react-modal";
import { FaWindowClose } from "react-icons/fa";
import { useFormik } from "formik";
import { DeleteIcon } from "../../../assets/Svg/Index";
import Loading from "../../../components/Loading";
import Alert from "../../../components/Alert";
import { useSelector } from "react-redux";
import query from "../../../helpers/query";

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
    overflowX: 'hidden'
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

export default function Reference({moveToTab}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [allRef, setAllRef] = useState([]);
  const [loading,setLoading]=useState(false)
  const [alertText,setAlert]=useState('')
  const data=useSelector(state=>state)
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
    refree: [{ name: "", phone: "" }],
    subcontractor: { name: "", address: "" },
    subcontactor_role: "",
    award_letter: "",
    interim_valuation_cert: "",
    certificate_of_completion: "",
    evidence_of_equity:""
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (val) => {
      console.log(JSON.stringify(val));
    },
  });
  return (
    <div className="ref-container">
      <Loading loading={loading}/>
      <Alert text={alertText}/>

      <h2>Reference Projects</h2>
      <Button
        style={{
          marginLeft: "auto",
          marginTop: 20,
          width: 200,
          marginBottom: 20,
        }}
        label="Add Refrence Project"
        onClick={() => {
          setIsOpen(true);
          //   formik.handleSubmit();
        }}
      />

      {allRef.length == 0 && (
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <img id="empty" src="/38.png" />
          <span id="empty">No added ref-projects yet</span>
        </div>
      )}

      {allRef.length > 0 && (
        <table className="home_table">
          <>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Address</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allRef.map((refr, ind) => (
                <tr key={ind.toString()}>
                  <td>{ind + 1}</td>
                  <td>{refr.name}</td>
                  <td>{refr.address}</td>
                  <td>{refr.description}</td>

                  <td>
                    <div className="table_actions">
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

      <Button
        style={{
          marginTop: 20,
          marginLeft: "auto",
          width: 200,
        }}
      onClick={async () => {
          const bodyData = {
            application_id: data.applicant.application.id,
            projects:allRef
          };

         
          
          setLoading(true);
          const response = await query({
            method: "POST",
            url: "/api/applicant/application/create/projects",
            token: data.user.user.token,
            bodyData,
          });
         
          setLoading(false)
          if (response.success) {
            // dispatch(setApplication(response.data.data.application));
            setAlert("Data saved");
            moveToTab(6);
          } else {
            setAlert("Application failed, please try again");
          }
          setTimeout(()=>{
       setAlert('')
          },2000)
        }}
        label="Next"
      />

      <Modal
        isOpen={modalIsOpen}
        appElement={document.getElementById("root")}
        style={customStyles}
      >
        <div className="inner_modal">
        <Loading loading={loading}/>
      <Alert text={alertText}/>
          <FaWindowClose
            onClick={() => {
              setIsOpen(false);
            }}
            style={{ fontSize: 30, cursor: "pointer", marginLeft: "auto" }}
          />
          <RegularText
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
            text="Add Reference Project"
          />
          <div className="divider" />
          <>
            <Input
              name="name"
              onChange={formik.handleChange}
              outlined
              label="Project Name"
            />
            <Input
              name="address"
              onChange={formik.handleChange}
              outlined
              label="Address"
            />
            <Input
              name="date_of_contract"
              onChange={formik.handleChange}
              outlined
              type="date"
              label="Date of contract"
            />
            <Input
              name="employer"
              onChange={formik.handleChange}
              outlined
              label="Employer/ Contracting Authority"
            />
            <Input
              name="location"
              onChange={formik.handleChange}
              outlined
              label="Location of Reference Project"
            />
            <div className="txtArea">
              <RegularText style={{ fontWeight: "bold" }} text="Description" />
              <textarea
                name="description"
                onChange={formik.handleChange}
                rows={5}
              />
            </div>
            <Input
              name="date_of_completion"
              onChange={formik.handleChange}
              outlined
              type="date"
              label="Date of completion"
            />
            <Input
              name="project_cost"
              onChange={formik.handleChange}
              outlined
              label="Reference Project Total Project Cost "
            />
            <Input
              name="role_of_applicant"
              onChange={formik.handleChange}
              outlined
              label="Role of Applicant in the Reference Project"
            />
            <Input
              name="equity"
              onChange={formik.handleChange}
              outlined
              label="Equity of applicant in the project"
            />
            <Select
              name="implemented"
              onChange={formik.handleChange}
              options={["Yes", "No"]}
              label="Was the reference project implemented on Epc basics?"
            />
            <h2>Refree</h2>
            <div className="sub-group">
              <Input
                name="refree[0].name"
                onChange={formik.handleChange}
                style={{ width: "40%" }}
                outlined
                label="Name"
              />
              <Input
                name="refree[0].phone"
                onChange={formik.handleChange}
                style={{ width: "40%" }}
                outlined
                label="Phone"
              />
            </div>
            <h2>Associated Sub-contractors</h2>
            <div className="sub-group">
              <Input
                name="subcontractor.name"
                onChange={formik.handleChange}
                style={{ width: "40%" }}
                outlined
                label="Name"
              />

              <Input
                name="subcontractor.address"
                onChange={formik.handleChange}
                style={{ width: "40%" }}
                outlined
                label="Address"
              />
            </div>
            <Input
              name="subcontactor_role"
              onChange={formik.handleChange}
              outlined
              label="Role of Associated Sub-Contractors"
            />
            <Input onChange={(e) => {
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
                            Authorization:
                              "Bearer " + data.user.user.token,
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((data) => {
                          setLoading(false);
                          if (data.status) {
                            formik.values.award_letter = data.data.url;
                            setAlert("Uplaoded Succefully");
                          } else {
                            setAlert("Something went wrong. KIndly Upload again");
                          }
                          setTimeout(() => {
                            setAlert("");
                          }, 2000);
                        });
                    }} outlined type="file" label="Letter Of Award" />
            <Input onChange={(e) => {
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
                            Authorization:
                              "Bearer " + data.user.user.token,
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((data) => {
                          setLoading(false);
                          if (data.status) {
                            formik.values.interim_valuation_cert = data.data.url;
                            setAlert("Uplaoded Succefully");
                          } else {
                            setAlert("Something went wrong. KIndly Upload again");
                          }
                          setTimeout(() => {
                            setAlert("");
                          }, 2000);
                        });
                    }} outlined type="file" label="Interim Valuation Cert" />
            <Input onChange={(e) => {
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
                            Authorization:
                              "Bearer " + data.user.user.token,
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((data) => {
                          setLoading(false);
                          if (data.status) {
                            formik.values.certificate_of_completion = data.data.url;
                            setAlert("Uplaoded Succefully");
                          } else {
                            setAlert("Something went wrong. KIndly Upload again");
                          }
                          setTimeout(() => {
                            setAlert("");
                          }, 2000);
                        });
                    }} outlined type="file" label="Certificate of completion" />
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
                    Authorization:
                      "Bearer " + data.user.user.token,
                  },
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  setLoading(false);
                  if (data.status) {
                    formik.values.evidence_of_equity = data.data.url;
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
              type="file"
              label="Evidence of equity or debt required for the projetct"
            />
            <Button
              style={{ marginTop: 20 }}
              onClick={() => {
                setAllRef((prev) => [...prev, formik.values]);
                formik.resetForm();
                setIsOpen(false);
              }}
              label="Add"
            />
          </>
        </div>
      </Modal>
    </div>
  );
}
