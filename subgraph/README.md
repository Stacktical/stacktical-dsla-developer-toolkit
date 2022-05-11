# Subgraph Health

## 1. Deploy Protocol Locally
1. Open terminal and run `hh stacktical:restart-services --network develop` command to start local services
2. Deploy protocol by running `hh deploy --network develop --reset` command
3. Deploy subgraph `yarn graph:deploy:develop`
4. Get the `DEPLOYMENT_ID`.
e.g
```
Build completed: QmZ4eyqsnE63QC61thHQHEDKEomVzZ6NjPkep6sKz7rs9x

Deployed to http://127.0.0.1:8000/subgraphs/name/stacktical/dsla-protocol/graphql

Subgraph endpoints:
Queries (HTTP):     http://127.0.0.1:8000/subgraphs/name/stacktical/dsla-protocol
Subscriptions (WS): http://127.0.0.1:8001/subgraphs/name/stacktical/dsla-protocol
```

5. Finally swap your the `DEPLOYMENT_ID` in subgraph/health.ts and run this command
```
node subgraph/health.ts
```