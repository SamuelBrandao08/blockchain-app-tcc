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

export default function NewHoney() {
  const history = useHistory();

  const [codigo, setCodigo] = useState(1);
  const [lote, setLote] = useState(1);
  const [especializacao, setEspecializacao] = useState("");
  const [producaoId, setProducaoId] = useState(history.location.state);
  const [peso, setPeso] = useState(100);
  const [localizacao, setLocalizacao] = useState("Morada Nova");
  const [date, setDate] = useState(0);
  const [colmeiasId, setColmeiasId] = useState([3, 4]);

  const context = useWeb3Context();
  const contract = useContract(abi, RegistrarProducao);

  const userId = localStorage.getItem("userId");
  console.log("user ", typeof userId);
  const producao_id = history.location.state;
  console.log(producao_id);
  async function handleNewHoney(e) {
    e.preventDefault();

    const data = [
      codigo,
      lote,
      especializacao,
      peso,
      date,
      localizacao,
      producaoId,
    ];

    try {
      // await api.post("mel", data);
      // alert("Produto registrado!");

      console.log(contract);
      await contract.methods.registerProduct2(data, userId).send({
        from: context.account,
      });

      history.push("/honey/new");
    } catch (err) {
      console.log(err);
      alert("Erro no cadastro, tente novamente.");
    }
  }

  async function handleNewProduction(e) {
    e.preventDefault();

    console.log("id producao", producaoId);
    //const data = [peso, data_coleta, localizacao, especialidade, qtd_colmeias];

    try {
      // await api.post("mel", data);
      // alert("Produto registrado!");

      //const contract = await getContract(abi, RegistrarProducao);
      console.log("contato ", contract);
      contract.methods
        .registerProduction(producaoId, peso, localizacao, userId, colmeiasId)
        .send({
          from: context.account,
        });

      history.push("/honey/new");
    } catch (err) {
      console.log(err);
      alert("Erro no cadastro, tente novamente.");
    }
  }

  return (
    <div className="new-honey-container">
      <div className="content">
        <section>
          <h1>Cadastrar novo mel</h1>
          <p>Descreva as propriedades do seu mel!</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>

        <Tabs>
          <TabList>
            <Tab>Produtos beneficiados</Tab>
            <Tab>Produção</Tab>
          </TabList>

          <TabPanel>
            <form onSubmit={handleNewHoney}>
              <input
                placeholder="Codigo do Produto"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />
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
              <button className="button" type="submit">
                Cadastrar
              </button>
            </form>
          </TabPanel>

          <TabPanel>
            <form onSubmit={handleNewProduction}>
              <input
                placeholder="ID da Producao"
                value={producaoId}
                onChange={(e) => setProducaoId(e.target.value)}
              />

              <input
                placeholder="Peso"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
              />

              <input
                placeholder="Localizacao"
                value={localizacao}
                onChange={(e) => setLocalizacao(e.target.value)}
              />

              <input
                placeholder="ID das colmeias"
                value={colmeiasId}
                onChange={(e) => setColmeiasId(e.target.value)}
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
