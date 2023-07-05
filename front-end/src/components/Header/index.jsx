import { FiLogIn } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext"

import styles from "./style.module.scss";
import { Navbar } from "../Navbar";

export function Header() {
  const { user, signOut } = useAuth()

  return (
    <div className={styles.container}>
      <span>Bem vindo,{" "}
        <strong>{user.name}</strong>
      </span>
      <Navbar />
      <button className="back-link" onClick={signOut}>
        <FiLogIn size={16} color="darkorange" />
        Sair
      </button>
    </div>
  )
}