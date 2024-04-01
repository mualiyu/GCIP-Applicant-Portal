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
                  <h4>Welcome, Ahmed Peter</h4>
                  <p>Here is a summary of your business profile</p>
                </div>
              </div>
              <ul>
                <li>
                  <a href="#">
                    <div class="user-info">
                      Company Name : <span className="inffdgshd">Company</span>
                    </div>
                  </a>
                </li>

                <li>
                  <a href="#">
                    <div class="user-info">
                      Address : <span className="inffdgshd">My Address</span>
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
            <h4 class="card-title">Update Your Business Profile</h4>
          </div>
          <div class="card-body">
            <div class="app-link">
              <div class="card-header flex-row">
                <h5>Update Profile</h5>
                <a class="" href="#">
                  Update
                </a>
              </div>
              <div class="card-header flex-row">
                <h5>Change Password</h5>
                <a class="" href="#">
                  Change
                </a>
              </div>
              <div class="card-header flex-row">
                <h5>Add JV/Consortium</h5>
                <a class="" href="#">
                  Update
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}

      <Header
        className="header"
        text={programData.program.program.programName}
      />
      <div className="program_editor">
        <div
          style={{
            textAlign: "justify",
          }}
          dangerouslySetInnerHTML={{
            __html: programData.program.program.programDescription,
          }}></div>
      </div>
      <Button
        onClick={() => navigate("/Programme/Application")}
        label="GO TO APPLICATION"
        style={{
          // width: 200,
          marginLeft: "auto",
        }}
      />
    </div>
  );
}
