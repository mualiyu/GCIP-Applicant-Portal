import React from "react";
import "./styles/input.css";
import { RegularText } from "./Common";
import { InputProps } from "./types";
function Input({
  label,
  placeholder,
  type = "text",
  required = false,
  style,
  disabled,
  outlined,
  name,
  id,
  onChange,
  error,
  value,
}: InputProps) {
  return (
    <div style={style} className="app_input">
      <div className="input_label">
        <RegularText
          style={{
            fontSize: 11,
            fontWeight: "500",
            marginBottom: 0,
            color:'color: #514F4F;',
            textTransform: "uppercase",
            height: "20px"
            
          }}
          text={`${label}`}
        />
        {required ? <span className="asteric">*</span> : null}
      </div>

      <input
        value={value}
        disabled={disabled}
        style={{
          opacity: disabled ? 0.5 : 1,
          backgroundColor: disabled ? "var(--back_ground)" : "var(--white)",
          border: outlined ? "1px solid var(--stroke)" : "none",
          // borderBottom: outlined
          //   ? "1px solid var(--stroke)"
          //   : "1px solid var(--primary)",
          borderBottom: outlined
            ? "1px solid var(--stroke)"
            : "none",
          borderRadius: outlined ? 15 : 0,
          padding: 5,
          paddingLeft:20,
        }}
        required={required}
        placeholder={placeholder}
        type={type}
        id={id}
        name={name}
        onChange={(e) => onChange(e)}
      />
      {error && (
        <div className="input_error">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export default Input;
