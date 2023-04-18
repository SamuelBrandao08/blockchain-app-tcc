import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//import Client from './pages/Client';
import Home from "./pages/Home";
import NewHoney from "./pages/NewHoney";
import NewBatch from "./pages/NewBatch";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Transaction from "./pages/Transaction";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/transaction" component={Transaction} />
        <Route path="/home" component={Home} />
        <Route path="/honey/new" component={NewHoney} />
        <Route path="/batch/new" component={NewBatch} />
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}
