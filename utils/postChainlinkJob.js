import getChainlinkNodeUrl from './getChainlinkNodeUrl';
import getChainlinkSessionCookie from './getChainlinkSessionCookie';

const axios = require('axios');

const url = getChainlinkNodeUrl();

const postChainlinkJob = async (job) => {
  const sessionCookie = await getChainlinkSessionCookie();
  const { data } = await axios({
    method: 'post',
    url: `${url}/v2/specs`,
    headers: {
      Cookie: sessionCookie,
      'Content-Type': 'application/json',
    },
    data: job,
    withCredentials: true,
  });
  return data;
};

export default postChainlinkJob;
