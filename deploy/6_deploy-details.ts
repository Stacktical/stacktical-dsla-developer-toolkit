import { CONTRACT_NAMES, DEPLOYMENT_TAGS } from '../constants';

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  await deploy(CONTRACT_NAMES.Details, {
    from: deployer,
    log: true,
  });
};
module.exports.tags = [DEPLOYMENT_TAGS.DSLA, DEPLOYMENT_TAGS.Details];
