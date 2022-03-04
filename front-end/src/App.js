//import { greeterContract } from './EthereumSetup';
import React from 'react';
//import { useState, useEffect } from 'react';
import './global.css';

import Routes from './routes';


function App() {

  // const [greeting, setGreeting] = useState("");

  // useEffect(() => {
  //   var data = greeterContract.greet()
  //   setGreeting(String(data))
  // },[])


  return (
    
    <Routes/>
    //<h1> "{greeting}" </h1>
  );
}

export default App;
