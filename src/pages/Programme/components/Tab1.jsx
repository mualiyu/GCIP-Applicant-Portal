import { Editor } from "@tinymce/tinymce-react";
import React, { useRef } from "react";
import Input from "../../../components/Input";
import { Header, RegularText } from "../../../components/Common";
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
import { useLocation, useNavigate } from "react-router-dom";
import query from "../../../helpers/query";
import { MoonLoader } from "react-spinners";
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
  const navigate = useNavigate();
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
         <MoonLoader size={25}  cssOverride={{position: 'absolute', left: '50%', top: '50%'}} />
      </>
    );
  }
  return (
    <div className="main_tab">
      <h2 style={{ width: "100%", textAlign: "justify" }}>
        {programData.program.program.programName}
      </h2>

      <div className="program_editor">
        <div
          style={{
            textAlign: "justify",
          }}
          dangerouslySetInnerHTML={{
            __html: programData.program.program.programDescription,
          }}
        ></div>
      </div>
      <Button
        onClick={() => navigate("/Programme/Application")}
        label="GO TO APPLICATION"
        style={{
          width: 200,
          marginLeft: "auto",
        }}
      />
    </div>
  );
}
