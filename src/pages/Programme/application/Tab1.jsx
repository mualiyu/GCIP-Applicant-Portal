import React, { useState } from "react";
import Warning from "../components/Tab5/notify";
import SelectCards from "../components/SelectCards";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button";
import { setLots } from "../../../redux/applicant/applicantSlice";

export default function Tab1({ moveToTab }) {
  const data = useSelector((state) => state);
  const [selectedLots, setSelectedLots] = useState([]);
  const dispatch = useDispatch();
  return (
    <>
      <h2>Choose lots to continue</h2>
      <Warning
        style={{
          width: "80%",
          marginBottom: 20,
        }}
        msg="Note: You Can only choose two categories of lots"
      />
      <div className="app_lots_new">
        {/* {data.program.program.lots.map((lt, ind) => (
          <SelectCards
            onClick={() => {
              if (selectedLots.length == 0) {
                setSelectedLots((prev) => [...prev, lt]);
                return;
              }
              const filtered = selectedLots.filter((sl) => lt.name == sl.name);
              if (filtered.length == 0) {
                setSelectedLots((prev) => [...prev, lt]);
              } else {
                const arrayToAdd = selectedLots.filter(
                  (sl) => lt.name !== sl.name
                );
                setSelectedLots(arrayToAdd);
              }
            }}
            key={ind}
            data={lt}
          />
        ))} */}
        {
            data.program.program.lots.map((lts,index)=>(
                <div className="check_lot">
                 <input onChange={(e)=>{
                     if (e.target.checked) {
                        setSelectedLots((prev) => [...prev, lts]);
                         
                     }else{
                        const arrayToAdd = selectedLots.filter(
                            (sl) => lts.name !== sl.name
                          );
                          setSelectedLots(arrayToAdd); 
                     }
                 }} value={lts.name} type='checkbox'/>
                 <h3>{lts.name}</h3>
                
                 </div>

            ))
        }

      </div>

      <Button
        onClick={() => {
            
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
