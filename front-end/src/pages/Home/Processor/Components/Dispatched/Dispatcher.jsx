import React, { useState, useMemo } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useWeb3Context } from "web3-react";
import PRC from "../../../../../abi/Processing.json";
import TUC from "../../../../../abi/UpdateTr.json";
import { Processing, UpdateTr } from "../../../../../abi/address.json";
import useContract from "../../../../../hooks/useContract";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import Select from "react-select";
import useUpdateTr from "../../../../../hooks/useUpdateTr";
import useConnect from "../../../../../hooks/useConnect";
// import { Container } from './styles';

const options = [
  { label: "unidade", value: 0 },
  { label: "caixa", value: 1 },
  { label: "palete", value: 2 },
];

function Dispatcher() {
  const userId = localStorage.getItem("userId");

  const [sender, setSender] = useState(userId);
  const [receiver, setReceiver] = useState("Processador");
  const [unit, setUnit] = useState("a828aa3b09/05/2023-00:13:03");
  const [startDate, setStartDate] = useState(new Date());
  const [unitType, setUnitType] = useState("");

  const context = useWeb3Context();
  //const prc = useContract(PRC.abi, Processing);
  //const tuc = useContract(TUC.abi, UpdateTr);
  const prc = useConnect(PRC.abi, Processing);
  const tuc = useConnect(TUC.abi, UpdateTr);
  const updateTr = useUpdateTr(tuc);

  const dispatcher = (e) => {
    e.preventDefault();
    const datetime = format(new Date(startDate), "dd/MM/yyyy-HH:mm");
    try {
      if (!prc);
      prc.methods
        .dispatcher(unit, userId, receiver, unit, datetime)
        .send({
          from: prc.address,
          gas: "800000",
        })
        .then(({ transactionHash }) => {
          updateTr(transactionHash, userId, receiver, unit, datetime);
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

export default Dispatcher;
