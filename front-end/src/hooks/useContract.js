import { useWeb3Context } from "web3-react";
import { useEffect, useMemo } from "react";

const useContract = (abi, address) => {
  const context = useWeb3Context();

  if (!context.active) {
    context.setFirstValidConnector(["MetaMask"]);
  }

  const contract = useMemo(() => {
    if (context.active) {
      return new context.library.eth.Contract(abi, address);
    }
    return null;
  }, [context]);
  //console.log("aqui", contract);

  return contract;
};

export default useContract;
