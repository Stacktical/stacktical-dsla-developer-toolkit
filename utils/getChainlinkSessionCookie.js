import axios from 'axios';
import { getEnvFromNodeEnv } from '../environments';
import getChainlinkNodeUrl from './getChainlinkNodeUrl';

const url = getChainlinkNodeUrl();
const env = getEnvFromNodeEnv();

const getChainlinkSessionCookie = async () => {
  const resp = await axios({
    method: 'post',
    url: `${url}/sessions`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      email: (env.productionChainlinkNode && env.productionChainlinkNode.email) || 'test@stacktical.com',
      password: (env.productionChainlinkNode && env.productionChainlinkNode.password) || 'password',
    },
  });
  return resp.headers['set-cookie'];
};

export default getChainlinkSessionCookie;
