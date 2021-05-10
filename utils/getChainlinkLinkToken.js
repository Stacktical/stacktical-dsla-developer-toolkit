import axios from 'axios';
import getChainlinkNodeUrl from './getChainlinkNodeUrl';
import getChainlinkSessionCookie from './getChainlinkSessionCookie';

const url = getChainlinkNodeUrl();

const getChainlinkLinkToken = async () => {
  const sessionCookie = await getChainlinkSessionCookie();
  const { data: { data: { attributes: { linkContractAddress } } } } = await axios({
    method: 'get',
    url: `${url}/v2/config`,
    headers: {
      Cookie: sessionCookie,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return linkContractAddress;
};

export default getChainlinkLinkToken;
