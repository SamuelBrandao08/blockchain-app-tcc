import React from "react";
import Select from "react-select";

// import { Container } from './styles';

function ReceivedFeedstock({ feedstock }) {
  console.log("carregamento", feedstock);
  function generateTable() {
    if (!feedstock) return;
    return feedstock.map((feedstock, i) => {
      return (
        <tr key={i}>
          <td>{feedstock.id}</td>
          <td>{feedstock.feedstockIds}</td>
          <td>{feedstock.distributorId}</td>
          <td>{feedstock.dateTime}</td>
          <td>{feedstock.unitType}</td>
        </tr>
      );
    });
  }
  return (
    <div>
      <div>
        <h3>Fornecimento</h3>
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

export default ReceivedFeedstock;
