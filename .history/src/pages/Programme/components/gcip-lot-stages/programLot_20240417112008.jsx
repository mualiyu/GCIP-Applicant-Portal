import * as React from "react";
import { useState } from "react";
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
            id: selectedLot?.id,
            name: selectedLot?.name,
            choice: values.reasonForSelectingLot,
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
        console.log(data);
        setApplicationId(data.data.application.id);
        setAlert(
          `Program Lot ${
            hasBeenSubmitted() ? "Updated" : "Submitted"
          } Successfully`
        );
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

  const handleEditorChange = (field, content) => {
    formik.setFieldValue(field, content);
    localStorage.setItem(field, content);
  };

  const hasBeenSubmitted = () => {
    // Logic to check if form has been submitted before
    return localStorage.getItem("reasonForSelectingLot") !== null;
  };

  const [selectedLot, setSelectedLot] = useState(null);
  const [valueRetrieved, setValueRetrieved] = useState(false);

  // const { selectedLot } = location.state || {};
  // Check if selected lot exists in sessionStorage or localStorage on component mount
  useEffect(() => {
    console.log(location.state && location.state.selectedLot);
    console.log(location?.state);
    const initialValue = localStorage.getItem("editorContent") || "";
    const storeLot = localStorage.setItem(
      "selectedLot",
      location?.state?.selectedLot.selectedLot
    );
    console.log(storeLot);
    const storedLot = localStorage.getItem("storeLot");
    if (storedLot) {
      setSelectedLot(storedLot);
    } else {
      setSelectedLot(location.state && location.state.selectedLot);
    }
    setValueRetrieved(true); // Indicate that the value has been retrieved
  }, [location?.state.selectedLot]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <h2 style={{ marginTop: 40 }}>Title of Program</h2>
      <Alert text={alertText} style={{ padding: 9 }} />
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          // height: 224,
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
            <h2 style={{ marginBottom: 20 }}>{selectedLot?.name} </h2>
            <h3
              style={{
                marginBottom: 10,
                backgroundColor: "red",
                color: "white",
                padding: 7,
              }}>
              State reason for Selecting Lot
            </h3>

            <form onSubmit={formik.handleSubmit}>
              <div className="direction-ltr">
                <Editor
                  apiKey="7tnvo6drg2ein84gaf54fjos9hwgm7yoyiatqt8dxu8ai5l0"
                  value={formik.values.reasonForSelectingLot}
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
                }}>
                {" "}
                {formik.isSubmitting
                  ? "Loading..."
                  : hasBeenSubmitted()
                  ? "Update"
                  : "Save Data"}
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
