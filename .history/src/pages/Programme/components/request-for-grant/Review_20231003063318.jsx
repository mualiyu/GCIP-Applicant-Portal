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
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
// import Button from "../../../../components/Button";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import query from "../../../../helpers/query";
import ProjectAssigned from "./Project";

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
            REVIEW & SUBMIT - {projects?.length} Projects Assigned
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
          onClick={async () => {
            setLoading(true);
            const response = await query({
              method: "POST",
              url: `/api/applicant/projects/submit-proposal?satisfied=1&program_id=${data.program.id}`,
              token: programData.user.user.token,
            });

            setLoading(false);
            if (response.success) {
              console.log(response);
              // dispatch(setApplication(response.data.data.application));
              setAlert("Application Submitied");
            } else {
              setAlert("Application failed, please try again");
            }
            //   setTimeout(() => {
            //     navigate("/Home");
            //     setAlert("");
            //   }, 2000);
          }}
          label="SUBMIT APPLICATION"
        />
      </div>
    </>
  );
}
