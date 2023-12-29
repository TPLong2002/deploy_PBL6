import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import ImageUpload from "./uploadimg";
import request from "../../../services/axios/getProduct";
import updateProduct from "../../../services/axios/updateProduct";
import getcatalogs from "../../../services/axios/getcatalogs";
import getProductById from "../../../services/axios/getProductById";
import getColors from "../../../services/axios/getColors";
import AddDetail from "./addDetail";
import { format } from "date-fns";
import axios from "axios";
import Comment from "./comment";

function EditProduct() {
  const currentTime = new Date();
  const formattedTime = format(currentTime, "yyyy-MM-dd HH:mm:ss");

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("id");

  // const [colorSelect, setColorSelect] = useState({ id: 0, code: "333333" });
  const [colors, setColors] = useState([]);
  const [itemDetails, setItemDetails] = useState([]);
  // const [itemDetail, setItemDetail] = useState({
  //   itemId: productId,
  //   amount: 0,
  //   colorId: 1,
  // });

  const [name, setName] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [discount, setDiscount] = useState(0);
  const [description, setDescription] = useState();
  const [igId, setigId] = useState(searchParams.get("igId"));
  const [banner, setBanner] = useState([]);
  const [catalogs, setCatalogs] = useState([]);

  const handleAddImage = (newImage) => {
    setBanner((prevBanner) => [...prevBanner, newImage]);
  };
  useEffect(() => {
    getProductById(productId).then((res) => {
      console.log(res.data);
      setName(res.data.name);
      setDiscount(res.data.discount);
      setBuyPrice(res.data.buyPrice);
      setSellPrice(res.data.sellPrice);
      setDescription(res.data.description);
      res.data.imagesItem.map((b) =>
        setBanner((prevBanner) => [...prevBanner, { id: b.id, image: b.image }])
      );
      if (res.data.itemDetails.length >= 1)
        setItemDetails(res.data.itemDetails);
    });
    getcatalogs.then((names) => {
      for (let i = 0; i < names.length; i++) {
        if (names[i].name === name) {
          setigId(names[i].id);
          break;
        }
      }
      setCatalogs(names);
    });
    getColors().then((res) => {
      setColors(res.data);
    });
  }, []);
  const handlerDel = (index, id) => {
    if (id) {
      axios
        .delete("http://api.shopiec.shop/api/imageitems/image/" + id, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          console.log(res.data.message);
          const updatedBanner = [...banner];
          updatedBanner.splice(index, 1);
          setBanner(updatedBanner);
        })
        .catch((err) => console.log(err.response.data.message));
    }
  };
  const handleInputChange = (e) => {
    setigId(e.target.value);
  };

  const handleItemDetailChange = (e, index) => {
    const { name, value } = e.target;
    const updatedItemDetails = [...itemDetails];
    const updatedItemDetail = { ...updatedItemDetails[index] };

    if (name.startsWith("color")) {
      // If the property being updated is related to color
      updatedItemDetail.color = {
        ...updatedItemDetail.color,
        id: value, // Assuming value is the color ID
      };
    } else {
      // For other properties
      updatedItemDetail[name] = value;
    }
    updatedItemDetails[index] = updatedItemDetail;
    setItemDetails(updatedItemDetails);
  };
  const handlersubmit = async () => {
    const product = {
      name: name,
      buyPrice: buyPrice,
      sellPrice: sellPrice,
      igId: igId,
      description: description,
      lastUpdateAt: formattedTime,
    };
    const res = await updateProduct(
      productId,
      product,
      localStorage.getItem("token")
    );
    alert(res.data.message);
  };
  const handleEditItemDetail = (index) => {
    const editedItemDetail = itemDetails[index];
    axios.patch(
      "http://api.shopiec.shop/api/itemdetails/itemdetail/" +
        editedItemDetail.id,
      {
        itemId: editedItemDetail.itemId,
        amount: editedItemDetail.amount,
        colorId: Number(editedItemDetail.color.id),
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
  };
  async function del() {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      await request
        .delete(`/items/${productId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          navigate("/product");
        });
    }
  }
  const handleNewDiscount = () => {
    axios.patch(
      "http://api.shopiec.shop/api/items/discount/" + productId,
      {
        discount: discount,
        lastUpdateAt: formattedTime,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
  };
  return (
    <div className="flex flex-col p-4 space-y-4 overflow-y-auto scrollbar-hide max-h-[46rem]">
      <div>
        <div className="flex text-lg font-semibold justify-between">
          <Link to="/product" className="text-blue-500 hover:underline">
            &lt; Back to
          </Link>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded transition-transform hover:scale-105 duration-300"
            onClick={del}
          >
            Delete
          </button>
        </div>

        <div className="max-w-md">
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full p-2 border rounded border-gray-300"
          />
        </div>
        <div className="">
          <div className="border rounded p-2 shadow-md flex flex-wrap">
            {banner.map((b, index) => (
              <div key={index} className="mb-2 flex items-center relative">
                <img
                  src={b.image}
                  alt="banner"
                  className="w-[11.35rem] h-[11.35rem]"
                />
                <div className="ml-2">
                  <button
                    className="absolute top-0.5 right-2.5 bg-red-500 opacity-50 text-white px-4 py-2 rounded transition-transform hover:scale-105 duration-300 hover:opacity-100"
                    onClick={() => handlerDel(index, b.id)}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
          <ImageUpload onImageUpload={handleAddImage} itemId={productId} />
        </div>
        {itemDetails.map((itemDetail, index) => (
          <div
            className="flex items-center space-x-2 p-2 mt-2 mb-2"
            key={index}
          >
            <div className=" font-semibold ">Color:</div>
            <select
              name={"colorId"}
              onChange={(e) => {
                handleItemDetailChange(e, index);
              }}
              value={itemDetail.color.id}
              className={`bg-[#${itemDetail.color.code}]`}
            >
              {colors.map((color, index) => (
                <option
                  key={index}
                  value={color.id}
                  style={{ backgroundColor: `#${color.code}` }}
                >
                  {color.code}
                </option>
              ))}
            </select>
            <div className="font-semibold ">amount:</div>
            <div className="max-w-md ">
              <input
                type="text"
                name={"amount"}
                onChange={(e) => handleItemDetailChange(e, index)}
                value={itemDetail.amount}
                className="w-full p-2 border rounded border-gray-300"
              />
            </div>
            <button
              className="bg-gray-100 hover:bg-blue-300 px-4 py-2 rounded "
              onClick={() => handleEditItemDetail(index)}
            >
              Sửa
            </button>
          </div>
        ))}
        <AddDetail id={productId} />
        <div className="font-semibold">Khuyến mãi:</div>
        <div className="max-w-md flex items-center space-x-2">
          <input
            type="text"
            value={discount}
            onChange={(event) => setDiscount(event.target.value)}
            className="w-full p-2 border rounded border-gray-300"
          />
          <div className="font-semibold"> %</div>
          <button
            onClick={handleNewDiscount}
            className="bg-blue-500 text-white px-4 py-2 rounded transition-transform hover:scale-105 duration-300"
          >
            Sửa
          </button>
        </div>
        <div className="font-semibold justify-center">Danh mục:</div>
        <div>
          <select
            name="igId"
            id="igId"
            value={igId}
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
        <div className="font-semibold">BuyPrice:</div>
        <div className="max-w-md">
          <input
            type="text"
            value={buyPrice}
            onChange={(event) => setBuyPrice(event.target.value)}
            className="w-full p-2 border rounded border-gray-300"
          />
        </div>
        <div className="font-semibold">SellPrice:</div>
        <div className="max-w-md">
          <input
            type="text"
            value={sellPrice}
            onChange={(event) => setSellPrice(event.target.value)}
            className="w-full p-2 border rounded border-gray-300"
          />
        </div>

        <div className="font-semibold">Product Information:</div>
        <div className="w-full h-[10rem]">
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="w-full h-full p-2 border rounded border-gray-300 resize-none overflow-y-auto"
            placeholder="Nhập thông tin..."
          />
        </div>

        <div className="text-center">
          <button
            onClick={handlersubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded transition-transform hover:scale-105 duration-300"
          >
            Save
          </button>
        </div>
      </div>
      <Comment productId={productId} />
    </div>
  );
}

export default EditProduct;
