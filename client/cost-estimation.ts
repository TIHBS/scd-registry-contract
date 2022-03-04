import { Storage__factory } from "../typechain-types/factories/Storage__factory";
import { Storage } from "../typechain-types/Storage";
import { readFileSync } from "fs";
import { fetchETHExchangeRate, getOrCreateContract } from "./util";
import { formatEther, parseUnits } from "ethers/lib/utils";
import StorageArtifact from "../deployments/localhost/Storage.json";
import BaseApp from "./base-app";

export default class CostEstimation extends BaseApp {
  static fileName: string = "1kB.txt";

  async run() {
    let storageContract = await getOrCreateContract<Storage, Storage__factory>(
      Storage__factory,
      this.wallet,
      StorageArtifact.address
    );

    const message = readFileSync(CostEstimation.fileName, "utf-8");
    const transaction = await storageContract.Set(message);
    const receipt = await transaction.wait();

    const gasUsed = receipt.gasUsed.toBigInt();
    const gasPrice = parseUnits("85", "gwei").toBigInt();

    const result = gasUsed * gasPrice;
    const resultInEther = formatEther(result);

    const exchangeRate = await fetchETHExchangeRate("EUR");
    const inFiat = Number.parseFloat(resultInEther) * exchangeRate;

    console.log(
      "Cost of storing %s in a solidity mapping.",
      CostEstimation.fileName
    );
    console.log("Gas used: %s", gasUsed.toString());
    console.log("Gas price: %s Wei", gasPrice.toString());
    console.log("Exchange rate %d€", exchangeRate);
    console.log(
      "%s * %s = %s ETH",
      gasUsed.toString(),
      gasPrice.toString(),
      resultInEther
    );
    console.log("%s ETH * %d€ = %s€", resultInEther, exchangeRate, inFiat);
  }
}
