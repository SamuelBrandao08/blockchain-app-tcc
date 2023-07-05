import React, { useState, useMemo } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useWeb3Context } from "web3-react";
import PRC from "../../../../abi/Production.json";
import TUC from "../../../../abi/UpdateTr.json";
import { Production, UpdateTr } from "../../../../abi/address.json";

import useContract from "../../../../hooks/useContract";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import Select from "react-select";
import useUpdateTr from "../../../../hooks/useUpdateTr";
import useConnect from "../../../../hooks/useConnect";
import { useAuth } from "../../../../contexts/AuthContext";
// import { Container } from './styles';

const options = [
  { label: "unidade", value: 0 },
  { label: "palete", value: 2 },
];

function ProducerTransaction() {
  const { user } = useAuth()

  const [sender, setSender] = useState(user.id);
  const [receiver, setReceiver] = useState("87060241");
  const [unit, setUnit] = useState("798517751");
  const [startDate, setStartDate] = useState(new Date());
  const [unitType, setUnitType] = useState("");

  const context = useWeb3Context();
  // const prc = useContract(PRC.abi, Production);
  // const tuc = useContract(TUC.abi, UpdateTr);
  const prc = useConnect(PRC.abi, Production);
  const tuc = useConnect(TUC.abi, UpdateTr);
  const updateTr = useUpdateTr(tuc);

  const dispatcher = async (e) => {
    e.preventDefault();
    const datetime = startDate.toISOString();
    try {
      if (!prc) return;
      prc.contract.methods
        .dispatcher(user.id, receiver, unit, datetime)
        .send({
          from: prc.address,
          gas: "800000",
        })
        .then(({ transactionHash }) => {
          updateTr(transactionHash, user.id, receiver, unit, datetime);
        });
    } catch (error) {
      console.log(error);
      alert("Erro na operação.");
    }
  };

  return (
    <div>
      <div className="profile-content">
        <h2>Informações de envio</h2>
        <form onSubmit={dispatcher}>
          <label htmlFor="">Produtor</label>
          <input
            placeholder="Produtor"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
          />
          <label htmlFor="">Destinatário</label>
          <input
            placeholder="Tranportador"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />
          <label htmlFor="">ID da unidade</label>
          <input
            placeholder="ID da unidade"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
          <label htmlFor="">Data de envio</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            dateFormat="dd/MM/yyyy-HH:mm:ss"
          />
          <label htmlFor="">Especificação da Unidade</label>
          <Select
            defaultValue={unitType}
            onChange={(e) => setUnitType(e.value)}
            options={options}
            placeholder="Especificação da Unidade"
          />

          <button type="submit" className="button">
            Despachar
          </button>
        </form>
      </div>
      <div>
        <Link className="back-link" to="/home">
          <FiArrowLeft size={16} color="#e02041" />
          Voltar para home
        </Link>
      </div>
    </div>
  );
}

export default ProducerTransaction;
