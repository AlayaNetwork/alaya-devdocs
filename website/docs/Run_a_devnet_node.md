---
id: Run_a_dev_node
title: Run a dev node
sidebar_label: Run a dev node
---

## Introduction

The Alaya development network has the same functions as the mainnet, and may be more advanced in version. It can be used for testing before the mainnet launch, and it can also provide developers or nodes with a development and testing environment. 

This section describes how to become a validator in the development network.

## Install full node of the development network

Follow the instructions of [Full Node Deployment](/alaya-devdocs/en/Run_a_fullnode/) to install the Alaya Development Network node and complete the synchronization.

## Stake to be a validator

Operation in this part is almost the same as the operation in [Become a Validator](/alaya-devdocs/en/Become_Validator/). The only difference is that Mtool uses version 0.16.2 ([download link](https://download.alaya.network/alaya/mtool/linux/0.16.2/alaya_mtool.zip)), and you need to modify the `chainId` in the configuration file `$ALAYA_MTOOLDIR/config.properties` to the development network chain ID: 201030.

## Develop the network faucet

If you need test `ATP` on the development network, you need to receive it through the faucet at https://faucet.alaya.network/faucet/> 

> **Reminder**: The ATP on the development network has no actual value and is only used for development and testing! 

If you need a large amount of testn ATP, such as creating a validator for the development network, please send an email to [support@latticex.foundation](mailto:support@latticex.foundation) in the following format: 

```
 Title: Alaya Test Token Application
 Name:
 Contact details:
 WeChat ID (or other instant messaging software):
 Application amount:
 Usage:
 Account receivable:
 Remarks:
```

