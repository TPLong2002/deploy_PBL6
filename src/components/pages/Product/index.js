import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React from "react";
import { Link } from "react-router-dom";
import request from "../../../services/axios/getProduct";
import StarRating from "../../../services/other/rating";
import { set } from "date-fns";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function App() {
  const [selectCatalog, setSelectCatalog] = useState(0);
  const [catalog, setCatalog] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const handleSelectCatalog = (index) => {
    setSelectCatalog(index);
  };
  useEffect(() => {
    if (selectCatalog === 0) {
      setProducts([]);
      request
        .get("/itemgroups")
        .then((res) => {
          setCatalog(res.data);
          const itemPromises = res.data.map((item) => {
            return request
              .get(`/items/${item.id}`, { params: { page: 1, size: 20 } })
              .then((res) => {
                return res.data.map((product) => ({
                  ...product,
                  igId: item.id,
                }));
              });
          });
          return Promise.all(itemPromises);
        })
        .then((res) => {
          setProducts(res.flat());
        });
    } else {
      request.get(`/items/${selectCatalog}`).then((res) => {
        const productsWithIgId = res.data.map((product) => ({
          ...product,
          igId: selectCatalog,
        }));
        setProducts(productsWithIgId);
      });
    }
  }, [selectCatalog]);
  const handleSearch = () => {
    request.get(`/items/search/${search}`).then((res) => {
      setProducts(res.data);
    });
  };
  return (
    <div className="flex flex-col max-h-[46rem]">
      <div className="flex w-full">
        <Menu
          as="div"
          className="w-1/4 relative inline-block text-left border-gray-600"
        >
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-lg font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Danh mục
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
            <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item
                  onClick={() => {
                    handleSelectCatalog(0);
                  }}
                >
                  {({ active }) => (
                    <button
                      href="#/"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm w-full text-left"
                      )}
                    >
                      Tất cả
                    </button>
                  )}
                </Menu.Item>
                {catalog.map((item, index) => (
                  <Menu.Item
                    onClick={() => {
                      handleSelectCatalog(item.id);
                    }}
                    key={index}
                  >
                    {({ active }) => (
                      <button
                        href="#/"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm w-full text-left"
                        )}
                      >
                        {item.name}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <div className="w-2/4 flex items-center justify-center border-gray-600">
          <div className="justify-items-center mr-8">Sắp xếp:</div>
          <Menu
            as="div"
            className="relative inline-block text-left items-center "
          >
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
                  <Menu.Item onClick={() => {}}>
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
                        Account settings
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
                        Support
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
                        License
                      </a>
                    )}
                  </Menu.Item>
                  <form method="POST" action="#/">
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
                  </form>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <div className="flex items-center justify-center border-gray-600">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Tìm..."
            className="w-full p-2 border border-gray-400 rounded mr-2"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-300"
          >
            Tìm
          </button>
          <Link
            to={"/product/addproduct"}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-300"
          >
            Thêm
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap w-full mt-4 overflow-y-auto h-[48rem] scrollbar-hide">
        {products.map((product, index) => {
          return (
            <Link
              key={index}
              to={{
                pathname: "/product/editproduct",
                search: `?id=${product.id}&igId=${product.igId}`,
              }}
              className="w-[12.7rem] justify-center max-h-[23rem] m-4 border-2 rounded-md border-red-300 transition ease-in-out delay-50 relative hover:-translate-y-1 hover:scale-110 duration-300 shadow-md"
            >
              <div className="border h-1/2">
                <img
                  src={
                    product.imagesItem &&
                    product.imagesItem[0] &&
                    product.imagesItem[0].image
                      ? product.imagesItem[0].image
                      : ""
                  }
                  alt="img"
                  className="w-full h-full"
                />
              </div>
              <div className="h-1/2">
                <div className="absolute top-2 left-2 bg-red-500 text-white py-1 px-2 rounded-full text-xs">
                  -{product.discount}%
                </div>
                <div className="text-center mb-5">{product.name}</div>
                <div className="text-center line-through mb-1 text-[0.9rem] text-gray-500">
                  ₫{product.discount}
                </div>
                <div className="text-center mb-2 text-[#dd0105]">
                  ₫{product.sellPrice}
                </div>
                <div className="text-center">đã bán: 1</div>
                <div className="flex justify-center mt-2">
                  <StarRating rating={product.rating} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
