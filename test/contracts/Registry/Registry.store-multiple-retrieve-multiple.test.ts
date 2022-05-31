import { ethers } from "hardhat";
import { outputToStruct } from "src/util/contract";
import { Registry } from "src/types/Registry";
import { deployRegistry } from "../../SetupRegistry";
import expect from "test/expect";
import { Registry__factory } from "src/types/factories/Registry__factory";

export function storeMultipleRetrieveMultiple() {
  describe("Store multiple and retrieve multiple", () => {
    let registry: Registry;
    let address: string;

    beforeEach(async () => {
      const signer = (await ethers.getSigners())[0];
      address = await signer.getAddress();
      [registry] = await deployRegistry(signer);
    });

    it("Should store and retrieve the SCDMetadata by name", async () => {
      const name = "Contract Name 1";
      const scds: Registry.SCDMetadataStruct[] = [
        {
          name: name,
          author: address,
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
          author: address,
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
          name: name,
          author: address,
          version: "v2.33",
          signature: "33332bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
          internalAddress: "333326b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
          url: "https://odysee.com/@NCRfreemusic:c/RickAstley:e",
          blockChainType: 2,
          functions: ["function13", "function23", "function33"],
          events: ["event13", "event23", "event33", "event43"],
          isValid: true,
        },
      ];
      await registry.storeMultiple(scds);

      const result = (await registry.retrieveByName(name)).map(output => outputToStruct(output.metadata));
      expect(result).to.deep.equal([scds[0], scds[2]]);
    });

    it("Should store and retrieve the SCDMetadata by id", async () => {
      const scds: Registry.SCDMetadataStruct[] = [
        {
          name: "Contract Name 1",
          author: address,
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
          author: address,
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
          author: address,
          version: "v2.33",
          signature: "33332bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
          internalAddress: "333326b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
          url: "https://odysee.com/@NCRfreemusic:c/RickAstley:e",
          blockChainType: 2,
          functions: ["function13", "function23", "function33"],
          events: ["event13", "event23", "event33", "event43"],
          isValid: true,
        },
      ];
      await registry.storeMultiple(scds);

      {
        const id = 0;
        const result = await registry.retrieveById(id);

        const metadata = outputToStruct(result.metadata);

        expect(metadata).to.deep.equal(scds[id]);
        expect(result.id).to.equal(id);
      }

      {
        const id = 1;
        const result = await registry.retrieveById(id);

        const metadata = outputToStruct(result.metadata);

        expect(metadata).to.deep.equal(scds[id]);
        expect(result.id).to.equal(id);
      }

      {
        const id = 2;
        const result = await registry.retrieveById(id);

        const metadata = outputToStruct(result.metadata);

        expect(metadata).to.deep.equal(scds[id]);
        expect(result.id).to.equal(id);
      }
    });

    it("Should store and retrieve the SCDMetadata by author", async () => {
      const signers = await ethers.getSigners();

      const address1 = await signers[0].getAddress();
      const address2 = await signers[1].getAddress();

      const scds: Registry.SCDMetadataStruct[] = [
        {
          name: "Contract Name 1",
          author: address1,
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
          author: address1,
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
          author: address2,
          version: "v2.33",
          signature: "33332bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
          internalAddress: "333326b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
          url: "https://odysee.com/@NCRfreemusic:c/RickAstley:e",
          blockChainType: 2,
          functions: ["function13", "function23", "function33"],
          events: ["event13", "event23", "event33", "event43"],
          isValid: true,
        },
      ];

      await Registry__factory.connect(registry.address, signers[0]).store(scds[0]);
      await Registry__factory.connect(registry.address, signers[0]).store(scds[1]);
      await Registry__factory.connect(registry.address, signers[1]).store(scds[2]);

      const result = (await registry.retrieveByAuthor(address)).map(output => outputToStruct(output.metadata));
      expect(result).to.deep.equal([scds[0], scds[1]]);
    });

    it("Should store and retrieve the SCDMetadata by the version", async () => {
      const version = "v2.22";
      const scds: Registry.SCDMetadataStruct[] = [
        {
          name: "Contract Name 1",
          author: address,
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
          author: address,
          version: version,
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
          author: address,
          version: version,
          signature: "33332bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
          internalAddress: "333326b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
          url: "https://odysee.com/@NCRfreemusic:c/RickAstley:e",
          blockChainType: 2,
          functions: ["function13", "function23", "function33"],
          events: ["event13", "event23", "event33", "event43"],
          isValid: true,
        },
      ];
      await registry.storeMultiple(scds);

      const result = (await registry.retrieveByVersion(version)).map(output => outputToStruct(output.metadata));
      expect(result).to.deep.equal([scds[1], scds[2]]);
    });

    it("Should store and retrieve the SCDMetadata by the signature", async () => {
      const signature = "62cf2bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746";
      const scds: Registry.SCDMetadataStruct[] = [
        {
          name: "Contract Name 1",
          author: address,
          version: "v2.11",
          signature: signature,
          internalAddress: "479f26b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          blockChainType: 0,
          functions: ["function1", "function2", "function3"],
          events: ["event1", "event2", "event3", "event4"],
          isValid: true,
        },
        {
          name: "Contract Name 2",
          author: address,
          version: "v2.22",
          signature: signature,
          internalAddress: "444426b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
          url: "ftp://www.youtube.com/watch?v=dQw4w9WgXcQ",
          blockChainType: 1,
          functions: ["function12", "function22", "function32"],
          events: ["event12", "event22", "event32", "event42"],
          isValid: true,
        },
        {
          name: "Contract Name 3",
          author: address,
          version: "v2.33",
          signature: "33332bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
          internalAddress: "333326b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
          url: "https://odysee.com/@NCRfreemusic:c/RickAstley:e",
          blockChainType: 2,
          functions: ["function13", "function23", "function33"],
          events: ["event13", "event23", "event33", "event43"],
          isValid: true,
        },
      ];
      await registry.storeMultiple(scds);

      const result = (await registry.retrieveBySignature(signature)).map(output => outputToStruct(output.metadata));
      expect(result).to.deep.equal([scds[0], scds[1]]);
    });

    it("Should store and retrieve the SCDMetadata by the internal address", async () => {
      const internalAddress = "333326b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548";
      const scds: Registry.SCDMetadataStruct[] = [
        {
          name: "Contract Name 1",
          author: address,
          version: "v2.11",
          signature: "62cf2bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
          internalAddress: internalAddress,
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          blockChainType: 0,
          functions: ["function1", "function2", "function3"],
          events: ["event1", "event2", "event3", "event4"],
          isValid: true,
        },
        {
          name: "Contract Name 2",
          author: address,
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
          author: address,
          version: "v2.33",
          signature: "33332bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
          internalAddress: internalAddress,
          url: "https://odysee.com/@NCRfreemusic:c/RickAstley:e",
          blockChainType: 2,
          functions: ["function13", "function23", "function33"],
          events: ["event13", "event23", "event33", "event43"],
          isValid: true,
        },
      ];
      await registry.storeMultiple(scds);

      const result = (await registry.retrieveByInternalAddress(internalAddress)).map(output =>
        outputToStruct(output.metadata),
      );
      expect(result).to.deep.equal([scds[0], scds[2]]);
    });

    it("Should store and retrieve the SCDMetadata by the url", async () => {
      const url = "ftp://www.youtube.com/watch?v=dQw4w9WgXcQ";
      const scds: Registry.SCDMetadataStruct[] = [
        {
          name: "Contract Name 1",
          author: address,
          version: "v2.11",
          signature: "62cf2bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
          internalAddress: "479f26b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
          url: url,
          blockChainType: 0,
          functions: ["function1", "function2", "function3"],
          events: ["event1", "event2", "event3", "event4"],
          isValid: true,
        },
        {
          name: "Contract Name 2",
          author: address,
          version: "v2.22",
          signature: "22222bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
          internalAddress: "444426b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
          url: url,
          blockChainType: 1,
          functions: ["function12", "function22", "function32"],
          events: ["event12", "event22", "event32", "event42"],
          isValid: true,
        },
        {
          name: "Contract Name 3",
          author: address,
          version: "v2.33",
          signature: "33332bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
          internalAddress: "333326b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
          url: "https://odysee.com/@NCRfreemusic:c/RickAstley:e",
          blockChainType: 2,
          functions: ["function13", "function23", "function33"],
          events: ["event13", "event23", "event33", "event43"],
          isValid: true,
        },
      ];
      await registry.storeMultiple(scds);

      const result = (await registry.retrieveByUrl(url)).map(output => outputToStruct(output.metadata));
      expect(result).to.deep.equal([scds[0], scds[1]]);
    });

    it("Should store and retrieve the SCDMetadata by the blockchain type", async () => {
      const blockChainType = 3;
      const scds: Registry.SCDMetadataStruct[] = [
        {
          name: "Contract Name 1",
          author: address,
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
          author: address,
          version: "v2.22",
          signature: "22222bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
          internalAddress: "444426b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
          url: "ftp://www.youtube.com/watch?v=dQw4w9WgXcQ",
          blockChainType: blockChainType,
          functions: ["function12", "function22", "function32"],
          events: ["event12", "event22", "event32", "event42"],
          isValid: true,
        },
        {
          name: "Contract Name 3",
          author: address,
          version: "v2.33",
          signature: "33332bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
          internalAddress: "333326b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
          url: "https://odysee.com/@NCRfreemusic:c/RickAstley:e",
          blockChainType: blockChainType,
          functions: ["function13", "function23", "function33"],
          events: ["event13", "event23", "event33", "event43"],
          isValid: true,
        },
      ];
      await registry.storeMultiple(scds);

      const result = (await registry.retrieveByType(blockChainType)).map(output => outputToStruct(output.metadata));
      expect(result).to.deep.equal([scds[1], scds[2]]);
    });

    it("Should store and retrieve the SCDMetadata by function names", async () => {
      const function1 = "function32";
      const function2 = "function43";
      const function3 = "function1";

      const scds: Registry.SCDMetadataStruct[] = [
        {
          name: "Contract Name 1",
          author: address,
          version: "v2.11",
          signature: "62cf2bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
          internalAddress: "479f26b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          blockChainType: 0,
          functions: [function1, "function2", function3],
          events: ["event1", "event2", "event3", "event4"],
          isValid: true,
        },
        {
          name: "Contract Name 2",
          author: address,
          version: "v2.22",
          signature: "22222bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
          internalAddress: "444426b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
          url: "ftp://www.youtube.com/watch?v=dQw4w9WgXcQ",
          blockChainType: 1,
          functions: [function1, function2, "function32"],
          events: ["event12", "event22", "event32", "event42"],
          isValid: true,
        },
        {
          name: "Contract Name 3",
          author: address,
          version: "v2.33",
          signature: "33332bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
          internalAddress: "333326b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
          url: "https://odysee.com/@NCRfreemusic:c/RickAstley:e",
          blockChainType: 2,
          functions: ["function13", function2, function3],
          events: ["event13", "event23", "event33", "event43"],
          isValid: true,
        },
      ];
      await registry.storeMultiple(scds);

      const result1 = (await registry.retrieveByFunction(function1)).map(output => outputToStruct(output.metadata));
      expect(result1).to.deep.equal([scds[0], scds[1]]);

      const result2 = (await registry.retrieveByFunction(function2)).map(output => outputToStruct(output.metadata));
      expect(result2).to.deep.equal([scds[1], scds[2]]);

      const result3 = (await registry.retrieveByFunction(function3)).map(output => outputToStruct(output.metadata));
      expect(result3).to.deep.equal([scds[0], scds[2]]);
    });

    it("Should store and retrieve the SCDMetadata by event names", async () => {
      const event1 = "event11";
      const event2 = "event22";
      const event3 = "event33";

      const scds: Registry.SCDMetadataStruct[] = [
        {
          name: "Contract Name 1",
          author: address,
          version: "v2.11",
          signature: "62cf2bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
          internalAddress: "479f26b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          blockChainType: 0,
          functions: ["function1", "function2", "function3"],
          events: [event1, "event23463", event3, "event548658"],
          isValid: true,
        },
        {
          name: "Contract Name 2",
          author: address,
          version: "v2.22",
          signature: "22222bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
          internalAddress: "444426b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
          url: "ftp://www.youtube.com/watch?v=dQw4w9WgXcQ",
          blockChainType: 1,
          functions: ["function12", "function22", "function32"],
          events: [event1, event2, "event567845832", "event44585682"],
          isValid: true,
        },
        {
          name: "Contract Name 3",
          author: address,
          version: "v2.33",
          signature: "33332bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
          internalAddress: "333326b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
          url: "https://odysee.com/@NCRfreemusic:c/RickAstley:e",
          blockChainType: 2,
          functions: ["function13", "function23", "function33"],
          events: ["event2346436", event2, event3, "event12341234"],
          isValid: true,
        },
      ];
      await registry.storeMultiple(scds);

      const result1 = (await registry.retrieveByEvent(event1)).map(output => outputToStruct(output.metadata));
      expect(result1).to.deep.equal([scds[0], scds[1]]);

      const result2 = (await registry.retrieveByEvent(event2)).map(output => outputToStruct(output.metadata));
      expect(result2).to.deep.equal([scds[1], scds[2]]);

      const result3 = (await registry.retrieveByEvent(event3)).map(output => outputToStruct(output.metadata));
      expect(result3).to.deep.equal([scds[0], scds[2]]);
    });
  });
}
