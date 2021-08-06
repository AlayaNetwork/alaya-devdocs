---
id: Run_a_fullnode
title: 全节点部署
sidebar_label: 全节点部署
---

## 简介

该指引将介绍如何在`Linux`环境下安装`Alaya`节点软件，并开始同步数据。

## 环境要求

- CPU：4 核
- 内存：8G
- 磁盘：> 100G

## 安装概述

通常来说，安装一个新节点需要通过三到四个步骤（取决于您的操作系统），安装步骤将会详细地在下面列出来：

> **本例示范在 Ubuntu（18.04）环境下使用普通用户进行安装**

## 安装并运行 NTP 服务

```bash
sudo apt-get update &&
sudo apt-get install -y gnupg2 curl software-properties-common ntp &&
sudo systemctl enable ntp && sudo systemctl start ntp

# 验证 NTP 时间同步
ntpq -4c rv | grep leap_none
```

> 备注：
>
> NTP 服务用于时间同步，系统时间不正确将会影响 Alaya 节点正常运行
> 显示 **associd=0 status=0615 <font color="red">leap_none</font> , sync_ntp, 1 event, clock_sync，**其中 leap_none 为红色，表示 NTP 时间同步正常。

## 安装 Alaya 文件

当前网络所使用版本和网络ID如下：

| **网络**   | **ChainID** | **当前版本** |
| ------ | ------- | -------- |
| 主网   | 201018  | 0.16.0   |
| 开发网 | 201030  | 0.16.0   |

```bash
# 如果需要加入开发网，请修改PLATON_VERSION，如：0.16.0
export PLATON_VERSION=0.16.0
sudo wget https://download.alaya.network/alaya/platon/${PLATON_VERSION}/alaya -P /usr/bin
sudo wget https://download.alaya.network/alaya/platon/${PLATON_VERSION}/alayakey -P /usr/bin
sudo chmod +x /usr/bin/alaya  /usr/bin/alayakey
alaya version
```

执行完上述命令后，`alaya`和`alayakey`二进制就已经成功安装到您系统上的`/usr/bin`目录里，您可以在任何目录执行相关命令。

## 创建节点密钥

### 节点公私钥

每个节点在网络中都有一个唯一的身份标识以便彼此区分，这个身份标识是一个公私钥对，可以在节点工作目录（如`~/alaya-node`）下通过以下命令生成：

```bash
mkdir -p ~/alaya-node/data && alayakey genkeypair | tee >(grep "PrivateKey" | awk '{print $2}' > ~/alaya-node/data/nodekey) >(grep "PublicKey" | awk '{print $3}' > ~/alaya-node/data/nodeid)
```

> 示例输出：
> PrivateKey: 002925955b165bd33be1d97082df17cd269f10e6f5142f77e2605ed591d314bf
> PublicKey : 064a22d0bbf537125f1beeab0efcf77b0a62680d44f5b66a2d12574b159601e662edbb6b57aea5eafabbff8ba5157ef613fe4b176cb8d97ea4951b6815748973

其中`PrivateKey`是节点的私钥，`PublicKey`是节点的公钥，公钥用于标识节点身份，可以被公开出去，私钥不能公开并且需要做好备份。

同时会在节点工作目录下的子目录`data`中生成两个文件：

- `nodeid` 节点公钥(ID）文件，保存节点的公钥。
- `nodekey` 节点私钥文件，保存节点的私钥。

### 节点 BLS 公私钥

Alaya 节点除了需要节点公私钥外还需要一种被称为 BLS 公私钥的密钥对，这个密钥对在共识协议中将被使用，密钥对可以在节点工作目录（如`~/alaya-node`）下通过以下命令生成：

```bash
mkdir -p ~/alaya-node/data && alayakey genblskeypair | tee >(grep "PrivateKey" | awk '{print $2}' > ~/alaya-node/data/blskey) >(grep "PublicKey" | awk '{print $3}' > ~/alaya-node/data/blspub)
```

> 示例输出：
> PrivateKey: f22a785c80bd1095beff1f356811268eae6c94abf0b2b4e2d64918957b74783e
> PublicKey : 4bf873a66df92ada50a8c6bacb132ffd63437bcde7fd338d2d8696170034a6332e404ac3abb50326ee517ec5f63caf12891ce794ed14f8528fa7c54bc0ded7c5291f708116bb8ee8adadf1e88588866325d764230f4a45929d267a9e8f264402

其中`PrivateKey`是节点的 BLS 私钥，`PublicKey`是节点的 BLS 公钥，BLS 公钥用于共识协议中快速验证签名，可以被公开出去，BLS 私钥不能公开并且需要做好备份。

同时会在节点工作目录下的子目录`data`中生成两个文件：

- `blspub` 节点 BLS 公钥文件，保存节点的 BLS 公钥。
- `blskey` 节点 BLS 私钥文件，保存节点的 BLS 私钥。

## 运行全节点

Alaya主网络已于北京时间2020年10月24日正式上线对外开放，ChainID为201018；另外一个是用来对开发者开放的Alaya开发网络，ChainID为201030。

如需要加入Alaya主网络，请参考[加入Alaya主网络](#运行全节点加入Alaya主网络)。
如需要加入Alaya开发网络，请参考[加入Alaya开发网络](#运行全节点加入alaya开发网络)；

- [Alaya主网区块链浏览器](https://scan.alaya.network/)
- [Alaya开发网区块链浏览器](https://devnetscan.alaya.network)

### 运行全节点加入Alaya主网络

运行以下命令加入网络：

```bash
cd ~/alaya-node/ && nohup alaya --identity alaya-node --datadir ./data --port 16789 --rpcport 6789 --rpcapi "db,platon,net,web3,admin,personal" --rpc --nodekey ./data/nodekey --cbft.blskey ./data/blskey --verbosity 1 --rpcaddr 127.0.0.1 --syncmode "fast" > ./data/alaya.log 2>&1 &
```

或者您也可以用`service unit`管理您的`alaya`进程：

```bash
sudo tee <<EOF >/dev/null /etc/systemd/system/alaya.service
[Unit]
Description=Alaya node service
After=network.target

[Service]
Type=simple
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=alaya
ExecStart=/usr/bin/alaya \\
    --identity alaya-node \\
    --datadir ${HOME}/alaya-node/data \\
    --port 16789 \\
    --rpcaddr 127.0.0.1 \\
    --rpcport 6789 \\
    --rpc \\
    --rpcapi "db,platon,net,web3,admin,personal" \\
    --nodekey ${HOME}/alaya-node/data/nodekey \\
    --cbft.blskey ${HOME}/alaya-node/data/blskey \\
    --verbosity 1 \\
    --syncmode "fast" 
User=${USER}
Restart=on-failure
StartLimitInterval=5
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable alaya.service
sudo systemctl start alaya.service
```

**提示：**

| **选项**      | **描述**                                                               |
| ------------- | ---------------------------------------------------------------------- |
| --identity    | 指定网络名称                                                           |
| --datadir     | 指定 data 目录路径                                                     |
| --port        | p2p端口号                                                              |
| --rpcaddr     | 指定 rpc 服务器地址                                                    |
| --rpcport     | 指定 rpc 协议通信端口                                                  |
| --rpcapi      | 指定节点开放的 rpcapi 名称                                             |
| --rpc         | 指定 http-rpc 通讯方式                                                 |
| --nodekey     | 指定节点私钥文件                                                       |
| --cbft.blskey | 指定节点 bls 私钥文件 （非验证节点即全节点，该参数为可选）             |
| --verbosity   | 日志级别，0: CRIT;  1: ERROR； 2: WARN;  3: INFO;  4: DEBUG； 5: TRACE |
| --syncmode    | fast：快速同步模式，full：全同步模式                                   |
| –db.nogc      | 开启归档模式                                                           |

更多参数意义通过`alaya --help`命令查看。

#### 主网相关资源

| 文件或资源     | 地址                                                                                      | 备注                                                            |
| -------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| alaya二进制文件  | https://download.alaya.network/alaya/platon/0.16.0/alaya                                 |                                                                 |
| alayakey       | https://download.alaya.network/alaya/platon/0.16.0/alayakey                               |                                                                 |
| mtool windows  | https://download.alaya.network/alaya/mtool/windows/0.16.1/alaya_mtool.exe                 | 需要修改配置文件config.properties中的链ID为开发网络链ID：201030 |
| mtool linux    | https://download.alaya.network/alaya/mtool/linux/0.16.1/alaya_mtool.zip                   | 需要修改配置文件config.properties中的链ID为开发网络链ID：201030 |
| samurai        | https://github.com/AlayaNetwork/Samurai/releases/download/v8.1.0/samurai-chrome-8.1.0.zip |                                                                 |
| scan浏览器地址 | https://scan.alaya.network/                                                                |                                                                 |

### 查看节点状态

当 Alaya 启动成功后，正常情况下会通过节点发现协议自动和距离自己最近的节点建立连接，连接成功后会启动区块同步，所以判断加入网络是否成功可以通过查看节点的 peers 同时确认当前节点块高是否增长来判断。

如果没有预先生成密钥，节点在启动时自动在节点的data目录下生成。如果采用自动生成的形式，将只会生成节点私钥与 BLS 私钥，相关公钥不会自动生成。

```bash
# 进入 Alaya 控制台
alaya attach http://localhost:6789

## 以下命令在Alaya控制台中执行
# 查看节点的peers
admin.peers

# 查看当前块高
platon.blockNumber

# 查看同步状态
platon.syncing

# 退出控制台
exit
```

节点列表中出现一系列Alaya网络节点并且块高在不断增长，则表示连接成功！（由于新节点需要同步，可能会存在延迟）
fast同步状态下，会查询不到当前块高，待同步到最新高度，会自动转full模式同步，此时可查看最新高度。

### 运行全节点加入alaya开发网络

如您正在部署主网节点，以下内容可以忽略。
开发网为开发者或节点提供开发测试环境。可能出现不稳定，网络重置的情况。开发网络目前版本为`0.16.0`。

#### 初始化创世区块

```bash
# 下载创世区块文件genesis.json
cd ~/alaya-node && wget https://download.alaya.network/alaya/platon/0.15.1/genesis.json

# 初始化创世区块文件
cd ~/alaya-node && alaya --datadir ./data init genesis.json
```

> 说明：
>
> 出现`Successfully wrote genesis state`相关提示说明初始化创世信息完成。

#### 启动验证节点

执行以下命令即可启动验证节点加入Alaya开发网络；如果需要成为验证节点，请通过后续说明方式申请大额测试ATP（开发网将根据测试需要不定期重置，开发网ATP无任何实际价值）。

```shell
cd ~/alaya-node/ && nohup alaya --identity alaya-node --datadir ./data --port 16789 --rpcport 6789 --rpcapi "db,platon,net,web3,admin,personal" --rpc --nodekey ./data/nodekey --cbft.blskey ./data/blskey --verbosity 1 --rpcaddr 127.0.0.1 --bootnodes enode://48f9ebd7559b7849f80e00d89d87fb92604c74a541a7d76fcef9f2bcc67043042dfab0cfbaeb5386f921208ed9192c403f438934a0a39f4cad53c55d8272e5fb@devnetnode1.alaya.network:16789 --syncmode "fast" > ./data/alaya.log 2>&1 &
```

**也可参照主网配置`service unit`文件管理Alaya进程**

#### 开发网络相关资源

| 文件或资源     | 地址                                                                                      | 备注                                                            |
| -------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| alaya二进制文件| https://download.alaya.network/alaya/platon/0.16.0/alaya                                 |                                                                 |
| alayakey       | https://download.alaya.network/alaya/platon/0.16.0/alayakey                               |                                                                 |
| mtool windows  | https://download.alaya.network/alaya/mtool/windows/0.16.1/alaya_mtool.exe                 | 需要修改配置文件config.properties中的链ID为开发网络链ID：201030 |
| mtool linux    | https://download.alaya.network/alaya/mtool/linux/0.16.1/alaya_mtool.zip                   | 需要修改配置文件config.properties中的链ID为开发网络链ID：201030 |
| samurai        | https://github.com/AlayaNetwork/Samurai/releases/download/v8.1.0/samurai-chrome-8.1.0.zip |                                                                 |
| 开放RPC URL    | http://47.241.91.2:6789 以及 ws://47.241.91.2:6790                                         |                                                                 |
| scan浏览器地址 | https://devnetscan.alaya.network                                                          |                                                                 |
