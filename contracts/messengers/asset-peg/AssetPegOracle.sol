// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.9;

import '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol';

import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/utils/math/SafeCast.sol';

import '@dsla-protocol/core/contracts/interfaces/IMessenger.sol';
import '@dsla-protocol/core/contracts/SLA.sol';
import '@dsla-protocol/core/contracts/StakeRegistry.sol';

contract AssetPegOracle is IMessenger, ReentrancyGuard {
    using SafeCast for int256;

    address private _slaRegistryAddress;
    address private immutable _oracle;
    uint256 private constant _messengerPrecision = 10**3;

    uint256 private _requestsCounter;
    uint256 private _fulfillsCounter;
    StakeRegistry private stakeRegistry;
    bool private retry = false;
    bytes32 public networkName;

    string public override lpName;
    string public override lpSymbol;

    string public override spName;
    string public override spSymbol;

    constructor(
        address _messengerChainlinkOracle,
        address,
        uint256,
        address,
        StakeRegistry _stakeRegistry,
        bytes32 _networkName,
        string memory _lpName,
        string memory _lpSymbol,
        string memory _spName,
        string memory _spSymbol
    ) {
        _oracle = _messengerChainlinkOracle;
        stakeRegistry = _stakeRegistry;
        networkName = _networkName;
        lpName = _lpName;
        lpSymbol = _lpSymbol;
        spName = _spName;
        spSymbol = _spSymbol;
    }

    modifier onlySLARegistry() {
        if (!retry) {
            require(
                msg.sender == _slaRegistryAddress,
                'Can only be called by SLARegistry'
            );
        }
        _;
    }

    modifier retryLock() {
        retry = true;
        _;
        retry = false;
    }

    function setSLARegistry() public override {
        require(
            _slaRegistryAddress == address(0),
            'SLARegistry address has already been set'
        );

        _slaRegistryAddress = msg.sender;
    }

    function requestSLI(
        uint256 _periodId,
        address _slaAddress,
        bool,
        address _callerAddress
    ) public override onlySLARegistry nonReentrant {
        SLA sla = SLA(_slaAddress);

        (, int256 answer, , , ) = AggregatorV3Interface(_oracle)
            .latestRoundData();
        uint8 decimals = AggregatorV3Interface(_oracle).decimals();
        uint256 sli = (answer.toUint256() * _messengerPrecision) / 10**decimals;
        sla.registerSLI(sli, _periodId);

        _requestsCounter += 1;
        _fulfillsCounter += 1;
        emit SLIRequested(_callerAddress, _requestsCounter, bytes32(0));
        emit SLIReceived(_slaAddress, _periodId, bytes32(0), bytes32(sli));
    }

    function fulfillSLI(bytes32 _requestId, uint256 _chainlinkResponse)
        external
        override
    {}

    function retryRequest(address _slaAddress, uint256 _periodId)
        external
        override
        retryLock
    {
        require(
            stakeRegistry.periodIsVerified(_slaAddress, _periodId),
            'StakeRegistry: not verified'
        );
        SLA sla = SLA(_slaAddress);
        (, , SLA.Status status) = sla.periodSLIs(_periodId);
        require(status == SLA.Status.NotVerified, 'SLA: verified');
        requestSLI(_periodId, _slaAddress, false, msg.sender);
    }

    function setChainlinkJobID(bytes32 _newJobId, uint256 _feeMultiplier)
        external
        override
        onlyOwner
    {}

    function slaRegistryAddress() external view override returns (address) {
        return _slaRegistryAddress;
    }

    function messengerPrecision() external pure override returns (uint256) {
        return _messengerPrecision;
    }

    function oracle() external view override returns (address) {
        return _oracle;
    }

    function jobId() external view override returns (bytes32) {}

    function fee() external view override returns (uint256) {}

    function requestsCounter() external view override returns (uint256) {
        return _requestsCounter;
    }

    function fulfillsCounter() external view override returns (uint256) {
        return _fulfillsCounter;
    }

    function lpSymbolSlaId(uint128 slaId)
        external
        view
        override
        returns (string memory)
    {
        return string(abi.encodePacked(lpSymbol, '-', Strings.toString(slaId)));
    }

    function spSymbolSlaId(uint128 slaId)
        external
        view
        override
        returns (string memory)
    {
        return string(abi.encodePacked(spSymbol, '-', Strings.toString(slaId)));
    }
}
