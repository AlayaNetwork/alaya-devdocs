---
id: Development_guide
title: Development guide
sidebar_label: Development guide
---


Alaya is compatible with EVM and WASM virtual machines, so developers can use more high-level languages to write contracts. This greatly reduces the learning threshold for writing contracts, and at the same time improves the performance of processing contract transactions. The documents in this chapter can help developers quickly write, deploy, and debug contracts on the Alaya network and develop various Dapp applications based on the contracts.

## What's A DApp?

Dapp, or Decentralized Application, is a decentralized application built on the blockchain.

## How to Develop A DApp?

From the developer's point of view, DApps are essentially a process of interacting with contracts. You can call the contract directly through the web, or you can interact with the contract through SDKs. The entire development process is roughly divided into three major parts: development environment preparation, contract development, and front-end and back-end development.

### Development environment preparation

You can choose the following environments to assist in development and testing as needed.

- [Private Network](/alaya-devdocs/zh-CN/Private_network) - Build a private node or network locally, which can help you quickly develop and debug local applications.
- [Development Network](/alaya-devdocs/zh-CN/Join_the_dev_network) - Connect to the development network, which can help test your code in a more open environment.
- [Mainnet](#) - When you have completed all testing on the private network and development network, you can seamlessly migrate a DApp to the Alaya mainnet

### Contract development

#### Development tools

- [Alaya-Truffle](/alaya-devdocs/zh-CN/Alaya-Truffle)  
- [Alaya Studio](/alaya-devdocs/zh-CN/Alaya_Studio)

#### Solidity contract development

- [Getting Started](/alaya-devdocs/zh-CN/Solidity_Getting_started) - Introduction to how to deploy, compile, publish, and call contracts on the Alaya network
- [Best Practices](/alaya-devdocs/zh-CN/Solidity_Best_practices) - Introduction to how to set a reasonable transaction fee and how to avoid the deduction of the transaction fee due to transaction failure, etc.
- [Development Costs](/alaya-devdocs/zh-CN/Solidity_Development_costs) - The comparison between the transaction fee of the Slolidity contract deployment and call on Alaya and the transaction fee on Ethereum 
- [Security Guide](/alaya-devdocs/zh-CN/Solidity_Contract_Security_Dev_Guide) - Introduction to how to improve the security of the contract
- [Contract Migration](/alaya-devdocs/zh-CN/Solidity_Contract_security) - In addition to writing contracts, you can also migrate contracts from Ethereum or other public chains that support Solidity contracts to the Alaya network

#### WASM contract development

WASM contracts currently only support `C++` language for development, and you are welcome to continue to introduce contracts in other mainstream languages. 

- [Getting Started](/alaya-devdocs/zh-CN/Wasm_Getting_started) - Introduction to how to compile, publish and call WASM contracts on Alaya
- [Development Costs](/alaya-devdocs/zh-CN/Wasm_Development_costs) - The comparison between the transaction fee of the Wasm contract deployment and call on Alaya and the transaction fee on Ethereum
- [Best Practices](/alaya-devdocs/zh-CN/Wasm_Best_practices) - Introduction to how to set a reasonable transaction fee and how to avoid the deduction of the transaction fee due to transaction failure, etc.
- [Contract Library](/alaya-devdocs/zh-CN/Wasm_API)

### Front-end or back-end development

If you want to interact with the contract directly through the web front end, please refer to the following documents:

- [Samurai API](/alaya-devdocs/zh-CN/Samurai_API) - For web wallet development
- [JS SDK](/alaya-devdocs/zh-CN/JS_SDK) - How to use JS to interact with contracts or the Alaya network

If you want to interact with the contract or the Alaya network by writing back-end code, the following SDK in different languages can help:

- [JAVA SDK](/alaya-devdocs/zh-CN/Java_SDK)


### How to issue PRC Tokens?

Since Alaya inherits the EVM virtual machine, it can theoretically be compatible with all the tokens of the Ethereum standard protocol. Currently, the commonly used token protocols are [ARC-20](/alaya-devdocs/zh-CN/ARC20) and [ARC-721]( /alaya-devdocs/zh-CN/ARC721). 
