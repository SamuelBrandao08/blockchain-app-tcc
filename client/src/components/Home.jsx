import React, { Children } from "react";
import Web3 from "web3";

import { abi } from "../abi/RegistrarProducao.json";
import { RegistrarProducao } from "../abi/address.json";
import { useState } from "react";
import SearchHoney from "./SearchHoney";

const Home = () => {
  const [codigo, setCodigo] = useState(0);
  const [product, setProduct] = useState([]);
  const [production, setProduction] = useState([]);
  const [colmeia, setColmeia] = useState([]);

  const [search, setSearch] = useState(false);
  const [detail, setDetail] = useState(false);

  const web3 = new Web3("HTTP://127.0.0.1:7545");
  const contract = new web3.eth.Contract(abi, RegistrarProducao);

  async function handleShowHoney(e) {
    e.preventDefault();
    setSearch(true);
    try {
      if (!contract) return;
      //console.log(await contract.methods.getProductById(1).call());
      setProduct(await contract.methods.getProductById(codigo).call());
      console.log("contract ", contract);
    } catch (error) {
      console.log(error);
      alert("Falha na operação");
    }
  }
  console.log("produto ", product);
  async function handleDetails(e) {
    e.preventDefault();
    setDetail(true);
    try {
      if (!contract) return;
      setProduction(await contract.methods.getProductionById(e).call());
    } catch (error) {
      alert("Falha na operação");
    }
  }

  return (
    <div className="content">
      {search ? (
        //<HandleShowHoney />
        <SearchHoney />
      ) : (
        <form onSubmit={handleShowHoney}>
          <input
            placeholder="Codigo do produto"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
          <button className="button" type="submit">
            Search
          </button>
        </form>
      )}
    </div>
  );
};
export default Home;
