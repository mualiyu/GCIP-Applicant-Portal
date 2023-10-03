import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "../../../../components/Button";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import query from "../../../../helpers/query";
import ProjectAssigned from "./Project";

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

export default function ReviewAndSubmit() {
  const data = useSelector((state) => state);
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    // console.log(selectedId);
    // if (selectedId) {
    fetchProjectDetails();
    // }
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
      setProjects(data);
      console.log(resp);
      //   setProject(resp.data.data.project);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };
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
            REVIEW & SUBMIT - {projects.length}
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
                <p className="details__name">
                  DESCRIBE PROJECT HERE WITH ALL THE NECESSARY DETAILS{" "}
                </p>
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
                    Lot 0001
                  </p>
                </div>
                <div>
                  <p className="details__label"> State </p>
                  <p className="details__name">
                    {/* {projectDetail.state}  */}
                    Edo State
                  </p>
                </div>
              </div>

              <div className="parent">
                <div style={{ marginBottom: "3em" }}>
                  <p className="details__label"> LGA </p>
                  <p className="details__name">
                    {/* {projectDetail.lga}  */}
                    Etsako East LGA
                  </p>
                </div>
                <div>
                  <p className="details__label"> Community</p>
                  <p className="details__name">
                    {" "}
                    {/* {projectDetail.name_of_community}{" "} */}
                    Iviukhua Community
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
              sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
            />
          }
          label="I AM SATISFIED WITH MY SUBMISSIONS
          SO FAR"
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
