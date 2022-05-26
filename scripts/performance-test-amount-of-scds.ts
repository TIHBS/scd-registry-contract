import { ethers } from "hardhat";
import * as ProjectRootDir from "app-root-dir";
import { join, relative } from "path";
import klawSync from "klaw-sync";
import { Metadata } from "../external/decentralised-scd-registry-common/src/interfaces/Metadata";
import { SCD } from "../external/decentralised-scd-registry-common/src/interfaces/SCD";
import { readFileSync } from "fs";
import { toContractType } from "../external/decentralised-scd-registry-common/src/Conversion";
import _ from "lodash";
import { Registry__factory } from "src/types";
import { writeFileSync } from "fs";
import "dotenv/config";

function scdToMetadata(scd: SCD, url: string): Metadata {
  const functionNames = scd.functions ? scd.functions.map(func => func.name).filter(name => name) : [];
  const eventNames = scd.events ? scd.events.map(event => event.name).filter(name => name) : [];
  const signature = "0x534af078a10af8335f6fbab8bfbd9bb13ed30fbb31f73f31c2070cfc5a4ad666";
  const authorAddress = "0x534af078a10af8335f6fbab8bfbd9bb13ed30fbb31f73f31c2070cfc5a4ad666";

  return {
    name: scd.name ? scd.name : "",
    author: authorAddress,
    version: scd.version ? scd.version : "",
    signature: signature,
    internal_address: scd.internal_address ? scd.internal_address : "",
    url: new URL(url),
    blockchain_type: scd.blockchain_type ? scd.blockchain_type : "ethereum",
    functions: functionNames,
    events: eventNames,
    is_valid: true,
  };
}

const scdDir = process.env.SCD_DIR ? process.env.SCD_DIR : join(ProjectRootDir.get(), "scds");
const hostIp = process.env.HOST_IP ? process.env.HOST_IP : "localhost";
const registryAddress = process.env.REGISTRY_ADDRESS
  ? process.env.REGISTRY_ADDRESS
  : "0x222E34DA1926A9041ed5A87f71580D4D27f84fD3";
const walletAddress = process.env.WALLET_ADDRESS
  ? process.env.WALLET_ADDRESS
  : "0x250548444A4fBcFfb273B1034aa32cD6828544b0";
const every = process.env.EVERY ? process.env.EVERY : Number.MAX_SAFE_INTEGER;
const limit = process.env.LIMIT ? process.env.LIMIT : Number.MAX_SAFE_INTEGER;
const queries = [
  "Name='kjakhgrlanjklfh3984jklnklasdfhigjöaklgj'", // The case that noting was retrieved
  "Name='InitializeableImplementation1'",
  "Name='InitializeableImplementation2'",
  "Name='InitializeableImplementation3'",
  "Name='InitializeableImplementation4'",
  "Name='InitializeableImplementation5'",
  "Name='InitializeableImplementation6'",
  "Name='InitializeableImplementation7'",
  "Name='InitializeableImplementation8'",
  "Name='InitializeableImplementation9'",
  "Name='InitializeableImplementation10'",
];

async function main() {
  const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  const signer = provider.getSigner(walletAddress);
  const registry = Registry__factory.connect(registryAddress, signer);

  const scdMetadataGroups = _.chunk(
    klawSync(scdDir, { nodir: true })
      .map(item => item.path)
      .filter(scdPath => scdPath.endsWith(".json"))
      .map(scdPath => {
        const scdData = JSON.parse(readFileSync(scdPath, "utf-8"));
        return toContractType(scdToMetadata(scdData, join(`http://${hostIp}:49160/`, relative(scdDir, scdPath))));
      }),
    25,
  );

  console.log(`Splitt scds into ${scdMetadataGroups.length} groups`);
  let i = 0;
  let stored = 0;
  let storedCurr = 0;
  const lines = [];
  lines.push("num-stored-scds,num-results,time-in-ms");

  try {
    for (const scdMetadataGroup of scdMetadataGroups) {
      const transaction = await registry.storeMultiple(scdMetadataGroup, { gasLimit: 999999999 });
      await transaction.wait();
      stored += scdMetadataGroup.length;
      storedCurr += scdMetadataGroup.length;
      console.log(`${i}: Stored ${stored} scds`);
      i++;
      if (storedCurr >= Number(every)) {
        storedCurr = 0;
        for (const query of queries) {
          const start = performance.now();
          const result = await registry.query(query);
          const end = performance.now();
          const timeDiff = end - start;
          result.forEach(metadata => console.log(`id: ${metadata.id} name: ${metadata.metadata.name}`));
          console.log(`Retrieval took ${timeDiff} ms`);

          lines.push(`${stored},${result.length},${timeDiff}`);

          if (result.length == 0) {
            console.error("Nothing was retrieved!");
          } else {
            console.log(`Retrieved ${result.length} scd(s)`);
          }
        }
      }
      if (stored >= Number(limit)) {
        break;
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    console.log(`Stored ${stored} scds`);
    const toWrite = lines.join("\n");

    writeFileSync("./performance-test-results.csv", toWrite);
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
