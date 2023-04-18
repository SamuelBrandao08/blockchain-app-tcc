const Authentication = artifacts.require("Authentication");
const Production = artifacts.require("Production");
const Processing = artifacts.require("Processing");
const Distributor = artifacts.require("Distributor");
const Merchant = artifacts.require("Merchant");
const UpdateTr = artifacts.require("UpdateTr");

const updateAddress = require("./utils/file");

module.exports = async function (deployer) {
  await deployer.deploy(Authentication);
  updateAddress(Authentication.address, Authentication.contractName);
  await deployer.deploy(UpdateTr);
  updateAddress(UpdateTr.address, UpdateTr.contractName);
  await deployer.deploy(Production, Authentication.address, UpdateTr.address);
  updateAddress(Production.address, Production.contractName);
  await deployer.deploy(Processing, Authentication.address, UpdateTr.address);
  updateAddress(Processing.address, Processing.contractName);
  await deployer.deploy(Distributor, Authentication.address, UpdateTr.address);
  updateAddress(Distributor.address, Distributor.contractName);
  await deployer.deploy(Merchant, Authentication.address, UpdateTr.address);
  updateAddress(Merchant.address, Merchant.contractName);
};
