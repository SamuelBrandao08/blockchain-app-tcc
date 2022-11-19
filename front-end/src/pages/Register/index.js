import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import { useWeb3Context } from "web3-react";
import useContract from "../../hooks/useContract";
import { abi } from "../../abi/Authentication.json";
import { Authentication } from "../../abi/address.json";

import api from "../../services/api";
import "./style.css";
var crypto = require("crypto");

export default function Register() {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("gabriel");
  const [cpf, setCpf] = useState("062827193");
  const [user, setUser] = useState("produtor");
  const [cidade, setCidade] = useState("mn");
  const [email, setEmail] = useState("ga@email");

  const history = useHistory();
  const context = useWeb3Context();
  const contract = useContract(abi, Authentication);

  async function handleRegister(e) {
    e.preventDefault();
    setId(crypto.randomBytes(4).toString("HEX"));
    const contrato = await contract();
    console.log("contrato: ", contrato);
    console.log("id ", id);
    console.log("nome ", nome);

    const data = {
      id,
      nome,
      cpf,
      user,
      cidade,
      email,
    };
    try {
      //const response = await api.post("apicultor", data);

      const response = await contrato.methods
        .registerUser(id, nome, cpf, user, cidade, email)
        .send({
          from: context.account,
        });
      console.log(response);
      alert(`Seu ID de acesso: ${response.id}`);

      history.push("/");
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

          <Link className="back-link" to="">
            <FiArrowLeft size={16} color="darkorange" />
            Voltar para o login
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <input
            placeholder="tipo de usuario"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <div className="input-group">
            <input
              placeholder="Cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
