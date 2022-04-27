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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "providerRewards",
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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "stakers",
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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "userRewards",
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
  "0x610160604052601e600d55600f600e553480156200001c57600080fd5b5060405162001cc838038062001cc8833981810160405260c08110156200004257600080fd5b508051602082015160408301516060840151608085015160a090950151939492939192909160006200007c6001600160e01b03620003b316565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35060018081905550856001600160a01b031663683048356040518163ffffffff1660e01b815260040160206040518083038186803b1580156200010757600080fd5b505afa1580156200011c573d6000803e3d6000fd5b505050506040513d60208110156200013357600080fd5b5051600280546001600160a01b0319166001600160a01b0392831617905560408051639fc4caa560e01b8152905191881691639fc4caa591600480820192602092909190829003018186803b1580156200018c57600080fd5b505afa158015620001a1573d6000803e3d6000fd5b505050506040513d6020811015620001b857600080fd5b505160601b6001600160601b03191660805284151560f81b61012090815260025460408051637b8041cf60e11b8152905160009384936001600160a01b03169263f700839e9260048083019392829003018186803b1580156200021a57600080fd5b505afa1580156200022f573d6000803e3d6000fd5b505050506040513d6101208110156200024757600080fd5b50805160e09091015160025460408051638b8e530960e01b815290519395509193506001600160a01b031691638b8e530991600480820192602092909190829003018186803b1580156200029a57600080fd5b505afa158015620002af573d6000803e3d6000fd5b505050506040513d6020811015620002c657600080fd5b505160601b6001600160601b03191660a0526101008290526001600160a01b0384166000908152600c602052604090208054600160ff19909116179055608086901b6001600160801b03191660e0526001600160401b03818116908616118015906200033c57506001856001600160401b031610155b62000383576040805162461bcd60e51b8152602060048201526012602482015271696e636f7272656374206c6576657261676560701b604482015290519081900360640190fd5b505060c092831b6001600160c01b0319166101405260601b6001600160601b03191690915250620003b792505050565b3390565b60805160601c60a05160601c60c05160601c60e05160801c610100516101205160f81c6101405160c01c6118a6620004226000398061118752508061113f5250806112fa5250806107dc52806115f652508061080f52806109d55280611536525050506118a66000f3fe608060405234801561001057600080fd5b50600436106101735760003560e01c80638d21c770116100de578063b7bc347e11610097578063e527c36711610071578063e527c367146104d6578063f2db10fe146104f3578063f2fde38b14610517578063fd5e6dd11461053d57610173565b8063b7bc347e14610482578063cbe230c31461048a578063ded81d2b146104b057610173565b80638d21c770146103925780638da5cb5b146104005780639b19251a146104085780639eacc13b1461042e578063a224ee9c14610454578063a7e8d8d41461045c57610173565b80634e0c91f6116101305780634e0c91f61461025c5780634fb2647e1461029e5780635ae698ff146102c45780635c1c20de146103655780635e5f2e261461036d578063715018a61461038a57610173565b8063171e44ea1461017857806318e45427146101a05780631f285703146101bc57806325091a08146101eb5780632c86d98e14610211578063484fbf2b14610236575b600080fd5b61019e6004803603602081101561018e57600080fd5b50356001600160a01b031661055a565b005b6101a861113d565b604080519115158252519081900360200190f35b6101d9600480360360208110156101d257600080fd5b5035611161565b60408051918252519081900360200190f35b6101d96004803603602081101561020157600080fd5b50356001600160a01b0316611173565b610219611185565b6040805167ffffffffffffffff9092168252519081900360200190f35b6101d96004803603602081101561024c57600080fd5b50356001600160a01b03166111a9565b6102826004803603602081101561027257600080fd5b50356001600160a01b03166111bb565b604080516001600160a01b039092168252519081900360200190f35b610282600480360360208110156102b457600080fd5b50356001600160a01b03166111d6565b61019e600480360360208110156102da57600080fd5b810190602081018135600160201b8111156102f457600080fd5b82018360208201111561030657600080fd5b803590602001918460208302840111600160201b8311171561032757600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295506111f1945050505050565b6101d96112f8565b6102826004803603602081101561038357600080fd5b503561131c565b61019e611343565b61019e600480360360208110156103a857600080fd5b810190602081018135600160201b8111156103c257600080fd5b8201836020820111156103d457600080fd5b803590602001918460208302840111600160201b831117156103f557600080fd5b5090925090506113ef565b6102826114fe565b6101a86004803603602081101561041e57600080fd5b50356001600160a01b031661150d565b6101d96004803603602081101561044457600080fd5b50356001600160a01b0316611522565b610282611534565b6101a86004803603602081101561047257600080fd5b50356001600160a01b0316611558565b6101d961156d565b6101a8600480360360208110156104a057600080fd5b50356001600160a01b0316611573565b6101d9600480360360208110156104c657600080fd5b50356001600160a01b03166115d0565b6101d9600480360360208110156104ec57600080fd5b50356115e2565b6104fb6115f4565b604080516001600160801b039092168252519081900360200190f35b61019e6004803603602081101561052d57600080fd5b50356001600160a01b0316611618565b6102826004803603602081101561055357600080fd5b503561171a565b610562611727565b6001600160a01b03166105736114fe565b6001600160a01b0316146105bc576040805162461bcd60e51b8152602060048201819052602482015260008051602061182d833981519152604482015290519081900360640190fd5b60025460408051637b8041cf60e11b815290516000926001600160a01b03169163f700839e91600480830192610120929190829003018186803b15801561060257600080fd5b505afa158015610616573d6000803e3d6000fd5b505050506040513d61012081101561062d57600080fd5b5060c00151905061063d82611573565b156106795760405162461bcd60e51b815260040180806020018281038252602481526020018061184d6024913960400191505060405180910390fd5b6002546040805163cbe230c360e01b81526001600160a01b0385811660048301529151919092169163cbe230c3916024808301926020929190829003018186803b1580156106c657600080fd5b505afa1580156106da573d6000803e3d6000fd5b505050506040513d60208110156106f057600080fd5b5051610743576040805162461bcd60e51b815260206004820152601a60248201527f5468697320746f6b656e206973206e6f7420616c6c6f7765642e000000000000604482015290519081900360640190fd5b600b805460018101825560008290527f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01db90180546001600160a01b0319166001600160a01b038516179055548110156107d5576040805162461bcd60e51b815260206004820152601060248201526f0dac2f040e8ded6cadc40d8cadccee8d60831b604482015290519081900360640190fd5b60606108097f00000000000000000000000000000000000000000000000000000000000000006001600160801b031661172b565b905060607f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166376ff294b6040518163ffffffff1660e01b815260040160006040518083038186803b15801561086657600080fd5b505afa15801561087a573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405260208110156108a357600080fd5b8101908080516040519392919084600160201b8211156108c257600080fd5b9083019060208201858111156108d757600080fd5b8251600160201b8111828201881017156108f057600080fd5b82525081516020918201929091019080838360005b8381101561091d578181015183820152602001610905565b50505050905090810190601f16801561094a5780820380516001836020036101000a031916815260200191505b50604052505050905060608260405160200180806744534c412d53502d60c01b81525060080182805190602001908083835b6020831061099b5780518252601f19909201916020918201910161097c565b6001836020036101000a038019825116818451168082178552505050505050905001915050604051602081830303815290604052905060607f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166346cd68016040518163ffffffff1660e01b815260040160006040518083038186803b158015610a2c57600080fd5b505afa158015610a40573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526020811015610a6957600080fd5b8101908080516040519392919084600160201b821115610a8857600080fd5b908301906020820185811115610a9d57600080fd5b8251600160201b811182820188101715610ab657600080fd5b82525081516020918201929091019080838360005b83811015610ae3578181015183820152602001610acb565b50505050905090810190601f168015610b105780820380516001836020036101000a031916815260200191505b50604052505050905060608460405160200180806744534c412d4c502d60c01b81525060080182805190602001908083835b60208310610b615780518252601f199092019160209182019101610b42565b6001836020036101000a03801982511681845116808217855250505050505090500191505060405160208183030381529060405290506000876001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b158015610bd257600080fd5b505afa158015610be6573d6000803e3d6000fd5b505050506040513d6020811015610bfc57600080fd5b50516002546040516340c71f0f60e01b815260ff831660448201526060600482019081528851606483015288519394506000936001600160a01b03909316926340c71f0f928a928a928892829160248201916084019060208801908083838e5b83811015610c74578181015183820152602001610c5c565b50505050905090810190601f168015610ca15780820380516001836020036101000a031916815260200191505b50838103825285518152855160209182019187019080838360005b83811015610cd4578181015183820152602001610cbc565b50505050905090810190601f168015610d015780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b158015610d2357600080fd5b505af1158015610d37573d6000803e3d6000fd5b505050506040513d6020811015610d4d57600080fd5b50516002546040516340c71f0f60e01b815260ff851660448201526060600482019081528751606483015287519394506000936001600160a01b03909316926340c71f0f92899289928992829160248201916084019060208801908083838e5b83811015610dc5578181015183820152602001610dad565b50505050905090810190601f168015610df25780820380516001836020036101000a031916815260200191505b50838103825285518152855160209182019187019080838360005b83811015610e25578181015183820152602001610e0d565b50505050905090810190601f168015610e525780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b158015610e7457600080fd5b505af1158015610e88573d6000803e3d6000fd5b505050506040513d6020811015610e9e57600080fd5b8101908080519060200190929190505050905080600860008c6001600160a01b03166001600160a01b0316815260200190815260200160002060006101000a8154816001600160a01b0302191690836001600160a01b0316021790555081600760008c6001600160a01b03166001600160a01b0316815260200190815260200160002060006101000a8154816001600160a01b0302191690836001600160a01b03160217905550816001600160a01b0316816001600160a01b03168b6001600160a01b03167fce8c390dc55dbcd418078f1391fbb7d471c01c228fc4464926095354cb27c02988888c8c6040518080602001806020018060200180602001858103855289818151815260200191508051906020019080838360005b83811015610fd1578181015183820152602001610fb9565b50505050905090810190601f168015610ffe5780820380516001836020036101000a031916815260200191505b5085810384528851815288516020918201918a019080838360005b83811015611031578181015183820152602001611019565b50505050905090810190601f16801561105e5780820380516001836020036101000a031916815260200191505b50858103835287518152875160209182019189019080838360005b83811015611091578181015183820152602001611079565b50505050905090810190601f1680156110be5780820380516001836020036101000a031916815260200191505b50858103825286518152865160209182019188019080838360005b838110156110f15781810151838201526020016110d9565b50505050905090810190601f16801561111e5780820380516001836020036101000a031916815260200191505b509850505050505050505060405180910390a450505050505050505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b600f6020526000908152604090205481565b60036020526000908152604090205481565b7f000000000000000000000000000000000000000000000000000000000000000081565b60056020526000908152604090205481565b6007602052600090815260409020546001600160a01b031681565b6008602052600090815260409020546001600160a01b031681565b6111f9611727565b6001600160a01b031661120a6114fe565b6001600160a01b031614611253576040805162461bcd60e51b8152602060048201819052602482015260008051602061182d833981519152604482015290519081900360640190fd5b60005b81518110156112f457600c600083838151811061126f57fe5b6020908102919091018101516001600160a01b031682528101919091526040016000205460ff166112ec576001600c60008484815181106112ac57fe5b60200260200101516001600160a01b03166001600160a01b0316815260200190815260200160002060006101000a81548160ff0219169083151502179055505b600101611256565b5050565b7f000000000000000000000000000000000000000000000000000000000000000081565b600b818154811061132957fe5b6000918252602090912001546001600160a01b0316905081565b61134b611727565b6001600160a01b031661135c6114fe565b6001600160a01b0316146113a5576040805162461bcd60e51b8152602060048201819052602482015260008051602061182d833981519152604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6113f7611727565b6001600160a01b03166114086114fe565b6001600160a01b031614611451576040805162461bcd60e51b8152602060048201819052602482015260008051602061182d833981519152604482015290519081900360640190fd5b60005b818110156114f957600c600084848481811061146c57fe5b602090810292909201356001600160a01b03168352508101919091526040016000205460ff16156114f1576000600c60008585858181106114a957fe5b905060200201356001600160a01b03166001600160a01b03166001600160a01b0316815260200190815260200160002060006101000a81548160ff0219169083151502179055505b600101611454565b505050565b6000546001600160a01b031690565b600c6020526000908152604090205460ff1681565b60046020526000908152604090205481565b7f000000000000000000000000000000000000000000000000000000000000000081565b600a6020526000908152604090205460ff1681565b600b5490565b6000805b600b548110156115c557826001600160a01b0316600b828154811061159857fe5b6000918252602090912001546001600160a01b031614156115bd5760019150506115cb565b600101611577565b50600090505b919050565b60066020526000908152604090205481565b60106020526000908152604090205481565b7f000000000000000000000000000000000000000000000000000000000000000081565b611620611727565b6001600160a01b03166116316114fe565b6001600160a01b03161461167a576040805162461bcd60e51b8152602060048201819052602482015260008051602061182d833981519152604482015290519081900360640190fd5b6001600160a01b0381166116bf5760405162461bcd60e51b81526004018080602001828103825260268152602001806118076026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6009818154811061132957fe5b3390565b606081806117525750506040805180820190915260018152600360fc1b60208201526115cb565b8060005b811561176a57600101600a82049150611756565b60608167ffffffffffffffff8111801561178357600080fd5b506040519080825280601f01601f1916602001820160405280156117ae576020820181803683370190505b50905060001982015b84156117fc57600a850660300160f81b828280600190039350815181106117da57fe5b60200101906001600160f81b031916908160001a905350600a850494506117b7565b509594505050505056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65725468697320746f6b656e20686173206265656e20616c6c6f77656420616c72656164792ea264697066735822122010336d1e99f24d8c7c3b87db21806aee766c90d09600cf950c3c5d80eb74772864736f6c63430006060033";

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
