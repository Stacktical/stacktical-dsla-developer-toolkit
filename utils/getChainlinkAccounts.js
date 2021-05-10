import axios from 'axios';
import getChainlinkNodeUrl from './getChainlinkNodeUrl';
import getChainlinkSessionCookie from './getChainlinkSessionCookie';

const url = getChainlinkNodeUrl();

const getChainlinkAccounts = async () => {
  const sessionCookie = await getChainlinkSessionCookie();
  const { data: { data } } = await axios({
    method: 'get',
    url: `${url}/v2/user/balances`,
    headers: {
      Cookie: sessionCookie,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return data;
};

export default getChainlinkAccounts;
