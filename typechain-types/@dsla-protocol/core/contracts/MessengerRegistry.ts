/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export declare namespace MessengerRegistry {
  export type MessengerStruct = {
    ownerAddress: PromiseOrValue<string>;
    messengerAddress: PromiseOrValue<string>;
    specificationUrl: PromiseOrValue<string>;
    precision: PromiseOrValue<BigNumberish>;
    requestsCounter: PromiseOrValue<BigNumberish>;
    fulfillsCounter: PromiseOrValue<BigNumberish>;
    id: PromiseOrValue<BigNumberish>;
  };

  export type MessengerStructOutput = [
    string,
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    ownerAddress: string;
    messengerAddress: string;
    specificationUrl: string;
    precision: BigNumber;
    requestsCounter: BigNumber;
    fulfillsCounter: BigNumber;
    id: BigNumber;
  };
}

export interface MessengerRegistryInterface extends utils.Interface {
  functions: {
    "getMessengers(uint256,uint256)": FunctionFragment;
    "getMessengersLength()": FunctionFragment;
    "modifyMessenger(string,uint256)": FunctionFragment;
    "registerMessenger(address,address,string)": FunctionFragment;
    "registeredMessengers(address)": FunctionFragment;
    "setSLARegistry()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getMessengers"
      | "getMessengersLength"
      | "modifyMessenger"
      | "registerMessenger"
      | "registeredMessengers"
      | "setSLARegistry"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getMessengers",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getMessengersLength",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "modifyMessenger",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "registerMessenger",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "registeredMessengers",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setSLARegistry",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "getMessengers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMessengersLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "modifyMessenger",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerMessenger",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registeredMessengers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setSLARegistry",
    data: BytesLike
  ): Result;

  events: {
    "MessengerModified(address,address,string,uint256,uint256)": EventFragment;
    "MessengerRegistered(address,address,string,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "MessengerModified"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MessengerRegistered"): EventFragment;
}

export interface MessengerModifiedEventObject {
  ownerAddress: string;
  messengerAddress: string;
  specificationUrl: string;
  precision: BigNumber;
  id: BigNumber;
}
export type MessengerModifiedEvent = TypedEvent<
  [string, string, string, BigNumber, BigNumber],
  MessengerModifiedEventObject
>;

export type MessengerModifiedEventFilter =
  TypedEventFilter<MessengerModifiedEvent>;

export interface MessengerRegisteredEventObject {
  ownerAddress: string;
  messengerAddress: string;
  specificationUrl: string;
  precision: BigNumber;
  id: BigNumber;
}
export type MessengerRegisteredEvent = TypedEvent<
  [string, string, string, BigNumber, BigNumber],
  MessengerRegisteredEventObject
>;

export type MessengerRegisteredEventFilter =
  TypedEventFilter<MessengerRegisteredEvent>;

export interface MessengerRegistry extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MessengerRegistryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getMessengers(
      skip: PromiseOrValue<BigNumberish>,
      num: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[MessengerRegistry.MessengerStructOutput[]]>;

    getMessengersLength(overrides?: CallOverrides): Promise<[BigNumber]>;

    modifyMessenger(
      _specificationUrl: PromiseOrValue<string>,
      _messengerId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    registerMessenger(
      callerAddress_: PromiseOrValue<string>,
      messengerAddress_: PromiseOrValue<string>,
      specificationUrl_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    registeredMessengers(
      messengerAddress_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    setSLARegistry(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  getMessengers(
    skip: PromiseOrValue<BigNumberish>,
    num: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<MessengerRegistry.MessengerStructOutput[]>;

  getMessengersLength(overrides?: CallOverrides): Promise<BigNumber>;

  modifyMessenger(
    _specificationUrl: PromiseOrValue<string>,
    _messengerId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  registerMessenger(
    callerAddress_: PromiseOrValue<string>,
    messengerAddress_: PromiseOrValue<string>,
    specificationUrl_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  registeredMessengers(
    messengerAddress_: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  setSLARegistry(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getMessengers(
      skip: PromiseOrValue<BigNumberish>,
      num: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<MessengerRegistry.MessengerStructOutput[]>;

    getMessengersLength(overrides?: CallOverrides): Promise<BigNumber>;

    modifyMessenger(
      _specificationUrl: PromiseOrValue<string>,
      _messengerId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    registerMessenger(
      callerAddress_: PromiseOrValue<string>,
      messengerAddress_: PromiseOrValue<string>,
      specificationUrl_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    registeredMessengers(
      messengerAddress_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    setSLARegistry(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "MessengerModified(address,address,string,uint256,uint256)"(
      ownerAddress?: PromiseOrValue<string> | null,
      messengerAddress?: PromiseOrValue<string> | null,
      specificationUrl?: null,
      precision?: null,
      id?: null
    ): MessengerModifiedEventFilter;
    MessengerModified(
      ownerAddress?: PromiseOrValue<string> | null,
      messengerAddress?: PromiseOrValue<string> | null,
      specificationUrl?: null,
      precision?: null,
      id?: null
    ): MessengerModifiedEventFilter;

    "MessengerRegistered(address,address,string,uint256,uint256)"(
      ownerAddress?: PromiseOrValue<string> | null,
      messengerAddress?: PromiseOrValue<string> | null,
      specificationUrl?: null,
      precision?: null,
      id?: null
    ): MessengerRegisteredEventFilter;
    MessengerRegistered(
      ownerAddress?: PromiseOrValue<string> | null,
      messengerAddress?: PromiseOrValue<string> | null,
      specificationUrl?: null,
      precision?: null,
      id?: null
    ): MessengerRegisteredEventFilter;
  };

  estimateGas: {
    getMessengers(
      skip: PromiseOrValue<BigNumberish>,
      num: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMessengersLength(overrides?: CallOverrides): Promise<BigNumber>;

    modifyMessenger(
      _specificationUrl: PromiseOrValue<string>,
      _messengerId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    registerMessenger(
      callerAddress_: PromiseOrValue<string>,
      messengerAddress_: PromiseOrValue<string>,
      specificationUrl_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    registeredMessengers(
      messengerAddress_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setSLARegistry(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getMessengers(
      skip: PromiseOrValue<BigNumberish>,
      num: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMessengersLength(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    modifyMessenger(
      _specificationUrl: PromiseOrValue<string>,
      _messengerId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    registerMessenger(
      callerAddress_: PromiseOrValue<string>,
      messengerAddress_: PromiseOrValue<string>,
      specificationUrl_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    registeredMessengers(
      messengerAddress_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setSLARegistry(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}