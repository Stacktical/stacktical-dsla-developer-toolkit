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

export interface SLARegistryInterface extends utils.Interface {
  functions: {
    "SLAs(uint256)": FunctionFragment;
    "allSLAs()": FunctionFragment;
    "checkPastPeriod()": FunctionFragment;
    "createSLA(uint120,uint8,bool,address,uint8,uint128,uint128,string,bytes32[],uint64)": FunctionFragment;
    "isRegisteredSLA(address)": FunctionFragment;
    "messengerRegistry()": FunctionFragment;
    "periodRegistry()": FunctionFragment;
    "registerMessenger(address,string)": FunctionFragment;
    "requestSLI(uint256,address,bool)": FunctionFragment;
    "returnLockedValue(address)": FunctionFragment;
    "sloRegistry()": FunctionFragment;
    "stakeRegistry()": FunctionFragment;
    "userSLAs(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "SLAs"
      | "allSLAs"
      | "checkPastPeriod"
      | "createSLA"
      | "isRegisteredSLA"
      | "messengerRegistry"
      | "periodRegistry"
      | "registerMessenger"
      | "requestSLI"
      | "returnLockedValue"
      | "sloRegistry"
      | "stakeRegistry"
      | "userSLAs"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "SLAs",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "allSLAs", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "checkPastPeriod",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createSLA",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<boolean>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>[],
      PromiseOrValue<BigNumberish>
    ]
  ): string;
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
    functionFragment: "registerMessenger",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "requestSLI",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<boolean>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "returnLockedValue",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "sloRegistry",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "stakeRegistry",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "userSLAs",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: "SLAs", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "allSLAs", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "checkPastPeriod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "createSLA", data: BytesLike): Result;
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
    functionFragment: "registerMessenger",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "requestSLI", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "returnLockedValue",
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
  decodeFunctionResult(functionFragment: "userSLAs", data: BytesLike): Result;

  events: {
    "ReturnLockedValue(address,address)": EventFragment;
    "SLACreated(address,address)": EventFragment;
    "SLIRequested(uint256,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ReturnLockedValue"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SLACreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SLIRequested"): EventFragment;
}

export interface ReturnLockedValueEventObject {
  sla: string;
  caller: string;
}
export type ReturnLockedValueEvent = TypedEvent<
  [string, string],
  ReturnLockedValueEventObject
>;

export type ReturnLockedValueEventFilter =
  TypedEventFilter<ReturnLockedValueEvent>;

export interface SLACreatedEventObject {
  sla: string;
  owner: string;
}
export type SLACreatedEvent = TypedEvent<
  [string, string],
  SLACreatedEventObject
>;

export type SLACreatedEventFilter = TypedEventFilter<SLACreatedEvent>;

export interface SLIRequestedEventObject {
  periodId: BigNumber;
  sla: string;
  caller: string;
}
export type SLIRequestedEvent = TypedEvent<
  [BigNumber, string, string],
  SLIRequestedEventObject
>;

export type SLIRequestedEventFilter = TypedEventFilter<SLIRequestedEvent>;

export interface SLARegistry extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SLARegistryInterface;

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
    SLAs(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    allSLAs(overrides?: CallOverrides): Promise<[string[]]>;

    checkPastPeriod(overrides?: CallOverrides): Promise<[boolean]>;

    createSLA(
      sloValue_: PromiseOrValue<BigNumberish>,
      sloType_: PromiseOrValue<BigNumberish>,
      whitelisted_: PromiseOrValue<boolean>,
      messengerAddress_: PromiseOrValue<string>,
      periodType_: PromiseOrValue<BigNumberish>,
      initialPeriodId_: PromiseOrValue<BigNumberish>,
      finalPeriodId_: PromiseOrValue<BigNumberish>,
      ipfsHash_: PromiseOrValue<string>,
      extraData_: PromiseOrValue<BytesLike>[],
      leverage_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    isRegisteredSLA(
      _slaAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    messengerRegistry(overrides?: CallOverrides): Promise<[string]>;

    periodRegistry(overrides?: CallOverrides): Promise<[string]>;

    registerMessenger(
      _messengerAddress: PromiseOrValue<string>,
      _specificationUrl: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    requestSLI(
      _periodId: PromiseOrValue<BigNumberish>,
      _sla: PromiseOrValue<string>,
      _ownerApproval: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    returnLockedValue(
      _sla: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    sloRegistry(overrides?: CallOverrides): Promise<[string]>;

    stakeRegistry(overrides?: CallOverrides): Promise<[string]>;

    userSLAs(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string[]] & { SLAList: string[] }>;
  };

  SLAs(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  allSLAs(overrides?: CallOverrides): Promise<string[]>;

  checkPastPeriod(overrides?: CallOverrides): Promise<boolean>;

  createSLA(
    sloValue_: PromiseOrValue<BigNumberish>,
    sloType_: PromiseOrValue<BigNumberish>,
    whitelisted_: PromiseOrValue<boolean>,
    messengerAddress_: PromiseOrValue<string>,
    periodType_: PromiseOrValue<BigNumberish>,
    initialPeriodId_: PromiseOrValue<BigNumberish>,
    finalPeriodId_: PromiseOrValue<BigNumberish>,
    ipfsHash_: PromiseOrValue<string>,
    extraData_: PromiseOrValue<BytesLike>[],
    leverage_: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  isRegisteredSLA(
    _slaAddress: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  messengerRegistry(overrides?: CallOverrides): Promise<string>;

  periodRegistry(overrides?: CallOverrides): Promise<string>;

  registerMessenger(
    _messengerAddress: PromiseOrValue<string>,
    _specificationUrl: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  requestSLI(
    _periodId: PromiseOrValue<BigNumberish>,
    _sla: PromiseOrValue<string>,
    _ownerApproval: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  returnLockedValue(
    _sla: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  sloRegistry(overrides?: CallOverrides): Promise<string>;

  stakeRegistry(overrides?: CallOverrides): Promise<string>;

  userSLAs(
    _user: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string[]>;

  callStatic: {
    SLAs(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    allSLAs(overrides?: CallOverrides): Promise<string[]>;

    checkPastPeriod(overrides?: CallOverrides): Promise<boolean>;

    createSLA(
      sloValue_: PromiseOrValue<BigNumberish>,
      sloType_: PromiseOrValue<BigNumberish>,
      whitelisted_: PromiseOrValue<boolean>,
      messengerAddress_: PromiseOrValue<string>,
      periodType_: PromiseOrValue<BigNumberish>,
      initialPeriodId_: PromiseOrValue<BigNumberish>,
      finalPeriodId_: PromiseOrValue<BigNumberish>,
      ipfsHash_: PromiseOrValue<string>,
      extraData_: PromiseOrValue<BytesLike>[],
      leverage_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    isRegisteredSLA(
      _slaAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    messengerRegistry(overrides?: CallOverrides): Promise<string>;

    periodRegistry(overrides?: CallOverrides): Promise<string>;

    registerMessenger(
      _messengerAddress: PromiseOrValue<string>,
      _specificationUrl: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    requestSLI(
      _periodId: PromiseOrValue<BigNumberish>,
      _sla: PromiseOrValue<string>,
      _ownerApproval: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    returnLockedValue(
      _sla: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    sloRegistry(overrides?: CallOverrides): Promise<string>;

    stakeRegistry(overrides?: CallOverrides): Promise<string>;

    userSLAs(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string[]>;
  };

  filters: {
    "ReturnLockedValue(address,address)"(
      sla?: PromiseOrValue<string> | null,
      caller?: PromiseOrValue<string> | null
    ): ReturnLockedValueEventFilter;
    ReturnLockedValue(
      sla?: PromiseOrValue<string> | null,
      caller?: PromiseOrValue<string> | null
    ): ReturnLockedValueEventFilter;

    "SLACreated(address,address)"(
      sla?: PromiseOrValue<string> | null,
      owner?: PromiseOrValue<string> | null
    ): SLACreatedEventFilter;
    SLACreated(
      sla?: PromiseOrValue<string> | null,
      owner?: PromiseOrValue<string> | null
    ): SLACreatedEventFilter;

    "SLIRequested(uint256,address,address)"(
      periodId?: null,
      sla?: PromiseOrValue<string> | null,
      caller?: PromiseOrValue<string> | null
    ): SLIRequestedEventFilter;
    SLIRequested(
      periodId?: null,
      sla?: PromiseOrValue<string> | null,
      caller?: PromiseOrValue<string> | null
    ): SLIRequestedEventFilter;
  };

  estimateGas: {
    SLAs(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    allSLAs(overrides?: CallOverrides): Promise<BigNumber>;

    checkPastPeriod(overrides?: CallOverrides): Promise<BigNumber>;

    createSLA(
      sloValue_: PromiseOrValue<BigNumberish>,
      sloType_: PromiseOrValue<BigNumberish>,
      whitelisted_: PromiseOrValue<boolean>,
      messengerAddress_: PromiseOrValue<string>,
      periodType_: PromiseOrValue<BigNumberish>,
      initialPeriodId_: PromiseOrValue<BigNumberish>,
      finalPeriodId_: PromiseOrValue<BigNumberish>,
      ipfsHash_: PromiseOrValue<string>,
      extraData_: PromiseOrValue<BytesLike>[],
      leverage_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    isRegisteredSLA(
      _slaAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    messengerRegistry(overrides?: CallOverrides): Promise<BigNumber>;

    periodRegistry(overrides?: CallOverrides): Promise<BigNumber>;

    registerMessenger(
      _messengerAddress: PromiseOrValue<string>,
      _specificationUrl: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    requestSLI(
      _periodId: PromiseOrValue<BigNumberish>,
      _sla: PromiseOrValue<string>,
      _ownerApproval: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    returnLockedValue(
      _sla: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    sloRegistry(overrides?: CallOverrides): Promise<BigNumber>;

    stakeRegistry(overrides?: CallOverrides): Promise<BigNumber>;

    userSLAs(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    SLAs(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    allSLAs(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    checkPastPeriod(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    createSLA(
      sloValue_: PromiseOrValue<BigNumberish>,
      sloType_: PromiseOrValue<BigNumberish>,
      whitelisted_: PromiseOrValue<boolean>,
      messengerAddress_: PromiseOrValue<string>,
      periodType_: PromiseOrValue<BigNumberish>,
      initialPeriodId_: PromiseOrValue<BigNumberish>,
      finalPeriodId_: PromiseOrValue<BigNumberish>,
      ipfsHash_: PromiseOrValue<string>,
      extraData_: PromiseOrValue<BytesLike>[],
      leverage_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    isRegisteredSLA(
      _slaAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    messengerRegistry(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    periodRegistry(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    registerMessenger(
      _messengerAddress: PromiseOrValue<string>,
      _specificationUrl: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    requestSLI(
      _periodId: PromiseOrValue<BigNumberish>,
      _sla: PromiseOrValue<string>,
      _ownerApproval: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    returnLockedValue(
      _sla: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    sloRegistry(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    stakeRegistry(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    userSLAs(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}