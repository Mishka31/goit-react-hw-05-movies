import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieCast } from "../../services/api";
import s from "./Cast.module.css";
import stdPerson from "./No-photo-m.png";

const Cast = () => {
  const [cast, setCast] = useState([]);

  const { slug } = useParams();
  const id = slug.match(/[a-z0-9]+$/)[0];

  useEffect(() => {
    getMovieCast(id)
      .then((result) => setCast([...result.cast]))
      .catch(({ message }) => alert(message));
  }, [id]);

  return (
    <ul className={s.container}>
      {cast.map(({ id, profile_path, name, character }) => (
        <li key={id} className={s.li}>
          <img
            className={s.img}
            src={profile_path ? `https://image.tmdb.org/t/p/w200${profile_path}` : stdPerson}
            alt=""
            width="200"
          />
          <h4 className={s.h3}>{name}</h4>
          <p className={s.p}>Character: {character}</p>
        </li>
      ))}
    </ul>
  );
};

export default Cast;
