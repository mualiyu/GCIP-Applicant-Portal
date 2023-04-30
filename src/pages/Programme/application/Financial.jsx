import { FieldArray, FormikProvider, useFormik } from "formik";
import "../../styles/finance.css";
import React, { useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import Alert from "../../../components/Alert";
import query from "../../../helpers/query";

export default function Financial() {
  const data = useSelector((state) => state);
  const [alertTex, setAlert] = useState("");
  const [loading, setLoading] = useState(false);

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
      borrower: [
        {
          name: "",
          rc_number: "",
          address: "",
        },
      ],
    },
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (val) => {
      console.log(JSON.stringify(val));
    },
  });
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
                        onChange={(e) => {
                          formik.values.Fy1[ind].value = e.target.value;
                        }}
                        label=""
                        outlined
                      />
                    </td>
                    <td>
                      <Input
                        onChange={(e) => {
                          formik.values.Fy2[ind].value = e.target.value;
                        }}
                        label=""
                        outlined
                      />
                    </td>
                    <td>
                      <Input
                        onChange={(e) => {
                          formik.values.Fy3[ind].value = e.target.value;
                        }}
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
              onChange={formik.handleChange}
              name="financial_dept_info.project_name"
              style={{ width: "30%" }}
              outlined
              label="Project Name"
            />
            <Input
              onChange={formik.handleChange}
              name="financial_dept_info.location"
              style={{ width: "30%" }}
              outlined
              label="Location"
            />
            <Input
              onChange={formik.handleChange}
              name="financial_dept_info.sector"
              style={{ width: "30%" }}
              outlined
              label="Sector"
            />
          </div>
          <Input
            onChange={formik.handleChange}
            name="financial_dept_info.aggregate_amount"
            outlined
            label="Aggregate Amount of financing"
          />
          <Input
            onChange={formik.handleChange}
            name="financial_dept_info.date_of_financial_close"
            outlined
            label="Date of financial close"
          />
          <Input
            outlined
            onChange={formik.handleChange}
            name="financial_dept_info.date_of_first_drawdown"
            label="Date of first drawdown"
          />
          <Input
            onChange={formik.handleChange}
            name="financial_dept_info.date_of_final_drawdown"
            outlined
            label="Date of final drawdown"
          />
          <Input
            onChange={formik.handleChange}
            name="financial_dept_info.tenor_of_financing"
            outlined
            label="tenor of financing"
          />
          <h2>Borrower</h2>
          <div className="">
            <FieldArray
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
                                {...formik.getFieldProps(
                                  `borrower.${index}.name`
                                )}
                                onChange={formik.handleChange}
                                style={{ width: "30%" }}
                              />
                              <Input
                                style={{ width: "30%" }}
                                type="text"
                                placeholder="RC Number"
                                {...formik.getFieldProps(
                                  `borrower.${index}.rc_number`
                                )}
                                onChange={formik.handleChange}
                                outlined
                                label="RC Number"
                              />
                              <Input
                                style={{ width: "30%" }}
                                type="text"
                                placeholder="Address"
                                outlined
                                label="Address"
                                {...formik.getFieldProps(
                                  `borrower.${index}.address`
                                )}
                              />
                            </div>
                          );
                        })
                      : null}
                  </div>
                );
              }}
            ></FieldArray>
          </div>
        </div>

        <Button
          style={{
            width: 200,
            marginLeft: "auto",
            marginTop: 20,
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
              moveToTab(7);
            } else {
              setAlert("Apvplication failed, please try again");
            }
            setLoading(false);

            console.log(data);
          }}
          label="Next"
        />
      </FormikProvider>
    </div>
  );
}
