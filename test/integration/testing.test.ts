import { expect } from 'chai';
import { loadFixture, deployContract } from 'ethereum-waffle';
import { fixture } from '../fixtures/basic';

describe('Fixtures', () => {
  it('loads the fixture', async () => {
    await loadFixture(fixture);
    console.log('loaded fixture');
  });
});
