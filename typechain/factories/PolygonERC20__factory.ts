/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PolygonERC20, PolygonERC20Interface } from "../PolygonERC20";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
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
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
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
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
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
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
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
    inputs: [],
    name: "name",
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
    name: "symbol",
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
    name: "totalSupply",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
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
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
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
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000c5b38038062000c5b8339810160408190526200003491620002f6565b8151829082906200004d90600390602085019062000183565b5080516200006390600490602084019062000183565b5050600580546001600160a01b031916339081179091556200009391506b033b2e3c9fd0803ce80000006200009b565b5050620003c4565b6001600160a01b038216620000f65760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b80600260008282546200010a919062000360565b90915550506001600160a01b038216600090815260208190526040812080548392906200013990849062000360565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b828054620001919062000387565b90600052602060002090601f016020900481019282620001b5576000855562000200565b82601f10620001d057805160ff191683800117855562000200565b8280016001018555821562000200579182015b8281111562000200578251825591602001919060010190620001e3565b506200020e92915062000212565b5090565b5b808211156200020e576000815560010162000213565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200025157600080fd5b81516001600160401b03808211156200026e576200026e62000229565b604051601f8301601f19908116603f0116810190828211818310171562000299576200029962000229565b81604052838152602092508683858801011115620002b657600080fd5b600091505b83821015620002da5785820183015181830184015290820190620002bb565b83821115620002ec5760008385830101525b9695505050505050565b600080604083850312156200030a57600080fd5b82516001600160401b03808211156200032257600080fd5b62000330868387016200023f565b935060208501519150808211156200034757600080fd5b5062000356858286016200023f565b9150509250929050565b600082198211156200038257634e487b7160e01b600052601160045260246000fd5b500190565b600181811c908216806200039c57607f821691505b60208210811415620003be57634e487b7160e01b600052602260045260246000fd5b50919050565b61088780620003d46000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80633950935111610071578063395093511461012357806370a082311461013657806395d89b411461015f578063a457c2d714610167578063a9059cbb1461017a578063dd62ed3e1461018d57600080fd5b806306fdde03146100ae578063095ea7b3146100cc57806318160ddd146100ef57806323b872dd14610101578063313ce56714610114575b600080fd5b6100b66101a0565b6040516100c391906106c4565b60405180910390f35b6100df6100da366004610735565b610232565b60405190151581526020016100c3565b6002545b6040519081526020016100c3565b6100df61010f36600461075f565b61024a565b604051601281526020016100c3565b6100df610131366004610735565b61026e565b6100f361014436600461079b565b6001600160a01b031660009081526020819052604090205490565b6100b6610290565b6100df610175366004610735565b61029f565b6100df610188366004610735565b61031f565b6100f361019b3660046107bd565b61032d565b6060600380546101af906107f0565b80601f01602080910402602001604051908101604052809291908181526020018280546101db906107f0565b80156102285780601f106101fd57610100808354040283529160200191610228565b820191906000526020600020905b81548152906001019060200180831161020b57829003601f168201915b5050505050905090565b600033610240818585610358565b5060019392505050565b60003361025885828561047c565b6102638585856104f6565b506001949350505050565b600033610240818585610281838361032d565b61028b919061082b565b610358565b6060600480546101af906107f0565b600033816102ad828661032d565b9050838110156103125760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b6102638286868403610358565b6000336102408185856104f6565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6001600160a01b0383166103ba5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610309565b6001600160a01b03821661041b5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610309565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6000610488848461032d565b905060001981146104f057818110156104e35760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610309565b6104f08484848403610358565b50505050565b6001600160a01b03831661055a5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610309565b6001600160a01b0382166105bc5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610309565b6001600160a01b038316600090815260208190526040902054818110156106345760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610309565b6001600160a01b0380851660009081526020819052604080822085850390559185168152908120805484929061066b90849061082b565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516106b791815260200190565b60405180910390a36104f0565b600060208083528351808285015260005b818110156106f1578581018301518582016040015282016106d5565b81811115610703576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b038116811461073057600080fd5b919050565b6000806040838503121561074857600080fd5b61075183610719565b946020939093013593505050565b60008060006060848603121561077457600080fd5b61077d84610719565b925061078b60208501610719565b9150604084013590509250925092565b6000602082840312156107ad57600080fd5b6107b682610719565b9392505050565b600080604083850312156107d057600080fd5b6107d983610719565b91506107e760208401610719565b90509250929050565b600181811c9082168061080457607f821691505b6020821081141561082557634e487b7160e01b600052602260045260246000fd5b50919050565b6000821982111561084c57634e487b7160e01b600052601160045260246000fd5b50019056fea26469706673582212207f10dc4f287fc60b3844828fb598830e3a0e03daa8b13a793e870a567920945764736f6c63430008090033";

export class PolygonERC20__factory extends ContractFactory {
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
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<PolygonERC20> {
    return super.deploy(name, symbol, overrides || {}) as Promise<PolygonERC20>;
  }
  getDeployTransaction(
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name, symbol, overrides || {});
  }
  attach(address: string): PolygonERC20 {
    return super.attach(address) as PolygonERC20;
  }
  connect(signer: Signer): PolygonERC20__factory {
    return super.connect(signer) as PolygonERC20__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PolygonERC20Interface {
    return new utils.Interface(_abi) as PolygonERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PolygonERC20 {
    return new Contract(address, _abi, signerOrProvider) as PolygonERC20;
  }
}
