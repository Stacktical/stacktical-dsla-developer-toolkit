/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Staking, StakingInterface } from "../Staking";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract ISLARegistry",
        name: "slaRegistry_",
        type: "address",
      },
      {
        internalType: "bool",
        name: "whitelistedContract_",
        type: "bool",
      },
      {
        internalType: "uint128",
        name: "slaID_",
        type: "uint128",
      },
      {
        internalType: "uint64",
        name: "leverage_",
        type: "uint64",
      },
      {
        internalType: "address",
        name: "contractOwner_",
        type: "address",
      },
      {
        internalType: "address",
        name: "messengerAddress_",
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
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "dpTokenAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "dpTokenName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "dpTokenSymbol",
        type: "string",
      },
      {
        indexed: true,
        internalType: "address",
        name: "duTokenAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "duTokenName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "duTokenSymbol",
        type: "string",
      },
    ],
    name: "DTokensCreated",
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
        internalType: "uint256",
        name: "periodId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rewardPercentage",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rewardPercentagePrecision",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rewardAmount",
        type: "uint256",
      },
    ],
    name: "ProviderRewardGenerated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "periodId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "userStake",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "leverage",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "compensation",
        type: "uint256",
      },
    ],
    name: "UserCompensationGenerated",
    type: "event",
  },
  {
    inputs: [],
    name: "DSLAburnRate",
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
        name: "_tokenAddress",
        type: "address",
      },
    ],
    name: "addAllowedTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_userAddresses",
        type: "address[]",
      },
    ],
    name: "addUsersToWhitelist",
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
    name: "allowedTokens",
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
        name: "",
        type: "address",
      },
    ],
    name: "dpTokenRegistry",
    outputs: [
      {
        internalType: "contract dToken",
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
        name: "",
        type: "address",
      },
    ],
    name: "duTokenRegistry",
    outputs: [
      {
        internalType: "contract dToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllowedTokensLength",
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
    name: "getStakersLength",
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
        name: "_tokenAddress",
        type: "address",
      },
    ],
    name: "isAllowedToken",
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
        name: "",
        type: "address",
      },
    ],
    name: "lastProviderStake",
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
        name: "",
        type: "address",
      },
    ],
    name: "lastUserStake",
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
    name: "leverage",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "messengerAddress",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "providersPool",
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
        name: "",
        type: "address",
      },
    ],
    name: "registeredStakers",
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
        internalType: "address[]",
        name: "_userAddresses",
        type: "address[]",
      },
    ],
    name: "removeUsersFromWhitelist",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [],
    name: "slaID",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "stakersNum",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "usersPool",
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
        name: "",
        type: "address",
      },
    ],
    name: "whitelist",
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
    inputs: [],
    name: "whitelistedContract",
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
];

const _bytecode =
  "0x6101606040523480156200001257600080fd5b5060405162001a5838038062001a58833981016040819052620000359162000491565b6200004033620003fa565b600180556001600160a01b038216620000a05760405162461bcd60e51b815260206004820152601560248201527f696e76616c6964206f776e65722061646472657373000000000000000000000060448201526064015b60405180910390fd5b6001600160a01b038116620000f85760405162461bcd60e51b815260206004820152601960248201527f696e76616c6964206d657373656e676572206164647265737300000000000000604482015260640162000097565b856001600160a01b031663683048356040518163ffffffff1660e01b815260040160206040518083038186803b1580156200013257600080fd5b505afa15801562000147573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200016d919062000529565b600260006101000a8154816001600160a01b0302191690836001600160a01b03160217905550856001600160a01b0316639fc4caa56040518163ffffffff1660e01b815260040160206040518083038186803b158015620001cd57600080fd5b505afa158015620001e2573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019062000208919062000529565b6001600160a01b0390811660805285151561012090815260025460408051637b8041cf60e11b81529051600094859493169263f700839e9260048082019391829003018186803b1580156200025c57600080fd5b505afa15801562000271573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019062000297919062000550565b5097505050505050509150600260009054906101000a90046001600160a01b03166001600160a01b0316638b8e53096040518163ffffffff1660e01b815260040160206040518083038186803b158015620002f157600080fd5b505afa15801562000306573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200032c919062000529565b6001600160a01b0390811660a05261010083905284166000908152600c60205260409020805460ff191660011790556001600160801b03861660e0526001600160401b03808216908616118015906200038f57506001856001600160401b031610155b620003d25760405162461bcd60e51b8152602060048201526012602482015271696e636f7272656374206c6576657261676560701b604482015260640162000097565b50506001600160401b0390921661014052506001600160a01b031660c05250620005cc915050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b03811681146200046057600080fd5b50565b805180151581146200047457600080fd5b919050565b80516001600160401b03811681146200047457600080fd5b60008060008060008060c08789031215620004ab57600080fd5b8651620004b8816200044a565b9550620004c86020880162000463565b60408801519095506001600160801b0381168114620004e657600080fd5b9350620004f66060880162000479565b9250608087015162000508816200044a565b60a08801519092506200051b816200044a565b809150509295509295509295565b6000602082840312156200053c57600080fd5b815162000549816200044a565b9392505050565b60008060008060008060008060006101208a8c0312156200057057600080fd5b8951985060208a0151975060408a0151965060608a0151955060808a0151945060a08a0151935060c08a01519250620005ac60e08b0162000479565b9150620005bd6101008b0162000463565b90509295985092959850929598565b60805160a05160c05160e05161010051610120516101405161140d6200064b60003960006101ea01526000610193015260006102c70152600081816103fd0152818161076b01526108ce015260008181610378015281816106c1015281816107a00152818161082401526109030152600050506000505061140d6000f3fe608060405234801561001057600080fd5b50600436106101585760003560e01c80638d21c770116100c3578063a7e8d8d41161007c578063a7e8d8d41461039a578063b7bc347e146103bd578063cbe230c3146103c5578063ded81d2b146103d8578063f2db10fe146103f8578063f2fde38b1461043757600080fd5b80638d21c770146103045780638da5cb5b146103175780639b19251a146103285780639eacc13b1461034b5780639fabeb001461036b578063a224ee9c1461037357600080fd5b80634e0c91f6116101155780634e0c91f6146102455780634fb2647e146102865780635ae698ff146102af5780635c1c20de146102c25780635e5f2e26146102e9578063715018a6146102fc57600080fd5b806308728f6e1461015d578063171e44ea1461017957806318e454271461018e57806325091a08146101c55780632c86d98e146101e5578063484fbf2b14610225575b600080fd5b610166600a5481565b6040519081526020015b60405180910390f35b61018c610187366004610f41565b61044a565b005b6101b57f000000000000000000000000000000000000000000000000000000000000000081565b6040519015158152602001610170565b6101666101d3366004610f41565b60036020526000908152604090205481565b61020c7f000000000000000000000000000000000000000000000000000000000000000081565b60405167ffffffffffffffff9091168152602001610170565b610166610233366004610f41565b60056020526000908152604090205481565b61026e610253366004610f41565b6007602052600090815260409020546001600160a01b031681565b6040516001600160a01b039091168152602001610170565b61026e610294366004610f41565b6008602052600090815260409020546001600160a01b031681565b61018c6102bd366004610fac565b610ba3565b6101667f000000000000000000000000000000000000000000000000000000000000000081565b61026e6102f736600461105e565b610c88565b61018c610cb2565b61018c610312366004611077565b610ce8565b6000546001600160a01b031661026e565b6101b5610336366004610f41565b600c6020526000908152604090205460ff1681565b610166610359366004610f41565b60046020526000908152604090205481565b600a54610166565b61026e7f000000000000000000000000000000000000000000000000000000000000000081565b6101b56103a8366004610f41565b60096020526000908152604090205460ff1681565b600b54610166565b6101b56103d3366004610f41565b610dd7565b6101666103e6366004610f41565b60066020526000908152604090205481565b61041f7f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160801b039091168152602001610170565b61018c610445366004610f41565b610e41565b6000546001600160a01b0316331461047d5760405162461bcd60e51b8152600401610474906110ec565b60405180910390fd5b60025460408051637b8041cf60e11b815290516000926001600160a01b03169163f700839e91600480830192610120929190829003018186803b1580156104c357600080fd5b505afa1580156104d7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104fb9190611136565b5050965050505050505061050e82610dd7565b156105675760405162461bcd60e51b8152602060048201526024808201527f5468697320746f6b656e20686173206265656e20616c6c6f77656420616c726560448201526330b23c9760e11b6064820152608401610474565b60025460405163cbe230c360e01b81526001600160a01b0384811660048301529091169063cbe230c39060240160206040518083038186803b1580156105ac57600080fd5b505afa1580156105c0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105e491906111bc565b6106305760405162461bcd60e51b815260206004820152601a60248201527f5468697320746f6b656e206973206e6f7420616c6c6f7765642e0000000000006044820152606401610474565b600b805460018101825560008290527f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01db90180546001600160a01b0319166001600160a01b038516179055548110156106bd5760405162461bcd60e51b815260206004820152601060248201526f0dac2f040e8ded6cadc40d8cadccee8d60831b6044820152606401610474565b60007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166376ff294b6040518163ffffffff1660e01b815260040160006040518083038186803b15801561071857600080fd5b505afa15801561072c573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526107549190810190611207565b6040516308cb8e2360e11b81526001600160801b037f00000000000000000000000000000000000000000000000000000000000000001660048201529091506000906001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906311971c469060240160006040518083038186803b1580156107e257600080fd5b505afa1580156107f6573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261081e9190810190611207565b905060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166346cd68016040518163ffffffff1660e01b815260040160006040518083038186803b15801561087b57600080fd5b505afa15801561088f573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526108b79190810190611207565b60405163cb8d3fcf60e01b81526001600160801b037f00000000000000000000000000000000000000000000000000000000000000001660048201529091506000906001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063cb8d3fcf9060240160006040518083038186803b15801561094557600080fd5b505afa158015610959573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526109819190810190611207565b90506000866001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b1580156109be57600080fd5b505afa1580156109d2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109f6919061129b565b6002546040516340c71f0f60e01b81529192506000916001600160a01b03909116906340c71f0f90610a30908990899087906004016112ea565b602060405180830381600087803b158015610a4a57600080fd5b505af1158015610a5e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a829190611323565b6002546040516340c71f0f60e01b81529192506000916001600160a01b03909116906340c71f0f90610abc908890889088906004016112ea565b602060405180830381600087803b158015610ad657600080fd5b505af1158015610aea573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b0e9190611323565b6001600160a01b03808b16600081815260086020908152604080832080548688166001600160a01b0319918216811790925560079093529281902080549589169590921685179091555193945091927fce8c390dc55dbcd418078f1391fbb7d471c01c228fc4464926095354cb27c02990610b90908a908a908e908e90611340565b60405180910390a4505050505050505050565b6000546001600160a01b03163314610bcd5760405162461bcd60e51b8152600401610474906110ec565b60005b8151811015610c8457600c6000838381518110610bef57610bef611398565b6020908102919091018101516001600160a01b031682528101919091526040016000205460ff16610c72576001600c6000848481518110610c3257610c32611398565b60200260200101516001600160a01b03166001600160a01b0316815260200190815260200160002060006101000a81548160ff0219169083151502179055505b80610c7c816113ae565b915050610bd0565b5050565b600b8181548110610c9857600080fd5b6000918252602090912001546001600160a01b0316905081565b6000546001600160a01b03163314610cdc5760405162461bcd60e51b8152600401610474906110ec565b610ce66000610edc565b565b6000546001600160a01b03163314610d125760405162461bcd60e51b8152600401610474906110ec565b60005b81811015610dd257600c6000848484818110610d3357610d33611398565b9050602002016020810190610d489190610f41565b6001600160a01b0316815260208101919091526040016000205460ff1615610dc0576000600c6000858585818110610d8257610d82611398565b9050602002016020810190610d979190610f41565b6001600160a01b031681526020810191909152604001600020805460ff19169115159190911790555b80610dca816113ae565b915050610d15565b505050565b6000805b600b54811015610e3857826001600160a01b0316600b8281548110610e0257610e02611398565b6000918252602090912001546001600160a01b03161415610e265750600192915050565b80610e30816113ae565b915050610ddb565b50600092915050565b6000546001600160a01b03163314610e6b5760405162461bcd60e51b8152600401610474906110ec565b6001600160a01b038116610ed05760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610474565b610ed981610edc565b50565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b0381168114610ed957600080fd5b600060208284031215610f5357600080fd5b8135610f5e81610f2c565b9392505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610fa457610fa4610f65565b604052919050565b60006020808385031215610fbf57600080fd5b823567ffffffffffffffff80821115610fd757600080fd5b818501915085601f830112610feb57600080fd5b813581811115610ffd57610ffd610f65565b8060051b915061100e848301610f7b565b818152918301840191848101908884111561102857600080fd5b938501935b83851015611052578435925061104283610f2c565b828252938501939085019061102d565b98975050505050505050565b60006020828403121561107057600080fd5b5035919050565b6000806020838503121561108a57600080fd5b823567ffffffffffffffff808211156110a257600080fd5b818501915085601f8301126110b657600080fd5b8135818111156110c557600080fd5b8660208260051b85010111156110da57600080fd5b60209290920196919550909350505050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b8051801515811461113157600080fd5b919050565b60008060008060008060008060006101208a8c03121561115557600080fd5b8951985060208a0151975060408a0151965060608a0151955060808a0151945060a08a0151935060c08a0151925060e08a015167ffffffffffffffff8116811461119e57600080fd5b91506111ad6101008b01611121565b90509295985092959850929598565b6000602082840312156111ce57600080fd5b610f5e82611121565b60005b838110156111f25781810151838201526020016111da565b83811115611201576000848401525b50505050565b60006020828403121561121957600080fd5b815167ffffffffffffffff8082111561123157600080fd5b818401915084601f83011261124557600080fd5b81518181111561125757611257610f65565b61126a601f8201601f1916602001610f7b565b915080825285602082850101111561128157600080fd5b6112928160208401602086016111d7565b50949350505050565b6000602082840312156112ad57600080fd5b815160ff81168114610f5e57600080fd5b600081518084526112d68160208601602086016111d7565b601f01601f19169290920160200192915050565b6060815260006112fd60608301866112be565b828103602084015261130f81866112be565b91505060ff83166040830152949350505050565b60006020828403121561133557600080fd5b8151610f5e81610f2c565b60808152600061135360808301876112be565b828103602084015261136581876112be565b9050828103604084015261137981866112be565b9050828103606084015261138d81856112be565b979650505050505050565b634e487b7160e01b600052603260045260246000fd5b60006000198214156113d057634e487b7160e01b600052601160045260246000fd5b506001019056fea2646970667358221220c7eb09e6ca1d6962de3c6fb04121f12f57f80d304ed762bc056186e9ca1fc13d64736f6c63430008090033";

export class Staking__factory extends ContractFactory {
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
    slaRegistry_: string,
    whitelistedContract_: boolean,
    slaID_: BigNumberish,
    leverage_: BigNumberish,
    contractOwner_: string,
    messengerAddress_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Staking> {
    return super.deploy(
      slaRegistry_,
      whitelistedContract_,
      slaID_,
      leverage_,
      contractOwner_,
      messengerAddress_,
      overrides || {}
    ) as Promise<Staking>;
  }
  getDeployTransaction(
    slaRegistry_: string,
    whitelistedContract_: boolean,
    slaID_: BigNumberish,
    leverage_: BigNumberish,
    contractOwner_: string,
    messengerAddress_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      slaRegistry_,
      whitelistedContract_,
      slaID_,
      leverage_,
      contractOwner_,
      messengerAddress_,
      overrides || {}
    );
  }
  attach(address: string): Staking {
    return super.attach(address) as Staking;
  }
  connect(signer: Signer): Staking__factory {
    return super.connect(signer) as Staking__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakingInterface {
    return new utils.Interface(_abi) as StakingInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Staking {
    return new Contract(address, _abi, signerOrProvider) as Staking;
  }
}
