import { ethers } from "hardhat";
import { outputToStruct } from "src/util/contract";
import { Registry__factory } from "../../../src/types/factories/Registry__factory";
import { Registry } from "../../../src/types/Registry";
import expect from "test/expect";

export function storeOneRetrieveOne() {
  describe("Store one and retrieve one", () => {
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

    it("Should store and retrieve the SCDMetadata by id", async () => {
      const id = 1;
      const result = await registry.retrieveById(id);

      const metadata = outputToStruct(result.metadata);

      expect(metadata).to.deep.equal(scd);
      expect(result.id).to.equal(id);
    });

    it("Should store and retrieve the SCDMetadata by name", async () => {
      const result = (await registry.retrieveByName(scd.name)).map(output => outputToStruct(output.metadata))[0];
      expect(result).to.deep.equal(scd);
    });

    it("Should store and retrieve the SCDMetadata by author", async () => {
      const result = (await registry.retrieveByAuthor(scd.author)).map(output => outputToStruct(output.metadata))[0];
      expect(result).to.deep.equal(scd);
    });

    it("Should store and retrieve the SCDMetadata by the version", async () => {
      const result = (await registry.retrieveByVersion(scd.version)).map(output => outputToStruct(output.metadata))[0];
      expect(result).to.deep.equal(scd);
    });

    it("Should store and retrieve the SCDMetadata by the signature", async () => {
      const result = (await registry.retrieveBySignature(scd.signature)).map(output =>
        outputToStruct(output.metadata),
      )[0];
      expect(result).to.deep.equal(scd);
    });

    it("Should store and retrieve the SCDMetadata by the internal address", async () => {
      const result = (await registry.retrieveByInternalAddress(scd.internalAddress)).map(output =>
        outputToStruct(output.metadata),
      )[0];
      expect(result).to.deep.equal(scd);
    });

    it("Should store and retrieve the SCDMetadata by the url", async () => {
      const result = (await registry.retrieveByUrl(scd.url)).map(output => outputToStruct(output.metadata))[0];
      expect(result).to.deep.equal(scd);
    });

    it("Should store and retrieve the SCDMetadata by the blockchain type", async () => {
      const result = (await registry.retrieveByType(scd.blockChainType)).map(output =>
        outputToStruct(output.metadata),
      )[0];
      expect(result).to.deep.equal(scd);
    });

    it("Should store and retrieve the SCDMetadata by function names", async () => {
      const result1 = (await registry.retrieveByFunction(scd.functions[0])).map(output =>
        outputToStruct(output.metadata),
      )[0];
      expect(result1).to.deep.equal(scd);

      const result2 = (await registry.retrieveByFunction(scd.functions[1])).map(output =>
        outputToStruct(output.metadata),
      )[0];
      expect(result2).to.deep.equal(scd);
    });

    it("Should store and retrieve the SCDMetadata by event names", async () => {
      const result1 = (await registry.retrieveByEvent(scd.events[0])).map(output => outputToStruct(output.metadata))[0];
      expect(result1).to.deep.equal(scd);

      const result2 = (await registry.retrieveByEvent(scd.events[1])).map(output => outputToStruct(output.metadata))[0];
      expect(result2).to.deep.equal(scd);
    });
  });
}
