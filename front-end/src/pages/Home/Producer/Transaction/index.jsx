import React, { useState, useMemo } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useWeb3Context } from "web3-react";
import PRC from "../../../../abi/Production.json";
import TUC from "../../../../abi/UpdateTr.json";
import { Production, UpdateTr } from "../../../../abi/address.json";

import useContract from "../../../../hooks/useContract";
import DatePicker, { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import Select from "react-select";
import useUpdateTr from "../../../../hooks/useUpdateTr";
import useConnect from "../../../../hooks/useConnect";
import { useAuth } from "../../../../contexts/AuthContext";
import { Header } from "../../../../components/Header";

import styles from "./style.module.scss";

registerLocale("ptBR", ptBR);
const options = [
  { label: "unidade", value: 0 },
  { label: "palete", value: 2 },
];

function ProducerTransaction() {
  const { user } = useAuth();

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
    <div className={styles.container}>
      <Header />
      <div className={styles.backButton}>
        <Link className="back-link" to="/home">
          <FiArrowLeft size={16} color="#e02041" />
          Voltar
        </Link>
      </div>
      <main className={styles.content}>
        <div className={styles.titleForm}>
          <h2>Informações de envio</h2>
        </div>
        <form className={styles.form} onSubmit={dispatcher}>
          {/* <div className={styles.inputWrapper}>
            <label htmlFor="">Produtor</label>
            <input
              placeholder="Produtor"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
            />
          </div> */}
          <div className={styles.inputWrapper}>
            <label htmlFor="">Destinatário</label>
            <input
              placeholder="Tranportador"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="">ID da unidade</label>
            <input
              placeholder="ID da unidade"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="">Data de envio</label>
            <DatePicker
              timeCaption="Horas"
              locale={ptBR}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              dateFormat="dd/MM/yyyy-HH:mm:ss"
              className={styles.datePicker}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="">Especificação da Unidade</label>
            <Select
              className={styles.select}
              defaultValue={unitType}
              onChange={(e) => setUnitType(e.value)}
              options={options}
              placeholder="Especificação da Unidade"
            />
          </div>

          <button type="submit" className="button">
            Despachar
          </button>
        </form>
      </main>
    </div>
  );
}

export default ProducerTransaction;
