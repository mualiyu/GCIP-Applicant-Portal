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
  setProgram,
  setProgramDesc,
  setProgramName,
} from "../../../redux/program/programSlice";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import query from "../../../helpers/query";
const validationSchema = Yup.object({
  programName: Yup.string().required(),
});

export default function Tab1({ moveToTab }) {
  const location = useLocation();
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const [alertText, setAlert] = useState("");
  const programData = useSelector((state) => state);
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(true);

  const initialValues = {
    programName: programData.program.program.programName,
    programDescription: "",
  };
  const getProgram = async () => {
    const { success, data, error } = await query({
      method: "GET",
      url: `/api/applicant/program/info/v2?programId=${programData.program.id}`,
      token: programData.user.user.token,
    });
    setLoading(false);

    if (success) {
      dispatch(setProgram({ program: data.data.program }));
      // setCurrent(data.data.programs);
    }
  };
  useEffect(() => {
    getProgram();
  }, []);
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
    validationSchema,
  });

  if (loading) {
    return (
      <>
        <img src="/loading.gif" id="loader" />
      </>
    );
  }
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
        value={programData.program.program.programName}
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
          initialValue={programData.program.program.programDescription}
          init={{
            min_height: "80vh",
            menubar: false,

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
