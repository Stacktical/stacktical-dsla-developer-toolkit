---
description: 'All the information about your networks, resumed in a single place.'
---

# Stacktical config

### The Stacktical type

The Stacktical config object `stacktical` must be initialized by every network in the `networks` field of the `hardhat.config.ts` config object.

{% code title="types.ts" %}
```typescript
export type StackticalConfiguration = {
  chainlink
  : ChainlinkConfiguration;
  checkPastPeriods: boolean;
  addresses: DeployedContractAddresses;
  bootstrap: BootstrapConfiguration;
  scripts?: ScriptsConfiguration;
};
```
{% endcode %}

* `chainlink`: [Chainlink nodes config](chainlink-nodes-config.md).
* `checkPastPeriods`: if false, then you can deploy SLAs with **expired periods** i.e. past periods to simulate  contracts ready to verify. If true, deployments of SLAs with expired periods will be rejected. For production networks, this boolean should be **true**.
* `addresses`: [Deployed Addresses](deployed-addresses.md).
* `bootstrap`: [Bootstrap config](bootstrap.md).
* `scripts`: [Scripts config](scripts-config.md).

{% hint style="success" %}
The develop network config is ready to use, you can use it as example for other networks.
{% endhint %}

If you want to deploy the local environment, you need to run the next services first:

{% page-ref page="../local-blockchain.md" %}

{% page-ref page="../local-external-adapter.md" %}

{% page-ref page="../local-ipfs.md" %}

If you just want to create the docker compose files and initialize your Chainlink node, you might want to jump to the Chainlink node operator documentation directly:

{% page-ref page="../../node-operator/" %}



