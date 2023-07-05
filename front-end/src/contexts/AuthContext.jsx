import { createContext, useEffect, useState } from "react";
import { useWeb3Context } from "web3-react";
import { abi } from "../abi/Authentication.json";
import { Authentication } from "../abi/address.json";
import { useContext } from "react";
import useConnect from "../hooks/useConnect";

export const AuthContext = createContext({})

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState()

  // const context = useWeb3Context();
  // context.setFirstValidConnector(["MetaMask"]);
  // const contract = useContract(abi, Authentication);
  const { address, contract } = useConnect(abi, Authentication);

  useEffect(() => {
    function loadStorageData() {
      const storageUser = localStorage.getItem('@user')
      if (storageUser) {
        setUser(JSON.parse(storageUser))
      }
    }
    loadStorageData()
  }, [])

  async function signIn(login, password) {
    try {
      if (!(contract)) return;
      const { 0: userWeb3, 1: isLogged } = await contract.methods.logon(login, password).call();
      if (isLogged) {
        const user = parseUser(userWeb3)
        setUser(user)
        localStorage.setItem("@user", JSON.stringify(user));
        return user
      } else {
        alert("Usuário ou senha incorretos!");
      }
    } catch (err) {
      console.log(err);
      alert("Falha no login, tente novamente!");
    }
  }

  function signOut() {
    localStorage.clear();
    setUser(undefined);
    // context.unsetConnector();
    // history.push("/");
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

const parseUser = (user) => Object({
  id: user?.id,
  addr: user?.addr,
  name: user?.name,
  email: user?.email,
  company: user?.company,
  certification: user?.certification,
  role: user?.role,
});

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}