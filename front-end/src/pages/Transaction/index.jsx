import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

// import { Container } from './styles';

function Transaction() {
  const [lote, setLote] = useState(0);

  function handleTransaction(e) {
    e.preventDefault();
  }
  return (
    <div>
      <div>
        <form onSubmit={handleTransaction}>
          <input
            placeholder="lote"
            value={lote}
            onChange={(e) => setLote(e.target.value)}
          />

          <button type="submit">Solicitar</button>
        </form>
      </div>
      <div>
        <Link className="back-link" to="/home">
          <FiArrowLeft size={16} color="#e02041" />
          Voltar para home
        </Link>
      </div>
    </div>
  );
}

export default Transaction;
