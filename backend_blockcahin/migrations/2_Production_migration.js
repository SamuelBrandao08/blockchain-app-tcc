const Production = artifacts.require("Production");

const updateAddress = require("./utils/file");
const { hashAddressAuthentication } = require("./utils/addressAuthentication");

module.exports = async function (deployer) {
  await deployer.deploy(Production, hashAddressAuthentication);
  updateAddress(Production.address, Production.contractName);
};
