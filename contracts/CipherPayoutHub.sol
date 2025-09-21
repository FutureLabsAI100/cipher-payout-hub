// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@fhevm/lib/Reencrypt.sol";
import "@fhevm/lib/Fhe.sol";

contract CipherPayoutHub {
    using Fhe for euint32;
    using Fhe for ebool;
    
    struct PayoutRequest {
        euint32 payoutId;
        euint32 amount;
        euint32 recipientCount;
        ebool isApproved;
        ebool isProcessed;
        string description;
        address requester;
        uint256 timestamp;
        uint256 deadline;
    }
    
    struct Recipient {
        euint32 recipientId;
        euint32 amount;
        ebool isVerified;
        address recipientAddress;
        string metadata;
    }
    
    struct PayoutBatch {
        euint32 batchId;
        euint32 totalAmount;
        euint32 recipientCount;
        ebool isProcessed;
        address batchCreator;
        uint256 timestamp;
    }
    
    mapping(uint256 => PayoutRequest) public payoutRequests;
    mapping(uint256 => Recipient) public recipients;
    mapping(uint256 => PayoutBatch) public payoutBatches;
    mapping(address => euint32) public userReputation;
    mapping(address => euint32) public userBalance;
    mapping(address => ebool) public isAuthorized;
    
    uint256 public payoutRequestCounter;
    uint256 public recipientCounter;
    uint256 public batchCounter;
    
    address public owner;
    address public verifier;
    address public treasury;
    
    event PayoutRequestCreated(uint256 indexed payoutId, address indexed requester, string description);
    event RecipientAdded(uint256 indexed payoutId, uint256 indexed recipientId, address indexed recipient);
    event PayoutApproved(uint256 indexed payoutId, address indexed approver);
    event PayoutProcessed(uint256 indexed payoutId, uint256 indexed batchId);
    event BatchCreated(uint256 indexed batchId, address indexed creator);
    event ReputationUpdated(address indexed user, uint32 reputation);
    event FundsDeposited(address indexed user, uint32 amount);
    event FundsWithdrawn(address indexed user, uint32 amount);
    
    constructor(address _verifier, address _treasury) {
        owner = msg.sender;
        verifier = _verifier;
        treasury = _treasury;
    }
    
    function createPayoutRequest(
        string memory _description,
        euint32 _amount,
        uint256 _deadline
    ) public returns (uint256) {
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(_deadline > block.timestamp, "Deadline must be in the future");
        
        uint256 payoutId = payoutRequestCounter++;
        
        payoutRequests[payoutId] = PayoutRequest({
            payoutId: _amount, // Will be set properly
            amount: _amount,
            recipientCount: Fhe.asEuint32(0),
            isApproved: Fhe.asEbool(false),
            isProcessed: Fhe.asEbool(false),
            description: _description,
            requester: msg.sender,
            timestamp: block.timestamp,
            deadline: _deadline
        });
        
        emit PayoutRequestCreated(payoutId, msg.sender, _description);
        return payoutId;
    }
    
    function addRecipient(
        uint256 payoutId,
        address recipientAddress,
        euint32 amount,
        string memory metadata
    ) public returns (uint256) {
        require(payoutRequests[payoutId].requester != address(0), "Payout request does not exist");
        require(payoutRequests[payoutId].requester == msg.sender, "Only requester can add recipients");
        require(block.timestamp <= payoutRequests[payoutId].deadline, "Deadline has passed");
        
        uint256 recipientId = recipientCounter++;
        
        recipients[recipientId] = Recipient({
            recipientId: amount, // Will be set properly
            amount: amount,
            isVerified: Fhe.asEbool(false),
            recipientAddress: recipientAddress,
            metadata: metadata
        });
        
        // Update payout request
        payoutRequests[payoutId].recipientCount = payoutRequests[payoutId].recipientCount + Fhe.asEuint32(1);
        
        emit RecipientAdded(payoutId, recipientId, recipientAddress);
        return recipientId;
    }
    
    function approvePayout(uint256 payoutId, ebool isApproved) public {
        require(msg.sender == verifier || msg.sender == owner, "Not authorized to approve");
        require(payoutRequests[payoutId].requester != address(0), "Payout request does not exist");
        require(!Fhe.decrypt(payoutRequests[payoutId].isProcessed), "Payout already processed");
        
        payoutRequests[payoutId].isApproved = isApproved;
        emit PayoutApproved(payoutId, msg.sender);
    }
    
    function processPayout(uint256 payoutId) public returns (uint256) {
        require(payoutRequests[payoutId].requester != address(0), "Payout request does not exist");
        require(Fhe.decrypt(payoutRequests[payoutId].isApproved), "Payout not approved");
        require(!Fhe.decrypt(payoutRequests[payoutId].isProcessed), "Payout already processed");
        require(block.timestamp <= payoutRequests[payoutId].deadline, "Deadline has passed");
        
        uint256 batchId = batchCounter++;
        
        payoutBatches[batchId] = PayoutBatch({
            batchId: payoutRequests[payoutId].amount, // Will be set properly
            totalAmount: payoutRequests[payoutId].amount,
            recipientCount: payoutRequests[payoutId].recipientCount,
            isProcessed: Fhe.asEbool(false),
            batchCreator: msg.sender,
            timestamp: block.timestamp
        });
        
        payoutRequests[payoutId].isProcessed = Fhe.asEbool(true);
        
        emit PayoutProcessed(payoutId, batchId);
        emit BatchCreated(batchId, msg.sender);
        
        return batchId;
    }
    
    function executeBatch(uint256 batchId) public {
        require(payoutBatches[batchId].batchCreator != address(0), "Batch does not exist");
        require(!Fhe.decrypt(payoutBatches[batchId].isProcessed), "Batch already processed");
        require(msg.sender == owner || msg.sender == treasury, "Not authorized to execute");
        
        // Mark batch as processed
        payoutBatches[batchId].isProcessed = Fhe.asEbool(true);
        
        // In a real implementation, this would transfer funds to recipients
        // For now, we'll just emit an event
        emit BatchCreated(batchId, msg.sender);
    }
    
    function depositFunds() public payable {
        require(msg.value > 0, "Amount must be greater than 0");
        
        userBalance[msg.sender] = userBalance[msg.sender] + Fhe.asEuint32(uint32(msg.value));
        emit FundsDeposited(msg.sender, uint32(msg.value));
    }
    
    function withdrawFunds(euint32 amount) public {
        require(Fhe.decrypt(userBalance[msg.sender]) >= Fhe.decrypt(amount), "Insufficient balance");
        
        userBalance[msg.sender] = userBalance[msg.sender] - amount;
        
        uint256 withdrawAmount = Fhe.decrypt(amount);
        payable(msg.sender).transfer(withdrawAmount);
        
        emit FundsWithdrawn(msg.sender, uint32(withdrawAmount));
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier || msg.sender == owner, "Not authorized to update reputation");
        require(user != address(0), "Invalid user address");
        
        userReputation[user] = reputation;
        emit ReputationUpdated(user, Fhe.decrypt(reputation));
    }
    
    function authorizeUser(address user, ebool isAuthorized) public {
        require(msg.sender == owner, "Only owner can authorize users");
        require(user != address(0), "Invalid user address");
        
        isAuthorized[user] = isAuthorized;
    }
    
    function getPayoutRequestInfo(uint256 payoutId) public view returns (
        string memory description,
        uint32 amount,
        uint32 recipientCount,
        bool isApproved,
        bool isProcessed,
        address requester,
        uint256 timestamp,
        uint256 deadline
    ) {
        PayoutRequest storage request = payoutRequests[payoutId];
        return (
            request.description,
            Fhe.decrypt(request.amount),
            Fhe.decrypt(request.recipientCount),
            Fhe.decrypt(request.isApproved),
            Fhe.decrypt(request.isProcessed),
            request.requester,
            request.timestamp,
            request.deadline
        );
    }
    
    function getRecipientInfo(uint256 recipientId) public view returns (
        uint32 amount,
        bool isVerified,
        address recipientAddress,
        string memory metadata
    ) {
        Recipient storage recipient = recipients[recipientId];
        return (
            Fhe.decrypt(recipient.amount),
            Fhe.decrypt(recipient.isVerified),
            recipient.recipientAddress,
            recipient.metadata
        );
    }
    
    function getBatchInfo(uint256 batchId) public view returns (
        uint32 totalAmount,
        uint32 recipientCount,
        bool isProcessed,
        address batchCreator,
        uint256 timestamp
    ) {
        PayoutBatch storage batch = payoutBatches[batchId];
        return (
            Fhe.decrypt(batch.totalAmount),
            Fhe.decrypt(batch.recipientCount),
            Fhe.decrypt(batch.isProcessed),
            batch.batchCreator,
            batch.timestamp
        );
    }
    
    function getUserReputation(address user) public view returns (uint32) {
        return Fhe.decrypt(userReputation[user]);
    }
    
    function getUserBalance(address user) public view returns (uint32) {
        return Fhe.decrypt(userBalance[user]);
    }
    
    function isUserAuthorized(address user) public view returns (bool) {
        return Fhe.decrypt(isAuthorized[user]);
    }
    
    // Emergency functions
    function emergencyWithdraw() public {
        require(msg.sender == owner, "Only owner can emergency withdraw");
        payable(owner).transfer(address(this).balance);
    }
    
    function updateTreasury(address newTreasury) public {
        require(msg.sender == owner, "Only owner can update treasury");
        require(newTreasury != address(0), "Invalid treasury address");
        treasury = newTreasury;
    }
    
    function updateVerifier(address newVerifier) public {
        require(msg.sender == owner, "Only owner can update verifier");
        require(newVerifier != address(0), "Invalid verifier address");
        verifier = newVerifier;
    }
}
