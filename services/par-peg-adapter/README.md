# PAR Peg SLA

Forked from https://github.com/Stacktical/stacktical-dsla-developer-toolkit for the [Dubai Defi hackaton](https://dubaidefi.io/). This adds a [par-peg-adapter](services/par-peg-adapter) so you can get the SLI of the PAR Peg. 

Our SLA example in `scripts.config.ts` verifies that the price of PAR stays above €0.99 for our defined period.

## Quick start

For a more indepth quick start please refer to the original documentation at https://readme.stacktical.com/developer-guide/developer-toolkit-1/quick-start. This quick start only lists what is needed to get the PAR Peg proof of concept up and running.


<<<<<<< Updated upstream
First run `IPFS_GATEWAY_URI="https://ipfs.dsla.network" npm run par-peg-adapter` in a seperate tab.
=======
First run `DEVELOP_IPFS_URI="https://ipfs.dsla.network" npm run par-peg-adapter` in a seperate tab.
>>>>>>> Stashed changes

*For another coin pass the coin id as: `COIN_ID=par-stablecoin`*

After that run the following commands:

```
hh stacktical:restart-services --network develop
hh deploy --network develop --reset
hh stacktical:bootstrap --network develop
hh stacktical:deploy-sla --network develop --index 5
```

Then to request the SLI

```
hh stacktical:request-sli --network develop
```

Example log output:

```
09:25:47 0|par-peg-adapter  | External PAR PEG adapter initialized at http://localhost:6080
09:26:26 0|par-peg-adapter  | Request Body:
09:26:26 0|par-peg-adapter  | {
09:26:26 0|par-peg-adapter  |   id: '084bb04a-ec8b-42e6-821e-1c92c63503fa',
09:26:26 0|par-peg-adapter  |   data: {
09:26:26 0|par-peg-adapter  |     address: '0x9561C133DD8580860B6b7E504bC5Aa500f0f06a7',
09:26:26 0|par-peg-adapter  |     dataPrefix: '0x08759e242f18c5c6b2c49af7fcb38ed7ce161f985273f31bf030e29caaa27c1f000000000000000000000000000000000000000000000000016345785d8a0000000000000000000000000000e982e462b094850f12af94d21d470e21be9d0e9c6a9705b4000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000061a1ecdd',
09:26:26 0|par-peg-adapter  |     functionSelector: '0x4ab0d190',
09:26:26 0|par-peg-adapter  |     network_name: 'develop',
09:26:26 0|par-peg-adapter  |     sla_address: '0xd472a9dedc8ccdfc05fc6d9604f8e90eb859884d',
09:26:26 0|par-peg-adapter  |     sla_monitoring_end: '1637539199',
09:26:26 0|par-peg-adapter  |     sla_monitoring_start: '1636934400'
09:26:26 0|par-peg-adapter  |   }
09:26:26 0|par-peg-adapter  | }
09:26:26 0|par-peg-adapter  | SLA IPFS url: http://host.docker.internal:8080/ipfs/QmfJALRGKJ1dgjnTEpUC2ctKPRNXQjzj5hXifddZAn1qAJ
09:26:26 0|par-peg-adapter  | periodType 2
09:26:26 0|par-peg-adapter  | SLA Data:
09:26:26 0|par-peg-adapter  | {
09:26:26 0|par-peg-adapter  |   serviceName: 'P-OPS',
09:26:26 0|par-peg-adapter  |   serviceDescription: 'Official bDSLA Beta Partner.',
09:26:26 0|par-peg-adapter  |   serviceImage: 'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
09:26:26 0|par-peg-adapter  |   serviceURL: 'https://bdslaToken.network',
09:26:26 0|par-peg-adapter  |   serviceAddress: 'one1kf42rl6yg2avkjsu34ch2jn8yjs64ycn4n9wdj',
09:26:26 0|par-peg-adapter  |   serviceTicker: 'ONE',
09:26:26 0|par-peg-adapter  |   periodType: 2,
09:26:26 0|par-peg-adapter  |   messengerAddress: '0xD86C8F0327494034F60e25074420BcCF560D5610'
09:26:26 0|par-peg-adapter  | }
09:26:26 0|par-peg-adapter  | precision BigNumber { _hex: '0x03e8', _isBigNumber: true }
09:26:26 0|par-peg-adapter  | start date Mon Nov 15 2021 01:00:00 GMT+0100
09:26:26 0|par-peg-adapter  | end date Mon Nov 22 2021 00:59:59 GMT+0100
09:26:27 0|par-peg-adapter  | averageParPrice 0.9942412096951886
09:26:27 0|par-peg-adapter  | result: 994.2412096951886
```

```
Requesting SLI...
...
Created SLI timestamp:  1638001587
Created SLI sli:  994
Created SLI status:  Respected
SLI request process finished
```

### Serverless

The [Serverless](https://www.serverless.com/) framework is included together with the [express-serverless](https://github.com/vendia/serverless-express/) package. Unfortunately due to all the services that are required to test (IFPS, Chainlink, EVM node etc) it is really hard to demonstrate this capability. The `par-peg-adapter` features a `index.local.ts` that starts up a normal Express server instead for local testing.

### Final notes

To actually use this in the real world we should have more data sources to verify the PAR price from, simply trusting Coingecko is not sufficient. We could query exchanges (onchain/offchain) directly instead.

I was not sure about the all the parameters in the `contracts/messengers/par-peg-messenger/use-case-spec.json` so I left the default values. Same for the SLA values in `scripts.config.ts`.
