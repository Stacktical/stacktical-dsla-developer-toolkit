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

/**
 * @title SEMessenger
 * @dev Staking efficiency Messenger
 */

contract SEMessengerV2 is ChainlinkClient, IMessenger, ReentrancyGuard {
    using SafeERC20 for ERC20;

    /// @dev Mapping that stores chainlink sli request information
    mapping(bytes32 => SLIRequest) public requestIdToSLIRequest;
    /// @dev Array with all request IDs
    bytes32[] public requests;
    /// @dev The address of the SLARegistry contract
    address private _slaRegistryAddress;
    /// @dev Chainlink oracle address
    address private immutable _oracle;
    /// @dev chainlink jobId
    bytes32 private _jobId;
    // @dev fee for Chainlink querys. Currently 0.1 LINK
    uint256 private constant _baseFee = 0.1 ether;
    /// @dev fee for Chainlink querys. Currently 0.1 LINK
    uint256 private _fee;
    /// @dev to multiply the SLI value and get better precision. Useful to deploy SLO correctly
    uint256 private constant _messengerPrecision = 10**3;

    uint256 private _requestsCounter;
    uint256 private _fulfillsCounter;
    PeriodRegistry private periodRegistry;
    StakeRegistry private stakeRegistry;
    bool private retry = false;
    /// @dev network name e.g. ethereum, harmony etc, to tell external adapter where to point
    bytes32 public networkName;

    /**
     * @dev parameterize the variables according to network
     * @notice sets the Chainlink parameters (oracle address, token address, jobId) and sets the SLARegistry to 0x0 address
     * @param _messengerChainlinkOracle 1. the address of the oracle to create requests to
     * @param _messengerChainlinkToken 2. the address of LINK token contract
     * @param _messengerJobId 3. the job id for Staking efficiency job
     * @param _feeMultiplier 6. states the amount of paid nodes running behind the precoordinator, to set the fee
     */
    constructor(
        address _messengerChainlinkOracle,
        address _messengerChainlinkToken,
        bytes32 _messengerJobId,
        uint256 _feeMultiplier,
        PeriodRegistry _periodRegistry,
        StakeRegistry _stakeRegistry,
        bytes32 _networkName
    ) public {
        _jobId = _messengerJobId;
        setChainlinkToken(_messengerChainlinkToken);
        _oracle = _messengerChainlinkOracle;
        _fee = _feeMultiplier * _baseFee;
        periodRegistry = _periodRegistry;
        stakeRegistry = _stakeRegistry;
        networkName = _networkName;
    }

    /**
     * @dev event emitted when modifying the jobId
     * @param owner 1. -
     * @param jobId 2. -
     * @param fee 3. -
     */
    event JobIdModified(address indexed owner, bytes32 jobId, uint256 fee);

    /**
     * @dev event emitted when modifying the jobId
     * @param caller 1. -
     * @param requestsCounter 2. -
     * @param requestId 3. -
     */
    event SLIRequested(
        address indexed caller,
        uint256 requestsCounter,
        bytes32 requestId
    );

    /// @dev Throws if called by any address other than the SLARegistry contract or Chainlink Oracle.
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

    /**
     * @dev sets the SLARegistry contract address and can only be called
     * once
     */
    function setSLARegistry() public override {
        // Only able to trigger this function once
        require(
            _slaRegistryAddress == address(0),
            'SLARegistry address has already been set'
        );

        _slaRegistryAddress = msg.sender;
    }

    /**
     * @dev creates a ChainLink request to get a new SLI value for the
     * given params. Can only be called by the SLARegistry contract or Chainlink Oracle.
     * @param _periodId 1. value of the period id
     * @param _slaAddress 2. SLA Address
     * @param _messengerOwnerApproval 3. if approval by owner or msg sender
     */
    function requestSLI(
        uint256 _periodId,
        address _slaAddress,
        bool _messengerOwnerApproval,
        address _callerAddress
    ) public override onlySLARegistry nonReentrant {
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

    /**
     * @dev callback function for the Chainlink SLI request which stores
     * the SLI in the SLA contract
     * @param _requestId the ID of the ChainLink request
     * @param _chainlinkResponse response object from Chainlink Oracles
     */
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

    /**
     * @dev sets a new jobId, which is a agreement Id of a PreCoordinator contract
     * @param _newJobId the id of the PreCoordinator agreement
     * @param _feeMultiplier how many Chainlink nodes would be paid on the agreement id, to set the fee value
     */
    function setChainlinkJobID(bytes32 _newJobId, uint256 _feeMultiplier)
        external
        override
        onlyOwner
    {
        _jobId = _newJobId;
        _fee = _feeMultiplier * _baseFee;
        emit JobIdModified(msg.sender, _newJobId, _fee);
    }

    /**
     * @dev returns the value of the sla registry address
     */
    function slaRegistryAddress() external view override returns (address) {
        return _slaRegistryAddress;
    }

    /**
     * @dev returns the value of the messenger precision
     */
    function messengerPrecision() external view override returns (uint256) {
        return _messengerPrecision;
    }

    /**
     * @dev returns the chainlink oracle contract address
     */
    function oracle() external view override returns (address) {
        return _oracle;
    }

    /**
     * @dev returns the chainlink job id
     */
    function jobId() external view override returns (bytes32) {
        return _jobId;
    }

    /**
     * @dev returns the chainlink fee value on LINK tokens
     */
    function fee() external view override returns (uint256) {
        return _fee;
    }

    /**
     * @dev returns the requestsCounter
     */
    function requestsCounter() external view override returns (uint256) {
        return _requestsCounter;
    }

    /**
     * @dev returns the fulfillsCounter
     */
    function fulfillsCounter() external view override returns (uint256) {
        return _fulfillsCounter;
    }
}
