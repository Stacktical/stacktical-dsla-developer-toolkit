/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../../common";

export interface ISLARegistryInterface extends utils.Interface {
  functions: {
    "isRegisteredSLA(address)": FunctionFragment;
    "messengerRegistry()": FunctionFragment;
    "periodRegistry()": FunctionFragment;
    "sloRegistry()": FunctionFragment;
    "stakeRegistry()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "isRegisteredSLA"
      | "messengerRegistry"
      | "periodRegistry"
      | "sloRegistry"
      | "stakeRegistry"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "isRegisteredSLA",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "messengerRegistry",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "periodRegistry",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "sloRegistry",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "stakeRegistry",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "isRegisteredSLA",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "messengerRegistry",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "periodRegistry",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sloRegistry",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "stakeRegistry",
    data: BytesLike
  ): Result;

  events: {};
}

export interface ISLARegistry extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ISLARegistryInterface;

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
    isRegisteredSLA(
      _slaAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    messengerRegistry(overrides?: CallOverrides): Promise<[string]>;

    periodRegistry(overrides?: CallOverrides): Promise<[string]>;

    sloRegistry(overrides?: CallOverrides): Promise<[string]>;

    stakeRegistry(overrides?: CallOverrides): Promise<[string]>;
  };

  isRegisteredSLA(
    _slaAddress: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  messengerRegistry(overrides?: CallOverrides): Promise<string>;

  periodRegistry(overrides?: CallOverrides): Promise<string>;

  sloRegistry(overrides?: CallOverrides): Promise<string>;

  stakeRegistry(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    isRegisteredSLA(
      _slaAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    messengerRegistry(overrides?: CallOverrides): Promise<string>;

    periodRegistry(overrides?: CallOverrides): Promise<string>;

    sloRegistry(overrides?: CallOverrides): Promise<string>;

    stakeRegistry(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    isRegisteredSLA(
      _slaAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    messengerRegistry(overrides?: CallOverrides): Promise<BigNumber>;

    periodRegistry(overrides?: CallOverrides): Promise<BigNumber>;

    sloRegistry(overrides?: CallOverrides): Promise<BigNumber>;

    stakeRegistry(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    isRegisteredSLA(
      _slaAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    messengerRegistry(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    periodRegistry(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    sloRegistry(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    stakeRegistry(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}