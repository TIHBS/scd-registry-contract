import { Storage__factory } from "../typechain-types/factories/Storage__factory";
import { Storage } from "../typechain-types/Storage";
import { readFileSync } from "fs";
import { getOrCreateContract } from "./util";
import { formatEther, parseUnits } from "ethers/lib/utils";
import StorageArtifact from "../deployments/localhost/Storage.json";
import BaseApp from "./base-app";

export default class CostEstimation extends BaseApp {
  async run() {
    let storageContract = await getOrCreateContract<Storage, Storage__factory>(
      Storage__factory,
      this.wallet,
      StorageArtifact.address
    );

    const message = readFileSync("1kB.txt", "utf-8");
    const transaction = await storageContract.Set(message);
    const receipt = await transaction.wait();

    const gasUsed = receipt.gasUsed.toNumber();
    const gasPrice = parseUnits("1.0", "gwei").toNumber();
    const averageSCDSize = 8.279;

    const result = gasUsed * gasPrice * averageSCDSize;
    const formatted = formatEther(result);
    console.log("%s ETH", formatted);
  }
}
