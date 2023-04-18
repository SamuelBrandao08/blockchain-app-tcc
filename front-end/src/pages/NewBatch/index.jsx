import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { QRCodeSVG } from "qrcode.react";

import api from "../../services/api";
import "./style.css";
import useContract from "../../hooks/useContract";

import { abi } from "../../abi/RegistrarProducao.json";
import { RegistrarProducao } from "../../abi/address.json";
import { useWeb3Context } from "web3-react";

export default function NewBatch() {
  // const [codigo, setCodigo] = useState(0);
  const [lote, setLote] = useState(100101);
  const [especializacao, setEspecializacao] = useState("Mel de Laranjeira");
  const [producaoId, setProducaoId] = useState(1010);
  const [peso, setPeso] = useState(100);
  const [localizacao, setLocalizacao] = useState("Morada Nova");
  const [date, setDate] = useState(0);
  const [unidades, setUnidades] = useState(0);

  const context = useWeb3Context();
  const contract = useContract(abi, RegistrarProducao);
  const history = useHistory();
  const userId = localStorage.getItem("userId");
  console.log("user ", typeof userId);

  async function handleNewBatch(e) {
    e.preventDefault();
    try {
      // await api.post("mel", data);
      // alert("Produto registrado!");

      console.log(contract);
      let count = 1;
      let state = [];

      for (let i = 0; i < unidades; i++) {
        let cod = Number("" + producaoId + count);

        state.push([
          cod,
          lote,
          especializacao,
          peso,
          date,
          localizacao,
          producaoId,
        ]);
        count++;
      }

      await contract.methods.registerProductList(state, userId).send({
        from: context.account,
      });

      history.push("/batch/new");
    } catch (err) {
      console.log(err);
      alert("Erro no cadastro, tente novamente.");
    }
  }

  return (
    <div className="new-honey-container">
      <div className="content">
        <section>
          <h1>Cadastrar novo Lote de mel</h1>
          <p>Descreva as propriedades do seu mel!</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewBatch}>
          {/* <input
            placeholder="Codigo do Produto"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          /> */}
          <input
            placeholder="Lote do Produto"
            value={lote}
            onChange={(e) => setLote(e.target.value)}
          />
          <input
            placeholder="Especie do mel"
            value={especializacao}
            onChange={(e) => setEspecializacao(e.target.value)}
          />
          <input
            placeholder="Peso"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
          />
          <input
            placeholder="Data de fabricação"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            placeholder="Localização"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
          />
          <input
            placeholder="ID da producao"
            value={producaoId}
            onChange={(e) => setProducaoId(e.target.value)}
          />
          <div className="input-group">
            <input
              placeholder="Unidades"
              value={unidades}
              onChange={(e) => setUnidades(e.target.value)}
            />
          </div>
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
