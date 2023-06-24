import React, { useState } from "react";
import Warning from "../components/Tab5/notify";
import SelectCards from "../components/SelectCards";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button";
import { setLotId, setLots } from "../../../redux/applicant/applicantSlice";
import convertCategories from "../../../helpers/convertCatgories";
// import convertRegion from "../../../helpers/convertRegion";
import Alert from "../../../components/Alert";
import Modal from "react-modal";
import { useEffect } from "react";
import { FaWindowClose } from "react-icons/fa";
import { RegularText } from "../../../components/Common";
import { FcDeleteRow } from "react-icons/fc";
import { DeleteIcon } from "../../../assets/Svg/Index";
import query from "../../../helpers/query";

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
  const getData = async () => {
    const respone = await query({
      method: "GET",
      url: `/api/applicant/application/get?program_id=${data.program.id}`,
      token: data.user.user.token,
    });
    if (!respone.success) {
      return;
    }
    // if (respone.success) {
    //   if (
    //     respone.data.data.application.application_financials.financial_dept_info
    //       .length
    //   ) {
    //     dispatch(setActiveTab(6));
    //     return;
    //   } else if (respone.data.data.application.application_projects.length) {
    //     dispatch(setActiveTab(5));
    //     return;
    //   } else if (respone.data.data.application.application_documents.length) {
    //     dispatch(setActiveTab(4));
    //     return;
    //   } else if (respone.data.data.application.sublots.length) {
    //     dispatch(setActiveTab(3));
    //     setStarted(true);
    //     return;
    //   }
    //   dispatch(setActiveTab(1));
    // }
    console.log(respone, "juu");
    // setCurrent(data.data.application);
  };
  const checkForLot = (name) => {
    // const newLot = [...data.applicant.applicant.lots];
    const filtered = selectedLots.filter((sl) => sl.name == name);

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
    if (data.program.id == data.applicant.applicant.id) {
      setSelectedLots(data.applicant.applicant.lots);
    }
    if (!data.applicant.applicant.id) {
      setSelectedLots(data.applicant.applicant.lots);
    }
    setLots(data.applicant.applicant.lots);
  }, []);
  return (
    <>
      <Alert text={alertText} />

      {/* <Button
        onClick={() => setIsOpen(true)}
        label="Add Lot"
        style={{
          marginLeft: "auto",
          width: 100,
        }}
      /> */}

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
                            checked={checkForLot(lts.name)}
                          />
                          {checkForLot(lts.name) ? (
                            <DeleteIcon
                              onClick={() => {
                                const filtered = selectedLots.filter(
                                  (sl) => sl.name !== lts.name
                                );
                                setSelectedLots(filtered);
                              }}
                            />
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
            </table>
            <div
              style={{
                display: "flex",
                width: "50%",
                marginTop: 20,
                justifyContent: "space-between",
                marginLeft: "auto",
              }}
            >
              <Button
                onClick={() => {
                  setIsOpen(false);
                }}
                fontStyle={{
                  color: "var(--primary)",
                }}
                style={{
                  width: 134,
                  backgroundColor: "#fff",
                  border: "1px solid var(--primary)",
                }}
                label="Cancel"
              />
              <Button
                onClick={() => {
                  dispatch(setLots(selectedLots));
                  setIsOpen(false);
                }}
                label="Save"
              />
            </div>
          </div>
        </div>
      </Modal>

      <div
        style={{
          display: "flex",
          marginTop: 20,
        }}
      >
        <span>Lots -</span>
        <span
          onClick={() => setIsOpen(true)}
          style={{
            color: "var(--primary)",
            marginLeft: 20,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ADD NEW LOT
        </span>
      </div>
      <div
        style={{
          borderStyle: "dashed",
          height: 0.001,
          backgroundColor: "transparent",
          borderWidth: 0.1,
          width: "90%",
        }}
        className="divider"
      />
      <div className="app_lots_new">
        <table className="home_table">
          {selectedLots.length > 0 && (
            <thead>
              <tr>
                <th>S/N</th>
                <th>Lot Name</th>
                <th>Region</th>
              </tr>
            </thead>
          )}
          <tbody>
            {selectedLots.map((lts, ind) => {
              return (
                <tr key={ind.toString()}>
                  <td>{ind + 1}</td>
                  <td>{lts.name}</td>
                  <td>{convertRegion(lts.region)}</td>
                </tr>
              );
            })}
            {selectedLots.length == 0 && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 20,
                }}
              >
                <img id="empty" src="/38.png" />
                <span id="empty">No Selected Lots</span>
              </div>
            )}
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
          dispatch(setLotId(data.program.id));
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
