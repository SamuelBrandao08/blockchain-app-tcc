import React, { useState, useMemo, useEffect } from "react";
import { useWeb3Context } from "web3-react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import useContract from "../../../../hooks/useContract";
import PRC from "../../../../abi/Production.json";
import TUC from "../../../../abi/UpdateTr.json";
import { Production } from "../../../../abi/address.json";
import { UpdateTr } from "../../../../abi/address.json";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

import useConnect from "../../../../hooks/useConnect";
import useEvent from "../../../../hooks/useEvent";
import api from "../../../../services/api";
import { Header } from "../../../../components/Header";
import { useAuth } from "../../../../contexts/AuthContext";

var crypto = require("crypto");
//import { Container } from "./style";

export function Drum() {
  const { user } = useAuth()
  const history = useHistory();
  const context = useWeb3Context();
  //const prc = useContract(PRC.abi, Production);
  const { address, contract } = useConnect(PRC.abi, Production);
  const eventsListen = useEvent(contract);

  const [batchs, setBatchs] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [code, setCode] = useState("Apiario MN");
  const [weight, setWeight] = useState(20);
  const [packing, setPacking] = useState("Tambor de plastico");
  const [flowering, setflowering] = useState("Jandaira");

  const [startDate, setStartDate] = useState(new Date());
  const [hivesId, setHivesId] = useState("1,2");

  const [drumsId, setDrumsId] = useState("");
  const [response, setResponse] = useState([]);
  console.log(startDate.toISOString());
  const generateBatch = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(contract);
    try {
      if (!contract) return;
      //var _batch = crypto.randomBytes(4).toString("HEX");
      contract.methods
        .generateBatch(user.id, flowering)
        .send({ from: address, gas: "800000" }).then(({ status }) => {
          if (status === true) {
            getBatchs();
          }
        })
    } catch (error) {
      console.log(error);
      alert("Erro na operação.");
    }
  };

  useEffect(() => {
    getBatchs();
  }, []);

  const getBatchs = async () => {
    if (!contract) return;
    const response = await contract.methods.getDrumBatchs(user.id).call();
    if (response == 0) return;
    const options = response.map((i) => ({
      label: i,
      value: i,
    }));
    setBatchs(options.reverse());
    setSelectedBatch(options[0].value);
  };
  console.log("lotes ", batchs);
  console.log("lote selecionado ", selectedBatch);

  useEffect(() => {
    console.log("response ", response.length);
    if (response.length < 2) return;
    const data = {
      user: user.id,
      product: { id: response[0], transactionHash: response[1] },
    };
    console.log(data);
    api.post(`/users`, data, { "Content-Type": "aplication-json" });
    setResponse([]);
  }, [response]);

  const handleNewDrum = async (e) => {
    e.preventDefault();
    try {
      if (!contract) return;
      const datetime = startDate.toISOString();
      console.log("Lote", selectedBatch);
      eventsListen(user.id, setResponse);
      const { transactionHash } = await contract.methods
        .newDrum(
          user.id,
          selectedBatch,
          code,
          weight,
          packing,
          flowering,
          datetime,
          hivesId.split(",")
        )
        .send({
          from: address,
          gas: "800000",
        });
      //setResponse([...response, transactionHash]);
      setResponse((state) => [...state, transactionHash]);

      alert("Success!");
    } catch (error) {
      console.log(error);
      alert("Erro na operação");
    }
  };
  console.log("Retorno", response);

  const handleNewPallet = async (e) => {
    e.preventDefault();
    eventsListen(user.id, setResponse);
    try {
      if (!contract) return;
      const ids = drumsId.split(",");
      console.log(ids);
      const { transactionHash } = await contract.methods
        .newPallet(user.id, selectedBatch, ids)
        .send({
          from: address,
          gas: "800000",
        });
      setResponse([transactionHash]);
      //api.post(`product/user/${user.id}`, response);
    } catch (error) {
      alert("Erro na operação");
    }
  };

  return (
    <div className="new-honey-container">
      <Header />

      <div>
        <section>
          <h1>Cadastrar novo mel</h1>
          <p>Descreva as propriedades do seu mel!</p>

          <Link className="back-link" to="/home">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>

        <Tabs>
          <TabList>
            <Tab>Tambor de Mel</Tab>
            <Tab>Palete</Tab>
          </TabList>

          <TabPanel>
            <form onSubmit={handleNewDrum}>
              <input
                placeholder="Codigo do produto"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <input
                placeholder="Peso liquido"
                name="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <input
                placeholder="Embalagem"
                value={packing}
                onChange={(e) => setPacking(e.target.value)}
              />
              <input
                placeholder="Florada"
                value={flowering}
                onChange={(e) => setflowering(e.target.value)}
              />
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                dateFormat="dd/MM/yyyy-HH:mm:ss"
              />

              <input
                type="text"
                placeholder="Id das colmeias"
                value={hivesId}
                onChange={(e) => setHivesId(e.target.value)}
              />

              <div className="input-group">
                <Select
                  defaultValue={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.value)}
                  options={batchs}
                  placeholder={selectedBatch ?? "loading..."}
                />

                <button className="button" onClick={generateBatch}>
                  Gerar Lote
                </button>
              </div>
              <button className="button" type="submit">
                Adicionar
              </button>
            </form>
          </TabPanel>

          <TabPanel>
            <form onSubmit={handleNewPallet}>
              <input
                placeholder="Lote do Produto"
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
              />

              <input
                placeholder="Unidades que compõem o palete"
                value={drumsId}
                onChange={(e) => setDrumsId(e.target.value)}
              />

              <button className="button" type="submit">
                Cadastrar
              </button>
            </form>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}