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
  const [id, setId] = useState("");
  const history = useHistory("");

  const context = useWeb3Context();
  const contract = useContract(abi, Authentication);

  // useEffect(() => {
  //   (async function fetch() {
  //     await getConnection();
  //   })();
  //   console.log(context);
  // }, [context.active]);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      //const response = await api.post("session", { id });

      if (!context.active);
      const response = await contract.methods.getUser(id).call();
      console.log("res ", response);
      localStorage.setItem("userId", response.id);
      localStorage.setItem("userRole", response.user);
      localStorage.setItem("userName", response.name);

      history.push("/profile");
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
            placeholder="Seu ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
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
