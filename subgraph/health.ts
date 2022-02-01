import axios from 'axios';
const URL = 'http://localhost:8030/graphql/playground';

axios({
  url: URL,
  method: 'post',
  data: {
    query: `
    indexingStatusForCurrentVersion(subgraphName: "org/subgraph") {
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
      `,
  },
}).then((result) => {
  console.log(result.data);
});
