import { Registry__factory } from "../typechain-types/factories/Registry__factory";
import { Registry } from "../typechain-types/Registry";
import { solidity } from "ethereum-waffle";
import { ethers } from "hardhat";
import chai from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

chai.use(solidity);
const { expect } = chai;

describe("Token contract", () => {
  let registry: Registry;
  let signer: SignerWithAddress;
  beforeEach(async () => {
    signer = (await ethers.getSigners())[0];
    const registryFactory = new Registry__factory(signer);
    registry = await registryFactory.deploy();
  });

  it("Deployment should assign the total supply of tokens to the owner", async () => {
    const result1 = await registry.Get();
    expect(result1).equal("Hello World!");

    const toSet = "World Hello?";
    const result2 = await registry.Set(toSet);
    expect(result2.from).equal(signer.address);

    const result3 = await registry.Get();
    expect(result3).equal(toSet);
  });
});
