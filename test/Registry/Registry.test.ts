import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { outputToStruct } from "src/util/contract";
import { Registry__factory } from "../../src/types/factories/Registry__factory";
import { Registry } from "../../src/types/Registry";
import expect from "test/expect";

describe("Registry contract", () => {
  let registry: Registry;

  before(async () => {
    registry = await new Registry__factory((await ethers.getSigners())[0]).deploy();
  });

  it("Should set and get a string", async () => {
    const result1 = await registry.get();
    expect(result1).to.equal("Hello World!");

    const toSet = "World Hello?";
    await registry.set(toSet);

    const result2 = await registry.get();
    expect(result2).to.equal(toSet);
  });

  it("Should store and retrieve the SCDMetadata", async () => {
    const contractName = "Contract Name 1";
    const toStore: Registry.SCDMetadataStruct = {
      name: contractName,
      author: "TestAuthor1",
      version: BigNumber.from(1),
      signature: "62cf2bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
      internalAddress: "479f26b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      blockChainType: 0,
      functions: ["function1", "function2", "function3"],
      events: ["event1", "event2", "event3", "event4"],
    };

    await registry.store(toStore);
    const result = (await registry.retrieveByName(contractName)).map(output => outputToStruct(output))[0];
    expect(result).to.deep.equal(toStore);
  });
});
