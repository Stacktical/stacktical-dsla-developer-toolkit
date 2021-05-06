#! /bin/sh
export NODE_ENV=harmonytestnet
docker-compose -f docker-compose.harmonytestnet.yaml -- down
rm -rf postgres/harmonytestnet/db chainlink/tempkeys chainlink/secret
docker-compose -f docker-compose.harmonytestnet.yaml -- up -d --force-recreate
truffle exec --network harmonytestnet scripts/prepare-node.js
truffle exec --network harmonytestnet scripts/post-bridge.js
truffle exec --network harmonytestnet scripts/post-job.js
