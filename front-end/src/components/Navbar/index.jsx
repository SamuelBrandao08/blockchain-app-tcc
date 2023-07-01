import { Link } from "react-router-dom/cjs/react-router-dom.min";

import styles from "./style.module.scss";

export function Navbar() {

  return (
    <nav className={styles.container}>
      <Link>Registrar</Link>
      <Link>Despachar</Link>
    </nav>
  )
}