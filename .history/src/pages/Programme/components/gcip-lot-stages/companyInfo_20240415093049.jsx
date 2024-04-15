import * as React from "react";
import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import Alert from "../../../../components/Alert";
import query from "../../../../helpers/query";

export default function CompanyInfo() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // const programData = useSelector((state) => state);

  const formik = useFormik({
    initialValues: {
      corporateProfile: localStorage.getItem("corporateProfile") || "",
      mediumTermObjectives: localStorage.getItem("mediumTermObjectives") || "",
      longTermObjectives: localStorage.getItem("longTermObjectives") || "",
      shortTermObjectives: localStorage.getItem("shortTermObjectives") || "",
      organizationalChart: localStorage.getItem("organizationalChart") || "",
      productDescription: localStorage.getItem("productDescription") || "",
      numberOfStaff: localStorage.getItem("numberOfStaff") || "",
    },

    enableReinitialize: true,
    onSubmit: async (values) => {
      const endpoint = hasBeenSubmitted()
        ? "/api/applicant/application/update/company_info/1"
        : "/api/applicant/application/create/company_info";

      Object.keys(values).forEach((key) => {
        localStorage.setItem(key, values[key]);
      });
      const payload = {
        application_id: localStorage.getItem("AppId"),
        profile: values.corporateProfile,
        description_of_products: values.productDescription,
        short_term_objectives: values.shortTermObjectives,
        medium_term_objectives: values.mediumTermObjectives,
        long_term_objectives: values.longTermObjectives,
        number_of_staff: values.numberOfStaff,
        organizational_chart: values.organizationalChart,
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
            hasBeenSubmitted() ? "Updated" : "Submitted"
          } Successfully`
        );
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

  // const handleRadioChangeForAuthority = (event) => {
  //   formik.setFieldValue("authority", event.target.value);
  // };

  // const handleRadioChangeForSurvey = (event) => {
  //   formik.setFieldValue("survey", event.target.value);
  // };

  const handleEditorChange = (field, content) => {
    formik.setFieldValue(field, content);
    localStorage.setItem(field, content);
  };

  const hasBeenSubmitted = () => {
    // Logic to check if form has been submitted before
    // You can use any method to determine this, for example checking if a specific field has a value
    return localStorage.getItem("survey") !== null;
  };

  return (
    <section>
      <Alert text={formik.status} style={{ padding: 9 }} />
      <h2 style={{ marginBottom: 30, fontWeight: 900, color: "#1a1989" }}>
        {" "}
        Company Information
      </h2>
      <section>
        <form onSubmit={formik.handleSubmit}>
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
            {/* </section> */}
            <div style={{ margin: "15px 0" }}>
              <h3
                style={{
                  marginBottom: 10,
                  backgroundColor: "red",
                  color: "white",
                  padding: 7,
                }}>
                Describe your company’s corporate profile showing your
                operational and service areas
              </h3>

              <Editor
                apiKey="2bibih7gzun78pn5zdau9mp238v6osoplllh9qw1lgb3rzws"
                value={formik.values.corporateProfile}
                onEditorChange={(content) =>
                  handleEditorChange("corporateProfile", content)
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
                  backgroundColor: "#08115a",
                  color: "white",
                  padding: 7,
                }}>
                Provide a description of the product/solution that you offer
                (include product specification and product certification
                details)
              </h3>
              <Editor
                apiKey="2bibih7gzun78pn5zdau9mp238v6osoplllh9qw1lgb3rzws"
                value={formik.values.productDescription}
                onEditorChange={(content) =>
                  handleEditorChange("productDescription", content)
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
                Short term objectives for current year (include bullet points as
                applicable)
              </h3>
              <Editor
                apiKey="2bibih7gzun78pn5zdau9mp238v6osoplllh9qw1lgb3rzws"
                value={formik.values.shortTermObjectives}
                onEditorChange={(content) =>
                  handleEditorChange("shortTermObjectives", content)
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
                Medium term objectives (next 1-2 years)
              </h3>
              <Editor
                apiKey="2bibih7gzun78pn5zdau9mp238v6osoplllh9qw1lgb3rzws"
                value={formik.values.mediumTermObjectives}
                onEditorChange={(content) =>
                  handleEditorChange("mediumTermObjectives", content)
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
                  backgroundColor: "#4099ff",
                  color: "white",
                  padding: 7,
                }}>
                Long Term Objectives (3 years and beyond)
              </h3>
              <Editor
                apiKey="2bibih7gzun78pn5zdau9mp238v6osoplllh9qw1lgb3rzws"
                value={formik.values.longTermObjectives}
                onEditorChange={(content) =>
                  handleEditorChange("longTermObjectives", content)
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
          </section>

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
        </form>
      </section>
    </section>
  );
}
