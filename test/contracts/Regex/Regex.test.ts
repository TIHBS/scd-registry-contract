import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { Regex } from "src/types";
import expect from "test/expect";
import { deployRegistry } from "test/SetupRegistry";

type Result = [BigNumber, BigNumber, boolean] & {
  begin: BigNumber;
  end: BigNumber;
  accepts: boolean;
};

describe("Regex", () => {
  let regex: Regex;
  before(async () => {
    [, regex] = await deployRegistry((await ethers.getSigners())[0]);
  });

  it("Should find the query from the beginning of the string to the end", async () => {
    const query = "InternalAddress='479f26b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548'";
    const expected = [BigNumber.from(0), BigNumber.from(query.length), true] as Result;
    const result = (await regex.find(query)) as Result;
    expect(result).to.deep.equal(expected);
  });

  it("Should find the query", async () => {
    const query =
      "dfgagegesg InternalAddress='479f26b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548' dsadgsadgsg";
    const expected = [BigNumber.from(11), BigNumber.from(93), true] as Result;
    const result = (await regex.find(query)) as Result;
    expect(result).to.deep.equal(expected);
  });

  it("Should not find the query", async () => {
    const query = "InternalAddress=";
    const expected = [BigNumber.from(0), BigNumber.from(query.length), false] as Result;
    const result = (await regex.find(query)) as Result;
    expect(result).to.deep.equal(expected);
  });

  it("Should match the query from the beginning of the string to the end", async () => {
    const query = "InternalAddress='479f26b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548'";
    const result = await regex.matches(query);
    expect(result).to.be.true;
  });

  it("Should not match the query", async () => {
    const query = "InternalAddress=";
    const result = await regex.matches(query);
    expect(result).to.be.false;
  });

  it("Should also not match the query", async () => {
    const query =
      "dfgagegesg InternalAddress='479f26b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548' dsadgsadgsg";
    const result = await regex.matches(query);
    expect(result).to.be.false;
  });

  it("Should count the occurrences in the string", async () => {
    const expected = [
      "InternalAddress='479f26b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548'",
      "BlockchainType='1'",
      "Signature='62cf2bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746'",
    ];
    const query = expected.join(" ");
    const result = await regex.count(query);
    expect(result).to.equal(BigNumber.from(expected.length));
  });

  it("Should tokenize the string", async () => {
    const expected = [
      "InternalAddress='479f26b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548'",
      "BlockchainType='1'",
      "Signature='62cf2bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746'",
    ];
    const query = expected.join(" ");
    const result = await regex.tokenize(query);
    expect(result).to.deep.equal(expected);
  });

  it("Should also tokenize the string", async () => {
    const expected = [
      "InternalAddress='479f26b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548'",
      "BlockchainType='1'",
      "Signature='62cf2bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746'",
    ];
    const query = "Hello" + expected.join("efeawfawfghjbbbbkasmnfklssssssssmsa") + "utututututututut";
    const result = await regex.tokenize(query);
    expect(result).to.deep.equal(expected);
  });
});
