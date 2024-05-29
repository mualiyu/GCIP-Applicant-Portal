import * as React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../components/Loading";
import { useFormik } from "formik";
import Alert from "../../../../components/Alert";
import query from "../../../../helpers/query";

export default function CompanyInformation() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const programData = useSelector((state) => state.program);
  const userToken = useSelector((state) => state.user.user.token);
  const [alertText, setAlertText] = useState("");
  const [companyData, setCompanyData] = useState({});

  const formik = useFormik({
    initialValues: {
      numberOfStaff: companyData.numberOfStaff || "",
      organizationalChart: companyData.organizationalChart || "",
      corporateProfile: companyData.corporateProfile || "",
      productDescription: companyData.productDescription || "",
      shortTermObjectives: companyData.shortTermObjectives || "",
      mediumTermObjectives: companyData.mediumTermObjectives || "",
      longTermObjectives: companyData.longTermObjectives || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const endpoint = hasSubmitted()
        ? `/api/applicant/application/update/company_information/${companyData?.id}`
        : "/api/applicant/application/create/company_information";

      const payload = {
        application_id: programData.appId,
        number_of_staff: values.numberOfStaff,
        organizational_chart: values.organizationalChart,
        corporate_profile: values.corporateProfile,
        product_description: values.productDescription,
        short_term_objectives: values.shortTermObjectives,
        medium_term_objectives: values.mediumTermObjectives,
        long_term_objectives: values.longTermObjectives,
      };

      setLoading(true);
      const { success, data, error } = await query({
        method: "POST",
        url: endpoint,
        token: userToken,
        bodyData: payload,
      });

      if (success) {
        setAlertText(
          `Company Information ${
            hasSubmitted() ? "Updated" : "Submitted"
          } Successfully`
        );
        setTimeout(() => setAlertText(""), 3000);
      } else {
        setAlertText(data.message);
        setTimeout(() => setAlertText(""), 3000);
      }
      setLoading(false);
    },
  });

  const handleFileChange = (e) => {
    // Handle file input change
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue(e.target.name, file);
    }
  };

  const handleEditorChange = (field, content) => {
    formik.setFieldValue(field, content);
  };

  const hasSubmitted = () => companyData.id !== undefined;

  useEffect(() => {
    const fetchCompanyData = async () => {
      setLoading(true);
      const { success, data } = await query({
        method: "GET",
        url: `/api/applicant/application/get?program_id=${programData.program.id}`,
        token: userToken,
      });

      if (success) {
        setCompanyData(data.data.application.application_company_information);
      } else {
        setAlertText("Failed to fetch company data.");
        setTimeout(() => setAlertText(""), 3000);
      }
      setLoading(false);
    };

    fetchCompanyData();
  }, [userToken, programData.program.id]);

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
                    {companyData.organizationalChart
                      ? "Uploaded"
                      : "Not Uploaded yet"}
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
