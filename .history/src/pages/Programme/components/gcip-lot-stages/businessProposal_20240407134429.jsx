import * as React from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function BusinessProposal() {
  return (
    <section>
      <h2 style={{ marginBottom: 30, fontWeight: 900, color: "#1a1989" }}>
        {" "}
        Business Proposal
      </h2>
      <section>
        <section style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "100%",
              marginBottom: 40,
              marginRight: 40,
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
                name="company_type"
                type="radio"
                style={{ transform: "scale(1.7)" }}
              />
            </div>
            <div style={{ display: "flex" }}>
              <label style={{ marginLeft: 30, marginRight: 20 }}>No</label>
              <input
                name="company_type"
                type="radio"
                style={{ transform: "scale(1.7)" }}
              />
            </div>
          </div>

          <div className="flex" style={{ margin: "15px 20px", width: "55%" }}>
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
                    "https://api.gcip.rea.gov.ng/api/applicant/registerUpload",

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

        <div
          style={{
            width: "100%",
            marginBottom: 40,
          }}
          className="sub-group">
          <div style={{ width: "50%" }}>
            Have you acquired patency or authority of the patent owners to
            demonstrate the technology
          </div>

          <div style={{ display: "flex" }}>
            <label style={{ marginLeft: 30, marginRight: 20 }}>Yes</label>
            <input
              name="company_type"
              type="radio"
              style={{ transform: "scale(1.7)" }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <label style={{ marginLeft: 30, marginRight: 20 }}>No</label>
            <input
              name="company_type"
              type="radio"
              style={{ transform: "scale(1.7)" }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <label style={{ marginLeft: 30, marginRight: 20 }}>
              Evidence of acknowledgement of application for patency
            </label>
            <input
              name="company_type"
              type="radio"
              style={{ transform: "scale(1.7)" }}
            />
          </div>
        </div>

        <div style={{ margin: "15px 0" }}>
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

        <div style={{ margin: "15px 0" }}>
          <h3 style={{ marginBottom: 10 }}>
            Explain/demonstrate the critical need for the technology/solution
            (i.e. carbon and Global Warming Potential (GWP) reduction, energy
            efficiency, job creation, rural/urban development etc)
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

        <div style={{ margin: "15px 0" }}>
          <h3 style={{ marginBottom: 10 }}>
            State the critical needs for the grant and identify areas for
            intervention
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

        <div style={{ margin: "15px 0" }}>
          <h3 style={{ marginBottom: 10 }}>
            Identify value additions that makes your technology/solution stand
            out in comparison with existing non-clean-tech and clean-tech
            alternatives to your technology/solution. i.e. innovative business
            model, cost comparison, technological advantages etc.
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

        <div style={{ margin: "15px 0" }}>
          <h3 style={{ marginBottom: 10 }}>
            Demonstrate consideration for direct and indirect carbon emissions
            in the design and deployment of your technology/solution, include
            illustrations, diagrammatic and pictorial references as applicable.
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
      </section>
    </section>
  );
}
