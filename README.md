# developer-toolkit

Toolkit to deploy develop Chainlink Node, Graph Node, IPFS node, dev blockhain and DSLA contracts to multiple networks seamlessly

## Dependencies:

- Docker (docker-compose)
- Ganache-cli

## Usage:

### Configuration

More information about it can be found in the [developer-toolkit documentation](https://readme.stacktical.com/dsla-protocol-developer-guide/developer-toolkit)

### Scripts

The developer toolkit is loaded with multiple scripts:

- `hh deploy --network develop --reset`: resets a develop deployment.
- `hh stacktical:bootstrap --network develop`: bootstraps the DSLA protocol.
- `hh stacktical:deploy-sla --network develop`: deploys a customized SLA based on `stacktical.scripts.deploy_sla` configuration.
- `hh stacktical:request-analytics --network develop --period-id 0`: requests analytics for period 0 of `stacktical.scripts.deploy_sla`contract.
- `hh stacktical:request-sli --network develop`: requests the verification for the next period of the last deployed SLA.

## TODO

- Update Chainlink to 0.8
- Create troubleshooting guide.
- External adapter hot reload
- Automate graph protocol
- dsla-protocol job name as stacktical config
