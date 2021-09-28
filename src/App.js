import { lazy, Suspense } from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import s from "./App.module.css";
import Button from "@material-ui/core/Button";

const HomePage = lazy(() => import("./pages/Home/home.js" /* webpackChunkName: "home-page" */));
const Search = lazy(() => import("./pages/Search/Search.js" /* webpackChunkName: "Search" */));
const FilmDetails = lazy(() =>
  import("./Components/FilmDetails/FilmDetails.js" /* webpackChunkName: "FilmDetails" */)
);

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
    <Suspense fallback={<h1>DOWNLOAD</h1>}>
      <Switch>
        <Route path="/home/:slug" component={FilmDetails} />
        <Route path="/search/:slug" component={FilmDetails} />
        <Route path="/home" exact component={HomePage} />
        <Route path="/search" exact component={Search} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
    <ToastContainer position="top-center" autoClose={3000} />
  </>
);

export default App;
