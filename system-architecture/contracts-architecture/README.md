---
description: An overview of the contracts duties.
---

# Contracts

![](../../.gitbook/assets/contract-interaction.jpeg)

### **SLARegistry**

This is the master contract. It creates the SLAs and executes important actions for the DSLA protocol to manage most of the funds of the platform.

* Creates SLAs: The SLARegistry is a factory of SLAs contracts. It checks multiple conditions before deploying an SLA e.g: The starting and final period of an SLA contract are valid by asking the PeriodRegistry.
* Registers messengers: ****for security reasons, the SLARegistry is the only contract allowed to call the Messenger requestSLI function. This is why it is the only contract allowed to register messengers, to set the SLARegistry address in the Messengers after they are deployed and the deployer wants to register them.
* Request SLIs to Messengers: as the SLA verification process results in a distribution of rewards, the access to this function requires some privileges. This is why the Messenger's requestSLI function is called from the SLARegistry.
* Return locked $DSLA: once a SLA is created, the SLARegistry requires that the transaction sender locks some $DSLA for the verification rewards. If the SLA contract is breached, the locked tokens not used for this verification rewards should be returned to the SLA contract owner. This action requires some verifications, which are executed in the SLARegistry contract.

### **StakeRegistry**

This contract job is to maintain a list of allowed tokens. If a SLA wants to add a token to one pool, this token needs to be allowed on the StakeRegistry:

* Manages the DSLA locked after SLA creation: in order to create a SLA contract, is necessary to lock an amount of DSLA tokens proportional to the amount of periods that the SLA lasts. Currently, this value is 1000 DSLA by period.
* Manages the list of allowed tokens:  If a SLA owner wants to create a new token pool, the token needs to be allowed in the StakeRegistry first. Currently this list is managed by the Stacktical team, but we plan to manage it by governance in the near future.
* Deploy dTokens: dTokens, a.k.a. Long Position \(LP\) and Short Position \(SP\) tokens, are _ERC20PresetMinterPauser_ tokens used to track pools shares. Think of them like Uniswap's liquidity provider tokens. Users can freely trade them and sell their positions inside any SLA. Redeeming the underlying position requires different rules depending if is a LP or SP token. 
* Distributes the verification rewards: once a SLA is created, the contract creator locks some DSLA tokens. This tokens are used to incentivize some interactions inside the platform, and to burn an amount of DSLA. Every time this needs to happen, the StakeRegistry contract is called and it checks if rules are properly respected.

