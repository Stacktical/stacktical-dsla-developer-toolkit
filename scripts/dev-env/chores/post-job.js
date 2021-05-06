const clUtils = require('./cl-utils');

module.exports = async (callback) => {
  try {
    console.log('Creating staking efficiency job on Chainlink node...');
    // eslint-disable-next-line global-require
    const filePath = `../../../dev-env/dsla-protocol.${process.env.NODE_ENV}.json`;
    const httpRequestJobRes = await clUtils.postJob(
      // eslint-disable-next-line import/no-dynamic-require,global-require
      require(filePath),
    );
    console.log(`Job created! Job ID: ${httpRequestJobRes.data.id}.`);
    callback(null);
  } catch (error) {
    callback(error);
  }
};
