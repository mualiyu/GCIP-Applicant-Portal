import * as React from "react";
import { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BusinessPlan from "./BusinessPlan";
import ProjectAssigned from "./Project";
import "../../../styles/grant.css";
import ReviewAndSubmit from "./Review";

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

export default function Grant() {
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    getProjects();
  }, []);
  const getProjects = async () => {
    // nProgress.start();
    // setLoading(true);
    const respone = await query({
      method: "GET",
      url: `/api/applicant/projects`,
      token: data.user.user.token,
    });

    if (respone.success) {
      console.log(respone);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div>
        <p
          style={{
            fontWeight: 900,
            paddingTop: 20,
            fontFamily: "Roboto",
          }}>
          REQUEST FOR GRANT
        </p>
      </div>

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
          <Tab label="Business Plan" {...a11yProps(0)} />
          <Tab label="Projects" {...a11yProps(1)} />
          <Tab label="Lot 001" {...a11yProps(2)} />
          <Tab label="Review & Submit" {...a11yProps(3)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <BusinessPlan />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProjectAssigned />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Lot 001
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ReviewAndSubmit />
        </TabPanel>
      </Box>
    </>
  );
}
