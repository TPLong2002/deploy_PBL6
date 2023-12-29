import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import Pagination from "../../../services/other/Pagination";

import getOrders from "../../../services/axios/getOrders";
function App() {
  const [Orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    getOrders(localStorage.getItem("token"), {
      page: page,
      size: 10,
      sort: "ASC",
    }).then((res) => {
      console.log(res.data);
      setOrders(res.data);
    });
  }, [page]);
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  async function handleSelect(status) {
    if (status === 0) {
      getOrders(localStorage.getItem("token"), {
        page: page,
        size: 10,
        sort: "ASC",
      }).then((res) => {
        setOrders(res.data);
      });
      return;
    } else {
      const res = await getOrders(localStorage.getItem("token"), {
        page: page,
        size: 10,
        sort: "ASC",
      });
      const data = res.data.filter(
        (order) => order.orderDeliveryStatusDetails.deliveryStatusId === status
      );
      setOrders(data);
    }
  }
  const handleClick = (e) => {
    setPage(e.selected + 1);
  };
  return (
    <div className="max-h-[40rem]">
      <div className="font-bold text-[30px]">Đơn hàng</div>
      <div className="flex flex-row p-2 mb-5 bg-gray-50 border border-slate-950">
        <div className="w-1/2 text-center">
          <button
            onClick={() => handleSelect(0)}
            className="text-left p-1 border rounder bg-gray-200"
          >
            Tất cả đơn hàng
          </button>
        </div>
        <div className="w-1/2 text-center">
          <button
            onClick={() => handleSelect(1)}
            className="text-left p-1 border rounder bg-gray-200"
          >
            Đơn hàng đang duyệt
          </button>
        </div>
        <div className="w-1/2 text-center">
          <button
            onClick={() => handleSelect(2)}
            className="text-left p-1 border rounder bg-gray-200"
          >
            Đơn hàng đang giao
          </button>
        </div>
        <div className="w-1/2 text-center">
          <button
            onClick={() => handleSelect(3)}
            className="text-left p-1 border rounder bg-gray-200"
          >
            Đơn hàng thành công
          </button>
        </div>
      </div>
      <div className="space-y-5 max-h-[36.5rem] overflow-y-auto scrollbar-hide ">
        {Orders.map((order, index) => (
          <div
            key={index}
            className="flex space-x-5 p-2 rounded shadow-md border justify-between bg-gray-100"
          >
            <div className="flex space-x-5 ">
              <div>
                <img
                  src={
                    order.orderDetails[0].itemDetailDto.itemDto.imagesItem[0]
                      .image
                  }
                  alt=""
                  className="w-[8rem] h-[8rem] rounded shadow-md"
                ></img>
              </div>
              <div className="columns-2 space-y-2">
                <div>
                  <div className="border rounded bg-white shadow-md p-1">
                    Địa chỉ: {order.deliveryAddress}
                  </div>
                </div>
                <div>
                  <div className="border rounded bg-white shadow-md p-1">
                    totalFee: {order.totalFee}
                  </div>
                </div>
                <div>
                  <div className="border rounded bg-white shadow-md p-1">
                    deliveryDate: {order.deliveryDate}
                  </div>
                </div>
                <div>
                  <div className="border rounded bg-white shadow-md p-1">
                    createAt: {order.createAt}
                  </div>
                </div>
                <div>
                  <div className="border rounded bg-white shadow-md p-1">
                    phone: {order.phone}
                  </div>
                </div>
                <div>
                  <div className="border rounded bg-white shadow-md p-1">
                    name: {order.name}
                  </div>
                </div>
                <div>
                  <div className="border rounded bg-white shadow-md p-1">
                    item name:{" "}
                    {order.orderDetails[0].itemDetailDto.itemDto.name}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
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
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Xác nhận
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#/"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Xóa
                          </a>
                        )}
                      </Menu.Item>

                      {/* <form method="POST" action="#/">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="submit"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block w-full px-4 py-2 text-left text-sm"
                        )}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </form> */}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        ))}
      </div>
      <Pagination pageCount={10} handlePageClick={handleClick} />
    </div>
  );
}

export default App;
