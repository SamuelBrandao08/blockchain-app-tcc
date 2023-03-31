const Authentication = artifacts.require("Authentication");
const RegistrarProducao = artifacts.require("RegistrarProducao");
const UpdateTr = artifacts.require("UpdateTr");

const updateAddress = require("./utils/file");

module.exports = async function (deployer) {
  await deployer.deploy(Authentication);
  updateAddress(Authentication.address, Authentication.contractName);
  await deployer.deploy(UpdateTr, Authentication.address);
  updateAddress(UpdateTr.address, UpdateTr.contractName);
  await deployer.deploy(RegistrarProducao, Authentication.address);
  updateAddress(RegistrarProducao.address, RegistrarProducao.contractName);
};
