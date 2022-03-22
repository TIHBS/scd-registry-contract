import { ethers } from "hardhat";
import { outputToStruct } from "src/util/contract";
import { Registry__factory } from "../../../src/types/factories/Registry__factory";
import { Registry } from "../../../src/types/Registry";
import expect from "test/expect";

export namespace StoreMultipleRetrieveMultiple {
  export function suite() {
    describe("Store multiple and retrieve multiple", () => {
      let registry: Registry;
      beforeEach(async () => {
        registry = await new Registry__factory((await ethers.getSigners())[0]).deploy();
      });

      it("Should store and retrieve the SCDMetadata by name", async () => {
        const name = "Contract Name 1";
        const scds: Registry.SCDMetadataStruct[] = [
          {
            name: name,
            author: "TestAuthor1",
            version: "v2.11",
            signature: "62cf2bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
            internalAddress: "479f26b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            blockChainType: 0,
            functions: ["function1", "function2", "function3"],
            events: ["event1", "event2", "event3", "event4"],
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
          },
          {
            name: name,
            author: "TestAuthor3",
            version: "v2.33",
            signature: "33332bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
            internalAddress: "333326b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
            url: "https://odysee.com/@NCRfreemusic:c/RickAstley:e",
            blockChainType: 2,
            functions: ["function13", "function23", "function33"],
            events: ["event13", "event23", "event33", "event43"],
          },
        ];
        await registry.storeMultiple(scds);

        const result = (await registry.retrieveByName(name)).map(output => outputToStruct(output));
        expect(result).to.deep.equal([scds[0], scds[2]]);
      });

      it("Should store and retrieve the SCDMetadata by author", async () => {
        const author = "TestAuthor1";
        const scds: Registry.SCDMetadataStruct[] = [
          {
            name: "Contract Name 1",
            author: author,
            version: "v2.11",
            signature: "62cf2bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
            internalAddress: "479f26b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            blockChainType: 0,
            functions: ["function1", "function2", "function3"],
            events: ["event1", "event2", "event3", "event4"],
          },
          {
            name: "Contract Name 2",
            author: author,
            version: "v2.22",
            signature: "22222bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
            internalAddress: "444426b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
            url: "ftp://www.youtube.com/watch?v=dQw4w9WgXcQ",
            blockChainType: 1,
            functions: ["function12", "function22", "function32"],
            events: ["event12", "event22", "event32", "event42"],
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
          },
        ];
        await registry.storeMultiple(scds);

        const result = (await registry.retrieveByAuthor(author)).map(output => outputToStruct(output));
        expect(result).to.deep.equal([scds[0], scds[1]]);
      });

      it("Should store and retrieve the SCDMetadata by the version", async () => {
        const version = "v2.22";
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
          },
          {
            name: "Contract Name 2",
            author: "TestAuthor2",
            version: version,
            signature: "22222bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
            internalAddress: "444426b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
            url: "ftp://www.youtube.com/watch?v=dQw4w9WgXcQ",
            blockChainType: 1,
            functions: ["function12", "function22", "function32"],
            events: ["event12", "event22", "event32", "event42"],
          },
          {
            name: "Contract Name 3",
            author: "TestAuthor3",
            version: version,
            signature: "33332bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
            internalAddress: "333326b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
            url: "https://odysee.com/@NCRfreemusic:c/RickAstley:e",
            blockChainType: 2,
            functions: ["function13", "function23", "function33"],
            events: ["event13", "event23", "event33", "event43"],
          },
        ];
        await registry.storeMultiple(scds);

        const result = (await registry.retrieveByVersion(version)).map(output => outputToStruct(output));
        expect(result).to.deep.equal([scds[1], scds[2]]);
      });

      it("Should store and retrieve the SCDMetadata by the signature", async () => {
        const signature = "62cf2bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746";
        const scds: Registry.SCDMetadataStruct[] = [
          {
            name: "Contract Name 1",
            author: "TestAuthor1",
            version: "v2.11",
            signature: signature,
            internalAddress: "479f26b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            blockChainType: 0,
            functions: ["function1", "function2", "function3"],
            events: ["event1", "event2", "event3", "event4"],
          },
          {
            name: "Contract Name 2",
            author: "TestAuthor2",
            version: "v2.22",
            signature: signature,
            internalAddress: "444426b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
            url: "ftp://www.youtube.com/watch?v=dQw4w9WgXcQ",
            blockChainType: 1,
            functions: ["function12", "function22", "function32"],
            events: ["event12", "event22", "event32", "event42"],
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
          },
        ];
        await registry.storeMultiple(scds);

        const result = (await registry.retrieveBySignature(signature)).map(output => outputToStruct(output));
        expect(result).to.deep.equal([scds[0], scds[1]]);
      });

      it("Should store and retrieve the SCDMetadata by the internal address", async () => {
        const internalAddress = "333326b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548";
        const scds: Registry.SCDMetadataStruct[] = [
          {
            name: "Contract Name 1",
            author: "TestAuthor1",
            version: "v2.11",
            signature: "62cf2bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
            internalAddress: internalAddress,
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            blockChainType: 0,
            functions: ["function1", "function2", "function3"],
            events: ["event1", "event2", "event3", "event4"],
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
          },
          {
            name: "Contract Name 3",
            author: "TestAuthor3",
            version: "v2.33",
            signature: "33332bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
            internalAddress: internalAddress,
            url: "https://odysee.com/@NCRfreemusic:c/RickAstley:e",
            blockChainType: 2,
            functions: ["function13", "function23", "function33"],
            events: ["event13", "event23", "event33", "event43"],
          },
        ];
        await registry.storeMultiple(scds);

        const result = (await registry.retrieveByInternalAddress(internalAddress)).map(output =>
          outputToStruct(output),
        );
        expect(result).to.deep.equal([scds[0], scds[2]]);
      });

      it("Should store and retrieve the SCDMetadata by the url", async () => {
        const url = "ftp://www.youtube.com/watch?v=dQw4w9WgXcQ";
        const scds: Registry.SCDMetadataStruct[] = [
          {
            name: "Contract Name 1",
            author: "TestAuthor1",
            version: "v2.11",
            signature: "62cf2bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
            internalAddress: "479f26b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
            url: url,
            blockChainType: 0,
            functions: ["function1", "function2", "function3"],
            events: ["event1", "event2", "event3", "event4"],
          },
          {
            name: "Contract Name 2",
            author: "TestAuthor2",
            version: "v2.22",
            signature: "22222bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
            internalAddress: "444426b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
            url: url,
            blockChainType: 1,
            functions: ["function12", "function22", "function32"],
            events: ["event12", "event22", "event32", "event42"],
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
          },
        ];
        await registry.storeMultiple(scds);

        const result = (await registry.retrieveByUrl(url)).map(output => outputToStruct(output));
        expect(result).to.deep.equal([scds[0], scds[1]]);
      });

      it("Should store and retrieve the SCDMetadata by the blockchain type", async () => {
        const blockChainType = 3;
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
          },
          {
            name: "Contract Name 2",
            author: "TestAuthor2",
            version: "v2.22",
            signature: "22222bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
            internalAddress: "444426b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
            url: "ftp://www.youtube.com/watch?v=dQw4w9WgXcQ",
            blockChainType: blockChainType,
            functions: ["function12", "function22", "function32"],
            events: ["event12", "event22", "event32", "event42"],
          },
          {
            name: "Contract Name 3",
            author: "TestAuthor3",
            version: "v2.33",
            signature: "33332bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
            internalAddress: "333326b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
            url: "https://odysee.com/@NCRfreemusic:c/RickAstley:e",
            blockChainType: blockChainType,
            functions: ["function13", "function23", "function33"],
            events: ["event13", "event23", "event33", "event43"],
          },
        ];
        await registry.storeMultiple(scds);

        const result = (await registry.retrieveByType(blockChainType)).map(output => outputToStruct(output));
        expect(result).to.deep.equal([scds[1], scds[2]]);
      });

      it("Should store and retrieve the SCDMetadata by function names", async () => {
        const function1 = "function32";
        const function2 = "function43";
        const function3 = "function1";

        const scds: Registry.SCDMetadataStruct[] = [
          {
            name: "Contract Name 1",
            author: "TestAuthor1",
            version: "v2.11",
            signature: "62cf2bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
            internalAddress: "479f26b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            blockChainType: 0,
            functions: [function1, "function2", function3],
            events: ["event1", "event2", "event3", "event4"],
          },
          {
            name: "Contract Name 2",
            author: "TestAuthor2",
            version: "v2.22",
            signature: "22222bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
            internalAddress: "444426b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
            url: "ftp://www.youtube.com/watch?v=dQw4w9WgXcQ",
            blockChainType: 1,
            functions: [function1, function2, "function32"],
            events: ["event12", "event22", "event32", "event42"],
          },
          {
            name: "Contract Name 3",
            author: "TestAuthor3",
            version: "v2.33",
            signature: "33332bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
            internalAddress: "333326b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
            url: "https://odysee.com/@NCRfreemusic:c/RickAstley:e",
            blockChainType: 2,
            functions: ["function13", function2, function3],
            events: ["event13", "event23", "event33", "event43"],
          },
        ];
        await registry.storeMultiple(scds);

        const result1 = (await registry.retrieveByFunction(function1)).map(output => outputToStruct(output));
        expect(result1).to.deep.equal([scds[0], scds[1]]);

        const result2 = (await registry.retrieveByFunction(function2)).map(output => outputToStruct(output));
        expect(result2).to.deep.equal([scds[1], scds[2]]);

        const result3 = (await registry.retrieveByFunction(function3)).map(output => outputToStruct(output));
        expect(result3).to.deep.equal([scds[0], scds[2]]);
      });

      it("Should store and retrieve the SCDMetadata by event names", async () => {
        const event1 = "event11";
        const event2 = "event22";
        const event3 = "event33";

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
            events: [event1, "event23463", event3, "event548658"],
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
            events: [event1, event2, "event567845832", "event44585682"],
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
            events: ["event2346436", event2, event3, "event12341234"],
          },
        ];
        await registry.storeMultiple(scds);

        const result1 = (await registry.retrieveByEvent(event1)).map(output => outputToStruct(output));
        expect(result1).to.deep.equal([scds[0], scds[1]]);

        const result2 = (await registry.retrieveByEvent(event2)).map(output => outputToStruct(output));
        expect(result2).to.deep.equal([scds[1], scds[2]]);

        const result3 = (await registry.retrieveByEvent(event3)).map(output => outputToStruct(output));
        expect(result3).to.deep.equal([scds[0], scds[2]]);
      });
    });
  }
}
