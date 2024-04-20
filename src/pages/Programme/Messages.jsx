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
import { FaUserTie, FaPaperPlane, FaPaperclip } from "react-icons/fa6";

import { Header, RegularText } from "../../components/Common";
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
import { setUnread } from "../../redux/user/userSlice";
import { MoonLoader } from "react-spinners";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [typed, setTyped] = useState("");
  const data = useSelector((data) => data);
  const [loading, setLoading] = useState(false);
  const [attach, setAttach] = useState("");
  const myFormData = new FormData();
  const fileRef = useRef();
  const [alertText, setAlert] = useState("");
  const [myFiles, setFiles] = useState(null);
  const dispatch = useDispatch();

  const getData = async () => {
    nProgress.start();
    setLoading(true);
    const respone = await query({
      method: "GET",
      url: `/api/applicant/messages/${data.program.id}`,
      token: data.user.user.token,
    });
    nProgress.done();
    setLoading(false);
    if (respone.data.status) {
      setMessages(respone.data.data.messages.reverse());
    } else {
      setMessages([]);
    }
  };
  const readMessage = async () => {
    const respone = await query({
      method: "POST",
      url: `/api/applicant/messages/read/${data.program.id}`,
      token: data.user.user.token,
    });

    if (respone.success) {
      dispatch(setUnread(0));
    }
  };

  useEffect(() => {
    getData();
    if (data.user.unread > 0) {
      readMessage();
    }
  }, [data.user.id]);
  return (
    <div className="message-container">
      <div className="main-chats">
        <Alert text={alertText} />
        <div className="messaage-head">
          <Header className="header" text={data.user.user.name} />
        </div>
        <div className="chats">
          {messages.length == 0 && loading && (
            <div className="empty-msg">
              <MoonLoader
                size={25}
                cssOverride={{ position: "absolute", left: "50%", top: "50%" }}
              />
            </div>
          )}
          {messages.length == 0 && !loading && (
            <div className="empty-msg">
              <RegularText text="No messages yet, if you have any complaints feel free to message us. thank you" />
            </div>
          )}
          {messages.length > 0 && (
            <>
              {messages.map((msg, ind) => (
                <Fade>
                  <ChatItem
                    message={msg.msg}
                    isAdmin={msg.from == "Admin"}
                    file={msg.file !== "" ? msg.file : ""}
                    created={msg.created_at}
                    user={data.user.user.name}
                  />
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
              marginTop: 0,
            }}
            label=""
            placeholder="Enter message...."
          />
          <div
            className="paper_plane"
            style={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}>
            <FaPaperclip
              onClick={() => {
                fileRef.current.click();
              }}
            />
            <span
              style={{
                color: "#006438",
                fontSize: 10,
                textAlign: "center",
                position: "absolute",
                bottom: 0,
                transform: "translateY(13px)",
                width: "100%",
                marginLeft: 10,
                backgroundColor: "transparent",
              }}>
              {attach}
            </span>
          </div>

          <input
            onChange={(e) => {
              const files = e.target.files;
              // files?.length && myFormData.append("file", files[0]);
              setFiles(files[0]);
              setAttach(files[0].name);
            }}
            style={{ width: 0, height: 0 }}
            type="file"
            ref={fileRef}
          />

          <button
            style={{
              backgroundColor: "#124d92",
              color: "#fff",
              border: "none",
              padding: "12px 45px",
              marginTop: 10,
              borderRadius: 10,
            }}
            onClick={() => {
              if (typed == "") {
                setAlert("Message cant be empty!");
                setTimeout(() => {
                  setAlert("");
                }, 2000);

                return;
              }
              myFormData.append("msg", typed);
              myFormData.append("file", myFiles);
              let fileSrc = "";
              nProgress.start();
              fetch(
                `https://api.gcip.rea.gov.ng/api/applicant/messages/${data.program.id}`,
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
                    getData();
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
              if (myFiles !== null) {
                var reader = new FileReader();

                reader.onload = function (event) {
                  setMessages((prev) => [
                    ...prev,
                    { msg: typed, from: 1, file: event.target.result },
                  ]);
                };

                reader.readAsDataURL(myFiles);
                setFiles(null);
                setAttach("");
                setTyped("");
                return;
              }
              setMessages((prev) => [
                ...prev,
                {
                  msg: typed,
                  from: 1,
                  file: "",
                  created_at: "",
                  user: data.user.user.name,
                },
              ]);
              setFiles(null);
              setAttach("");
              setTyped("");
            }}>
            Send
          </button>
          {/* <FaPaperPlane
            onClick={() => {
              if (typed == "") {
                setAlert("Message cant be empty!");
                setTimeout(() => {
                  setAlert("");
                }, 2000);

                return;
              }
              myFormData.append("msg", typed);
              myFormData.append("file", myFiles);
              let fileSrc = "";
              nProgress.start();
              fetch(
                `https://api.gcip.rea.gov.ng/api/applicant/messages/${data.program.id}`,
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
                    getData();
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
              if (myFiles !== null) {
                var reader = new FileReader();

                reader.onload = function (event) {
                  setMessages((prev) => [
                    ...prev,
                    { msg: typed, from: 1, file: event.target.result },
                  ]);
                };

                reader.readAsDataURL(myFiles);
                setFiles(null);
                setAttach("");
                setTyped("");
                return;
              }
              setMessages((prev) => [
                ...prev,
                {
                  msg: typed,
                  from: 1,
                  file: "",
                  created_at: "",
                  user: data.user.user.name,
                },
              ]);
              setFiles(null);
              setAttach("");
              setTyped("");
              label = "SEND";
            }}
          /> */}
        </div>
      </div>
    </div>
  );
}
