const Migrations = artifacts.require("Migrations");
var Greeter = artifacts.require("Greeter");
var MyContract = artifacts.require("MyContract");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Greeter);
  deployer.deploy(MyContract);
};
