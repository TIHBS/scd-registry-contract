import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, get } = deployments;

  const { deployer } = await getNamedAccounts();
  const regex = await get("Regex");

  const registry = await deploy("Registry", { args: [regex.address], from: deployer, log: true });
  console.log(`DEPLOYED REGISTRY CONTRACT AT: ${registry.address}`);
};
export default func;
func.tags = ["Registry"];
func.dependencies = ["Regex"];
