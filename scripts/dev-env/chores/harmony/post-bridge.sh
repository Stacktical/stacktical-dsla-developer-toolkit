#!/usr/bin/env sh
export NODE_ENV=harmonytestnet
truffle exec --network harmonytestnet scripts/post-bridge.js
