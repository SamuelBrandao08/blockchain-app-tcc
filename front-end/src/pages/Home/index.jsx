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
import { useAuth } from "../../contexts/AuthContext";

export default function Home() {
  const { user } = useAuth()
  const context = useWeb3Context();
  const history = useHistory("");

  function handleLogout() {
    localStorage.clear();
    context.unsetConnector();
    history.push("/");
  }

  return (
    <div>
      <div className="profile-container">
        <header>
          <span>Bem vindo, {user.name}</span>
          <button onClick={handleLogout} type="button" size={18}>
            sair
          </button>
        </header>
      </div>
      <div>
        {user.role === profileConstants.PRODUCER && (
          <HomeProducer userId={user.id} userName={user.name} />
        )}
        {user.role === profileConstants.PROCESSOR && <HomeProcessor />}
        {user.role === profileConstants.DISTRIBUTOR && <HomeDistributor />}
        {user.role === profileConstants.MERCHANT && <HomeMerchant />}
      </div>
    </div>
  );
}
