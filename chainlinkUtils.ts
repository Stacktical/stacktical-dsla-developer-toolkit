import axios from 'axios';
import { ChainlinkNodeConfiguration } from './types';

const fs = require('fs');

const appRoot = require('app-root-path');
const dslaProtocolJsonPath = `${appRoot.path}/services/dsla-protocol.json`;

let cookies = {};

const getChainlinkSessionCookie = async (node: ChainlinkNodeConfiguration) => {
  if (cookies[node.name] !== undefined) return cookies[node.name];
  const resp = await axios({
    method: 'post',
    url: `${node.restApiUrl}${
      node.restApiPort ? ':' + node.restApiPort : undefined
    }/sessions`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      email: node.email,
      password: node.password,
    },
  });
  cookies[node.name] = resp.headers['set-cookie'];
  return cookies[node.name];
};

const getChainlinkAccounts = async (node: ChainlinkNodeConfiguration) => {
  const sessionCookie = await getChainlinkSessionCookie(node);
  const {
    data: { data },
  } = await axios({
    method: 'get',
    url: `${node.restApiUrl}${
      node.restApiPort ? ':' + node.restApiPort : undefined
    }/v2/keys/eth`,
    headers: {
      Cookie: sessionCookie,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return data;
};

const getChainlinkBridge = async (node: ChainlinkNodeConfiguration) => {
  const sessionCookie = await getChainlinkSessionCookie(node);
  const { data } = await axios({
    method: 'get',
    url: `${node.restApiUrl}${
      node.restApiPort ? ':' + node.restApiPort : undefined
    }/v2/bridge_types`,
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

const getChainlinkJob = async (node: ChainlinkNodeConfiguration) => {
  const sessionCookie = await getChainlinkSessionCookie(node);
  const { data } = await axios({
    method: 'get',
    url: `${node.restApiUrl}${
      node.restApiPort ? ':' + node.restApiPort : undefined
    }/v2/specs`,
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

const getChainlinkJobId = async (node: ChainlinkNodeConfiguration) => {
  const sessionCookie = await getChainlinkSessionCookie(node);
  const { data } = await axios({
    method: 'get',
    url: `${node.restApiUrl}${
      node.restApiPort ? ':' + node.restApiPort : undefined
    }/v2/specs`,
    headers: {
      Cookie: sessionCookie,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return `0x${data.data[0].id}`;
};

const postChainlinkJob = async (node: ChainlinkNodeConfiguration) => {
  const sessionCookie = await getChainlinkSessionCookie(node);
  const { data } = await axios({
    method: 'post',
    url: `${node.restApiUrl}${
      node.restApiPort ? ':' + node.restApiPort : undefined
    }/v2/specs`,
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

const getChainlinkLinkToken = async (node: ChainlinkNodeConfiguration) => {
  const sessionCookie = await getChainlinkSessionCookie(node);
  const {
    data: {
      data: {
        attributes: { LINK_CONTRACT_ADDRESS },
      },
    },
  } = await axios({
    method: 'get',
    url: `${node.restApiUrl}${
      node.restApiPort ? ':' + node.restApiPort : undefined
    }/v2/config`,
    headers: {
      Cookie: sessionCookie,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return LINK_CONTRACT_ADDRESS;
};

const postChainlinkBridge = async (node: ChainlinkNodeConfiguration) => {
  const jobJson = JSON.parse(fs.readFileSync(dslaProtocolJsonPath));

  const sessionCookie = await getChainlinkSessionCookie(node);
  const { data } = await axios({
    method: 'post',
    url: `${node.restApiUrl}${
      node.restApiPort ? ':' + node.restApiPort : undefined
    }/v2/bridge_types`,
    headers: {
      Cookie: sessionCookie,
      'Content-Type': 'application/json',
    },
    data: {
      name: jobJson.tasks[0].type,
      url: node.externalAdapterUrl,
    },
    withCredentials: true,
  });
  return data;
};

const deleteJob = async (node, jobId) => {
  const sessionCookie = await getChainlinkSessionCookie(node);
  const { data } = await axios({
    method: 'delete',
    url: `${node.restApiUrl}${
      node.restApiPort ? ':' + node.restApiPort : undefined
    }/v2/specs/${jobId}`,
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
  postChainlinkJob,
  postChainlinkBridge,
  getChainlinkJob,
  getChainlinkJobId,
  getChainlinkBridge,
  getChainlinkAccounts,
  getChainlinkLinkToken,
  getChainlinkSessionCookie,
};
