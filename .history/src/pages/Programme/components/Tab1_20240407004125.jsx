import { Editor } from "@tinymce/tinymce-react";
import React, { useRef } from "react";
import moment from "moment";
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
    }
  };

  useEffect(() => {
    getProgram();
  }, []);

  const handleDownload = (url) => {
    console.log(url);
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.setAttribute("download", true);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const uploadSelectedDocument = async (id, url, name) => {
    if (url) {
      const docToUpload = {
        name: name,
        project_requirement_id: id,
        url: url,
      };

      if (id) {
        console.log(docToUpload);
        setLoading(true);
        const resp = await query({
          method: "POST",
          url: `/api/applicant/projects/submit-requirement`,
          token: data.user.user.token,
          bodyData: docToUpload,
        });

        if (resp.success) {
          setAlert(`${resp.data.message}`);
          setUploadStatus((prevStatus) => ({
            ...prevStatus,
            [id]: "Uploaded",
          }));
          //   isDone(true);

          setTimeout(() => {
            setAlert("");
          }, 3000);
        }
        setAlert(`${resp.data.message}`);
        fetchProjectDetails();
        setLoading(false);
      }
    }
  };

  const onLotSelection = async (lotID, lotName) => {
    // setLoading(true);
    let selection = {
      update: "0",
      program_id: programData.program.id,
      lots: [
        {
          id: lotID,
          name: lotName,
        },
      ],
    };

    // console.log(selection);
    const { success, data, error } = await query({
      method: "POST",
      url: "/api/applicant/application/create/initial",
      token: programData.user.user.token,
      bodyData: selection,
    });
    console.log(selection);
    console.log(error);
    // if (success) {
    //   // console
    //   setAlert(`${data}`);
    //   setTimeout(() => {
    //     setAlert("");
    //   }, 3000);
    //   setLoading(false);
    // }

    // if (error) setAlert(`${data}`);
    // setTimeout(() => {
    //   setAlert("");
    // }, 3000);
    // setLoading(false);
    // dispatch(setProgramId(data.id));
    // navigate("/Programme");
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
      <Alert text={alertText} style={{ padding: 9 }} />
      <div class="col-xxl-8 col-xl-8 col-lg-8">
        <div class="card ">
          <div class="card-body">
            <div class="welcome-profile">
              <div class="card-header flex-row"></div>
              <div class="d-flex align-items-center">
                <div class="ms-3">
                  <h4 style={{ marginBottom: 10 }}>
                    {programData?.program.program.programName}
                  </h4>
                  <p style={{ lineHeight: "2rem" }}>
                    {programData?.program.program.programDescription}
                  </p>
                </div>
              </div>

              <ul>
                <div
                  class="user-info"
                  style={{ fontWeight: 900, color: "red" }}>
                  Program Lots :
                  <span className="inffdgshd">
                    (You are allowed to select a maximum of 1 lot)
                  </span>
                </div>
                {programData?.program.program.lots.map((lot, index) => (
                  <li style={{ margin: "10px 0" }}>
                    <a href="#" style={{ display: "flex" }}>
                      <span className="inffdgshd">
                        {index + 1}. &nbsp; &nbsp; {lot.name}
                      </span>
                      <button
                        onClick={() => onLotSelection(lot.id, lot.name)}
                        disabled={loading}
                        style={{
                          backgroundColor: "#1a1889",
                          paddingLeft: 20,
                          borderRadius: 0,
                          marginLeft: 0,
                          marginLeft: "auto",
                          width: 150,
                          border: 0,
                          outline: "none",
                          color: "#fff",
                        }}>
                        {" "}
                        Continue{" "}
                      </button>
                    </a>
                  </li>
                ))}

                <li style={{ marginTop: 35 }}>
                  <a href="#">
                    <div class="user-info">
                      <p className="b-b-dashed">Program Stages : </p>
                      {programData?.program.program.stages.map(
                        (stage, index) => (
                          <div className=" b-b-dashed">
                            <span className="inffdgshd">
                              ** <strong>Name</strong> : {stage.name} <br />
                              &nbsp; &nbsp; &nbsp; <strong>
                                Description
                              </strong>: {stage.description} <br />
                              <span
                                style={{
                                  display: "flex",
                                }}>
                                <p style={{ marginRight: 60 }}>
                                  &nbsp; &nbsp; &nbsp;{" "}
                                  <strong>Start Date</strong> :{" "}
                                  {moment(stage.startDate).format("ll")}
                                </p>
                                <p>
                                  &nbsp; &nbsp; &nbsp;{" "}
                                  <strong> End Date </strong>:{" "}
                                  {moment(stage.endDate).format("ll")}
                                </p>
                              </span>
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xxl-5 col-xl-5 col-lg-5" style={{ marginLeft: 5 }}>
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Uploads Required</h4>
          </div>
          <div class="card-body">
            <div class="app-link">
              {programData?.program.program.uploads.map((upload, index) => (
                <div
                  class="card-header flex-row"
                  style={{ justifyContent: "space-between" }}>
                  <h5>
                    {index + 1}. &nbsp; {upload.name}
                  </h5>{" "}
                  &nbsp; &nbsp; &nbsp;
                  <p
                    className="download_link"
                    onClick={() => handleDownload(upload.file)}>
                    Download
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <Button
        onClick={() => navigate("/Programme/Application")}
        label="Continue Application"
        style={{
          backgroundColor: "#1a1889",
          paddingLeft: 20,
          borderRadius: 0,
          marginLeft: 0,
          marginLeft: "auto",
        }}
      /> */}
    </div>
  );
}
