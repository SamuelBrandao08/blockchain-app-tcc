import React, { useMemo, useState } from "react";
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
import ProducerTracing from "./ProducerTracing";
import NewHoney from "./New/NewHoney";

function HomeProducer({ userId, userName }) {
  console.log(userId, userName);
  const [item, setItem] = useState("");

  const [drumId, setDrumId] = useState("");
  const [drum, setDrum] = useState({});

  const [palletId, setPalletId] = useState("");
  const [pallet, setPallet] = useState({});

  const [tracing, setTracing] = useState({});
  const [productions, setProductions] = useState([]);
  const [product, setProduct] = useState([]);

  const [mel, setMel] = useState([]);
  const [showMel, setShowMel] = useState(false);

  const context = useWeb3Context();
  const contract = useContract(abi, Production);
  const history = useHistory("");

  const handleGetDrum = async (drumId) => {
    try {
      if (!(context.active & contract))
        return await contract.methods.getDrum(drumId).call();
    } catch (error) {
      alert("Erro na operação.");
    }
  };

  //const handleGetDrumsId = async (userId) => {};

  const handleGetPallet = async (palletId) => {
    try {
      if (!(context.active & contract))
        return await contract.methods.getPallet(palletId).call();
    } catch (error) {
      alert("Erro na operação.");
    }
  };

  //const handleGetPalletsId = async (userId) => {};

  const handleForwarding = (e) => {
    e.preventDefault();
    try {
      if (!(context.active & contract))
        contract.methods.forwarding(item).call();
    } catch (error) {
      alert("Erro na operação.");
    }
  };

  return (
    <div className="profile-container">
      <header>
        <span>Bem vindo, {userName}</span>

        <Link className="button" to="/producer/new">
          Registrar Produção
        </Link>
      </header>

      <main>
        <div>
          {!product.length && (
            <HoneyProduction
              productions={productions}
              // listProduct={listProduct}
            />
          )}
          {product.length && (
            <Product product={product} handleBack={() => setProduct([])} />
          )}
        </div>

        <div>
          <form onSubmit={handleGetDrum}>
            <input
              type="text"
              placeholder="ID do produto"
              value={drumId}
              onChange={(e) => setDrumId(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <div>
          <ProducerTracing context={context} contract={contract} />
        </div>

        <div>
          <form onSubmit={handleForwarding}>
            <input
              type="text"
              placeholder="ID do produto"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
            <button type="submit">Enviar</button>
          </form>
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
}

export default HomeProducer;

// useEffect(() => {
//   (async function fetch() {
//     if (contract) {
//       setProductions(await contract.methods.listProduction().call());
//     }
//   })();
// }, [contract]);

// async function listProduct() {
//   if (contract) {
//     setProduct(await contract.methods.listProduct().call());
//     //setShowMel(true);
//   }
// }

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
