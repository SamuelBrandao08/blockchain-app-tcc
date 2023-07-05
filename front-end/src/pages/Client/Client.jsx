import React, { useState } from "react";
import PRC from "../../abi/Production.json";
import PSC from "../../abi/Processing.json";
import { Production, Processing } from "../../abi/address.json";
import { SearchHoney } from "./SearchHoney";
import useConnect from "../../hooks/useConnect";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import styles from "./style.module.scss";

export const Client = () => {
  const [unit, setUnit] = useState("");
  const [product, setProduct] = useState([]);
  const [production, setProduction] = useState([]);
  const [colmeia, setColmeia] = useState([]);
  const [txData, setTxData] = useState([]);

  const [search, setSearch] = useState(false);
  const [detail, setDetail] = useState(false);

  const psc = useConnect(PSC.abi, Processing);
  console.log(psc);
  const prc = useConnect(PRC.abi, Production);

  async function handleShowHoney(e) {
    e.preventDefault();
    setSearch(true);
    try {
      if (!psc | !prc) return;

      const response = parseProduct(
        await psc.contract.methods.getHoney(unit).call()
      );
      setProduct(response);
      handleShowProduction(response.feedstockBatch);
    } catch (error) {
      console.log(error);
      alert("Falha na operação");
    }
  }

  async function handleShowProduction(feedstockBatch) {
    try {
      if (!psc | !prc) return;
      setProduction(await prc.contract.methods.getHoney(feedstockBatch).call());
    } catch (error) {
      console.log(error);
      alert("Falha na operação");
    }
  }

  async function verifyTr(tx) {
    const response = await psc.web3.eth.getTransaction(tx);
    setTxData(response);
  }

  const parseProduct = (product) => ({
    id: product?.id,
    lote: product?.batch,
    codigo: product?.code,
    materiaprima: product?.feedstockBatch,
    tipo: product?.honeyType,
    variedade: product?.veriety,
    peso: product?.peso,
    recipiente: product?.packaging,
    validade: product?.validity,
    composição: product?.composition,
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Nome da página </h1>
        <Link className="back-link" to="/login">
          <FiLogIn size={16} color="darkorange" />
          Login
        </Link>
      </div>
      <div className={styles.content}>
        <form onSubmit={handleShowHoney}>
          <input
            placeholder="ID do produto"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
          <button className="button" type="submit">
            Search
          </button>
        </form>
      </div>
      {search && (
        <div>
          <SearchHoney product={product} production={production} />
        </div>
      )}
    </div>
  );
};