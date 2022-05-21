import expect from "../test/expect";
import { ethers } from "hardhat";
import { Registry } from "src/types/Registry";
import { deployRegistry } from "test/SetupRegistry";
import * as ProjectRootDir from "app-root-dir";
import { join, relative } from "path";
import klawSync from "klaw-sync";

import { Metadata } from "../external/decentralised-scd-registry-common/src/interfaces/Metadata";
import { SCD } from "../external/decentralised-scd-registry-common/src/interfaces/SCD";
import { readFileSync } from "fs";
import { toContractType } from "../external/decentralised-scd-registry-common/src/Conversion";
import _ from "lodash";

function scdToMetadata(scd: SCD, url: string): Metadata {
  const functionNames = scd.functions.map(func => func.name);
  const eventNames = scd.events ? scd.events.map(event => event.name) : [];
  const signature = "0x534af078a10af8335f6fbab8bfbd9bb13ed30fbb31f73f31c2070cfc5a4ad666";
  const authorAddress = "0x534af078a10af8335f6fbab8bfbd9bb13ed30fbb31f73f31c2070cfc5a4ad666";

  return {
    name: scd.name,
    author: authorAddress,
    version: scd.version,
    signature: signature,
    internal_address: scd.internal_address,
    url: new URL(url),
    blockchain_type: scd.blockchain_type,
    functions: functionNames,
    events: eventNames,
    is_valid: true,
  };
}

const scdDir = process.env.SCD_DIR ? process.env.SCD_DIR : join(ProjectRootDir.get(), "stress-test-scds");
const storeScds = process.env.STORE == "true";

describe("Stress tests", () => {
  let registry: Registry;
  before(async () => {
    [registry] = await deployRegistry((await ethers.getSigners())[0]);

    if (storeScds) {
      const scdMetadata = _.chunk(
        klawSync(scdDir, { nodir: true })
          .map(item => item.path)
          .map(scdPath => {
            const scdData = JSON.parse(readFileSync(scdPath, "utf-8"));
            return toContractType(scdToMetadata(scdData, join("http://localhost:49160/", relative(scdDir, scdPath))));
          }),
        100,
      );
      scdMetadata.forEach(async groupOfScds => await registry.storeMultiple(groupOfScds));
    }
  });

  it("Should retrieve scd metadata", async () => {
    const start = performance.now();
    const result = await registry.retrieveByName("quaCoin");
    const end = performance.now();
    result.forEach(metadata => console.log(`id: ${metadata.id} name: ${metadata.metadata.name}`));
    console.log(`Retrieval took ${end - start} ms`);
    expect(result).to.not.be.empty;
  });
});
