import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Editor } from "@tinymce/tinymce-react";

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

export default function Eligibility() {
  const [value, setValue] = React.useState(0);
  //   const editorRef = useRef(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <h2 style={{ marginTop: 40 }}>Title of Program</h2>

      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 224,
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
        </Tabs>
        <TabPanel className="pd-30 w-100" value={value} index={0}>
          <div>
            <h2 style={{ marginBottom: 20 }}>Selected Lot: </h2>
            <h3 style={{ marginBottom: 10 }}>State reason for Selecting Lot</h3>
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
        </TabPanel>
        <TabPanel className="pd-30 w-100" value={value} index={1}>
          <h3> Eligibility Criteria </h3>
          <section>
            <div
              style={{
                width: "80%",
                marginBottom: 40,
              }}
              className="sub-group">
              Is your Company of a Nigeria Origin?
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
                width: "80%",
                marginBottom: 40,
              }}
              className="sub-group">
              Is your company an incorporated for-profit clean-tech company in
              Nigeria?
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
                width: "80%",
                marginBottom: 40,
              }}
              className="sub-group">
              How many years has your company been in existence?
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
                width: "80%",
                marginBottom: 40,
              }}
              className="sub-group">
              Does your company possess an innovative idea/product which meets a
              critical need for “clean-tech challenges”?
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
                width: "80%",
                marginBottom: 40,
              }}
              className="sub-group">
              Does your company require assistance to upscale?
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
                width: "80%",
                marginBottom: 40,
              }}
              className="sub-group">
              To what extent are your challenges financial in Nature?
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
                <label style={{ marginLeft: 30, marginRight: 20 }}>
                  Majorly
                </label>
                <input
                  name="company_type"
                  type="radio"
                  style={{ transform: "scale(1.7)" }}
                />
              </div>
              <div style={{ display: "flex" }}>
                <label style={{ marginLeft: 30, marginRight: 20 }}>
                  Slightly
                </label>
                <input
                  name="company_type"
                  type="radio"
                  style={{ transform: "scale(1.7)" }}
                />
              </div>
              <div style={{ display: "flex" }}>
                <label style={{ marginLeft: 30, marginRight: 20 }}>
                  Unrelated
                </label>
                <input
                  name="company_type"
                  type="radio"
                  style={{ transform: "scale(1.7)" }}
                />
              </div>
            </div>
          </section>
        </TabPanel>
        <TabPanel className="pd-30 w-100" value={value} index={2}>
          <h3> Company Information </h3>
        </TabPanel>
        <TabPanel className="pd-30 w-100" value={value} index={3}>
          <h3> Business Proposals </h3>
        </TabPanel>
        <TabPanel className="pd-30 w-100" value={value} index={4}>
          <h3> Document Uploads </h3>
        </TabPanel>
      </Box>
    </>
  );
}
