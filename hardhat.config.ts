import { HardhatUserConfig } from "hardhat/config";
import "@typechain/hardhat";
import "@typechain/ethers-v5";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "tsconfig-paths/register";
import "dotenv/config";
import "./tasks";
import testWallets from "./src/util/wallets";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.9",
      },
      {
        version: "0.4.23",
      },
    ],
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
      chainId: 1337,
      mining: { auto: true },
    },
  },
  gasReporter: {
    currency: "EUR",
    enabled: process.env.GAS == "true" ? true : false,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  typechain: {
    outDir: "src/types",
    target: "ethers-v5",
  },
};

export default config;
