#!/bin/bash
export NODE_ENV=develop

npx prettier --write 'contracts/**/*.sol'

truffle deploy --reset --network develop
sh scripts/dsla-protocol/chores/export-data.sh

truffle exec --network develop scripts/dsla-protocol/bootstrap/develop.js
truffle exec --network develop scripts/dsla-protocol/chores/mint-tokens.js
truffle exec --network develop scripts/dsla-protocol/chores/deploy-sla.js
truffle exec --network develop scripts/dsla-protocol/chores/request-analytics.js
truffle exec --network develop scripts/dsla-protocol/chores/request-sli.js
