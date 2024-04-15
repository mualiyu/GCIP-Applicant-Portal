import { FieldArray, FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import AddButton from "../../../../components/AddButton";
import DeleteButton from "../../../../components/DeleteButton";
import Loading from "../../../../components/Loading";
import Alert from "../../../../components/Alert";
import { useSelector } from "react-redux";
import query from "../../../../helpers/query";
import { useEffect } from "react";
import { FaCheck, FaPlus } from "react-icons/fa";
import "../../../styles/document.css";
import Modal from "react-modal";
import { Header } from "../../../../components/Common";
import Select from "../../../../components/Select";

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
    maxWidth: "60vw",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};
function EligibilityDocuments({ saveData, nextRun }) {
  const [loading, setLoading] = useState(false);
  const [alertText, setAlert] = useState("");
  const [started, setStarted] = useState(false);
  const [active, setActive] = useState(null);
  const data = useSelector((state) => state);
  const [modalOpen2, setModalOpen2] = useState(false);
  const programData = useSelector((state) => state);
  const [completed, setCompleted] = useState(false);
  const [notUploaded, setNotUploaded] = useState([]);
  const [Uploaded, setUploaded] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [notUploadedeSelect, setNotUploadedSelect] = useState([]);
  const allDocs = [
    {
      name: "Evidence of certificate of incorporation with the Corporate Affairs Commission (CAC)",
      url: "",
    },
    {
      name: "Evidence of registration with a relevant tax authority in Nigeria with Tax Identification Number (Max Size 10MB)",

      url: "",
    },
    {
      name: "Attach Statement of financial affairs (Max Size 10MB)",

      url: "",
    },
    {
      name: "Evidence of registration with a reputable Nigerian Incubation Hub (Submission of a reference letter from a recognized incubation/innovation/acceleration hub, written on their letterhead, duly signed by a management staff and stamped with a company stamp)",

      url: "",
    },
    {
      name: "Memorandum of Understanding (MoU) for each JV Partner should be provided for Joint Venture (JV) Partnership (Max Size 1MB)",

      url: "",
    },
    {
      name: "Sworn Affidavit stating  1. Company/business is not in receipt of or the subject of any form of insolvency or bankruptcy, proceedings or the subject of any form of winding up petition or proceedings  2. Company/business does not have any director who has been convicted in any country for any criminal offense relating to fraud or financial impropriety in any country  3. Disclosing whether or not any GCIP implementing or executing entity member of staff or project steering committee member is a former or present director, shareholder or has any pecuniary interest in the SME  4. confirming that all information presented in its bid are true and correct in all particulars",

      url: "",
    },
    {
      name: "Resume/CV of key management & technical personnel",

      url: "",
    },
    {
      name: "Duly executed Power of attorney or Board Resolution authorizing a designated owner/co-owner of the company to act as a representative and to bind the company by signing all bids, contract agreement, and other documents with REA on behalf of the company, duly signed by the chairman and secretary",

      url: "",
    },
    {
      name: "Provide 2 reference letters from a professional contact who has known the applicant for over 2 years  ",

      url: "",
    },
    {
      name: "Application letter on the company’s letterhead Paper, bearing among other things the Registration Number (RC) as issued by Corporate Affairs Commission (CAC), Contact Address, Telephone Number (Preferable mobile No,) and email address. The letterhead paper must indicate the names and Nationalities of the Directors of the Company at the bottom of the page duly signed by the authorized person of the company. (Insert Template) ",

      url: "",
    },
  ];
  const getData = async () => {
    setLoading(true);
    const response = await query({
      method: "GET",
      url: `/api/applicant/application/get?program_id=${data.program.id}`,
      token: data.user.user.token,
    });
    setLoading(false);

    if (response.success) {
      if (response.data.data.application.application_documents.length) {
        setStarted(true);
        const uploaded = response.data.data.application.application_documents;
        const uploadedNames = uploaded.map((doc) => doc.name);
        const notUploadedDocs = allDocs.filter(
          (doc) => !uploadedNames.includes(doc.name)
        );

        setUploaded(uploaded);
        setNotUploaded(notUploadedDocs);
        formik.setValues({
          document: uploaded,
        });
      } else {
        setNotUploaded(allDocs);
      }
    }
  };
  const initialValues = {
    document: [],
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (val) => {
      if (Uploaded.length == 0) {
        nextRun();
        return;
      }
      const bodyData = {
        application_id: data.applicant.application.id,
        documents: Uploaded,
        update: "1",
      };

      setLoading(true);
      const response = await query({
        method: "POST",
        url: "/api/applicant/application/create/documents",
        token: data.user.user.token,
        bodyData,
      });
      console.log(response);
      setLoading(false);
      if (response.success) {
        setAlert(response.data.message);
        setLoading(false);
        setTimeout(() => {
          setAlert("");
        }, 5000);
        nextRun();
      } else {
        setAlert("All Documents are required");
        setLoading(false);
        setTimeout(() => {
          setAlert("");
        }, 5000);
      }
      setTimeout(() => {
        setAlert("");
      }, 2000);
    },
  });
  // useEffect(() => {
  //   getData();
  //   console.log(programData);
  // }, []);

  useEffect(() => {
    getData();
    console.log(programData);
  }, [programData]); // Add programData to the dependency array

  useEffect(() => {
    if (started === false) {
      setNotUploaded(allDocs);
      setNotUploadedSelect(allDocs.map((doc) => doc.name));
    } else {
      setNotUploaded((prevNotUploaded) => {
        return prevNotUploaded.filter(
          (doc) =>
            !Uploaded.some((uploadedDoc) => uploadedDoc.name === doc.name)
        );
      });

      setNotUploadedSelect((prevNotUploadedeSelect) => {
        return prevNotUploadedeSelect.filter(
          (name) => !Uploaded.some((uploadedDoc) => uploadedDoc.name === name)
        );
      });
    }
  }, [allDocs, Uploaded, started]); // Add allDocs, Uploaded, and started to the dependency array
  return (
    <div>
      <Alert text={alertText} />
      <div
        style={{
          display: "flex",
          marginTop: 50,
          fontWeight: 900,
          // fontSize: 14,
          textTransform: "uppercase",
        }}>
        <span>Eligibility Documents Upload</span>
        {Uploaded.length > 0 && Uploaded.length < 11 && (
          <span
            onClick={() => {
              setModalOpen2(true);
            }}
            style={{
              color: "var(--primary)",
              marginLeft: 20,
              fontWeight: "bold",
              cursor: "pointer",
              textTransform: "capitalize",
            }}>
            Click to select documents to Upload
          </span>
        )}
      </div>

      <div
        style={{
          borderBottom: "thin dashed #dadada",
          height: 0.001,
          backgroundColor: "transparent",
          paddingBottom: 12,
          width: "100%",
        }}
        className=""
      />
      <table className="home_table">
        {formik.values.document.length > 0 && (
          <thead>
            <tr>
              <th>S/N</th>
              <th>DOCUMENTS</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
        )}
        <tbody>
          <>
            {Uploaded.length > 0 &&
              Uploaded.map((stk, ind) => {
                return (
                  <tr key={ind.toString()}>
                    <td>{ind + 1}</td>
                    <td>{stk.name}</td>
                    <td>{stk.url == "" ? "NOT-UPLOADED" : "UPLOADED"}</td>
                    <td>
                      <DeleteButton
                        label=""
                        onClick={() => {
                          const filtered = Uploaded.filter(
                            (dt, indx) => indx !== ind
                          );
                          setUploaded(filtered);
                          setNotUploaded((prev) => [
                            ...prev,
                            { name: stk.name, url: "" },
                          ]);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
          </>

          {Uploaded.length == 0 && (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                marginTop: 20,
              }}>
              <span id="empty">
                No Documents uploaded yet!
                <span
                  onClick={() => {
                    setModalOpen2(true);
                  }}
                  style={{
                    color: "var(--primary)",
                    marginLeft: 20,
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}>
                  Click to select documents to Upload
                </span>
              </span>
            </div>
          )}
        </tbody>
      </table>
      <div className="save_next">
        {Uploaded.length > 10 && (
          <p style={{ color: "red" }}>
            {" "}
            Oops! seems you have uploaded more documents than required.{" "}
          </p>
        )}
        {Uploaded.length > 0 && (
          <button
            onClick={() => {
              setLoading(true);
              formik.handleSubmit();
              setLoading(false);
            }}
            disabled={Uploaded.length > 10}
            style={{
              border: "none",
              padding: "12px 37px",
              backgroundColor: "#1a1989",
              color: "white",
              float: "right",
              marginTop: 35,
              cursor: "pointer",
            }}>
            {" "}
            {loading ? "Saving..." : "Upload"}
          </button>
        )}
      </div>
      <Modal
        isOpen={modalOpen2}
        appElement={document.getElementById("root")}
        style={customStyles}>
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
          }}>
          <Loading loading={loading} />

          <Header text="UPLOAD REQUIRED FILES" style={{ fontSize: 13 }} />
          <span style={{ color: "#641e1e", fontSize: 13 }}>
            ALL DOCUMENTS ARE REQUIRED (Only PDF, JPG and JPEG format are
            allowed also ensure there are no duplicates uploaded)
          </span>

          <Select
            outlined
            value={selectedName}
            style={{
              maxWidth: "92%",
            }}
            label="Select File Name"
            onChange={(e) => {
              setSelectedName(e.target.value);
            }}
            disabled={Uploaded.length == 10}
            options={[...notUploadedeSelect]}
          />
          <Input
            required
            type="file"
            className="djbcwj"
            style={{
              width: "90%",
              marginLeft: 10,
              marginRight: 10,
              borderRadius: "0!important",
            }}
            onChange={(e) => {
              if (selectedName == "") {
                setAlert("Please Select a file name");
                return;
              }
              const formData = new FormData();
              const files = e.target.files;
              files?.length && formData.append("file", files[0]);
              setLoading(true);
              fetch(
                "https://api.gcip.rea.gov.ng/api/applicant/application/create/documents/upload",
                {
                  method: "POST",
                  body: formData,
                  headers: {
                    Authorization: "Bearer " + programData.user.user.token,
                  },
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  setLoading(false);
                  if (data.status) {
                    // formik.values.document[ind].url = data.data.url;
                    setAlert("Uploaded Succefully");
                    setModalOpen2(false);
                    const filtered = notUploaded.filter(
                      (data, index) => data.name !== selectedName
                    );
                    setNotUploaded(filtered);
                    setSelectedName("");
                    setUploaded((prev) => [
                      ...prev,
                      { name: selectedName, url: data.data.url },
                    ]);
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
            // outlined
            label="Select File"
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
          <button
            onClick={() => {
              setModalOpen2(false);
            }}
            style={{
              border: "none",
              padding: "12px 37px",
              backgroundColor: "#1a1989",
              color: "white",
              float: "right",
              marginTop: 35,
              cursor: "pointer",
            }}>
            {" "}
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default EligibilityDocuments;
