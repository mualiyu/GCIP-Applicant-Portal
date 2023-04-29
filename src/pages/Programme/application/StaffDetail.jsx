import React, { useState } from "react";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import { FieldArray, FormikProvider, useFormik } from "formik";
import AddButton from "../../../components/AddButton";
import DeleteButton from "../../../components/DeleteButton";
import Button from "../../../components/Button";
import { RegularText } from "../../../components/Common";
import Modal from "react-modal";
import { FaWindowClose } from "react-icons/fa";
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

export default function StaffDetail() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [allStaff, setAllStaff] = useState([]);
  const initialValues = {
    name: "",
    dob: "",
    language: "",
    employer: { name: "", start_date: "", end_date: "" },
    employer2: { name: "", start_date: "", end_date: "" },
    employement_category: "",
    nationality: "",
    education: [
      { type: "", name: "", start_date: "", end_date: "", school: "" },
    ],
    membership: [{ rank: "", state: "", year: "" }],
    training: [{ course: "", date: "" }],
    countries_experience: "",
    work_undertaken: "",
    education_certificate: "",
    professional_certificate: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (val) => {
      console.log(JSON.stringify(val));
    },
  });
  return (
    <div className="staff_detail_cont">
      <h2>Applicant CV*</h2>

      <Button
        style={{
          marginLeft: "auto",
          marginTop: 20,
          width: 200,
          marginBottom: 20,
        }}
        label="Add Staff"
        onClick={() => {
          setIsOpen(true);
          formik.handleSubmit();
        }}
      />
      {allStaff.length == 0 && (
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <img id="empty" src="/38.png" />
          <span id="empty">No added staff yet</span>
        </div>
      )}

      {allStaff.length > 0 && (
        <table className="home_table">
          <>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Employement Catgory</th>
                <th>Nationality</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allStaff.map((stf, ind) => (
                <tr key={ind.toString()}>
                  <td>{ind + 1}</td>
                  <td>{stf.name}</td>
                  <td>{stf.employement_category}</td>
                  <td>{stf.nationality}</td>

                  <td>
                    <div className="table_actions">
                      <DeleteIcon onClick={() => {
                        const filtered=allStaff.filter((_,index)=>ind!==index)
                        setAllStaff(filtered)
                      }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        </table>
      )}

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
            text="Add Staff"
          />
          <div className="divider" />

          <>
            <FormikProvider value={formik}>
              <Input
                name="name"
                onChange={formik.handleChange}
                outlined
                label="Name"
              />
              <Input
                name="dob"
                onChange={formik.handleChange}
                type="date"
                outlined
                label="DOB"
              />
              <div className="txtArea">
                <RegularText style={{ fontWeight: "bold" }} text="Languages" />
                <textarea
                  rows={4}
                  name="language"
                  onChange={formik.handleChange}
                />
              </div>
              <h2>Employer</h2>
              <div className="sub-group">
                <Input
                  style={{ width: "30%" }}
                  name={`employer.name`}
                  onChange={formik.handleChange}
                  outlined
                  label="Employer Name"
                />
                <Input
                  type="date"
                  style={{ width: "30%" }}
                  name="employer.start_date"
                  onChange={formik.handleChange}
                  outlined
                  label="Start Date"
                />
                <Input
                  type="date"
                  style={{ width: "30%" }}
                  name="employer.end_date"
                  onChange={formik.handleChange}
                  outlined
                  label="End Date"
                />
              </div>
              <h2>Employer 2</h2>
              <div className="sub-group">
                <Input
                  style={{ width: "30%" }}
                  name={`employer2.name`}
                  onChange={formik.handleChange}
                  outlined
                  label="Employer Name"
                />
                <Input
                  type="date"
                  style={{ width: "30%" }}
                  name="employer2.start_date"
                  onChange={formik.handleChange}
                  outlined
                  label="Start Date"
                />
                <Input
                  type="date"
                  style={{ width: "30%" }}
                  name="employer2.end_date"
                  onChange={formik.handleChange}
                  outlined
                  label="End Date"
                />
              </div>

              <Select
                name="employement_category"
                onChange={formik.handleChange}
                label="Eployment Category"
                options={["Employee"]}
              />
              <Input
                name="nationality"
                onChange={formik.handleChange}
                label="Nationality"
                outlined
              />

              <div className="txtArea">
                <RegularText
                  style={{ fontWeight: "bold" }}
                  text="Countries Of Work Experience"
                />
                <textarea
                  rows={5}
                  name="countries_experience"
                  onChange={formik.handleChange}
                />
              </div>

              <div className="txtArea">
                <RegularText
                  style={{ fontWeight: "bold" }}
                  text="Work Undertaken that best describes your capability"
                />
                <textarea
                  rows={5}
                  name="work_undertaken"
                  onChange={formik.handleChange}
                />
              </div>

              <h2>Education Records</h2>
              <FieldArray
                name="education"
                render={(arrayHelpers) => {
                  const education = formik.values.education;
                  return (
                    <>
                      {education.length > 0 &&
                        education.map((stk, ind) => (
                          <div className="sub-group">
                            <Select
                              options={["Bsc"]}
                              style={{ width: "15%" }}
                              {...formik.getFieldProps(`education.${ind}.type`)}
                              onChange={formik.handleChange}
                              outlined
                              label="Qualification"
                            />
                            <Input
                              style={{ width: "15%" }}
                              {...formik.getFieldProps(`education.${ind}.name`)}
                              onChange={formik.handleChange}
                              outlined
                              label="Course"
                            />
                            <Input
                              style={{ width: "15%" }}
                              {...formik.getFieldProps(
                                `education.${ind}.school`
                              )}
                              onChange={formik.handleChange}
                              outlined
                              label="School Name"
                            />
                            <Input
                              style={{ width: "15%" }}
                              {...formik.getFieldProps(
                                `education.${ind}.start_date`
                              )}
                              onChange={formik.handleChange}
                              outlined
                              label="Start Date"
                              type="date"
                            />
                            <Input
                              style={{ width: "15%" }}
                              {...formik.getFieldProps(
                                `education.${ind}.end_date`
                              )}
                              onChange={formik.handleChange}
                              outlined
                              label="End date"
                              type="date"
                            />

                            {education.length - 1 == ind && (
                              <AddButton
                                onClick={() => {
                                  arrayHelpers.push({
                                    type: "",
                                    name: "",
                                    start_date: "",
                                    end_date: "",
                                    school: "",
                                  });
                                }}
                                label=""
                              />
                            )}
                            {education.length - 1 !== ind && (
                              <DeleteButton
                                label=""
                                onClick={() => {
                                  arrayHelpers.remove(ind);
                                }}
                              />
                            )}
                          </div>
                        ))}
                    </>
                  );
                }}
              />
              <h2>Membership In Professional Societies</h2>
              <FieldArray
                name="membership"
                render={(arrayHelpers) => {
                  const membership = formik.values.membership;
                  return (
                    <>
                      {membership.length > 0 &&
                        membership.map((stk, ind) => (
                          <div className="sub-group">
                            <Input
                              style={{ width: "30%" }}
                              {...formik.getFieldProps(
                                `membership.${ind}.rank`
                              )}
                              onChange={formik.handleChange}
                              outlined
                              label="Rank"
                            />
                            <Input
                              style={{ width: "30%" }}
                              {...formik.getFieldProps(
                                `membership.${ind}.state`
                              )}
                              onChange={formik.handleChange}
                              outlined
                              label="State"
                            />
                            <Input
                              style={{ width: "30%" }}
                              {...formik.getFieldProps(
                                `membership.${ind}.year`
                              )}
                              onChange={formik.handleChange}
                              outlined
                              label="Date"
                              type="date"
                            />

                            {membership.length - 1 == ind && (
                              <AddButton
                                onClick={() => {
                                  arrayHelpers.push({
                                    rank: "",
                                    state: "",
                                    date: "",
                                  });
                                }}
                                label=""
                              />
                            )}
                            {membership.length - 1 !== ind && (
                              <DeleteButton
                                label=""
                                onClick={() => {
                                  arrayHelpers.remove(ind);
                                }}
                              />
                            )}
                          </div>
                        ))}
                    </>
                  );
                }}
              />
              <h2>Trainings</h2>
              <FieldArray
                name="training"
                render={(arrayHelpers) => {
                  const training = formik.values.training;
                  return (
                    <>
                      {training.length > 0 &&
                        training.map((stk, ind) => (
                          <div className="sub-group">
                            <Input
                              style={{ width: "40%" }}
                              {...formik.getFieldProps(
                                `training.${ind}.course`
                              )}
                              onChange={formik.handleChange}
                              outlined
                              label="Course"
                            />

                            <Input
                              style={{ width: "40%" }}
                              {...formik.getFieldProps(`training.${ind}.date`)}
                              onChange={formik.handleChange}
                              outlined
                              label="End date"
                              type="date"
                            />

                            {training.length - 1 == ind && (
                              <AddButton
                                onClick={() => {
                                  arrayHelpers.push({
                                    type: "",
                                    name: "",
                                    start_date: "",
                                    end_date: "",
                                    school: "",
                                  });
                                }}
                                label=""
                              />
                            )}
                            {training.length - 1 !== ind && (
                              <DeleteButton
                                label=""
                                onClick={() => {
                                  arrayHelpers.remove(ind);
                                }}
                              />
                            )}
                          </div>
                        ))}
                    </>
                  );
                }}
              />
              <Input outlined label="Educational Certificate" type="file" />
              <Input outlined label="Professional Certificate" type="file" />

              <Button
                onClick={() => {
                  setAllStaff((prev) => [...prev, formik.values]);
                  formik.resetForm();
                }}
                label="Add Staff"
              />
            </FormikProvider>
          </>
        </div>
      </Modal>
      <div className="save_next">
        <Button
          onClick={() => {
           
          }}
          style={{
            width: 200,
            marginRight: 20,
            backgroundColor: "#1094ff",
          }}
          label="Save"
        />
        <Button
           onClick={() => {
            console.log(JSON.stringify(allStaff));
          }}
          style={{
            width: 200,
          }}
          label="Next"
        />
      </div>
      
    </div>
  );
}
