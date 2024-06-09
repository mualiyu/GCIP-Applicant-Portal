import * as React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../components/Loading";
import Alert from "../../../../components/Alert";
import query from "../../../../helpers/query";

export default function BusinessProposal() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const programData = useSelector((state) => state);
  const [alertText, setAlert] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [businessProposalData, setBusinessProposalData] = useState(null);

  const [formValues, setFormValues] = useState({
    needForTechnology: "",
    needForGrant: "",
    valueAdditions: "",
    carbonEmissions: "",
    authority: "",
    survey: "",
    surveyUpload: "",
  });

  useEffect(() => {
    if (businessProposalData) {
      setFormValues({
        needForTechnology:
          businessProposalData?.the_critical_need_for_the_technology || "",
        needForGrant:
          businessProposalData?.the_critical_needs_for_the_grant || "",
        valueAdditions:
          businessProposalData?.valuable_additions_that_makes_your_technology_stand_out ||
          "",
        carbonEmissions:
          businessProposalData?.consideration_for_direct_and_indirect_carbon_emissions_in_design ||
          "",
        authority:
          businessProposalData?.acquired_authority_of_the_patent_owners || "",
        survey: businessProposalData?.carried_out_market_survey || "",
        surveyUpload: businessProposalData?.survey_doc || "",
      });
    }
  }, [businessProposalData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleEditorChange = (name, content) => {
    setFormValues({
      ...formValues,
      [name]: content,
    });
    localStorage.setItem(name, content);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = hasSubmitted
      ? `/api/applicant/application/update/business_proposal/${businessProposalData?.id}`
      : "/api/applicant/application/create/business_proposal";

    const payload = {
      application_id: programData?.applicant?.application?.id,
      the_critical_needs_for_the_grant: formValues.needForGrant,
      valuable_additions_that_makes_your_technology_stand_out:
        formValues.valueAdditions,
      the_critical_need_for_the_technology: formValues.needForTechnology,
      carried_out_market_survey: formValues.survey,
      acquired_authority_of_the_patent_owners: formValues.authority,
      survey_doc: formValues.surveyUpload,
      consideration_for_direct_and_indirect_carbon_emissions_in_design:
        formValues.carbonEmissions,
    };

    setLoading(true);
    const { success, data, error } = await query({
      method: "POST",
      url: endpoint,
      token: programData.user.user.token,
      bodyData: payload,
    });
    if (success) {
      setAlert(
        `Business Proposal ${
          hasSubmitted ? "Updated" : "Submitted"
        } Successfully`
      );
      fetchSubmissionStatus();
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

  const handleFileChange = (e) => {
    const formData = new FormData();
    const files = e.target.files;
    const fileSizeLimits = 10 * 1024 * 1024; // 10 MB
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
        headers: {
          Authorization: "Bearer " + programData.user.user.token,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.status) {
          setAlert("Survey Uploaded Successfully");
          setFormValues({ ...formValues, surveyUpload: data.data.url });
          setTimeout(() => {
            setAlert("");
          }, 3000);
        }
      });
  };

  const fetchSubmissionStatus = async () => {
    setLoading(true);
    const { success, data, error } = await query({
      method: "GET",
      url: `/api/applicant/application/get?program_id=${programData.program.id}`,
      token: programData.user.user.token,
    });

    if (success) {
      setLoading(false);
      if (data?.data.application?.application_business_proposal != null) {
        setBusinessProposalData(
          data.data.application.application_business_proposal
        );
        setHasSubmitted(true);
      }
    } else {
      setAlert("Failed to fetch submission status.");
      setTimeout(() => {
        setAlert("");
      }, 3000);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissionStatus();
  }, [programData.user.user.token]);

  return (
    <section>
      {loading && <Loading loading={loading} />}
      <Alert text={alertText} style={{ padding: 9 }} />
      <h2 style={{ marginBottom: 30, fontWeight: 900, color: "#1a1989" }}>
        Business Proposal
      </h2>
      <section>
        <form onSubmit={handleSubmit}>
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
                display: "flex",
              }}
              className="sub-group">
              <div style={{ width: "50%" }}>
                <label>
                  Have you carried out a market survey to verify that the
                  business can generate enough profit, such that it would not
                  require a continuous subsidy covering operation costs and/or
                  end-user consumption costs;
                </label>
              </div>
              <div>
                <label style={{ marginLeft: 30, marginRight: 20 }}> Yes</label>
                <input
                  type="radio"
                  style={{ transform: "scale(1.7)" }}
                  name="survey"
                  value="Yes"
                  checked={formValues.survey === "Yes"}
                  onChange={handleInputChange}
                  id="blue"
                />
              </div>
              <div>
                <label style={{ marginLeft: 30, marginRight: 20 }}>No</label>
                <input
                  type="radio"
                  name="survey"
                  value="No"
                  style={{ transform: "scale(1.7)" }}
                  checked={formValues.survey === "No"}
                  onChange={handleInputChange}
                  id="blue"
                />
              </div>
            </div>
            {formValues.survey === "Yes" && (
              <div
                className="flex"
                style={{ margin: "15px 20px", width: "55%", paddingLeft: 35 }}>
                <div className="form__group__register field col-12 mr-sm">
                  <input
                    type="file"
                    className=""
                    onChange={handleFileChange}
                    name="surveyUpload"
                    id="surveyUpload"
                  />
                  <label className="form__label" style={{ fontSize: 10 }}>
                    Upload Market Survey{" "}
                    <span style={{ color: "red" }}>
                      (
                      {businessProposalData?.surveyUpload !== null
                        ? "Uploaded"
                        : "Not Uploaded yet"}
                      )
                    </span>
                  </label>
                </div>
              </div>
            )}
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
                display: "flex",
              }}
              className="sub-group">
              <div style={{ width: "30%" }}>
                <label>
                  Have you acquired patency or authority of the patent owners to
                  demonstrate the technology
                </label>
              </div>
              <div>
                <label style={{ marginLeft: 30, marginRight: 20 }}>Yes</label>
                <input
                  type="radio"
                  name="authority"
                  style={{ transform: "scale(1.7)" }}
                  value="Yes"
                  checked={formValues.authority === "Yes"}
                  onChange={handleInputChange}
                  id="blue"
                />
              </div>
              <div>
                <label style={{ marginLeft: 30, marginRight: 20 }}>No</label>
                <input
                  type="radio"
                  name="authority"
                  style={{ transform: "scale(1.7)" }}
                  value="No"
                  checked={formValues.authority === "No"}
                  onChange={handleInputChange}
                  id="blue"
                />
              </div>
              <div>
                <label style={{ marginLeft: 30, marginRight: 20 }}>
                  Evidence of acknowledgement of application for patency
                </label>
                <input
                  type="radio"
                  name="authority"
                  style={{ transform: "scale(1.7)" }}
                  value="Evidence of acknowledgement of application for patency"
                  checked={
                    formValues.authority ===
                    "Evidence of acknowledgement of application for patency"
                  }
                  onChange={handleInputChange}
                  id="blue"
                />
              </div>
            </div>
          </section>

          <div style={{ margin: "15px 0" }}>
            <div style={{ display: "flex", alignItem: "baseline" }}>
              <div className="qa"> ? </div>
              <h3>
                Explain/demonstrate the critical need for the
                technology/solution (i.e. carbon and Global Warming Potential
                (GWP) reduction, energy efficiency, job creation, rural/urban
                development etc)
              </h3>
            </div>

            <Editor
              apiKey="ncwvs8ckf35ly4exvpf0sxhmf5rfst7uz0cu9xlrzguqryio"
              value={formValues.needForTechnology}
              onEditorChange={(content) =>
                handleEditorChange("needForTechnology", content)
              }
              init={{
                height: 400,
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
              }}
            />
          </div>

          <div style={{ margin: "15px 0" }}>
            <div style={{ display: "flex", alignItem: "baseline" }}>
              <div className="qa"> ? </div>
              <h3>
                State the critical needs for the grant and identify areas for
                intervention
              </h3>
            </div>

            <Editor
              apiKey="ncwvs8ckf35ly4exvpf0sxhmf5rfst7uz0cu9xlrzguqryio"
              value={formValues.needForGrant}
              onEditorChange={(content) =>
                handleEditorChange("needForGrant", content)
              }
              init={{
                height: 400,
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
              }}
            />
          </div>

          <div style={{ margin: "15px 0" }}>
            <div style={{ display: "flex", alignItem: "baseline" }}>
              <div className="qa"> ? </div>
              <h3>
                Identify value additions that makes your technology/solution
                stand out in comparison with existing non-clean-tech and
                clean-tech alternatives to your technology/solution. i.e.
                innovative business model, cost comparison, technological
                advantages etc.
              </h3>
            </div>

            <Editor
              apiKey="ncwvs8ckf35ly4exvpf0sxhmf5rfst7uz0cu9xlrzguqryio"
              value={formValues.valueAdditions}
              onEditorChange={(content) =>
                handleEditorChange("valueAdditions", content)
              }
              init={{
                height: 400,
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
              }}
            />
          </div>

          <div style={{ margin: "15px 0" }}>
            <div style={{ display: "flex", alignItem: "baseline" }}>
              <div className="qa"> ? </div>
              <h3>
                Demonstrate consideration for direct and indirect carbon
                emissions in the design and deployment of your
                technology/solution, include illustrations, diagrammatic and
                pictorial references as applicable.
              </h3>
            </div>

            <Editor
              apiKey="ncwvs8ckf35ly4exvpf0sxhmf5rfst7uz0cu9xlrzguqryio"
              value={formValues.carbonEmissions}
              onEditorChange={(content) =>
                handleEditorChange("carbonEmissions", content)
              }
              init={{
                height: 400,
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
              }}
            />
          </div>

          <button
            type="submit"
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
            {loading ? "Loading..." : hasSubmitted ? "Update" : "Save Data"}
          </button>
        </form>
      </section>
    </section>
  );
}
