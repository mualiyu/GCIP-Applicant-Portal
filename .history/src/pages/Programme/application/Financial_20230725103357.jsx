import { FieldArray, FormikProvider, useFormik } from "formik";
import "../../styles/finance.css";
import React, { useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import Alert from "../../../components/Alert";
import query from "../../../helpers/query";
import { useEffect } from "react";
import { Header, RegularText } from "../../../components/Common";
import { FaCheck, FaEdit, FaPencilAlt, FaWindowClose } from "react-icons/fa";
import nProgress from "nprogress";
import { CancelIcon, DeleteIcon } from "../../../assets/Svg/Index";
import Modal from "react-modal";
import { MoonLoader } from "react-spinners";
import { setActiveTab } from "../../../redux/applicant/applicantSlice";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "90vh",
    minWidth: "50vw",
    overflowX: "hidden",
    maxWidth: "70vw",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

export default function Financial({ moveToTab }) {
  const data = useSelector((state) => state);
  const [alertTex, setAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const [editIndex, setEdit] = useState(null);
  const [loading2, setLoading2] = useState(false);
  const [started, setStarted] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [allDebts, setAllDebts] = useState([]);

  const initialValues = {
    Fy1: [
      { name: "total_assets", label: "Total Assets", value: "" },
      { name: "total_liability", label: "Total Liability", value: "" },
      { name: "total_networth", label: "Total Networth", value: "" },
      { name: "annual_turnover", label: "Annual Turnover", value: "" },
      // { name: "profit_before_taxes", label: "Profit Before Taxes", value: "" },
      // { name: "profit_after_taxes", label: "Profit After Taxes", value: "" },
    ],
    Fy2: [
      { name: "total_assets", label: "Total Assets", value: "" },
      { name: "total_liability", label: "Total Liability", value: "" },
      { name: "total_networth", label: "Total Networth", value: "" },
      { name: "annual_turnover", label: "Annual Turnover", value: "" },
      // { name: "profit_before_taxes", label: "Profit Before Taxes", value: "" },
      // { name: "profit_after_taxes", label: "Profit After Taxes", value: "" },
    ],
    Fy3: [
      { name: "total_assets", label: "Total Assets", value: "" },
      { name: "total_liability", label: "Total Liability", value: "" },
      { name: "total_networth", label: "Total Networth", value: "" },
      { name: "annual_turnover", label: "Annual Turnover", value: "" },
      // { name: "profit_before_taxes", label: "Profit Before Taxes", value: "" },
      // { name: "profit_after_taxes", label: "Profit After Taxes", value: "" },
    ],
    financial_dept_info: [],
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (val) => {
      console.log(JSON.stringify(val));
    },
  });

  const formik2 = useFormik({
    initialValues: {
      financial_dept_info: {
        project_name: "",
        location: "",
        sector: "",
        evidence_of_support: "",
        aggregate_amount: "",
        date_of_financial_close: "",
        date_of_first_drawdown: "",
        date_of_final_drawdown: "",
        tenor_of_financing: "",
        borrower: {
          name: "",
          rc_number: "",
          address: "",
        },
      },
    },
    onSubmit: (val) => {
      const newData = [...formik.values.financial_dept_info];
      newData.push(val.financial_dept_info);
      formik.setValues({
        ...formik.values,
        financial_dept_info: newData,
      });
      formik2.resetForm();
      setModalOpen2(false);

      



    },
  });
  const getData = async () => {
    setLoading2(true);
    nProgress.start();
    const respone = await query({
      method: "GET",
      url: `/api/applicant/application/get?program_id=${data.program.id}`,
      token: data.user.user.token,
    });
    setLoading2(false);
    nProgress.done();

    console.log(respone);

    if (respone.success) {
      if (
        respone.data.data.application.application_financials.financial_dept_info
          .length
      ) {
        console.log(
          respone.data.data.application.application_financials,
          "fina"
        );
        const Fy1 = [];
        const processedFy1 = [];
        const Fy2 = [];
        const processedFy2 = [];
        const Fy3 = [];
        const processedFy3 = [];
        respone.data.data.application.application_financials.financial_info.map(
          (inf) => {
            if (inf.type == "fy1") {
              Fy1.push(inf);
            }
            if (inf.type == "fy2") {
              Fy2.push(inf);
            }
            if (inf.type == "fy3") {
              Fy3.push(inf);
            }
          }
        );

        Object.keys(Fy1[0]).map((key, ind) => {
          if (
            key == "id" ||
            key == "applicant_id" ||
            key == "application_id" ||
            key == "type" ||
            key == "created_at" ||
            key == "updated_at"
          ) {
            return;
          }
          processedFy1.push({
            name: key,
            value: Object.values(Fy1[0])[ind],
            label: key.toUpperCase(),
          });
        });

        Object.keys(Fy2[0]).map((key, ind) => {
          if (
            key == "id" ||
            key == "applicant_id" ||
            key == "application_id" ||
            key == "type" ||
            key == "created_at" ||
            key == "updated_at"
          ) {
            return;
          }
          processedFy2.push({
            name: key,
            value: Object.values(Fy2[0])[ind],
            label: key.toUpperCase(),
          });
        });

        Object.keys(Fy3[0]).map((key, ind) => {
          if (
            key == "id" ||
            key == "applicant_id" ||
            key == "application_id" ||
            key == "type" ||
            key == "created_at" ||
            key == "updated_at"
          ) {
            return;
          }
          processedFy3.push({
            name: key,
            value: Object.values(Fy3[0])[ind],
            label: key.toUpperCase(),
          });
        });

        const newObject = {
          Fy1: processedFy1,
          Fy2: processedFy2,
          Fy3: processedFy3,
        };

        respone.data.data.application.application_financials.financial_dept_info.map(
          (fin) => (fin.borrower = fin.borrowers[0])
        );
        newObject.financial_dept_info =
          respone.data.data.application.application_financials.financial_dept_info;
        //  formik.setValues({
        //    financial_dept_info:respone.data.data.application.application_financials.financial_dept_info[0],
        //    Fy1:[{name:data.application.application_financials.financial_info[0].name,label:data.application.application_financials.financial_info[0]}],
        //    Fy2:[data.application.application_financials.financial_info[1]],
        //    Fy3:[data.application.application_financials.financial_info[2]]

        //  })
        // newObject.financial_dept_info =
        //   respone.data.data.application.application_financials.financial_dept_info;
        //   console.log()

        formik.setValues(newObject);

        setAlert("Continue with your previous application");
        setStarted(true);

        setTimeout(() => {
          setAlert("");
        }, 2000);
      }

      // setCurrent(data.data.application);
    }
  };
  const percentsge = [{ name: "", state: "" }];

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="finance_container">
      {loading2 && (
        <MoonLoader
          size={25}
          cssOverride={{ position: "absolute", left: "50%", top: "50%" }}
        />
      )}
      <Alert text={alertTex} />

      {!loading2 && (
        <>
          <FormikProvider value={formik}>
            <table
              style={{
                width: "90%",
              }}
              className="home_table"
            >
              {formik.values.Fy1?.length > 0 && (
                <>
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Financial Information</th>
                      <th>[FY1]</th>
                      <th>[FY2]</th>
                      <th>[FY3]</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formik.values.Fy1.map((prs, ind) => (
                      <tr key={ind.toString()}>
                        <td>{ind + 1}</td>
                        <td>{prs.label}</td>
                        <td>
                          <Input
                            placeholder="₦"
                            style={{
                              width: "80%",
                            }}
                            {...formik.getFieldProps(`Fy1.${ind}.value`)}
                            onChange={formik.handleChange}
                            label=""
                            // name={`Fy1`}
                            outlined
                          />
                        </td>
                        <td>
                          <Input
                            placeholder="₦"
                            style={{
                              width: "80%",
                            }}
                            {...formik.getFieldProps(`Fy2.${ind}.value`)}
                            onChange={formik.handleChange}
                            label=""
                            outlined
                          />
                        </td>
                        <td>
                          <Input
                            placeholder="₦"
                            style={{
                              width: "80%",
                            }}
                            {...formik.getFieldProps(`Fy3.${ind}.value`)}
                            onChange={formik.handleChange}
                            label=""
                            outlined
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
            </table>

            <div
              style={{
                display: "flex",
                marginTop: 20,
                flexDirection: "column",
              }}
            >
              <span
                onClick={() => {
                  setModalOpen2(true);
                  // setIsOpen(true);
                  // setEdit(null);
                  // formik.handleSubmit();
                }}
                style={{
                  color: "var(--primary)",
                  fontSize: 13,
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                ADD DEBT INFORMATION/FINANCIER?
              </span>
              <span
                style={{
                  fontSize: 11,
                }}
              >
                Applicable Project for which Equity / Debt financing was
                secured.
              </span>
            </div>

            <div
              style={{
                borderStyle: "dashed",
                height: 0.001,
                backgroundColor: "transparent",
                borderWidth: 0.1,
                width: "90%",
              }}
              className="divider"
            />

            {formik.values.financial_dept_info.length > 0 && (
              <table className="home_table">
                <>
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>PROJECT</th>
                      <th>LOCATION</th>
                      <th>PROJECT COST</th>
                      <th>SECTOR</th>
                      <th>FINANCIER</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formik.values.financial_dept_info.map((refr, ind) => (
                      <tr key={ind.toString()}>
                        <td>{ind + 1}</td>
                        <td>{refr.project_name}</td>
                        <td>{refr.location}</td>
                        <td>{refr.aggregate_amount}</td>
                        <td>{refr.sector}</td>
                        <td>{refr.borrower.name}</td>

                        <td>
                        
                          <div className="table_actions">
                          <FaPencilAlt
                              onClick={() => {
                                setModalOpen2(true);
                                console.log(formik.values.financial_dept_info[ind]);
                                // return
                                formik.setValues({
                                  ...formik.values[ind],
                                  initialValues: {
                                    financial_dept_info: {
                                      project_name:  formik.values.financial_dept_info[ind].project_name,
                                      location:  formik.values.financial_dept_info[ind].location,
                                      sector:  formik.values.financial_dept_info[ind].sector,
                                      evidence_of_support:  formik.values.financial_dept_info[ind].evidence_of_support,
                                      aggregate_amount:  formik.values.financial_dept_info[ind].aggregate_amount,
                                      date_of_financial_close:  formik.values.financial_dept_info[ind].date_of_financial_close,
                                      date_of_first_drawdown:  formik.values.financial_dept_info[ind].date_of_first_drawdown,
                                      date_of_final_drawdown:  formik.values.financial_dept_info[ind].date_of_final_drawdown,
                                      tenor_of_financing:  formik.values.financial_dept_info[ind].tenor_of_financing,
                                      borrower: {
                                        name:  formik.values.financial_dept_info[ind].borrower.name,
                                        rc_number:  formik.values.financial_dept_info[ind].borrower.rc_number,
                                        address:  formik.values.financial_dept_info[ind].borrower.address,
                                      },
                                    },
                                  }
                                });
                                setEdit(ind);
                              }}
                            />
                            
                            <DeleteIcon
                              onClick={() => {
                                const filtered =
                                  formik.values.financial_dept_info.filter(
                                    (rf, index) => ind !== index
                                  );
                                formik.setValues({
                                  ...formik.values,
                                  financial_dept_info: filtered,
                                });
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              </table>
            )}

            <div
              style={{
                width: "90%",
              }}
              className="save_next"
            >
              <Button
                fontStyle={{
                  color: "var(--primary)",
                }}
                style={{
                  width: 100,
                  marginRight: 20,
                  backgroundColor: "#fff",
                  border: "1.5px solid var(--primary)",
                }}
                onClick={async () => {
                  const Fy1 = {};
                  const Fy2 = {};
                  const Fy3 = {};
                  formik.values.Fy1.map((value, i) => {
                    Fy1[value.name] = value.value;
                  });
                  formik.values.Fy2.map((value, i) => {
                    Fy2[value.name] = value.value;
                  });
                  formik.values.Fy3.map((value, i) => {
                    Fy3[value.name] = value.value;
                  });
                  let Bodydata = {
                    application_id: data.applicant.application.id,
                    financial_info: { fy1: Fy1, fy2: Fy2, fy3: Fy3 },
                    financial_dept_info: formik.values.financial_dept_info,
                    update: started ? "1" : "0",
                  };
                  if (
                    formik.values.financial_dept_info.project_name == "" ||
                    formik.values.financial_dept_info.location == ""
                  ) {
                    setAlert("Project name and Location are required");
                    setTimeout(() => {
                      setAlert("");
                    }, 4000);
                    return;
                  }
                  setLoading2(true);
                  const response = await query({
                    method: "POST",
                    url: "/api/applicant/application/create/financial",
                    token: data.user.user.token,
                    bodyData: Bodydata,
                  });
                  // console.log("RES", response);

                  if (response.success) {
                    console.log("DONE", response);
                    setAlert("Data Saved");
                    // moveToTab(6);
                  } else {
                    setAlert("Application failed, please try again");
                  }
                  setTimeout(() => {
                    setAlert("");
                  }, 2000);
                  setLoading2(false);

                  console.log(Bodydata);
                }}
                label="Save"
              />
              <Button
                style={{
                  width: 100,
                }}
                onClick={async () => {
                  const Fy1 = {};
                  const Fy2 = {};
                  const Fy3 = {};
                  formik.values.Fy1.map((value, i) => {
                    Fy1[value.name] = value.value;
                  });
                  formik.values.Fy2.map((value, i) => {
                    Fy2[value.name] = value.value;
                  });
                  formik.values.Fy3.map((value, i) => {
                    Fy3[value.name] = value.value;
                  });
                  let Bodydata = {
                    application_id: data.applicant.application.id,
                    financial_info: { fy1: Fy1, fy2: Fy2, fy3: Fy3 },
                    financial_dept_info: formik.values.financial_dept_info,
                    update: started ? "1" : "0",
                  };
                  if (
                    formik.values.financial_dept_info.project_name == "" ||
                    formik.values.financial_dept_info.location == ""
                  ) {
                    setAlert("Project name and Location are required");
                    setTimeout(() => {
                      setAlert("");
                    }, 4000);
                    return;
                  }
                  setLoading2(true);
                  const response = await query({
                    method: "POST",
                    url: "/api/applicant/application/create/financial",
                    token: data.user.user.token,
                    bodyData: Bodydata,
                  });
                  console.log("RES", response);

                  if (response.success) {
                    moveToTab(6);
                    makeDone(7);
                  } else {
                    setAlert(
                      "Cannot proceed without submitting required imformation"
                    );
                  }
                  setTimeout(() => {
                    setAlert("");
                  }, 2000);
                  setLoading2(false);

                  console.log(Bodydata);
                }}
                label="Next"
              />
            </div>
          </FormikProvider>
        </>
      )}
      <Modal
        isOpen={modalOpen2}
        appElement={document.getElementById("root")}
        style={customStyles}
      >
        <div
          style={{
            width: "90%",
            height: "100%",
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Header text="ADD DEPTH INFORMATION AND FINANCIER INFORMATION" />
          <>
            <span style={{ color: "#641e1e", marginTop: 10 }}>
              Applicable Project for which Equity / Debt financing was secured. &nbsp;
              <a href="https://www.cbn.gov.ng/rates/ExchRateByCurrency.asp?CurrencyType=$USD">
              Click here
            </a>
            </span>
           
          </>

          <div className="">
            {loading2 && (
              <MoonLoader
                size={25}
                cssOverride={{ position: "absolute", left: "50%", top: "50%" }}
              />
            )}
            {/* <Alert text={alertText} /> */}

            <div className="sub-group">
              <Input
                value={formik2.values.financial_dept_info.project_name}
                onChange={formik2.handleChange}
                name="financial_dept_info.project_name"
                style={{ width: "50%" }}
                outlined
                label="Project Name"
              />
              <Input
                value={formik2.values.financial_dept_info.location}
                onChange={formik2.handleChange}
                name="financial_dept_info.location"
                style={{ width: "50%" }}
                outlined
                label="Location"
              />
              <Input
                value={formik2.values.financial_dept_info.sector}
                onChange={formik2.handleChange}
                name="financial_dept_info.sector"
                style={{ width: "50%" }}
                outlined
                label="Sector"
              />
            </div>
            <div className="sub-group" style={{marginBottom: 15}}>
            <Input
              value={formik2.values.financial_dept_info.aggregate_amount}
              onChange={formik2.handleChange}
              name="financial_dept_info.aggregate_amount"
              outlined
              style={{ width: "50%" }}
              label="Aggregate Amount of financing"
            />
            <Input
              value={formik2.values.financial_dept_info.date_of_financial_close}
              onChange={formik2.handleChange}
              name="financial_dept_info.date_of_financial_close"
              outlined
              style={{ width: "50%" }}
              label="Date of financial close"
              type="date"
            />
            </div>
            <h2 style={{fontWeight: 900}}>Financier</h2>
            <div className="">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Input
                  value={formik2.values.financial_dept_info.borrower.name}
                  type="text"
                  placeholder="Name"
                  outlined
                  label="Name"
                  name="financial_dept_info.borrower.name"
                  onChange={formik2.handleChange}
                  style={{ width: "50%" }}
                />
                <Input
                  value={formik2.values.financial_dept_info.borrower.address}
                  onChange={formik2.handleChange}
                  style={{ width: "50%" }}
                  type="text"
                  placeholder="Address"
                  outlined
                  label="Address"
                  name="financial_dept_info.borrower.address"
                />
              </div>
            </div>
            <Input
              onChange={(e) => {
                // formik.values.uploads[index].file = "myUrlll";
                const formData = new FormData();
                const files = e.target.files;
                files?.length && formData.append("file", files[0]);
                setLoading(true);
                // const response= await query({url:'/file',method:'POST',bodyData:formData})
                fetch(
                  "https://api.grants.amp.gefundp.rea.gov.ng/api/applicant/application/create/financial/upload",
                  {
                    method: "POST",
                    body: formData,
                    headers: {
                      Authorization: "Bearer " + data.user.user.token,
                    },
                  }
                )
                  .then((res) => res.json())
                  .then((data) => {
                    setLoading(false);
                    if (data.status) {
                      formik2.values.financial_dept_info.evidence_of_support =
                        data.data.url;
                      setAlert("Uplaoded Succefully");
                    } else {
                      setAlert("Something went wrong. KIndly Upload again");
                    }
                    setTimeout(() => {
                      setAlert("");
                    }, 2000);
                  });
              }}
              type="file"
              // outlined
              label="Evidence of supporting document (Letter of patent/loan agreement)"
              name="financial_dept_info.borrower.address"
            />
            {formik2.values.financial_dept_info.evidence_of_support && (
              <span style={{ marginTop: 20 }} className="suc">
                Uploaded <FaCheck />
              </span>
            )}
            <div
              style={{
                display: "flex",
                width: "50%",
                marginTop: 20,
                justifyContent: "space-between",
                marginLeft: "auto",
              }}
            >
              <Button
                onClick={() => {
                  setModalOpen2(false);
                }}
                fontStyle={{
                  color: "var(--primary)",
                }}
                style={{
                  width: 134,
                  marginRight: 15,
                  backgroundColor: "#fff",
                  border: "1px solid var(--primary)",
                }}
                label="Cancel"
              />
              <Button
                onClick={() => {
                  formik2.handleSubmit();
                }}
                label="Add"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
