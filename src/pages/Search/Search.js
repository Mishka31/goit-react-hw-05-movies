import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import s from "./Search.module.css";

const Search = (props) => {
  const [value, setValue] = useState("");
  const [array, setArray] = useState([]);
  const [query, setQuery] = useState("");

  const location = useLocation();
  console.log(location);
  useEffect(() => {
    if (location.state && !value) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=1d02cf870156c36c20bd2c4215c07516&language=en-US&query=${location.state.from.state.title.query}&page=1&include_adult=false`
      )
        .then((res) => res.json())
        .then((res) => setArray(res.results));
    }
  }, [location.state, value]);

  const reset = () => {
    setValue("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === "") {
      return alert("Пустое поле");
    }
    setQuery(value);
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=1d02cf870156c36c20bd2c4215c07516&language=en-US&query=${value}&page=1&include_adult=false`
    )
      .then((res) => res.json())
      .then((res) => setArray(res.results));
    reset();
  };
  const handleChange = (e) => {
    setValue(e.currentTarget.value);
  };

  return (
    <div className={s.container}>
      <h1>Search Page</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={value} placeholder="Enter a movie name" />
        <button type="submit">Search</button>
      </form>

      <ul>
        {array.map((e) => (
          <li className={s.li} key={e.id}>
            <Link
              to={{
                pathname: `/search/${e.id}`,
                state: { from: location, title: { query } },
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
