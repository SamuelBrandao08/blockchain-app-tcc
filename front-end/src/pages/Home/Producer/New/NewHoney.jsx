import React, { useState } from "react";
import { useWeb3Context } from "web3-react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import useContract from "../../../../hooks/useContract";
import { abi } from "../../../../abi/Production.json";
import { Production } from "../../../../abi/address.json";
import { useAuth } from "../../../../contexts/AuthContext";

var crypto = require("crypto");

// import { Container } from './styles';

//     struct Tun {
//     bytes30 id;
//     bytes20 batch;
//     address productorId;
//     string apiary;
//     uint64 weight;
//     string packing;
//     string flowering;
//     string date;
//     uint256[] hivesId;
// }
function NewHoney() {
  const {user} = useAuth()
  const history = useHistory();
  const context = useWeb3Context();
  const contract = useContract(abi, Production, context);

  const [batch, setBatch] = useState("");
  const [apiary, setApiary] = useState();
  const [weight, setWeight] = useState(0);
  const [packing, setPacking] = useState("");
  const [flowering, setflowering] = useState("");
  const [dateTime, setDateTime] = useState(0);
  const [hivesId, sethivesId] = useState([]);

  const [drumsId, setDrumsId] = useState([]);

  const generateBatch = async () => {
    try {
      if (!(context.active & contract));
      //return await contract.methods.generateBatch(user.id, flowering, date).call();
      return crypto.randomBytes(4).toString("HEX");
    } catch (error) {
      alert("Erro na operação.");
    }
  };

  const [returnNewDrum, setReturnNewDrum] = useState([]);
  const handleNewHoney = async (e) => {
    e.preventDefault();
    const _batch = await generateBatch();
    try {
      if (!(context.active & contract));
      const response = await contract.methods
        .newTun(
          user.id,
          _batch,
          apiary,
          weight,
          packing,
          flowering,
          dateTime,
          hivesId
        )
        .send({
          from: context.account,
        });
      setReturnNewDrum(response);
    } catch (error) {
      alert("Erro na operação");
    }
  };

  const handleNewPallet = async (e) => {
    e.preventDefault();

    try {
      if (!(context.active & contract));
      const response = await contract.methods
        .newPallet(user.id, batch, drumsId)
        .send({
          from: context.account,
        });
    } catch (error) {
      alert("Erro na operação");
    }
  };

  return (
    <div className="new-honey-container">
      <div className="content">
        <section>
          <h1>Cadastrar novo mel</h1>
          <p>Descreva as propriedades do seu mel!</p>

          <Link className="back-link" to="/home">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>

        <Tabs>
          <TabList>
            <Tab>Tambor de Mel</Tab>
            <Tab>Palete</Tab>
          </TabList>

          <TabPanel>
            <form onSubmit={handleNewHoney}>
              <input
                placeholder="Apiário"
                value={apiary}
                onChange={(e) => setApiary(e.target.value)}
              />
              <input
                placeholder="Peso"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <input
                placeholder="Embalagem"
                value={packing}
                onChange={(e) => setPacking(e.target.value)}
              />
              <input
                placeholder="Florada"
                value={flowering}
                onChange={(e) => setflowering(e.target.value)}
              />
              <input
                placeholder="Data da coleta"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
              />
              <button className="button" type="submit">
                Adicionar
              </button>
            </form>
          </TabPanel>

          <TabPanel>
            <form onSubmit={handleNewPallet}>
              <input
                placeholder="Lote do Produto"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
              />

              <input
                placeholder="Unidades que compõem o palete"
                value={drumsId}
                onChange={(e) => setDrumsId(e.target.value)}
              />

              <button className="button" type="submit">
                Cadastrar
              </button>
            </form>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default NewHoney;
