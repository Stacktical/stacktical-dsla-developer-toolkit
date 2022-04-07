import { expect } from 'chai';
import { loadFixture } from 'ethereum-waffle';
import { fixture } from '../fixtures/basic';
const hre = require('hardhat');
import { CONTRACT_NAMES, SERVICE_CREDITS } from '../../constants';
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

  describe("check SP & LP token names of messenger contracts", async () => {
    it(CONTRACT_NAMES.BaseMessenger, async () => {
      const messenger: BaseMessenger = await ethers.getContract(CONTRACT_NAMES.BaseMessenger);
      expect(await messenger.lpName()).to.be.eq(SERVICE_CREDITS.STAKING_REWARDS.DSLA_LP);
      expect(await messenger.spName()).to.be.eq(SERVICE_CREDITS.STAKING_REWARDS.DSLA_SP);
    })
    it(CONTRACT_NAMES.CPIMessenger, async () => {
      const messenger: CPIMessenger = await ethers.getContract(CONTRACT_NAMES.CPIMessenger);
      expect(await messenger.lpName()).to.be.eq(SERVICE_CREDITS.INFLATION_RATE.DSLA_LP);
      expect(await messenger.spName()).to.be.eq(SERVICE_CREDITS.INFLATION_RATE.DSLA_SP);
    })
  })
});
