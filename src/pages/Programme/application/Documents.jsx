import { FieldArray, FormikProvider, useFormik } from "formik";
import React from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import AddButton from "../../../components/AddButton";
import DeleteButton from "../../../components/DeleteButton";

function Documents() {
  const initialValues = {
    document: [
      {
        application_id: "",
        name: "Covering/forwarding letter",
        type: "",
        url: "",
      },
      {
        application_id: "",
        name: "Duly executed power of attorney or board resolution authorizing a designated officer of the company to act as a representative",
        type: "",
        url: "",
      },
      {
        application_id: "",
        name: "Certificate of incorporation with the corporate affairs commision (CAC)",
        type: "",
        url: "",
      },
      {
        application_id: "",
        name: "Company income tax clearance certificate valid till 2020, 2021 and 2022",
        type: "",
        url: "",
      },
      {
        id: "",
        application_id: "",
        name: "Pension complaince certificate valid until 31st December 2023",
        type: "",
        url: "",
      },
      {
        id: "",
        application_id: "",
        name: "Industrial training fund (ITF) complaince certificate valid until 31st December 2023",
        type: "",
        url: "",
      },
      {
        id: "",
        application_id: "",
        name: "Industrial training fund (ITF) complaince certificate valid until 31st December 2023",
        type: "",
        url: "",
      },
      {
        id: "",
        application_id: "",
        name: "Nigerian social insurance trust fund (NSITF) complaince certificate valid until 31st December 2023",
        type: "",
        url: "",
      },
      {
        id: "",
        application_id: "",
        name: "Interim registration report (IRR) expiring on 31st December 2023",
        type: "",
        url: "",
      },
      {
        id: "",
        application_id: "",
        name: "2022, 2021, 202 Audited Accounts",
        type: "",
        url: "",
      },
      {
        id: "",
        application_id: "",
        name: "Current valid national electricity management service agency (NEMSA) licence",
        type: "",
        url: "",
      },
      {
        id: "",
        application_id: "",
        name: "Reference letter from a reputable commercial bank in Nigeria, indicating a willigness to provide credit facility for the execution of the project when needed",
        type: "",
        url: "",
      },
      {
        id: "",
        application_id: "",
        name: "Sworn Affidavit",
        type: "",
        url: "",
      },
    ],
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (val) => {
      console.log(JSON.stringify(val));
    },
  });
  return (
    <div>
      Documents
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
                     {...formik.getFieldProps(`document.${ind}.type`)}
                     onChange={formik.handleChange}
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
                        {...formik.getFieldProps(`document.${ind}.url`)}
                        onChange={formik.handleChange}
                        outlined
                        label={stk.name}
                      />
                      {/*
                      {document.length - 1 == ind && (
                    <AddButton
                          onClick={() => {
                            arrayHelpers.push({
                              id: "",
                              application_id: "",
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
