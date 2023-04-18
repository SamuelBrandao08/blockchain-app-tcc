import React, { useState } from "react";
import Web3 from "web3";

import { abi } from "../abi/RegistrarProducao.json";
import { RegistrarProducao } from "../abi/address.json";

const SearchHoney = ({ product }) => {
  const web3 = new Web3(Web3.givenProvider);
  const contract = new web3.eth.Contract(abi, RegistrarProducao);

  // async function handleShowHoney(e) {
  //   e.preventDefault();
  //   setSearch(true);
  //   try {
  //     if (!contract) return;
  //     setProduct(await contract.methods.getProductById(codigo).call());
  //   } catch (error) {
  //     alert("Falha na operação");
  //   }
  // }

  return (
    <div className="home-container">
      <div className="content">
        <strong>Codigo</strong>
        <strong>Lote</strong>
        <strong>Especie do mel</strong>
        <strong>Peso</strong>

        <div>
          <p>{product?.codigo}</p>
          <p>{product?.lote}</p>
          <p>{product?.especializacao}</p>
          <p>{product?.peso}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchHoney;
