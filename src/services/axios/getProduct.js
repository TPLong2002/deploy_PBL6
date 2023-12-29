import axios from "axios";

const request = axios.create({
  baseURL: "http://api.shopiec.shop/api",
});
export default request;
