import axios from 'axios';
import getChainlinkNodeUrl from './getChainlinkNodeUrl';
import getChainlinkSessionCookie from './getChainlinkSessionCookie';

const appRoot = require('app-root-path');
const fs = require('fs');

const url = getChainlinkNodeUrl();

const getChainlinkJob = async () => {
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
  const filePath = `${appRoot.path}/dev-env/chainlink/node-config/dsla-protocol.json`;
  const jobJson = JSON.parse(fs.readFileSync(filePath));
  return data.data.find(
    (job) => job.attributes.tasks.some((task) => task.type === jobJson.tasks[0].type),
  );
};

export default getChainlinkJob;
