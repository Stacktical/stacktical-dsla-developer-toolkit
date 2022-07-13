import { expect } from 'chai';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { fixture } from '../../fixtures/basic';
import { fromWei, toWei } from 'web3-utils';

const hre = require('hardhat');

import { BigNumber } from '@ethersproject/bignumber';

import { CONTRACT_NAMES, PERIOD_STATUS } from '../../../constants';
import {
  ERC20PresetMinterPauser,
  ERC20PresetMinterPauser__factory,
  SLA__factory,
  SLARegistry__factory,
  SLA,
} from '../../../typechain';
import consola from 'consola';

describe('DSLA Protocol Staking Simulation - v1.5 - SLA Respected, Reward Not Capped', () => {
  const { network, deployments, ethers, getNamedAccounts, getUnnamedAccounts } =
    hre;
  const { get } = deployments;
  let allSLAs: string[];
  let tx;

  let slaRegistry;
  let _sloRegistry;

  let sla;
  let details;
  let signersAccounts;
  let unnamedAccounts;

  let provider_1_account;
  let provider_2_account;
  let provider_3_account;
  let user_1_account;
  let user_2_account;
  let user_3_account;

  // Stacking constants INITIAL
  // PROVIDERS BALANCE
  let initialStakeBalanceProvider1 = '2500';
  let initialStakeBalanceProvider2 = '333000';
  let initialStakeBalanceProvider3 = '50000';

  // USERS BALANCE
  let initialStakeBalanceUser1 = '30000';
  let initialStakeBalanceUser2 = '60000';
  let initialStakeBalanceUser3 = '90000';

  let initialProviderPool = '385500';
  let initialUserPool = '180000';
  let initialTotalStake = '565500';
  let initialNumberOfStakers = 6;

  // Stacking constants P1
  // PROVIDERS BALANCE
  let P1StakeBalanceProvider1 = '';
  let P1StakeBalanceProvider2 = '';
  let P1StakeBalanceProvider3 = '';
  // USERS BALANCE
  let P1StakeBalanceUser1 = '';
  let P1StakeBalanceUser2 = '';
  let P1StakeBalanceUser3 = '';
  // POOLS BALANCE
  let P1ProviderPool = '430500';
  let P1UserPool = '135000';
  let P1TotalStake = '565500.00';
  let P1NumberOfStakers = 6;

  // Stacking constants P2
  // PROVIDERS BALANCE
  let P2StakeBalanceProvider1 = '';
  let P2StakeBalanceProvider2 = '';
  let P2StakeBalanceProvider3 = '';
  // USERS BALANCE
  let P2StakeBalanceUser1 = '';
  let P2StakeBalanceUser2 = '';
  let P2StakeBalanceUser3 = '';
  // POOLS BALANCE
  let P2ProviderPool = '464250';
  let P2UserPool = '101250';
  let P2TotalStake = '565500';
  let P2NumberOfStakers = 6;

  // Stacking constants P3
  // PROVIDERS BALANCE
  let P3StakeBalanceProvider1 = '';
  let P3StakeBalanceProvider2 = '';
  let P3StakeBalanceProvider3 = '';
  // USERS BALANCE
  let P3StakeBalanceUser1 = '';
  let P3StakeBalanceUser2 = '';
  let P3StakeBalanceUser3 = '';
  // POOLS BALANCE
  let P3ProviderPool = '489562.500';
  let P3UserPool = '75937.500';
  let P3TotalStake = '565500';
  let P3NumberOfStakers = 6;

  // Stacking constants P4
  // PROVIDERS BALANCE
  let P4StakeBalanceProvider1 = '';
  let P4StakeBalanceProvider2 = '';
  let P4StakeBalanceProvider3 = '';
  // USERS BALANCE
  let P4StakeBalanceUser1 = '';
  let P4StakeBalanceUser2 = '';
  let P4StakeBalanceUser3 = '';
  // POOLS BALANCE
  let P4ProviderPool = '508546.87500';
  let P4UserPool = '56953.1250000';
  let P4TotalStake = '565500';
  let P4NumberOfStakers = 6;

  // Stacking constants P5
  // PROVIDERS BALANCE
  let P5StakeBalanceProvider1 = '';
  let P5StakeBalanceProvider2 = '';
  let P5StakeBalanceProvider3 = '';
  // USERS BALANCE
  let P5StakeBalanceUser1 = '';
  let P5StakeBalanceUser2 = '';
  let P5StakeBalanceUser3 = '';
  // POOLS BALANCE
  let P5ProviderPool = '522785.156250';
  let P5UserPool = '42714.843750';
  let P5TotalStake = '565500';
  let P5NumberOfStakers = 6;

  let currentProviderPool: BigNumber = BigNumber.from('0');
  let currentUsersPool: BigNumber = BigNumber.from('0');
  let currentTotalStake: BigNumber = BigNumber.from('0');

  let currentP1ProviderPool: BigNumber = BigNumber.from('0');
  let currentP1UsersPool: BigNumber = BigNumber.from('0');
  let currentP1TotalStake: BigNumber = BigNumber.from('0');

  let currentP2ProviderPool: BigNumber = BigNumber.from('0');
  let currentP2UsersPool: BigNumber = BigNumber.from('0');
  let currentP2TotalStake: BigNumber = BigNumber.from('0');

  let currentP3ProviderPool: BigNumber = BigNumber.from('0');
  let currentP3UsersPool: BigNumber = BigNumber.from('0');
  let currentP3TotalStake: BigNumber = BigNumber.from('0');

  let currentP4ProviderPool: BigNumber = BigNumber.from('0');
  let currentP4UsersPool: BigNumber = BigNumber.from('0');
  let currentP4TotalStake: BigNumber = BigNumber.from('0');

  let currentP5ProviderPool: BigNumber = BigNumber.from('0');
  let currentP5UsersPool: BigNumber = BigNumber.from('0');
  let currentP5TotalStake: BigNumber = BigNumber.from('0');

  let stakersLength: any;
  let slaDetailsP0: any;

  let currentBalPrv1: any;
  let currentBalPrv2: any;
  let currentBalPrv3: any;

  let slaDetailsP1: any;
  let slaDetailsP2: any;
  let slaDetailsP3: any;
  let slaDetailsP4: any;
  let slaDetailsP5: any;

  let slaStaticDetailsP1: any;
  let slaStaticDetailsP2: any;
  let slaStaticDetailsP3: any;
  let slaStaticDetailsP4: any;
  let slaStaticDetailsP5: any;

  let slaRegistryDeployment;
  let periodRegistryDeployment;
  let slaDeployment;
  let detailsDeployment;
  let dslaTokenDeployment;

  let signer;
  before(async function () {
    this.timeout(0);
    await loadFixture(fixture);
    consola.success('LODADED FIXTURE');
    const { deployer } = await getNamedAccounts();
    signer = await ethers.getSigner(deployer);

    unnamedAccounts = await getUnnamedAccounts();
    slaRegistryDeployment = await deployments.get(CONTRACT_NAMES.SLARegistry);
    periodRegistryDeployment = await deployments.get(
      CONTRACT_NAMES.PeriodRegistry
    );
    slaDeployment = await deployments.get(CONTRACT_NAMES.SLA);
    detailsDeployment = await deployments.get(CONTRACT_NAMES.Details);
    dslaTokenDeployment = await deployments.get(CONTRACT_NAMES.DSLA);

    slaRegistry = await SLARegistry__factory.connect(
      (
        await get(CONTRACT_NAMES.SLARegistry)
      ).address,
      signer
    );
    allSLAs = await slaRegistry.allSLAs();
    _sloRegistry = await slaRegistry.sloRegistry();

    // get the contract INDEX 20, Contract for IT staking tests: Respected case reward capped

    sla = <SLA>new ethers.Contract(allSLAs[20], slaDeployment.abi, signer);
    details = new ethers.Contract(
      detailsDeployment.address,
      detailsDeployment.abi,
      signer
    );

    signersAccounts = await hre.ethers.getSigners();

    provider_1_account = signersAccounts[0];
    provider_2_account = signersAccounts[1];
    provider_3_account = signersAccounts[2];

    user_1_account = signersAccounts[3];
    user_2_account = signersAccounts[4];
    user_3_account = signersAccounts[5];

    // Get dslaToken contract
    const dslaToken = <ERC20PresetMinterPauser>(
      new ethers.Contract(
        dslaTokenDeployment.address,
        dslaTokenDeployment.abi,
        signer
      )
    );

    // Approve allocation of amount to dslaToken address
    consola.info('Approve allocation of amount to dslaToken address');
    let amount = 565500;
    tx = await dslaToken.approve(sla.address, amount);

    // Associate Users to SLA contract
    consola.info('Associate Users to SLA contract');
    const user_1_SLA = SLA__factory.connect(sla.address, user_1_account);
    const user_2_SLA = SLA__factory.connect(sla.address, user_2_account);
    const user_3_SLA = SLA__factory.connect(sla.address, user_3_account);

    // Associate Providers to SLA contract
    consola.info('Associate Providers to SLA contract');
    const provider_1_SLA = SLA__factory.connect(
      sla.address,
      provider_1_account
    );
    const provider_2_SLA = SLA__factory.connect(
      sla.address,
      provider_2_account
    );
    const provider_3_SLA = SLA__factory.connect(
      sla.address,
      provider_3_account
    );

    // Associate Users to dslaToken
    consola.info('Associate Users to dslaToken');
    const user_1_DSLA = ERC20PresetMinterPauser__factory.connect(
      dslaToken.address,
      user_1_account
    );
    const user_2_DSLA = ERC20PresetMinterPauser__factory.connect(
      dslaToken.address,
      user_2_account
    );
    const user_3_DSLA = ERC20PresetMinterPauser__factory.connect(
      dslaToken.address,
      user_3_account
    );

    // Associate Providers to dslaToken
    consola.info('Associate Providers to dslaToken');
    const provider_1_DSLA = ERC20PresetMinterPauser__factory.connect(
      dslaToken.address,
      provider_1_account
    );
    const provider_2_DSLA = ERC20PresetMinterPauser__factory.connect(
      dslaToken.address,
      provider_2_account
    );
    const provider_3_DSLA = ERC20PresetMinterPauser__factory.connect(
      dslaToken.address,
      provider_3_account
    );

    // add token to provider DSLA account
    await provider_1_DSLA.mint(
      provider_1_account.address,
      toWei(initialStakeBalanceProvider1)
    );
    await provider_2_DSLA.mint(
      provider_2_account.address,
      toWei(initialStakeBalanceProvider2)
    );
    await provider_3_DSLA.mint(
      provider_3_account.address,
      toWei(initialStakeBalanceProvider3)
    );
    // Add token to provider accounts
    await provider_1_DSLA.approve(
      provider_1_SLA.address,
      toWei(initialStakeBalanceProvider1)
    );
    await provider_2_DSLA.approve(
      provider_2_SLA.address,
      toWei(initialStakeBalanceProvider2)
    );
    await provider_3_DSLA.approve(
      provider_3_SLA.address,
      toWei(initialStakeBalanceProvider3)
    );
    // Stake token for providers
    enum Position {
      LONG,
      SHORT,
    }
    tx = await provider_1_SLA.stakeTokens(
      toWei(initialStakeBalanceProvider1),
      provider_1_DSLA.address,
      Position.LONG
    );
    tx = await provider_2_SLA.stakeTokens(
      toWei(initialStakeBalanceProvider2),
      provider_2_DSLA.address,
      Position.LONG
    );
    tx = await provider_3_SLA.stakeTokens(
      toWei(initialStakeBalanceProvider3),
      provider_3_DSLA.address,
      Position.LONG
    );

    // add token to users DSLA accounts
    await user_1_DSLA.mint(
      user_1_account.address,
      toWei(initialStakeBalanceUser1)
    );
    await user_2_DSLA.mint(
      user_2_account.address,
      toWei(initialStakeBalanceUser2)
    );
    await user_3_DSLA.mint(
      user_3_account.address,
      toWei(initialStakeBalanceUser3)
    );
    // Add token to users accounts
    await user_1_DSLA.approve(
      user_1_SLA.address,
      toWei(initialStakeBalanceUser1)
    );
    await user_2_DSLA.approve(
      user_2_SLA.address,
      toWei(initialStakeBalanceUser2)
    );
    await user_3_DSLA.approve(
      user_3_SLA.address,
      toWei(initialStakeBalanceUser3)
    );

    // Stake token for users
    tx = await user_1_SLA.stakeTokens(
      toWei(initialStakeBalanceUser1),
      user_1_DSLA.address,
      Position.SHORT
    );
    tx = await user_2_SLA.stakeTokens(
      toWei(initialStakeBalanceUser2),
      user_2_DSLA.address,
      Position.SHORT
    );
    tx = await user_3_SLA.stakeTokens(
      toWei(initialStakeBalanceUser3),
      user_3_DSLA.address,
      Position.SHORT
    );

    consola.info('Initial Staking DONE');

    let slaDynamicDetails = await details.getSLADynamicDetails(sla.address);

    stakersLength = await sla.getStakersLength();
    //console.log("stakersLength : " + stakersLength);
    let stakersLengthFromDd = slaDynamicDetails.stakersCount.toString();
    //console.log("stakersLengthFromDd : " + stakersLengthFromDd);

    slaRegistry = await SLARegistry__factory.connect(
      (
        await get(CONTRACT_NAMES.SLARegistry)
      ).address,
      user_1_account
    );

    slaDetailsP0 = await details.getSLADetailsArrays(sla.address);
    //console.log("slaDetails P0 (init)");
    //console.log(slaDetailsP0);

    currentProviderPool = slaDetailsP0.tokensStake[0].providersPool;
    currentUsersPool = slaDetailsP0.tokensStake[0].usersPool;
    currentTotalStake = slaDetailsP0.tokensStake[0].totalStake;
  });

  describe('Initial P0', function () {
    describe('P0 tests execution', function () {
      it('StakersLength should be equal to initialNumberOfStakers', function () {
        expect(stakersLength).equals(initialNumberOfStakers);
      });
      it('Total Provider Pool should be equal to initialized value', function () {
        expect(toWei(initialProviderPool)).equals(
          currentProviderPool.toString()
        );
      });
      it('Total User Pool should be equal to initialized value', function () {
        expect(toWei(initialUserPool)).equals(currentUsersPool.toString());
      });
      it('Total Liquidity Pool should be equal to initialized value', function () {
        expect(toWei(initialTotalStake)).equals(currentTotalStake.toString());
      });

      /*
      it('Povider_1 Balance should be equal to initialized value', function () {
        // Note: Thoses values are extrapolated from ProviderPool as it is not yet possible to use getTokenStake by provider
        currentBalPrv1 = currentProviderPool.sub(toWei(initialStakeBalanceProvider2)).sub(toWei(initialStakeBalanceProvider3));
        expect(currentBalPrv1.toString()).equals(toWei(initialStakeBalanceProvider1));
      });
      it('Povider_2 Balance should be equal to initialized value', function () {
        currentBalPrv2 = currentProviderPool.sub(toWei(initialStakeBalanceProvider1)).sub(toWei(initialStakeBalanceProvider3));
        expect(currentBalPrv2.toString()).equals(toWei(initialStakeBalanceProvider2));
      });
      it('Povider_3 Balance should be equal to initialized value', function () {
        currentBalPrv3 = currentProviderPool.sub(toWei(initialStakeBalanceProvider1)).sub(toWei(initialStakeBalanceProvider2));
        expect(currentBalPrv3.toString()).equals(toWei(initialStakeBalanceProvider3));
      });


      // CHECK USERS BALANCE
      // Note: Thoses values are extrapolated from UsersPool as it is not yet possible to use getTokenStake by user
      it('User_1 Balance should be equal to initialized value', function () {
        let currentBalUser1 = currentUsersPool.sub(toWei(initialStakeBalanceUser2)).sub(toWei(initialStakeBalanceUser3));
        expect(currentBalUser1.toString()).equals(toWei(initialStakeBalanceUser1));
      });
      it('User_2 Balance should be equal to initialized value', function () {
        let currentBalUser2 = currentUsersPool.sub(toWei(initialStakeBalanceUser1)).sub(toWei(initialStakeBalanceUser3));
        expect(currentBalUser2.toString()).equals(toWei(initialStakeBalanceUser2));
      });
      it('User_3 Balance should be equal to initialized value', function () {
        let currentBalUser3 = currentUsersPool.sub(toWei(initialStakeBalanceUser1)).sub(toWei(initialStakeBalanceUser2));
        expect(currentBalUser3.toString()).equals(toWei(initialStakeBalanceUser3));
      });
      */
    });
  });

  // P1 tests
  describe('P1', function () {
    describe('request SLI P1', function () {
      //it('Shoud perform a succesful request SLI for P1', async function () {
      it('Shoud perform a succesful request SLI for P1', async () => {
        const ownerApproval = true;
        const dslaToken = <ERC20PresetMinterPauser>(
          new ethers.Contract(
            dslaTokenDeployment.address,
            dslaTokenDeployment.abi,
            signer
          )
        );

        const periodId_p1 = Number(0);
        const usersStake = 10;
        const expectedCompensation = 100;

        console.log('request SLI P1');
        await expect(
          slaRegistry.requestSLI(periodId_p1, sla.address, ownerApproval, {
            ...(network.config.gas !== 'auto' && {
              gasLimit: network.config.gas,
            }),
          })
        ).to.emit(slaRegistry, 'SLIRequested');

        const nextVerifiablePeriod = await sla.nextVerifiablePeriod();

        await new Promise((resolve) =>
          sla.on('SLICreated', () => resolve(null))
        );
        const createdSLI = await sla.periodSLIs(periodId_p1); //nextVerifiablePeriod
        const { timestamp, sli, status } = createdSLI;
        slaDetailsP1 = await details.getSLADetailsArrays(sla.address);

        currentP1ProviderPool = slaDetailsP1.tokensStake[0].providersPool;
        currentP1UsersPool = slaDetailsP1.tokensStake[0].usersPool;
        currentP1TotalStake = slaDetailsP1.tokensStake[0].totalStake;

        slaStaticDetailsP1 = await details.getSLAStaticDetails(
          sla.address,
          _sloRegistry
        );

        const slaContractSloValue = slaStaticDetailsP1.sloValue;

        console.log(
          '--------------------------------------------------------------'
        );
        console.log('SLO: ', slaContractSloValue.toString());
        console.log('SLI: ', sli.toString());
        console.log('sla.address: ', sla.address);
        console.log('Created SLI timestamp: ', timestamp.toString());
        console.log('Created SLI sli: ', sli.toString());
        console.log('Created SLI status: ', PERIOD_STATUS[status]);
        console.log('SLI request process finished  for P1');
        console.log(
          '--------------------------------------------------------------'
        );
      });
    });

    describe('P1 tests execution', function () {
      it('Total Provider Pool should be equal to P1 expected value', function () {
        expect(currentP1ProviderPool.toString()).equals(
          toWei(P1ProviderPool.toString())
        );
      });
      it('Total User Pool should be equal to P1 expected value', function () {
        expect(currentP1UsersPool.toString()).equals(
          toWei(P1UserPool.toString())
        );
      });
      it('Total Liquidity Pool should be equal to P1 expected value', function () {
        expect(currentP1TotalStake.toString()).equals(
          toWei(P1TotalStake.toString())
        );
      });

      /*
      it('Povider_1 Balance should be equal to P1 expected value', function () {
        // CHECK PROVIDERS BALANCE
        // Note: Thoses values are extrapolated from ProviderPool as it is not yet possible to use getTokenStake by provider
        currentBalPrv1 = currentP1ProviderPool.sub(toWei(P1StakeBalanceProvider2)).sub(toWei(P1StakeBalanceProvider3));
        expect(currentBalPrv1.toString()).equals(toWei(P1StakeBalanceProvider1));
      });
      it('Povider_2 Balance should be equal to P1 expected value', function () {
        currentBalPrv2 = currentP1ProviderPool.sub(toWei(P1StakeBalanceProvider1)).sub(toWei(P1StakeBalanceProvider3));
        expect(currentBalPrv2.toString()).equals(toWei(P1StakeBalanceProvider2));
      });
      it('Povider_3 Balance should be equal to P1 expected value', function () {
        currentBalPrv3 = currentP1ProviderPool.sub(toWei(P1StakeBalanceProvider1)).sub(toWei(P1StakeBalanceProvider2));
        expect(currentBalPrv3.toString()).equals(toWei(P1StakeBalanceProvider3));
      });
 
      // CHECK USERS BALANCE
      // Note: Thoses values are extrapolated from UsersPool as it is not yet possible to use getTokenStake by user
      it('User_1 Balance should be equal to P1 expected value', function () {
        let currentBalUser1 = currentP1UsersPool.sub(toWei(P1StakeBalanceUser2)).sub(toWei(P1StakeBalanceUser3));
        expect(currentBalUser1.toString()).equals(toWei(P1StakeBalanceUser1));
      });
      it('User_2 Balance should be equal to P1 expected value', function () {
        let currentBalUser2 = currentP1UsersPool.sub(toWei(P1StakeBalanceUser1)).sub(toWei(P1StakeBalanceUser3));
        expect(currentBalUser2.toString()).equals(toWei(P1StakeBalanceUser2));
      });
      it('User_3 Balance should be equal to P1 expected value', function () {
        let currentBalUser3 = currentP1UsersPool.sub(toWei(P1StakeBalanceUser1)).sub(toWei(P1StakeBalanceUser2));
        expect(currentBalUser3.toString()).equals(toWei(P1StakeBalanceUser3));
      });
      it('StakersLength should be equal to initialNumberOfStakers', function () {
        expect(stakersLength).equals(initialNumberOfStakers);
      });
      */
    });
  });

  // P2 tests
  describe('P2', function () {
    describe('request SLI P2', function () {
      it('Shoud perform a succesful request SLI for P2', async () => {
        const ownerApproval = true;
        const nextVerifiablePeriod = await sla.nextVerifiablePeriod();

        console.log('request SLI P2');
        await expect(
          slaRegistry.requestSLI(
            nextVerifiablePeriod,
            sla.address,
            ownerApproval,
            {
              ...(network.config.gas !== 'auto' && {
                gasLimit: network.config.gas,
              }),
            }
          )
        ).to.emit(slaRegistry, 'SLIRequested');

        await new Promise((resolve) =>
          sla.on('SLICreated', () => resolve(null))
        );
        const createdSLI = await sla.periodSLIs(nextVerifiablePeriod);
        const { timestamp, sli, status } = createdSLI;
        slaDetailsP2 = await details.getSLADetailsArrays(sla.address);

        currentP2ProviderPool = slaDetailsP2.tokensStake[0].providersPool;
        currentP2UsersPool = slaDetailsP2.tokensStake[0].usersPool;
        currentP2TotalStake = slaDetailsP2.tokensStake[0].totalStake;

        slaStaticDetailsP2 = await details.getSLAStaticDetails(
          sla.address,
          _sloRegistry
        );

        const slaContractSloValue = slaStaticDetailsP2.sloValue;

        console.log(
          '--------------------------------------------------------------'
        );
        console.log('sla.address: ', sla.address);
        console.log('SLO: ', slaContractSloValue.toString());
        console.log('SLI: ', sli.toString());
        console.log('Created SLI timestamp: ', timestamp.toString());
        console.log('Created SLI sli: ', sli.toString());
        console.log('Created SLI status: ', PERIOD_STATUS[status]);
        console.log('SLI request process finished for P2');
        console.log(
          '--------------------------------------------------------------'
        );
      });
    });

    describe('P2 tests execution', function () {
      it('Total Provider Pool should be equal to P2 expected value', function () {
        expect(currentP2ProviderPool.toString()).equals(
          toWei(P2ProviderPool.toString())
        );
      });
      it('Total User Pool should be equal to P2 expected value', function () {
        expect(currentP2UsersPool.toString()).equals(
          toWei(P2UserPool.toString())
        );
      });
      it('Total Liquidity Pool should be equal to P2 expected value', function () {
        expect(currentP2TotalStake.toString()).equals(
          toWei(P2TotalStake.toString())
        );
      });
    });
  });

  // P3 tests
  describe('P3', function () {
    describe('request SLI P3', function () {
      it('Shoud perform a succesful request SLI for P3', async () => {
        const ownerApproval = true;
        const nextVerifiablePeriod = await sla.nextVerifiablePeriod();

        console.log('request SLI P3');
        await expect(
          slaRegistry.requestSLI(
            nextVerifiablePeriod,
            sla.address,
            ownerApproval,
            {
              ...(network.config.gas !== 'auto' && {
                gasLimit: network.config.gas,
              }),
            }
          )
        ).to.emit(slaRegistry, 'SLIRequested');

        await new Promise((resolve) =>
          sla.on('SLICreated', () => resolve(null))
        );
        const createdSLI = await sla.periodSLIs(nextVerifiablePeriod);
        const { timestamp, sli, status } = createdSLI;
        slaDetailsP3 = await details.getSLADetailsArrays(sla.address);

        currentP3ProviderPool = slaDetailsP3.tokensStake[0].providersPool;
        currentP3UsersPool = slaDetailsP3.tokensStake[0].usersPool;
        currentP3TotalStake = slaDetailsP3.tokensStake[0].totalStake;

        slaStaticDetailsP3 = await details.getSLAStaticDetails(
          sla.address,
          _sloRegistry
        );

        const slaContractSloValue = slaStaticDetailsP3.sloValue;

        console.log(
          '--------------------------------------------------------------'
        );
        console.log('sla.address: ', sla.address);
        console.log('SLO: ', slaContractSloValue.toString());
        console.log('SLI: ', sli.toString());
        console.log('Created SLI timestamp: ', timestamp.toString());
        console.log('Created SLI sli: ', sli.toString());
        console.log('Created SLI status: ', PERIOD_STATUS[status]);
        console.log('SLI request process finished for P3');
        console.log(
          '--------------------------------------------------------------'
        );
      });
    });

    describe('P3 tests execution', function () {
      it('Total Provider Pool should be equal to P3 expected value', function () {
        expect(currentP3ProviderPool.toString()).equals(
          toWei(P3ProviderPool.toString())
        );
      });
      it('Total User Pool should be equal to P3 expected value', function () {
        expect(currentP3UsersPool.toString()).equals(
          toWei(P3UserPool.toString())
        );
      });
      it('Total Liquidity Pool should be equal to P3 expected value', function () {
        expect(currentP3TotalStake.toString()).equals(
          toWei(P3TotalStake.toString())
        );
      });
    });
  });

  // P4 tests
  describe('P4', function () {
    describe('request SLI P4', function () {
      it('Shoud perform a succesful request SLI for P4', async () => {
        const ownerApproval = true;
        const nextVerifiablePeriod = await sla.nextVerifiablePeriod();

        console.log('request SLI P4');
        await expect(
          slaRegistry.requestSLI(
            nextVerifiablePeriod,
            sla.address,
            ownerApproval,
            {
              ...(network.config.gas !== 'auto' && {
                gasLimit: network.config.gas,
              }),
            }
          )
        ).to.emit(slaRegistry, 'SLIRequested');

        await new Promise((resolve) =>
          sla.on('SLICreated', () => resolve(null))
        );
        const createdSLI = await sla.periodSLIs(nextVerifiablePeriod);
        const { timestamp, sli, status } = createdSLI;
        slaDetailsP4 = await details.getSLADetailsArrays(sla.address);

        currentP4ProviderPool = slaDetailsP4.tokensStake[0].providersPool;
        currentP4UsersPool = slaDetailsP4.tokensStake[0].usersPool;
        currentP4TotalStake = slaDetailsP4.tokensStake[0].totalStake;

        slaStaticDetailsP4 = await details.getSLAStaticDetails(
          sla.address,
          _sloRegistry
        );

        const slaContractSloValue = slaStaticDetailsP4.sloValue;

        console.log(
          '--------------------------------------------------------------'
        );
        console.log('sla.address: ', sla.address);
        console.log('SLO: ', slaContractSloValue.toString());
        console.log('SLI: ', sli.toString());
        console.log('Created SLI timestamp: ', timestamp.toString());
        console.log('Created SLI sli: ', sli.toString());
        console.log('Created SLI status: ', PERIOD_STATUS[status]);
        console.log('SLI request process finished for P4');
        console.log(
          '--------------------------------------------------------------'
        );
      });
    });

    describe('P4 tests execution', function () {
      it('Total Provider Pool should be equal to P4 expected value', function () {
        expect(currentP4ProviderPool.toString()).equals(
          toWei(P4ProviderPool.toString())
        );
      });
      it('Total User Pool should be equal to P4 expected value', function () {
        expect(currentP4UsersPool.toString()).equals(
          toWei(P4UserPool.toString())
        );
      });
      it('Total Liquidity Pool should be equal to P4 expected value', function () {
        expect(currentP4TotalStake.toString()).equals(
          toWei(P4TotalStake.toString())
        );
      });
    });
  });

  // P5 tests
  describe('P5', function () {
    describe('request SLI P5', function () {
      it('Shoud perform a succesful request SLI for P5', async () => {
        const ownerApproval = true;
        const nextVerifiablePeriod = await sla.nextVerifiablePeriod();

        console.log('request SLI P5');
        await expect(
          slaRegistry.requestSLI(
            nextVerifiablePeriod,
            sla.address,
            ownerApproval,
            {
              ...(network.config.gas !== 'auto' && {
                gasLimit: network.config.gas,
              }),
            }
          )
        ).to.emit(slaRegistry, 'SLIRequested');

        await new Promise((resolve) =>
          sla.on('SLICreated', () => resolve(null))
        );
        const createdSLI = await sla.periodSLIs(nextVerifiablePeriod);
        const { timestamp, sli, status } = createdSLI;
        slaDetailsP5 = await details.getSLADetailsArrays(sla.address);

        currentP5ProviderPool = slaDetailsP5.tokensStake[0].providersPool;
        currentP5UsersPool = slaDetailsP5.tokensStake[0].usersPool;
        currentP5TotalStake = slaDetailsP5.tokensStake[0].totalStake;

        slaStaticDetailsP5 = await details.getSLAStaticDetails(
          sla.address,
          _sloRegistry
        );

        const slaContractSloValue = slaStaticDetailsP5.sloValue;

        console.log(
          '--------------------------------------------------------------'
        );
        console.log('sla.address: ', sla.address);
        console.log('SLO: ', slaContractSloValue.toString());
        console.log('SLI: ', sli.toString());
        console.log('Created SLI timestamp: ', timestamp.toString());
        console.log('Created SLI sli: ', sli.toString());
        console.log('Created SLI status: ', PERIOD_STATUS[status]);
        console.log('SLI request process finished for P5');
        console.log(
          '--------------------------------------------------------------'
        );
      });
    });

    describe('P5 tests execution', function () {
      it('Total Provider Pool should be equal to P5 expected value', function () {
        expect(currentP5ProviderPool.toString()).equals(
          toWei(P5ProviderPool.toString())
        );
      });
      it('Total User Pool should be equal to P5 expected value', function () {
        expect(currentP5UsersPool.toString()).equals(
          toWei(P5UserPool.toString())
        );
      });
      it('Total Liquidity Pool should be equal to P5 expected value', function () {
        expect(currentP5TotalStake.toString()).equals(
          toWei(P5TotalStake.toString())
        );
      });
    });
  });
});
//});
