import { ethers } from "hardhat";
import { Registry } from "src/types/Registry";
import * as ProjectRootDir from "app-root-dir";
import { join, relative } from "path";
import klawSync from "klaw-sync";
import { Metadata } from "../external/decentralised-scd-registry-common/src/interfaces/Metadata";
import { SCD } from "../external/decentralised-scd-registry-common/src/interfaces/SCD";
import { readFileSync } from "fs";
import { toContractType } from "../external/decentralised-scd-registry-common/src/Conversion";
import _ from "lodash";
import { Registry__factory } from "src/types";
import * as RegistryDeployment from "../deployments/ganache-cli/Registry.json";

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

const scdDir = process.env.SCD_DIR ? process.env.SCD_DIR : join(ProjectRootDir.get(), "stress-test-scds");
const storeScds = process.env.STORE == "true";

async function prepare(): Promise<Registry> {
  const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  const signer = provider.getSigner("0x250548444A4fBcFfb273B1034aa32cD6828544b0");
  const registry = Registry__factory.connect(RegistryDeployment.address, signer);

  if (storeScds) {
    const scdMetadataGroups = _.chunk(
      klawSync(scdDir, { nodir: true })
        .map(item => item.path)
        .filter(scdPath => scdPath.endsWith(".json"))
        .map(scdPath => {
          const scdData = JSON.parse(readFileSync(scdPath, "utf-8"));
          return toContractType(
            scdToMetadata(scdData, join("http://192.168.178.22:49160/", relative(scdDir, scdPath))),
          );
        }),
      500,
    );
    console.log(scdMetadataGroups.length);
    let i = 0;
    let stored = 0;
    try {
      for (const scdMetadataGroup of scdMetadataGroups) {
        const transaction = await registry.storeMultiple(scdMetadataGroup, { gasLimit: 999999999 });
        const receit = await transaction.wait();
        stored += scdMetadataGroup.length;
        console.log(`${i}: Stored ${stored} scds`);
        i++;
      }
    } catch (err) {
      console.error(err);
    } finally {
      console.log(`Stored ${stored} scds`);
    }
  }
  return registry;
}

async function main() {
  const registry = await prepare();
  console.log("started");
  const start = performance.now();
  const result = await registry.query("Name='Contract'");
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
