// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class ReturnLockedValue extends ethereum.Event {
  get params(): ReturnLockedValue__Params {
    return new ReturnLockedValue__Params(this);
  }
}

export class ReturnLockedValue__Params {
  _event: ReturnLockedValue;

  constructor(event: ReturnLockedValue) {
    this._event = event;
  }

  get sla(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get caller(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class SLACreated extends ethereum.Event {
  get params(): SLACreated__Params {
    return new SLACreated__Params(this);
  }
}

export class SLACreated__Params {
  _event: SLACreated;

  constructor(event: SLACreated) {
    this._event = event;
  }

  get sla(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get owner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class SLIRequested extends ethereum.Event {
  get params(): SLIRequested__Params {
    return new SLIRequested__Params(this);
  }
}

export class SLIRequested__Params {
  _event: SLIRequested;

  constructor(event: SLIRequested) {
    this._event = event;
  }

  get periodId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get sla(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get caller(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class SLARegistry extends ethereum.SmartContract {
  static bind(address: Address): SLARegistry {
    return new SLARegistry("SLARegistry", address);
  }

  SLAs(param0: BigInt): Address {
    let result = super.call("SLAs", "SLAs(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);

    return result[0].toAddress();
  }

  try_SLAs(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("SLAs", "SLAs(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  allSLAs(): Array<Address> {
    let result = super.call("allSLAs", "allSLAs():(address[])", []);

    return result[0].toAddressArray();
  }

  try_allSLAs(): ethereum.CallResult<Array<Address>> {
    let result = super.tryCall("allSLAs", "allSLAs():(address[])", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddressArray());
  }

  checkPastPeriod(): boolean {
    let result = super.call("checkPastPeriod", "checkPastPeriod():(bool)", []);

    return result[0].toBoolean();
  }

  try_checkPastPeriod(): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "checkPastPeriod",
      "checkPastPeriod():(bool)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isRegisteredSLA(_slaAddress: Address): boolean {
    let result = super.call(
      "isRegisteredSLA",
      "isRegisteredSLA(address):(bool)",
      [ethereum.Value.fromAddress(_slaAddress)]
    );

    return result[0].toBoolean();
  }

  try_isRegisteredSLA(_slaAddress: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isRegisteredSLA",
      "isRegisteredSLA(address):(bool)",
      [ethereum.Value.fromAddress(_slaAddress)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  messengerRegistry(): Address {
    let result = super.call(
      "messengerRegistry",
      "messengerRegistry():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_messengerRegistry(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "messengerRegistry",
      "messengerRegistry():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  periodRegistry(): Address {
    let result = super.call("periodRegistry", "periodRegistry():(address)", []);

    return result[0].toAddress();
  }

  try_periodRegistry(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "periodRegistry",
      "periodRegistry():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  sloRegistry(): Address {
    let result = super.call("sloRegistry", "sloRegistry():(address)", []);

    return result[0].toAddress();
  }

  try_sloRegistry(): ethereum.CallResult<Address> {
    let result = super.tryCall("sloRegistry", "sloRegistry():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  stakeRegistry(): Address {
    let result = super.call("stakeRegistry", "stakeRegistry():(address)", []);

    return result[0].toAddress();
  }

  try_stakeRegistry(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "stakeRegistry",
      "stakeRegistry():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  userSLAs(_user: Address): Array<Address> {
    let result = super.call("userSLAs", "userSLAs(address):(address[])", [
      ethereum.Value.fromAddress(_user)
    ]);

    return result[0].toAddressArray();
  }

  try_userSLAs(_user: Address): ethereum.CallResult<Array<Address>> {
    let result = super.tryCall("userSLAs", "userSLAs(address):(address[])", [
      ethereum.Value.fromAddress(_user)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddressArray());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get sloRegistry_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get periodRegistry_(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get messengerRegistry_(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get stakeRegistry_(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get checkPastPeriod_(): boolean {
    return this._call.inputValues[4].value.toBoolean();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class CreateSLACall extends ethereum.Call {
  get inputs(): CreateSLACall__Inputs {
    return new CreateSLACall__Inputs(this);
  }

  get outputs(): CreateSLACall__Outputs {
    return new CreateSLACall__Outputs(this);
  }
}

export class CreateSLACall__Inputs {
  _call: CreateSLACall;

  constructor(call: CreateSLACall) {
    this._call = call;
  }

  get sloValue_(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get sloType_(): i32 {
    return this._call.inputValues[1].value.toI32();
  }

  get whitelisted_(): boolean {
    return this._call.inputValues[2].value.toBoolean();
  }

  get messengerAddress_(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get periodType_(): i32 {
    return this._call.inputValues[4].value.toI32();
  }

  get initialPeriodId_(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }

  get finalPeriodId_(): BigInt {
    return this._call.inputValues[6].value.toBigInt();
  }

  get ipfsHash_(): string {
    return this._call.inputValues[7].value.toString();
  }

  get extraData_(): Array<Bytes> {
    return this._call.inputValues[8].value.toBytesArray();
  }

  get leverage_(): BigInt {
    return this._call.inputValues[9].value.toBigInt();
  }
}

export class CreateSLACall__Outputs {
  _call: CreateSLACall;

  constructor(call: CreateSLACall) {
    this._call = call;
  }
}

export class RegisterMessengerCall extends ethereum.Call {
  get inputs(): RegisterMessengerCall__Inputs {
    return new RegisterMessengerCall__Inputs(this);
  }

  get outputs(): RegisterMessengerCall__Outputs {
    return new RegisterMessengerCall__Outputs(this);
  }
}

export class RegisterMessengerCall__Inputs {
  _call: RegisterMessengerCall;

  constructor(call: RegisterMessengerCall) {
    this._call = call;
  }

  get _messengerAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _specificationUrl(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class RegisterMessengerCall__Outputs {
  _call: RegisterMessengerCall;

  constructor(call: RegisterMessengerCall) {
    this._call = call;
  }
}

export class RequestSLICall extends ethereum.Call {
  get inputs(): RequestSLICall__Inputs {
    return new RequestSLICall__Inputs(this);
  }

  get outputs(): RequestSLICall__Outputs {
    return new RequestSLICall__Outputs(this);
  }
}

export class RequestSLICall__Inputs {
  _call: RequestSLICall;

  constructor(call: RequestSLICall) {
    this._call = call;
  }

  get _periodId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _sla(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _ownerApproval(): boolean {
    return this._call.inputValues[2].value.toBoolean();
  }
}

export class RequestSLICall__Outputs {
  _call: RequestSLICall;

  constructor(call: RequestSLICall) {
    this._call = call;
  }
}

export class ReturnLockedValueCall extends ethereum.Call {
  get inputs(): ReturnLockedValueCall__Inputs {
    return new ReturnLockedValueCall__Inputs(this);
  }

  get outputs(): ReturnLockedValueCall__Outputs {
    return new ReturnLockedValueCall__Outputs(this);
  }
}

export class ReturnLockedValueCall__Inputs {
  _call: ReturnLockedValueCall;

  constructor(call: ReturnLockedValueCall) {
    this._call = call;
  }

  get _sla(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ReturnLockedValueCall__Outputs {
  _call: ReturnLockedValueCall;

  constructor(call: ReturnLockedValueCall) {
    this._call = call;
  }
}