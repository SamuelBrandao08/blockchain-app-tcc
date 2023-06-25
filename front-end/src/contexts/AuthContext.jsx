import { createContext, useEffect, useState } from "react";
import { useWeb3Context } from "web3-react";
import useContract from "../hooks/useContract";
import { abi } from "../abi/Authentication.json";
import { Authentication } from "../abi/address.json";
import { useContext } from "react";



export const AuthContext = createContext({})

export default function AuthContextProvider({children}){
  const [user, setUser] = useState({})

  const context = useWeb3Context();
  context.setFirstValidConnector(["MetaMask"]);
  const contract = useContract(abi, Authentication);

  useEffect(() => {
		function loadStorageData() {      
			const storageUser = localStorage.getItem('@user')
        console.log("Storage", storageUser);
				if(storageUser){
					setUser(JSON.parse(storageUser))
				}   
		}
		loadStorageData()
	}, [])

  async function signIn(login, password){
    try {
      if (!(context.active & contract));
      const {0: userWeb3, 1: isLogged} = await contract.methods.logon(login, password).call();
      if (isLogged) {
        setUser(userWeb3)
        localStorage.setItem("@user", JSON.stringify(userWeb3));
        return user
      } else {
        alert("Usuário ou senha incorretos!");
      }
    } catch (err) {
      console.log(err);
      alert("Falha no login, tente novamente!");
    }
  }
  return(
    <AuthContext.Provider value={{user, signIn}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
	const context = useContext(AuthContext)
	return context
}