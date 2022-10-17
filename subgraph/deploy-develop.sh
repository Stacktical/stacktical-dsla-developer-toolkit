# export DEVELOP_IPFS_URI="https://api.thegraph.com/ipfs/"
export DEVELOP_IPFS_URI="https://api.thegraph.com/ipfs/"
export DEVELOP_GRAPH_NODE="http://127.0.0.1:8020"

npx hardhat stacktical:graph-manifestos


npx graph codegen subgraph/networks/develop.subgraph.yaml -o subgraph/generated
npx graph build subgraph/networks/develop.subgraph.yaml -o subgraph/build
npx graph create dsla-protocol/core --node $DEVELOP_GRAPH_NODE
npx graph deploy -o subgraph/build dsla-protocol/core subgraph/networks/develop.subgraph.yaml --ipfs $DEVELOP_IPFS_URI --node $DEVELOP_GRAPH_NODE
