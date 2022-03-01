import { expect } from 'chai';
import { loadFixture, deployContract } from 'ethereum-waffle';
import { fixture } from '../fixtures/basic';
const hre = require('hardhat');

describe('Fixtures', () => {
  before(async function () {
    this.timeout(0);
    await loadFixture(fixture);
  });
  const { deployments } = hre;

  it('loads the fixture', async () => {});
});
