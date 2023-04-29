import React from "react";
import { useState } from "react";
import { useWeb3Context } from "web3-react";

// import { Container } from './styles';

function Tracing({ context, contract }) {
  const [item, setItem] = useState("");
  const [tracing, setTracing] = useState({});

  const handleTracing = async (e) => {
    e.preventDefault();
    try {
      if (!(context.active & contract)) console.log("aqui");
    } catch (error) {
      alert("Erro na operação.");
    }
  };

  return (
    <div>
      <header>
        <h3>Rastreamento</h3>
        <form onSubmit={handleTracing}>
          <input
            placeholder="ID do item, ID do produtor ou Destinatario"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <button type="submit">search</button>
        </form>
      </header>
      <main></main>
    </div>
  );
}

export default Tracing;
