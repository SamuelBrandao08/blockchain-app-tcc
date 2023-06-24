import React from "react";
import Select from "react-select";

// import { Container } from './styles';

function Dispatched({ dispatcheds }) {
  console.log("despachados", dispatcheds);
  function generateTable() {
    if (!dispatcheds) return;
    return dispatcheds.map((dispatched, i) => {
      return (
        <tr key={i}>
          <td>{dispatched.unit}</td>
          <td>{dispatched.receiver}</td>
          <td>{dispatched.date}</td>
        </tr>
      );
    });
  }
  return (
    <div>
      <div>
        <h3>Produtos Despachados</h3>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>SUB UNIDADES</th>
            <th>DISTRIBUIDOR</th>
            <th>DATA</th>
            <th>TIPO DA UNIDADE</th>
            <th colSpan={2} style={{ textAlign: "center" }}></th>
          </tr>
        </thead>
        <tbody>{generateTable()}</tbody>
      </table>
    </div>
  );
}

export default Dispatched;
