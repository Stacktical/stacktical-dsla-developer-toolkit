---
description: >-
  Create the dsla-protocol job and bridge, fund the node and give fulfillment
  permissions in the Oracle contract.
---

# Prepare Chainlink nodes

Once the nodes are deployed, they need to be initialized with a series of steps, namely configurations, funds and permissions. To execute this task run:

```text
hh stacktical:prepare-chainlink-nodes --network NETWORK_NAME
```

{% hint style="warning" %}
The previous action will initialize the nodes configured in the Stacktical config. To learn more about it refer to [Chainlink nodes config](../setup/setup-networks/chainlink-nodes-config.md). Is necessary Rest API access to this nodes to configure them.
{% endhint %}

{% hint style="info" %}
This script is safe to use with already-in-production nodes, since it will keep the old jobs if they exist. However, to add the new Chainlink job id  \(from a new node for example\), is necessary to update the service agreement id \(`saId`\) of the [PreCoordinator](../../system-architecture/contracts-architecture/precoordinator.md) contract with the new `jobId`by using the [Se](../developer/stacktical-scripts/set-precoordinator.md)[tPreCoordinator](../developer/stacktical-scripts/set-precoordinator.md) task.
{% endhint %}

The `stacktical:prepare-chainlink-nodes` task will run the next subtasks for every Chainlink Node:

1. Creates the [bridge](../../system-architecture/chainlink-node.md#bridge) in the Chainlink node.
2. Creates the dsla protocol [job](../../system-architecture/chainlink-node.md#job) in the Chainlink node. 
3. Funds the Chainlink node address according to [Stacktical config](../setup/setup-networks/). 
4. Gives fulfillment permission to the Chainlink node address into the Oracle contract.

{% hint style="success" %}
Currently, the toolkit deploys the dsla-protocol job by default. It would be changed to a more customizable deployment in the near future.
{% endhint %}

Once this task is finished, the nodes are ready to proxy queries to the [DSLA protocol's external adapter](../../system-architecture/external-adapter.md).

After this process is completed, you can run the [Deploy script](../developer/deploy-script.md) with the network name to deploy the contracts.

### Want to test it out?



