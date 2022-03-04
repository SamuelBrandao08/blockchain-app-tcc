import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
let greeterABI = [{"inputs":[{"internalType":"string","name":"_greeting","type":"string"}],"name":"greeter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"greet","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true}];
let greeterAddress = '0x99267d9aF346459F3BB319F5eBC37497eb0EAC55';
const greeterContract = web3.eth.contract(greeterABI).at(greeterAddress);

export{greeterContract};