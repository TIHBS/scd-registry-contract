import { getOrCreateContract } from "./util";
import { Registry__factory } from "../typechain/factories/Registry__factory";
import { Registry } from "../typechain/Registry";
import BaseApp from "./base-app";
import RegistryArtifact from "../deployments/localhost/Registry.json";

export default class App extends BaseApp {
  async run() {
    let registryContract = (await getOrCreateContract(
      Registry__factory,
      this.wallet,
      RegistryArtifact.address,
    )) as Registry;

    const result1 = await registryContract.Get();
    console.log(result1);

    const message = "test";
    await registryContract.Set(message);

    const result2 = await registryContract.Get();
    console.log(result2);
  }
}
