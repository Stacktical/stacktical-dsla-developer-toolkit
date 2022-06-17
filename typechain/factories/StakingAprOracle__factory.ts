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
  StakingAprOracle,
  StakingAprOracleInterface,
} from "../StakingAprOracle";

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
  "0x60a060405260016004556010805460ff60a01b191690553480156200002357600080fd5b50604051620028b0380380620028b0833981016040819052620000469162000314565b620000513362000132565b6001600755600280546001600160a01b0319166001600160a01b038b161790556001600160a01b038a166080526200009267016345785d8a0000896200042e565b600c55600f80546001600160a01b03808a166001600160a01b031992831617909255601080549289169290911691909117905560118590558351620000df90601290602087019062000184565b508251620000f590601390602086019062000184565b5081516200010b90601490602085019062000184565b5080516200012190601590602084019062000184565b505050505050505050505062000499565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b82805462000192906200045c565b90600052602060002090601f016020900481019282620001b6576000855562000201565b82601f10620001d157805160ff191683800117855562000201565b8280016001018555821562000201579182015b8281111562000201578251825591602001919060010190620001e4565b506200020f92915062000213565b5090565b5b808211156200020f576000815560010162000214565b80516001600160a01b03811681146200024257600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200026f57600080fd5b81516001600160401b03808211156200028c576200028c62000247565b604051601f8301601f19908116603f01168101908282118183101715620002b757620002b762000247565b81604052838152602092508683858801011115620002d457600080fd5b600091505b83821015620002f85785820183015181830184015290820190620002d9565b838211156200030a5760008385830101525b9695505050505050565b6000806000806000806000806000806101408b8d0312156200033557600080fd5b620003408b6200022a565b99506200035060208c016200022a565b985060408b015197506200036760608c016200022a565b96506200037760808c016200022a565b60a08c015160c08d015191975095506001600160401b03808211156200039c57600080fd5b620003aa8e838f016200025d565b955060e08d0151915080821115620003c157600080fd5b620003cf8e838f016200025d565b94506101008d0151915080821115620003e757600080fd5b620003f58e838f016200025d565b93506101208d01519150808211156200040d57600080fd5b506200041c8d828e016200025d565b9150509295989b9194979a5092959850565b60008160001904831182151516156200045757634e487b7160e01b600052601160045260246000fd5b500290565b600181811c908216806200047157607f821691505b602082108114156200049357634e487b7160e01b600052602260045260246000fd5b50919050565b6080516123f4620004bc600039600081816101f5015261086501526123f46000f3fe608060405234801561001057600080fd5b50600436106101585760003560e01c806397a82192116100c3578063cb8d3fcf1161007c578063cb8d3fcf146102d5578063ccb1637c146102e8578063ddca3f43146102f0578063e450f061146102f8578063f2fde38b1461030b578063f38815891461031e57600080fd5b806397a8219214610245578063a50c542514610258578063ae401eb914610260578063bc0bfc00146102b2578063c2939d97146102c5578063c9b0cb22146102cd57600080fd5b8063715018a611610115578063715018a6146101e357806376ff294b146101eb5780637dc0d1d0146101f357806381d12c58146102195780638b6bd7361461022c5780638da5cb5b1461023457600080fd5b8063107bf28c1461015d57806311971c4614610179578063292733bf1461019957806346cd6801146101ae578063663c2269146101b65780636e71890d146101be575b600080fd5b61016660115481565b6040519081526020015b60405180910390f35b61018c610187366004611d6f565b610326565b6040516101709190611df0565b6101ac6101a7366004611e03565b610363565b005b61018c6103f7565b600d54610166565b600a546001600160a01b03165b6040516001600160a01b039091168152602001610170565b6101ac610485565b61018c6104bb565b7f00000000000000000000000000000000000000000000000000000000000000006101cb565b610166610227366004611e25565b6104c8565b61018c6104e9565b6006546001600160a01b03166101cb565b6101ac610253366004611e68565b6104f6565b600e54610166565b61029361026e366004611e25565b600860205260009081526040902080546001909101546001600160a01b039091169082565b604080516001600160a01b039093168352602083019190915201610170565b6101ac6102c0366004611e03565b610975565b600b54610166565b6103e8610166565b61018c6102e3366004611d6f565b610b82565b61018c610b98565b600c54610166565b6101ac610306366004611eb7565b610ba5565b6101ac610319366004611ee1565b610d80565b6101ac610e1b565b6060601561033c836001600160801b0316610e99565b60405160200161034d929190611f4d565b6040516020818303038152906040529050919050565b6006546001600160a01b031633146103965760405162461bcd60e51b815260040161038d90611ffb565b60405180910390fd5b600b8290556103ad67016345785d8a000082612046565b600c81905560405133917f8e7e22d2820965fa1a8fa3ad76db76127e2f1baaf65f50c4e267f28b2254f7cb916103eb91868252602082015260400190565b60405180910390a25050565b6012805461040490611efc565b80601f016020809104026020016040519081016040528092919081815260200182805461043090611efc565b801561047d5780601f106104525761010080835404028352916020019161047d565b820191906000526020600020905b81548152906001019060200180831161046057829003601f168201915b505050505081565b6006546001600160a01b031633146104af5760405162461bcd60e51b815260040161038d90611ffb565b6104b96000610f9f565b565b6014805461040490611efc565b600981815481106104d857600080fd5b600091825260209091200154905081565b6015805461040490611efc565b601054600160a01b900460ff1661056b57600a546001600160a01b0316331461056b5760405162461bcd60e51b815260206004820152602160248201527f43616e206f6e6c792062652063616c6c656420627920534c41526567697374726044820152607960f81b606482015260840161038d565b600260075414156105be5760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604482015260640161038d565b6002600755600b546106005760405162461bcd60e51b815260206004820152600b60248201526a5f6a6f624920656d70747960a81b604482015260640161038d565b8282156106485761064361061c6006546001600160a01b031690565b30600c546106326002546001600160a01b031690565b6001600160a01b0316929190610ff1565b610662565b6106628230600c546106326002546001600160a01b031690565b6000610678600b543063bc0bfc0060e01b611051565b9050600080600f60009054906101000a90046001600160a01b03166001600160a01b031663ffa61235856001600160a01b03166346e0fbae6040518163ffffffff1660e01b815260040160206040518083038186803b1580156106da57600080fd5b505afa1580156106ee573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107129190612065565b8a6040518363ffffffff1660e01b815260040161073092919061209c565b604080518083038186803b15801561074757600080fd5b505afa15801561075b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061077f91906120c8565b915091506107c4604051806040016040528060148152602001731cdb1857db5bdb9a5d1bdc9a5b99d7dcdd185c9d60621b8152506107bc84611078565b859190611176565b6107fb604051806040016040528060128152602001711cdb1857db5bdb9a5d1bdc9a5b99d7d95b9960721b8152506107bc83611078565b61082b6040518060400160405280600b81526020016a736c615f6164647265737360a81b8152506107bc89611199565b61085e6040518060400160405280600c81526020016b6e6574776f726b5f6e616d6560a01b8152506107bc601154611384565b600061088d7f000000000000000000000000000000000000000000000000000000000000000085600c546114b4565b6009805460018082019092557f6e1540171b6c0c960b71a7020d9f60077f6af931a8bbf590da0223dacf75c7af018290556040805180820182526001600160a01b038c8116825260208083018f815260008781526008909252938120925183546001600160a01b0319169216919091178255915190830155600d805493945091926109199084906120ec565b9091555050600d5460408051918252602082018390526001600160a01b038816917feab5eb77e722078f3fab7eb6a77c74f7001181e1e3a74d51b7b5747ee1b31cb9910160405180910390a25050600160075550505050505050565b600260075414156109c85760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604482015260640161038d565b600260075560008281526005602052604090205482906001600160a01b03163314610a465760405162461bcd60e51b815260206004820152602860248201527f536f75726365206d75737420626520746865206f7261636c65206f6620746865604482015267081c995c5d595cdd60c21b606482015260840161038d565b60008181526005602052604080822080546001600160a01b03191690555182917f7cc135e0cebb02c3480ae5d74d377283180a2601f8f644edf7987b009316c63a91a26000838152600860209081526040918290208251808401845281546001600160a01b031680825260019092015481840181905284519081529283018690529286927f56514ef6e1ffd0f970ebf32dc181e476384e6e53a8351719040b4030318a933b910160405180910390a36001600e6000828254610b0891906120ec565b909155505080516020820151604051636bd2e21160e11b81526004810186905260248101919091526001600160a01b039091169063d7a5c42290604401600060405180830381600087803b158015610b5f57600080fd5b505af1158015610b73573d6000803e3d6000fd5b50506001600755505050505050565b6060601361033c836001600160801b0316610e99565b6013805461040490611efc565b60108054600160a01b60ff60a01b1982161790915560405163ab9a81a560e01b81526001600160a01b038481166004830152602482018490529091169063ab9a81a59060440160206040518083038186803b158015610c0357600080fd5b505afa158015610c17573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c3b9190612104565b610c875760405162461bcd60e51b815260206004820152601b60248201527f5374616b6552656769737472793a206e6f742076657269666965640000000000604482015260640161038d565b6040516320c876ef60e11b81526004810182905282906000906001600160a01b03831690634190edde9060240160606040518083038186803b158015610ccc57600080fd5b505afa158015610ce0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d049190612121565b925060009150610d119050565b816002811115610d2357610d23612086565b14610d605760405162461bcd60e51b815260206004820152600d60248201526c14d3104e881d995c9a599a5959609a1b604482015260640161038d565b610d6d83856000336104f6565b50506010805460ff60a01b191690555050565b6006546001600160a01b03163314610daa5760405162461bcd60e51b815260040161038d90611ffb565b6001600160a01b038116610e0f5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161038d565b610e1881610f9f565b50565b600a546001600160a01b031615610e855760405162461bcd60e51b815260206004820152602860248201527f534c41526567697374727920616464726573732068617320616c7265616479206044820152671899595b881cd95d60c21b606482015260840161038d565b600a80546001600160a01b03191633179055565b606081610ebd5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610ee75780610ed18161215e565b9150610ee09050600a8361218f565b9150610ec1565b60008167ffffffffffffffff811115610f0257610f026121a3565b6040519080825280601f01601f191660200182016040528015610f2c576020820181803683370190505b5090505b8415610f9757610f416001836121b9565b9150610f4e600a866121d0565b610f599060306120ec565b60f81b818381518110610f6e57610f6e6121e4565b60200101906001600160f81b031916908160001a905350610f90600a8661218f565b9450610f30565b949350505050565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b604080516001600160a01b0385811660248301528416604482015260648082018490528251808303909101815260849091019091526020810180516001600160e01b03166323b872dd60e01b17905261104b908590611547565b50505050565b611059611d34565b611061611d34565b61106d81868686611619565b9150505b9392505050565b60608161109c5750506040805180820190915260018152600360fc1b602082015290565b8160005b81156110c657806110b08161215e565b91506110bf9050600a8361218f565b91506110a0565b60008167ffffffffffffffff8111156110e1576110e16121a3565b6040519080825280601f01601f19166020018201604052801561110b576020820181803683370190505b5090505b8415610f97576111206001836121b9565b915061112d600a866121d0565b6111389060306120ec565b60f81b81838151811061114d5761114d6121e4565b60200101906001600160f81b031916908160001a90535061116f600a8661218f565b945061110f565b60808301516111859083611656565b60808301516111949082611656565b505050565b604080518082018252601081526f181899199a1a9b1b9c1cb0b131b232b360811b60208201528151602a80825260608281019094526001600160a01b0385169291600091602082018180368337019050509050600360fc1b81600081518110611204576112046121e4565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110611233576112336121e4565b60200101906001600160f81b031916908160001a90535060005b601481101561137b578260048561126584600c6120ec565b60208110611275576112756121e4565b1a60f81b6001600160f81b031916901c60f81c60ff168151811061129b5761129b6121e4565b01602001516001600160f81b031916826112b6836002612046565b6112c19060026120ec565b815181106112d1576112d16121e4565b60200101906001600160f81b031916908160001a90535082846112f583600c6120ec565b60208110611305576113056121e4565b825191901a600f1690811061131c5761131c6121e4565b01602001516001600160f81b03191682611337836002612046565b6113429060036120ec565b81518110611352576113526121e4565b60200101906001600160f81b031916908160001a905350806113738161215e565b91505061124d565b50949350505050565b606060005b60208160ff161080156113bd5750828160ff16602081106113ac576113ac6121e4565b1a60f81b6001600160f81b03191615155b156113d457806113cc816121fa565b915050611389565b60008160ff1667ffffffffffffffff8111156113f2576113f26121a3565b6040519080825280601f01601f19166020018201604052801561141c576020820181803683370190505b509050600091505b60208260ff161080156114585750838260ff1660208110611447576114476121e4565b1a60f81b6001600160f81b03191615155b1561107157838260ff1660208110611472576114726121e4565b1a60f81b818360ff168151811061148b5761148b6121e4565b60200101906001600160f81b031916908160001a905350816114ac816121fa565b925050611424565b6004546000906114c58160016120ec565b600455835160408086015160808701515191516000936320214ca360e11b936114fd9386938493923092918a9160019160240161221a565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152905061153d8683868461166d565b9695505050505050565b600061159c826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166117da9092919063ffffffff16565b80519091501561119457808060200190518101906115ba9190612104565b6111945760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b606482015260840161038d565b611621611d34565b61163185608001516101006117e9565b50509183526001600160a01b031660208301526001600160e01b031916604082015290565b6116638260038351611854565b6111948282611963565b6040516bffffffffffffffffffffffff193060601b1660208201526034810184905260009060540160408051808303601f1901815282825280516020918201206000818152600590925291812080546001600160a01b0319166001600160a01b038a1617905590925082917fb5e6e01e79f91267dc17b4e6314d5d4d03593d2ceee0fbb452b750bd70ea5af99190a2600254604051630200057560e51b81526001600160a01b0390911690634000aea09061173090889087908790600401612282565b602060405180830381600087803b15801561174a57600080fd5b505af115801561175e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117829190612104565b610f975760405162461bcd60e51b815260206004820152602360248201527f756e61626c6520746f207472616e73666572416e6443616c6c20746f206f7261604482015262636c6560e81b606482015260840161038d565b6060610f97848460008561198a565b6040805180820190915260608152600060208201526118096020836121d0565b15611831576118196020836121d0565b6118249060206121b9565b61182e90836120ec565b91505b506020808301829052604080518085526000815283019091019052815b92915050565b60178167ffffffffffffffff16116118795761104b8360e0600585901b168317611abb565b60ff8167ffffffffffffffff16116118b7576118a0836018611fe0600586901b1617611abb565b5061104b8367ffffffffffffffff83166001611ae0565b61ffff8167ffffffffffffffff16116118f6576118df836019611fe0600586901b1617611abb565b5061104b8367ffffffffffffffff83166002611ae0565b63ffffffff8167ffffffffffffffff16116119375761192083601a611fe0600586901b1617611abb565b5061104b8367ffffffffffffffff83166004611ae0565b61194c83601b611fe0600586901b1617611abb565b5061104b8367ffffffffffffffff83166008611ae0565b60408051808201909152606081526000602082015261107183846000015151848551611b06565b6060824710156119eb5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b606482015260840161038d565b6001600160a01b0385163b611a425760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161038d565b600080866001600160a01b03168587604051611a5e91906122b2565b60006040518083038185875af1925050503d8060008114611a9b576040519150601f19603f3d011682016040523d82523d6000602084013e611aa0565b606091505b5091509150611ab0828286611bf0565b979650505050505050565b6040805180820190915260608152600060208201526110718384600001515184611c29565b604080518082019091526060815260006020820152610f97848560000151518585611c85565b6040805180820190915260608152600060208201528251821115611b2957600080fd5b6020850151611b3883866120ec565b1115611b6b57611b6b85611b5b87602001518786611b5691906120ec565b611d06565b611b66906002612046565b611d1d565b600080865180518760208301019350808887011115611b8a5787860182525b505050602084015b60208410611bca5780518252611ba96020836120ec565b9150611bb66020826120ec565b9050611bc36020856121b9565b9350611b92565b51815160001960208690036101000a019081169019919091161790525083949350505050565b60608315611bff575081611071565b825115611c0f5782518084602001fd5b8160405162461bcd60e51b815260040161038d9190611df0565b60408051808201909152606081526000602082015283602001518310611c5e57611c5e8485602001516002611b669190612046565b835180516020858301018481535080851415611c7b576001810182525b5093949350505050565b6040805180820190915260608152600060208201526020850151611ca985846120ec565b1115611cbd57611cbd85611b5b86856120ec565b60006001611ccd846101006123b2565b611cd791906121b9565b9050855183868201018583198251161781525080518487011115611cfb5783860181525b509495945050505050565b600081831115611d1757508161184e565b50919050565b8151611d2983836117e9565b5061104b8382611963565b6040805160a0810182526000808252602080830182905282840182905260608084018390528451808601909552845283015290608082015290565b600060208284031215611d8157600080fd5b81356001600160801b038116811461107157600080fd5b60005b83811015611db3578181015183820152602001611d9b565b8381111561104b5750506000910152565b60008151808452611ddc816020860160208601611d98565b601f01601f19169290920160200192915050565b6020815260006110716020830184611dc4565b60008060408385031215611e1657600080fd5b50508035926020909101359150565b600060208284031215611e3757600080fd5b5035919050565b80356001600160a01b0381168114611e5557600080fd5b919050565b8015158114610e1857600080fd5b60008060008060808587031215611e7e57600080fd5b84359350611e8e60208601611e3e565b92506040850135611e9e81611e5a565b9150611eac60608601611e3e565b905092959194509250565b60008060408385031215611eca57600080fd5b611ed383611e3e565b946020939093013593505050565b600060208284031215611ef357600080fd5b61107182611e3e565b600181811c90821680611f1057607f821691505b60208210811415611d1757634e487b7160e01b600052602260045260246000fd5b60008151611f43818560208601611d98565b9290920192915050565b600080845481600182811c915080831680611f6957607f831692505b6020808410821415611f8957634e487b7160e01b86526022600452602486fd5b818015611f9d5760018114611fae57611fdb565b60ff19861689528489019650611fdb565b60008b81526020902060005b86811015611fd35781548b820152908501908301611fba565b505084890196505b50505050505061106d611ff582602d60f81b815260010190565b85611f31565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b634e487b7160e01b600052601160045260246000fd5b600081600019048311821515161561206057612060612030565b500290565b60006020828403121561207757600080fd5b81516006811061107157600080fd5b634e487b7160e01b600052602160045260246000fd5b60408101600684106120be57634e487b7160e01b600052602160045260246000fd5b9281526020015290565b600080604083850312156120db57600080fd5b505080516020909101519092909150565b600082198211156120ff576120ff612030565b500190565b60006020828403121561211657600080fd5b815161107181611e5a565b60008060006060848603121561213657600080fd5b835192506020840151915060408401516003811061215357600080fd5b809150509250925092565b600060001982141561217257612172612030565b5060010190565b634e487b7160e01b600052601260045260246000fd5b60008261219e5761219e612179565b500490565b634e487b7160e01b600052604160045260246000fd5b6000828210156121cb576121cb612030565b500390565b6000826121df576121df612179565b500690565b634e487b7160e01b600052603260045260246000fd5b600060ff821660ff81141561221157612211612030565b60010192915050565b6001600160a01b0389811682526020820189905260408201889052861660608201526001600160e01b03198516608082015260a0810184905260c0810183905261010060e0820181905260009061227383820185611dc4565b9b9a5050505050505050505050565b60018060a01b03841681528260208201526060604082015260006122a96060830184611dc4565b95945050505050565b600082516122c4818460208701611d98565b9190910192915050565b600181815b808511156123095781600019048211156122ef576122ef612030565b808516156122fc57918102915b93841c93908002906122d3565b509250929050565b6000826123205750600161184e565b8161232d5750600061184e565b8160018114612343576002811461234d57612369565b600191505061184e565b60ff84111561235e5761235e612030565b50506001821b61184e565b5060208310610133831016604e8410600b841016171561238c575081810a61184e565b61239683836122ce565b80600019048211156123aa576123aa612030565b029392505050565b6000611071838361231156fea264697066735822122024485d223d3263d4499a31c9f9ba137537d1e4b527af5f3702ec7959709d9c6764736f6c63430008090033";

export class StakingAprOracle__factory extends ContractFactory {
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
  ): Promise<StakingAprOracle> {
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
    ) as Promise<StakingAprOracle>;
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
  attach(address: string): StakingAprOracle {
    return super.attach(address) as StakingAprOracle;
  }
  connect(signer: Signer): StakingAprOracle__factory {
    return super.connect(signer) as StakingAprOracle__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakingAprOracleInterface {
    return new utils.Interface(_abi) as StakingAprOracleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StakingAprOracle {
    return new Contract(address, _abi, signerOrProvider) as StakingAprOracle;
  }
}
