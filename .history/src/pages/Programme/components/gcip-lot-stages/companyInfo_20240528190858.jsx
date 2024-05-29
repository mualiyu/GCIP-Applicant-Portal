import * as React from "react";
import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import Loading from "../../../../components/Loading";
import Alert from "../../../../components/Alert";
import query from "../../../../helpers/query";

export default function CompanyInfo() {
  const [loading, setLoading] = useState(false);
  const [alertText, setAlert] = useState("");
  const [companyInfoId, setCompanyInfoId] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const dispatch = useDispatch();
  const programData = useSelector((state) => state);

  useEffect(() => {
    // Fetch submission status when component mounts
    console.log(programData.program.id);
    const fetchSubmissionStatus = async () => {
      setLoading(true);
      const { success, data, error } = await query({
        method: "GET",
        url: `/api/applicant/application/get?program_id=${programData.program.id}`,
        token: programData.user.user.token,
      });

      if (success) {
        console.log(data);
        if (data?.data?.application?.application_company_info != null) {
          setHasSubmitted(true);
        }
      } else {
        setAlert("Failed to fetch submission status.");
        setTimeout(() => {
          setAlert("");
        }, 3000);
      }
      setLoading(false);
    };

    fetchSubmissionStatus();
  }, [programData.user.user.token]);

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
      const endpoint = hasSubmitted
        ? `/api/applicant/application/update/company_info/${companyInfoId}`
        : "/api/applicant/application/create/company_info";

      Object.keys(values).forEach((key) => {
        localStorage.setItem(key, values[key]);
      });

      const payload = {
        application_id: localStorage.getItem("appId"),
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
        setCompanyInfoId(data?.data?.application?.application_company_info?.id);
        setAlert(
          `Company Information ${
            hasSubmitted ? "Updated" : "Submitted"
          } Successfully`
        );
        localStorage.setItem(
          "companyInfoId",
          data?.data?.application_business_proposal?.id
        );
        setHasSubmitted(true);
      } else {
        setAlert(data.message);
      }

      setTimeout(() => {
        setAlert("");
      }, 3000);
      setLoading(false);
    },
  });

  const handleFileChange = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    const fileSizeLimits = 10 * 1024 * 1024; // 10 MB

    if (file.size > fileSizeLimits) {
      setAlert("File size exceeds the limit (10 MB).");
      setTimeout(() => {
        setAlert("");
      }, 3000);
      e.target.value = "";
      return;
    }

    formData.append("file", file);
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.gcip.rea.gov.ng/api/applicant/application/create/company_info/upload",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + programData.user.user.token,
          },
        }
      );
      const data = await response.json();
      if (data.status) {
        setAlert("Chart Uploaded Successfully");
        formik.setFieldValue("organizationalChart", data.data.url);
      } else {
        setAlert("Failed to upload chart");
      }
    } catch (error) {
      setAlert("An error occurred while uploading the chart");
    }
    setTimeout(() => {
      setAlert("");
    }, 3000);
    setLoading(false);
  };

  const handleEditorChange = (field, content) => {
    formik.setFieldValue(field, content);
    localStorage.setItem(field, content);
  };

  return (
    <section>
      {loading && <Loading loading={loading} />}
      <Alert text={alertText} style={{ padding: 9 }} />
      <h2 style={{ marginBottom: 30, fontWeight: 900, color: "#1a1989" }}>
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
                value={formik.values.numberOfStaff}
                onChange={formik.handleChange}
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
                  onChange={handleFileChange}
                  name="organizationalChart"
                  id="organizationalChart"
                />
                <label
                  className="form__label"
                  style={{ top: "-40px", fontSize: 10 }}>
                  Upload a properly labeled organizational chart providing an
                  overview of personnel/staff involved, in the business in order
                  of hierarchy i.e. CEO, COO, Directors, technical staff etc.
                  Include names, gender, age and pictorial reference.{" "}
                  <span style={{ color: "red" }}>
                    {" "}
                    {localStorage.getItem("organizationalChart") !== null
                      ? "Uploaded"
                      : "Not Uploaded yet"}{" "}
                  </span>
                </label>
              </div>
            </div>
          </section>
          {renderEditor(
            "Describe your company’s corporate profile showing your operational and service areas",
            "corporateProfile",
            "#1a1989"
          )}
          {renderEditor(
            "Provide a description of the product/solution that you offer (include product specification and product certification details)",
            "productDescription",
            "#08115a"
          )}
          {renderEditor(
            "Short term objectives for current year (include bullet points as applicable)",
            "shortTermObjectives",
            "#125a08"
          )}
          {renderEditor(
            "Medium term objectives (next 1-2 years)",
            "mediumTermObjectives",
            "#ff0000"
          )}
          {renderEditor(
            "Long Term Objectives (3 years and beyond)",
            "longTermObjectives",
            "#4099ff"
          )}
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
            {formik.isSubmitting
              ? "Loading..."
              : hasSubmitted
              ? "Update"
              : "Save Data"}
          </button>
        </form>
      </section>
    </section>
  );

  function renderEditor(title, field, color) {
    return (
      <div style={{ margin: "15px 0" }}>
        <h3
          style={{
            marginBottom: 10,
            backgroundColor: color,
            color: "white",
            padding: 7,
          }}>
          {title}
        </h3>
        <Editor
          apiKey="your-tinymce-api-key"
          value={formik.values[field]}
          onEditorChange={(content) => handleEditorChange(field, content)}
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
    );
  }
}
