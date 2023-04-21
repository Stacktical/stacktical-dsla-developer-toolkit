// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import '@chainlink/contracts/src/v0.8/ChainlinkClient.sol';

import '@dsla-protocol/core/contracts/interfaces/IMessenger.sol';
import '@dsla-protocol/core/contracts/SLA.sol';
import '@dsla-protocol/core/contracts/PeriodRegistry.sol';
import '@dsla-protocol/core/contracts/libraries/StringUtils.sol';
import '@dsla-protocol/core/contracts/StakeRegistry.sol';

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import '@openzeppelin/contracts/utils/Strings.sol';

contract FITSOracle is ChainlinkClient, IMessenger, ReentrancyGuard {
    using SafeERC20 for ERC20;
    using Chainlink for Chainlink.Request;

    mapping(bytes32 => SLIRequest) public requestIdToSLIRequest;
    bytes32[] public requests;
    address private _slaRegistryAddress;
    address private immutable _oracle;
    bytes32 private _jobId;
    uint256 private constant _baseFee = 0.1 ether;
    uint256 private _fee;
    uint256 private constant _messengerPrecision = 10 ** 6;

    uint256 private _requestsCounter;
    uint256 private _fulfillsCounter;
    PeriodRegistry private periodRegistry;
    StakeRegistry private stakeRegistry;
    bool private retry = false;
    bytes32 public networkName;

    string public override lpName;
    string public override lpSymbol;

    string public override spName;
    string public override spSymbol;

    constructor(
        address _messengerChainlinkOracle,
        address _messengerChainlinkToken,
        uint256 _feeMultiplier,
        PeriodRegistry _periodRegistry,
        StakeRegistry _stakeRegistry,
        bytes32 _networkName,
        string memory _lpName,
        string memory _lpSymbol,
        string memory _spName,
        string memory _spSymbol
    ) {
        setChainlinkToken(_messengerChainlinkToken);
        _oracle = _messengerChainlinkOracle;
        _fee = _feeMultiplier * _baseFee;
        periodRegistry = _periodRegistry;
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
        bool _messengerOwnerApproval,
        address _callerAddress
    ) public override onlySLARegistry nonReentrant {
        require(_jobId != 0, '_jobId empty');

        if (_messengerOwnerApproval) {
            ERC20(chainlinkTokenAddress()).safeTransferFrom(
                owner(),
                address(this),
                _fee
            );
        } else {
            ERC20(chainlinkTokenAddress()).safeTransferFrom(
                _callerAddress,
                address(this),
                _fee
            );
        }
        Chainlink.Request memory request = buildChainlinkRequest(
            _jobId,
            address(this),
            this.fulfillSLI.selector
        );

        // Get period start and end from the periodRegistry
        (uint256 periodStart, uint256 periodEnd) = periodRegistry
            .getPeriodStartAndEnd(SLA(_slaAddress).periodType(), _periodId);

        // Add period start and end as request parameters
        request.add('period_start', StringUtils.uintToStr(periodStart));
        request.add('period_end', StringUtils.uintToStr(periodEnd));

        // Add the 'sla_address' parameter to the request
        request.add('sla_address', StringUtils.addressToString(_slaAddress));

        // Add the 'network_name' parameter to the request
        request.add('network_name', StringUtils.bytes32ToStr(networkName));

        // Add other FITSOracle specific request parameters if needed

        // Sends the request with 0.1 LINK to the oracle contract
        bytes32 requestId = sendChainlinkRequestTo(_oracle, request, _fee);

        requests.push(requestId);

        requestIdToSLIRequest[requestId] = SLIRequest({
            slaAddress: _slaAddress,
            periodId: _periodId
        });

        _requestsCounter += 1;
        emit SLIRequested(_callerAddress, _requestsCounter, requestId);
    }

    function fulfillSLI(
        bytes32 _requestId,
        uint256 _chainlinkResponse
    ) external override nonReentrant recordChainlinkFulfillment(_requestId) {
        SLIRequest memory request = requestIdToSLIRequest[_requestId];
        emit SLIReceived(
            request.slaAddress,
            request.periodId,
            _requestId,
            bytes32(_chainlinkResponse)
        );
        _fulfillsCounter += 1;
        SLA(request.slaAddress).registerSLI(
            _chainlinkResponse,
            request.periodId
        );
    }

    function retryRequest(
        address _slaAddress,
        uint256 _periodId
    ) external override retryLock {
        require(
            stakeRegistry.periodIsVerified(_slaAddress, _periodId),
            'StakeRegistry: not verified'
        );
        SLA sla = SLA(_slaAddress);
        (, , SLA.Status status) = sla.periodSLIs(_periodId);
        require(status == SLA.Status.NotVerified, 'SLA: verified');
        requestSLI(_periodId, _slaAddress, false, msg.sender);
    }

    function setChainlinkJobID(
        bytes32 _newJobId,
        uint256 _feeMultiplier
    ) external override onlyOwner {
        _jobId = _newJobId;
        _fee = _feeMultiplier * _baseFee;
        emit JobIdModified(msg.sender, _newJobId, _fee);
    }

    function slaRegistryAddress() external view override returns (address) {
        return _slaRegistryAddress;
    }

    function messengerPrecision() external pure override returns (uint256) {
        return _messengerPrecision;
    }

    function oracle() external view override returns (address) {
        return _oracle;
    }

    function jobId() external view override returns (bytes32) {
        return _jobId;
    }

    function fee() external view override returns (uint256) {
        return _fee;
    }

    function requestsCounter() external view override returns (uint256) {
        return _requestsCounter;
    }

    function fulfillsCounter() external view override returns (uint256) {
        return _fulfillsCounter;
    }

    function lpSymbolSlaId(
        uint128 slaId
    ) external view override returns (string memory) {
        return string(abi.encodePacked(lpSymbol, '-', Strings.toString(slaId)));
    }

    function spSymbolSlaId(
        uint128 slaId
    ) external view override returns (string memory) {
        return string(abi.encodePacked(spSymbol, '-', Strings.toString(slaId)));
    }
}
