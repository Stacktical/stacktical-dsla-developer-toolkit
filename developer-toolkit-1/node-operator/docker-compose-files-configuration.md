---
description: >-
  Create docker-compose files gracefully to deploy a Chainlink node in multiple
  networks seamlessly.
---

# Docker compose files configuration

The developer toolkit can generate the proper docker-compose file to deploy a Chainlink node, along with the Chainlink job specification. 

Fundamentally, it manages the Chainlink Oracle contract address and the LinkToken address of the corresponding network.

```bash
hh stacktical:chainlink-docker-compose --network NETWORK_NAME
```

{% hint style="info" %}
The addresses are managed automatically and they depend on the values of the [Stacktical config](../setup/setup-networks/). Read about [Addresses](../setup/setup-networks/deployed-addresses.md) to setup your contracts correctly.
{% endhint %}

This will generate multiple folders inside the `services/environments` folder in the root path with the names of the [Chainlink nodes](../setup/setup-networks/chainlink-nodes-config.md) of the `NETWORK_NAME` network.

This task manages the .api and .password files, necessaries to run the Chainlink node, copying them from the services folder into every node folder. They are not really necessary for production deployment, since you can use your own values for this files, but every node folder contains the necessary files to run a Chainlink node correctly, so you can copy the contents of this folder to a remote node and run it instantly i.e. by using `scp`:

```bash
scp -r services/environments/NODE_NAME/* username@remotehost:/path/to/node/
```

Once the files are copied, you can run the Chainlink node using `docker-compose`:

```bash
ssh username@remotehost
cd /path/to/node
docker-compose up
```

The Chainlink node is clean and it still needs to be configured to operate correctly with the DSLA protocol.

