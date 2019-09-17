import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import Movie from "./Components/movie";
import Movies from "./Components/movies";
import Nav from "./Presentational/Nav";

ReactDOM.render(
  <BrowserRouter>
    <Nav>
      <Switch>
        <Route exact path="/" component={Movies} />
        <Route exact path="/movie/:movie_id" component={Movie} />
      </Switch>
    </Nav>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
