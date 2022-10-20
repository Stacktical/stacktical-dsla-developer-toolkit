import { expect } from 'chai';
import { loadFixture } from 'ethereum-waffle';
import { fixture } from '../../fixtures/basic';
import { fromWei, toWei } from 'web3-utils';
import { network, deployments, ethers, getNamedAccounts, getUnnamedAccounts } from 'hardhat';

import { BigNumber } from "@ethersproject/bignumber";

import {
  CONTRACT_NAMES,
  PERIOD_STATUS,
  PERIOD_TYPE
} from '../../../constants';
import {
  ERC20PresetMinterPauser,
  ERC20PresetMinterPauser__factory,
  SLA__factory,
  SLARegistry__factory,
  SLARegistry,
  SLA,
  SLORegistry,
  PeriodRegistry,
} from '../../../typechain';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { evm_increaseTime } from '../../helper';

const consola = require('consola');

describe('DSLA Protocol Parametric Staking Simulation - v2.1.0', () => {
    const { get } = deployments;
    let allSLAs: string[];
    let tx;
  
    let slaRegistry: SLARegistry;
    let _sloRegistry;
    let periodRegistry: PeriodRegistry;
  
    let sla: SLA;
    let details;
    let unnamedAccounts;
    let sla_owner;
  
    let provider_1_account: SignerWithAddress;
    let provider_2_account: SignerWithAddress;
    let provider_3_account: SignerWithAddress;
    let user_1_account: SignerWithAddress;
    let user_2_account: SignerWithAddress;
    let user_3_account: SignerWithAddress;
  
    // Stacking constants INITIAL
    // PROVIDERS BALANCE
    let initialStakeBalanceProvider1 = "100000";
    let initialStakeBalanceProvider2 = "100000";
    let initialStakeBalanceProvider3 = "100000";
  
    // USERS BALANCE
    let initialStakeBalanceUser1 = "10000";
    let initialStakeBalanceUser2 = "40000";
    let initialStakeBalanceUser3 = "50000";
  
    let initialProviderPool = "300000";
    let initialUserPool = "100000";
    let initialTotalStake = "400000";
    let initialNumberOfStakers = 6;
  
    // Stacking constants P1
    // PROVIDERS BALANCE
    let P1StakeBalanceProvider1 = "";
    let P1StakeBalanceProvider2 = "";
    let P1StakeBalanceProvider3 = "";
    // USERS BALANCE
    let P1StakeBalanceUser1 = "";
    let P1StakeBalanceUser2 = "";
    let P1StakeBalanceUser3 = "";
    // POOLS BALANCE
    let P1ProviderPool = "299000";
    let P1UserPool = "101000";
    let P1TotalStake = "400000";
    let P1NumberOfStakers = 6;
  
    // Stacking constants P2
    // PROVIDERS BALANCE
    let P2StakeBalanceProvider1 = "";
    let P2StakeBalanceProvider2 = "";
    let P2StakeBalanceProvider3 = "";
    // USERS BALANCE
    let P2StakeBalanceUser1 = "";
    let P2StakeBalanceUser2 = "";
    let P2StakeBalanceUser3 = "";
    // POOLS BALANCE
    let P2ProviderPool = "288900";
    let P2UserPool = "111100";
    let P2TotalStake = "400000";
    let P2NumberOfStakers = 6;
  
    // Stacking constants P3
    // PROVIDERS BALANCE
    let P3StakeBalanceProvider1 = "";
    let P3StakeBalanceProvider2 = "";
    let P3StakeBalanceProvider3 = "";
    // USERS BALANCE
    let P3StakeBalanceUser1 = "";
    let P3StakeBalanceUser2 = "";
    let P3StakeBalanceUser3 = "";
    // POOLS BALANCE
    let P3ProviderPool = "261125";
    let P3UserPool = "138875";
    let P3TotalStake = "400000";
    let P3NumberOfStakers = 6;
  
  
    let currentProviderPool: BigNumber = BigNumber.from("0");
    let currentUsersPool: BigNumber = BigNumber.from("0");
    let currentTotalStake: BigNumber = BigNumber.from("0");
  
    let currentP1ProviderPool: BigNumber = BigNumber.from("0");
    let currentP1UsersPool: BigNumber = BigNumber.from("0");
    let currentP1TotalStake: BigNumber = BigNumber.from("0");
  
    let currentP2ProviderPool: BigNumber = BigNumber.from("0");
    let currentP2UsersPool: BigNumber = BigNumber.from("0");
    let currentP2TotalStake: BigNumber = BigNumber.from("0");
  
    let currentP3ProviderPool: BigNumber = BigNumber.from("0");
    let currentP3UsersPool: BigNumber = BigNumber.from("0");
    let currentP3TotalStake: BigNumber = BigNumber.from("0");
  
    let currentP4ProviderPool: BigNumber = BigNumber.from("0");
    let currentP4UsersPool: BigNumber = BigNumber.from("0");
    let currentP4TotalStake: BigNumber = BigNumber.from("0");
  
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

    before(async function () {
        this.timeout(0);
        await loadFixture(fixture);
        consola.success('LODADED FIXTURE');
        const { deployer } = await getNamedAccounts();
        const signer = await ethers.getSigner(deployer);
    
        slaRegistry = <SLARegistry>await ethers.getContract(CONTRACT_NAMES.SLARegistry, signer);
        allSLAs = await slaRegistry.allSLAs();
        _sloRegistry = await slaRegistry.sloRegistry();
        periodRegistry = await ethers.getContractAt(
          CONTRACT_NAMES.PeriodRegistry,
          await slaRegistry.periodRegistry()
        );
    
        // get the contract INDEX 21, Contract for IT staking tests: Not Respected case reward capped
        sla = await ethers.getContractAt(CONTRACT_NAMES.SLA, allSLAs[22]);
        details = await ethers.getContract(CONTRACT_NAMES.Details);
        sla_owner = await sla.owner();
        [
          provider_1_account,
          provider_2_account,
          provider_3_account,
          user_1_account,
          user_2_account,
          user_3_account,
        ] = await ethers.getSigners();
    
        // Get dslaToken contract
        const dslaToken: ERC20PresetMinterPauser = await ethers.getContract(
          CONTRACT_NAMES.DSLA
        );
    
        // Approve allocation of amount to dslaToken address
        consola.info('Approve allocation of amount to dslaToken address');
        let amount = 400000;
        tx = await dslaToken.approve(sla.address, amount);
    
        consola.info('Stake DSLA tokens for providers');
        // add token to provider DSLA account
        await dslaToken.connect(provider_1_account).mint(provider_1_account.address, toWei(initialStakeBalanceProvider1));
        await dslaToken.connect(provider_2_account).mint(provider_2_account.address, toWei(initialStakeBalanceProvider2));
        await dslaToken.connect(provider_3_account).mint(provider_3_account.address, toWei(initialStakeBalanceProvider3));
        // Add token to provider accounts
        await dslaToken.connect(provider_1_account).approve(sla.address, toWei(initialStakeBalanceProvider1));
        await dslaToken.connect(provider_2_account).approve(sla.address, toWei(initialStakeBalanceProvider2));
        await dslaToken.connect(provider_3_account).approve(sla.address, toWei(initialStakeBalanceProvider3));
        // Stake token for providers
        enum Position { LONG, SHORT }
        tx = await sla.connect(provider_1_account).stakeTokens(toWei(initialStakeBalanceProvider1), dslaToken.address, Position.LONG);
        tx = await sla.connect(provider_2_account).stakeTokens(toWei(initialStakeBalanceProvider2), dslaToken.address, Position.LONG);
        tx = await sla.connect(provider_3_account).stakeTokens(toWei(initialStakeBalanceProvider3), dslaToken.address, Position.LONG);
    
        consola.info('Stake DSLA tokens for users');
        // add token to users DSLA accounts
        await dslaToken.connect(user_1_account).mint(user_1_account.address, toWei(initialStakeBalanceUser1));
        await dslaToken.connect(user_2_account).mint(user_2_account.address, toWei(initialStakeBalanceUser2));
        await dslaToken.connect(user_3_account).mint(user_3_account.address, toWei(initialStakeBalanceUser3));
        // Add token to users accounts
        await dslaToken.connect(user_1_account).approve(sla.address, toWei(initialStakeBalanceUser1));
        await dslaToken.connect(user_2_account).approve(sla.address, toWei(initialStakeBalanceUser2));
        await dslaToken.connect(user_3_account).approve(sla.address, toWei(initialStakeBalanceUser3));
    
        // Stake token for users
        tx = await sla.connect(user_1_account).stakeTokens(toWei(initialStakeBalanceUser1), dslaToken.address, Position.SHORT);
        tx = await sla.connect(user_2_account).stakeTokens(toWei(initialStakeBalanceUser2), dslaToken.address, Position.SHORT);
        tx = await sla.connect(user_3_account).stakeTokens(toWei(initialStakeBalanceUser3), dslaToken.address, Position.SHORT);
    
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

      describe("Initial P0", function () {
        describe("P0 tests execution", function () {
          it('StakersLength should be equal to initialNumberOfStakers', function () {
            expect(stakersLength).equals(initialNumberOfStakers);
          });
          it('Total Provider Pool should be equal to initialized value', function () {
            expect(toWei(initialProviderPool)).equals(currentProviderPool.toString());
          });
          it('Total User Pool should be equal to initialized value', function () {
            expect(toWei(initialUserPool)).equals(currentUsersPool.toString());
          });
          it('Total Liquidity Pool should be equal to initialized value', function () {
            expect(toWei(initialTotalStake)).equals(currentTotalStake.toString());
          });
        });
    });

  // P1 tests
  describe("P1", function () {
    describe("request SLI P1", function () {
      it('Shoud perform a succesful request SLI for P1', async () => {
        const ownerApproval = true;
        const dslaToken: ERC20PresetMinterPauser = await ethers.getContract(
          CONTRACT_NAMES.DSLA
        );

        const periodId_p1 = Number(0)

        const periodStartEnd = await periodRegistry.getPeriodStartAndEnd(
          PERIOD_TYPE.MONTHLY, periodId_p1
        );
        console.log("Period starts and ends", periodStartEnd.start.toNumber(), periodStartEnd.end.toNumber())
        await evm_increaseTime(periodStartEnd.end.toNumber());
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

        await new Promise((resolve) => sla.on('SLICreated', () => resolve(null)));
        const createdSLI = await sla.periodSLIs(periodId_p1); //nextVerifiablePeriod
        const { timestamp, sli, status } = createdSLI;
        slaDetailsP1 = await details.getSLADetailsArrays(sla.address)

        currentP1ProviderPool = slaDetailsP1.tokensStake[0].providersPool;
        currentP1UsersPool = slaDetailsP1.tokensStake[0].usersPool;
        currentP1TotalStake = slaDetailsP1.tokensStake[0].totalStake;

        slaStaticDetailsP1 = await details.getSLAStaticDetails(sla.address, _sloRegistry)
        const slaDTokensDetailsP1 = await details.getDTokensDetails(sla.address, sla_owner)

        const providerPoolRawChangeP1 = currentP1ProviderPool.sub(toWei(initialProviderPool))
        const userPoolRawChangeP1 = currentP1UsersPool.sub(initialUserPool)

        const providerPoolPctChangeP1 = currentP1ProviderPool.div(toWei(initialProviderPool)).mul(100)
        const userPoolPctChangeP1 = currentP1UsersPool.div(toWei(initialUserPool)).mul(100)
        // pourcentage = (montant partiel / montant total) x 100

        //const userPoolRawChangeP1 = //currentUsersPool currentProviderPool
        
        /*const providerPoolPctChangeP1 = 0
        const providerPoolPctChangeP1 = 0*/

        const slaContractSloValue = slaStaticDetailsP1.sloValue

        console.log("--------------------------------------------------------------")
        console.log('SLO: ', slaContractSloValue.toString())
        console.log('SLI: ', sli.toString())
        console.log('sla.address: ', sla.address);
        console.log('Created SLI timestamp: ', timestamp.toString());
        console.log('Created SLI sli: ', sli.toString());
        console.log('Created SLI status: ', PERIOD_STATUS[status]);
        console.log('SLI request process finished  for P1');
        console.log("dpTokens balance: ", slaDTokensDetailsP1.dpTokens[0].balance.toString())
        console.log("duTokens balance: ", slaDTokensDetailsP1.duTokens[0].balance.toString())

        console.log("dpTokens totalSupply: ", slaDTokensDetailsP1.dpTokens[0].totalSupply.toString())
        console.log("duTokens totalSupply: ", slaDTokensDetailsP1.duTokens[0].totalSupply.toString())

        console.log("Provider Pool balance: ", currentP1ProviderPool.toString())
        console.log("User Pool balance: ", currentP1UsersPool.toString())

        console.log("provider Pool PctChange P1: ", providerPoolPctChangeP1.toString())
        console.log("user Pool Pct Change P1: ", userPoolPctChangeP1.toString())
        console.log("--------------------------------------------------------------")

      });
    });

    describe("P1 tests execution", function () {
      it('Total Provider Pool should be equal to P1 expected value', function () {
        expect(currentP1ProviderPool.toString()).equals(toWei(P1ProviderPool.toString()));
      });
      it('Total User Pool should be equal to P1 expected value', function () {
        expect(currentP1UsersPool.toString()).equals(toWei(P1UserPool.toString()));
      });
      it('Total Liquidity Pool should be equal to P1 expected value', function () {
        expect(currentP1TotalStake.toString()).equals(toWei(P1TotalStake.toString()));
      });
    });

  });


  // P2 tests
  describe("P2", function () {
    describe("request SLI P2", function () {
      it('Shoud perform a succesful request SLI for P2', async () => {
        const ownerApproval = true;
        const dslaToken: ERC20PresetMinterPauser = await ethers.getContract(
          CONTRACT_NAMES.DSLA
        );
        const periodId_p2 = Number(1)
        const periodStartEnd = await periodRegistry.getPeriodStartAndEnd(
          PERIOD_TYPE.MONTHLY, periodId_p2
        );
        console.log("Period starts and ends", periodStartEnd.start.toNumber(), periodStartEnd.end.toNumber())
        await evm_increaseTime(periodStartEnd.end.toNumber());
        await expect(slaRegistry.requestSLI(
          periodId_p2,
          sla.address,
          ownerApproval,
          {
            ...(network.config.gas !== 'auto' && {
              gasLimit: network.config.gas,
            }),
          }
        ))
          .to.emit(slaRegistry, 'SLIRequested')

        await new Promise((resolve) => sla.on('SLICreated', () => resolve(null)));
        const createdSLI = await sla.periodSLIs(periodId_p2); //nextVerifiablePeriod
        const { timestamp, sli, status } = createdSLI;
        slaDetailsP2 = await details.getSLADetailsArrays(sla.address)

        currentP2ProviderPool = slaDetailsP2.tokensStake[0].providersPool;
        currentP2UsersPool = slaDetailsP2.tokensStake[0].usersPool;
        currentP2TotalStake = slaDetailsP2.tokensStake[0].totalStake;

        slaStaticDetailsP2 = await details.getSLAStaticDetails(sla.address, _sloRegistry)
        const slaDTokensDetailsP2 = await details.getDTokensDetails(sla.address, sla_owner)

        const slaContractSloValue = slaStaticDetailsP2.sloValue

        console.log("--------------------------------------------------------------")
        console.log('SLO: ', slaContractSloValue.toString())
        console.log('SLI: ', sli.toString())
        console.log('sla.address: ', sla.address);
        console.log('Created SLI timestamp: ', timestamp.toString());
        console.log('Created SLI sli: ', sli.toString());
        console.log('Created SLI status: ', PERIOD_STATUS[status]);
        console.log('SLI request process finished  for P2');
        console.log("dpTokens balance: ", slaDTokensDetailsP2.dpTokens[0].balance.toString())
        console.log("duTokens balance: ", slaDTokensDetailsP2.duTokens[0].balance.toString())
        console.log("dpTokens totalSupply: ", slaDTokensDetailsP2.dpTokens[0].totalSupply.toString())
        console.log("duTokens totalSupply: ", slaDTokensDetailsP2.duTokens[0].totalSupply.toString())
        console.log("Provider Pool balance: ", currentP2ProviderPool.toString())
        console.log("User Pool balance: ", currentP2UsersPool.toString())
        console.log("--------------------------------------------------------------")

      });
    });

    describe("P2 tests execution", function () {
      it('Total Provider Pool should be equal to P2 expected value', function () {
        expect(currentP2ProviderPool.toString()).equals(toWei(P2ProviderPool.toString()));
      });
      it('Total User Pool should be equal to P2 expected value', function () {
        expect(currentP2UsersPool.toString()).equals(toWei(P2UserPool.toString()));
      });
      it('Total Liquidity Pool should be equal to P2 expected value', function () {
        expect(currentP2TotalStake.toString()).equals(toWei(P2TotalStake.toString()));
      });
    });
  });



  // P3 tests
  describe("P3", function () {
    describe("request SLI P3", function () {
      it('Shoud perform a succesful request SLI for P3', async () => {
        const ownerApproval = true;
        const dslaToken: ERC20PresetMinterPauser = await ethers.getContract(
          CONTRACT_NAMES.DSLA
        );
        const periodId_p3 = Number(2)
        const periodStartEnd = await periodRegistry.getPeriodStartAndEnd(
          PERIOD_TYPE.MONTHLY, periodId_p3
        );
        console.log("Period starts and ends", periodStartEnd.start.toNumber(), periodStartEnd.end.toNumber())
        await evm_increaseTime(periodStartEnd.end.toNumber());
        await expect(slaRegistry.requestSLI(
          periodId_p3,
          sla.address,
          ownerApproval,
          {
            ...(network.config.gas !== 'auto' && {
              gasLimit: network.config.gas,
            }),
          }
        ))
          .to.emit(slaRegistry, 'SLIRequested')

        await new Promise((resolve) => sla.on('SLICreated', () => resolve(null)));
        const createdSLI = await sla.periodSLIs(periodId_p3); //nextVerifiablePeriod
        const { timestamp, sli, status } = createdSLI;
        slaDetailsP3 = await details.getSLADetailsArrays(sla.address)

        currentP3ProviderPool = slaDetailsP3.tokensStake[0].providersPool;
        currentP3UsersPool = slaDetailsP3.tokensStake[0].usersPool;
        currentP3TotalStake = slaDetailsP3.tokensStake[0].totalStake;

        slaStaticDetailsP3 = await details.getSLAStaticDetails(sla.address, _sloRegistry)
        const slaDTokensDetailsP3 = await details.getDTokensDetails(sla.address, sla_owner)

        const slaContractSloValue = slaStaticDetailsP3.sloValue

        console.log("--------------------------------------------------------------")
        console.log('SLO: ', slaContractSloValue.toString())
        console.log('SLI: ', sli.toString())
        console.log('sla.address: ', sla.address);
        console.log('Created SLI timestamp: ', timestamp.toString());
        console.log('Created SLI sli: ', sli.toString());
        console.log('Created SLI status: ', PERIOD_STATUS[status]);
        console.log('SLI request process finished  for P3');
        console.log("dpTokens balance: ", slaDTokensDetailsP3.dpTokens[0].balance.toString())
        console.log("duTokens balance: ", slaDTokensDetailsP3.duTokens[0].balance.toString())
        console.log("dpTokens totalSupply: ", slaDTokensDetailsP3.dpTokens[0].totalSupply.toString())
        console.log("duTokens totalSupply: ", slaDTokensDetailsP3.duTokens[0].totalSupply.toString())
        console.log("Provider Pool balance: ", currentP3ProviderPool.toString())
        console.log("User Pool balance: ", currentP3UsersPool.toString())
        console.log("--------------------------------------------------------------")

      });
    });

    describe("P3 tests execution", function () {
      it('Total Provider Pool should be equal to P3 expected value', function () {
        expect(currentP3ProviderPool.toString()).equals(toWei(P3ProviderPool.toString()));
      });
      it('Total User Pool should be equal to P3 expected value', function () {
        expect(currentP3UsersPool.toString()).equals(toWei(P3UserPool.toString()));
      });
      it('Total Liquidity Pool should be equal to P3 expected value', function () {
        expect(currentP3TotalStake.toString()).equals(toWei(P3TotalStake.toString()));
      });
    });
  });


});