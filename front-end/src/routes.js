import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//import Client from './pages/Client';
import Home from "./pages/Home";
import { Drum } from "./pages/Home/Producer/new/Drum";
import Honey from "./pages/Home/Processor/new/Honey";

import { Client } from "./pages/Client/Client";
import Login from "./pages/Login";
import { Register } from "./pages/Register";
import ProducerTransaction from "./pages/Home/Producer/Transaction";
import Receiver from "./pages/Home/Processor/Components/Feedstock/Receiver";
import Dispatcher from "./pages/Home/Processor/Components/Dispatched/Dispatcher";
import { useAuth } from "./contexts/AuthContext";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

export default function Routes() {
  const { user } = useAuth()

  return (
    <BrowserRouter>
      <Switch>
        <Route render={() => user ? (
          <>
            <Route path="/" exact component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/producer/transaction" component={ProducerTransaction} />
            <Route path="/producer/new/drum" component={Drum} />
            <Route path="/processor/receiver" component={Receiver} />
            <Route path="/processor/new/honey" component={Honey} />
            <Route path="/processor/dispatcher" component={Dispatcher} />
            <Route render={() => <Redirect to="/home" />} />
          </>
        ) : (
          <>
            {/* <Route path="/" exact component={Client} /> */}
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route render={() => <Redirect to="/login" />} />
          </>
        )} />
      </Switch>
    </BrowserRouter>
  );
}
