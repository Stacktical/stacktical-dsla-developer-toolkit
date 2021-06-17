import { PERIOD_TYPE } from './constants';
import {
  ChainlinkNodeConfiguration,
  PreCoordinatorConfiguration,
} from './types';
import { getChainlinkJobs } from './chainlink-utils';
import { toWei, padRight, toChecksumAddress } from 'web3-utils';

const moment = require('moment');
const createClient = require('ipfs-http-client');

const ipfsClient = createClient({ url: process.env.IPFS_URI });

export async function getIPFSHash(ipfsData) {
  const dataString = JSON.stringify(ipfsData);
  const buffer = Buffer.from(dataString, 'utf-8');
  const { path: ipfsHash } = await ipfsClient.add(buffer);
  return ipfsHash;
}

const parsePeriod = (periodType: PERIOD_TYPE) => {
  if (periodType === PERIOD_TYPE.HOURLY) return ['hour', 'hour'];
  if (periodType === PERIOD_TYPE.DAILY) return ['day', 'day'];
  if (periodType === PERIOD_TYPE.WEEKLY) return ['week', 'isoWeek'];
  if (periodType === PERIOD_TYPE.BIWEEKLY)
    throw new Error('BIWEEKLY period not implemented yet');
  if (periodType === PERIOD_TYPE.MONTHLY) return ['month', 'month'];
  if (periodType === PERIOD_TYPE.YEARLY) return ['year', 'year'];
  throw new Error('Period type not recognized' + periodType);
};

export function generateBootstrapPeriods(
  periodType: PERIOD_TYPE,
  amountOfPeriods: number,
  expiredPeriods: number
) {
  const periodStarts = [];
  const periodEnds = [];
  const [parsedPeriod, parsedUnit] = parsePeriod(periodType);
  for (
    let index = -expiredPeriods + 1;
    index < amountOfPeriods - expiredPeriods + 1;
    index += 1
  ) {
    const start = moment()
      .utc(0)
      .startOf(parsedUnit)
      .add(index, parsedPeriod)
      .unix();
    const end = moment()
      .utc(0)
      .endOf(parsedUnit)
      .add(index, parsedPeriod)
      .unix();
    periodStarts.push(start);
    periodEnds.push(end);
  }
  return [periodStarts, periodEnds];
}

export const getPreCoordinatorConfiguration = async (
  nodes: Array<ChainlinkNodeConfiguration>,
  useCaseName,
  oracleContractAddress
) => {
  const preCoordinatorConfiguration: PreCoordinatorConfiguration = {
    oracles: [],
    jobIds: [],
    payments: [],
  };
  for (let node of nodes) {
    const jobs = await getChainlinkJobs(node);
    const job = jobs.find(
      (postedJob) =>
        postedJob.attributes.tasks.some((task) => task.type === useCaseName) &&
        postedJob.attributes.initiators.some(
          (initiator) =>
            toChecksumAddress(initiator.params.address) ===
            oracleContractAddress
        )
    );
    preCoordinatorConfiguration.payments.push(toWei('0.1'));
    preCoordinatorConfiguration.jobIds.push(padRight('0x' + job.id, 64));
    preCoordinatorConfiguration.oracles.push(
      job.attributes.initiators[0].params.address
    );
  }
  return preCoordinatorConfiguration;
};

export const printSeparator = () => {
  console.log(
    '----------------------------------------------------------------------------------------------------------------'
  );
};

export const bootstrapStrings = (contractName: string) => [
  'Starting automated jobs to bootstrap ' +
    contractName +
    ' contract correctly',
  'Automated jobs to bootstrap ' + contractName + ' finished correctly',
];
