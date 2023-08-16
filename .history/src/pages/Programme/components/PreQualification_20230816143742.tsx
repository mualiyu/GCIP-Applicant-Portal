import React, { useState } from "react";
import "./styles/prequal.css";
import Button from "../../../components/Button";
import query from "../../../helpers/query";
import { useSelector } from "react-redux";
import Alert from "../../../components/Alert";
import Loading from "../../../components/Loading";

export default function PreQualification({
  moveToTab,
  accessed,
}: {
  moveToTab: (tab: number) => void;
  accessed: boolean;
}) {
  const [isChecked, setIsChecked] = useState(accessed);
  const programData: any = useSelector((data) => data);
  const [loading, setLoading] = useState(false);
  const [alertText, setAlert] = useState("");

    const handleDownload = () => {
      const fileURL = 'https://api.grants.amp.gefundp.rea.gov.ng/storage/programFiles/AMP%20Pre%20Qualification%20Document_GEF_UNDP_REA_2023.pdf';
      const fileName =  'PRE-QUALIFICATION DOCUMENT';
      const newTab = window.open(fileURL, '_blank');
    if (newTab) {
      newTab.document.title = fileName;
    } else {
      const link = document.createElement('a');
      link.href = fileURL;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }


  const handleDownloadAddendum = () => {
    const fileURL = 'https://api.grants.amp.gefundp.rea.gov.ng/storage/programFiles/AMP%20Pre%20Qualification%20Document_Adddendum.docx';
    const fileName =  'ADDENDUM';
    const newTab = window.open(fileURL, '_blank');
  if (newTab) {
    newTab.document.title = fileName;
  } else {
    const link = document.createElement('a');
    link.href = fileURL;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  }

  return (
    <div className="prequal_container">
      <Alert text={alertText} />
      <Loading size={60} loading={loading} />
      <span className="hd">
        APPLICANTS ARE REQUIRED TO READ THE PRE-QUALIFICATION DOCUMENT TO FULLY
        UNDERSTAND THE APPLICATION PROCESS
      </span>

<div style={{display: 'flex', alignItems: 'center', justifyContent: "flex-end"}}>

<Button
        fontStyle={{
          color: "var(--primary)",
        }}
        style={{
          width: 134,
          marginLeft: "auto",
          marginTop: 30,
          marginRight: 20,
          backgroundColor: "#fff",
          border: "1px solid var(--primary)",
        }}
        onClick={handleDownloadAddendum}
        label="Download addendum"
      />



      <Button
        fontStyle={{
          color: "var(--primary)",
        }}
        style={{
          width: 134,
          marginLeft: "15",
          marginTop: 30,
          backgroundColor: "#fff",
          border: "1px solid var(--primary)",
        }}
        onClick={handleDownload}
        label="Download"
      />
</div>
    



      <div className="checked">
        <input
          checked={isChecked}
          onChange={(e) => {
            if (e.currentTarget.checked) {
              setIsChecked(true);
            } else {
              setIsChecked(false);
            }
          }}
          type="checkbox"
          style={{ transform: "scale(1.7)" }}
        />
        <span>
          I HAVE READ AND UNDERSTOOD DETAILS AS APPLIED IN THE PRE-QUALIFICATION
          DOCUMENT.
        </span>
        <Button
          disabled={!isChecked}
          onClick={async () => {
            setLoading(true);
            const { success, data, error } = await query({
              method: "POST",
              url: "/api/applicant/application/accept/pre-qualification",
              token: programData.user.user.token,
              bodyData: {
                application_id: programData.applicant.application.id,
              },
            });
            setLoading(false);
            if (success) {
              setAlert(`You've accepted the pre-qualification document.`);
            }
            setTimeout(() => {
              setAlert("");
              moveToTab(1);
            }, 2000);
          }}
          style={{
            width: 134,
            opacity: isChecked ? 1 : 0.5,
          }}
          label="Continue"
        />
      </div>
    </div>
  );
}
