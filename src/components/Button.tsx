import React from "react";
import "./styles/button.css";
import { ButtonProps } from "./types";
import { Colors } from "../assets/Colors/Colors";
function Button({
  label,
  style,
  lineButton,
  onClick,
  disabled,
  fontStyle,
}: ButtonProps) {
  return (
    <div
      onClick={onClick}
      style={{
        marginLeft: lineButton ? "auto" : 0,
        marginRight: lineButton ? "auto" : 0,
        backgroundColor: lineButton ? "transparent" : Colors.primary,
        borderBottom: lineButton ? `1px solid ${Colors.primary}` : "none",
        borderRadius: lineButton ? 0 : 15,
        minWidth: lineButton ? 50 : 150,
        opacity: disabled ? 0.4 : 1,
        transition: "all 0.5s",
        pointerEvents: disabled ? "none" : "all",
        color: "#fff",
        textTransform: "uppercase",
        fontSize: "11px",
        fontWeight: "700px",
        ...style,
      }}
      className="button_container"
    >
      <span style={fontStyle}>{label}</span>
    </div>
  );
}

export default Button;
