import React, { useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Tracer from "./Components/Tracer";
import Dispatched from "./Components/Dispatched/Dispatched";
import HoneyProduction from "./Components/Production/HoneyProduction";
import ReceivedFeedstock from "./Components/Feedstock/ReceivedFeedstock";
import { useState } from "react";
import useContract from "../../../hooks/useContract";
import { abi } from "../../../abi/Processing.json";
import { Processing } from "../../../abi/address.json";
import useConnect from "../../../hooks/useConnect";

// import { Container } from './styles';

function HomeProcessor({ user }) {
  console.log(user.name, user.id);
  const [feedstock, setFeedstock] = useState([]);
  const [honeys, setHoneys] = useState([]);
  const [dispatcheds, setDispatcheds] = useState([]);

  //const contract = useContract(abi, Processing);
  const { address, contract } = useConnect(abi, Processing);

  useEffect(() => {
    listFeedstock();
    listHoneys();
    listDispatched();
  }, []);
  console.log("carregamento", feedstock);
  async function listFeedstock() {
    if (!contract) return;
    const response = await contract.methods.listFeedstock(user.id).call();
    if (response == 0) return;
    setFeedstock(response);
  }
  console.log("producao", honeys);
  async function listHoneys() {
    if (!contract) return;
    const response = await contract.methods.listHoneys(user.id).call();
    if (response == 0) return;
    setHoneys(response);
  }

  async function listDispatched() {
    if (!contract) return;
    const response = await contract.methods.listDispatched(user.id).call();
    if (response == 0) return;
    setDispatcheds(response);
  }

  return (
    <div className="Profile-content">
      <div>
        <Link className="button" to="/processor/receiver">
          Receber Carregamento
        </Link>
        <div>
          <ReceivedFeedstock feedstock={feedstock} />
        </div>
      </div>

      <div>
        <Link className="button" to="/processor/new/honey">
          Registar Produção
        </Link>
        <div>
          <HoneyProduction honeys={honeys} />
        </div>
      </div>

      <div>
        <Link className="button" to="/processor/dispatcher">
          Despachar Produção
        </Link>
        <div>
          <Dispatched dispatcheds={dispatcheds} />
        </div>
      </div>

      <div>
        <Tracer />
      </div>
    </div>
  );
}

export default HomeProcessor;
