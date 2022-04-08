import { expect } from 'chai';
import { loadFixture } from 'ethereum-waffle';
import { fixture } from '../fixtures/basic';

const hre = require('hardhat');
//const { ethers } = hre;

import { BigNumber} from "@ethersproject/bignumber";

import {
  CONTRACT_NAMES,
  PERIOD_STATUS,
  PERIOD_TYPE} from '../../constants';
import {
   ERC20PresetMinterPauser,
   ERC20PresetMinterPauser__factory,
   SLA__factory,
   SLA,
   SLARegistry__factory,
   SLARegistry,
   Details,
   IMessenger,
   SEAMessenger} from '../../typechain';

const consola = require('consola');

//describe("DSLA Protocol Staking Simulation - v1.5", function () {

describe('DSLA Protocol Staking Simulation - v1.5', () => {
  const { network, deployments, ethers, getNamedAccounts, getUnnamedAccounts } = hre;
  const { get } = deployments;
  let allSLAs: string[];
  let tx;

  let slaRegistry;
  let _sloRegistry;
  
  let sla;
  let details;
  let signersAccounts;
  let usersAccounts;
  let unnamedAccounts;
  let notDeployer;

  let provider_1_account;
  let provider_2_account;
  let provider_3_account;
  let user_1_account;
  let user_2_account;
  let user_3_account;


  // Stacking constants INITIAL
  // PROVIDERS BALANCE
  let initialStakeBalanceProvider1 = 2500;
  let initialStakeBalanceProvider2 = 333000;
  let initialStakeBalanceProvider3 = 50000;

  // USERS BALANCE
  let initialStakeBalanceUser1 = 30000;
  let initialStakeBalanceUser2 = 60000;
  let initialStakeBalanceUser3 = 90000;

  let initialProviderPool = 385500;
  let initialUserPool = 180000;
  let initialTotalStake = 565500;
  let initialNumberOfStakers = 6;


  // Stacking constants P1
  // PROVIDERS BALANCE
  let P1StakeBalanceProvider1 = 2000;
  let P1StakeBalanceProvider2 = 264000;
  let P1StakeBalanceProvider3 = 40000;
  // USERS BALANCE
  let P1StakeBalanceUser1 = 42850;
  let P1StakeBalanceUser2 = 85700;
  let P1StakeBalanceUser3 = 128550;
  // POOLS BALANCE
  let P1ProviderPool = 308400;
  let P1UserPool = 257100;
  let P1TotalStake = 565500;
  let P1NumberOfStakers = 6;

  // Stacking constants P2
  // PROVIDERS BALANCE
  let P2StakeBalanceProvider1 = 1300;
  let P2StakeBalanceProvider2 = 157440;
  let P2StakeBalanceProvider3 = 24000;
  // USERS BALANCE
  let P2StakeBalanceUser1 = 63410;
  let P2StakeBalanceUser2 = 126820;
  let P2StakeBalanceUser3 = 190230;
  // POOLS BALANCE
  let P2ProviderPool = 185040;
  let P2UserPool = 380460;
  let P2TotalStake = 565500;
  let P2NumberOfStakers = 6;

  // Stacking constants P3
  // PROVIDERS BALANCE
  let P3StakeBalanceProvider1 = 580;
  let P3StakeBalanceProvider2 = 61536;
  let P3StakeBalanceProvider3 = 9600;
  // USERS BALANCE
  let P3StakeBalanceUser1 = 81914;
  let P3StakeBalanceUser2 = 163828;
  let P3StakeBalanceUser3 = 245742;
  // POOLS BALANCE
  let P3ProviderPool = 74016;
  let P3UserPool = 491484;
  let P3TotalStake = 565500;
  let P3NumberOfStakers = 6;

  // Stacking constants P4
  // PROVIDERS BALANCE
  let P4StakeBalanceProvider1 = 196;
  let P4StakeBalanceProvider2 = 10387.2;
  let P4StakeBalanceProvider3 = 1920;
  // USERS BALANCE
  let P4StakeBalanceUser1 = 91782.2;
  let P4StakeBalanceUser2 = 183565.6;
  let P4StakeBalanceUser3 = 275348.4;
  // POOLS BALANCE
  let P4ProviderPool = 14803.2;
  let P4UserPool = 550696.8;
  let P4TotalStake = 565500;
  let P4NumberOfStakers = 6;


    // Stacking constants P5
  // PROVIDERS BALANCE
  let P5StakeBalanceProvider1 = 100;
  let P5StakeBalanceProvider2 = 0 // CHECK why -2400;
  let P5StakeBalanceProvider3 = 0;
  // USERS BALANCE
  let P5StakeBalanceUser1 = 94249.4;
  let P5StakeBalanceUser2 = 188500;
  let P5StakeBalanceUser3 = 282750;
  // POOLS BALANCE
  let P5ProviderPool = 0; //CHECK why 100
  let P5UserPool = 565500; 
  let P5TotalStake = 565500;
  let P5NumberOfStakers = 6;

  //
  /*let currentProviderPool: InstanceType<typeof BigNumber>;
  let currentUsersPool: InstanceType<typeof BigNumber>;
  let currentTotalStake: InstanceType<typeof BigNumber>;*/

  let currentProviderPool: BigNumber = BigNumber.from("0");
  let currentUsersPool: BigNumber = BigNumber.from("0");
  let currentTotalStake: BigNumber = BigNumber.from("0");

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

  before(async function () {
    this.timeout(0);
    await loadFixture(fixture);
    consola.success('LODADED FIXTURE');
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.getSigner(deployer);

    unnamedAccounts =  await getUnnamedAccounts();

    slaRegistry = await SLARegistry__factory.connect(
      (
        await get(CONTRACT_NAMES.SLARegistry)
      ).address,
      signer
    );
    allSLAs = await slaRegistry.allSLAs();
    _sloRegistry = await slaRegistry.sloRegistry();

    //console.log('DSLA Protocol Staking Simulation - v1.5 initial test')
    sla = await ethers.getContractAt(CONTRACT_NAMES.SLA, allSLAs[0]); // get the contract INDEX 17, Contract for IT staking tests: Not Respected case
    details = await ethers.getContract(CONTRACT_NAMES.Details);
    signersAccounts = await hre.ethers.getSigners();

    provider_1_account = signersAccounts[0];
    provider_2_account = signersAccounts[1];
    provider_3_account = signersAccounts[2];

    user_1_account = signersAccounts[3];
    user_2_account = signersAccounts[4];
    user_3_account = signersAccounts[5];

    // Get dslaToken contract
    const dslaToken: ERC20PresetMinterPauser = await ethers.getContract(
      CONTRACT_NAMES.DSLA
    );

    // Approve allocation of amount to dslaToken address
    consola.info('Approve allocation of amount to dslaToken address');
    let amount = 565500;
    tx = await dslaToken.approve(sla.address, amount);
  
    // Associate Users to SLA contract
    consola.info('Associate Users to SLA contract');
    const user_1_SLA = SLA__factory.connect(
      sla.address,
      user_1_account
    )
    const user_2_SLA = SLA__factory.connect(
      sla.address,
      user_2_account
    )
    const user_3_SLA = SLA__factory.connect(
      sla.address,
      user_3_account
    )

    // Associate Providers to SLA contract
    consola.info('Associate Providers to SLA contract');
    const provider_1_SLA = SLA__factory.connect(
      sla.address,
      provider_1_account
    )
    const provider_2_SLA = SLA__factory.connect(
      sla.address,
      provider_2_account
    )
    const provider_3_SLA = SLA__factory.connect(
      sla.address,
      provider_3_account
    )

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
    await provider_1_DSLA.mint(provider_1_account.address, initialStakeBalanceProvider1);
    await provider_2_DSLA.mint(provider_2_account.address, initialStakeBalanceProvider2);
    await provider_3_DSLA.mint(provider_3_account.address, initialStakeBalanceProvider3);
    // Add token to provider accounts
    await provider_1_DSLA.approve(provider_1_SLA.address, initialStakeBalanceProvider1);
    await provider_2_DSLA.approve(provider_2_SLA.address, initialStakeBalanceProvider2);
    await provider_3_DSLA.approve(provider_3_SLA.address, initialStakeBalanceProvider3);
    // Stake token for providers
    tx = await provider_1_SLA.stakeTokens(initialStakeBalanceProvider1, provider_1_DSLA.address, 'long');
    tx = await provider_2_SLA.stakeTokens(initialStakeBalanceProvider2, provider_2_DSLA.address, 'long');
    tx = await provider_3_SLA.stakeTokens(initialStakeBalanceProvider3, provider_3_DSLA.address, 'long');

    // add token to users DSLA accounts
    await user_1_DSLA.mint(user_1_account.address, initialStakeBalanceUser1);
    await user_2_DSLA.mint(user_2_account.address, initialStakeBalanceUser2);
    await user_3_DSLA.mint(user_3_account.address, initialStakeBalanceUser3);
    // Add token to users accounts
    await user_1_DSLA.approve(user_1_SLA.address, initialStakeBalanceUser1);
    await user_2_DSLA.approve(user_2_SLA.address, initialStakeBalanceUser2);
    await user_3_DSLA.approve(user_3_SLA.address, initialStakeBalanceUser3);

    // Stake token for users
    tx = await user_1_SLA.stakeTokens(initialStakeBalanceUser1, user_1_DSLA.address, 'short');
    tx = await user_2_SLA.stakeTokens(initialStakeBalanceUser2, user_2_DSLA.address, 'short');
    tx = await user_3_SLA.stakeTokens(initialStakeBalanceUser3, user_3_DSLA.address, 'short');

    consola.info('Initial DONE');

    let slaDetails = await details.getSLADetailsArrays(sla.address);
    let slaDynamicDetails = await details.getSLADynamicDetails(sla.address);
    console.log("slaDetails INIT");
    console.log(slaDetails);
    console.log("slaDynamicDetails INIT");
    console.log(slaDynamicDetails);

    stakersLength = await sla.getStakersLength();
    console.log("stakersLength : " + stakersLength);
    let stakersLengthFromDd = slaDynamicDetails.stakersCount.toString();
    console.log("stakersLengthFromDd : " + stakersLengthFromDd);
    
    // GETTING MESSENGER
    /*const messengerAddress = await sla.messengerAddress();
    const messengerContract: SEAMessenger = await ethers.getContractAt(CONTRACT_NAMES.SEAMessenger, messengerAddress);*/
    
    // REQUEST SLI
    slaRegistry = await SLARegistry__factory.connect(
      (
        await get(CONTRACT_NAMES.SLARegistry)
      ).address,
      user_1_account
    );

    slaDetailsP0 = await details.getSLADetailsArrays(sla.address);
    console.log("slaDetails P0 (init)");
    console.log(slaDetailsP0);
    
    currentProviderPool = slaDetailsP0.tokensStake[0].providerPool;
    currentUsersPool = slaDetailsP0.tokensStake[0].usersPool;
    currentTotalStake = slaDetailsP0.tokensStake[0].totalStake;

  });

  it('needs to be written', async () => {
    const sla: SLA = await ethers.getContractAt(CONTRACT_NAMES.SLA, allSLAs[0]);
  });

    describe("Initial P0", function () {

      describe("P0 tests execution", function () {

        it('StakersLength should be equal to initialNumberOfStakers', function () {
          expect(stakersLength).equals(initialNumberOfStakers);
        });
        it('Total Provider Pool should be equal to initialized value', function () {
          expect(initialProviderPool.toString()).equals(currentProviderPool.toString());
        });
        it('Total User Pool should be equal to initialized value', function () {
          expect(initialUserPool.toString()).equals(currentUsersPool.toString());
        });
        it('Total Liquidity Pool should be equal to initialized value', function () {
          expect(initialTotalStake.toString()).equals(currentTotalStake.toString());
        });

  
        it('Povider_1 Balance should be equal to initialized value', function () {
          // CHECK PROVIDERS BALANCE
          // Note: Thoses values are extrapolated from ProviderPool as it is not yet possible to get stake size by provider
          currentBalPrv1 = currentProviderPool.sub(initialStakeBalanceProvider2).sub(initialStakeBalanceProvider3);
          expect(currentBalPrv1.toString()).equals(initialStakeBalanceProvider1.toString());
        });
        it('Povider_2 Balance should be equal to initialized value', function () {
          // CHECK PROVIDERS BALANCE
          // Note: Thoses values are extrapolated from ProviderPool as it is not yet possible to get stake size by provider
          currentBalPrv2 = currentProviderPool.sub(initialStakeBalanceProvider1).sub(initialStakeBalanceProvider3);
          expect(currentBalPrv2.toString()).equals(initialStakeBalanceProvider2.toString());
        });
        it('Povider_3 Balance should be equal to initialized value', function () {
          // CHECK PROVIDERS BALANCE
          // Note: Thoses values are extrapolated from ProviderPool as it is not yet possible to get stake size by provider
          currentBalPrv3 = currentProviderPool.sub(initialStakeBalanceProvider1).sub(initialStakeBalanceProvider2);
          expect(currentBalPrv3.toString()).equals(initialStakeBalanceProvider3.toString());
        });
  
  
        // CHECK USERS BALANCE
        // Note: Thoses values are extrapolated from UsersPool as it is not yet possible to get stake size by user
        it('User_1 Balance should be equal to initialized value', function () {
          let currentBalUser1 = currentUsersPool.sub(initialStakeBalanceUser2).sub(initialStakeBalanceUser3);
          expect(initialStakeBalanceUser1.toString()).equals(currentBalUser1.toString());
        });
        it('User_2 Balance should be equal to initialized value', function () {
          let currentBalUser2 = currentUsersPool.sub(initialStakeBalanceUser1).sub(initialStakeBalanceUser3);
          expect(initialStakeBalanceUser2.toString()).equals(currentBalUser2.toString());
        });
        it('User_3 Balance should be equal to initialized value', function () {
          let currentBalUser3 = currentUsersPool.sub(initialStakeBalanceUser1).sub(initialStakeBalanceUser2);
          expect(initialStakeBalanceUser3.toString()).equals(currentBalUser3.toString());
        });


      });
    })

    // P1 tests
    describe("P1", function () {
      describe("request SLI P1", function () {
        it('Shoud perform a succesful request SLI for P1', async function () {
          console.log("request SLI P1")
          //console.log('-----------------------------------------------------------');
          //console.log('Requesting SLI for P1...');
          const ownerApproval = true;
          // Get dslaToken contract TODO: Do that one time only, at setup 
          const dslaToken: ERC20PresetMinterPauser = await ethers.getContract(
            CONTRACT_NAMES.DSLA
          );
    
          const periodId_p1 = 0//Number(0)
          const usersStake = 10
          const expectedCompensation = 100
    
          tx = await slaRegistry.requestSLI(
            periodId_p1,
            sla.address,
            ownerApproval,
            {
              ...(network.config.gas !== 'auto' && {
                gasLimit: network.config.gas,
              }),
            }
          );
          await tx.wait();
          //console.log('requestSLI P1 done Transaction receipt: ');
          //console.log(tx);
  
          const nextVerifiablePeriod = await sla.nextVerifiablePeriod();
  
          await tx.wait();
          await new Promise((resolve) => sla.on('SLICreated', () => resolve(null)));
          const createdSLI = await sla.periodSLIs(nextVerifiablePeriod);
          const { timestamp, sli, status } = createdSLI;
          slaDetailsP1 = await details.getSLADetailsArrays(sla.address)

          currentProviderPool = slaDetailsP1.tokensStake[0].providerPool;
          currentUsersPool = slaDetailsP1.tokensStake[0].usersPool;
          currentTotalStake = slaDetailsP1.tokensStake[0].totalStake;

          slaStaticDetailsP1 = await details.getSLAStaticDetails(sla.address, _sloRegistry)

          const slaContractSloValue = slaStaticDetailsP1.sloValue
          const precision = 10000

          ///// DEBUGING DEVIATION /////////////////////////

          /*let deviation = await _sloRegistry.getDeviation(
              sli,
              sla.address,
              precision
          );*/
          /*
          uint256 deviation = (
            _sli >= sloValue ? _sli.sub(sloValue) : sloValue.sub(_sli)
        ).mul(precision).div(sliValue.add(sloValue).div(2));*/

          const getDeviation = (sloValue: number, sliValue: number, precision: number) => {

            return (Math.abs(sliValue - sloValue) * precision) / ((sloValue + sliValue) / 2)
            //return Math.floor(Math.abs(sliValue - sloValue) * precision / ((sloValue + sliValue) / 2));
          }


          console.log('SLO: ', slaContractSloValue.toString())
          console.log('SLI: ', sli.toString())
          console.log('Precision: ', precision)


          let deviation = getDeviation(slaContractSloValue.toNumber(), sli, precision)

          console.log("Original Deviation: ", deviation)
          
          // Enforces a deviation capped at 25%
          if (deviation > (precision * 25) / 100) {
              deviation = (precision * 25) / 100;
          }

          console.log("Capped Deviation: ", deviation)

          ///// END DEBUGING DEVIATION /////////////////////////
          
          console.log("--------------------------------------------------------------")
          
          console.log('sla.address: ', sla.address);
          console.log('Created SLI timestamp: ', timestamp.toString());
          console.log('Created SLI sli: ', sli.toString());
          console.log('Created SLI status: ', PERIOD_STATUS[status]);
          console.log('SLI request process finished');
          console.log("--------------------------------------------------------------")
    
          console.log("createdSLI")
          consola.info(createdSLI)
          //console.log("timestamp")
          //consola.info(timestamp)
          //console.log("sli")
          //consola.info(sli)
          //console.log("sli string : " + sli.toString())
          //console.log("status : " + status.toString())
          /*console.log("slaDetails P1 Results")
          console.log(slaDetailsP1)*/
          console.log("slaStaticDetailsP1 Results")
          console.log(slaStaticDetailsP1)

          console.log("slaContractSloValue: " + slaStaticDetailsP1.sloValue.toString())

          console.log("Registered SLI for P1")
          console.log("sli: " + slaDetailsP1.periodSLIs[0].sli.toString())
          console.log("status: " +slaDetailsP1.periodSLIs[0].status.toString())

          console.log("--------------------------------------------------------------")

          expect(true).equals(true)

        });
      });

      describe("P1 tests execution", function () {
        it('Total Provider Pool should be equal to P1 expected value', function () {
          expect(currentProviderPool.toString()).equals(P1ProviderPool.toString());
        });
        it('Total User Pool should be equal to P1 expected value', function () {
          expect(currentUsersPool.toString()).equals(P1UserPool.toString());
        });
        it('Total Liquidity Pool should be equal to P1 expected value', function () {
          expect(currentTotalStake.toString()).equals(P1TotalStake.toString());
        });

        it('Povider_1 Balance should be equal to P1 expected value', function () {
          // CHECK PROVIDERS BALANCE
          // Note: Thoses values are extrapolated from ProviderPool as it is not yet possible to get stake size by provider
          currentBalPrv1 = currentProviderPool.sub(P1StakeBalanceProvider2).sub(P1StakeBalanceProvider3);
          expect(currentBalPrv1.toString()).equals(P1StakeBalanceProvider1.toString());
        });
        it('Povider_2 Balance should be equal to P1 expected value', function () {
          // CHECK PROVIDERS BALANCE
          // Note: Thoses values are extrapolated from ProviderPool as it is not yet possible to get stake size by provider
          currentBalPrv2 = currentProviderPool.sub(P1StakeBalanceProvider1).sub(P1StakeBalanceProvider3);
          expect(currentBalPrv2.toString()).equals(P1StakeBalanceProvider2.toString());
        });
        it('Povider_3 Balance should be equal to P1 expected value', function () {
          // CHECK PROVIDERS BALANCE
          // Note: Thoses values are extrapolated from ProviderPool as it is not yet possible to get stake size by provider
          currentBalPrv3 = currentProviderPool.sub(P1StakeBalanceProvider1).sub(P1StakeBalanceProvider2);
          expect(currentBalPrv3.toString()).equals(P1StakeBalanceProvider3.toString());
        });
  
        // CHECK USERS BALANCE
        // Note: Thoses values are extrapolated from UsersPool as it is not yet possible to get stake size by user
        it('User_1 Balance should be equal to P1 expected value', function () {
          let currentBalUser1 = currentUsersPool.sub(P1StakeBalanceUser2).sub(P1StakeBalanceUser3);
          expect(currentBalUser1.toString()).equals(P1StakeBalanceUser1.toString());
        });
        it('User_2 Balance should be equal to P1 expected value', function () {
          let currentBalUser2 = currentUsersPool.sub(P1StakeBalanceUser1).sub(P1StakeBalanceUser3);
          expect(currentBalUser2.toString()).equals(P1StakeBalanceUser2.toString());
        });
        it('User_3 Balance should be equal to P1 expected value', function () {
          let currentBalUser3 = currentUsersPool.sub(P1StakeBalanceUser1).sub(P1StakeBalanceUser2);
          expect(currentBalUser3.toString()).equals(P1StakeBalanceUser3.toString());
        });
        it('StakersLength should be equal to initialNumberOfStakers', function () {
          expect(stakersLength).equals(initialNumberOfStakers);
        });
      });
    });

    /*
    // P2 tests
    describe("P2", function () {
      describe("request SLI P2", function () {
        it('Shoud perform a succesful request SLI for P2', async function () {
          console.log("request SLI P2")
          //console.log('-----------------------------------------------------------');
          //console.log('Requesting SLI for P2...');
          const ownerApproval = true;
    
          // Get dslaToken contract TODO: Do that one time only, at setup 
          const dslaToken: ERC20PresetMinterPauser = await ethers.getContract(
            CONTRACT_NAMES.DSLA
          );
    
          const periodId_P2 = 1//Number(0)
          const usersStake = 10
          const expectedCompensation = 100

          tx = await slaRegistry.requestSLI(
            periodId_P2,
            sla.address,
            ownerApproval,
            {
              ...(network.config.gas !== 'auto' && {
                gasLimit: network.config.gas,
              }),
            }
          );
          await tx.wait();
          //console.log('requestSLI P2 done Transaction receipt: ');
          //console.log(tx);
  
          const nextVerifiablePeriod = await sla.nextVerifiablePeriod();
  
          await tx.wait();
          await new Promise((resolve) => sla.on('SLICreated', () => resolve(null)));
          const createdSLI = await sla.periodSLIs(nextVerifiablePeriod);
          const { timestamp, sli, status } = createdSLI;
          slaDetailsP2 = await details.getSLADetailsArrays(sla.address)

          currentProviderPool = slaDetailsP2.tokensStake[0].providerPool;
          currentUsersPool = slaDetailsP2.tokensStake[0].usersPool;
          currentTotalStake = slaDetailsP2.tokensStake[0].totalStake;
  
          //console.log('Created SLI timestamp: ', timestamp.toString());
          //console.log('Created SLI sli: ', sli.toString());
          //console.log('Created SLI status: ', PERIOD_STATUS[status]);
          //console.log('SLI request process finished');
    
          //console.log("createdSLI")
          //consola.info(createdSLI)
          //console.log("timestamp")
          //consola.info(timestamp)
          //console.log("sli")
          //consola.info(sli)
          //console.log("sli string : " + sli.toString())
          //console.log("status : " + status.toString())
          //console.log("slaDetails P2")
          //console.log(slaDetailsP2)

          expect(true).equals(true)

        });
      });

      describe("P2 tests execution", function () {
        it('Total Provider Pool should be equal to P2 expected value', function () {
          expect(currentProviderPool.toString()).equals(P2ProviderPool.toString());
        });
        it('Total User Pool should be equal to P2 expected value', function () {
          expect(currentUsersPool.toString()).equals(P2UserPool.toString());
        });
        it('Total Liquidity Pool should be equal to P2 expected value', function () {
          expect(currentTotalStake.toString()).equals(P2TotalStake.toString());
        });

        it('Povider_1 Balance should be equal to P2 expected value', function () {
          // CHECK PROVIDERS BALANCE
          // Note: Thoses values are extrapolated from ProviderPool as it is not yet possible to get stake size by provider
          currentBalPrv1 = currentProviderPool.sub(P2StakeBalanceProvider2).sub(P2StakeBalanceProvider3);
          expect(currentBalPrv1.toString()).equals(P2StakeBalanceProvider1.toString());
        });
        it('Povider_2 Balance should be equal to P2 expected value', function () {
          // CHECK PROVIDERS BALANCE
          // Note: Thoses values are extrapolated from ProviderPool as it is not yet possible to get stake size by provider
          currentBalPrv2 = currentProviderPool.sub(P2StakeBalanceProvider1).sub(P2StakeBalanceProvider3);
          expect(currentBalPrv2.toString()).equals(P2StakeBalanceProvider2.toString());
        });
        it('Povider_3 Balance should be equal to P2 expected value', function () {
          // CHECK PROVIDERS BALANCE
          // Note: Thoses values are extrapolated from ProviderPool as it is not yet possible to get stake size by provider
          currentBalPrv3 = currentProviderPool.sub(P2StakeBalanceProvider1).sub(P2StakeBalanceProvider2);
          expect(currentBalPrv3.toString()).equals(P2StakeBalanceProvider3.toString());
        });
  
        // CHECK USERS BALANCE
        // Note: Thoses values are extrapolated from UsersPool as it is not yet possible to get stake size by user
        it('User_1 Balance should be equal to P2 expected value', function () {
          let currentBalUser1 = currentUsersPool.sub(P2StakeBalanceUser2).sub(P2StakeBalanceUser3);
          expect(currentBalUser1.toString()).equals(P2StakeBalanceUser1.toString());
        });
        it('User_2 Balance should be equal to P2 expected value', function () {
          let currentBalUser2 = currentUsersPool.sub(P2StakeBalanceUser1).sub(P2StakeBalanceUser3);
          expect(currentBalUser2.toString()).equals(P2StakeBalanceUser2.toString());
        });
        it('User_3 Balance should be equal to P2 expected value', function () {
          let currentBalUser3 = currentUsersPool.sub(P2StakeBalanceUser1).sub(P2StakeBalanceUser2);
          expect(currentBalUser3.toString()).equals(P2StakeBalanceUser3.toString());
        });
  
        it('StakersLength should be equal to initialNumberOfStakers', function () {
          expect(stakersLength).equals(initialNumberOfStakers);
        });
      });
    });



    // P3 tests
    describe("P3", function () {
      describe("request SLI P3", function () {
        it('Shoud perform a succesful request SLI for P3', async function () {
          console.log("request SLI P3")
          //console.log('-----------------------------------------------------------');
          //console.log('Requesting SLI for P3...');
          const ownerApproval = true;
    
          // Get dslaToken contract TODO: Do that one time only, at setup 
          const dslaToken: ERC20PresetMinterPauser = await ethers.getContract(
            CONTRACT_NAMES.DSLA
          );
    
          const periodId_P3 = 1//Number(0)
          const usersStake = 10
          const expectedCompensation = 100

          tx = await slaRegistry.requestSLI(
            periodId_P3,
            sla.address,
            ownerApproval,
            {
              ...(network.config.gas !== 'auto' && {
                gasLimit: network.config.gas,
              }),
            }
          );
          await tx.wait();
          //console.log('requestSLI P3 done Transaction receipt: ');
          //console.log(tx);
  
          const nextVerifiablePeriod = await sla.nextVerifiablePeriod();
  
          await tx.wait();
          await new Promise((resolve) => sla.on('SLICreated', () => resolve(null)));
          const createdSLI = await sla.periodSLIs(nextVerifiablePeriod);
          const { timestamp, sli, status } = createdSLI;
          slaDetailsP3 = await details.getSLADetailsArrays(sla.address)

          currentProviderPool = slaDetailsP3.tokensStake[0].providerPool;
          currentUsersPool = slaDetailsP3.tokensStake[0].usersPool;
          currentTotalStake = slaDetailsP3.tokensStake[0].totalStake;
  
          //console.log('Created SLI timestamp: ', timestamp.toString());
          //console.log('Created SLI sli: ', sli.toString());
          //console.log('Created SLI status: ', PERIOD_STATUS[status]);
          //console.log('SLI request process finished');
    
          //console.log("createdSLI")
          //consola.info(createdSLI)
          //console.log("timestamp")
          //consola.info(timestamp)
          //console.log("sli")
          //consola.info(sli)
          //console.log("sli string : " + sli.toString())
          //console.log("status : " + status.toString())
          //console.log("slaDetails P3")
          //console.log(slaDetailsP3)

          expect(true).equals(true)

        });
      });

      describe("P3 tests execution", function () {
        it('Total Provider Pool should be equal to P3 expected value', function () {
          expect(currentProviderPool.toString()).equals(P3ProviderPool.toString());
        });
        it('Total User Pool should be equal to P3 expected value', function () {
          expect(currentUsersPool.toString()).equals(P3UserPool.toString());
        });
        it('Total Liquidity Pool should be equal to P3 expected value', function () {
          expect(currentTotalStake.toString()).equals(P3TotalStake.toString());
        });

        it('Povider_1 Balance should be equal to P3 expected value', function () {
          // CHECK PROVIDERS BALANCE
          // Note: Thoses values are extrapolated from ProviderPool as it is not yet possible to get stake size by provider
          currentBalPrv1 = currentProviderPool.sub(P3StakeBalanceProvider2).sub(P3StakeBalanceProvider3);
          expect(currentBalPrv1.toString()).equals(P3StakeBalanceProvider1.toString());
        });
        it('Povider_2 Balance should be equal to P3 expected value', function () {
          // CHECK PROVIDERS BALANCE
          // Note: Thoses values are extrapolated from ProviderPool as it is not yet possible to get stake size by provider
          currentBalPrv2 = currentProviderPool.sub(P3StakeBalanceProvider1).sub(P3StakeBalanceProvider3);
          expect(currentBalPrv2.toString()).equals(P3StakeBalanceProvider2.toString());
        });
        it('Povider_3 Balance should be equal to P3 expected value', function () {
          // CHECK PROVIDERS BALANCE
          // Note: Thoses values are extrapolated from ProviderPool as it is not yet possible to get stake size by provider
          currentBalPrv3 = currentProviderPool.sub(P3StakeBalanceProvider1).sub(P3StakeBalanceProvider2);
          expect(currentBalPrv3.toString()).equals(P3StakeBalanceProvider3.toString());
        });
  
        // CHECK USERS BALANCE
        // Note: Thoses values are extrapolated from UsersPool as it is not yet possible to get stake size by user
        it('User_1 Balance should be equal to P3 expected value', function () {
          let currentBalUser1 = currentUsersPool.sub(P3StakeBalanceUser2).sub(P3StakeBalanceUser3);
          expect(currentBalUser1.toString()).equals(P3StakeBalanceUser1.toString());
        });
        it('User_2 Balance should be equal to P3 expected value', function () {
          let currentBalUser2 = currentUsersPool.sub(P3StakeBalanceUser1).sub(P3StakeBalanceUser3);
          expect(currentBalUser2.toString()).equals(P3StakeBalanceUser2.toString());
        });
        it('User_3 Balance should be equal to P3 expected value', function () {
          let currentBalUser3 = currentUsersPool.sub(P3StakeBalanceUser1).sub(P3StakeBalanceUser2);
          expect(currentBalUser3.toString()).equals(P3StakeBalanceUser3.toString());
        });
  
        it('StakersLength should be equal to initialNumberOfStakers', function () {
          expect(stakersLength).equals(initialNumberOfStakers);
        });
      });
    });





    // P4 tests
    describe("P4", function () {
      describe("request SLI P4", function () {
        it('Shoud perform a succesful request SLI for P4', async function () {
          console.log("request SLI P4")
          //console.log('-----------------------------------------------------------');
          //console.log('Requesting SLI for P4...');
          const ownerApproval = true;
    
          // Get dslaToken contract TODO: Do that one time only, at setup 
          const dslaToken: ERC20PresetMinterPauser = await ethers.getContract(
            CONTRACT_NAMES.DSLA
          );
    
          const periodId_P4 = 1//Number(0)
          const usersStake = 10
          const expectedCompensation = 100

          tx = await slaRegistry.requestSLI(
            periodId_P4,
            sla.address,
            ownerApproval,
            {
              ...(network.config.gas !== 'auto' && {
                gasLimit: network.config.gas,
              }),
            }
          );
          await tx.wait();
          //console.log('requestSLI P4 done Transaction receipt: ');
          //console.log(tx);
  
          const nextVerifiablePeriod = await sla.nextVerifiablePeriod();
  
          await tx.wait();
          await new Promise((resolve) => sla.on('SLICreated', () => resolve(null)));
          const createdSLI = await sla.periodSLIs(nextVerifiablePeriod);
          const { timestamp, sli, status } = createdSLI;
          slaDetailsP4 = await details.getSLADetailsArrays(sla.address)

          currentProviderPool = slaDetailsP4.tokensStake[0].providerPool;
          currentUsersPool = slaDetailsP4.tokensStake[0].usersPool;
          currentTotalStake = slaDetailsP4.tokensStake[0].totalStake;
  
          //console.log('Created SLI timestamp: ', timestamp.toString());
          //console.log('Created SLI sli: ', sli.toString());
          //console.log('Created SLI status: ', PERIOD_STATUS[status]);
          //console.log('SLI request process finished');
    
          //console.log("createdSLI")
          //consola.info(createdSLI)
          //console.log("timestamp")
          //consola.info(timestamp)
          //console.log("sli")
          //consola.info(sli)
          //console.log("sli string : " + sli.toString())
          //console.log("status : " + status.toString())
          //console.log("slaDetails P4")
          //console.log(slaDetailsP4)

          expect(true).equals(true)

        });
      });

      describe("P4 tests execution", function () {
        it('Total Provider Pool should be equal to P4 expected value', function () {
          expect(currentProviderPool.toString()).equals(P4ProviderPool.toString());
        });
        it('Total User Pool should be equal to P4 expected value', function () {
          expect(currentUsersPool.toString()).equals(P4UserPool.toString());
        });
        it('Total Liquidity Pool should be equal to P4 expected value', function () {
          expect(currentTotalStake.toString()).equals(P4TotalStake.toString());
        });

        it('Povider_1 Balance should be equal to P4 expected value', function () {
          // CHECK PROVIDERS BALANCE
          // Note: Thoses values are extrapolated from ProviderPool as it is not yet possible to get stake size by provider
          currentBalPrv1 = currentProviderPool.sub(P4StakeBalanceProvider2).sub(P4StakeBalanceProvider3);
          expect(currentBalPrv1.toString()).equals(P4StakeBalanceProvider1.toString());
        });
        it('Povider_2 Balance should be equal to P4 expected value', function () {
          // CHECK PROVIDERS BALANCE
          // Note: Thoses values are extrapolated from ProviderPool as it is not yet possible to get stake size by provider
          currentBalPrv2 = currentProviderPool.sub(P4StakeBalanceProvider1).sub(P4StakeBalanceProvider3);
          expect(currentBalPrv2.toString()).equals(P4StakeBalanceProvider2.toString());
        });
        it('Povider_3 Balance should be equal to P4 expected value', function () {
          // CHECK PROVIDERS BALANCE
          // Note: Thoses values are extrapolated from ProviderPool as it is not yet possible to get stake size by provider
          currentBalPrv3 = currentProviderPool.sub(P4StakeBalanceProvider1).sub(P4StakeBalanceProvider2);
          expect(currentBalPrv3.toString()).equals(P4StakeBalanceProvider3.toString());
        });
  
        // CHECK USERS BALANCE
        // Note: Thoses values are extrapolated from UsersPool as it is not yet possible to get stake size by user
        it('User_1 Balance should be equal to P4 expected value', function () {
          let currentBalUser1 = currentUsersPool.sub(P4StakeBalanceUser2).sub(P4StakeBalanceUser3);
          expect(currentBalUser1.toString()).equals(P4StakeBalanceUser1.toString());
        });
        it('User_2 Balance should be equal to P4 expected value', function () {
          let currentBalUser2 = currentUsersPool.sub(P4StakeBalanceUser1).sub(P4StakeBalanceUser3);
          expect(currentBalUser2.toString()).equals(P4StakeBalanceUser2.toString());
        });
        it('User_3 Balance should be equal to P4 expected value', function () {
          let currentBalUser3 = currentUsersPool.sub(P4StakeBalanceUser1).sub(P4StakeBalanceUser2);
          expect(currentBalUser3.toString()).equals(P4StakeBalanceUser3.toString());
        });
  
        it('StakersLength should be equal to initialNumberOfStakers', function () {
          expect(stakersLength).equals(initialNumberOfStakers);
        });
      });
    });


    // P5 tests
    describe("P5", function () {
      describe("request SLI P5", function () {
        it('Shoud perform a succesful request SLI for P5', async function () {
          console.log("request SLI P5")
          //console.log('-----------------------------------------------------------');
          //console.log('Requesting SLI for P5...');
          const ownerApproval = true;
    
          // Get dslaToken contract TODO: Do that one time only, at setup 
          const dslaToken: ERC20PresetMinterPauser = await ethers.getContract(
            CONTRACT_NAMES.DSLA
          );
    
          const periodId_P5 = 1//Number(0)
          const usersStake = 10
          const expectedCompensation = 100

          tx = await slaRegistry.requestSLI(
            periodId_P5,
            sla.address,
            ownerApproval,
            {
              ...(network.config.gas !== 'auto' && {
                gasLimit: network.config.gas,
              }),
            }
          );
          await tx.wait();
          //console.log('requestSLI P5 done Transaction receipt: ');
          //console.log(tx);
  
          const nextVerifiablePeriod = await sla.nextVerifiablePeriod();
  
          await tx.wait();
          await new Promise((resolve) => sla.on('SLICreated', () => resolve(null)));
          const createdSLI = await sla.periodSLIs(nextVerifiablePeriod);
          const { timestamp, sli, status } = createdSLI;
          slaDetailsP5 = await details.getSLADetailsArrays(sla.address)

          currentProviderPool = slaDetailsP5.tokensStake[0].providerPool;
          currentUsersPool = slaDetailsP5.tokensStake[0].usersPool;
          currentTotalStake = slaDetailsP5.tokensStake[0].totalStake;
  
          //console.log('Created SLI timestamp: ', timestamp.toString());
          //console.log('Created SLI sli: ', sli.toString());
          //console.log('Created SLI status: ', PERIOD_STATUS[status]);
          //console.log('SLI request process finished');
    
          //console.log("createdSLI")
          //consola.info(createdSLI)
          //console.log("timestamp")
          //consola.info(timestamp)
          //console.log("sli")
          //consola.info(sli)
          //console.log("sli string : " + sli.toString())
          //console.log("status : " + status.toString())
          //console.log("slaDetails P5")
          //console.log(slaDetailsP5)

          expect(true).equals(true)

        });
      });

      describe("P5 tests execution", function () {
        it('Total Provider Pool should be equal to P5 expected value', function () {
          expect(currentProviderPool.toString()).equals(P5ProviderPool.toString());
        });
        it('Total User Pool should be equal to P5 expected value', function () {
          expect(currentUsersPool.toString()).equals(P5UserPool.toString());
        });
        it('Total Liquidity Pool should be equal to P5 expected value', function () {
          expect(currentTotalStake.toString()).equals(P5TotalStake.toString());
        });

        it('Povider_1 Balance should be equal to P5 expected value', function () {
          // CHECK PROVIDERS BALANCE
          // Note: Thoses values are extrapolated from ProviderPool as it is not yet possible to get stake size by provider
          currentBalPrv1 = currentProviderPool.sub(P5StakeBalanceProvider2).sub(P5StakeBalanceProvider3);
          expect(currentBalPrv1.toString()).equals(P5StakeBalanceProvider1.toString());
        });
        it('Povider_2 Balance should be equal to P5 expected value', function () {
          // CHECK PROVIDERS BALANCE
          // Note: Thoses values are extrapolated from ProviderPool as it is not yet possible to get stake size by provider
          currentBalPrv2 = currentProviderPool.sub(P5StakeBalanceProvider1).sub(P5StakeBalanceProvider3);
          expect(currentBalPrv2.toString()).equals(P5StakeBalanceProvider2.toString());
        });
        it('Povider_3 Balance should be equal to P5 expected value', function () {
          // CHECK PROVIDERS BALANCE
          // Note: Thoses values are extrapolated from ProviderPool as it is not yet possible to get stake size by provider
          currentBalPrv3 = currentProviderPool.sub(P5StakeBalanceProvider1).sub(P5StakeBalanceProvider2);
          expect(currentBalPrv3.toString()).equals(P5StakeBalanceProvider3.toString());
        });
  
        // CHECK USERS BALANCE
        // Note: Thoses values are extrapolated from UsersPool as it is not yet possible to get stake size by user
        it('User_1 Balance should be equal to P5 expected value', function () {
          let currentBalUser1 = currentUsersPool.sub(P5StakeBalanceUser2).sub(P5StakeBalanceUser3);
          expect(currentBalUser1.toString()).equals(P5StakeBalanceUser1.toString());
        });
        it('User_2 Balance should be equal to P5 expected value', function () {
          let currentBalUser2 = currentUsersPool.sub(P5StakeBalanceUser1).sub(P5StakeBalanceUser3);
          expect(currentBalUser2.toString()).equals(P5StakeBalanceUser2.toString());
        });
        it('User_3 Balance should be equal to P5 expected value', function () {
          let currentBalUser3 = currentUsersPool.sub(P5StakeBalanceUser1).sub(P5StakeBalanceUser2);
          expect(currentBalUser3.toString()).equals(P5StakeBalanceUser3.toString());
        });
  
        it('StakersLength should be equal to initialNumberOfStakers', function () {
          expect(stakersLength).equals(initialNumberOfStakers);
        });
      });
    });
*/


    /*it('P1', async () => {

      await expect(slaRegistry.requestSLI(
        periodId_p1,
        sla.address,
        ownerApproval,
        {
          ...(network.config.gas !== 'auto' && {
            gasLimit: network.config.gas,
          }),
        }
      ))
      .to.emit(slaRegistry, 'SLIRequested')

      //.withArgs(
      //  periodId_p1,
      //  sla.address,
      //  ownerApproval,
      //  msg.sender // Who is sender here?
      //);


      //.to.emit(sla, 'UserCompensationGenerated')
      //.withArgs(
      //  periodId_p1,
      //  dslaToken.address,
      //  usersStake,
      //  leverage,
      //  expectedCompensation
      //);


      // QUESTIONS
        // HOW TO TEST END OF PERIOD REWARD?
          // -> get values from events emit // exemple: https://github.com/fvictorio/hardhat-examples/blob/master/reading-events/test/test.js
          // -> get values with details contract ---> SELECTED solution
        // WHY usersPool is not updated after P1? --OK Fixed
        // validate userPool result
          // must get sli deviation to compute rewardPercentage



      let totalStake;
      let usersPool;
      let providerPool;

      totalStake = slaDetailsP1.tokensStake[0].totalStake
      usersPool = slaDetailsP1.tokensStake[0].usersPool
      providerPool = slaDetailsP1.tokensStake[0].providerPool

      consola.info("totalStake: " + totalStake.toString())
      consola.info("usersPool: " + usersPool.toString())
      consola.info("providerPool: " + providerPool.toString())
      console.log('-----------------------------------------------------------');

      let precision = 10000
      const leverage = 1
      const periodId_p1 = 0

      // TODO retrieve thoses values from contract details
      let expectedSliP0 = 99
      let sloValue = 100
      let expectedSliDeviation = ((expectedSliP0 - sloValue) * precision) / ((expectedSliP0 + sloValue) / 2)

      let normalizedPeriodNumber = periodId_p1 + 1
      let numberOfPeriods = 5

      
      let deviation = _sloRegistry.getDeviation(
          sli,
          sla.address,
          precision
      );
      //let rewardPercentage = deviation.mul()
      


      let expectedUserRewards = (providerPool * expectedSliDeviation) * normalizedPeriodNumber / (numberOfPeriods * leverage)

      //console.log('expectedSliDeviation: ' + expectedSliDeviation)
      //console.log('expectedUserRewards: ' + expectedUserRewards)

    })*/






    /*
    it('P2', async () => {
      console.log('-----------------------------------------------------------');
      console.log('Requesting SLI...');
      const ownerApproval = true;
      tx = await slaRegistry.requestSLI(
        Number(1),
        sla.address,
        ownerApproval,
        {
          ...(network.config.gas !== 'auto' && {
            gasLimit: network.config.gas,
          }),
        }
      );

      console.log("requestSLI done")
      consola.info(tx)

      await tx.wait();
      await new Promise((resolve) => sla.on('SLICreated', () => resolve(null)));
      const createdSLI = await sla.periodSLIs(0);
      const { timestamp, sli, status } = createdSLI;

      console.log("createdSLI")
      consola.info(createdSLI)
      console.log("timestamp")
      consola.info(timestamp)
      console.log("sli")
      consola.info(sli)
      console.log("status")
      consola.info(status)


      let slaDetailsP2 = await details.getSLADetailsArrays(sla.address)
      console.log("slaDetails P2")
      console.log(slaDetailsP2)
      console.log('-----------------------------------------------------------');

    })*/

  });
//});
