import React from "react";
import "./styles/menucard.css";
import { Arrow2, FolderIcon } from "../../../assets/Svg/Index";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProgramId } from "../../../redux/program/programSlice";
import { setLotId } from "../../../redux/applicant/applicantSlice";

export default function MenuCards({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="menu-card-container">
      <div className="styler" />

      <div className="main_card_item">
        <div className="sponsors">
          <img src="alls.png" />
          <span>{data.name}</span>
        </div>
        <div className="main_card_item_container">
          <div className="more_item_detal">
            <span id="lb">Financier</span>
            <span>Global Environment Facility (GEF)</span>
          </div>

          <div className="more_item_detal">
            <span id="lb">UN Implementing Agency</span>
            <span>United Nations Development Programme (UNDP)</span>
          </div>

          <div className="more_item_detal">
            <span id="lb">National Implementing Partner</span>
            <span>Rural Electrification Agency (REA)</span>
          </div>

          <div className="more_item_detal">
            <span id="lb">Grant Amount</span>
            <span>$5.91 million</span>
          </div>

          <div className="more_item_detal">
            <span id="lb">Project Development CAPEX Grant</span>
            <span>$3.1 million</span>
          </div>

          <div className="more_item_detal">
            <span id="lb">Project Duration</span>
            <span>48 Months (Aug. 2022 - Aug. 2026)</span>
          </div>
        </div>

        <div id="guide">
          <Link
            onClick={(e) => {
              e.preventDefault();
              dispatch(setProgramId(data.id));

              navigate("/Programme");
            }}
          >
            Open Program
          </Link>
          <Arrow2 />
        </div>
      </div>
    </div>
  );
}
