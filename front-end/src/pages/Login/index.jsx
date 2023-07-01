import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

//import api from "../../services/api";
import styles from "./style.module.scss";

export default function Login() {
  const { signIn, user } = useAuth()
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
    <div className={styles.container}>
      <section className={styles.form}>
        <h1>Faça seu login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <div className={styles.inputWrapper}>
              <label htmlFor="login">Nome</label>
              <input
                name="login"
                placeholder="Usuário"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>
            <div className={styles.inputWrapper}>
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