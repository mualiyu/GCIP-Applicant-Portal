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
        id: "",
        application_id: "",
        name: "",
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
                      <Input
                        style={{
                          width: "20%",
                          marginLeft: 10,
                          marginRight: 10,
                        }}
                        {...formik.getFieldProps(`document.${ind}.url`)}
                        onChange={formik.handleChange}
                        outlined
                        label="File"
                      />

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
