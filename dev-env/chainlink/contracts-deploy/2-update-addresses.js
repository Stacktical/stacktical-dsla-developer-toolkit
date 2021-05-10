// eslint-disable-next-line import/no-extraneous-dependencies
const { DataFile } = require('edit-config');
const appRoot = require('app-root-path');
const fs = require('fs');
const yaml = require('js-yaml');

module.exports = async ({ deployments, network }) => {
  const { get } = deployments;
  const oracle = await get('Oracle');
  const linkToken = await get('LinkToken');

  const jobSpec = await DataFile.load(`${appRoot.path}/dev-env/chainlink/node-config/dsla-protocol.json`);
  jobSpec.set('initiators', [
    {
      type: 'RunLog',
      params: { address: oracle.address },
    },
  ]);

  await jobSpec.save();
  jobSpec.set(`environments${network.name}`, [
    {
      type: 'RunLog',
      params: { address: oracle.address },
    },
  ]);
  await jobSpec.save();

  const dockerComposePath = `${appRoot.path}/dev-env/chainlink/node-config/docker-compose.yaml`;
  const fileContents = fs.readFileSync(dockerComposePath, 'utf8');
  const data = yaml.load(fileContents);
  data.services.chainlink.environment = data.services.chainlink.environment.map((envVariable) => {
    switch (true) {
      case /LINK_CONTRACT_ADDRESS/.test(envVariable):
        return `LINK_CONTRACT_ADDRESS=${linkToken.address}`;
      default:
        return envVariable;
    }
  });
  const yamlStr = yaml.dump(data);
  fs.writeFileSync(dockerComposePath, yamlStr, 'utf8');
};

module.exports.tags = ['Oracle'];
