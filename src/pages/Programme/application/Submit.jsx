import { useNavigate } from "react-router-dom";
import Alert from "../../../components/Alert";
import { Header } from "../../../components/Common";
import Loading from "../../../components/Loading";
import "../../styles/submit.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import query from "../../../helpers/query";
import nProgress from "nprogress";
import Button from "../../../components/Button";
function Submit() {
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(null);
  const [loading2, setLoading2] = useState(false);
  const [alertText, setAlert] = useState("");
  const navigate = useNavigate();

  const programData = useSelector((state) => state);
  const getData = async () => {
    nProgress.start();
    const { success, data, error } = await query({
      method: "GET",
      url: `/api/applicant/application/get?program_id=${programData.program.id}`,
      token: programData.user.user.token,
    });
    nProgress.done();
    console.log(data.data.application, "uuu");
    setLoading(false);
    if (success) {
      setCurrent(data.data.application);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  let data = [
    {
      name: "Mubarak",
      rc: "34 323 ",
      date: "2014",
      parent: "Ibrahim",
      authorizes: "true",
    },
  ];

  return (
    <div className="review-container">
      <Loading loading={loading2} />
      <Alert text={alertText} />

      <Header style={{ color: "var(--primary)" }} text="Compay Overview" />
      {loading && <img src="/loading.gif" id="loader" />}
      {current !== null && (
        <div>
          <table
            style={{ fontSize: 12, textAlign: "justify", border: "none" }}
            className="review_table"
          >
            <thead>
              <th>Business name</th>
              <th>RC Number</th>
              <th>incorporation Date</th>
              <th>Parent comapany/owner </th>
              <th>Authorized Personnel</th>
            </thead>
            <tbody style={{ border: "none" }}>
              <tr key={Math.random()}>
                <td>{current.application_profile[0].name}</td>
                <td>{current.application_profile[0].cac_number}</td>
                <td>{current.application_profile[0].registration_date}</td>
                <td>{current.application_profile[0].authorised_personel}</td>
                <td>YES</td>
              </tr>
            </tbody>
          </table>
          <div
            style={{
              borderStyle: "dashed",
              height: 0.001,
              backgroundColor: "transparent",
              borderWidth: 0.1,
              width: "100%",
              borderColor: "gray",
              marginTop: 20,
              marginBottom: 20,
            }}
            className="divider"
          />
        </div>
      )}

      {current !== null && (
        <div>
          <span>Business Address</span>
          <p>{current.application_profile[0].address}</p>
        </div>
      )}

      {current !== null && (
        <div className="directors-container">
          <div className="first">
            <h2 className="review-header">Directors information</h2>
            <table className="review_table">
              <thead>
                <th>S/N</th>
                <th>FULL Name</th>
                <th>Contact </th>
              </thead>
              <tbody>
                {current.application_profile[0].share_holders.map(
                  (item, index) => {
                    return (
                      <tr key={index}>
                        <td>{++index}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>

          <div>
            <h2 className="review-header"> Contact Person</h2>
            <table className="review_table">
              <thead>
                <th>S/N</th>
                <th>FULL Name</th>
                <th>Contact </th>
                <th>EMAIL</th>
              </thead>
              <tbody>
                {current.application_profile[0].contact_persons.map(
                  (item, index) => {
                    return (
                      <tr key={index}>
                        <td>{++index}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {current !== null && (
        <div>
          <h2 className="review-header">Document uploaded</h2>
          <table className="review_table">
            <thead>
              <th>S/N</th>
              <th>Document</th>
              <th>Status </th>
            </thead>
            <tbody>
              {current.application_documents.map((item, index) => {
                return (
                  <tr key={Math.random()}>
                    <td>{++index}</td>
                    <td>{item.name}</td>
                    <td>UPLOADED</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {current !== null && (
        <div>
          <h2 className="review-header">technical requirements (staff)</h2>
          <hr className="horizontal-line" />
          <table
            style={{ width: "100%", textAlign: "justify" }}
            className="review_table"
          >
            <thead>
              <th>S/N</th>
              <th>Name</th>
              <th>COREN?</th>
              <th>Position</th>
            </thead>
            <tbody>
              {current.application_staff.map((item, index) => {
                return (
                  <tr key={Math.random()}>
                    <td>{++index}</td>
                    <td>{item.name}</td>
                    <td>{item.coren_license_number ? "YES" : "NO"}</td>
                    <td>{item.current_position.position}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {current !== null && (
        <div className="reference-project">
          <h2 className="review-header">reference-project(s)</h2>
          <hr className="horizontal-line" />
          <table className="review_table">
            <thead>
              <th>S/N</th>
              <th>Project title</th>
              <th>Employer</th>
              <th>Location</th>
              <th>Award date</th>
              <th>Date of completion</th>
            </thead>
            <tbody>
              {current.application_projects.map((item, index) => {
                return (
                  <tr key={Math.random()}>
                    <td>{++index}</td>
                    <td>{item.name}</td>
                    <td>{item.employer}</td>
                    <td>{item.location}</td>
                    <td>{item.date_of_contract}</td>
                    <td>{item.date_of_completion}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {current !== null && (
        <div className="financial-details">
          <h2 className="review-header">financial-details</h2>
          <hr className="horizontal-line" />
          <table className="review_table">
            <thead>
              <th></th>
              <th>Total assests</th>
              <th>Annual turn over</th>
              <th>Total networth</th>
              <th>Total liabilities</th>
            </thead>
            <tbody>
              {current.application_financials.financial_info.map((item) => {
                return (
                  <tr key={Math.random()}>
                    <td>{item.type.toUpperCase()}</td>
                    <td>{item.total_assets}</td>
                    <td>{item.annual_turnover}</td>
                    <td>{item.total_networth}</td>
                    <td>{item.total_liability}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {current !== null && (
        <div className="financial-details">
          <h2 className="review-header">financial debts information</h2>
          <hr className="horizontal-line" />
          <table className="review_table">
            <thead>
              <th>S/N</th>
              <th>Project name</th>
              <th>Aggregate amount</th>
              <th>Financier</th>
              <th>Location</th>
            </thead>
            <tbody>
              {current.application_financials.financial_dept_info.map(
                (item, index) => {
                  return (
                    <tr key={Math.random()}>
                      <td>{++index}</td>
                      <td>{item.project_name}</td>
                      <td>{item.aggregate_amount}</td>
                      <td>{item.borrowers[0].name}</td>
                      <td>{item.location}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      )}

      <Button
        disabled={
          current == null
            ? true
            : current.application_profile.length == 0 ||
              current.application_financials.financial_dept_info.length == 0 ||
              current.application_projects.length == 0 ||
              current.application_profile[0].share_holders.length == 0 ||
              current.application_profile[0].contact_persons.length == 0
            ? true
            : false
        }
        style={{
          width: 200,
          marginLeft: "auto",
          marginTop: 20,
        }}
        onClick={async () => {
          const bodyData = {};

          setLoading2(true);
          const response = await query({
            method: "POST",
            url: `/api/applicant/application/submit?application_id=${programData.applicant.application.id}`,
            token: programData.user.user.token,
            bodyData,
          });

          setLoading2(false);
          if (response.success) {
            // dispatch(setApplication(response.data.data.application));
            setAlert("Application Submitied");
            // localStorage.clear()
          } else {
            setAlert("Application failed, please try again");
          }
          setTimeout(() => {
            navigate("/Home");
            setAlert("");
          }, 2000);
        }}
        label="Submit"
      />
    </div>
  );
}

export default Submit;
