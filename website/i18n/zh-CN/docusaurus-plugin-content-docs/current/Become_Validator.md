---
id: Become_Validator
title: 成为验证节点
sidebar_label: 成为验证节点
---
本文档将描述如何在部署完节点之后，通过质押成为验证节点的过程。

## 准备

在成为验证节点前请确保服务器本地具备以下条件：

- 已经按照[全节点部署](/alaya-devdocs/zh-CN/Run_a_fullnode)指引安装好 Alaya 节点并同步完成。

## 配置 Nginx

出于安全考虑，不建议节点 rpc 端口对外直接开放（节点服务器默认 Ubuntu 18.04）。可以考虑使用 Nginx 进行反向代理，并通过用户鉴权和 HTTPS 加强 Nginx 端口的安全性。如果用户在安装 Alaya 做了节点数据目录的修改，nginx_conf.sh 脚本也需要修改成相同的节点数据目录。

> 以下使用普通用户执行

```bash
# 下载 nginx_conf.sh
wget https://download.alaya.network/alaya/scripts/nginx_conf.sh

# 执行脚本
chmod +x nginx_conf.sh && ./nginx_conf.sh
```

> 注意
>
> - 提示 `[sudo] password for` 时，输入当前账户密码。
> - 提示 `Enter your name:` 时，输入用户名，提示 `Enter your password:` 时，输入密码。务必牢记用户名和密码（密码中建议不要包含空格），后续 MTool 配置验证节点信息时需要填写。
> - 提示 `nginx conf succeed` 时，表示配置 nginx 成功，未配置成功时，请通过我们的客服联系方式反馈具体问题。

## 安装 MTool

```bash
# 下载MTool工具包
wget http://download.alaya.network/alaya/mtool/linux/0.16.0/alaya_mtool.zip

# 解压MTool工具包
(if ! command -v unzip;then sudo apt install unzip; fi;) && unzip alaya_mtool.zip && cd alaya_mtool

# 下载脚本，脚本下载到mtool-client目录下，否则脚本无法找到新版本 mtool 的路径。
wget https://download.alaya.network/alaya/scripts/mtool_install.sh

# 执行命令安装Mtool
chmod +x mtool_install.sh && ./mtool_install.sh

# 提示 Install mtool succeed. 时，表示 MTool 安装成功，未安装成功时，请通过我们的官方客服联系方式反馈具体问题。
```

安装完成之后，需要<font color="red">重新启动会话窗口</font>，让新添加的环境变量生效。

## 配置 MTool

### 创建钱包

Alaya 中，参与验证节点进行出块要创建两个钱包。如果已经有钱包，可通过将钱包文件拷贝到`$ALAYA_MTOOLDIR/keystore`目录下，跳过本步骤。

- 质押钱包：质押钱包用于质押 token，质押成功后才能成为备选节点候选人。 运行以下命令创建质押钱包

```bash
alaya_mtool account new staking
```

输入一次密码，再输入一次确认密码，即可创建钱包文件，创建成功后会在目录`$ALAYA_MTOOLDIR/keystore`下生成质押钱包文件`staking.json`。

- 收益钱包：用于收取区块奖励和 Staking 奖励，Staking 奖励统一发放给验证节点，由验证节点自行分配。 运行以下命令创建收益钱包

```bash
alaya_mtool account new reward
```

输入一次密码，再输入一次确认密码，即可创建钱包文件，创建成功后会在目录`$ALAYA_MTOOLDIR/keystore`下生成质押钱包文件`reward.json`。

### 配置验证节点信息

```bash
# 下载脚本
cd $ALAYA_MTOOLDIR && wget https://download.alaya.network/alaya/scripts/validator_conf.sh

# 运行脚本进行配置
chmod +x validator_conf.sh && ./validator_conf.sh
```

> **注意：**
>
> - 提示 Please enter the platon node IP address: 时，请输入 Alaya 节点服务器 ip 地址。
> - 提示 Enter your name: 时，请输入配置 Alaya 节点 nginx 时输入的用户名。
> - 提示 Enter your password: 时，请输入配置 Alaya 节点 nginx 时输入的密码。
> - 提示 validator conf success，并最后打印出的 validator_config.json 内容正常时，表示脚本执行成功，未执行成功时，请通过我们的官方客服联系方式反馈具体问题或使用下方的非http配置。

#### 验证节点信息配置文件说明

完成配置验证节点信息后，会在 MTool 的安装目录的 validator 子目录下，生成验证节点信息文件 validator_config.json，文件内容如下：

> 以下为使用nginx的https访问的示例文件：

```json
{
  "nodePublicKey": "0abaf3219f454f3d07b6cbcf3c10b6b4ccf605202868e2043b6f5db12b745df0604ef01ef4cb523adc6d9e14b83a76dd09f862e3fe77205d8ac83df707969b47",
  "blsPubKey": "82d740cbc0314ec558c5426f88fdad6f07a07f9846c6be4e40cd628b74b9f641ddad01e4c281a2c3693f8ff2a73a410297aff379ee0575127d51de99b97acc9a1b7bc8ca132ef6f0379a3ec9d76a603d623176e49e1c53e87fead36317895099",
  "nodeAddress": "https://dd:dolphin2@domain3",
  "nodePort": "16789",
  "nodeRpcPort": "443",
  "certificate": "/home/dolphintwo/alaya_mtool/ca.crt"
}
```

> 如果在内网访问不需要https加密，可以不执行<font color="red">配置 Nginx</font>和<font color="red">配置验证节点信息</font>两个操作，手动写入`$ALAYA_MTOOLDIR/validator/validator_config.json`文件(文件内容按实际情况自行修改)。

```json
{
  "nodePublicKey": "platon-node/data/nodekey 中的内容",
  "blsPubKey": "platon-node/data/blskey 中的内容",
  "nodeAddress": "http://127.0.0.1 或本机其他IP地址",
  "nodePort": "16789",
  "nodeRpcPort": "6789",
}
```

> **参数说明：**
>
> - nodePublicKey: 节点 ID，可通过节点数据目录 data 下的 nodeid 文件查看；
> - blsPubKey: BLS 公钥，可通过节点数据目录 data 下的 blspub 文件查看；
> - nodeAddress: 节点地址，分使用 Nginx 和不使用 Nginx 两种情况:
>   - 如果使用 Nginx，需要用 **https** 协议，格式为：`https://test:test@domain3`，domain3在hosts文件中指向`validator_conf.sh`执行时填写的IP地址。
>   - 如果不使用 Nginx，需要用 **http** 协议，如果 MTool 和节点在同一台机器或同一个局域网内，可以使用内网 IP，否则使用公网 IP，格式为：`http://18.238.183.12`。
> - nodePort: 节点 P2P 端口，默认为 16789。
> - nodeRpcPort: 分使用 Nginx 和不使用 Nginx 两种情况:
>   - 如果使用了 Nginx，端口默认为 443。
>   - 如果不使用 Nginx，端口默认为 6789。
> - certificate: ca 证书地址，如果不使用 Nginx 反向代理，可删除此参数。

## 自定义 AlayaScan 头像

如果用户不需要在 AlayaScan 显示自己指定的头像，可以忽略此步骤。否则需要如下操作：

- **注册 keybase 账户**

  用户首先需要在 [keybase.io](https://keybase.io/) 官网进行注册，如果已注册可登录 keybase 官网。

- **上传指定头像**

  点击用户头像，即可上传头像。

- **生成 PGP key**

  如果用户有`PGP key`，登录成功后，会在用户头像旁边显示一串 16 位的公钥，如：`EB621920A48D0699` ；如果用户还没有`PGP key` ，可以点击用户头像旁边的`add a PGP key`即可生成。

- **指定 externalId 值**

  发起质押操作时，指定`--external_id`参数值为上一步生成的`PGP key`。

> 提示：用户完成质押操作后，即可在 AlayaScan 上显示用户自定义的头像。

## 发起质押操作

如果共识节点部署完成，并且节点已经追上 [AlayaScan](https://scan.alaya.network/) 网站上的块高，您就可以使用 MTool 进行质押操作。质押操作前请确保质押账户余额足够，质押最低门槛为 1 万 ATP。

- 请不要将质押账户的所有 ATP 进行质押，至少保留 1 个 ATP，以备支付后续发起节点管理的交易手续费，比如升级提案的投票，解质押等交易。

执行命令

```bash
alaya_mtool staking --config $ALAYA_MTOOLDIR/validator/validator_config.json --keystore $ALAYA_MTOOLDIR/keystore/staking.json --amount 10000 --benefit_address xxx196278ns22j23awdfj9f2d4vz0pedld8a2fzwwj --delegated_reward_rate 8500 --node_name myNode --website www.mywebsite.com --details myNodeDescription --external_id 121412312
```

提示：**please input keystore password:** 输入质押钱包的密码，然后回车，如果显示如下信息则代表质押成功：

```bash
operation finished
transaction hash:
0x89b964d27d0caf1d8bf268f721eb123c4af57aed36187bea90b262f4769eeb9b
SUCCESS
```

> **参数说明：**
>
> - config：验证节点信息文件路径
> - keystore：发送交易的冷钱包路径
> - amount: 质押数，不少于 10000ATP-质押门槛，小数点不超过 8 位（使用自由金额质押）
> - restrictedamount: 不少于 10000ATP-质押门槛，小数点不超过 8 位（使用锁仓余额质押）
> - autoamount：不少于 10000ATP-优先使用锁仓余额质押，若锁仓余额不足质押金，再使用自由金额质押
> - benefit_address：验证节点收益地址
> - delegated_reward_rate：委托奖励比例，单位：万分比，整数，范围\[0,10000]，如输入 8500，表示分红比例为 85%，节点收益15%
> - node_name：验证人名称，不超过 30 字节，支持字母、数字、空格、上下划线及#，必须字母开头
> - website：官网路径，不超过 70 字节，数字字母组成
> - details：简介，验证人简要介绍说明，不超过 280 字节，建议英文
> - external_id：节点头像 icon 在 keybase.io 的 ID，或者外部系统身份认证 ID
