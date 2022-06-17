/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  MessengerRegistry,
  MessengerRegistryInterface,
} from "../MessengerRegistry";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "ownerAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "messengerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "specificationUrl",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "precision",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "MessengerModified",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "ownerAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "messengerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "specificationUrl",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "precision",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "MessengerRegistered",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "skip",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "num",
        type: "uint256",
      },
    ],
    name: "getMessengers",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "ownerAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "messengerAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "specificationUrl",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "precision",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "requestsCounter",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "fulfillsCounter",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
        ],
        internalType: "struct MessengerRegistry.Messenger[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMessengersLength",
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
        internalType: "string",
        name: "_specificationUrl",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_messengerId",
        type: "uint256",
      },
    ],
    name: "modifyMessenger",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "callerAddress_",
        type: "address",
      },
      {
        internalType: "address",
        name: "messengerAddress_",
        type: "address",
      },
      {
        internalType: "string",
        name: "specificationUrl_",
        type: "string",
      },
    ],
    name: "registerMessenger",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "messengerAddress_",
        type: "address",
      },
    ],
    name: "registeredMessengers",
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
    name: "setSLARegistry",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611251806100206000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80634d9ebd9d14610067578063822d332e146100905780639f69d7f8146100a5578063eabb8a73146100b6578063ef4003db146100c9578063f388158914610105575b600080fd5b61007a610075366004610db7565b61010d565b6040516100879190610dd9565b60405180910390f35b6100a361009e366004610f19565b6104da565b005b600054604051908152602001610087565b6100a36100c4366004610f7d565b610674565b6100f56100d7366004610fe2565b6001600160a01b031660009081526001602052604090205460ff1690565b6040519015158152602001610087565b6100a3610c2c565b600054606090831061011e57600091505b60005461012b838561101c565b11156101425760005461013f908490611034565b91505b60008267ffffffffffffffff81111561015d5761015d61104b565b6040519080825280602002602001820160405280156101e057816020015b6101cd6040518060e0016040528060006001600160a01b0316815260200160006001600160a01b0316815260200160608152602001600081526020016000815260200160008152602001600081525090565b81526020019060019003908161017b5790505b509050835b6101ef848661101c565b8110156104d257600080828154811061020a5761020a611061565b906000526020600020906007020160010160009054906101000a90046001600160a01b031690506040518060e001604052806000848154811061024f5761024f611061565b600091825260208083206007909202909101546001600160a01b0316835281549201918590811061028257610282611061565b60009182526020808320600160079093020191909101546001600160a01b031683528154920191859081106102b9576102b9611061565b906000526020600020906007020160020180546102d590611077565b80601f016020809104026020016040519081016040528092919081815260200182805461030190611077565b801561034e5780601f106103235761010080835404028352916020019161034e565b820191906000526020600020905b81548152906001019060200180831161033157829003601f168201915b505050505081526020016000848154811061036b5761036b611061565b9060005260206000209060070201600301548152602001826001600160a01b031663663c22696040518163ffffffff1660e01b815260040160206040518083038186803b1580156103bb57600080fd5b505afa1580156103cf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103f391906110b2565b8152602001826001600160a01b031663a50c54256040518163ffffffff1660e01b815260040160206040518083038186803b15801561043157600080fd5b505afa158015610445573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061046991906110b2565b81526020016000848154811061048157610481611061565b9060005260206000209060070201600601548152508387846104a39190611034565b815181106104b3576104b3611061565b60200260200101819052505080806104ca906110cb565b9150506101e5565b509392505050565b60008082815481106104ee576104ee611061565b906000526020600020906007020190508060010160009054906101000a90046001600160a01b03166001600160a01b0316638da5cb5b6040518163ffffffff1660e01b815260040160206040518083038186803b15801561054e57600080fd5b505afa158015610562573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061058691906110e6565b6001600160a01b0316336001600160a01b0316146105f55760405162461bcd60e51b815260206004820152602160248201527f43616e206f6e6c79206265206d6f64696669656420627920746865206f776e656044820152603960f91b60648201526084015b60405180910390fd5b610603600282018585610caa565b5080546001600160a01b0319163390811782556001820154600383015460068401546040516001600160a01b039390931693927f535c96772bc04bd66e3fc2bab24c455ef0b5bac77cc845b644482e89dce8611292610666926002880192611103565b60405180910390a350505050565b6003546001600160a01b031633146106eb5760405162461bcd60e51b815260206004820152603460248201527f53686f756c64206f6e6c792062652063616c6c6564207573696e67207468652060448201527314d310549959da5cdd1c9e4818dbdb9d1c9858dd60621b60648201526084016105ec565b6001600160a01b0383166107415760405162461bcd60e51b815260206004820152601960248201527f696e76616c6964206d657373656e67657220616464726573730000000000000060448201526064016105ec565b6001600160a01b03831660009081526001602052604090205460ff16156107aa5760405162461bcd60e51b815260206004820152601c60248201527f6d657373656e67657220616c726561647920726567697374657265640000000060448201526064016105ec565b60008390506000816001600160a01b0316638da5cb5b6040518163ffffffff1660e01b815260040160206040518083038186803b1580156107ea57600080fd5b505afa1580156107fe573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061082291906110e6565b9050856001600160a01b0316816001600160a01b03161461089a5760405162461bcd60e51b815260206004820152602c60248201527f53686f756c64206f6e6c792062652063616c6c656420627920746865206d657360448201526b39b2b733b2b91037bbb732b960a11b60648201526084016105ec565b6000826001600160a01b031663c9b0cb226040518163ffffffff1660e01b815260040160206040518083038186803b1580156108d557600080fd5b505afa1580156108e9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061090d91906110b2565b90506000836001600160a01b031663663c22696040518163ffffffff1660e01b815260040160206040518083038186803b15801561094a57600080fd5b505afa15801561095e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061098291906110b2565b90506000846001600160a01b031663a50c54256040518163ffffffff1660e01b815260040160206040518083038186803b1580156109bf57600080fd5b505afa1580156109d3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109f791906110b2565b6001600160a01b03808a166000908152600160208181526040808420805460ff1916841790558354948a16845260028252832080549283018155835290912001819055909150610a486064856111b9565b158015610a5457508315155b610abf5760405162461bcd60e51b815260206004820152603660248201527f696e76616c6964206d657373656e67657220707265636973696f6e2c2063616e6044820152753737ba103932b3b4b9ba32b91036b2b9b9b0b733b2b960511b60648201526084016105ec565b60006040518060e00160405280876001600160a01b031681526020018b6001600160a01b031681526020018a8a8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201829052509385525050506020808301899052604080840189905260608401889052608090930186905284546001818101875595835291819020845160079093020180546001600160a01b039384166001600160a01b031991821617825585830151968201805497909416961695909517909155908201518051929392610ba49260028501920190610d2e565b50606082015181600301556080820151816004015560a0820151816005015560c082015181600601555050886001600160a01b0316856001600160a01b03167f65ec88813f8015e2d5de403d956ea4d6c79b88ad66a42ada93a9b4619e10fd888a8a8886604051610c1894939291906111db565b60405180910390a350505050505050505050565b6003546001600160a01b031615610c965760405162461bcd60e51b815260206004820152602860248201527f534c41526567697374727920616464726573732068617320616c7265616479206044820152671899595b881cd95d60c21b60648201526084016105ec565b600380546001600160a01b03191633179055565b828054610cb690611077565b90600052602060002090601f016020900481019282610cd85760008555610d1e565b82601f10610cf15782800160ff19823516178555610d1e565b82800160010185558215610d1e579182015b82811115610d1e578235825591602001919060010190610d03565b50610d2a929150610da2565b5090565b828054610d3a90611077565b90600052602060002090601f016020900481019282610d5c5760008555610d1e565b82601f10610d7557805160ff1916838001178555610d1e565b82800160010185558215610d1e579182015b82811115610d1e578251825591602001919060010190610d87565b5b80821115610d2a5760008155600101610da3565b60008060408385031215610dca57600080fd5b50508035926020909101359150565b60006020808301818452808551808352604092508286019150828160051b8701018488016000805b84811015610ec157898403603f19018652825180516001600160a01b0390811686528982015116898601528781015160e089870181905281519087018190528491905b80831015610e63578183018c01518884016101000152918b0191610e44565b80831115610e755785610100828a0101525b606084810151908901526080808501519089015260a0808501519089015260c09384015193880193909352505095880195601f01601f1916909301610100019291870191600101610e01565b50919998505050505050505050565b60008083601f840112610ee257600080fd5b50813567ffffffffffffffff811115610efa57600080fd5b602083019150836020828501011115610f1257600080fd5b9250929050565b600080600060408486031215610f2e57600080fd5b833567ffffffffffffffff811115610f4557600080fd5b610f5186828701610ed0565b909790965060209590950135949350505050565b6001600160a01b0381168114610f7a57600080fd5b50565b60008060008060608587031215610f9357600080fd5b8435610f9e81610f65565b93506020850135610fae81610f65565b9250604085013567ffffffffffffffff811115610fca57600080fd5b610fd687828801610ed0565b95989497509550505050565b600060208284031215610ff457600080fd5b8135610fff81610f65565b9392505050565b634e487b7160e01b600052601160045260246000fd5b6000821982111561102f5761102f611006565b500190565b60008282101561104657611046611006565b500390565b634e487b7160e01b600052604160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b600181811c9082168061108b57607f821691505b602082108114156110ac57634e487b7160e01b600052602260045260246000fd5b50919050565b6000602082840312156110c457600080fd5b5051919050565b60006000198214156110df576110df611006565b5060010190565b6000602082840312156110f857600080fd5b8151610fff81610f65565b60608152600080855481600182811c91508083168061112357607f831692505b602080841082141561114357634e487b7160e01b86526022600452602486fd5b606088018490526080880182801561116257600181146111735761119e565b60ff1987168252828201975061119e565b60008d81526020902060005b878110156111985781548482015290860190840161117f565b83019850505b50508701989098525050506040909201929092529392505050565b6000826111d657634e487b7160e01b600052601260045260246000fd5b500690565b606081528360608201528385608083013760006080858301015260006080601f19601f87011683010190508360208301528260408301529594505050505056fea2646970667358221220f482f9da448aeedc16de9a69b7df601607bbc533d3a964a2782e5f0cb366f10664736f6c63430008090033";

export class MessengerRegistry__factory extends ContractFactory {
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
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MessengerRegistry> {
    return super.deploy(overrides || {}) as Promise<MessengerRegistry>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): MessengerRegistry {
    return super.attach(address) as MessengerRegistry;
  }
  connect(signer: Signer): MessengerRegistry__factory {
    return super.connect(signer) as MessengerRegistry__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MessengerRegistryInterface {
    return new utils.Interface(_abi) as MessengerRegistryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MessengerRegistry {
    return new Contract(address, _abi, signerOrProvider) as MessengerRegistry;
  }
}
