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
import * as Yup from "yup";
import { useEffect } from "react";

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

export default function Reference({ moveToTab }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [allRef, setAllRef] = useState([]);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [alertText, setAlert] = useState("");
  const data = useSelector((state) => state);
  const getData = async () => {
    setLoading2(true);
    const respone = await query({
      method: "GET",
      url: `/api/applicant/application/get?program_id=${data.program.id}`,
      token: data.user.user.token,
    });
    setLoading2(false);

    console.log(respone);

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

        setAlert("Continue with your previous application");
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
    validationSchema,
    onSubmit: (val) => {
      setAllRef((prev) => [...prev, formik.values]);
      formik.resetForm();
      setIsOpen(false);
    },
  });

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="ref-container">
      <Loading loading={loading} />
      <Alert text={alertText} />
      {loading2 && <img src="/loading.gif" id="loader" />}
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
<div className="save_next">
<Button
        style={{
          marginRight: 20,
          backgroundColor:'#1742ff',
          width: 100,
        }}
        onClick={async () => {
          const bodyData = {
            application_id: data.applicant.application.id,
            projects: allRef,
            update: started ? "1" : "0",
          };

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
            setAlert("Data saved");
            // moveToTab(6);
          } else {
            setAlert("Application failed, please try again");
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
            setAlert("Data saved");
            moveToTab(6);
          } else {
            setAlert("Application failed, please try again");
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
        <div style={{ position: "relative" }} className="inner_modal">
          <Loading loading={loading} />
          <Alert text={alertText} />
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
            <Input
              error={
                formik.touched.address && formik.errors.address
                  ? formik.errors.address
                  : ""
              }
              name="address"
              onChange={formik.handleChange}
              outlined
              label="Address"
            />
            <Input
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
              error={
                formik.touched.project_cost && formik.errors.project_cost
                  ? formik.errors.project_cost
                  : ""
              }
              name="project_cost"
              onChange={formik.handleChange}
              outlined
              label="Reference Project Total Project Cost "
            />
            <Input
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
                name="referee[0].name"
                onChange={formik.handleChange}
                style={{ width: "40%" }}
                outlined
                label="Name"
              />
              <Input
                name="referee[0].phone"
                onChange={formik.handleChange}
                style={{ width: "40%" }}
                outlined
                label="Phone"
              />
            </div>
            <h2>Associated Sub-contractors</h2>
            <div className="sub-group">
              <Input
                name="subcontractor[0].name"
                onChange={formik.handleChange}
                style={{ width: "40%" }}
                outlined
                label="Name"
              />

              <Input
                name="subcontractor[0].address"
                onChange={formik.handleChange}
                style={{ width: "40%" }}
                outlined
                label="Address"
              />
            </div>
            <Input
              name="subcontractor_role"
              onChange={formik.handleChange}
              outlined
              label="Role of Associated Sub-Contractors"
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
              label="Letter Of Award"
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
                      formik.values.interim_valuation_cert = data.data.url;
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
              label="Interim Valuation Cert"
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
              label="Certificate of completion"
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
                formik.handleSubmit();
              }}
              label="Add"
            />
          </>
        </div>
      </Modal>
    </div>
  );
}
