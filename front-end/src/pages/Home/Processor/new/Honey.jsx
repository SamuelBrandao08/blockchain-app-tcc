import React, { useState } from "react";
import Select from "react-select";
import { useWeb3Context } from "web3-react";
import useContract from "../../../../hooks/useContract";
import { abi } from "../../../../abi/Processing.json";
import { Processing } from "../../../../abi/address.json";
import { FiArrowLeft } from "react-icons/fi";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import useEvent from "../../../../hooks/useEvent";
import api from "../../../../services/api";
import useConnect from "../../../../hooks/useConnect";
//var crypto = require("crypto");
// import { Container } from './styles';

const honeyOptions = [
  { label: "Orgânico", value: "organico" },
  { label: "Comum", Value: "comum" },
];

function Honey() {
  const [id, setId] = useState("");
  const [batchs, setBatchs] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [feedstockBatch, setFeedstockBatch] = useState("materia prima");
  const [honeyType, setHoneyType] = useState("");
  const [variety, setVariety] = useState("Silvestre");
  const [weight, setWeight] = useState("100");
  const [container, setContainer] = useState("pote de vidro");
  const [startDate, setStartDate] = useState(new Date());
  const [composition, setComposition] = useState("carboidrato - 100%");

  const [arrayId, setArrayId] = useState("");
  const [response, setResponse] = useState([]);

  const context = useWeb3Context();
  //const contract = useContract(abi, Processing);
  const { address, contract } = useConnect(abi, Processing);
  const eventsListen = useEvent(contract);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    console.log("response ", response);
    if (response.length < 2) return;
    const data = {
      user: userId,
      product: { id: response[1], transactionHash: response[0] },
    };
    console.log(data);
    api.post(`/users`, data, { "Content-Type": "aplication-json" });
  }, [response]);

  async function handleNewHoney(e) {
    e.preventDefault();
    eventsListen(userId, setResponse);
    try {
      if (!contract) return;
      const date = format(new Date(startDate), "dd/MM/yyyy-HH:mm:ss");
      console.log("lote", selectedBatch);
      const { transactionHash } = await contract.methods
        .newHoney(
          [
            id,
            selectedBatch,
            feedstockBatch,
            honeyType,
            variety,
            weight,
            container,
            date,
            composition,
          ],
          userId
        )
        .send({
          from: address,
          gas: "800000",
        });
      setResponse([transactionHash]);
    } catch (error) {
      alert("Falha na operação");
    }
  }

  async function handleNewBox(e) {
    e.preventDefault();
    eventsListen(userId, setResponse);
    try {
      if (!contract) return;
      const date = format(new Date(startDate), "dd/MM/yyyy-HH:mm:ss");
      const hives = arrayId.split(",");
      const { transactionHash } = await contract.methods
        .newBox(hives, userId, selectedBatch, date)
        .send({
          from: address,
          gas: "800000",
        });
      setResponse([transactionHash]);
    } catch (error) {
      console.log(error);
      alert("Falha na operação");
    }
  }

  async function handleNewPallet(e) {
    e.preventDefault();
    eventsListen(userId, setResponse);
    try {
      if (!contract) return;
      const { transactionHash } = await contract.methods
        .newPallet(arrayId, selectedBatch, userId)
        .send({
          from: address,
          gas: "800000",
        });
      setResponse([transactionHash]);
    } catch (error) {
      alert("Falha na operação");
    }
  }

  async function generateBatch(e) {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (!contract) return;
      //var _batch = crypto.randomBytes(4).toString("HEX");
      contract.methods
        .generateBatch(userId, feedstockBatch, variety)
        .send({ from: context.account });
    } catch (error) {
      console.log(error);
      alert("Erro na operação.");
    }
  }

  useEffect(() => {
    getBatchs();
  }, [contract]);

  useEffect(() => {
    if (batchs.length == 0) return;
    setSelectedBatch(batchs.at(-1).value);
  }, [batchs.length]);

  const getBatchs = async () => {
    if (!contract) return;
    const response = await contract.methods.getHoneyBatchs(userId).call();
    const options = response.map((i) => ({
      label: i,
      value: i,
    }));
    setBatchs(options);
  };

  return (
    <div className="new-honey-container">
      <div className="content">
        <section>
          <h1>Registrar Produção</h1>
          <p>Registre aqui o beneficiamento de produtos, caixas ou paletes</p>

          <Link className="back-link" to="/home">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>

        <Tabs>
          <TabList>
            <Tab>Beneficiamento</Tab>
            <Tab>Caixa</Tab>
            <Tab>Palete</Tab>
          </TabList>

          <TabPanel>
            <form onSubmit={handleNewHoney}>
              <label htmlFor="">ID do tambor de mel</label>
              <input
                placeholder=""
                value={feedstockBatch}
                onChange={(e) => setFeedstockBatch(e.target.value)}
              />
              <label htmlFor="">Tipo do mel</label>
              <Select
                placeholder=""
                valueDefault={honeyType}
                onChange={(e) => setHoneyType(e.value)}
                options={honeyOptions}
              />
              <label htmlFor="">Variedade do mel</label>
              <input
                placeholder=""
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
              />
              <label htmlFor="">Peso</label>
              <input
                placeholder=""
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />

              <label htmlFor="">Recipiente</label>
              <input
                placeholder=""
                value={container}
                onChange={(e) => setContainer(e.target.value)}
              />
              <label htmlFor="">Validade</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                dateFormat="dd/MM/yyyy-HH:mm:ss"
              />
              <label htmlFor="">Composição</label>
              <input
                type="text"
                placeholder=""
                value={composition}
                onChange={(e) => setComposition(e.target.value)}
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
            <form onSubmit={handleNewBox}>
              <input
                placeholder="Lote do Produto"
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
              />

              <input
                placeholder="Unidades que compõem a caixa"
                value={arrayId}
                onChange={(e) => setArrayId(e.target.value)}
              />

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
                value={arrayId}
                onChange={(e) => setArrayId(e.target.value)}
              />

              <button className="button" type="submit">
                Adicionar
              </button>
            </form>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default Honey;
