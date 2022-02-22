import { task } from "hardhat/config";
import { HardhatUserConfig } from "hardhat/config";
import "@typechain/hardhat";
import "@typechain/ethers-v5";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-deploy";
import "hardhat-deploy-ethers";

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
    hardhatContainer: {
      url: "http://localhost:8545",
    },
    hardhat: {
      gas: "auto",
      gasPrice: "auto",
      accounts: [
        {
          privateKey:
            "0x534af078a10af8335f6fbab8bfbd9bb13ed30fbb31f73f31c2070cfc5a4ad666",
          balance: "100000000000000000000",
        },
        {
          privateKey:
            "0xa01f808c3d5fd5acd9035a364fdb7507da9b5041b7fca26da3ad60368e8c13be",
          balance: "100000000000000000000",
        },
        {
          privateKey:
            "0xc83f0823371722d20185a5800d4b812c46ae230792cba8c1744cd28af28d1a95",
          balance: "100000000000000000000",
        },
      ],
    },
  },
};

export default config;
