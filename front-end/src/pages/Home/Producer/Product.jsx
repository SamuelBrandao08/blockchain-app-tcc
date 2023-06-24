import React from "react";

// import { Container } from './styles';

function Product({ product, handleBack }) {
  function generateTable() {
    console.log("produto ", product);
    if (!product) return;
    return product.map((product, i) => {
      return <div />;
    });
  }
  return (
    <main>
      <h3>Produtos Beneficiados</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Lote</th>
            <th>Especializacao</th>
            <th>Peso</th>
            <th>Data</th>
            <th>Localizacao</th>
            <th>ID Producao</th>
            <th colSpan={2} style={{ textAlign: "center" }}></th>
          </tr>
        </thead>
        <tbody>{generateTable()}</tbody>
      </table>
      <button onClick={handleBack}>Voltar</button>
    </main>
  );
}

export default Product;
