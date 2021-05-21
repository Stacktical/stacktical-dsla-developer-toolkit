import { PERIOD_TYPE } from '../constants';

const moment = require('moment');

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

function generateBootstrapPeriods(
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

export default generateBootstrapPeriods;
