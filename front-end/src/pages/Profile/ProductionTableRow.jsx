import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

function ProductionTableRow(props) {
  const { id, WeightTotal, date, localization, apicultorId, colmeiasId } =
    props.production;

  const history = useHistory("");

  const registerHoney = () => {
    history.push({ pathname: "/honey/new", state: id });
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{WeightTotal}</td>
      <td>{date}</td>
      <td>{localization}</td>
      <td>{apicultorId}</td>
      <td>{colmeiasId}</td>

      <td>
        <button
          onClick={() => {
            props.handleShowMel();
            {
              console.log("funcao handle");
            }
          }}
          className="btn btn-danger"
        >
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
