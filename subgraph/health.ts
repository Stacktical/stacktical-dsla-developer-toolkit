const axios = require('axios');

const PLAYGROUND_URL = 'http://127.0.0.1:8030/graphql';

// INSERT YOUR OWN DEPLOYMENT ID
const DEPLOYMENT_ID = 'QmRCEgzg9i8sNwjM18zFXx4k6Uc9rc2fDj62bDk2wATxos';

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
