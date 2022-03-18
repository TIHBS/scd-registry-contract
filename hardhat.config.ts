import { task } from "hardhat/config";
import { HardhatUserConfig } from "hardhat/config";
import "@typechain/hardhat";
import "@typechain/ethers-v5";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "hardhat-gas-reporter";
import "dotenv/config";
import testWallets from "./test/TestWallets";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.7.3", settings: {} }],
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
