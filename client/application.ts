import { getOrCreateContract } from "./util";
import RegistryArtifact from "../deployments/localhost/Registry.json";
import { Registry__factory } from "../typechain-types/factories/Registry__factory";
import { Registry } from "../typechain-types/Registry";
import BaseApp from "./base-app";

export default class App extends BaseApp {
  async run() {
    let registryContract = await getOrCreateContract<
      Registry,
      Registry__factory
    >(Registry__factory, this.wallet, RegistryArtifact.address);

    const result1 = await registryContract.Get();
    console.log(result1);

    const message = "test";
    await registryContract.Set(message);

    const result2 = await registryContract.Get();
    console.log(result2);
  }
}
