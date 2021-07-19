---
id: Intro_to_validator
title: Intro to validator
sidebar_label: Intro to validator
---


### What Is A Validator?

Alaya is a blockchain project in democratic governance. Validators, jointly elected by all ATP holders, are responsible for maintaining and developing the Alaya network. The 101 nodes with the most votes will become alternative validators, and among them, 25 validators are randomly selected using VRF to participate in the governance of the entire Alaya network. The validators will be responsible for:

- Maintaining Alaya nodes and the network

- Generating and verifying blocks

- Participating in the decision on proposal voting

  

### Basic Requirements for A Validator

#### Minimum stake



At least 10,000 ATP should be staked. You can stake more, but can only unstake all at once. If the actual stake is lower than the minimum due to reasons such as penalties, the node will be disqualified from being the alternative validator candidate automatically. 

#### Hardware



- Server: A server running Alaya software and a backup server (both equipped with a firewall)

- Memory: 8GB RAM

- Local storage: 100GB system disk, and 200GB data disk (scalable online)

- Processor: 64-bit quad-core (each core above 2.4 GHz)

- Bandwidth: 5 MB/sec (scalable online)

  

#### Software

- Linux: Ubuntu 18.04 or higher

- Clock synchronization: NTP

- Tools: Node management tools (mtool or other open-source/self-developed tools)

  

#### Operation

- Network monitoring and real-time support
- 99.9% uptime
- Cross-regional failover and data backup
- Security measures
- Software upgrade support



### How to Be A Validator

First, make sure you have a balance of 10,000 ATP in your staking account, either locked or unlocked. You also need a server with the recommended configuration above. With the above two conditions met, you can [Be an Alaya validator](/alaya-devdocs/en/Become_Validator) through staking.

For descriptions of node-related nouns and roles, please refer to [Role Description](/alaya-devdocs/en/Governance_mechanism/#participating-roles).

### What's the Reward

#### Reward source

- [Issuance](/alaya-devdocs/en/Economic_model#lat-issue): 5% of the total issuance of the previous year will be issued every year, and 40% of the yearly issuance (that is, 2% of the total issuance) enter the staking reward pool. 

#### Node reward

The node reward consists of three parts: 

- Block reward: Once a block is generated, the validator will receive a fixed amount of ATP as a reward. Half of the total reward pool will be distributed to validators as reward evenly according to the number of blocks per year (approximately 15,759,500 blocks).
- Transaction fees: All the fees for packaging transactions are collected by the validators packaging the block.
- Staking reward: Half of the total reward pool will be distributed evenly as the staking reward according to the number of epochs per year (approximately 1,466 epochs). After each epoch (10,750 blocks, about 3 hours) is over, it will be distributed to all alternative validators on average.

#### Delegator reward

Staking rewards are distributed to validators and alternative validators, and the two will then distribute rewards to delegators according to the ratio set.  

### What Actions Will Cause Penalties?

#### Zero block generated

- If an alternative validator candidate elected in a round fails to generate any block or all its blocks fail to be verified by other validators, it is deemed zero block generated; 
- If an alternative validator candidate fails to generate a block in a round and still fails in the following 30 rounds, its stake equivalent to the stake reward of 250 blocks will be deducted as penalties, and its **node qualification will be restricted**. If the stake is less than 10,000 ATP after deduction, it will be **disqualified from being an alternative validator candidate.**

#### Double-sign penalty

- Generating or signing multiple blocks at the same block height will be considered as double-signing;
- Apart from forceful disqualification from the alternative validator candidates, double-sign penalties also include the **deduction of 1/1,000 of the node's stake**;
- Anyone can report double-signing. After the existing validators verify and reach a consensus, the reported behavior will be identified as a violation and the node will be punished. 50% of the penalty is given to the reporter, and the rest 50% to the reward pool for the block reward and staking reward the next year. 

> **Restriction of node qualification**: The node in question will be temporarily disqualified for 56 epoches. During the period, it is not eligible to be a validator to generate blocks, nor can it receive any staking reward. 
>
> **Forceful disqualification from the alternative validator candidates**: The node in question will be disqualified from being an alternative validator candidate and its ATP will be forcibly unstaked and returned to the original staking account after 168 epochs. During the period, the node in question cannot be an alternative validator candidate again by staking, and the original delegation relationship will be abolished after re-staking.
>
> **Deduction of the node's stake:** The node in question will have its stake of ATP deducted, which will be put into the reward pool as the block reward and staking reward the next year. If the stake is less than 10,000 ATP after such deduction, it will be forcibly disqualified from being a node.  

### How to Participate in Governance

In Alaya, governance is conducted by voting on proposals on the chain. Proposals can be categorized as below:

- [Text proposal](/alaya-devdocs/en/Governance_mechanism/#proposal-classification): Used to initiate decisions that do not need to be executed by code.
- [Software Upgrade Proposal](/alaya-devdocs/en/Governance_mechanism/#proposal-classification): Used to initiate on-chain vote for version upgrades for the purpose of smooth upgrades.
- [Proposal for parameter modification](/alaya-devdocs/en/Governance_mechanism/#proposal-classification): Used to adjust system parameters and other manageable parameters.
- [Cancellation proposal](/alaya-devdocs/en/Governance_mechanism/#proposal-classification): Used to cancel proposals for software upgrade or parameter modification in voting on the chain.

