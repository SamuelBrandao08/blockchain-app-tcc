import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
//import { FiPower } from "react-icons/fi";
import useContract from "../../../hooks/useContract";
import { abi } from "../../../abi/Production.json";
import { Production } from "../../../abi/address.json";

import "./style.css";
import api from "../../../services/api";
import { useWeb3Context } from "web3-react";
import ProductionTableRow from "../ProductionTableRow";
import { FiArrowLeft } from "react-icons/fi";
import HoneyProduction from "./HoneyProduction";
import Product from "./Product";
import { useMemo } from "react";
import Tracing from "../Tracing";

const HomeProducer = () => {
  const [productions, setProductions] = useState([]);
  const [product, setProduct] = useState([]);

  const [mel, setMel] = useState([]);
  const [showMel, setShowMel] = useState(false);

  const context = useWeb3Context();

  const history = useHistory("");

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const userRole = localStorage.getItem("userRole");

  const contract = useMemo(() => {
    if (context.active) {
      return new context.library.eth.Contract(abi, Production);
    }
    return null;
  }, [context.active]);

  useEffect(() => {
    (async function fetch() {
      if (contract) {
        setProductions(await contract.methods.listProduction().call());
      }
    })();
  }, [contract]);

  async function listProduct() {
    if (contract) {
      setProduct(await contract.methods.listProduct().call());
      //setShowMel(true);
    }
  }

  // async function handleShowMel() {
  //   if (contract) {
  //     setMel(await contract.methods.listProduct().call());
  //     setShowMel(true);
  //   }

  //   return (
  //     <div>
  //       <p>ola</p>
  //     </div>
  //   );
  //   try {
  //     // await api.get(`mel/${id}`, {
  //     //   headers: {
  //     //     Authorization: produtorId,
  //     //   },
  //     // });
  //     //const response = await contract.methods.listProductBatch(batch).call();
  //     //setMel(response);
  //   } catch (err) {
  //     alert("Falha na operação");
  //   }
  // }

  function handleLogout() {
    localStorage.clear();

    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <span>Bem vindo, {userName}</span>

        <Link className="button" to="/honey/new">
          Cadastrar
        </Link>
        <button onClick={handleLogout} type="button" size={18}>
          sair
        </button>
      </header>

      <main>
        <div>
          {!product.length && (
            <HoneyProduction
              productions={productions}
              listProduct={listProduct}
            />
          )}
          {product.length && (
            <Product product={product} handleBack={() => setProduct([])} />
          )}
        </div>

        <div>
          <Tracing />
        </div>
        <Link className="button" to="/transaction">
          Transações
        </Link>
      </main>

      {/* // <div>
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
        //   <Link
        //     className="back-link"
        //     to={"/profile"}
        //     onClick={() => setShowMel(false)}
        //   >
        //     <FiArrowLeft size={16} color="#e02041" />
        //     Voltar
        //   </Link>
        // </div> */}
    </div>
  );
};

export default HomeProducer;
