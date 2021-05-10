/* eslint-disable no-await-in-loop */

require('dotenv').config();
const appRoot = require('app-root-path');
const fs = require('fs');

const {
  getChainlinkAccounts,
  getChainlinkJob,
  getChainlinkBridge,
  postChainlinkJob,
  postChainlinkBridge,
} = require('../../../utils');
const { getEnvFromNodeEnv } = require('../../../environments');

const Oracle = artifacts.require('Oracle');

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

const updatedBridge = async () => {
  try {
    const postedBridge = await getChainlinkBridge();
    if (postedBridge) return postedBridge;
    const filePath = `${appRoot.path}/dev-env/chainlink/node-config/dsla-protocol.json`;
    const jobJson = JSON.parse(fs.readFileSync(filePath));
    const httpRequestJobRes = await postChainlinkBridge(jobJson.tasks[0].type);
    return httpRequestJobRes.data;
  } catch (error) {
    return false;
  }
};

const updatedJob = async () => {
  try {
    const postedJob = await getChainlinkJob();
    if (postedJob) return postedJob;
    const filePath = `${appRoot.path}/dev-env/chainlink/node-config/dsla-protocol.json`;
    const httpRequestJobRes = await postChainlinkJob(
      // eslint-disable-next-line import/no-dynamic-require,global-require
      require(filePath),
    );
    return httpRequestJobRes.data;
  } catch (error) {
    return false;
  }
};

const updatedAddress = async () => {
  try {
    const addresses = await getChainlinkAccounts();
    if (addresses.length === 0) return false;
    const { attributes: { address } } = addresses[0];
    return web3.utils.toChecksumAddress(address);
  } catch (error) {
    return false;
  }
};

module.exports = async (callback) => {
  try {
    // Create bridge
    console.log('Creating dsla-protocol bridge in Chainlink node...');
    let bridge = await updatedBridge();
    while (!bridge) {
      // eslint-disable-next-line no-await-in-loop
      await wait(5000);
      console.log('Bridge creation in Chainlink node failed, reattempting in 5 seconds');
      // eslint-disable-next-line no-await-in-loop
      bridge = await updatedBridge();
    }
    console.log(`Bridge created! Bridge ID: ${bridge.id}.`);

    // Create job
    console.log('Creating staking efficiency job on Chainlink node...');
    // eslint-disable-next-line global-require
    let job = await updatedJob();
    while (!job) {
      // eslint-disable-next-line no-await-in-loop
      await wait(5000);
      console.log('Job creation in Chainlink node failed, reattempting in 5 seconds');
      // eslint-disable-next-line no-await-in-loop
      job = await updatedJob();
    }
    console.log(`Job created! Job ID: ${job.id}.`);

    // Fund node
    let chainlinkNodeAddress = await updatedAddress();
    while (!chainlinkNodeAddress) {
      await wait(5000);
      console.log('Address fetch from Chainlink node failed, reattempting in 5 seconds');
      chainlinkNodeAddress = await updatedAddress();
    }
    console.log(`Chainlink Node Address: ${chainlinkNodeAddress}`);
    const { productionChainlinkNode, developChainlinkNode } = getEnvFromNodeEnv();
    const { funds, gasLimit } = productionChainlinkNode || developChainlinkNode;
    const [defaultAccount] = await web3.eth.getAccounts();
    let balance = await web3.eth.getBalance(chainlinkNodeAddress);
    if (web3.utils.fromWei(balance) <= funds) {
      await web3.eth.sendTransaction({
        from: defaultAccount,
        to: chainlinkNodeAddress,
        value: web3.utils.toWei(funds, 'ether'),
        gas: gasLimit,
      });
    }
    balance = await web3.eth.getBalance(chainlinkNodeAddress);
    console.log(
      `Chainlink Node balance: ${web3.utils.fromWei(balance)} ether`,
    );

    // Authorize node
    const oracleAddress = job.attributes.initiators[0].params.address;
    const oracle = await Oracle.at(oracleAddress);
    await oracle.setFulfillmentPermission(chainlinkNodeAddress, true);
    const permissions = await oracle.getAuthorizationStatus.call(
      chainlinkNodeAddress,
    );
    console.log(`Chainlink Node Fullfillment permissions: ${permissions}`);
    callback();
  } catch (error) {
    callback(error);
  }
};
