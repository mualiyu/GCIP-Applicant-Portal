import React, { useEffect } from "react";
import "../styles/home.css";
import { Fade } from "react-awesome-reveal";
import { FaEdit, FaTrash, FaTimesCircle, FaFolderOpen } from "react-icons/fa";
import { useState } from "react";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../components/Alert";
import query from "../../helpers/query";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

export default function Submissions() {
  const [buttonLoading, setButtonLoading] = useState({});
  const [loading, setLoading] = useState(true);
  const [allSubmissions, setAllSubmissions] = useState([]);
  const [successful, setSuccessful] = useState([]);
  const [review, setReview] = useState([]);
  const [unSuccessful, setUnSuccessful] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [submitted, setSubmitted] = useState([]);
  const [queried, setQueried] = useState([]);
  const [submissionType, setSubmissionType] = useState("");
  // const [allSubmissions, setAllSubmissions] = useState([]);
  const [alertText, setAlert] = useState("");
  const programData = useSelector((state) => state);
  const navigate = useNavigate();
  const { programId } = useParams();

  const url = `/api/admin/program/applications/get-all?program_id=${programId}`;

  const getAllSubmissions = async () => {
    setLoading(true);
    const { success, data, error } = await query({
      method: "GET",
      url: url,
      token: programData?.user.user.token,
    });
    // console.log(url);
    console.log(submissionType);
    setLoading(false);
    console.log(data);
    if (success) {
      console.log(data.data);
      setAllSubmissions(data.data);
      setLoading(false);
    }
  };

  const setRowLoadingState = (rowIndex, isLoading) => {
    setButtonLoading((prevState) => ({
      ...prevState,
      [rowIndex]: isLoading,
    }));
  };

  const seeDetails = (applicant) => {
    console.log(applicant.id);
    if (
      window.location.toString().includes("/Programme/Application/Submissions")
    ) {
      navigate(
        `/Programme/Application/Submissions/${programId}/Applicant/${applicant.id}`,
        {
          state: { selectedCompany: applicant },
        }
      );
    } else {
      navigate(`/Home/Submissions/${programId}/applicant/${applicant_id}`, {
        state: { selectedCompany: applicant },
      });
    }
  };

  useEffect(() => {
    console.log({ programId });
    if (url) {
      getAllSubmissions();
    }
  }, [url, submissionType]);

  return (
    <Fade>
      {loading && <Loading loading={loading} />}

      {!loading && (
        <div className="home_container">
          <Alert text={alertText} />
          <div className="home_top col-12">
            <div class="row" style={{ width: "100%" }}>
              <div className="flex my-xl">
                <div>
                  <h4 class="header-title">Submissions</h4>
                  <p class="text-muted fs-14">See all submissions</p>
                </div>
              </div>

              <div class="col-12">
                <div class="card" style={{ width: "100%" }}>
                  <div class="card-body">
                    <table
                      id="fixed-columns-datatable"
                      class="table table-striped nowrap row-border order-column w-100">
                      <thead>
                        <tr>
                          <th>S/N</th>
                          <th style={{ width: 200 }}>Company</th>
                          <th>Contact</th>
                          <th>Submitted</th>
                          <th>Status</th>
                          <th>Evaluated At</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      {/* <tbody>
                        {allSubmissions?.map((submission, rowIndex) => (
                          <tr key={submission.applicant.id}>
                            <td>{rowIndex + 1}</td>
                            <td>
                              {submission?.applicant.name} (RC:{" "}
                              {submission?.applicant.rc_number})
                              <br />
                              {submission?.applicant.person_incharge}
                            </td>
                            <td>
                              {submission.applicant.email} <br />0
                              {submission.applicant.phone}
                            </td>
                            <td>
                              {moment(submission?.applicant.updated_at).format(
                                "ll"
                              )}{" "}
                              @
                              {moment(submission?.applicant.updated_at).format(
                                "LT"
                              )}
                            </td>
                            <td
                              style={{
                                color:
                                  submission?.status == 2
                                    ? "#aabf10"
                                    : submission?.status == 3
                                    ? "green"
                                    : submission?.status == 1
                                    ? "orange"
                                    : "red",
                              }}>
                              {submission?.status == 1
                                ? "Submitted"
                                : submission?.status == 2
                                ? "Queried"
                                : submission?.status == 3
                                ? "Successful"
                                : submission?.status == 5
                                ? "Under Review"
                                : "Unsuccessful"}
                            </td>
                            <td>
                              {moment(submission?.updated_at).format("ll")} @
                              {moment(submission?.updated_at).format("LT")}
                            </td>
                            <td>
                              <button
                                style={{
                                  backgroundColor: "#124d92",
                                  border: "none",
                                  color: "white",
                                  marginRight: 4,
                                  padding: "9px 22px",
                                  cursor: "pointer",
                                }}
                                disabled={buttonLoading[rowIndex]}
                                onClick={() => seeDetails(submission)}>
                                more details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody> */}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fade>
  );
}
