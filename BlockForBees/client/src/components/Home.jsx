import React, { Children } from "react";
import Web3 from "web3";

import { abi } from "../abi/RegistrarProducao.json";
import { RegistrarProducao } from "../abi/address.json";
import { useState } from "react";
import SearchHoney from "./SearchHoney";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [codigo, setCodigo] = useState(1);
  const [product, setProduct] = useState({});
  const [production, setProduction] = useState([]);
  const [colmeia, setColmeia] = useState([]);

  const [search, setSearch] = useState(false);
  const [detail, setDetail] = useState(false);

  const history = useHistory();

  const web3 = new Web3("HTTP://127.0.0.1:7545");
  const contract = new web3.eth.Contract(abi, RegistrarProducao);

  async function handleShowHoney(e) {
    e.preventDefault();
    setSearch(true);
    try {
      if (!contract) return;
      console.log("contract ", contract);
      console.log(await contract.methods.getProductById(codigo).call());
      setProduct(
        parseProduct(await contract.methods.getProductById(codigo).call())
      );
      //history.push({ pathname: "/search", state: product });
      console.log("aqui");
    } catch (error) {
      console.log(error);
      alert("Falha na operação");
    }
  }

  const parseProduct = (product) => ({
    codigo: product?.codigo,
    lote: product?.lote,
    especializacao: product?.especializacao,
    peso: product?.peso,
  });

  return (
    <div className="content">
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
      {search && (
        <div>
          <SearchHoney product={product} />
        </div>
      )}
    </div>
  );
};
export default Home;
