import React, { useState, useMemo } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import { useWeb3Context } from "web3-react";

function DispachedTableRow(props) {
  const { date, receiver, unit } = props.dispatched;
  console.log("items despachados", props.dispatched);

  const history = useHistory("");

  const registerHoney = () => {
    //history.push({ pathname: "/honey/new", state: id });
  };

  function handleShowHoney() {
    props.listProduct();
  }

  return (
    <tr>
      <td>{receiver}</td>
      <td>{unit}</td>
      <td>{date}</td>

      {/* <td>
        <button onClick={() => handleShowHoney()} className="btn btn-danger">
          Ver Produção
        </button>
        <button onClick={() => registerHoney()} className="btn btn-danger">
          Registrar Mel
        </button>
      </td> */}
    </tr>
  );
}
export default DispachedTableRow;
