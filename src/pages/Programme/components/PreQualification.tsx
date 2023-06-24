import React from "react";
import "./styles/prequal.css";
import Button from "../../../components/Button";

export default function PreQualification({
  moveToTab,
}: {
  moveToTab: (tab: number) => void;
}) {
  return (
    <div className="prequal_container">
      <span className="hd">
        APPLICANTS ARE REQUIRED TO READ THE PRE-QUALIFICATION DOCUMENT TO FULLY
        UNDERSTAND THE APPLICATION PROCESS
      </span>
      <Button
        fontStyle={{
          color: "var(--primary)",
        }}
        style={{
          width: 134,
          marginLeft: "auto",
          marginTop: 30,
          backgroundColor: "#fff",
          border: "1px solid var(--primary)",
        }}
        label="Downlod"
      />

      <div className="checked">
        <input type="checkbox" style={{transform: "scale(2)"}} />
        <span>
          I HAVE READ AND UNDERSTOOD DETAILS AS APPLIED IN THE PRE-QUALIFICATION
          DOCUMENT.
        </span>
        <Button
          onClick={() => {
            moveToTab(1);
          }}
          style={{
            width: 134,
          }}
          label="Continue"
        />
      </div>
    </div>
  );
}
