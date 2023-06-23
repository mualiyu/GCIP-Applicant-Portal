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
import { Header } from "../../components/Common";
import TabItem from "./components/TabItem";
import PreQualification from "./components/PreQualification";
import Submit from "./application/Submit";

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
  const activeTab = data.applicant.activeTab;
  const [currentTab, setCurrent] = useState(0);
  const dispatch = useDispatch();
  const moveToTab = (number) => {
    if (number > data.applicant.activeTab) {
      dispatch(setActiveTab(number));
      setCurrent(number);
    } else {
      setCurrent(number);
    }
  };

  const getHeaderText = () => {
    switch (currentTab) {
      case 1:
        return (
          <>
            <Header text="Lots" />
            <span>
              Note: applicants are allowed to choose two categories of lots
            </span>
          </>
        );

      case 2:
        return (
          <>
            <Header text="Sub Lots" />
            <span>
              Note: applicants are allowed to choose two sub lots per lot
            </span>
          </>
        );

      case 3:
        return (
          <>
            <Header text="Eligibility Requirements" />
          </>
        );

      case 4:
        return (
          <>
            <Header text="Technical Requirements" />
          </>
        );

      case 5:
        return (
          <>
            <Header text="Financial Information" />
            <span>Provide information about company finances</span>
          </>
        );
      case 6:
        return (
          <>
            <Header text="Review Application" />
          </>
        );
      case 10:
        return (
          <>
            <Header text="Pre Qualification Document" />
          </>
        );

      default:
        <></>;
    }
  };

  const getData = async () => {
    const respone = await query({
      method: "GET",
      url: `/api/applicant/application/get?program_id=${data.program.id}`,
      token: data.user.user.token,
    });

    if (respone.success) {
      if (
        respone.data.data.application.application_financials.financial_dept_info
          .length
      ) {
        dispatch(setActiveTab(6));
        return;
      } else if (respone.data.data.application.application_projects.length) {
        dispatch(setActiveTab(5));
        return;
      } else if (respone.data.data.application.application_documents.length) {
        dispatch(setActiveTab(4));
        return;
      } else if (respone.data.data.application.sublots.length) {
        dispatch(setActiveTab(3));
        return;
      }
      dispatch(setActiveTab(1));
    }

    // setCurrent(data.data.application);
  };
  useEffect(() => {
    console.log(data);
    getData();
  }, []);
  return (
    <div style={{ padding: 10 }} className="application_container">
      <div className="program_header_head">
        <div className="program_main_label">
          <Header text="Program Home" />
          <span>
            blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum
            eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in
            purus lobortis eleifend. Sed nec ante dictum sem condimentum
            ullamcorper quis venenatis nisi. Proin{" "}
          </span>
        </div>

        <img src="/log.png" />
      </div>
      {currentTab == 0 && (
        <Fade>
          <Tab0 moveToTab={moveToTab} />
        </Fade>
      )}
      {currentTab !== 0 && (
        <div className="overall_tab_container">
          <div className="tab_side_container">
            <Header text="APPLICATION" style={{ color: "var(--primary)" }} />
            <TabItem
              label="PRE-QUALIFICATION DOCUMENTS"
              active={currentTab == 10}
              onClick={() => {
                setCurrent(10);
              }}
              accessed
            />
            <TabItem
              accessed={activeTab > 1}
              active={currentTab == 1}
              onClick={() => {
                setCurrent(1);
              }}
              label="ADD LOTS"
            />
            <TabItem
              accessed={activeTab > 2}
              active={currentTab == 2}
              onClick={() => {
                setCurrent(2);
              }}
              label="SUB LOTS"
            />
            <TabItem
              accessed={activeTab > 3}
              active={currentTab == 3}
              onClick={() => {
                setCurrent(3);
              }}
              label="ELIGIBILITY REQUIREMENTS"
            />
            <TabItem
              accessed={activeTab > 4}
              active={currentTab == 4}
              onClick={() => {
                setCurrent(4);
              }}
              label="TECHNICAL REQUIREMENTS"
            />
            <TabItem
              accessed={activeTab > 5}
              active={currentTab == 5}
              onClick={() => {
                setCurrent(5);
              }}
              label="FINANCIAL INFORMATION"
            />
            <TabItem
              accessed={activeTab == 6}
              active={currentTab == 6}
              onClick={() => {
                setCurrent(6);
              }}
              label="REVIEW & SUBMIT"
            />
            <div
              className="amp_board"
              style={{
                width: "80%",
                fontSize: 12,
              }}
            >
              <div className="deco"></div>
              <div className="mainDef">
                <span id="lbb">
                  Africa Minigrids Program (AMP) - Grant Management Platform
                </span>
                <span>
                  Grant for Pilot Minigrids in Rural Communities And
                  Agricultural Value Chains Through a Public Private Partnership
                  (PPP) Model
                </span>
              </div>
            </div>
          </div>

          <div className="tab_main_container">
            <div className="tab_main_heading">{getHeaderText()}</div>
            {currentTab == 10 && (
              <Fade>
                <PreQualification moveToTab={moveToTab} />
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
                <Submit moveToTab={moveToTab} />
              </Fade>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
