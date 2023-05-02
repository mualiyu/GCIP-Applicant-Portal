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
import { FaPlus } from "react-icons/fa";
import "../../styles/document.css";

function Documents({ saveData,nextRun }) {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [alertText, setAlert] = useState("");
  const [started, setStarted] = useState(false);
  const [active, setActive] = useState(null);
  const data = useSelector((state) => state);
  const getData = async () => {
    setLoading2(true);
    const response = await query({
      method: "GET",
      url: `/api/applicant/application/get?program_id=${data.program.id}`,
      token: data.user.user.token,
    });
    setLoading2(false);

    if (response.success) {
      if (response.data.data.application.application_documents.length) {
        // setAlert("Continue with your previous application");
        setStarted(true);
        formik.setValues({
          document: response.data.data.application.application_documents,
        });
        // setTimeout(() => {
        //   setAlert("");
        // }, 2000);
      }
    }
  };
  const initialValues = {
    document: [
      
      {
        name: "Pension complaince certificate valid until 31st December 2023",

        url: "",
      },
      {
        name: "Industrial training fund (ITF) complaince certificate valid until 31st December 2023",

        url: "",
      },
      {
        name: "Industrial training fund (ITF) complaince certificate valid until 31st December 2023",

        url: "",
      },
      {
        name: "Nigerian social insurance trust fund (NSITF) complaince certificate valid until 31st December 2023",

        url: "",
      },
      {
        name: "Interim registration report (IRR) expiring on 31st December 2023",

        url: "",
      },
      {
        name: "2022, 2021, 202 Audited Accounts",

        url: "",
      },
      {
        name: "Current valid national electricity management service agency (NEMSA) licence",

        url: "",
      },
      {
        name: "Reference letter from a reputable commercial bank in Nigeria, indicating a willigness to provide credit facility for the execution of the project when needed",

        url: "",
      },
      {
        name: "Sworn Affidavit",

        url: "",
      },
    ],
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (val) => {
      const bodyData = {
        application_id: data.applicant.application.id,
        documents: val.document,
        update: started ? "1" : "0",
      };
      // data.applicant.application.id

      setLoading(true);
      const response = await query({
        method: "POST",
        url: "/api/applicant/application/create/documents",
        token: data.user.user.token,
        bodyData,
      });

      setLoading(false);
      if (response.success) {
        nextRun()
        // dispatch(setApplication(response.data.data.application));
        setAlert("Data saved");
        // moveToTab(8);
      } else {
        setAlert("Application failed, please try again");
      }
      setTimeout(() => {
        setAlert("");
      }, 2000);
    },
  });
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Loading loading={loading} />
      <Alert text={alertText} />
      <h2>Documents</h2>
      <FormikProvider value={formik}>
        <FieldArray
          name="document"
          render={(arrayHelpers) => {
            const { document } = formik.values;
            return (
              <>
                {document.length > 0 &&
                  document.map((stk, ind) => (
                    <div
                      className={`docs_list ${active == ind ? "active" : ""}`}
                    >
                      <div className="doc_list_item">
                        <span>{stk.name}</span>
                        <FaPlus
                          onClick={() => {
                            if (active == ind) {
                              setActive(null);
                            } else {
                              setActive(ind);
                            }
                          }}
                        />
                      </div>
                      <Input
                        placeholder={formik.values.document[ind].url}
                        type="file"
                        style={{
                          width: "90%",
                          marginLeft: 10,
                          marginRight: 10,
                        }}
                        onChange={(e) => {
                          // formik.values.uploads[index].file = "myUrlll";
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
                                formik.values.document[ind].url = data.data.url;
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
                        outlined
                        label={stk.name}
                      />
                    </div>
                  ))}
              </>
            );
          }}
        />
      </FormikProvider>

      <div className="save_next">
        <Button
          style={{
            marginRight: 20,
            backgroundColor: "#282bff",
            width: 100,
          }}
          onClick={async () => {
            const bodyData = {
              application_id: data.applicant.application.id,
              documents: formik.values.document,
              update: started ? "1" : "0",
            };
            // data.applicant.application.id

            setLoading(true);
            const response = await query({
              method: "POST",
              url: "/api/applicant/application/create/documents",
              token: data.user.user.token,
              bodyData,
            });

            setLoading(false);
            if (response.success) {
              saveData();
              // dispatch(setApplication(response.data.data.application));
              // setAlert("Data saved");
              // moveToTab(8);
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
          onClick={() => {
            console.log("daa");
            formik.handleSubmit();
          }}
          label="Next"
        />
      </div>
    </div>
  );
}

export default Documents;
