import { Link } from "react-router-dom/cjs/react-router-dom.min";

import styles from "./style.module.scss";
import { profileConstants } from "../../constants/profileConstants";
import { useAuth } from "../../contexts/AuthContext";

const urls = {
  produtor: {
    register: { url: "/producer/new/drum" },
    dispatcher: { url: "/producer/transaction" },
  },
  processador: {
    register: { url: "/processor/new/honey" },
    dispatcher: { url: "/processor/dispatcher" },
    receiver: { url: "/processor/receiver" },
  },
};

export function Navbar() {
  const { user } = useAuth();
  console.log(user);
  const curentUrl = window.location.pathname;

  return (
    <nav className={styles.container}>
      {[profileConstants.PRODUCER, profileConstants.PROCESSOR].includes(
        user.role
      ) && (
        <Link
          className={
            styles[curentUrl === urls[user.role]["register"].url && "active"]
          }
          to={urls[user.role]["register"].url}
        >
          Registrar
        </Link>
      )}
      {user.role === profileConstants.PROCESSOR && (
        <Link
          className={
            styles[curentUrl == urls[user.role]["receiver"].url && "active"]
          }
          to={urls[user.role]["receiver"].url}
        >
          Receber
        </Link>
      )}

      {[profileConstants.PRODUCER, profileConstants.PROCESSOR].includes(
        user.role
      ) && (
        <Link
          className={
            styles[curentUrl === urls[user.role]["dispatcher"].url && "active"]
          }
          to={urls[user.role]["dispatcher"].url}
        >
          Dispachar
        </Link>
      )}
    </nav>
  );
}
