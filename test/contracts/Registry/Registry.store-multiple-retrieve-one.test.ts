import { ethers } from "hardhat";
import { outputToStruct } from "src/util/contract";
import { Registry } from "src/types/Registry";
import { deployRegistry } from "../../SetupRegistry";
import expect from "test/expect";

export function storeMultipleRetrieveOne() {
  describe("Store multiple and retrieve one", () => {
    let registry: Registry;
    const scds: Registry.SCDMetadataStruct[] = [
      {
        name: "Contract Name 1",
        author: "TestAuthor1",
        version: "v2.11",
        signature: "62cf2bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
        internalAddress: "479f26b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        blockChainType: 0,
        functions: ["function1", "function2", "function3"],
        events: ["event1", "event2", "event3", "event4"],
        isValid: true,
      },
      {
        name: "Contract Name 2",
        author: "TestAuthor2",
        version: "v2.22",
        signature: "22222bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
        internalAddress: "444426b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
        url: "ftp://www.youtube.com/watch?v=dQw4w9WgXcQ",
        blockChainType: 1,
        functions: ["function12", "function22", "function32"],
        events: ["event12", "event22", "event32", "event42"],
        isValid: true,
      },
      {
        name: "Contract Name 3",
        author: "TestAuthor3",
        version: "v2.33",
        signature: "33332bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
        internalAddress: "333326b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
        url: "https://odysee.com/@NCRfreemusic:c/RickAstley:e",
        blockChainType: 2,
        functions: ["function13", "function23", "function33"],
        events: ["event13", "event23", "event33", "event43"],
        isValid: true,
      },
      {
        name: "Contract Name 333",
        author: "TestAuthor333",
        version: "v2.333333",
        signature: "33332bcc38e123d525sdfsd12bd72550cc61b0020ba726143d63fb58ec51371c5e746",
        internalAddress: "333326b5f6edfsf0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
        url: "https://odysee.com/@NCRfreemusic:c/RickAstley:eeeeee",
        blockChainType: 3,
        functions: ["function15e453", "function255ee3", "function366ep3ee"],
        events: ["event990e03", "event34e63", "event883e3ee", "event46e73"],
        isValid: true,
      },
    ];

    before(async () => {
      [registry] = await deployRegistry((await ethers.getSigners())[0]);
      await registry.storeMultiple(scds);
    });

    it("Should store and retrieve the SCDMetadata by id", async () => {
      const id = 1;
      const result = await registry.retrieveById(id);

      const metadata = outputToStruct(result.metadata);

      expect(metadata).to.deep.equal(scds[id]);
      expect(result.id).to.equal(id);
    });

    it("Should store and retrieve the SCDMetadata by name", async () => {
      const result = (await registry.retrieveByName(scds[1].name)).map(output => outputToStruct(output.metadata))[0];
      expect(result).to.deep.equal(scds[1]);
    });

    it("Should store and retrieve the SCDMetadata by author", async () => {
      const result = (await registry.retrieveByAuthor(scds[1].author)).map(output =>
        outputToStruct(output.metadata),
      )[0];
      expect(result).to.deep.equal(scds[1]);
    });

    it("Should store and retrieve the SCDMetadata by the version", async () => {
      const result = (await registry.retrieveByVersion(scds[1].version)).map(output =>
        outputToStruct(output.metadata),
      )[0];
      expect(result).to.deep.equal(scds[1]);
    });

    it("Should store and retrieve the SCDMetadata by the signature", async () => {
      const result = (await registry.retrieveBySignature(scds[1].signature)).map(output =>
        outputToStruct(output.metadata),
      )[0];
      expect(result).to.deep.equal(scds[1]);
    });

    it("Should store and retrieve the SCDMetadata by the internal address", async () => {
      const result = (await registry.retrieveByInternalAddress(scds[1].internalAddress)).map(output =>
        outputToStruct(output.metadata),
      )[0];
      expect(result).to.deep.equal(scds[1]);
    });

    it("Should store and retrieve the SCDMetadata by the url", async () => {
      const result = (await registry.retrieveByUrl(scds[1].url)).map(output => outputToStruct(output.metadata))[0];
      expect(result).to.deep.equal(scds[1]);
    });

    it("Should store and retrieve the SCDMetadata by the blockchain type", async () => {
      const result0 = (await registry.retrieveByType(scds[0].blockChainType)).map(output =>
        outputToStruct(output.metadata),
      )[0];
      expect(result0).to.deep.equal(scds[0]);

      const result1 = (await registry.retrieveByType(scds[1].blockChainType)).map(output =>
        outputToStruct(output.metadata),
      )[0];
      expect(result1).to.deep.equal(scds[1]);

      const result2 = (await registry.retrieveByType(scds[2].blockChainType)).map(output =>
        outputToStruct(output.metadata),
      )[0];
      expect(result2).to.deep.equal(scds[2]);

      const result3 = (await registry.retrieveByType(scds[3].blockChainType)).map(output =>
        outputToStruct(output.metadata),
      )[0];
      expect(result3).to.deep.equal(scds[3]);
    });

    it("Should store and retrieve the SCDMetadata by function names", async () => {
      const result1 = (await registry.retrieveByFunction(scds[1].functions[0])).map(output =>
        outputToStruct(output.metadata),
      )[0];
      expect(result1).to.deep.equal(scds[1]);

      const result2 = (await registry.retrieveByFunction(scds[1].functions[1])).map(output =>
        outputToStruct(output.metadata),
      )[0];
      expect(result2).to.deep.equal(scds[1]);
    });

    it("Should store and retrieve the SCDMetadata by event names", async () => {
      const result1 = (await registry.retrieveByEvent(scds[1].events[0])).map(output =>
        outputToStruct(output.metadata),
      )[0];
      expect(result1).to.deep.equal(scds[1]);

      const result2 = (await registry.retrieveByEvent(scds[1].events[1])).map(output =>
        outputToStruct(output.metadata),
      )[0];
      expect(result2).to.deep.equal(scds[1]);
    });
  });
}
