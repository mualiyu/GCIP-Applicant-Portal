import React, { useState } from "react";
import Input from "../../../components/Input";
import { RegularText } from "../../../components/Common";
import Select from "../../../components/Select";
import Button from "../../../components/Button";
import Modal from "react-modal";
import { FaCheck, FaEdit, FaWindowClose } from "react-icons/fa";
import { useFormik } from "formik";
import { DeleteIcon } from "../../../assets/Svg/Index";
import Loading from "../../../components/Loading";
import Alert from "../../../components/Alert";
import { useSelector } from "react-redux";
import query from "../../../helpers/query";
import * as Yup from "yup";
import { useEffect } from "react";
import Warning from "../components/Tab5/notify";

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

export default function Reference({ moveToTab, saveData, nextMove }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [allRef, setAllRef] = useState([]);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [loading2, setLoading2] = useState(false);
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
    <div className="ref-container">
      <Loading loading={loading} />
      <Alert text={alertText} />
      {loading2 && <img src="/loading.gif" id="loader" />}
      <h2>Reference Projects</h2>
      <Warning msg="Verifiable evidence of company’s experience in the past 5 years relevant to building, operating, and maintaining renewable mini grids, ownership of or partnership with agricultural facilities and productive use ventures in the selected Lot’s, and acquisition of co-funding (grants, third party equity or debt) for rural electrification projects" />
      <Button
        style={{
          marginLeft: "auto",
          marginTop: 20,
          width: 200,
          marginBottom: 20,
        }}
        label="Add Reference Project"
        onClick={() => {
          setIsOpen(true);
          setEdit(null);
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
                <th>Location</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allRef.map((refr, ind) => (
                <tr key={ind.toString()}>
                  <td>{ind + 1}</td>
                  <td>{refr.name}</td>
                  <td>{refr.location}</td>
                  <td>{refr.description}</td>

                  <td>
                    <div className="table_actions">
                      <FaEdit
                        onClick={() => {
                          formik.setValues(allRef[ind]);
                          setIsOpen(true);
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
          style={{
            marginRight: 20,
            backgroundColor: "#1742ff",
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
              // dispatch(setApplication(response.data.data.application));
              // setAlert("Data saved");
              nextMove();
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
          label="Next"
        />
      </div>

      <Modal
        isOpen={modalIsOpen}
        appElement={document.getElementById("root")}
        style={customStyles}
      >
        <Alert text={alertText}/>
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
            <Input
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
            />
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
            <Input
              placeholder="include town/city, region/state, country"
              value={formik.values.location}
              name="location"
              onChange={formik.handleChange}
              outlined
              label="Location of Reference Project"
            />
            <div className="txtArea">
              <RegularText
                style={{ fontWeight: "bold" }}
                text="Geocoordinate"
              />
              <textarea
                placeholder="geo-coordinates"
                value={formik.values.geocoordinate}
                name="geocoordinate"
                onChange={formik.handleChange}
                rows={5}
              />
            </div>
            <div className="txtArea">
              <RegularText style={{ fontWeight: "bold" }} text="Description" />
              <textarea
                value={formik.values.description}
                name="description"
                onChange={formik.handleChange}
                rows={5}
              />
            </div>
            <Input
              required
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
              label="Reference Project Total Cost "
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
            <h2>Referee</h2>
            <div className="sub-group">
              <Input
                value={formik.values.referee[0].name}
                name="referee[0].name"
                onChange={formik.handleChange}
                style={{ width: "40%" }}
                outlined
                label="Name"
              />
              <Input
                value={formik.values.referee[0].phone}
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
                value={formik.values.subcontractor[0].name}
                name="subcontractor[0].name"
                onChange={formik.handleChange}
                style={{ width: "40%" }}
                outlined
                label="Name"
              />

              <Input
                value={formik.values.subcontractor[0].address}
                name="subcontractor[0].address"
                onChange={formik.handleChange}
                style={{ width: "40%" }}
                outlined
                label="Address"
              />
            </div>
            <Input
              value={formik.values.subcontractor_role}
              name="subcontractor_role"
              onChange={formik.handleChange}
              outlined
              label="Role of Associated Sub-Contractors"
            />
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
            {formik.values.award_letter && (
              <span style={{ marginTop: 20 }} className="suc">
                Uploaded <FaCheck />
              </span>
            )}
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
            {formik.values.interim_valuation_cert && (
              <span style={{ marginTop: 20 }} className="suc">
                Uploaded <FaCheck />
              </span>
            )}
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
            {formik.values.certificate_of_completion && (
              <span style={{ marginTop: 20 }} className="suc">
                Uploaded <FaCheck />
              </span>
            )}
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
            {formik.values.evidence_of_equity && (
              <span style={{ marginTop: 20 }} className="suc">
                Uploaded <FaCheck />
              </span>
            )}
            <Input
              outlined
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
                      setAlert("Uplaoded Succefully");
                    } else {
                      setAlert("Something went wrong. KIndly Upload again");
                    }
                    setTimeout(() => {
                      setAlert("");
                    }, 2000);
                  });
              }}
              type="file"
              label="Photo evidence of completed project"
            />
            {formik.values.evidence_of_completion && (
              <span style={{ marginTop: 20 }} className="suc">
                Uploaded <FaCheck />
              </span>
            )}
            <Button
              style={{ marginTop: 20 }}
              onClick={() => {
                formik.handleSubmit();
              }}
              label={editIndex == null ? "Add" : "Save"}
            />
          </>
        </div>
      </Modal>
    </div>
  );
}
