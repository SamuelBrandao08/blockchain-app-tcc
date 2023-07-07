import { useEffect, useState } from "react";
import Select from "react-select";
import useConnect from "../../../../../hooks/useConnect";
import DBC from "../../../../../abi/Distributor.json";
import TUC from "../../../../../abi/UpdateTr.json";
import { Distributor, UpdateTr } from "../../../../../abi/address.json";
import { format } from "date-fns";
import { useAuth } from "../../../../../contexts/AuthContext";
import useUpdateTr from "../../../../../hooks/useUpdateTr";
import { Header } from "../../../../../components/Header";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FiArrowLeft } from "react-icons/fi";
import DatePicker, { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale";

import styles from "./style.module.scss";

registerLocale("ptBR", ptBR);

const options = [
  { label: "unidade", value: 0 },
  { label: "caixa", value: 1 },
  { label: "palete", value: 2 },
];

export function DistributorReceiver() {
  const { user } = useAuth();
  const [supplier, setSupplier] = useState("Seu Jose");
  const [unit, setUnit] = useState("6e6f9ddb20/05/2023-16:47:44");
  const [startDate, setStartDate] = useState(new Date());
  const [local, setLocal] = useState("Comercial Seu Joao");
  const [unitType, setUnitType] = useState(0);
  const [receiveds, setReceiveds] = useState([]);

  const dbc = useConnect(DBC.abi, Distributor);
  const tuc = useConnect(TUC.abi, UpdateTr);

  const updateTr = useUpdateTr(tuc);

  async function handleReceiver(e) {
    e.preventDefault();
    try {
      if (!dbc | !tuc) return;
      const date = format(new Date(startDate), "dd/MM/yyyy-HH:mm:ss");
      dbc.contract.methods
        .receiver(user.id, supplier, unit, date, local, unitType)
        .send({ from: dbc.address, gas: "800000" })
        .then(({ transactionHash }) => {
          updateTr(transactionHash, supplier, user.id, unit, date);
        });
      alert("Success!");
    } catch (error) {
      console.log(error);
      alert("Error na operação");
    }
  }
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
          <h2>Registrar Recebimento de Produtos</h2>
        </div>
        <form className={styles.form} onSubmit={handleReceiver}>
          <div className={styles.inputWrapper}>
            <label htmlFor="">Fornecedor</label>
            <input
              type="text"
              placeholder=""
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="">ID da unidade</label>
            <input
              type="text"
              placeholder=""
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="">Data da coleta</label>
            <DatePicker
              timeCaption="Horas"
              locale={ptBR}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              dateFormat="dd/MM/yyyy"
              className={styles.datePicker}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="">Local da coleta</label>
            <input
              type="text"
              placeholder=""
              value={local}
              onChange={(e) => setLocal(e.target.value)}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="">Tipo da Unidade</label>
            <Select
              className={styles.select}
              valueDefault={unitType}
              onChange={(e) => setUnitType(e.value)}
              options={options}
              placeholder="Selecione o tipo de unidade"
            />
          </div>
          <button className="button" type="submit">Registrar</button>
        </form>
      </main>
    </div>
  )
}