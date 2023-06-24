import React from "react";

// import { Container } from './styles';

function HoneySupply({ supply }) {
  function generateTable() {
    if (!supply) return;
    return supply.map((element, i) => {
      return (
        <tr key={i}>
          <td>{element.id}</td>
          <td>{element.units}</td>
          <td>{element.distributorId}</td>
          <td>{element.date}</td>
          <td>{element.unitType}</td>
        </tr>
      );
    });
  }
  return (
    <div>
      <div>
        <h3>Produtos Recebidos</h3>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Sub Itens</th>
            <th>Distribuidor</th>
            <th>Data</th>
            <th>Unidade</th>
            <th colSpan={2} style={{ textAlign: "center" }}></th>
          </tr>
        </thead>
        <tbody>{generateTable()}</tbody>
      </table>
    </div>
  );
}

export default HoneySupply;
