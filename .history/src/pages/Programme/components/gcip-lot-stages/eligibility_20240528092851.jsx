import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../../../components/Alert";
import query from "../../../../helpers/query";

export default function Eligibility() {
  const [loading, setLoading] = useState(false);
  const [alertText, setAlert] = useState("");
  const userToken = useSelector((state) => state.user.token);
  const [appID, setAppID] = useState(localStorage.getItem("appId") || null);
  const [hasSubmitted, setHasSubmitted] = useState(
    localStorage.getItem("eligibilityId") !== null
  );
  const [eligibility, setEligibility] = useState({
    nigerian_origin: "",
    incorporated_for_profit_clean_tech_company: "",
    years_of_existence: "",
    does_your_company_possess_an_innovative_idea: "",
    does_your_company_require_assistance_to_upscale: "",
    to_what_extent_are_your_challenges_financial_in_nature: "",
  });

  useEffect(() => {
    const savedEligibility = JSON.parse(
      localStorage.getItem("eligibilityData")
    );
    if (savedEligibility) {
      setEligibility(savedEligibility);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedEligibility = {
      ...eligibility,
      application_id: appID,
      [name]: value,
    };
    setEligibility(updatedEligibility);
    localStorage.setItem("eligibilityData", JSON.stringify(updatedEligibility));
  };

  const handleSubmit = async () => {
    const endpoint = hasSubmitted
      ? "/api/applicant/application/update/eligibility_criteria/1"
      : "/api/applicant/application/create/eligibility_criteria";

    setLoading(true);
    const { success, data, error } = await query({
      method: "POST",
      url: endpoint,
      token: userToken,
      bodyData: eligibility,
    });
    if (success) {
      setAlert(
        `Eligibility ${hasSubmitted ? "Updated" : "Submitted"} Successfully`
      );
      localStorage.setItem(
        "eligibilityId",
        data?.data?.application_business_proposal?.id
      );
      localStorage.setItem("eligibilityData", JSON.stringify(eligibility));
      setTimeout(() => {
        setAlert("");
      }, 3000);
      setHasSubmitted(true);
    } else {
      setAlert("Oops! Something went wrong");
      setTimeout(() => {
        setAlert("");
      }, 3000);
    }
    setLoading(false);
  };

  return (
    <section>
      <Alert text={alertText} style={{ padding: 9 }} />
      <h2 style={{ marginBottom: 30, fontWeight: 900, color: "#1a1989" }}>
        Eligibility Criteria
      </h2>
      <section>
        <div
          style={{
            width: "100%",
            padding: "20px 0",
            borderBottom: "thin dashed #d2d2d2",
            display: "flex",
            alignItems: "center",
          }}
          className="sub-group">
          <div style={{ width: "50%" }}>
            Is your Company of a Nigeria Origin?
          </div>
          <div>
            <label style={{ marginLeft: 30, marginRight: 20 }}> Yes</label>
            <input
              type="radio"
              style={{ transform: "scale(1.7)" }}
              name="nigerian_origin"
              onChange={handleChange}
              checked={eligibility.nigerian_origin === "Yes"}
              value="Yes"
              id="blue"
            />
          </div>
          <div>
            <label style={{ marginLeft: 30, marginRight: 20 }}>No</label>
            <input
              name="nigerian_origin"
              type="radio"
              style={{ transform: "scale(1.7)" }}
              onChange={handleChange}
              value="No"
              checked={eligibility.nigerian_origin === "No"}
              id="blue"
            />
          </div>
        </div>
        <div
          style={{
            width: "100%",
            padding: "20px 0",
            borderBottom: "thin dashed #d2d2d2",
            display: "flex",
            alignItems: "center",
          }}
          className="sub-group">
          <div style={{ width: "50%" }}>
            Is your company an incorporated for-profit clean-tech company in
            Nigeria?
          </div>
          <div>
            <label style={{ marginLeft: 30, marginRight: 20 }}> Yes</label>
            <input
              name="incorporated_for_profit_clean_tech_company"
              type="radio"
              style={{ transform: "scale(1.7)" }}
              onChange={handleChange}
              value="Yes"
              checked={
                eligibility.incorporated_for_profit_clean_tech_company === "Yes"
              }
              id="blue"
            />
          </div>
          <div>
            <label style={{ marginLeft: 30, marginRight: 20 }}>No</label>
            <input
              name="incorporated_for_profit_clean_tech_company"
              type="radio"
              onChange={handleChange}
              value="No"
              checked={
                eligibility.incorporated_for_profit_clean_tech_company === "No"
              }
              id="blue"
              style={{ transform: "scale(1.7)" }}
            />
          </div>
        </div>
        <div
          style={{
            width: "100%",
            padding: "20px 0",
            borderBottom: "thin dashed #d2d2d2",
            display: "flex",
            alignItems: "center",
          }}
          className="sub-group">
          <div style={{ width: "50%" }}>
            Does your company possess an innovative idea/product which meets a
            critical need for “clean-tech challenges”?
          </div>
          <div>
            <label style={{ marginLeft: 30, marginRight: 20 }}>Yes</label>
            <input
              name="does_your_company_possess_an_innovative_idea"
              type="radio"
              onChange={handleChange}
              value="Yes"
              checked={
                eligibility.does_your_company_possess_an_innovative_idea ===
                "Yes"
              }
              id="blue"
              style={{ transform: "scale(1.7)" }}
            />
          </div>
          <div>
            <label style={{ marginLeft: 30, marginRight: 20 }}>No</label>
            <input
              name="does_your_company_possess_an_innovative_idea"
              type="radio"
              onChange={handleChange}
              value="No"
              checked={
                eligibility.does_your_company_possess_an_innovative_idea ===
                "No"
              }
              id="blue"
              style={{ transform: "scale(1.7)" }}
            />
          </div>
        </div>
        <div
          style={{
            width: "100%",
            padding: "20px 0",
            borderBottom: "thin dashed #d2d2d2",
            display: "flex",
            alignItems: "center",
          }}
          className="sub-group">
          <div style={{ width: "50%" }}>
            Does your company require assistance to upscale?
          </div>
          <div>
            <label style={{ marginLeft: 30, marginRight: 20 }}>Yes</label>
            <input
              name="does_your_company_require_assistance_to_upscale"
              type="radio"
              onChange={handleChange}
              value="Yes"
              checked={
                eligibility.does_your_company_require_assistance_to_upscale ===
                "Yes"
              }
              id="blue"
              style={{ transform: "scale(1.7)" }}
            />
          </div>
          <div>
            <label style={{ marginLeft: 30, marginRight: 20 }}>No</label>
            <input
              name="does_your_company_require_assistance_to_upscale"
              type="radio"
              onChange={handleChange}
              value="No"
              checked={
                eligibility.does_your_company_require_assistance_to_upscale ===
                "No"
              }
              id="blue"
              style={{ transform: "scale(1.7)" }}
            />
          </div>
        </div>
        <div
          style={{
            width: "100%",
            padding: "20px 0",
            borderBottom: "thin dashed #d2d2d2",
            display: "flex",
            alignItems: "center",
          }}
          className="sub-group">
          <div style={{ width: "50%" }}>
            How many years has your company been in existence?
          </div>
          <div>
            <label style={{ marginLeft: 30, marginRight: 20 }}>0-5 years</label>
            <input
              name="years_of_existence"
              type="radio"
              onChange={handleChange}
              value="0-5"
              id="blue"
              checked={eligibility.years_of_existence === "0-5"}
              style={{ transform: "scale(1.7)" }}
            />
          </div>
          <div>
            <label style={{ marginLeft: 30, marginRight: 20 }}>
              5-10 years
            </label>
            <input
              name="years_of_existence"
              type="radio"
              onChange={handleChange}
              value="5-10"
              id="blue"
              checked={eligibility.years_of_existence === "5-10"}
              style={{ transform: "scale(1.7)" }}
            />
          </div>
          <div>
            <label style={{ marginLeft: 30, marginRight: 20 }}>
              10 years above
            </label>
            <input
              name="years_of_existence"
              type="radio"
              onChange={handleChange}
              value="10 years above"
              id="blue"
              checked={eligibility.years_of_existence === "10 years above"}
              style={{ transform: "scale(1.7)" }}
            />
          </div>
        </div>
        <div
          style={{
            width: "100%",
            padding: "20px 0",
            borderBottom: "thin dashed #d2d2d2",
            display: "flex",
            alignItems: "center",
          }}
          className="sub-group">
          <div style={{ width: "50%" }}>
            To what extent are your challenges financial in Nature?
          </div>
          <div>
            <label style={{ marginLeft: 30, marginRight: 20 }}>
              Completely
            </label>
            <input
              name="to_what_extent_are_your_challenges_financial_in_nature"
              type="radio"
              onChange={handleChange}
              id="blue"
              value="Completely"
              checked={
                eligibility.to_what_extent_are_your_challenges_financial_in_nature ===
                "Completely"
              }
              style={{ transform: "scale(1.7)" }}
            />
          </div>
          <div>
            <label style={{ marginLeft: 30, marginRight: 20 }}>Majorly</label>
            <input
              name="to_what_extent_are_your_challenges_financial_in_nature"
              type="radio"
              onChange={handleChange}
              id="blue"
              value="Majorly"
              checked={
                eligibility.to_what_extent_are_your_challenges_financial_in_nature ===
                "Majorly"
              }
              style={{ transform: "scale(1.7)" }}
            />
          </div>
          <div>
            <label style={{ marginLeft: 30, marginRight: 20 }}>Slightly</label>
            <input
              name="to_what_extent_are_your_challenges_financial_in_nature"
              type="radio"
              onChange={handleChange}
              id="blue"
              value="Slightly"
              checked={
                eligibility.to_what_extent_are_your_challenges_financial_in_nature ===
                "Slightly"
              }
              style={{ transform: "scale(1.7)" }}
            />
          </div>
          <div>
            <label style={{ marginLeft: 30, marginRight: 20 }}>Unrelated</label>
            <input
              name="to_what_extent_are_your_challenges_financial_in_nature"
              type="radio"
              onChange={handleChange}
              id="blue"
              value="Unrelated"
              checked={
                eligibility.to_what_extent_are_your_challenges_financial_in_nature ===
                "Unrelated"
              }
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
        {loading ? "Loading..." : hasSubmitted ? "Update" : "Save Data"}
      </button>
    </section>
  );
}
