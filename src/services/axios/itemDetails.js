import axios from "axios";
function itemDetail(detail) {
  axios.post("http://api.shopiec.shop/api/itemDetails", detail, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}
export default itemDetail;
