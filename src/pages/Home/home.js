import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import s from "./Home.module.css";

function Films(props) {
  const location = useLocation();
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/trending/all/week?api_key=1d02cf870156c36c20bd2c4215c07516")
      .then((res) => res.json())
      .then((res) => setFilms(res.results));
  }, []);

  return (
    <div className={s.container}>
      <h1 className={s.title}>Trending today</h1>
      <List
        sx={{
          width: "100%",
          padding: 0,
          maxWidth: 460,
          bgcolor: "background.paper",
          margin: "auto",
        }}
        aria-label="contacts"
      >
        {films.map((film) => (
          <ListItem key={film.id} disablePadding>
            <Link
              to={{
                pathname: `${props.match.url}/${film.id}`,
                state: { from: location, title: "Go back to Home" },
              }}
            >
              <ListItemButton sx={{ width: "400px", padding: 0, textAlign: "center" }}>
                <ListItemText primary={film.name ?? film.title} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Films;
