---
description: Environment variables.
---

# Environment variables

Although the repository includes a `env-example`file, the toolkit is not opinionated in the use of this same structure. In order to bootstrap the toolkit as-is, create a `.env` file into the root path of the toolkit folder.

### Minimum necessary to run a local environment

You have to set this `env` as minimum to run the local environment:

```text
DEVELOP_MNEMONIC=myth like bonus scare over problem client lizard pioneer submit female collect
IPFS_URI= URI to store data on a IPFS node
```

Please note that the`MAINNET_MNEMONIC`is an actual mnemonic. This is intentional, since the developer toolkit includes a `npm` script to run a `ganache-cli` instance with the `-d` option, whichs runs with the same mnemonic everytime, the one on the example. Since hardhat node is still not compatible with Chainlink yet, we stick to `ganache-cli`usage.

{% hint style="success" %}
We recommend you to use this [npm script](local-blockchain.md#npm-script) to run a customized `ganache-cli`instance, along with this mnemonic.
{% endhint %}

{% hint style="info" %}
Is not mandatory to use `ganache-cli`, as `develop`is just another network of the hardhat config. As long as the mnemonic has some funds, the rest of the toolkit should work.
{% endhint %}

### Not really necessary, but....

Hardhat checks the type of `hardhat.config.ts` so if any of these env variables is not present, it is not going to be initialized. However, they can be empty, like dummy texts.

```text
TESTNET_MNEMONIC= mnemonic for testnet deployments
MAINNET_MNEMONIC= mnemonic for develop networks deployments
INFURA_PROJECT_ID= used for infura deploymens
MUMBAI_URI= Polygon mumbai network http uri
MUMBAI_WS_URI= Polygon mumbai network websocket uri
POLYGON_URI= Polygon mainnet network http uri
POLYGON_WS_URI= Polygon mainnet network ws uri
HARMONYTESTNET_URI= Harmony testnet network http uri
HARMONYTESTNET_WS_URI= Harmony testnet network ws uri
```

### Minimal example env

```text
DEVELOP_MNEMONIC=myth like bonus scare over problem client lizard pioneer submit female collect
IPFS_URI=http://localhost:1234

MAINNET_MNEMONIC=hello
TESTNET_MNEMONIC=hello
INFURA_PROJECT_ID=hello
HARMONY_URI=http://localhost:1234
MUMBAI_URI=http://localhost:1234
MUMBAI_WS_URI=http://localhost:1234
POLYGON_URI=http://localhost:1234
POLYGON_WS_URI=http://localhost:1234
HARMONYTESTNET_URI=http://localhost:1234
HARMONYTESTNET_WS_URI=http://localhost:1234
```



