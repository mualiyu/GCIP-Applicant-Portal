import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/application.css";
import SelectCards from "./components/SelectCards";
import Button from "../../components/Button";
import Warning from "./components/Tab5/notify";
import { setActiveTab, setLots } from "../../redux/applicant/applicantSlice";
import { useState } from "react";
import Tab1 from "./application/Tab1";
import { Fade } from "react-awesome-reveal";
import Tab2 from "./application/Tab2";
import Tab0 from "./application/Tab0";
import Form from "./application/Form";
import ProfileDetail from "./application/ProfileDetail";
import StaffDetail from "./application/StaffDetail";
import Documents from "./application/Documents";
import Financial from "./application/Financial";
import Reference from "./application/Reference";
import Review from "./application/Review";
import query from "../../helpers/query";

const tabFields = [
  "Application",
  "Lots",
  "Sub Lots",
  "Eligibility Requirements",
  "Technical Requirements",
  
  "Financial",
  
  "Review & Submit",
  ,
];

export default function Application() {
   const data = useSelector((state) => state);
  const [activeTab,setActive]=useState(0)
  const [currentTab, setCurrent] = useState(0);
  const dispatch = useDispatch();
  const moveToTab = (number) => {
    if (number>data.applicant.activeTab) {
      dispatch(setActiveTab(number))
      setCurrent(number);
    }else{
      setCurrent(number);
    }
    
    
  };

  const getData = async () => {
    const respone = await query({
      method: "GET",
      url: `/api/applicant/application/get?program_id=${data.program.id}`,
      token: data.user.user.token,
    });

    if (respone.success) {
      if (respone.data.data.application.application_financials.financial_dept_info.length) {
        dispatch(setActiveTab(6))
        return
      }else if (respone.data.data.application.application_projects.length) {
        dispatch(setActiveTab(5))
        return
      }else if (respone.data.data.application.application_documents.length) {
        dispatch(setActiveTab(4))
        return
      }else if (respone.data.data.application.sublots.length) {
        dispatch(setActiveTab(3))
        return
      }
      dispatch(setActiveTab(1))
      
      }

      // setCurrent(data.data.application);
    }
  useEffect(()=>{
  console.log(data)
  getData()
  },[])
  return (
    <div className="application_container">
      <div className="tab-container">
        {tabFields.map((tab, index) => (
          <span
          style={{opacity:index>data.applicant.activeTab?0.5:1}}
            onClick={() => {
              if (index>data.applicant.activeTab) {
                return
              }
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
      
      {currentTab == 5 && (
        <Fade>
          <Financial moveToTab={moveToTab} />
        </Fade>
      )}
     
      {currentTab == 6 && (
        <Fade>
          <Review moveToTab={moveToTab} />
        </Fade>
      )}
    </div>
  );
}
