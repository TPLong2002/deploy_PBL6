import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ImageUpload from "./uploadimg";
import getcatalogs from "../../../services/axios/getcatalogs";
import addProduct from "../../../services/axios/addProduct";
import { format } from "date-fns";

function AddProduct() {
  const currentTime = new Date();
  const formattedTime = format(currentTime, "yyyy-MM-dd HH:mm:ss");

  // State để lưu trữ thông tin sản phẩm
  const [product, setProduct] = useState({
    name: "",
    buyPrice: 0,
    sellPrice: 0,
    igId: 1,
    description: "string",
    lastUpdateAt: formattedTime,
  });

  const [banner, setBanner] = useState([]);

  const handleAddImage = (newImage) => {
    setBanner((prevBanner) => [...prevBanner, newImage]);
  };

  const handlerDel = (index) => {
    const updatedBanner = [...banner];
    updatedBanner.splice(index, 1);
    setBanner(updatedBanner);
  };

  // Hàm xử lý khi người dùng nhập thông tin
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Hàm xử lý khi người dùng gửi thông tin sản phẩm
  const handleSubmit = async (product) => {
    try {
      const res = await addProduct(product, localStorage.getItem("token"));
      if (res) {
        console.log(res);
      }
    } catch (error) {}
  };

  const [catalogs, setCatalogs] = useState([]);
  useEffect(() => {
    getcatalogs.then((names) => {
      // Bạn có thể sử dụng giá trị names ở đây
      setCatalogs(names);
    });
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <div>
        &lt;{" "}
        <Link to={"/product"} className="font-medium text-xl">
          Back
        </Link>{" "}
      </div>
      <h1 className="text-2xl font-bold mb-4">Thêm Sản Phẩm</h1>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Tên Sản Phẩm
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="name"
          id="name"
          value={product.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="">
        {banner.map((b, index) => (
          <div key={index} className="mb-2 flex items-center">
            <img src={b} alt="banner" className="w-full h-96 object-cover" />
            <div className="ml-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded transition-transform hover:scale-105 duration-300"
                onClick={() => handlerDel(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        <ImageUpload onImageUpload={handleAddImage} />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="color"
        >
          Màu Sản Phẩm
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="color"
          id="color"
          value={product.color}
          onChange={handleInputChange}
        />
      </div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Select an option
      </label>
      <div>
        <select
          name="igId"
          id="igId"
          value={product.igId}
          onChange={handleInputChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {catalogs.map((catalog, index) => (
            <option key={index} value={catalog.id}>
              {catalog.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="price"
        >
          Giá mua sản phẩm
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="buyPrice"
          id="buyPrice"
          value={product.buyPrice}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="price"
        >
          Giá bán sản phẩm
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="sellPrice"
          id="sellPrice"
          value={product.sellPrice}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Thông Tin Sản Phẩm
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="description"
          id="description"
          value={product.description}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => handleSubmit(product)}
        >
          Thêm Sản Phẩm
        </button>
      </div>
    </div>
  );
}

export default AddProduct;
