import React, { useState, useMemo } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useWeb3Context } from "web3-react";

function ProductionTableRow(props) {
  const {
    apiary,
    batch,
    date,
    flowering,
    hivesId,
    id,
    packing,
    productorId,
    weight,
  } = props.drum;

  const history = useHistory("");
  const context = useWeb3Context();
  context.setFirstValidConnector(["MetaMask"]);

  const registerHoney = () => {
    history.push({ pathname: "/honey/new", state: id });
  };

  function handleShowHoney() {
    props.listProduct();
  }

  return (
    <tr>
      <td>{id}</td>
      <td>{batch}</td>
      <td>{productorId}</td>
      <td>{apiary}</td>
      <td>{weight}</td>
      <td>{packing}</td>
      <td>{flowering}</td>
      <td>{date}</td>
      <td>{hivesId}</td>

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
export default ProductionTableRow;
