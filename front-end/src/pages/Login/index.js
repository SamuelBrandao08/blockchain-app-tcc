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
  const [login, setLogin] = useState("samuel");
  const [password, setPassword] = useState("alunoufc");
  const history = useHistory("");

  const context = useWeb3Context();
  context.setFirstValidConnector(["MetaMask"]);
  const contract = useContract(abi, Authentication);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      //const response = await api.post("session", { id });

      if (!(context.active & contract));
      const response = await contract.methods.logon(login, password).call();
      if (response[1]) {
        localStorage.setItem("userId", response[0].id);
        localStorage.setItem("userName", response[0].name);
        localStorage.setItem("userRole", response[0].role);
        history.push("/home");
      } else {
        alert("Usuario ou senha incoretos!");
      }
    } catch (err) {
      console.log(err);
      alert("Falha no login, tente novamente!");
    }
  }
  return (
    <div className="login-container">
      <section className="form">
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="basic-url">Login</label>
            <input
              placeholder="Usuário"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <input
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button" type="submit">
              Entrar
            </button>
          </div>
        </form>

        <Link className="back-link" to="/register">
          <FiLogIn size={16} color="darkorange" />
          Nao tenho cadastro
        </Link>
      </section>
    </div>
  );
}
