import React, { useState } from "react";
import Warning from "../components/Tab5/notify";
import SelectCards from "../components/SelectCards";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button";
import { setLots } from "../../../redux/applicant/applicantSlice";
import convertCategories from "../../../helpers/convertCatgories";
// import convertRegion from "../../../helpers/convertRegion";
import Alert from "../../../components/Alert";
import Modal from "react-modal";
import { useEffect } from "react";
import { FaWindowClose } from "react-icons/fa";
import { RegularText } from "../../../components/Common";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "90vh",
    minWidth: "50vw",
    overflowX: "hidden",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

export default function Tab1({ moveToTab }) {
  const data = useSelector((state) => state);
  const [selectedLots, setSelectedLots] = useState([]);
  const [alertText, setAlert] = useState("");
  const [started, setStarted] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
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
  function convertRegion(id) {
    const regions = data.applicant.regions;
    if (regions.length == 0 || id == "" || undefined) {
      return "";
    }
    const name = regions[Number(id) - 1].name;
  
    return name;
  }
  
  useEffect(() => {
    
    setLots(data.applicant.applicant.lots);
    setSelectedLots(data.applicant.applicant.lots)
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
        <Button
        onClick={() => setIsOpen(true)}
        label="Add Lot"
        style={{
          marginLeft: "auto",
          width: 100,
        }}
      />

      <Modal
        isOpen={modalIsOpen}
        appElement={document.getElementById("root")}
        style={customStyles}
      >
        <div style={{ position: "relative" }} className="inner_modal">
          

          <FaWindowClose
            onClick={() => {
              setIsOpen(false);
            }}
            style={{ fontSize: 30, cursor: "pointer", marginLeft: "auto" }}
          />
          <RegularText
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
            text="Add Lots"
          />
          <div className="divider" />
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
   

          </div>
          </Modal>
      {started && (
        <Button
          onClick={() => {
            setIsEdit(false);
            setSelectedLots([]);
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
      
      <h2>Previously Selected Lots</h2>
        <div className="app_lots_new">
          <table className="home_table">
          <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Lot Name</th>
                    <th>Region</th>

                  </tr>
                </thead>
                <tbody>
            {
             selectedLots.map((lts, ind) => {
              return (
                <tr key={ind.toString()}>
                  <td>{ind + 1}</td>
                  <td>{lts.name}</td>
                  <td>{convertRegion(lts.region)}</td>
                 
                </tr>
              )
            
             
            })
          }
          {
            selectedLots.length==0&&(
              <div
              style={{ width: "100%", display: "flex", flexDirection: "column" }}
            >
              <img id="empty" src="/38.png" />
              <span id="empty">No Selected Lots</span>
            </div>
            )
          }
          
            </tbody>
          </table>
        </div>
   

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
