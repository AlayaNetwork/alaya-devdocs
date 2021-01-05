---
id: Join_Alaya_NetWork
title: 加入 Alaya 网络
sidebar_label: 加入 Alaya 网络
---

## 简介

Alaya主网络将于北京时间2020年10月24日正式上线对外开放，ChainID为201018；另外一个是于北京时间 2021年1月15日正式上线的用来对开发者开放的Alaya测试网络，ChainID待定。



## 准备

在加入Alaya主网络前请确保服务器本地具备以下条件：

- 已经按照[安装一个节点](/alaya-devdocs/zh-CN/Install_Node)指引安装好Alaya节点并创建好节点密钥。

本章节假设服务器为 Ubuntu18.04，可执行文件所在工作目录为 `~/platon-node`，注意后续所有命令行操作均在工作目录下进行。

如需要加入Alaya主网络，请参考[加入Alaya主网络](#加入Alaya主网络)；如需要加入Alaya测试网络，请参考[加入Alaya测试网络](#加入Alaya测试网络)；



## 加入Alaya主网络

任何人、任何组织都可以加入 Alaya 主网络。

### 启动验证节点

执行以下命令即可启动验证节点加入Alaya主网络：

```bash
cd ~/platon-node/ && nohup platon --identity alaya-node --datadir ./data --port 16789 --alaya --rpcport 6789 --rpcapi "db,platon,net,web3,admin,personal" --rpc --nodekey ./data/nodekey --cbft.blskey ./data/blskey --verbosity 1 --rpcaddr 127.0.0.1 --syncmode "fast" > ./data/platon.log 2>&1 &
```

**提示：**

| **选项**       | **描述**                                                     |
| -------------- | ------------------------------------------------------------ |
| --identity     | 指定网络名称                                                 |
| --datadir      | 指定 data 目录路径                                           |
| --port         | p2p端口号                                                    |
| --rpcaddr      | 指定 rpc 服务器地址                                          |
| --rpcport      | 指定 rpc 协议通信端口                                        |
| --rpcapi       | 指定节点开放的 rpcapi 名称                                   |
| --rpc          | 指定 http-rpc 通讯方式                                       |
| --nodekey      | 指定节点私钥文件                                             |
| --cbft.blskey  | 指定节点 bls 私钥文件                                        |
| --verbosity    | 日志级别，0: CRIT;  1: ERROR； 2: WARN;  3: INFO;  4: DEBUG； 5: TRACE |
| --alaya        | 指定连接到Alaya主网络                                        |
| --alayatestnet | 指定连接到Alaya测试网络                                      |
| --syncmode     | fast：快速同步模式，full：全同步模式                         |
| –db.nogc       | 开启归档模式                                                 |

更多参数意义通过`platon --help`命令查看。

## 加入Alaya测试网络

任何人、任何组织都可以加入 Alaya 测试网络。

### 初始化创世区块

- 保存创世区块文件

  将如下内容保存到platon.json文件中：

  ```json
  {
      "config": {
          "chainId": 201030,
          "eip155Block": 3,
          "cbft": {
              "initialNodes": [
                {
                      "node":"enode://4fcc251cf6bf3ea53a748971a223f5676225ee4380b65c7889a2b491e1551d45fe9fcc19c6af54dcf0d5323b5aa8ee1d919791695082bae1f86dd282dba4150f@0.0.0.0:16789",
                      "blsPubKey":"d341a0c485c9ec00cecf7ea16323c547900f6a1bacb9daacb00c2b8bacee631f75d5d31b75814b7f1ae3a4e18b71c617bc2f230daa0c893746ed87b08b2df93ca4ddde2816b3ac410b9980bcc048521562a3b2d00e900fd777d3cf88ce678719"
                }
              ],
              "amount": 10,
              "period": 10000,
              "validatorMode": "ppos"
          },
          "genesisVersion": 3328
      },
      "economicModel":{
          "common":{
              "maxEpochMinutes":360,
              "maxConsensusVals":25,
              "additionalCycleTime":525960
          },
          "staking":{
              "stakeThreshold": 10000000000000000000000,
              "operatingThreshold": 1000000000000000000,
              "maxValidators": 101,
              "unStakeFreezeDuration": 8,
              "rewardPerMaxChangeRange": 500,
              "rewardPerChangeInterval": 10
          },
          "slashing":{
             "slashFractionDuplicateSign": 10,
             "duplicateSignReportReward": 50,
             "maxEvidenceAge":7,
             "slashBlocksReward":250,
             "zeroProduceCumulativeTime":30,
             "zeroProduceNumberThreshold":1,
             "zeroProduceFreezeDuration":7
          },
           "gov": {
              "versionProposalVoteDurationSeconds": 1209600,
              "versionProposalSupportRate": 6670,
              "textProposalVoteDurationSeconds": 1209600,
              "textProposalVoteRate": 5000,
              "textProposalSupportRate": 6670,          
              "cancelProposalVoteRate": 5000,
              "cancelProposalSupportRate": 6670,
              "paramProposalVoteDurationSeconds": 1209600,
              "paramProposalVoteRate": 5000,
              "paramProposalSupportRate": 6670      
          },
          "reward":{
              "newBlockRate": 50,
              "platonFoundationYear": 2,
              "increaseIssuanceRatio": 500
          },
          "innerAcc":{
              "platonFundAccount": "atx10spacq8cz76y2n60pl7sg5yazncmjuus7n6hw2",
              "platonFundBalance": 0,
              "cdfAccount": "atx17tfkaghs4vded6mz6k53xyv5cvqsl63h5gq7cw",
              "cdfBalance": 4000000000000000000000000
          }
      },
      "nonce": "0x0376e56dffd12ab53bb149bda4e0cbce2b6aabe4cccc0df0b5a39e12977a2fcd23",
      "timestamp": "0x5bc94a8a",
      "extraData": "0xd782070186706c61746f6e86676f312e3131856c696e757800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "gasLimit": "4712388",
      "alloc": {
          "atx1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr75cqxf": {
              "balance": "1000000000000000000000000"
          },
          "atx1zkrxx6rf358jcvr7nruhyvr9hxpwv9unj58er9": {
              "balance": "9718188019000000000000000000"
          }
      },
      "number": "0x0",
      "gasUsed": "0x0",
      "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
  }
  ```

  

- 初始化创世区块文件

  执行命令：

  ```shell
  cd ~/platon-node && platon --datadir ./data init platon.json
  ```

  > 说明：
  >
  > 出现`Successfully wrote genesis state`相关提示说明初始化创世信息完成。

  

### 启动验证节点

执行以下命令即可启动验证节点加入Alaya测试网络：

```shell
cd ~/platon-node/ && nohup platon --identity alaya-node --datadir ./data --port 16789 --rpcport 6789 --rpcapi "db,platon,net,web3,admin,personal" --rpc --nodekey ./data/nodekey --cbft.blskey ./data/blskey --verbosity 1 --rpcaddr 127.0.0.1 --syncmode "fast" > ./data/platon.log 2>&1 &
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