import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectCards from "../components/SelectCards";
import { useState } from "react";
import Modal from "react-modal";
import Button from "../../../components/Button";
import { FaFolderOpen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import Warning from "../components/Tab5/notify";
import {
  setActiveTab,
  setApplication,
  setSubLots,
} from "../../../redux/applicant/applicantSlice";
import Alert from "../../../components/Alert";
import { RegularText } from "../../../components/Common";
// import convertRegion from "../../../helpers/convertRegion";
// import convertCategories from "../../../helpers/convertCatgories";
import query from "../../../helpers/query";
import Loading from "../../../components/Loading";
import { FaWindowClose } from "react-icons/fa";
import Select from "../../../components/Select";
import Input from "../../../components/Input";
import { DeleteIcon } from "../../../assets/Svg/Index";
import nProgress from "nprogress";
import { MoonLoader } from "react-spinners";

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
function arrayDifference(arr1, arr2) {
  const diff1 = arr1.filter((element) => !arr2.includes(element));
  const diff2 = arr2.filter((element) => !arr1.includes(element));
  return [diff1, diff2];
}
export default function Tab2({ moveToTab, makeDone }) {
  const data = useSelector((state) => state);
  const [selectedSubLot, setSelectedSub] = useState([]);
  const [alertTex, setAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(true);
  const [allLots, setAllLOts] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  const [lotRef, setLotRef] = useState([]);
  const [choiceOptions, setChoice] = useState([
    { name: "First Choice", value: "1" },
    { name: "Second Choice", value: "2" },
    { name: "Third Choice", value: "3" },
    { name: "Fourth Choice", value: "4" },
  ]);

  const categories = data.applicant.categories;
  const [started, setStarted] = useState(
    data.applicant.application.applicant_id ? true : false
  );
  function convertRegion(id) {
    const regions = data.applicant.regions;
    if (regions.length == 0 || id == "" || undefined) {
      return "";
    }
    const name = regions[Number(id) - 1].name;

    return name;
  }
  const checkForSubLot = (sub_lot, lot) => {
    if (selectedSubLot.length == 0) {
      return;
    }

    const filtered = selectedSubLot.filter(
      (sel) => sel.sublot_name == sub_lot && sel.lot_name == lot
    );

    // const isSameLot=newLot.filter(sl=>sl.lot_name==selectedSubLot[ind].lot_name)
    // console.log('meen',isSublot,selectedSubLot,isLot)

    if (filtered.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const dispatch = useDispatch();
  const getData = async () => {
    nProgress.start();
    setLoading2(true);
    query({
      method: "GET",
      url: `/api/applicant/application/get?program_id=${data.program.id}`,
      token: data.user.user.token,
    }).then((response) => {
      console.log(data, "lllll");
      nProgress.done();
      setLoading2(false);
      if (response.success) {
        console.log(
          response.data.data.application.application_sublots,
          "llllllppp"
        );
        if (response.data.data.application.sublots.length) {
          const initialChoice = [];
          response.data.data.application.sublots.map(
            (ct) => (ct.category = ct.category_id)
          );
          console.log(
            response.data.data.application.application_sublots,
            "lololo"
          );
          setStarted(true);
          setSelectedSub([
            ...response.data.data.application.application_sublots,
          ]);
          setLotRef([...response.data.data.application.application_sublots]);
          setStarted(true);
          response.data.data.application.application_sublots.map((sub) => {
            initialChoice.push({
              value: `${sub.choice}`,
              name: convertChoice(sub.choice),
              sublot_id: sub.sublot_id,
            });
          });
          const difference = choiceOptions.filter(
            (obj1) => !initialChoice.some((obj2) => obj2.value === obj1.value)
          );
          console.log(initialChoice, "popop");
          setChoice(difference);
          setTimeout(() => {
            setAlert("");
          }, 2000);
        }

        // setCurrent(data.data.application);
      }
    });
  };
  function convertCategories(id) {
    if (categories.length == 0 || id == "" || undefined) {
      return "";
    }
    const name = categories[Number(id) - 1].name;

    return name;
  }
  const returnChoice = (sublot_name, selected, lot) => {
    console.log(sublot_name, selected, "mkmmkkmkk");
    const filtered = selected.filter(
      (sl) => sl.sublot_name == sublot_name && sl.lot_name == lot
    );
    if (filtered.length > 0) {
      return filtered[0].choice;
    } else {
      return undefined;
    }
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const newData = [];

    data.applicant.applicant.lots.map((dt) => {
      const temSub = [];

      dt.subLots.map((sbl) => {
        temSub.push({
          sublot_name: sbl.name,
          category: sbl.category,
          sublot_id: sbl.id,
          lot_name: dt.name,
          choice: returnChoice(sbl.name, selectedSubLot, dt.name),
        });
      });
      console.log(temSub, "0909");
      newData.push({
        name: dt.name,
        region: dt.region,
        category: dt.category,
        subLots: temSub,
      });
    });

    setAllLOts(newData);
  }, [selectedSubLot]);

  const convertChoice = (choice) => {
    switch (choice) {
      case "1":
        return "First Choice";
      case "2":
        return "Second Choice";
      case "3":
        return "Third Choice";
      case "4":
        return "Fourth Choice";

      default:
        "Frst choice";
    }
  };

  const convertRef = (name) => {};

  return (
    <div className="sublot_select">
      <Loading loading={loading} />
      <Alert text={alertTex} />

      <Modal
        isOpen={modalIsOpen}
        appElement={document.getElementById("root")}
        style={customStyles}
      >
        <div style={{ position: "relative" }} className="inner_modal">
          <Alert text={alertTex} />
          {/* <FaWindowClose
            onClick={() => {
              setIsOpen(false);
            }}
            style={{ fontSize: 30, cursor: "pointer", marginLeft: "auto" }}
          /> */}
          <RegularText
            style={{
              textAlign: "left",
              fontWeight: "900",
              textTransform: "uppercase",
              fontSize: 18,
            }}
            text="Add Sub-Lot"
          />

          {/* <div className="divider" /> */}
          {allLots.length &&
            allLots.map((lts, index) => (
              <>
                <RegularText text={lts.name} />
                {/* <h4>{convertCategories(lts.category)}</h4> */}
                <h4>{convertRegion(lts.region)}</h4>

                <table className="home_table">
                  {lts.subLots.length > 0 && (
                    <>
                      <thead>
                        <tr>
                          <th>Sub-Lot Name</th>
                          <th>Category</th>
                          <th></th>
                          {/* <th>Actions</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {lts.subLots.length &&
                          lts.subLots.map((lt, ind) => (
                            <tr key={ind.toString()}>
                              <td>{lt.sublot_name}</td>
                              <td>{convertCategories(lt.category)}</td>
                              <td>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <Select
                                    onChange={(e) => {
                                      const check = selectedSubLot.filter(
                                        (ck) =>
                                          ck.sublot_name == lt.sublot_name &&
                                          ck.lot_name == lts.name
                                      );
                                      if (check.length) {
                                        setAlert("You Cant select multiple");
                                        setTimeout(() => {
                                          setAlert("");
                                        }, 3000);
                                        return;
                                      }

                                      lt.choice = e.target.value;
                                      if (!e.target.value) {
                                        return;
                                      }
                                      if (e.target.value) {
                                        if (selectedSubLot.length == 4) {
                                          setAlert("Maximum selection reached");
                                          setTimeout(() => {
                                            setAlert("");
                                          }, 3000);

                                          return;
                                        }

                                        console.log(e.target.value);
                                        setSelectedSub((prev) => [
                                          ...prev,
                                          {
                                            sublot_name: lt.sublot_name,
                                            lot_name: lts.name,
                                            choice: lt.choice,
                                            sublot_id: lt.sublot_id
                                              ? lt.sublot_id
                                              : Date.now(),
                                          },
                                        ]);
                                        const filtereOptions =
                                          choiceOptions.filter(
                                            (choice) =>
                                              choice.value !== e.target.value
                                          );
                                        console.log(filtereOptions, "0099");
                                        setChoice(filtereOptions);
                                      }
                                    }}
                                    label=""
                                    style={{ width: "200px" }}
                                    options={choiceOptions}
                                  />
                                </div>
                              </td>
                              <td>{convertChoice(lt.choice)}</td>
                            </tr>
                          ))}
                      </tbody>
                    </>
                  )}
                </table>
              </>
            ))}
          <div
            style={{ width: "50%", display: "flex", alignItems: "flex-end" }}
          >
            <Button
              onClick={() => setIsOpen(false)}
              label="cancel"
              fontStyle={{
                color: "var(--primary)",
              }}
              style={{
                width: 100,
                marginRight: 20,
                backgroundColor: "#fff",
                border: "1.5px solid var(--primary)",
                opacity: selectedSubLot.length == 0 ? 0.5 : 1,
              }}
            />
            <Button
              onClick={() => setIsOpen(false)}
              style={{ width: 100, marginTop: 20 }}
              label="Save"
            />
          </div>
        </div>
      </Modal>

      {loading2 && (
        <MoonLoader
          size={25}
          cssOverride={{ position: "absolute", left: "50%", top: "50%" }}
        />
      )}
      {selectedSubLot.length == 0 && !loading2 && (
        <>
          <div
            style={{
              width: "100%",
              // display: "flex",
              marginTop: "15%",
              textAlign: "center",
              flexDirection: "column",
              marginTop: 20,
            }}
          >
            <FaFolderOpen />
            <span id="empty">
              {" "}
              Oops! Nothing here.{" "}
              <span
                onClick={() => setIsOpen(true)}
                style={{
                  color: "var(--primary)",
                  marginLeft: 20,
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Select New Sub Lot?
              </span>{" "}
            </span>
          </div>

          <div
            style={{
              width: "100%",
              textAlign: "center",
              flexDirection: "column",
              marginTop: "7%",
            }}
          >
            {/* <span id="empty">No Selected Sub-Lots</span> */}
          </div>
        </>
      )}
      {selectedSubLot.length > 0 && (
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: "13px",
          }}
        >
          <span>Sub Lots -</span>
          <span
            onClick={() => setIsOpen(true)}
            style={{
              color: "var(--primary)",
              marginLeft: 20,
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            SELECT SUB LOT
          </span>
        </div>
      )}
      {/* <div
        style={{
          borderStyle: "dashed",
          height: 0.001,
          backgroundColor: "transparent",
          borderWidth: 0.1,
          width: "90%",
        }}
        className="divider"
      /> */}
      {selectedSubLot.length > 0 && !loading2 && (
        <>
          <table className="home_table">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Sub-Lot Name</th>
                {/* <th>Category</th> */}
                <th>Choice</th>
                <th>Lot</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedSubLot.map((lts, ind) => (
                <tr>
                  <>
                    <td>{ind + 1}</td>
                    <td>{lts.sublot_name}</td>
                    {/* <td>{convertCategories(lts.category)}</td> */}
                    <td>
                      {lts.choice ? convertChoice(lts.choice) : "First Choice"}
                    </td>
                    <td>{lts.lot_name}</td>
                    <td>
                      <FaTrash
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          const filtered = selectedSubLot.filter(
                            (fil, index) => ind !== index
                          );
                          setSelectedSub(filtered);
                          setChoice((prev) => [
                            ...prev,
                            {
                              name: convertChoice(lts.choice),
                              value: lts.choice,
                            },
                          ]);
                        }}
                      />
                    </td>
                  </>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {!loading2 && (
        <div className="save_next">
          <Button
            onClick={async () => {
              const newSelected = [];
              selectedSubLot.map((sl, ind) => {
                newSelected.push({
                  id: `${ind + 1}`,
                  name: sl.name,
                  choice: sl.choice,
                });
              });

              // if (started) {
              //   console.log(selectedSubLot)
              //   return
              // }

              const bodyData1 = {
                program_id: data.program.id,
                sublots: selectedSubLot,
                update: started ? "1" : "0",
              };
              const bodyData2 = {
                program_id: data.program.id,
                sublots: selectedSubLot,
                update: "0",
                application_id: data.applicant.application.id,
              };
              if (newSelected.length == 0) {
                setAlert("At least one sublot must be selected");
                setTimeout(() => {
                  setAlert("");
                }, 2000);
                return;
              }
              setLoading(true);
              const response = await query({
                method: "POST",
                url: "/api/applicant/application/create/initial",
                token: data.user.user.token,
                bodyData: started ? bodyData2 : bodyData1,
              });
              if (response.success) {
                dispatch(setApplication(response.data.data.application));

                // moveToTab(3);
              } else {
                setAlert("Application failed, please try again");
              }
              setLoading(false);
              setTimeout(() => {
                setAlert("");
              }, 2000);
            }}
            fontStyle={{
              color: "var(--primary)",
            }}
            style={{
              width: 100,
              marginRight: 20,
              backgroundColor: "#fff",
              border: "1.5px solid var(--primary)",
              opacity: selectedSubLot.length == 0 ? 0.5 : 1,
            }}
            label="Save"
            disabled={selectedSubLot.length == 0}
          />

          <Button
            disabled={selectedSubLot.length == 0}
            onClick={async () => {
              const newSelected = [];
              selectedSubLot.map((sl, ind) => {
                newSelected.push({
                  id: sl.sublot_id,
                  name: sl.sublot_name,
                  choice: sl.choice,
                });
              });

              // if (started) {
              //   console.log(selectedSubLot)
              //   return
              // }
              console.log(newSelected, "lll");

              const bodyData1 = {
                program_id: data.program.id,
                sublots: newSelected,
                update: started ? "1" : "0",
              };
              const bodyData2 = {
                program_id: data.program.id,
                sublots: newSelected,
                update: started ? "1" : "0",
                application_id: data.applicant.application.id,
              };
              if (newSelected.length == 0) {
                setAlert("At least one sublot must be selected");
                setTimeout(() => {
                  setAlert("");
                }, 2000);
                return;
              }
              setLoading(true);
              const response = await query({
                method: "POST",
                url: "/api/applicant/application/create/initial",
                token: data.user.user.token,
                bodyData: started ? bodyData2 : bodyData1,
              });
              if (response.success) {
                dispatch(setApplication(response.data.data.application));
                dispatch(
                  setActiveTab(
                    data.applicant.activeTab > 2 ? data.applicant.activeTab : 2
                  )
                );
                makeDone(3);
                moveToTab(3);
              } else {
                setAlert("Application failed, please try again");
              }
              setLoading(false);
              setTimeout(() => {
                setAlert("");
              }, 2000);
            }}
            style={{
              width: 100,
              opacity: selectedSubLot.length == 0 ? 0.5 : 1,
            }}
            label="Next"
          />
        </div>
      )}
    </div>
  );
}
