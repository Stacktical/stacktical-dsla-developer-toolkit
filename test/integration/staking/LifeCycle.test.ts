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

enum POSITION {
    OK,
    KO,
}

describe('DSLA Protocol Staking - LifeCycle', () => {
  const { get } = deployments;
  let allSLAs: string[];
  let tx;

  let slaRegistry: SLARegistry;
  let _sloRegistry;
  let periodRegistry: PeriodRegistry;

  let sla: SLA;
  let sla_wl: SLA;
  let details;
  let unnamedAccounts;

  let default_signer_account: SignerWithAddress;
  let provider_1_account: SignerWithAddress;
  let provider_2_account: SignerWithAddress;
  let provider_3_account: SignerWithAddress;
  let user_1_account: SignerWithAddress;
  let user_2_account: SignerWithAddress;
  let user_3_account: SignerWithAddress;
  let user_4_account: SignerWithAddress;
  let provider_4_account: SignerWithAddress;
  let user_5_account: SignerWithAddress;
  let provider_5_account: SignerWithAddress;

  // Stacking constants INITIAL
  // PROVIDERS BALANCE
  let initialStakeBalanceProvider1 = "2500";
  let initialStakeBalanceProvider2 = "333000";
  let initialStakeBalanceProvider3 = "50000";

  // USERS BALANCE
  let initialStakeBalanceUser1 = "30000";


  let currentProviderPool: BigNumber = BigNumber.from("0");
  let currentUsersPool: BigNumber = BigNumber.from("0");
  let currentTotalStake: BigNumber = BigNumber.from("0");

  let stakersLength: any;
  let slaDetailsP0: any;

  before(async function () {
    this.timeout(0);
    await loadFixture(fixture);
    consola.success('LODADED FIXTURE');
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.getSigner(deployer);

    unnamedAccounts = await getUnnamedAccounts();

    slaRegistry = <SLARegistry>await ethers.getContract(CONTRACT_NAMES.SLARegistry, signer);
    allSLAs = await slaRegistry.allSLAs();
    _sloRegistry = await slaRegistry.sloRegistry();
    periodRegistry = await ethers.getContractAt(
      CONTRACT_NAMES.PeriodRegistry,
      await slaRegistry.periodRegistry()
    );

    const awlSlaAddress = (await slaRegistry.allSLAs()).slice(-1)[0];

    // get the contract INDEX 18, Contract for IT staking tests: Not Respected case reward capped
    sla = await ethers.getContractAt(CONTRACT_NAMES.SLA, allSLAs[1]);
    sla_wl = await ethers.getContractAt(CONTRACT_NAMES.SLA, allSLAs[4]);
    details = await ethers.getContract(CONTRACT_NAMES.Details);
    [
      default_signer_account,
      provider_1_account,
      provider_2_account,
      provider_3_account,
      user_1_account,
      user_2_account,
      user_3_account,
      user_4_account,
      provider_4_account,
      user_5_account,
      provider_5_account,
    ] = await ethers.getSigners();

    // Get dslaToken contract
    const dslaToken: ERC20PresetMinterPauser = await ethers.getContract(
      CONTRACT_NAMES.DSLA
    );

    // Approve allocation of amount to dslaToken address
    consola.info('Approve allocation of amount to dslaToken address');
    let amount = 565500;
    //tx = await dslaToken.approve(sla.address, amount);

    consola.info('Stake DSLA tokens for providers');
    consola.info('initialStakeBalanceProvider1: ', initialStakeBalanceProvider1);

    let user_4_account_bal_0 = await dslaToken.balanceOf(user_4_account.address)

    console.log('user_4_account adress: ', user_4_account.address)
    console.log('signer adress: ', signer.address)
    console.log('deployer adress: ', deployer)
    console.log("---------------------PROVIDER BAL BEFORE MINT------------------------------")
    console.log('user_4_account_bal: ', user_4_account_bal_0.toString())
    console.log("--------------------------------------------------------------")




    /*
    // Try to withdraw coins
    
    // Add user to WL
    await sla.addUsersToWhitelist([provider_4_account.address])
    // Staking
    await expect(sla.stakeTokens(stakeAmount, dslaToken.address, POSITION.OK))
    // Remove user to WL
    await sla.removeUsersFromWhitelist([user_4_account.address])
    // Try to withdraw coins

    let user_4_account_bal_2 = await dslaToken.balanceOf(user_4_account.address)

    console.log("---------------------PROVIDER BAL AFTER STAKE------------------------------")
    console.log('user_4_account_bal_2: ', user_4_account_bal_2.toString())
    console.log("--------------------------------------------------------------")*/


  });

  describe("Test cases", function () {
    it('Shoud perform a succesful staking with whitelist activated', async () => {

        const dslaToken: ERC20PresetMinterPauser = await ethers.getContract(
            CONTRACT_NAMES.DSLA
        );

        // WL
        let stakeAmount = 1012
        let stakeAmountStr = "1012"

        // add token to provider DSLA account
        await dslaToken.connect(user_4_account).mint(user_4_account.address, toWei(stakeAmountStr));
        // Add token to provider accounts
        
        let user_4_account_bal = await dslaToken.balanceOf(user_4_account.address)
        console.log("---------------------PROVIDER BAL AFTER MINT------------------------------")
        console.log('user_4_account_bal: ', user_4_account_bal.toString())
        console.log("--------------------------------------------------------------")

        await dslaToken.connect(user_4_account).approve(sla.address, toWei(stakeAmountStr));
        //tx = await dslaToken.connect(user_4_account).approve(sla.address, toWei(stakeAmountStr));
        // Add user to WL
        await sla.addUsersToWhitelist([user_4_account.address])
        // Staking
        tx = await sla.connect(user_4_account).stakeTokens(toWei(stakeAmountStr), dslaToken.address, POSITION.OK);
        await tx.wait();

        let user_4_account_bal_1 = await dslaToken.balanceOf(user_4_account.address)
        console.log("---------------------PROVIDER BAL AFTER STAKE------------------------------")
        console.log('user_4_account_bal_1: ', user_4_account_bal_1.toString())
        console.log("--------------------------------------------------------------")
    });

    it('Shoud perform a reject staking whitelist activated', async () => {

        const dslaToken: ERC20PresetMinterPauser = await ethers.getContract(
            CONTRACT_NAMES.DSLA
        );

        // WL
        let stakeAmount = 1012
        let stakeAmountStr = "1012"

        // add token to provider DSLA account
        await dslaToken.connect(user_4_account).mint(user_4_account.address, toWei(stakeAmountStr));
        // Add token to provider accounts
        
        let user_4_account_bal = await dslaToken.balanceOf(user_4_account.address)
        console.log("---------------------PROVIDER BAL AFTER MINT------------------------------")
        console.log('user_4_account_bal: ', user_4_account_bal.toString())
        console.log("--------------------------------------------------------------")

        await dslaToken.connect(user_4_account).approve(sla_wl.address, toWei(stakeAmountStr));
        //tx = await dslaToken.connect(user_4_account).approve(sla.address, toWei(stakeAmountStr));

        // Add remove to WL
        tx = await sla_wl.removeUsersFromWhitelist([user_4_account.address])
        await tx.wait();
        // Staking
        //tx = await sla_wl.connect(user_4_account).stakeTokens(toWei(stakeAmountStr), dslaToken.address, POSITION.OK);
        //await tx.wait();

        await expect(sla_wl.connect(user_4_account).stakeTokens(toWei(stakeAmountStr), dslaToken.address, POSITION.OK))
      .to.be.revertedWith('revert not whitelisted')

        let user_4_account_bal_1 = await dslaToken.balanceOf(user_4_account.address)
        console.log("---------------------PROVIDER BAL AFTER STAKE------------------------------")
        console.log('user_4_account_bal_1: ', user_4_account_bal_1.toString())
        console.log("--------------------------------------------------------------")
    });

    it('Should perform withdraw from owner account', async () => {
        // stake
        const dslaToken: ERC20PresetMinterPauser = await ethers.getContract(
            CONTRACT_NAMES.DSLA
        );

        // WL
        let stakeAmount = 1012
        let stakeAmountStr = "1012"

        await dslaToken.approve(sla.address, toWei(stakeAmountStr));

        // add token to provider DSLA account
        await dslaToken.connect(user_4_account).mint(user_4_account.address, toWei(stakeAmountStr));
        // Add token to provider accounts
        
        let user_4_account_bal = await dslaToken.balanceOf(user_4_account.address)
        console.log("---------------------USER BAL AFTER MINT------------------------------")
        console.log('user_4_account_bal: ', user_4_account_bal.toString())
        console.log("--------------------------------------------------------------")

        await dslaToken.connect(user_4_account).approve(sla.address, toWei(stakeAmountStr));
        //tx = await dslaToken.connect(user_4_account).approve(sla.address, toWei(stakeAmountStr));

        // Add user to WL
        await sla.addUsersToWhitelist([user_4_account.address])
        // Staking
        tx = await sla.connect(user_4_account).stakeTokens(toWei(stakeAmountStr), dslaToken.address, POSITION.OK);
        await tx.wait();

        let user_4_account_bal_s = await dslaToken.balanceOf(user_4_account.address)
        console.log("---------------------USER BAL AFTER STAKE------------------------------")
        console.log('user_4_account_bal_s: ', user_4_account_bal_s.toString())
        console.log("--------------------------------------------------------------")

        // Withdraw (tranfert from)
        /*
        tx = await dslaToken.connect(user_4_account).transfer(user_4_account.address, toWei(stakeAmountStr));
        await tx.wait();*/
        //tx = await sla.connect(user_4_account)
        
        let nextVerifiablePeriod = await sla.nextVerifiablePeriod();

        console.log('nextVerifiablePeriod: ', nextVerifiablePeriod.toString())

        /*tx = await slaRegistry.requestSLI(Number(nextVerifiablePeriod), sla.address, true);
        await tx.wait();*/

        await expect(slaRegistry.requestSLI(
			Number(nextVerifiablePeriod),
			sla.address,
			false
		)).to.emit(slaRegistry, "SLIRequested");

        await new Promise((resolve) => sla.on('SLICreated', () => resolve(null)));
        console.log('first request SLI Done')

        let nextVerifiablePeriod2 = await sla.nextVerifiablePeriod();
        console.log('nextVerifiablePeriod2: ', nextVerifiablePeriod2.toString())

        await expect(slaRegistry.requestSLI(
			Number(nextVerifiablePeriod2),
			sla.address,
			false
		)).to.emit(slaRegistry, "SLIRequested");

        await new Promise((resolve) => sla.on('SLICreated', () => resolve(null)));
        console.log('second request SLI Done')

        tx = await sla.connect(user_4_account).withdrawUserTokens(toWei(stakeAmountStr), dslaToken.address)
        await tx.wait();

        let user_4_account_bal_w = await dslaToken.balanceOf(user_4_account.address)
        console.log("---------------------USER BAL AFTER WITHDRAW------------------------------")
        console.log('user_4_account_bal_w: ', user_4_account_bal_w.toString())
        console.log("--------------------------------------------------------------")

    });

    /*it('Should reject withdraw from not owner account', async () => {
        const dslaToken: ERC20PresetMinterPauser = await ethers.getContract(
            CONTRACT_NAMES.DSLA
        );

        // stake
        // withdrawUserTokens
    });

    it('Should reject withdraw of too high amount', async () => {
        const dslaToken: ERC20PresetMinterPauser = await ethers.getContract(
            CONTRACT_NAMES.DSLA
        );
    });

    it('Should perform withdraw of all available amount', async () => {
        const dslaToken: ERC20PresetMinterPauser = await ethers.getContract(
            CONTRACT_NAMES.DSLA
        );
    });

    it('Should perform allow re staking after withdraw', async () => {
        const dslaToken: ERC20PresetMinterPauser = await ethers.getContract(
            CONTRACT_NAMES.DSLA
        );
    });*/

    // try to withdraw all amount before next verification with small amount unlocked normally

    // -> ISSUE 
    // If after a verification period, you decide to stake a small amount more, all you found will be locked
    // regardless of part that was available for withdraw


  });

});