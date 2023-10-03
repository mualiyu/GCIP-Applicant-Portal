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
      <p
        style={{
          backgroundColor: "rgba(0, 100, 56, 0.25)",
          padding: "12px 25px",
          borderRadius: 7,
          marginBottom: 20,
          fontSize: 11,
        }}>
        {" "}
        PROJECT NAME{" "}
      </p>

      <section>
        <section>
          <div className="project_details">
            <div>
              <p className="b-b"> Project Details</p>
            </div>

            <section
              style={{
                padding: "13px 7px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <div>
                <p className="details__name">
                  {/* {projectDetail.lot_name}  */}
                  Lot 0001
                </p>
                <p className="details__label"> Lot Name </p>
              </div>
              <div>
                <p className="details__name">
                  {/* {projectDetail.coordinate}  */}
                  22.213434N, 1234242E
                </p>
                <p className="details__label"> Coordinates </p>
              </div>
              <div>
                <p className="details__name">
                  {" "}
                  {/* {moment(projectDetail.created_at).format("ll")}{" "} */}
                  22 Oct. 2023
                </p>
                <p className="details__label"> Created At </p>
              </div>
            </section>
            <section
              style={{
                padding: "13px 7px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <div>
                <p className="details__name">
                  {/* {projectDetail.state}  */}
                  Edo State
                </p>
                <p className="details__label"> State </p>
              </div>
              <div>
                <p className="details__name">
                  {/* {projectDetail.lga}  */}
                  Etsako East LGA
                </p>
                <p className="details__label"> LGA </p>
              </div>
              <div>
                <p className="details__name">
                  {" "}
                  {/* {projectDetail.name_of_community}{" "} */}
                  Iviukhua Community
                </p>
                <p className="details__label"> Community</p>
              </div>
            </section>
            <section>
              <div>
                <p className="details__label" style={{ paddingBottom: 4 }}>
                  {" "}
                  Description
                </p>
                <p className="details__name">
                  DESCRIBE PROJECT HERE WITH ALL THE NECESSARY DETAILS{" "}
                </p>
              </div>
            </section>
          </div>
          <div className="project_assigned project_details">
            <p className="b-b">Project Requirements </p>

            <div style={{ padding: 15 }}>
              {/* {
                <ol className="req">
                  {projectDetail?.project_requirements?.map((req, index) => (
                    <li key={req.id}> {req.name}</li>
                  ))}
                </ol>
              } */}
              <ol className="req">
                <li>Project Requirement 1</li>
                <li>Project Requirement 2</li>
                <li>Project Requirement 3</li>
              </ol>
            </div>
          </div>

          <div className="project_assigned project_details">
            <p className="b-b">Project Documents </p>

            <div style={{ padding: 15 }}>
              {/* { */}
              <ol className="req">
                {/* {projectDetail?.project_documents?.map((doc, index) => ( */}
                <li
                // key={doc.id}
                >
                  Project Document 1
                  <span
                    onClick={() => {
                      //   let a = document.createElement("a");
                      //   a.href = doc.url;
                      //   a.download = doc.name;
                      //   a.target = "_blank";
                      //   a.click();
                    }}>
                    {" "}
                    Click to Download{" "}
                  </span>{" "}
                </li>
                {/* ))} */}
              </ol>
            </div>
          </div>
        </section>
        <section></section>
        <section></section>
      </section>
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
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
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
          label="I have read and understood details as applied and required in the documents as provided"
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
          label="CONTINUE"
        />
      </div>
    </>
  );
}
