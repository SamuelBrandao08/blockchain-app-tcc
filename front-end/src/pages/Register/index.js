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

//var crypto = require("crypto");

const options = Object.values(profileConstants).map((profile) => ({
  value: profile,
  label: profile.charAt(0).toUpperCase(),
}));

export default function Register() {
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("alunoufc");
  const [cpf, setCpf] = useState("123123");
  const [user, setUser] = useState("");
  const [cidade, setCidade] = useState("mn");
  const [email, setEmail] = useState("@email");

  const history = useHistory();
  const context = useWeb3Context();

  context.setFirstValidConnector(["MetaMask"]);
  const contract = useMemo(() => {
    if (context.active) {
      return new context.library.eth.Contract(abi, Authentication);
    }
    return null;
  }, [context.active]);

  async function handleRegister(e) {
    e.preventDefault();
    //setId(crypto.randomBytes(4).toString("HEX"));

    const data = {
      nome,
      password,
      cpf,
      user,
      cidade,
      email,
    };
    try {
      //const response = await api.post("apicultor", data);

      console.log("user", user);
      const response = await contract.methods
        .registerUser(context.account, nome, password, cpf, user, cidade, email)
        .send({
          from: context.account,
        });
      console.log("Retorno: ", response);
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

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="darkorange" />
            Voltar para o login
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          <Select
            defaultValue={user}
            onChange={(e) => setUser(e.value)}
            options={options}
            placeholder="Categoria"
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
