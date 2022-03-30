import { ethers } from "hardhat";
import { outputToStruct } from "src/util/contract";
import { Registry } from "src/types/Registry";
import { deployRegistry } from "../../SetupRegistry";
import expect from "test/expect";

export function edgeCases() {
  describe("Edge cases", () => {
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
      isValid: true,
    };

    before(async () => {
      [registry] = await deployRegistry((await ethers.getSigners())[0]);
      await registry.store(scd);
    });

    it("Should store and retrieve empty SCDMetadata by id", async () => {
      const id = 547867489;
      const result = await registry.retrieveById(id);

      const metadata = outputToStruct(result.metadata);

      expect(metadata.isValid).to.be.false;
    });

    it("Should store and retrieve an empty array by name", async () => {
      const name = "doesn't exist!";
      const result = (await registry.retrieveByName(name)).map(output => outputToStruct(output.metadata));
      expect(result).to.be.an("array");
      expect(result).to.have.length(0);
    });

    it("Should store and retrieve an empty array by author", async () => {
      const author = "doesn't exist!";
      const result = (await registry.retrieveByName(author)).map(output => outputToStruct(output.metadata));
      expect(result).to.be.an("array");
      expect(result).to.have.length(0);
    });
  });
}
