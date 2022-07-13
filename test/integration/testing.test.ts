import { expect } from 'chai';
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { fixture } from '../fixtures/basic';
import hre from 'hardhat';
import { CONTRACT_NAMES, SERVICE_CREDITS } from '../../constants';
import { SLA, SLARegistry__factory } from '../../typechain';
import { BaseOracle } from '../../typechain/BaseOracle';
import { InflationOracle } from '../../typechain/InflationOracle';
import consola from 'consola';

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

  //



  //
  it('needs to be written', async () => {
    const slaDeployment = await deployments.get(CONTRACT_NAMES.SLA);
    const sla = <SLA>(new ethers.Contract(allSLAs[0], slaDeployment.abi, ethers.provider));
  });

  describe("check SP & LP token names of messenger contracts", async () => {
    it(CONTRACT_NAMES.BaseOracle, async () => {
      const base_messenger: BaseOracle = await ethers.getContract(CONTRACT_NAMES.BaseOracle);
      expect(await base_messenger.lpName()).to.be.eq(SERVICE_CREDITS.STAKING_REWARDS.DSLA_LP.name);
      expect(await base_messenger.spName()).to.be.eq(SERVICE_CREDITS.STAKING_REWARDS.DSLA_SP.name);
    })
    it(CONTRACT_NAMES.InflationOracle, async () => {
      const inflation_messenger: InflationOracle = await ethers.getContract(CONTRACT_NAMES.InflationOracle);
      expect(await inflation_messenger.lpName()).to.be.eq(SERVICE_CREDITS.INFLATION_RATE.DSLA_LP.name);
      expect(await inflation_messenger.spName()).to.be.eq(SERVICE_CREDITS.INFLATION_RATE.DSLA_SP.name);
    })
  })
});
