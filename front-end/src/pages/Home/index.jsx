import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
//import { FiPower } from "react-icons/fi";
import useContract from "../../hooks/useContract";
import { abi } from "../../abi/Production.json";
import { Production } from "../../abi/address.json";

import "./style.css";
import api from "../../services/api";
import { useWeb3Context } from "web3-react";
import ProductionTableRow from "./ProductionTableRow";
import MelTableRow from "./MelTableRow";
import { FiArrowLeft } from "react-icons/fi";
import { profileConstants } from "../../constants/profileConstants";
import HomeProducer from "./Producer/homeProducer";
import HomeDistributor from "./Distributor/homeDistributor";
import HomeProcessor from "./Processor/homeProcessor";
import HomeMerchant from "./Merchant/homeMerchant";

export default function Home() {
  const [mel, setMel] = useState([]);
  const [productions, setProductions] = useState([]);
  const [batch, setBatch] = useState();
  const [showMel, setShowMel] = useState(false);

  const context = useWeb3Context();
  const history = useHistory("");

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const userRole = localStorage.getItem("userRole");

  // useEffect(() => {
  //   (async function fetch() {
  //     if (contract) {
  //       //setProductions(await contract.methods.listProduction().call());
  //     }
  //   })();
  // }, [contract]);
  // console.log("producao ", productions);

  // async function handleShowMel() {
  //   // try {
  //   //   // await api.get(`mel/${id}`, {
  //   //   //   headers: {
  //   //   //     Authorization: produtorId,
  //   //   //   },
  //   //   // });
  //   //   //const response = await contract.methods.listProductBatch(batch).call();
  //   //   //setMel(response);
  //   // } catch (err) {
  //   //   alert("Falha na operação");
  //   // }

  //   if (contract) {
  //     setMel(await contract.methods.listProduct().call());
  //     setShowMel(true);
  //   }
  // }

  function handleLogout() {
    localStorage.clear();
    context.unsetConnector();
    history.push("/");
  }

  // function generateTable() {
  //   if (!productions) return;
  //   return productions.map((production, i) => {
  //     return (
  //       <ProductionTableRow
  //         production={production}
  //         key={i}
  //         handleShowMel={handleShowMel}
  //       />
  //     );
  //   });
  // }

  // function generateTable2() {
  //   if (!mel) return;
  //   return mel.map((mel, i) => {
  //     return <MelTableRow mel={mel} key={i} handleShowMel={handleShowMel} />;
  //   });
  // }

  return (
    <div>
      <div className="profile-container">
        <header>
          <span>Bem vindo, {userName}</span>
          <button onClick={handleLogout} type="button" size={18}>
            sair
          </button>
        </header>
      </div>
      <div>
        {userRole === profileConstants.PRODUCER && (
          <HomeProducer userId={userId} userName={userName} />
        )}
        {userRole === profileConstants.PROCESSOR && <HomeProcessor />}
        {userRole === profileConstants.DISTRIBUTOR && <HomeDistributor />}
        {userRole === profileConstants.MERCHANT && <HomeMerchant />}
      </div>
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
