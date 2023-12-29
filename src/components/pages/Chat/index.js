import { useEffect, useState } from "react";
import ChatBox from "./chatBox";
import getChats, { getChatMess } from "../../../services/axios/getChat";

const SockJS = require("sockjs-client");
const Stomp = require("stompjs");
let stompClient;
const url = "http://api.shopiec.shop";

let map = new Map();

let socket = new SockJS(url + "/chat");
stompClient = Stomp.over(socket);
console.log("connecting to chat...");
const userId = localStorage.getItem("userId");

export default function Chat() {
  const [data, setData] = useState(null);
  const [userID, setUserID] = useState(31);
  //id chat
  const [chatUser, setChatUser] = useState([]);
  const [message, setMessage] = useState([]);
  const [image, setImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [receivedId, setReceivedId] = useState("");
  stompClient.connect({ withCredentials: true }, function (frame) {
    console.log("connected to: " + frame);
    console.log("Log::::" + frame);
    if (userId != null) {
      stompClient.subscribe(
        "/topic/messages/" + userId,
        async function (response) {
          console.log("respose:" + response);
          const newData = JSON.parse(response.body);
          setData(newData);
          document.getElementById(newData.chatId).value = "";
          document.getElementById(newData.chatId).value = newData.message;
          if (map.has(newData.chatId)) {
            map.get(newData.chatId).push(newData);
            console.log("dk1");
          } else {
            console.log("dk2");
            map.set(newData.chatId, [newData]);
          }
          if (newData.chatId === userID) {
            setMessage(map.get(userID));
            console.log("Nhảy vào đây!");
            console.log("mess.lengh1:" + message.length);
          }
        }
      );
    }
  });

  useEffect(() => {
    async function fetch() {
      const temp = new Map();
      const response = await getChats(localStorage.getItem("token"));
      setChatUser(response.data);
      for (const user of response.data) {
        const response = await getChatMess(
          localStorage.getItem("token"),
          user.id
        );
        temp.set(user.id, response.data);
      }
      for (const e of temp.keys()) {
        if (!map.has(e)) {
          map.set(e, temp.get(e));
          console.log("check vao day khong!");
        } else {
          for (const j in temp.get(e)) {
            let count = 0;
            for (const i in map.get(e)) {
              if (i.time === j.time) {
                count++;
                break;
              }
            }
            if (count === 0) {
              map.get(e).push(j);
            }
          }
        }
      }
      setMessage(map.get(userID));
    }
    fetch();
  }, [data, message, userID]);
  useEffect(() => {
    chatUser.forEach((e) => {
      if (e.id === userID) {
        setImage(e.participant.image);
        setFirstName(e.participant.firstName);
        setLastName(e.participant.lastName);
        setReceivedId(
          e.participantId1 !== JSON.parse(localStorage.getItem("user")).id
            ? e.participantId1
            : e.participantId2
        );
      }
    });
  });
  function handlerClick(id) {
    setUserID(id);
    console.log("xem");
    setMessage(map.get(id));
    document.getElementById(id).className = "font-normal";
  }
  return (
    <div className="flex max-h-[46rem] h-[46rem]" id="box">
      <div className="w-1/4 h-[46rem]">
        <div className="bg-gray-200 p-4 flex-col items-center h-full ">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full py-2 px-3 rounded-full border focus:outline-none hover:-translate-y-1 hover:scale-105 duration-300"
          />
          <h2>Đoạn chat</h2>
          <div className="overflow-y-auto scrollbar-hide h-[42rem]">
            <ul className="mt-2 flex flex-col space-y-2">
              {chatUser.length !== undefined
                ? chatUser.map((user) => (
                    <div
                      className="flex flex-row  h-20 hover:cursor-pointer border-gray-300 p-1 bg-white rounded shadow-md"
                      onClick={() => handlerClick(user.id)}
                      onFocus={() => handlerClick(user.id)}
                    >
                      <div className="w-3/12 h-full flex items-center">
                        <img
                          src={user.participant.image}
                          alt="Avatar"
                          className="w-14 h-14 rounded-full"
                        />
                      </div>
                      <div className="w-9/12 flex flex-col justify-center">
                        <div className="w-full text-xl font-bold">
                          {user.participant.firstName}{" "}
                          {user.participant.lastName}
                        </div>
                        <input
                          type="text"
                          onInput={() => handlerClick(user.id)}
                          disabled
                          id={user.id}
                          className="w-9/12 pt-2 ml-2 font-bold "
                        ></input>
                      </div>
                    </div>
                  ))
                : null}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-3/4" id="boxchat">
        <ChatBox
          receivedId={receivedId}
          chatId={userID}
          message={message}
          user={chatUser}
          image={image}
          firstName={firstName}
          lastName={lastName}
          stompClient={stompClient}
        />
      </div>
    </div>
  );
}
