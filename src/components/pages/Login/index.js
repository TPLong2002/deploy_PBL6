import { useState } from "react";
import { useNavigate } from "react-router-dom";

import loginAPI from "../../../services/axios/login";
import logo from "../../../img/logo/logo.png";
function App() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({ email: "", password: "" });
  const halndleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      if (!login.email || !login.password) {
        alert("Email or password is required");
        return;
      }

      const res = await loginAPI(login.email, login.password);
      if (res && res.data.token) {
        if (res.data.roleId === "2") {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("name", res.data.firstName);
          localStorage.setItem("userId", res.data.id);
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/");
        } else {
          alert("Tài khoản này không khả dụng");
        }
      } else {
        console.error("Login failed:", res);
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      alert("An error occurred during login. Please try again later.");
    }
  };
  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto bg-red-600 "
            src={logo}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                onChange={halndleChange}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                onChange={halndleChange}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="mt-3">
            <button
              onClick={handleSubmit}
              type="submit"
              className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
