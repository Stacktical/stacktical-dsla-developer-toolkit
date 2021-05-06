const { LinkToken } = require('@chainlink/contracts/truffle/v0.4/LinkToken');

const Oracle = artifacts.require('Oracle');

// Oracle remix gist-> https://remix.ethereum.org/#gist=03a079b9055f42d993d0066d6f454c6f&optimize=true&version=soljson-v0.4.24+commit.e67f0147.js&runs=200&evmVersion=null
module.exports = async (deployer, network, [defaultAccount]) => {
  LinkToken.setProvider(deployer.provider);
  Oracle.setProvider(deployer.provider);
  try {
    await deployer.deploy(LinkToken, { from: defaultAccount });
    await deployer.deploy(Oracle, LinkToken.address, {
      from: defaultAccount,
    });
  } catch (err) {
    console.error(err);
  }
};
