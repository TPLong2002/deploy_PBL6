import axios from "axios";
function update(id, product, token) {
  return axios.post(`http://api.shopiec.shop/api/items/update/${id}`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export default update;
