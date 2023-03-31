import React, { useState, useMemo } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import MelTableRow from "./MelTableRow";
import useContract from "../../hooks/useContract";
import { abi } from "../../abi/RegistrarProducao.json";
import { RegistrarProducao } from "../../abi/address.json";
import { useWeb3Context } from "web3-react";

function ProductionTableRow(props) {
  const { id, WeightTotal, date, localization, apicultorId, colmeiasId } =
    props.production;

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
      <td>{WeightTotal}</td>
      <td>{date}</td>
      <td>{localization}</td>
      <td>{apicultorId}</td>
      <td>{colmeiasId}</td>

      <td>
        <button onClick={() => handleShowHoney()} className="btn btn-danger">
          Ver Produção
        </button>
        <button onClick={() => registerHoney()} className="btn btn-danger">
          Registrar Mel
        </button>
      </td>
    </tr>
  );
}
export default ProductionTableRow;
