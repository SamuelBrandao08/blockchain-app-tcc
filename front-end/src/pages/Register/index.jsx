import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import { useWeb3Context } from "web3-react";
import useContract from "../../hooks/useContract";
import api from "../../services/api";

import { abi } from "../../abi/Authentication.json";
import { Authentication } from "../../abi/address.json";
import Select from "react-select";
import { profileConstants } from "../../constants/profileConstants";
import useConnect from "../../hooks/useConnect";

import styles from "./style.module.scss";

//var crypto = require("crypto");

const options = Object.values(profileConstants).map((profile) => ({
  label: profile.charAt(0).toUpperCase() + profile.slice(1),
  value: profile,
}));

export function Register() {
  const [name, steName] = useState("Samuel Brandao");
  const [certification, setCertification] = useState("123");
  const [company, setCompany] = useState("Apiario Morda Nova");
  const [email, setEmail] = useState("samuel@email.com");
  const [password, setPassword] = useState("alunoufc");
  const [role, setRole] = useState("produtor");

  const history = useHistory();
  //const context = useWeb3Context();
  //const contract = useContract(abi, Authentication);
  const { address, contract } = useConnect(abi, Authentication);

  // async function generateId() {
  //   do {
  //     var _id = crypto.randomBytes(4).toString("HEX");
  //     var response = await contract.methods.activeUser(_id).call();
  //     console.log("aqui");
  //   } while (response);
  //   return _id;
  // }

  async function handleRegister(e) {
    e.preventDefault();
    console.log(address);
    //const id = await generateId();
    try {
      //const response = await api.post("apicultor", data);
      //if (!context.active) return;
      const response = await contract.methods
        .register(
          [address, "", name, email, certification, company, role],
          password
        )
        .send({
          from: address,
          gas: "800000",
        });

      //api.post("/user", { id: id, address: context.account });

      console.log("Retorno: ", response);
      if (response.status) {
        alert("Usuário cadastrado!");
      }

      history.push("/");
    } catch (err) {
      console.log(err);
      alert("Erro no cadastro, tente novamente.");
    }
  }

  return (
    <div className={styles.registerContainer}>
      <div className={styles.content}>
        <section>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="darkorange" />
            Voltar para o login
          </Link>
          <div>
            <h1>Faça seu cadastro</h1>
            <p>Preencha os campos ao lado e comece a gerenciar sua produção!</p>
          </div>
        </section>

        <form className={styles.form} onSubmit={handleRegister}>
          <div>
            <label htmlFor="">Nome Completo</label>
            <input
              placeholder=""
              value={name}
              onChange={(e) => steName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="">Email</label>
            <input
              type="text"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="">Certificação</label>
            <input
              placeholder="Certificação"
              value={certification}
              onChange={(e) => setCertification(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="">Empresa</label>
            <input
              placeholder=""
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="">Senha</label>
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Select
            className={styles.select}
            defaultValue={role}
            onChange={(e) => setRole(e.value)}
            options={options}
            placeholder="Tipo de usuário"
          />
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
