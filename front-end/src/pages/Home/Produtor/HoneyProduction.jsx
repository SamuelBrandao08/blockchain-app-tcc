import React from "react";
import { useState } from "react";
import ProductionTableRow from "../ProductionTableRow";

// import { Container } from './styles';

function HoneyProduction({ productions, listProduct }) {
  console.log(listProduct);
  function generateTable() {
    if (!productions) return;
    return productions.map((production, i) => {
      return (
        <ProductionTableRow
          production={production}
          listProduct={listProduct}
          key={i}
          // handleShowMel={handleShowMel}
        />
      );
    });
  }
  return (
    <div>
      <h3>Produção</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Peso Total</th>
            <th>Data de coleta</th>
            <th>Localização</th>
            <th>Apicultor</th>
            <th>Colmeias</th>
            <th colSpan={2} style={{ textAlign: "center" }}></th>
          </tr>
        </thead>
        <tbody>{generateTable()}</tbody>
      </table>
    </div>
  );
}

export default HoneyProduction;
