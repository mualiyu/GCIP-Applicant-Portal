import * as React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Alert from "../../../../components/Alert";
import query from "../../../../helpers/query";

export default function BusinessProposal() {
  const [loading, setLoading] = useState(false);
  const [corporateProfile, setCorporateProfile] = useState("");
  const [mediumTermObjectives, setMediumTermObjectives] = useState("");
  const [needForTechnology, setNeedForTechnology] = useState("");
  const [needForGrant, setNeedForGrant] = useState("");
  const [valueAdditions, setValueAdditions] = useState("");
  const [carbonEmissions, setCarbonEmissions] = useState("");
  const programData = useSelector((state) => state);
  const [alertText, setAlert] = useState("");
  const [authority, setAuthority] = useState("");
  const [survey, setSurvey] = useState("");
  const [surveyUpload, setSurveyUpload] = useState("");

  const payload = {
    application_id: localStorage.getItem("AppId"),
    profile: corporateProfile,
    the_critical_needs_for_the_grant: needForGrant,
    valuable_additions_that_makes_your_technology_stand_out: valueAdditions,
    medium_term_objectives: mediumTermObjectives,
    the_critical_need_for_the_technology: needForTechnology,
    carried_out_market_survey: survey,
    acquired_authority_of_the_patent_owner: authority,
    survey_doc: surveyUpload,
    consideration_for_direct_and_indirect_carbon_emissions_in_design:
      carbonEmissions,
  };

  const handleRadioChangeForAuthority = (event) => {
    setAuthority(event.target.value);
  };
  const handleRadioChangeForSurvey = (event) => {
    setSurvey(event.target.value);
  };

  const handleSubmit = async () => {
    console.log("hey");
    setLoading(true);
    const { success, data, error } = await query({
      method: "POST",
      url: "/api/applicant/application/create/business_proposal",
      token: programData.user.user.token,
      bodyData: payload,
    });
    console.log(data);
    if (success) {
      setAlert(`Business Proposal Submitted Successfully`);
      setTimeout(() => {
        setAlert("");
      }, 3000);
      setLoading(false);
      // navigate(
      //   `/Programme/Application/${data.data.application.program_id}/continue`
      // );
    } else {
      setAlert(data.message);
      setTimeout(() => {
        setAlert("");
      }, 3000);
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem("formData"));
    if (savedFormData) {
      setSurvey(savedFormData.survey || "");
      setAuthority(savedFormData.authority || "");
      setNeedForTechnology(savedFormData.needForTechnology || "");
      setNeedForGrant(savedFormData.needForGrant || "");
      setValueAdditions(savedFormData.valueAdditions || "");
      setCarbonEmissions(savedFormData.carbonEmissions || "");
    }
  }, []);

  useEffect(() => {
    const formData = {
      survey,
      authority,
      needForTechnology,
      needForGrant,
      valueAdditions,
      carbonEmissions,
    };
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [
    survey,
    authority,
    needForTechnology,
    needForGrant,
    valueAdditions,
    carbonEmissions,
  ]);

  return (
    <section>
      <Alert text={alertText} style={{ padding: 9 }} />
      <h2 style={{ marginBottom: 30, fontWeight: 900, color: "#1a1989" }}>
        {" "}
        Business Proposal
      </h2>
      <section>
        <section
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "thin dashed #d2d2d2",
          }}>
          <div
            style={{
              width: "100%",
              marginBottom: 40,
            }}
            className="sub-group">
            <div style={{ width: "50%" }}>
              Have you carried out a market survey to verify that the business
              can generate enough profit, such that it would not require a
              continuous subsidy covering operation costs and/or end-user
              consumption costs;
            </div>

            <div style={{ display: "flex" }}>
              <label style={{ marginLeft: 30, marginRight: 20 }}> Yes</label>
              <input
                type="radio"
                id="blue"
                style={{ transform: "scale(1.7)" }}
                name="carried_out_market_survey"
                onChange={handleRadioChangeForSurvey}
                value="Yes"
              />
            </div>
            <div style={{ display: "flex" }}>
              <label style={{ marginLeft: 30, marginRight: 20 }}>No</label>
              <input
                type="radio"
                id="blue"
                style={{ transform: "scale(1.7)" }}
                name="carried_out_market_survey"
                onChange={handleRadioChangeForSurvey}
                value="No"
              />
            </div>
          </div>

          <div
            className="flex"
            style={{ margin: "15px 20px", width: "55%", paddingLeft: 35 }}>
            <div className="form__group__register field col-12 mr-sm">
              <input
                type="file"
                className=""
                onChange={(e) => {
                  const formData = new FormData();
                  const files = e.target.files;
                  const fileSizeLimits = 10 * 1024 * 1024; // 5 MB
                  files?.length && formData.append("file", files[0]);
                  if (files[0].size > fileSizeLimits) {
                    setAlert("File size exceeds the limit (10 MB).");
                    setTimeout(() => {
                      setAlert("");
                    }, 3000);
                    e.target.value = "";
                    return;
                  }
                  setLoading(true);
                  fetch(
                    "https://api.gcip.rea.gov.ng/api/applicant/application/create/business_proposal/upload",

                    {
                      method: "POST",
                      body: formData,
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      setLoading(false);
                      if (data.status) {
                        setAlert("Survey Uploaded Succefully");
                        setRcCert(data.data.url);
                        console.log(data);
                        setTimeout(() => {
                          setAlert("");
                        }, 3000);
                      }
                    });
                }}
              />
              <label className="form__label" style={{ fontSize: 10 }}>
                Upload Market Survey
              </label>
            </div>
          </div>
        </section>

        <section
          style={{
            paddingTop: 25,
            borderBottom: "thin dashed #d2d2d2",
          }}>
          <div
            style={{
              width: "100%",
              marginBottom: 40,
            }}
            className="sub-group">
            <div style={{ width: "30%" }}>
              Have you acquired patency or authority of the patent owners to
              demonstrate the technology
            </div>

            <div style={{ display: "flex" }}>
              <label style={{ marginLeft: 30, marginRight: 20 }}>Yes</label>
              <input
                name="company_type"
                type="radio"
                style={{ transform: "scale(1.7)" }}
                name="acquired_authority_of_the_patent_owners"
                onChange={handleRadioChangeForAuthority}
                value="Yes"
                id="blue"
              />
            </div>
            <div style={{ display: "flex" }}>
              <label style={{ marginLeft: 30, marginRight: 20 }}>No</label>
              <input
                name="company_type"
                type="radio"
                style={{ transform: "scale(1.7)" }}
                name="acquired_authority_of_the_patent_owners"
                onChange={handleRadioChangeForAuthority}
                value="No"
                id="blue"
              />
            </div>
            <div style={{ display: "flex" }}>
              <label style={{ marginLeft: 30, marginRight: 20 }}>
                Evidence of acknowledgement of application for patency
              </label>
              <input
                name="company_type"
                type="radio"
                id="blue"
                style={{ transform: "scale(1.7)" }}
                name="acquired_authority_of_the_patent_owners"
                onChange={handleRadioChangeForAuthority}
                value="Evidence of acknowledgement of application for patency"
              />
            </div>
          </div>
        </section>

        <div style={{ margin: "15px 0" }}>
          <h3
            style={{
              marginBottom: 10,
              backgroundColor: "red",
              color: "white",
              padding: 7,
            }}>
            Explain/demonstrate the critical need for the technology/solution
            (i.e. carbon and Global Warming Potential (GWP) reduction, energy
            efficiency, job creation, rural/urban development etc)
          </h3>
          <Editor
            apiKey="2bibih7gzun78pn5zdau9mp238v6osoplllh9qw1lgb3rzws"
            value={needForTechnology}
            onEditorChange={(content) => setNeedForTechnology(content)}
            init={{
              height: 400,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist  | " +
                "removeformat ",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:12px }",
            }}
          />
        </div>

        <div style={{ margin: "15px 0" }}>
          <h3
            style={{
              marginBottom: 10,
              backgroundColor: "#05084a",
              color: "white",
              padding: 7,
            }}>
            State the critical needs for the grant and identify areas for
            intervention
          </h3>
          <Editor
            apiKey="2bibih7gzun78pn5zdau9mp238v6osoplllh9qw1lgb3rzws"
            value={needForGrant}
            onEditorChange={(content) => setNeedForGrant(content)}
            init={{
              height: 400,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist  | " +
                "removeformat ",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:12px }",
            }}
          />
        </div>

        <div style={{ margin: "15px 0" }}>
          <h3
            style={{
              marginBottom: 10,
              backgroundColor: "#125a08",
              color: "white",
              padding: 7,
            }}>
            Identify value additions that makes your technology/solution stand
            out in comparison with existing non-clean-tech and clean-tech
            alternatives to your technology/solution. i.e. innovative business
            model, cost comparison, technological advantages etc.
          </h3>
          <Editor
            apiKey="2bibih7gzun78pn5zdau9mp238v6osoplllh9qw1lgb3rzws"
            value={valueAdditions}
            onEditorChange={(content) => setValueAdditions(content)}
            init={{
              height: 400,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist  | " +
                "removeformat ",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:12px }",
            }}
          />
        </div>

        <div style={{ margin: "15px 0" }}>
          <h3
            style={{
              marginBottom: 10,
              backgroundColor: "red",
              color: "white",
              padding: 7,
            }}>
            Demonstrate consideration for direct and indirect carbon emissions
            in the design and deployment of your technology/solution, include
            illustrations, diagrammatic and pictorial references as applicable.
          </h3>
          <Editor
            apiKey="2bibih7gzun78pn5zdau9mp238v6osoplllh9qw1lgb3rzws"
            value={carbonEmissions}
            onEditorChange={(content) => setCarbonEmissions(content)}
            init={{
              height: 400,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist  | " +
                "removeformat ",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:12px }",
            }}
          />
        </div>
      </section>
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
        {" "}
        {loading ? "Loading..." : "Save Data"}
      </button>
    </section>
  );
}
