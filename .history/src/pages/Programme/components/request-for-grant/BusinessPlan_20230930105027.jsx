import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "S/N" },
  { field: "document", headerName: "DOCUMENT" },
  { field: "type", headerName: "TYPE" },
  { field: "action", headerName: "ACTION" },
];

const rows = [
  { id: 1, type: "Snow", document: "Jon", action: 35 },
  { id: 2, type: "Lannister", document: "Cersei", action: 42 },
  { id: 3, type: "Lannister", document: "Jaime", action: 45 },
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
