>版本信息
>
>ChainID: 201018
>
>Version: 0.16.0
>
>Git Commit: c1221a425d6b6b0c916c2eecbf1f74ab5224291c
>
>二进制下载: https://download.alaya.network/alaya/platon/0.16.0/alaya

### 1、安装指南

​		若已安装了Alaya节点，请跳到**第2点**进行更新操作；

​		未安装节点，请严格按照[官方文档](https://devdocs.alaya.network/alaya-devdocs/zh-CN/)安装，如有需要帮助请联系客服。

### 2、更新指南（先更新，暂不重启）

​		以下步骤以 Ubuntu18.04 系统为例，更新操作分为两种方式：**源码编译、直接使用二进制**，请严格按照以下步骤操作升级，如有需要帮助请联系客服。

​	**说明：0.16.0版本二进制名称做了修改，由platon改为alaya**

- **PPA**

  该方式在0.16.0版本已弃用，本次提供仅卸载老版本的操作，升级操作可以改用源码编译或者直接使用二进制
  
  ```bash
  # 更新
  $ sudo apt update
  # 卸载当前安装版本
  $ sudo apt remove `apt search platon|awk -F/ '/installed/{print $1}'` --purge -y  
  ```
  
- **源码编译**（针对之前已成功编译过的环境，全新编译请参考[官网](https://devdocs.alaya.network/alaya-devdocs/zh-CN/Install_Alaya/)）

  ```bash
  # 备份二进制
  $ [[ -x /usr/bin/platon ]] && sudo mv /usr/bin/platon /usr/bin/platon_`platon version | grep '^Version:' | awk -F "[ ,:,-]" '{print $3}'`
  # 编译二进制
  $ git clone https://github.com/AlayaNetwork/Alaya-Go.git --recursive
  $ cd Alaya-Go 
  $ git fetch --all
  $ git checkout -b alaya-0.16.0 c1221a425d6b6b0c916c2eecbf1f74ab5224291c
  # 安装依赖和编译，如果出现missing go.sum entry for module，使用go mod tidy移除未使用和添加缺失的依赖
  $ go mod download && make all
  # 使用新的alaya版本
  $ chmod +x build/bin/alaya
  $ sudo mv build/bin/alaya /usr/bin/alaya
  # 查看版本
  $ alaya version
  Version: 0.16.0-unstable
  Git Commit: c1221a425d6b6b0c916c2eecbf1f74ab5224291c
  ```

- **直接用二进制**

  ```bash
  # 备份二进制
  $ [[ -x /usr/bin/platon ]] && sudo mv /usr/bin/platon /usr/bin/platon_`platon version | grep '^Version:' | awk -F "[ ,:,-]" '{print $3}'`
  # 下载最新的二进制文件
  $ wget https://download.alaya.network/alaya/platon/0.16.0/alaya
  # 使用新的alaya版本
  $ chmod +x alaya
  $ sudo mv alaya /usr/bin/alaya
  # 查看版本
  $ alaya version
  Version: 0.16.0-unstable
  Git Commit: c1221a425d6b6b0c916c2eecbf1f74ab5224291c
  ```

### **3、择机重启进程**

如果当前节点质押过，首先通过[区块链浏览器](https://scan.alaya.network/node)查看节点是否已经被选为验证人（共识中）
如果已经当选，请等待节点退出验证人（共识中转为活跃中）后再进行重启操作。

启动命令中不再需要指定参数 `--alaya`，以下命令仅供参考，请根据各自的管理方式，重启alaya进程

```bash
nohup alaya --identity alaya-node --datadir ./data --port 16789  --rpcport 6789 --rpcapi "db,platon,net,web3,admin,personal" --rpc --nodekey ./data/nodekey --cbft.blskey ./data/blskey --verbosity 1 --rpcaddr 127.0.0.1 --syncmode "fast" > ./data/platon.log 2>&1 &
```

### 4、提案处理

- 质押过的节点，请通过区块链浏览器查看当前节点是否是以下状态：

1. 出块中
2. 共识中
3. 活跃中

如果当前节点为上述3中状态的一种，请参考以下命令对版本0.16.0进行投票，提案id为<0xf7e22997aebd599df9c71d49f5b6cbbeb93f63a433f615f0fdd7e19a14524fff>：

```bash
# 升级提案投票命令示例
$ mtool-client vote_versionproposal --proposalid 0xf7e22997aebd599df9c71d49f5b6cbbeb93f63a433f615f0fdd7e19a14524fff --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

如果节点状态为“**候选中**”，则需要做版本声明，请参考以下命令进行版本声明。

```bash
#版本声明示例
$ mtool-client declare_version --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json
```

- 未质押过的节点，跳过本步骤。
- 没定义$MTOOLDIR的，需要根据实际部署情况补全绝对路径。

### 5、反馈

alaya升级失败的，可通过以下渠道反馈。

1. 验证人微信群
2. 邮箱 validator@platon.network
