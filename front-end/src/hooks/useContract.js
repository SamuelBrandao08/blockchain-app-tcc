import { useWeb3Context } from "web3-react";
import { useEffect, useMemo } from "react";
//import Web3 from "web3";

//import { contractAddress } from "../abi/address.json";

const useContract = (abi, address) => {
  const context = useWeb3Context();
  //const getConnection = async () => await context.setConnector("MetaMask");
  // context.setConnector("MetaMask");

  // const getContract = async (abi, address) => {
  //   if (context.active) {
  //     console.log("AQUI", context);
  //     return new context.library.eth.Contract(abi, address);
  //   }
  // };
  // return { getContract, context };

  useEffect(() => {
    context.setFirstValidConnector(["MetaMask"]);
  }, [context.active]);

  const contract = useMemo(() => {
    if (context.active) {
      return new context.library.eth.Contract(abi, address);
    }
    return null;
  }, [context.active, context.library]);

  return contract;
};

export default useContract;
