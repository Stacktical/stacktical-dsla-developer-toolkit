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
  InflationOracle,
  InflationOracleInterface,
} from "../InflationOracle";

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
    inputs: [
      {
        internalType: "bytes32",
        name: "_requestId",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "answer",
        type: "bytes",
      },
    ],
    name: "fulfillYoyInflation",
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
  "0x60a060405260016004556010805460ff60a01b191690553480156200002357600080fd5b506040516200286d3803806200286d833981016040819052620000469162000314565b620000513362000132565b6001600755600280546001600160a01b0319166001600160a01b038b161790556001600160a01b038a166080526200009267016345785d8a0000896200042e565b600c55600f80546001600160a01b03808a166001600160a01b031992831617909255601080549289169290911691909117905560118590558351620000df90601290602087019062000184565b508251620000f590601390602086019062000184565b5081516200010b90601490602085019062000184565b5080516200012190601590602084019062000184565b505050505050505050505062000499565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b82805462000192906200045c565b90600052602060002090601f016020900481019282620001b6576000855562000201565b82601f10620001d157805160ff191683800117855562000201565b8280016001018555821562000201579182015b8281111562000201578251825591602001919060010190620001e4565b506200020f92915062000213565b5090565b5b808211156200020f576000815560010162000214565b80516001600160a01b03811681146200024257600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200026f57600080fd5b81516001600160401b03808211156200028c576200028c62000247565b604051601f8301601f19908116603f01168101908282118183101715620002b757620002b762000247565b81604052838152602092508683858801011115620002d457600080fd5b600091505b83821015620002f85785820183015181830184015290820190620002d9565b838211156200030a5760008385830101525b9695505050505050565b6000806000806000806000806000806101408b8d0312156200033557600080fd5b620003408b6200022a565b99506200035060208c016200022a565b985060408b015197506200036760608c016200022a565b96506200037760808c016200022a565b60a08c015160c08d015191975095506001600160401b03808211156200039c57600080fd5b620003aa8e838f016200025d565b955060e08d0151915080821115620003c157600080fd5b620003cf8e838f016200025d565b94506101008d0151915080821115620003e757600080fd5b620003f58e838f016200025d565b93506101208d01519150808211156200040d57600080fd5b506200041c8d828e016200025d565b9150509295989b9194979a5092959850565b60008160001904831182151516156200045757634e487b7160e01b600052601160045260246000fd5b500290565b600181811c908216806200047157607f821691505b602082108114156200049357634e487b7160e01b600052602260045260246000fd5b50919050565b6080516123b1620004bc600039600081816101f5015261081f01526123b16000f3fe608060405234801561001057600080fd5b50600436106101585760003560e01c806397a82192116100c3578063cb8d3fcf1161007c578063cb8d3fcf146102d6578063ccb1637c146102e9578063ddca3f43146102f1578063e450f061146102f9578063f2fde38b1461030c578063f38815891461031f57600080fd5b806397a8219214610245578063a50c542514610258578063ae401eb914610260578063bc0bfc00146102b2578063c2939d97146102c5578063c9b0cb22146102cd57600080fd5b8063715018a611610115578063715018a6146101e357806376ff294b146101eb5780637dc0d1d0146101f357806381d12c58146102195780638b6bd7361461022c5780638da5cb5b1461023457600080fd5b8063107bf28c1461015d57806311971c4614610179578063292733bf1461019957806346cd6801146101ae578063663c2269146101b65780636e71890d146101be575b600080fd5b61016660115481565b6040519081526020015b60405180910390f35b61018c610187366004611d61565b610327565b6040516101709190611de2565b6101ac6101a7366004611df5565b610364565b005b61018c6103cd565b600d54610166565b600a546001600160a01b03165b6040516001600160a01b039091168152602001610170565b6101ac61045b565b61018c61046f565b7f00000000000000000000000000000000000000000000000000000000000000006101cb565b610166610227366004611e17565b61047c565b61018c61049d565b6006546001600160a01b03166101cb565b6101ac610253366004611e5a565b6104aa565b600e54610166565b61029361026e366004611e17565b600860205260009081526040902080546001909101546001600160a01b039091169082565b604080516001600160a01b039093168352602083019190915201610170565b6101ac6102c0366004611df5565b61092f565b600b54610166565b620f4240610166565b61018c6102e4366004611d61565b610b3c565b61018c610b52565b600c54610166565b6101ac610307366004611ea9565b610b5f565b6101ac61031a366004611ed3565b610d3a565b6101ac610db3565b6060601561033d836001600160801b0316610e31565b60405160200161034e929190611f3f565b6040516020818303038152906040529050919050565b61036c610f37565b600b82905561038367016345785d8a000082612003565b600c81905560405133917f8e7e22d2820965fa1a8fa3ad76db76127e2f1baaf65f50c4e267f28b2254f7cb916103c191868252602082015260400190565b60405180910390a25050565b601280546103da90611eee565b80601f016020809104026020016040519081016040528092919081815260200182805461040690611eee565b80156104535780601f1061042857610100808354040283529160200191610453565b820191906000526020600020905b81548152906001019060200180831161043657829003601f168201915b505050505081565b610463610f37565b61046d6000610f91565b565b601480546103da90611eee565b6009818154811061048c57600080fd5b600091825260209091200154905081565b601580546103da90611eee565b601054600160a01b900460ff1661052457600a546001600160a01b031633146105245760405162461bcd60e51b815260206004820152602160248201527f43616e206f6e6c792062652063616c6c656420627920534c41526567697374726044820152607960f81b60648201526084015b60405180910390fd5b600260075414156105775760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604482015260640161051b565b6002600755600b546105ba5760405162461bcd60e51b815260206004820152600c60248201526b5f6a6f62496420656d70747960a01b604482015260640161051b565b828215610602576105fd6105d66006546001600160a01b031690565b30600c546105ec6002546001600160a01b031690565b6001600160a01b0316929190610fe3565b61061c565b61061c8230600c546105ec6002546001600160a01b031690565b6000610632600b543063bc0bfc0060e01b611043565b9050600080600f60009054906101000a90046001600160a01b03166001600160a01b031663ffa61235856001600160a01b03166346e0fbae6040518163ffffffff1660e01b815260040160206040518083038186803b15801561069457600080fd5b505afa1580156106a8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106cc9190612022565b8a6040518363ffffffff1660e01b81526004016106ea929190612059565b604080518083038186803b15801561070157600080fd5b505afa158015610715573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107399190612085565b9150915061077e604051806040016040528060148152602001731cdb1857db5bdb9a5d1bdc9a5b99d7dcdd185c9d60621b8152506107768461106a565b859190611168565b6107b5604051806040016040528060128152602001711cdb1857db5bdb9a5d1bdc9a5b99d7d95b9960721b8152506107768361106a565b6107e56040518060400160405280600b81526020016a736c615f6164647265737360a81b8152506107768961118b565b6108186040518060400160405280600c81526020016b6e6574776f726b5f6e616d6560a01b815250610776601154611376565b60006108477f000000000000000000000000000000000000000000000000000000000000000085600c546114a6565b6009805460018082019092557f6e1540171b6c0c960b71a7020d9f60077f6af931a8bbf590da0223dacf75c7af018290556040805180820182526001600160a01b038c8116825260208083018f815260008781526008909252938120925183546001600160a01b0319169216919091178255915190830155600d805493945091926108d39084906120a9565b9091555050600d5460408051918252602082018390526001600160a01b038816917feab5eb77e722078f3fab7eb6a77c74f7001181e1e3a74d51b7b5747ee1b31cb9910160405180910390a25050600160075550505050505050565b600260075414156109825760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604482015260640161051b565b600260075560008281526005602052604090205482906001600160a01b03163314610a005760405162461bcd60e51b815260206004820152602860248201527f536f75726365206d75737420626520746865206f7261636c65206f6620746865604482015267081c995c5d595cdd60c21b606482015260840161051b565b60008181526005602052604080822080546001600160a01b03191690555182917f7cc135e0cebb02c3480ae5d74d377283180a2601f8f644edf7987b009316c63a91a26000838152600860209081526040918290208251808401845281546001600160a01b031680825260019092015481840181905284519081529283018690529286927f56514ef6e1ffd0f970ebf32dc181e476384e6e53a8351719040b4030318a933b910160405180910390a36001600e6000828254610ac291906120a9565b909155505080516020820151604051636bd2e21160e11b81526004810186905260248101919091526001600160a01b039091169063d7a5c42290604401600060405180830381600087803b158015610b1957600080fd5b505af1158015610b2d573d6000803e3d6000fd5b50506001600755505050505050565b6060601361033d836001600160801b0316610e31565b601380546103da90611eee565b60108054600160a01b60ff60a01b1982161790915560405163ab9a81a560e01b81526001600160a01b038481166004830152602482018490529091169063ab9a81a59060440160206040518083038186803b158015610bbd57600080fd5b505afa158015610bd1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bf591906120c1565b610c415760405162461bcd60e51b815260206004820152601b60248201527f5374616b6552656769737472793a206e6f742076657269666965640000000000604482015260640161051b565b6040516320c876ef60e11b81526004810182905282906000906001600160a01b03831690634190edde9060240160606040518083038186803b158015610c8657600080fd5b505afa158015610c9a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cbe91906120de565b925060009150610ccb9050565b816002811115610cdd57610cdd612043565b14610d1a5760405162461bcd60e51b815260206004820152600d60248201526c14d3104e881d995c9a599a5959609a1b604482015260640161051b565b610d2783856000336104aa565b50506010805460ff60a01b191690555050565b610d42610f37565b6001600160a01b038116610da75760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161051b565b610db081610f91565b50565b600a546001600160a01b031615610e1d5760405162461bcd60e51b815260206004820152602860248201527f534c41526567697374727920616464726573732068617320616c7265616479206044820152671899595b881cd95d60c21b606482015260840161051b565b600a80546001600160a01b03191633179055565b606081610e555750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610e7f5780610e698161211b565b9150610e789050600a8361214c565b9150610e59565b60008167ffffffffffffffff811115610e9a57610e9a612160565b6040519080825280601f01601f191660200182016040528015610ec4576020820181803683370190505b5090505b8415610f2f57610ed9600183612176565b9150610ee6600a8661218d565b610ef19060306120a9565b60f81b818381518110610f0657610f066121a1565b60200101906001600160f81b031916908160001a905350610f28600a8661214c565b9450610ec8565b949350505050565b6006546001600160a01b0316331461046d5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161051b565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b604080516001600160a01b0385811660248301528416604482015260648082018490528251808303909101815260849091019091526020810180516001600160e01b03166323b872dd60e01b17905261103d908590611539565b50505050565b61104b611d26565b611053611d26565b61105f8186868661160b565b9150505b9392505050565b60608161108e5750506040805180820190915260018152600360fc1b602082015290565b8160005b81156110b857806110a28161211b565b91506110b19050600a8361214c565b9150611092565b60008167ffffffffffffffff8111156110d3576110d3612160565b6040519080825280601f01601f1916602001820160405280156110fd576020820181803683370190505b5090505b8415610f2f57611112600183612176565b915061111f600a8661218d565b61112a9060306120a9565b60f81b81838151811061113f5761113f6121a1565b60200101906001600160f81b031916908160001a905350611161600a8661214c565b9450611101565b60808301516111779083611648565b60808301516111869082611648565b505050565b604080518082018252601081526f181899199a1a9b1b9c1cb0b131b232b360811b60208201528151602a80825260608281019094526001600160a01b0385169291600091602082018180368337019050509050600360fc1b816000815181106111f6576111f66121a1565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110611225576112256121a1565b60200101906001600160f81b031916908160001a90535060005b601481101561136d578260048561125784600c6120a9565b60208110611267576112676121a1565b1a60f81b6001600160f81b031916901c60f81c60ff168151811061128d5761128d6121a1565b01602001516001600160f81b031916826112a8836002612003565b6112b39060026120a9565b815181106112c3576112c36121a1565b60200101906001600160f81b031916908160001a90535082846112e783600c6120a9565b602081106112f7576112f76121a1565b825191901a600f1690811061130e5761130e6121a1565b01602001516001600160f81b03191682611329836002612003565b6113349060036120a9565b81518110611344576113446121a1565b60200101906001600160f81b031916908160001a905350806113658161211b565b91505061123f565b50949350505050565b606060005b60208160ff161080156113af5750828160ff166020811061139e5761139e6121a1565b1a60f81b6001600160f81b03191615155b156113c657806113be816121b7565b91505061137b565b60008160ff1667ffffffffffffffff8111156113e4576113e4612160565b6040519080825280601f01601f19166020018201604052801561140e576020820181803683370190505b509050600091505b60208260ff1610801561144a5750838260ff1660208110611439576114396121a1565b1a60f81b6001600160f81b03191615155b1561106357838260ff1660208110611464576114646121a1565b1a60f81b818360ff168151811061147d5761147d6121a1565b60200101906001600160f81b031916908160001a9053508161149e816121b7565b925050611416565b6004546000906114b78160016120a9565b600455835160408086015160808701515191516000936320214ca360e11b936114ef9386938493923092918a916001916024016121d7565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152905061152f8683868461165f565b9695505050505050565b600061158e826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166117cc9092919063ffffffff16565b80519091501561118657808060200190518101906115ac91906120c1565b6111865760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b606482015260840161051b565b611613611d26565b61162385608001516101006117db565b50509183526001600160a01b031660208301526001600160e01b031916604082015290565b6116558260038351611846565b6111868282611955565b6040516bffffffffffffffffffffffff193060601b1660208201526034810184905260009060540160408051808303601f1901815282825280516020918201206000818152600590925291812080546001600160a01b0319166001600160a01b038a1617905590925082917fb5e6e01e79f91267dc17b4e6314d5d4d03593d2ceee0fbb452b750bd70ea5af99190a2600254604051630200057560e51b81526001600160a01b0390911690634000aea0906117229088908790879060040161223f565b602060405180830381600087803b15801561173c57600080fd5b505af1158015611750573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061177491906120c1565b610f2f5760405162461bcd60e51b815260206004820152602360248201527f756e61626c6520746f207472616e73666572416e6443616c6c20746f206f7261604482015262636c6560e81b606482015260840161051b565b6060610f2f848460008561197c565b6040805180820190915260608152600060208201526117fb60208361218d565b156118235761180b60208361218d565b611816906020612176565b61182090836120a9565b91505b506020808301829052604080518085526000815283019091019052815b92915050565b60178167ffffffffffffffff161161186b5761103d8360e0600585901b168317611aad565b60ff8167ffffffffffffffff16116118a957611892836018611fe0600586901b1617611aad565b5061103d8367ffffffffffffffff83166001611ad2565b61ffff8167ffffffffffffffff16116118e8576118d1836019611fe0600586901b1617611aad565b5061103d8367ffffffffffffffff83166002611ad2565b63ffffffff8167ffffffffffffffff16116119295761191283601a611fe0600586901b1617611aad565b5061103d8367ffffffffffffffff83166004611ad2565b61193e83601b611fe0600586901b1617611aad565b5061103d8367ffffffffffffffff83166008611ad2565b60408051808201909152606081526000602082015261106383846000015151848551611af8565b6060824710156119dd5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b606482015260840161051b565b6001600160a01b0385163b611a345760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161051b565b600080866001600160a01b03168587604051611a50919061226f565b60006040518083038185875af1925050503d8060008114611a8d576040519150601f19603f3d011682016040523d82523d6000602084013e611a92565b606091505b5091509150611aa2828286611be2565b979650505050505050565b6040805180820190915260608152600060208201526110638384600001515184611c1b565b604080518082019091526060815260006020820152610f2f848560000151518585611c77565b6040805180820190915260608152600060208201528251821115611b1b57600080fd5b6020850151611b2a83866120a9565b1115611b5d57611b5d85611b4d87602001518786611b4891906120a9565b611cf8565b611b58906002612003565b611d0f565b600080865180518760208301019350808887011115611b7c5787860182525b505050602084015b60208410611bbc5780518252611b9b6020836120a9565b9150611ba86020826120a9565b9050611bb5602085612176565b9350611b84565b51815160001960208690036101000a019081169019919091161790525083949350505050565b60608315611bf1575081611063565b825115611c015782518084602001fd5b8160405162461bcd60e51b815260040161051b9190611de2565b60408051808201909152606081526000602082015283602001518310611c5057611c508485602001516002611b589190612003565b835180516020858301018481535080851415611c6d576001810182525b5093949350505050565b6040805180820190915260608152600060208201526020850151611c9b85846120a9565b1115611caf57611caf85611b4d86856120a9565b60006001611cbf8461010061236f565b611cc99190612176565b9050855183868201018583198251161781525080518487011115611ced5783860181525b509495945050505050565b600081831115611d09575081611840565b50919050565b8151611d1b83836117db565b5061103d8382611955565b6040805160a0810182526000808252602080830182905282840182905260608084018390528451808601909552845283015290608082015290565b600060208284031215611d7357600080fd5b81356001600160801b038116811461106357600080fd5b60005b83811015611da5578181015183820152602001611d8d565b8381111561103d5750506000910152565b60008151808452611dce816020860160208601611d8a565b601f01601f19169290920160200192915050565b6020815260006110636020830184611db6565b60008060408385031215611e0857600080fd5b50508035926020909101359150565b600060208284031215611e2957600080fd5b5035919050565b80356001600160a01b0381168114611e4757600080fd5b919050565b8015158114610db057600080fd5b60008060008060808587031215611e7057600080fd5b84359350611e8060208601611e30565b92506040850135611e9081611e4c565b9150611e9e60608601611e30565b905092959194509250565b60008060408385031215611ebc57600080fd5b611ec583611e30565b946020939093013593505050565b600060208284031215611ee557600080fd5b61106382611e30565b600181811c90821680611f0257607f821691505b60208210811415611d0957634e487b7160e01b600052602260045260246000fd5b60008151611f35818560208601611d8a565b9290920192915050565b600080845481600182811c915080831680611f5b57607f831692505b6020808410821415611f7b57634e487b7160e01b86526022600452602486fd5b818015611f8f5760018114611fa057611fcd565b60ff19861689528489019650611fcd565b60008b81526020902060005b86811015611fc55781548b820152908501908301611fac565b505084890196505b50505050505061105f611fe782602d60f81b815260010190565b85611f23565b634e487b7160e01b600052601160045260246000fd5b600081600019048311821515161561201d5761201d611fed565b500290565b60006020828403121561203457600080fd5b81516006811061106357600080fd5b634e487b7160e01b600052602160045260246000fd5b604081016006841061207b57634e487b7160e01b600052602160045260246000fd5b9281526020015290565b6000806040838503121561209857600080fd5b505080516020909101519092909150565b600082198211156120bc576120bc611fed565b500190565b6000602082840312156120d357600080fd5b815161106381611e4c565b6000806000606084860312156120f357600080fd5b835192506020840151915060408401516003811061211057600080fd5b809150509250925092565b600060001982141561212f5761212f611fed565b5060010190565b634e487b7160e01b600052601260045260246000fd5b60008261215b5761215b612136565b500490565b634e487b7160e01b600052604160045260246000fd5b60008282101561218857612188611fed565b500390565b60008261219c5761219c612136565b500690565b634e487b7160e01b600052603260045260246000fd5b600060ff821660ff8114156121ce576121ce611fed565b60010192915050565b6001600160a01b0389811682526020820189905260408201889052861660608201526001600160e01b03198516608082015260a0810184905260c0810183905261010060e0820181905260009061223083820185611db6565b9b9a5050505050505050505050565b60018060a01b03841681528260208201526060604082015260006122666060830184611db6565b95945050505050565b60008251612281818460208701611d8a565b9190910192915050565b600181815b808511156122c65781600019048211156122ac576122ac611fed565b808516156122b957918102915b93841c9390800290612290565b509250929050565b6000826122dd57506001611840565b816122ea57506000611840565b8160018114612300576002811461230a57612326565b6001915050611840565b60ff84111561231b5761231b611fed565b50506001821b611840565b5060208310610133831016604e8410600b8410161715612349575081810a611840565b612353838361228b565b806000190482111561236757612367611fed565b029392505050565b600061106383836122ce56fea26469706673582212205720e97a661cf44479d342d2ed28e0efea03bcaf005c3072da953a66a2ed8df964736f6c63430008090033";

export class InflationOracle__factory extends ContractFactory {
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
  ): Promise<InflationOracle> {
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
    ) as Promise<InflationOracle>;
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
  attach(address: string): InflationOracle {
    return super.attach(address) as InflationOracle;
  }
  connect(signer: Signer): InflationOracle__factory {
    return super.connect(signer) as InflationOracle__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): InflationOracleInterface {
    return new utils.Interface(_abi) as InflationOracleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): InflationOracle {
    return new Contract(address, _abi, signerOrProvider) as InflationOracle;
  }
}
