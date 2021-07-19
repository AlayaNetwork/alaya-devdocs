---
id: Development_guide
title: Development guide
sidebar_label: Development guide
---
This section helps developers to quickly write, deploy and debug contracts on the Alaya network and develop various DApp applications based on the contracts.

## What is DApp?

A DApp is a decentralized application built on the blockchain. It usually consists of a series of contracts, an interactive front-end and a back-end service.

## What a DApp?

A DApp is a decentralized application build on the blockchain, usually consisting of a series of smart contracts, an interactive interface, and backend services.

### Set up local development environment

- [Private network](/alaya-devdocs/en/Run_a_dev_node) - Build a private node or cluster network locally, which can help you debug your local application quickly.
- [Join the dev network](/alaya-devdocs/en/Join_the_dev_network) - Use the development network to test your application in a more open network environment.

### How to Write Contracts?

#### Tools for development

- [Alaya-Truffle](/alaya-devdocs/en/Alaya-Truffle) - A contract development framework that supports WASM and Solidity contracts.
- [IDE](/alaya-devdocs/en/IDE) - An interface-based development tool that supports WASM and Solidity contracts.
 
#### Solidity contract

- [Getting started](/alaya-devdocs/en/Solidity_Getting_started) - An example of how to deploy, compile, publish, and call contracts on the Alaya network.
- [Best practices](/alaya-devdocs/zh-CN/Solidity_Best_practices) - Learn about some of the specifications for writing contracts on trasaction fees.
- [Development costs](/alaya-devdocs/zh-CN/Solidity_Development_costs) - Introduces the fee cost about Solidity contract deployment and call, and the comparative analysis of the fee with Ethereum.
- [Contract security](/alaya-devdocs/en/Solidity_Contract_security) - A few writing specifications on how to improve the security of the contract.
- [Migration tutorial](/alaya-devdocs/en/Solidity_Migration_tutorial) - A tutorial on migrating Solidity contracts from Ethereum to the Alaya network.

#### WASM contract

WASM currently supports contract development in `C++` language, that would be welcome if you want to extend WASM to support contracts in other major languages.

- [Getting started](/alaya-devdocs/en/Wasm_Getting_started) - An example of how to deploy, compile, publish and invoke a WASM contract on the Alaya network.
- [Development costs](/alaya-devdocs/en/Wasm_Development_costs) - Introduction to the fee cost about WASM contract deployment and call.
- [Best practices](/alaya-devdocs/en/Wasm_Best_practices) - Learn about some of the specifications for writing contracts on trasaction fees.
- [Wasm_API](/alaya-devdocs/en/Wasm_API) - Introduction to WASM's contract library.

### Front-end or back-end development

You can interact directly with the contract through the front-end directly, and the following documentation will help.

- [Samurai API](/alaya-devdocs/en/Samurai_API) - Introduction to a Web Wallet API that supports the Alaya network.
- [JS SDK](/alaya-devdocs/en/JS_SDK) - How to use JavaScrip to interact with contracts on the Alaya network.

If you want to interact with the Alaya network by writing back-end services, the following SDKs in different languages can help.

- [JAVA SDK](/alaya-devdocs/en/Java_SDK)

### PRC Token

Since Alaya inherits EVM, the Alaya network is theoretically compatible with all standard Token protocols on Ethereum. Token protocols that are currently explicitly supported are [ARC-20](/alaya-devdocs/en/ARC20)和[ARC-721](/alaya-devdocs/en/ARC721).

