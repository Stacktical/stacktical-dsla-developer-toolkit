#! /bin/sh
export NODE_ENV=develop
truffle compile
docker-compose -f dev-env/docker-compose.develop.yaml -- down
rm -rf dev-env/postgres/develop/db dev-env/chainlink/tempkeys dev-env/chainlink/secret
docker-compose -f dev-env/docker-compose.develop.yaml -- up -d
truffle exec --network develop scripts/dev-env/chores/prepare-node.js
truffle exec --network develop scripts/dev-env/chores/post-bridge.js
truffle exec --network develop scripts/dev-env/chores/post-job.js
