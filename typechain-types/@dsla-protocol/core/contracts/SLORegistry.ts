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

export interface SLORegistryInterface extends utils.Interface {
  functions: {
    "getDeviation(uint256,address)": FunctionFragment;
    "isRespected(uint256,address)": FunctionFragment;
    "registerSLO(uint120,uint8,address)": FunctionFragment;
    "registeredSLO(address)": FunctionFragment;
    "setSLARegistry()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getDeviation"
      | "isRespected"
      | "registerSLO"
      | "registeredSLO"
      | "setSLARegistry"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getDeviation",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "isRespected",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "registerSLO",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "registeredSLO",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setSLARegistry",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "getDeviation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isRespected",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerSLO",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registeredSLO",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setSLARegistry",
    data: BytesLike
  ): Result;

  events: {
    "SLORegistered(address,uint256,uint8)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "SLORegistered"): EventFragment;
}

export interface SLORegisteredEventObject {
  sla: string;
  sloValue: BigNumber;
  sloType: number;
}
export type SLORegisteredEvent = TypedEvent<
  [string, BigNumber, number],
  SLORegisteredEventObject
>;

export type SLORegisteredEventFilter = TypedEventFilter<SLORegisteredEvent>;

export interface SLORegistry extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SLORegistryInterface;

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
    getDeviation(
      _sli: PromiseOrValue<BigNumberish>,
      _slaAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    isRespected(
      _value: PromiseOrValue<BigNumberish>,
      _slaAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    registerSLO(
      _sloValue: PromiseOrValue<BigNumberish>,
      _sloType: PromiseOrValue<BigNumberish>,
      _slaAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    registeredSLO(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, number] & { sloValue: BigNumber; sloType: number }>;

    setSLARegistry(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  getDeviation(
    _sli: PromiseOrValue<BigNumberish>,
    _slaAddress: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  isRespected(
    _value: PromiseOrValue<BigNumberish>,
    _slaAddress: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  registerSLO(
    _sloValue: PromiseOrValue<BigNumberish>,
    _sloType: PromiseOrValue<BigNumberish>,
    _slaAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  registeredSLO(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, number] & { sloValue: BigNumber; sloType: number }>;

  setSLARegistry(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getDeviation(
      _sli: PromiseOrValue<BigNumberish>,
      _slaAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isRespected(
      _value: PromiseOrValue<BigNumberish>,
      _slaAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    registerSLO(
      _sloValue: PromiseOrValue<BigNumberish>,
      _sloType: PromiseOrValue<BigNumberish>,
      _slaAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    registeredSLO(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, number] & { sloValue: BigNumber; sloType: number }>;

    setSLARegistry(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "SLORegistered(address,uint256,uint8)"(
      sla?: PromiseOrValue<string> | null,
      sloValue?: null,
      sloType?: null
    ): SLORegisteredEventFilter;
    SLORegistered(
      sla?: PromiseOrValue<string> | null,
      sloValue?: null,
      sloType?: null
    ): SLORegisteredEventFilter;
  };

  estimateGas: {
    getDeviation(
      _sli: PromiseOrValue<BigNumberish>,
      _slaAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isRespected(
      _value: PromiseOrValue<BigNumberish>,
      _slaAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registerSLO(
      _sloValue: PromiseOrValue<BigNumberish>,
      _sloType: PromiseOrValue<BigNumberish>,
      _slaAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    registeredSLO(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setSLARegistry(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getDeviation(
      _sli: PromiseOrValue<BigNumberish>,
      _slaAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isRespected(
      _value: PromiseOrValue<BigNumberish>,
      _slaAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    registerSLO(
      _sloValue: PromiseOrValue<BigNumberish>,
      _sloType: PromiseOrValue<BigNumberish>,
      _slaAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    registeredSLO(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setSLARegistry(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
