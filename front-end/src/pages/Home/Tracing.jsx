import React from "react";
import { useState } from "react";
import { abi } from "../../abi/UpdateTr.json";
import { UpdateTr } from "../../abi/address.json";
import useContract from "../../hooks/useContract";

// import { Container } from './styles';

function Tracing() {
  const [unit, setUnit] = useState("");
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const contract = useContract(abi, UpdateTr);

  const trackBack = (e) => {
    e.preventDefault();
    if (contract !== null) {
      const response = contract.methods.updateTr(unit).call();
      setProduct(response);
      setLoading(true);
    }
    return null;
  };

  console.log("produto ", product);

  return (
    <div>
      <header>
        <h3>Rastreio de Produtos</h3>
        <form onSubmit={trackBack}>
          <input
            placeholder="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
          <button type="submit">search</button>
        </form>
      </header>
      <main>
        {unit.map((unit, index) => (
          <ul key={index}>
            {index + 1 + ":" + unit.unitType}
            <li>TRANSAÇÃO ID: {unit.txId}</li>
            <li>ORIGEM: {unit.sender}</li>
            <li>DESTINO: {unit.receiver}</li>
            <li>UNIDADE: {unit.unit}</li>
            <li>DATA: {unit.date}</li>
            <li>STATUS: {unit.status}</li>
          </ul>
        ))}
      </main>
    </div>
  );
}

export default Tracing;
