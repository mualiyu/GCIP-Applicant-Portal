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

  const handleSelectedProjectClick = (id, index) => {
    // console.log(id);
    setValue(index);
    setSelectedId(id);
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
        <Box>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}>
            <Tab
              label="Business Plan"
              {...a11yProps(0)}
              onClick={() => handleSelectedProjectClick(0)}
            />

            {/* <Tab label="Business Plan" {...a11yProps(0)} /> */}
            <Tab
              label="Projects"
              {...a11yProps(1)}
              style={{ pointerEvents: "none" }}
            />
            {assigned.length &&
              assigned.map((pro, ind) => (
                <Tab
                  label={pro.lot_name}
                  {...a11yProps(ind + 1)}
                  key={pro.id}
                  onClick={() => handleSelectedProjectClick(pro.id, ind)}
                />
              ))}

            <Tab
              label="Projects"
              {...a11yProps(assigned.length + 1)}
              onClick={() => handleSelectedProjectClick(assigned.length + 1)}
            />
            <Tab
              label="Review & Submit"
              {...a11yProps(assigned.length + 2)}
              onClick={() => handleSelectedProjectClick(assigned.length + 2)}
            />

            {/* <Tab label="Review & Submit" {...a11yProps(3)} /> */}
          </Tabs>
        </Box>

        {value === 0 && (
          <TabPanel value={value} index={0}>
            <BusinessPlan />
          </TabPanel>
        )}
        {/* {value === assigned.length + 1 && (
        <TabPanel value={value} index={assigned.length + 1}>
          
        </TabPanel>
      )} */}
        {value === assigned.length + 2 && (
          <TabPanel value={value} index={assigned.length + 2}>
            <ReviewAndSubmit />
          </TabPanel>
        )}
        {assigned.length &&
          assigned.map((pro, ind) => (
            <TabPanel value={value} index={ind + 1} key={pro.id}>
              <ProjectAssigned selectedId={selectedId} />
            </TabPanel>
          ))}
      </Box>
      );
      {/* In this version, we've added tabs for the static second and static last tab, and we conditionally render content based on the value (selected tab). The static content is displayed for the first, second, and last tabs based on the value.

Make sure to replace the static content and labels with your actual content for the corresponding tabs.
 */}
      {/* {assigned.length &&
          assigned.map((pro, ind) => (
            <TabPanel value={value} index={ind + 1} key={pro.id}>
              <ProjectAssigned selectedId={selectedId} />
            </TabPanel>
          ))}

        <TabPanel value={value} index={0}>
          <BusinessPlan />
        </TabPanel>
        <TabPanel index={assigned.length + 1}>
          <ReviewAndSubmit />
        </TabPanel> */}
      {/* </Box> */}
      {/* 
        <TabPanel value={value} index={0}>
          <BusinessPlan />
        </TabPanel>

        <TabPanel value={value} index={1}></TabPanel>

        <TabPanel value={value} index={2}>
          <ProjectAssigned selectedId={selectedId} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ReviewAndSubmit />
        </TabPanel>
      </Box> */}
    </>
  );
}