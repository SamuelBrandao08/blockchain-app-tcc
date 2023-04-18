const Processing = artifacts.require("Processing");

const updateAddress = require("./utils/file");
const { hashAddressAuthentication } = require("./utils/addressAuthentication");

module.exports = async function (deployer) {
  await deployer.deploy(Processing, hashAddressAuthentication);
  updateAddress(Processing.address, Processing.contractName);
};
