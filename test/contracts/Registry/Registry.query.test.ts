import { ethers } from "hardhat";
import { outputToStruct } from "src/util/contract";
import { Registry } from "src/types";
import { deployRegistry } from "../../SetupRegistry";
import expect from "test/expect";

interface QueryTestFunction {
  (query: string): Promise<Registry.SCDMetadataStruct[]>;
}

export function query() {
  describe("Query", () => {
    async function testQuery(query: string, expected: Registry.SCDMetadataStruct[], func: QueryTestFunction) {
      const result = await func(query);
      expect(result).to.deep.equal(expected);
    }

    describe("One parameter", () => {
      let registry: Registry;
      let address: string;
      let scd: Registry.SCDMetadataStruct[];

      before(async () => {
        const signer = (await ethers.getSigners())[0];
        address = await signer.getAddress();
        scd = [
          {
            name: "Contract-Name-1",
            author: address,
            version: "v2.3",
            signature: "62cf2bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
            internalAddress: "479f26b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            blockChainType: 1,
            functions: ["function1", "function2", "function3"],
            events: ["event1", "event2", "event3", "event4"],
            isValid: true,
          },
        ];

        [registry] = await deployRegistry(signer);
        await registry.store(scd[0]);
      });

      it("Should query the smart contract and retrieve one SCDMetadata object by Name", async () => {
        await testQuery(`Name='${scd[0].name}'`, scd, async (query: string) =>
          (await registry.query(query)).map(output => outputToStruct(output.metadata)),
        );
      });

      it("Should query the smart contract and retrieve one SCDMetadata object by Author", async () => {
        await testQuery(`Author='${scd[0].author}'`, scd, async (query: string) =>
          (await registry.query(query)).map(output => outputToStruct(output.metadata)),
        );
      });

      it("Should query the smart contract and retrieve one SCDMetadata object by Version", async () => {
        await testQuery(`Version='${scd[0].version}'`, scd, async (query: string) =>
          (await registry.query(query)).map(output => outputToStruct(output.metadata)),
        );
      });

      it("Should query the smart contract and retrieve one SCDMetadata object by Signature", async () => {
        await testQuery(`Signature='${scd[0].signature}'`, scd, async (query: string) =>
          (await registry.query(query)).map(output => outputToStruct(output.metadata)),
        );
      });

      it("Should query the smart contract and retrieve one SCDMetadata object by InternalAddress", async () => {
        await testQuery(`InternalAddress='${scd[0].internalAddress}'`, scd, async (query: string) =>
          (await registry.query(query)).map(output => outputToStruct(output.metadata)),
        );
      });

      it("Should query the smart contract and retrieve one SCDMetadata object by Url", async () => {
        await testQuery(`Url='${scd[0].url}'`, scd, async (query: string) =>
          (await registry.query(query)).map(output => outputToStruct(output.metadata)),
        );
      });

      it("Should query the smart contract and retrieve one SCDMetadata object by BlockchainType", async () => {
        await testQuery(`BlockchainType='${scd[0].blockChainType}'`, scd, async (query: string) =>
          (await registry.query(query)).map(output => outputToStruct(output.metadata)),
        );
      });

      it("Should query the smart contract and retrieve one SCDMetadata object by Function", async () => {
        await testQuery(`Function='${scd[0].functions[1]}'`, scd, async (query: string) =>
          (await registry.query(query)).map(output => outputToStruct(output.metadata)),
        );
      });

      it("Should query the smart contract and retrieve one SCDMetadata object by Event", async () => {
        await testQuery(`Event='${scd[0].events[1]}'`, scd, async (query: string) =>
          (await registry.query(query)).map(output => outputToStruct(output.metadata)),
        );
      });

      it("Should query the smart contract and retrieve nothing", async () => {
        const query = "Author=doesn't-exist!";
        const result = (await registry.query(query)).map(output => outputToStruct(output.metadata))[0];
        expect(result).to.be.undefined;
      });
    });

    describe("Multiple parameter", () => {
      let registry: Registry;
      let address: string;

      beforeEach(async () => {
        const signer = (await ethers.getSigners())[0];
        address = await signer.getAddress();

        [registry] = await deployRegistry(signer);
      });

      it("Should query the smart contract and retrieve two SCDMetadata objects by Event and Author", async () => {
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
            events: ["event12", "event2", "event32", "event42"],
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
        await testQuery(
          `Event='${scds[0].events[1]}' Author='${scds[0].author}'`,
          [scds[0], scds[1]],
          async (query: string) => (await registry.query(query)).map(output => outputToStruct(output.metadata)),
        );
      });

      it("Should query the smart contract and retrieve two SCDMetadata objects by Event, Author and Name", async () => {
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
            name: "Contract Name 1",
            author: address,
            version: "v2.22",
            signature: "22222bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
            internalAddress: "444426b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
            url: "ftp://www.youtube.com/watch?v=dQw4w9WgXcQ",
            blockChainType: 1,
            functions: ["function12", "function22", "function32"],
            events: ["event12", "event2", "event32", "event42"],
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
        await testQuery(
          `Event='${scds[0].events[1]}' Name='${scds[0].name}' Author='${scds[0].author}'`,
          [scds[0], scds[1]],
          async (query: string) => (await registry.query(query)).map(output => outputToStruct(output.metadata)),
        );
      });

      it("Should query the smart contract and retrieve two SCDMetadata objects by Function and Name", async () => {
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
            name: "Contract Name 1",
            author: address,
            version: "v2.22",
            signature: "22222bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
            internalAddress: "444426b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
            url: "ftp://www.youtube.com/watch?v=dQw4w9WgXcQ",
            blockChainType: 1,
            functions: ["function12", "function22", "function3"],
            events: ["event12", "event2", "event32", "event42"],
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
        await testQuery(
          `Name='${scds[0].name}' Function='${scds[0].functions[2]}'`,
          [scds[0], scds[1]],
          async (query: string) => (await registry.query(query)).map(output => outputToStruct(output.metadata)),
        );
      });

      it("Should query the smart contract and retrieve two SCDMetadata objects by InternalAddress and BlockChainType", async () => {
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
            name: "Contract Name 1",
            author: address,
            version: "v2.22",
            signature: "22222bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
            internalAddress: "333326b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
            url: "ftp://www.youtube.com/watch?v=dQw4w9WgXcQ",
            blockChainType: 1,
            functions: ["function12", "function22", "function3"],
            events: ["event12", "event2", "event32", "event42"],
            isValid: true,
          },
          {
            name: "Contract Name 3",
            author: address,
            version: "v2.33",
            signature: "33332bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
            internalAddress: "333326b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
            url: "https://odysee.com/@NCRfreemusic:c/RickAstley:e",
            blockChainType: 1,
            functions: ["function13", "function23", "function33"],
            events: ["event13", "event23", "event33", "event43"],
            isValid: true,
          },
        ];

        await registry.storeMultiple(scds);
        await testQuery(
          `InternalAddress='${scds[1].internalAddress}' BlockChainType='${scds[0].blockChainType}'`,
          [scds[1], scds[2]],
          async (query: string) => (await registry.query(query)).map(output => outputToStruct(output.metadata)),
        );
      });
    });
  });
}
