import React from "react";
import useContract from "../../../../hooks/useContract";
import { abi } from "../../../../abi/UpdateTr.json";
import { UpdateTr } from "../../../../abi/address.json";
import { useState } from "react";

// import { Container } from './styles';

function Tracer() {
  const [unitId, setUnitId] = useState("");
  const [unit, setUnit] = useState([]);
  const [loading, setLoading] = useState(false);

  const contract = useContract(abi, UpdateTr);

  const trackBack = async (e) => {
    e.preventDefault();
    if (contract !== null) {
      const response = await contract.methods.search(unitId).call();
      setUnit(response);
      setLoading(true);
    }
    return null;
  };

  console.log("produto ", unit);
  return (
    <div>
      <header>
        <h3>Rastreio de Produtos</h3>
        <form onSubmit={trackBack}>
          <input
            placeholder="ID da unidade"
            value={unitId}
            onChange={(e) => setUnitId(e.target.value)}
          />
          <button type="submit">search</button>
        </form>
      </header>
      {loading && (
        <main>
          {unit.map((element, i) => {
            <ul key={i}>
              <li>TRANSAÇÃO ANTERIOR: {element.previousTx}</li>
              <li>TRANSAÇÃO ATUAL: {element.currentTx}</li>
              <li>ORIGEM: {element.sender}</li>
              <li>DESTINO: {element.receiver}</li>
              <li>UNIDADE: {element.unit}</li>
              <li>DATA: {element.date}</li>
            </ul>;
          })}
        </main>
      )}
    </div>
  );
}

export default Tracer;
