import React, { useEffect, useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
//import { FiPower } from "react-icons/fi";
import useContract from "../../../hooks/useContract";
import PRC from "../../../abi/Production.json";
import { Production } from "../../../abi/address.json";

import "./style.css";
import api from "../../../services/api";
import { useWeb3Context } from "web3-react";
import { FiArrowLeft } from "react-icons/fi";
import HoneyProduction from "./Componentes/Production/HoneyProduction";
import DispatchedProducts from "./Componentes/Dispatched/DispatchedProducts";
import ProducerTracing from "./Componentes/ProducerTracing";
import useWallet from "../../../hooks/useConnect";
import useConnect from "../../../hooks/useConnect";

function HomeProducer({ userId, userName }) {
  //console.log(userName, userId);
  const [item, setItem] = useState("");

  const [drumId, setDrumId] = useState("");
  const [drum, setDrum] = useState({});
  const [drums, setDrums] = useState([]);

  const [palletId, setPalletId] = useState([]);
  const [pallet, setPallet] = useState({});

  const [dispatcheds, setDispatcheds] = useState([]);
  const [product, setProduct] = useState([]);

  const [batchs, setBatchs] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");

  const context = useWeb3Context();
  //const contract = useContract(PRC.abi, Production);
  const { contract } = useConnect(PRC.abi, Production);

  useEffect(() => {
    getBatchs();
    listDispatched();
  }, [selectedBatch]);

  useEffect(() => {
    if (batchs.length === 0) return;
    listDrums();
  }, [selectedBatch]);

  console.log("lote", selectedBatch);
  const getBatchs = async () => {
    if (contract !== null) {
      const response = await contract.methods.getDrumBatchs(userId).call();
      if (response == 0) return;
      const options = response.map((i) => ({
        label: i,
        value: i,
      }));
      setBatchs(options.reverse());
      setSelectedBatch(options[0].value);
    }
  };

  const listDrums = async () => {
    if (contract !== null) {
      const response = await contract.methods.listDrums(selectedBatch).call();
      setDrums(response);
    }
  };

  const listDispatched = async () => {
    if (contract !== null) {
      const response = await contract.methods.listDispatched(userId).call();
      setDispatcheds(response);
    }
  };

  const handleGetDrum = async (drumId) => {
    try {
      if (contract === null) return;
      return await contract.methods.getDrum(drumId).call();
    } catch (error) {
      alert("Erro na operação.");
    }
  };

  const handleGetPallet = async (palletId) => {
    try {
      if (contract === null);
      return await contract.methods.getPallet(palletId).call();
    } catch (error) {
      alert("Erro na operação.");
    }
  };

  return (
    <div className="profile-container">
      <div>
        <div>
          <HoneyProduction
            drums={drums}
            selectedBatch={selectedBatch}
            setSelectedBatch={setSelectedBatch}
            batchs={batchs}
            setBatchs={setBatchs}
            contract={contract}
          // listProduct={listProduct}
          />

          {/* {product.length && (
            <Product product={product} handleBack={() => setProduct([])} />
          )} */}
        </div>
        {/* <div>
          <form onSubmit={handleGetDrum}>
            <input
              type="text"
              placeholder="ID do produto"
              value={drumId}
              onChange={(e) => setDrumId(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div> */}
      </div>
      <div>
        <DispatchedProducts
          dispatcheds={dispatcheds}
          setDispatcheds={setDispatcheds}
        />
      </div>
      <div>
        <ProducerTracing />
      </div>
    </div>
  );
}

export default HomeProducer;
