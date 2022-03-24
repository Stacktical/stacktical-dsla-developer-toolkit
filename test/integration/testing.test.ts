import { expect } from 'chai';
import { loadFixture } from 'ethereum-waffle';
import { fixture } from '../fixtures/basic';
const hre = require('hardhat');
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


describe('Fixtures', () => {
  const { network, deployments, ethers, getNamedAccounts } = hre;
  const { get } = deployments;
  let allSLAs: string[];
  let tx;

  let slaRegistry;
  let _sloRegistry;

  let sla;
  let details;
  let signersAccounts;
  let usersAccounts;
  let notDeployer;

  let provider_1_account;
  let provider_2_account;
  let provider_3_account;
  let user_1_account;
  let user_2_account;
  let user_3_account;


  // Stacking constants
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

  before(async function () {
    this.timeout(0);
    await loadFixture(fixture);
    consola.success('LODADED FIXTURE');
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.getSigner(deployer);

    slaRegistry = await SLARegistry__factory.connect(
      (
        await get(CONTRACT_NAMES.SLARegistry)
      ).address,
      signer
    );
    allSLAs = await slaRegistry.allSLAs();
    _sloRegistry = await slaRegistry.sloRegistry();


    console.log("test phase -2");
    //console.log('DSLA Protocol Staking Simulation - v1.5 initial test')
    sla = await ethers.getContractAt(CONTRACT_NAMES.SLA, allSLAs[0]);
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
  });

  describe("DSLA Protocol Staking Simulation - v1.5", function () {
    // Initial tests
    it('Initial', async () => {

      let slaDetails = await details.getSLADetailsArrays(sla.address);
      let slaDynamicDetails = await details.getSLADynamicDetails(sla.address);
      console.log("slaDetails INIT");
      console.log(slaDetails);
      console.log("slaDynamicDetails INIT");
      console.log(slaDynamicDetails);

      let stakersLength = await sla.getStakersLength();
      console.log("stakersLength : " + stakersLength);
      let stakersLengthFromDd = slaDynamicDetails.stakersCount.toString();
      console.log("stakersLengthFromDd : " + stakersLengthFromDd);
      
      // GETTING MESSENGER
      const messengerAddress = await sla.messengerAddress();
      const messengerContract: SEAMessenger = await ethers.getContractAt(CONTRACT_NAMES.SEAMessenger, messengerAddress);
      
      // REQUEST SLI
      const slaRegistry = await SLARegistry__factory.connect(
        (
          await get(CONTRACT_NAMES.SLARegistry)
        ).address,
        user_1_account
      );

      let slaDetailsP0 = await details.getSLADetailsArrays(sla.address);
      console.log("slaDetails P0 (init)");
      console.log(slaDetailsP0);
      
      let currentProviderPool = slaDetailsP0.tokensStake[0].providerPool;
      let currentUsersPool = slaDetailsP0.tokensStake[0].usersPool;
      let currentTotalStake = slaDetailsP0.tokensStake[0].totalStake;

      consola.info("currentProviderPool: " + currentProviderPool.toString());
      consola.info("currentUsersPool: " + currentUsersPool.toString());
      consola.info("currentTotalStake: " + currentTotalStake.toString());

      // StakersLength should be equal to initialNumberOfStakers
      expect(stakersLength).equals(initialNumberOfStakers);
      // Total Provider Pool should be equal to initialized value
      expect(initialProviderPool.toString()).equals(currentProviderPool.toString());
      // Total User Pool should be equal to initialized value
      expect(initialUserPool.toString()).equals(currentUsersPool.toString());
      // Total Liquidity Pool should be equal to initialized value
      expect(initialTotalStake.toString()).equals(currentTotalStake.toString());

      // CHECK PROVIDERS BALANCE
      // Note: Thoses values are extrapolated from ProviderPool as it is not yet possible to get stake size by provider
      let currentBalPrv1 = currentProviderPool.sub(initialStakeBalanceProvider2).sub(initialStakeBalanceProvider3);
      let currentBalPrv2 = currentProviderPool.sub(initialStakeBalanceProvider1).sub(initialStakeBalanceProvider3);
      let currentBalPrv3 = currentProviderPool.sub(initialStakeBalanceProvider1).sub(initialStakeBalanceProvider2);

      // Povider_1 Balance should be equal to initialized value
      expect(initialStakeBalanceProvider1.toString()).equals(currentBalPrv1.toString());
      // Povider_2 Balance should be equal to initialized value
      expect(initialStakeBalanceProvider2.toString()).equals(currentBalPrv2.toString());
      // Povider_3 Balance should be equal to initialized value
      expect(initialStakeBalanceProvider3.toString()).equals(currentBalPrv3.toString());

      // CHECK USERS BALANCE
      // Note: Thoses values are extrapolated from UsersPool as it is not yet possible to get stake size by user
      let currentBalUser1 = currentUsersPool.sub(initialStakeBalanceUser2).sub(initialStakeBalanceUser3);
      let currentBalUser2 = currentUsersPool.sub(initialStakeBalanceUser1).sub(initialStakeBalanceUser3);
      let currentBalUser3 = currentUsersPool.sub(initialStakeBalanceUser1).sub(initialStakeBalanceUser2);

      // User_1 Balance should be equal to initialized value
      expect(initialStakeBalanceUser1.toString()).equals(currentBalUser1.toString());
      // User_2 Balance should be equal to initialized value
      expect(initialStakeBalanceUser2.toString()).equals(currentBalUser2.toString());
      // User_3 Balance should be equal to initialized value
      expect(initialStakeBalanceUser3.toString()).equals(currentBalUser3.toString());

    });

    // P1 tests
    it('P1', async () => {
      console.log('-----------------------------------------------------------');
      console.log('Requesting SLI for P1...');
      const ownerApproval = true;

      // Get dslaToken contract TODO: Do that one time only, at setup 
      const dslaToken: ERC20PresetMinterPauser = await ethers.getContract(
        CONTRACT_NAMES.DSLA
      );

      const periodId_p1 = Number(0)
      const usersStake = 10
      const leverage = 1
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

      /*await expect(slaRegistry.requestSLI(
        periodId_p1,
        sla.address,
        ownerApproval,
        {
          ...(network.config.gas !== 'auto' && {
            gasLimit: network.config.gas,
          }),
        }
      ))
      .to.emit(slaRegistry, 'SLIRequested')*/

      /*.withArgs(
        periodId_p1,
        sla.address,
        ownerApproval,
        msg.sender // Who is sender here?
      );


      /*.to.emit(sla, 'UserCompensationGenerated')
      .withArgs(
        periodId_p1,
        dslaToken.address,
        usersStake,
        leverage,
        expectedCompensation
      );*/


      const nextVerifiablePeriod = await sla.nextVerifiablePeriod();
      console.log('requestSLI P1 done Transaction receipt: ');
      console.log(tx);
      await tx.wait();
      await new Promise((resolve) => sla.on('SLICreated', () => resolve(null)));
      const createdSLI = await sla.periodSLIs(nextVerifiablePeriod);
      const { timestamp, sli, status } = createdSLI;
      console.log('Created SLI timestamp: ', timestamp.toString());
      console.log('Created SLI sli: ', sli.toString());
      console.log('Created SLI status: ', PERIOD_STATUS[status]);
      console.log('SLI request process finished');

      console.log("createdSLI")
      consola.info(createdSLI)
      console.log("timestamp")
      consola.info(timestamp)
      console.log("sli")
      consola.info(sli)
      console.log("status : " + status.toString())

      //let SLIRequestId = await messengerContract.requests(0) //requests.slice(-1)[0]
      //console.log("SLIRequestId")
      //consola.info(SLIRequestId)

      let slaDetailsP1 = await details.getSLADetailsArrays(sla.address)
      console.log("slaDetails P1")
      console.log(slaDetailsP1)

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

      // TODO
      // validate userPool result
      // must get sli deviation to compute rewardPercentage

      // TODO retrieve thoses values from contract details
      let sliDeviation = 25
      let normalizedPeriodNumber = periodId_p1 + 1
      let numberOfPeriods = 5

      /*
      let deviation = _sloRegistry.getDeviation(
          sli,
          sla.address,
          precision
      );
      //let rewardPercentage = deviation.mul()
      */

      let expectedUserRewards = (providerPool * sliDeviation) * normalizedPeriodNumber / (numberOfPeriods * leverage)

      console.log('sliDeviation: ' + sliDeviation)
      console.log('expectedUserRewards: ' + expectedUserRewards)

      // Must get reward by user . _setUsersCompensation? _setRespectedPeriodReward?
      // User pool reward should be equal to expected pool reward

      // RegisterSLI should emit UserCompensationGenerated with good params (_periodId, tokenAddress, _rewardPercentage, _precision, reward)
      // RegisterSLI should emit ProviderRewardGenerated with good params (//) This Scenario is not yet tested

      // Povider_1 Reward should be equal to expected Reward after P1
      // Povider_2 Reward should be equal to expected Reward after P1
      // Povider_3 Reward should be equal to expected Reward after P1

      // User_1 Reward should be equal to expected Reward after P1
      // User_2 Reward should be equal to expected Reward after P1
      // User_3 Reward should be equal to expected Reward after P1

    })

  });
});
