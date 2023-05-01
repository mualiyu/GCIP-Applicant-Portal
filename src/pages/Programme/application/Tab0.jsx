import React, { useEffect } from 'react'
import Button from '../../../components/Button'
import { useState } from 'react'
import { useSelector } from 'react-redux';

export default function Tab0({moveToTab}) {
const [presentStage,setPresent]=useState([])
const data = useSelector((state) => state);

useEffect(()=>{
setPresent(data.program.program.stages)
console.log(data)
    },[])
  return (
    <div className='stages_select'>
    <table className="home_table">
        {presentStage.length > 0 && (
          <>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Application</th>
                <th>Sart Date</th>
                <th>End Date</th>
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
                    <div className="table_actions">
                      <Button onClick={()=>{
                          moveToTab(1)
                      }} label='Start Application'/>
                    </div>
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
