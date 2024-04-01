import React, { useEffect } from "react";
import "../styles/home.css";
import MenuCards from "../Programme/components/MenuCards";
import SkeletonLoader from "../../components/SkeletonLoader";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { Header } from "../../components/Common";
import { FcCheckmark, FcDeleteDatabase, FcDeleteRow } from "react-icons/fc";
import {
  FaArrowRight,
  FaEdit,
  FaTrash,
  FaPencilAlt,
  FaUser,
} from "react-icons/fa";
import { useState } from "react";
import query from "../../helpers/query";
import { useDispatch, useSelector } from "react-redux";
import { setProgram } from "../../redux/program/programSlice";
import Loading from "../../components/Loading";
import { MoonLoader } from "react-spinners";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [allPrograms, setAllPrograms] = useState([]);
  const programData = useSelector((state) => state);
  const [toggled, setToggled] = useState(false);
  const dispatch = useDispatch();
  const getAllPrograms = async () => {
    const { success, data, error } = await query({
      method: "GET",
      url: "/api/applicant/program/list",
      token: programData.user.user.token,
    });
    setLoading(false);

    if (success) {
      console.log(data.data);
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
        <Loading loading={loading2} />
        <div className="home_top" style={{ width: "90%" }}>
          <Header className="header" text="Open Programs" />
          {/* <img id="bg" src="./log.png" alt="m" /> */}
        </div>

        <div className="programs-list">
          {allPrograms.length > 0 &&
            allPrograms.map((prg, ind) => <MenuCards data={prg} key={ind} />)}
        </div>
        {loading && (
          <MoonLoader
            size={25}
            cssOverride={{ position: "absolute", left: "50%", top: "50%" }}
          />
        )}

        {allPrograms.length === 0 && !loading && (
          <p>Oops! Nothing here yet...</p>
        )}
        {/* <div className="deco"></div> */}
        {/* <div className="amp_board" style={{ width: '25%', position: 'absolute'}}>
          <div className="deco"></div>
          <div className="mainDef">
            <span id="lbb">Africa Minigrids Program (AMP) - 
Grant Management Platform</span>
<span>Grant for Pilot Minigrids in Rural Communities And Agricultural Value Chains Through a Public Private Partnership (PPP) Model</span>
          </div>
        </div> */}
      </div>
    </Fade>
  );
}
