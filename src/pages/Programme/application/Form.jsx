import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import { RegularText } from "../../../components/Common";
import { useState } from "react";
import Button from "../../../components/Button";
import { useFormik } from "formik";

export default function Form() {
  const [formValues, setValues] = useState({});
  const initialValues = {
    values: formValues,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (val) => {
      console.log(val);
    },
  });
  useEffect(() => {
    const values = {};
    data.program.program.requirements.map((prg, ind) => {
      values[`${prg.name}`] = "";
    });
    // setValues(values)
    formik.setValues({ values });
  }, []);
  const conditionalINput = (type, name) => {
    switch (type) {
      case "textInput":
        return (
          <Input
            {...formik.getFieldProps(`values.${name}`)}
            onChange={formik.handleChange}
            outlined
            label={name}
          />
        );
      case "NumericInput":
        return (
          <Input
            {...formik.getFieldProps(`values.${name}`)}
            onChange={formik.handleChange}
            type="number"
            outlined
            label={name}
          />
        );
      case "CheckBox":
        return (
          <Input
            {...formik.getFieldProps(`values.${name}`)}
            onChange={formik.handleChange}
            type="checkbox"
            outlined
            label={name}
          />
        );
      case "Yes/No":
        return (
          <Select
            {...formik.getFieldProps(`values.${name}`)}
            onChange={formik.handleChange}
            options={["Yes", "No"]}
            outlined
            label={name}
          />
        );
      case "FileUpload":
        return <Input {...formik.getFieldProps(`values.${name}`)}
        onChange={formik.handleChange} type="file" outlined label={name} />;
      case "Textarea":
        return (
          <>
            <RegularText
              style={{
                marginTop: 20,
                fontWeight: "bold",
              }}
              text={name}
            />
            <textarea
              {...formik.getFieldProps(`values.${name}`)}
              onChange={formik.handleChange}
              rows={5}
              style={{ width: "98%" }}
            />
          </>
        );

      default:
        return <Input />;
    }
  };
  const data = useSelector((state) => state);

  return (
    <div className="applicant_form">
      {data.program.program.requirements.map((prg, ind) => {
        return conditionalINput(prg.type, prg.name);
      })}
      <Button 
      style={{
          width:100,
          marginTop:20,
          marginLeft:'auto'
      }}
        onClick={() => {
          //   console.log(formValues)
          formik.handleSubmit();
        }}
        label="Next"
      />
    </div>
  );
}
