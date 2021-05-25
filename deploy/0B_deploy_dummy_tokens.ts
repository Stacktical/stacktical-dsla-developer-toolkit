import { DeployOptionsBase } from 'hardhat-deploy/dist/types';
import { CONTRACT_NAMES, DEPLOYMENT_TAGS } from '../constants';

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;
  const baseOptions: DeployOptionsBase = {
    from: deployer,
    log: true,
    skipIfAlreadyDeployed: true,
  };
  await deploy(CONTRACT_NAMES.DSLA, baseOptions);
  await deploy(CONTRACT_NAMES.DAI, baseOptions);
  await deploy(CONTRACT_NAMES.USDC, baseOptions);
};

module.exports.tags = [DEPLOYMENT_TAGS.DSLA];
