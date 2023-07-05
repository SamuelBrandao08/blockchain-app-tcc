import { useMemo } from "react";
import Web3 from "web3";

const privateKey =
  "0xbe6c18a2244c1e597143b5f58b4051d9f37bc41b34f0ef7c40d1858ad8303767";
//const blockchainUrl = "ws://3.210.145.39:8546";
const blockchainUrl = "ws://192.168.1.100:7545";

const useConnect = (abi, contractAddress) => {
  const web3 = new Web3(blockchainUrl);
  //var web3 = new Web3(new Web3.providers.WebsocketProvider(blockchainUrl));
  const { address } = web3.eth.accounts.privateKeyToAccount(privateKey);
  web3.eth.accounts.wallet.add(privateKey);

  const networkId = async () => {
    return await web3.eth.net.getId();
  };

  const contract = useMemo(() => {
    //if (contract) return;
    return new web3.eth.Contract(abi, contractAddress);
  }, [web3.eth.Contract, abi, contractAddress]);
  console.log("Contrato via useConnect ", contract);
  return { address, contract };
};

export default useConnect;
