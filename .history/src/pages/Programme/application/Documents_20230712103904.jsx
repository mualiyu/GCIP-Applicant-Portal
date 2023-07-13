import { FieldArray, FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import AddButton from "../../../components/AddButton";
import DeleteButton from "../../../components/DeleteButton";
import Loading from "../../../components/Loading";
import Alert from "../../../components/Alert";
import { useSelector } from "react-redux";
import query from "../../../helpers/query";
import { useEffect } from "react";
import { FaCheck, FaPlus } from "react-icons/fa";
import "../../styles/document.css";
import Modal from "react-modal";
import { Header } from "../../../components/Common";
import { CancelIcon } from "../../../assets/Svg/Index";
import Select from "../../../components/Select";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "90vh",
    minWidth: "40vw",
    overflowX: "hidden",
    maxWidth: "40vw",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};
function Documents({ saveData, nextRun }) {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [alertText, setAlert] = useState("");
  const [started, setStarted] = useState(false);
  const [leftToUpload, setLeftToUpload] = useState([]);
  const [active, setActive] = useState(null);
  const data = useSelector((state) => state);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [notUploaded, setNotUploaded] = useState([]);
  const [Uploaded, setUploaded] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [notUploadedeSelect, setNotUploadedSelect] = useState([]);
  const [dontRun, setDont] = useState(false);
  const allDocs = [
    {
      name: "Evidence of certificate of incorporation with the Corporate Affairs Commission (CAC) including copies of CAC forms 1.1, CO2, and CO7 attached.",
      url: "",
    },
    {
      name: "Evidence of Company Income Tax clearance certificate for the last three years that is 2020, 2021 and 2022.",

      url: "",
    },
    {
      name: "Attach the last 3 years’ audited account (2020, 2021, 2022) and statement of account for the immediate past four (4) months (January – April 2023).",

      url: "",
    },
    {
      name: "Sworn Affidavit",

      url: "",
    },
    {
      name: "Evidence of current Pension Compliance Certificate valid until 31st December 2023",

      url: "",
    },
    {
      name: "Evidence of Industrial Training Fund (ITF) Compliance Certificate valid until 31st December 2023",

      url: "",
    },
    {
      name: "Current Nigerian Social Insurance Trust Fund (NSITF) Compliance Certificate valid until 31st December 2023.",

      url: "",
    },
    {
      name: "Evidence of registration on the National DataBase of Federal project developers, consultants, and service providers by submission of Interim Registration Report (IRR) expiring on 31st December 2023 or valid Certificate issued by the Bureau of Public Procurement.",

      url: "",
    },
    {
      name: "Current valid NEMSA License for project developers in the Electric Power Sector issued by the National Electricity Management Services Agency (NEMSA).",

      url: "",
    },
    {
      name: "Evidence of Financial capability to execute the project by submission of reference letter and statement of account from a reputable commercial bank in Nigeria, indicating a willingness to provide credit facility for the execution of the project when needed.",

      url: "",
    },
    {
      name: "Duly executed Power of attorney or Board Resolution authorizing a designated officer of the company to act as a representative and to bind the company by signing all bids, contract agreement, and other documents with REA on behalf of the company, duly signed by the chairman and secretary.",

      url: "",
    },
    {
      name: "Covering/forwarding letter on the company’s letter Head paper, bearing among other things the Registration Number (RC) as issued by Corporate Affairs Commission (CAC), Contact Address, Telephone Number (Preferable GSM No.) and Email Address. The Letterhead Paper must indicate the names and Nationalities of Directors of the company at the bottom of the page duly signed by the authorized person of the company.",

      url: "",
    },
  ];
  const getData = async () => {
    setLoading2(true);
    const response = await query({
      method: "GET",
      url: `/api/applicant/application/get?program_id=${data.program.id}`,
      token: data.user.user.token,
    });
    setLoading2(false);

    if (response.success) {
      if (response.data.data.application.application_documents.length > 0) {
        // setAlert("Continue with your previous application");
        console.log(response);
        setStarted(true);
        const uploaded = [];
        const notUploadedd = [];
        allDocs.filter((data) => {
          response.data.data.application.application_documents.map((doc) => {
            if (data.name == doc.name) {
              uploaded.push(doc);
             
            } else {
              notUploadedd.push(data);
            }
            console.log(uploaded);
            console.log(notUploaded);
          });
        });

        setUploaded(uploaded);

        formik.setValues({
          document: response.data.data.application.application_documents,
        });
        // setTimeout(() => {
        //   setAlert("");
        // }, 2000);
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

      setLoading(false);
      if (response.success) {
        setAlert("Data saved");
        setTimeout(() => {
          setAlert("");
          setLoading(false);
        }, []);
        nextRun();
        // dispatch(setApplication(response.data.data.application));

        // moveToTab(8);
      } else {
        setAlert("All Documents are required");
      }
      setTimeout(() => {
        setAlert("");
      }, 2000);
    },
  });
  useEffect(() => {
    getData();
  }, []);


  useEffect(() => {
    console.log(allDocs);
    // removeUploadedFromList(allDocs);
    if (!started) {
      setNotUploaded(allDocs);
      const list = allDocs.map((ls) => ls.name);
      console.log(list)
      setNotUploadedSelect(list);
      return;
    }
    const newArray = allDocs.filter((obj1) => {
      return !Uploaded.some((obj2) => obj2.name === obj1.name);
    });

    console.log(newArray);
    setNotUploaded(newArray);
    const list = notUploaded.map((ls) => ls.name);
    if (dontRun) {
      return;
    } else {
      setNotUploadedSelect(list);
    }
  }, [Uploaded, started, notUploadedeSelect]);
  return (
    <div>
      <div
        style={{
          display: "flex",
          marginTop: 50,
          fontSize: "13px",
        }}
      >
        <Loading loading={loading} />
        <span>RELEVANT DOCUMENTS UPLOAD -</span>
        <span
          onClick={() => {
            setModalOpen2(true);
          }}
          style={{
            color: "var(--primary)",
            marginLeft: 20,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          UPLOAD
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
          {/* <FormikProvider value={formik}>
            <FieldArray
              name="document"
              render={(arrayHelpers) => {
                const document = formik.values.document;
                return (
                  <>
                    {document.length > 0 &&
                      document.map((stk, ind) => {
                        if (stk.url !== "") {
                          return (
                            <tr key={ind.toString()}>
                              <td>{ind + 1}</td>
                              <td>{stk.name}</td>
                              <td>
                                {stk.url == "" ? "NOT-UPLOADED" : "UPLOADED"}
                              </td>
                              <td>
                                <DeleteButton
                                  label=""
                                  onClick={() => {
                                    arrayHelpers.remove(ind);
                                  }}
                                />
                              </td>
                            </tr>
                          );
                        } else {
                          return null;
                        }
                      })}
                  </>
                );
              }}
            />
          </FormikProvider> */}

          {Uploaded.length == 0 && !loading2 && (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                marginTop: 20,
              }}
            >
              {/* <img id="empty" src="/38.png" /> */}
              <span id="empty">No Documents uploaded!</span>
            </div>
          )}
        </tbody>
      </table>
      {!loading2 && (
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
              opacity: started ? 1 : completed ? 1 : 0.5,
            }}
            onClick={async () => {
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

              setLoading(false);
              if (response.success) {
                setAlert("Data saved");
                setTimeout(() => {
                  setAlert("");
                  setLoading(false);
                }, []);
                nextRun();
                // dispatch(setApplication(response.data.data.application));

                // moveToTab(8);
              } else {
                setAlert("All Documents are required");
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
            onClick={() => {
              formik.handleSubmit();
            }}
            label="Next"
          />
        </div>
      )}
      <Modal
        isOpen={modalOpen2}
        appElement={document.getElementById("root")}
        style={customStyles}
      >
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
          <Loading loading={loading} />
          <Alert text={alertText} />

          <Header text="UPLOAD REQUIRED FILES" style={{ fontSize: 13 }} />
          <span style={{ color: "#641e1e", fontSize: 13 }}>
            ALL DOCUMENTS ARE REQUIRED
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
            options={notUploadedeSelect}
          />
          <Input
            required
            type="file"
            style={{
              width: "90%",
              marginLeft: 10,
              marginRight: 10,
            }}
            onChange={(e) => {
              setDont(true);
              if (selectedName == "") {
                setAlert("Please Select a file name");
                return;
              }
              const formData = new FormData();
              const files = e.target.files;
              files?.length && formData.append("file", files[0]);
              setLoading(true);
              // const response= await query({url:'/file',method:'POST',bodyData:formData})
              fetch(
                "https://api.grants.amp.gefundp.rea.gov.ng/api/applicant/application/create/documents/upload",
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
                    // formik.values.document[ind].url = data.data.url;
                    setAlert("Uploaded Succefully");
                    // reset the form
                    files = null;
                    console.log(data);
                    if (started) {
                      const filtered = notUploadedeSelect.filter(
                        (data) => data !== selectedName
                      );
                      console.log(filtered, "llll");
                      setNotUploadedSelect(filtered);
                    }
                    if (!started) {
                      const filtered = notUploadedeSelect.filter(
                        (data) => data !== selectedName
                      );

                      setNotUploadedSelect(filtered);
                    }
                    // setNotUploaded(filtered);

                    setUploaded((prev) => [
                      ...prev,
                      { name: selectedName, url: data.data.url },
                    ]);
                    setSelectedName("");
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

        <div className="save_next">
          <Button
            onClick={() => setModalOpen2(false)}
            fontStyle={{
              color: "var(--primary)",
            }}
            style={{
              width: 100,
              marginRight: 20,
              backgroundColor: "#fff",
              border: "1.5px solid var(--primary)",
            }}
            label="Close"
          />
        </div>
      </Modal>
    </div>
  );
}

export default Documents;
