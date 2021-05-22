import axios from 'axios';
import { ChainlinkNodeConfiguration } from './types';

const fs = require('fs');

const appRoot = require('app-root-path');
const dslaProtocolJsonPath = `${appRoot.path}/dev-env/dsla-protocol.json`;

let chainlinkNode: ChainlinkNodeConfiguration;
let cookie;

function setChainlinkNode(chainlinkNodeConfig: ChainlinkNodeConfiguration) {
  chainlinkNode = chainlinkNodeConfig;
}

const getChainlinkSessionCookie = async () => {
  const resp = await axios({
    method: 'post',
    url: `${chainlinkNode.restApiUrl}/sessions`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      email: chainlinkNode.email,
      password: chainlinkNode.password,
    },
  });
  cookie = resp.headers['set-cookie'];
  return cookie;
};

const getChainlinkAccounts = async () => {
  const sessionCookie = cookie || (await getChainlinkSessionCookie());
  const {
    data: { data },
  } = await axios({
    method: 'get',
    url: `${chainlinkNode.restApiUrl}/v2/keys/eth`,
    headers: {
      Cookie: sessionCookie,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return data;
};

const getChainlinkBridge = async () => {
  const sessionCookie = cookie || (await getChainlinkSessionCookie());
  const { data } = await axios({
    method: 'get',
    url: `${chainlinkNode.restApiUrl}/v2/bridge_types`,
    headers: {
      Cookie: sessionCookie,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  const jobJson = JSON.parse(fs.readFileSync(dslaProtocolJsonPath));
  return data.data.find(
    (bridge) => bridge.attributes.name === jobJson.tasks[0].type
  );
};

const getChainlinkJob = async () => {
  const sessionCookie = cookie || (await getChainlinkSessionCookie());
  const { data } = await axios({
    method: 'get',
    url: `${chainlinkNode.restApiUrl}/v2/specs`,
    headers: {
      Cookie: sessionCookie,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  const jobJson = JSON.parse(fs.readFileSync(dslaProtocolJsonPath));
  return data.data.find((job) =>
    job.attributes.tasks.some((task) => task.type === jobJson.tasks[0].type)
  );
};

const getChainlinkJobId = async () => {
  const sessionCookie = cookie || (await getChainlinkSessionCookie());
  const { data } = await axios({
    method: 'get',
    url: `${chainlinkNode.restApiUrl}/v2/specs`,
    headers: {
      Cookie: sessionCookie,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return `0x${data.data[0].id}`;
};

const postChainlinkJob = async () => {
  const sessionCookie = cookie || (await getChainlinkSessionCookie());
  const { data } = await axios({
    method: 'post',
    url: `${chainlinkNode.restApiUrl}/v2/specs`,
    headers: {
      Cookie: sessionCookie,
      'Content-Type': 'application/json',
    },
    // eslint-disable-next-line global-require,import/no-dynamic-require
    data: require(dslaProtocolJsonPath),
    withCredentials: true,
  });
  return data;
};

const getChainlinkLinkToken = async () => {
  const sessionCookie = cookie || (await getChainlinkSessionCookie());
  const {
    data: {
      data: {
        attributes: { LINK_CONTRACT_ADDRESS },
      },
    },
  } = await axios({
    method: 'get',
    url: `${chainlinkNode.restApiUrl}/v2/config`,
    headers: {
      Cookie: sessionCookie,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return LINK_CONTRACT_ADDRESS;
};

const postChainlinkBridge = async () => {
  const jobJson = JSON.parse(fs.readFileSync(dslaProtocolJsonPath));

  const sessionCookie = cookie || (await getChainlinkSessionCookie());
  const { data } = await axios({
    method: 'post',
    url: `${chainlinkNode.restApiUrl}/v2/bridge_types`,
    headers: {
      Cookie: sessionCookie,
      'Content-Type': 'application/json',
    },
    data: {
      name: jobJson.tasks[0].type,
      url: chainlinkNode.externalAdapterUrl,
    },
    withCredentials: true,
  });
  return data;
};

const deleteJob = async (jobId) => {
  const sessionCookie = cookie || (await getChainlinkSessionCookie());
  const { data } = await axios({
    method: 'delete',
    url: `${chainlinkNode.restApiUrl}/v2/specs/${jobId}`,
    headers: {
      Cookie: sessionCookie,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return data;
};

export {
  deleteJob,
  setChainlinkNode,
  postChainlinkJob,
  postChainlinkBridge,
  getChainlinkJob,
  getChainlinkJobId,
  getChainlinkBridge,
  getChainlinkAccounts,
  getChainlinkLinkToken,
  getChainlinkSessionCookie,
};
