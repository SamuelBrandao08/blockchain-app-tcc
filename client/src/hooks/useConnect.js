import { useMemo } from "react";
import Web3 from "web3";

const blockchainUrl = "HTTP://192.168.1.100:7545";

const useConnect = (abi, ContractAddress) => {
  const web3 = new Web3(blockchainUrl);

  const networkId = async () => await web3.eth.net.getId();
  const contract = useMemo(() => {
    networkId();
    return new web3.eth.Contract(abi, ContractAddress);
  }, [networkId]);
  //console.log("Contrato via useConnect ", contract);
  return { contract, web3 };
};

export default useConnect;
