import { FormikProvider, useFormik } from "formik";
import "../../styles/finance.css";
import React from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

export default function Financial() {
  const percentsge = [{ name: "", state: "" }];
  const initialValues = {
    Fy1: [
      { name: "Total Assets", value: "" },
      { name: "Total Liability", value: "" },
      { name: "Total Networth", value: "" },
      { name: "Annual Turnover", value: "" },
      { name: "Profit Before Taxes", value: "" },
      { name: "Profit After Taxes", value: "" },
    ],
    Fy2: [
      { name: "Total Assets", value: "" },
      { name: "Total Liability", value: "" },
      { name: "Total Networth", value: "" },
      { name: "Annual Turnover", value: "" },
      { name: "Profit Before Taxes", value: "" },
      { name: "Profit After Taxes", value: "" },
    ],
    Fy3: [
      { name: "Total Assets", value: "" },
      { name: "Total Liability", value: "" },
      { name: "Total Networth", value: "" },
      { name: "Annual Turnover", value: "" },
      { name: "Profit Before Taxes", value: "" },
      { name: "Profit After Taxes", value: "" },
    ],
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (val) => {
      console.log(JSON.stringify(val));
    },
  });
  return (
    <div className="finance_container">
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
                    <td>{prs.name}</td>
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
          <Input outlined label="Aggregate Amount of financing" />
          <Input outlined label="Date of financial close" />
          <Input outlined label="Date of first drawdown" />
          <Input outlined label="Date of final drawdown" />
          <Input outlined label="tenor of financing" />
          <h2>Borrower</h2>
          <div className="sub-group">
            <Input style={{ width: "30%" }} outlined label="Name" />
            <Input style={{ width: "30%" }} outlined label="Rc Number" />
            <Input style={{ width: "30%" }} outlined label="Address" />
          </div>
        </div>

        <Button 
        style={{
            width:200,
            marginLeft:'auto',
            marginTop:20
        }}
          onClick={() => {
            console.log(formik.values);
          }}
          label="Next"
        />
      </FormikProvider>
    </div>
  );
}
