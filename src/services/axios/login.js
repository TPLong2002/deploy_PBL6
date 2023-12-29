import axios from "axios";

function loginAPI(email, password) {
  try {
    const res = axios.post("http://api.shopiec.shop/api/auth", {
      email,
      password,
    });
    return res;
  } catch (error) {
    throw error;
  }
}
export default loginAPI;
