---
id: Private_network
title: 私有网络
sidebar_label: 私有网络
---

## 概述

本文档描述了如何快速部署个人私有区块链，需要有一定开发/运维基础。

- 在搭建私链之前，需要编译二进制文件，可以参考[安装Alaya文档](/alaya-devdocs/zh-CN/Install_Alaya)。

- 私链部署方法以Ubuntu为例，包括单节点和集群部署，Windows上的部署方法和Ubuntu类似。

如果你不方便连接到外部网络，也可以选择搭建自己的私有网络。`Alaya`支持单节点模式和集群模式运行私有网络。以Ubuntu环境为例，假设节点数据目录为：`~/alaya-node/data` (用户可自行调整)，进行说明：

## 单节点私有网络

### 生成nodekey和blskey等相关文件

```shell
mkdir -p ~/alaya-node/data \ 
    && alayakey genkeypair | tee >(grep "PrivateKey" | awk '{print $2}' > ~/alaya-node/data/nodekey) >(grep "PublicKey" | awk '{print $3}' > ~/alaya-node/data/nodeid) \ 
    && alayakey genblskeypair | tee >(grep "PrivateKey" | awk '{print $2}' > ~/alaya-node/data/blskey) >(grep "PublicKey" | awk '{print $3}' > ~/alaya-node/data/blspub)
```

>说明：
>
>- nodeid：节点公钥(ID）文件，保存节点的公钥，用于标识节点身份
>- nodekey：节点私钥文件，保存节点的私钥，不能公开并且需要做好备份。
>- blspub：节点BLS公钥文件，保存节点的BLS公钥，用于共识协议中快速验证签名。
>- blskey：节点BLS私钥文件，保存节点的BLS私钥，不能公开并且需要做好备份。

### 创建创世钱包

```shell
mkdir -p ~/alaya-node/data && alaya --datadir ~/alaya-node/data account new {wallet_name}
```

> Your new account is locked with a password. Please give a password. Do not forget this password.
>
> Passphrase:
>
> Repeat passphrase:
>
> main net Address: atp16h5jr7t72das7jdtctsumzugygt55mvapqqvzp
> other net Address: atx16h5jr7t72das7jdtctsumzugygt55mvatxux3t
>
> 注意：
>
> 钱包文件和口令对于生成的该账户地址非常重要，丢失钱包文件或者忘记口令都将导致该账户内的令牌丢失，请对钱包文件做好备份并牢记口令。

### 编辑创世块配置文件

在~/alaya-node目录下创建创世区块配置文件`alaya.json`

```json
{
    "config": {
        "chainId": 201030,
        "eip155Block": 3,
        "cbft": {
            "initialNodes": [{
                "node": "enode://4fcc251cf6bf3ea53a748971a223f5676225ee4380b65c7889a2b491e1551d45fe9fcc19c6af54dcf0d5323b5aa8ee1d919791695082bae1f86dd282dba4150f@127.0.0.1:16789",
                "blsPubKey": "d341a0c485c9ec00cecf7ea16323c547900f6a1bacb9daacb00c2b8bacee631f75d5d31b75814b7f1ae3a4e18b71c617bc2f230daa0c893746ed87b08b2df93ca4ddde2816b3ac410b9980bcc048521562a3b2d00e900fd777d3cf88ce678719"
            }],
            "amount": 10,
            "period": 20000,
            "validatorMode": "ppos"
        },
        "addressHRP": "atx",
        "genesisVersion": 3328
    },
    "economicModel": {
        "common": {
            "maxEpochMinutes": 360,
            "maxConsensusVals": 25,
            "additionalCycleTime": 525960
        },
        "staking": {
            "stakeThreshold": 10000000000000000000000,
            "operatingThreshold": 1000000000000000000,
            "maxValidators": 101,
            "unStakeFreezeDuration": 8,
            "rewardPerMaxChangeRange": 500,
            "rewardPerChangeInterval": 10
        },
        "slashing": {
            "slashFractionDuplicateSign": 10,
            "duplicateSignReportReward": 50,
            "maxEvidenceAge": 7,
            "slashBlocksReward": 250,
            "zeroProduceCumulativeTime": 30,
            "zeroProduceNumberThreshold": 1,
            "zeroProduceFreezeDuration": 7
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
        "reward": {
            "newBlockRate": 50,
            "platonFoundationYear": 2,
            "increaseIssuanceRatio": 500
        },
        "innerAcc": {
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

修改 `your-node-pubkey` 为之前生成的***节点公钥(nodeid)***，`your-node-blspubkey` 为 ***节点bls公钥(blspub)***，`your-account-address`为创建钱包的地址（可以配置多个初始账户）：

```txt
# 此处为片段
...
    "cbft": {
    "initialNodes": [{
        "node": "enode://your-node-pubkey@127.0.0.1:16789",
        "blsPubKey": "your-node-blspubkey"
    }],
...
    "alloc": {
      "your-account-address": {
            "balance": "999000000000000000000"
      }
    },
...
```

### 初始化创世区块

```bash
cd ~/alaya-node && alaya --datadir ./data init alaya.json
```

>说明：
>
>出现`Successfully wrote genesis state`相关提示说明初始化创世信息完成。

### 启动节点

一般情况下，alaya 进程一直在前台进行，这样我们就不能进行其他操作了，并且如果中途退出该终端，程序将退出。Ubuntu下可以以nohup方式启动程序：

```bash
cd ~/alaya-node && nohup alaya --identity "alaya" --datadir ./data --port 16789 --rpcaddr 127.0.0.1 --rpcport 6789 --rpcapi "db,platon,net,web3,admin,personal" --rpc --nodiscover --nodekey ./data/nodekey --cbft.blskey ./data/blskey & > ./data/alaya.log 2>&1 &
```

当shell中提示nohup成功后再按下一次回车，确保不会因为误关闭终端引起进程退出。

### 检查节点运行状态

```shell
alaya attach http://localhost:6789 --exec alaya.blockNumber
```

多执行几次上面的命令，如果块高一直在增长，表示单节点私链部署成功。

## Alaya集群私有网络

`Alaya集群私有网络`是有多节点参与的网络环境，这里我们假设你已经可以构建Alaya单节点。并且，我们将在一台服务器构建两个节点组成的网络。更多的节点在操作流程上类似。

为了在本地运行Alaya多节点，你要确保：

- 每个节点实例拥有单独的data目录（--datadir）
- 每个实例运行在不同的端口上，不管是p2p端口还是rpc端口（--port and --rpcport ）
- 节点可以彼此互连
- RPC服务器端口不被占用

### 创建目录

> 我们下面以两节点集群为例

在alaya-node目录下创建目录data0和data1，作为两个节点的数据目录。分别生成两个节点的coinbase账户。

```shell
mkdir -p ~/alaya-node/data0 ~/alaya-node/data1
```

### 生成密钥对

分别将2个节点的nodekey和blskey保存到'data0'和'data1'

```bash
cd ~/alaya-node/data0 \
    && alayakey genkeypair | tee >(grep "PrivateKey" | awk '{print $2}' > ./nodekey) >(grep "PublicKey" | awk '{print $3}' > ./nodeid) \ 
    && alayakey genblskeypair | tee >(grep "PrivateKey" | awk '{print $2}' > ./blskey) >(grep "PublicKey" | awk '{print $3}' > ./blspub)

cd ~/alaya-node/data1 \
    && alayakey genkeypair | tee >(grep "PrivateKey" | awk '{print $2}' > ./nodekey) >(grep "PublicKey" | awk '{print $3}' > ./nodeid) \
    && alayakey genblskeypair | tee >(grep "PrivateKey" | awk '{print $2}' > ./blskey) >(grep "PublicKey" | awk '{print $3}' > ./blspub)
```

### 编辑创世配置文件

修改创世块配置文件`alaya.json`。模版文件参照单节点模板。

将两个节点的节点信息加入 `initialNodes` 数组中，因为我们生成的是两个节点组成的集群环境，所以数组长度为2。
需要修改`alaya.json`文件：
请将以下文件内容`node0-nodekey`、`node1-nodekey`、`node0-blspubkey`和`node1-blspubkey`分别替换为上一步生成的节点公钥和节点bls公钥。
`your-account-address`替换为钱包地址（可以配置多个初始账户）。

```json
# 此处为片段
...
  "cbft": {
  "initialNodes": [{
        "node": "enode://node0-pubkey@127.0.0.1:16789",
        "blsPubKey": "node0-blspubkey"
    },{
        "node": "enode://node1-pubkey@127.0.0.1:16790",
        "blsPubKey": "node1-blspubkey"
    }],
...
  "alloc": {
    "your-account-address": {
        "balance": "999000000000000000000"
    }
  },
...
```

### 初始化和启动

分别为节点0和节点1初始化创世块信息：

```bash
alaya --datadir ~/alaya-node/data0 init alaya.json && alaya --datadir ~/alaya-node/data1 init alaya.json
```

初始化成功后，分别用nohup方式启动节点0和节点1：

```bash
cd ~/alaya-node && nohup alaya --identity "alaya0" --datadir ./data0 --port 16789 --rpcaddr 0.0.0.0 --rpcport 6789 --rpcapi "db,platon,net,web3,admin,personal" --rpc --nodiscover --nodekey ./data0/nodekey --cbft.blskey ./data0/blskey > ./data0/alaya.log 2>&1 &

cd ~/alaya-node && nohup alaya --identity "alaya1" --datadir ./data1 --port 16790 --rpcaddr 0.0.0.0 --rpcport 6790 --rpcapi "db,platon,net,web3,admin,personal" --rpc --nodiscover --nodekey ./data1/nodekey --cbft.blskey ./data1/blskey  > ./data1/alaya.log 2>&1 &
```

### 检查

通过前面所述的方式进入任意一个节点alaya控制台，查看节点是否和对端建立连接以及通过查看blockNumber是否在持续增长来判断集群是否已成功启动。

```shell
alaya attach http://localhost:6789 --exec platon.blockNumber
alaya attach http://localhost:6790 --exec platon.blockNumber
```

多执行几次，观察块高的增长情况。
