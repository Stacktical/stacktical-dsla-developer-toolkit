module.exports = async ({ getNamedAccounts, deployments, network }) => {
  if (network.tags.LinkToken) {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    await deploy('LinkToken', {
      from: deployer,
      log: true,
    });
  }
};
module.exports.tags = ['LinkToken'];
