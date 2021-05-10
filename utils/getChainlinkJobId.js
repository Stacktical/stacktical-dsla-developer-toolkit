import axios from 'axios';
import getChainlinkNodeUrl from './getChainlinkNodeUrl';
import getChainlinkSessionCookie from './getChainlinkSessionCookie';

const url = getChainlinkNodeUrl();

const getChainlinkJobId = async () => {
  const sessionCookie = await getChainlinkSessionCookie();
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

export default getChainlinkJobId;
