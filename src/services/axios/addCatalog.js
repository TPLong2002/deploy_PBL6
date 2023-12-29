import axios from "axios";
function addCatalog(catalog, token) {
  return axios.post("http://api.shopiec.shop/api/itemgroups", catalog, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
function editCatalog(catalog, token) {
  return axios.post("http://api.shopiec.shop/api/itemgroups", catalog, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
function delCatalog(id, token) {
  return axios.delete(`http://api.shopiec.shop/api/itemgroups/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export { addCatalog, editCatalog, delCatalog };
