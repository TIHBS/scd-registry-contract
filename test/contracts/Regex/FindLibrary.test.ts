import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { FindLibrary, FindLibrary__factory } from "src/types";
import expect from "test/expect";

type Result = [BigNumber, BigNumber, boolean] & {
  begin: BigNumber;
  end: BigNumber;
  accepts: boolean;
};

describe("FindLibrary", () => {
  let find: FindLibrary;
  before(async () => {
    find = await new FindLibrary__factory((await ethers.getSigners())[0]).deploy();
  });

  it("Should find the query from the beginning of the string to the end", async () => {
    const query = "InternalAddress='479f26b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548'";
    const expected = [BigNumber.from(0), BigNumber.from(query.length), true] as Result;
    const result = (await find.find(query)) as Result;
    expect(result).to.deep.equal(expected);
  });

  it("Should find the query", async () => {
    const query =
      "dfgagegesg InternalAddress='479f26b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548' dsadgsadgsg";
    const expected = [BigNumber.from(11), BigNumber.from(93), true] as Result;
    const result = (await find.find(query)) as Result;
    expect(result).to.deep.equal(expected);
  });

  it("Should not find the query", async () => {
    const query = "InternalAddress=";
    const expected = [BigNumber.from(0), BigNumber.from(query.length), false] as Result;
    const result = (await find.find(query)) as Result;
    expect(result).to.deep.equal(expected);
  });
});
