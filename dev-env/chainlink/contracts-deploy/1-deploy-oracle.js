module.exports = async ({ getNamedAccounts, deployments, network }) => {
  if (network.tags.Oracle) {
    const { deploy, get } = deployments;
    const { deployer } = await getNamedAccounts();
    const linkToken = await get('LinkToken');
    await deploy('Oracle', {
      from: deployer,
      args: [linkToken.address],
      log: true,
    });
  }
};

module.exports.tags = ['Oracle'];
