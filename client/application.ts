import RegistryArtifact from "../deployments/hardhat-network/Registry.json";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Wallet } from "ethers";
import { Registry__factory } from "../typechain-types/factories/Registry__factory";
import { Registry } from "../typechain-types/Registry";
import TestWallets from "../test/TestWallets";

export default class App {
  private wallet: Wallet;

  constructor() {
    let privateKey = TestWallets[0].privateKey;
    const url = "http://localhost:8545";

    const provider = new JsonRpcProvider(url);
    this.wallet = new Wallet(privateKey, provider);
  }

  async run() {
    const registryFactory = new Registry__factory(this.wallet);

    const contractCode = await this.wallet.provider.getCode(
      RegistryArtifact.address
    );

    let registryContract: Registry;
    if (contractCode == "0x") {
      registryContract = await registryFactory.deploy();
    } else {
      registryContract = await registryFactory.attach(RegistryArtifact.address);
    }

    const result1 = await registryContract.Get();
    console.log(result1);

    const message = "test";
    await registryContract.Set(message);

    const result2 = await registryContract.Get();
    console.log(result2);
  }
}
