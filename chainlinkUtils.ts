import axios from 'axios';
import { ChainlinkNodeConfiguration } from './types';

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

const getChainlinkBridges = async (node: ChainlinkNodeConfiguration) => {
  const sessionCookie = await getChainlinkSessionCookie(node);
  const {
    data: { data },
  } = await axios({
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
  return data;
};

const getChainlinkJobs = async (node: ChainlinkNodeConfiguration) => {
  const sessionCookie = await getChainlinkSessionCookie(node);
  const {
    data: { data },
  } = await axios({
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
  return data;
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

const postChainlinkJob = async (
  node: ChainlinkNodeConfiguration,
  jobName,
  oracleContractAddress
) => {
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
    data: {
      initiators: [
        {
          type: 'RunLog',
          params: {
            address: oracleContractAddress,
          },
        },
      ],
      tasks: [
        {
          type: jobName,
        },
        {
          type: 'copy',
          params: {
            copyPath: ['result'],
          },
        },
        {
          type: 'ethtx',
        },
      ],
      minPayment: '10000000000',
    },
    withCredentials: true,
  });
  return data;
};

const postChainlinkBridge = async (
  node: ChainlinkNodeConfiguration,
  useCaseName,
  externalAdapterUrl
) => {
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
      name: useCaseName,
      url: externalAdapterUrl,
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
  getChainlinkJobs,
  getChainlinkJobId,
  getChainlinkBridges,
  getChainlinkAccounts,
  getChainlinkSessionCookie,
};
