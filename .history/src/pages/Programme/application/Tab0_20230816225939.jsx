import React, { useEffect } from "react";
import Button from "../../../components/Button";
import { useState } from "react";
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
    maxHeight: "90vh",
    minWidth: "60vw",
    overflowX: "hidden",
    maxWidth: "70vw",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};


export default function Tab0({ moveToTab, started = false }) {
  const [presentStage, setPresent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addendumModal, setAddendumModal] = useState(true);

  const data = useSelector((state) => state);

  useEffect(() => {
    setLoading(true);
    setPresent(data.program.program.stages);

    setLoading(false);
    console.log(data);
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {presentStage.map((prs, ind) => (
                <tr key={ind.toString()}>
                  <td>{ind + 1}</td>
                  <td>{prs.name}</td>
                  <td>{moment(prs.startDate).format('ll')}</td>
                  <td>{ moment(prs.endDate).format('ll')}</td>
                  <td>
                    <a target="_blank" download href={prs.document}>
                      Download
                    </a>
                  </td>

                  <td>
                    <div className="table_actions">
                      <Button
                        onClick={() => {
                          //  console.log(prs)
                          moveToTab(10);
                        }}
                        label={
                          started ? "Continue Application" : "Start Application"
                        }
                      />
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
        style={customStyles}
      >
          <div
            className=""
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Header text="Addendum" />
            <div className="">
             <p style={{lineHeight: '2em'}}>
             Thank you for your interest in the UNDP-GEF Africa Minigrids Program (AMP). Your application has been submitted successfully. <span style={{fontWeight: 900}}>Your application will be opened in a hybrid physical-virtual ceremony at 1.00pm (WAT) on Thursday 17th August 2023.   </span>

<br/> <br/>The virtual link is attached in the confirmation email sent to you.

For further enquiry, kindly drop a message on the platform. Thank you!
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
                }}
              >
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
                  label="Ok Close"
                />
              </div>


      </Modal>




    </div>
  );
}
