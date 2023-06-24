import React from "react";
import Select from "react-select";

// import { Container } from './styles';

function HoneyProduction({ drums, selectedBatch, setSelectedBatch, batchs }) {
  function generateTable() {
    if (!drums) return;
    return drums.map((drum, i) => {
      return (
        <tr key={i}>
          <td>{drum.id}</td>
          <td>{drum.batch}</td>
          <td>{drum.code}</td>
          <td>{drum.productorId}</td>
          <td>{drum.weight}</td>
          <td>{drum.packing}</td>
          <td>{drum.flowering}</td>
          <td>{drum.date}</td>
          <td>{drum.hivesId}</td>
        </tr>
      );
    });
  }
  return (
    <div>
      <div>
        <h3>Produção</h3>
        <Select
          defaultValue={selectedBatch}
          onChange={(e) => setSelectedBatch(e.value)}
          options={batchs}
          placeholder={selectedBatch ?? "loading..."}
        />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>LOTE</th>
            <th>CODIGO</th>
            <th>PRODUTOR</th>
            <th>PESO</th>
            <th>EMBALAGEM</th>
            <th>FLORADA</th>
            <th>DATA DE FABRICAÇÃO</th>
            <th>COLMEIAS</th>
            <th colSpan={2} style={{ textAlign: "center" }}></th>
          </tr>
        </thead>
        <tbody>{generateTable()}</tbody>
      </table>
    </div>
  );
}

export default HoneyProduction;
