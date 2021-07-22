import { SLA as SLATemplate } from './generated/templates';
import { Deposit, SLA, SLI } from './generated/schema';

import { Stake, SLICreated } from './generated/templates/SLA/SLA';

import { SLACreated } from './generated/SLARegistry/SLARegistry';
import { SLA as SLAContract } from './generated/SLARegistry/SLA';

import { SLORegistered } from './generated/SLORegistry/SLORegistry';
import { log } from '@graphprotocol/graph-ts';

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
}

export function handleSLICreated(event: SLICreated): void {
  let slaContract = SLAContract.bind(event.address);
  let sla = SLA.load(event.address.toHexString());
  let sliID =
    sla.address.toHexString() + '-' + event.params.periodId.toString();
  let sli = new SLI(sliID);
  sla.SLIs = sla.SLIs.concat([sli.id]);
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
  deposit.depositType =
    sla.owner.toHexString() == event.params.caller.toHexString()
      ? 'provider-stake'
      : 'user-stake';
  deposit.amount = event.params.amount;
  deposit.tokenAddress = event.params.tokenAddress;
  deposit.userAddress = event.params.caller;
  deposit.slaAddress = event.address;
  deposit.save();
  sla.deposits = sla.deposits.concat([deposit.id]);
  sla.save();
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
