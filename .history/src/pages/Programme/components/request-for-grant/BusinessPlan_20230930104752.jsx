import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "sn", headerName: "S/N", width: 70 },
  { field: "document", headerName: "DOCUMENT", width: 130 },
  { field: "type", headerName: "TYPE", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.document || ""} ${params.row.type || ""}`,
  },
];

const rows = [
  { id: 1, type: "Snow", document: "Jon", age: 35 },
  { id: 2, type: "Lannister", document: "Cersei", age: 42 },
  { id: 3, type: "Lannister", document: "Jaime", age: 45 },
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
