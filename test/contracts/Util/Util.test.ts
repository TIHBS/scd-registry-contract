import { ethers } from "hardhat";
import { Util__factory } from "../../../src/types/factories/Util__factory";
import { Util } from "../../../src/types/Util";
import expect from "test/expect";

describe("Util", () => {
  let utilContract: Util;
  before(async () => {
    utilContract = await new Util__factory((await ethers.getSigners())[0]).deploy();
  });

  it("Should splitt the string", async () => {
    {
      const expected = ["string1", "string2", "string3", "string4"];
      const delim = " ";
      const str = expected.join(delim);

      const result = await utilContract.tokenize(str, delim);
      expect(result).to.deep.equal(expected);
    }

    {
      const expected = ["string5", "string6", "string7", "string8"];
      const delim = ".";
      const str = expected.join(delim);

      const result = await utilContract.tokenize(str, delim);
      expect(result).to.deep.equal(expected);
    }

    {
      const expected = ["string9", "string10", "string11", "string12"];
      const delim = ",";
      const str = expected.join(delim);

      const result = await utilContract.tokenize(str, delim);
      expect(result).to.deep.equal(expected);
    }
  });
});
