const Merchant = artifacts.require("Merchant");

const updateAddress = require("./utils/file");
const { hashAddressAuthentication } = require("./utils/addressAuthentication");

module.exports = async function (deployer) {
  await deployer.deploy(Merchant, hashAddressAuthentication);
  updateAddress(Merchant.address, Merchant.contractName);
};
