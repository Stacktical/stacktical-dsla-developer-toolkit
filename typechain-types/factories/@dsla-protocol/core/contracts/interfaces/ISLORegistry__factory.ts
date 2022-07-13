/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  ISLORegistry,
  ISLORegistryInterface,
} from "../../../../../@dsla-protocol/core/contracts/interfaces/ISLORegistry";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_sli",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_slaAddress",
        type: "address",
      },
    ],
    name: "getDeviation",
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
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_slaAddress",
        type: "address",
      },
    ],
    name: "isRespected",
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

export class ISLORegistry__factory {
  static readonly abi = _abi;
  static createInterface(): ISLORegistryInterface {
    return new utils.Interface(_abi) as ISLORegistryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ISLORegistry {
    return new Contract(address, _abi, signerOrProvider) as ISLORegistry;
  }
}