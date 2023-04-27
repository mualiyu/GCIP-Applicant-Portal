import { Editor } from "@tinymce/tinymce-react";
import React, { useRef } from "react";
import Input from "../../../components/Input";
import { RegularText } from "../../../components/Common";
import { useFormik } from "formik";
import Button from "../../../components/Button";
import * as Yup from "yup";
import Alert from "../../../components/Alert";
import { useDispatch, useSelector } from "react-redux";
import {
  setProgramDesc,
  setProgramName,
} from "../../../redux/program/programSlice";
import { useEffect } from "react";
import { useState } from "react";
const validationSchema = Yup.object({
  programName: Yup.string()    
  .required(),
  
});

export default function Tab1({ moveToTab }) {
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const [alertText, setAlert] = useState("");
  const programData = useSelector((state) => state.program);
  const initialValues = {
    programName: programData.program.programName,
    programDescription: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (val) => {
      if (editorRef.current) {
        formik.values.programDescription = editorRef.current.getContent();
      }
      dispatch(setProgramDesc(val.programDescription));
      dispatch(setProgramName(val.programName));
      moveToTab(1);
    },
    validationSchema
  });

  return (
    <>
      
      
      <Input
      disabled
      error={
        formik.touched.programName && formik.errors.programName
          ? formik.errors.programName
          : ""
      }
        id="programName"
        {...formik.getFieldProps(`programName`)}
        onChange={formik.handleChange}
        required
        outlined
        style={{ width: "90%" }}
        label="Program Name"
      />

      <div className="program_editor">
        <div>
          <RegularText
            style={{
              fontSize: 16,
              fontWeight: "600",
              marginBottom: 0,
            }}
            text={`Description`}
          />
          <span>*</span>
        </div>
        <Editor
        disabled
          apiKey="2bibih7gzun78pn5zdau9mp238v6osoplllh9qw1lgb3rzws"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={programData.program.programDescription}
          init={{
            height: 400,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        {/* <div className="save_next">
          <Button
            onClick={() => {
              if (editorRef.current) {
                formik.values.programDescription =
                  editorRef.current.getContent();
              }
              dispatch(setProgramDesc(editorRef.current.getContent()));
              dispatch(setProgramName(formik.values.programName));
              setAlert("Data Saved");
              setTimeout(() => {
                setAlert("");
              }, 2000);
            }}
            style={{
              width: 200,
              marginRight: 20,
              backgroundColor: "#1094ff",
            }}
            label="Save"
          />
          <Button
            onClick={() => {
              formik.handleSubmit();
            }}
            style={{
              width: 200,
            }}
            label="Next"
          />
        </div> */}
      </div>
    </>
  );
}
