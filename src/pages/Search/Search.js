import { useState } from "react";
import { Link, Route, useLocation } from "react-router-dom";
import Cast from "../../Components/Cast/Cast.js";
import s from "./Search.module.css";

const Search = (props, onSubmit) => {
  const location = useLocation();

  const [value, setValue] = useState("");
  const [array, setArray] = useState([]);

  const handleChange = (e) => {
    setValue(e.currentTarget.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    if (value.trim() === "") {
      return alert("Пустое поле");
    }
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=1d02cf870156c36c20bd2c4215c07516&language=en-US&query=${value}&page=1&include_adult=false`
    )
      .then((res) => res.json())
      .then((res) => setArray(res.results));
    reset();
  };
  const reset = () => {
    setValue("");
  };

  return (
    <div className={s.container}>
      <h1>Search Page</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} placeholder="Enter a movie name" />
        <button type="submit">Search</button>
      </form>

      <ul>
        {array.map((e) => (
          <li className={s.li} key={e.id}>
            <Link
              to={{
                pathname: `/search/${e.id}`,
                state: { from: location, title: "Go back to Search" },
              }}
            >
              {e.title}
            </Link>
          </li>
        ))}
      </ul>
      <Route
        path={`${props.match.path}/${value}`}
        render={(props) => <Cast {...props} casts={array} />}
      />
    </div>
  );
};

export default Search;
