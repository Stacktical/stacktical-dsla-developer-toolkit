const axios = require('axios');

const PLAYGROUND_URL = 'http://127.0.0.1:8030/graphql';

// INSERT YOUR OWN DEPLOYMENT ID
const DEPLOYMENT_ID = 'QmZ4eyqsnE63QC61thHQHEDKEomVzZ6NjPkep6sKz7rs9x';

axios({
  url: PLAYGROUND_URL,
  method: 'post',
  data: {
    query: `{
      indexingStatuses(subgraphs: ["${DEPLOYMENT_ID}"]) {
        synced
        health
        fatalError {
          message
          block {
            number
            hash
          }
          handler
        }
        chains {
          chainHeadBlock {
            number
          }
          latestBlock {
            number
          }
        }
      }
    }`,
  },
}).then((result) => {
  console.log(JSON.stringify(result.data));
});
