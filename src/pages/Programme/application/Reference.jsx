import React, { useState } from "react";
import Input from "../../../components/Input";
import { RegularText } from "../../../components/Common";
import Select from "../../../components/Select";
import Button from "../../../components/Button";
import Modal from "react-modal";
import { FaWindowClose } from "react-icons/fa";
import { useFormik } from "formik";
import { DeleteIcon } from "../../../assets/Svg/Index";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "90vh",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

export default function Reference() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [allRef, setAllRef] = useState([]);
  const initialValues = {
    name: "",
    address: "",
    date_of_contract: "",
    employer: "",
    location: "",
    description: "",
    date_of_completion: "",
    project_cost: "",
    role_of_applicant: "",
    equity: "",
    implemented: "",
    refree: { name: "", phone: "" },
    subcontractor: { name: "", address: "" },
    subcontactor_role: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (val) => {
      console.log(JSON.stringify(val));
    },
  });
  return (
    <div className="ref-container">
      <h2>Reference Projects</h2>
      <Button
        style={{
          marginLeft: "auto",
          marginTop: 20,
          width: 200,
          marginBottom: 20,
        }}
        label="Add Refrence Project"
        onClick={() => {
          setIsOpen(true);
          //   formik.handleSubmit();
        }}
      />

      {allRef.length == 0 && (
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <img id="empty" src="/38.png" />
          <span id="empty">No added ref-projects yet</span>
        </div>
      )}

      {allRef.length > 0 && (
        <table className="home_table">
          <>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Address</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allRef.map((refr, ind) => (
                <tr key={ind.toString()}>
                  <td>{ind + 1}</td>
                  <td>{refr.name}</td>
                  <td>{refr.address}</td>
                  <td>{refr.description}</td>

                  <td>
                    <div className="table_actions">
                      <DeleteIcon onClick={() => {
                          const filtered=allRef.filter((rf,index)=>ind!==index)
                          setAllRef(filtered)
                      }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        </table>
      )}

      <Button
        style={{
          marginTop: 20,
          marginLeft: "auto",
          width: 200,
        }}
        onClick={() => {
            console.log(JSON.stringify(allRef))
        }}
        label="Next"
      />

      <Modal
        isOpen={modalIsOpen}
        appElement={document.getElementById("root")}
        style={customStyles}
      >
        <div className="inner_modal">
          <FaWindowClose
            onClick={() => {
              setIsOpen(false);
            }}
            style={{ fontSize: 30, cursor: "pointer", marginLeft: "auto" }}
          />
          <RegularText
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
            text="Add Reference Project"
          />
          <div className="divider" />
          <>
            <Input
              name="name"
              onChange={formik.handleChange}
              outlined
              label="Name/Supplier/Project"
            />
            <Input
              name="address"
              onChange={formik.handleChange}
              outlined
              label="Address"
            />
            <Input
              name="date_of_contract"
              onChange={formik.handleChange}
              outlined
              type="date"
              label="Date of contract"
            />
            <Input
              name="employer"
              onChange={formik.handleChange}
              outlined
              label="Employer"
            />
            <Input
              name="location"
              onChange={formik.handleChange}
              outlined
              label="Location"
            />
            <div className="txtArea">
              <RegularText style={{ fontWeight: "bold" }} text="Description" />
              <textarea
                name="description"
                onChange={formik.handleChange}
                rows={5}
              />
            </div>
            <Input
              name="date_of_completion"
              onChange={formik.handleChange}
              outlined
              type="date"
              label="Date of completion"
            />
            <Input
              name="project_cost"
              onChange={formik.handleChange}
              outlined
              label="Project total cost"
            />
            <Input
              name="role_of_applicant"
              onChange={formik.handleChange}
              outlined
              label="Role of applicant"
            />
            <Input
              name="equity"
              onChange={formik.handleChange}
              outlined
              label="Equity of applicant in the project"
            />
            <Select
              name="implemented"
              onChange={formik.handleChange}
              options={["Yes", "No"]}
              label="Was the reference project implemented on Epc basics?"
            />
            <h2>Refree</h2>
            <div className="sub-group">
              <Input
                name="refree.name"
                onChange={formik.handleChange}
                style={{ width: "40%" }}
                outlined
                label="Name"
              />
              <Input
                name="refree.phone"
                onChange={formik.handleChange}
                style={{ width: "40%" }}
                outlined
                label="Phone"
              />
            </div>
            <h2>Associated Sub-contractors</h2>
            <div className="sub-group">
              <Input
                name="subcontractor.name"
                onChange={formik.handleChange}
                style={{ width: "40%" }}
                outlined
                label="Name"
              />

              <Input
                name="subcontractor.address"
                onChange={formik.handleChange}
                style={{ width: "40%" }}
                outlined
                label="Address"
              />
            </div>
            <Input
              name="subcontactor_role"
              onChange={formik.handleChange}
              outlined
              label="Role of Associated Sub-Contractors"
            />
            <Button onClick={()=>{
                setAllRef(prev=>[...prev,formik.values])
                formik.resetForm()
            }} label="Add Reference"/>
          </>
        </div>
      </Modal>
    </div>
  );
}
