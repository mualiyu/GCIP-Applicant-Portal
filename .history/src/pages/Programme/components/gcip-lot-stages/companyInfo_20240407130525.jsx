import * as React from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function CompanyInfo() {
  return (
    <section>
      <h2 style={{ marginBottom: 30, fontWeight: 900, color: "#1a1989" }}>
        {" "}
        Company Information
      </h2>
      <section>
        <div>
          <h3 style={{ marginBottom: 10 }}>
            Describe your company’s corporate profile showing your operational
            and service areas
          </h3>
          <Editor
            apiKey="2bibih7gzun78pn5zdau9mp238v6osoplllh9qw1lgb3rzws"
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

        <div>
          <h3 style={{ marginBottom: 10 }}>
            Provide a description of the product/solution that you offer
            (include product specification and product certification details)
          </h3>
          <Editor
            apiKey="2bibih7gzun78pn5zdau9mp238v6osoplllh9qw1lgb3rzws"
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

        <div>
          <h3 style={{ marginBottom: 10 }}>
            Short term objectives for current year (include bullet points as
            applicable)
          </h3>
          <Editor
            apiKey="2bibih7gzun78pn5zdau9mp238v6osoplllh9qw1lgb3rzws"
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

        <div>
          <h3 style={{ marginBottom: 10 }}>
            Medium term objectives (next 1-2 years)
          </h3>
          <Editor
            apiKey="2bibih7gzun78pn5zdau9mp238v6osoplllh9qw1lgb3rzws"
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

        <div>
          <h3 style={{ marginBottom: 10 }}>
            Long Term Objectives (3 years and beyond)
          </h3>
          <Editor
            apiKey="2bibih7gzun78pn5zdau9mp238v6osoplllh9qw1lgb3rzws"
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


        <div className="form__group__register field col-8 mr-sm">
                <input
                  type="input"
                  className="form__field"
                  placeholder="ABC Company"
                  value={formik.values.name}
                  name="name"
                  onChange={formik.handleChange}
                  required
                />
                <label className="form__label">
                  Company Name
                </label>
              </div>


        <div>
            </div>


        <div className="flex">
                            <div className="form__group__register field col-12 mr-sm">
                            <input type="file" className="" onChange={(e) => {
                
                const formData = new FormData();
                const files = e.target.files;
                const fileSizeLimits = 10 * 1024 * 1024; // 5 MB
                files?.length && formData.append("file", files[0]);
                if(files[0].size > fileSizeLimits) {
                  setAlert('File size exceeds the limit (10 MB).');
                  setTimeout(() => {
                    setAlert("");
                  }, 3000);
                  e.target.value="";
                  return
                }
                setLoading(true);
                fetch(
                  "https://api.gcip.rea.gov.ng/api/applicant/registerUpload",

                  {
                    method: "POST",
                    body: formData
                  }
                )
                  .then((res) => res.json())
                  .then((data) => {
                    setLoading(false);
                    if (data.status) {
                      setAlert("CAC Uploaded Succefully");
                      setRcCert(data.data.url)
                      console.log(data);
                      setTimeout(() => {
                        setAlert("");
                      }, 3000);
                   
                    } 
                  })



              }} />


         
        </div>
      </section>
    </section>
  );
}
