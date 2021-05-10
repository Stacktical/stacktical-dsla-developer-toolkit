import { getEnvFromNodeEnv } from '../environments';
import getChainlinkNodeUrl from './getChainlinkNodeUrl';
import getChainlinkSessionCookie from './getChainlinkSessionCookie';

const axios = require('axios');

const url = getChainlinkNodeUrl();
const env = getEnvFromNodeEnv();

const postChainlinkJob = async (jobName) => {
  const sessionCookie = await getChainlinkSessionCookie();
  const { data } = await axios({
    method: 'post',
    url: `${url}/v2/bridge_types`,
    headers: {
      Cookie: sessionCookie,
      'Content-Type': 'application/json',
    },
    data: {
      name: jobName,
      url: (env.productionChainlinkNode && env.productionChainlinkNode.externalAdapterUrL)
          || 'http://host.docker.internal:6060',
    },
    withCredentials: true,
  });
  return data;
};

export default postChainlinkJob;
