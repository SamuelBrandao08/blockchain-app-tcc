import { useWeb3Context } from "web3-react";
import { useMemo } from "react";

const useContract = (abi, address) => {
  //const getConnection = async () => await context.setConnector("MetaMask");
  // context.setConnector("MetaMask");

  // const getContract = async (abi, address) => {
  //   if (context.active) {
  //     console.log("AQUI", context);
  //     return new context.library.eth.Contract(abi, address);
  //   }
  // };
  // return { getContract, context };
  const context = useWeb3Context();
  if(!context.active){
    context.setFirstValidConnector(["MetaMask"])
  }
  const contract = useMemo(() => {
    if (context.active) {
      return new context.library.eth.Contract(abi, address);
    }
    return null;
  }, [context.active, context.library]);

  return contract;
};

export default useContract;
