import axios from "axios";
import getColors from "../../../services/axios/getColors";
import React, { useEffect, useState } from "react";
function AddDetail({ id }) {
  const [colors, setColors] = useState([
    {
      id: 0,
      code: "9ae882",
    },
  ]);
  const [itemDetail, setItemDetail] = useState({
    itemId: id,
    amount: 0,
    colorId: 1,
  });
  useEffect(() => {
    getColors().then((res) => {
      setColors(res.data);
    });
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemDetail({ ...itemDetail, [name]: value });
  };
  const handleAddItemDetail = () => {
    if (window.confirm("Bạn có chắc chắn muốn thêm chi tiết sản phẩm này?")) {
      axios.post("http://api.shopiec.shop/api/itemdetails", [itemDetail], {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="font-semibold">Color:</div>
      <select name="colorId" onChange={handleInputChange}>
        {colors.map((color, index) => (
          <option
            key={index}
            onChange={handleInputChange}
            value={color.id}
            style={{ backgroundColor: `#${color.code}` }}
          >
            {color.code}
          </option>
        ))}
      </select>
      <div className="font-semibold">amount:</div>
      <div className="max-w-md ">
        <input
          type="text"
          name="amount"
          value={itemDetail.amount}
          onChange={handleInputChange}
          className="w-full p-2 border rounded border-gray-300"
        />
      </div>{" "}
      <button
        onClick={handleAddItemDetail}
        className="bg-gray-100 hover:bg-blue-300 px-4 py-2 rounded "
      >
        Thêm
      </button>
    </div>
  );
}

export default AddDetail;
