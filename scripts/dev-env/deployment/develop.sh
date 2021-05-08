#! /bin/sh
export NODE_ENV=develop
truffle compile
docker-compose -f dev-env/docker-compose.develop.yaml -- down
rm -rf dev-env/postgres/develop/db dev-env/chainlink/tempkeys dev-env/chainli.nk/secret
npx hardhat deploy --network develop --reset
docker-compose -f dev-env/docker-compose.develop.yaml -- up -d
truffle exec --network develop scripts/dev-env/chores/prepare-node.js
