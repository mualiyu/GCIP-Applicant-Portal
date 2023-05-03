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

export default function Financial({ moveToTab }) {
  const data = useSelector((state) => state);
  const [alertTex, setAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [started, setStarted] = useState(false);
  
  const getData = async () => {
    setLoading2(true);
    const respone = await query({
      method: "GET",
      url: `/api/applicant/application/get?program_id=${data.program.id}`,
      token: data.user.user.token,
    });
    setLoading2(false);

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
        //  formik.setValues({
        //    financial_dept_info:respone.data.data.application.application_financials.financial_dept_info[0],
        //    Fy1:[{name:data.application.application_financials.financial_info[0].name,label:data.application.application_financials.financial_info[0]}],
        //    Fy2:[data.application.application_financials.financial_info[1]],
        //    Fy3:[data.application.application_financials.financial_info[2]]

        //  })
        newObject.financial_dept_info =
          respone.data.data.application.application_financials.financial_dept_info[0];
        console.log(newObject);
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
  const initialValues = {
    Fy1: [
      { name: "total_assets", label: "Total Assets", value: "" },
      { name: "total_liability", label: "Total Liability", value: "" },
      { name: "total_networth", label: "Total Networth", value: "" },
      { name: "annual_turnover", label: "Annual Turnover", value: "" },
      { name: "profit_before_taxes", label: "Profit Before Taxes", value: "" },
      { name: "profit_after_taxes", label: "Profit After Taxes", value: "" },
    ],
    Fy2: [
      { name: "total_assets", label: "Total Assets", value: "" },
      { name: "total_liability", label: "Total Liability", value: "" },
      { name: "total_networth", label: "Total Networth", value: "" },
      { name: "annual_turnover", label: "Annual Turnover", value: "" },
      { name: "profit_before_taxes", label: "Profit Before Taxes", value: "" },
      { name: "profit_after_taxes", label: "Profit After Taxes", value: "" },
    ],
    Fy3: [
      { name: "total_assets", label: "Total Assets", value: "" },
      { name: "total_liability", label: "Total Liability", value: "" },
      { name: "total_networth", label: "Total Networth", value: "" },
      { name: "annual_turnover", label: "Annual Turnover", value: "" },
      { name: "profit_before_taxes", label: "Profit Before Taxes", value: "" },
      { name: "profit_after_taxes", label: "Profit After Taxes", value: "" },
    ],
    financial_dept_info: {
      project_name: "",
      location: "",
      sector: "",
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
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (val) => {
      console.log(JSON.stringify(val));
    },
  });
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="finance_container">
      <Loading loading={loading} />
      <Alert text={alertTex} />
      <FormikProvider value={formik}>
        <table className="home_table">
          {formik.values.Fy1.length > 0 && (
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
                        {...formik.getFieldProps(
                          `Fy1.${ind}.value`
                        )}
                        onChange={formik.handleChange}
                        label=""
                        // name={`Fy1`}
                        outlined
                      />
                    </td>
                    <td>
                      <Input
                        {...formik.getFieldProps(
                          `Fy2.${ind}.value`
                        )}
                        onChange={formik.handleChange}
                        label=""
                        outlined
                      />
                    </td>
                    <td>
                      <Input
                        {...formik.getFieldProps(
                          `Fy3.${ind}.value`
                        )}
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
        <h2>Debt Information</h2>
        <div className="debt">
          <h2>
            Applicable Project for which Equity / Debt financing was secured
          </h2>
          <div className="sub-group">
            <Input
              value={formik.values.financial_dept_info.project_name}
              onChange={formik.handleChange}
              name="financial_dept_info.project_name"
              style={{ width: "30%" }}
              outlined
              label="Project Name"
            />
            <Input
              value={formik.values.financial_dept_info.location}
              onChange={formik.handleChange}
              name="financial_dept_info.location"
              style={{ width: "30%" }}
              outlined
              label="Location"
            />
            <Input
              value={formik.values.financial_dept_info.sector}
              onChange={formik.handleChange}
              name="financial_dept_info.sector"
              style={{ width: "30%" }}
              outlined
              label="Sector"
            />
          </div>
          <Input
            value={formik.values.financial_dept_info.aggregate_amount}
            onChange={formik.handleChange}
            name="financial_dept_info.aggregate_amount"
            outlined
            label="Aggregate Amount of financing"
          />
          <Input
            value={formik.values.financial_dept_info.date_of_financial_close}
            onChange={formik.handleChange}
            name="financial_dept_info.date_of_financial_close"
            outlined
            label="Date of financial close"
          />
          {/* <Input
            value={formik.values.financial_dept_info.date_of_first_drawdown}
            outlined
            onChange={formik.handleChange}
            name="financial_dept_info.date_of_first_drawdown"
            label="Date of first drawdown"
          />
          <Input
            value={formik.values.financial_dept_info.date_of_final_drawdown}
            onChange={formik.handleChange}
            name="financial_dept_info.date_of_final_drawdown"
            outlined
            label="Date of final drawdown"
          />
          <Input
            value={formik.values.financial_dept_info.tenor_of_financing}
            onChange={formik.handleChange}
            name="financial_dept_info.tenor_of_financing"
            outlined
            label="tenor of financing"
          /> */}
          <h2>Borrower</h2>
          <div className="">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Input
                value={formik.values.financial_dept_info.borrower.name}
                type="text"
                placeholder="Name"
                outlined
                label="Name"
                name="financial_dept_info.borrower.name"
                onChange={formik.handleChange}
                style={{ width: "30%" }}
              />
              <Input
                value={formik.values.financial_dept_info.borrower.rc_number}
                style={{ width: "30%" }}
                type="text"
                placeholder="RC Number"
                name="financial_dept_info.borrower.rc_number"
                onChange={formik.handleChange}
                outlined
                label="RC Number"
              />
              <Input
                value={formik.values.financial_dept_info.borrower.address}
                onChange={formik.handleChange}
                style={{ width: "30%" }}
                type="text"
                placeholder="Address"
                outlined
                label="Address"
                name="financial_dept_info.borrower.address"
              />
            </div>
            {/* <FieldArray
              name="borrower"
              render={(arrayHelpers) => {
                const borrower = formik.values.financial_dept_info.borrower;

                return (
                  <div>
                    {borrower?.length > 0
                      ? borrower?.map((index) => {
                          return (
                            <div
                              key={index.toString()}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Input
                                type="text"
                                placeholder="Name"
                                outlined
                                label="Name"
                                name="financial_dept_info.borrower[0].name"
                                onChange={formik.handleChange}
                                style={{ width: "30%" }}
                              />
                              <Input
                                style={{ width: "30%" }}
                                type="text"
                                placeholder="RC Number"
                                name="financial_dept_info.borrower[0].rc_number"
                                onChange={formik.handleChange}
                                outlined
                                label="RC Number"
                              />
                              <Input
                              onChange={formik.handleChange}
                                style={{ width: "30%" }}
                                type="text"
                                placeholder="Address"
                                outlined
                                label="Address"
                                name="financial_dept_info.borrower[0].address"
                              />
                            </div>
                          );
                        })
                      : null}
                  </div>
                );
              }}
            ></FieldArray> */}
            
          </div>
          <Input
                
                type='file'
              
                outlined
                label="Evidence of support file"
                name="financial_dept_info.borrower.address"
              />
        </div>
        <div className="save_next">
        <Button
          style={{
            width: 100,
            marginRight:20,
            backgroundColor:'#1641ff'
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

            setLoading(true);
            const response = await query({
              method: "POST",
              url: "/api/applicant/application/create/financial",
              token: data.user.user.token,
              bodyData: Bodydata,
            });
            

            if (response.success) {
              setAlert("Data Saved");
              // moveToTab(7);
            } else {
              setAlert("Application failed, please try again");
            }
            setTimeout(()=>{
setAlert('')
            },2000)
            setLoading(false);

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

            setLoading(true);
            const response = await query({
              method: "POST",
              url: "/api/applicant/application/create/financial",
              token: data.user.user.token,
              bodyData: Bodydata,
            });
            console.log("RES", response);

            if (response.success) {
              console.log("DONE", response);
              moveToTab(6);
            } else {
              setAlert("Application failed, please try again");
            }
            setTimeout(()=>{
              setAlert('')
                          },2000)
            setLoading(false);

            console.log(Bodydata);
          }}
          label="Next"
        />
        </div>
        
      </FormikProvider>
    </div>
  );
}
