import { ethers } from "hardhat";
import _ from "lodash";
import { Registry__factory } from "src/types";
import "dotenv/config";

const registryAddress = process.env.REGISTRY_ADDRESS
  ? process.env.REGISTRY_ADDRESS
  : "0x222E34DA1926A9041ed5A87f71580D4D27f84fD3";
const walletAddress = process.env.WALLET_ADDRESS
  ? process.env.WALLET_ADDRESS
  : "0x250548444A4fBcFfb273B1034aa32cD6828544b0";

const query = process.env.QUERY;

async function main() {
  if (!query) {
    console.error("You have to specify a query!");
    return;
  }

  const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  const signer = provider.getSigner(walletAddress);
  const registry = Registry__factory.connect(registryAddress, signer);

  console.log("started");
  const start = performance.now();
  const result = await registry.query(query);
  const end = performance.now();
  result.forEach(metadata => console.log(`id: ${metadata.id} name: ${metadata.metadata.name}`));
  console.log(`Retrieval took ${end - start} ms`);
  if (result.length == 0) {
    console.error("Nothing was retrieved!");
  } else {
    console.log(`Retrieved ${result.length} scd(s)`);
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
