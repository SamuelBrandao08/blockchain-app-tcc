const RegistrarProducao = artifacts.require("RegistrarProducao");

module.exports = function (deployer) {
  deployer.deploy(
    RegistrarProducao,
    "0x50384a50E4aB793cEfdBdC2b3464343292F15EB4"
  );
};
