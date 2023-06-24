const Processing = artifacts.require("Processing");

const updateAddress = require("./utils/file");
const { hashAddressAuthentication } = require("./utils/addressAuthentication");
const { hashAddressUpdateTr } = require("./utils/addressAuthentication");

module.exports = async function (deployer) {
  await deployer.deploy(
    Processing,
    hashAddressAuthentication,
    hashAddressUpdateTr
  );
  updateAddress(Processing.address, Processing.contractName);
};
