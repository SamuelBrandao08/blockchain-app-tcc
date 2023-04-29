import React, { useState, useMemo } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useWeb3Context } from "web3-react";
import { abi } from "../../abi/Production.json";
import { Production } from "../../abi/address.json";

// import { Container } from './styles';

function Transaction() {
  const [item, setItem] = useState("");

  const context = useWeb3Context();
  const contract = useMemo(() => {
    if (context.active) {
      return new context.library.eth.Contract(abi, Production);
    }
    return null;
  }, [context.active]);

  const handleForwarding = (e) => {
    e.preventDefault();
    try {
      if (!(context.active & contract))
        contract.methods.forwarding(item).call();
    } catch (error) {
      alert("Erro na operação.");
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleForwarding}>
          <input
            placeholder="ID do item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
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
