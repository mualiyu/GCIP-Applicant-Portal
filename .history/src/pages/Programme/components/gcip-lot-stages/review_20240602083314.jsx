import React, { useEffect, useState } from "react";
import "../../../styles/profile.css";
import reviewImage from "../../../../assets/Svg/review.svg";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import Modal from "react-modal";
import moment from "moment";
import { FaWindowClose } from "react-icons/fa";
import { Header, RegularText } from "../../../../components/Common";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import query from "../../../../helpers/query";
import TextExtractor from "../../../../helpers/textExtractor";
import Loading from "../../../../components/Loading";
import Alert from "../../../../components/Alert";
import { MoonLoader } from "react-spinners";

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
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

export default function GcipSubmissionReview() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const programData = useSelector((state) => state);
  const [submissions, setSubmissions] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const pData = useSelector((state) => state);
  const [alertText, setAlert] = useState("");
  const myFormData = new FormData();
  const Pdata = useSelector((state) => state);
  const getApplicationDetails = async () => {
    const { success, data, error } = await query({
      method: "GET",
      url: `/api/applicant/application/get?program_id=${pData?.program.id}`,
      token: pData.user.user.token,
    });
    // console.log(data);
    if (success) {
      setSubmissions(data);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const applicationId = submissions?.data?.application?.id;

    // Validate if applicationId is available
    if (!applicationId) {
      setLoading(false);
      return;
    }

    const { success, data, error } = await query({
      method: "POST",
      url: `/api/applicant/application/submit?application_id=${applicationId}`,
      token: programData.user.user.token,
    });
    if (success) {
      setAlert(`Great! Application has been submitted`);
      setTimeout(() => {
        setAlert("");
      }, 3000);
      setLoading(false);
    } else {
      setAlert(data.message);
      setTimeout(() => {
        setAlert("");
      }, 3000);
      setLoading(false);
    }
  };

  useEffect(() => {
    getApplicationDetails();
  }, []);
  return (
    <div className="profile">
      <Loading loading={loading} />
      <Alert text={alertText} style={{ padding: 9 }} />
      <section
        className="flex"
        style={{ alignItems: "end", justifyContent: "space-between" }}>
        {/* <img src={reviewImage} alt="" /> */}
        <div>
          <Header text="Review Application" /> <br />
          <span>
            Review your Submissions and make adjustments where necessary
          </span>
        </div>
        <button
          onClick={handleSubmit}
          disabled={
            submissions?.data?.application.application_decisions[
              submissions?.data?.application.application_decisions.length - 1
            ]?.status == 4
          }
          style={{
            border: "none",
            padding: "12px 37px",
            backgroundColor: "#1a1989",
            color: "white",
            float: "right",
            marginTop: 35,
            cursor: "pointer",
            borderRadius: 7,
          }}>
          {loading ? "Loading..." : "Submit Application"}
        </button>
      </section>
      {submissions?.data?.application.application_decisions[
        submissions?.data?.application.application_decisions.length - 1
      ]?.status == 4 && (
        <p style={{ color: "red" }}>
          Your Application has been Evaluated, You can not resubmit it again{" "}
        </p>
      )}
      <div class="row" style={{ marginTop: 35 }}>
        <div
          class="col-xxl-4 col-xl-4 col-lg-4"
          style={{ marginLeft: 5, width: "100%" }}>
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Selected Lot</h3>
            </div>
            <div class="card-body">
              <div class="app-link">
                <div class="">
                  <h5>{submissions?.data.application.lots[0].name}</h5> <br />
                </div>

                <h3 class="card-title" style={{ marginBottom: "10px" }}>
                  Reason for Selecting Lot :
                </h3>
                <p>
                  {TextExtractor(submissions?.data.application.lots[0].choice)}
                </p>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>

        {submissions?.data.application.application_decisions.length !== 0 && (
          <div
            class="col-xxl-12 col-xl-12 col-lg-12"
            style={{ marginLeft: 5, width: "100%" }}>
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Evaluation Report(s)</h3>
              </div>
              <table
                className=""
                style={{
                  width: "100%",
                  textAlign: "left",
                  fontFamily: "OpenSans-Regular",
                  fontSize: 15,
                  color: "gray",
                  lineHeight: 1.2,
                }}>
                <thead>
                  <th>S/N</th>
                  <th>Status</th>
                  <th>Remark</th>
                  <th>Review date</th>
                </thead>
                <tbody>
                  {submissions?.data?.application.application_decisions?.map(
                    (decision, index) => {
                      return (
                        <tr key={decision.id}>
                          <td>{index + 1}</td>
                          <td>
                            <p
                              style={{
                                color:
                                  decision.status == 1
                                    ? "Submitted"
                                    : decision.status == 2
                                    ? "Orange"
                                    : decision.status == 3
                                    ? "green"
                                    : decision.status == 5
                                    ? "orange"
                                    : "Red",
                              }}>
                              {decision.status == 1
                                ? "Submitted"
                                : decision.status == 2
                                ? "Queried"
                                : decision.status == 3
                                ? "Successful"
                                : decision.status == 5
                                ? "Under Review"
                                : "Unsuccessful"}
                            </p>
                          </td>
                          <td>{decision?.remark}</td>
                          <td>
                            {moment(decision?.updated_at).format("llll")}{" "}
                          </td>
                          {/* <td>
                          <ol type="a">
                            {decision?.concerns.map((concern) => {
                              return <li key={concern.id}>{concern}</li>;
                            })}
                          </ol>
                        </td> */}
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {submissions?.data.application.application_eligibility !== null && (
          <div class="col-xxl-12 col-xl-12 col-lg-12" style={{ marginLeft: 5 }}>
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Eligibility</h3>
              </div>
              <div class="card-body">
                <table
                  style={{
                    width: "100%",
                    textAlign: "left",
                    fontFamily: "OpenSans-Regular",
                    fontSize: 15,
                    color: "gray",
                    lineHeight: 1.2,
                  }}>
                  <thead style={{ fontWeight: 900, textAlign: "left" }}>
                    <th>S/N</th>
                    <th>Question</th>
                    <th>Response</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        Does your company possess an innovative idea/product
                        which meets a critical need for “clean-tech challenges”?
                      </td>
                      <td> {document.name} </td>
                      <td>
                        {
                          submissions?.data.application.application_eligibility
                            .does_your_company_possess_an_innovative_idea
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Does your company require assistance to upscale?</td>
                      <td> {document.name} </td>
                      <td>
                        {
                          submissions?.data.application.application_eligibility
                            .does_your_company_require_assistance_to_upscale
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>
                        Is your company an incorporated for-profit clean-tech
                        company in Nigeria?
                      </td>
                      <td> {document.name} </td>
                      <td>
                        {
                          submissions?.data.application.application_eligibility
                            .incorporated_for_profit_clean_tech_company
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>
                        To what extent are your challenges financial in Nature?
                      </td>
                      <td> {document.name} </td>
                      <td>
                        {
                          submissions?.data.application.application_eligibility
                            .to_what_extent_are_your_challenges_financial_in_nature
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>
                        How many years has your company been in existence?
                      </td>
                      <td> {document.name} </td>
                      <td>
                        {
                          submissions?.data.application.application_eligibility
                            .years_of_existence
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Is your company of a Nigerian Origin?</td>
                      <td> {document.name} </td>
                      <td>
                        {
                          submissions?.data.application.application_eligibility
                            .nigerian_origin
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {submissions?.data.application.application_company_info !== null && (
          <div class="col-xxl-4 col-xl-4 col-lg-4" style={{ marginLeft: 5 }}>
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Company Information</h3>
              </div>

              <table
                style={{
                  width: "100%",
                  textAlign: "left",
                  fontFamily: "OpenSans-Regular",
                  fontSize: 15,
                  color: "gray",
                  lineHeight: 1.2,
                }}>
                <thead style={{ fontWeight: 900, textAlign: "left" }}>
                  <th>S/N</th>
                  <th>Question</th>
                  <th>Response</th>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      {" "}
                      Describe your company’s corporate profile showing your
                      operational and service areas
                    </td>
                    <td>
                      {TextExtractor(
                        submissions?.data.application.application_company_info
                          .profile
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td> Long Term Objectives (3 years and beyond)</td>
                    <td>
                      {TextExtractor(
                        submissions?.data.application.application_company_info
                          .long_term_objectives
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Medium term objectives (next 1-2 years)</td>
                    <td>
                      {TextExtractor(
                        submissions?.data.application.application_company_info
                          .medium_term_objectives
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>
                      Short term objectives for current year (include bullet
                      points as applicable)
                    </td>
                    <td>
                      {TextExtractor(
                        submissions?.data.application.application_company_info
                          .short_term_objectives
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Number of Staff currently employed by your company</td>
                    <td>
                      {TextExtractor(
                        submissions?.data.application.application_company_info
                          .number_of_staff
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>
                      Organizational chart providing an overview of
                      personnel/staff involved, in the business in order of
                      hierarchy i.e. CEO, COO, Directors, technical staff etc.
                      Include names, gender, age and pictorial reference.
                    </td>
                    <td>
                      {
                        submissions?.data.application.application_company_info
                          .organizational_chart
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        {submissions?.data.application.application_business_proposal !==
          null && (
          <div class="col-xxl-12 col-xl-12 col-lg-12" style={{ marginLeft: 5 }}>
            <div class="col-xxl-4 col-xl-4 col-lg-4" style={{ marginLeft: 5 }}>
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">Business Proposal</h3>
                </div>
                <div class="card-body">
                  <table
                    style={{
                      width: "100%",
                      textAlign: "left",
                      fontFamily: "OpenSans-Regular",
                      fontSize: 15,
                      color: "gray",
                      lineHeight: 1.2,
                    }}>
                    <thead style={{ fontWeight: 900, textAlign: "left" }}>
                      <th>S/N</th>
                      <th>Question</th>
                      <th>Response</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>
                          Have you acquired patency or authority of the patent
                          owners to demonstrate the technology
                        </td>
                        <td>
                          {
                            submissions?.data.application
                              .application_business_proposal
                              .acquired_authority_of_the_patent_owners
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>
                          {" "}
                          Have you carried out a market survey to verify that
                          the business can generate enough profit, such that it
                          would not require a continuous subsidy covering
                          operation costs and/or end-user consumption costs
                        </td>
                        <td>
                          {
                            submissions?.data.application
                              .application_business_proposal
                              .carried_out_market_survey
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>
                          Demonstrate consideration for direct and indirect
                          carbon emissions in the design and deployment of your
                          technology/solution, include illustrations,
                          diagrammatic and pictorial references as applicable.
                        </td>
                        <td>
                          {TextExtractor(
                            submissions?.data.application
                              .application_business_proposal
                              .consideration_for_direct_and_indirect_carbon_emissions_in_design
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>
                          Explain/demonstrate the critical need for the
                          technology/solution (i.e. carbon and Global Warming
                          Potential (GWP) reduction, energy efficiency, job
                          creation, rural/urban development etc)
                        </td>
                        <td>
                          {TextExtractor(
                            submissions?.data.application
                              .application_business_proposal
                              .the_critical_need_for_the_technology
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>
                          State the critical needs for the grant and identify
                          areas for intervention
                        </td>
                        <td>
                          {TextExtractor(
                            submissions?.data.application
                              .application_business_proposal
                              .the_critical_needs_for_the_grant
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td>
                          Identify value additions that makes your
                          technology/solution stand out in comparison with
                          existing non-clean-tech and clean-tech alternatives to
                          your technology/solution. i.e. innovative business
                          model, cost comparison, technological advantages etc.
                        </td>
                        <td>
                          {TextExtractor(
                            submissions?.data.application
                              .application_business_proposal
                              .valuable_additions_that_makes_your_technology_stand_out
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        <div class="col-xxl-4 col-xl-4 col-lg-4" style={{ marginLeft: 5 }}>
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">
                {submissions?.data.application.application_documents.length}{" "}
                Eligibility Documents Uploaded
              </h3>
            </div>
            <div class="card-body">
              <table
                style={{
                  width: "100%",
                  textAlign: "left",
                  fontFamily: "OpenSans-Regular",
                  fontSize: 15,
                  color: "gray",
                  lineHeight: 1.2,
                }}>
                <thead style={{ fontWeight: 900, textAlign: "left" }}>
                  <th>S/N</th>
                  <th>Document</th>
                  <th>File</th>
                </thead>
                <tbody>
                  {submissions?.data.application.application_documents.map(
                    (document, index) => (
                      <tr key={document.id}>
                        <td> {index + 1} </td>
                        <td> {document.name} </td>
                        <td>
                          {" "}
                          <a
                            href={document.url}
                            target="_blank"
                            style={{ cursor: "pointer" }}>
                            {" "}
                            {document.url}{" "}
                          </a>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
