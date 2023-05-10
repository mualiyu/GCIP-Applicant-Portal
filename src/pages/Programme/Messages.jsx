import React from "react";
import "../styles/messages.css";
import Input from "../../components/Input";
import MessageUser from "./components/MessageUser";
import {
  FaCartArrowDown,
  FaFile,
  FaUser,
  FaUserAlt,
  FaUserTag,
} from "react-icons/fa";
import { RegularText } from "../../components/Common";

import { useState } from "react";
import ChatItem from "./components/ChatItem";
import { FcFile } from "react-icons/fc";
import { AttachIcon, SendIcon } from "../../assets/Svg/Index";
import { useEffect } from "react";
import { Fade, Zoom } from "react-awesome-reveal";
import { useRef } from "react";
import nProgress from "nprogress";
import query from "../../helpers/query";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../components/Alert";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [typed, setTyped] = useState("");
  const data = useSelector((data) => data);
  const [loading, setLoading] = useState(false);
  const [attach, setAttach] = useState("");
  const myFormData = new FormData();
  const fileRef = useRef();
  const [alertText, setAlert] = useState("");
  const dispatch = useDispatch();

  const getData = async () => {
    nProgress.start();
    setLoading(true)
    const respone = await query({
      method: "GET",
      url: `/api/applicant/messages/${data.program.id}`,
      token: data.user.user.token,
    });
    nProgress.done();
    setLoading(false)
    if (respone.success) {
      setMessages(respone.data.data.messages.reverse());
    }else{
      setMessages([])
    }
    
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="message-container">
      <div className="main-chats">
        <Alert text={alertText} />
        <div className="messaage-head">
          <FaUser
            style={{
              marginLeft: 20,
              marginRight: 10,
            }}
            size={40}
          />
          <RegularText
            style={{
              fontWeight: "bold",
            }}
            text={data.user.user.name}
          />
        </div>
        <div className="chats">
          {messages.length == 0 && loading && (
            <div className="empty-msg">
              <img src="/loading.gif" id="loader" />
            </div>
          )}
          {messages.length == 0&&!loading && (
            <div className="empty-msg">
              <RegularText text="No messages yet, pleas if you have any complaints feel free to message us. thank you" />
            </div>
          )}
          {messages.length > 0 && (
            <>
              {messages.map((msg, ind) => (
                <Fade>
                  <ChatItem message={msg.msg} isAdmin={msg.from == "Admin"} />
                </Fade>
              ))}
            </>
          )}
        </div>
        {/* <div className="divider"/> */}
        <div className="chat-input">
          <Input
            value={typed}
            onChange={(e) => {
              setTyped(e.target.value);
            }}
            outlined
            style={{
              width: "65%",
            }}
            label=""
            placeholder="Enter message...."
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <AttachIcon
              onClick={() => {
                //   console.log(fileRef.current)
                fileRef.current.click();
              }}
            />
            <span
              style={{
                color: "black",
                fontSize: 10,
                textAlign: "center",
                position: "absolute",
                bottom: 0,
                transform: "translateY(13px)",
                width: "100%",
                marginLeft: 10,
              }}
            >
              {attach}
            </span>
          </div>

          <input
            onChange={(e) => {
              const files = e.target.files;
              files?.length && myFormData.append("file", files[0]);
              setAttach(files[0].name);
            }}
            style={{ width: 0, height: 0 }}
            type="file"
            ref={fileRef}
          />
          <SendIcon
            onClick={() => {
              if (typed == "") {
                setAlert("Message cant be empty!");
                setTimeout(() => {
                  setAlert("");
                }, 2000);

                return;
              }
              myFormData.append("msg", typed);
              nProgress.start();
              fetch(
                `https://api.grants.amp.gefundp.rea.gov.ng/api/applicant/messages/${data.program.id}`,
                {
                  method: "POST",
                  body: myFormData,
                  headers: {
                    Authorization: "Bearer " + data.user.user.token,
                  },
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  nProgress.done();
                  if (data.status) {
                    setAlert("Message delivered");
                  } else {
                    setAlert("Unable to send message, please try again");
                  }
                  setTimeout(() => {
                    setAlert("");
                  }, 2000);
                })
                .catch(() => {
                  nProgress.done();
                });
              setMessages((prev) => [...prev, { msg: typed, from: 1 }]);
              setTyped("");
            }}
          />
        </div>
      </div>
    </div>
  );
}
