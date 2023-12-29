import React from "react";
import { Link } from "react-router-dom"; // Đảm bảo bạn đã cài đặt react-router-dom

const handleClick = (product) => {
  console.log(1);
  // Sử dụng <Link> để thực hiện chuyển hướng
  return <Link to="/">Chuyển hướng</Link>;
};

const Test = () => {
  return <div>{handleClick()}</div>;
};

export default Test;
