---
id: Solidity_Best_practices
title: Best practices
sidebar_label: Best practices
---

### Introduction

This guide introduces users with some key points that need to be paid attention in the development of smart contracts, mainly in the practice of actual development. Users can use this guide to quickly understand how to set a reasonable fee for a transaction, how to avoid losing the fee due to transaction failure, and how to encode a more standardized smart contract.


### Reasonable Cost Setting

When you need to deploy a contract on the main network of `Alaya`, you need to set a reasonable fee limit. The fee limit refers to the upper limit of the energy consumption cost of smart contract deployment/execution in `Alaya`. This restriction is mainly accomplished through  `Gas`.  `Gas` is the fuel value of the Alaya network, which determines the normal operation of the Alaya network ecosystem. Gas is usually used to measure how much "work" is required to perform certain actions, and these workloads are the amount of fees that need to be paid to the Alaya network in order to perform the action. In a simple understanding, Gas is the commission for network miners, and is paid by `ATP`. Any transaction, contract execution, and data storage on the network need to use Gas.

Alaya is similar to Ethereum's blockchain system. It uses `ATP` for payment and network maintenance. One ATP is divided into: `mATP/uATP/gVON/mVON/kVON/VON`, and `VON` is the smallest unit.

Gas consists of two parts: GasLimit and GasPrice. `GasLimit` is the maximum ` Gas` consumption (minimum 21,000) that a user is willing to pay to perform an operation or confirm a transaction. GasPrice is the amount of `VON`, the unit price a user is willing to pay for each `GAS` .

When a user sends a transaction, GasLimit and GasPrice are set. `GasLimit * GasPrice` is the user's transaction cost, and the cost is rewarded to the miner as a commission.

The higher the  `GasPrice`  of the transaction, the higher the execution priority of the transaction and the greater the transaction cost. After each transaction is completed, the remaining unused Gas will be returned to the sender's address account. It is important to note that if the execution of the transaction fails due to the  `GasLimit`  is too low, the Gas will not be returned to the user's address at this time, and the user still needs to pay the energy cost for the failed transaction. Therefore, regardless of whether the transaction is executed successfully, the transaction sender needs to pay a certain computation fee to the miner.

In the `Alaya` network, the maximum gas limit is` 4,700,000` and the minimum is `22,000`. Too low or too high gas limit will cause transaction failure. When deploying large contracts or calling complex functions in contracts, you can increase the gas limit, for example: `1,000,000`. If it is a normal transfer, set it to the lowest value. The specific value needs to be estimated according to the size and complexity of the contract. Before the contract is released, the interface `platon_estimateGas` can be called for approximate estimation to avoid failure due to insufficient Gas. [Click to view JSON-RPC reference documentation](/alaya-devdocs/en/Json_Rpc).

**ATP Unit Conversion**

| Unit | VON Value | VON                                   |
| :--- | :-------- | :------------------------------------ |
| VON  | 1         | 1 VON                                 |
| kVON | 1e3 VON   | 1,000                                 |
| mVON | 1e6 VON   | 1,000,000                             |
| gVON | 1e9 VON   | 1,000,000,000                         |
| ATP  | 1e18 VON  | 1,000,000,000,000,000,000             |
| mATP | 1e24 VON  | 1,000,000,000,000,000,000,000,000     |
| gATP | 1e27 VON  | 1,000,000,000,000,000,000,000,000,000 |

### Avoid Timeouts

Sending transactions on the Alaya network does not involve the concept of timeout, but it will eventually stop according to the set gas limit value. If the limit value is lower than the consumption required for contract deployment, the transaction execution fails and the corresponding processing fee will be deducted. The fee cannot be set infinite, because in the network, the block itself has a maximum gas value. When the `GasLimit` of the transaction exceeds this value, the transaction will not be accepted.

If the `call` function of a published contract is called (a call is a stateless operation in the contract logic), there is a 5s timeout limit. If the contract logic is not executed within `5s`, a timeout will occur and the virtual machine will forcely exit, causing the query to fail.

To avoid contract-related transaction failures, try breaking large contracts into smaller pieces and referencing each other as needed. To avoid infinite loops, be aware of common pitfalls and recursive calls.

### Punishment For Illegal Operations

If the smart contract is not compiled by a standard valid compiler, or the instruction code is changed at will, the opcode will be invalid. This type of contract not only fails to be deployed and executed, but also generates a full amount (`GasLimit * GasPrice`) penalty. The transaction fee for the current transaction will be deducted. This is a very strong penalty. If the operator does not pay attention to this point and keep retrying, then the cost will be higher and the cost will be heavier.

In general, invalid opcodes arise from the following conditions:

1. The instruction code of the normally compiled contract is manually changed;
2. The contract compiler version is not consistent with the contract version supported by the network lock;

When operating a contract in the `Alaya` network, first, you must confirm the smart contract version supported by the current network, and then select the compiler of the corresponding version pair.

The normal operation is to use the latest `Alaya-Truffle`/`PlatON-CDT` officially provided by `Alaya` to compile/deploy/execute the contract. At the same time, before switching to the mainnet, it must be validated on the testnet.


### Coding Standards

#### Naming Rules

Basic Rules:

* Use complete descriptive information that accurately describes variables, fields, classes, interfaces, etc.
* Use mixed case (except special characters) to improve the readability of the name.
* Use terminology within the blockchain industry.
* Use as few abbreviations as possible. If you must use them, it is recommended to use public abbreviations and custom abbreviations.
* Avoid using names that are similar or just distinguish between upper and lower case.
* The directory uses lowercase uniformly, without special symbols.
* The file name of EVM smart contracts should be consistent with the contract name.
* It is suggested to use the camel case uniformly for naming.


#### Document Format For Smart Contracts

File Layout Rules:

* Generally it is difficult to read more than 1,000 lines of program code. So try to avoid making the code in a file long. Each contract file should contain only a single contract class or contract interface.

Order of Contract Files:

* Notes on files: All contract source files have a note at the beginning, which lists the copyright statement, file name, function description, and creation and modification records of the file.
* File/Package reference: In the contract source file, the first non-comment line is the compiler version, followed by the reference statement.
* Remarks for class or interface: Comments should be made before class and interface definitions, including descriptions of classes and interfaces, latest modifiers, version numbers, reference links, etc.
* Instance variables: First, the public level, then the protection level, and finally the private level.
* Ordinary method: Functions within a contract should be grouped by module, not by scope or access permissions.


#### Suggestions

* In the smart contract, there is no need to write a function of `get` to get the value of the state variable modified by the public.
* In a smart contract, if an anonymous function modified by `payable` is added to the contract, the contract address can accept ATP transfers.

