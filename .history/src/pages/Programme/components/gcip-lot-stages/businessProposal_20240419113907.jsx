import * as React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../components/Loading";
import { useFormik } from "formik";
import Alert from "../../../../components/Alert";
import query from "../../../../helpers/query";

export default function BusinessProposal() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const programData = useSelector((state) => state);
  const [alertText, setAlert] = useState("");
  const [proposalId, setProposalId] = useState(null);

  const formik = useFormik({
    initialValues: {
      needForTechnology: localStorage.getItem("needForTechnology") || "",
      needForGrant: localStorage.getItem("needForGrant") || "",
      valueAdditions: localStorage.getItem("valueAdditions") || "",
      carbonEmissions: localStorage.getItem("carbonEmissions") || "",
      authority: localStorage.getItem("authority") || "",
      survey: localStorage.getItem("survey") || "",
      surveyUpload: localStorage.getItem("surveyUpload") || "",
    },

    enableReinitialize: true,
    onSubmit: async (values) => {
      const endpoint = proposalId
        ? "/api/applicant/application/update/business_proposal/1"
        : "/api/applicant/application/create/business_proposal";

      Object.keys(values).forEach((key) => {
        localStorage.setItem(key, values[key]);
      });
      const payload = {
        application_id: localStorage.getItem("AppId"),
        the_critical_needs_for_the_grant: values.needForGrant,
        valuable_additions_that_makes_your_technology_stand_out:
          values.valueAdditions,
        the_critical_need_for_the_technology: values.needForTechnology,
        carried_out_market_survey: values.survey,
        acquired_authority_of_the_patent_owner: values.authority,

        survey_doc: values.surveyUpload,
        consideration_for_direct_and_indirect_carbon_emissions_in_design:
          values.carbonEmissions,
      };

      setLoading(true);
      const { success, data, error } = await query({
        method: "POST",
        url: endpoint,
        token: programData.user.user.token,
        bodyData: payload,
      });
      console.log(data);
      if (success) {
        setAlert(
          `Business Proposal ${
            hasBeenSubmitted() ? "Updated" : "Submitted"
          } Successfully`
        );
        setProposalId(data?.data?.application_business_proposal?.id);
        setTimeout(() => {
          setAlert("");
        }, 3000);
        setLoading(false);
      } else {
        setAlert("Oops! Something went wrong");
        setTimeout(() => {
          setAlert("");
        }, 3000);
        setLoading(false);
      }
    },
  });

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
        console.log(data);
        if (data.status) {
          setAlert("Survey Uploaded Successfully");
          formik.setFieldValue("surveyUpload", data.data.url);
          setTimeout(() => {
            setAlert("");
          }, 3000);
        }
      });
  };

  const handleRadioChangeForAuthority = (event) => {
    formik.setFieldValue("authority", event.target.value);
  };

  const handleRadioChangeForSurvey = (event) => {
    formik.setFieldValue("survey", event.target.value);
  };

  const handleEditorChange = (field, content) => {
    formik.setFieldValue(field, content);
    localStorage.setItem(field, content);
  };

  const hasBeenSubmitted = () => {
    // Logic to check if form has been submitted before
    // set the id of business proposal and save to localstorage
    // if the BusinessProposal has a proposalId, then return true otherwise false
    return proposalId;
    // return localStorage.getItem("survey") !== null;
  };

  // useEffect(()=>{

  // }, [])
  return (
    <section>
      {loading && <Loading loading={loading} />}
      <Alert text={alertText} style={{ padding: 9 }} />
      <h2 style={{ marginBottom: 30, fontWeight: 900, color: "#1a1989" }}>
        {" "}
        Business Proposal
      </h2>
      <section>
        <form onSubmit={formik.handleSubmit}>
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
                <label>
                  Have you carried out a market survey to verify that the
                  business can generate enough profit, such that it would not
                  require a continuous subsidy covering operation costs and/or
                  end-user consumption costs;
                </label>
              </div>

              <div style={{ display: "flex" }}>
                <label style={{ marginLeft: 30, marginRight: 20 }}> Yes</label>
                <input
                  type="radio"
                  style={{ transform: "scale(1.7)" }}
                  id="blue"
                  name="survey"
                  value="Yes"
                  checked={formik.values.survey === "Yes"}
                  onChange={handleRadioChangeForSurvey}
                />
              </div>
              <div style={{ display: "flex" }}>
                <label style={{ marginLeft: 30, marginRight: 20 }}>No</label>
                <input
                  type="radio"
                  name="survey"
                  value="No"
                  style={{ transform: "scale(1.7)" }}
                  id="blue"
                  checked={formik.values.survey === "No"}
                  onChange={handleRadioChangeForSurvey}
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
                  onChange={handleFileChange}
                  name="surveyUpload"
                  id="surveyUpload"
                />
                <label className="form__label" style={{ fontSize: 10 }}>
                  Upload Market Survey{" "}
                  <span style={{ color: "red" }}>
                    (
                    {localStorage.getItem("survey") !== null
                      ? "Uploaded"
                      : "Not Uploaded yet"}
                    )
                  </span>
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
                <label>
                  Have you acquired patency or authority of the patent owners to
                  demonstrate the technology
                </label>
              </div>

              <div style={{ display: "flex" }}>
                <label style={{ marginLeft: 30, marginRight: 20 }}>Yes</label>
                <input
                  type="radio"
                  name="authority"
                  style={{ transform: "scale(1.7)" }}
                  id="blue"
                  value="Yes"
                  checked={formik.values.authority === "Yes"}
                  onChange={handleRadioChangeForAuthority}
                />
              </div>
              <div style={{ display: "flex" }}>
                <label style={{ marginLeft: 30, marginRight: 20 }}>No</label>
                <input
                  type="radio"
                  name="authority"
                  style={{ transform: "scale(1.7)" }}
                  id="blue"
                  value="No"
                  checked={formik.values.authority === "No"}
                  onChange={handleRadioChangeForAuthority}
                />
              </div>
              <div style={{ display: "flex" }}>
                <label style={{ marginLeft: 30, marginRight: 20 }}>
                  Evidence of acknowledgement of application for patency
                </label>
                <input
                  type="radio"
                  name="authority"
                  style={{ transform: "scale(1.7)" }}
                  id="blue"
                  value="Evidence of acknowledgement of application for patency"
                  checked={
                    formik.values.authority ===
                    "Evidence of acknowledgement of application for patency"
                  }
                  onChange={handleRadioChangeForAuthority}
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
              <label>
                Explain/demonstrate the critical need for the
                technology/solution (i.e. carbon and Global Warming Potential
                (GWP) reduction, energy efficiency, job creation, rural/urban
                development etc)
              </label>
            </h3>

            <Editor
              apiKey="7tnvo6drg2ein84gaf54fjos9hwgm7yoyiatqt8dxu8ai5l0"
              value={formik.values.needForTechnology}
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
              apiKey="7tnvo6drg2ein84gaf54fjos9hwgm7yoyiatqt8dxu8ai5l0"
              value={formik.values.needForGrant}
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
              apiKey="7tnvo6drg2ein84gaf54fjos9hwgm7yoyiatqt8dxu8ai5l0"
              value={formik.values.valueAdditions}
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
            <h3
              style={{
                marginBottom: 10,
                backgroundColor: "red",
                color: "white",
                padding: 7,
              }}>
              Demonstrate consideration for direct and indirect carbon emissions
              in the design and deployment of your technology/solution, include
              illustrations, diagrammatic and pictorial references as
              applicable.
            </h3>

            <Editor
              apiKey="7tnvo6drg2ein84gaf54fjos9hwgm7yoyiatqt8dxu8ai5l0"
              value={formik.values.carbonEmissions}
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
          {/* </section> */}
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
            }}>
            {" "}
            {formik.isSubmitting
              ? "Loading..."
              : hasBeenSubmitted()
              ? "Update"
              : "Save Data"}
          </button>
          {/* </section> */}
        </form>
      </section>
    </section>
  );
}
