const RegistrarProducao = artifacts.require("RegistrarProducao");

module.exports = function (deployer) {
  deployer.deploy(
    RegistrarProducao,
    "0xADECF63349C480f550245804ed8d4E42E2AdCf05"
  );
};
