import axios from "axios";

function getAlluser(token, params) {
  return axios.get("http://api.shopiec.shop/api/users", {
    params: params,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}
export default getAlluser;
