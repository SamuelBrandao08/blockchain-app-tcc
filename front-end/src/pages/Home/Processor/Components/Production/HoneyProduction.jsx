import React from "react";
import Select from "react-select";

// import { Container } from './styles';

function HoneyProduction({ honeys }) {
  console.log(honeys);
  function generateTable() {
    if (!honeys) return;
    return honeys.map((honey, i) => {
      return (
        <tr key={i}>
          <td>{honey.id}</td>
          <td>{honey.batch}</td>
          <td>{honey.feedstockBatch}</td>
          <td>{honey.honeyType}</td>
          <td>{honey.variety}</td>
          <td>{honey.weight}</td>
          <td>{honey.packging}</td>
          <td>{honey.validity}</td>
          <td>{honey.composition}</td>
        </tr>
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
            <th>ID</th>
            <th>LOTE</th>
            <th>MATERIA PRIMA</th>
            <th>TIPO</th>
            <th>VARIEDADE</th>
            <th>PESO</th>
            <th>RECIPIENTE</th>
            <th>VALIDADE</th>
            <th>COMPOSIÇÃO</th>
            <th colSpan={2} style={{ textAlign: "center" }}></th>
          </tr>
        </thead>
        <tbody>{generateTable()}</tbody>
      </table>
    </div>
  );
}

export default HoneyProduction;
