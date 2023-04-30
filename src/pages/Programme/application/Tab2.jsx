import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectCards from "../components/SelectCards";
import { useState } from "react";
import Button from "../../../components/Button";
import Warning from "../components/Tab5/notify";
import {
  setApplication,
  setSubLots,
} from "../../../redux/applicant/applicantSlice";
import Alert from "../../../components/Alert";
import { RegularText } from "../../../components/Common";
import convertRegion from "../../../helpers/convertRegion";
import convertCategories from "../../../helpers/convertCatgories";
import query from "../../../helpers/query";
import Loading from "../../../components/Loading";

export default function Tab2({ moveToTab }) {
  const data = useSelector((state) => state);
  const [selectedSubLot, setSelectedSub] = useState([]);
  const [alertTex, setAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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
        msg="Note: You Can only choose four categories of sublots"
      />
      {data.applicant.applicant.lots.map((lts, ind) => (
        <div>
          <RegularText text={lts.name} />
          <h4>{convertCategories(lts.category)}</h4>
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
                  {lts.subLots.map((lt, ind) => (
                    <tr key={ind.toString()}>
                      <td>{ind + 1}</td>
                      <td>{lt.name}</td>
                      <td>{convertCategories(lt.category)}</td>
                      <td>
                        <input
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedSub((prev) => [...prev, lt]);
                            } else {
                              const arrayToAdd = selectedSubLot.filter(
                                (sl) => sl.name !== sl.name
                              );
                              setSelectedSub(arrayToAdd);
                            }
                          }}
                          value={lt.name}
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
      ))}

      <div className="save_next">
        <Button
          onClick={() => {
            console.log(selectedSubLot);
            dispatch(setSubLots(selectedSubLot));
            setAlert("Data Saved");
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
            const bodyData = {
              program_id: data.program.id,
              sublots: newSelected,
            };
            if (newSelected.length == 0) {
              setAlert("At least one sublot must be selected");
              setTimeout(()=>{
                setAlert('')
                          },2000)
              return;
            }
            setLoading(true);
            const response = await query({
              method: "POST",
              url: "/api/applicant/application/create/initial",
              token: data.user.user.token,
              bodyData,
            });
            if (response.success) {
              dispatch(setApplication(response.data.data.application));
             
              moveToTab(3);
            } else {
              setAlert("Application failed, please try again");
            }
            setLoading(false)
            setTimeout(()=>{
  setAlert('')
            },2000)
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
