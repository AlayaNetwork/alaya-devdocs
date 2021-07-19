---
id: Development_guide
title: 开发指南
sidebar_label: 开发指南
---

Alaya兼容EVM和WASM虚拟机，因此开发者可以使用更多高级语言来编写合约。这大大降低了编写合约的学习门槛，同时提高了处理合约交易的性能。该章节的文档可以帮助开发者在Alaya网络上快速编写、部署、调试合约，并基于合约开发各类Dapp应用。

## 什么是Dapp?

Dapp，即Decentralized Application，是构建在区块链上的去中心化应用程序。

## 如何开发Dapp?

从开发者角度出发，Dapp应用本质上是和合约交互的一个过程。可以通过web端直接调用合约，也可以通过SDKs和合约交互。整个开发过程大致分为开发环境准备、合约开发、前端和后台开发三大过程。

### 开发环境准备

你可以根据开发需要，选择以下几种环境协助开发和测试。

- [私有网络](/alaya-devdocs/zh-CN/Private_network) - 在本地搭建一个私有节点或者网络，可以帮助你快速开发调试本地应用。
- [开发网络](/alaya-devdocs/zh-CN/Join_the_dev_network) - 接入到开发网络可以帮助在较为开放的环境测试你的代码。

### 合约开发

#### 开发工具

- [Alaya-Truffle](/alaya-devdocs/zh-CN/Alaya-Truffle) - 一个支持 WASM 和 Solidity 的合约开发框架。
- [IDE](/alaya-devdocs/zh-CN/IDE) - 一个支持 WASM 和Solidtiy 的界面化合约开发工具。
 
#### Solidity 合约开发

- [开发入门](/alaya-devdocs/zh-CN/Solidity_Getting_started) - 你可以了解如何在Alaya网络部署、编译、发布、调用合约
- [最佳实践](/alaya-devdocs/zh-CN/Solidity_Best_practices) - 对于如何合理设置手续费，如何规避因交易失败扣除手续费等合约编写规范的介绍
- [开发成本](/alaya-devdocs/zh-CN/Solidity_Development_costs) - 介绍在Alaya上Solidity合约部署调用的手续费成本以及和以太坊手续费的对比分析
- [安全指南](/alaya-devdocs/zh-CN/Solidity_Contract_security) - 介绍如何提高合约的安全性
- [合约迁移](/alaya-devdocs/zh-CN/Solidity_Migration_tutorial) - 除了自己编写合约，你也可以从以太坊或其他支持Solidity合约的公链上迁移合约到Alaya网络

#### WASM 合约开发

WASM合约目前只支持`C++`语言开发，也欢迎大家继续扩展其他主流语言的合约。

- [开发入门](/alaya-devdocs/zh-CN/Wasm_Getting_started) - 介绍如何在 Alaya 上编译发布调用 WASM 合约 
- [开发成本](/alaya-devdocs/zh-CN/Wasm_Development_costs) - 介绍在 Alaya 上 Wasm 合约部署调用的手续费成本以及和以太坊手续费的对比分析
- [最佳实践](/alaya-devdocs/zh-CN/Wasm_Best_practices) - 对于如何合理设置手续费，如何规避因交易失败扣除手续费等合约编写规范的介绍
- [合约库](/alaya-devdocs/zh-CN/Wasm_API)

### 前端或后台开发

如果你想直接通过Web前端与合约直接交互，请参考以下文档：
- [Samurai API](/alaya-devdocs/zh-CN/Samurai_API) - 提供 Web 钱包开发支持
- [JS SDK](/alaya-devdocs/zh-CN/JS_SDK) - 如何使用JS与合约或 Alaya 网络进行交互

如果你想通过编写后端代码来和合约或Alaya网络进行交互，以下不同语言的 SDK 可以提供帮助：
- [JAVA SDK](/alaya-devdocs/zh-CN/Java_SDK)


### 如何发布PRC Token？

由于Alaya继承了EVM虚拟机，理论上可以兼容所有以太坊标准协议的 Token ，目前常用的 Token 协议有 [ARC-20](/alaya-devdocs/zh-CN/ARC20)和[ARC-721](/alaya-devdocs/zh-CN/ARC721).

