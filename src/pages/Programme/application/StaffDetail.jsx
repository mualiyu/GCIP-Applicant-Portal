import React from "react";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import { FieldArray, FormikProvider, useFormik } from "formik";
import AddButton from "../../../components/AddButton";
import DeleteButton from "../../../components/DeleteButton";

export default function StaffDetail() {
  const initialValues = {
    education: [
      { type: "", name: "", start_date: "", end_date: "", school: "" },
    ],
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (val) => {
      console.log(JSON.stringify(val));
    },
  });
  return (
    <div className="staff_detail_cont">
      <h2>Applicant CV*</h2>
      <FormikProvider value={formik}>
        <Input outlined label="Name" />
        <Input type="date" outlined label="DOB" />
        <Input  outlined label="Language" />
        <Input  outlined label="Employer" />
        <Input  outlined label="Employer2" />
        <Select label="Nationality" options={["Nigerian"]} />
        <h2>Education Records</h2>
        <FieldArray
          name="education"
          render={(arrayHelpers) => {
            const education = formik.values.education;
            return (
              <>
                {education.length > 0 &&
                  education.map((stk, ind) => (
                    <div className="sub-group">
                      <Select
                        options={["Bsc"]}
                        style={{ width: "15%" }}
                        {...formik.getFieldProps(`education.${ind}.type`)}
                        onChange={formik.handleChange}
                        outlined
                        label="Qualification"
                      />
                      <Input
                        style={{ width: "15%" }}
                        {...formik.getFieldProps(`education.${ind}.name`)}
                        onChange={formik.handleChange}
                        outlined
                        label="Course"
                      />
                      <Input
                        style={{ width: "15%" }}
                        {...formik.getFieldProps(`education.${ind}.school`)}
                        onChange={formik.handleChange}
                        outlined
                        label="School Name"
                      />
                      <Input
                        style={{ width: "15%" }}
                        {...formik.getFieldProps(`education.${ind}.start_date`)}
                        onChange={formik.handleChange}
                        outlined
                        label="Start Date"
                        type="date"
                      />
                      <Input
                        style={{ width: "15%" }}
                        {...formik.getFieldProps(`education.${ind}.address`)}
                        onChange={formik.handleChange}
                        outlined
                        label="End date"
                        type="date"
                      />

                      {education.length - 1 == ind && (
                        <AddButton
                          onClick={() => {
                            arrayHelpers.push({
                              type: "",
                              name: "",
                              start_date: "",
                              end_date: "",
                              school: "",
                            });
                          }}
                          label=""
                        />
                      )}
                      {education.length - 1 !== ind && (
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
    </div>
  );
}
