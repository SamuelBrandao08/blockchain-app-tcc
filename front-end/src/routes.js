import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { connectors } from "./utils/connectors";
import Web3Provider from "web3-react";
import Web3 from "web3";
import getLibrary from "./utils/getLibrary";

//import Client from './pages/Client';
import Profile from "./pages/Profile";
import NewHoney from "./pages/NewHoney";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        {/* <Route path="/client" component={Client} /> */}
        <Route path="/profile" component={Profile} />
        <Route path="/honey/new" component={NewHoney} />
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}
