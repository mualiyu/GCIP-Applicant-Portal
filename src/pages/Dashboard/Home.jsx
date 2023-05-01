import React, { useEffect } from "react";
import "../styles/home.css";
import MenuCards from '../Programme/components/MenuCards'
import SkeletonLoader from "../../components/SkeletonLoader";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { FcCheckmark, FcDeleteDatabase, FcDeleteRow } from "react-icons/fc";
import { FaArrowRight, FaEdit, FaTrash, FaUser } from "react-icons/fa";
import { useState } from "react";
import query from "../../helpers/query";
import { useDispatch, useSelector } from "react-redux";
import { setProgram } from "../../redux/program/programSlice";
import Loading from "../../components/Loading";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [allPrograms, setAllPrograms] = useState([]);
  const programData = useSelector((state) => state);
  const [toggled,setToggled]=useState(false)
  const dispatch=useDispatch()
  const getAllPrograms = async () => {
    const { success, data, error } = await query({
      method: "GET",
      url: "/api/applicant/program/list",
      token: programData.user.user.token,
    });
    setLoading(false);
    
    if (success) {
      setAllPrograms(data.data.programs);
    }
  };
  useEffect(() => {
    getAllPrograms();
    
  }, []);
  const navigate = useNavigate();
  return (
    <Fade>
      <div className="home_container">
        <Loading loading={loading2}/>
        <div className="home_top" style={{ width: "90%" }}>
          <img id="bg" src="bg.png" alt="m" />
          <div onClick={()=>{
            setToggled(prev=>!prev)
          }} className={`home_user ${toggled?"active":null}`} >
            <FaUser />
            <span>{programData.user.user.name}</span>
            <div className="home_drop">
              <Button onClick={ async () => {

            setLoading2(true);
            const {success,data} = await query({
              method: "POST",
              url: "/api/applicant/logout",
              bodyData: {},
              token:programData.user.user.token
            });
           
            setLoading2(false)

            if (success) {
              navigate('/')
            }
          }} label="logout"/>
            </div>
          </div>
        </div>
        <h2>Open Programs</h2>
        <div className="divider"/>
        <div className="programs-list">
          {
            allPrograms.length>0&&
            allPrograms.map((prg,ind)=>(
              <MenuCards data={prg} key={ind}/>
            ))
          }
          
         
        </div>
        {/* <table className="home_table_main">
          {allPrograms.length > 0 && (
            <>
              <thead>
                <tr>
                  <th>Program</th>
                  <th>Active Stage</th>
                  <th>Total Applicants</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allPrograms.map((prg, ind) => (
                  <tr key={ind.toString()}>
                    <td>{prg.name}</td>
                    <td>
                      <span>
                        {prg.activeStage.name} <FcCheckmark />
                      </span>
                    </td>
                    <td>{prg.noApplicants} Applicants</td>
                    <td>
                      <div className="table_actions">
                        <FaArrowRight
                          onClick={() => {
                            
                            navigate(`/Programme/home/${prg.id}`)
                          }}
                          style={{
                            backgroundColor: "#9b9b9b16",
                            height: 15,
                            width: 15,
                            borderRadius: 20,
                            padding: 10,
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table> */}
        {loading&&(
          <img src="loading.gif" id="loader"/>
        )}
       
      </div>
    </Fade>
  );
}
