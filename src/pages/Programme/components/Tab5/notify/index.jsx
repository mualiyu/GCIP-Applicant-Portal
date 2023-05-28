import React from "react";
import { AiOutlineNotification } from "react-icons/ai";
function Warning({ msg,style }) {
  return (
    <div style={style} className="status_warning">
      <AiOutlineNotification color="#fff" /> {msg}
    </div>
  );
}

export default Warning;
