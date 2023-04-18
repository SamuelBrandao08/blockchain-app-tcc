const UpdateTr = artifacts.require("UpdateTr");
const Production = artifacts.require("Production");

const updateAddress = require("./utils/file");

module.exports = async function (deployer) {
  await deployer.deploy(UpdateTr);
  updateAddress(UpdateTr.address, UpdateTr.contractName);
  await deployer.deploy(Production, UpdateTr.address);
  updateAddress(Production.address, Production.contractName);
  await deployer.deploy(Processing, UpdateTr.address);
  updateAddress(Processing.address, Processing.contractName);
  await deployer.deploy(Distributor, UpdateTr.address);
  updateAddress(Distributor.address, Distributor.contractName);
  await deployer.deploy(Merchant, UpdateTr.address);
  updateAddress(Merchant.address, Merchant.contractName);
};
