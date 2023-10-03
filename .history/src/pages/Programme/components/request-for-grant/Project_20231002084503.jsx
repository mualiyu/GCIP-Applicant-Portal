import * as React from "react";
import Table from "@mui/material/Table";
import { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { useSelector } from "react-redux";
import query from "../../../../helpers/query";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "../../../../components/Button";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function createData(sn, document, type, action) {
  return { sn, document, type, action };
}

const rows = [
  createData("1", "DRAFT AGREEMENT TEMPLATE", "PDF", "Download"),
  createData("2", "REQUEST FOR GRANT", "DOCX", "Download"),
  createData("3", "  SITE REPORT TEMPLATE", "PDF", "Download"),
];

const mapStyles = {
  height: "150px",
  width: "180%",
};

const defaultCenter = {
  lat: 7.4887,
  lng: 9.0729,
  // lat: projectDetail.latitude,
  // lng: projectDetail.longitude
};

export default function ProjectAssigned({ selectedId }) {
  const data = useSelector((state) => state);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (selectedId) {
      const fetchProjectDetails = async () => {
        try {
          const resp = await query({
            method: "GET",
            url: `/api/applicant/projects/${selectedId}`,
            token: data.user.user.token,
          });
          if (!resp.success) {
            console.log("Network response was not ok");
          }
          const dat = await resp.json();
          //   setProjectDetails(data);
          console.log(dat);
        } catch (error) {
          console.error("Error fetching project details:", error);
        }
      };

      if (selectedId) {
        fetchProjectDetails();
      }

      //   getData();
    }
  }, [selectedId]);
  //   const getData = async () => {
  //     setLoading(true);
  //     const resp = await query({
  //       method: "GET",
  //       url: `/api/applicant/projects/${selectedId}`,
  //       token: data.user.user.token,
  //     });

  //     if (resp.success) {
  //       console.log(resp);
  //       setLoading(false);
  //     }
  //   };

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
            PROJECT -{" "}
            <span style={{ textTransform: "uppercase" }}>
              {" "}
              {/* {project.lot_name}{" "} */}
            </span>
          </p>
          <div className="project_details">
            {/* <div>
              <p className="details__label b-b" style={{ paddingBottom: 10 }}>
                PROJECT DETAILS
              </p>
            </div> */}

            <section style={{ marginBottom: "2em", marginTop: "1em" }}>
              <div>
                <p className="details__label" style={{ paddingBottom: 10 }}>
                  {" "}
                  Description
                </p>
                {/* <p className="details__name">{project.description}</p> */}
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
                    {/* {project.lot_name} */}
                  </p>
                </div>
                <div>
                  <p className="details__label"> State </p>
                  <p className="details__name">
                    {/* {projectDetail.state}  */}
                    {/* {project.state} */}
                  </p>
                </div>
              </div>

              <div className="parent">
                <div style={{ marginBottom: "3em" }}>
                  <p className="details__label"> LGA </p>
                  <p className="details__name">
                    {/* {projectDetail.lga}  */}
                    {/* {project.lga} */}
                  </p>
                </div>
                <div>
                  <p className="details__label"> Community</p>
                  <p className="details__name">
                    {" "}
                    {/* {projectDetail.name_of_community}{" "} */}
                    {/* {project.name_of_community} */}
                  </p>
                </div>
              </div>
              <div>
                <p className="details__label"> Coordinates </p>
                <div className="embed_maps project_details" id="map-canvas">
                  <div>
                    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                      <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={8}
                        center={defaultCenter}>
                        <Marker position={defaultCenter} />
                      </GoogleMap>
                    </LoadScript>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="project_assigned project_details">
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
                    <TableCell align="right">ACTION</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.sn}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                      className="details__name">
                      <TableCell component="th" scope="row">
                        {row.sn}
                      </TableCell>
                      <TableCell align="right">{row.document}</TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">{row.action}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div
            className="project_assigned project_details"
            style={{ marginTop: 20 }}>
            <p className="details__label b-b" style={{ paddingBottom: 10 }}>
              {" "}
              UPLOADS
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
                  {rows.map((row) => (
                    <TableRow
                      key={row.sn}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}>
                      <TableCell component="th" scope="row">
                        {row.sn}
                      </TableCell>
                      <TableCell align="right">{row.document}</TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">{row.action}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </section>
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
      </div>
    </>
  );
}
