import React from "react";
import Select from "react-select";
import DispatchedTableRow from "./DispatchedTableRow";
import { ListBatchs } from "../ListBatchs";

// import { Container } from './styles';

function DispatchedProducts({ dispatcheds }) {
  console.log("items despachados", dispatcheds);
  function generateTable() {
    if (!dispatcheds) return;
    return dispatcheds.map((dispatched, i) => {
      return (
        <DispatchedTableRow
          dispatched={dispatched}
          key={i}
          //listProduct={listProduct}
        />
      );
    });
  }
  return (
    <div>
      <div>
        <h3>Produção</h3>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>DESTINO</th>
            <th>UNIDADE</th>
            <th>DATA DE ENVIO</th>

            <th colSpan={2} style={{ textAlign: "center" }}></th>
          </tr>
        </thead>
        <tbody>{generateTable()}</tbody>
      </table>
    </div>
  );
}

export default DispatchedProducts;
