import { useState, useEffect, lazy, Suspense } from "react";
import { Link, Route, useLocation, useHistory, useRouteMatch } from "react-router-dom";

import { getMovieDetails } from "../../services/api.js";
import s from "./FilmDetails.module.css";
import "react-toastify/dist/ReactToastify.css";

const Cast = lazy(() => import("../Cast/Cast.js" /* webpackChunkName: "Cast" */));
const Reviews = lazy(() => import("../Reviews/Reviews.js" /* webpackChunkName: "Reviews" */));
const STDImg = "https://image.tmdb.org/t/p/w300";

function FilmDetail(props) {
  const history = useHistory();
  const location = useLocation();
  const [detArray, setDetArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { slug } = props.match.params;
  const id = slug.match(/[a-z0-9]+$/)[0];
  const { url, path } = useRouteMatch();

  console.log(url, path);

  useEffect(() => {
    getMovieDetails(id)
      .then(setDetArray)
      .catch(({ message }) => alert(message));

    setSearchQuery(location.state.from.search);
  }, [location.state.from.search, id]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? "/");
  };

  return (
    <>
      <button className={s.button} type="button" onClick={onGoBack}>
        ⬅ Go back
      </button>

      <div className={s.mainContainer}>
        <div className={s.container}>
          {detArray.poster_path && <img src={`${STDImg}${detArray.poster_path}`} alt="" />}
          {detArray ? (
            <div className={s.about}>
              <h1>{detArray.name ?? detArray.title}</h1>
              <p>User score: {detArray.vote_average * 10}%</p>
              <h2>Overview</h2>
              <p>{detArray.overview}</p>
              <h2>Genres</h2>
              <p>
                {detArray.genres &&
                  detArray.genres.map(({ id, name }) => <span key={id}> {name} </span>)}
              </p>
              <div className={s.link}>
                <h4>Additional information:</h4>
                <Link
                  to={{
                    pathname: `${url}/cast`,
                    state: {
                      from: {
                        ...location,
                        pathname: location.state.from.pathname,
                        search: searchQuery,
                      },
                    },
                  }}
                >
                  Cast
                </Link>
                <Link
                  to={{
                    pathname: `${props.match.url}/reviews`,
                    state: {
                      from: {
                        ...location,
                        pathname: location.state.from.pathname,
                        search: searchQuery,
                      },
                    },
                  }}
                >
                  Reviews
                </Link>
              </div>
            </div>
          ) : (
            <p className={s.about}>"The resource you requested could not be found"</p>
          )}
        </div>
        <div>
          <Suspense fallback={<h1>DOWNLOAD</h1>}>
            <Route path={`${props.match.path}/cast`} render={(props) => <Cast {...props} />} />
            <Route
              path={`${props.match.path}/reviews`}
              render={(props) => <Reviews {...props} />}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default FilmDetail;
