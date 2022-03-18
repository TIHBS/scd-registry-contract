import { HardhatUserConfig } from "hardhat/config";
import "@typechain/hardhat";
import "@typechain/ethers-v5";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "hardhat-gas-reporter";
import "dotenv/config";
import "./tasks";
import testWallets from "./test/TestWallets";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.9", settings: {} }],
  },
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    "hardhat-container": {
      url: "http://localhost:8545",
    },
    hardhat: {
      gas: "auto",
      gasPrice: "auto",
      accounts: testWallets,
    },
  },
  gasReporter: {
    currency: "EUR",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
};

export default config;
