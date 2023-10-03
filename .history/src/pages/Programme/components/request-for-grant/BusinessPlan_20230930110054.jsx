import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(sn, document, type, action) {
  return { sn, document, type, action };
}

const rows = [
  createData("Business Plan Template", "PDF", "Download"),
  createData("Financial Model Template", "DOCX", "Download"),
];

export default function BusinessPlan() {
  return (
    <>
      <p
        style={{
          backgroundColor: "rgba(0, 100, 56, 0.25)",
          padding: "12px 25px",
          borderRadius: 7,
          marginBottom: 20,
        }}>
        {" "}
        Business Plan{" "}
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
    </>
  );
}
