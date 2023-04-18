const fs = require("fs");
const file = "\\address.json";
const dirFront =
  "C:\\Users\\samue\\Documents\\Workspace_react\\BlockForBees\\front-end\\src\\abi";
const path = `${dirFront}` + `${file}`;

const hashAddressList = JSON.parse(fs.readFileSync(path, "utf-8"));
const hashAddressAuthentication = hashAddressList[Authentication];

module.exports = hashAddressAuthentication;
