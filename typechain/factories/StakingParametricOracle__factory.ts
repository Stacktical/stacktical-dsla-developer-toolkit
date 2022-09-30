/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BytesLike,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  StakingParametricOracle,
  StakingParametricOracleInterface,
} from "../StakingParametricOracle";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_messengerChainlinkOracle",
        type: "address",
      },
      {
        internalType: "address",
        name: "_messengerChainlinkToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_feeMultiplier",
        type: "uint256",
      },
      {
        internalType: "contract PeriodRegistry",
        name: "_periodRegistry",
        type: "address",
      },
      {
        internalType: "contract StakeRegistry",
        name: "_stakeRegistry",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_networkName",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "_lpName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_lpSymbol",
        type: "string",
      },
      {
        internalType: "string",
        name: "_spName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_spSymbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "ChainlinkCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "ChainlinkFulfilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "ChainlinkRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "jobId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
    ],
    name: "JobIdModified",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "slaAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "periodId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "chainlinkResponse",
        type: "bytes32",
      },
    ],
    name: "SLIReceived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "requestsCounter",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
    ],
    name: "SLIRequested",
    type: "event",
  },
  {
    inputs: [],
    name: "fee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_requestId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_chainlinkResponse",
        type: "uint256",
      },
    ],
    name: "fulfillSLI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "fulfillsCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "jobId",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lpName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lpSymbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "slaId",
        type: "uint128",
      },
    ],
    name: "lpSymbolSlaId",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "messengerPrecision",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "networkName",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "oracle",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "requestIdToSLIRequest",
    outputs: [
      {
        internalType: "address",
        name: "slaAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "periodId",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_periodId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_slaAddress",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_messengerOwnerApproval",
        type: "bool",
      },
      {
        internalType: "address",
        name: "_callerAddress",
        type: "address",
      },
    ],
    name: "requestSLI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "requests",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "requestsCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_slaAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_periodId",
        type: "uint256",
      },
    ],
    name: "retryRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_newJobId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_feeMultiplier",
        type: "uint256",
      },
    ],
    name: "setChainlinkJobID",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "setSLARegistry",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "slaRegistryAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "spName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "spSymbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "slaId",
        type: "uint128",
      },
    ],
    name: "spSymbolSlaId",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60a060405260016004556010805460ff60a01b191690553480156200002357600080fd5b506040516200286b3803806200286b833981016040819052620000469162000314565b620000513362000132565b6001600755600280546001600160a01b0319166001600160a01b038b161790556001600160a01b038a166080526200009267016345785d8a0000896200042e565b600c55600f80546001600160a01b03808a166001600160a01b031992831617909255601080549289169290911691909117905560118590558351620000df90601290602087019062000184565b508251620000f590601390602086019062000184565b5081516200010b90601490602085019062000184565b5080516200012190601590602084019062000184565b505050505050505050505062000499565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b82805462000192906200045c565b90600052602060002090601f016020900481019282620001b6576000855562000201565b82601f10620001d157805160ff191683800117855562000201565b8280016001018555821562000201579182015b8281111562000201578251825591602001919060010190620001e4565b506200020f92915062000213565b5090565b5b808211156200020f576000815560010162000214565b80516001600160a01b03811681146200024257600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200026f57600080fd5b81516001600160401b03808211156200028c576200028c62000247565b604051601f8301601f19908116603f01168101908282118183101715620002b757620002b762000247565b81604052838152602092508683858801011115620002d457600080fd5b600091505b83821015620002f85785820183015181830184015290820190620002d9565b838211156200030a5760008385830101525b9695505050505050565b6000806000806000806000806000806101408b8d0312156200033557600080fd5b620003408b6200022a565b99506200035060208c016200022a565b985060408b015197506200036760608c016200022a565b96506200037760808c016200022a565b60a08c015160c08d015191975095506001600160401b03808211156200039c57600080fd5b620003aa8e838f016200025d565b955060e08d0151915080821115620003c157600080fd5b620003cf8e838f016200025d565b94506101008d0151915080821115620003e757600080fd5b620003f58e838f016200025d565b93506101208d01519150808211156200040d57600080fd5b506200041c8d828e016200025d565b9150509295989b9194979a5092959850565b60008160001904831182151516156200045757634e487b7160e01b600052601160045260246000fd5b500290565b600181811c908216806200047157607f821691505b602082108114156200049357634e487b7160e01b600052602260045260246000fd5b50919050565b6080516123af620004bc600039600081816101f5015261081d01526123af6000f3fe608060405234801561001057600080fd5b50600436106101585760003560e01c806397a82192116100c3578063cb8d3fcf1161007c578063cb8d3fcf146102d5578063ccb1637c146102e8578063ddca3f43146102f0578063e450f061146102f8578063f2fde38b1461030b578063f38815891461031e57600080fd5b806397a8219214610245578063a50c542514610258578063ae401eb914610260578063bc0bfc00146102b2578063c2939d97146102c5578063c9b0cb22146102cd57600080fd5b8063715018a611610115578063715018a6146101e357806376ff294b146101eb5780637dc0d1d0146101f357806381d12c58146102195780638b6bd7361461022c5780638da5cb5b1461023457600080fd5b8063107bf28c1461015d57806311971c4614610179578063292733bf1461019957806346cd6801146101ae578063663c2269146101b65780636e71890d146101be575b600080fd5b61016660115481565b6040519081526020015b60405180910390f35b61018c610187366004611d5f565b610326565b6040516101709190611de0565b6101ac6101a7366004611df3565b610363565b005b61018c6103cc565b600d54610166565b600a546001600160a01b03165b6040516001600160a01b039091168152602001610170565b6101ac61045a565b61018c61046e565b7f00000000000000000000000000000000000000000000000000000000000000006101cb565b610166610227366004611e15565b61047b565b61018c61049c565b6006546001600160a01b03166101cb565b6101ac610253366004611e58565b6104a9565b600e54610166565b61029361026e366004611e15565b600860205260009081526040902080546001909101546001600160a01b039091169082565b604080516001600160a01b039093168352602083019190915201610170565b6101ac6102c0366004611df3565b61092d565b600b54610166565b6103e8610166565b61018c6102e3366004611d5f565b610b3a565b61018c610b50565b600c54610166565b6101ac610306366004611ea7565b610b5d565b6101ac610319366004611ed1565b610d38565b6101ac610db1565b6060601561033c836001600160801b0316610e2f565b60405160200161034d929190611f3d565b6040516020818303038152906040529050919050565b61036b610f35565b600b82905561038267016345785d8a000082612001565b600c81905560405133917f8e7e22d2820965fa1a8fa3ad76db76127e2f1baaf65f50c4e267f28b2254f7cb916103c091868252602082015260400190565b60405180910390a25050565b601280546103d990611eec565b80601f016020809104026020016040519081016040528092919081815260200182805461040590611eec565b80156104525780601f1061042757610100808354040283529160200191610452565b820191906000526020600020905b81548152906001019060200180831161043557829003601f168201915b505050505081565b610462610f35565b61046c6000610f8f565b565b601480546103d990611eec565b6009818154811061048b57600080fd5b600091825260209091200154905081565b601580546103d990611eec565b601054600160a01b900460ff1661052357600a546001600160a01b031633146105235760405162461bcd60e51b815260206004820152602160248201527f43616e206f6e6c792062652063616c6c656420627920534c41526567697374726044820152607960f81b60648201526084015b60405180910390fd5b600260075414156105765760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604482015260640161051a565b6002600755600b546105b85760405162461bcd60e51b815260206004820152600b60248201526a5f6a6f624920656d70747960a81b604482015260640161051a565b828215610600576105fb6105d46006546001600160a01b031690565b30600c546105ea6002546001600160a01b031690565b6001600160a01b0316929190610fe1565b61061a565b61061a8230600c546105ea6002546001600160a01b031690565b6000610630600b543063bc0bfc0060e01b611041565b9050600080600f60009054906101000a90046001600160a01b03166001600160a01b031663ffa61235856001600160a01b03166346e0fbae6040518163ffffffff1660e01b815260040160206040518083038186803b15801561069257600080fd5b505afa1580156106a6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106ca9190612020565b8a6040518363ffffffff1660e01b81526004016106e8929190612057565b604080518083038186803b1580156106ff57600080fd5b505afa158015610713573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107379190612083565b9150915061077c604051806040016040528060148152602001731cdb1857db5bdb9a5d1bdc9a5b99d7dcdd185c9d60621b81525061077484611068565b859190611166565b6107b3604051806040016040528060128152602001711cdb1857db5bdb9a5d1bdc9a5b99d7d95b9960721b81525061077483611068565b6107e36040518060400160405280600b81526020016a736c615f6164647265737360a81b81525061077489611189565b6108166040518060400160405280600c81526020016b6e6574776f726b5f6e616d6560a01b815250610774601154611374565b60006108457f000000000000000000000000000000000000000000000000000000000000000085600c546114a4565b6009805460018082019092557f6e1540171b6c0c960b71a7020d9f60077f6af931a8bbf590da0223dacf75c7af018290556040805180820182526001600160a01b038c8116825260208083018f815260008781526008909252938120925183546001600160a01b0319169216919091178255915190830155600d805493945091926108d19084906120a7565b9091555050600d5460408051918252602082018390526001600160a01b038816917feab5eb77e722078f3fab7eb6a77c74f7001181e1e3a74d51b7b5747ee1b31cb9910160405180910390a25050600160075550505050505050565b600260075414156109805760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604482015260640161051a565b600260075560008281526005602052604090205482906001600160a01b031633146109fe5760405162461bcd60e51b815260206004820152602860248201527f536f75726365206d75737420626520746865206f7261636c65206f6620746865604482015267081c995c5d595cdd60c21b606482015260840161051a565b60008181526005602052604080822080546001600160a01b03191690555182917f7cc135e0cebb02c3480ae5d74d377283180a2601f8f644edf7987b009316c63a91a26000838152600860209081526040918290208251808401845281546001600160a01b031680825260019092015481840181905284519081529283018690529286927f56514ef6e1ffd0f970ebf32dc181e476384e6e53a8351719040b4030318a933b910160405180910390a36001600e6000828254610ac091906120a7565b909155505080516020820151604051636bd2e21160e11b81526004810186905260248101919091526001600160a01b039091169063d7a5c42290604401600060405180830381600087803b158015610b1757600080fd5b505af1158015610b2b573d6000803e3d6000fd5b50506001600755505050505050565b6060601361033c836001600160801b0316610e2f565b601380546103d990611eec565b60108054600160a01b60ff60a01b1982161790915560405163ab9a81a560e01b81526001600160a01b038481166004830152602482018490529091169063ab9a81a59060440160206040518083038186803b158015610bbb57600080fd5b505afa158015610bcf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bf391906120bf565b610c3f5760405162461bcd60e51b815260206004820152601b60248201527f5374616b6552656769737472793a206e6f742076657269666965640000000000604482015260640161051a565b6040516320c876ef60e11b81526004810182905282906000906001600160a01b03831690634190edde9060240160606040518083038186803b158015610c8457600080fd5b505afa158015610c98573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cbc91906120dc565b925060009150610cc99050565b816002811115610cdb57610cdb612041565b14610d185760405162461bcd60e51b815260206004820152600d60248201526c14d3104e881d995c9a599a5959609a1b604482015260640161051a565b610d2583856000336104a9565b50506010805460ff60a01b191690555050565b610d40610f35565b6001600160a01b038116610da55760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161051a565b610dae81610f8f565b50565b600a546001600160a01b031615610e1b5760405162461bcd60e51b815260206004820152602860248201527f534c41526567697374727920616464726573732068617320616c7265616479206044820152671899595b881cd95d60c21b606482015260840161051a565b600a80546001600160a01b03191633179055565b606081610e535750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610e7d5780610e6781612119565b9150610e769050600a8361214a565b9150610e57565b60008167ffffffffffffffff811115610e9857610e9861215e565b6040519080825280601f01601f191660200182016040528015610ec2576020820181803683370190505b5090505b8415610f2d57610ed7600183612174565b9150610ee4600a8661218b565b610eef9060306120a7565b60f81b818381518110610f0457610f0461219f565b60200101906001600160f81b031916908160001a905350610f26600a8661214a565b9450610ec6565b949350505050565b6006546001600160a01b0316331461046c5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161051a565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b604080516001600160a01b0385811660248301528416604482015260648082018490528251808303909101815260849091019091526020810180516001600160e01b03166323b872dd60e01b17905261103b908590611537565b50505050565b611049611d24565b611051611d24565b61105d81868686611609565b9150505b9392505050565b60608161108c5750506040805180820190915260018152600360fc1b602082015290565b8160005b81156110b657806110a081612119565b91506110af9050600a8361214a565b9150611090565b60008167ffffffffffffffff8111156110d1576110d161215e565b6040519080825280601f01601f1916602001820160405280156110fb576020820181803683370190505b5090505b8415610f2d57611110600183612174565b915061111d600a8661218b565b6111289060306120a7565b60f81b81838151811061113d5761113d61219f565b60200101906001600160f81b031916908160001a90535061115f600a8661214a565b94506110ff565b60808301516111759083611646565b60808301516111849082611646565b505050565b604080518082018252601081526f181899199a1a9b1b9c1cb0b131b232b360811b60208201528151602a80825260608281019094526001600160a01b0385169291600091602082018180368337019050509050600360fc1b816000815181106111f4576111f461219f565b60200101906001600160f81b031916908160001a905350600f60fb1b816001815181106112235761122361219f565b60200101906001600160f81b031916908160001a90535060005b601481101561136b578260048561125584600c6120a7565b602081106112655761126561219f565b1a60f81b6001600160f81b031916901c60f81c60ff168151811061128b5761128b61219f565b01602001516001600160f81b031916826112a6836002612001565b6112b19060026120a7565b815181106112c1576112c161219f565b60200101906001600160f81b031916908160001a90535082846112e583600c6120a7565b602081106112f5576112f561219f565b825191901a600f1690811061130c5761130c61219f565b01602001516001600160f81b03191682611327836002612001565b6113329060036120a7565b815181106113425761134261219f565b60200101906001600160f81b031916908160001a9053508061136381612119565b91505061123d565b50949350505050565b606060005b60208160ff161080156113ad5750828160ff166020811061139c5761139c61219f565b1a60f81b6001600160f81b03191615155b156113c457806113bc816121b5565b915050611379565b60008160ff1667ffffffffffffffff8111156113e2576113e261215e565b6040519080825280601f01601f19166020018201604052801561140c576020820181803683370190505b509050600091505b60208260ff161080156114485750838260ff16602081106114375761143761219f565b1a60f81b6001600160f81b03191615155b1561106157838260ff16602081106114625761146261219f565b1a60f81b818360ff168151811061147b5761147b61219f565b60200101906001600160f81b031916908160001a9053508161149c816121b5565b925050611414565b6004546000906114b58160016120a7565b600455835160408086015160808701515191516000936320214ca360e11b936114ed9386938493923092918a916001916024016121d5565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152905061152d8683868461165d565b9695505050505050565b600061158c826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166117ca9092919063ffffffff16565b80519091501561118457808060200190518101906115aa91906120bf565b6111845760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b606482015260840161051a565b611611611d24565b61162185608001516101006117d9565b50509183526001600160a01b031660208301526001600160e01b031916604082015290565b6116538260038351611844565b6111848282611953565b6040516bffffffffffffffffffffffff193060601b1660208201526034810184905260009060540160408051808303601f1901815282825280516020918201206000818152600590925291812080546001600160a01b0319166001600160a01b038a1617905590925082917fb5e6e01e79f91267dc17b4e6314d5d4d03593d2ceee0fbb452b750bd70ea5af99190a2600254604051630200057560e51b81526001600160a01b0390911690634000aea0906117209088908790879060040161223d565b602060405180830381600087803b15801561173a57600080fd5b505af115801561174e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061177291906120bf565b610f2d5760405162461bcd60e51b815260206004820152602360248201527f756e61626c6520746f207472616e73666572416e6443616c6c20746f206f7261604482015262636c6560e81b606482015260840161051a565b6060610f2d848460008561197a565b6040805180820190915260608152600060208201526117f960208361218b565b156118215761180960208361218b565b611814906020612174565b61181e90836120a7565b91505b506020808301829052604080518085526000815283019091019052815b92915050565b60178167ffffffffffffffff16116118695761103b8360e0600585901b168317611aab565b60ff8167ffffffffffffffff16116118a757611890836018611fe0600586901b1617611aab565b5061103b8367ffffffffffffffff83166001611ad0565b61ffff8167ffffffffffffffff16116118e6576118cf836019611fe0600586901b1617611aab565b5061103b8367ffffffffffffffff83166002611ad0565b63ffffffff8167ffffffffffffffff16116119275761191083601a611fe0600586901b1617611aab565b5061103b8367ffffffffffffffff83166004611ad0565b61193c83601b611fe0600586901b1617611aab565b5061103b8367ffffffffffffffff83166008611ad0565b60408051808201909152606081526000602082015261106183846000015151848551611af6565b6060824710156119db5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b606482015260840161051a565b6001600160a01b0385163b611a325760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161051a565b600080866001600160a01b03168587604051611a4e919061226d565b60006040518083038185875af1925050503d8060008114611a8b576040519150601f19603f3d011682016040523d82523d6000602084013e611a90565b606091505b5091509150611aa0828286611be0565b979650505050505050565b6040805180820190915260608152600060208201526110618384600001515184611c19565b604080518082019091526060815260006020820152610f2d848560000151518585611c75565b6040805180820190915260608152600060208201528251821115611b1957600080fd5b6020850151611b2883866120a7565b1115611b5b57611b5b85611b4b87602001518786611b4691906120a7565b611cf6565b611b56906002612001565b611d0d565b600080865180518760208301019350808887011115611b7a5787860182525b505050602084015b60208410611bba5780518252611b996020836120a7565b9150611ba66020826120a7565b9050611bb3602085612174565b9350611b82565b51815160001960208690036101000a019081169019919091161790525083949350505050565b60608315611bef575081611061565b825115611bff5782518084602001fd5b8160405162461bcd60e51b815260040161051a9190611de0565b60408051808201909152606081526000602082015283602001518310611c4e57611c4e8485602001516002611b569190612001565b835180516020858301018481535080851415611c6b576001810182525b5093949350505050565b6040805180820190915260608152600060208201526020850151611c9985846120a7565b1115611cad57611cad85611b4b86856120a7565b60006001611cbd8461010061236d565b611cc79190612174565b9050855183868201018583198251161781525080518487011115611ceb5783860181525b509495945050505050565b600081831115611d0757508161183e565b50919050565b8151611d1983836117d9565b5061103b8382611953565b6040805160a0810182526000808252602080830182905282840182905260608084018390528451808601909552845283015290608082015290565b600060208284031215611d7157600080fd5b81356001600160801b038116811461106157600080fd5b60005b83811015611da3578181015183820152602001611d8b565b8381111561103b5750506000910152565b60008151808452611dcc816020860160208601611d88565b601f01601f19169290920160200192915050565b6020815260006110616020830184611db4565b60008060408385031215611e0657600080fd5b50508035926020909101359150565b600060208284031215611e2757600080fd5b5035919050565b80356001600160a01b0381168114611e4557600080fd5b919050565b8015158114610dae57600080fd5b60008060008060808587031215611e6e57600080fd5b84359350611e7e60208601611e2e565b92506040850135611e8e81611e4a565b9150611e9c60608601611e2e565b905092959194509250565b60008060408385031215611eba57600080fd5b611ec383611e2e565b946020939093013593505050565b600060208284031215611ee357600080fd5b61106182611e2e565b600181811c90821680611f0057607f821691505b60208210811415611d0757634e487b7160e01b600052602260045260246000fd5b60008151611f33818560208601611d88565b9290920192915050565b600080845481600182811c915080831680611f5957607f831692505b6020808410821415611f7957634e487b7160e01b86526022600452602486fd5b818015611f8d5760018114611f9e57611fcb565b60ff19861689528489019650611fcb565b60008b81526020902060005b86811015611fc35781548b820152908501908301611faa565b505084890196505b50505050505061105d611fe582602d60f81b815260010190565b85611f21565b634e487b7160e01b600052601160045260246000fd5b600081600019048311821515161561201b5761201b611feb565b500290565b60006020828403121561203257600080fd5b81516006811061106157600080fd5b634e487b7160e01b600052602160045260246000fd5b604081016006841061207957634e487b7160e01b600052602160045260246000fd5b9281526020015290565b6000806040838503121561209657600080fd5b505080516020909101519092909150565b600082198211156120ba576120ba611feb565b500190565b6000602082840312156120d157600080fd5b815161106181611e4a565b6000806000606084860312156120f157600080fd5b835192506020840151915060408401516003811061210e57600080fd5b809150509250925092565b600060001982141561212d5761212d611feb565b5060010190565b634e487b7160e01b600052601260045260246000fd5b60008261215957612159612134565b500490565b634e487b7160e01b600052604160045260246000fd5b60008282101561218657612186611feb565b500390565b60008261219a5761219a612134565b500690565b634e487b7160e01b600052603260045260246000fd5b600060ff821660ff8114156121cc576121cc611feb565b60010192915050565b6001600160a01b0389811682526020820189905260408201889052861660608201526001600160e01b03198516608082015260a0810184905260c0810183905261010060e0820181905260009061222e83820185611db4565b9b9a5050505050505050505050565b60018060a01b03841681528260208201526060604082015260006122646060830184611db4565b95945050505050565b6000825161227f818460208701611d88565b9190910192915050565b600181815b808511156122c45781600019048211156122aa576122aa611feb565b808516156122b757918102915b93841c939080029061228e565b509250929050565b6000826122db5750600161183e565b816122e85750600061183e565b81600181146122fe576002811461230857612324565b600191505061183e565b60ff84111561231957612319611feb565b50506001821b61183e565b5060208310610133831016604e8410600b8410161715612347575081810a61183e565b6123518383612289565b806000190482111561236557612365611feb565b029392505050565b600061106183836122cc56fea264697066735822122053b4aa6b8f8bfe0b3d6a948f4e565b1d72f348b614b96de3139f1cd2922ff2dd64736f6c63430008090033";

export class StakingParametricOracle__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _messengerChainlinkOracle: string,
    _messengerChainlinkToken: string,
    _feeMultiplier: BigNumberish,
    _periodRegistry: string,
    _stakeRegistry: string,
    _networkName: BytesLike,
    _lpName: string,
    _lpSymbol: string,
    _spName: string,
    _spSymbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<StakingParametricOracle> {
    return super.deploy(
      _messengerChainlinkOracle,
      _messengerChainlinkToken,
      _feeMultiplier,
      _periodRegistry,
      _stakeRegistry,
      _networkName,
      _lpName,
      _lpSymbol,
      _spName,
      _spSymbol,
      overrides || {}
    ) as Promise<StakingParametricOracle>;
  }
  getDeployTransaction(
    _messengerChainlinkOracle: string,
    _messengerChainlinkToken: string,
    _feeMultiplier: BigNumberish,
    _periodRegistry: string,
    _stakeRegistry: string,
    _networkName: BytesLike,
    _lpName: string,
    _lpSymbol: string,
    _spName: string,
    _spSymbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _messengerChainlinkOracle,
      _messengerChainlinkToken,
      _feeMultiplier,
      _periodRegistry,
      _stakeRegistry,
      _networkName,
      _lpName,
      _lpSymbol,
      _spName,
      _spSymbol,
      overrides || {}
    );
  }
  attach(address: string): StakingParametricOracle {
    return super.attach(address) as StakingParametricOracle;
  }
  connect(signer: Signer): StakingParametricOracle__factory {
    return super.connect(signer) as StakingParametricOracle__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakingParametricOracleInterface {
    return new utils.Interface(_abi) as StakingParametricOracleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StakingParametricOracle {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as StakingParametricOracle;
  }
}
