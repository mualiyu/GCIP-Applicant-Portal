import React, { useEffect, useState } from "react";
import "../../../styles/profile.css";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import Modal from "react-modal";
import moment from "moment";
import { FaWindowClose } from "react-icons/fa";
import { Header, RegularText } from "../../../../components/Common";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import query from "../../../../helpers/query";

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
    console.log(data);
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
            ].status == 5
            // submissions?.data?.application.application_decisions.reverse()[0]
            // .status == 3
          }
          style={{
            border: "none",
            padding: "12px 37px",
            backgroundColor: "#1a1989",
            color: "white",
            float: "right",
            marginTop: 35,
            cursor: "pointer",
          }}>
          {loading ? "Loading..." : "Submit Application"}
        </button>
      </section>
      {submissions?.data?.application.application_decisions[
        submissions?.data?.application.application_decisions.length - 1
      ].status == 3 && (
        <p style={{ color: "red" }}>
          Your Application has been Evaluated, You can not resubmit it again{" "}
        </p>
      )}
      <div class="row" style={{ marginTop: 35 }}>
        <div class="col-xxl-4 col-xl-4 col-lg-4" style={{ marginLeft: 5 }}>
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Selected Lot</h4>
            </div>
            <div class="card-body">
              <div class="app-link">
                <div class="">
                  <h5>{submissions?.data.application.lots[0].name}</h5> <br />
                  <p>
                    Reason for Selecting Lot : &nbsp;{" "}
                    {submissions?.data.application.lots[0].choice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {submissions?.data.application.application_decisions.length !== 0 && (
          <div class="col-xxl-12 col-xl-12 col-lg-12" style={{ marginLeft: 5 }}>
            <div class="card">
              <div class="card-header">
                <h4 class="card-title">Evaluation Report(s)</h4>
              </div>
              <table
                className=""
                style={{ width: "100%", textAlign: "left", fontSize: "11px" }}>
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
                <h4 class="card-title">Eligibility</h4>
              </div>
              <div class="card-body">
                <div class="app-link">
                  <div class="card-header flex-row">
                    <h5 style={{ width: "90%" }}>
                      {" "}
                      1. &nbsp; Does your company possess an innovative
                      idea/product which meets a critical need for “clean-tech
                      challenges”?
                    </h5>
                    <a
                      class=""
                      href="#"
                      style={{
                        width: "10%",
                        textDecoration: "none",
                        marginLeft: 20,
                      }}>
                      {
                        submissions?.data.application.application_eligibility
                          .does_your_company_possess_an_innovative_idea
                      }
                    </a>
                  </div>
                  <div class="card-header flex-row">
                    <h5 style={{ width: "90%" }}>
                      {" "}
                      2. &nbsp; Does your company require assistance to upscale?
                    </h5>
                    <a
                      class=""
                      href="#"
                      style={{
                        width: "10%",
                        textDecoration: "none",
                        marginLeft: 20,
                      }}>
                      {
                        submissions?.data.application.application_eligibility
                          .does_your_company_require_assistance_to_upscale
                      }
                    </a>
                  </div>
                  <div class="card-header flex-row">
                    <h5 style={{ width: "90%" }}>
                      {" "}
                      3. &nbsp; Is your company an incorporated for-profit
                      clean-tech company in Nigeria?
                    </h5>
                    <a
                      class=""
                      href="#"
                      style={{
                        width: "10%",
                        textDecoration: "none",
                        marginLeft: 20,
                      }}>
                      {
                        submissions?.data.application.application_eligibility
                          .incorporated_for_profit_clean_tech_company
                      }
                    </a>
                  </div>
                  <div class="card-header flex-row">
                    <h5 style={{ width: "90%" }}>
                      {" "}
                      4. &nbsp; To what extent are your challenges financial in
                      Nature?
                    </h5>
                    <a
                      class=""
                      href="#"
                      style={{
                        width: "10%",
                        textDecoration: "none",
                        marginLeft: 20,
                      }}>
                      {
                        submissions?.data.application.application_eligibility
                          .to_what_extent_are_your_challenges_financial_in_nature
                      }
                    </a>
                  </div>
                  <div class="card-header flex-row">
                    <h5 style={{ width: "90%" }}>
                      {" "}
                      5. &nbsp; How many years has your company been in
                      existence?
                    </h5>
                    <a
                      class=""
                      href="#"
                      style={{
                        width: "10%",
                        textDecoration: "none",
                        marginLeft: 20,
                      }}>
                      {
                        submissions?.data.application.application_eligibility
                          .years_of_existence
                      }
                    </a>
                  </div>

                  <div class="card-header flex-row">
                    <h5 style={{ width: "90%" }}>
                      {" "}
                      6. &nbsp; Is your company of a Nigerian Origin?
                    </h5>
                    <a
                      class=""
                      href="#"
                      style={{
                        width: "10%",
                        textDecoration: "none",
                        marginLeft: 20,
                      }}>
                      {
                        submissions?.data.application.application_eligibility
                          .nigerian_origin
                      }
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {submissions?.data.application.application_company_info !== null && (
          <div class="col-xxl-4 col-xl-4 col-lg-4" style={{ marginLeft: 5 }}>
            <div class="card">
              <div class="card-header">
                <h4 class="card-title">Company Information</h4>
              </div>
              <div class="card-body">
                <div class="app-link">
                  <div class="card-header flex-row">
                    <h5 style={{ width: "50%" }}>
                      {" "}
                      1. &nbsp; Describe your company’s corporate profile
                      showing your operational and service areas
                    </h5>
                    <a
                      class=""
                      href="#"
                      style={{
                        width: "50%",
                        textDecoration: "none",
                        marginLeft: 20,
                      }}>
                      {
                        submissions?.data.application.application_company_info
                          .profile
                      }
                    </a>
                  </div>
                </div>
              </div>
              <div class="app-link">
                <div class="card-header flex-row">
                  <h5 style={{ width: "50%" }}>
                    {" "}
                    2. &nbsp; Long Term Objectives (3 years and beyond)
                  </h5>
                  <a
                    class=""
                    href="#"
                    style={{
                      width: "50%",
                      textDecoration: "none",
                      marginLeft: 20,
                    }}>
                    {
                      submissions?.data.application.application_company_info
                        .long_term_objectives
                    }
                  </a>
                </div>
              </div>
              <div class="app-link">
                <div class="card-header flex-row">
                  <h5 style={{ width: "50%" }}>
                    {" "}
                    3. &nbsp; Medium term objectives (next 1-2 years)
                  </h5>
                  <a
                    class=""
                    href="#"
                    style={{
                      width: "50%",
                      textDecoration: "none",
                      marginLeft: 20,
                    }}>
                    {
                      submissions?.data.application.application_company_info
                        .medium_term_objectives
                    }
                  </a>
                </div>
              </div>
              <div class="app-link">
                <div class="card-header flex-row">
                  <h5 style={{ width: "50%" }}>
                    {" "}
                    4. &nbsp; Short term objectives for current year (include
                    bullet points as applicable)
                  </h5>
                  <a
                    class=""
                    href="#"
                    style={{
                      width: "50%",
                      textDecoration: "none",
                      marginLeft: 20,
                    }}>
                    {
                      submissions?.data.application.application_company_info
                        .short_term_objectives
                    }
                  </a>
                </div>
              </div>
              <div class="app-link">
                <div class="card-header flex-row">
                  <h5 style={{ width: "50%" }}>
                    {" "}
                    5. &nbsp; Number of Staff currently employed by your company
                  </h5>
                  <a
                    class=""
                    href="#"
                    style={{
                      width: "50%",
                      textDecoration: "none",
                      marginLeft: 20,
                    }}>
                    {
                      submissions?.data.application.application_company_info
                        .number_of_staff
                    }
                  </a>
                </div>
              </div>
              <div class="app-link">
                <div class="card-header flex-row">
                  <h5 style={{ width: "50%" }}>
                    {" "}
                    6. &nbsp; Organizational chart providing an overview of
                    personnel/staff involved, in the business in order of
                    hierarchy i.e. CEO, COO, Directors, technical staff etc.
                    Include names, gender, age and pictorial reference.
                  </h5>
                  <a
                    class=""
                    href="#"
                    style={{
                      width: "50%",
                      textDecoration: "none",
                      marginLeft: 20,
                    }}>
                    {
                      submissions?.data.application.application_company_info
                        .organizational_chart
                    }
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
        {submissions?.data.application.application_business_proposal !==
          null && (
          <div class="col-xxl-12 col-xl-12 col-lg-12" style={{ marginLeft: 5 }}>
            <div class="col-xxl-4 col-xl-4 col-lg-4" style={{ marginLeft: 5 }}>
              <div class="card">
                <div class="card-header">
                  <h4 class="card-title">Business Proposal</h4>
                </div>
                <div class="card-body">
                  <div class="app-link">
                    <div class="card-header flex-row">
                      <h5 style={{ width: "50%" }}>
                        1. &nbsp; Have you acquired patency or authority of the
                        patent owners to demonstrate the technology
                      </h5>
                      <a
                        class=""
                        href="#"
                        style={{
                          width: "50%",
                          textDecoration: "none",
                          marginLeft: 20,
                        }}>
                        {
                          submissions?.data.application
                            .application_business_proposal
                            .acquired_authority_of_the_patent_owners
                        }
                      </a>
                    </div>
                  </div>
                </div>
                <div class="app-link">
                  <div class="card-header flex-row">
                    <h5 style={{ width: "50%" }}>
                      {" "}
                      2. &nbsp; Have you carried out a market survey to verify
                      that the business can generate enough profit, such that it
                      would not require a continuous subsidy covering operation
                      costs and/or end-user consumption costs{" "}
                    </h5>
                    <a
                      class=""
                      href="#"
                      style={{
                        width: "50%",
                        textDecoration: "none",
                        marginLeft: 20,
                      }}>
                      {
                        submissions?.data.application
                          .application_business_proposal
                          .carried_out_market_survey
                      }
                    </a>
                  </div>
                </div>
                <div class="app-link">
                  <div class="card-header flex-row">
                    <h5 style={{ width: "50%" }}>
                      3. &nbsp; Demonstrate consideration for direct and
                      indirect carbon emissions in the design and deployment of
                      your technology/solution, include illustrations,
                      diagrammatic and pictorial references as applicable.
                    </h5>
                    <a
                      class=""
                      href="#"
                      style={{
                        width: "50%",
                        textDecoration: "none",
                        marginLeft: 20,
                      }}>
                      {
                        submissions?.data.application
                          .application_business_proposal
                          .consideration_for_direct_and_indirect_carbon_emissions_in_design
                      }
                    </a>
                  </div>
                </div>
                <div class="app-link">
                  <div class="card-header flex-row">
                    <h5 style={{ width: "50%" }}>
                      {" "}
                      4. &nbsp; Explain/demonstrate the critical need for the
                      technology/solution (i.e. carbon and Global Warming
                      Potential (GWP) reduction, energy efficiency, job
                      creation, rural/urban development etc)
                    </h5>
                    <a
                      class=""
                      href="#"
                      style={{
                        width: "50%",
                        textDecoration: "none",
                        marginLeft: 20,
                      }}>
                      {
                        submissions?.data.application
                          .application_business_proposal
                          .the_critical_need_for_the_technology
                      }
                    </a>
                  </div>
                </div>
                <div class="app-link">
                  <div class="card-header flex-row">
                    <h5 style={{ width: "50%" }}>
                      {" "}
                      5. &nbsp; State the critical needs for the grant and
                      identify areas for intervention
                    </h5>
                    <a
                      class=""
                      href="#"
                      style={{
                        width: "50%",
                        textDecoration: "none",
                        marginLeft: 20,
                      }}>
                      {
                        submissions?.data.application
                          .application_business_proposal
                          .the_critical_needs_for_the_grant
                      }
                    </a>
                  </div>
                </div>
                <div class="app-link">
                  <div class="card-header flex-row">
                    <h5 style={{ width: "50%" }}>
                      {" "}
                      6. &nbsp; Identify value additions that makes your
                      technology/solution stand out in comparison with existing
                      non-clean-tech and clean-tech alternatives to your
                      technology/solution. i.e. innovative business model, cost
                      comparison, technological advantages etc.
                    </h5>
                    <a
                      class=""
                      href="#"
                      style={{
                        width: "50%",
                        textDecoration: "none",
                        marginLeft: 20,
                      }}>
                      {
                        submissions?.data.application
                          .application_business_proposal
                          .valuable_additions_that_makes_your_technology_stand_out
                      }
                    </a>
                  </div>
                </div>
                <div class="app-link">
                  <div class="card-header flex-row">
                    <h5 style={{ width: "50%" }}>
                      {" "}
                      7. &nbsp; Markey Survey Document
                    </h5>
                    <a
                      class=""
                      href="#"
                      style={{
                        width: "50%",
                        textDecoration: "none",
                        marginLeft: 20,
                      }}>
                      {
                        submissions?.data.application
                          .application_business_proposal.survey_doc
                      }
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div class="col-xxl-4 col-xl-4 col-lg-4" style={{ marginLeft: 5 }}>
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">
                {submissions?.data.application.application_documents.length}{" "}
                Eligibility Documents Uploaded
              </h4>
            </div>
            <div class="card-body">
              <div class="app-link">
                {submissions?.data.application.application_documents.map(
                  (document, index) => (
                    <div class="card-header flex-row" key={document.id}>
                      <h5 style={{ width: "50%" }}>
                        {" "}
                        {index + 1} &nbsp; {document.name}
                      </h5>
                      <a
                        class=""
                        href="#"
                        style={{
                          width: "50%",
                          textDecoration: "none",
                          marginLeft: 20,
                        }}>
                        {document.url}
                      </a>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
