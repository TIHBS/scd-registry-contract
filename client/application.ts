import RegistryDeployment from "../deployments/hardhatContainer/Registry.json";
import { Provider } from "@ethersproject/abstract-provider";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Wallet } from "ethers";
import { Registry__factory } from "../typechain-types/factories/Registry__factory";

export default class App {
  private wallet: Wallet;
  private provider: Provider;

  constructor() {
    let privateKey =
      "0x534af078a10af8335f6fbab8bfbd9bb13ed30fbb31f73f31c2070cfc5a4ad666";
    const url = "http://localhost:8545";

    this.provider = new JsonRpcProvider(url);
    this.wallet = new Wallet(privateKey, this.provider);
  }

  async run(message: string) {
    const registryContract = Registry__factory.connect(
      RegistryDeployment.address,
      this.wallet
    );

    let result_Get = await registryContract.Get();
    console.log(result_Get);
    const result_Set = await registryContract.Set(message);
    console.log(result_Set);
    result_Get = await registryContract.Get();
    console.log(result_Get);
  }
}
