import * as React from "react";
import { useState } from "react";
import query from "../../../../helpers/query";
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
  const [editorContent, setEditorContent] = useState(
    localStorage.getItem("editorContent") || ""
  );

  const handleEditorChange = (content, editor) => {
    setEditorContent(content);
    localStorage.setItem("editorContent", content);
  };

  // Check if selected lot exists in sessionStorage or localStorage on component mount
  const [selectedLot, setSelectedLot] = useState(null);
  const [valueRetrieved, setValueRetrieved] = useState(false);

  // Check if selected lot exists in sessionStorage or localStorage on component mount
  useEffect(() => {
    const initialValue = localStorage.getItem("editorContent") || "";
    const storedLot =
      sessionStorage.getItem("selectedLot") ||
      localStorage.getItem("selectedLot");
    if (storedLot) {
      setSelectedLot(JSON.parse(storedLot));
    } else {
      setSelectedLot(location.state && location.state.selectedLot);
    }
    setValueRetrieved(true); // Indicate that the value has been retrieved
  }, [location.state]);

  // Store selected lot in sessionStorage or localStorage when it changes
  useEffect(() => {
    if (selectedLot) {
      sessionStorage.setItem("selectedLot", JSON.stringify(selectedLot));
      localStorage.setItem("selectedLot", JSON.stringify(selectedLot));
    }
  }, [selectedLot]);

  // Render loading indicator until the value is retrieved
  if (!valueRetrieved) {
    return <div>Loading...</div>;
  }
  const submitProgramLot = async () => {
    console.log("hey");
    setLoading(true);
    let selection = {
      update: "0",
      program_id: programData.program.id,
      lots: [
        {
          id: selectedLot?.id,
          name: selectedLot?.name,
          choice: editorContent,
        },
      ],
    };
    // console.log(selection);
    const { success, data, error } = await query({
      method: "POST",
      url: "/api/applicant/application/create/initial",
      token: programData.user.user.token,
      bodyData: selection,
    });
    console.log(data);
    if (success) {
      setAlert(`${selection.lots[0].name} has been saved!`);
      // save Application ID here
      localStorage.setItem("AppId", data.data.application.id);
      setTimeout(() => {
        setAlert("");
      }, 5000);
      setLoading(false);
      // navigate(
      //   `/Programme/Application/${data.data.application.program_id}/continue`
      // );
    } else {
      setAlert("Oops! Something went wrong");
      setTimeout(() => {
        setAlert("");
      }, 3000);
      setLoading(false);
    }
  };

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
            <Editor
              apiKey="2bibih7gzun78pn5zdau9mp238v6osoplllh9qw1lgb3rzws"
              name="reason"
              id="reason"
              // initialValue={selectedLot?.choice}
              initialValue={editorContent}
              onEditorChange={handleEditorChange}
              init={{
                height: 400,
                directionality: "ltr",
                menubar: false,
                plugins: [
                  "advlist autolink lists link image",
                  "charmap print preview anchor help",
                  "searchreplace visualblocks code",
                  "insertdatetime media table paste wordcount",
                ],
                valid_elements: "",
                toolbar:
                  "undo redo | formatselect | bold italic | \
                  alignleft aligncenter alignright | \
                  bullist numlist outdent indent | help",
                formats: {
                  alignleft: { block: "div", classes: "alignleft" },
                  aligncenter: { block: "div", classes: "aligncenter" },
                  alignright: { block: "div", classes: "alignright" },
                },
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:12px }",
              }}
            />

            <button
              onClick={submitProgramLot}
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
              {loading ? "Loading..." : "Save Data"}
            </button>
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
