const SLAABI = [
  {
    inputs: [
      { internalType: 'address', name: '_owner', type: 'address' },
      { internalType: 'bool', name: '_whitelisted', type: 'bool' },
      {
        internalType: 'enum PeriodRegistry.PeriodType',
        name: '_periodType',
        type: 'uint8',
      },
      { internalType: 'address', name: '_messengerAddress', type: 'address' },
      { internalType: 'uint128', name: '_initialPeriodId', type: 'uint128' },
      { internalType: 'uint128', name: '_finalPeriodId', type: 'uint128' },
      { internalType: 'uint128', name: '_slaID', type: 'uint128' },
      { internalType: 'string', name: '_ipfsHash', type: 'string' },
      { internalType: 'bytes32[]', name: '_extraData', type: 'bytes32[]' },
      { internalType: 'uint64', name: '_leverage', type: 'uint64' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'dpTokenAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'dpTokenName',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'dpTokenSymbol',
        type: 'string',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'duTokenAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'duTokenName',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'duTokenSymbol',
        type: 'string',
      },
    ],
    name: 'DTokensCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'periodId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rewardPercentage',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rewardPercentagePrecision',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rewardAmount',
        type: 'uint256',
      },
    ],
    name: 'ProviderRewardGenerated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'periodId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'ProviderWithdraw',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
      { indexed: false, internalType: 'uint256', name: 'sli', type: 'uint256' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'periodId',
        type: 'uint256',
      },
    ],
    name: 'SLICreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'periodId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Stake',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'periodId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'usersStake',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'leverage',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'compensation',
        type: 'uint256',
      },
    ],
    name: 'UserCompensationGenerated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'periodId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'UserWithdraw',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DSLAburnRate',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_tokenAddress', type: 'address' },
    ],
    name: 'addAllowedTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address[]', name: '_userAddresses', type: 'address[]' },
    ],
    name: 'addUsersToWhitelist',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'allowedTokens',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'creationBlockNumber',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'dpTokenRegistry',
    outputs: [
      {
        internalType: 'contract ERC20PresetMinterPauser',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'dslaTokenAddress',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'duTokenRegistry',
    outputs: [
      {
        internalType: 'contract ERC20PresetMinterPauser',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'extraData',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'finalPeriodId',
    outputs: [{ internalType: 'uint128', name: '', type: 'uint128' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllowedTokensLength',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_staker', type: 'address' },
      { internalType: 'uint256', name: '_allowedTokenIndex', type: 'uint256' },
    ],
    name: 'getTokenStake',
    outputs: [
      { internalType: 'address', name: 'tokenAddress', type: 'address' },
      { internalType: 'uint256', name: 'stake', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'initialPeriodId',
    outputs: [{ internalType: 'uint128', name: '', type: 'uint128' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ipfsHash',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_tokenAddress', type: 'address' },
    ],
    name: 'isAllowedToken',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'leverage',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'messengerAddress',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nextVerifiablePeriod',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'periodSLIs',
    outputs: [
      { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
      { internalType: 'uint256', name: 'sli', type: 'uint256' },
      { internalType: 'enum SLA.Status', name: 'status', type: 'uint8' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'periodType',
    outputs: [
      {
        internalType: 'enum PeriodRegistry.PeriodType',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'providerPool',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'registeredStakers',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address[]', name: '_userAddresses', type: 'address[]' },
    ],
    name: 'removeUsersFromWhitelist',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'slaID',
    outputs: [{ internalType: 'uint128', name: '', type: 'uint128' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'slaRegistry',
    outputs: [
      { internalType: 'contract SLARegistry', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'stakers',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'usersPool',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'whitelist',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'whitelistedContract',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_sli', type: 'uint256' },
      { internalType: 'uint256', name: '_periodId', type: 'uint256' },
    ],
    name: 'registerSLI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_periodId', type: 'uint256' }],
    name: 'isAllowedPeriod',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'contractFinished',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'address', name: '_token', type: 'address' },
    ],
    name: 'stakeTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'address', name: '_tokenAddress', type: 'address' },
    ],
    name: 'withdrawProviderTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'address', name: '_tokenAddress', type: 'address' },
    ],
    name: 'withdrawUserTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getStakersLength',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'breachedContract',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
];

const MessengerABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_messengerChainlinkOracle',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_messengerChainlinkToken',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: '_messengerJobId',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '_feeMultiplier',
        type: 'uint256',
      },
      {
        internalType: 'contract PeriodRegistry',
        name: '_periodRegistry',
        type: 'address',
      },
      {
        internalType: 'contract StakeRegistry',
        name: '_stakeRegistry',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
    ],
    name: 'ChainlinkCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
    ],
    name: 'ChainlinkFulfilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
    ],
    name: 'ChainlinkRequested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'jobId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256',
      },
    ],
    name: 'JobIdModified',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'slaAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'periodId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'requestId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'chainlinkResponse',
        type: 'bytes32',
      },
    ],
    name: 'SLIReceived',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'requestsCounter',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'requestId',
        type: 'bytes32',
      },
    ],
    name: 'SLIRequested',
    type: 'event',
  },
  {
    inputs: [],
    name: 'fee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_requestId',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '_chainlinkResponseUint256',
        type: 'uint256',
      },
    ],
    name: 'fulfillSLI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'fulfillsCounter',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'jobId',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'messengerPrecision',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'oracle',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'sliData',
        type: 'bytes32',
      },
    ],
    name: 'parseSLIData',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'requestIdToSLIRequest',
    outputs: [
      {
        internalType: 'address',
        name: 'slaAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'periodId',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_periodId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_slaAddress',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: '_messengerOwnerApproval',
        type: 'bool',
      },
      {
        internalType: 'address',
        name: '_callerAddress',
        type: 'address',
      },
    ],
    name: 'requestSLI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'requests',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'requestsCounter',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_slaAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_periodId',
        type: 'uint256',
      },
    ],
    name: 'retryRequest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_newJobId',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '_feeMultiplier',
        type: 'uint256',
      },
    ],
    name: 'setChainlinkJobID',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'setSLARegistry',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'slaRegistryAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

module.exports = {
  SLAABI,
  MessengerABI,
};
