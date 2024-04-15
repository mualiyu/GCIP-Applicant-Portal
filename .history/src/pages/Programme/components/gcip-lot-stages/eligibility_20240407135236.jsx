import * as React from "react";

export default function Eligibility() {
  return (
    <section>
      <h2 style={{ marginBottom: 30, fontWeight: 900, color: "#1a1989" }}>
        {" "}
        Eligibility Criteria{" "}
      </h2>
      <section>
        <div
          style={{
            width: "100%",
            marginBottom: 40,
          }}
          className="sub-group">
          <div style={{ width: "50%" }}>
            Is your Company of a Nigeria Origin?
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

        <div
          style={{
            width: "100%",
            marginBottom: 40,
          }}
          className="sub-group">
          <div style={{ width: "50%" }}>
            Is your company an incorporated for-profit clean-tech company in
            Nigeria?
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

        <div
          style={{
            width: "100%",
            marginBottom: 40,
          }}
          className="sub-group">
          <div style={{ width: "50%" }}>
            Does your company possess an innovative idea/product which meets a
            critical need for “clean-tech challenges”?
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
        </div>
        <div
          style={{
            width: "100%",
            marginBottom: 40,
          }}
          className="sub-group">
          <div style={{ width: "50%" }}>
            Does your company require assistance to upscale?
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
        </div>
        <div
          style={{
            width: "100%",
            padding: "20px 0",
            borderBottom: "thin dashed grey",
          }}
          className="sub-group">
          <div style={{ width: "50%" }}>
            How many years has your company been in existence?
          </div>

          <div style={{ display: "flex" }}>
            <label style={{ marginLeft: 30, marginRight: 20 }}>
              {" "}
              0-5 years{" "}
            </label>
            <input
              name="company_type"
              type="radio"
              style={{ transform: "scale(1.7)" }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <label style={{ marginLeft: 30, marginRight: 20 }}>
              5-10 years
            </label>
            <input
              name="company_type"
              type="radio"
              style={{ transform: "scale(1.7)" }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <label style={{ marginLeft: 30, marginRight: 20 }}>
              10 years above
            </label>
            <input
              name="company_type"
              type="radio"
              style={{ transform: "scale(1.7)" }}
            />
          </div>
        </div>
        <div
          style={{
            width: "100%",
            padding: "20px 0",
            borderBottom: "thin dashed grey",
          }}
          className="sub-group">
          <div style={{ width: "50%" }}>
            To what extent are your challenges financial in Nature?
          </div>

          <div style={{ display: "flex" }}>
            <label style={{ marginLeft: 30, marginRight: 20 }}>
              Completely
            </label>
            <input
              name="company_type"
              type="radio"
              style={{ transform: "scale(1.7)" }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <label style={{ marginLeft: 30, marginRight: 20 }}>Majorly</label>
            <input
              name="company_type"
              type="radio"
              style={{ transform: "scale(1.7)" }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <label style={{ marginLeft: 30, marginRight: 20 }}>Slightly</label>
            <input
              name="company_type"
              type="radio"
              style={{ transform: "scale(1.7)" }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <label style={{ marginLeft: 30, marginRight: 20 }}>Unrelated</label>
            <input
              name="company_type"
              type="radio"
              style={{ transform: "scale(1.7)" }}
            />
          </div>
        </div>
      </section>
    </section>
  );
}
