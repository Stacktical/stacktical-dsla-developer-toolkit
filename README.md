# Introduction

We defined DSLA as an open protocol, where anyone can create new use cases and deploy them to the underlying blockchain protocol, leveraging it to state clear rules from day 0 and earning rewards every time someone makes use of a new use case.

## About the Developper Toolkit (DTK)

A full documentation oabout the DTK is available [here](https://readme.stacktical.com/developer-guide/developer-toolkit-1/introduction).

### Requirements

- node (LTS Version)
- Docker

## Subgraph deployment

1. Copy the subgraph/deploy-subgraphs-example file into subgraph/deploy-subgraphs.sh file.
2. Fill the GRAPH_NODE endpoints with proper information (pointing to 8020 port of every portforwarded graph node)
3. Avoid deploying to already deployed graph nodes, since it will replace the current subgraph and it will start indexing again
4. npm run graph:deploy:production
5. When prompted, select a subgraph version. You can hit enter without problems, but it will replace the current subgraph.

## Quick start

```
npm i

hh test
```

*Troubleshoot*

`sudo chown -R $(whoami): $(pwd)/services`
