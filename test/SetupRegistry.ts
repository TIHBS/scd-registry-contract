import { Signer } from "ethers";
import {
  Regex,
  Regex__factory,
  Registry,
  Registry__factory,
  FindLibrary__factory,
  QueryRegex__factory,
  Util__factory,
} from "src/types";

export async function deployRegistry(signer: Signer): Promise<[Registry, Regex]> {
  const queryLibrary = await new QueryRegex__factory(signer).deploy();
  const findLibrary = await new FindLibrary__factory(signer).deploy();
  const util = await new Util__factory(signer).deploy();

  const regex = await new Regex__factory(
    {
      "__contracts/generated/QueryRegex.sol:Q__": queryLibrary.address,
      "__contracts/FindLibrary.sol:FindLibrar__": findLibrary.address,
    },
    signer,
  ).deploy(util.address);

  const registry = await new Registry__factory(signer).deploy(regex.address);

  return [registry, regex];
}
