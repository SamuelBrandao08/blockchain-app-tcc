import React from "react";
import { useState } from "react";
import { abi } from "../../../../abi/UpdateTr.json";
import { UpdateTr } from "../../../../abi/address.json";
import useContract from "../../../../hooks/useContract";
import { useWeb3Context } from "web3-react";
import useConnect from "../../../../hooks/useConnect";

// import { Container } from './styles';

function ProducerTracing() {
  const [unitId, setUnitId] = useState("");
  const [unit, setUnit] = useState([]);
  const [loading, setLoading] = useState(false);

  const context = useWeb3Context();

  const tuc = useConnect(abi, UpdateTr);

  const trackBack = async (e) => {
    e.preventDefault();
    if (!tuc) return;
    const response = await tuc.contract.methods.search(unitId).call();

    console.log(response);
    //context.library.eth.getTransaction(response.currentTx).then(console.log);
    setUnit(response);
    setLoading(true);
  };

  //console.log("produto ", unit);

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
          {unit.map((element, i) => (
            <ul key={i}>
              <li>TRANSAÇÃO ANTERIOR: {element.previousTx}</li>
              <li>TRANSAÇÃO ATUAL: {element.currentTx}</li>
              <li>ORIGEM: {element.sender}</li>
              <li>DESTINO: {element.receiver}</li>
              <li>UNIDADE: {element.unit}</li>
              <li>DATA: {element.date}</li>
            </ul>
          ))}
        </main>
      )}
    </div>
  );
}

export default ProducerTracing;
