import { CONTRACT_NAMES, DEPLOYMENT_TAGS } from '../constants';

module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy(CONTRACT_NAMES.LinkToken, {
    from: deployer,
    log: true,
  });
  const linkToken = await get(CONTRACT_NAMES.LinkToken);
  await deploy(CONTRACT_NAMES.Oracle, {
    from: deployer,
    args: [linkToken.address],
    log: true,
  });
};
module.exports.tags = [DEPLOYMENT_TAGS.Chainlink];
