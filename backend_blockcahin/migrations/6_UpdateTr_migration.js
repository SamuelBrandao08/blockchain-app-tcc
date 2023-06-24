const UpdateTr = artifacts.require("UpdateTr");
const Production = artifacts.require("Production");
const Processing = artifacts.require("Processing");
const Distributor = artifacts.require("Distributor");
const Merchant = artifacts.require("Merchant");

const updateAddress = require("./utils/file");
const { hashAddressAuthentication } = require("./utils/addressAuthentication");

module.exports = async function (deployer) {
  await deployer.deploy(UpdateTr);
  updateAddress(UpdateTr.address, UpdateTr.contractName);
  await deployer.deploy(
    Production,
    hashAddressAuthentication,
    UpdateTr.address
  );
  updateAddress(Production.address, Production.contractName);
  await deployer.deploy(
    Processing,
    hashAddressAuthentication,
    UpdateTr.address
  );
  updateAddress(Processing.address, Processing.contractName);
  await deployer.deploy(
    Distributor,
    hashAddressAuthentication,
    UpdateTr.address
  );
  updateAddress(Distributor.address, Distributor.contractName);
  await deployer.deploy(Merchant, hashAddressAuthentication, UpdateTr.address);
  updateAddress(Merchant.address, Merchant.contractName);
};
