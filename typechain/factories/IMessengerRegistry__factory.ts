/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IMessengerRegistry,
  IMessengerRegistryInterface,
} from "../IMessengerRegistry";

const _abi = [
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

export class IMessengerRegistry__factory {
  static readonly abi = _abi;
  static createInterface(): IMessengerRegistryInterface {
    return new utils.Interface(_abi) as IMessengerRegistryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IMessengerRegistry {
    return new Contract(address, _abi, signerOrProvider) as IMessengerRegistry;
  }
}
