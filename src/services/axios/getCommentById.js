import axios from "axios";
function getCommentById(id) {
  return axios.get("http://api.shopiec.shop/api/comments/checked/" + id, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
}

export default getCommentById;
