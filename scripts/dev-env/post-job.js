const clUtils = require('./cl-utils');

module.exports = async (callback) => {
  try {
    console.log('Creating staking efficiency job on Chainlink node...');
    // eslint-disable-next-line global-require
    const filePath = `../dsla-protocol.${process.env.NODE_ENV}.json`;
    const httpRequestJobRes = await clUtils.postJob(
      require(filePath),
    );
    console.log(`Job created! Job ID: ${httpRequestJobRes.data.id}.`);
    callback(null);
  } catch (error) {
    callback(error);
  }
};
