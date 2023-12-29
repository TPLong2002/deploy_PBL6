import axios from "axios";
function getOrders(token, params) {
  return axios.get("http://api.shopiec.shop/api/orders", {
    params: params,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}
export default getOrders;
