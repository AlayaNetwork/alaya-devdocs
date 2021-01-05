---
id: Join_Alaya_NetWork
title: 加入 Alaya 网络
sidebar_label: 加入 Alaya 网络
---

## 简介

Alaya主网络将于北京时间2020年10月24日正式上线对外开放，ChainID为201018；另外一个是于北京时间 2021年1月15日正式上线的用来对开发者开放的Alaya测试网络，ChainID为201030。



## 准备

在加入Alaya主网络前请确保服务器本地具备以下条件：

- 已经按照[安装一个节点](/alaya-devdocs/zh-CN/Install_Node)指引安装好Alaya节点并创建好节点密钥。

本章节假设服务器为 Ubuntu18.04，可执行文件所在工作目录为 `~/platon-node`，注意后续所有命令行操作均在工作目录下进行。

如需要加入Alaya主网络，请参考[加入Alaya主网络](#加入alaya主网络)；如需要加入Alaya测试网络，请参考[加入Alaya测试网络](#加入alaya测试网络)；



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
                  "node":"enode://48f9ebd7559b7849f80e00d89d87fb92604c74a541a7d76fcef9f2bcc67043042dfab0cfbaeb5386f921208ed9192c403f438934a0a39f4cad53c55d8272e5fb@testnode1.alaya.network:16789",
                  "blsPubKey":"821043f4df086533691f0445deb51cf524f45ab7a855a3f1a79fa0f65ceb1cabd2674bbe4575c645dfbd878734ad0910568db5aebcd46bfd72d50c9007c1328559fb1e7de876990ab7c7d3bc7cb9e291da6fe28ba185de5fe7f99566de3b8381"
                },
                {
                  
                  "node":"enode://01bdfadca94b45250437d4c1be61a555381a05a0227257c4be1941b0b83692a98fe9fccb9e412509c3a0ad9cbcdb8de0cfafd57ab230bff1207313b7f99fa3e3@testnode2.alaya.network:16789",
                  "blsPubKey":"9a0e9a50bbaadbea9687710ae50f21daf734e7c66151728b948cc11514f483293487368eefd2057168814bef18b572054766a78c219b7d37967ed61cb75c8dea6e63e879972494950e30808092ef3f68ba5b5e252e8e4f270d702a1137128f90"
                },
                {
                  "node":"enode://a192ebbb32c0810d17b2b6bcef89761a6a4885bb2a73bc8d44563cd510e8ae64cd710d942b3f6aa504aeea1983c60ef030d743f0373c4dc813436435ca6dd2a7@testnode3.alaya.network:16789",
                  "blsPubKey":"0c13a22bc66da7502184b6561aaad3d48ce519dd4fa91cdd5c08b31973d273d1317e714f07f99996e6691c13e3c4e70cd9bc2b0c4bc9f1f8ef2ac7d9d0f35f8a508273d00334ae687fa81c8c54c6242c73b3e91016051c70e19923e2fb1f628f"
                },
                {
                  "node":"enode://c4d723c6a227346d5a8704e7bc65eb9eb8dc1022b8a90dc9bb276a6c3accb01513317404ff82fe439b0948bc1522147c413e61f6e1bc8b4233669286cf238f51@testnode4.alaya.network:16789",
                  "blsPubKey":"f641c5231a29987b1e03464ea81b408a1fddf885e35c0733bf4806b7b26d7d5a5d15c9dc1e5c43f8814912aa709e3615c081b61e7b984642a1029b3ce609ff16b04e90f93ebfeee3ad1b83c287d8dfa42439fdbaee92769a85a40b37c64d520f"
                }
              ],
              "amount": 10,
              "period": 20000,
              "validatorMode": "ppos"
          },
          "genesisVersion": 3584
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
              "unStakeFreezeDuration": 168,
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
  		   "zeroProduceFreezeDuration":56
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
              "increaseIssuanceRatio": 500,
  			"theNumberOfDelegationsReward":20
          },
          "restricting":{
              "minimum_release":80000000000000000000
          },
          "innerAcc":{
              "platonFundAccount": "atx1zpez9rfnttgkunjtdevr50tmckcscknnn20097",
              "platonFundBalance": 2500000000000000000000000,
              "cdfAccount": "atx1kwj9fldfqt65y4twy4lm3skddeu805dv6ca53d",
              "cdfBalance": 500000000000000000000000
          }
      },
      "nonce": "0x0376e56dffd12ab53bb149bda4e0cbce2b6aabe4cccc0df0b5a39e12977a2fcd23",
      "timestamp": "0x17538ac5720",
      "extraData": "0xd782070186706c61746f6e86676f312e3131856c696e757800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "gasLimit": "4712388",
      "alloc": {
          "atx1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr75cqxf": {
              "balance": "2000000000000000000000000"
          },
          "atx1suw7ycupkr3g0a6sch29tddfz7sg98svnqu5mn": {
              "balance": "100000000000000000000000000"
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
cd ~/platon-node/ && nohup platon --identity alaya-node --datadir ./data --port 16789 --rpcport 6789 --rpcapi "db,platon,net,web3,admin,personal" --rpc --nodekey ./data/nodekey --cbft.blskey ./data/blskey --verbosity 1 --rpcaddr 127.0.0.1 --bootnodes enode://48f9ebd7559b7849f80e00d89d87fb92604c74a541a7d76fcef9f2bcc67043042dfab0cfbaeb5386f921208ed9192c403f438934a0a39f4cad53c55d8272e5fb@testnode1.alaya.network:16789 --syncmode "fast" > ./data/platon.log 2>&1 &
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