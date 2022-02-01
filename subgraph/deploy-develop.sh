export DEVELOP_IPFS_URI="https://api.thegraph.com/ipfs/"
# export DEVELOP_IPFS_URI="http://127.0.0.1:8888"
export DEVELOP_GRAPH_NODE="http://127.0.0.1:8020"

npx hardhat stacktical:graph-manifestos


npx graph codegen subgraph/networks/develop.subgraph.yaml -o subgraph/generated
npx graph build subgraph/networks/develop.subgraph.yaml -o subgraph/build
npx graph create stacktical/dsla-protocol --node $DEVELOP_GRAPH_NODE
npx graph deploy -o subgraph/build stacktical/dsla-protocol subgraph/networks/develop.subgraph.yaml --ipfs $DEVELOP_IPFS_URI --node $DEVELOP_GRAPH_NODE

#"graph:create": "graph create stacktical/dsla-protocol --node http://127.0.0.1:8020",
#"graph:codegen": "graph codegen subgraph/subgraph.yaml -o subgraph/generated",
#"graph:build": "graph build subgraph/subgraph.yaml -o subgraph/build",
#"graph:deploy:develop": "npm run graph:codegen && npm run graph:build && graph deploy --debug -o subgraph/build stacktical/dsla-protocol subgraph/subgraph.yaml --ipfs http://localhost:5001 --node http://127.0.0.1:8020"
