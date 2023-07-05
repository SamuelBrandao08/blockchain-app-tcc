import React, { useState } from "react";
import { FiArrowLeft, FiLogIn } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

//import api from "../../services/api";
import styles from "./style.module.scss";

export default function Login() {
  const { signIn } = useAuth()
  const [login, setLogin] = useState("samuel@email.com");
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
      <div className={styles.header}>
        <Link className="back-link" to="/">
          <FiArrowLeft size={16} color="darkorange" />
          voltar
        </Link>
      </div>
      <section className={styles.form}>
        <div>

          <h1>Faça seu login</h1>
          <form onSubmit={handleLogin}>
            <div>
              <div className={styles.inputWrapper}>
                <label htmlFor="login">Email</label>
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
        </div>
      </section>
    </div>
  );
}