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
  const selectedLot = location.state && location.state.selectedLot;
  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (content, editor) => {
    setEditorContent(content);
  };

  useEffect(() => {
    console.log(selectedLot);
  }, []);

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
      setAlert(`${selection.lots[0].name} has been registered and saved`);
      // save Application ID here
      setApplication(data.data.application.id);
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
    console.log(application);
    setApplicationId(application);
    console.log(applicationId);
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
          appID={applicationId}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}>
          <Tab label="Lot Selection" {...a11yProps(0)} />
          <Tab label="Eligibility" {...a11yProps(1)} />
          <Tab label="Company Information" {...a11yProps(2)} />
          <Tab label="Business Proposals" {...a11yProps(3)} />
          <Tab label="Uploads" {...a11yProps(4)} />
        </Tabs>
        <TabPanel className="pd-30 w-100" value={value} index={0}>
          <div>
            <h2 style={{ marginBottom: 20 }}>{selectedLot?.name} </h2>
            <h3 style={{ marginBottom: 10 }}>State reason for Selecting Lot</h3>
            <Editor
              apiKey="2bibih7gzun78pn5zdau9mp238v6osoplllh9qw1lgb3rzws"
              name="reason"
              id="reason"
              initialValue={selectedLot?.choice}
              onEditorChange={handleEditorChange}
              init={{
                height: 400,
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
        <TabPanel
          className="pd-30 w-100"
          value={value}
          appID={applicationId}
          index={1}>
          <Eligibility />
        </TabPanel>
        <TabPanel
          className="pd-30 w-100"
          value={value}
          appID={applicationId}
          index={2}>
          <CompanyInfo />
        </TabPanel>
        <TabPanel
          className="pd-30 w-100"
          value={value}
          appID={applicationId}
          index={3}>
          <BusinessProposal />
        </TabPanel>
        <TabPanel
          className="pd-30 w-100"
          value={value}
          appID={applicationId}
          index={4}>
          <EligibilityDocuments />
        </TabPanel>
      </Box>
    </>
  );
}
