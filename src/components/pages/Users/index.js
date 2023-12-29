import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import getAlluser from "../../../services/axios/getAlluser";
import axios from "axios";
import Pagination from "../../../services/other/Pagination";

function App() {
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: "huy",
      lastName: "nguyen",
      dateOfBirth: "2023-11-01",
      gender: 1,
      phone: "09893840384",
      address: "098 Ton Duc Thang",
      email: "huy@12345",
      image:
        "https://res.cloudinary.com/dte2ps5qs/image/upload/v1700431912/zo74ugufya9ayvuntmvn.png",
    },
  ]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAlluser(localStorage.getItem("token"), {
      page: page,
      size: 10,
      sort: "ASC",
    }).then((res) => {
      setUsers(res.data);
    });
  }, [page]);
  console.log(users);
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setUsers((prevState) => {
      const users = [...prevState];
      users[index][name] = value;
      return users;
    });
  };

  const handleClick = (e) => {
    setPage(e.selected + 1);
  };

  function handleSubmit(index) {
    const userToUpdate = { ...users[index] };
    delete userToUpdate.id;
    console.log(userToUpdate);

    axios.put(
      "http://api.shopiec.shop/api/users/user/" + users[index].id,
      userToUpdate,
      { headers: { Authorization: localStorage.getItem("token") } }
    );
  }
  return (
    <div className="max-h-[46rem]">
      <div className="flex items-center justify-center border-gray-600 ">
        <input
          type="text"
          placeholder="Tìm..."
          className="w-full p-2 border border-gray-400 rounded mr-2 mb-2"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-2 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-300">
          Tìm
        </button>
      </div>
      <div className="overflow-y-auto scrollbar-hide h-[40.5rem] border border-slate-500">
        <table className=" w-full ">
          <thead>
            <tr className="bg-gray-300 text-center sticky top-0">
              <td>Avt</td>
              <td>Họ</td>
              <td>Tên</td>
              <td>Ngày sinh</td>
              <td>Giới tính</td>
              <td>Số điện thoại</td>
              <td>Địa chỉ</td>
              <td>email</td>
              <td>option</td>
            </tr>
          </thead>
          <tbody className="">
            {users.map((user, index) => (
              <tr
                className=" border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                key={index}
              >
                <td className=" text-center border-r py-4">
                  <img
                    src={user.image}
                    alt=""
                    name="image"
                    className="w-16 h-16"
                  ></img>
                  {user.id}
                </td>
                <td className=" text-center border-r py-4">
                  <input
                    type="text"
                    name="firstName"
                    className="w-[4rem] bg-gray-100  px-1 py-1 rounded"
                    onChange={(e) => handleChange(e, index)}
                    value={user.firstName}
                  ></input>
                </td>
                <td className=" text-center border-r py-4">
                  <input
                    type="text"
                    name="lastName"
                    className="w-[4rem] bg-gray-100  px-1 py-1 rounded"
                    onChange={(e) => handleChange(e, index)}
                    value={user.lastName}
                  ></input>
                </td>
                <td className=" text-center border-r py-4">
                  <input
                    type="text"
                    name="dateOfBirth"
                    className="w-[4rem] bg-gray-100  px-1 py-1 rounded"
                    onChange={(e) => handleChange(e, index)}
                    value={user.dateOfBirth}
                  ></input>
                </td>
                <td className=" text-center border-r py-4">
                  <select
                    name="gender"
                    value={user.gender}
                    className="bg-gray-100 px-1 py-1 rounded"
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="1">Nam</option>
                    <option value="0">Nữ</option>
                  </select>
                </td>
                <td className=" text-center border-r py-4">
                  <input
                    name="phone"
                    type="text"
                    className="w-[6rem] bg-gray-100  px-1 py-1 rounded"
                    onChange={(e) => handleChange(e, index)}
                    value={user.phone}
                  ></input>
                </td>
                <td className=" text-center border-r py-4">
                  <input
                    name="address"
                    type="text"
                    className="w-[14rem] bg-gray-100  px-1 py-1 rounded"
                    onChange={(e) => handleChange(e, index)}
                    value={user.address}
                  ></input>
                </td>
                <td className=" text-center border-r py-4">
                  <input
                    type="text"
                    name="email"
                    className="w-[10rem] bg-gray-100  px-1 py-1 rounded"
                    onChange={(e) => handleChange(e, index)}
                    value={user.email}
                  ></input>
                </td>
                <td className="flex flex-col text-center border-r py-4">
                  <div className="flex flex-col space-y-2 items-center">
                    <Link
                      to={{
                        pathname: "/users/history",
                        search: `?id=${user.id}`,
                      }}
                      className=" w-fit bg-gray-100 hover:bg-green-300 px-2 py-2 rounded"
                    >
                      Lịch sử mua hàng
                    </Link>
                    <button
                      onClick={() => handleSubmit(index)}
                      className="w-fit bg-gray-100 hover:bg-blue-500 px-2 py-2 rounded"
                    >
                      Cập nhật
                    </button>
                    <button className="w-fit bg-gray-100 hover:bg-red-500 px-2 py-2 rounded">
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination pageCount={10} handlePageClick={handleClick} />
    </div>
  );
}

export default App;
