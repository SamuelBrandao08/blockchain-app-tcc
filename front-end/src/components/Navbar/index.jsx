import { Link } from "react-router-dom/cjs/react-router-dom.min";

import styles from "./style.module.scss";

export function Navbar() {
  const isRegister = window.location.pathname === "/producer/new/drum"
  const isDispatch = window.location.pathname === "/producer/transaction"

  return (
    <nav className={styles.container}>
      <Link className={styles[isRegister && "active"]} to="/producer/new/drum">Registrar</Link>
      <Link className={styles[isDispatch && "active"]} to="/producer/transaction">Despachar</Link>
    </nav>
  )
}