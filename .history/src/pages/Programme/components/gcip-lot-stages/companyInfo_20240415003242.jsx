import * as React from "react";
import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../../../components/Alert";
import query from "../../../../helpers/query";

export default function CompanyInfo() {
  const [loading, setLoading] = useState(false);
  const [corporateProfile, setCorporateProfile] = useState("");
  const [mediumTermObjectives, setMediumTermObjectives] = useState("");
  const [longTermObjectives, setLongTermObjectives] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [shortTermObjectives, setShortTermObjectives] = useState("");
  const [organizationalChart, setOrganizationalChart] = useState("");
  const [numberOfStaff, setNumberOfStaff] = useState("");
  const programData = useSelector((state) => state);
  const [alertText, setAlert] = useState("");
  const [editorContent, setEditorContent] = useState(
    localStorage.getItem("editorContent") || ""
  );

  useEffect(() => {
    console.log(localStorage.getItem("AppId"));
    // localStorage.getItem("AppId")
  }, []);

  const payload = {
    application_id: localStorage.getItem("AppId"),
    profile: document.getElementById("corporateProfile").value,
    description_of_products:
      document.getElementById("productDescription").value,
    short_term_objectives: document.getElementById("shortTermObjectives").value,
    medium_term_objectives: document.getElementById("mediumTermObjectives")
      .value,
    long_term_objectives: document.getElementById("longTermObjectives").value,
    number_of_staff: document.getElementById("numberOfStaff").value,
    organizational_chart: document.getElementById("organizationalChart").value,
  };

  const handleSubmit = async () => {
    console.log("hey");
    setLoading(true);
    const { success, data, error } = await query({
      method: "POST",
      url: "/api/applicant/application/create/company_info",
      token: programData.user.user.token,
      bodyData: payload,
    });
    console.log(data);
    if (success) {
      setAlert(`Company Info Submitted Successfully`);
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

  return (
    <section>
      <Alert text={alertText} style={{ padding: 9 }} />
      <h2 style={{ marginBottom: 30, fontWeight: 900, color: "#1a1989" }}>
        {" "}
        Company Information
      </h2>
      <section>
        <section style={{ display: "flex" }}>
          <div
            className="form__group__register field col-8 mr-sm"
            style={{ margin: "15px 0", width: "45%", fontSize: 10 }}>
            <input
              type="number"
              className="form__field"
              value={numberOfStaff}
              onChange={(e) => {
                setNumberOfStaff(e.target.value);
              }}
              placeholder=""
              name="numberOfStaff"
              id="numberOfStaff"
              required
            />
            <label className="form__label">
              Number of Staff currently employed by your company
            </label>
          </div>

          <div className="flex" style={{ margin: "15px 20px", width: "55%" }}>
            <div className="form__group__register field col-12 mr-sm">
              <input
                type="file"
                className=""
                onChange={(e) => {
                  const formData = new FormData();
                  const files = e.target.files;
                  const fileSizeLimits = 10 * 1024 * 1024; // 10 MB
                  files?.length && formData.append("file", files[0]);
                  console.log(files);
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
                    "https://api.gcip.rea.gov.ng/api/applicant/application/create/company_info/upload",

                    {
                      method: "POST",
                      body: formData,
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      setLoading(false);
                      console.og(data);
                      if (data.status) {
                        setAlert("Chart Uploaded Succefully");
                        setOrganizationalChart(data.data.url);
                        console.log(data);
                        setTimeout(() => {
                          setAlert("");
                        }, 3000);
                      }
                    });
                }}
              />
              <label
                className="form__label"
                style={{ top: "-40px", fontSize: 10 }}>
                Upload a properly labeled organizational chart providing an
                overview of personnel/staff involved, in the business in order
                of hierarchy i.e. CEO, COO, Directors, technical staff etc.
                Include names, gender, age and pictorial reference.
              </label>
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
            Describe your company’s corporate profile showing your operational
            and service areas
          </h3>
          <Editor
            apiKey="2bibih7gzun78pn5zdau9mp238v6osoplllh9qw1lgb3rzws"
            value={corporateProfile}
            onEditorChange={(content) => setCorporateProfile(content)}
            id="corporateProfile"
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
              backgroundColor: "#08115a",
              color: "white",
              padding: 7,
            }}>
            Provide a description of the product/solution that you offer
            (include product specification and product certification details)
          </h3>
          <Editor
            apiKey="2bibih7gzun78pn5zdau9mp238v6osoplllh9qw1lgb3rzws"
            value={productDescription}
            onEditorChange={(content) => setProductDescription(content)}
            id="productDescription"
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
            Short term objectives for current year (include bullet points as
            applicable)
          </h3>
          <Editor
            apiKey="2bibih7gzun78pn5zdau9mp238v6osoplllh9qw1lgb3rzws"
            value={shortTermObjectives}
            id="shortTermObjectives"
            onEditorChange={(content) => setShortTermObjectives(content)}
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
            Medium term objectives (next 1-2 years)
          </h3>
          <Editor
            apiKey="2bibih7gzun78pn5zdau9mp238v6osoplllh9qw1lgb3rzws"
            value={mediumTermObjectives}
            id="mediumTermObjectives"
            onEditorChange={(content) => setMediumTermObjectives(content)}
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
              backgroundColor: "#4099ff",
              color: "white",
              padding: 7,
            }}>
            Long Term Objectives (3 years and beyond)
          </h3>
          <Editor
            apiKey="2bibih7gzun78pn5zdau9mp238v6osoplllh9qw1lgb3rzws"
            value={longTermObjectives}
            id="longTermObjectives"
            onEditorChange={(content) => setLongTermObjectives(content)}
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
