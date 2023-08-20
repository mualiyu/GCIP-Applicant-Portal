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
import { Header, Subtitle } from "../../components/Common";
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
  const [current, setUserCurrent] = useState(null);
  const [startEd, setStarted] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [doneStage, setDoneStage] = useState({
    eligibility: 0,
    lot: 0,
    financial: 0,
    subLot: 0,
    technical: 0,
    pre_qualification: 0,
  });


  const dispatch = useDispatch();
  const moveToTab = (number) => {
    setRefresh((prev) => !prev);
    setCurrent(number);
  };

  const makeDoneStage = (stage) => {
    setDoneStage(stage);
  };

  const getHeaderText = () => {
    switch (currentTab) {
      case 1:
        return (
          <>
            <Subtitle text="Lots" />
            <span style={{color: 'red', fontSize: 11}}>
              Note: Applicants MUST select Two Categories of Lot
            </span>
          </>
        );

      case 2:
        return (
          <>
            <Subtitle text="Sub Lots" />
            <span style={{fontSize: 12, color: 'red'}}>
              Important: Applicants MUST select ONLY Two (2) Sub-Lots under each Lot category
            </span>
          </>
        );

      case 3:
        return (
          <>
            <Subtitle text="Eligibility Requirements" />
          </>
        );

      case 4:
        return (
          <>
            <Subtitle text="Technical Requirements" />
          </>
        );

      case 5:
        return (
          <>
            <Subtitle text="Financial Requirements" />
            <span>Provide information about company finances</span>
          </>
        );
      case 6:
        return (
          <>
            <Subtitle text="Review Application" />
          </>
        );
      case 10:
        return (
          <>
            <Subtitle text="Pre Qualification Document" />
          </>
        );

      default:
        <></>;
    }
  };

  const getData = async () => {
    const respone = await query({
      method: "GET",
      url: `/api/applicant/application/get-progress?program_id=${data.program.id}`,
      token: data.user.user.token,
    });

    if (respone.success) {
      setStarted(true);
      // console.log(respone, "lll");
      setDoneStage({
        eligibility: respone.data.data.eligibility_requirement.status,
        lot: respone.data.data.lots.status,
        financial: respone.data.data.financial_info.status,
        subLot: respone.data.data.sublots.status,
        technical: respone.data.data.technical_requirement.status,
        pre_qualification: respone.data.data.pre_qualification.status,
      });
    }
  };


  const getApplicationData = async () => {
    // nProgress.start();
    // setLoading(true);
    const { success, datax, error } = await query({
      method: "GET",
      url: `/api/applicant/application/get?program_id=${data?.program.id}`,
      token: data?.user.user.token,
    });
    // nProgress.done();
    // setLoading(false);
    if (success) {
      console.log(datax);
      setUserCurrent(datax?.data?.application);
    }
  };


  useEffect(() => {
    getData();
    getApplicationData();
  }, []);
  useEffect(() => {
    getData();
  }, [refresh]);
  return (
    <div className="application_container">
      <div className="program_header_head">
        <div className="program_main_label">
          <Header text="Applications" style={{ fontSize: 16 }} />
          <p>Application Status: 
            <span>
            {current?.status == null ? 'Draft Application' :  current?.status == 1 ? 'Submitted' : current?.status == 2 ? 'Queried' : current?.status == 3 ? 'Successful' : current?.status == 5 ? 'Under Review' : 'Unsuccessful'}
            </span></p>
        </div>

        <img src="/log.png" />
      </div>
      {currentTab == 0 && (
        <Fade>
          <Tab0 started={startEd} moveToTab={moveToTab} />
        </Fade>
      )}
      {currentTab !== 0 && (
        <div className="overall_tab_container">
          <div className="tab_side_container no-print">
            <Header text="APPLICATION" style={{ color: "var(--primary)" }} />
            <TabItem
              makeDone={makeDoneStage}
              label="PRE-QUALIFICATION DOCUMENTS"
              active={currentTab == 10}
              onClick={() => {
                setCurrent(10);
              }}
              accessed={doneStage.pre_qualification == 1}
            />
            <TabItem
              accessed={doneStage.lot == 1}
              active={currentTab == 1}
              onClick={() => {
                setCurrent(1);
              }}
              label="ADD LOTS"
            />
            <TabItem
              accessed={doneStage.subLot == 1}
              active={currentTab == 2}
              onClick={() => {
                setCurrent(2);
              }}
              label="SUB LOTS"
            />
            <TabItem
              accessed={doneStage.eligibility == 1}
              active={currentTab == 3}
              onClick={() => {
                setCurrent(3);
              }}
              label="ELIGIBILITY REQUIREMENTS"
            />
            <TabItem
              accessed={doneStage.technical == 1}
              active={currentTab == 4}
              onClick={() => {
                setCurrent(4);
              }}
              label="TECHNICAL REQUIREMENTS"
            />
            <TabItem
              accessed={doneStage.financial == 1}
              active={currentTab == 5}
              onClick={() => {
                setCurrent(5);
              }}
              label="FINANCIAL REQUIREMENTS"
            />
            <TabItem
              accessed={
                doneStage.eligibility == 1 &&
                doneStage.financial == 1 &&
                doneStage.lot == 1 &&
                doneStage.technical == 1 &&
                doneStage.lot == 1 &&
                doneStage.subLot == 1
              }
              active={currentTab == 6}
              onClick={() => {
                setCurrent(6);
              }}
              label="REVIEW & SUBMIT"
            />
            {/* <div
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
            </div> */}
          </div>

          <div className="tab_main_container">
            <div className="tab_main_heading">{getHeaderText()}</div>
            {currentTab == 10 && (
              <Fade>
                <PreQualification
                  accessed={doneStage.pre_qualification}
                  moveToTab={moveToTab}
                />
              </Fade>
            )}
            {currentTab == 1 && (
              <Fade>
                <Tab1 makeDone={makeDoneStage} moveToTab={moveToTab} />
              </Fade>
            )}
            {currentTab == 2 && (
              <Fade>
                <Tab2 makeDone={makeDoneStage} moveToTab={moveToTab} />
              </Fade>
            )}
            {currentTab == 3 && (
              <Fade>
                <ProfileDetail makeDone={makeDoneStage} moveToTab={moveToTab} />
              </Fade>
            )}
            {currentTab == 4 && (
              <Fade>
                <StaffDetail makeDone={makeDoneStage} moveToTab={moveToTab} />
              </Fade>
            )}

            {currentTab == 5 && (
              <Fade>
                <Financial makeDone={makeDoneStage} moveToTab={moveToTab} />
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
