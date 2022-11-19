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

export default function NewHoney() {
  const [producao_id, setProducao_id] = useState(1000);
  const [especialidade, setEspecialidade] = useState("");
  const [peso, setPeso] = useState("");
  const [fabricacao, setFabricacao] = useState("");
  const [validade, setValidade] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [data_coleta, setData_coleta] = useState("");
  const [colmeiasId, setColmeiasId] = useState([]);

  const { getConnection, getContract, context } = useContract();
  const history = useHistory();
  const userId = localStorage.getItem("userId");
  console.log("user ", userId);

  useEffect(() => {
    (async function fetch() {
      await getConnection();
    })();
    console.log(context);
  }, [context.active]);

  async function handleNewHoney(e) {
    e.preventDefault();

    const data = [
      producao_id,
      especialidade,
      peso,
      fabricacao,
      validade,
      localizacao,
    ];

    try {
      // await api.post("mel", data);
      // alert("Produto registrado!");

      // await contract.methods.RegisterProduct2(data).send({
      //   from: context.account,
      // });

      history.push("/honey/new");
    } catch (err) {
      alert("Erro no cadastro, tente novamente.");
    }
  }

  async function handleNewProduction(e) {
    e.preventDefault();

    console.log("id producao", producao_id);
    //const data = [peso, data_coleta, localizacao, especialidade, qtd_colmeias];

    try {
      // await api.post("mel", data);
      // alert("Produto registrado!");

      const contract = await getContract(abi, RegistrarProducao);
      console.log("contato ", contract);
      await contract.methods
        .RegisterProduction(producao_id, peso, localizacao, userId, [
          colmeiasId,
        ])
        .send({
          from: context.account,
        });

      history.push("/honey/new");
    } catch (err) {
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
                placeholder="ID da Producao"
                value={producao_id}
                onChange={(e) => setProducao_id(e.target.value)}
              />

              <input
                placeholder="Peso"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
              />

              <input
                placeholder="Localização"
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

          <TabPanel>
            <form onSubmit={handleNewProduction}>
              <input
                placeholder="ID da Producao"
                value={producao_id}
                onChange={(e) => setProducao_id(e.target.value)}
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
