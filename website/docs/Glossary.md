---
id: Glossary
title: Glossary
sidebar_label: Glossary
---

This article will introduce key terms of Alaya and their conceptual explanations.



### Privacy-Preserving Computation

Privacy-preserving computation refers to the information technology that analyzes and calculates data and can verify the computation results under the premise of ensuring the data provider does not leak sensitive data. It includes a series of technical systems that realize the data computation in an encrypted and non-transparent state to secure the privacy information of all parties involved, thereby making "data available yet invisible".



### Zero-knowledge Proof (ZKP)

ZKP is a certificate that verifies the validity of a transaction with no relevant information disclosed. It makes the transaction private while maintaining its legitimacy.



### Homomorphic Encryption (HE)

Homomorphic encryption is a special encryption algorithm that operates computation directly on the basis of ciphertext. It delivers the same computation result as that based on the plaintext after decryption.




### Secure Multi-Party Computation(MPC)

It designs special encryption algorithms and protocols to support direct computation on encrypted data (that is, without touching the plaintext content of the data) and obtain the required computation results. It allows a group of mutually distrustful participants with secret data to collaboratively compute a predetermined function. Participants cannot obtain any information other than the computation results. During the whole process, the participants have absolute control over their own data.



### Address

The address is a 42-bit string that identifies the unique account on Alaya. In Alaya, the address is displayed with the atp prefix.



### Wallet

A program used to create and store private keys and sign transactions.



### Observed Wallet

A wallet address added to the online wallet client to observe the account balance and transaction information. The client does not contain the wallet private key or wallet files, and can cooperate with the wallet client that has the private key to complete the transaction.



### Transaction Hash

Transaction hash is a 64-bit string used to mark each transaction on the blockchain. 



### Transactions per Second (TPS)

The number of transactions that the blockchain network can process per second. 



### Gasprice

The gas that users are willing to pay when sending transactions or executing smart contract functions. In the Alaya network, nodes will give priority to transactions with higher gas. 



### Smart Contract

A smart contract is an automatic contract that triggers certain actions when a set of predetermined conditions are met. Its operation is similar to the "if...then" condition. For example, it needs to meet condition C before it can transfer money from A to B.



### WASM

WASM (WebAssembly) is a new bytecode format and a new underlying binary syntax. The instruction code compiled by the compiler is small in size, portable, fast to load and compatible with WEB. It is a new technology to run portable programs safely and effectively.



### Decentralized Application (DApp)

A DApp is an application that runs on a P2P computer network rather than a central computer, and it allows software to run on the Internet without the control of a single entity.



### ARC20

ARC20 is a set of standards for implementing token API through smart contracts on Alaya. It specifies functions, events, etc. defined by token contracts. It is fully compatible with Ethereum ERC20. 



### ARC721

ARC721 is a set of standard interfaces for issuing non-fungible tokens (NFT) on the Alaya network. It is fully compatible with Ethereum ERC721.



### Consensus

The process by which all parties jointly confirm and reach agreement on information. 



### Probability (PlatON) proof of stake (PPOS)

A consensus mechanism for proof of stake based on probability distribution, which is more efficient and environmentally friendly than PoW. 



### Concurrent Byzantine Fault-tolerant (CBFT) Algorithm

Concurrent Byzantine fault-tolerant algorithm is a new consensus algorithm developed from the Byzantine fault-tolerant algorithm (The Byzantine Generals' Problem was first proposed by Leslie Lamport, Robert Shostak, and Mar-shall Pease in 1982. Distributed networks with Byzantine fault-tolerant capabilities can alleviate the influence of malicious nodes on the network and make honest nodes reach correct consensus. Currently, several types of BFT protocols can improve the system's Byzantine fault tolerance. Among them is the Practical Byzantine Fault Tolerance (PBFT) proposed by Miguel Castro and Barbara Liskov).



### Verifiable Random Functions (VRF)

The concept of Verifiable Random Function (VRF) was proposed by Micali, Rabin, and Vadhan. It is a pseudo-random function that can provide a publicly verifiable proof of the correctness of its output.



### Full Node

A full node is a program that can synchronize and independently verify all block data and transactions. The full node has a complete blockchain ledger and is responsible for the transaction broadcasting and verification of the blockchain. 



### Staking

The token holder locks the token to the system contract and obtains the power of the validator. Based on the proof-of-stake (PoS) blockchain, the power of the validator is determined by the number of staked tokens. Tokens can be directly staked to the validator, or be delegated by the holder to the validator. 



### Delegate

Token holders delegate the token to a node through the system contract to increase the node power and obtain income. 



### Alternative Validator Candidate

Token holders who want to generate blocks on Alaya can be alternative validator candidate by staking a certain amount of tokens in the staking contract. (For the convenience of description, in some cases, the alternative validator candidates include all the nodes on the staking list, that is, alternative validators and validators) 



### Alternative Validator

The top 100 alternative validator candidates in the ranking on Alaya are called alternative validators. They participate in the election of validators in each consensus cycle and can obtain staking rewards during the epoch. 



### Validator

Validators are nodes selected to participate in block generation and verification in each round. The system randomly selects 25 (in normal state) nodes from the 101 validators through the VRF random function as the validators of the round. 



### Proposer

In the Alaya network, a consensus cycle generates 250 blocks (25 validators\* 10 blocks continuously generated by each validator) blocks. The 25 validators take turns to become proposers, and each validator has a 20-second slot.



### Delegator

Delegators are token holders who do not want to or cannot become validators and delegate the token to validators for reward. 



### Node's Total Stake

The sum of the node's tokens and the delegated tokens.



### Node Power

The power of a node being elected as a validator. It is associated with the total stake. The more the total stake, the greater the power.



### Round

In Alaya, every 250 blocks constitute a round. In such a round, the 25 validators elected (in normal state) take turns to generate blocks. 



### Epoch

In Alaya, 43 rounds (that is, 10,750 blocks) form an epoch, which is to process the system logic such as staking reward, locked stake, and the selection of alternative validator.



### Issuance Cycle

The issuance cycle is the number of blocks calculated based on 365.25 days and the average block time in the last 365.25 days (and must be an integer multiple of the epoch). The system will additionally issue a fixed number of tokens according to the issuance cycle.



### Block Interval

The time interval between two blocks generated.



### Staking Reward

All alternative validators in each epoch can receive additional rewards distributed by the system as a return for the locked stake.



### Block Reward

The reward from additional issuance obtained by the validator for the blocks generated.



### Block Transaction Fee

All transaction fees in the block obtained by the validator as the reward for the blocks generated.



### Reward Pool

The account for depositing tokens issued by the system and rewards.



### Locked-up Token


Tokens locked in the [LockupContract](https://scan.alaya.network/contract-detail?address=atp1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqp8h9fxw) of the system, uncirculated.



### Block Rate

The actual number of blocks generated by the validator as a percentage of the estimated number of blocks (each elected proposer plans to generate 10 blocks).



### Genesis Block

The first block of the blockchain.



### Sponsor

The person or node who initiates a proposal on the public chain.



### Vote Period

It starts from the block height at which a proposal is successfully initiated to the block height at which a specified voting ends.



### On-chain Governance

With governance rules embedded into the blockchain protocol layer, on-chain governance refers to the process from proposal initiation through voting on the proposal to the automatic execution of the proposal.



### Off-chain Governance

With the off-chain governance rules set, off-chain governance refers to the off-chain process, which is controlled by people, from proposal initiation through voting to the execution. 



### Alaya Improvement Proposals (AIP)

The improvements on the Alaya ecosystem proposed by the Aalya developer community. Community users compile the proposal according to the template and publish it in the [AIPs repository ](https://github.com/AlayaNetwork/AIPs)of Github Alaya.



### AIP-ID

The unique number of the proposal in the AIP repository. After submitting the proposal in the form of text to the AIP repository, the repository administrator will distribute a unique AIP-ID which will be used to initiate a proposal on the chain.



### Proposal

Proposals are improvement suggestions proposed to the PlatON public chain through transactions initiated.



### LatticeX Foundation

A non-profit organization established in Singapore, the LatticeX Foundation supports various projects that serve the development of the LatticeX ecosystem, including underlying distributed infrastructure, industrial applications, and related technologies and tools.



### Upgrade Vote

It refers to the vote initiated by the alternative validator on the upgrade proposal. Initiating the vote represents the support for the upgrade and the upgrade of the local node version.



### Proposal under Implementation

Proposals that are in voting or are to be upgraded.



### Declared Version

A node can initiate a version declaration transaction to declare its own node version, and the declared version is the actual version of the node.



### Node Version

The version number of the program that the node is actually running.



### Proposal Version


The target version number in the upgrade proposal.



### Major Version

The first two digits of the version number are the major version. For example, if the version number is 1.2.5, the first two digits represent the major version, that is, 1.2. The upgrade of the major version needs to be completed in the form of proposal voting. After the upgrade, it will no longer be compatible with the old version.



### Minor Version

The third digit of the version number is the minor version. For example, if the version number is 1.2.5, the three digits represent a minor version under 1.2, that is, 1.2.5. The update of the minor version does not need to pass the proposal voting, and nodes can update it independently, which makes no difference to the chain.



### Invalid Alternative Validator

The node that initiated the application for exit or the node that was disqualified from being an alternative validator as a punishment is collectively referred to as the invalid alternative node.



### Cancellation Proposal

The proposal used to cancel the upgrade proposal.



### Validator Election Block

The block in the round that determines the validators of the next round.



### Von

The smallest unit of the built-in currency in the Alaya system.



### GVon

The second smallest unit of the built-in currency in the Alaya system.



### ATP

The regular unit (denomination) of native tokens built in the Alaya network. 1LAT=1,000,000,000,000,000,000Von【10^18Von】.



### Node ID

The unique identifier of the node, the same as the node's public key.



### Staking Wallet

A wallet used for staking and management for nodes, used to pay the staked token. Transactions of the node for operations are initiated and signed by the staking account.



### Reward Wallet		 

The full name is the "Staking Reward Wallet", a wallet where the staking node receives rewards. It is used to receive block rewards, staking rewards and block transaction fees.



### BLS Signature

BLS signature is an algorithm that can aggregate signatures and keys (that is, multiple keys can be aggregated into one key, and multiple signatures can be aggregated into one signature).



### BLS Public Key

The public key generated by the BLS signature algorithm, which is used to aggregate signatures (used to sign a consensus message).



### Circulation

The number of tokens circulating in the market in real time and in the hands of the public. Real-time circulating supply = total issuance - locked tokens -tokens hosted by the foundation. Among them, the locked tokens include the tokens staked, tokens delegated by the node, and tokens locked up in the lock contract.



### Circulating Supply

It refers to the number of tokens that have been created minus the number of tokens that have been burned. The circulating supply of Alaya is equal to W(1+a%)^n. Among them, W is the initial issuance of 10 billion, n is the serial number of the current issuance cycle, the starting serial number of the genesis block is 1, and a% is the issuance ratio (currently 5%).



### Staking Rate

It refers to the percentage of staked tokens in the total tokens that can be staked. The latter include the locked-up tokens in the lock contract.

The formula in the Alaya network: Staking rate = Total staking / circulating supply - balance in the staking-related system contracts - locked-up balance in the foundation account.

Staking-related system contracts include:

RewardManagerPool(lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqrdyjj2v), DelegateRewardPool(lat1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqxlcypcy)



### Validator Yield

It refers to the annualized rate of return converted from the net income per share of the node’s staking for the latest four epochs. It is for reference only and does not constitute any recommendation.

Assuming in the last 4 epochs, the actual income obtained by the node in each epoch (block reward + staking reward + transaction fee in the block) is W1, W2, W3, and W4 respectively, and the number of tokens actually staked by the node during each epoch is C1, C2, C3, and C4 respectively.

Validator yield = [(W1+W2+W3+W4)/(C1+C2+C3+C4)]\*(the number of epochs in the current issuance cycle)\*100%



### Delegated Yield

It refers to the annualized rate of return converted from the net income per share of the delegated staking for the latest four epochs. It is for reference only and does not constitute any recommendation.

Assuming in the last 4 epochs, the delegation reward actually obtained from the node in each epoch is W1, W2, W3, and W4 respectively, and the delegation cost locked in each settlement block is C1, C2, C3, and C4 respectively.

Estimated delegated yield = [(W1+W2+W3+W4)/(C1+C2+C3+C4)]\*(the number of epochs in the current issuance cycle)\*100%
