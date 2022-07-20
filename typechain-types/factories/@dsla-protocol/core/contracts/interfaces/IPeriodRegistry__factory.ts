/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IPeriodRegistry,
  IPeriodRegistryInterface,
} from "../../../../../@dsla-protocol/core/contracts/interfaces/IPeriodRegistry";

const _abi = [
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
        name: "",
        type: "uint256",
      },
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
        internalType: "enum IPeriodRegistry.PeriodType",
        name: "_periodType",
        type: "uint8",
      },
    ],
    name: "isInitializedPeriod",
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
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IPeriodRegistry__factory {
  static readonly abi = _abi;
  static createInterface(): IPeriodRegistryInterface {
    return new utils.Interface(_abi) as IPeriodRegistryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IPeriodRegistry {
    return new Contract(address, _abi, signerOrProvider) as IPeriodRegistry;
  }
}
