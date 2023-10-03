import * as React from "react";
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

function createData(sn, document, type, action) {
  return { sn, document, type, action };
}

const rows = [
  createData("1", "Business Plan Template", "PDF", "Download"),
  createData("2", "Financial Model Template", "DOCX", "Download"),
];

export default function ProjectAssigned() {
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
            }}>
            {" "}
            PROJECT 1{" "}
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
                {/* <p className="details__label"> Created At </p> */}
                <p className="details__name">
                  {" "}
                  {/* {moment(projectDetail.created_at).format("ll")}{" "} */}
                  22 Oct. 2023
                </p>
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

          <div className="project_assigned project_details">
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
