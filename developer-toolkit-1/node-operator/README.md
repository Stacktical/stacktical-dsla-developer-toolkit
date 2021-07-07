---
description: >-
  The developer toolkit is capable of manage multiple tasks intended to help
  Chainlink node operators.
---

# Chainlink node operator

{% hint style="warning" %}
The developer toolkit is not prepared to manage externally owned Chainlink nodes, yet. It makes use of the Chainlink Node API to manage the dsla-protocol job and bridge. If you don't have access to the REST Api of the remote node, the toolkit will not work. In future versions it will be open to externally owned Chainlink nodes.
{% endhint %}

Chainlink node operators can use the toolkit to:

* Generate docker-compose files of the Chainlink Nodes to deploy
* Generate a folder structure ready to send to a remote computer to bootstrap a Chainlink Node.
* Deploy the Oracle contract \(and the LinkToken if necessary\).
* Create the dsla-protocol job in the Chainlink node.
* Fund the Chainlink node to operate correctly.
* Give permissions to the Chainlink node account into the Oracle contract.

Start by creating the docker compose files for your nodes:

{% page-ref page="docker-compose-files-configuration.md" %}

Then, and after running your nodes, you can bootstrap them:

{% page-ref page="prepare-chainlink-nodes.md" %}







