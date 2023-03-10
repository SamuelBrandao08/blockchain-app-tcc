import React from "react";
import { useState } from "react";

// import { Container } from './styles';

function Tracing() {
  const [lote, setLote] = useState("");
  return (
    <div>
      <header>
        <h3>Rastreamento</h3>
        <form action="">
          <input
            placeholder="lote"
            value={lote}
            onChange={(e) => setLote(e.target.value)}
          />
          <button type="submit">search</button>
        </form>
      </header>
      <main></main>
    </div>
  );
}

export default Tracing;
