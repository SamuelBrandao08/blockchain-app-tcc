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
  label:
    Object.keys(profile)[0].charAt(0).toUpperCase() +
    Object.keys(profile)[0].slice(1),
  value: Object.values(profile)[0],
}));
console.log(options);
export default function Register() {
  // string memory _type,
  // address _addr,
  // string memory _name,
  // string memory _password,
  // string memory _town,
  // string memory _apiary,
  // string memory _email,
  // string memory _stablishment,
  // string memory _certification

  const [role, setRole] = useState("");
  const [name, steName] = useState("");
  const [password, setPassword] = useState("");
  const [town, setTown] = useState("");
  const [apiary, setApiary] = useState("");
  const [email, setEmail] = useState("");
  const [stablishment, setStablishment] = useState("");
  const [certification, setCertification] = useState("");

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
    try {
      //const response = await api.post("apicultor", data);

      console.log("user", role);
      const response = await contract.methods
        .register(
          role,
          context.account,
          name,
          password,
          town,
          apiary,
          email,
          stablishment,
          certification
        )
        .send({
          from: context.account,
        });
      console.log("Retorno: ", response);
      alert("Usuário cadastrado!");

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
            placeholder="nome"
            value={name}
            onChange={(e) => steName(e.target.value)}
          />
          <input
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Select
            defaultValue={role}
            onChange={(e) => setRole(e.value)}
            options={options}
            placeholder="Tipo de usuário"
          />
          {role === "productor" && (
            <>
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                placeholder="Cidade"
                value={town}
                onChange={(e) => setTown(e.target.value)}
              />

              <input
                placeholder="Apiário"
                value={apiary}
                onChange={(e) => setApiary(e.target.value)}
              />
            </>
          )}
          {role === "processor" && (
            <input
              placeholder="Certificação"
              value={certification}
              onChange={(e) => setCertification(e.target.value)}
            />
          )}

          {["processor", "merchant"].includes(role) && (
            <input
              placeholder="Estabelecimento"
              value={stablishment}
              onChange={(e) => setStablishment(e.target.value)}
            />
          )}
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
