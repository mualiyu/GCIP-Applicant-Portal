import * as React from "react";
import Table from "@mui/material/Table";
import { useEffect, useState, useMemo } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { useSelector } from "react-redux";
import { MoonLoader } from "react-spinners";
import Loading from "../../../../components/Loading";
import query from "../../../../helpers/query";
import Alert from "../../../../components/Alert";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Map } from "@googlemaps/react-wrapper";
import Button from "../../../../components/Button";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function createData(sn, document, type, action) {
  return { sn, document, type, action };
}

const mapStyles = {
  height: "150px",
  width: "100%",
};

const defaultCenter = {
  lat: 7.4887,
  lng: 9.0729,
  //   lat: projectDetail.latitude,
  //   lng: projectDetail.longitude,
};

export default function ProjectAssigned({ selectedId, isDone }) {
  const data = useSelector((state) => state);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({});
  const [alertText, setAlert] = useState("");
  const [mapLocation, setMapLocation] = useState();
  const [docReq, setDocReq] = useState({
    name: "",
    project_requirement_id: "",
    url: "",
  });

  useEffect(() => {
    console.log(selectedId);
    setLoading(true);
    if (selectedId) {
      fetchProjectDetails();
      //   const script = document.createElement("script");
      //   script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCq0FkBTNIx5IuAea1vMP2WXr1YMkQdj3o&libraries=places`;
      //   script.async = true;
      //   document.body.appendChild(script);

      //   script.onload = () => {
      //     initMap();
      //   };
    }
  }, [selectedId, uploadStatus]);

  const fetchProjectDetails = async () => {
    try {
      const resp = await query({
        method: "GET",
        url: `/api/applicant/projects/${selectedId}`,
        token: data.user.user.token,
      });
      if (!resp.success) {
        setAlert("Network response was not ok. Try again");
      }
      setProject(resp.data.data.project);
      const latlngStr = resp?.data?.data?.project?.coordinate.split(",", 2);
      console.log(latlngStr);

      const latlng = {
        // lat: parseFloat(latlngStr[0]),
        // lng: parseFloat(latlngStr[1]),
        lat: 9.069386,
        lng: 7.487286,
      };
      setMapLocation(latlng);
      checkIfRequirementsUploaded();
      //   isDone(true);
      setLoading(false);
    } catch (error) {
      setAlert("Error fetching project details:");
    }
    setLoading(false);
  };

  function checkIfRequirementsUploaded(
    projectRequirementId,
    uploadedDocuments
  ) {
    if (!uploadedDocuments || !Array.isArray(uploadedDocuments)) {
      return "";
    }

    const uploadedDocument = uploadedDocuments.find(
      (doc) => doc.project_requirement_id === projectRequirementId
    );

    return uploadedDocument ? "Uploaded" : "Not Uploaded";
  }

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
          isDone(true);

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

  return (
    <>
      <section>
        {loading && (
          <MoonLoader
            size={25}
            cssOverride={{ position: "absolute", left: "50%", top: "50%" }}
          />
        )}
        <Alert text={alertText} style={{ padding: 9 }} />
        <section style={{ backgroundColor: "white", padding: 20 }}>
          <p
            style={{
              marginBottom: 20,
              fontSize: 15,
              fontWeight: 900,
              fontFamily: "Roboto",
              backgroundColor: "rgba(0, 100, 56, 0.25)",
              color: "black",
              padding: 13,
              //   marginTop: "-20px",
              //   marginLeft: "-20px",
              width: "54vw",
            }}>
            {" "}
            PROJECT -{" "}
            <span style={{ textTransform: "uppercase" }}>
              {" "}
              {project?.lot_name}{" "}
            </span>
          </p>
          <div className="project_details">
            <section style={{ marginBottom: "2em", marginTop: "1em" }}>
              <div>
                <p className="details__label" style={{ paddingBottom: 10 }}>
                  {" "}
                  Project Description
                </p>
                <p className="details__name">{project?.description}</p>
              </div>
            </section>

            <section
              style={{
                padding: "13px 7px",
                display: "flex",
                justifyContent: "space-between",
              }}>
              <div className="parent">
                <div style={{ marginBottom: "3em" }}>
                  <p className="details__label"> Lot Name </p>
                  <p className="details__name">{project?.lot_name}</p>
                </div>
                <div>
                  <p className="details__label"> State </p>
                  <p className="details__name">{project?.state}</p>
                </div>
              </div>

              <div className="parent">
                <div style={{ marginBottom: "3em" }}>
                  <p className="details__label"> LGA </p>
                  <p className="details__name">{project?.lga}</p>
                </div>
                <div>
                  <p className="details__label"> Community</p>
                  <p className="details__name">{project?.name_of_community}</p>
                </div>
              </div>
              <div style={{ width: "40%" }}>
                {/* AIzaSyCq0FkBTNIx5IuAea1vMP2WXr1YMkQdj3o */}
                <p className="details__label"> Coordinates </p>
                <div className="embed_maps project_details" id="map-canvas">
                  <div>
                    <LoadScript googleMapsApiKey="AIzaSyCq0FkBTNIx5IuAea1vMP2WXr1YMkQdj3o">
                      <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={15}
                        center={mapLocation}
                        options={{
                          zoomControl: false,
                          streetViewControl: false,
                          mapTypeControl: false,
                          fullscreenControl: false,
                        }}>
                        <Marker position={mapLocation} />
                        <Marker position={mapLocation} />
                      </GoogleMap>
                    </LoadScript>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="project_assigned project_details">
            <p
              className="details__label b-b"
              style={{
                paddingBottom: 10,
                color: "#006439",
                marginTop: 30,
                fontWeight: 900,
                fontFamily: "sans-serif",
              }}>
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
                    <TableCell align="right">ACTION</TableCell>
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
                      <TableCell
                        align="right"
                        onClick={() => {
                          var a = document.createElement("a");
                          a.href = doc?.url;
                          a.download = doc?.name;
                          a.target = "_blank";
                          a.click();
                        }}
                        style={{ cursor: "pointer" }}
                        label="Download">
                        DOWNLOAD
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div
            className="project_assigned project_details"
            style={{ marginTop: 20 }}>
            <p
              className="details__label b-b"
              style={{
                paddingBottom: 10,
                color: "#006439",
                marginTop: 30,
                fontWeight: 900,
                fontFamily: "sans-serif",
              }}>
              {" "}
              UPLOADS
            </p>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>S/N</TableCell>
                    <TableCell>DOCUMENT</TableCell>
                    <TableCell align="right">STATUS</TableCell>
                    <TableCell align="right">ACTION</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {project?.project_requirements?.map((req, index) => (
                    <TableRow
                      key={req.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="right">{req.name}</TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color:
                            uploadStatus[req.id] === "Uploaded"
                              ? "green"
                              : "red",
                        }}>
                        {checkIfRequirementsUploaded(
                          req.id,
                          project.applicant_uploaded_documents
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <input
                          type="file"
                          onChange={(e) => {
                            const formData = new FormData();
                            const files = e.target.files;
                            files?.length && formData.append("file", files[0]);
                            setLoading(true);
                            setAlert("Uploading file...");
                            if (files) {
                              fetch(
                                "https://api.grants.amp.gefundp.rea.gov.ng/api/applicant/projects/file/upload",
                                {
                                  method: "POST",
                                  body: formData,
                                  headers: {
                                    Authorization:
                                      "Bearer " + data.user.user.token,
                                  },
                                }
                              )
                                .then((res) => res.json())
                                .then((data) => {
                                  console.log(data);

                                  //   setDocReq(docToUpload);
                                  //   console.log(docReq);
                                  uploadSelectedDocument(
                                    req.id,
                                    data.data.url,
                                    req.name
                                  );
                                  // } else {
                                  //   setAlert(
                                  //     "Oops! Not your fault, Please try again"
                                  //   );
                                  // }
                                })
                                .catch((err) => {
                                  setAlert(data.message);
                                });
                              setTimeout(() => {
                                setAlert("");
                              }, 3000);
                            }
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </section>
      </section>

      {/* <div
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
              sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
            />
          }
          label="All required fields have been completed"
        />
        <Button
          lineButton
          style={{
            marginRight: 20,
            backgroundColor: "white",
            border: "thin solid #006438",
            color: "#006438!important",
            width: "40%",
          }}
          fontStyle={{
            color: "#006438!important",
          }}
          label="SAVE & CONTINUE"
        />
      </div> */}
    </>
  );
}
