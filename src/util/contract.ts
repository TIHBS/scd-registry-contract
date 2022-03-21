import { BytesLike, Contract, ContractFactory, Wallet } from "ethers";
import { Registry } from "../types/Registry";

export type ConstructorParameter = string | number | Wallet | BytesLike;
export type Constructor<Type> = { new (...args: ConstructorParameter[]): Type };

export async function getOrCreateContract<Factory extends ContractFactory>(
  factoryConstructor: Constructor<Factory>,
  wallet: Wallet,
  address: string,
): Promise<Contract> {
  const factory = new factoryConstructor(wallet);
  const contractCode = await wallet.provider.getCode(address);

  let storageContract: Contract;
  if (contractCode == "0x") {
    storageContract = (await factory.deploy()) as Contract;
  } else {
    storageContract = (await factory.attach(address)) as Contract;
  }
  return storageContract;
}

export function outputToStruct(output: Registry.SCDMetadataStructOutput): Registry.SCDMetadataStruct {
  const struct: Registry.SCDMetadataStruct = {
    name: output.name,
    author: output.author,
    version: output.version,
    signature: output.signature,
    internalAddress: output.internalAddress,
    url: output.url,
    blockChainType: output.blockChainType,
    functions: output.functions,
    events: output.events,
  };
  return struct;
}
