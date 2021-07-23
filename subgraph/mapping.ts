import {
  SLA as SLATemplate,
  DToken as DTokenTemplate,
} from './generated/templates';
import {
  Deposit,
  DToken,
  DtokenBalance,
  SLA,
  SLI,
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
import { Approval, Transfer } from './generated/templates/DToken/DToken';

import {
  BigDecimal,
  BigInt,
  ByteArray,
  log,
  crypto,
} from '@graphprotocol/graph-ts';

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
  let sliID =
    sla.address.toHexString() + '-' + event.params.periodId.toString();
  let sli = new SLI(sliID);
  sla.SLIs = sla.SLIs.concat([sli.id]);
  sla.nextVerifiablePeriod = slaContract.nextVerifiablePeriod();
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
  sla.save();
  let user = User.load(event.params.caller.toHexString());
  if (!user) {
    user = new User(event.params.caller.toHexString());
  }
  user.deposits = user.deposits.concat([deposit.id]);
  user.save();
}

export function handleProviderWithdraw(event: ProviderWithdraw): void {
  let sla = SLA.load(event.address.toHexString());
  let withdrawal = new Withdrawal(event.transaction.hash.toHexString());
  withdrawal.type = 'provider';
  withdrawal.amount = event.params.amount;
  withdrawal.tokenAddress = event.params.tokenAddress;
  withdrawal.callerAddress = event.params.caller;
  withdrawal.slaAddress = event.address;
  withdrawal.save();
  sla.withdrawals = sla.withdrawals.concat([withdrawal.id]);
  sla.save();
  let user = User.load(event.params.caller.toHexString());
  if (!user) {
    user = new User(event.params.caller.toHexString());
  }
  user.withdrawals = user.withdrawals.concat([withdrawal.id]);
  user.save();
}

export function handleUserWithdraw(event: ProviderWithdraw): void {
  let sla = SLA.load(event.address.toHexString());
  let withdrawal = new Withdrawal(event.transaction.hash.toHexString());
  withdrawal.type = 'user';
  withdrawal.amount = event.params.amount;
  withdrawal.tokenAddress = event.params.tokenAddress;
  withdrawal.callerAddress = event.params.caller;
  withdrawal.slaAddress = event.address;
  withdrawal.save();
  sla.withdrawals = sla.withdrawals.concat([withdrawal.id]);
  sla.save();
  let user = User.load(event.params.caller.toHexString());
  if (!user) {
    user = new User(event.params.caller.toHexString());
  }
  user.withdrawals = user.withdrawals.concat([withdrawal.id]);
  user.save();
}

export function handleSLORegistered(event: SLORegistered): void {
  let sla = SLA.load(event.params.sla.toHexString());
  if (!sla) {
    sla = new SLA(event.params.sla.toHexString());
  }
  sla.sloType = event.params.sloType;
  sla.sloValue = event.params.sloValue;
  sla.save();
}

export function handleDTokensCreated(event: DTokensCreated): void {
  let sla = SLA.load(event.address.toHexString());
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

  spToken.save();
  lpToken.save();
  sla.save();
  DTokenTemplate.create(event.params.duTokenAddress);
  DTokenTemplate.create(event.params.dpTokenAddress);
}

export function handleDTokenTransfer(event: Transfer): void {
  let dToken = DToken.load(event.address.toHexString());
  let dTokenContract = ERC20.bind(event.address);
  dToken.totalSupply = dTokenContract.totalSupply();
  // if from is 0, then is mint and corresponds the 'to' address
  let userAddress =
    event.params.from.toI32() !== 0 ? event.params.from : event.params.to;
  let user = User.load(userAddress.toHexString());
  if (!user) {
    user = new User(userAddress.toHexString());
  }
  let dTokenBalance = DtokenBalance.load(
    userAddress.toHexString() + event.address.toHexString()
  );
  if (!dTokenBalance) {
    dTokenBalance = new DtokenBalance(
      userAddress.toHexString() + event.address.toHexString()
    );
  }
  dTokenBalance.dtoken = dToken.id;
  dTokenBalance.slaAllowance = dTokenContract.allowance(
    userAddress,
    event.transaction.from
  );
  dTokenBalance.balance = dTokenContract.balanceOf(userAddress);
  dToken.save();
  dTokenBalance.save();

  user.dTokensBalances = user.dTokensBalances.concat([dTokenBalance.id]);
  user.save();
}

// export function handleDTokenApproval(event: Approval): void {
//   let sla = SLA.load(event.params.sla.toHexString());
//   if (!sla) {
//     sla = new SLA(event.params.sla.toHexString());
//   }
//   sla.sloType = event.params.sloType;
//   sla.sloValue = event.params.sloValue;
//   sla.save();
// }
