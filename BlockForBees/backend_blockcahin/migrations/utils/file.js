const fs = require("fs");
const file = "\\address.json";
const dir =
  "C:\\Users\\samue\\Documents\\Workspace_react\\BlockForBees\\backend_blockcahin";
const path = `${dir}` + `${file}`;

function updateAddress(address, contractName) {
  const hashAddressList = JSON.parse(fs.readFileSync(path, "utf-8"));
  hashAddressList[contractName] = address;

  fs.writeFileSync(
    path,
    JSON.stringify(hashAddressList, null, "\t"),
    function (error) {
      if (error) {
        console.log("erro de escrita: ", error.message);
      } else {
        console.log(newObject);
      }
    }
  );
}

module.exports = updateAddress;
