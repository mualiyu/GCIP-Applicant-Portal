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
import Loading from "../../../../components/Loading";

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
    }
    setLoading(false);
  };

  const handleSelectedProjectClick = (id, index) => {
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
            <Tab label="Submission Templates" {...a11yProps(0)} />
            {assigned.length &&
              assigned.map((pro, ind) => (
                <>
                  <Tab
                    label={pro.lot_name}
                    {...a11yProps(ind + 1)}
                    key={pro.id}
                    onClick={() => handleSelectedProjectClick(pro.id, ind + 1)}
                  />
                  <div className="tab_tick">
                    <svg
                      width="9"
                      height="8"
                      viewBox="0 0 9 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M3.0568 7.84288L0.131797 4.35628C-0.0439322 4.14681 -0.0439322 3.80718 0.131797 3.59769L0.768178 2.8391C0.943907 2.62961 1.22885 2.62961 1.40458 2.8391L3.375 5.18782L7.59542 0.157101C7.77115 -0.0523671 8.05609 -0.0523671 8.23182 0.157101L8.8682 0.915689C9.04393 1.12516 9.04393 1.46479 8.8682 1.67428L3.6932 7.8429C3.51745 8.05237 3.23253 8.05237 3.0568 7.84288Z"
                        fill="#006438"
                      />
                    </svg>
                  </div>
                </>
              ))}

            <Tab
              label="Review & Submit"
              {...a11yProps(assigned?.length + 1)}
              // onClick={() => handleSelectedProjectClick(assigned?.length + 1)}
            />
          </Tabs>
        </Box>

        {value === 0 && (
          <TabPanel value={value} index={0}>
            <BusinessPlan />
          </TabPanel>
        )}

        {assigned.length &&
          assigned.map((pro, ind) => (
            <>
              <TabPanel value={value} index={ind + 1} key={pro.id}>
                <ProjectAssigned selectedId={selectedId} />
              </TabPanel>
            </>
          ))}

        {/* {value === assigned.length + 1 && ( */}
        <TabPanel value={value} index={assigned.length + 1}>
          <ReviewAndSubmit />
        </TabPanel>
        {/* )} */}
      </Box>
      {/* ); */}
    </>
  );
}
