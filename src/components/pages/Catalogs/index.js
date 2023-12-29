import { useEffect, useState } from "react";
import listcatalogs from "../../../services/axios/getcatalogs";
import Color from "./color";

import {
  addCatalog,
  editCatalog,
  delCatalog,
} from "../../../services/axios/addCatalog";

function App() {
  const [catalogs, setCatalogs] = useState([{ name: "", image: "" }]);
  const [selected, setSelected] = useState({
    name: catalogs[0].name,
    image: catalogs[0].image,
  });

  const [newcatalog, setNewcatalog] = useState({ name: "", image: "" });
  useEffect(() => {
    listcatalogs.then((names) => {
      console.log(names);
      setCatalogs(names);
      setSelected({
        id: names[0].id,
        name: names[0].name,
        image: names[0].image,
      });
    });
  }, []);
  const handleselect = (e) => {
    setSelected(() => {
      for (let i = 0; i < catalogs.length; i++) {
        if (catalogs[i].id === Number(e.target.value)) {
          return {
            id: catalogs[i].id,
            name: catalogs[i].name,
            image: catalogs[i].image,
          };
        }
      }
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelected({ ...selected, [name]: value });
  };

  const handleNewCatalog = (e) => {
    setNewcatalog({ ...newcatalog, [e.target.name]: e.target.value });
  };
  const handleEdit = async () => {
    if (window.confirm("Bạn có chắc chắn muốn sửa không?")) {
      // Thực hiện sửa nếu người dùng đồng ý
      // await editCatalog(selected, localStorage.getItem("token"));
    }
  };

  const handleDel = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
      // Thực hiện xóa nếu người dùng đồng ý
      await delCatalog(id, localStorage.getItem("token"));
    }
  };

  const handleSubmit = async () => {
    if (window.confirm("Bạn có chắc chắn muốn thêm mới không?")) {
      // Thực hiện thêm mới nếu người dùng đồng ý
      await addCatalog(newcatalog, localStorage.getItem("token"));
    }
  };
  return (
    <div className="flex flex-col space-y-2">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Select an option
      </label>
      <div>
        <select
          name="igId"
          id="igId"
          onClick={handleselect}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {catalogs.map((catalog, index) => (
            <option key={index} value={catalog.id}>
              {catalog.name}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        name="name"
        id="name"
        value={selected.name}
        onChange={handleInputChange}
        className="pl-3.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="..."
        required
      ></input>
      <input
        type="text"
        id="image"
        name="image"
        className="pl-3.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="url"
        value={selected.image}
        onChange={handleInputChange}
        required
      ></input>
      <div className="mt-auto space-x-1 text-center">
        <button
          type="submit"
          onClick={handleEdit}
          className="bg-blue-500 mb-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sửa
        </button>
        <button
          type="submit"
          onClick={() => handleDel(selected.id)}
          className="bg-red-500 mb-4 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Xóa
        </button>
      </div>
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Tên danh mục
      </label>
      <input
        type="text"
        name="name"
        id="name"
        className="pl-3.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="..."
        value={newcatalog.name}
        onChange={handleNewCatalog}
        required
      ></input>
      <input
        type="text"
        id="image"
        name="image"
        className="pl-3.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="..."
        value={newcatalog.image}
        onChange={handleNewCatalog}
        required
      ></input>
      <div className="mt-auto text-center">
        <button
          type="submit"
          onClick={() => handleSubmit(selected)}
          className="bg-blue-500 mb-8 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Thêm
        </button>
      </div>
      <div>
        <Color />
      </div>
    </div>
  );
}

export default App;
