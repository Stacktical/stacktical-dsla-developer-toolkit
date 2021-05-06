#! /bin/sh
export NODE_ENV=develop
docker-compose -f docker-compose.develop.yaml -- down
rm -rf postgres/develop/db chainlink/tempkeys chainlink/secret
docker-compose -f docker-compose.develop.yaml -- up -d
truffle deploy --reset --network develop
truffle exec --network develop scripts/prepare-node.js
truffle exec --network develop scripts/post-bridge.js
truffle exec --network develop scripts/post-job.js
