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
import type { BaseMessenger, BaseMessengerInterface } from "../BaseMessenger";

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
    stateMutability: "view",
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
  "0x60a060405260016004556010805460ff60a01b191690553480156200002357600080fd5b50604051620025793803806200257983398101604081905262000046916200030d565b60006200005b6001600160e01b036200017f16565b600680546001600160a01b0319166001600160a01b038316908117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3506001600755620000c2896001600160e01b036200018416565b6001600160601b031960608b901b1660805267016345785d8a00008802600c55600f80546001600160a01b038981166001600160a01b0319928316179092556010805492891692909116919091179055601185905583516200012c906012906020870190620001a6565b50825162000142906013906020860190620001a6565b50815162000158906014906020850190620001a6565b5080516200016e906015906020840190620001a6565b505050505050505050505062000426565b335b90565b600280546001600160a01b0319166001600160a01b0392909216919091179055565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620001e957805160ff191683800117855562000219565b8280016001018555821562000219579182015b8281111562000219578251825591602001919060010190620001fc565b50620002279291506200022b565b5090565b6200018191905b8082111562000227576000815560010162000232565b80516001600160a01b03811681146200026057600080fd5b92915050565b600082601f83011262000277578081fd5b81516001600160401b03808211156200028e578283fd5b6040516020601f8401601f1916820181018381118382101715620002b0578586fd5b80604052508194508382528681858801011115620002cd57600080fd5b600092505b83831015620002f15785830181015182840182015291820191620002d2565b83831115620003035760008185840101525b5050505092915050565b6000806000806000806000806000806101408b8d0312156200032d578586fd5b620003398c8c62000248565b99506200034a8c60208d0162000248565b985060408b01519750620003628c60608d0162000248565b9650620003738c60808d0162000248565b60a08c015160c08d015191975095506001600160401b038082111562000397578586fd5b620003a58e838f0162000266565b955060e08d0151915080821115620003bb578485fd5b620003c98e838f0162000266565b94506101008d0151915080821115620003e0578384fd5b620003ee8e838f0162000266565b93506101208d015191508082111562000405578283fd5b50620004148d828e0162000266565b9150509295989b9194979a5092959850565b60805160601c612130620004496000398061052852806108ad52506121306000f3fe608060405234801561001057600080fd5b50600436106101585760003560e01c806397a82192116100c3578063cb8d3fcf1161007c578063cb8d3fcf1461026f578063ccb1637c14610282578063ddca3f431461028a578063e450f06114610292578063f2fde38b146102a5578063f3881589146102b857610158565b806397a8219214610210578063a50c542514610223578063ae401eb91461022b578063bc0bfc001461024c578063c2939d971461025f578063c9b0cb221461026757610158565b8063715018a611610115578063715018a6146101d557806376ff294b146101dd5780637dc0d1d0146101e557806381d12c58146101ed5780638b6bd736146102005780638da5cb5b1461020857610158565b8063107bf28c1461015d57806311971c461461017b578063292733bf1461019b57806346cd6801146101b0578063663c2269146101b85780636e71890d146101c0575b600080fd5b6101656102c0565b6040516101729190611d56565b60405180910390f35b61018e610189366004611aa0565b6102c6565b6040516101729190611d85565b6101ae6101a9366004611a60565b610304565b005b61018e61039f565b61016561042d565b6101c8610433565b6040516101729190611c6d565b6101ae610442565b61018e6104cb565b6101c8610526565b6101656101fb366004611a48565b61054a565b61018e610568565b6101c86105c3565b6101ae61021e366004611ac7565b6105d2565b6101656109a6565b61023e610239366004611a48565b6109ac565b604051610172929190611ca5565b6101ae61025a366004611a60565b6109d1565b610165610b65565b610165610b6b565b61018e61027d366004611aa0565b610b71565b61018e610b87565b610165610be2565b6101ae6102a0366004611a02565b610be8565b6101ae6102b33660046119e7565b610d6f565b6101ae610e30565b60115481565b606060156102dc836001600160801b0316610e6d565b6040516020016102ed929190611be1565b60405160208183030381529060405290505b919050565b61030c610f48565b6001600160a01b031661031d6105c3565b6001600160a01b03161461034c5760405162461bcd60e51b815260040161034390611f73565b60405180910390fd5b600b82905567016345785d8a00008102600c81905560405133917f8e7e22d2820965fa1a8fa3ad76db76127e2f1baaf65f50c4e267f28b2254f7cb91610393918691611d5f565b60405180910390a25050565b6012805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156104255780601f106103fa57610100808354040283529160200191610425565b820191906000526020600020905b81548152906001019060200180831161040857829003601f168201915b505050505081565b600d5490565b600a546001600160a01b031690565b61044a610f48565b6001600160a01b031661045b6105c3565b6001600160a01b0316146104815760405162461bcd60e51b815260040161034390611f73565b6006546040516000916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600680546001600160a01b0319169055565b6014805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156104255780601f106103fa57610100808354040283529160200191610425565b7f000000000000000000000000000000000000000000000000000000000000000090565b6009818154811061055757fe5b600091825260209091200154905081565b6015805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156104255780601f106103fa57610100808354040283529160200191610425565b6006546001600160a01b031690565b601054600160a01b900460ff1661060d57600a546001600160a01b0316331461060d5760405162461bcd60e51b815260040161034390611f32565b600260075414156106305760405162461bcd60e51b815260040161034390612071565b6002600755600b546106545760405162461bcd60e51b815260040161034390611d98565b82821561068e576106896106666105c3565b30600c54610672610f4c565b6001600160a01b031692919063ffffffff610f5b16565b61069e565b61069e8230600c54610672610f4c565b6106a661196a565b600b546106ba9030622f02ff60ea1b610fb9565b9050600080600f60009054906101000a90046001600160a01b03166001600160a01b031663ffa61235856001600160a01b03166346e0fbae6040518163ffffffff1660e01b815260040160206040518083038186803b15801561071c57600080fd5b505afa158015610730573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107549190611a81565b8a6040518363ffffffff1660e01b8152600401610772929190611d6d565b604080518083038186803b15801561078957600080fd5b505afa15801561079d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107c19190611b19565b9150915061080c604051806040016040528060148152602001731cdb1857db5bdb9a5d1bdc9a5b99d7dcdd185c9d60621b8152506107fe84610e6d565b85919063ffffffff610fe616565b610843604051806040016040528060128152602001711cdb1857db5bdb9a5d1bdc9a5b99d7d95b9960721b8152506107fe83610e6d565b6108736040518060400160405280600b81526020016a736c615f6164647265737360a81b8152506107fe89611015565b6108a66040518060400160405280600c81526020016b6e6574776f726b5f6e616d6560a01b8152506107fe601154611191565b60006108d57f000000000000000000000000000000000000000000000000000000000000000085600c54611297565b6009805460018082019092557f6e1540171b6c0c960b71a7020d9f60077f6af931a8bbf590da0223dacf75c7af018290556040805180820182526001600160a01b038c8116825260208083018f81526000878152600890925290849020925183546001600160a01b0319169083161783555191840191909155600d80549093019283905590519293508816917feab5eb77e722078f3fab7eb6a77c74f7001181e1e3a74d51b7b5747ee1b31cb99161098e918590611d5f565b60405180910390a25050600160075550505050505050565b600e5490565b600860205260009081526040902080546001909101546001600160a01b039091169082565b600260075414156109f45760405162461bcd60e51b815260040161034390612071565b600260075560008281526005602052604090205482906001600160a01b03163314610a315760405162461bcd60e51b815260040161034390611fdf565b60008181526005602052604080822080546001600160a01b03191690555182917f7cc135e0cebb02c3480ae5d74d377283180a2601f8f644edf7987b009316c63a91a2610a7c61199f565b506000838152600860209081526040918290208251808401845281546001600160a01b0316808252600190920154928101839052925186927f56514ef6e1ffd0f970ebf32dc181e476384e6e53a8351719040b4030318a933b91610ae291908890611d5f565b60405180910390a3600e8054600101905580516020820151604051636bd2e21160e11b81526001600160a01b039092169163d7a5c42291610b2891879190600401611d5f565b600060405180830381600087803b158015610b4257600080fd5b505af1158015610b56573d6000803e3d6000fd5b50506001600755505050505050565b600b5490565b6103e890565b606060136102dc836001600160801b0316610e6d565b6013805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156104255780601f106103fa57610100808354040283529160200191610425565b600c5490565b6010805460ff60a01b1916600160a01b179081905560405163ab9a81a560e01b81526001600160a01b039091169063ab9a81a590610c2c9085908590600401611ca5565b60206040518083038186803b158015610c4457600080fd5b505afa158015610c58573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c7c9190611a2c565b610c985760405162461bcd60e51b815260040161034390611e46565b6040516320c876ef60e11b815282906000906001600160a01b03831690634190edde90610cc9908690600401611d56565b60606040518083038186803b158015610ce157600080fd5b505afa158015610cf5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d199190611b3c565b925060009150610d269050565b816002811115610d3257fe5b14610d4f5760405162461bcd60e51b815260040161034390611e7d565b610d5c83856000336105d2565b50506010805460ff60a01b191690555050565b610d77610f48565b6001600160a01b0316610d886105c3565b6001600160a01b031614610dae5760405162461bcd60e51b815260040161034390611f73565b6001600160a01b038116610dd45760405162461bcd60e51b815260040161034390611dbd565b6006546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3600680546001600160a01b0319166001600160a01b0392909216919091179055565b600a546001600160a01b031615610e595760405162461bcd60e51b815260040161034390611eea565b600a80546001600160a01b03191633179055565b60608180610e945750506040805180820190915260018152600360fc1b60208201526102ff565b8060005b8115610eac57600101600a82049150610e98565b60608167ffffffffffffffff81118015610ec557600080fd5b506040519080825280601f01601f191660200182016040528015610ef0576020820181803683370190505b50905060001982015b8415610f3e57600a850660300160f81b82828060019003935081518110610f1c57fe5b60200101906001600160f81b031916908160001a905350600a85049450610ef9565b5095945050505050565b3390565b6002546001600160a01b031690565b610fb3846323b872dd60e01b858585604051602401610f7c93929190611c81565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b0319909316929092179091526113d6565b50505050565b610fc161196a565b610fc961196a565b610fdb8186868663ffffffff61146516565b9150505b9392505050565b6080830151610ffb908363ffffffff6114a216565b6080830151611010908263ffffffff6114a216565b505050565b604080518082018252601081526f181899199a1a9b1b9c1cb0b131b232b360811b60208201528151602a80825260608281019094526001600160a01b03851692918491602082018180368337019050509050600360fc1b8160008151811061107957fe5b60200101906001600160f81b031916908160001a905350600f60fb1b816001815181106110a257fe5b60200101906001600160f81b031916908160001a90535060005b6014811015611188578260048583600c01602081106110d757fe5b1a60f81b6001600160f81b031916901c60f81c60ff16815181106110f757fe5b602001015160f81c60f81b82826002026002018151811061111457fe5b60200101906001600160f81b031916908160001a905350828482600c016020811061113b57fe5b825191901a600f1690811061114c57fe5b602001015160f81c60f81b82826002026003018151811061116957fe5b60200101906001600160f81b031916908160001a9053506001016110bc565b50949350505050565b606060005b60208160ff161080156111c45750828160ff16602081106111b357fe5b1a60f81b6001600160f81b03191615155b156111d157600101611196565b60608160ff1667ffffffffffffffff811180156111ed57600080fd5b506040519080825280601f01601f191660200182016040528015611218576020820181803683370190505b509050600091505b60208260ff1610801561124e5750838260ff166020811061123d57fe5b1a60f81b6001600160f81b03191615155b15610fdf57838260ff166020811061126257fe5b1a60f81b818360ff168151811061127557fe5b60200101906001600160f81b031916908160001a905350600190910190611220565b6000306004546040516020016112ae929190611bbf565b60408051808303601f19018152918152815160209283012060045460608701526000818152600590935281832080546001600160a01b0319166001600160a01b038916179055905190925082917fb5e6e01e79f91267dc17b4e6314d5d4d03593d2ceee0fbb452b750bd70ea5af991a26002546001600160a01b0316634000aea0858461133a876114bf565b6040518463ffffffff1660e01b815260040161135893929190611d26565b602060405180830381600087803b15801561137257600080fd5b505af1158015611386573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113aa9190611a2c565b6113c65760405162461bcd60e51b815260040161034390611e03565b6004805460010190559392505050565b606061142b826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b031661153b9092919063ffffffff16565b80519091501561101057808060200190518101906114499190611a2c565b6110105760405162461bcd60e51b815260040161034390612027565b61146d61196a565b61147d8560800151610100611552565b50509183526001600160a01b031660208301526001600160e01b031916604082015290565b6114af8260038351611592565b611010828263ffffffff61169c16565b6060634042994660e01b60008084600001518560200151866040015187606001516001896080015160000151604051602401611502989796959493929190611cbe565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b0319909316929092179091529050919050565b606061154a84846000856116b6565b949350505050565b61155a6119b6565b602082061561156f5760208206602003820191505b506020808301829052604080518085526000815283019091019052815b92915050565b601781116115b9576115b38360e0600585901b16831763ffffffff61177716565b50611010565b60ff81116115ef576115dc836018611fe0600586901b161763ffffffff61177716565b506115b38382600163ffffffff61178f16565b61ffff811161162657611613836019611fe0600586901b161763ffffffff61177716565b506115b38382600263ffffffff61178f16565b63ffffffff811161165f5761164c83601a611fe0600586901b161763ffffffff61177716565b506115b38382600463ffffffff61178f16565b67ffffffffffffffff81116110105761168983601b611fe0600586901b161763ffffffff61177716565b50610fb38382600863ffffffff61178f16565b6116a46119b6565b610fdf838460000151518485516117a8565b6060824710156116d85760405162461bcd60e51b815260040161034390611ea4565b6116e185611854565b6116fd5760405162461bcd60e51b815260040161034390611fa8565b60006060866001600160a01b0316858760405161171a9190611ba3565b60006040518083038185875af1925050503d8060008114611757576040519150601f19603f3d011682016040523d82523d6000602084013e61175c565b606091505b509150915061176c82828661185a565b979650505050505050565b61177f6119b6565b610fdf8384600001515184611893565b6117976119b6565b61154a8485600001515185856118de565b6117b06119b6565b82518211156117be57600080fd5b846020015182850111156117e8576117e8856117e0876020015187860161193c565b600202611953565b6000808651805187602083010193508088870111156118075787860182525b505050602084015b6020841061182e5780518252601f19909301926020918201910161180f565b51815160001960208690036101000a019081169019919091161790525083949350505050565b3b151590565b60608315611869575081610fdf565b8251156118795782518084602001fd5b8160405162461bcd60e51b81526004016103439190611d85565b61189b6119b6565b836020015183106118b7576118b7848560200151600202611953565b8351805160208583010184815350808514156118d4576001810182525b5093949350505050565b6118e66119b6565b846020015184830111156119035761190385858401600202611953565b60006001836101000a0390508551838682010185831982511617815250805184870111156119315783860181525b509495945050505050565b60008183111561194d57508161158c565b50919050565b815161195f8383611552565b50610fb3838261169c565b6040805160a08101825260008082526020820181905291810182905260608101919091526080810161199a6119b6565b905290565b604080518082019091526000808252602082015290565b604051806040016040528060608152602001600081525090565b80356001600160a01b038116811461158c57600080fd5b6000602082840312156119f8578081fd5b610fdf83836119d0565b60008060408385031215611a14578081fd5b611a1e84846119d0565b946020939093013593505050565b600060208284031215611a3d578081fd5b8151610fdf816120ec565b600060208284031215611a59578081fd5b5035919050565b60008060408385031215611a72578182fd5b50508035926020909101359150565b600060208284031215611a92578081fd5b815160068110610fdf578182fd5b600060208284031215611ab1578081fd5b81356001600160801b0381168114610fdf578182fd5b60008060008060808587031215611adc578182fd5b843593506020850135611aee816120d4565b92506040850135611afe816120ec565b91506060850135611b0e816120d4565b939692955090935050565b60008060408385031215611b2b578182fd5b505080516020909101519092909150565b600080600060608486031215611b50578283fd5b8351925060208401519150604084015160038110611b6c578182fd5b809150509250925092565b60008151808452611b8f8160208601602086016120a8565b601f01601f19169290920160200192915050565b60008251611bb58184602087016120a8565b9190910192915050565b60609290921b6bffffffffffffffffffffffff19168252601482015260340190565b6000808454600180821660008114611c005760018114611c1757611c46565b60ff198316865260028304607f1686019350611c46565b600283048886526020808720875b83811015611c3e5781548a820152908501908201611c25565b505050860193505b50602d60f81b835285519150611c6282828501602089016120a8565b910101949350505050565b6001600160a01b0391909116815260200190565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6001600160a01b03929092168252602082015260400190565b6001600160a01b0389811682526020820189905260408201889052861660608201526001600160e01b03198516608082015260a0810184905260c0810183905261010060e08201819052600090611d1783820185611b77565b9b9a5050505050505050505050565b600060018060a01b038516825283602083015260606040830152611d4d6060830184611b77565b95945050505050565b90815260200190565b918252602082015260400190565b6040810160068410611d7b57fe5b9281526020015290565b600060208252610fdf6020830184611b77565b6020808252600b908201526a5f6a6f624920656d70747960a81b604082015260600190565b60208082526026908201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160408201526564647265737360d01b606082015260800190565b60208082526023908201527f756e61626c6520746f207472616e73666572416e6443616c6c20746f206f7261604082015262636c6560e81b606082015260800190565b6020808252601b908201527f5374616b6552656769737472793a206e6f742076657269666965640000000000604082015260600190565b6020808252600d908201526c14d3104e881d995c9a599a5959609a1b604082015260600190565b60208082526026908201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6040820152651c8818d85b1b60d21b606082015260800190565b60208082526028908201527f534c41526567697374727920616464726573732068617320616c7265616479206040820152671899595b881cd95d60c21b606082015260800190565b60208082526021908201527f43616e206f6e6c792062652063616c6c656420627920534c41526567697374726040820152607960f81b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b6020808252601d908201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604082015260600190565b60208082526028908201527f536f75726365206d75737420626520746865206f7261636c65206f6620746865604082015267081c995c5d595cdd60c21b606082015260800190565b6020808252602a908201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6040820152691bdd081cdd58d8d9595960b21b606082015260800190565b6020808252601f908201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604082015260600190565b60005b838110156120c35781810151838201526020016120ab565b83811115610fb35750506000910152565b6001600160a01b03811681146120e957600080fd5b50565b80151581146120e957600080fdfea2646970667358221220868d2c08fb898d9136485a733ecff20a0c01c2983e75d9088ce401c2b96aa6c864736f6c63430006060033";

export class BaseMessenger__factory extends ContractFactory {
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
  ): Promise<BaseMessenger> {
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
    ) as Promise<BaseMessenger>;
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
  attach(address: string): BaseMessenger {
    return super.attach(address) as BaseMessenger;
  }
  connect(signer: Signer): BaseMessenger__factory {
    return super.connect(signer) as BaseMessenger__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BaseMessengerInterface {
    return new utils.Interface(_abi) as BaseMessengerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BaseMessenger {
    return new Contract(address, _abi, signerOrProvider) as BaseMessenger;
  }
}
