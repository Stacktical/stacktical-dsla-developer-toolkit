# Introduction

We defined DSLA as an open protocol, where anyone can create new use cases and deploy them to the underlying blockchain protocol, leveraging it to state clear rules from day 0 and earning rewards every time someone makes use of a new use case.

## About the Developper Toolkit (DTK)

A full documentation oabout the DTK is available [here](https://readme.stacktical.com/developer-guide/developer-toolkit-1/introduction).

### Requirements

- node (LTS Version)
- Docker

## Subgraph deployment

1. Copy the subgraph/deploy-subgraphs-example file into subgraph/deploy-subgraphs.sh file.
2. Fill the GRAPH_NODE endpoints with proper information (pointing to 8020 port of every portforwarded graph node)
3. Avoid deploying to already deployed graph nodes, since it will replace the current subgraph and it will start indexing again
4. npm run graph:deploy:production
5. When prompted, select a subgraph version. You can hit enter without problems, but it will replace the current subgraph.

## Quick start

```
nvm use
npm i

hh test
```

*Troubleshoot*

`sudo chown -R $(whoami): $(pwd)/services`

## Typechain Generation Steps
1. Run `hh clean` to clean up hardhat project
2. Disable task importing in `hardhat.config.ts`
```
import './stacktical.validation';
import './type-extensions';
// import './tasks';
```
3. Disable typechain imports in `/networks/develop.config.ts`
```
// import { EthereumERC20__factory } from '../typechain';
import { NetworkUserConfig } from 'hardhat/types';
import { scripts } from '../scripts.config';
```
4. Reset token settings of develop configs too.
```
export const develop: NetworkUserConfig = {
  ...
  stacktical: {
    ...
    addresses: {},
    tokens: [],
    // tokens: [
    //   {
    //     factory: EthereumERC20__factory,
    //     name: TOKEN_NAMES.DSLA,
    //   },
    //   {
    //     factory: EthereumERC20__factory,
    //     name: TOKEN_NAMES.DAI,
    //   },
    //   {
    //     factory: EthereumERC20__factory,
    //     name: TOKEN_NAMES.USDC,
    //   },
    //   {
    //     factory: EthereumERC20__factory,
    //     name: TOKEN_NAMES.USDT,
    //   },
    //   {
    //     factory: EthereumERC20__factory,
    //     name: TOKEN_NAMES.WETH,
    //   },
    // ],
```
5. Run `hh compile --force` to generate typechains