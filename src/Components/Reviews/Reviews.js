import React from "react";

const Reviews = ({ reviews }) => {
  if (!reviews.length > 0) {
    return <h1>We dont have any reviews for this movie...!</h1>;
  }
  return (
    <ul>
      {reviews.map((rev) => (
        <li key={rev.id}>
          <h2>Author: {rev.author}</h2>
          <p>{rev.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default Reviews;
