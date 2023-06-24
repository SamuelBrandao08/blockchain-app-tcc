import React, { useState } from "react";
import useContract from "../../../hooks/useContract";
import Select from "react-select";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import DBC from "../../../abi/Distributor.json";
import TUC from "../../../abi/UpdateTr.json";
import { Distributor, UpdateTr } from "../../../abi/address.json";
import { useWeb3Context } from "web3-react";
import useUpdateTr from "../../../hooks/useUpdateTr";
import useConnect from "../../../hooks/useConnect";

const options = [
  { label: "unidade", value: 0 },
  { label: "caixa", value: 1 },
  { label: "palete", value: 2 },
];

const HomeDistributor = () => {
  const userId = localStorage.getItem("userId");

  const [supplier, setSupplier] = useState("Seu Jose");
  const [unit, setUnit] = useState("6e6f9ddb20/05/2023-16:47:44");
  const [startDate, setStartDate] = useState(new Date());
  const [local, setLocal] = useState("Comercial Seu Joao");
  const [unitType, setUnitType] = useState(0);

  const [receiver, setReceiver] = useState("Seu Joao");

  const [receivedId, setReceiverId] = useState("");
  const [unitReceived, setUnitReceived] = useState([]);
  const [dispatchedId, setDispatchedId] = useState("");
  const [unitDispatched, setUnitDispatched] = useState([]);

  const context = useWeb3Context();
  // const prc = useContract(DBC.abi, Distributor);
  // const tuc = useContract(TUC.abi, UpdateTr);
  const dbc = useConnect(DBC.abi, Distributor);
  const tuc = useConnect(TUC.abi, UpdateTr);

  const updateTr = useUpdateTr(tuc);

  async function handleReceiver(e) {
    e.preventDefault();
    try {
      if (!dbc | !tuc) return;
      const date = format(new Date(startDate), "dd/MM/yyyy-HH:mm:ss");
      dbc.contract.methods
        .receiver(userId, supplier, unit, date, local, unitType)
        .send({ from: dbc.address, gas: "800000" })
        .then(({ transactionHash }) => {
          updateTr(transactionHash, supplier, userId, unit, date);
        });
      alert("Success!");
    } catch (error) {
      console.log(error);
      alert("Error na operação");
    }
  }
  console.log("unidade recebida", unitReceived);
  async function handleGetReceived(e) {
    e.preventDefault();
    try {
      if (!dbc) return;
      const response = await dbc.contract.methods
        .getReceivedUnits(receivedId)
        .call();
      setUnitReceived(response);
    } catch (error) {
      alert("Erro na operação");
    }
  }

  async function handleDispatcher(e) {
    e.preventDefault();
    try {
      if (!dbc | !tuc) return;
      const date = format(new Date(startDate), "dd/MM/yyyy-HH:mm:ss");
      dbc.contract.methods
        .dispatcher(userId, receiver, unit, date, local, unitType)
        .send({ from: dbc.address, gas: "800000" })
        .then(({ transactionHash }) => {
          updateTr(transactionHash, userId, receiver, unit, date);
        });
    } catch (error) {
      console.log(error);
      alert("Error na operação");
    }
  }

  async function handleGetDispatched(e) {
    e.preventDefault();
    try {
      if (!dbc) return;
      const response = await dbc.contract.methods
        .getDispatchedUnits(dispatchedId)
        .call();
      setUnitDispatched(response);
    } catch (error) {
      alert("Erro na operação");
    }
  }

  return (
    <div>
      <div>
        <div>
          <header>
            <h2>Registrar Recebimento de Produtos</h2>
          </header>
          <main>
            <form onSubmit={handleReceiver}>
              <label htmlFor="">Fornecedor</label>
              <input
                type="text"
                placeholder=""
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
              />
              <label htmlFor="">ID da nidade</label>
              <input
                type="text"
                placeholder=""
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
              <label htmlFor="">Data da coleta</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelected
                dateFromat="dd/MM/yyyy"
              />
              <label htmlFor="">Local da coleta</label>
              <input
                type="text"
                placeholder=""
                value={local}
                onChange={(e) => setLocal(e.target.value)}
              />
              <label htmlFor="">Tipo da Unidade</label>
              <Select
                valueDefault={unitType}
                onChange={(e) => setUnitType(e.value)}
                options={options}
                placeholder=""
              />
              <button type="submit">Registrar</button>
            </form>
          </main>
        </div>
        <div>
          <header>
            <h3>Pesquisar Unidade Recebida</h3>
            <form onSubmit={handleGetReceived}>
              <input
                type="text"
                placeholder="ID da unidade"
                value={receivedId}
                onChange={(e) => setReceiverId(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </header>
          <main>
            {unitReceived.length !== 0 && (
              <ul>
                {unitReceived.unitType}
                <li>ID: {unitReceived.id}</li>
                <li>Fornecedor: {unitReceived.supplierId}</li>
                <li>Data: {unitReceived.dateTime}</li>
                <li>Local: {unitReceived.local}</li>
              </ul>
            )}
          </main>
        </div>
      </div>
      <div>
        <div>
          <header>
            <h2>Despachar Produção</h2>
          </header>
          <main>
            <form onSubmit={handleDispatcher}>
              <label htmlFor="">Destino</label>
              <input
                type="text"
                placeholder=""
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
              />
              <label htmlFor="">ID da unidade</label>
              <input
                type="text"
                placeholder=""
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
              <label htmlFor="">Data de envio</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelected
                dateFromat="dd/MM/yyyy"
              />
              <label htmlFor="">Local da entrega</label>
              <input
                type="text"
                placeholder=""
                value={local}
                onChange={(e) => setLocal(e.target.value)}
              />
              <label htmlFor="">Tipo da Unidade</label>
              <Select
                valueDefault={unitType}
                onChange={(e) => setUnitType(e.value)}
                options={options}
                placeholder=""
              />
              <button type="submit">Registrar</button>
            </form>
          </main>
        </div>

        <div>
          <header>
            <h3>Pesquisar Unidade Despachada</h3>
            <form onSubmit={handleGetDispatched}>
              <input
                type="text"
                placeholder="ID da unidade"
                value={dispatchedId}
                onChange={(e) => setDispatchedId(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </header>
          <main>
            {unitDispatched.length !== 0 && (
              <ul>
                {unitDispatched.unitType}
                <li>ID: {unitDispatched.id}</li>
                <li>Fornecedor: {unitDispatched.receiverId}</li>
                <li>Data: {unitDispatched.date}</li>
                <li>Local: {unitDispatched.local}</li>
              </ul>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
export default HomeDistributor;
