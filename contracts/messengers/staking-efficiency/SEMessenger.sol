pragma solidity 0.6.6;

pragma experimental ABIEncoderV2;

import '@chainlink/contracts/src/v0.6/ChainlinkClient.sol';

import '@stacktical/dsla-contracts/contracts/interfaces/IMessenger.sol';
import '@stacktical/dsla-contracts/contracts/SLA.sol';
import '@stacktical/dsla-contracts/contracts/PeriodRegistry.sol';
import '@stacktical/dsla-contracts/contracts/StringUtils.sol';
import '@stacktical/dsla-contracts/contracts/StakeRegistry.sol';

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/SafeERC20.sol';

contract SEMessenger is ChainlinkClient, IMessenger, ReentrancyGuard {
    using SafeERC20 for ERC20;

    mapping(bytes32 => SLIRequest) public requestIdToSLIRequest;
    bytes32[] public requests;
    address private _slaRegistryAddress;
    address private immutable _oracle;
    bytes32 private _jobId;
    uint256 private constant _baseFee = 0.1 ether;
    uint256 private _fee;
    uint256 private constant _messengerPrecision = 10**3;

    uint256 private _requestsCounter;
    uint256 private _fulfillsCounter;
    PeriodRegistry private periodRegistry;
    StakeRegistry private stakeRegistry;
    bool private retry = false;
    bytes32 public networkName;

    string public override lpName;
    string public override spName;

    constructor(
        address _messengerChainlinkOracle,
        address _messengerChainlinkToken,
        uint256 _feeMultiplier,
        PeriodRegistry _periodRegistry,
        StakeRegistry _stakeRegistry,
        bytes32 _networkName,
        string memory _lpName,
        string memory _spName
    ) public {
        setChainlinkToken(_messengerChainlinkToken);
        _oracle = _messengerChainlinkOracle;
        _fee = _feeMultiplier * _baseFee;
        periodRegistry = _periodRegistry;
        stakeRegistry = _stakeRegistry;
        networkName = _networkName;
        lpName = _lpName;
        spName = _spName;
    }

    event JobIdModified(address indexed owner, bytes32 jobId, uint256 fee);

    event SLIRequested(
        address indexed caller,
        uint256 requestsCounter,
        bytes32 requestId
    );

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
        require(_jobId != 0, '_jobI empty');
        SLA sla = SLA(_slaAddress);
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
        (
            uint256 sla_monitoring_start,
            uint256 sla_monitoring_end
        ) = periodRegistry.getPeriodStartAndEnd(sla.periodType(), _periodId);
        request.add(
            'sla_monitoring_start',
            StringUtils.uintToStr(sla_monitoring_start)
        );
        request.add(
            'sla_monitoring_end',
            StringUtils.uintToStr(sla_monitoring_end)
        );
        request.add('sla_address', StringUtils.addressToString(_slaAddress));
        request.add('network_name', StringUtils.bytes32ToStr(networkName));

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

    function fulfillSLI(bytes32 _requestId, uint256 _chainlinkResponse)
        external
        override
        nonReentrant
        recordChainlinkFulfillment(_requestId)
    {
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
    {
        _jobId = _newJobId;
        _fee = _feeMultiplier * _baseFee;
        emit JobIdModified(msg.sender, _newJobId, _fee);
    }

    function slaRegistryAddress() external view override returns (address) {
        return _slaRegistryAddress;
    }

    function messengerPrecision() external view override returns (uint256) {
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
}
