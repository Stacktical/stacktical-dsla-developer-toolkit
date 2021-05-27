# developer-toolkit

Toolkit to deploy develop Chainlink Node, Graph Node, IPFS node, dev blockhain and DSLA contracts to multiple networks seamlessly

## Dependencies:

- Docker (docker-compose)
- Ganache-cli

## Usage:

### Install Shorthand (hh) and autocomplete

Use [this instruccions](https://hardhat.org/guides/shorthand.html#shorthand-hh-and-autocomplete) to install the Hardhat shorthand so you can run the scripts by running `hh SCRIPT_NAME`

### Configuration

To set up a new network, you need to fill the `stacktical` field in the corresponding network of the hardhat config file.
More information about it can be found in the [developer-toolkit documentation](https://readme.stacktical.com/dsla-protocol-developer-guide/developer-toolkit)

### Scripts

The developer toolkit is loaded with multiple scripts:

- `hh deploy`

## TODO

- Update Chainlink to 0.8
- Comment about the isProduction boolean
