---
id: Join_the_dev_network
title: 开发网络
sidebar_label: 开发网络
---

本文将介绍如何通过连接`Alaya`开发网来调试本地应用程序。
> 注：Alaya主网的`ChainId`为201018；开发网络的`ChainId`为201030。

## 如何接入开发网调试本地应用？

Alaya开发网开放了如下RPC端口可以供开发者使用。
```
RPC地址：http://47.241.91.2:6789 以及 ws://47.241.91.2:6790
```
#### 通过本地程序接入开发网

在ubuntu18.04服务器上，通过以下命令下载并安装Alaya二进制文件:
```
sudo wget https://download.alaya.network/alaya/platon/0.16.0/alaya -P /usr/bin    
```
通过以下方式连接入开发网：
```
alaya attach http://47.241.91.2:6789
```

#### 通过SDK连接入Alaya开发网

- 使用[Java SDK](/alaya-devdocs/zh-CN/Java_SDK)连接入开发网络，示例如下：
```
Web3j platonWeb3j = Web3j.build(new HttpService("http://47.241.91.2:6789"));
```
- 使用[JS SDK](/alaya-devdocs/zh-CN/JS_SDK)接入开发网，示例如下：
```
var Web3 = require('web3');
var web3 = new Web3('http://47.241.91.2:6789');
```
- 使用[JSON RPC](/alaya-devdocs/zh-CN/Json_Rpc)接入开发网，示例如下：
```
curl -X POST -H 'content-type: application/json' --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 47.241.91.2:6789
```

不局限于以上语言的SDK，你也通过其他语言的SDK接入。

### 在水龙头领取开发网测试Token

点击[水龙头](https://faucet.alaya.network/faucet/?id=f93426c0887f11eb83b900163e06151c)领取测试Token。如果你有大额的测试Token需求，请用以下格式发送邮件到support@latticex.foundation：
```
 标题：Alaya开发网测试Token申请
 姓名：
 联系方式：
 微信号（或其他即时通讯软件）：
 申请金额：
 用途：
 收款账户：
 备注：
```
成功接入开发网后，完成测试Token领取后即可发送交易，开始你测试之旅，并可以在[开发网浏览器](https://devnetscan.alaya.network)查询的交易。
