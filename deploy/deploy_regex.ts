import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, get } = deployments;

  const { deployer } = await getNamedAccounts();

  const findLibrary = await get("FindLibrary");
  const queryRegex = await get("QueryRegex");
  const util = await get("Util");

  await deploy("Regex", {
    args: [util.address],
    libraries: { QueryRegex: queryRegex.address, FindLibrary: findLibrary.address },
    from: deployer,
    log: true,
  });
};
export default func;
func.tags = ["Regex"];
func.dependencies = ["FindLibrary", "QueryRegex", "Util"];
