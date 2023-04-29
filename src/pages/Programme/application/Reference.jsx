import React from "react";
import Input from "../../../components/Input";
import { RegularText } from "../../../components/Common";
import Select from "../../../components/Select";
import Button from "../../../components/Button";

export default function Reference() {
  return (
    <div className="ref-container">
      <h2>Reference Project</h2>
      <Input outlined label="Projects Name" />
      <Input outlined type="date" label="Date of contract" />
      <Input outlined label="Employer" />
      <Input outlined label="Location" />
      <div className="txtArea">
        <RegularText style={{ fontWeight: "bold" }} text="Description" />
        <textarea rows={5} />
      </div>
      <Input outlined type="date" label="Date of completion" />
      <Input outlined label="Project total cost" />
      <Input outlined label="Role of applicant" />
      <Input outlined label="Equity of applicant in the project" />
      <Select
        options={["Yes", "No"]}
        label="Was the reference project implemented on Epc basics?"
      />
      <h2>Refree</h2>
      <div className="sub-group">
        <Input style={{ width: "40%" }} outlined label="Name" />
        <Input style={{ width: "40%" }} outlined label="Phone" />
      </div>
      <h2>Associated Sub-contractors</h2>
      <div className="sub-group">
        <Input style={{ width: "40%" }} outlined label="Name" />

        <Input style={{ width: "40%" }} outlined label="Address" />
      </div>
      <Input outlined label="Role of Associated Sub-Contractors" />

      <Button style={{
          marginTop:20,
          marginLeft:'auto',
          width:200
      }} onClick={()=>{

      }} label="Next"/>
    </div>
  );
}
