import { BaseContract, ContractFactory, Wallet } from "ethers";

export type Constructor<Type> = { new (...args: any | any[]): Type };

export async function getOrCreateContract<
  Contract extends BaseContract,
  Factory extends ContractFactory
>(
  factoryConstructor: Constructor<Factory>,
  wallet: Wallet,
  address: string
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
