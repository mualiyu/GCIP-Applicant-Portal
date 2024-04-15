import React, { useState } from "react";

export default function Eligibility() {
  const [eligibility, setEligibility] = useState({
    nigerian_origin: "",
    incorporated_for_profit_clean_tech_company: "",
    years_of_existence: "",
    does_your_company_possess_an_innovative_idea: "",
    does_your_company_require_assistance_to_upscale: "",
    to_what_extent_are_your_challenges_financial_in_nature: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEligibility((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("hey");
    console.log(eligibility);
  };

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
            padding: "20px 0",
            borderBottom: "thin dashed #d2d2d2",
          }}
          className="sub-group">
          <div style={{ width: "50%" }}>
            Is your Company of a Nigeria Origin?
          </div>

          <div style={{ display: "flex" }}>
            <label style={{ marginLeft: 30, marginRight: 20 }}> Yes</label>
            <input
              name="nigerian_origin"
              type="radio"
              style={{ transform: "scale(1.7)" }}
              onChange={handleChange}
              value="Yes"
            />
          </div>
          <div style={{ display: "flex" }}>
            <label style={{ marginLeft: 30, marginRight: 20 }}>No</label>
            <input
              name="nigerian_origin"
              type="radio"
              style={{ transform: "scale(1.7)" }}
              onChange={handleChange}
              value="No"
            />
          </div>
        </div>

        <div
          style={{
            width: "100%",
            padding: "20px 0",
            borderBottom: "thin dashed #d2d2d2",
          }}
          className="sub-group">
          <div style={{ width: "50%" }}>
            Is your company an incorporated for-profit clean-tech company in
            Nigeria?
          </div>

          <div style={{ display: "flex" }}>
            <label style={{ marginLeft: 30, marginRight: 20 }}> Yes</label>
            <input
              name="incorporated_for_profit_clean_tech_company"
              type="radio"
              style={{ transform: "scale(1.7)" }}
              onChange={handleChange}
              value="Yes"
            />
          </div>
          <div style={{ display: "flex" }}>
            <label style={{ marginLeft: 30, marginRight: 20 }}>No</label>
            <input
              name="incorporated_for_profit_clean_tech_company"
              type="radio"
              onChange={handleChange}
              value="No"
              style={{ transform: "scale(1.7)" }}
            />
          </div>
        </div>

        <div
          style={{
            width: "100%",
            padding: "20px 0",
            borderBottom: "thin dashed #d2d2d2",
          }}
          className="sub-group">
          <div style={{ width: "50%" }}>
            Does your company possess an innovative idea/product which meets a
            critical need for “clean-tech challenges”?
          </div>

          <div style={{ display: "flex" }}>
            <label style={{ marginLeft: 30, marginRight: 20 }}>Yes</label>
            <input
              name="does_your_company_possess_an_innovative_idea"
              type="radio"
              onChange={handleChange}
              value="Yes"
              style={{ transform: "scale(1.7)" }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <label style={{ marginLeft: 30, marginRight: 20 }}>No</label>
            <input
              name="does_your_company_possess_an_innovative_idea"
              type="radio"
              onChange={handleChange}
              value="No"
              style={{ transform: "scale(1.7)" }}
            />
          </div>
        </div>
        <div
          style={{
            width: "100%",
            padding: "20px 0",
            borderBottom: "thin dashed #d2d2d2",
          }}
          className="sub-group">
          <div style={{ width: "50%" }}>
            Does your company require assistance to upscale?
          </div>

          <div style={{ display: "flex" }}>
            <label style={{ marginLeft: 30, marginRight: 20 }}>Yes</label>
            <input
              name="does_your_company_require_assistance_to_upscale"
              type="radio"
              onChange={handleChange}
              value="Yes"
              style={{ transform: "scale(1.7)" }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <label style={{ marginLeft: 30, marginRight: 20 }}>No</label>
            <input
              name="does_your_company_require_assistance_to_upscale"
              type="radio"
              onChange={handleChange}
              value="No"
              style={{ transform: "scale(1.7)" }}
            />
          </div>
        </div>
        <div
          style={{
            width: "100%",
            padding: "20px 0",
            borderBottom: "thin dashed #d2d2d2",
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
              name="years_of_existence"
              type="radio"
              onChange={handleChange}
              value="0-5"
              style={{ transform: "scale(1.7)" }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <label style={{ marginLeft: 30, marginRight: 20 }}>
              5-10 years
            </label>
            <input
              name="years_of_existence"
              type="radio"
              onChange={handleChange}
              value="5-10"
              style={{ transform: "scale(1.7)" }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <label style={{ marginLeft: 30, marginRight: 20 }}>
              10 years above
            </label>
            <input
              name="years_of_existence"
              type="radio"
              onChange={handleChange}
              value="10 years above"
              style={{ transform: "scale(1.7)" }}
            />
          </div>
        </div>
        <div
          style={{
            width: "100%",
            padding: "20px 0",
            borderBottom: "thin dashed #d2d2d2",
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
              name="to_what_extent_are_your_challenges_financial_in_nature"
              type="radio"
              onChange={handleChange}
              value="Completely"
              style={{ transform: "scale(1.7)" }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <label style={{ marginLeft: 30, marginRight: 20 }}>Majorly</label>
            <input
              name="to_what_extent_are_your_challenges_financial_in_nature"
              type="radio"
              onChange={handleChange}
              value="Majorly"
              style={{ transform: "scale(1.7)" }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <label style={{ marginLeft: 30, marginRight: 20 }}>Slightly</label>
            <input
              name="to_what_extent_are_your_challenges_financial_in_nature"
              type="radio"
              onChange={handleChange}
              value="Slightly"
              style={{ transform: "scale(1.7)" }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <label style={{ marginLeft: 30, marginRight: 20 }}>Unrelated</label>
            <input
              name="challenges_financial"
              type="radio"
              onChange={handleChange}
              value="Unrelated"
              style={{ transform: "scale(1.7)" }}
            />
          </div>
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
        Save
      </button>
    </section>
  );
}
