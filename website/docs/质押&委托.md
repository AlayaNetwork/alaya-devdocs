---
id: staking_and_delegation
title: Staking&Delegation
sidebar_label: Staking&Delegation
---

## What is staking?
In PlatON's network, staking is the act of nodes joining to Alayanetwork by locking a certain amount of ATP. Alaya uses [PPoS consensus mechanism](/alaya-devdocs/en/Economic_Model#ppos-consensus) to select validators, and nodes joining the Alayanetwork are ranked according to the amount of ATP staked. Each round of consensus will randomly select 25 nodes from the top 101 nodes as validators to pack out blocks and receive network rewards.



## What is a delegation?

Delegation is the act of ATP holders delegating ATP to nodes to indirectly participate in the network co-build. Delegation can not only improve the security of the network, but also bring rewards to the delegator.



## Why become a delegator?

Staking is the core feature of the Alayanetwork. The larger the percentage of ATP involved in staking and delegating, the higher the security of Alayanetwork.

Whether a validator can be selected as an active validator mainly depends on the amount of total staking, which is composed of the staking of ATP of the validator itself and the ATP delegated to it. Alternative Validator Candidates ranking top 101 can become alternative validators.

The delegation is similar to an election in that we exercise our voting right by delegating, so as to fulfill our common expectation of electing the candidate contributing the most to the development of the network to become the validator. The participation of more delegators can prevent validators from misconduct and promote the healthy and sustainable development of Alayaecosystem and the continuous increase of Alayavalue.



## How to staking?

We welcome ATP holders interested in maintaining the network to run an Alaya Node and staking to become an Alaya Validator. A detailed description of the Alaya node and how to operate it can be found on the [Alaya Node Page](/)

To facilitate operations such as node staking and governance voting, Alaya provides the [MTool tool](/), which can be used to quickly initiate staking operations, please refer to [here](/) for details.



## How to delegate?

Any user holding more than 1 ATP can participate in delegating for delegated rewards, which can be done simply by using [ATON Wallet](/), see [here](/alaya-devdocs/zh-CN/ATON-user-manual#delegation).

Feel free to submit more good applications that support the Alaya Delegation Service.



## How to choose a validator worth delegating?

Based on the information provided by the ATON Wallet, you can examine a validator from the following aspects:

- **Ranking**: the higher the ranking of a validator, the higher the chance of it becoming a validator producing blocks in the consensus round.
- **Expected delegated annualized yield**: the yield of delegation can be estimated with the expected annualized rate of yield, which can be calculated by the yield per share of the delegation in the recent 4 Epochs.
- **Delegating reward ratio**: the ratio of the rewards allocated to the delegators. The higher the ratio, the higher the total rewards earned by all delegators.
- **Delegation received**: the total amount of delegated ATP received by the current validator. The higher percentage of the delegated ATP, the higher the rewards allocated to individuals from the total rewards received by all delegators.
- **Penalty count**: validators with low block producing rate or malicious dual-signing will be penalized, and the more validators are penalized, the less trustworthy they are.
- **Community reputation**: validators with good reputations and prestige in the community can be trusted and delegated.



## When does the delegation take effect and when can I get rewards after delegation?

Delegated ATP does not become effective (i.e., being locked) until the next [Epoch](/).

When the effective delegation is fully locked for an Epoch and the delegated validator is rewarded in the [Epoch](/alaya-devdocs/en/Economic_Model#the-business-cycle-in-platon), the delegating reward is available in that settlement block.

There will be no rewards in the Epoch for delegating redeemed in the process.

If the delegated validator is revoked, all delegating under that validator will be invalidated and there will be no delegating rewards for this Epoch and subsequent Epochs. Please take care to [withdraw](/) in a timely manner.



## How to calculate the delegated rawards?

Rewards can be received when a validator becomes an active validator and participates in block production. The rewards are composed of staking rewards and block-producing rewards and are allocated to delegators in accordance with the delegating reward ratio. The delegated rewards obtained need to be actively [claimed](/) by you.

Example：

> If a validator has a delegating reward ratio of 10% and receives a block-producing reward of 1000LAT and a staking reward of 2000 ATP for a certain period of time, rewards participating in allocation would be 3000 ATP.
>
>Total reward for all delegators: 1000 * 10%+2000*10% = 300 ATP
>
>Each delegator gets a reward based on the ratio of its valid delegation to the total valid delegation of the validator.
>
>Suppose a delegator has a total delegation of 1000 ATP and there are a total of 5000 ATP delegation on the validator,
>
>then the reward that the delegator can get is 1000/5000*300=60 ATP.


