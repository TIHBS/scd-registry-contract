import { Registry__factory } from "../typechain/factories/Registry__factory";
import { Registry } from "../typechain/Registry";
import { solidity } from "ethereum-waffle";
import { ethers } from "hardhat";
import chai from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";
import deepEqualInAnyOrder from "deep-equal-in-any-order";
import { outputToStruct } from "../client/util";

chai.use(solidity);
chai.use(deepEqualInAnyOrder);
const { expect } = chai;

describe("Registry contract", () => {
  let registry: Registry;
  let signer: SignerWithAddress;
  before(async () => {
    signer = (await ethers.getSigners())[0];
    const registryFactory = new Registry__factory(signer);
    registry = await registryFactory.deploy();
  });

  it("Should set and get a string", async () => {
    const result1 = await registry.get();
    expect(result1).equal("Hello World!");

    const toSet = "World Hello?";
    const transaction = await registry.set(toSet);
    expect(transaction.from).equal(signer.address);

    const result2 = await registry.get();
    expect(result2).equal(toSet);
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
    const result = outputToStruct((await registry.retrieveByName(contractName))[0]);
    expect(result).to.deep.equal(toStore);
  });
});
