import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/application.css";
import SelectCards from "./components/SelectCards";
import Button from "../../components/Button";
import Warning from "./components/Tab5/notify";
import { setLots } from "../../redux/applicant/applicantSlice";
import { useState } from "react";
import Tab1 from "./application/Tab1";
import { Fade } from "react-awesome-reveal";
import Tab2 from "./application/Tab2";
import Tab0 from "./application/Tab0";
import Form from "./application/Form";
import ProfileDetail from "./application/ProfileDetail";
import StaffDetail from "./application/StaffDetail";

const tabFields = [
  "Application",
  "Lots",
  "Sub Lots",
  "Profile",
  "Staff",
  "Review & Submit",
   
];

export default function Application() {
  const data = useSelector((state) => state);
  const [currentTab, setCurrent] = useState(0);
  const dispatch = useDispatch();
  const moveToTab = (number) => {
    setCurrent(number);
  };
  return (
    <div className="application_container">
      <div className="tab-container">
        {tabFields.map((tab, index) => (
          <span
            onClick={() => {
              setCurrent(index);
            }}
            key={tab}
            className={`${index == currentTab ? "active" : null}`}
          >
            {tab}
          </span>
        ))}
      </div>

      
        {currentTab == 0 && (
          <Fade>
            <Tab0 moveToTab={moveToTab} />
          </Fade>
        )}
        {currentTab == 1 && (
          <Fade>
            <Tab1 moveToTab={moveToTab} />
          </Fade>
        )}
        {currentTab == 2 && (
          <Fade>
            <Tab2 moveToTab={moveToTab} />
          </Fade>
        )}
        {currentTab == 3 && (
          <Fade>
            <ProfileDetail moveToTab={moveToTab} />
          </Fade>
        )}
         {currentTab == 4 && (
          <Fade>
            <StaffDetail moveToTab={moveToTab} />
          </Fade>
        )}
      
    </div>
  );
}
