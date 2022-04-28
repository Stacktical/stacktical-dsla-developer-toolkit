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
import type { PPMessenger, PPMessengerInterface } from "../PPMessenger";

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
        name: "_spName",
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
  "0x60a060405260016004556010805460ff60a01b191690553480156200002357600080fd5b50604051620022e1380380620022e18339810160408190526200004691620002c1565b60006200005b6001600160e01b036200015116565b600680546001600160a01b0319166001600160a01b038316908117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3506001600755620000c2876001600160e01b036200015616565b6001600160601b0319606089901b1660805267016345785d8a00008602600c55600f80546001600160a01b038781166001600160a01b0319928316179092556010805492871692909116919091179055601183905581516200012c90601290602085019062000178565b5080516200014290601390602084019062000178565b505050505050505050620003ab565b335b90565b600280546001600160a01b0319166001600160a01b0392909216919091179055565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620001bb57805160ff1916838001178555620001eb565b82800160010185558215620001eb579182015b82811115620001eb578251825591602001919060010190620001ce565b50620001f9929150620001fd565b5090565b6200015391905b80821115620001f9576000815560010162000204565b600082601f8301126200022b578081fd5b81516001600160401b038082111562000242578283fd5b6040516020601f8401601f191682018101838111838210171562000264578586fd5b806040525081945083825286818588010111156200028157600080fd5b600092505b83831015620002a5578583018101518284018201529182019162000286565b83831115620002b75760008185840101525b5050505092915050565b600080600080600080600080610100898b031215620002de578384fd5b8851620002eb8162000392565b60208a0151909850620002fe8162000392565b60408a015160608b01519198509650620003188162000392565b60808a01519095506200032b8162000392565b60a08a015160c08b015191955093506001600160401b03808211156200034f578384fd5b6200035d8c838d016200021a565b935060e08b015191508082111562000373578283fd5b50620003828b828c016200021a565b9150509295985092959890939650565b6001600160a01b0381168114620003a857600080fd5b50565b60805160601c611f13620003ce6000398061048852806107b25250611f136000f3fe608060405234801561001057600080fd5b506004361061012c5760003560e01c806397a82192116100ad578063c9b0cb2211610071578063c9b0cb2214610220578063ddca3f4314610228578063e450f06114610230578063f2fde38b14610243578063f3881589146102565761012c565b806397a82192146101c9578063a50c5425146101dc578063ae401eb9146101e4578063bc0bfc0014610205578063c2939d97146102185761012c565b8063715018a6116100f4578063715018a61461019657806376ff294b1461019e5780637dc0d1d0146101a657806381d12c58146101ae5780638da5cb5b146101c15761012c565b8063107bf28c14610131578063292733bf1461014f57806346cd680114610164578063663c2269146101795780636e71890d14610181575b600080fd5b61013961025e565b6040516101469190611b39565b60405180910390f35b61016261015d3660046118f6565b610264565b005b61016c6102ff565b6040516101469190611b68565b61013961038d565b610189610393565b6040516101469190611a50565b6101626103a2565b61016c61042b565b610189610486565b6101396101bc3660046118de565b6104aa565b6101896104c8565b6101626101d7366004611936565b6104d7565b6101396108ab565b6101f76101f23660046118de565b6108b1565b604051610146929190611a88565b6101626102133660046118f6565b6108d6565b610139610a6a565b610139610a70565b610139610a76565b61016261023e366004611898565b610a7c565b61016261025136600461187d565b610c03565b610162610cc4565b60115481565b61026c610d01565b6001600160a01b031661027d6104c8565b6001600160a01b0316146102ac5760405162461bcd60e51b81526004016102a390611d56565b60405180910390fd5b600b82905567016345785d8a00008102600c81905560405133917f8e7e22d2820965fa1a8fa3ad76db76127e2f1baaf65f50c4e267f28b2254f7cb916102f3918691611b42565b60405180910390a25050565b6012805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156103855780601f1061035a57610100808354040283529160200191610385565b820191906000526020600020905b81548152906001019060200180831161036857829003601f168201915b505050505081565b600d5490565b600a546001600160a01b031690565b6103aa610d01565b6001600160a01b03166103bb6104c8565b6001600160a01b0316146103e15760405162461bcd60e51b81526004016102a390611d56565b6006546040516000916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600680546001600160a01b0319169055565b6013805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156103855780601f1061035a57610100808354040283529160200191610385565b7f000000000000000000000000000000000000000000000000000000000000000090565b600981815481106104b757fe5b600091825260209091200154905081565b6006546001600160a01b031690565b601054600160a01b900460ff1661051257600a546001600160a01b031633146105125760405162461bcd60e51b81526004016102a390611d15565b600260075414156105355760405162461bcd60e51b81526004016102a390611e54565b6002600755600b546105595760405162461bcd60e51b81526004016102a390611b7b565b8282156105935761058e61056b6104c8565b30600c54610577610d05565b6001600160a01b031692919063ffffffff610d1416565b6105a3565b6105a38230600c54610577610d05565b6105ab611800565b600b546105bf9030622f02ff60ea1b610d72565b9050600080600f60009054906101000a90046001600160a01b03166001600160a01b031663ffa61235856001600160a01b03166346e0fbae6040518163ffffffff1660e01b815260040160206040518083038186803b15801561062157600080fd5b505afa158015610635573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106599190611917565b8a6040518363ffffffff1660e01b8152600401610677929190611b50565b604080518083038186803b15801561068e57600080fd5b505afa1580156106a2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106c69190611988565b91509150610711604051806040016040528060148152602001731cdb1857db5bdb9a5d1bdc9a5b99d7dcdd185c9d60621b81525061070384610d9f565b85919063ffffffff610e7c16565b610748604051806040016040528060128152602001711cdb1857db5bdb9a5d1bdc9a5b99d7d95b9960721b81525061070383610d9f565b6107786040518060400160405280600b81526020016a736c615f6164647265737360a81b81525061070389610eab565b6107ab6040518060400160405280600c81526020016b6e6574776f726b5f6e616d6560a01b815250610703601154611027565b60006107da7f000000000000000000000000000000000000000000000000000000000000000085600c5461112d565b6009805460018082019092557f6e1540171b6c0c960b71a7020d9f60077f6af931a8bbf590da0223dacf75c7af018290556040805180820182526001600160a01b038c8116825260208083018f81526000878152600890925290849020925183546001600160a01b0319169083161783555191840191909155600d80549093019283905590519293508816917feab5eb77e722078f3fab7eb6a77c74f7001181e1e3a74d51b7b5747ee1b31cb991610893918590611b42565b60405180910390a25050600160075550505050505050565b600e5490565b600860205260009081526040902080546001909101546001600160a01b039091169082565b600260075414156108f95760405162461bcd60e51b81526004016102a390611e54565b600260075560008281526005602052604090205482906001600160a01b031633146109365760405162461bcd60e51b81526004016102a390611dc2565b60008181526005602052604080822080546001600160a01b03191690555182917f7cc135e0cebb02c3480ae5d74d377283180a2601f8f644edf7987b009316c63a91a2610981611835565b506000838152600860209081526040918290208251808401845281546001600160a01b0316808252600190920154928101839052925186927f56514ef6e1ffd0f970ebf32dc181e476384e6e53a8351719040b4030318a933b916109e791908890611b42565b60405180910390a3600e8054600101905580516020820151604051636bd2e21160e11b81526001600160a01b039092169163d7a5c42291610a2d91879190600401611b42565b600060405180830381600087803b158015610a4757600080fd5b505af1158015610a5b573d6000803e3d6000fd5b50506001600755505050505050565b600b5490565b6103e890565b600c5490565b6010805460ff60a01b1916600160a01b179081905560405163ab9a81a560e01b81526001600160a01b039091169063ab9a81a590610ac09085908590600401611a88565b60206040518083038186803b158015610ad857600080fd5b505afa158015610aec573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b1091906118c2565b610b2c5760405162461bcd60e51b81526004016102a390611c29565b6040516320c876ef60e11b815282906000906001600160a01b03831690634190edde90610b5d908690600401611b39565b60606040518083038186803b158015610b7557600080fd5b505afa158015610b89573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bad91906119ab565b925060009150610bba9050565b816002811115610bc657fe5b14610be35760405162461bcd60e51b81526004016102a390611c60565b610bf083856000336104d7565b50506010805460ff60a01b191690555050565b610c0b610d01565b6001600160a01b0316610c1c6104c8565b6001600160a01b031614610c425760405162461bcd60e51b81526004016102a390611d56565b6001600160a01b038116610c685760405162461bcd60e51b81526004016102a390611ba0565b6006546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3600680546001600160a01b0319166001600160a01b0392909216919091179055565b600a546001600160a01b031615610ced5760405162461bcd60e51b81526004016102a390611ccd565b600a80546001600160a01b03191633179055565b3390565b6002546001600160a01b031690565b610d6c846323b872dd60e01b858585604051602401610d3593929190611a64565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b03199093169290921790915261126c565b50505050565b610d7a611800565b610d82611800565b610d948186868663ffffffff6112fb16565b9150505b9392505050565b60608180610dc65750506040805180820190915260018152600360fc1b6020820152610e77565b8060005b8115610dde57600101600a82049150610dca565b60608167ffffffffffffffff81118015610df757600080fd5b506040519080825280601f01601f191660200182016040528015610e22576020820181803683370190505b50905060001982015b8415610e7057600a850660300160f81b82828060019003935081518110610e4e57fe5b60200101906001600160f81b031916908160001a905350600a85049450610e2b565b5093505050505b919050565b6080830151610e91908363ffffffff61133816565b6080830151610ea6908263ffffffff61133816565b505050565b604080518082018252601081526f181899199a1a9b1b9c1cb0b131b232b360811b60208201528151602a80825260608281019094526001600160a01b03851692918491602082018180368337019050509050600360fc1b81600081518110610f0f57fe5b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110610f3857fe5b60200101906001600160f81b031916908160001a90535060005b601481101561101e578260048583600c0160208110610f6d57fe5b1a60f81b6001600160f81b031916901c60f81c60ff1681518110610f8d57fe5b602001015160f81c60f81b828260020260020181518110610faa57fe5b60200101906001600160f81b031916908160001a905350828482600c0160208110610fd157fe5b825191901a600f16908110610fe257fe5b602001015160f81c60f81b828260020260030181518110610fff57fe5b60200101906001600160f81b031916908160001a905350600101610f52565b50949350505050565b606060005b60208160ff1610801561105a5750828160ff166020811061104957fe5b1a60f81b6001600160f81b03191615155b156110675760010161102c565b60608160ff1667ffffffffffffffff8111801561108357600080fd5b506040519080825280601f01601f1916602001820160405280156110ae576020820181803683370190505b509050600091505b60208260ff161080156110e45750838260ff16602081106110d357fe5b1a60f81b6001600160f81b03191615155b15610d9857838260ff16602081106110f857fe5b1a60f81b818360ff168151811061110b57fe5b60200101906001600160f81b031916908160001a9053506001909101906110b6565b600030600454604051602001611144929190611a2e565b60408051808303601f19018152918152815160209283012060045460608701526000818152600590935281832080546001600160a01b0319166001600160a01b038916179055905190925082917fb5e6e01e79f91267dc17b4e6314d5d4d03593d2ceee0fbb452b750bd70ea5af991a26002546001600160a01b0316634000aea085846111d087611355565b6040518463ffffffff1660e01b81526004016111ee93929190611b09565b602060405180830381600087803b15801561120857600080fd5b505af115801561121c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061124091906118c2565b61125c5760405162461bcd60e51b81526004016102a390611be6565b6004805460010190559392505050565b60606112c1826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166113d19092919063ffffffff16565b805190915015610ea657808060200190518101906112df91906118c2565b610ea65760405162461bcd60e51b81526004016102a390611e0a565b611303611800565b61131385608001516101006113e8565b50509183526001600160a01b031660208301526001600160e01b031916604082015290565b6113458260038351611428565b610ea6828263ffffffff61153216565b6060634042994660e01b60008084600001518560200151866040015187606001516001896080015160000151604051602401611398989796959493929190611aa1565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b0319909316929092179091529050919050565b60606113e0848460008561154c565b949350505050565b6113f061184c565b60208206156114055760208206602003820191505b506020808301829052604080518085526000815283019091019052815b92915050565b6017811161144f576114498360e0600585901b16831763ffffffff61160d16565b50610ea6565b60ff811161148557611472836018611fe0600586901b161763ffffffff61160d16565b506114498382600163ffffffff61162516565b61ffff81116114bc576114a9836019611fe0600586901b161763ffffffff61160d16565b506114498382600263ffffffff61162516565b63ffffffff81116114f5576114e283601a611fe0600586901b161763ffffffff61160d16565b506114498382600463ffffffff61162516565b67ffffffffffffffff8111610ea65761151f83601b611fe0600586901b161763ffffffff61160d16565b50610d6c8382600863ffffffff61162516565b61153a61184c565b610d988384600001515184855161163e565b60608247101561156e5760405162461bcd60e51b81526004016102a390611c87565b611577856116ea565b6115935760405162461bcd60e51b81526004016102a390611d8b565b60006060866001600160a01b031685876040516115b09190611a12565b60006040518083038185875af1925050503d80600081146115ed576040519150601f19603f3d011682016040523d82523d6000602084013e6115f2565b606091505b50915091506116028282866116f0565b979650505050505050565b61161561184c565b610d988384600001515184611729565b61162d61184c565b6113e0848560000151518585611774565b61164661184c565b825182111561165457600080fd5b8460200151828501111561167e5761167e8561167687602001518786016117d2565b6002026117e9565b60008086518051876020830101935080888701111561169d5787860182525b505050602084015b602084106116c45780518252601f1990930192602091820191016116a5565b51815160001960208690036101000a019081169019919091161790525083949350505050565b3b151590565b606083156116ff575081610d98565b82511561170f5782518084602001fd5b8160405162461bcd60e51b81526004016102a39190611b68565b61173161184c565b8360200151831061174d5761174d8485602001516002026117e9565b83518051602085830101848153508085141561176a576001810182525b5093949350505050565b61177c61184c565b8460200151848301111561179957611799858584016002026117e9565b60006001836101000a0390508551838682010185831982511617815250805184870111156117c75783860181525b509495945050505050565b6000818311156117e3575081611422565b50919050565b81516117f583836113e8565b50610d6c8382611532565b6040805160a08101825260008082526020820181905291810182905260608101919091526080810161183061184c565b905290565b604080518082019091526000808252602082015290565b604051806040016040528060608152602001600081525090565b80356001600160a01b038116811461142257600080fd5b60006020828403121561188e578081fd5b610d988383611866565b600080604083850312156118aa578081fd5b6118b48484611866565b946020939093013593505050565b6000602082840312156118d3578081fd5b8151610d9881611ecf565b6000602082840312156118ef578081fd5b5035919050565b60008060408385031215611908578182fd5b50508035926020909101359150565b600060208284031215611928578081fd5b815160068110610d98578182fd5b6000806000806080858703121561194b578182fd5b84359350602085013561195d81611eb7565b9250604085013561196d81611ecf565b9150606085013561197d81611eb7565b939692955090935050565b6000806040838503121561199a578182fd5b505080516020909101519092909150565b6000806000606084860312156119bf578283fd5b83519250602084015191506040840151600381106119db578182fd5b809150509250925092565b600081518084526119fe816020860160208601611e8b565b601f01601f19169290920160200192915050565b60008251611a24818460208701611e8b565b9190910192915050565b60609290921b6bffffffffffffffffffffffff19168252601482015260340190565b6001600160a01b0391909116815260200190565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6001600160a01b03929092168252602082015260400190565b6001600160a01b0389811682526020820189905260408201889052861660608201526001600160e01b03198516608082015260a0810184905260c0810183905261010060e08201819052600090611afa838201856119e6565b9b9a5050505050505050505050565b600060018060a01b038516825283602083015260606040830152611b3060608301846119e6565b95945050505050565b90815260200190565b918252602082015260400190565b6040810160068410611b5e57fe5b9281526020015290565b600060208252610d9860208301846119e6565b6020808252600b908201526a5f6a6f624920656d70747960a81b604082015260600190565b60208082526026908201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160408201526564647265737360d01b606082015260800190565b60208082526023908201527f756e61626c6520746f207472616e73666572416e6443616c6c20746f206f7261604082015262636c6560e81b606082015260800190565b6020808252601b908201527f5374616b6552656769737472793a206e6f742076657269666965640000000000604082015260600190565b6020808252600d908201526c14d3104e881d995c9a599a5959609a1b604082015260600190565b60208082526026908201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6040820152651c8818d85b1b60d21b606082015260800190565b60208082526028908201527f534c41526567697374727920616464726573732068617320616c7265616479206040820152671899595b881cd95d60c21b606082015260800190565b60208082526021908201527f43616e206f6e6c792062652063616c6c656420627920534c41526567697374726040820152607960f81b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b6020808252601d908201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604082015260600190565b60208082526028908201527f536f75726365206d75737420626520746865206f7261636c65206f6620746865604082015267081c995c5d595cdd60c21b606082015260800190565b6020808252602a908201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6040820152691bdd081cdd58d8d9595960b21b606082015260800190565b6020808252601f908201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604082015260600190565b60005b83811015611ea6578181015183820152602001611e8e565b83811115610d6c5750506000910152565b6001600160a01b0381168114611ecc57600080fd5b50565b8015158114611ecc57600080fdfea2646970667358221220326ba73f3808c353aa63c3f1f7ea76e18aca641e807502b1567dabda3fb624a164736f6c63430006060033";

export class PPMessenger__factory extends ContractFactory {
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
    _spName: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<PPMessenger> {
    return super.deploy(
      _messengerChainlinkOracle,
      _messengerChainlinkToken,
      _feeMultiplier,
      _periodRegistry,
      _stakeRegistry,
      _networkName,
      _lpName,
      _spName,
      overrides || {}
    ) as Promise<PPMessenger>;
  }
  getDeployTransaction(
    _messengerChainlinkOracle: string,
    _messengerChainlinkToken: string,
    _feeMultiplier: BigNumberish,
    _periodRegistry: string,
    _stakeRegistry: string,
    _networkName: BytesLike,
    _lpName: string,
    _spName: string,
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
      _spName,
      overrides || {}
    );
  }
  attach(address: string): PPMessenger {
    return super.attach(address) as PPMessenger;
  }
  connect(signer: Signer): PPMessenger__factory {
    return super.connect(signer) as PPMessenger__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PPMessengerInterface {
    return new utils.Interface(_abi) as PPMessengerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PPMessenger {
    return new Contract(address, _abi, signerOrProvider) as PPMessenger;
  }
}
