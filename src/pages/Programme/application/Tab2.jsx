import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectCards from "../components/SelectCards";
import { useState } from "react";
import Modal from "react-modal";
import Button from "../../../components/Button";
import Warning from "../components/Tab5/notify";
import {
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

export default function Tab2({ moveToTab }) {
  const data = useSelector((state) => state);
  const [selectedSubLot, setSelectedSub] = useState([]);
  const [alertTex, setAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const [allLots, setAllLOts] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  
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
  const checkForSubLot = (name) => {
    // const newLot = [...data.applicant.applicant.lots];
    const filtered = selectedSubLot.filter((sl) => sl.name == name);

    if (filtered.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const dispatch = useDispatch();
  const getData = async () => {
    const respone = await query({
      method: "GET",
      url: `/api/applicant/application/get?program_id=${data.program.id}`,
      token: data.user.user.token,
    });

    if (respone.success) {
      console.log(respone.data.data.application.sublots, "llllllppp");
      if (respone.data.data.application.sublots.length) {
        respone.data.data.application.sublots.map(ct=>ct.category=ct.category_id)
       setStarted(true)
        setSelectedSub([...respone.data.data.application.sublots])
        setStarted(true)

        setTimeout(() => {
          setAlert("");
        }, 2000);
      }

      // setCurrent(data.data.application);
    }
  };
  function convertCategories(id) {
    
    if (categories.length == 0 || id == "" || undefined) {
      return "";
    }
    const name = categories[Number(id) - 1].name;

    return name;
  }
  useEffect(() => {
    getData();
    
    setAllLOts([...data.applicant.applicant.lots]);
  }, []);

  return (
    <div className="sublot_select">
      <Loading loading={loading} />
      <Alert text={alertTex} />
      <h2>Choose sublots to continue</h2>
      <Warning
        style={{
          width: "80%",
          marginBottom: 20,
        }}
        msg="Note: applicants are allowed to choose two sub lots per lot"
      />
      <Button
        onClick={() => setIsOpen(true)}
        label="Add Sub-Lot"
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
            text="Add Sub-Lot"
          />
          <div className="divider" />
          {allLots.length &&
            allLots.map((lts, ind) => (
              <>
                <RegularText text={lts.name} />
                {/* <h4>{convertCategories(lts.category)}</h4> */}
                <h4>{convertRegion(lts.region)}</h4>

                <table className="home_table">
                  {lts.subLots.length > 0 && (
                    <>
                      <thead>
                        <tr>
                          <th>S/N</th>
                          <th>Sub-Lot Name</th>
                          <th>Category</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lts.subLots.length &&
                          lts.subLots.map((lt, ind) => (
                            <tr key={ind.toString()}>
                              <td>{ind + 1}</td>
                              <td>{lt.name}</td>
                              <td>{convertCategories(lt.category)}</td>
                              <td>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <input
                                    onChange={(e) => {
                                      // if (!lt.choice) {
                                      //   setAlert("Please select a choice");
                                      //   e.target.checked = false;

                                      //   return;
                                      // }

                                      if (e.target.checked) {
                                        if (selectedSubLot.length == 4) {
                                          setAlert("Maximum selection reached");
                                          setTimeout(() => {
                                            setAlert("");
                                          }, 3000);
                                          e.target.checked = false;
                                          return;
                                        }
                                        setSelectedSub((prev) => [...prev, lt]);
                                      } else {
                                        const arrayToAdd =
                                          selectedSubLot.filter(
                                            (sl) => sl.name !== sl.name
                                          );
                                        setSelectedSub(arrayToAdd);
                                      }
                                    }}
                                    value={lt.name}
                                    type="checkbox"
                                    checked={checkForSubLot(lt.name)}
                                  />

                                  <Select
                                    onChange={(e) => {
                                      lt.choice = e.target.value;
                                    }}
                                    label="Choice"
                                    options={[
                                      { name: "First Choice", value: "1" },
                                      { name: "Second Choice", value: "2" },
                                      { name: "Third Choice", value: "3" },
                                      { name: "Fourth Choice", value: "4" },
                                    ]}
                                  />
                                  {checkForSubLot(lt.name)?<DeleteIcon onClick={()=>{
                                    const filtered=selectedSubLot.filter(sl=>sl.name!==lt.name)
                                    setSelectedSub(filtered)
                                  }}/>:null}
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </>
                  )}
                </table>
              </>
            ))}
        </div>
      </Modal>
      <h2>Previously Selected Sub-Lots</h2>
      {selectedSubLot.length == 0 && (
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <img id="empty" src="/38.png" />
          <span id="empty">No Selected Lots</span>
        </div>
      )}
       <table className="home_table">
              
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Sub-Lot Name</th>
                    <th>Category</th>
                    <th>Choice</th>
                  </tr>
                </thead>
                <tbody>
                {selectedSubLot.length &&
        selectedSubLot.map((lts, ind) => (
          <tr>
            
            {/* <RegularText text={lts.name} /> */}
            {/* <h4>{convertCategories(lts.category)}</h4> */}
            {/* <h4>{convertRegion(lts.region)}</h4> */}
           
                  < >
                    <td>{ind + 1}</td>
                    <td>{lts.name}</td>
                    <td>{convertCategories(lts.category)}</td>
                    <td>First Choice</td>
                  </>
                
            
          </tr>
        ))}

                </tbody>
                </table>
     

      <div className="save_next">
        <Button
          onClick={async () => {
            // if (started) {
            //   moveToTab(3);
            //   return
            // }
            const newSelected = [];
            selectedSubLot.map((sl, ind) => {
              newSelected.push({ id: `${ind + 1}`, name: sl.name });
            });
            const bodyData1 = {
              program_id: data.program.id,
              sublots: newSelected,
              update: started ? "1" : "0",
            };
            const bodyData2 = {
              program_id: data.program.id,
              sublots: newSelected,
              update: started ? "1" : "0",
              application_id: data.applicant.application.applicant_id,
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
              setAlert("Data Saved");
            } else {
              setAlert("Application failed, please try again");
            }
            setLoading(false);
            setTimeout(() => {
              setAlert("");
            }, 2000);
          }}
          style={{
            width: 200,
            marginRight: 20,
            backgroundColor: "#1094ff",
          }}
          label="Save"
        />

        <Button
          onClick={async () => {
            const newSelected = [];
            selectedSubLot.map((sl, ind) => {
              newSelected.push({ id: `${ind + 1}`, name: sl.name });
            });

            // if (started) {
            //   console.log(selectedSubLot)
            //   return
            // }

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
            width: 200,
          }}
          label="Next"
        />
      </div>
    </div>
  );
}
