import React from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import Home from "./pages/Home/home.js";
import Search from "./pages/Search/Search.js";
import NotFound from "./pages/NotFound/NotFound.js";
import FilmDetails from "./Components/FilmDetails/FilmDetails.js";
import { ToastContainer } from "react-toastify";
import s from "./App.module.css";
import Button from "@material-ui/core/Button";

const App = () => (
  <>
    <div className={s.buttons}>
      <NavLink exact to="/home" className="NavLink" activeClassName="Link--active">
        <Button variant="contained" color="primary">
          Home
        </Button>
      </NavLink>
      <NavLink to="/search" className="NavLink" activeClassName="Link--active">
        <Button variant="contained" color="primary">
          Search
        </Button>
      </NavLink>
    </div>

    <Switch>
      <Route path="/home/:id" component={FilmDetails} />
      <Route path="/search/:id" component={FilmDetails} />
      <Route path="/home" component={Home} />
      <Route path="/search" component={Search} />
      <Route component={NotFound} />
    </Switch>
    <ToastContainer position="top-center" autoClose={3000} />
  </>
);

export default App;
