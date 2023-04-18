import * as ReactDOMClient from "react-dom/client";
import App from "./App";

const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(<App />);

// import React from "react";
// import ReactDOM from "react-dom";

// import App from "./App";

// ReactDOM.render(
//   // <React.StrictMode>
//   //   <App />
//   // </React.StrictMode>,
//   <App />,
//   document.getElementById("root")
// );
