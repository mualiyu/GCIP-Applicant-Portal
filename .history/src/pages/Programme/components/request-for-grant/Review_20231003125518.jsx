import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "../../../../components/Button";
import Paper from "@mui/material/Paper";
import Modal from "react-modal";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import query from "../../../../helpers/query";
import ProjectAssigned from "./Project";
import { Header } from "../../../../components/Common";
import Alert from "../../../../components/Alert";

function createData(sn, document, type, action) {
  return { sn, document, type, action };
}

const defaultCenter = {
  lat: 7.4887,
  lng: 9.0729,
  // lat: projectDetail.latitude,
  // lng: projectDetail.longitude
};

export default function ReviewAndSubmit() {
  const data = useSelector((state) => state);
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertText, setAlert] = useState("");
  const navigate = useNavigate();
  const [openSubmittedModal, setOpenSubmittedModal] = useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxHeight: "90vh",
      minWidth: "40vw",
      overflowX: "hidden",
      maxWidth: "40vw",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
  };

  useEffect(() => {
    fetchProjectDetails();
    console.log(data);
  }, []);

  const fetchProjectDetails = async () => {
    try {
      const resp = await query({
        method: "GET",
        url: `/api/applicant/projects/review/proposal`,
        token: data.user.user.token,
      });
      if (!resp.success) {
        console.log("Network response was not ok");
      }
      //   const dat = await resp.json();
      setProjects(resp.data.data.projects);
      //   checkIfRequirementsUploaded();
      console.log(resp);
      //   setProject(resp.data.data.project);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  function checkIfRequirementsUploaded(
    projectRequirementId,
    uploadedDocuments
  ) {
    if (!uploadedDocuments || !Array.isArray(uploadedDocuments)) {
      return ""; // Handle the case where uploadedDocuments is undefined or not an array
    }

    const uploadedDocument = uploadedDocuments.find(
      (doc) => doc.project_requirement_id === projectRequirementId
    );

    return uploadedDocument ? "Uploaded" : "Not Uploaded";
  }

  return (
    <>
      <section>
        <Alert text={alertText} style={{ padding: 9 }} />
        <section style={{ backgroundColor: "white", padding: 20 }}>
          <p
            style={{
              backgroundColor: "rgba(0, 100, 56, 0.25)",
              padding: "12px 25px",
              borderRadius: 7,
              marginBottom: 20,
              fontSize: 11,
              fontWeight: 900,
              fontFamily: "Roboto",
            }}>
            {" "}
            REVIEW & SUBMIT - {projects?.length} PROJECT(S) ASSIGNED
          </p>
          {projects?.map((project, index) => (
            <section style={{ position: "relative" }} key={project.id}>
              <div className="project_details">
                <section style={{ marginBottom: "2em", marginTop: "3em" }}>
                  <h5
                    style={{
                      position: "absolute",
                      left: "-35px",
                      backgroundColor: "#006439",
                      padding: "5px 11px",
                      borderRadius: "50%",
                      color: "white",
                      top: 55,
                    }}>
                    {index + 1}{" "}
                  </h5>
                  <div>
                    <p className="details__label" style={{ paddingBottom: 10 }}>
                      {" "}
                      Description
                    </p>
                    <p className="details__name">{project.description}</p>
                  </div>
                </section>

                <section
                  style={{
                    padding: "13px 7px",
                    display: "flex",
                    // alignItems: "center",
                    justifyContent: "space-between",
                  }}>
                  <div className="parent">
                    <div style={{ marginBottom: "3em" }}>
                      <p className="details__label"> Lot Name </p>
                      <p className="details__name">
                        {/* {projectDetail.lot_name}  */}
                        {project.lot_name}
                      </p>
                    </div>
                    <div>
                      <p className="details__label"> State </p>
                      <p className="details__name">{project.state}</p>
                    </div>
                  </div>

                  <div className="parent">
                    <div style={{ marginBottom: "3em" }}>
                      <p className="details__label"> LGA </p>
                      <p className="details__name">{project.lga}</p>
                    </div>
                    <div>
                      <p className="details__label"> Community</p>
                      <p className="details__name">
                        {" "}
                        {project.name_of_community}
                      </p>
                    </div>
                  </div>
                  <div className="parent">
                    <div style={{ marginBottom: "3em" }}>
                      <p className="details__label"> Coordinates</p>
                      <p className="details__name"> {project.coordinate}</p>
                    </div>
                  </div>
                  {/* <div>
                    <p className="details__label"> Coordinates </p>
                    <div className="embed_maps project_details" id="map-canvas">
                      <div>
                        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                          <GoogleMap
                            // mapContainerStyle={mapStyles}
                            zoom={8}
                            center={defaultCenter}>
                            <Marker position={defaultCenter} />
                          </GoogleMap>
                        </LoadScript>
                      </div>
                    </div>
                  </div> */}
                </section>
              </div>
              <div className="project_assigned project_details">
                <p className="details__label b-b" style={{ paddingBottom: 10 }}>
                  {" "}
                  PROJECT REQUIREMENTS
                </p>

                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>S/N</TableCell>
                        <TableCell>DOCUMENT</TableCell>
                        <TableCell>STATUS</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {project?.project_requirements?.map((req, index) => {
                        return (
                          <TableRow
                            key={req.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                            className="details__name">
                            <TableCell component="th" scope="row">
                              {index + 1}
                            </TableCell>
                            <TableCell align="right">{req.name}</TableCell>
                            <TableCell align="right">
                              {checkIfRequirementsUploaded(
                                req.id,
                                project.applicant_uploaded_documents
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>

              {/* <div className="project_assigned project_details">
                <p className="details__label b-b" style={{ paddingBottom: 10 }}>
                  {" "}
                  PROJECT DOCUMENTS
                </p>

                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>S/N</TableCell>
                        <TableCell>DOCUMENT</TableCell>
                        <TableCell align="right">TYPE</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {project?.project_documents?.map((doc, index) => (
                        <TableRow
                          key={doc.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          className="details__name">
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>
                          <TableCell align="right">{doc.name}</TableCell>
                          <TableCell align="right">
                            {doc?.url?.slice(doc.url.lastIndexOf(".") + 1)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div> */}
            </section>
          ))}
        </section>
        <section></section>
        <section></section>
      </section>
      {!loading && (
        <div
          style={{
            display: "flex",
            marginTop: "35%",
            width: "70%",
            float: "right",
          }}>
          <FormControlLabel
            style={{ width: "85%" }}
            control={
              <Checkbox
                defaultChecked
                disabled
                sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
              />
            }
            label="I AM SATISFIED WITH MY SUBMISSIONS
          SO FAR"
          />
          <Button
            style={{
              // width: 200,
              marginLeft: "auto",
              marginTop: 20,
            }}
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              const response = await query({
                method: "POST",
                url: `/api/applicant/projects/submit-proposal?satisfied=1&program_id=${data.program.id}`,
                token: data.user.user.token,
              });

              setLoading(false);
              if (response.success) {
                console.log(response);
                // dispatch(setApplication(response.data.data.application));
                setOpenSubmittedModal(true);
              } else {
                setAlert(response.data.message);
              }
              // setTimeout(() => {
              //   navigate("/Programme/Application");
              //   setAlert("");
              // }, 5000);
            }}
            label="SUBMIT APPLICATION"
          />
        </div>
      )}
      <Modal
        isOpen={openSubmittedModal}
        appElement={document.getElementById("root")}
        style={customStyles}>
        <div
          className=""
          style={{
            display: "flex",
            flexDirection: "column",
          }}>
          <Header text="APPLICATION SUBMITTED" />
          <div className="">
            <p style={{ lineHeight: "2em", fontSize: 12, paddingTop: 30 }}>
              WE HAVE RECEIVED YOUR APPLICATION AND WE SHALL EVALUATE DOCUMENTS
              YOU HAVE PROVIDED AS REQUESTED. MEANWHILE, YOU SHOULD GET AN EMAIL
              SHORTLY. THANK YOU
            </p>
          </div>

          <div
            style={{
              display: "flex",
              width: "25%",
              marginTop: 48,
              justifyContent: "space-between",
              marginLeft: "auto",
            }}>
            <Button
              onClick={() => {
                setOpenSubmittedModal(false);
                navigate("/Programme/Application");
              }}
              fontStyle={{
                color: "var(--primary)",
              }}
              style={{
                width: 134,
                backgroundColor: "#fff",
                border: "1px solid var(--primary)",
              }}
              label="OK, CLOSE"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
