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

export default function BusinessPlan() {
  return (
    <>
      <section>
        <section
          style={{ backgroundColor: "white", padding: 20, height: "100vh" }}>
          <p
            style={{
              marginBottom: 20,
              fontSize: 15,
              fontWeight: 900,
              fontFamily: "Roboto",
              backgroundColor: "#006439",
              color: "white",
              padding: 13,
              marginTop: "-20px",
              marginLeft: "-20px",
              width: "54vw",
            }}>
            {" "}
            SUBMISSION TEMPLATES
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
              label="I have read and understood details as applied and required in the documents as provided"
            />
            <Button
              style={{
                marginRight: 20,
                backgroundColor: "#006439",
                border: "thin solid #006438",
                color: "#006438!important",
                width: "40%",
              }}
              fontStyle={{
                color: "#006438!important",
              }}
              label="CONTINUE"
            />
          </div> */}
        </section>
      </section>
    </>
  );
}
