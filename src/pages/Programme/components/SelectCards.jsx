import React from "react";
import { useState } from "react";

export default function SelectCards({ data, onClick }) {
  const [selected, setSelected] = useState(false);
  return (
    <div
      onClick={() => {
        setSelected((prev) => !prev);
        onClick?.();
      }}
      className={`selectable ${selected ? "selected" : null}`}
    >
      <span>{data.name}</span>
      <div className={`rounded ${selected ? "selected" : null}`} />
    </div>
  );
}
