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
      url: `/api/applicant/program/info?programId=${programData.program.id}`,
      token: programData.user.user.token,
    });
    setLoading(false);
    console.log(data);
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
        <MoonLoader
          size={25}
          cssOverride={{ position: "absolute", left: "50%", top: "50%" }}
        />
      </>
    );
  }
  return (
    // <div className="main_tab">
    <div class="row" style={{ marginTop: 35 }}>
      <div class="col-xxl-8 col-xl-8 col-lg-8">
        <div class="card ">
          <div class="card-body">
            <div class="welcome-profile">
              <div class="card-header flex-row"></div>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <h4>{programData?.program.program.programName}</h4>
                  <p>{programData?.program.program.programDescription}</p>
                </div>
              </div>
              <ul>
                <li>
                  <a href="#">
                    <div class="user-info">
                      Program Lots :{" "}
                      <span className="inffdgshd">
                        See available Lots for this program
                      </span>
                      <ul>
                        <li>Hello</li>
                      </ul>
                    </div>
                  </a>
                </li>

                <li>
                  <a href="#">
                    <div class="user-info">
                      Program Stages :{" "}
                      <span className="inffdgshd">
                        See stages for this program
                      </span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xxl-4 col-xl-4 col-lg-4" style={{ marginLeft: 5 }}>
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Uploads Required</h4>
          </div>
          <div class="card-body">
            <div class="app-link">
              {programData?.program.program.uploads.map((upload, index) => (
                <div class="card-header flex-row">
                  <h5>
                    {index + 1}. &nbsp; {upload.name}
                  </h5>
                  <a class="" href="#">
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={() => navigate("/Programme/Application")}
        label="Continue Application"
        style={{
          // width: 200,
          marginLeft: "auto",
        }}
      />
    </div>
  );
}
