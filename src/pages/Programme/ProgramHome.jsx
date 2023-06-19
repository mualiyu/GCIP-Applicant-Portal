import React, { useRef } from "react";
import "../styles/program.css";
import MenuCards from "./components/MenuCards";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/Input";
import { Editor } from "@tinymce/tinymce-react";
import { Header, RegularText } from "../../components/Common";
import { useState } from "react";
import Tab1 from "./components/Tab1";
import Tab2 from "./components/Tab2";
import Tab5 from "./components/Tab5/Tab5";
import Tab3 from "./components/Tab3";
import Tab4 from "./components/Tab4";
import Overview from "./components/Overview";
import { Fade } from "react-awesome-reveal";
import Tab6 from "./components/Tab6";
import Application from "./Application";
import { useEffect } from "react";
import query from "../../helpers/query";
import { useDispatch, useSelector } from "react-redux";
import { setProgram } from "../../redux/program/programSlice";
import {
  setApplication,
  setCategories,
  setRegions,
} from "../../redux/applicant/applicantSlice";

const tabFields = [
  "General",
  "Lots",
  "Stages",
  "Requirements",
  "Documents",
  "Status",
  "Milestone & Claims",
  "Overview",
];
export default function ProgramHome() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const programData = useSelector((state) => state);
  const dispatch = useDispatch();
  const { active } = useParams();
  const [isComplete, setIsComplete] = useState(Number(active) > 0 ? 7 : 0);

  const moveToTab = (number) => {
    setActiveTab(number);
    setIsComplete(number);
  };
  // const convertCategory = (id) => {
  //   if (categories.length == 0 || id == "") {
  //     return;
  //   }
  //   const filtered = categories.filter((cat) => cat.value == id);
  //   const name = filtered[0].name;
  //   return name;
  // };
  // const convertRegion = (id) => {
  //   if (regions.length == 0 || id == "" || undefined) {
  //     return "";
  //   }
  //   const name = regions[Number(id) - 1].name;

  //   return name;
  // };
  const getRegions = async () => {
    const { success, data, error } = await query({
      method: "GET",
      url: "/api/applicant/regions",
      token: programData.user.user.token,
    });

    if (success) {
      const regionsArray = [];
      data.data.regions.map((reg) =>
        regionsArray.push({ name: reg.name, value: reg.id })
      );
      dispatch(setRegions(regionsArray));
    }
  };
  const getCategories = async () => {
    const { success, data, error } = await query({
      method: "GET",
      url: "/api/applicant/category/list",
      token: programData.user.user.token,
    });
    console.log(data);
    if (success) {
      const catsArray = [];
      data.data.categories.map((cat) =>
        catsArray.push({ name: cat.name, value: cat.id })
      );

      dispatch(setCategories(catsArray));
    }
  };

  const getData = async () => {
    const { success, data, error } = await query({
      method: "GET",
      url: `/api/applicant/application/get?program_id=${programData.program.id}`,
      token: programData.user.user.token,
    });

    if (success) {
      if (data.data.application.applicant_id) {
        console.log(data.data.application, "pppp");
        dispatch(
          setApplication({
            applicant_id: data.data.application.applicant_id,
            program_id: programData.program.id,
            id: data.data.application.id,
          })
        );
      }
      // setCurrent(data.data.application);
    } else {
      dispatch(
        setApplication({
          applicant_id: "",
          program_id: "",
          id: "",
        })
      );
    }
  };

  useEffect(() => {
    getRegions();
    getCategories();
    getData();
  }, []);
  return (
    <div className="program_home_container">
      <div className="program_header_head">
        <div className="program_main_label">
          <Header text="Program Home" />
          <span>
            blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum
            eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in
            purus lobortis eleifend. Sed nec ante dictum sem condimentum
            ullamcorper quis venenatis nisi. Proin{" "}
          </span>
        </div>

        <img src="log.png" />
      </div>

      <Fade>
        <Tab1 moveToTab={moveToTab} />
      </Fade>
    </div>
  );
}
