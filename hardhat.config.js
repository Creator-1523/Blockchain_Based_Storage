
require("@nomicfoundation/hardhat-ethers");

module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 14333,
    },
    my_private_network: {
      url: "http://127.0.0.1:8545",  // Replace with your private node URL
      // Optional private key for deployment (if required by your network)
      // accounts: ["<your_private_key>"],
    },
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
};