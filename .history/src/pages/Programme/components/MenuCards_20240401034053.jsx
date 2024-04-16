import React from "react";
import "./styles/menucard.css";
import moment from "moment";
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
          <span style={{ textTransform: "uppercase", fontWeight: 900 }}>
            {data.name}
          </span>
        </div>
        <div className="main_card_item_container">
          <section className="flex" style={{ justifyContent: "space-between" }}>
            <div className="more_item_detal">
              <span id="lb">Active Stage</span>
              <span>{data.activeStage.name}</span>
            </div>

            <div className="more_item_detal">
              <span id="lb">Start Date</span>
              <span>{moment(data.activeStage.start).format("ll")}</span>
            </div>

            <div className="more_item_detal">
              <span id="lb">End Date</span>
              <span>{moment(data.activeStage.end).format("ll")}</span>
            </div>
          </section>
          <br />
          <div className="more_item_detal">
            <span id="lb">Program Description</span>
            <span>{data.description}</span>
          </div>
        </div>

        <div id="guide">
          <Link
            onClick={(e) => {
              e.preventDefault();
              dispatch(setProgramId(data.id));

              navigate("/Programme");
            }}>
            Open Program
          </Link>
          <Arrow2 />
        </div>
      </div>
    </div>
  );
}