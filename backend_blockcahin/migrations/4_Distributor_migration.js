const Distributor = artifacts.require("Distributor");

const updateAddress = require("./utils/file");
const { hashAddressAuthentication } = require("./utils/addressAuthentication");

module.exports = async function (deployer) {
  await deployer.deploy(Distributor, hashAddressAuthentication);
  updateAddress(Distributor.address, Distributor.contractName);
};
