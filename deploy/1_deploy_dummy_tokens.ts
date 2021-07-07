import { DeployOptionsBase } from 'hardhat-deploy/dist/types';
import { DEPLOYMENT_TAGS } from '../constants';
import { StackticalConfiguration } from '../types';

module.exports = async ({ getNamedAccounts, deployments, network }) => {
  const { stacktical }: { stacktical: StackticalConfiguration } =
    network.config;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;
  for (let token of stacktical.tokens) {
    const options: DeployOptionsBase = {
      from: deployer,
      log: true,
      skipIfAlreadyDeployed: true,
      contract: token.factory.name.split('__')[0],
      args: [token.name, token.name],
    };
    await deploy(token.name, options);
  }
};

module.exports.tags = [DEPLOYMENT_TAGS.DummyTokens];
