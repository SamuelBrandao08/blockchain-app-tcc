import React from "react";
import "./global.css";
import { connectors } from "./utils/connectors";
import Web3Provider from "web3-react";
import Web3 from "web3";
import getLibrary from "./utils/getLibrary";
import AuthContextProvider from "./contexts/AuthContext";
import Routes from "./routes";


function App() {
  return (
    // <Web3Provider
    //   connectors={connectors}
    //   libraryName={getLibrary}
    //   Web3Api={Web3}
    // >
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
    // </Web3Provider>
  );
}

export default App;
