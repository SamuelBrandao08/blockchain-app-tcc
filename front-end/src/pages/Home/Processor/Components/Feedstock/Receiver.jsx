import React from "react";
import { useWeb3Context } from "web3-react";
import useContract from "../../../../../hooks/useContract";
import PRC from "../../../../../abi/Processing.json";
import TUC from "../../../../../abi/UpdateTr.json";
import { Processing, UpdateTr } from "../../../../../abi/address.json";
import { useState } from "react";
import { format } from "date-fns";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FiArrowLeft } from "react-icons/fi";
import useUpdateTr from "../../../../../hooks/useUpdateTr";
import useConnect from "../../../../../hooks/useConnect";

// import { Container } from './styles';
const options = [
  { label: "unidade", value: 0 },
  { label: "caixa", value: 1 },
  { label: "palete", value: 2 },
];

function Receiver() {
  const [previousTx, setPreviousTx] = useState("0xa5w4d6a5w4da65d46aw4");
  const [id, setId] = useState("88e2e48719/05/2023-19:52:30");
  const [units, setUnits] = useState("");
  const [distributor, setDistributor] = useState("Seu Jose");
  const [startDate, setStartDate] = useState(new Date());
  const [unitType, setUnitType] = useState(0);

  const [supply, setSupply] = useState([]);

  const context = useWeb3Context();
  // const prc = useContract(PRC.abi, Processing);
  // const tuc = useContract(TUC.abi, UpdateTr);
  const prc = useConnect(PRC.abi, Processing);
  const tuc = useConnect(TUC.abi, UpdateTr);

  const updateTr = useUpdateTr(tuc);
  const userId = localStorage.getItem("userId");

  async function handleReceiver(e) {
    e.preventDefault();
    const date = format(new Date(startDate), "dd/MM/yyyy-HH:mm:ss");
    try {
      if (!prc | !tuc) return;
      prc.contract.methods
        .receiver(
          previousTx,
          id,
          units.split(","),
          distributor,
          date,
          unitType,
          userId
        )
        .send({ from: tuc.address, gas: "800000" })
        .then(({ transactionHash }) => {
          updateTr(transactionHash, userId, distributor, id, date);
        });
      alert("Success!");
    } catch (error) {
      console.log(error);
      alert("Falha na Transação!");
    }
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
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <label htmlFor="">Unidade</label>
            <input
              type="text"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
            />
            <label htmlFor="">Itens que compoem a unidade</label>
            <input
              type="text"
              value={distributor}
              onChange={(e) => setDistributor(e.target.value)}
            />
            <label htmlFor="">Data do recebimento</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelected
              dateFromat="dd/MM/yyyy-HH:mm:ss"
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
          <Link className="back-link" to="/home">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para Home
          </Link>
        </main>
      </div>
    </div>
  );
}

export default Receiver;
