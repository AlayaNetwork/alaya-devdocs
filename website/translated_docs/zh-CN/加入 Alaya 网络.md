---
id: Join_Alaya_NetWork
title: 加入 Alaya 网络
sidebar_label: 加入 Alaya 网络
---

## 简介

Alaya主网络已于北京时间2020年10月24日正式上线对外开放，ChainID为201018；另外一个是用来对开发者开放的Alaya开发网络，ChainID为201030。



## 准备

在加入Alaya主网络前请确保服务器本地具备以下条件：

- 已经按照[安装一个节点](/alaya-devdocs/zh-CN/Install_Node)指引安装好Alaya节点并创建好节点密钥。

本章节假设服务器为 Ubuntu18.04，可执行文件所在工作目录为 `~/platon-node`，注意后续所有命令行操作均在工作目录下进行。

如需要加入Alaya主网络，请参考[加入Alaya主网络](#加入alaya主网络)；如需要加入Alaya开发网络，请参考[加入Alaya开发网络](#加入alaya开发网络)；



## 加入Alaya主网络

任何人、任何组织都可以加入 Alaya 主网络。

### 启动验证节点

执行以下命令即可启动验证节点加入Alaya主网络：

```bash
cd ~/platon-node/ && nohup platon --identity alaya-node --datadir ./data --port 16789 --alaya --rpcport 6789 --rpcapi "db,platon,net,web3,admin,personal" --rpc --nodekey ./data/nodekey --cbft.blskey ./data/blskey --verbosity 1 --rpcaddr 127.0.0.1 --syncmode "fast" > ./data/platon.log 2>&1 &
```

**提示：**

| **选项**      | **描述**                                                     |
| ------------- | ------------------------------------------------------------ |
| --identity    | 指定网络名称                                                 |
| --datadir     | 指定 data 目录路径                                           |
| --port        | p2p端口号                                                    |
| --rpcaddr     | 指定 rpc 服务器地址                                          |
| --rpcport     | 指定 rpc 协议通信端口                                        |
| --rpcapi      | 指定节点开放的 rpcapi 名称                                   |
| --rpc         | 指定 http-rpc 通讯方式                                       |
| --nodekey     | 指定节点私钥文件                                             |
| --cbft.blskey | 指定节点 bls 私钥文件                                        |
| --verbosity   | 日志级别，0: CRIT;  1: ERROR； 2: WARN;  3: INFO;  4: DEBUG； 5: TRACE |
| --alaya       | 指定连接到Alaya主网络                                        |
| --syncmode    | fast：快速同步模式，full：全同步模式                         |
| –db.nogc      | 开启归档模式                                                 |

更多参数意义通过`platon --help`命令查看。

## 加入Alaya开发网络

开发网为开发者或节点提供开发测试环境。可能出现不稳定，网络重置的情况。开发网络目前版本为0.15.1。

### 开发网络相关资源

>- platon：https://download.alaya.network/alaya/platon/0.15.1/platon
>
>- alayakey：https://download.alaya.network/alaya/platon/0.15.1/alayakey
>
>- mtool windows：https://download.alaya.network/alaya/mtool/windows/0.15.1/alaya_mtool.exe
>
>- mtool linux：https://download.alaya.network/alaya/mtool/linux/0.15.1/alaya_mtool.zip
>
>  > 需要修改配置文件config.properties中的链ID为开发网络链ID：201030
>
>- samurai：https://github.com/AlayaNetwork/Samurai/raw/develop/devnet/samurai-devnet-chrome-8.0.11.zip
>
>- 开放RPC URL：http://47.241.91.2:6789
>
>- scan浏览器地址：https://devnetscan.alaya.network



### 初始化创世区块

- 保存创世区块文件

  下载创世区块文件genesis.json：

  ```bash
  cd ~/platon-node && wget https://download.alaya.network/alaya/platon/0.15.1/genesis.json
  ```
  
  
  
- 初始化创世区块文件

  执行命令：

  ```bash
  cd ~/platon-node && platon --datadir ./data init genesis.json
  ```

  > 说明：
  >
  > 出现`Successfully wrote genesis state`相关提示说明初始化创世信息完成。

  

### 启动验证节点

请参考[安装一个节点](/alaya-devdocs/zh-CN/Install_Node)章节先创建节点密钥：nodekey、blskey，然后执行以下命令即可启动验证节点加入Alaya开发网络；如果需要成为验证节点，请通过后续说明方式申请大额测试ATP（开发网将根据测试需要不定期重置，开发网ATP无任何实际价值）。

```shell
cd ~/platon-node/ && nohup platon --identity alaya-node --datadir ./data --port 16789 --rpcport 6789 --rpcapi "db,platon,net,web3,admin,personal" --rpc --nodekey ./data/nodekey --cbft.blskey ./data/blskey --verbosity 1 --rpcaddr 127.0.0.1 --bootnodes enode://48f9ebd7559b7849f80e00d89d87fb92604c74a541a7d76fcef9f2bcc67043042dfab0cfbaeb5386f921208ed9192c403f438934a0a39f4cad53c55d8272e5fb@devnetnode1.alaya.network:16789 --syncmode "fast" > ./data/platon.log 2>&1 &
```



### 其他

如果您有领取大额测试ATP的需求，请您按照格式要求发送邮件至：support@latticex.foundation，邮件要求：

```toml
 标题：Alaya测试网Token申请
 姓名：
 联系方式：
 微信号（或其他即时通讯软件）：
 申请金额：
 用途：
 收款账户：
 备注：
```



## 查看节点状态

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