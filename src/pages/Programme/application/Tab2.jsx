import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectCards from '../components/SelectCards';
import { useState } from 'react';
import Button from '../../../components/Button';
import Warning from '../components/Tab5/notify';
import {setSubLots} from '../../../redux/applicant/applicantSlice'
import Alert from '../../../components/Alert';
import { RegularText } from '../../../components/Common';
import convertRegion from '../../../helpers/convertRegion';
import convertCategories from '../../../helpers/convertCatgories';

export default function Tab2({moveToTab}) {
const data = useSelector((state) => state);
const [selectedSubLot,setSelectedSub]=useState([])
const [alertTex,setAlert]=useState('')
const dispatch=useDispatch()

useEffect(()=>{
console.log(data)
},[])
  return (
    <div className='sublot_select'>
    <Alert text={alertTex}/>
    <h2>Choose sublots to continue</h2>
      <Warning
        style={{
          width: "80%",
          marginBottom: 20,
        }}
        msg="Note: You Can only choose four categories of sublots"
      />
     {
         data.applicant.applicant.lots.map((lts,ind)=>(
             <div>
                <RegularText text={lts.name}/>
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
                  <input onChange={(e)=>{
                     if (e.target.checked) {
                      setSelectedSub((prev) => [...prev, lt]);
                    } else {
                      const arrayToAdd = selectedSubLot.filter(
                        (sl) => sub.name !== sl.name
                      );
                      setSelectedSub(arrayToAdd);
                    }
                 }} value={lt.name} type='checkbox'/>
                  </td>
                  
                  
                </tr>
              ))}
            </tbody>
          </>
        )}
      </table>
                
             </div>
         ))
     }

<div className="save_next">
        <Button
          onClick={() => {
              console.log(selectedSubLot)
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
          onClick={() => {
            dispatch(setSubLots(selectedSubLot));
            moveToTab(3);
          }}
          style={{
            width: 200,
          }}
          label="Next"
        />
      </div>
    </div>
  )
}
