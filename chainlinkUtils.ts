import axios from 'axios';

const fs = require('fs');

const appRoot = require('app-root-path');
const dslaProtocolJsonPath = `${appRoot.path}/dev-env/dsla-protocol.json`;

let chainlinkEnv;
let url;
let cookie;

function setChainlinkEnv(env) {
  chainlinkEnv = env;
  url =
    (chainlinkEnv.productionChainlinkNode &&
      chainlinkEnv.productionChainlinkNode.url) ||
    process.env.LOCAL_CHAINLINK_URL ||
    'http://localhost:6688';
}

const getChainlinkSessionCookie = async () => {
  const resp = await axios({
    method: 'post',
    url: `${url}/sessions`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      email:
        (chainlinkEnv.productionChainlinkNode &&
          chainlinkEnv.productionChainlinkNode.email) ||
        'test@stacktical.com',
      password:
        (chainlinkEnv.productionChainlinkNode &&
          chainlinkEnv.productionChainlinkNode.password) ||
        'PaSSword123456',
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
    url: `${url}/v2/keys/eth`,
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
    url: `${url}/v2/bridge_types`,
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
    url: `${url}/v2/specs`,
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
    url: `${url}/v2/specs`,
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
    url: `${url}/v2/specs`,
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
    url: `${url}/v2/config`,
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
    url: `${url}/v2/bridge_types`,
    headers: {
      Cookie: sessionCookie,
      'Content-Type': 'application/json',
    },
    data: {
      name: jobJson.tasks[0].type,
      url:
        (chainlinkEnv.productionChainlinkNode &&
          chainlinkEnv.productionChainlinkNode.externalAdapterUrL) ||
        'http://host.docker.internal:6060',
    },
    withCredentials: true,
  });
  return data;
};

const deleteJob = async (jobId) => {
  const sessionCookie = cookie || (await getChainlinkSessionCookie());
  const { data } = await axios({
    method: 'delete',
    url: `${url}/v2/specs/${jobId}`,
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
  setChainlinkEnv,
  postChainlinkJob,
  postChainlinkBridge,
  getChainlinkJob,
  getChainlinkJobId,
  getChainlinkBridge,
  getChainlinkAccounts,
  getChainlinkLinkToken,
  getChainlinkSessionCookie,
};
