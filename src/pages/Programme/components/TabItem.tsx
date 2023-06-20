import React from "react";
import "./styles/tabitem.css";
export default function TabItem({
  active,
  accessed,
  onClick,
  label = "",
}: {
  accessed?: boolean;
  active?: boolean;
  onClick?: () => void;
  label: string;
}) {
  return (
    <div
      onClick={onClick}
      className="tabitem_container"
      style={{
        borderLeft: active ? "5px solid #fb9ea3" : "none",
      }}
    >
      <span
        style={{
          color: active || accessed ? "var(--primary)" : "#6E6E6E",
        }}
      >
        {label}
      </span>
      {accessed && (
        <div className="tab_tick">
          <svg
            width="9"
            height="8"
            viewBox="0 0 9 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.0568 7.84288L0.131797 4.35628C-0.0439322 4.14681 -0.0439322 3.80718 0.131797 3.59769L0.768178 2.8391C0.943907 2.62961 1.22885 2.62961 1.40458 2.8391L3.375 5.18782L7.59542 0.157101C7.77115 -0.0523671 8.05609 -0.0523671 8.23182 0.157101L8.8682 0.915689C9.04393 1.12516 9.04393 1.46479 8.8682 1.67428L3.6932 7.8429C3.51745 8.05237 3.23253 8.05237 3.0568 7.84288Z"
              fill="#006438"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
