const fs = require("fs");
const file = "address.json";
const destinationFront =
  "C:\\Users\\samue\\Documents\\Workspace_react\\BlockForBees\\front-end\\src\\abi\\";
const destinationClient =
  "C:\\Users\\samue\\Documents\\Workspace_react\\BlockForBees\\client\\src\\abi\\";
const source =
  "C:\\Users\\samue\\Documents\\Workspace_react\\BlockForBees\\backend_blockcahin\\build\\contracts\\";
const path = `${destinationFront}` + `${file}`;

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
        console.log(hashAddressList);
      }
    }
  );

  fs.copyFileSync(
    `${source}` + `${contractName}` + ".json",
    `${destinationFront}` + `${contractName}` + ".json"
  );

  fs.copyFileSync(
    `${source}` + `${contractName}` + ".json",
    `${destinationClient}` + `${contractName}` + ".json"
  );
}

module.exports = updateAddress;
