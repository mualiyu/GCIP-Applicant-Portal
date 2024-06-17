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
  const dispatch = useDispatch();
  const [alertText, setAlert] = useState("");
  const programData = useSelector((state) => state);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [companyInfoData, setCompanyInfoData] = useState(null);

  const formik = useFormik({
    initialValues: {
      corporateProfile: companyInfoData?.corporate_profile || "",
      mediumTermObjectives: companyInfoData?.medium_term_objectives || "",
      longTermObjectives: companyInfoData?.long_term_objectives || "",
      shortTermObjectives: companyInfoData?.short_term_objectives || "",
      organizationalChart: companyInfoData?.organizational_chart || "",
      productDescription: companyInfoData?.description_of_products || "",
      numberOfStaff: companyInfoData?.number_of_staff || "",
    },

    enableReinitialize: true,
    onSubmit: async (values) => {
      const endpoint = hasSubmitted
        ? `/api/applicant/application/update/company_info/${companyInfoData.id}`
        : "/api/applicant/application/create/company_info";

      // Object.keys(values).forEach((key) => {
      //   localStorage.setItem(key, values[key]);
      // });
      const payload = {
        application_id: programData?.applicant?.application?.id,
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
        console.log(data);
        setAlert(
          `Company Infomration ${
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
      "https://api.gcip.rea.gov.ng/api/applicant/application/create/company_info/upload",
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
          setAlert("Chart Uploaded Successfully");
          formik.setFieldValue("organizationalChart", data.data.url);
          setTimeout(() => {
            setAlert("");
          }, 3000);
        }
      });
  };

  const handleNumberOfStaff = (event) => {
    formik.setFieldValue("numberOfStaff", event.target.value);
  };

  const handleEditorChange = (field, content) => {
    formik.setFieldValue(field, content);
    localStorage.setItem(field, content);
  };

  const fetchSubmissionStatus = async () => {
    setLoading(true);
    const { success, data, error } = await query({
      method: "GET",
      url: `/api/applicant/application/get?program_id=${programData.program.id}`,
      token: programData.user.user.token,
    });

    if (success) {
      console.log(data);
      setCompanyInfoData(data.data.application.application_company_info);
      setLoading(false);
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

  useEffect(() => {
    console.log(programData?.applicant?.application?.id);
    fetchSubmissionStatus();
  }, [programData.user.user.token]);

  return (
    <section>
      {loading && <Loading loading={loading} />}
      <Alert text={alertText} style={{ padding: 9 }} />
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
                value={formik.values.numberOfStaff}
                onChange={handleNumberOfStaff}
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
                    (
                    {companyInfoData?.organizationalChart !== null
                      ? "Uploaded"
                      : "Not Uploaded yet"}
                    ){" "}
                  </span>
                </label>
              </div>
            </div>
          </section>
          <div style={{ margin: "15px 0" }}>
            <div style={{ display: "flex", alignItem: "baseline" }}>
              <div className="qa"> ? </div>
              <h3>
                Describe your company’s corporate profile showing your
                operational and service areas
              </h3>
            </div>

            <Editor
              apiKey="2dpmc8fbr5nqrl2l1ma4yde54t78hz9cp8mapsb5trp5h1kc"
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
            <div style={{ display: "flex", alignItem: "baseline" }}>
              <div className="qa"> ? </div>
              <h3>
                Provide a description of the product/solution that you offer
                (include product specification and product certification
                details)
              </h3>
            </div>
            <Editor
              apiKey="2dpmc8fbr5nqrl2l1ma4yde54t78hz9cp8mapsb5trp5h1kc"
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
            <div style={{ display: "flex", alignItem: "baseline" }}>
              <div className="qa"> ? </div>
              <h3>
                Short term objectives for current year (include bullet points as
                applicable)
              </h3>
            </div>

            <Editor
              apiKey="2dpmc8fbr5nqrl2l1ma4yde54t78hz9cp8mapsb5trp5h1kc"
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
            <div style={{ display: "flex", alignItem: "baseline" }}>
              <div className="qa"> ? </div>
              <h3>Medium Term Objectives (next 1-2 years)</h3>
            </div>

            <Editor
              apiKey="2dpmc8fbr5nqrl2l1ma4yde54t78hz9cp8mapsb5trp5h1kc"
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
            <div style={{ display: "flex", alignItem: "baseline" }}>
              <div className="qa"> ? </div>
              <h3>Long Term Objectives (3 years and beyond)</h3>
            </div>

            <Editor
              apiKey="2dpmc8fbr5nqrl2l1ma4yde54t78hz9cp8mapsb5trp5h1kc"
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
            {" "}
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
}
