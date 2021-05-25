# developer-toolkit

Toolkit to deploy develop Chainlink Node, Graph Node, IPFS node, dev blockhain and DSLA contracts to multiple networks seamlessly

## Dependencies:

- Docker (docker-compose)
- Ganache-cli

## Usage:

### Install Shorthand (hh) and autocomplete

Use [this instruccions](https://hardhat.org/guides/shorthand.html#shorthand-hh-and-autocomplete) to install the Hardhat shorthand so you can run the scripts by running `hh SCRIPT_NAME`

### Configuration

To set up a new network, you need to fill the `stacktical` field in the corresponding network of the hardhat config file:

```typescript
export type StackticalConfiguration = {
  chainlink?: ChainlinkConfiguration;
  checkPastPeriods: 'if true, then SLARegistry will not allow the deployment of SLAs with a current or past periods, only future periods';
  addresses: {
    tokens: {
      LINK: 'null, or the LINK token address already deployed.';
      DSLA: 'null, or the DSLA token address already deployed.';
      DAI: 'null, or the DAI token address already deployed.';
      USDC: 'null, or the USDC token address already deployed.';
    };
    oracle: 'null, or the Oracle contract address already deployed.';
  };
  bootstrap: {
    periods: Array<PeriodBootstrapDefinition>;
    messengers: {
      allowanceContract: '';
      linkTokenAllowance: 'LINK token allowance for messengers i.e. SEMessenger and NetworkAnalytics';
    };
  };
  scripts?: {
    deploy_sla?: DeploySLAConfiguration;
  };
};
```

### Scripts

The developer toolkit is loaded with multiple scripts:

- `hh deploy`

## TODO

- Update Chainlink to 0.8
- Comment about the isProduction boolean
