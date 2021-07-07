---
description: >-
  Set the correct configuration for your contracts across multiple different
  networks.
---

# Bootstrap config

### BootstrapConfiguration

{% code title="types.ts" %}
```typescript
export type BootstrapConfiguration = {
  allowance: Array<TokenAllowance>;
  registry: {
    periods: Array<PeriodBootstrapDefinition>;
    messengers: Array<MessengerDefinition>;
    stake: StakeBootstrapDefinition;
  };
  messengers: {
    networkAnalytics: {
      allowedNetworks: Array<string>;
    };
  };
};

```
{% endcode %}

* `allowance`: array of [TokenAllowance](bootstrap.md#tokenallowance).
* `registry`: here we define the registries initialization parameters, namely MessengerRegistry, StakeRegistry and PeriodRegistry:
  * `periods`:array of[ PeriodBootstrapDefinition](bootstrap.md#periodbootstrapdefinition).
  * `messengers`:array of [MessengerDefinition](bootstrap.md#messengerdefinition).
  * `stake`: [StakeBootstrapDefinition](bootstrap.md#stakebootstrapdefinition).
* `messengers`: customization of the messengers. In our case, we use this to initialize the NetworkAnalytics contract with the allowed network names.

### TokenAllowance

Information to set the necessary allowance of the contracts.

{% code title="types.ts" %}
```typescript
export type TokenAllowance = {
  contract: CONTRACT_NAMES;
  token: CONTRACT_NAMES;
  allowance: string;
};
```
{% endcode %}

* `contract`: contract name of the spender contract. It is defined in `constants.ts` and it should match the name of contract file. 
* `token`: token to approve to `contract`.
* `allowance`: amount \(in Eth\) of the allowance to `contract`.

### PeriodBootstrapDefinition

Config to determine the initialized periods, and how many of them are going to be.

{% code title="types.ts" %}
```typescript
export type PeriodBootstrapDefinition = {
  periodType: PERIOD_TYPE;
  amountOfPeriods: number;
  expiredPeriods: number;
};
```
{% endcode %}

* : period type in numbers. Ideally parsed from the PERIOD\_TYPE constant.
* `amount`: amounts of period to initialize.
* `expiredPeriods`: amounts of expired periods. This number indicates how many "past PERIOD\_TYPE" would be passed to the PeriodRegistry.

### MessengerDefinition

Config to register messenger contracts into the MessengerRegistry through the SLARegistry.

{% code title="types.ts" %}
```typescript
export type MessengerDefinition = {
  contract: CONTRACT_NAMES;
  specificationPath: string;
};
```
{% endcode %}

* `contract`: name of the contract that represents a Messenger. The address would be parsed from this name.
* `specificationPath`: path to the messenger specification JSON.

### StakeBootstrapDefinition

Config to add allowed tokens to the platform and to modify the staking parameters.

{% code title="types.ts" %}
```typescript
export type StakeBootstrapDefinition = {
  allowedTokens: Array<CONTRACT_NAMES>;
  stakingParameters: {
    dslaDepositByPeriod?: string;
    dslaPlatformReward?: string;
    dslaMessengerReward?: string;
    dslaUserReward?: string;
    dslaBurnedByVerification?: string;
    maxTokenLength?: string;
    maxLeverage?: string;
  };
};
```
{% endcode %}

* `allowedTokens`: name of the contracts to be marked as allowed by the StakeRegistry.
* `stakingParameters`: 
  * `dslaDepositByPeriod`: amount of the necessary deposit by every period when deploying a SLA. This amount is `transferFrom`from the SLA contract deployer and locked on the StakeRegistry contract.
  * `dslaPlatformReward`: amount delivered to the Core developer team.
  * `dslaMessengerReward`: amount delivered to the creator of the messenger called.
  * `dslaUserReward`: amount delivered to the caller of the contracts verification.
  * `dslaBurnedByVerification`: amount of DSLA burned by every contract verification.
  * `maxTokenLength`: max amount of tokens allowed to the new SLAs to add as allowed contract.
  * `maxLeverage`: max leverage of the SLA contracts.

