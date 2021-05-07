/* eslint-disable no-await-in-loop */

require('dotenv').config();
const axios = require('axios');

const { getEnvFromNodeEnv } = require('../../../environments');

const Oracle = artifacts.require('Oracle');

const baseURL = 'http://localhost:6688';

const getSessionCookie = async () => {
  const resp = await axios({
    method: 'post',
    url: `${baseURL}/sessions`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      email: 'test@stacktical.com',
      password: 'password',
    },
  });
  return resp.headers['set-cookie'];
};

const getAccounts = async () => {
  const sessionCookie = await getSessionCookie();
  const { data: { data } } = await axios({
    method: 'get',
    url: `${baseURL}/v2/user/balances`,
    headers: {
      Cookie: sessionCookie,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return data;
};

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

/**
 * @dev checks if the address inside chainlink/tempkeys has been stored
 * @returns {string|boolean}
 */
const updatedAddress = async () => {
  try {
    const addresses = await getAccounts();
    if (addresses.length === 0) return false;
    const { attributes: { address } } = addresses[0];
    return web3.utils.toChecksumAddress(address);
  } catch {
    return false;
  }
};

/*
 * @dev The scripts check if the address of the node was updated. Then, transfers
 * 1000 eth, to finally call setFulfillmentPermission
 */

module.exports = async (callback) => {
  try {
    const { oracleAddress, chainlinkNodeFunds, gas } = getEnvFromNodeEnv();
    let chainlinkNodeAddress = await updatedAddress();
    while (!chainlinkNodeAddress) {
      await wait(5000);
      console.log('Address fetch from Chainlink node failed, reattempting in 5 seconds');
      chainlinkNodeAddress = await updatedAddress();
    }
    console.log(`Chainlink Node Address: ${chainlinkNodeAddress}`);
    const [defaultAccount] = await web3.eth.getAccounts();
    let balance = await web3.eth.getBalance(chainlinkNodeAddress);
    if (web3.utils.fromWei(balance) <= chainlinkNodeFunds) {
      await web3.eth.sendTransaction({
        from: defaultAccount,
        to: chainlinkNodeAddress,
        value: web3.utils.toWei(chainlinkNodeFunds, 'ether'),
        gas,
      });
    }
    balance = await web3.eth.getBalance(chainlinkNodeAddress);
    console.log(
      `Chainlink Node balance: ${web3.utils.fromWei(balance)} ether`,
    );
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
