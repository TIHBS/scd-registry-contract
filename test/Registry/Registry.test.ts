import { ethers } from "hardhat";
import { outputToStruct } from "src/util/contract";
import { Registry__factory } from "../../src/types/factories/Registry__factory";
import { Registry } from "../../src/types/Registry";
import expect from "test/expect";

describe("Registry contract", () => {
  let registry: Registry;
  const scd: Registry.SCDMetadataStruct = {
    name: "Contract Name 1",
    author: "TestAuthor1",
    version: "v2.3",
    signature: "62cf2bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
    internalAddress: "479f26b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    blockChainType: 0,
    functions: ["function1", "function2", "function3"],
    events: ["event1", "event2", "event3", "event4"],
  };

  before(async () => {
    registry = await new Registry__factory((await ethers.getSigners())[0]).deploy();
    await registry.store(scd);
  });

  it("Should store and retrieve the SCDMetadata by name", async () => {
    const name = "Contract Name 1";
    const result = (await registry.retrieveByName(name)).map(output => outputToStruct(output))[0];
    expect(result).to.deep.equal(scd);
  });

  it("Should store and retrieve the SCDMetadata by author", async () => {
    const author = "TestAuthor1";
    const result = (await registry.retrieveByAuthor(author)).map(output => outputToStruct(output))[0];
    expect(result).to.deep.equal(scd);
  });

  it("Should store and retrieve the SCDMetadata by the internal address", async () => {
    const internalAddress = "479f26b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548";
    const result = (await registry.retrieveByInternalAddress(internalAddress)).map(output => outputToStruct(output))[0];
    expect(result).to.deep.equal(scd);
  });

  it("Should store and retrieve the SCDMetadata by the url", async () => {
    const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    const result = (await registry.retrieveByUrl(url)).map(output => outputToStruct(output))[0];
    expect(result).to.deep.equal(scd);
  });
});
