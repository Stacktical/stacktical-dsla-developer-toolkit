import { expect } from "chai";
import { ethers } from "hardhat";
import { OpenAIStatusPageOracle } from "../typechain/OpenAIStatusPageOracle";
import { OpenAIStatusPageOracle__factory } from "../typechain/factories/OpenAIStatusPageOracle__factory";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("StatusPage", function () {
  let openAIStatusPageOracle: OpenAIStatusPageOracle;
  let user: SignerWithAddress;

  beforeEach(async () => {
    [user] = await ethers.getSigners();

    const oracleAddress = "0x..."; // Replace with the address of your Chainlink Oracle
    const chainlinkTokenAddress = "0x..."; // Replace with the address of your Chainlink Token
    const jobId = ethers.utils.formatBytes32String("..."); // Replace with your Chainlink Job ID
    const feeMultiplier = 1;
    const periodRegistryAddress = "0x..."; // Replace with the address of your PeriodRegistry contract
    const stakeRegistryAddress = "0x..."; // Replace with the address of your StakeRegistry contract
    const networkName = ethers.utils.formatBytes32String("...");

    const lpName = "LP Name";
    const lpSymbol = "LP Symbol";
    const spName = "SP Name";
    const spSymbol = "SP Symbol";

    const openAIStatusPageOracleFactory = (await ethers.getContractFactory(
      "OpenAIStatusPageOracle"
    )) as OpenAIStatusPageOracle__factory;

    openAIStatusPageOracle = await openAIStatusPageOracleFactory.deploy(
      oracleAddress,
      chainlinkTokenAddress,
      feeMultiplier,
      periodRegistryAddress,
      stakeRegistryAddress,
      networkName,
      lpName,
      lpSymbol,
      spName,
      spSymbol
    );

    await openAIStatusPageOracle.deployed();
  });

  it("should request SLI", async () => {
    // Replace with appropriate parameters to requestSLI() function
    const periodId = 1;
    const slaAddress = "0x...";
    const messengerOwnerApproval = true;
    const callerAddress = user.address;

    await openAIStatusPageOracle
      .connect(user)
      .requestSLI(periodId, slaAddress, messengerOwnerApproval, callerAddress);

    // Add any necessary assertions here
  });
});
