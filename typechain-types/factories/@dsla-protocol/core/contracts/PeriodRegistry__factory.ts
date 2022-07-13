/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  PeriodRegistry,
  PeriodRegistryInterface,
} from "../../../../@dsla-protocol/core/contracts/PeriodRegistry";

const _abi = [
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
        indexed: false,
        internalType: "enum IPeriodRegistry.PeriodType",
        name: "periodType",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "periodsAdded",
        type: "uint256",
      },
    ],
    name: "PeriodInitialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "enum IPeriodRegistry.PeriodType",
        name: "periodType",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "periodsAdded",
        type: "uint256",
      },
    ],
    name: "PeriodModified",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "enum IPeriodRegistry.PeriodType",
        name: "_periodType",
        type: "uint8",
      },
      {
        internalType: "uint256[]",
        name: "_periodStarts",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_periodEnds",
        type: "uint256[]",
      },
    ],
    name: "addPeriodsToPeriodType",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getPeriodDefinitions",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "initialized",
            type: "bool",
          },
          {
            internalType: "uint256[]",
            name: "starts",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "ends",
            type: "uint256[]",
          },
        ],
        internalType: "struct PeriodRegistry.PeriodDefinition[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IPeriodRegistry.PeriodType",
        name: "_periodType",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_periodId",
        type: "uint256",
      },
    ],
    name: "getPeriodStartAndEnd",
    outputs: [
      {
        internalType: "uint256",
        name: "start",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "end",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IPeriodRegistry.PeriodType",
        name: "_periodType",
        type: "uint8",
      },
      {
        internalType: "uint256[]",
        name: "_periodStarts",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_periodEnds",
        type: "uint256[]",
      },
    ],
    name: "initializePeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IPeriodRegistry.PeriodType",
        name: "_periodType",
        type: "uint8",
      },
    ],
    name: "isInitializedPeriod",
    outputs: [
      {
        internalType: "bool",
        name: "initialized",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IPeriodRegistry.PeriodType",
        name: "_periodType",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_periodId",
        type: "uint256",
      },
    ],
    name: "isValidPeriod",
    outputs: [
      {
        internalType: "bool",
        name: "valid",
        type: "bool",
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
        internalType: "enum IPeriodRegistry.PeriodType",
        name: "",
        type: "uint8",
      },
    ],
    name: "periodDefinitions",
    outputs: [
      {
        internalType: "bool",
        name: "initialized",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IPeriodRegistry.PeriodType",
        name: "_periodType",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_periodId",
        type: "uint256",
      },
    ],
    name: "periodHasStarted",
    outputs: [
      {
        internalType: "bool",
        name: "started",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IPeriodRegistry.PeriodType",
        name: "_periodType",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_periodId",
        type: "uint256",
      },
    ],
    name: "periodIsFinished",
    outputs: [
      {
        internalType: "bool",
        name: "finished",
        type: "bool",
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
  "0x608060405234801561001057600080fd5b5061001a3361001f565b61006f565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6115348061007e6000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063a163f02011610071578063a163f0201461014f578063c7b6ceb414610162578063d62e307514610175578063ddfc4fde1461018a578063f2fde38b1461019d578063ffa61235146101b057600080fd5b80635c98d157146100b9578063715018a6146100f15780637a1d83bc146100fb5780638da5cb5b1461010e5780638fdec1da14610129578063963a470b1461013c575b600080fd5b6100dc6100c73660046111de565b60016020526000908152604090205460ff1681565b60405190151581526020015b60405180910390f35b6100f96101d8565b005b6100dc610109366004611200565b6101ec565b6000546040516001600160a01b0390911681526020016100e8565b6100dc6101373660046111de565b6102a2565b6100f961014a3660046112db565b6102e5565b6100f961015d3660046112db565b610339565b6100dc610170366004611200565b610380565b61017d61041d565b6040516100e8919061138a565b6100dc610198366004611200565b610b7a565b6100f96101ab36600461141d565b610bcc565b6101c36101be366004611200565b610c45565b604080519283526020830191909152016100e8565b6101e0610d78565b6101ea6000610dd2565b565b60006101f88383610b7a565b6102445760405162461bcd60e51b815260206004820152601860248201527714195c9a5bd90819185d18481a5cc81b9bdd081d985b1a5960421b60448201526064015b60405180910390fd5b426001600085600581111561025b5761025b611446565b600581111561026c5761026c611446565b8152602001908152602001600020600101838154811061028e5761028e61145c565b906000526020600020015410905092915050565b6000600160008360058111156102ba576102ba611446565b60058111156102cb576102cb611446565b815260208101919091526040016000205460ff1692915050565b6102ed610d78565b6102fa6001848484610e22565b7f22453266e5e1e7468fee2b84c776e3bd5917bfd8a60abb3c0b95561bb22062da83835160405161032c929190611472565b60405180910390a1505050565b610341610d78565b61034e6000848484610e22565b7f2b0f2d8c9036efbd14cb23d06c56d37fca048c5062ada3454a3ab584762d630183835160405161032c929190611472565b600061038c8383610b7a565b6103d35760405162461bcd60e51b815260206004820152601860248201527714195c9a5bd90819185d18481a5cc81b9bdd081d985b1a5960421b604482015260640161023b565b42600160008560058111156103ea576103ea611446565b60058111156103fb576103fb611446565b8152602001908152602001600020600201838154811061028e5761028e61145c565b60408051600680825260e0820190925260609160009190816020015b61045f604051806060016040528060001515815260200160608152602001606081525090565b8152602001906001900390816104395750506000805260016020908152604080516060810182527fa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb49805460ff16151582527fa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb4a8054845181870281018701909552808552959650919490938581019392919083018282801561051f57602002820191906000526020600020905b81548152602001906001019080831161050b575b505050505081526020016002820180548060200260200160405190810160405280929190818152602001828054801561057757602002820191906000526020600020905b815481526020019060010190808311610563575b505050505081525050816000815181106105935761059361145c565b602090810291909101810191909152600160008190528152604080516060810182527fcc69885fda6bcc1a4ace058b4a62bf5e179ea78fd58a1ccd71c22cc9b688792f805460ff16151582527fcc69885fda6bcc1a4ace058b4a62bf5e179ea78fd58a1ccd71c22cc9b688793080548451818702810187019095528085529294919385830193909283018282801561064a57602002820191906000526020600020905b815481526020019060010190808311610636575b50505050508152602001600282018054806020026020016040519081016040528092919081815260200182805480156106a257602002820191906000526020600020905b81548152602001906001019080831161068e575b505050505081525050816001815181106106be576106be61145c565b602090810291909101810191909152600260005260018152604080516060810182527fd9d16d34ffb15ba3a3d852f0d403e2ce1d691fb54de27ac87cd2f993f3ec330f805460ff16151582527fd9d16d34ffb15ba3a3d852f0d403e2ce1d691fb54de27ac87cd2f993f3ec331080548451818702810187019095528085529294919385830193909283018282801561077557602002820191906000526020600020905b815481526020019060010190808311610761575b50505050508152602001600282018054806020026020016040519081016040528092919081815260200182805480156107cd57602002820191906000526020600020905b8154815260200190600101908083116107b9575b505050505081525050816002815181106107e9576107e961145c565b602090810291909101810191909152600360005260018152604080516060810182527f7dfe757ecd65cbd7922a9c0161e935dd7fdbcc0e999689c7d31633896b1fc60b805460ff16151582527f7dfe757ecd65cbd7922a9c0161e935dd7fdbcc0e999689c7d31633896b1fc60c8054845181870281018701909552808552929491938583019390928301828280156108a057602002820191906000526020600020905b81548152602001906001019080831161088c575b50505050508152602001600282018054806020026020016040519081016040528092919081815260200182805480156108f857602002820191906000526020600020905b8154815260200190600101908083116108e4575b505050505081525050816003815181106109145761091461145c565b602090810291909101810191909152600460005260018152604080516060810182527fedc95719e9a3b28dd8e80877cb5880a9be7de1a13fc8b05e7999683b6b567643805460ff16151582527fedc95719e9a3b28dd8e80877cb5880a9be7de1a13fc8b05e7999683b6b5676448054845181870281018701909552808552929491938583019390928301828280156109cb57602002820191906000526020600020905b8154815260200190600101908083116109b7575b5050505050815260200160028201805480602002602001604051908101604052809291908181526020018280548015610a2357602002820191906000526020600020905b815481526020019060010190808311610a0f575b50505050508152505081600481518110610a3f57610a3f61145c565b602090810291909101810191909152600560005260018152604080516060810182527fe2689cd4a84e23ad2f564004f1c9013e9589d260bde6380aba3ca7e09e4df40c805460ff16151582527fe2689cd4a84e23ad2f564004f1c9013e9589d260bde6380aba3ca7e09e4df40d805484518187028101870190955280855292949193858301939092830182828015610af657602002820191906000526020600020905b815481526020019060010190808311610ae2575b5050505050815260200160028201805480602002602001604051908101604052809291908181526020018280548015610b4e57602002820191906000526020600020905b815481526020019060010190808311610b3a575b50505050508152505081600581518110610b6a57610b6a61145c565b6020908102919091010152919050565b6000816001806000866005811115610b9457610b94611446565b6005811115610ba557610ba5611446565b8152602081019190915260400160002060010154610bc391906114b4565b10159392505050565b610bd4610d78565b6001600160a01b038116610c395760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161023b565b610c4281610dd2565b50565b60008060016000856005811115610c5e57610c5e611446565b6005811115610c6f57610c6f611446565b81526020810191909152604001600020600101548310610cc55760405162461bcd60e51b8152602060048201526011602482015270125b9d985b1a59081c195c9a5bd9081a59607a1b604482015260640161023b565b60016000856005811115610cdb57610cdb611446565b6005811115610cec57610cec611446565b81526020019081526020016000206001018381548110610d0e57610d0e61145c565b9060005260206000200154915060016000856005811115610d3157610d31611446565b6005811115610d4257610d42611446565b81526020019081526020016000206002018381548110610d6457610d6461145c565b906000526020600020015490509250929050565b6000546001600160a01b031633146101ea5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161023b565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000825111610e735760405162461bcd60e51b815260206004820152601860248201527f506572696f64206c656e6774682063616e277420626520300000000000000000604482015260640161023b565b8051825114610edf5760405162461bcd60e51b815260206004820152603260248201527f506572696f64206c656e67746820696e20737461727420616e6420656e6420616044820152710e4e4c2f2e640e6d0deead8c840dac2e8c6d60731b606482015260840161023b565b600060016000856005811115610ef757610ef7611446565b6005811115610f0857610f08611446565b815260200190815260200160002090508415610f7457805460ff16610f6f5760405162461bcd60e51b815260206004820152601e60248201527f506572696f6420776173206e6f7420696e697469616c697a6564207965740000604482015260640161023b565b610fc6565b805460ff1615610fc65760405162461bcd60e51b815260206004820152601f60248201527f506572696f64207479706520616c726561647920696e697469616c697a656400604482015260640161023b565b60005b83518110156111b857828181518110610fe457610fe461145c565b6020026020010151848281518110610ffe57610ffe61145c565b6020026020010151106110535760405162461bcd60e51b815260206004820152601a60248201527f53746172742073686f756c64206265206265666f726520656e64000000000000604482015260640161023b565b6001845161106191906114b4565b8110156111395782818151811061107a5761107a61145c565b60200260200101518482600161109091906114cb565b815181106110a0576110a061145c565b60200260200101516110b291906114b4565b6001146111395760405162461bcd60e51b815260206004820152604960248201527f5374617274206f66206120706572696f642073686f756c64206265203120736560448201527f636f6e642061667465722074686520656e64206f66207468652070726576696f6064820152681d5cc81c195c9a5bd960ba1b608482015260a40161023b565b8160010184828151811061114f5761114f61145c565b60209081029190910181015182546001810184556000938452919092200155825160028301908490839081106111875761118761145c565b60209081029190910181015182546001810184556000938452919092200155806111b0816114e3565b915050610fc9565b50805460ff1916600117905550505050565b8035600681106111d957600080fd5b919050565b6000602082840312156111f057600080fd5b6111f9826111ca565b9392505050565b6000806040838503121561121357600080fd5b61121c836111ca565b946020939093013593505050565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261125157600080fd5b8135602067ffffffffffffffff8083111561126e5761126e61122a565b8260051b604051601f19603f830116810181811084821117156112935761129361122a565b6040529384528581018301938381019250878511156112b157600080fd5b83870191505b848210156112d0578135835291830191908301906112b7565b979650505050505050565b6000806000606084860312156112f057600080fd5b6112f9846111ca565b9250602084013567ffffffffffffffff8082111561131657600080fd5b61132287838801611240565b9350604086013591508082111561133857600080fd5b5061134586828701611240565b9150509250925092565b600081518084526020808501945080840160005b8381101561137f57815187529582019590820190600101611363565b509495945050505050565b60006020808301818452808551808352604092508286019150828160051b87010184880160005b8381101561140f57603f198984030185528151606081511515855288820151818a8701526113e18287018261134f565b915050878201519150848103888601526113fb818361134f565b9689019694505050908601906001016113b1565b509098975050505050505050565b60006020828403121561142f57600080fd5b81356001600160a01b03811681146111f957600080fd5b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b604081016006841061149457634e487b7160e01b600052602160045260246000fd5b9281526020015290565b634e487b7160e01b600052601160045260246000fd5b6000828210156114c6576114c661149e565b500390565b600082198211156114de576114de61149e565b500190565b60006000198214156114f7576114f761149e565b506001019056fea26469706673582212208c2ca60e871b838cf0927f110afb74f1fdfa474e13e5f4adc5687f5a9d5aa23764736f6c63430008090033";

type PeriodRegistryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PeriodRegistryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PeriodRegistry__factory extends ContractFactory {
  constructor(...args: PeriodRegistryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<PeriodRegistry> {
    return super.deploy(overrides || {}) as Promise<PeriodRegistry>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): PeriodRegistry {
    return super.attach(address) as PeriodRegistry;
  }
  override connect(signer: Signer): PeriodRegistry__factory {
    return super.connect(signer) as PeriodRegistry__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PeriodRegistryInterface {
    return new utils.Interface(_abi) as PeriodRegistryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PeriodRegistry {
    return new Contract(address, _abi, signerOrProvider) as PeriodRegistry;
  }
}