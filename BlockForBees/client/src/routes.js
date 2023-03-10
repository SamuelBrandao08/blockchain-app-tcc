import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import SearchHoney from "./components/SearchHoney";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        {/* <Route path="/search" component={SearchHoney} /> */}
        {/* <Route path="/profile" component={Profile} /> */}
      </Switch>
    </BrowserRouter>
  );
}
