const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require("fs");
const mnemonicPhrase = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    // development: {
    //   host: "127.0.0.1",
    //   port: 7545,
    //   network_id: "5778", // Match any network id
    //   gas: 5000000
    // },

    ganache: {
      // must be a thunk, otherwise truffle commands may hang in CI
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: mnemonicPhrase,
          },
          providerOrUrl: "HTTP://192.168.1.145:7545",
          skipDryRun: true,
          //derivationPath: "m/44'/60'/0'/0/",
        }),
      network_id: "5777",
    },

    AWS: {
      // must be a thunk, otherwise truffle commands may hang in CI
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: mnemonicPhrase,
          },
          providerOrUrl: "http://192.168.1.139:7545",
          skipDryRun: true,
          //derivationPath: "m/44'/60'/0'/0/",
        }),
      network_id: "1500",
    },
  },
  compilers: {
    solc: {
      version: "0.8.17",
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200, // Default: 200
        },
      },
    },
  },
};
