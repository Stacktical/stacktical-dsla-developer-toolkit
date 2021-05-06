const axios = require('axios');

const baseURL = 'http://localhost:6688';

let cookie;

async function getSessionCookie() {
  if (cookie) {
    return Promise.resolve(cookie);
  }
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
  cookie = resp.headers['set-cookie'];
  return cookie;
}

async function postJob(job) {
  const sessionCookie = await getSessionCookie();
  const { data } = await axios({
    method: 'post',
    url: `${baseURL}/v2/specs`,
    headers: {
      Cookie: sessionCookie,
      'Content-Type': 'application/json',
    },
    data: job,
    withCredentials: true,
  });
  return data;
}

module.exports = {
  postJob,
};
