import React, { useState } from "react";
import Web3 from "web3";

import RegistrarProducao from "../abi/RegistrarProducao.json";
import address from "../abi/address.json";

const SearchHoney = async (props) => {
  const [production, setProduction] = useState([]);

  // const [search, setSearch] = useState(false);
  const [detail, setDetail] = useState(false);

  const web3 = new Web3(Web3.givenProvider);
  const contract = new web3.eth.Contract(
    RegistrarProducao.abi,
    address.RegistrarProducao
  );

  //   async function handleShowHoney(e) {
  //     e.preventDefault();
  //     setSearch(true);
  //     try {
  //       if (!contract) return;
  //       setProduct(await contract.methods.getProductById(codigo).call());
  //       console.log("estou aqui");
  //     } catch (error) {
  //       alert("Falha na operação");
  //     }
  //   }

  async function handleDetails(e) {
    e.preventDefault();
    setDetail(true);
    try {
      if (!contract) return;
      setProduction();
      //await contract.methods.getProductionById(producaoId).call()
    } catch (error) {
      alert("Falha na operação");
    }
  }

  return (
    <div className="home-container">
      <div className="content">
        <strong>Codigo</strong>
        <strong>Lote</strong>
        <strong>Especie do mel</strong>
        <strong>Peso</strong>

        <p>{props.product.codigo}</p>
        <p>{props.product.lote}</p>
        <p>{props.product.especializacao}</p>
        <p>{props.product.peso}</p>

        <button
          onClick={() => handleDetails()}
          type="button"
          color="darkorange"
        >
          Detalhar
        </button>
      </div>
      {detail ? (
        <div>
          <strong>Codigo</strong>
          <strong>Lote</strong>
          <strong>Especie do mel</strong>
          <strong>Peso</strong>

          {production.map((production) => (
            <li>
              <p>{production.WeightTotal}</p>
              <p>{production.date}</p>
              <p>{production.localization}</p>
              <p>{production.apicultorId}</p>
            </li>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default SearchHoney;
