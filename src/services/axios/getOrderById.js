import axios from "axios";

async function getAlluser(token, id) {
  const data = await axios.get(
    `http://api.shopiec.shop/api/orders/user/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return data;
}
export default getAlluser;
