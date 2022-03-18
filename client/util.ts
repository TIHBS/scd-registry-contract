import { Contract, ContractFactory, Wallet } from "ethers";
import fetch from "node-fetch";

export type Constructor<Type> = { new (...args: any | any[]): Type };

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

export async function fetchETHExchangeRate(currency: string): Promise<number> {
  const response = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=${currency}`);
  const responseJson = await response.json();
  return responseJson[currency];
}

export function round(num: number, roundToDigits: number = 2): number {
  const multiplicationFactor = 10 ** roundToDigits;
  return Math.round(num * multiplicationFactor) / multiplicationFactor;
}
