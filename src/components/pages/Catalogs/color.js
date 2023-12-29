import { useEffect, useState } from "react";
import getColors from "../../../services/axios/getColors";
import axios from "axios";

function Color() {
  const [colors, setColors] = useState([]);
  const [color, setColor] = useState([]);

  useEffect(() => {
    const fetchColors = async () => {
      const res = await getColors();
      setColors(res.data);
    };
    fetchColors();
  }, []);
  const handleAddColor = () => {
    if (window.confirm("Bạn có chắc chắn muốn thêm không?")) {
      axios.post(
        "http://api.shopiec.shop/api/colors",
        { code: color },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
    }
  };
  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <div className=" font-semibold ">Thêm màu mới:</div>
        <select>
          {colors.map((color) => (
            <option
              key={color.id}
              value={color.id}
              style={{ backgroundColor: `#${color.code}` }}
            >
              {color.code}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input
          type="text"
          name="code"
          id="code"
          className="pl-3.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="..."
          value={color}
          onChange={(e) => setColor(e.target.value)}
          required
        ></input>
      </div>
      <div className="text-center">
        <button
          onClick={handleAddColor}
          className="bg-blue-500 text-white px-4 py-2 rounded transition-transform hover:scale-105 duration-300"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Color;
