import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { QRCodeSVG } from "qrcode.react";

import api from "../../services/api";
import "./style.css";
import useContract from "../../hooks/useContract";

import { abi } from "../../abi/Production.json";
import { Production } from "../../abi/address.json";
import { useWeb3Context } from "web3-react";
import { useAuth } from "../../contexts/AuthContext";

export default function NewHoney() {
  const {user} = useAuth()
  const history = useHistory();

  const [codigo, setCodigo] = useState(0);
  const [lote, setLote] = useState(1);
  const [especializacao, setEspecializacao] = useState("");
  const [producaoId, setProducaoId] = useState(history.location.state);
  const [peso, setPeso] = useState(0);
  const [localizacao, setLocalizacao] = useState("Morada Nova");
  const [date, setDate] = useState(0);
  const [colmeiasId, setColmeiasId] = useState([0]);
  const [producao_id, setProducao_id] = useState(0);

  const context = useWeb3Context();
  const contract = useContract(abi, Production);

  console.log("user ", user.id);
  //const producao_id = history.location.state;

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
      await contract.methods.registerProduct2(data, user.id).send({
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

    try {
      // await api.post("mel", data);
      // alert("Produto registrado!");

      console.log(typeof colmeiasId);
      contract.methods
        .registerProduction(producao_id, peso, localizacao, user.id, [
          colmeiasId,
        ])
        .send({
          from: context.account,
        });

      history.push("/honey/new");
    } catch (err) {
      console.log(err);
      alert("Erro no cadastro, tente novamente.");
    }
  }

  //const [lote, setLote] = useState(100101);
  //const [especializacao, setEspecializacao] = useState("Mel de Laranjeira");
  //const [peso, setPeso] = useState(100);
  //const [localizacao, setLocalizacao] = useState("Morada Nova");
  //const [date, setDate] = useState(0);
  const [unidades, setUnidades] = useState(0);

  console.log("user ", typeof user.id);

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

      await contract.methods.registerProductList(state, user.id).send({
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
          <h1>Cadastrar novo mel</h1>
          <p>Descreva as propriedades do seu mel!</p>

          <Link className="back-link" to="/home">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>

        <Tabs>
          <TabList>
            <Tab>Produtos beneficiados</Tab>
            <Tab>Lote</Tab>
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
