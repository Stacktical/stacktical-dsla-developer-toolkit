---
description: Anchor your already deployed addresses.
---

# Deployed Addresses

```typescript
export type DeployedContractAddresses = {
  tokens: {
    LINK: string | null;
    DSLA: string | null;
    DAI: string | null;
    USDC: string | null;
  };
  oracle: string | null;
};
```

By defining this addresses, the toolkit will not deploy the corresponding contract, and it will store the address in the [deployments](../../developer/deployments.md) folder. 

* `LINK`: LinkToken contract address.
* `DSLA`: DSLA contract address.
* `DAI`: DAI contract address.
* `USDC`: USDC contract address.
* `Oracle`: Chainlink Oracle contract address.

