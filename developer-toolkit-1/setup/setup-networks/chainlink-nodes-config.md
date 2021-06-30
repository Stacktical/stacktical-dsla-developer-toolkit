---
description: Specify the config of your Chainlink nodes in a single place.
---

# Chainlink config

{% hint style="warning" %}
You need access to the Chainlink nodes RestAPI in order to make this work. In future versions it will be compatible with externally owned nodes.
{% endhint %}

### ChainlinkConfig type

{% code title="types.ts" %}
```typescript
export type ChainlinkConfiguration = {
  isProduction: boolean;
  nodeFunds: string;
  gasLimit?: string;
  ethWsUrl: string;
  ethHttpUrl?: string;
  nodesConfiguration: Array<ChainlinkNodeConfiguration>;
};

```
{% endcode %}

* `isProduction`: if true, the `hh deploy` script is not going to deploy the local services, assuming that the nodes config points to remote nodes. 
* `gasLimit`: gas limit for the 
* `nodeFunds`: funds granted to the Chainlink nodes on deployment \(in Ether i.e. 10^18 wei\)
* `ethWsUrl`: Chainlink [ETH\_URL](https://docs.chain.link/docs/configuration-variables/#eth_url) configuration variable.
* `ethHttpUrl(optional)`: Chainlink [ETH\_HTTP\_URL](https://docs.chain.link/docs/configuration-variables/#eth_http_url) configuration variable.
* `nodesConfiguration`: array of [ChainlinkNodeConfig](chainlink-nodes-config.md#chainlinknodeconfig-type). 

{% hint style="success" %}
In future versions, both `ethWsUrl` and `ethHttpUrl`would be defined by node.
{% endhint %}

### ChainlinkNodeConfig type

{% code title="types.ts" %}
```typescript
export type ChainlinkNodeConfiguration = {
  name: string;
  restApiUrl: string;
  restApiPort?: string;
  email: string;
  password: string;
  externalAdapterUrl: string;
};

```
{% endcode %}

* `name`: string used to identify the node uniquely, specially in the `services/environments` folder.
* `restApiUrl`: node RestAPI url.  
* `restApiPort (optional)`: port of the RestAPI url. If empty, the toolkit will not append a port string to the `restApiUrl` i.e. append `:restApiPort`
* `email`: email credential for node RestAPI authentication
* `password`: password credential for node RestAPI authentication
* `externalAdapterUrl`: url of the node's [External adapter](../../../system-architecture/external-adapter.md) 

{% hint style="info" %}
Please note that `nodesConfiguration` is an array of this configurations. By every single one of this configuration specs, and if `isProduction flag`is false, the toolkit will deploy nodes with the corresponding configuration. The toolkit assumes that the `email` and `password` are well configured, so in the case of locally deployed nodes, it should match the information of the `.api` and `.password` of the `services`folder of the root path.
{% endhint %}



