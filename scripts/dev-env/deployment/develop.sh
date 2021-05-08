#! /bin/sh
export NODE_ENV=develop
truffle compile
docker-compose -f dev-env/chainlink/node-config/docker-compose.yaml -- down
rm -rf dev-env/postgres/develop/db dev-env/chainlink/tempkeys dev-env/chainlink/secret
npx hardhat deploy --network develop
docker-compose -f dev-env/chainlink/node-config/docker-compose.yaml -- up -d
truffle exec --network develop scripts/dev-env/chores/prepare-node.js
