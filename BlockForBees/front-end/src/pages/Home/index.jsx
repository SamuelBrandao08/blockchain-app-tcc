import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
//import { FiPower } from "react-icons/fi";
import useContract from "../../hooks/useContract";
import { abi } from "../../abi/RegistrarProducao.json";
import { RegistrarProducao } from "../../abi/address.json";

import "./style.css";
import api from "../../services/api";
import { useWeb3Context } from "web3-react";
import ProductionTableRow from "./ProductionTableRow";
import MelTableRow from "./MelTableRow";
import { FiArrowLeft } from "react-icons/fi";
import { profileConstants } from "../../constants/profileConstants";
import HomeProdutor from "./Produtor/homeProdutor";
import HomeDistribuidor from "./Distribuidor/homeDistribuidor";

export default function Home() {
  const [mel, setMel] = useState([]);
  const [productions, setProductions] = useState([]);
  const [batch, setBatch] = useState();

  const [showMel, setShowMel] = useState(false);

  const context = useWeb3Context();
  const contract = useContract(abi, RegistrarProducao);
  console.log(context);
  const history = useHistory("");

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    (async function fetch() {
      if (contract) {
        setProductions(await contract.methods.listProduction().call());
      }
    })();
  }, [contract]);
  console.log("producao ", productions);

  async function handleShowMel() {
    // try {
    //   // await api.get(`mel/${id}`, {
    //   //   headers: {
    //   //     Authorization: produtorId,
    //   //   },
    //   // });
    //   //const response = await contract.methods.listProductBatch(batch).call();
    //   //setMel(response);
    // } catch (err) {
    //   alert("Falha na operação");
    // }

    if (contract) {
      setMel(await contract.methods.listProduct().call());
      setShowMel(true);
    }

    console.log("funcao handleShowMel");

    // return (
    //   <main>
    //     {console.log("aqui")}
    //     <h3>Produto Beneficiado</h3>
    //     <table className="table table-striped">
    //       <thead>
    //         <tr>
    //           <th>ID</th>
    //           <th>Peso Total</th>
    //           <th>Data de coleta</th>
    //           <th>Localização</th>
    //           <th>Apicultor</th>
    //           <th>Colmeias</th>
    //           <th colSpan={2} style={{ textAlign: "center" }}></th>
    //         </tr>
    //       </thead>
    //       <tbody>{generateTable2()}</tbody>
    //       {console.log("genarateTable2")}
    //     </table>
    //   </main>
    // );
  }
  console.log("mel ", mel);

  function handleLogout() {
    localStorage.clear();

    history.push("/");
  }

  function generateTable() {
    if (!productions) return;
    return productions.map((production, i) => {
      return (
        <ProductionTableRow
          production={production}
          key={i}
          handleShowMel={handleShowMel}
        />
      );
    });
  }

  function generateTable2() {
    if (!mel) return;
    return mel.map((mel, i) => {
      return <MelTableRow mel={mel} key={i} handleShowMel={handleShowMel} />;
    });
  }

  return (
    <div>
      {userRole === profileConstants.PRODUCTOR && <HomeProdutor />}
      {userRole === profileConstants.DISTRIBUTOR && <HomeDistribuidor />}
    </div>
    // <div className="profile-container">
    //   <header>
    //     <span>Bem vindo, {userName}</span>

    //     <Link className="button" to="/honey/new">
    //       Cadastrar
    //     </Link>
    //     <button onClick={handleLogout} type="button" size={18}>
    //       sair
    //     </button>
    //   </header>
    //   {!mel ? (
    //     <main>
    //       {console.log("mel3", mel)}
    //       <h3>Produção</h3>
    //       <table className="table table-striped">
    //         <thead>
    //           <tr>
    //             <th>ID</th>
    //             <th>Peso Total</th>
    //             <th>Data de coleta</th>
    //             <th>Localização</th>
    //             <th>Apicultor</th>
    //             <th>Colmeias</th>
    //             <th colSpan={2} style={{ textAlign: "center" }}></th>
    //           </tr>
    //         </thead>
    //         <tbody>{generateTable()}</tbody>
    //       </table>
    //     </main>
    //   ) : (
    //     <div>
    //       <main>
    //         {console.log("aqui")}
    //         <h3>Produto Beneficiado</h3>
    //         <table className="table table-striped">
    //           <thead>
    //             <tr>
    //               <th>ID</th>
    //               <th>Peso Total</th>
    //               <th>Data de coleta</th>
    //               <th>Localização</th>
    //               <th>Apicultor</th>
    //               <th>Colmeias</th>
    //               <th colSpan={2} style={{ textAlign: "center" }}></th>
    //             </tr>
    //           </thead>
    //           <tbody>{generateTable2()}</tbody>
    //           {console.log("genarateTable2")}
    //         </table>
    //       </main>
    //       <Link
    //         className="back-link"
    //         to={"/profile"}
    //         onClick={() => setShowMel(false)}
    //       >
    //         <FiArrowLeft size={16} color="#e02041" />
    //         Voltar
    //       </Link>
    //     </div>
    //   )}

    // </div>
  );
}
