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
    inputs: [],
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
  "0x608060405234801561001057600080fd5b5061111d806100206000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c806369b5354b14610067578063822d332e146100855780639f69d7f81461009a578063eabb8a73146100af578063ef4003db146100c2578063f3881589146100e2575b600080fd5b61006f6100ea565b60405161007c9190610d39565b60405180910390f35b610098610093366004610c7f565b6103f8565b005b6100a2610557565b60405161007c91906110ba565b6100986100bd366004610c1c565b61055d565b6100d56100d0366004610bdd565b6109b4565b60405161007c9190610def565b6100986109d2565b600054606090819067ffffffffffffffff8111801561010857600080fd5b5060405190808252806020026020018201604052801561014257816020015b61012f610a41565b8152602001906001900390816101275790505b50905060005b6000548110156103f157600080828154811061016057fe5b906000526020600020906007020160010160009054906101000a90046001600160a01b031690506040518060e001604052806000848154811061019f57fe5b600091825260208083206007909202909101546001600160a01b031683528154920191859081106101cc57fe5b60009182526020808320600160079093020191909101546001600160a01b031683528154920191859081106101fd57fe5b600091825260209182902060026007909202018101805460408051601f6000196101006001861615020190931694909404918201859004850284018501905280835291929091908301828280156102955780601f1061026a57610100808354040283529160200191610295565b820191906000526020600020905b81548152906001019060200180831161027857829003601f168201915b50505050508152602001600084815481106102ac57fe5b9060005260206000209060070201600301548152602001826001600160a01b031663663c22696040518163ffffffff1660e01b815260040160206040518083038186803b1580156102fc57600080fd5b505afa158015610310573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103349190610cc9565b8152602001826001600160a01b031663a50c54256040518163ffffffff1660e01b815260040160206040518083038186803b15801561037257600080fd5b505afa158015610386573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103aa9190610cc9565b8152602001600084815481106103bc57fe5b9060005260206000209060070201600601548152508383815181106103dd57fe5b602090810291909101015250600101610148565b5090505b90565b600080828154811061040657fe5b906000526020600020906007020190508060010160009054906101000a90046001600160a01b03166001600160a01b0316638da5cb5b6040518163ffffffff1660e01b815260040160206040518083038186803b15801561046657600080fd5b505afa15801561047a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061049e9190610c00565b6001600160a01b0316336001600160a01b0316146104d75760405162461bcd60e51b81526004016104ce90610ecd565b60405180910390fd5b6104e5600282018585610a90565b5080546001600160a01b03191633178082556001820154600383015460068401546040516001600160a01b0393841694909316927f535c96772bc04bd66e3fc2bab24c455ef0b5bac77cc845b644482e89dce8611292610549926002880192610e39565b60405180910390a350505050565b60005490565b6003546001600160a01b031633146105875760405162461bcd60e51b81526004016104ce90610f0e565b6001600160a01b03831660009081526001602052604090205460ff16156105c05760405162461bcd60e51b81526004016104ce90610f62565b60008390506000816001600160a01b0316638da5cb5b6040518163ffffffff1660e01b815260040160206040518083038186803b15801561060057600080fd5b505afa158015610614573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106389190610c00565b9050856001600160a01b0316816001600160a01b03161461066b5760405162461bcd60e51b81526004016104ce9061106e565b6000826001600160a01b031663c9b0cb226040518163ffffffff1660e01b815260040160206040518083038186803b1580156106a657600080fd5b505afa1580156106ba573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106de9190610cc9565b90506000836001600160a01b031663663c22696040518163ffffffff1660e01b815260040160206040518083038186803b15801561071b57600080fd5b505afa15801561072f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107539190610cc9565b90506000846001600160a01b031663a50c54256040518163ffffffff1660e01b815260040160206040518083038186803b15801561079057600080fd5b505afa1580156107a4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107c89190610cc9565b6001600160a01b03808a166000908152600160208181526040808420805460ff1916841790558354948a1684526002825283208054928301815583529091200181905590915061081f84606463ffffffff610a0f16565b15801561082b57508315155b6108475760405162461bcd60e51b81526004016104ce90611018565b60006040518060e00160405280876001600160a01b031681526020018b6001600160a01b031681526020018a8a8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201829052509385525050506020808301899052604080840189905260608401889052608090930186905284546001818101875595835291819020845160079093020180546001600160a01b039384166001600160a01b03199182161782558583015196820180549790941696169590951790915590820151805192939261092c9260028501920190610b0e565b50606082015181600301556080820151816004015560a0820151816005015560c082015181600601555050886001600160a01b0316856001600160a01b03167f65ec88813f8015e2d5de403d956ea4d6c79b88ad66a42ada93a9b4619e10fd888a8a88866040516109a09493929190610dfa565b60405180910390a350505050505050505050565b6001600160a01b031660009081526001602052604090205460ff1690565b6003546001600160a01b0316156109fb5760405162461bcd60e51b81526004016104ce90610f99565b600380546001600160a01b03191633179055565b6000808211610a305760405162461bcd60e51b81526004016104ce90610fe1565b818381610a3957fe5b069392505050565b6040518060e0016040528060006001600160a01b0316815260200160006001600160a01b0316815260200160608152602001600081526020016000815260200160008152602001600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610ad15782800160ff19823516178555610afe565b82800160010185558215610afe579182015b82811115610afe578235825591602001919060010190610ae3565b50610b0a929150610b7c565b5090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610b4f57805160ff1916838001178555610afe565b82800160010185558215610afe579182015b82811115610afe578251825591602001919060010190610b61565b6103f591905b80821115610b0a5760008155600101610b82565b60008083601f840112610ba7578182fd5b50813567ffffffffffffffff811115610bbe578182fd5b602083019150836020828501011115610bd657600080fd5b9250929050565b600060208284031215610bee578081fd5b8135610bf9816110cf565b9392505050565b600060208284031215610c11578081fd5b8151610bf9816110cf565b60008060008060608587031215610c31578283fd5b8435610c3c816110cf565b93506020850135610c4c816110cf565b9250604085013567ffffffffffffffff811115610c67578283fd5b610c7387828801610b96565b95989497509550505050565b600080600060408486031215610c93578283fd5b833567ffffffffffffffff811115610ca9578384fd5b610cb586828701610b96565b909790965060209590950135949350505050565b600060208284031215610cda578081fd5b5051919050565b6001600160a01b03169052565b60008151808452815b81811015610d1357602081850181015186830182015201610cf7565b81811115610d245782602083870101525b50601f01601f19169290920160200192915050565b60208082528251828201819052600091906040908185019080840286018301878501865b83811015610de157603f19898403018552815160e0610d7d858351610ce1565b88820151610d8d8a870182610ce1565b50878201518189870152610da382870182610cee565b606084810151908801526080808501519088015260a0808501519088015260c093840151939096019290925250509386019390860190600101610d5d565b509098975050505050505050565b901515815260200190565b6000606082528460608301528486608084013780608086840101526080601f19601f870116830101905083602083015282604083015295945050505050565b60006060820160608352818654600180821660008114610e605760018114610e7e57610eb7565b60028304607f16855260ff198316608088015260a087019350610eb7565b60028304808652610e8e8b6110c3565b875b82811015610ead5781548a82016080015290840190602001610e90565b8901608001955050505b5050506020840195909552505060400152919050565b60208082526021908201527f43616e206f6e6c79206265206d6f64696669656420627920746865206f776e656040820152603960f91b606082015260800190565b60208082526034908201527f53686f756c64206f6e6c792062652063616c6c6564207573696e67207468652060408201527314d310549959da5cdd1c9e4818dbdb9d1c9858dd60621b606082015260800190565b6020808252601c908201527f6d657373656e67657220616c7265616479207265676973746572656400000000604082015260600190565b60208082526028908201527f534c41526567697374727920616464726573732068617320616c7265616479206040820152671899595b881cd95d60c21b606082015260800190565b60208082526018908201527f536166654d6174683a206d6f64756c6f206279207a65726f0000000000000000604082015260600190565b60208082526036908201527f696e76616c6964206d657373656e67657220707265636973696f6e2c2063616e6040820152753737ba103932b3b4b9ba32b91036b2b9b9b0b733b2b960511b606082015260800190565b6020808252602c908201527f53686f756c64206f6e6c792062652063616c6c656420627920746865206d657360408201526b39b2b733b2b91037bbb732b960a11b606082015260800190565b90815260200190565b60009081526020902090565b6001600160a01b03811681146110e457600080fd5b5056fea2646970667358221220675cd4dacc8e6e43fc0c8c3912c4a2d39053f9ce05f1c4a9139245181ec0725164736f6c63430006060033";

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
