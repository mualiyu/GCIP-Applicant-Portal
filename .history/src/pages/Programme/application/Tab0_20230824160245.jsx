import React, { useEffect } from "react";
import Button from "../../../components/Button";
import { useState } from "react";
import query from "../../../helpers/query";
import { useSelector } from "react-redux";
import nProgress from "nprogress";
import Modal from "react-modal";
import { MoonLoader } from "react-spinners";
import { Header, RegularText } from "../../../components/Common";
import moment from "moment";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "50vh",
    minWidth: "40vw",
    overflowX: "hidden",
    maxWidth: "40vw",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

export default function Tab0({ moveToTab, started = false }) {
  const [presentStage, setPresent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addendumModal, setAddendumModal] = useState(true);
  const [current, setCurrent] = useState(null);
  const programData = useSelector((state) => state);

  const getApplicationData = async () => {
    nProgress.start();
    setLoading(true);
    const { success, data, error } = await query({
      method: "GET",
      url: `/api/applicant/application/get?program_id=${programData?.program.id}`,
      token: programData?.user.user.token,
    });
    nProgress.done();
    setLoading(false);
    if (success) {
      console.log(data);
      setCurrent(data?.data?.application);
    }
  };

  const getApplicationStatus = async () => {
    nProgress.start();
    setLoading(true);
    const { success, data, error } = await query({
      method: "GET",
      url: `/api/applicant/program/info/v2?programId=${programData?.program.id}`,
      token: programData?.user.user.token,
    });
    nProgress.done();
    setLoading(false);
    if (success) {
      console.log(data);
      // setApplicationStatus(data?.data?.application);
    }
  };

  useEffect(() => {
    setLoading(true);
    setPresent(programData.program.program.stages);
    getApplicationData();
    getApplicationStatus();
    setLoading(false);
    // console.log(programData);
  }, []);

  return (
    <div className="stages_select">
      {loading && (
        <MoonLoader
          size={25}
          cssOverride={{ position: "absolute", left: "50%", top: "50%" }}
        />
      )}
      <table className="home_table">
        {presentStage.length > 0 && (
          <>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Application</th>
                <th>Start Date</th>
                <th>Close Date</th>
                <th>Document</th>
                <th> Status </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {presentStage.map((prs, ind) => (
                <tr key={ind.toString()}>
                  <td>{ind + 1}</td>
                  <td>{prs.name}</td>
                  <td>{moment(prs.startDate).format("ll")}</td>
                  <td>{moment(prs.endDate).format("ll")}</td>
                  <td>
                    <a target="_blank" download href={prs.document}>
                      Download
                    </a>
                  </td>
                  <td>
                    {" "}
                    {current?.status == null
                      ? "Draft Application"
                      : current?.status == 1
                      ? "Submitted"
                      : current?.status == 2
                      ? "Queried"
                      : current?.status == 3
                      ? "Successful"
                      : current?.status == 5
                      ? "Under Review"
                      : "Unsuccessful"}
                  </td>
                  <td>
                    <div className="table_actions">
                      <Button
                        onClick={() => {
                          moveToTab(10);
                        }}
                        label={
                          started ? "Continue Application" : "Start Application"
                        }
                      />
                      {/* <Button
                        disabled
                        onClick={() => {
                          moveToTab(10);
                        }}
                        label="Closed"
                      /> */}
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td>2</td>
                <td>Request for grant</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>
                  <a href="#">Download</a>
                </td>
                <td>N/A</td>

                <td>
                  <div className="table_actions">
                    <Button
                      disabled
                      style={{ backgroundColor: "red" }}
                      onClick={() => {
                        moveToTab(1);
                      }}
                      label="Start Application"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </>
        )}
      </table>

      <Modal
        isOpen={addendumModal}
        appElement={document.getElementById("root")}
        style={customStyles}>
        <div
          className=""
          style={{
            display: "flex",
            flexDirection: "column",
          }}>
          <Header text="Reminder, Application deadline Approaching - 24 Hours to deadline" />
          <div className="" style={{ padding: 35 }}>
            <p style={{ lineHeight: "2em" }}>
              <ul>
                <li>
                  An important email has been sent to your email to your inbox
                  by our team regarding your application process. If you haven’t
                  seen it please check your inbox or spam folder.
                </li>
                <li>
                  The deadline for completing your application is rapidly
                  approaching. We strongly encourage you to complete it as soon
                  as possible, giving you more than 24 hours to ensure all the
                  necessary details are accurately filled out.
                </li>
              </ul>
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: "50%",
            marginTop: 20,
            justifyContent: "flex-end",
            marginLeft: "auto",
          }}>
          <Button
            onClick={() => {
              setAddendumModal(false);
            }}
            fontStyle={{
              color: "var(--primary)",
            }}
            style={{
              width: 134,
              backgroundColor: "#fff",
              border: "1px solid var(--primary)",
              marginRight: 15,
            }}
            label="Close"
          />
        </div>
      </Modal>
    </div>
  );
}
