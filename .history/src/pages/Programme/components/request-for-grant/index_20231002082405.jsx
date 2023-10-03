import * as React from "react";
import { useEffect, useState } from "react";
import query from "../../../../helpers/query";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BusinessPlan from "./BusinessPlan";
import ProjectAssigned from "./Project";
import "../../../styles/grant.css";
import { useSelector } from "react-redux";
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
  const data = useSelector((state) => state);
  const [assigned, setAssigned] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    getProjects();
  }, []);
  const getProjects = async () => {
    setLoading(true);
    const resp = await query({
      method: "GET",
      url: `/api/applicant/projects`,
      token: data.user.user.token,
    });

    if (resp.success) {
      console.log(resp);
      setAssigned(resp.data.data.projects);
      setLoading(false);
    }
  };

  const handleSelectedProjectClick = (selectedId) => {
    // Set the selectedId to state or perform any actions you need
    setSelectedId(selectedId);
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
          {assigned.length &&
            assigned.map((pro, ind) => (
              <Tab
                label={pro.lot_name}
                {...a11yProps(1)}
                key={pro.id}
                onClick={() => handleSelectedProjectClick(pro.id)}
              />
            ))}

          <Tab label="Review & Submit" {...a11yProps(3)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <BusinessPlan />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <ProjectAssigned selectedId={selectedId} />
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
