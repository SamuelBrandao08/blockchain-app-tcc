import { Connectors } from "web3-react";
const { InjectedConnector } = Connectors;

const MetaMask = new InjectedConnector({ supportedNetworks: [5777] });
export const connectors = { MetaMask };
