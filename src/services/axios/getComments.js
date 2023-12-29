import axios from "axios";
function getComments(token) {
  return axios.get("http://api.shopiec.shop/api/comments/uncheck", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export default getComments;
