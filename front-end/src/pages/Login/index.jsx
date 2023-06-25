import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

//import api from "../../services/api";
import "./style.css";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const {signIn, user} = useAuth()
  const [login, setLogin] = useState("samuel");
  const [password, setPassword] = useState("alunoufc");
  const history = useHistory("");

  async function handleLogin(e) {
    e.preventDefault();
    const user = await signIn(login, password)
    if (user) {
      history.push("/home")
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <form onSubmit={handleLogin}>
          <div>
            <div className="inputWrapper">
              <label htmlFor="login">Login</label>
              <input
                name="login"
                placeholder="Usuário"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="password">Senha</label>
              <input
                placeholder="Senha"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
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
