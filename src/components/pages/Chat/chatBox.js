import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useRef } from "react";
import format from "date-fns/format";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function ChatBox({
  receivedId,
  chatId,
  message,
  image,
  firstName,
  lastName,
  stompClient,
}) {
  // const clearContentMessage = () => {
  //   const contentMessage = document.getElementById('contentMessage');
  //   if (contentMessage !== null) {
  //     while (contentMessage.firstChild) {
  //       contentMessage.removeChild(contentMessage.firstChild);
  //       break;
  //     }
  //   }
  // };
  // clearContentMessage();
  const userId = localStorage.getItem("userId");
  const imagee = JSON.parse(localStorage.getItem("user")).image;
  console.log(imagee);
  const sendMessage = () => {
    var inputMes = document.getElementById("textAreaExample");
    var timeSendMes = format(new Date().getTime(), "yyyy-MM-dd HH:mm:ss");
    var mess = {
      time: timeSendMes,
      senderId: userId,
      message: inputMes.value,
      chatId: chatId,
    };
    message.push(mess);
    stompClient.send("/app/chat/" + receivedId, {}, JSON.stringify(mess));
    var contentMessage = document.getElementById("contentMessage");
    console.log(inputMes.value);
    var div = document.createElement("div");
    div.className = " flex justify-end mb-4   ";
    div.id = receivedId + "div";
    var pTime = document.createElement("p");
    pTime.className = " flex justify-end mb-1 text-xs text-gray-400";
    pTime.textContent = format(new Date(timeSendMes), "dd-MM-yyyy HH:mm:ss");
    pTime.id = receivedId + "time";
    var p = document.createElement("p");
    p.className = " text-sm break-all p-3 border bg-blue-400 rounded mr-4";
    p.textContent = inputMes.value;
    var img = document.createElement("img");

    img.src = imagee;
    img.alt = "avatar 1";
    img.style.width = "45px";
    img.style.height = "45px";
    img.style.borderRadius = "100%";
    div.appendChild(p);
    contentMessage.appendChild(pTime);
    div.appendChild(img);
    contentMessage.appendChild(div);

    inputMes.value = "";
  };
  const chatContainerRef = useRef(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, []);
  return (
    <div
      className="flex flex-col w-full mx-2 h-[46rem] rounded-lg shadow-lg"
      key={receivedId}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <img
            src={image}
            alt="avatar"
            className="w-10 h-10 rounded-full mr-2"
          />
          <div>
            <div className="font-semibold">{firstName + " " + lastName}</div>
            <div className="text-sm text-gray-600">Trạng thái trực tuyến</div>
          </div>
        </div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Options
              <ChevronDownIcon
                className="-mr-1 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#/"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Tắt thông báo
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#/"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Chặn
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#/"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Xóa
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#/"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Xóa tài khoảng
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <div
        // key={receivedId}
        className="border-t-2 border-gray-300 p-4 h-full overflow-auto max-h-[44.5rem] scrollbar-hide "
        id="contentMessage"
        ref={chatContainerRef}
      >
        {message !== undefined
          ? message.map((message, index) => {
              console.log(message);
              return message.senderId != userId ? (
                <div className="flex flex-col">
                  <p className="flex justify-start mb-1 text-xs text-gray-400">
                    {format(new Date(message.time), "dd-MM-yyyy HH:mm:ss")}
                  </p>
                  <div className="flex flex-row justify-start mb-4" key={index}>
                    <img
                      src={image}
                      alt="avatar 1"
                      className="w-11 h-11 rounded-full"
                    />
                    <div className="p-3 ms-3 bg-gray-100 rounded">
                      <p className="text-sm">{message.message}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col">
                  <p className="flex justify-end mb-1 text-xs text-gray-400">
                    {format(new Date(message.time), "dd-MM-yyyy HH:mm:ss")}
                  </p>
                  <div className="flex flex-row justify-end mb-4" key={index}>
                    <div className="p-3 me-3 border bg-blue-400 rounded">
                      <p className="text-sm"> {message.message}</p>
                    </div>
                    <img
                      src={imagee}
                      alt="avatar 1"
                      style={{ width: "45px", height: "100%" }}
                      className="rounded-full"
                    />
                  </div>
                </div>
              );
            })
          : null}
      </div>

      <div className="mt-4 flex items-center">
        <textarea
          placeholder="Nhập tin nhắn..."
          className="w-full p-2 border border-gray-400 rounded mr-2"
          id="textAreaExample"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => sendMessage()}
        >
          Gửi
        </button>
      </div>
    </div>
  );
}
