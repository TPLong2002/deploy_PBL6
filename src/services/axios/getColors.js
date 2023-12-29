import axios from "axios";
function getColors() {
  return axios.get("http://api.shopiec.shop/api/colors", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}
export default getColors;
