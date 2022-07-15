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
  jobName: any,
  oracleContractAddress: string
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
          type: 'EthUint256',
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

const postChainlinkJobv2 = async (
  node: ChainlinkNodeConfiguration,
  jobName: any,
  oracleContractAddress: string
) => {
  const sessionCookie = await getChainlinkSessionCookie(node);
  const { data } = await axios({
    method: 'post',
    url: `${node.restApiUrl}${
      node.restApiPort ? ':' + node.restApiPort : undefined
    }/v2/jobs`,
    headers: {
      Cookie: sessionCookie,
      'Content-Type': 'application/json',
    },
    // eslint-disable-next-line global-require,import/no-dynamic-require
    data: "{\"toml\":\"type                = \\\"directrequest\\\"\\nschemaVersion       = 1\\nname                = \\\"${jobName}\\\"\\ncontractAddress     = \\\"${oracleContractAddress}\\\"\\n\\nobservationSource   = \\\"\\\"\\\"\\n    decode_log   [type=\\\"ethabidecodelog\\\"\\n                  abi=\\\"OracleRequest(bytes32 indexed specId, address requester, bytes32 requestId, uint256 payment, address callbackAddr, bytes4 callbackFunctionId, uint256 cancelExpiration, uint256 dataVersion, bytes data)\\\"\\n                  data=\\\"$(jobRun.logData)\\\"\\n                  topics=\\\"$(jobRun.logTopics)\\\"]\\n\\n    fetch       [type=\\\"bridge\\\" name=\\\"staking-efficiency\\\"]\\n    encode_data [type=\\\"ethabiencode\\\" abi=\\\"(uint256 value)\\\" data=\\\"{ \\\\\\\\\\\"value\\\\\\\\\\\": $(fetch) }\\\"]\\n    encode_tx   [type=\\\"ethabiencode\\\"\\n                 abi=\\\"fulfillOracleRequest(bytes32 requestId, uint256 payment, address callbackAddress, bytes4 callbackFunctionId, uint256 expiration, bytes32 data)\\\"\\n                 data=\\\"{\\\\\\\\\\\"requestId\\\\\\\\\\\": $(decode_log.requestId), \\\\\\\\\\\"payment\\\\\\\\\\\": $(decode_log.payment), \\\\\\\\\\\"callbackAddress\\\\\\\\\\\": $(decode_log.callbackAddr), \\\\\\\\\\\"callbackFunctionId\\\\\\\\\\\": $(decode_log.callbackFunctionId), \\\\\\\\\\\"expiration\\\\\\\\\\\": $(decode_log.cancelExpiration), \\\\\\\\\\\"data\\\\\\\\\\\": $(encode_data)}\\\"\\n                 ]\\n    submit_tx [type=\\\"ethtx\\\" to=\\\"${oracleContractAddress}\\\" data=\\\"$(encode_tx)\\\"]\\n\\n    decode_log -> fetch -> encode_data -> encode_tx -> submit_tx\\n\\\"\\\"\\\"\"}",
    withCredentials: true,
  });
  return data;
};

const postChainlinkBridge = async (
  node: ChainlinkNodeConfiguration,
  useCaseName: string,
  externalAdapterUrl: string
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

const deleteJob = async (node: ChainlinkNodeConfiguration, jobId: string) => {
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
  postChainlinkJobv2,
  postChainlinkBridge,
  getChainlinkJobs,
  getChainlinkJobId,
  getChainlinkBridges,
  getChainlinkAccounts,
  getChainlinkSessionCookie,
};
