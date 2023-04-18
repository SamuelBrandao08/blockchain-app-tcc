import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import useContract from "../../hooks/useContract";
import { abi } from "../../abi/Authentication.json";
import { Authentication } from "../../abi/address.json";
import { useWeb3Context } from "web3-react";

//import api from "../../services/api";
import "./style.css";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("alunoufc");
  const history = useHistory("");

  const context = useWeb3Context();

  const contract = useContract(abi, Authentication);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      //const response = await api.post("session", { id });

      if (!context.active);
      const response = await contract.methods
        .login(name, password, context.account)
        .call();
      console.log("res ", response);
      localStorage.setItem("userId", response.account);
      localStorage.setItem("userRole", response.user);
      localStorage.setItem("userName", response.name);

      console.log("Usuario ", response);
      history.push("/home");
    } catch (err) {
      console.log(err);
      alert("Falha no login, tente novamente!");
    }
  }
  return (
    <div className="login-container">
      <section className="form">
        <form onSubmit={handleLogin}>
          <h1>Faça seu login!</h1>

          <input
            placeholder="Nome de usario"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>
        </form>

        <Link className="back-link" to="/register">
          <FiLogIn size={16} color="darkorange" />
          Nao tenho cadastro
        </Link>
      </section>
    </div>
  );
}
