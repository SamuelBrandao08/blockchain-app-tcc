import React from "react";
import { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import useContract from "../../../hooks/useContract";
import MRC from "../../../abi/Merchant.json";
import TUC from "../../../abi/Merchant.json";
import { Merchant, UpdateTr } from "../../../abi/address.json";
import { useWeb3Context } from "web3-react";
import { format } from "date-fns";
import { useEffect } from "react";
import HoneySupply from "./Components/HoneySuppy";
import Tracer from "./Components/Tracer";
import useUpdateTr from "../../../hooks/useUpdateTr";
import useConnect from "../../../hooks/useConnect";

// import { Container } from './styles';
const options = [
  { label: "unidade", value: 0 },
  { label: "caixa", value: 1 },
  { label: "palete", value: 2 },
];

function HomeMerchant({ user }) {
  console.log(user.name, user.id);
  const [previousTx, setPreviousTx] = useState("");
  const [sender, setSender] = useState("");
  const [unit, setUnit] = useState("");
  const [subUnits, setSubUnits] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [unitType, setUnitType] = useState(0);

  const [supply, setSupply] = useState([]);

  const context = useWeb3Context();
  // const mrc = useContract(MRC.abi, Merchant);
  // const tuc = useContract(TUC.abi, UpdateTr);
  const mrc = useConnect(MRC.abi, Merchant);
  const tuc = useConnect(TUC.abi, UpdateTr);

  const updateTr = useUpdateTr(tuc);

  async function handleReceiver(e) {
    e.preventDefault();
    const date = format(new Date(startDate), "dd/MM/yyyy-HH:mm:ss");
    try {
      if (!mrc | !tuc) return;
      mrc.contract.methods
        .receiver(sender, user.id, unit, subUnits.split(","), date, unitType)
        .send({ from: mrc.address, gas: "800000" })
        .then(({ transactionHash }) => {
          updateTr(transactionHash, supply, user.id, unit, date);
        });
      alert("Success!");
    } catch (error) {
      console.log(error);
      alert("Falha na Transação!");
    }
  }

  useEffect(() => {
    listSupply();
  }, [supply.length]);

  async function listSupply() {
    if (!mrc) return;
    const response = await mrc.contract.methods
      .listReceivedUnits(user.id)
      .call();
    setSupply(response);
  }

  return (
    <div>
      <div>
        <header>
          <h1>Registrar Produtos Recebidos</h1>
        </header>
        <main>
          <form onSubmit={handleReceiver}>
            <label htmlFor="">Transação Anterior</label>
            <input
              type="text"
              value={previousTx}
              onChange={(e) => setPreviousTx(e.target.value)}
            />
            <label htmlFor="">Fornecedor/Distribuidor</label>
            <input
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
            />
            <label htmlFor="">Unidade</label>
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
            <label htmlFor="">Itens que compoem a unidade</label>
            <input
              type="text"
              value={subUnits}
              onChange={(e) => setSubUnits(e.target.value)}
            />
            <label htmlFor="">Data do recebimento</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelected
              dateFromat="dd/MM/yyyy"
            />
            <label htmlFor="">Tipo da Unidade</label>
            <Select
              valueDefault={unitType}
              onChange={(e) => setUnitType(e.value)}
              options={options}
            />
            <button type="submit" className="button">
              Registrar
            </button>
          </form>
        </main>
      </div>
      <div>
        <HoneySupply supply={supply} />
      </div>
      <div>
        <Tracer />
      </div>
    </div>
  );
}

export default HomeMerchant;
