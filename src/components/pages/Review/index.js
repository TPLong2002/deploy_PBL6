import { useEffect, useState } from "react";
import getComments from "../../../services/axios/getComments";
import getProducById from "../../../services/axios/getProductById";
import axios from "axios";
function Review() {
  const [comments, setComments] = useState([]);
  const [update, setUpdate] = useState(true);
  useEffect(() => {
    getComments(localStorage.getItem("token")).then((res) => {
      res.data.forEach((comment) => {
        getProducById(comment.itemId).then((res) => {
          setComments((comments) => [
            ...comments,
            {
              ...comment,
              name: res.data.name,
              image: res.data.imagesItem[0].image,
            },
          ]);
        });
      });
    });
  }, [update]);
  const del = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      await axios
        .delete("http://api.shopiec.shop/api/comments/comment/" + id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setUpdate(!update);
          setComments([]);
        });
    }
  };
  const comfirm = (id) => {
    if (window.confirm("Bạn có chắc chắn xác nhận?")) {
      axios
        .patch(
          "http://api.shopiec.shop/api/comments/check/" + id,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            "Content-Type": "application/json",
          }
        )
        .then((res) => {
          console.log(res);
        });
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center border-gray-600">
        <input
          type="text"
          placeholder="Tìm..."
          className="w-full p-2 border border-gray-400 rounded mr-2 mb-2"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-2 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-300">
          Tìm
        </button>
      </div>
      <div className="overflow-y-auto scrollbar-hide h-[43rem] border border-slate-500">
        <table className="w-full ">
          <thead className="bg-slate-400">
            <tr className="bg-gray-300 text-center sticky top-0">
              <td className="text-center">ảnh</td>
              <td className="text-center">Tên sản phẩm</td>
              <td className="text-center">Đánh giá</td>
              <td className="text-center">Số sao</td>
              <td className="text-center">Options</td>
            </tr>
          </thead>
          <tbody className="border">
            {comments.map((comment, index) => (
              <tr
                key={index}
                className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
              >
                <td className="text-center border-r py-4">
                  <img className="w-16 h-16" alt="" src={comment.image}></img>
                </td>
                <td className="text-center border-r py-4">{comment.name}</td>
                <td className="text-center border-r py-4">{comment.content}</td>
                <td className="text-center border-r py-4">{comment.rating}</td>
                <td className="text-center border-r py-4 space-x-2">
                  <button
                    className="bg-gray-100 hover:bg-green-300 px-4 py-2 rounded"
                    onClick={() => {
                      comfirm(comment.id);
                    }}
                  >
                    Duyệt
                  </button>
                  <button
                    className="bg-gray-100 hover:bg-red-300 px-4 py-2 rounded "
                    onClick={() => del(comment.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Review;
