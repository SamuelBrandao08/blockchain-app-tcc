import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
//import { FiPower } from "react-icons/fi";

import "./style.css";
import api from "../../services/api";
import { useWeb3Context } from "web3-react";

import { FiArrowLeft } from "react-icons/fi";
import { profileConstants } from "../../constants/profileConstants";
import HomeProducer from "./Producer/homeProducer";
import HomeDistributor from "./Distributor/homeDistributor";
import HomeProcessor from "./Processor/homeProcessor";
import HomeMerchant from "./Merchant/homeMerchant";

export default function Home() {
  const context = useWeb3Context();
  const history = useHistory("");

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const userRole = localStorage.getItem("userRole");

  console.log("id: ", userId + "\nnome: ", userName + "\nrole: ", userRole);

  function handleLogout() {
    localStorage.clear();
    context.unsetConnector();
    history.push("/");
  }

  return (
    <div>
      <div className="profile-container">
        <header>
          <span>Bem vindo, {userName}</span>
          <button onClick={handleLogout} type="button" size={18}>
            sair
          </button>
        </header>
      </div>
      <div>
        {userRole === profileConstants.PRODUCER && (
          <HomeProducer userId={userId} userName={userName} />
        )}
        {userRole === profileConstants.PROCESSOR && <HomeProcessor />}
        {userRole === profileConstants.DISTRIBUTOR && <HomeDistributor />}
        {userRole === profileConstants.MERCHANT && <HomeMerchant />}
      </div>
    </div>
  );
}
