import React, { useEffect } from "react";
import Button from "../../../components/Button";
import { useState } from "react";
import { useSelector } from "react-redux";
import nProgress from "nprogress";
import { MoonLoader } from "react-spinners";

export default function Tab0({ moveToTab, started = false }) {
  const [presentStage, setPresent] = useState([]);
  const [loading, setLoading] = useState(false);

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
                <th>Sart Date</th>
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
                  <td>{prs.startDate}</td>
                  <td>{prs.endDate}</td>
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
                <td>Request of grant</td>
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
    </div>
  );
}
