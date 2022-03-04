import { Wallet } from "ethers";
import { JsonRpcProvider } from "@ethersproject/providers";
import TestWallets from "../test/TestWallets";

export default abstract class BaseApp {
  protected wallet: Wallet;

  constructor() {
    let privateKey = TestWallets[0].privateKey;
    const url = "http://127.0.0.1:8545";

    const provider = new JsonRpcProvider(url);
    this.wallet = new Wallet(privateKey, provider);
  }
  abstract run(): any;
}
