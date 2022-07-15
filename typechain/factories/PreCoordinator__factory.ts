/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  PreCoordinator,
  PreCoordinatorInterface,
} from "../PreCoordinator";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_link",
        type: "address",
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
        internalType: "bytes32",
        name: "saId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "payment",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "minresponses",
        type: "uint256",
      },
    ],
    name: "NewServiceAgreement",
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
        internalType: "bytes32",
        name: "saId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "answer",
        type: "int256",
      },
    ],
    name: "ServiceAgreementAnswerUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "saId",
        type: "bytes32",
      },
    ],
    name: "ServiceAgreementDeleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "saId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "payment",
        type: "uint256",
      },
    ],
    name: "ServiceAgreementRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "saId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "oracle",
        type: "address",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "answer",
        type: "int256",
      },
    ],
    name: "ServiceAgreementResponseReceived",
    type: "event",
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
        name: "_payment",
        type: "uint256",
      },
      {
        internalType: "bytes4",
        name: "_callbackFunctionId",
        type: "bytes4",
      },
      {
        internalType: "uint256",
        name: "_expiration",
        type: "uint256",
      },
    ],
    name: "cancelOracleRequest",
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
        internalType: "int256",
        name: "_data",
        type: "int256",
      },
    ],
    name: "chainlinkCallback",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_minResponses",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_oracles",
        type: "address[]",
      },
      {
        internalType: "bytes32[]",
        name: "_jobIds",
        type: "bytes32[]",
      },
      {
        internalType: "uint256[]",
        name: "_payments",
        type: "uint256[]",
      },
    ],
    name: "createServiceAgreement",
    outputs: [
      {
        internalType: "bytes32",
        name: "saId",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getChainlinkToken",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "_saId",
        type: "bytes32",
      },
    ],
    name: "getServiceAgreement",
    outputs: [
      {
        internalType: "uint256",
        name: "totalPayment",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minResponses",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "oracles",
        type: "address[]",
      },
      {
        internalType: "bytes32[]",
        name: "jobIds",
        type: "bytes32[]",
      },
      {
        internalType: "uint256[]",
        name: "payments",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isOwner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "onTokenTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_payment",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_saId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "_callbackAddress",
        type: "address",
      },
      {
        internalType: "bytes4",
        name: "_callbackFunctionId",
        type: "bytes4",
      },
      {
        internalType: "uint256",
        name: "_nonce",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "oracleRequest",
    outputs: [],
    stateMutability: "nonpayable",
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
  {
    inputs: [],
    name: "withdrawLink",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405260016004553480156200001657600080fd5b5060405162002e9a38038062002e9a833981810160405260208110156200003c57600080fd5b5051600680546001600160a01b0319163317908190556040516001600160a01b0391909116906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a36001600160a01b038116620000b257620000ac6001600160e01b03620000cd16565b620000c6565b620000c6816001600160e01b036200015e16565b5062000180565b6200015c73c89bd4e1632d3a43cb03aaad5262cbe4038bc5716001600160a01b03166338cc48316040518163ffffffff1660e01b815260040160206040518083038186803b1580156200011f57600080fd5b505afa15801562000134573d6000803e3d6000fd5b505050506040513d60208110156200014b57600080fd5b50516001600160e01b036200015e16565b565b600280546001600160a01b0319166001600160a01b0392909216919091179055565b612d0a80620001906000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80638da5cb5b116100715780638da5cb5b1461031a5780638dc654a2146103225780638f32d59b1461032a578063a4c0ed3614610332578063af52c981146103eb578063f2fde38b146104f4576100a9565b8063165d35e1146100ae57806340429946146100d25780636a9705b4146101835780636ee4d553146101ba578063834b55e0146101f3575b600080fd5b6100b661051a565b604080516001600160a01b039092168252519081900360200190f35b61018160048036036101008110156100e957600080fd5b6001600160a01b038235811692602081013592604082013592606083013516916001600160e01b03196080820135169160a08201359160c081013591810190610100810160e0820135600160201b81111561014357600080fd5b82018360208201111561015557600080fd5b803590602001918460018302840111600160201b8311171561017657600080fd5b50909250905061052a565b005b6101a66004803603604081101561019957600080fd5b50803590602001356108b5565b604080519115158252519081900360200190f35b610181600480360360808110156101d057600080fd5b508035906020810135906001600160e01b03196040820135169060600135610d77565b6103086004803603608081101561020957600080fd5b81359190810190604081016020820135600160201b81111561022a57600080fd5b82018360208201111561023c57600080fd5b803590602001918460208302840111600160201b8311171561025d57600080fd5b919390929091602081019035600160201b81111561027a57600080fd5b82018360208201111561028c57600080fd5b803590602001918460208302840111600160201b831117156102ad57600080fd5b919390929091602081019035600160201b8111156102ca57600080fd5b8201836020820111156102dc57600080fd5b803590602001918460208302840111600160201b831117156102fd57600080fd5b509092509050610fe7565b60408051918252519081900360200190f35b6100b6611315565b610181611324565b6101a66114ca565b6101816004803603606081101561034857600080fd5b6001600160a01b0382351691602081013591810190606081016040820135600160201b81111561037757600080fd5b82018360208201111561038957600080fd5b803590602001918460018302840111600160201b831117156103aa57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295506114db945050505050565b6104086004803603602081101561040157600080fd5b50356116ff565b60405180868152602001858152602001806020018060200180602001848103845287818151815260200191508051906020019060200280838360005b8381101561045c578181015183820152602001610444565b50505050905001848103835286818151815260200191508051906020019060200280838360005b8381101561049b578181015183820152602001610483565b50505050905001848103825285818151815260200191508051906020019060200280838360005b838110156104da5781810151838201526020016104c2565b505050509050019850505050505050505060405180910390f35b6101816004803603602081101561050a57600080fd5b50356001600160a01b031661183e565b60006105246118a0565b90505b90565b61053261051a565b6001600160a01b0316336001600160a01b03161461058d576040805162461bcd60e51b815260206004820152601360248201527226bab9ba103ab9b2902624a725903a37b5b2b760691b604482015290519081900360640190fd5b856105966118a0565b6001600160a01b0316816001600160a01b031614156105fc576040805162461bcd60e51b815260206004820152601760248201527f43616e6e6f742063616c6c6261636b20746f204c494e4b000000000000000000604482015290519081900360640190fd5b600088815260086020526040902054808a1015610657576040805162461bcd60e51b8152602060048201526014602482015273125b9cdd59999a58da595b9d081c185e5b595b9d60621b604482015290519081900360640190fd5b604080516bffffffffffffffffffffffff1960608e901b1660208083019190915260348083018a905283518084039091018152605490920183528151918101919091206000818152600a90925291902054600160201b90046001600160a01b031615610701576040805162461bcd60e51b81526020600482015260146024820152734e6f6e636520616c726561647920696e2d75736560601b604482015290519081900360640190fd5b87600a600083815260200190815260200160002060000160006101000a81548163ffffffff021916908360e01c021790555088600a600083815260200190815260200160002060010160006101000a8154816001600160a01b0302191690836001600160a01b031602179055508b600a600083815260200190815260200160002060000160046101000a8154816001600160a01b0302191690836001600160a01b031602179055506107ea8a8287878080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506118af92505050565b818b11156108a75760006108048c8463ffffffff611b3716565b905060006108106118a0565b9050806001600160a01b031663a9059cbb8f846040518363ffffffff1660e01b815260040180836001600160a01b03166001600160a01b0316815260200182815260200192505050602060405180830381600087803b15801561087257600080fd5b505af1158015610886573d6000803e3d6000fd5b505050506040513d602081101561089c57600080fd5b50516108a457fe5b50505b505050505050505050505050565b60008281526005602052604081205483906001600160a01b0316331461090c5760405162461bcd60e51b8152600401808060200182810382526028815260200180612cad6028913960400191505060405180910390fd5b60008181526005602052604080822080546001600160a01b03191690555182917f7cc135e0cebb02c3480ae5d74d377283180a2601f8f644edf7987b009316c63a91a2610957612a96565b60008581526009602090815260408083205483526008825291829020825160a08101845281548152600182015481840152600282018054855181860281018601875281815292959394938601938301828280156109dd57602002820191906000526020600020905b81546001600160a01b031681526001909101906020018083116109bf575b5050505050815260200160038201805480602002602001604051908101604052809291908181526020018280548015610a3557602002820191906000526020600020905b815481526020019060010190808311610a21575b5050505050815260200160048201805480602002602001604051908101604052809291908181526020018280548015610a8d57602002820191906000526020600020905b815481526020019060010190808311610a79575b505050919092525050506000868152600b60209081526040808320805460098452828520805492869055949094558151898152915194955092933392859285927f6bd4bffa5426494ba16814dba4b1994c92f88f7664ad231cf8aa811fff6e925e929181900390910190a46000828152600a6020908152604082206002018054600181018255908352912001869055610b24612ac5565b6000838152600a6020908152604091829020825160808101845281546001600160e01b031960e082901b1682526001600160a01b03600160201b909104811682850152600183015416818501526002820180548551818602810186019096528086529194929360608601939290830182828015610bc057602002820191906000526020600020905b815481526020019060010190808311610bac575b50505050508152505090508360400151518160600151511415610c1c576000838152600a6020526040812080546001600160c01b03191681556001810180546001600160a01b031916905590610c196002830182612aeb565b50505b60208401516060820151516001911415610d6b576000610c3f8360600151611b99565b905084847fe991444bc589ce1a82e7cbe4e5ebaa8aaa2a5c44964bd32d2af07dd846a638ba836040518082815260200191505060405180910390a36040808401518451825160248101899052604480820186905284518083039091018152606490910184526020810180516001600160e01b03166001600160e01b0319909316929092178252925183516001600160a01b039093169392909182918083835b60208310610cfd5780518252601f199092019160209182019101610cde565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114610d5f576040519150601f19603f3d011682016040523d82523d6000602084013e610d64565b606091505b5090925050505b98975050505050505050565b6000848152600b602090815260408083208054908490556009909252822091909155610da1612ac5565b6000828152600a6020908152604091829020825160808101845281546001600160e01b031960e082901b1682526001600160a01b03600160201b909104811682850152600183015416818501526002820180548551818602810186019096528086529194929360608601939290830182828015610e3d57602002820191906000526020600020905b815481526020019060010190808311610e29575b5050505050815250509050336001600160a01b031681602001516001600160a01b031614610eb2576040805162461bcd60e51b815260206004820152601960248201527f4f6e6c79207265717565737465722063616e2063616e63656c00000000000000604482015290519081900360640190fd5b6000828152600a6020526040812080546001600160c01b03191681556001810180546001600160a01b031916905590610eee6002830182612aeb565b5050610efc86868686611bb4565b6000610f066118a0565b9050806001600160a01b031663a9059cbb8360200151886040518363ffffffff1660e01b815260040180836001600160a01b03166001600160a01b0316815260200182815260200192505050602060405180830381600087803b158015610f6c57600080fd5b505af1158015610f80573d6000803e3d6000fd5b505050506040513d6020811015610f9657600080fd5b5051610fde576040805162461bcd60e51b81526020600482015260126024820152712ab730b13632903a37903a3930b739b332b960711b604482015290519081900360640190fd5b50505050505050565b600080881161103d576040805162461bcd60e51b815260206004820152601960248201527f4d696e20726573706f6e736573206d757374206265203e203000000000000000604482015290519081900360640190fd5b858414801561104b57508582145b61108b576040805162461bcd60e51b815260206004820152600c60248201526b0aadcdacae840d8cadccee8d60a31b604482015290519081900360640190fd5b602d8611156110e1576040805162461bcd60e51b815260206004820181905260248201527f43616e6e6f742068617665206d6f7265207468616e203435206f7261636c6573604482015290519081900360640190fd5b8786101561112e576040805162461bcd60e51b8152602060048201526015602482015274496e76616c6964206d696e20726573706f6e73657360581b604482015290519081900360640190fd5b6000805b838110156111695761115f85858381811061114957fe5b9050602002013583611c8c90919063ffffffff16565b9150600101611132565b5060078054604080516020808201849052428284015282518083038401815260608301808552815191830191909120600190950190955561010082018352858552608082018e905282518c820281810183019094528c815293965060a090910192918c918c91829185019084908082843760009201919091525050509082525060408051602089810282810182019093528982529283019290918a918a9182918501908490808284376000920191909152505050908252506040805160208781028281018201909352878252928301929091889188918291850190849080828437600092018290525093909452505084815260086020908152604091829020845181558482015160018201559184015180519293506112919260028501929190910190612b09565b50606082015180516112ad916003840191602090910190612b6e565b50608082015180516112c9916004840191602090910190612b6e565b505060408051838152602081018c905281518593507f1df950b8dca286fff2ebb83642851b5a9db00ff4bc87815828e845b45d183eaf929181900390910190a250979650505050505050565b6006546001600160a01b031690565b61132c6114ca565b61137d576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b60006113876118a0565b604080516370a0823160e01b815230600482015290519192506001600160a01b0383169163a9059cbb91339184916370a08231916024808301926020929190829003018186803b1580156113da57600080fd5b505afa1580156113ee573d6000803e3d6000fd5b505050506040513d602081101561140457600080fd5b5051604080516001600160e01b031960e086901b1681526001600160a01b03909316600484015260248301919091525160448083019260209291908290030181600087803b15801561145557600080fd5b505af1158015611469573d6000803e3d6000fd5b505050506040513d602081101561147f57600080fd5b50516114c7576040805162461bcd60e51b81526020600482015260126024820152712ab730b13632903a37903a3930b739b332b960711b604482015290519081900360640190fd5b50565b6006546001600160a01b0316331490565b6114e361051a565b6001600160a01b0316336001600160a01b03161461153e576040805162461bcd60e51b815260206004820152601360248201527226bab9ba103ab9b2902624a725903a37b5b2b760691b604482015290519081900360640190fd5b8051819060441115611590576040805162461bcd60e51b8152602060048201526016602482015275092dcecc2d8d2c840e4cae2eacae6e840d8cadccee8d60531b604482015290519081900360640190fd5b602082015182906001600160e01b031981166320214ca360e11b146115fc576040805162461bcd60e51b815260206004820152601e60248201527f4d757374207573652077686974656c69737465642066756e6374696f6e730000604482015290519081900360640190fd5b8560248501528460448501526000306001600160a01b0316856040518082805190602001908083835b602083106116445780518252601f199092019160209182019101611625565b6001836020036101000a038019825116818451168082178552505050505050905001915050600060405180830381855af49150503d80600081146116a4576040519150601f19603f3d011682016040523d82523d6000602084013e6116a9565b606091505b5050905080610fde576040805162461bcd60e51b815260206004820152601860248201527f556e61626c6520746f2063726561746520726571756573740000000000000000604482015290519081900360640190fd5b60008181526008602090815260408083208054600182015460028301805485518188028101880190965280865287966060968796879695949360038201936004909201929185919083018282801561178057602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311611762575b50505050509250818054806020026020016040519081016040528092919081815260200182805480156117d257602002820191906000526020600020905b8154815260200190600101908083116117be575b505050505091508080548060200260200160405190810160405280929190818152602001828054801561182457602002820191906000526020600020905b815481526020019060010190808311611810575b505050505090509450945094509450945091939590929450565b6118466114ca565b611897576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6114c781611ced565b6002546001600160a01b031690565b6118b7612a96565b600084815260086020908152604091829020825160a081018452815481526001820154818401526002820180548551818602810186018752818152929593949386019383018282801561193357602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311611915575b505050505081526020016003820180548060200260200160405190810160405280929190818152602001828054801561198b57602002820191906000526020600020905b815481526020019060010190808311611977575b50505050508152602001600482018054806020026020016040519081016040528092919081815260200182805480156119e357602002820191906000526020600020905b8154815260200190600101908083116119cf575b50505050508152505090506000816020015111611a47576040805162461bcd60e51b815260206004820152601960248201527f496e76616c696420736572766963652061677265656d656e7400000000000000604482015290519081900360640190fd5b611a4f612bb5565b81516040805191825251600091869188917f0d3e7811af83862cbc3778c66d787596cdb580e0dbc448d99f21c865770a8432919081900360200190a360005b836040015151811015610fde57611ac484606001518281518110611aae57fe5b602002602001015130636a9705b460e01b611d8e565b9250611ad6838663ffffffff611db916565b611b0f84604001518281518110611ae957fe5b60200260200101518486608001518481518110611b0257fe5b6020026020010151611ddc565b6000818152600b602090815260408083208a9055600990915290208890559150600101611a8e565b600082821115611b8e576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b508082035b92915050565b6000611bac611ba783611fb3565b612041565b90505b919050565b60008481526005602052604080822080546001600160a01b0319811690915590516001600160a01b039091169186917fe1fe3afa0f7f761ff0a8b89086790efd5140d2907ebd5b7ff6bfcb5e075fd4c59190a260408051636ee4d55360e01b815260048101879052602481018690526001600160e01b0319851660448201526064810184905290516001600160a01b03831691636ee4d55391608480830192600092919082900301818387803b158015611c6d57600080fd5b505af1158015611c81573d6000803e3d6000fd5b505050505050505050565b600082820183811015611ce6576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b6001600160a01b038116611d325760405162461bcd60e51b8152600401808060200182810382526026815260200180612c436026913960400191505060405180910390fd5b6006546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3600680546001600160a01b0319166001600160a01b0392909216919091179055565b611d96612bb5565b611d9e612bb5565b611db08186868663ffffffff6120ea16565b95945050505050565b611dc882608001518251612130565b50611dd782608001518261216a565b505050565b6004546040805130606090811b60208084019190915260348084018690528451808503909101815260549093018452825192810192909220908601939093526000838152600590915281812080546001600160a01b0319166001600160a01b038816179055905182917fb5e6e01e79f91267dc17b4e6314d5d4d03593d2ceee0fbb452b750bd70ea5af991a26002546001600160a01b0316634000aea08584611e8487612184565b6040518463ffffffff1660e01b815260040180846001600160a01b03166001600160a01b0316815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b83811015611eee578181015183820152602001611ed6565b50505050905090810190601f168015611f1b5780820380516001836020036101000a031916815260200191505b50945050505050602060405180830381600087803b158015611f3c57600080fd5b505af1158015611f50573d6000803e3d6000fd5b505050506040513d6020811015611f6657600080fd5b5051611fa35760405162461bcd60e51b8152600401808060200182810382526023815260200180612c696023913960400191505060405180910390fd5b6004805460010190559392505050565b606080825167ffffffffffffffff81118015611fce57600080fd5b50604051908082528060200260200182016040528015611ff8578160200160208202803683370190505b50905060005b835181101561203a5783818151811061201357fe5b602002602001015182828151811061202757fe5b6020908102919091010152600101611ffe565b5092915050565b60008151600010612092576040805162461bcd60e51b81526020600482015260166024820152756c697374206d757374206e6f7420626520656d70747960501b604482015290519081900360640190fd5b815160028104600182166120d1576000806120b78660006001870360018703876122c4565b90925090506120c682826123a2565b945050505050611baf565b6120e18460006001850384612410565b92505050611baf565b6120f2612bb5565b6121028560800151610100612130565b50508284526001600160a01b03821660208501526001600160e01b031981166040850152835b949350505050565b612138612bea565b602082061561214d5760208206602003820191505b506020828101829052604080518085526000815290920101905290565b612172612bea565b611ce6838460000151518485516124a1565b6060634042994660e01b6000808460000151856020015186604001518760600151600189608001516000015160405160240180896001600160a01b03166001600160a01b03168152602001888152602001878152602001866001600160a01b03166001600160a01b03168152602001856001600160e01b0319166001600160e01b031916815260200184815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561225257818101518382015260200161223a565b50505050905090810190601f16801561227f5780820380516001836020036101000a031916815260200191505b5060408051601f198184030181529190526020810180516001600160e01b03166001600160e01b0319909d169c909c17909b5250989950505050505050505050919050565b6000808284106122d357600080fd5b8386111580156122e35750848411155b6122ec57600080fd5b8286111580156122fc5750848311155b61230557600080fd5b600786860310156123265761231d878787878761254d565b91509150612398565b6000612333888888612920565b905080841161234457809550612392565b8481101561235757806001019650612392565b80851115801561236657508381105b61236c57fe5b61237888888388612410565b925061238988826001018887612410565b91506123989050565b50612305565b9550959350505050565b600080831280156123b35750600082135b806123c957506000831380156123c95750600082125b156123e95760026123da84846129fd565b816123e157fe5b059050611b93565b600060028085078185070105905061212861240a60028605600286056129fd565b826129fd565b60008184111561241f57600080fd5b8282111561242c57600080fd5b82841015612483576007848403101561245857600061244e868686868761254d565b5091506121289050565b6000612465868686612920565b90508083116124765780935061247d565b8060010194505b5061242c565b84848151811061248f57fe5b60200260200101519050949350505050565b6124a9612bea565b82518211156124b757600080fd5b846020015182850111156124e1576124e1856124d98760200151878601612a62565b600202612a79565b6000808651805187602083010193508088870111156125005787860182525b505050602084015b602084106125275780518252601f199093019260209182019101612508565b51815160001960208690036101000a019081169019919091161790525083949350505050565b60008060008686600101039050600088886000018151811061256b57fe5b6020026020010151905060008260011061258c576001600160ff1b036125a4565b89896001018151811061259b57fe5b60200260200101515b90506000836002106125bd576001600160ff1b036125d5565b8a8a600201815181106125cc57fe5b60200260200101515b90506000846003106125ee576001600160ff1b03612606565b8b8b600301815181106125fd57fe5b60200260200101515b905060008560041061261f576001600160ff1b03612637565b8c8c6004018151811061262e57fe5b60200260200101515b9050600086600510612650576001600160ff1b03612668565b8d8d6005018151811061265f57fe5b60200260200101515b9050600087600610612681576001600160ff1b03612699565b8e8e6006018151811061269057fe5b60200260200101515b9050858713156126a7579495945b838513156126b3579293925b818313156126bf579091905b848713156126cb579395935b838613156126d7579294925b808313156126e157915b848613156126ed579394935b808213156126f757905b82871315612703579195915b8186131561270f579094905b8085131561271957935b82861315612725579194915b8084131561272f57925b8285131561273b579193915b81841315612747579092905b82841315612753579192915b8d8c038061276357879a50612809565b806001141561277457869a50612809565b806002141561278557859a50612809565b806003141561279657849a50612809565b80600414156127a757839a50612809565b80600514156127b857829a50612809565b80600614156127c957819a50612809565b6040805162461bcd60e51b815260206004820152601060248201526f6b31206f7574206f6620626f756e647360801b604482015290519081900360640190fd5b8e8c038d8d141561282757508a995061239898505050505050505050565b8061283e5750969850612398975050505050505050565b80600114156128595750959850612398975050505050505050565b80600214156128745750949850612398975050505050505050565b806003141561288f5750939850612398975050505050505050565b80600414156128aa5750929850612398975050505050505050565b80600514156128c55750919850612398975050505050505050565b80600614156128e05750909850612398975050505050505050565b6040805162461bcd60e51b815260206004820152601060248201526f6b32206f7574206f6620626f756e647360801b604482015290519081900360640190fd5b600080846002858501048151811061293457fe5b602002602001015190506001840393506001830192505b6001840193508085858151811061295e57fe5b60200260200101511261294b575b6001830392508085848151811061297f57fe5b60200260200101511361296c57828410156129ef578483815181106129a057fe5b60200260200101518585815181106129b457fe5b60200260200101518686815181106129c857fe5b602002602001018786815181106129db57fe5b6020908102919091010191909152526129f8565b82915050611ce6565b61294b565b6000828201818312801590612a125750838112155b80612a275750600083128015612a2757508381125b611ce65760405162461bcd60e51b8152600401808060200182810382526021815260200180612c8c6021913960400191505060405180910390fd5b600081831115612a73575081611b93565b50919050565b8151612a858383612130565b50612a90838261216a565b50505050565b6040518060a0016040528060008152602001600081526020016060815260200160608152602001606081525090565b604080516080810182526000808252602082018190529181019190915260608082015290565b50805460008255906000526020600020908101906114c79190612c04565b828054828255906000526020600020908101928215612b5e579160200282015b82811115612b5e57825182546001600160a01b0319166001600160a01b03909116178255602090920191600190910190612b29565b50612b6a929150612c1e565b5090565b828054828255906000526020600020908101928215612ba9579160200282015b82811115612ba9578251825591602001919060010190612b8e565b50612b6a929150612c04565b6040805160a081018252600080825260208201819052918101829052606081019190915260808101612be5612bea565b905290565b604051806040016040528060608152602001600081525090565b61052791905b80821115612b6a5760008155600101612c0a565b61052791905b80821115612b6a5780546001600160a01b0319168155600101612c2456fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373756e61626c6520746f207472616e73666572416e6443616c6c20746f206f7261636c655369676e6564536166654d6174683a206164646974696f6e206f766572666c6f77536f75726365206d75737420626520746865206f7261636c65206f66207468652072657175657374a26469706673582212201ac97228608c6570aab78a1e5cfe09f897d2a876d4522cf9a4c8a43a52ee377564736f6c63430006060033";

export class PreCoordinator__factory extends ContractFactory {
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
    _link: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<PreCoordinator> {
    return super.deploy(_link, overrides || {}) as Promise<PreCoordinator>;
  }
  getDeployTransaction(
    _link: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_link, overrides || {});
  }
  attach(address: string): PreCoordinator {
    return super.attach(address) as PreCoordinator;
  }
  connect(signer: Signer): PreCoordinator__factory {
    return super.connect(signer) as PreCoordinator__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PreCoordinatorInterface {
    return new utils.Interface(_abi) as PreCoordinatorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PreCoordinator {
    return new Contract(address, _abi, signerOrProvider) as PreCoordinator;
  }
}
