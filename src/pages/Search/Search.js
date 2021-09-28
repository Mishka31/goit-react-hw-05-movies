import { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import slugify from "slugify";
import SearchForm from "../../Components/SearchForm/SearchForm.js";
import { getMoviesByQuery } from "../../services/api.js";
import s from "./Search.module.css";

const Search = (props) => {
  const [array, setArray] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const urlQuery = new URLSearchParams(location.search).get("query") || null;

  useEffect(() => {
    if (!urlQuery) {
      return;
    }
    getMoviesByQuery(urlQuery)
      .then((response) => {
        if (response.total_results === 0) {
          return alert(`No result for "${urlQuery}". Try another query`);
        }
        setArray([...response.results]);
      })
      .catch(({ message }) => alert(message));
  }, [urlQuery]);

  const onSubmit = (query) => {
    history.push({
      ...location,
      search: `query=${query}`,
    });
  };

  return (
    <div className={s.container}>
      <SearchForm onSubmit={onSubmit} />

      <ul>
        {array.map((e) => (
          <li className={s.li} key={e.id}>
            <Link
              to={{
                pathname: `/search/${slugify(`${e.title} ${e.id}`, {
                  lower: true,
                })}`,
                state: { from: location },
              }}
            >
              {e.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
