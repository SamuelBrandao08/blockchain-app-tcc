import { Connectors } from "web3-react";
const { InjectedConnector } = Connectors;

const MetaMask = new InjectedConnector({ supportedNetworks: [1337] });
export const connectors = { MetaMask };
