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

function Documents() {
  const [loading,setLoading]=useState(false)
  const [alertText,setAlert]=useState('')
  const data=useSelector(state=>state)
  const initialValues = {
    document: [
      {
        name: "Covering/forwarding letter",
        url: "",
      },
      {
        name: "Duly executed power of attorney or board resolution authorizing a designated officer of the company to act as a representative",

        url: "",
      },
      {
        name: "Certificate of incorporation with the corporate affairs commision (CAC)",

        url: "",
      },
      {
        name: "Company income tax clearance certificate valid till 2020, 2021 and 2022",

        url: "",
      },
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
        documents:val.document
      };

     
      
      setLoading(true);
      const response = await query({
        method: "POST",
        url: "/api/applicant/application/create/documents",
        token: data.user.user.token,
        bodyData,
      });
     
      setLoading(false)
      if (response.success) {
        // dispatch(setApplication(response.data.data.application));
        setAlert("Data saved");
        moveToTab(8);
      } else {
        setAlert("Application failed, please try again");
      }
      setTimeout(()=>{
   setAlert('')
      },2000)
    },
  });
  return (
    <div>
       <Loading loading={loading}/>
      <Alert text={alertText}/>
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
                    <div className="sub-group">
                      {/*
                      <Input
                        style={{ width: "15%", flex: 2, marginRight: 10 }}
                        {...formik.getFieldProps(`document.${ind}.name`)}
                        onChange={formik.handleChange}
                        outlined
                        label="Name"
                      />
                    
                     <Input
                     style={{ width: "20%" }}
                     {...formik.getFieldProps(`document.${ind})onChange={formik.handleChange}
                     outlined
                     label="Type"
                     />
                    */}
                      <Input
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
                                Authorization:
                                  "Bearer " + data.user.user.token,
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
                                setAlert("Something went wrong. KIndly Upload again");
                              }
                              setTimeout(() => {
                                setAlert("");
                              }, 2000);
                            });
                        }}
                        outlined
                        label={stk.name}
                      />
                      {/*
                      {document.length - 1 == ind && (
                    <AddButton
                          onClick={() => {
                            arrayHelpers.push({
                              id: "",
                              
                              name: "",
                              type: "",
                              url: "",
                            });
                          }}
                          label=""
                        />
                      )}

                      {document.length - 1 !== ind && (
                        <DeleteButton
                          label=""
                          onClick={() => {
                            arrayHelpers.remove(ind);
                          }}
                        />
                      )}

                       
                      */}
                    </div>
                  ))}
              </>
            );
          }}
        />
      </FormikProvider>
      <Button
        style={{
          marginTop: 20,
          marginLeft: "auto",
          width: 200,
        }}
        onClick={() => {
          formik.handleSubmit();
        }}
        label="Next"
      />
    </div>
  );
}

export default Documents;
