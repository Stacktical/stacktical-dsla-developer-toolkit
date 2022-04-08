
import { expect } from 'chai';
import { loadFixture } from 'ethereum-waffle';
import { fixture } from '../fixtures/basic';
const hre = require('hardhat');
import { CONTRACT_NAMES } from '../../constants';
import { BaseMessenger, CPIMessenger, SLA, SLARegistry__factory } from '../../typechain';
const consola = require('consola');

describe('Fixtures', () => {
  const { deployments, ethers, getNamedAccounts } = hre;
  let allSLAs: string[];

  before(async function () {
    this.timeout(0);
    await loadFixture(fixture);
    consola.success('LODADED FIXTURE');
    const { get } = deployments;
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.getSigner(deployer);
    const slaRegistry = await SLARegistry__factory.connect(
      (
        await get(CONTRACT_NAMES.SLARegistry)
      ).address,
      signer
    );
    allSLAs = await slaRegistry.allSLAs();
  });

  it('needs to be written', async () => {
    const sla: SLA = await ethers.getContractAt(CONTRACT_NAMES.SLA, allSLAs[0]);
  });

});