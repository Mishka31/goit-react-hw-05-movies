import React from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import Home from "./pages/home.js";
import Search from "./pages/Search.js";
import Films from "./pages/films.js";
// import NotFound from "./pages/NotFound.js";

const App = () => (
  <>
    <ul>
      <li>
        <NavLink exact to="/" className="NavLink" activeClassName="Link--active">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/films" className="NavLink" activeClassName="Link--active">
          Films
        </NavLink>
      </li>
      <li>
        <NavLink to="/search" className="NavLink" activeClassName="Link--active">
          Search
        </NavLink>
      </li>
    </ul>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/search" component={Search} />
      <Route path="/films" component={Films} />
      <Route component={Home} />
    </Switch>
  </>
);

export default App;
