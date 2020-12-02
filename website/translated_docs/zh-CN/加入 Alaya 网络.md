---
id: Join_Alaya_NetWork
title: 加入 Alaya 网络
sidebar_label: 加入 Alaya 网络
---

## 简介

Alaya主网络将于北京时间2020年10月24日正式上线对外开放，ChainID为201018。



## 准备

在加入Alaya主网络前请确保服务器本地具备以下条件：

- 已经按照[安装一个节点](/alaya-devdocs/zh-CN/Install_Node)指引安装好Alaya节点并创建好节点密钥。

本章节假设服务器为 Ubuntu18.04，可执行文件所在工作目录为 `~/platon-node`，注意后续所有命令行操作均在工作目录下进行。



## 加入Alaya主网络

任何人、任何组织都可以加入 Alaya 主网络。

### 启动验证节点

执行以下命令即可启动验证节点加入Alaya主网络：

```bash
cd ~/platon-node/ && nohup platon --identity alaya-node --datadir ./data --port 16789 --alaya --rpcport 6789 --rpcapi "db,platon,net,web3,admin,personal" --rpc --nodekey ./data/nodekey --cbft.blskey ./data/blskey --verbosity 3 --rpcaddr 127.0.0.1 --syncmode "fast" > ./data/platon.log 2>&1 &
```

**提示：**

| **选项**       | **描述**                             |
| -------------- | ------------------------------------ |
| --identity     | 指定网络名称                         |
| --datadir      | 指定 data 目录路径                   |
| --rpcaddr      | 指定 rpc 服务器地址                  |
| --rpcport      | 指定 rpc 协议通信端口                |
| --rpcapi       | 指定节点开放的 rpcapi 名称           |
| --rpc          | 指定 http-rpc 通讯方式               |
| --nodekey      | 指定节点私钥文件                     |
| --cbft.blskey  | 指定节点 bls 私钥文件                |
| --alaya        | 指定连接到Alaya主网络                |
| --alayatestnet | 指定连接到Alaya测试网络              |
| --syncmode     | fast：快速同步模式，full：全同步模式 |
| –db.nogc       | 开启归档模式                         |

更多参数意义通过`platon --help`命令查看。

当 Alaya 启动成功后，正常情况下会通过节点发现协议自动和距离自己最近的节点建立连接，连接成功后会启动区块同步，所以判断加入网络是否成功可以通过查看节点的 peers 同时确认当前节点块高是否增长来判断。

如果没有预先生成密钥，节点在启动时自动在节点的data目录下生成。如果采用自动生成的形式，将只会生成节点私钥与 BLS 私钥，相关公钥不会自动生成。



### 进入`Alaya`控制台

```bash
platon attach http://localhost:6789
```



### 查看节点的  peers

```bash
admin.peers
```



### 查看当前块高

通过在`Alaya`控制台中执行以下命令查看当前节点的块高。

```bash
platon.blockNumber
```

节点列表中出现一系列Alaya网络节点并且块高在不断增长，则表示连接成功！（由于新节点需要同步，可能会存在延迟）

输入exit退出控制台。