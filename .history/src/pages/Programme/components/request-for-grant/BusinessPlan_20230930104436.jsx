import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "sn", headerName: "S/N", width: 70 },
  { field: "document", headerName: "DOCUMENT", width: 130 },
  { field: "type", headerName: "TYPE", width: 130 },
  { field: "action", headerName: "ACTION", width: 130 },
  //   {
  //     field: "age",
  //     headerName: "Age",
  //     type: "number",
  //     width: 90,
  //   },
  //   {
  //     field: "fullName",
  //     headerName: "Full name",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params) =>
  //       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  //   },
];

const rows = [
  { sn: 1, document: "Snow", type: "Jon", action: 35 },
  { sn: 2, document: "Lannister", type: "Cersei", action: 42 },
  { sn: 3, document: "Lannister", type: "Jaime", action: 45 },
  { sn: 3, document: "Lannister", type: "Jaime", action: 45 },
];

export default function BusinessPlan() {
  return (
    <>
      <div
        style={{
          backgroundColor: "rgba(0, 100, 56, 0.25)",
          padding: "12px 25px",
          borderRadius: 7,
          width: "100vh",
        }}>
        <p> Business Plan </p>
      </div>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          //   initialState={{
          //     pagination: {
          //       paginationModel: { page: 0, pageSize: 5 },
          //     },
          //   }}
          //   pageSizeOptions={[5, 10]}
        />
      </div>
    </>
  );
}
