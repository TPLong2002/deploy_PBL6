import axios from "axios";

function getAlluser(startDate, endDate, token) {
  return axios.post(
    "http://api.shopiec.shop/api/orders/user/statistical",
    { startDate, endDate },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
}
export default getAlluser;
