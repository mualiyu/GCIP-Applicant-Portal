import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import query from "../../../../helpers/query";
import { useFormik } from "formik";
import Alert from "../../../../components/Alert";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Editor } from "@tinymce/tinymce-react";
import Eligibility from "./eligibility";
import CompanyInfo from "./companyInfo";
import BusinessProposal from "./businessProposal";
import { useLocation } from "react-router-dom";
import EligibilityDocuments from "./eligibilityDocuments";
import GcipSubmissionReview from "./review";
import { useEffect } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function ProgramLot() {
  const [value, setValue] = React.useState(0);
  const [application, setApplication] = useState(null);
  const [applicationId, setApplicationId] = React.useState(null);
  const location = useLocation();
  const [alertText, setAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const programData = useSelector((state) => state);
  const { prgId, prgName } = useParams();

  const [formValues, setFormValues] = useState({
    reasonForSelectingLot: "",
  });

  const formik = useFormik({
    initialValues: {
      reasonForSelectingLot: "",
    },

    enableReinitialize: true,
    onSubmit: async (values) => {
      const endpoint = "/api/applicant/application/create/initial";
      Object.keys(values).forEach((key) => {
        localStorage.setItem(key, values[key]);
      });

      const payload = {
        update: applicationId !== null ? "1" : "0",
        program_id: programData.program.id,
        lots: [
          {
            id: prgId,
            name: prgName,
            choice: formValues.reasonForSelectingLot,
          },
        ],
      };

      setLoading(true);
      const { success, data, error } = await query({
        method: "POST",
        url: endpoint,
        token: programData.user.user.token,
        bodyData: payload,
      });

      if (success) {
        setApplicationId(data.data.application.id);
        localStorage.setItem("appId", data.data.application.id);
        setAlert(`Program Lot Updated Successfully`);
        setTimeout(() => {
          setAlert("");
        }, 3000);
        setLoading(false);
      } else {
        setAlert("Oops! Something went wrong");
        setTimeout(() => {
          setAlert("");
        }, 3000);
        setLoading(false);
      }
    },
  });

  const handleEditorChange = (name, content) => {
    setFormValues({
      ...formValues,
      [name]: content,
    });
    localStorage.setItem(name, content);
  };

  const [selectedLot, setSelectedLot] = useState(null);
  const [lotData, setLotData] = useState(null);
  const [valueRetrieved, setValueRetrieved] = useState(false);

  useEffect(() => {
    console.log(programData);
    const fetchSubmissionStatus = async () => {
      setLoading(true);
      const { success, data, error } = await query({
        method: "GET",
        url: `/api/applicant/application/get?program_id=${programData.program.id}`,
        token: programData.user.user.token,
      });

      if (success) {
        setFormValues({
          reasonForSelectingLot: data?.data?.application?.lots[0]?.choice || "",
        });
        setLotData(data.data.application.lots[0]);
        setLoading(false);
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <h2 style={{ marginTop: 40, fontWeight: 900 }}>
        {programData.program.program.programName}
      </h2>
      <Alert text={alertText} style={{ padding: 9 }} />
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
        }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}>
          <Tab label="Lot Selection" {...a11yProps(0)} />
          <Tab label="Eligibility" {...a11yProps(1)} />
          <Tab label="Company Information" {...a11yProps(2)} />
          <Tab label="Business Proposals" {...a11yProps(3)} />
          <Tab label="Uploads" {...a11yProps(4)} />
          <Tab label="Review" {...a11yProps(5)} />
        </Tabs>
        <TabPanel className="pd-30 w-100" value={value} index={0}>
          <div>
            <h2 style={{ marginBottom: 20, float: "right" }}>{prgName} </h2>
            <div style={{ display: "flex", alignItem: "baseline" }}>
              <div className="qa"> ? </div>
              <h3>State Reason for Selecting Lot</h3>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="direction-ltr">
                <Editor
                  apiKey="7tnvo6drg2ein84gaf54fjos9hwgm7yoyiatqt8dxu8ai5l0"
                  value={formValues.reasonForSelectingLot}
                  onEditorChange={(content) =>
                    handleEditorChange("reasonForSelectingLot", content)
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
                {formik.isSubmitting ? "Loading..." : "Update Record"}
              </button>
            </form>
          </div>
        </TabPanel>
        <TabPanel className="pd-30 w-100" value={value} index={1}>
          <Eligibility />
        </TabPanel>
        <TabPanel className="pd-30 w-100" value={value} index={2}>
          <CompanyInfo />
        </TabPanel>
        <TabPanel className="pd-30 w-100" value={value} index={3}>
          <BusinessProposal />
        </TabPanel>
        <TabPanel className="pd-30 w-100" value={value} index={4}>
          <EligibilityDocuments />
        </TabPanel>
        <TabPanel className="pd-30 w-100" value={value} index={5}>
          <GcipSubmissionReview />
        </TabPanel>
      </Box>
    </>
  );
}
