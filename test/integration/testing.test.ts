import { TASK_NAMES } from '../../tasks';
const hre = require('hardhat');
import { expect } from 'chai';
import { loadFixture, deployContract } from 'ethereum-waffle';
import { fixture, fixtureTask } from '../fixtures/basic';

describe('Fixtures', () => {
  it('loads the fixture', async () => {
    await loadFixture(fixtureTask);
    console.log('loaded fixture');
  });
});
