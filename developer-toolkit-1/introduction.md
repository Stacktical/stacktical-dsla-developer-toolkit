---
description: >-
  The developer toolkit is intended to manage multiple tasks, from deployment,
  bootstrap and scripts to interact with the protocol across multiple networks.
---

# Introduction

### Why?

As Stacktical is a multi chain organization, we have to manage a long stack of components, with a ton of details to set them up. Because of this, shifting easily between networks without losing robustness became imperative; we needed to **AUTOMATE EVERYTHING or die trying.**

The developer toolkit is the result of months of R&D, after working in the DSLA protocol V1, and is intended to help developers and node operators work together to deploy new use cases for the DSLA protocol. 

### Dependencies \(for local environment deployment\):

* docker-compose
* IPFS: can be a local deployment with docker, go to **Running IPFS inside Docker** in the docker hub page \([https://hub.docker.com/r/ipfs/go-ipfs](https://hub.docker.com/r/ipfs/go-ipfs)\)
* ganache-cli \(until `hardhat node` is compatible with Chainlink\)

### Features:



### How to start using it

The developer toolkit is ready to use out of the box. However, it requires certain little configuration before use it smoothly:

{% page-ref page="setup/" %}

After setup is ready, you can deploy the whole [System architecture](../system-architecture/) to your local machine by running a couple of Hardhat tasks.

You can use it to run tasks for Developers or Chainlink node operators:

{% page-ref page="developer/" %}

{% page-ref page="node-operator/" %}







