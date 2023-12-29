// StarRating.js
import React from "react";

const StarRating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={`text-2xl ${
        index + 1 <= rating ? "text-yellow-500" : "text-gray-300"
      }`}
    >
      ★
    </span>
  ));

  return <div>{stars}</div>;
};

export default StarRating;
