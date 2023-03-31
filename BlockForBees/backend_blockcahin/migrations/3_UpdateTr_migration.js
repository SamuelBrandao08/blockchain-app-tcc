const UpdateTr = artifacts.require("UpdateTr");
const RegistrarProducao = artifacts.require("RegistrarProducao");

const updateAddress = require("./utils/file");

module.exports = async function (deployer) {
  await deployer.deploy(UpdateTr);
  updateAddress(UpdateTr.address, UpdateTr.contractName);
  await deployer.deploy(RegistrarProducao, UpdateTr.address);
  updateAddress(RegistrarProducao.address, RegistrarProducao.contractName);
};
