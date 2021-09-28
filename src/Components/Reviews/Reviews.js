import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieReviews } from "../../services/api";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const { slug } = useParams();
  const id = slug.match(/[a-z0-9]+$/)[0];

  useEffect(() => {
    getMovieReviews(id).then((result) => setReviews([...result.results]));
  }, [id]);

  return (
    <ul>
      {reviews &&
        reviews.map(({ author, content, id }) => (
          <li key={id}>
            <h2>Author: {author}</h2>
            <p>{content}</p>
          </li>
        ))}
      {reviews && reviews.length === 0 && <p>We dont have any reviews for this movie</p>}
    </ul>
  );
};

export default Reviews;
