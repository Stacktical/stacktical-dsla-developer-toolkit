const axios = require('axios');

require('dotenv').config();

const baseURL = 'http://localhost:6688';
const getSessionCookie = async () => {
  const resp = await axios({
    method: 'post',
    url: `${baseURL}/sessions`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      email: 'test@stacktical.com',
      password: 'password',
    },
  });
  return resp.headers['set-cookie'];
};

module.exports = async (callback) => {
  try {
    const sessionCookie = await getSessionCookie();
    console.log('Creating getsli bridge on Chainlink node...');
    const { data } = await axios({
      method: 'post',
      url: `${baseURL}/v2/bridge_types`,
      headers: {
        Cookie: sessionCookie,
        'Content-Type': 'application/json',
      },
      data: {
        name: 'dsla-protocol',
        url: 'http://host.docker.internal:8080',
      },
      withCredentials: true,
    });
    console.log(`${data.data.id} bridge successfully created...`);
    callback(null);
  } catch (error) {
    callback(error);
  }
};
