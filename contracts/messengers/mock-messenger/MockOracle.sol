// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import '@dsla-protocol/core/contracts/interfaces/IMessenger.sol';
import '@dsla-protocol/core/contracts/SLA.sol';
import '@dsla-protocol/core/contracts/PeriodRegistry.sol';
import '@dsla-protocol/core/contracts/StakeRegistry.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/utils/Strings.sol';

contract MockOracle is IMessenger, ReentrancyGuard {
    using SafeERC20 for IERC20;

    mapping(bytes32 => SLIRequest) public requestIdToSLIRequest;
    bytes32[] public requests;
    address private _slaRegistryAddress;
    uint256 private constant _messengerPrecision = 10 ** 3;

    uint256 private _requestsCounter;
    uint256 private _fulfillsCounter;
    PeriodRegistry private periodRegistry;
    StakeRegistry private stakeRegistry;
    bool private retry = false;

    string public override lpName;
    string public override lpSymbol;

    string public override spName;
    string public override spSymbol;

    constructor(
        PeriodRegistry _periodRegistry,
        StakeRegistry _stakeRegistry,
        string memory _lpName,
        string memory _lpSymbol,
        string memory _spName,
        string memory _spSymbol
    ) {
        periodRegistry = _periodRegistry;
        stakeRegistry = _stakeRegistry;
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
        bool _ownerApproval,
        address _callerAddress
    ) public override onlySLARegistry nonReentrant {
        // Compute a random (or pseudo-random) number
        uint256 randomNumber = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    block.difficulty,
                    _callerAddress
                )
            )
        ) % 1000;

        bytes32 requestId = keccak256(
            abi.encodePacked(
                _periodId,
                _slaAddress,
                _callerAddress,
                randomNumber
            )
        );

        _requestsCounter += 1;
        emit SLIRequested(_callerAddress, _requestsCounter, requestId);

        // Register the SLI in the SLA contract
        SLA(_slaAddress).registerSLI(randomNumber, _periodId);
    }

    function fulfillSLI(
        bytes32 _requestId,
        uint256 _chainlinkResponse
    ) external override nonReentrant {
        // This function is left empty because the mock messenger does not use Chainlink for the SLI
    }

    function messengerPrecision() external pure override returns (uint256) {
        return _messengerPrecision;
    }

    function slaRegistryAddress() external view override returns (address) {
        return _slaRegistryAddress;
    }

    function oracle() external view override returns (address) {
        // This function is not necessary for this mock contract
        // But we still need to implement it to meet the IMessenger interface requirements
        return address(0);
    }

    function jobId() external view override returns (bytes32) {
        // This function is not necessary for this mock contract
        // But we still need to implement it to meet the IMessenger interface requirements
        return bytes32(0);
    }

    function fee() external view override returns (uint256) {
        // This function is not necessary for this mock contract
        // But we still need to implement it to meet the IMessenger interface requirements
        return 0;
    }

    function requestsCounter() external view override returns (uint256) {
        return _requestsCounter;
    }

    function fulfillsCounter() external view override returns (uint256) {
        return _fulfillsCounter;
    }

    function setChainlinkJobID(bytes32, uint256) external override {
        // This function is not necessary for this mock contract
        // But we still need to implement it to meet the IMessenger interface requirements
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
