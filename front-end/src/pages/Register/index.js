import React, { useMemo, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import { useWeb3Context } from "web3-react";
import useContract from "../../hooks/useContract";

import { abi } from "../../abi/Authentication.json";
import { Authentication } from "../../abi/address.json";
import Select from "react-select";
import { profileConstants } from "../../constants/profileConstants";

import api from "../../services/api";
import "./style.css";
import { useEffect } from "react";

var crypto = require("crypto");

const options = Object.values(profileConstants).map((profile) => ({
  label: profile.charAt(0).toUpperCase() + profile.slice(1),
  value: profile,
}));
console.log(options);
export default function Register() {
  const [name, steName] = useState("Samuel Brandao");
  const [certification, setCertification] = useState("123");
  const [company_name, setCompany_name] = useState("Apiario Morda Nova");
  const [company_street, setCompany_street] = useState("Rua A");
  const [company_city, setCompany_city] = useState("Morada Nova");
  const [company_country, setCompany_country] = useState("Brasil");
  const [login, setLogin] = useState("joao");
  const [password, setPassword] = useState("alunoufc");
  const [role, setRole] = useState("produtor");

  const history = useHistory();
  const context = useWeb3Context();

  context.setFirstValidConnector(["MetaMask"]);
  const contract = useMemo(() => {
    if (context.active) {
      return new context.library.eth.Contract(abi, Authentication);
    }
    return null;
  }, [context.active]);

  async function generateId() {
    console.log("aqui");
    do {
      var _id = crypto.randomBytes(4).toString("HEX");
      var response = await contract.methods.activeUser(_id).call();
    } while (response);
    return _id;
  }

  // useEffect(async () => {
  //   var response = await contract.methods
  //     .verifyPassword(login, password)
  //     .call();
  //   if (response) {
  //     alert("Senha válida");
  //   } else {
  //     alert("Senha inválida");
  //   }
  // }, [password]);

  async function handleRegister(e) {
    e.preventDefault();
    const id = await generateId();
    try {
      //const response = await api.post("apicultor", data);
      const response = await contract.methods
        .register(
          [
            context.account,
            id,
            name,
            certification,
            [company_name, company_street, company_city, company_country],
            role,
          ],
          login,
          password
        )
        .send({
          from: context.account,
        });

      console.log("Retorno: ", response.status);
      if (response.status) {
        alert("Usuário cadastrado!");
      }

      //history.push("/");
    } catch (err) {
      console.log(err);
      alert("Erro no cadastro, tente novamente.");
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <h1>Cadastro</h1>
          <p>Faça seu cadastro!</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="darkorange" />
            Voltar para o login
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <div>
            <div className="input-group">
              <div>
                <span>Nome</span>
              </div>
              <input
                placeholder="nome"
                value={name}
                onChange={(e) => steName(e.target.value)}
              />
              <div>
                <span>Certificação</span>
              </div>
              <input
                placeholder="Certificação"
                value={certification}
                onChange={(e) => setCertification(e.target.value)}
              />
              <Select
                defaultValue={role}
                onChange={(e) => setRole(e.value)}
                options={options}
                placeholder="Tipo de usuário"
              />
            </div>
            <div className="input-group">
              <div>
                <span>Usuário</span>
              </div>
              <input
                type="text"
                placeholder="Nome de usuário"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <div>
                <span>Senha</span>
              </div>
              <input
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-group">
              <div>
                <label htmlFor="basic-url">Empresa afiliada</label>
              </div>
              <div>
                <span>Nome da Empresa</span>
              </div>
              <input
                placeholder="Exemplo"
                value={company_name}
                onChange={(e) => setCompany_name(e.target.value)}
              />
              <div>
                <span>Rua</span>
              </div>
              <input
                placeholder="Rua"
                value={company_street}
                onChange={(e) => setCompany_street(e.target.value)}
              />
              <div>
                <span>Cidade</span>
              </div>
              <input
                placeholder="Cidade"
                value={company_city}
                onChange={(e) => setCompany_city(e.target.value)}
              />
              <div>
                <span>País</span>
              </div>
              <input
                placeholder="País"
                value={company_country}
                onChange={(e) => setCompany_country(e.target.value)}
              />
            </div>
          </div>
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
