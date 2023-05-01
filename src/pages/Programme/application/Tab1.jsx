import React, { useState } from "react";
import Warning from "../components/Tab5/notify";
import SelectCards from "../components/SelectCards";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button";
import { setLots } from "../../../redux/applicant/applicantSlice";
import convertCategories from "../../../helpers/convertCatgories";
import convertRegion from "../../../helpers/convertRegion";
import Alert from "../../../components/Alert";
import { useEffect } from "react";

export default function Tab1({ moveToTab }) {
  const data = useSelector((state) => state);
  const [selectedLots, setSelectedLots] = useState([]);
  const [alertText, setAlert] = useState("");
  const [started, setStarted] = useState(
    data.applicant.application.applicant_id ? true : false
  );
  const [isEdit,setIsEdit]=useState(true)
  const [isDisabled, setIsdisabled] = useState(false);
  const dispatch = useDispatch();
  const checkForLot = (name) => {
    const newLot = [...data.applicant.applicant.lots];
    const filtered = newLot.filter((sl) => sl.name == name);

    if (filtered.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    setLots(data.applicant.applicant.lots);
  }, []);
  return (
    <>
      <Alert text={alertText} />
      <h2>Choose lots to continue</h2>
      <Warning
        style={{
          width: "80%",
          marginBottom: 20,
        }}
        msg="Note: applicants are allowed to choose two categories of lots"
      />
      {started && (
        <Button 
        onClick={()=>{
          setIsEdit(false)
          setSelectedLots([])
        }}
          style={{
            width: 200,
            marginLeft: "auto",
            backgroundColor: "#3e4bff",
            marginTop: 20,
            marginBottom: 20,
          }}
          label="Edit Lots"
        />
      )}
      {
        !isEdit&&(
          <div className="app_lots_new">
        <table className="home_table">
          {data.program.program.lots.length > 0 && (
            <>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Lot Name</th>
                  <th>Region</th>

                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.program.program.lots.map((lts, ind) => (
                  <tr key={ind.toString()}>
                    <td>{ind + 1}</td>
                    <td>{lts.name}</td>
                    <td>{convertRegion(lts.region)}</td>
                    <td>
                      <input
                        checked={checkForLot(lts.name)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            if (selectedLots.length == 2) {
                              setAlert("Maximum selection reached");
                              setTimeout(() => {
                                setAlert("");
                              }, 3000);
                              e.target.checked = false;
                              return;
                            }

                            setSelectedLots((prev) => [...prev, lts]);
                          } else {
                            const arrayToAdd = selectedLots.filter(
                              (sl) => lts.name !== sl.name
                            );
                            setSelectedLots(arrayToAdd);
                          }
                        }}
                        value={lts.name}
                        type="checkbox"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
      </div>
        )
      }
      {
        isEdit&&(
          <div className="app_lots_new">
        <table className="home_table">
          {data.program.program.lots.length > 0 && (
            <>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Lot Name</th>
                  <th>Region</th>

                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.program.program.lots.map((lts, ind) => (
                  <tr key={ind.toString()}>
                    <td>{ind + 1}</td>
                    <td>{lts.name}</td>
                    <td>{convertRegion(lts.region)}</td>
                    <td>
                      <input
                       
                        onChange={(e) => {
                          if (e.target.checked) {
                            if (selectedLots.length == 2) {
                              setAlert("Maximum selection reached");
                              setTimeout(() => {
                                setAlert("");
                              }, 3000);
                              e.target.checked = false;
                              return;
                            }

                            setSelectedLots((prev) => [...prev, lts]);
                          } else {
                            const arrayToAdd = selectedLots.filter(
                              (sl) => lts.name !== sl.name
                            );
                            setSelectedLots(arrayToAdd);
                          }
                        }}
                        value={lts.name}
                        type="checkbox"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
      </div>
        )
      }

      <Button
        onClick={() => {
          if (selectedLots.length == 0) {
            setAlert("At least one lot must be selected");
            setTimeout(() => {
              setAlert("");
            }, 3000);
            return;
          }
          dispatch(setLots(selectedLots));
          moveToTab(2);
        }}
        style={{
          width: 100,
          marginLeft: "auto",
          marginTop: 20,
        }}
        label="Continue"
      />
    </>
  );
}
