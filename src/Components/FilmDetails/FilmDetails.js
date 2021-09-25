import { useState, useEffect } from "react";
import { Link, Route, Switch, useLocation, useHistory } from "react-router-dom";

import Cast from "../Cast/Cast.js";
import Reviews from "../Reviews/Reviews.js";
import s from "./FilmDetails.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const key = "1d02cf870156c36c20bd2c4215c07516";
const STDImg = "https://image.tmdb.org/t/p/w300";
const stdUrl = "https://api.themoviedb.org/3";

function FilmDetail(props) {
  const history = useHistory();
  const location = useLocation();

  const [detArray, setDetArray] = useState([]);
  const [generes, setGeneres] = useState([]);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);

  const { id } = props.match.params;

  useEffect(() => {
    fetch(`${stdUrl}/movie/${id}?api_key=${key}&language=en-US`)
      .then((res) => res.json())
      .then((res) => {
        setDetArray(res);
        setGeneres(res.genres);
      });
    fetch(`${stdUrl}/movie/${id}/credits?api_key=${key}&language=en-US`)
      .then((res) => res.json())
      .then((res) => setCast(res.cast));
    fetch(`${stdUrl}/movie/${id}/reviews?api_key=${key}&language=en-US`)
      .then((res) => res.json())
      .then((res) => setReviews(res.results));
  }, [id]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? "/home");
  };

  return (
    <>
      <button className={s.button} type="button" onClick={onGoBack}>
        ⬅ Go back
      </button>
      <div className={s.mainContainer}>
        <div className={s.container}>
          {detArray.poster_path && <img src={`${STDImg}${detArray.poster_path}`} alt="" />}
          {generes ? (
            <div className={s.about}>
              <h1>{detArray.name ?? detArray.title}</h1>
              <p>User score: {detArray.vote_average * 10}%</p>
              <h2>Overview</h2>
              <p>{detArray.overview}</p>
              <h2>Genres</h2>
              <p>
                {generes
                  ? generes.map(({ id, name }) => <span key={id}> {name} </span>)
                  : toast(detArray.status_message)}
              </p>
              <div className={s.link}>
                <h4>Additional information:</h4>
                <Link to={`${props.match.url}/cast`}>Cast</Link>
                <Link to={`${props.match.url}/reviews`}>Reviews</Link>
              </div>
            </div>
          ) : (
            <p className={s.about}>"The resource you requested could not be found"</p>
          )}
        </div>
        <div>
          <Switch>
            <Route
              path={`${props.match.path}/cast`}
              render={(props) => <Cast {...props} casts={cast} />}
            />
            <Route
              path={`${props.match.path}/reviews`}
              render={(props) => <Reviews {...props} reviews={reviews} />}
            />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default FilmDetail;
