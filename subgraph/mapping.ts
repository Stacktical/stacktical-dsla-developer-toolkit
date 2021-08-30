import { SLA as SLATemplate } from './generated/templates';
import {
  Deposit,
  DToken,
  Messenger,
  Period,
  PeriodDefinition,
  SLA,
  SLI,
  TVL,
  User,
  Withdrawal,
} from './generated/schema';

import {
  Stake,
  SLICreated,
  ProviderWithdraw,
  DTokensCreated,
} from './generated/templates/SLA/SLA';

import { SLACreated } from './generated/SLARegistry/SLARegistry';
import { SLA as SLAContract } from './generated/SLARegistry/SLA';

import { SLORegistered } from './generated/SLORegistry/SLORegistry';
import { ERC20 } from './generated/templates/SLA/ERC20';

import { BigInt } from '@graphprotocol/graph-ts';
import {
  LockedValueReturned,
  StakeRegistry,
  ValueLocked,
} from './generated/StakeRegistry/StakeRegistry';
import {
  MessengerModified,
  MessengerRegistered,
} from './generated/MessengerRegistry/MessengerRegistry';
import { IMessenger } from './generated/MessengerRegistry/IMessenger';
import {
  PeriodInitialized,
  PeriodModified,
  PeriodRegistry,
} from './generated/PeriodRegistry/PeriodRegistry';

export function handleNewSLA(event: SLACreated): void {
  let slaContract = SLAContract.bind(event.params.sla);
  let sla = SLA.load(event.params.sla.toHexString());
  if (!sla) {
    sla = new SLA(event.params.sla.toHexString());
  }
  sla.slaId = slaContract.slaID();
  sla.owner = event.params.owner;
  sla.address = event.params.sla;
  sla.breachedContract = slaContract.breachedContract();
  sla.messengerAddress = slaContract.messengerAddress();
  sla.ipfsHash = slaContract.ipfsHash();
  sla.stakersCount = slaContract.getStakersLength();
  sla.periodType = slaContract.periodType();
  sla.creationBlockNumber = slaContract.creationBlockNumber();
  sla.nextVerifiablePeriod = slaContract.nextVerifiablePeriod();
  sla.whiteListed = slaContract.whitelistedContract();
  sla.initialPeriodId = slaContract.initialPeriodId();
  sla.finalPeriodId = slaContract.finalPeriodId();
  sla.leverage = slaContract.leverage();
  sla.maxHedge = BigInt.fromI32(0);
  sla.finished = slaContract.contractFinished();
  sla.save();
  SLATemplate.create(event.params.sla);
  let user = User.load(event.params.owner.toHexString());
  if (!user) {
    user = new User(event.params.owner.toHexString());
  }
  user.slas = user.slas.concat([sla.id]);
  user.save();
}

export function handleSLICreated(event: SLICreated): void {
  let slaContract = SLAContract.bind(event.address);
  let sla = SLA.load(event.address.toHexString());
  if (!sla) {
    sla = new SLA(event.address.toHexString());
  }
  let sliID =
    sla.address.toHexString() + '-' + event.params.periodId.toString();
  let sli = new SLI(sliID);
  sla.SLIs = sla.SLIs.concat([sli.id]);
  sla.nextVerifiablePeriod = slaContract.nextVerifiablePeriod();
  sla.finished = slaContract.contractFinished();
  sla.breachedContract = slaContract.breachedContract();
  sla.save();

  sli.periodId = event.params.periodId;
  sli.timestamp = event.params.timestamp;
  sli.sli = event.params.sli;
  sli.sla = event.address;
  sli.status = slaContract.periodSLIs(event.params.periodId).value2;
  sli.save();
}

export function handleStake(event: Stake): void {
  let sla = SLA.load(event.address.toHexString());
  let deposit = new Deposit(event.transaction.hash.toHexString());
  let slaContract = SLAContract.bind(event.address);
  deposit.type =
    sla.owner.toHexString() == event.params.caller.toHexString()
      ? 'provider'
      : 'user';
  deposit.amount = event.params.amount;
  deposit.tokenAddress = event.params.tokenAddress;
  deposit.callerAddress = event.params.caller;
  deposit.slaAddress = event.address;
  deposit.save();
  sla.deposits = sla.deposits.concat([deposit.id]);
  sla.maxHedge = slaContract
    .providerPool(event.params.tokenAddress)
    .div(sla.leverage)
    .minus(slaContract.usersPool(event.params.tokenAddress));
  if (sla.maxHedge.lt(BigInt.fromI32(0))) {
    sla.maxHedge = BigInt.fromI32(0);
  }
  sla.save();
  let user = User.load(event.params.caller.toHexString());
  if (!user) {
    user = new User(event.params.caller.toHexString());
  }
  user.deposits = user.deposits.concat([deposit.id]);
  user.save();

  let dpTokenAddress = slaContract.dpTokenRegistry(event.params.tokenAddress);
  let dpTokenContract = ERC20.bind(dpTokenAddress);
  let dpToken = DToken.load(dpTokenAddress.toHexString());
  dpToken.totalSupply = dpTokenContract.totalSupply();
  dpToken.save();

  let duTokenAddress = slaContract.duTokenRegistry(event.params.tokenAddress);
  let duTokenContract = ERC20.bind(duTokenAddress);
  let duToken = DToken.load(duTokenAddress.toHexString());
  duToken.totalSupply = duTokenContract.totalSupply();
  duToken.save();

  let tvl = TVL.load(event.params.tokenAddress.toHexString());
  if (!tvl) {
    tvl = new TVL(event.params.tokenAddress.toHexString());
  }
  tvl.amount = tvl.amount.plus(event.params.amount);
  tvl.deposits = tvl.deposits.concat([deposit.id]);
  tvl.save();
}

export function handleProviderWithdraw(event: ProviderWithdraw): void {
  let sla = SLA.load(event.address.toHexString());
  let slaContract = SLAContract.bind(event.address);
  let withdrawal = new Withdrawal(event.transaction.hash.toHexString());
  withdrawal.type = 'provider';
  withdrawal.amount = event.params.amount;
  withdrawal.tokenAddress = event.params.tokenAddress;
  withdrawal.callerAddress = event.params.caller;
  withdrawal.slaAddress = event.address;
  withdrawal.save();
  sla.withdrawals = sla.withdrawals.concat([withdrawal.id]);
  sla.maxHedge = slaContract
    .providerPool(event.params.tokenAddress)
    .div(sla.leverage)
    .minus(slaContract.usersPool(event.params.tokenAddress));
  if (sla.maxHedge.lt(BigInt.fromI32(0))) {
    sla.maxHedge = BigInt.fromI32(0);
  }
  sla.save();
  let user = User.load(event.params.caller.toHexString());
  if (!user) {
    user = new User(event.params.caller.toHexString());
  }
  user.withdrawals = user.withdrawals.concat([withdrawal.id]);
  user.save();

  let dpTokenAddress = slaContract.dpTokenRegistry(event.params.tokenAddress);
  let dpTokenContract = ERC20.bind(dpTokenAddress);
  let dpToken = DToken.load(dpTokenAddress.toHexString());
  dpToken.totalSupply = dpTokenContract.totalSupply();
  dpToken.save();

  let tvl = TVL.load(event.params.tokenAddress.toHexString());
  if (!tvl) {
    tvl = new TVL(event.params.tokenAddress.toHexString());
  }
  tvl.amount = tvl.amount.minus(event.params.amount);
  tvl.withdrawals = tvl.withdrawals.concat([withdrawal.id]);
  tvl.save();
}

export function handleUserWithdraw(event: ProviderWithdraw): void {
  let sla = SLA.load(event.address.toHexString());
  if (!sla) {
    sla = new SLA(event.address.toHexString());
  }
  let slaContract = SLAContract.bind(event.address);
  let withdrawal = new Withdrawal(event.transaction.hash.toHexString());
  withdrawal.type = 'user';
  withdrawal.amount = event.params.amount;
  withdrawal.tokenAddress = event.params.tokenAddress;
  withdrawal.callerAddress = event.params.caller;
  withdrawal.slaAddress = event.address;
  withdrawal.save();
  sla.withdrawals = sla.withdrawals.concat([withdrawal.id]);
  sla.maxHedge = slaContract
    .providerPool(event.params.tokenAddress)
    .div(sla.leverage)
    .minus(slaContract.usersPool(event.params.tokenAddress));
  if (sla.maxHedge.lt(BigInt.fromI32(0))) {
    sla.maxHedge = BigInt.fromI32(0);
  }
  sla.save();
  let user = User.load(event.params.caller.toHexString());
  if (!user) {
    user = new User(event.params.caller.toHexString());
  }
  user.withdrawals = user.withdrawals.concat([withdrawal.id]);
  user.save();

  let duTokenAddress = slaContract.duTokenRegistry(event.params.tokenAddress);
  let duTokenContract = ERC20.bind(duTokenAddress);
  let duToken = DToken.load(duTokenAddress.toHexString());
  duToken.totalSupply = duTokenContract.totalSupply();
  duToken.save();

  let tvl = TVL.load(event.params.tokenAddress.toHexString());
  if (!tvl) {
    tvl = new TVL(event.params.tokenAddress.toHexString());
  }
  tvl.amount = tvl.amount.minus(event.params.amount);
  tvl.withdrawals = tvl.withdrawals.concat([withdrawal.id]);
  tvl.save();
}

export function handleSLORegistered(event: SLORegistered): void {
  let sla = SLA.load(event.params.sla.toHexString());
  if (!sla) {
    sla = new SLA(event.params.sla.toHexString());
    sla.leverage = BigInt.fromI32(0);
  }
  sla.sloType = event.params.sloType;
  sla.sloValue = event.params.sloValue;
  sla.save();
}

export function handleDTokensCreated(event: DTokensCreated): void {
  let sla = SLA.load(event.address.toHexString());
  if (!sla) {
    sla = new SLA(event.address.toHexString());
  }
  // SP token
  let spToken = new DToken(event.params.duTokenAddress.toHexString());
  let spTokenContract = ERC20.bind(event.params.duTokenAddress);
  spToken.name = spTokenContract.name();
  spToken.type = 'user';
  spToken.address = event.params.duTokenAddress;
  spToken.symbol = spTokenContract.symbol();
  spToken.slaAddress = event.address;
  spToken.tokenAddress = event.params.tokenAddress;
  spToken.totalSupply = BigInt.fromI32(0);
  sla.dTokens = sla.dTokens.concat([spToken.id]);

  // LP token
  let lpToken = new DToken(event.params.dpTokenAddress.toHexString());
  let lpTokenContract = ERC20.bind(event.params.dpTokenAddress);
  lpToken.name = lpTokenContract.name();
  lpToken.type = 'provider';
  lpToken.address = event.params.dpTokenAddress;
  lpToken.symbol = lpTokenContract.symbol();
  lpToken.slaAddress = event.address;
  lpToken.totalSupply = BigInt.fromI32(0);
  lpToken.tokenAddress = event.params.tokenAddress;

  sla.dTokens = sla.dTokens.concat([lpToken.id]);

  sla.save();
  spToken.save();
  lpToken.save();
}

export function handleValueLocked(event: ValueLocked): void {
  let deposit = new Deposit(event.transaction.hash.toHexString());
  let stakeRegistryContract = StakeRegistry.bind(event.address);
  deposit.type = 'dsla-locked';
  deposit.amount = event.params.amount;
  deposit.slaAddress = event.params.sla;
  deposit.callerAddress = event.params.owner;
  deposit.tokenAddress = stakeRegistryContract.DSLATokenAddress();
  deposit.save();

  let tvl = TVL.load(stakeRegistryContract.DSLATokenAddress().toHexString());
  if (!tvl) {
    tvl = new TVL(stakeRegistryContract.DSLATokenAddress().toHexString());
  }
  tvl.amount = tvl.amount.plus(event.params.amount);
  tvl.deposits = tvl.deposits.concat([deposit.id]);
  tvl.save();
}

export function handleLockedValueReturned(event: LockedValueReturned): void {
  let withdrawal = new Withdrawal(event.transaction.hash.toHexString());
  let stakeRegistryContract = StakeRegistry.bind(event.address);
  withdrawal.type = 'dsla-returned';
  withdrawal.amount = event.params.amount;
  withdrawal.slaAddress = event.params.sla;
  withdrawal.callerAddress = event.params.owner;
  withdrawal.tokenAddress = stakeRegistryContract.DSLATokenAddress();
  withdrawal.save();

  let tvl = TVL.load(stakeRegistryContract.DSLATokenAddress().toHexString());
  if (!tvl) {
    tvl = new TVL(stakeRegistryContract.DSLATokenAddress().toHexString());
  }
  tvl.amount = tvl.amount.minus(event.params.amount);
  tvl.withdrawals = tvl.withdrawals.concat([withdrawal.id]);
  tvl.save();
}

export function handleMessengerRegistered(event: MessengerRegistered): void {
  let messenger = new Messenger(event.params.messengerAddress.toHexString());
  let messengerContract = IMessenger.bind(event.params.messengerAddress);
  messenger.precision = messengerContract.messengerPrecision();
  messenger.owner = messengerContract.owner();
  messenger.specificationUrl = event.params.specificationUrl;
  messenger.messengerId = event.params.id;
  messenger.save();
}

export function handleMessengerModified(event: MessengerModified): void {
  let messenger = new Messenger(event.params.messengerAddress.toHexString());
  let messengerContract = IMessenger.bind(event.params.messengerAddress);
  messenger.precision = messengerContract.messengerPrecision();
  messenger.owner = messengerContract.owner();
  messenger.specificationUrl = event.params.specificationUrl;
  messenger.messengerId = event.params.id;
  messenger.save();
}

export function handlePeriodInitialized(event: PeriodInitialized): void {
  let period = new Period(BigInt.fromI32(event.params.periodType).toString());
  let periodRegistry = PeriodRegistry.bind(event.address);
  let index: BigInt;
  for (
    index = BigInt.fromI32(0);
    event.params.periodsAdded.gt(index);
    index = index.plus(BigInt.fromI32(1))
  ) {
    let periodDefinition = new PeriodDefinition(
      period.id.toString() + '-' + index.toString()
    );
    let periodDates = periodRegistry.getPeriodStartAndEnd(
      event.params.periodType,
      index
    );
    periodDefinition.start = periodDates.value0;
    periodDefinition.end = periodDates.value1;
    periodDefinition.save();
    period.periodDefinitions = period.periodDefinitions.concat([
      periodDefinition.id,
    ]);
  }
  period.amountOfPeriods = index;
  period.save();
}

export function handlePeriodModified(event: PeriodModified): void {
  let period = new Period(BigInt.fromI32(event.params.periodType).toString());
  let periodRegistry = PeriodRegistry.bind(event.address);
  let index: BigInt;
  for (
    index = period.amountOfPeriods;
    event.params.periodsAdded.gt(index);
    index = index.plus(BigInt.fromI32(1))
  ) {
    let periodDefinition = new PeriodDefinition(
      period.id.toString() + '-' + index.toString()
    );
    let periodDates = periodRegistry.getPeriodStartAndEnd(
      event.params.periodType,
      index
    );
    periodDefinition.start = periodDates.value0;
    periodDefinition.end = periodDates.value1;
    periodDefinition.save();
    period.periodDefinitions = period.periodDefinitions.concat([
      periodDefinition.id,
    ]);
  }
  period.amountOfPeriods = period.amountOfPeriods.plus(index);
  period.save();
}
