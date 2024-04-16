import React, { useEffect, useState } from "react";
import "../../../styles/profile.css";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import Modal from "react-modal";
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
    if (success) {
      console.log(data);
      setSubmissions(data);
    }
  };

  const handleSubmit = async () => {
    console.log("hey");
    setLoading(true);
    const { success, data, error } = await query({
      method: "POST",
      url: `/api/applicant/application/submit?application_id=${submissions?.application?.id}`,
      token: programData.user.user.token,
    });
    console.log(data);
    if (success) {
      setAlert(`Great! Application has been submitted`);
      setTimeout(() => {
        setAlert("");
      }, 3000);
      setLoading(false);
      // navigate(
      //   `/Programme/Application/${data.data.application.program_id}/continue`
      // );
    } else {
      setAlert("Oops! Something went wrong");
      setTimeout(() => {
        setAlert("");
      }, 3000);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(pData);
    console.log(submissions);
    getApplicationDetails();
  }, []);
  return (
    <div className="profile">
      <Loading loading={loading} />
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

      <div class="row" style={{ marginTop: 35 }}>
        <div class="col-xxl-8 col-xl-8 col-lg-8">
          <div class="card ">
            <div class="card-body">
              <div class="welcome-profile">
                <div class="card-header flex-row"></div>
                <div class="d-flex align-items-center">
                  <div className="short_name">
                    <span>
                      {pData?.user?.user?.name?.split("")[0]}{" "}
                      {pData?.user?.user?.name?.split("")[1]}
                    </span>
                  </div>
                  <div class="ms-3">
                    <h4>
                      Hello,{" "}
                      {pData.user.user.inCharge
                        ? pData.user.user.inCharge
                        : "N/A"}{" "}
                      !
                    </h4>
                    <p>Here is a summary of your submission</p>
                  </div>
                </div>
                <ul>
                  <li>
                    <a href="#">
                      <div class="user-info">
                        Company Name :{" "}
                        <span className="inffdgshd">
                          {pData.user.user.name}
                        </span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="user-info">
                        RC Number :{" "}
                        <span className="inffdgshd">
                          {pData.user.user.rcNumber}
                        </span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="user-info">
                        Username :{" "}
                        <span className="inffdgshd">
                          {pData.user.user.username}
                        </span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="user-info">
                        Email :{" "}
                        <span className="inffdgshd">
                          {pData.user.user.email}
                        </span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="user-info">
                        Phone :{" "}
                        <span className="inffdgshd">
                          0{pData.user.user.phone}
                        </span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="user-info">
                        Address :{" "}
                        <span className="inffdgshd">
                          {pData.user.user.address}
                        </span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xxl-4 col-xl-4 col-lg-4" style={{ marginLeft: 5 }}>
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Selected Lot</h4>
            </div>
            <div class="card-body">
              <div class="app-link">
                {submissions?.data.application.lots.map((lot, index) => (
                  <div class="card-header flex-row" key={lot.id}>
                    <h5>{lot.name}</h5>
                    {/* <a class="" href="#">
                      {lot.id}
                    </a> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div class="col-xxl-12 col-xl-12 col-lg-12" style={{ marginLeft: 5 }}>
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Eligibility</h4>
            </div>
            <div class="card-body">
              <div class="app-link">
                <div class="card-header flex-row">
                  <h5>
                    {" "}
                    Does your company possess an innovative idea/product which
                    meets a critical need for “clean-tech challenges”?
                  </h5>
                  <a class="" href="#">
                    {
                      submissions?.data.application.application_eligibility
                        .does_your_company_possess_an_innovative_idea
                    }
                  </a>
                </div>
                <div class="card-header flex-row">
                  <h5> Does your company require assistance to upscale?</h5>
                  <a class="" href="#">
                    {
                      submissions?.data.application.application_eligibility
                        .does_your_company_require_assistance_to_upscale
                    }
                  </a>
                </div>
                <div class="card-header flex-row">
                  <h5>
                    {" "}
                    Is your company an incorporated for-profit clean-tech
                    company in Nigeria?
                  </h5>
                  <a class="" href="#">
                    {
                      submissions?.data.application.application_eligibility
                        .incorporated_for_profit_clean_tech_company
                    }
                  </a>
                </div>
                <div class="card-header flex-row">
                  <h5>
                    {" "}
                    To what extent are your challenges financial in Nature?
                  </h5>
                  <a class="" href="#">
                    {
                      submissions?.data.application.application_eligibility
                        .to_what_extent_are_your_challenges_financial_in_nature
                    }
                  </a>
                </div>
                <div class="card-header flex-row">
                  <h5> How many years has your company been in existence?</h5>
                  <a class="" href="#">
                    {
                      submissions?.data.application.application_eligibility
                        .years_of_existence
                    }
                  </a>
                </div>

                <div class="card-header flex-row">
                  <h5> Is your company of a Nigerian Origin?</h5>
                  <a class="" href="#">
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

        <div class="col-xxl-4 col-xl-4 col-lg-4" style={{ marginLeft: 5 }}>
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Application Information</h4>
            </div>
            <div class="card-body">
              <div class="app-link">
                <div class="card-header flex-row">
                  <h5>
                    {" "}
                    Describe your company’s corporate profile showing your
                    operational and service areas
                  </h5>
                  <a class="" href="#">
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
                <h5> Long Term Objectives (3 years and beyond)</h5>
                <a class="" href="#">
                  {
                    submissions?.data.application.application_company_info
                      .long_term_objectives
                  }
                </a>
              </div>
            </div>
            <div class="app-link">
              <div class="card-header flex-row">
                <h5> Medium term objectives (next 1-2 years)</h5>
                <a class="" href="#">
                  {
                    submissions?.data.application.application_company_info
                      .medium_term_objectives
                  }
                </a>
              </div>
            </div>
            <div class="app-link">
              <div class="card-header flex-row">
                <h5>
                  {" "}
                  Short term objectives for current year (include bullet points
                  as applicable)
                </h5>
                <a class="" href="#">
                  {
                    submissions?.data.application.application_company_info
                      .short_term_objectives
                  }
                </a>
              </div>
            </div>
            <div class="app-link">
              <div class="card-header flex-row">
                <h5> Number of Staff currently employed by your company</h5>
                <a class="" href="#">
                  {
                    submissions?.data.application.application_company_info
                      .number_of_staff
                  }
                </a>
              </div>
            </div>
            <div class="app-link">
              <div class="card-header flex-row">
                <h5>
                  {" "}
                  organizational chart providing an overview of personnel/staff
                  involved, in the business in order of hierarchy i.e. CEO, COO,
                  Directors, technical staff etc. Include names, gender, age and
                  pictorial reference.
                </h5>
                <a class="" href="#">
                  {
                    submissions?.data.application.application_company_info
                      .organizational_chart
                  }
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xxl-4 col-xl-4 col-lg-4" style={{ marginLeft: 5 }}>
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Business Proposal</h4>
            </div>
            <div class="card-body">
              <div class="app-link">
                <div class="card-header flex-row">
                  <h5>
                    Have you acquired patency or authority of the patent owners
                    to demonstrate the technology
                  </h5>
                  <a class="" href="#">
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
                <h5>
                  {" "}
                  Have you carried out a market survey to verify that the
                  business can generate enough profit, such that it would not
                  require a continuous subsidy covering operation costs and/or
                  end-user consumption costs{" "}
                </h5>
                <a class="" href="#">
                  {
                    submissions?.data.application.application_business_proposal
                      .carried_out_market_survey
                  }
                </a>
              </div>
            </div>
            <div class="app-link">
              <div class="card-header flex-row">
                <h5>
                  Demonstrate consideration for direct and indirect carbon
                  emissions in the design and deployment of your
                  technology/solution, include illustrations, diagrammatic and
                  pictorial references as applicable.
                </h5>
                <a class="" href="#">
                  {
                    submissions?.data.application.application_business_proposal
                      .consideration_for_direct_and_indirect_carbon_emissions_in_design
                  }
                </a>
              </div>
            </div>
            <div class="app-link">
              <div class="card-header flex-row">
                <h5>
                  {" "}
                  Explain/demonstrate the critical need for the
                  technology/solution (i.e. carbon and Global Warming Potential
                  (GWP) reduction, energy efficiency, job creation, rural/urban
                  development etc)
                </h5>
                <a class="" href="#">
                  {
                    submissions?.data.application.application_business_proposal
                      .the_critical_need_for_the_technology
                  }
                </a>
              </div>
            </div>
            <div class="app-link">
              <div class="card-header flex-row">
                <h5>
                  {" "}
                  State the critical needs for the grant and identify areas for
                  intervention
                </h5>
                <a class="" href="#">
                  {
                    submissions?.data.application.application_business_proposal
                      .the_critical_needs_for_the_grant
                  }
                </a>
              </div>
            </div>
            <div class="app-link">
              <div class="card-header flex-row">
                <h5>
                  {" "}
                  Identify value additions that makes your technology/solution
                  stand out in comparison with existing non-clean-tech and
                  clean-tech alternatives to your technology/solution. i.e.
                  innovative business model, cost comparison, technological
                  advantages etc.
                </h5>
                <a class="" href="#">
                  {
                    submissions?.data.application.application_business_proposal
                      .valuable_additions_that_makes_your_technology_stand_out
                  }
                </a>
              </div>
            </div>
            <div class="app-link">
              <div class="card-header flex-row">
                <h5>
                  {" "}
                  Organizational chart providing an overview of personnel/staff
                  involved, in the business in order of hierarchy i.e. CEO, COO,
                  Directors, technical staff etc. Include names, gender, age and
                  pictorial reference.
                </h5>
                <a class="" href="#">
                  {
                    submissions?.data.application.application_business_proposal
                      .survey_doc
                  }
                </a>
              </div>
            </div>
          </div>
        </div>

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
                      <h5>{document.name}</h5>
                      <a class="" href="#">
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