import React from "react";
import s from "./Cast.module.css";
import stdPerson from "./No-photo-m.png";

const Cast = ({ casts }) => {
  return (
    <ul className={s.container}>
      {casts.map((cast) => (
        <li key={cast.id} className={s.li}>
          <img
            className={s.img}
            src={
              cast.profile_path
                ? `https://image.tmdb.org/t/p/w200${cast.profile_path}`
                : stdPerson
            }
            alt=""
            width="200"
          />
          <h4 className={s.h3}>{cast.name}</h4>
          <p className={s.p}>Character: {cast.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default Cast;
