import React from "react";
import "./styles/chatitem.css";
import { FaUser } from "react-icons/fa";
import { RegularText } from "../../../components/Common";
import Button from "../../../components/Button";
import convertDate from "../../../helpers/convertDate";
import { FaUserTie } from "react-icons/fa6";
export default function ChatItem({
  isAdmin = false,
  message = "",
  file = "",
  created = "",
}) {
  return (
    <div className={`item-cont ${isAdmin ? "admin" : null}`}>
      <FaUserTie
        style={{
          marginTop: "auto",
          marginLeft: 10
        }}
        size={20}
      />
      <div className="main-item-1">
        <div className="item-txt">
          <RegularText
            style={{
              minWidth: "300px",
              wordWrap: "break-word",
              color: 'white',
              maxWidth: 500,
              height: 'auto',
              fontWeight: 500,
              padding: 7,
              marginLeft: 10,
              fontSize: 11,
              color: '#000',
            }}
            text={message}
          />
          {file !== "" && (
            <p
              onClick={() => {
                let a = document.createElement("a");
                a.href = file;
                a.download = "rea_document";
                a.target = "_blank";
                a.click();
              }}
              style={{
                // width: "30%",
                marginTop: 10,
                textDecoration: 'underline',
                cursor: 'pointer',
                textAlign: 'center'
              }}> Download File </p>
          )}
          
        </div>
        <span style={{
            fontWeight:'bolder',
            fontSize:8,
            position:'absolute',
            bottom:0,
            marginBottom:10,
            right:0,
            marginRight:10,
            color: '#607D8B'
            
          }}>{created !== "" ? convertDate(created) : created}</span>
      </div>
      
    </div>
  );
}
