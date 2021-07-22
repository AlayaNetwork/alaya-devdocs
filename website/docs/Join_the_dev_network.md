---
id: Join_the_dev_network
title: Join the dev network
sidebar_label: Join the dev network
---


This article will introduce how to debug local applications by connecting to the `Alaya` development network. 

> Note: The `ChainId` of the Alaya mainnet is 201018; the `ChainId` of the development network is 201030. 

## How to connect to the development network to debug local applications? 

Alaya Development Network has opened the following RPC ports to developers.

```
RPC Address：http://47.241.91.2:6789
```

#### Access to the development network through local programs

On the ubuntu18.04 server, download and install the Alaya binary file with the following command:

```
sudo wget https://download.alaya.network/alaya/platon/0.16.0/alaya -P /usr/bin    
```

Connect to the development network by the following method:

```
alaya attach http://47.241.91.2:6789
```

#### Connect to Alaya development network through SDK

- Use [Java SDK](/alaya-devdocs/zh-CN/Java_SDK) to connect to the development network, for example:

```
Web3j platonWeb3j = Web3j.build(new HttpService("http://47.241.91.2:6789"));
```

- Use [JS SDK](/alaya-devdocs/zh-CN/JS_SDK) to access the development network, for example:

```
var Web3 = require('web3');
var web3 = new Web3('http://47.241.91.2:6789');
```

- Use [JSON RPC](/alaya-devdocs/zh-CN/Json_Rpc) to access the development network, for example: 

```
curl -X POST -H 'content-type: application/json' --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 47.241.91.2:6789
```

You can also access the network through SDKs in other languages than in the above. 

### Token Receive the development network test token at the faucet

Click [Faucet](https://faucet.alaya.network/faucet/?id=f93426c0887f11eb83b900163e06151c) to receive the test token. If you need a large number of test tokens, please send an email to support@latticex.foundation in the following format: 

```
 Title: Alaya Development Network Test Token Application
 Name:
 Contact details:
 WeChat ID (or other instant messaging software):
 Application amount:
 Usage:
 Account receivable:
 Remarks: 
```

After successfully accessing the development network, you can send the transaction after receiving the test token, and start testing. You can check the transaction in the [development network explorer](https://devnetscan.alaya.network).
