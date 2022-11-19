import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
//import { FiPower } from "react-icons/fi";
import useContract from "../../hooks/useContract";
import { abi } from "../../abi/RegistrarProducao.json";
import { RegistrarProducao } from "../../abi/address.json";

import "./style.css";
import api from "../../services/api";
import { useWeb3Context } from "web3-react";

export default function Profile() {
  const [mel, setMel] = useState([]);
  const [production, setProduction] = useState([]);
  const [batch, setBatch] = useState();

  const contract = useContract(abi, RegistrarProducao);

  const history = useHistory("");

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const userRole = localStorage.getItem("userRole");

  // useEffect(() => {
  //   api
  //     .get("profile", {
  //       headers: {
  //         Authorization: produtorId,
  //       },
  //     })
  //     .then((response) => {
  //       setMel(response.data);
  //     });

  // }, []);

  useEffect(() => {
    (async function fetch() {
      if (contract) {
        setProduction(await contract.methods.listProduction().call());
      }
    })();
  }, [contract]);
  console.log("producao ", production);

  async function handleShowMel(id) {
    try {
      // await api.get(`mel/${id}`, {
      //   headers: {
      //     Authorization: produtorId,
      //   },
      // });
      //const response = await contract.methods.listProductBatch(batch).call();
      //setMel(response);
    } catch (err) {
      alert("Falha na operação");
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <span>Bem vindo, {userName}</span>

        <Link className="button" to="/honey/new">
          Cadastrar novo lote de mel
        </Link>
        <button onClick={handleLogout} type="button" size={18}>
          sair
        </button>
      </header>

      <h1>Produtos cadastrados</h1>

      <ul>
        <strong>Tipo</strong>
        <strong>Fabricação</strong>
        <strong>Validade</strong>
        <strong>Unidades</strong>
        <strong>QRcode</strong>

        {mel.map((mel) => (
          <li key={mel.id}>
            <p>{mel.especializacao}</p>
            <p>{mel.fabricacao}</p>
            <p>{mel.validade}</p>
            <p>{mel.unidades}</p>
            <p>{mel.qrcode}</p>

            <button
              onClick={() => handleShowMel(mel.id)}
              type="button"
              color="darkorange"
            >
              Detalhar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
