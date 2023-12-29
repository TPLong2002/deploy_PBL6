import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getOrderById from "../../../services/axios/getOrderById";

function History() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("id");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrderById(localStorage.getItem("token"), userId).then((res) => {
      setOrders(res.data);
    });
  }, [userId]);
  console.log(orders);
  return (
    <div>
      <div>
        &lt; <Link to={"/users"}>Back</Link>
      </div>
      <div className="font-bold text-[30px]">Đơn hàng</div>
      <div className="space-y-5 max-h-[45rem] overflow-y-auto scrollbar-hide">
        {orders.map((order, index) => (
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
