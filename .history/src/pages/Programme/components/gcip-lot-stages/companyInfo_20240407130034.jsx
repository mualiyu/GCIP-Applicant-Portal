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
      </section>
    </section>
  );
}
