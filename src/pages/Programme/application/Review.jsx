import React from "react";
import Button from "../../../components/Button";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import query from "../../../helpers/query";
import { useState } from "react";
import "../../styles/review.css";
// import Loading from "../../../components/Loading";
import Alert from "../../../components/Alert";
import { useNavigate } from "react-router-dom";
import { persistor } from "../../../redux/store";
import nProgress from "nprogress";
import { FaCheck } from "react-icons/fa";
import { MoonLoader } from "react-spinners";

function Review() {
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
  return (
    <div>
      {loading && (
        <MoonLoader
          size={25}
          cssOverride={{ position: "absolute", left: "50%", top: "50%" }}
        />
      )}
      {/* <Loading loading={loading2}/> */}
      <Alert text={alertText} />
      <h3>Review and submit</h3>
      <div className="review-sub">
        <h2>Eligibility Requirements</h2>

        {current !== null && (
          <div className="review-item">
            <div>
              <p>Business Name</p>
              <h4>
                {current.application_profile.length
                  ? current.application_profile[0].name
                  : ""}
              </h4>
            </div>

            <div>
              <p>RC Number</p>
              <h4>
                {current.application_profile.length
                  ? current.application_profile[0].cac_number
                  : ""}
              </h4>
            </div>
            <div>
              <p>Address</p>
              <h4>
                {current.application_profile.length
                  ? current.application_profile[0].address
                  : ""}
              </h4>
            </div>
            <div>
              <p>Authorised Personel</p>
              <h4>
                {current.application_profile.length
                  ? current.application_profile[0].authorised_personel
                  : ""}
              </h4>
            </div>
          </div>
        )}

        <h4>Directors</h4>
        {current !== null && (
          <div className="review-item">
            {current.application_profile.length &&
              current.application_profile[0].share_holders.map((apl, ind) => (
                <>
                  <div>
                    <p>Name</p>
                    <h4>{apl.name}</h4>
                  </div>

                  <div>
                    <p>Phone</p>
                    <h4>{apl.phone}</h4>
                  </div>
                </>
              ))}
          </div>
        )}

        <h4>Contact Persons</h4>
        {current !== null && (
          <div className="review-item sub">
            {current.application_profile.length &&
              current.application_profile[0].contact_persons.map((apl, ind) => (
                <>
                  <div>
                    <p>Name</p>
                    <h4>{apl.name}</h4>
                  </div>

                  <div>
                    <p>Phone</p>
                    <h4>{apl.phone}</h4>
                  </div>

                  <div>
                    <p>Email</p>
                    <h4>{apl.email}</h4>
                  </div>
                </>
              ))}
          </div>
        )}
        <h4>Uploaded Documents</h4>
        {current !== null && (
          <div className="review-item sub">
            {current.application_documents.map((apl, ind) => (
              <>
                <div>
                  <p>{apl.name}</p>
                  <span
                    style={{
                      width: 200,
                    }}
                    className="suc"
                  >
                    Uploaded
                    <FaCheck />
                  </span>
                </div>
              </>
            ))}
          </div>
        )}
        <h2>Technical Requirements</h2>
        <h4>Staff</h4>
        {current !== null && (
          <div className="review-item sub">
            {current.application_staff.map((apl, ind) => (
              <>
                <div>
                  <p>Name</p>
                  <h4>{apl.name}</h4>
                </div>

                <div>
                  <p>Current Position</p>
                  <h4>{apl.current_position.position}</h4>
                </div>
              </>
            ))}
          </div>
        )}

        <h4>Reference Project</h4>
        {current !== null && (
          <div className="review-item sub">
            {current.application_projects.map((apl, ind) => (
              <>
                <div>
                  <p>Project Name</p>
                  <h4>{apl.name}</h4>
                </div>

                <div>
                  <p>Employer</p>
                  <h4>{apl.employer}</h4>
                </div>

                <div>
                  <p>Date of completion</p>
                  <h4>{apl.date_of_completion}</h4>
                </div>
              </>
            ))}
          </div>
        )}
        <h2>Financial Details</h2>
        <h4>Fy1</h4>
        {current !== null && (
          <div className="review-item sub">
            {current.application_financials.financial_info.length && (
              <>
                <div>
                  <p>Totall Assets</p>
                  <h4>
                    {
                      current.application_financials.financial_info[0]
                        .total_assets
                    }
                  </h4>
                </div>

                <div>
                  <p>Annual Turn Over</p>
                  <h4>
                    {
                      current.application_financials.financial_info[0]
                        .annual_turnover
                    }
                  </h4>
                </div>

                <div>
                  <p>Total Networth</p>
                  <h4>
                    {
                      current.application_financials.financial_info[0]
                        .total_networth
                    }
                  </h4>
                </div>

                <div>
                  <p>Total Liability</p>
                  <h4>
                    {
                      current.application_financials.financial_info[0]
                        .total_liability
                    }
                  </h4>
                </div>
              </>
            )}
          </div>
        )}

        <h4>Fy2</h4>
        {current !== null && (
          <div className="review-item sub">
            {current.application_financials.financial_info.length && (
              <>
                <div>
                  <p>Totall Assets</p>
                  <h4>
                    {
                      current.application_financials.financial_info[1]
                        .total_assets
                    }
                  </h4>
                </div>

                <div>
                  <p>Annual Turn Over</p>
                  <h4>
                    {
                      current.application_financials.financial_info[1]
                        .annual_turnover
                    }
                  </h4>
                </div>

                <div>
                  <p>Total Networth</p>
                  <h4>
                    {
                      current.application_financials.financial_info[1]
                        .total_networth
                    }
                  </h4>
                </div>

                <div>
                  <p>Total Liability</p>
                  <h4>
                    {
                      current.application_financials.financial_info[1]
                        .total_liability
                    }
                  </h4>
                </div>
              </>
            )}
          </div>
        )}

        <h4>Fy3</h4>
        {current !== null && (
          <div className="review-item sub">
            {current.application_financials.financial_info.length && (
              <>
                <div>
                  <p>Totall Assets</p>
                  <h4>
                    {
                      current.application_financials.financial_info[2]
                        .total_assets
                    }
                  </h4>
                </div>

                <div>
                  <p>Annual Turn Over</p>
                  <h4>
                    {
                      current.application_financials.financial_info[2]
                        .annual_turnover
                    }
                  </h4>
                </div>

                <div>
                  <p>Total Networth</p>
                  <h4>
                    {
                      current.application_financials.financial_info[2]
                        .total_networth
                    }
                  </h4>
                </div>

                <div>
                  <p>Total Liability</p>
                  <h4>
                    {
                      current.application_financials.financial_info[2]
                        .total_liability
                    }
                  </h4>
                </div>
              </>
            )}
          </div>
        )}
        <h4>Financial Dept Info</h4>

        {current !== null && (
          <div className="review-item sub">
            {current.application_financials.financial_info.length && (
              <>
                <div>
                  <p>Aggregate Amount</p>
                  <h4>
                    {
                      current.application_financials.financial_dept_info[0]
                        .aggregate_amount
                    }
                  </h4>
                </div>

                <div>
                  <p>Financiers</p>
                  <h4>
                    {
                      current.application_financials.financial_dept_info[0]
                        .borrowers[0].name
                    }
                  </h4>
                </div>

                <div>
                  <p>Project Name</p>
                  <h4>
                    {
                      current.application_financials.financial_dept_info[0]
                        .project_name
                    }
                  </h4>
                </div>

                <div>
                  <p>Location</p>
                  <h4>
                    {
                      current.application_financials.financial_dept_info[0]
                        .location
                    }
                  </h4>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      {loading && (
        <MoonLoader
          size={25}
          cssOverride={{ position: "absolute", left: "50%", top: "50%" }}
        />
      )}
      {/* {loading && <img src="/loading.gif" id="loader" />} */}
      <Button
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

export default Review;

{
  /* <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rating</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{++index}</td>
              <td>{item.name}</td>
              <td>{item.rating}</td>
              <td>{item.review}</td>
              <td>
                {item.document.map((item) => (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>{item.rating}</span>
                    <span>{item.review}</span>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table> */
}
