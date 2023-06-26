// import express from "express";
// import api from "./colonymon-api";
// import { PrismaClient } from "@prisma/client";
// import HDWalletProvider from "@truffle/hdwallet-provider";
// import Production from "../../build/contracts/Production.json";
const Production = require("../../build/contracts/Production.json");
const Authentication = require("../../build/contracts/Authentication.json");
// import { match } from "sucrase/dist/types/parser/tokenizer";
const Web3 = require("web3");
const blockchainUrl = "HTTP://192.168.1.100:7545";

// const prisma = new PrismaClient();

const web3 = new Web3(blockchainUrl);
const auth = new web3.eth.Contract(
  Authentication.abi,
  Authentication.networks[5777].address
);
const prc = new web3.eth.Contract(
  Production.abi,
  Production.networks[5777].address
);

let weight = 0;
const max = 0.68;
const min = 0.48;

async function getProducers() {
  //console.log(contract);
  return await auth.methods.getProducers().call();
}

function increment() {
  return Math.random() * (max - min) + min;
}

(async () => {
  const producers = await getProducers();
  if (producers.length == 0) return;
  console.log("Produtores ", producers);

  const interval = setInterval(() => {
    for (let i = 0; i < producers.length; i++) {
      for (let i = 0; i < 50; i++) {
        const element = array[i];
      }
      const element = array[i];
    }
    let inc = increment();
    weight += increment();
    console.log(weight, inc);
  }, 5000);
})();

//module.exports = { simulator };
