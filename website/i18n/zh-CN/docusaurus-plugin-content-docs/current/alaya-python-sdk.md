---
id: Python_SDK
title: Python SDK
sidebar_label: Python SDK
---



client-sdk-python 是一个服务于Alaya底层链的python sdk。通过web3对象与底层链进行交互。底层实现上，它通过 RPC 调用与本地节点通信。client-sdk-python可以与任何暴露了RPC接口的Alaya节点连接。

主要功能用于 获取区块数据、发送交易、使用智能合约进行交互、以及其他的一些应用。

[client-sdk-python下载链接](https://github.com/AlayaNetwork/client-sdk-python)

## 快速入门

#### Python环境要求

支持Python 3.6+版本。

#### 安装

可使用pip安装或下载源码，二选一即可。

- 使用pip直接安装

  ```
   pip install client-sdk-python
  ```

  > 目前编译的client-sdk-python版本为alaya分支，版本号为：1.0.0.2

- 下载源码

  ```
  git clone -b 0.16.0-develop https://github.com/AlayaNetwork/client-sdk-python.git
  ```

  > 其中`0.16.0-develop`为当前使用的分支。


### 使用

#### Web3模块

 Alaya节点之间通过P2PMessage通信。而节点和python sdk之间使用内置的Web3模块，发送JSON-RPC 请求，经过HTTP 、websocket、IPC等方式连接节点。 **主网ChainID为201018。开发者开放的Alaya开发网络，ChainID为201030 **。

#### 节点连接

- 以HTTP 连接为例，连接一个Alaya节点，详见[加入Alaya网络](https://devdocs.alaya.network/alaya-devdocs/zh-CN/Join_Alaya_NetWork/)。

  ```python
  w3 = Web3(HTTPProvider("http://47.241.91.2:6789"),chain_id = 201030)
  # alaya为PlatON类的一个实例
  alaya = PlatON(w3)
  print(w3.isConnected())
  ```

  其中 `http://47.241.91.2:6789`为Alaya的一个节点Url，请输入可访问的Alaya节点Url。

- 以Websocket连接为例。

  代码如下：

  ```python
  # websockets版本>= 8.0
  w3 = Web3(WebsocketProvider("ws://47.241.91.2:6790"),chain_id =201030)
  alaya = PlatON(w3)
  print(w3.isConnected())
  ```

- 以IPC连接为例。

  代码如下：

  ```python
  # platon.ipc 在节点目录 ~/platon-node/data/ 下
  w3 = Web3(IPCProvider("./platon.ipc"),chain_id = 201030)
  alaya = PlatON(w3)
  print(w3.isConnected())
  ```




#### 基本api

##### 基础类型编和解码

  - **Web3.toBytes()**

    将输入的参数转换为Bytes。

    调用：

    ```python
    >>> Web3.toBytes(0)
    b'\x00'
    >>> Web3.toBytes(0x000F)
    b'\x0f'
    ```

  - **Web3.toHex()**

    将输入的参数转换为16进制。

    调用：

    ```python
    >>> Web3.toHex(b'\x00\x0F')
    '0x000f'
    >>> Web3.toHex(False)
    '0x0'
    ```

  - **Web3.toInt()**

    将输入的参数转换为整型。

    调用：

    ```python
    >>> Web3.toInt(0x000F)
    15
    >>> Web3.toInt(b'\x00\x0F')
    15
    ```

  - **Web3.toJSON()**

    将输入的参数转换为json格式。

    调用：

    ```python
    >>> Web3.toJSON(3)
    '3'
    >>> Web3.toJSON({'one': 1})
    '{"one": 1}'
    ```

  - **Web3.toText()**

    将输入的参数转换为字符串格式。

    调用：

    ```python
    >>> Web3.toText(b'cowm\xc3\xb6')
    'cowmö'
    >>> Web3.toText(hexstr='0x636f776dc3b6')
    'cowmö'
    ```

##### 地址检测

  - **Web3.isAddress()**

    检测输入的参数是否为被认可的地址形式。

    调用：

    ```python
    >>> Web3.isAddress('atp1wdqj7v4g90xw42lq72kea8pyrh64820ma0ysgn')
    True
    ```


##### 加密哈希

  - **Web3.sha3()**

    将输入参数编译为 Keccak-256 。

    调用：

    ```python
    >>> Web3.sha3(0x678901)
    HexBytes('0x77cf3b4c68ccdb65991397e7b93111e0f7d863df3b26ebb053d0857e26486e6a')
    >>> Web3.sha3(text='txt')
    HexBytes('0xd7278090a36507640ea6b7a0034b69b0d240766fa3f98e3722be93c613b29d2e')
    ```

  - **Web3.soliditySha3()**

    将输入的abi_type和value编译为 Keccak-256 。

    参数：

    - value：真实值。
    - abi_type：和value相等的solidity 格式的字符串列表。

    调用：

    ```python
    >>> Web3.solidityKeccak(['uint8[]'], [[97, 98, 99]])
    HexBytes("0x233002c671295529bcc50b76a2ef2b0de2dac2d93945fca745255de1a9e4017e")

    >>> Web3.solidityKeccak(['address'], ["0x49EdDD3769c0712032808D86597B84ac5c2F5614"])
    HexBytes("0x2ff37b5607484cd4eecf6d13292e22bd6e5401eaffcc07e279583bc742c68882")
    ```



#### 链上查询api

与Alaya 链上节点连接成功以后，可通过`alaya`对象里的api查询链上节点的相关信息。

##### alaya.blockNumber

返回当前块编号。

返回值：

一个AttributeDict对象，其解析值为最近一个块的编号，`Number`类型。



##### alaya.syncing

用来检查节点当前是否已经与网络同步。

返回值：

 一个AttributeDict对象，其解析值为`Object`或`Bool`。如果节点尚未与网络同步，  则返回`false`，否则返回一个同步对象，具有以下属性：

  - `startingBlock` - Number: 同步起始块编号。

  - `currentBlock` - Number: 当前已同步块编号。

  - `highestBlock` - Number: 预估的目标同步块编号。

  - `knownStates` - Number: 预估的要下载的状态。

  - `pulledStates` - Number: 已经下载的状态。



##### alaya.gasPrice

用来获取当前gas价格，该价格由最近的若干块的gas价格中值决定。

返回值：

一个AttributeDict对象，其解析值为表示当前gas价格的字符串，单位为VON。



##### alaya.accounts

方法返回当前节点控制的账户列表。

返回值：

一个AttributeDict对象，其解析值为账户地址数组。



##### alaya.evidences

返回账户地址指定位置的存储内容。

返回值：

一个AttributeDict对象，其解析值为账户地址存储内容。



##### alaya.consensusStatus

返回当前节点所在区块树的共识状态信息。

返回值：

一个AttributeDict对象，其值为区块树中的所有区块公示状态信息。



##### alaya.getBalance(address)

用来获取指定块中特定账户地址的余额。

参数：

  - `address`：String - 要检查余额的账户地址，bech32 address格式。在Alaya网络，`atx`开头的为测试网，`atp`开头的为主网（ChainID：201018）或开发网（ChainID：201030）。在PlatON网络，`lax`开头的为测试网，`lat`开头的为主网（ChainID：100）或开发网（ChainID：210309）。

**返回值：**

 一个AttributeDict对象，其解析值为指定账户地址的余额字符串，以`VON`为单位。


<details>
  <summary><mark><b><font size="3" >部分代码示例：</font></b></mark></summary>

```python

from client_sdk_python import Web3, HTTPProvider
from client_sdk_python.eth import PlatON
from hexbytes import HexBytes

# get blockNumber syncing gasPrice accounts evidences consensusStatus
w3 = Web3(HTTPProvider("http://47.241.91.2:6789"),chain_id = 201030)
alaya = PlatON(w3)
block_number = alaya.blockNumber
print(block_number)
print(alaya.syncing)
print(alaya.gasPrice)
print(alaya.accounts)
print(alaya.evidences)
print(alaya.consensusStatus)

# get Balance
address = 'atp1ft2fuhh6q8pvpwe4jl3vqc2qhmhqs6ktl7e7g5'
balance = alaya.getBalance(address)
print(balance)

#输出
11524411
False
1000000000
[]
{}
AttributeDict({'blockTree': AttributeDict({'root': AttributeDict({'viewNumber': 16, 'blockHash': '0x5070404fbfaeb199ed29aee0723bb8f0de12391606235d4bfe61865bd8fa994e', 'blockNumber': 11524412, 'receiveTime': '2021-08-04T04:02:29.295222897Z', 'qc': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x5070404fbfaeb199ed29aee0723bb8f0de12391606235d4bfe61865bd8fa994e', 'blockNumber': 11524412, 'blockIndex': 1, 'signature': '0x4da9acd9b911905d4f9275b7256a76aa254bfc5930903b015e05de6af48e021c8a49d5bd430dc27073d13c246c31b90100000000000000000000000000000000', 'validatorSet': 'xxx_xx'}), 'parentHash': '0x0000000000000000000000000000000000000000000000000000000000000000', 'childrenHash': ['0x83d225f2f00bce603ee85b7b963c31ceefe6df131c232e2ef12c40ca58496119']}), 'blocks': AttributeDict({'11524412': AttributeDict({'0x5070404fbfaeb199ed29aee0723bb8f0de12391606235d4bfe61865bd8fa994e': AttributeDict({'viewNumber': 16, 'blockHash': '0x5070404fbfaeb199ed29aee0723bb8f0de12391606235d4bfe61865bd8fa994e', 'blockNumber': 11524412, 'receiveTime': '2021-08-04T04:02:29.295222897Z', 'qc': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x5070404fbfaeb199ed29aee0723bb8f0de12391606235d4bfe61865bd8fa994e', 'blockNumber': 11524412, 'blockIndex': 1, 'signature': '0x4da9acd9b911905d4f9275b7256a76aa254bfc5930903b015e05de6af48e021c8a49d5bd430dc27073d13c246c31b90100000000000000000000000000000000', 'validatorSet': 'xxx_xx'}), 'parentHash': '0x0000000000000000000000000000000000000000000000000000000000000000', 'childrenHash': ['0x83d225f2f00bce603ee85b7b963c31ceefe6df131c232e2ef12c40ca58496119']})}), '11524413': AttributeDict({'0x83d225f2f00bce603ee85b7b963c31ceefe6df131c232e2ef12c40ca58496119': AttributeDict({'viewNumber': 16, 'blockHash': '0x83d225f2f00bce603ee85b7b963c31ceefe6df131c232e2ef12c40ca58496119', 'blockNumber': 11524413, 'receiveTime': '2021-08-04T04:02:30.411043475Z', 'qc': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x83d225f2f00bce603ee85b7b963c31ceefe6df131c232e2ef12c40ca58496119', 'blockNumber': 11524413, 'blockIndex': 2, 'signature': '0x6660a4bb986ade19eb92945e5d673a141964c9dc8f220a9babdff54d7f9edd6dd532452d401c610da8467f497de27e9900000000000000000000000000000000', 'validatorSet': 'xxxxx_'}), 'parentHash': '0x5070404fbfaeb199ed29aee0723bb8f0de12391606235d4bfe61865bd8fa994e', 'childrenHash': ['0xe9df32342c9d807c04f048bccf8a1f1dab47929c2ee69e0b4b6133fb38132680']})}), '11524414': AttributeDict({'0xe9df32342c9d807c04f048bccf8a1f1dab47929c2ee69e0b4b6133fb38132680': AttributeDict({'viewNumber': 16, 'blockHash': '0xe9df32342c9d807c04f048bccf8a1f1dab47929c2ee69e0b4b6133fb38132680', 'blockNumber': 11524414, 'receiveTime': '2021-08-04T04:02:31.497358585Z', 'qc': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0xe9df32342c9d807c04f048bccf8a1f1dab47929c2ee69e0b4b6133fb38132680', 'blockNumber': 11524414, 'blockIndex': 3, 'signature': '0xd902fc23f576e58c75d94541b4a6d8eced3b01bb8f48c9d4bd3cccfd83de5e56a2ece32d76ac8ce93a35775f0396dd0d00000000000000000000000000000000', 'validatorSet': 'xxx_xx'}), 'parentHash': '0x83d225f2f00bce603ee85b7b963c31ceefe6df131c232e2ef12c40ca58496119', 'childrenHash': []})})})}), 'state': AttributeDict({'view': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'executing': AttributeDict({'blockIndex': 3, 'finish': True}), 'viewchange': AttributeDict({'viewchanges': AttributeDict({})}), 'lastViewchange': None, 'hadSendPrepareVote': AttributeDict({'votes': [AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x7c9c24662db0e568c14c61e7fe39e9a0caeda7f110bbce4ebe31affc27c35498', 'blockNumber': 11524411, 'blockIndex': 0, 'validatorIndex': 4, 'parentQC': AttributeDict({'epoch': 46098, 'viewNumber': 15, 'blockHash': '0x9f634828325855c40f2d22fef22e877e5b65e025e77f7a90b8cbeb97b57c4379', 'blockNumber': 11524410, 'blockIndex': 9, 'signature': '0x8f298b42a66d6a1f7814b67dcd7d9cb01b7369f472b9f8c357b7aacd77538e8a04df5c337d949d58440180560d457d1300000000000000000000000000000000', 'validatorSet': 'xxxxx_'}), 'signature': '0x1bedf19e6588dd0d53fc3d262b25cb2ab3dbbebe0203e7b1fe50931b25dd13e93f62b2bbc40f56826f268f1ae7230f9900000000000000000000000000000000'}), AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x5070404fbfaeb199ed29aee0723bb8f0de12391606235d4bfe61865bd8fa994e', 'blockNumber': 11524412, 'blockIndex': 1, 'validatorIndex': 4, 'parentQC': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x7c9c24662db0e568c14c61e7fe39e9a0caeda7f110bbce4ebe31affc27c35498', 'blockNumber': 11524411, 'blockIndex': 0, 'signature': '0xc3bada75f4a373433622a3cf845097d83a797d207f942ad727bdc8838778996d1ce19536fc5be1e21ba180fe5e33b38900000000000000000000000000000000', 'validatorSet': 'xxx_xx'}), 'signature': '0xe21ba855dd73e6088a3d61fff87f46eb859c937721a20de04ebd18769fee359e1f949e2147fa63cef7cd9904834a148900000000000000000000000000000000'}), AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x83d225f2f00bce603ee85b7b963c31ceefe6df131c232e2ef12c40ca58496119', 'blockNumber': 11524413, 'blockIndex': 2, 'validatorIndex': 4, 'parentQC': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x5070404fbfaeb199ed29aee0723bb8f0de12391606235d4bfe61865bd8fa994e', 'blockNumber': 11524412, 'blockIndex': 1, 'signature': '0x4da9acd9b911905d4f9275b7256a76aa254bfc5930903b015e05de6af48e021c8a49d5bd430dc27073d13c246c31b90100000000000000000000000000000000', 'validatorSet': 'xxx_xx'}), 'signature': '0x85e281024fb644b4fbb8b86159dd50f2e4e5dbd8a014eea9b6f201e71a39e5542c8669ca2fc95fc9188b1dc89264fa9100000000000000000000000000000000'}), AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0xe9df32342c9d807c04f048bccf8a1f1dab47929c2ee69e0b4b6133fb38132680', 'blockNumber': 11524414, 'blockIndex': 3, 'validatorIndex': 4, 'parentQC': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x83d225f2f00bce603ee85b7b963c31ceefe6df131c232e2ef12c40ca58496119', 'blockNumber': 11524413, 'blockIndex': 2, 'signature': '0x6660a4bb986ade19eb92945e5d673a141964c9dc8f220a9babdff54d7f9edd6dd532452d401c610da8467f497de27e9900000000000000000000000000000000', 'validatorSet': 'xxxxx_'}), 'signature': '0x14b4e8c426edae06eea5001485078a11f2f1a57eb49b1cfc8831c336f8ac31fe90e68947836561fe8113f01eb173358a00000000000000000000000000000000'})]}), 'pendingPrepareVote': AttributeDict({'votes': []}), 'viewBlocks': AttributeDict({'0': AttributeDict({'hash': '0x7c9c24662db0e568c14c61e7fe39e9a0caeda7f110bbce4ebe31affc27c35498', 'number': 11524411, 'blockIndex': 0}), '1': AttributeDict({'hash': '0x5070404fbfaeb199ed29aee0723bb8f0de12391606235d4bfe61865bd8fa994e', 'number': 11524412, 'blockIndex': 1}), '2': AttributeDict({'hash': '0x83d225f2f00bce603ee85b7b963c31ceefe6df131c232e2ef12c40ca58496119', 'number': 11524413, 'blockIndex': 2}), '3': AttributeDict({'hash': '0xe9df32342c9d807c04f048bccf8a1f1dab47929c2ee69e0b4b6133fb38132680', 'number': 11524414, 'blockIndex': 3})}), 'viewQcs': AttributeDict({'maxIndex': 3, 'qcs': AttributeDict({'0': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x7c9c24662db0e568c14c61e7fe39e9a0caeda7f110bbce4ebe31affc27c35498', 'blockNumber': 11524411, 'blockIndex': 0, 'signature': '0xc3bada75f4a373433622a3cf845097d83a797d207f942ad727bdc8838778996d1ce19536fc5be1e21ba180fe5e33b38900000000000000000000000000000000', 'validatorSet': 'xxx_xx'}), '1': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x5070404fbfaeb199ed29aee0723bb8f0de12391606235d4bfe61865bd8fa994e', 'blockNumber': 11524412, 'blockIndex': 1, 'signature': '0x4da9acd9b911905d4f9275b7256a76aa254bfc5930903b015e05de6af48e021c8a49d5bd430dc27073d13c246c31b90100000000000000000000000000000000', 'validatorSet': 'xxx_xx'}), '2': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x83d225f2f00bce603ee85b7b963c31ceefe6df131c232e2ef12c40ca58496119', 'blockNumber': 11524413, 'blockIndex': 2, 'signature': '0x6660a4bb986ade19eb92945e5d673a141964c9dc8f220a9babdff54d7f9edd6dd532452d401c610da8467f497de27e9900000000000000000000000000000000', 'validatorSet': 'xxxxx_'}), '3': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0xe9df32342c9d807c04f048bccf8a1f1dab47929c2ee69e0b4b6133fb38132680', 'blockNumber': 11524414, 'blockIndex': 3, 'signature': '0xd902fc23f576e58c75d94541b4a6d8eced3b01bb8f48c9d4bd3cccfd83de5e56a2ece32d76ac8ce93a35775f0396dd0d00000000000000000000000000000000', 'validatorSet': 'xxx_xx'})})}), 'viewVotes': AttributeDict({'votes': AttributeDict({'0': AttributeDict({'votes': AttributeDict({'0': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x7c9c24662db0e568c14c61e7fe39e9a0caeda7f110bbce4ebe31affc27c35498', 'blockNumber': 11524411, 'blockIndex': 0, 'validatorIndex': 0, 'parentQC': AttributeDict({'epoch': 46098, 'viewNumber': 15, 'blockHash': '0x9f634828325855c40f2d22fef22e877e5b65e025e77f7a90b8cbeb97b57c4379', 'blockNumber': 11524410, 'blockIndex': 9, 'signature': '0x8f298b42a66d6a1f7814b67dcd7d9cb01b7369f472b9f8c357b7aacd77538e8a04df5c337d949d58440180560d457d1300000000000000000000000000000000', 'validatorSet': 'xxxxx_'}), 'signature': '0x3d7d906531429bdd674198329e63cce370a39c352bac5a179759ba81de809d4567c25a20c7048258caeca4f8b855c40a00000000000000000000000000000000'}), '1': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x7c9c24662db0e568c14c61e7fe39e9a0caeda7f110bbce4ebe31affc27c35498', 'blockNumber': 11524411, 'blockIndex': 0, 'validatorIndex': 1, 'parentQC': AttributeDict({'epoch': 46098, 'viewNumber': 15, 'blockHash': '0x9f634828325855c40f2d22fef22e877e5b65e025e77f7a90b8cbeb97b57c4379', 'blockNumber': 11524410, 'blockIndex': 9, 'signature': '0x8f298b42a66d6a1f7814b67dcd7d9cb01b7369f472b9f8c357b7aacd77538e8a04df5c337d949d58440180560d457d1300000000000000000000000000000000', 'validatorSet': 'xxxxx_'}), 'signature': '0x4c14c960096d2758b81db66d89873776061e55230bbc706d372f0f8862dd8298910ca33c1f4b39d1b49d942f62b26a1700000000000000000000000000000000'}), '2': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x7c9c24662db0e568c14c61e7fe39e9a0caeda7f110bbce4ebe31affc27c35498', 'blockNumber': 11524411, 'blockIndex': 0, 'validatorIndex': 2, 'parentQC': AttributeDict({'epoch': 46098, 'viewNumber': 15, 'blockHash': '0x9f634828325855c40f2d22fef22e877e5b65e025e77f7a90b8cbeb97b57c4379', 'blockNumber': 11524410, 'blockIndex': 9, 'signature': '0x8f298b42a66d6a1f7814b67dcd7d9cb01b7369f472b9f8c357b7aacd77538e8a04df5c337d949d58440180560d457d1300000000000000000000000000000000', 'validatorSet': 'xxxxx_'}), 'signature': '0xe4a441dec7ff55933341a35965d30fe8d0b281fef7d9ae04961c180f9b2c01323fff752bdbadef2019cc579f8173781800000000000000000000000000000000'}), '4': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x7c9c24662db0e568c14c61e7fe39e9a0caeda7f110bbce4ebe31affc27c35498', 'blockNumber': 11524411, 'blockIndex': 0, 'validatorIndex': 4, 'parentQC': AttributeDict({'epoch': 46098, 'viewNumber': 15, 'blockHash': '0x9f634828325855c40f2d22fef22e877e5b65e025e77f7a90b8cbeb97b57c4379', 'blockNumber': 11524410, 'blockIndex': 9, 'signature': '0x8f298b42a66d6a1f7814b67dcd7d9cb01b7369f472b9f8c357b7aacd77538e8a04df5c337d949d58440180560d457d1300000000000000000000000000000000', 'validatorSet': 'xxxxx_'}), 'signature': '0x1bedf19e6588dd0d53fc3d262b25cb2ab3dbbebe0203e7b1fe50931b25dd13e93f62b2bbc40f56826f268f1ae7230f9900000000000000000000000000000000'}), '5': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x7c9c24662db0e568c14c61e7fe39e9a0caeda7f110bbce4ebe31affc27c35498', 'blockNumber': 11524411, 'blockIndex': 0, 'validatorIndex': 5, 'parentQC': AttributeDict({'epoch': 46098, 'viewNumber': 15, 'blockHash': '0x9f634828325855c40f2d22fef22e877e5b65e025e77f7a90b8cbeb97b57c4379', 'blockNumber': 11524410, 'blockIndex': 9, 'signature': '0x47370edec64e60ceefac902fb0dd546cd83678f759ff57bdba883d73f221801026933e7c89d0507ef149f2dbdacf6a1200000000000000000000000000000000', 'validatorSet': 'xxxx_x'}), 'signature': '0xcd92807b116853677a7253b45507cb9b4ae2d15244648283df70527aa21d12ea60135c9b525d171821ef56ea363a7d1700000000000000000000000000000000'})})}), '1': AttributeDict({'votes': AttributeDict({'0': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x5070404fbfaeb199ed29aee0723bb8f0de12391606235d4bfe61865bd8fa994e', 'blockNumber': 11524412, 'blockIndex': 1, 'validatorIndex': 0, 'parentQC': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x7c9c24662db0e568c14c61e7fe39e9a0caeda7f110bbce4ebe31affc27c35498', 'blockNumber': 11524411, 'blockIndex': 0, 'signature': '0xc3bada75f4a373433622a3cf845097d83a797d207f942ad727bdc8838778996d1ce19536fc5be1e21ba180fe5e33b38900000000000000000000000000000000', 'validatorSet': 'xxx_xx'}), 'signature': '0xc5e3ae4185ab142c00be777c8b343a7cd9659a3c35708b419a0105690cfd92da59769fa86010a6a5a603d6adeb5cdb8600000000000000000000000000000000'}), '1': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x5070404fbfaeb199ed29aee0723bb8f0de12391606235d4bfe61865bd8fa994e', 'blockNumber': 11524412, 'blockIndex': 1, 'validatorIndex': 1, 'parentQC': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x7c9c24662db0e568c14c61e7fe39e9a0caeda7f110bbce4ebe31affc27c35498', 'blockNumber': 11524411, 'blockIndex': 0, 'signature': '0xc3bada75f4a373433622a3cf845097d83a797d207f942ad727bdc8838778996d1ce19536fc5be1e21ba180fe5e33b38900000000000000000000000000000000', 'validatorSet': 'xxx_xx'}), 'signature': '0xe7910ceeedc15513fceb36a3d4eb33ef0dc0d15a2f5e4471c11aa708f87ac90cb9b0c8d3151a9c3d0da07c8a80f0579100000000000000000000000000000000'}), '2': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x5070404fbfaeb199ed29aee0723bb8f0de12391606235d4bfe61865bd8fa994e', 'blockNumber': 11524412, 'blockIndex': 1, 'validatorIndex': 2, 'parentQC': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x7c9c24662db0e568c14c61e7fe39e9a0caeda7f110bbce4ebe31affc27c35498', 'blockNumber': 11524411, 'blockIndex': 0, 'signature': '0xc3bada75f4a373433622a3cf845097d83a797d207f942ad727bdc8838778996d1ce19536fc5be1e21ba180fe5e33b38900000000000000000000000000000000', 'validatorSet': 'xxx_xx'}), 'signature': '0x5784f3582664cde52fcb6c9451b16959fa8e40a28d1942bff476c30b8e1755d9e6f39684db05c075fcdf9054824fc08900000000000000000000000000000000'}), '4': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x5070404fbfaeb199ed29aee0723bb8f0de12391606235d4bfe61865bd8fa994e', 'blockNumber': 11524412, 'blockIndex': 1, 'validatorIndex': 4, 'parentQC': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x7c9c24662db0e568c14c61e7fe39e9a0caeda7f110bbce4ebe31affc27c35498', 'blockNumber': 11524411, 'blockIndex': 0, 'signature': '0xc3bada75f4a373433622a3cf845097d83a797d207f942ad727bdc8838778996d1ce19536fc5be1e21ba180fe5e33b38900000000000000000000000000000000', 'validatorSet': 'xxx_xx'}), 'signature': '0xe21ba855dd73e6088a3d61fff87f46eb859c937721a20de04ebd18769fee359e1f949e2147fa63cef7cd9904834a148900000000000000000000000000000000'}), '5': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x5070404fbfaeb199ed29aee0723bb8f0de12391606235d4bfe61865bd8fa994e', 'blockNumber': 11524412, 'blockIndex': 1, 'validatorIndex': 5, 'parentQC': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x7c9c24662db0e568c14c61e7fe39e9a0caeda7f110bbce4ebe31affc27c35498', 'blockNumber': 11524411, 'blockIndex': 0, 'signature': '0xc3bada75f4a373433622a3cf845097d83a797d207f942ad727bdc8838778996d1ce19536fc5be1e21ba180fe5e33b38900000000000000000000000000000000', 'validatorSet': 'xxx_xx'}), 'signature': '0x59a79809e608ddf1754e78d65b9fa59bd4303fc41f140a0753fcd9e28af630895fe78ea500cbac0d2caeaec0752adf8300000000000000000000000000000000'})})}), '2': AttributeDict({'votes': AttributeDict({'0': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x83d225f2f00bce603ee85b7b963c31ceefe6df131c232e2ef12c40ca58496119', 'blockNumber': 11524413, 'blockIndex': 2, 'validatorIndex': 0, 'parentQC': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x5070404fbfaeb199ed29aee0723bb8f0de12391606235d4bfe61865bd8fa994e', 'blockNumber': 11524412, 'blockIndex': 1, 'signature': '0x4da9acd9b911905d4f9275b7256a76aa254bfc5930903b015e05de6af48e021c8a49d5bd430dc27073d13c246c31b90100000000000000000000000000000000', 'validatorSet': 'xxx_xx'}), 'signature': '0x3e5f8b8ca425ccf9cf6297d09e9fe6e621b7b8cde4bace4c2fddd50e36fbc41debbfeb12f59882e00c2b6106578b660800000000000000000000000000000000'}), '1': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x83d225f2f00bce603ee85b7b963c31ceefe6df131c232e2ef12c40ca58496119', 'blockNumber': 11524413, 'blockIndex': 2, 'validatorIndex': 1, 'parentQC': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x5070404fbfaeb199ed29aee0723bb8f0de12391606235d4bfe61865bd8fa994e', 'blockNumber': 11524412, 'blockIndex': 1, 'signature': '0x4da9acd9b911905d4f9275b7256a76aa254bfc5930903b015e05de6af48e021c8a49d5bd430dc27073d13c246c31b90100000000000000000000000000000000', 'validatorSet': 'xxx_xx'}), 'signature': '0x3729f4ab5316c04b29a9c4a21f5e68d1f646b283f1834f1048d6bf738dd97120f0e48ce7e142d70bfd343a49ded9070e00000000000000000000000000000000'}), '2': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x83d225f2f00bce603ee85b7b963c31ceefe6df131c232e2ef12c40ca58496119', 'blockNumber': 11524413, 'blockIndex': 2, 'validatorIndex': 2, 'parentQC': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x5070404fbfaeb199ed29aee0723bb8f0de12391606235d4bfe61865bd8fa994e', 'blockNumber': 11524412, 'blockIndex': 1, 'signature': '0x4da9acd9b911905d4f9275b7256a76aa254bfc5930903b015e05de6af48e021c8a49d5bd430dc27073d13c246c31b90100000000000000000000000000000000', 'validatorSet': 'xxx_xx'}), 'signature': '0x8b2d36807d5ace7cd564b02ccfca3cf929f0f8269b97a425b268138726509437a2d585dc7fc31a195a1cdf4591b0979000000000000000000000000000000000'}), '3': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x83d225f2f00bce603ee85b7b963c31ceefe6df131c232e2ef12c40ca58496119', 'blockNumber': 11524413, 'blockIndex': 2, 'validatorIndex': 3, 'parentQC': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x5070404fbfaeb199ed29aee0723bb8f0de12391606235d4bfe61865bd8fa994e', 'blockNumber': 11524412, 'blockIndex': 1, 'signature': '0xc083dfd36169801fd517004acbeebc5489c698dd197ab4128980fdb541d156c0413c4e886a09030c5c04d7a50b66cb8e00000000000000000000000000000000', 'validatorSet': 'xxxx_x'}), 'signature': '0x7c1c9b629ab84e51045d25cdbd76ff441945455f8ebf1d97417867668f7aef1748dc1454ee276b45c38c9d212b3ef49500000000000000000000000000000000'}), '4': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x83d225f2f00bce603ee85b7b963c31ceefe6df131c232e2ef12c40ca58496119', 'blockNumber': 11524413, 'blockIndex': 2, 'validatorIndex': 4, 'parentQC': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x5070404fbfaeb199ed29aee0723bb8f0de12391606235d4bfe61865bd8fa994e', 'blockNumber': 11524412, 'blockIndex': 1, 'signature': '0x4da9acd9b911905d4f9275b7256a76aa254bfc5930903b015e05de6af48e021c8a49d5bd430dc27073d13c246c31b90100000000000000000000000000000000', 'validatorSet': 'xxx_xx'}), 'signature': '0x85e281024fb644b4fbb8b86159dd50f2e4e5dbd8a014eea9b6f201e71a39e5542c8669ca2fc95fc9188b1dc89264fa9100000000000000000000000000000000'})})}), '3': AttributeDict({'votes': AttributeDict({'0': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0xe9df32342c9d807c04f048bccf8a1f1dab47929c2ee69e0b4b6133fb38132680', 'blockNumber': 11524414, 'blockIndex': 3, 'validatorIndex': 0, 'parentQC': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x83d225f2f00bce603ee85b7b963c31ceefe6df131c232e2ef12c40ca58496119', 'blockNumber': 11524413, 'blockIndex': 2, 'signature': '0x6660a4bb986ade19eb92945e5d673a141964c9dc8f220a9babdff54d7f9edd6dd532452d401c610da8467f497de27e9900000000000000000000000000000000', 'validatorSet': 'xxxxx_'}), 'signature': '0x9c9d56a6bb866fd27ef307d87f44c1e03ca5756a4f45f7e2ab93493d725167450e2b7757a76d7ef96bc5776e68abef9500000000000000000000000000000000'}), '1': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0xe9df32342c9d807c04f048bccf8a1f1dab47929c2ee69e0b4b6133fb38132680', 'blockNumber': 11524414, 'blockIndex': 3, 'validatorIndex': 1, 'parentQC': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x83d225f2f00bce603ee85b7b963c31ceefe6df131c232e2ef12c40ca58496119', 'blockNumber': 11524413, 'blockIndex': 2, 'signature': '0x6660a4bb986ade19eb92945e5d673a141964c9dc8f220a9babdff54d7f9edd6dd532452d401c610da8467f497de27e9900000000000000000000000000000000', 'validatorSet': 'xxxxx_'}), 'signature': '0x335a4883fe2cfb0438cdd54b80dd0776f05dfabcac9e02f72fb561a1ca50ab7f7d6a22dfb5603e2b006428df394e960700000000000000000000000000000000'}), '2': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0xe9df32342c9d807c04f048bccf8a1f1dab47929c2ee69e0b4b6133fb38132680', 'blockNumber': 11524414, 'blockIndex': 3, 'validatorIndex': 2, 'parentQC': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x83d225f2f00bce603ee85b7b963c31ceefe6df131c232e2ef12c40ca58496119', 'blockNumber': 11524413, 'blockIndex': 2, 'signature': '0x6660a4bb986ade19eb92945e5d673a141964c9dc8f220a9babdff54d7f9edd6dd532452d401c610da8467f497de27e9900000000000000000000000000000000', 'validatorSet': 'xxxxx_'}), 'signature': '0x751cd45ebd6c786fba7fcf8a79cb00144b98b5b43a56c88c920ea8b49df33f4ea0a8b0ddf842986639f8fa7bc7c2c91000000000000000000000000000000000'}), '4': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0xe9df32342c9d807c04f048bccf8a1f1dab47929c2ee69e0b4b6133fb38132680', 'blockNumber': 11524414, 'blockIndex': 3, 'validatorIndex': 4, 'parentQC': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x83d225f2f00bce603ee85b7b963c31ceefe6df131c232e2ef12c40ca58496119', 'blockNumber': 11524413, 'blockIndex': 2, 'signature': '0x6660a4bb986ade19eb92945e5d673a141964c9dc8f220a9babdff54d7f9edd6dd532452d401c610da8467f497de27e9900000000000000000000000000000000', 'validatorSet': 'xxxxx_'}), 'signature': '0x14b4e8c426edae06eea5001485078a11f2f1a57eb49b1cfc8831c336f8ac31fe90e68947836561fe8113f01eb173358a00000000000000000000000000000000'}), '5': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0xe9df32342c9d807c04f048bccf8a1f1dab47929c2ee69e0b4b6133fb38132680', 'blockNumber': 11524414, 'blockIndex': 3, 'validatorIndex': 5, 'parentQC': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x83d225f2f00bce603ee85b7b963c31ceefe6df131c232e2ef12c40ca58496119', 'blockNumber': 11524413, 'blockIndex': 2, 'signature': '0x19be2086007a2804fa985f8c16dfd41f200dcc58d6768a47bdd32cfab779efd974dc7fb8300f7a08d0f0c1c215744b9400000000000000000000000000000000', 'validatorSet': 'xxx_xx'}), 'signature': '0xaabb1fcd1bb95f46c64ed0e6162efc869b325a7c3ede11efecd41101be6d4dd90da65fde968cb41e147739d29c3b5d8a00000000000000000000000000000000'})})})})})}), 'highestQCBlock': AttributeDict({'hash': '0xe9df32342c9d807c04f048bccf8a1f1dab47929c2ee69e0b4b6133fb38132680', 'number': 11524414}), 'highestLockBlock': AttributeDict({'hash': '0x83d225f2f00bce603ee85b7b963c31ceefe6df131c232e2ef12c40ca58496119', 'number': 11524413}), 'highestCommitBlock': AttributeDict({'hash': '0x5070404fbfaeb199ed29aee0723bb8f0de12391606235d4bfe61865bd8fa994e', 'number': 11524412})}), 'validator': True})
409999794880000000000

```

</details>


##### alaya.getStorageAt()

返回一个地址的指定位置存储内容。

调用：

  ```
  alaya.getStorageAt(address, position [, defaultBlock] )
  ```

参数：

  - `address`：String - 要读取的地址。
  - `position`：Number - 存储中的索引编号。
  - `defaultBlock`：Number|String - 可选，使用该参数覆盖`alaya.defaultBlock`属性值。


返回值：

一个AttributeDict对象，其解析值为存储中指定位置的内容。

##### alaya.getCode()

返回指定地址处的代码。

调用：

  ```
  alaya.getCode(address [, defaultBlock] )
  ```

参数：

  - `address`：String - 要读取代码的地址。
  - `defaultBlock`：Number|String - 可选，使用该参数覆盖`alaya.defaultBlock`属性值。


返回值：

一个AttributeDict对象，其解析值为指定地址处的代码字符串。



##### alaya.getBlock()

返回指定块编号或块哈希对应的块。

调用：

  ```
  alaya.getBlock(blockHashOrBlockNumber [, returnTransactionObjects] )
  ```

参数：

  - `blockHashOrBlockNumber`：String|Number - 块编号或块哈希值，或者使用以下字符串："genesis"、"latest" 或 "pending" 。
  - `returnTransactionObjects`：Boolean -  可选，默认值为`false`。当设置为`true`时,返回块中将包括所有交易详情，否则仅返回交易哈希。


返回值：

一个AttributeDict对象，其解析值为满足搜索条件的块对象，具有以下字段：

- `number` - Number: 块编号，处于pending状态的块为`null`。

- `hash 32 Bytes` - String: 块哈希，处于pending状态的块为`null`。

- `parentHash 32 Bytes` - String: 父块哈希。

- `nonce 8 Bytes` - String: 生成的proof-of-work的哈希，处于pending状态的块为`null`。

- `sha3Uncles 32 Bytes` - String: 块中叔伯数据的`SHA3`值。

- `logsBloom 256 Bytes` - String: 块中日志的bloom filter，处于pending状态的块为`null`。

- `transactionsRoot 32 Bytes` - String: 块中的交易树根节点。

- `stateRoot 32 Bytes` - String: 块中的最终状态树根节点。

- `miner` - String: 接收奖励的矿工地址。

- `difficulty` - String: 该块的难度值。

- `totalDifficulty` - String: 截至该块的全链总难度值。

- `extraData` - String: 块 “extra data” 字段。

- `size` - Number: 字节为单位的块大小。

- `gasLimit` - Number: 该块允许的最大gas值。

- `gasUsed` - Number: 该块中所有交易使用的gas总量。

- `timestamp` - Number: 出块的unix时间戳。

- `transactions` - Array: 交易对象数组，或者32字节长的交易哈希值，取决于`returnTransactionObjects`的设置。

- `uncles` - Array: 叔伯块哈希值数组。



##### alaya.getBlockTransactionCount()

方法返回指定块中的交易数量。

调用：

  ```
  alaya.getBlockTransactionCount(blockHashOrBlockNumber)
  ```

参数：

  - `blockHashOrBlockNumber`：String|Number - 块编号或块的哈希值，或者使用以下字符串："genesis"、"latest" 或 "pending" 来指定块。


返回值：

一个AttributeDict对象，其解析值为指定块中的交易数量，Number类型。



##### alaya.getTransaction()

返回具有指定哈希值的交易对象。

调用：

  ```
  alaya.getTransaction(transactionHash)
  ```

参数：

  - `transactionHash`：String - 交易的哈希值。



  返回值：

  一个AttributeDict对象，其解析值为具有给定哈希值的交易对象。该对象具体内容描述参见：`alaya.waitForTransactionReceipt`。



##### alaya.getRawTransaction()

返回具有指定哈希值的交易对象HexBytes 值。

调用：

  ```
  alaya.getRawTransaction(transactionHash )
  ```

参数：

  - `transactionHash`：String - 交易的哈希值。

返回值：

一个HexBytes 值的对象。



##### alaya.getTransactionFromBlock()

返回指定块中特定索引号的交易对象。

  调用：

  ```
  getTransactionFromBlock(hashStringOrNumber, indexNumber )
  ```

  参数：

  - `hashStringOrNumber`：String - 块编号或块的哈希值，或者使用以下字符串："genesis、"latest" 或 "pending" 来指定块。
  - `indexNumber`：Number - 交易索引位置。

  返回值：

  一个AttributeDict对象，其解析值为交易对象，该对象具体内容描述参见alaya.getTransaction()。



##### (15) alaya.getTransactionByBlock()

  返回指定块中特定索引号的交易对象。

  调用：

  ```
  alaya.getTransactionByBlock(hashStringOrNumber, indexNumber )
  ```

  参数：

  - `hashStringOrNumber`：Number |String - 块编号或块的哈希值，或者使用以下字符串："genesis、"latest" 或 "pending" 来指定块。
  - `indexNumber`：Number - 交易索引位置。

  返回值：

  一个AttributeDict对象，其解析值为交易对象，该对象具体内容描述参见`alaya.getTransaction()`。



#### 链上发送交易api

##### sendTransaction(transactionObject)

向Alaya 链上提交一个交易（已被节点签名，尚未提交的交易）。

参数：

  - `transactionObject`：Object - 要发送的交易对象，包含以下字段：
    - `from` - String|Number: 交易发送方账户地址，不设置该字段的话，则使用`alaya.defaultAccount`属性值。可设置为一个地址或本地钱包alaya.accounts.wallet中的索引序号。
    - `to` - String: 可选，消息的目标地址，对于合约创建交易该字段为null。
    - `value` - Number|String|BN|BigNumber: (optional) The value transferred for the transaction in VON, also the endowment if it’s a contract-creation transaction.
    - `gas` - Number: 可选，默认值：待定，用于交易的gas总量，未用完的gas会退还。
    - `gasPrice` - Number|String|BN|BigNumber: 可选，该交易的gas价格，单位为VON，默认值为`alaya.gasPrice`属性值。
    - `data` - String: 可选，可以是包含合约方法数据的ABI字符串，或者是合约创建交易中的初始化代码。
    - `nonce` - Number: 可选，使用该字段覆盖使用相同nonce值的挂起交易。

返回值：

 `alaya.sendTransaction()`方法的返回值是32字节长的交易哈希值。



##### waitForTransactionReceipt(transaction_hash, timeout)

 指定时间内返回指定交易的收据对象。

 参数：

  - `transaction_hash`：String - 交易的哈希值。
  - `timeout`：Number- 可选的等待时间长度，单位为秒。默认为120。

  返回值：

 一个AttributeDict对象，其解析值为交易的收据对象或者null。收据对象具有如下字段：

  - `blockHash` 32 Bytes - String: 交易所在块的哈希值。
  - `blockNumber` - Number: 交易所在块的编号。
  - `transactionHash` 32 Bytes - String: 交易的哈希值。
  - `transactionIndex` - Number: 交易在块中的索引位置。
  - `from` - String: 交易发送方的地址。
  - `to` - String: 交易接收方的地址，对于创建合约的交易，该值为null。
  - `contractAddress` - String: 对于创建合约的交易，该值为创建的合约地址，否则为`null`。
  - `cumulativeGasUsed` - Number: 该交易执行时所在块的gas累计总用量。
  - `gasUsed`- Number: 该交易的gas总量。
  - `logs` - Array: 该交易产生的日志对象数组。



`sendTransaction`、`waitForTransactionReceipt`

<details>
  <summary><mark><b><font size="3" >代码示例：</font></b></mark></summary>

```python
# sendtransaction
to = 'atp1ft2fuhh6q8pvpwe4jl3vqc2qhmhqs6ktl7e7g5'  #交易接收方的地址
w3.personal.unlockAccount(address, "password", 999999)
data = {
    "from": address,
    "to": to,
    "value": 0x10909,
    "gas": 1000000,
    "gasPrice": 1000000000,
}
transaction_hex = HexBytes(alaya.sendTransaction(data)).hex()
result = alaya.waitForTransactionReceipt(transaction_hex)
print(result)

#输出
AttributeDict({'blockHash': HexBytes('0x7bfe17689560c773b1cade579f1bd2cf85aeea9f75177e0e06bcdb4aeebd31a8'), 'blockNumber': 385507, 'contractAddress': None, 'cumulativeGasUsed': 21000, 'from': 'atp1ft2fuhh6q8pvpwe4jl3vqc2qhmhqs6ktl7e7g5', 'gasUsed': 21000, 'logs': [], 'logsBloom': HexBytes('0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'), 'status': 1, 'to': 'atp1ft2fuhh6q8pvpwe4jl3vqc2qhmhqs6ktl7e7g5', 'transactionHash': HexBytes('0x377fcd0dfb5e294041fe4274175ed7fce253973fac7abf4e4ff808b5099a454c'), 'transactionIndex': 0})
```

</details>


##### alaya.getTransactionReceipt()

 返回指定交易的收据对象。
 如果交易处于pending状态，则返回`null`。

 调用：

  ```
  alaya.getTransactionReceipt(hash)
  ```

 参数：

  - `hash`：String - 交易的哈希值

 返回值：

 一个AttributeDict对象，其解析值为交易的收据对象或者`null`。该对象具体内容描述参见`alaya.waitForTransactionReceipt`。



##### alaya.getTransactionCount()

 返回指定地址发出的交易数量。

 调用：

  ```
  alaya.getTransactionCount(address [, defaultBlock] )
  ```

 参数：

  - `address`：String - 要查询的账户地址
  - `defaultBlock`：Number|String - 可选，设置该参数来覆盖alaya.defaultBlock属性值。

  返回值：

  一个AttributeDict对象，其解析值为指定地址发出的交易数量。



##### alaya.sendRawTransaction()

 向alaya 链上提交一个签名的序列化的交易

  ```
alaya.sendRawTransaction(signTransaction，private_key)
  ```

 参数：

  - `signTransaction`：Object - 要发送的签名交易对象，包含以下字段：

    - `from` - String|Number: 交易发送方账户地址，不设置该字段的话，则使用`alaya.defaultAccount`属性值。可设置为一个地址或本地钱包alaya.accounts.wallet中的索引序号。
    - `to` - String: 可选，消息的目标地址，对于合约创建交易该字段为`null`。
    - `value` - Number|String|BN|BigNumber: (optional) The value transferred for the transaction in VON, also the endowment if it’s a contract-creation transaction.

    - `gas` - Number: 可选，默认值：待定，用于交易的gas总量，未用完的gas会退还。

    - `gasPrice` - Number|String|BN|BigNumber: 可选，该交易的gas价格，单位为`VON`，默认值为`alaya.gasPrice`属性值。

    - `data` - String: 可选，可以是包含合约方法数据的ABI字符串，或者是合约创建交易中的初始化代码。

    - `nonce` - Number: 可选，使用该字段覆盖使用相同nonce值的挂起交易。
  - `private_key`: 用于签名的私钥。

  返回值：

  返回值是包含32字节长的交易哈希值的HexBytes 。



##### alaya.replaceTransaction()

发送新的交易`new_transaction`，替代原来的交易`transaction_hash`（pending状态）。

调用：

  ```python
  alaya.replaceTransaction`(transaction_hash,new_transaction)
  ```

参数：

  - transaction_hash - string：处于pending状态的交易的hash值。
  - new_transaction - dict：交易对象，包含字段与sendTransaction中的transactionObject一致。

返回值：

new_transaction 的hash值。



##### alaya.generateGasPrice()

使用选中的gas price 策略去计算一个gas price。

调用：

  ```
  alaya.generateGasPrice(gas_price_strategy)
  ```

返回值：

以wei为单位的gas price数值。



##### alaya.setGasPriceStrategy()

设定选定的gas price 策略。

调用：

  ```
  alaya.setGasPriceStrategy(gas_price_strategy)
  ```

参数：

- gas_price_strategy ：(web3, transaction_params) ,必须是一种签名的方法。

返回：

以wei为单位的gas price数值。

##### alaya.modifyTransaction()

发送新的参数，去修正处于pending状态的交易。

调用：

  ```python
  alaya.modifyTransaction(transaction_hash, **transaction_params)
  ```

参数：

  - transaction_hash -string : 处于pending状态的交易的hash值。
  - transaction_params : 与transaction_hash的参数对应的关键词语句。如 value=1000,将原交易中的value值改为1000。

返回：

修正后的交易的hash值。



##### alaya.sign()

方法使用指定的账户对数据进行签名，该账户必须先解锁。

调用：

  ```
  alaya.sign(dataToSign, address )
  ```

参数：

  - `dataToSign`：String - 待签名的数据。对于字符串将首先使用utils.utf8ToHex()方法将其转换为16进制。
  - `address`：String|Number - 用来签名的账户地址。或者本地钱包alaya.accounts.wallet中的地址或其序号。

返回值：

签名结果字符串。



##### alaya.estimateGas()

通过执行一个消息调用来估算交易的gas用量。

调用：

  ```
  alaya.estimateGas(callObject)
  ```

参数：

  - `callObject`：Object - 交易对象，其from属性可选。

返回值：

模拟调用的gas用量。



#### 其他 api

##### alaya.filter

生成一个新的过滤器，根据参数的不同，生成不同类型的过滤器。

调用：

  ```
  alaya.filter(params)
  ```

参数：

  - params

    - `latest`，在节点中创建一个过滤器，以便当新块生成时进行通知。要检查状态是否变化。
    - `pending` ，在节点中创建一个过滤器，以便当产生挂起交易时进行通知。 要检查状态是否发生变化。
    - 字典类数据，创建一个过滤器，以便在客户端接收到匹配的whisper消息时进行通知。



  ```python
  >>> alaya.filter('latest')
  <client_sdk_python.utils.filters.BlockFilter object at 0x0000020640DA1048>
  >>> alaya.filter('pending')
  <client_sdk_python.utils.filters.TransactionFilter object at 0x0000020640DA7C08>
  >>> alaya.filter({'fromBlock': 11529962,  'address': 'atp1ft2fuhh6q8pvpwe4jl3vqc2qhmhqs6ktl7e7g5'})
  <client_sdk_python.eth.PlatON object at 0x10c608220>
  ```

##### alaya.getFilterChanges()

轮询指定的过滤器，并返回自上次轮询之后新生成的日志数组。

调用：

  ```
  alaya.getFilterChanges(filter_id)
  ```

参数：

  - `filter_id` : 指定的过滤器的filter_id 。



  示例：

  ```python

  >>> filt=alaya.filter('latest')
  >>> alaya.getFilterChanges(filt.filter_id)

  [HexBytes('0x54502fa45a69e787187b1033a892b047313818c48ce85bfe1b2a2bf2151ca383'),HexBytes('0x8c3ba2aeba07a2bdfda558f7aaeaadadffd19b4a4e1d940dae3c6844ee0e1102')]

  ```

##### alaya.getFilterLogs()

轮询指定的过滤器，并返回对应的日志数组。

调用：

  ```
  alaya.getFilterLogs(filter_id)
  ```

参数：

  - `filter_id` : 指定的过滤器的filter_id 。



##### alaya.uninstallFilter()

卸载指定的过滤器，返回成功或失败的bool值。

调用：

  ```
  alaya.getFilterLogs(filter_id)
  ```

参数：

- `filter_id` : 指定的过滤器的filter_id

示例：

  ```python
  >>> alaya.uninstallFilter(filt.filter_id)
  True
  ```



##### alaya.getLogs()

根据指定的选项返回历史日志。

调用：

  ```
  alaya.getLogs(options )
  ```

参数：

  - `options`：Object - 过滤器对象，包含如下字段：
    - fromBlock - Number|String: The number of the earliest block ("latest" may be given to mean the most recent and "pending" currently mining, block). By default "latest".
    - toBlock - Number|String: The number of the latest block ("latest" may be given to mean the most recent and "pending" currently mining, block). By default "latest".
    - address - String|Array: An address or a list of addresses to only get logs from particular account(s).
    - topics - Array: An array of values which must each appear in the log entries. The order is important, if you want to leave topics out use null, e.g. [null, '0x12...']. You can also pass an array for each topic with options for that topic e.g. [null, ['option1', 'option2']]

  返回值：

  一个AttributeDict对象，其解析值为日志对象数组。

  数组中的事件对象结构如下：

  - `address` - String: 事件发生源地址。
  - `data` - String: 包含未索引的日志参数。
  - `topics` - Array: 包含最多4个32字节主题的数组，主题1-3包含日志的索引参数。
  - `logIndex` - Number: 事件在块中的索引位置。
  - `transactionIndex` - Number: 包含事件的交易的索引位置。
  - `transactionHash` 32 Bytes - String: 包含事件的交易的哈希值。
  - `blockHash 32 Bytes` - String: 包含事件的块的哈希值，如果处于pending状态，则为`null`。
  - `blockNumber` - Number: 包含事件的块编号，处于pending状态时该字段为`null`。



##### functions()

调用合约函数的入口。

调用：

  ```python
  myContract.functions.myMethod([param1[, param2[, ...]]]).transact(options)
  ```

 参数：

  - `options` - Object：选项，包含如下字段：

    - `from` - String (optional): The address the call “transaction” should be made from.

    - `gasPrice` - String (optional): The gas price in VON to use for this call “transaction”.

    - `gas` - Number (optional): The maximum gas provided for this call “transaction” (gas limit).



##### call()

调用合约的方法，并在合约中直接执行方法，不需要发送任何交易。因此不会改变合约的状态。

调用：

  ```
  myContract.functions.myMethod([param1[, param2[, ...]]]).call()
  ```

参数：

  - [param1[, param2[, ...]]] : 根据myMethod中定义的数据类型输入的参数。

返回值：

解析值为合约方法的返回值，Mixed类型。如果合约方法返回多个值，则解析值为一个对象。

  ```python
  tx_hash1 = payable.functions.setInt64(-9223372036854775808).transact(
      {
          'from':from_address,
          'gas':1500000,
      }
  )
  print(alaya.waitForTransactionReceipt(tx_hash1))
  print('get : {}'.format(
      payable.functions.getInt64().call()
  ))

  #输出
  get : -9223372036854775808
  ```



##### events

订阅指定的合约事件。

调用：

  ```
  myContract.events.MyEvent([options])
  ```

参数：

  - `options` - Object: 可选，用于部署的选项，包含以下字段：
    - `filter` - Object : 可选，按索引参数过滤事件。例如 {filter: {myNumber: [12,13]}} 表示 “myNumber” 为12或13的所有事件。
    - `fromBlock` - Number: 可选，仅监听该选项指定编号的块中发生的事件。
    - `topics` - Array : 可选，用来手动为事件过滤器设定主题。如果设置过filter属性和事件签名，那么(topic[0])将不会自动设置。

返回值：

EventEmitter: 事件发生器，声明有以下事件:

  - "data" 返回 Object: 接收到新的事件时触发，参数为事件对象。
  - "changed" 返回 Object: 当事件从区块链上移除时触发，该事件对象将被添加额外的属性"removed: true"。
  - "error" 返回 Object: 当发生错误时触发。

  返回的事件对象结构如下：

  - `event` - String: 事件名称。
  - `signature` - String|Null: 事件签名，如果是匿名事件，则为`null`。
  - `address` - String: 事件源地址。
  - `returnValues` - Object: 事件返回值，例如 {myVar: 1, myVar2: '0x234...'}。
  - `logIndex` - Number: 事件在块中的索引位置。
  - `transactionIndex` - Number: 事件在交易中的索引位置。
  - `transactionHash 32 Bytes` - String: 事件所在交易的哈希值。
  - `blockHash 32 Bytes` - String: 事件所在块的哈希值，pending的块该值为 `null`。
  - `blockNumber` - Number: 事件所在块的编号，pending的块该值为`null`。
  - `raw.data` - String: 该字段包含未索引的日志参数。
  - `raw.topics` - Array: 最多可保存4个32字节长的主题字符串数组。主题1-3 包含事件的索引参数。

<details>
  <summary><mark><b><font size="3" >部分代码示例：</font></b></mark></summary>

 ```python

  greeter = alaya.contract(address=tx_receipt.contractAddress, abi=abi)

  tx_hash = greeter.functions.setVar(100).transact(
      {
          'from':from_address,
          'gas':1500000,
      }
  )

  tx_receipt = alaya.waitForTransactionReceipt(tx_hash)
  print(tx_receipt)

  topic_param = greeter.events.MyEvent().processReceipt(tx_receipt)
  print(topic_param)

  #输出：
  AttributeDict({'blockHash': HexBytes('0x78fb61da83dae555c8a8a87fc3296f466afeb7f90e9a3b0ac5689e8b34435174'), 'blockNumber': 2014683, 'contractAddress': None, 'cumulativeGasUsed': 43148, 'from': 'atx1uqug0zq7rcxddndleq4ux2ft3tv6dqljphydrl', 'gasUsed': 43148, 'logs': [AttributeDict({'address': 'atp1plhafce07ymacurudqdrewhtrrx4r2nxrju39h', 'topics': [HexBytes('0x6c2b4666ba8da5a95717621d879a77de725f3d816709b9cbe9f059b8f875e284'), HexBytes('0x0000000000000000000000000000000000000000000000000000000000000064')], 'data': '0x', 'blockNumber': 2014683, 'transactionHash': HexBytes('0xe36b5d2b679d5635ab6dd2b620caa50a476fa84bd93bf7b6c8de807f3a9da483'), 'transactionIndex': 0, 'blockHash': HexBytes('0x78fb61da83dae555c8a8a87fc3296f466afeb7f90e9a3b0ac5689e8b34435174'), 'logIndex': 0, 'removed': False})], 'logsBloom': HexBytes('0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000020080000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000004000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000008000000000000000'), 'status': 1, 'to': 'atp1plhafce07ymacurudqdrewhtrrx4r2nxrju39h', 'transactionHash': HexBytes('0xe36b5d2b679d5635ab6dd2b620caa50a476fa84bd93bf7b6c8de807f3a9da483'), 'transactionIndex': 0})
  (AttributeDict({'args': AttributeDict({'_var': 100}), 'event': 'MyEvent', 'logIndex': 0, 'transactionIndex': 0, 'transactionHash': HexBytes('0xe36b5d2b679d5635ab6dd2b620caa50a476fa84bd93bf7b6c8de807f3a9da483'), 'address': 'atp1plhafce07ymacurudqdrewhtrrx4r2nxrju39h', 'blockHash': HexBytes('0x78fb61da83dae555c8a8a87fc3296f466afeb7f90e9a3b0ac5689e8b34435174'), 'blockNumber': 2014683}),)

  ```

  </details>




#### 获取hrp

```
w3 = Web3(HTTPProvider("http://47.241.91.2:6789"),chain_id = 201030)
alaya = PlatON(w3)
# client-sdk-python 1.0.0.2 版本不适配。
print(alaya.getAddressHrp)
```



### 合约

#### 合约介绍

Alaya区块链支持使用solidity语言创建的智能合约(EVM)，同时也支持WebAssembly (WASM)来执行用户编写的智能合约。其中WASM是一种为栈式虚拟机设计的二进制指令集。WASM被设计为可供类似C/C++/Rust等高级语言的平台编译目标，最初设计目的是解决 JavaScript 的性能问题。WASM是由 W3C 牵头正在推进的 Web 标准，并得到了谷歌、微软和 Mozilla 等浏览器厂商的支持。
关于EVM和WASM合约的介绍、创建、编译等详细内容可参考 [Alaya EVM智能合约](https://devdocs.alaya.network/alaya-devdocs/zh-CN/EVM_Smart_Contract/) 和 [Alaya WASM智能合约](https://devdocs.alaya.network/alaya-devdocs/zh-CN/WASM_Smart_Contract/)。



#### 合约编译

python sdk目前支持EVM、WASM合约编译后形成的bin和abi作为合约数据与Alaya区块链进行交互。

- EVM合约(使用solidity语言创建)可使用`platon-truffle`进行编译、部署、调用。具体可参考[solidity编译器](https://github.com/AlayaNetwork/solidity) 与[platon-truffle](https://platon-truffle.readthedocs.io/en/v0.13.1/getting-started/installation.html) 。
- WASM合约(使用C/C++/Rust等语言创建)可使用`PlatON-CDT` 或者`platon-truffle`进行编译、部署、调用。具体可参考[PlatON-CDT 编译器](https://github.com/AlayaNetwork/PlatON-CDT/tree/feature/WASM) 。



#### SDK 对EVM合约的调用

##### 使用platon-truffle在本机对EVM合约进行编译

获得bin与abi。以Helloworld合约为例。使用`platon-truffle`对Helloworld.sol编译后，产生的build/contracts/HelloWorld.json中，获取其中的abi和bytecode(即bin)。

##### 通过python SDK对Helloworld合约部署

首先通过Web3连接节点，`from_address`为节点上的账户地址，bytecode、abi即为EVM合约编译后的bin和abi。

<details>
  <summary><mark><b><font size="3" >部分代码示例：</font></b></mark></summary>

```python

    from hexbytes import HexBytes
    from client_sdk_python import Web3, HTTPProvider
    from client_sdk_python.eth import PlatON
    from platon_keys.utils import bech32,address
    from client_sdk_python.packages.eth_utils import to_checksum_address

    true = True
    false = False

    w3 = Web3(HTTPProvider("http://47.241.91.2:6789"),chain_id = 201030)
    alaya = PlatON(w3)
    print(w3.isConnected())

    from_address = "atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp"

    bytecode = '0x608060405234801561001057600080fd5b50610429806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806317d7de7c1461003b578063c47f0027146100be575b600080fd5b6100436101f2565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610083578082015181840152602081019050610068565b50505050905090810190601f1680156100b05780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610177600480360360208110156100d457600080fd5b81019080803590602001906401000000008111156100f157600080fd5b82018360208201111561010357600080fd5b8035906020019184600183028401116401000000008311171561012557600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610294565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101b757808201518184015260208101905061019c565b50505050905090810190601f1680156101e45780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b606060008054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561028a5780601f1061025f5761010080835404028352916020019161028a565b820191906000526020600020905b81548152906001019060200180831161026d57829003601f168201915b5050505050905090565b606081600090805190602001906102ac92919061034f565b5060008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103435780601f1061031857610100808354040283529160200191610343565b820191906000526020600020905b81548152906001019060200180831161032657829003601f168201915b50505050509050919050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061039057805160ff19168380011785556103be565b828001600101855582156103be579182015b828111156103bd5782518255916020019190600101906103a2565b5b5090506103cb91906103cf565b5090565b6103f191905b808211156103ed5760008160009055506001016103d5565b5090565b9056fea265627a7a72315820c704da051789dd93ae9c3d1c876c282314bd25861550841a9f97522f8f064a4f64736f6c63430005110032'

    abi = [{"constant": False,"inputs": [{"internalType": "string","name": "_name","type": "string"}],"name": "setName","outputs": [{"internalType": "string","name": "","type": "string"}],"payable": False,"stateMutability": "nonpayable","type": "function"},{"constant": True,"inputs": [],"name": "getName","outputs": [{"internalType": "string","name": "","type": "string"}],"payable": False,"stateMutability": "view","type": "function"}]

    #输出
    True
```

</details>


  ​     然后通过函数`contract_deploy(bytecode, fromAddress)`，以发送交易的方式在Alaya区块链的节点上部署EVM合约,返回交易哈希`transactionHash` 。

  ​     `tx_receipt`为`alaya.waitForTransactionReceipt`解析`transactionHash` 后获得的部署回执（部署也是一种交易，交易通过`alaya.waitForTransactionReceipt`获得交易回执）。


<details>
  <summary><mark><b><font size="3" >部分代码示例：</font></b></mark></summary>

  ```python

  def contract_deploy(bytecode, fromAddress):
      bytecode = bytecode
      transactionHash = alaya.sendTransaction(
          {
              "from": fromAddress,
              "gas": 1000000,
              "gasPrice": 1000000000,
              "data": bytecode,
          }
      )
      transactionHash = HexBytes(transactionHash).hex().lower()
      return transactionHash

  tx = contract_deploy(bytecode, from_address)
  print(tx)
  tx_receipt = alaya.waitForTransactionReceipt(tx)
  print(tx_receipt)
  contractAddress = tx_receipt.contractAddress

  ```

</details>

**alaya.sendTransaction（参数）**

  参数：

- `from` : 发送交易的账户地址

- `data` :  发送到链上的数据

- `gas`：交易的燃料量

- `gasPrice`：燃料价格，需写入合理的数值



若部署成功，输出结果如下

```python

#输出
0x143efc88f581c4356156519cde51064222ec5a42fcb4d83400a8b11893a95074
AttributeDict({'blockHash': HexBytes('0xf73097d8e7b2cc385910a4af3a4dbc7588774bad3f2b6589052503b649af1525'), 'blockNumber': 305798, 'contractAddress': 'atx1ws7m2tqr55h8xs7e3jg5svlyu0lk9ktpx03cke', 'cumulativeGasUsed': 319449, 'from': 'atx1yjjzvjph3tw4h2quw6mse25y492xy7fzwdtqja', 'gasUsed': 319449, 'logs': [], 'logsBloom': HexBytes('0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'), 'status': 1, 'to': None, 'transactionHash': HexBytes('0x143efc88f581c4356156519cde51064222ec5a42fcb4d83400a8b11893a95074'), 'transactionIndex': 0})
atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp
```

其中：

- 第一行数据为函数contract_deploy中的alaya.sendTransaction的交易结果。
- 第二行数据为alaya.waitForTransactionReceipt获得的交易回执。
- 第三行为合约部署成功的合约地址。



##### 对Helloworld合约进行调用(交易发送)

在之前合约部署成功的基础上，进行交易发送。

首先定义一个函数`SendTxn(txn)`。

包含：签名交易 `alaya.account.signTransaction` （私钥签名）、

  ​            发送交易 `alaya.sendRawTransaction`。

  ​            获得交易回执 `alaya.waitForTransactionReceipt`。

  ```python
  send_privatekey = "<私钥地址>"
  def SendTxn(txn):
      signed_txn = alaya.account.signTransaction(txn,private_key=send_privatekey)
      res = alaya.sendRawTransaction(signed_txn.rawTransaction).hex()
      txn_receipt = alaya.waitForTransactionReceipt(res)
      print(res)
      return txn_receipt

  ```

建立合约实例 contract_instance，因为是EVM合约，所以使用函数contract。若是WASM合约，则对应函数wasmcontract。

通过functions调用方法ifControl，输入参数20，通过buildTransaction发送交易信息

<details>
  <summary><mark><b><font size="3" >部分代码示例：</font></b></mark></summary>

  ```python
  contract_instance = alaya.contract(address=contractAddress, abi=abi)

  txn = contract_instance.functions.ifControl(20).buildTransaction(
      {
          'chainId':201030,
          'nonce':alaya.getTransactionCount(from_address),
          'gas':2000000,
          'value':0,
          'gasPrice':1000000000,
      }
  )

  print(SendTxn(txn))

  result = contract_instance.functions.getIfControlResult().call()
  print(result)
  ```
</details>

参数：

- `chainId`：链id

- `nonce`：序号

- `gas`：燃料

- `value`： 值（新建合约账户的开始余额）

- `gasPrice`： 燃料价格

  需写入合理的数值，调用方法`ifControl`，成功将参数20传入链上。然后通过对应方法`getIfControlResult`获得链上的对应信息和数据。


其中:

- 第一行数据为函数`SendTxn`中的`alaya.sendRawTransaction`的交易结果。

-  第二行数据为方法`ifControl`向链上发送信息，交易的结果。

- 第三行为方法`getIfControlResult`获取链上信息，交易的结果。

##### EVM合约的事件调用

EVM合约通过事件可对相关交易的详细信息进行监听和日志记录输出，以evmevent合约为例：其在方法setVar中加入了event类型MyEvent。

greeter为部署成功的EVM合约。

先通过functions调用setVar,将参数传到链上，然后通过greeter.events.MyEvent()，调用事件输出交易的详细日志。

其中events方法为合约专用的事件api。

<details>
  <summary><mark><b><font size="3" >部分代码示例：</font></b></mark></summary>

  ```python
  greeter = alaya.contract(address=tx_receipt.contractAddress, abi=abi)

  tx_hash = greeter.functions.setVar(100).transact(
      {
          'from':from_address,
          'gas':1500000,
      }
  )

  tx_receipt = alaya.waitForTransactionReceipt(tx_hash)
  print(tx_receipt)

  topic_param = greeter.events.MyEvent().processReceipt(tx_receipt)
  print(topic_param)
  ```

</details>

成功运行后输出：

  ```python
  AttributeDict({'blockHash': HexBytes('0x78fb61da83dae555c8a8a87fc3296f466afeb7f90e9a3b0ac5689e8b34435174'), 'blockNumber': 2014683, 'contractAddress': None, 'cumulativeGasUsed': 43148, 'from': 'atp1uqug0zq7rcxddndleq4ux2ft3tv6dqljphydrl', 'gasUsed': 43148, 'logs': [AttributeDict({'address': 'atp1vc6phdxhdkmztpznv5ueduw6cae3swe40whlsn', 'topics': [HexBytes('0x6c2b4666ba8da5a95717621d879a77de725f3d816709b9cbe9f059b8f875e284'), HexBytes('0x0000000000000000000000000000000000000000000000000000000000000064')], 'data': '0x', 'blockNumber': 2014683, 'transactionHash': HexBytes('0xe36b5d2b679d5635ab6dd2b620caa50a476fa84bd93bf7b6c8de807f3a9da483'), 'transactionIndex': 0, 'blockHash': HexBytes('0x78fb61da83dae555c8a8a87fc3296f466afeb7f90e9a3b0ac5689e8b34435174'), 'logIndex': 0, 'removed': False})], 'logsBloom': HexBytes('0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000020080000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000004000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000008000000000000000'), 'status': 1, 'to': 'atp1vc6phdxhdkmztpznv5ueduw6cae3swe40whlsn', 'transactionHash': HexBytes('0xe36b5d2b679d5635ab6dd2b620caa50a476fa84bd93bf7b6c8de807f3a9da483'), 'transactionIndex': 0})
  (AttributeDict({'args': AttributeDict({'_var': 100}), 'event': 'MyEvent', 'logIndex': 0, 'transactionIndex': 0, 'transactionHash': HexBytes('0xe36b5d2b679d5635ab6dd2b620caa50a476fa84bd93bf7b6c8de807f3a9da483'), 'address': 'atx1vc6phdxhdkmztpznv5ueduw6cae3swe40whlsn', 'blockHash': HexBytes('0x78fb61da83dae555c8a8a87fc3296f466afeb7f90e9a3b0ac5689e8b34435174'), 'blockNumber': 2014683}),)
  ```


第一行为调用函数`setVar`，交易成功后的交易回执。

第二行为调用事件`MyEvent()`，获取的交易日志信息。

其中'args'对应的值中：

 '_var'为唯一的参数值，而在EVM合约的event中，数据的基本类型为`uint`、`int`、`bool`、`address`、`bytex`。



#### SDK 对WASM合约的调用：

##### 使用PlatON-CDT在本机对WASM合约进行编译

以wasmcontract.cpp为例。本机安装PlatON-CDT成功后，在PlatON-CDT/build/bin中输入代码 。

  ```
  platon-cpp wasmcontract.cpp
  ```

编译成功后，在wasmcontract/build/contracts中有两个文件。

wasmcontract.abi.json 与 wasmcontract.WASM，其中wasmcontract.abi.json为abi数据（json格式）， wasmcontract.WASM为bin数据（二进制格式）。

  ```python
   import binascii
   f = open('D:/wasmcontract.WASM','rb')
   contents=f.read()
   bytecode=binascii.b2a_hex(contents)
  ```

因为我们的链上识别的是16进制的数据，所以需通过类似`binascii.b2a_hex`等方法，把二进制的.WASM转换为16进制的bytecode。方便我们链上识别。

##### 通过python SDK对Helloworld合约(WASM类型)部署

获取WASM合约的bin和abi之后，通过Web3在链上进行部署。

下面代码中bytecode即为合约的bin数据，cabi即为合约的abi数据。

<details>
  <summary><mark><b><font size="3" >部分代码示例：</font></b></mark></summary>

  ```python

  from client_sdk_python import Web3, HTTPProvider
  from client_sdk_python.eth import PlatON

  true = True
  false = False

  w3 = Web3(HTTPProvider("http://47.241.91.2:6789"),chain_id = 201030)
  alaya = PlatON(w3)
  print(w3.isConnected())
  from_address = "atp1uqug0zq7rcxddndleq4ux2ft3tv6dqljphydrl"

  bytecode='0061736d01000000015c1060027f7f0060017f017f60027f7f017f60017f0060037f7f7f017f60037f7f7f0060047f7f7f7f0060000060047f7f7f7f017f60027f7e0060017f017e60037f7e7e0060037f7e7e017f60017e017f60057f7f7f7f7f006000017f02ce010903656e760c706c61746f6e5f70616e6963000703656e760b706c61746f6e5f73686133000603656e7617706c61746f6e5f6765745f696e7075745f6c656e677468000f03656e7610706c61746f6e5f6765745f696e707574000303656e7617706c61746f6e5f6765745f73746174655f6c656e677468000203656e7610706c61746f6e5f6765745f7374617465000803656e7610706c61746f6e5f7365745f7374617465000603656e760c706c61746f6e5f6576656e74000603656e760d706c61746f6e5f72657475726e000003cd01cb010700020200040000010202020302020500000e000000020001000200010002000001020600020002000200000204000002010102040506000303010400050402050500000104020503010001040c00040b01000004080304000107070704050a0a030103010101010101010d09010000000003000100020100010001010001010a0d09000100000100000201000100010001000001000100010003010001000108030100020100090001030100010100000c0b0208000300000003030105070501010206000600000000000405017001050505030100020608017f0141908c040b073904066d656d6f72790200115f5f7761736d5f63616c6c5f63746f727300090f5f5f66756e63735f6f6e5f65786974006506696e766f6b650063090a010041010b04202124250af0b902cb01050010c7010baa0301097f230041c0016b22022400200241b908100b2104200241e8006a4102100c2103200241d8006a2004100d200241c8006a2000100d200241406b4100360200200241386a4200370300200241306a420037030020024200370328200241286a20022802582204200228025c100e20022802482205200228024c100e210620032002280228100f2003200241d8006a10102003200241c8006a1010200328020c200341106a28020047044010000b2003280204210720032802002108200241106a1011210020024180016a200110122101200241a8016a4100360200200241a0016a420037030020024198016a4200370300200242003703900120024190016a41001013200241b0016a200110121014410110132109200228029001210a200941046a10152000200a100f20004101101620024190016a200110121017220028020c200041106a28020047044010000b20082007200028020020002802041007200028020c22010440200020013602100b200641046a1015200504402002200536024c0b200404402002200436025c0b200328020c22000440200320003602100b200241c0016a24000b910101027f20004200370200200041086a410036020020012102024003402002410371044020022d0000450d02200241016a21020c010b0b2002417c6a21020340200241046a22022802002203417f73200341fffdfb776a7141808182847871450d000b0340200341ff0171450d01200241016a2d00002103200241016a21020c000b000b20002001200220016b105020000b1d0020001051200041146a41003602002000420037020c2000200110160b8b0101037f230041306b22032400200341186a1011220220011052100f2002200341086a200110121017220128020c200141106a28020047044010000b200041003602082000420037020020012802042102200128020021042000412010532004200220002802002202200028020420026b1001200128020c22000440200120003602100b200341306a24000b8b0101017f024020012002460440410121030c010b4101210302400240200220016b2202410146044020012c0000417f4c0d010c030b200241374b0d010b200241016a21030c010b2002105420026a41016a21030b027f200041186a28020022010440200041086a280200200041146a280200200110550c010b20000b2201200128020020036a36020020000b1300200028020820014904402000200110570b0b1600200020012802002200200128020420006b10581a0b190020001051200041146a41003602002000420037020c20000b4d01017f20004200370200200041086a2202410036020020012d0000410171450440200020012902003702002002200141086a28020036020020000f0b200020012802082001280204105020000bc30c02077f027e230041306b22042400200041046a2107027f20014101460440200041086a280200200041146a280200200041186a220228020022031055280200210120022003417f6a3602002007105a4180104f044020072000410c6a280200417c6a105b0b200141384f047f2001105420016a0520010b41016a2102200041186a28020022010440200041086a280200200041146a280200200110550c020b20000c010b02402007105a0d00200041146a28020022014180084f0440200020014180786a360214200041086a2201280200220228020021032001200241046a360200200420033602182007200441186a105c0c010b2000410c6a2802002202200041086a2802006b4102752203200041106a2205280200220620002802046b2201410275490440418020103a2105200220064704400240200028020c220120002802102202470d0020002802082203200028020422064b04402000200320012003200320066b41027541016a417e6d41027422026a105d220136020c2000200028020820026a3602080c010b200441186a200220066b2201410175410120011b22012001410276200041106a105e2102200028020c210320002802082101034020012003470440200228020820012802003602002002200228020841046a360208200141046a21010c010b0b200029020421092000200229020037020420022009370200200029020c21092000200229020837020c200220093702082002105f200028020c21010b200120053602002000200028020c41046a36020c0c020b02402000280208220120002802042202470d00200028020c2203200028021022064904402000200120032003200620036b41027541016a41026d41027422026a106022013602082000200028020c20026a36020c0c010b200441186a200620026b2201410175410120011b2201200141036a410276200041106a105e2102200028020c210320002802082101034020012003470440200228020820012802003602002002200228020841046a360208200141046a21010c010b0b200029020421092000200229020037020420022009370200200029020c21092000200229020837020c200220093702082002105f200028020821010b2001417c6a2005360200200020002802082201417c6a22023602082002280200210220002001360208200420023602182007200441186a105c0c010b20042001410175410120011b20032005105e2102418020103a2106024020022802082201200228020c2203470d0020022802042205200228020022084b04402002200520012005200520086b41027541016a417e6d41027422036a105d22013602082002200228020420036a3602040c010b200441186a200320086b2201410175410120011b22012001410276200241106a280200105e21032002280208210520022802042101034020012005470440200328020820012802003602002003200328020841046a360208200141046a21010c010b0b2002290200210920022003290200370200200320093702002002290208210920022003290208370208200320093702082003105f200228020821010b200120063602002002200228020841046a360208200028020c2105034020002802082005460440200028020421012000200228020036020420022001360200200228020421012002200536020420002001360208200029020c21092000200229020837020c200220093702082002105f052005417c6a210502402002280204220120022802002203470d0020022802082206200228020c22084904402002200120062006200820066b41027541016a41026d41027422036a106022013602042002200228020820036a3602080c010b200441186a200820036b2201410175410120011b2201200141036a4102762002280210105e21062002280208210320022802042101034020012003470440200428022020012802003602002004200428022041046a360220200141046a21010c010b0b20022902002109200220042903183702002002290208210a20022004290320370208200420093703182004200a3703202006105f200228020421010b2001417c6a200528020036020020022002280204417c6a3602040c010b0b0b200441186a20071061200428021c410036020041012102200041186a0b2201200128020020026a360200200441306a240020000ba10101037f41012103024002400240200128020420012d00002202410176200241017122041b220241014d0440200241016b0d032001280208200141016a20041b2c0000417f4c0d010c030b200241374b0d010b200241016a21030c010b2002105420026a41016a21030b027f200041186a28020022010440200041086a280200200041146a280200200110550c010b20000b2201200128020020036a36020020000bea0101047f230041106b22042400200028020422012000280210220241087641fcffff07716a2103027f410020012000280208460d001a2003280200200241ff07714102746a0b2101200441086a20001061200428020c210203400240200120024604402000410036021420002802082103200028020421010340200320016b41027522024103490d022000200141046a22013602040c000b000b200141046a220120032802006b418020470d0120032802042101200341046a21030c010b0b2002417f6a220241014d04402000418004418008200241016b1b3602100b20002001105b200441106a24000b8e0201057f2001044020002802042105200041106a2802002202200041146a280200220349044020022001ad2005ad422086843702002000200028021041086a36021020000f0b027f41002002200028020c22046b410375220641016a2202200320046b2203410275220420042002491b41ffffffff01200341037541ffffffff00491b2204450d001a2004410374103a0b2102200220064103746a22032001ad2005ad4220868437020020032000280210200028020c22066b22016b2105200220044103746a2102200341086a2103200141014e044020052006200110361a0b20002002360214200020033602102000200536020c20000f0b200041c00110d201200041004100410110ce0120000b2c01017f20002001280208200141016a20012d0000220041017122021b2001280204200041017620021b10580bc80301087f230041c0016b22032400200341ac08100b2105200341e8006a4102100c2104200341d8006a2005100d200341c8006a2000100d200341406b4100360200200341386a4200370300200341306a420037030020034200370328200341286a20032802582205200328025c100e20032802482206200328024c100e210720042003280228100f2004200341d8006a10102004200341c8006a1010200428020c200441106a28020047044010000b2004280204210820042802002109200341106a1011210020034180016a200110122101200320023b018c01200341a8016a4100360200200341a0016a420037030020034198016a4200370300200342003703900120034190016a41001013200341b0016a200110121014220220032f018c0110192002410110132102200328029001210a200241046a10152000200a100f20004102101620034190016a200110121017220020032f018c01101a200028020c200041106a28020047044010000b20092008200028020020002802041007200028020c22010440200020013602100b200741046a1015200604402003200636024c0b200504402003200536025c0b200428020c22000440200420003602100b200341c0016a24000b0c0020002001ad420010561a0b0b0020002001ad420010590bf20301067f230041d0016b22052400200541086a419f08100b2107200541f0006a4103100c2106200541e0006a2007100d200541d0006a2000100d200541c8006a4100360200200541406b4200370300200541386a420037030020054200370330200541306a200528026022002005280264100e200528025022072005280254100e22082001101920062005280230100f2006200541e0006a10102006200541d0006a101020062001101a200628020c200641106a28020047044010000b200628020421092006280200210a200541186a1011210120054188016a20021012210220052004360298012005200336029401200541b8016a4100360200200541b0016a4200370300200541a8016a4200370300200542003703a001200541a0016a41001013200541c0016a2002101210142203200528029401101920032005280298011019200341011013210320052802a0012104200341046a101520012004100f200141031016200541a0016a2002101210172201200528029401101a2001200528029801101a200128020c200141106a28020047044010000b200a2009200128020020012802041007200128020c22020440200120023602100b200841046a101520070440200520073602540b20000440200520003602640b200628020c22010440200620013602100b200541d0016a24000b2e01017f230041206b22022400200241106a418d08100b2002419908100b100a200020013a0010200241206a24000b3301017f230041206b22022400200241106a418008100b2002418708100b20011018200041286a20013b0100200241206a24000b3701017f230041206b22022400200241106a418008100b20012002418708100b20012001101b200041406b2001360200200241206a24000b930201047f20002001470440200128020420012d00002202410176200241017122041b2102200141016a210320012802082105410a21012005200320041b210420002d0000410171220304402000280200417e71417f6a21010b200220014d0440027f2003044020002802080c010b200041016a0b21012002044020012004200210490b200120026a41003a000020002d000041017104402000200236020420000f0b200020024101743a000020000f0b416f2103200141e6ffffff074d0440410b20014101742201200220022001491b220141106a4170712001410b491b21030b2003103a22012004200210c801200020023602042000200341017236020020002001360208200120026a41003a00000b20000b0d00200041b0016a20013a00000b0b00200041b0016a2c00000b230020002001101f1a2000410c6a2001410c6a101f1a200041186a200141186a101f1a0b25002000200110121a2000410c6a2001410c6a10121a200041186a200141186a10121a20000b0d00200041c8026a20013a00000b0b00200041c8026a2c00000b9e0101047f2000200147044020012802042203200128020022026b41017522042000280208200028020022016b4101754d0440200041046a21052004200028020420016b41017522004b04402002200220004101746a22002001104e1a20002003200510460f0b2005200220032001104e3602000f0b2001044020004100360208200042003702000b200020002004104f104c20022003200041046a10460b0b3e01017f2000420037020020004100360208200128020420012802006b2202044020002002410175104c20012802002001280204200041046a10460b20000b3001027f200141046a21032001280200210203402002200346044020004188046a20011029052002102a21020c010b0b0be00201067f230041206b22042400024020002001460d00200141046a21062001280200210102402000280208450d00200028020021032000200041046a3602002000410036020820002802042102200041003602042002410036020820032802042202200320021b2102034020022203450d0120012006470440200341106a200141106a101f21072003411c6a2001411c6a101f1a024020032802082202450440410021020c010b2003200228020022054604402002410036020020022802042205450d012005104321020c010b200241003602042005450d002005104321020b2000200441106a2007104421072000200428021020072003103f2001102a21010c010b0b0340200328020822030d000b200621010b034020012006460d01200441106a2000200141106a104a20002004410c6a2004280210220341106a104421022000200428020c20022003103f2001102a21010c000b000b200441206a24000b3601017f024020002802042201044003402001220028020022010d000c020b000b0340200020002802082200280200470d000b0b20000bd60101067f230041106b22022400200042003702042000200041046a2203360200200141046a21062001280200210103402001200646450440200141106a21050240027f027f0240024020032000280200460440200321040c010b2003103b220441106a2005103c450d010b20032802004504402002200336020c2003210420030c030b2002200436020c200441046a0c010b20002002410c6a2005103d0b22042802000d01200228020c0b2107200220002005104a2000200720042002280200103f0b2001102a21010c010b0b200241106a240020000b2300200041d0016a2001101f1a20004198016a20033a0000200041f8026a20023602000b920101047f2000200147044020012802042203200128020022026b22042000280208200028020022016b4d0440200041046a21052004200028020420016b22004b04402002200020026a2200200110471a20002003200510460f0b200520022003200110473602000f0b2001044020004100360208200042003702000b2000200020041048104520022003200041046a10460b0b3b01017f2000420037020020004100360208200128020420012802006b2202044020002002104520012802002001280204200041046a10460b20000b2601017f0340200241f800470440200020026a200120026a101f1a2002410c6a21020c010b0b0b2301017f0340200020026a200120026a10121a2002410c6a220241f800470d000b20000b130020002001101f1a2000200128020c36020c0b15002000200110121a2000200128020c36020c20000b3001027f200141046a210320012802002102034020022003460440200041f8066a20011034052002102a21020c010b0b0bd30201067f230041206b22042400024020002001460d00200141046a21062001280200210102402000280208450d00200028020021032000200041046a3602002000410036020820002802042102200041003602042002410036020820032802042202200320021b2102034020022203450d0120012006470440200341106a200141106a101f2107024020032802082202450440410021020c010b2003200228020022054604402002410036020020022802042205450d012005104321020c010b200241003602042005450d002005104321020b2000200441106a2007104421072000200428021020072003103f2001102a21010c010b0b0340200328020822030d000b200621010b034020012006460d01200441106a2000200141106a103e20002004410c6a2004280210220341106a104421022000200428020c20022003103f2001102a21010c000b000b200441206a24000bd60101067f230041106b22022400200042003702042000200041046a2203360200200141046a21062001280200210103402001200646450440200141106a21050240027f027f0240024020032000280200460440200321040c010b2003103b220441106a2005103c450d010b20032802004504402002200336020c2003210420030c030b2002200436020c200441046a0c010b20002002410c6a2005103d0b22042802000d01200228020c0b2107200220002005103e2000200720042002280200103f0b2001102a21010c010b0b200241106a240020000bfc0801067f03400240200020046a2105200120046a210320022004460d002003410371450d00200520032d00003a0000200441016a21040c010b0b200220046b210602402005410371220745044003402006411049450440200020046a2203200120046a2205290200370200200341086a200541086a290200370200200441106a2104200641706a21060c010b0b027f2006410871450440200120046a2103200020046a0c010b200020046a2205200120046a2204290200370200200441086a2103200541086a0b21042006410471044020042003280200360200200341046a2103200441046a21040b20064102710440200420032f00003b0000200341026a2103200441026a21040b2006410171450d01200420032d00003a000020000f0b024020064120490d002007417f6a220741024b0d00024002400240024002400240200741016b0e020102000b2005200120046a220328020022073a0000200541016a200341016a2f00003b0000200041036a2108200220046b417d6a2106034020064111490d03200420086a2203200120046a220541046a2802002202410874200741187672360200200341046a200541086a2802002207410874200241187672360200200341086a2005410c6a28020022024108742007411876723602002003410c6a200541106a2802002207410874200241187672360200200441106a2104200641706a21060c000b000b2005200120046a220328020022073a0000200541016a200341016a2d00003a0000200041026a2108200220046b417e6a2106034020064112490d03200420086a2203200120046a220541046a2802002202411074200741107672360200200341046a200541086a2802002207411074200241107672360200200341086a2005410c6a28020022024110742007411076723602002003410c6a200541106a2802002207411074200241107672360200200441106a2104200641706a21060c000b000b2005200120046a28020022073a0000200041016a21082004417f7320026a2106034020064113490d03200420086a2203200120046a220541046a2802002202411874200741087672360200200341046a200541086a2802002207411874200241087672360200200341086a2005410c6a28020022024118742007410876723602002003410c6a200541106a2802002207411874200241087672360200200441106a2104200641706a21060c000b000b200120046a41036a2103200020046a41036a21050c020b200120046a41026a2103200020046a41026a21050c010b200120046a41016a2103200020046a41016a21050b20064110710440200520032d00003a00002005200328000136000120052003290005370005200520032f000d3b000d200520032d000f3a000f200541106a2105200341106a21030b2006410871044020052003290000370000200541086a2105200341086a21030b2006410471044020052003280000360000200541046a2105200341046a21030b20064102710440200520032f00003b0000200541026a2105200341026a21030b2006410171450d00200520032d00003a00000b20000b2b01027f200141046a210203402002280200220341046a210220012003470d000b200041a80b6a200110380bbe0201057f024020002001460d00200041046a2102200141046a21030340200228020021020240027f4101200328020022032001460d001a20002002470d0141000b210402402000200246044020040d044114103a22054100360200200541086a200341086a10121a20052104410121060340200120032802042203460d024114103a220241086a200341086a10121a2002200436020020042002360204200641016a2106200221040c000b000b200228020022032000280200220128020436020420012802042003360200034020002002460d0420002000280208417f6a360208200228020421020c000b000b2000280200220220053602042005200236020020002004360200200420003602042000200028020820066a3602080c020b200241086a200341086a101f1a200241046a2102200341046a21030c000b000b0b840101037f200041003602082000200036020420002000360200200141046a2102037f20022802002203200146047f2000054114103a22024100360200200241086a200341086a10121a20022000360204200028020021042000200236020020022004360200200420023602042000200028020841016a360208200341046a21020c010b0b0b0b002000410120001b10620b3e01027f024020002802002201044003402001220228020422010d000c020b000b03402000280208220228020020004621012002210020010d000b0b20020bb20101067f02400240200128020420012d00002202410176200241017122031b2205200028020420002d00002202410176200241017122041b2206200520064922071b2202450d002000280208200041016a20041b21002001280208200141016a20031b210103402002450d0120002d0000220320012d00002204460440200141016a2101200041016a21002002417f6a21020c010b0b200320046b22020d010b417f200720062005491b21020b2002411f760b890101027f200041046a2103024020002802042200044002400340024002402002200041106a2204103c0440200028020022040d012001200036020020000f0b20042002103c450d03200041046a210320002802042204450d01200321000b20002103200421000c010b0b2001200036020020030f0b200120003602000c010b200120033602000b20030b2d01017f2000411c103a22033602002000200141046a360204200341106a200210121a200041086a41013a00000b480020032001360208200342003702002002200336020020002802002802002201044020002001360200200228020021030b2000280204200310402000200028020841016a3602080bec0101037f200120002001463a000c03400240024020002001460d00200128020822022d000c0d002002200228020822032802002204460440024020032802042204450d0020042d000c0d002004410c6a21010c030b20012002280200470440200210412002280208220228020821030b200241013a000c200341003a000c200310420f0b02402004450d0020042d000c0d002004410c6a21010c020b20012002280200460440200210422002280208220228020821030b200241013a000c200341003a000c200310410b0f0b200241013a000c200320002003463a000c200141013a0000200321010c000b000b5101027f200020002802042201280200220236020420020440200220003602080b200120002802083602082000280208220220022802002000474102746a200136020020002001360208200120003602000b5101027f200020002802002201280204220236020020020440200220003602080b200120002802083602082000280208220220022802002000474102746a200136020020002001360208200120003602040b1d01017f03402000220128020022000d00200128020422000d000b20010b5c01017f0240200028020422030440034002402002200341106a103c044020032802002200450d040c010b200328020422000d0020012003360200200341046a0f0b200021030c000b000b200041046a21030b2001200336020020030b2001017f20002001103a2202360200200020023602042000200120026a3602080b2800200120006b220141014e044020022802002000200110361a2002200228020020016a3602000b0b1900200120006b2201044020022000200110490b200120026a0b2e01017f2001200028020820002802006b2200410174220220022001491b41ffffffff07200041ffffffff03491b0b8d0301037f024020002001460d00200120006b20026b410020024101746b4d044020002001200210361a0c010b20002001734103712103027f024020002001490440200020030d021a410021030340200120036a2105200020036a2204410371450440200220036b210241002103034020024104490d04200320046a200320056a280200360200200341046a21032002417c6a21020c000b000b20022003460d04200420052d00003a0000200341016a21030c000b000b024020030d002001417f6a21040340200020026a22034103714504402001417c6a21032000417c6a2104034020024104490d03200220046a200220036a2802003602002002417c6a21020c000b000b2002450d042003417f6a200220046a2d00003a00002002417f6a21020c000b000b2001417f6a210103402002450d03200020026a417f6a200120026a2d00003a00002002417f6a21020c000b000b200320056a2101200320046a0b210303402002450d01200320012d00003a00002002417f6a2102200341016a2103200141016a21010c000b000b0b2c01017f20004128103a22033602002000200141046a360204200341106a2002104b200041086a41013a00000b16002000200110121a2000410c6a2001410c6a10121a0b2301017f20002001104d2202360200200020023602042000200220014101746a3602080b09002000410174103a0b2501017f200120006b220141017521032001044020022000200110490b200220034101746a0b2a002001200028020820002802006b220020002001491b41ffffffff07200041017541ffffffff03491b0b5b01027f02402002410a4d0440200020024101743a0000200041016a21030c010b200241106a4170712204103a21032000200236020420002004410172360200200020033602080b20032001200210c801200220036a41003a00000b160020004100360208200042003702002000410010570b5801027f230041306b22012400200141286a4100360200200141206a4200370300200141186a420037030020014200370310200141106a2001200010121014210020012802102102200041046a1015200141306a240020020bdd0101047f024020002802042203200028020022026b22042001490440200028020820036b200120046b22024f04400340200341003a00002000200028020441016a22033602042002417f6a22020d000c030b000b200020011048220104402001103a21050b200420056a220421030340200341003a0000200341016a21032002417f6a22020d000b200120056a210520042000280204200028020022046b22016b2102200141014e044020022004200110361a0b2000200536020820002003360204200020023602000f0b200420014d0d002000200120026a3602040b0b1e01017f03402000044020004108762100200141016a21010c010b0b20010b25002000200120026a417f6a220241087641fcffff07716a280200200241ff07714102746a0b900101027f4101210420014280015441002002501b450440034020012002845045044020024238862001420888842101200341016a2103200242088821020c010b0b200341384f047f2003105420036a0520030b41016a21040b027f200041186a28020022030440200041086a280200200041146a280200200310550c010b20000b2203200328020020046a36020020000b2f01017f2000280208200149044020011062200028020020002802041036210220002001360208200020023602000b0b7001017f4101210302400240024002402002410146044020012c000022024100480d012000200241ff017110d2010c040b200241374b0d01200221030b200020034180017341ff017110d2010c010b2000200210d301200221030b200020012003410010ce010b2000410110d00120000bcf0202037f027e02402001200284500440200041800110d2010c010b20014280015441002002501b4504402001210720022106034020062007845045044020064238862007420888842107200341016a2103200642088821060c010b0b0240200341384f04402003210403402004044020044108762104200541016a21050c010b0b200541c9004f044010000b2000200541b77f6a41ff017110d2012000200028020420056a10d101200028020420002802006a417f6a21052003210403402004450d02200520043a0000200441087621042005417f6a21050c000b000b200020034180017341ff017110d2010b2000200028020420036a10d101200028020420002802006a417f6a210303402001200284500d02200320013c0000200242388620014208888421012003417f6a2103200242088821020c000b000b20002001a741ff017110d2010b2000410110d0010b2801017f200028020820002802046b2201410874417f6a410020011b200028021420002802106a6b0b2501017f200028020821020340200120024645044020002002417c6a22023602080c010b0b0ba10202057f017e230041206b22052400024020002802082202200028020c2203470d0020002802042204200028020022064b04402000200420022004200420066b41027541016a417e6d41027422036a105d22023602082000200028020420036a3602040c010b200541086a200320066b2202410175410120021b220220024102762000410c6a105e2103200028020821042000280204210203402002200446450440200328020820022802003602002003200328020841046a360208200241046a21020c010b0b2000290200210720002003290200370200200320073702002000290208210720002003290208370208200320073702082003105f200028020821020b200220012802003602002000200028020841046a360208200541206a24000b2501017f200120006b220141027521032001044020022000200110490b200220034102746a0b4f01017f2000410036020c200041106a2003360200200104402001410274103a21040b200020043602002000200420024102746a22023602082000200420014102746a36020c2000200236020420000b2b01027f200028020821012000280204210203402001200247044020002001417c6a22013602080c010b0b0b1b00200120006b22010440200220016b22022000200110490b20020b4f01037f20012802042203200128021020012802146a220441087641fcffff07716a21022000027f410020032001280208460d001a2002280200200441ff07714102746a0b360204200020023602000b9b0101047f230041106b220124002001200036020c2000047f41880c200041086a2202411076220041880c2802006a220336020041840c41840c280200220420026a41076a417871220236020002400240200341107420024d044041880c200341016a360200200041016a21000c010b2000450d010b200040000d0010000b20042001410c6a4104103641086a0541000b2100200141106a240020000b090010c701106410650bc52602057f027e230041c0166b2201240010022200106222021003200141d00a6a200141086a20022000106622004100106702400240200141d00a6a10682205500d0041c208106920055104402000106a200141d00a6a106b106c0c020b41c708106920055104402000106d410247044010000b200141d00a6a200041011067200141d00a6a106e2100200141d00a6a106b22022000101c2002106c0c020b41d008106920055104402000106a200141d00a6a106b22032d00102102200141b8086a101122002002106f100f20002002101a200028020c200041106a28020047044010000b200028020020002802041008200028020c22020440200020023602100b2003106c0c020b41d908106920055104402000106d410247044010000b200141d00a6a200041011067200141d00a6a10702100200141d00a6a106b22022000101d2002106c0c020b41e308106920055104402000106a200141d00a6a106b220341286a2f01002102200141b8086a1011220020021071100f20002002101a200028020c200041106a28020047044010000b200028020020002802041008200028020c22020440200020023602100b2003106c0c020b41ed08106920055104402000106d410247044010000b200141d00a6a200041011067200141d00a6a10722100200141d00a6a106b22022000101e2002106c0c020b41f708106920055104402000106a200141d00a6a106b220341406b2802002102200141b8086a1011220020021073100f20002002101a200028020c200041106a28020047044010000b200028020020002802041008200028020c22020440200020023602100b2003106c0c020b418109106920055104402000106d410247044010000b200141d00a6a200041011067200141d00a6a10682105200141d00a6a106b220041d8006a20053703002000106c0c020b418b09106920055104402000106a200141d00a6a106b220241d8006a2903002105200141b8086a1011220020051074100f200020051075200028020c200041106a28020047044010000b200028020020002802041008200028020c22030440200020033602100b2002106c0c020b41950910692005510440200141b8066a107621022000106d410247044010000b200141d00a6a200041011067200141d00a6a20021077200141d00a6a106b220041f8006a200141b8086a20021012101f1a2000106c0c020b419f09106920055104402000106a200141a0046a200141d00a6a106b220241f8006a10122100200141b8086a1011220320001052100f2003200141b8066a200010121017220028020c200041106a28020047044010000b200028020020002802041008200028020c22030440200020033602100b2002106c0c020b41a90910692005510440200141003a00b8082000106d410247044010000b200141d00a6a200041011067200141d00a6a200141b8086a1078200141d00a6a106b22004198016a20012d00b8083a00002000106c0c020b41b109106920055104402000106a200141d00a6a106b22034198016a2d00002102200141b8086a101122002002106f100f20002002101a200028020c200041106a28020047044010000b200028020020002802041008200028020c22020440200020023602100b2003106c0c020b41b909106920055104402000410110790c020b41c1091069200551044020004102107a0c020b41c90910692005510440200141b8066a107b2000106d410247044010000b200141d00a6a200041011067200141d00a6a200141b8066a107c200141d00a6a106b220041d0016a200141b8086a200141b8066a1012101f1a2000106c0c020b41d409106920055104402000106a200141b8066a200141d00a6a106b220241d0016a10121a200141b8086a10112200200141b8066a107d100f2000200141b8066a107e200028020c200041106a28020047044010000b200028020020002802041008200028020c22030440200020033602100b2002106c0c020b41df0910692005510440200141b8066a4124107f1a200141b8066a10800121022000106d410247044010000b200141d00a6a200041011067200141d00a6a2002108101200141d00a6a106b22004190026a200141b8086a2002102310222000106c0c020b41ec09106920055104402000106a200141b8086a200141d00a6a106b22034190026a10232102200141b8066a101122002002108201100f20002002108301200028020c200041106a28020047044010000b200028020020002802041008200028020c22020440200020023602100b2003106c0c020b41f909106920055104402000410310790c020b41810a1069200551044020004104107a0c020b41890a106920055104402000106d410247044010000b200141d00a6a200041011067200141d00a6a1084012100200141d00a6a106b220241e0026a20003b01002002106c0c020b41920a106920055104402000106a200141d00a6a106b220341e0026a2e01002102200141b8086a101122002002108501100f20002002108601200028020c200041106a28020047044010000b200028020020002802041008200028020c22020440200020023602100b2003106c0c020b419b0a106920055104402000106d410247044010000b200141d00a6a200041011067200141d00a6a1087012100200141d00a6a106b220241f8026a20003602002002106c0c020b41a40a106920055104402000106a200141d00a6a106b220341f8026a2802002102200141b8086a101122002002108801100f20002002108601200028020c200041106a28020047044010000b200028020020002802041008200028020c22020440200020023602100b2003106c0c020b41ad0a106920055104402000106d410247044010000b200141d00a6a200041011067200141d00a6a1089012105200141d00a6a106b22004190036a20053703002000106c0c020b41b60a106920055104402000106a200141d00a6a106b22024190036a2903002105200141b8086a101122002005108a01100f20002005108b01200028020c200041106a28020047044010000b200028020020002802041008200028020c22030440200020033602100b2002106c0c020b41bf0a10692005510440200141003602c006200142003703b8062000106d410247044010000b200141d00a6a200041011067200141d00a6a200141b8066a108c01200141d00a6a106b220241e0036a200141b8086a200141b8066a102722001026200028020022030440200020033602040b2002106c20012802b8062200450d02200120003602bc060c020b41c90a106920055104402000106a200141b8066a200141d00a6a106b220341e0036a10272102200141b8086a101122002002108d01100f20002002108e01200028020c200041106a28020047044010000b200028020020002802041008200028020c22040440200020043602100b200228020022000440200220003602040b2003106c0c020b41d30a10692005510440200142003702bc062001200141b8066a4104723602b8062000106d410247044010000b200141d00a6a200041011067200141d00a6a200141b8066a108f01200141d00a6a106b2200200141b8086a200141b8066a102b10282000106c0c020b41da0a106920055104402000106a200141b8066a200141d00a6a106b22034188046a102b2102200141b8086a101122002002109001100f20002002109101200028020c200041106a28020047044010000b200028020020002802041008200028020c22020440200020023602100b2003106c0c020b41e10a10692005510440200141b8086a107b200141003a00c808200141003602c408200141c8086a21022000106d410447044010000b200141d00a6a200041011067200141d00a6a200141b8086a107c200141d00a6a2000410210672001200141d00a6a1087013602c408200141d00a6a200041031067200141d00a6a20021078200141d00a6a106b2100200141b8066a200141b8086a10121a2000200141b8066a20012802c40820012d00c808102c2000106c0c020b41f10a10692005510440200141003602a804200142003703a0042000106d410247044010000b200141d00a6a200041011067200141d00a6a200141a0046a109201200141d00a6a106b220341b0046a200141b8086a200141b8066a200141a0046a102e2200102e2202102d200228020022040440200220043602040b200028020022020440200020023602040b2003106c20012802a0042200450d02200120003602a4040c020b41fa0a106920055104402000106a200141b8066a200141d00a6a106b220341b0046a102e2102200141b8086a1011220020022802002002280204109301100f200020021010200028020c200041106a28020047044010000b200028020020002802041008200028020c22040440200020043602100b200228020022000440200220003602040b2003106c0c020b41830b10692005510440200141b8066a41f800107f1a200141b8066a10940121022000106d410247044010000b200141d00a6a200041011067200141d00a6a2002109501200141d00a6a106b220041c0056a200141b8086a20021030102f2000106c0c020b418c0b106920055104402000106a200141b8086a200141d00a6a106b220341c0056a10302102200141b8066a101122002002109601100f20002002109701200028020c200041106a28020047044010000b200028020020002802041008200028020c22020440200020023602100b2003106c0c020b41950b10692005510440200141b8066a10980121022000106d410247044010000b200141d00a6a200041011067200141d00a6a2002109901200141d00a6a106b220041d0066a200141b8086a2002103210312000106c0c020b419d0b106920055104402000106a200141b8066a200141d00a6a106b220341d0066a10322102200141b8086a101122002002109a01100f20002002109b01200028020c200041106a28020047044010000b200028020020002802041008200028020c22020440200020023602100b2003106c0c020b41a50b10692005510440200142003702bc062001200141b8066a4104723602b8062000106d410247044010000b200141d00a6a200041011067200141d00a6a200141b8066a109c01200141d00a6a106b2200200141b8086a200141b8066a103510332000106c0c020b41ac0b106920055104402000106a200141b8066a200141d00a6a106b220341f8066a10352102200141b8086a101122002002109d01100f20002002109e01200028020c200041106a28020047044010000b200028020020002802041008200028020c22020440200020023602100b2003106c0c020b41b30b10692005510440200141b8066a109f0121022000106d410247044010000b200141d00a6a200041011067200141d00a6a200210a001200141d00a6a106b2100200141206a200141b8066a41800210361a200141b8086a200141206a41800210361a20004190096a200141b8086a41800210361a2000106c0c020b41c00b106920055104402000106a200141a0026a200141d00a6a106b22024190096a41800210361a200141a0066a10112200200141a0026a10a101100f200141a0046a200141a0026a41800210361a200141b8066a200141a0046a41800210361a200141206a200141b8066a41800210361a200141b8086a200141206a41800210361a2000200141b8086a4180021058220028020c200041106a28020047044010000b200028020020002802041008200028020c22030440200020033602100b2002106c0c020b41cd0b10692005510440200141003602c0062001200141b8066a3602bc062001200141b8066a3602b8062000106d410247044010000b200141d00a6a200041011067200141d00a6a200141b8066a10a201200141d00a6a106b2200200141b8086a200141b8066a103922021037200210a3012000106c200141b8066a10a3010c020b41d50b106920055104402000106a200141b8066a200141d00a6a106b220341a80b6a10392102200141b8086a10112200200210a401100f2000200210a501200028020c200041106a28020047044010000b200028020020002802041008200028020c22040440200020043602100b200210a3012003106c0c020b41dd0b10692005510440200141b8086a10a60121022000106d410247044010000b200141d00a6a200041011067200141d00a6a200210a701200141d00a6a106b2100200141b0066a200141c8086a2802002202360200200141a8066a200141c0086a2903002205370300200120012903b80822063703a006200041d80b6a2006370300200041e00b6a2005370300200041e80b6a20023602002000106c0c020b41e80b10692005520d002000106a200141306a2200200141d00a6a106b220241e80b6a280000360200200141286a2203200241e00b6a2900003703002001200241d80b6a290000370320200141b8086a10112204200141206a10a801100f200141b0026a20002802002200360200200141a8026a200329030022053703002001200129032022063703a002200141a8046a2005370300200141b0046a2000360200200141a8066a2005370300200141b0066a2000360200200120063703a004200120063703a006200141c8066a2000360200200141c0066a2005370300200120063703b8062004200141b8066a41141058220028020c200041106a28020047044010000b200028020020002802041008200028020c22030440200020033602100b2002106c0c010b10000b200141c0166a24000b880101037f41f40b410136020041f80b2802002100034020000440034041fc0b41fc0b2802002201417f6a2202360200200141014845044041f40b4100360200200020024102746a22004184016a280200200041046a28020011030041f40b410136020041f80b28020021000c010b0b41fc0b412036020041f80b200028020022003602000c010b0b0b0d00200020012002411c10a9010bd00202067f017e230041106b220324002001280208220520024b0440200341086a200110cd0120012003280208200328020c10cb0136020c2003200110cd01410021052001027f410020032802002207450d001a410020032802042208200128020c2206490d001a200820062006417f461b210420070b360210200141146a2004360200200141003602080b200141106a210603402001280214210402402005200249044020040d01410021040b200020062802002004411410a9011a200341106a24000f0b2003200110cd0141002104027f410020032802002205450d001a410020032802042208200128020c2207490d001a200820076b2104200520076a0b210520012004360214200120053602102003200641002005200410cb0110cc012001200329030022093702102001200128020c2009422088a76a36020c2001200128020841016a22053602080c000b000b880102027f017e230041106b22012400200010aa0102400240200010ab01450d002000280204450d0020002802002d000041c001490d010b10000b200141086a200010ac01200128020c220041094f044010000b200128020821020340200004402000417f6a210020023100002003420886842103200241016a21020c010b0b200141106a240020030b3901027e42a5c688a1c89ca7f94b210103402000300000220250450440200041016a2100200142b383808080207e20028521010c010b0b20010b0e002000106d410147044010000b0bca2901097f230041406a22012400200042ddbe888dc5fcfca4987f370308200041003a0000200141286a1011220320002903081075200328020c200341106a28020047044010000b0240200328020022072003280204220810042205450d002001410036022020014200370318200141186a200510532007200820012802182204200128021c220620046b1005417f47044020002001200441016a20062004417f736a1066106e3a0010200521020b2004450d002001200436021c0b200328020c22040440200320043602100b2002450440200020002d00003a00100b41002102200041003b0118200041206a220442debe888dc5fcfca4987f370300200141286a1011220320042903001075200328020c200341106a28020047044010000b0240200328020022072003280204220810042205450d002001410036022020014200370318200141186a200510532007200820012802182204200128021c220620046b1005417f47044020002001200441016a20062004417f736a106610703b0128200521020b2004450d002001200436021c0b200328020c22040440200320043602100b2002450440200020002f01183b01280b4100210220004100360230200041386a220442dfbe888dc5fcfca4987f370300200141286a1011220320042903001075200328020c200341106a28020047044010000b0240200328020022072003280204220810042205450d002001410036022020014200370318200141186a200510532007200820012802182204200128021c220620046b1005417f47044020002001200441016a20062004417f736a10661072360240200521020b2004450d002001200436021c0b200328020c22040440200320043602100b2002450440200020002802303602400b20004200370348200041d0006a220242d9be888dc5fcfca4987f370300200141286a1011220320022903001075200328020c200341106a28020047044010000b0240200328020022072003280204220810042205450440410021040c010b410021042001410036022020014200370318200141186a200510532007200820012802182202200128021c220620026b1005417f47044020002001200241016a20062002417f736a10661068370358200521040b2002450d002001200236021c0b200328020c22020440200320023602100b2004450440200020002903483703580b200041e0006a10762109200041f0006a220242a7cea8ad82a0ff995b370300200041f8006a10762107200141286a1011220320022903001075200328020c200341106a28020047044010000b0240200328020022082003280204220610042205450440410021040c010b410021042001410036022020014200370318200141186a200510532008200620012802182202200128021c220620026b1005417f4704402001200241016a20062002417f736a106620071077200521040b2002450d002001200236021c0b200328020c22020440200320023602100b200445044020072009101f1a0b41002102200041003a00880120004190016a220442f4a2efb3f6e5b8ad03370300200141286a1011220320042903001075200328020c200341106a28020047044010000b0240200328020022072003280204220810042205450d002001410036022020014200370318200141186a200510532007200820012802182204200128021c220620046b1005417f4704402001200441016a20062004417f736a106620004198016a1078200521020b2004450d002001200436021c0b200328020c22040440200320043602100b2002450440200020002d0088013a0098010b200041003a00a001200041a8016a220342badda0b2f6c5fa8e033703002003200041b0016a10ad01450440200020002d00a0013a00b0010b200042003703b801200041c0016a4100360200200041b8016a10762109200041c8016a2202428aedabfdf7a698fe29370300200041d0016a220710761a200141286a1011220320022903001075200328020c200341106a28020047044010000b0240200328020022082003280204220610042205450440410021040c010b410021042001410036022020014200370318200141186a200510532008200620012802182202200128021c220620026b1005417f4704402001200241016a20062002417f736a10662007107c200521040b2002450d002001200236021c0b200328020c22020440200320023602100b200445044020072009101f1a0b41002102200041e0016a4124107f108001210920004188026a220442d4b7b1edebf7e3f66a37030020004190026a1080012107200141286a1011220320042903001075200328020c200341106a28020047044010000b0240200328020022082003280204220610042205450d002001410036022020014200370318200141186a200510532008200620012802182204200128021c220620046b1005417f4704402001200441016a20062004417f736a10662007108101200521020b2004450d002001200436021c0b200328020c22040440200320043602100b20024504402007200910220b200041003a00b802200041c0026a220342ccacbdb4f8a587a93d3703002003200041c8026a10ad01450440200020002d00b8023a00c8020b200041003b01d002200041d8026a220242cfacbdb4f8a587a93d370300200141286a1011220320022903001075200328020c200341106a28020047044010000b0240200328020022072003280204220810042205450440410021040c010b410021042001410036022020014200370318200141186a200510532007200820012802182202200128021c220620026b1005417f47044020002001200241016a20062002417f736a10661084013b01e002200521040b2002450d002001200236021c0b200328020c22020440200320023602100b2004450440200020002f01d0023b01e0020b41002102200041003602e802200041f0026a220442ceacbdb4f8a587a93d370300200141286a1011220320042903001075200328020c200341106a28020047044010000b0240200328020022072003280204220810042205450d002001410036022020014200370318200141186a200510532007200820012802182204200128021c220620046b1005417f47044020002001200441016a20062004417f736a10661087013602f802200521020b2004450d002001200436021c0b200328020c22040440200320043602100b2002450440200020002802e8023602f8020b200042003703800320004188036a220242c8acbdb4f8a587a93d370300200141286a1011220320022903001075200328020c200341106a28020047044010000b0240200328020022072003280204220810042205450440410021040c010b410021042001410036022020014200370318200141186a200510532007200820012802182202200128021c220620026b1005417f47044020002001200241016a20062002417f736a106610890137039003200521040b2002450d002001200236021c0b200328020c22020440200320023602100b20044504402000200029038003370390030b410021022000410036029803200041a0036a220442e2e780dbeae4fcabe100370300200141286a1011220320042903001075200328020c200341106a28020047044010000b0240200328020022072003280204220810042205450d002001410036022020014200370318200141186a200510532007200820012802182204200128021c220620046b1005417f47044020002001200441016a20062004417f736a106610723602a803200521020b2004450d002001200436021c0b200328020c22040440200320043602100b200245044020002000280298033602a8030b200042003703b003200041b8036a220242b3debf9dbddf9ca832370300200141286a1011220320022903001075200328020c200341106a28020047044010000b0240200328020022072003280204220810042205450440410021040c010b410021042001410036022020014200370318200141186a200510532007200820012802182202200128021c220620026b1005417f47044020002001200241016a20062002417f736a106610683703c003200521040b2002450d002001200236021c0b200328020c22020440200320023602100b2004450440200020002903b0033703c0030b200042003702c80341002102200041e8036a4100360200200041e0036a22074200370200200041d8036a2204429fe6c89bc186c5be1d370300200041d0036a4100360200200141286a1011220320042903001075200328020c200341106a28020047044010000b0240200328020022082003280204220610042205450d002001410036022020014200370318200141186a200510532008200620012802182204200128021c220920046b1005417f4704402001200441016a20092004417f736a10662007108c01200521020b2004450d002001200436021c0b200328020c22040440200320043602100b20024504402007200041c8036a10260b200041f4036a220342003702002000418c046a2202420037020020004180046a2204428cbcadf0bacdb08975370300200020033602f00320004188046a22072002360200200141286a1011220320042903001075200328020c200341106a28020047044010000b0240200328020022082003280204220610042205450440410021040c010b410021042001410036022020014200370318200141186a200510532008200620012802182202200128021c220920026b1005417f4704402001200241016a20092002417f736a10662007108f01200521040b2002450d002001200236021c0b200328020c22020440200320023602100b20044504402007200041f0036a10290b200042003702980441002102200041b8046a4100360200200041b0046a22074200370200200041a8046a220442bd8ce2969cacfba4b07f370300200041a0046a4100360200200141286a1011220320042903001075200328020c200341106a28020047044010000b0240200328020022082003280204220610042205450d002001410036022020014200370318200141186a200510532008200620012802182204200128021c220920046b1005417f4704402001200441016a20092004417f736a10662007109201200521020b2004450d002001200436021c0b200328020c22040440200320043602100b2002450440200720004198046a102d0b41002102200041c0046a41f800107f1094012109200041b8056a2204429fa88ce0a0829ecea47f370300200041c0056a1094012107200141286a1011220320042903001075200328020c200341106a28020047044010000b0240200328020022082003280204220610042205450d002001410036022020014200370318200141186a200510532008200620012802182204200128021c220620046b1005417f4704402001200441016a20062004417f736a10662007109501200521020b2004450d002001200436021c0b200328020c22040440200320043602100b200245044020072009102f0b200041b8066a1098012109200041c8066a220242bcf8d4f484c7a18d807f370300200041d0066a1098012107200141286a1011220320022903001075200328020c200341106a28020047044010000b0240200328020022082003280204220610042205450440410021040c010b410021042001410036022020014200370318200141186a200510532008200620012802182202200128021c220620026b1005417f4704402001200241016a20062002417f736a10662007109901200521040b2002450d002001200236021c0b200328020c22020440200320023602100b20044504402007200910310b200041e4066a22034200370200200041fc066a22024200370200200041f0066a220442eafdbbb690ac81edca00370300200020033602e006200041f8066a22072002360200200141286a1011220320042903001075200328020c200341106a28020047044010000b0240200328020022082003280204220610042205450440410021040c010b410021042001410036022020014200370318200141186a200510532008200620012802182202200128021c220920026b1005417f4704402001200241016a20092002417f736a10662007109c01200521040b2002450d002001200236021c0b200328020c22020440200320023602100b20044504402007200041e0066a10340b20004188076a2209109f011a20004188096a220242d0b4afbcbf988ce0b77f37030020004190096a109f012107200141286a1011220320022903001075200328020c200341106a28020047044010000b0240200328020022082003280204220610042205450440410021040c010b410021042001410036022020014200370318200141186a200510532008200620012802182202200128021c220620026b1005417f4704402001200241016a20062002417f736a1066200710a001200521040b2002450d002001200236021c0b200328020c22020440200320023602100b20044504402007200941800210361a0b41002104200041b00b6a4100360200200041ac0b6a200041a80b6a2202360200200041a00b6a220542f4ffce959b97c9c1d500370300200041980b6a4100360200200041940b6a200041900b6a2207360200200020073602900b20022002360200200141286a1011220320052903001075200328020c200341106a28020047044010000b0240200328020022062003280204220910042208450d002001410036022020014200370318200141186a200810532006200920012802182205200128021c220620056b1005417f4704402001200541016a20062005417f736a1066200210a201200821040b2005450d002001200536021c0b200328020c22050440200320053602100b20044504402002200710380b200041b80b6a220710a6011a200041d00b6a220242affad78bbfdecaa6f300370300200041d80b6a10a6012104200141286a1011220320022903001075200328020c200341106a28020047044010000b0240200328020022062003280204220910042208450440410021050c010b410021052001410036022020014200370318200141186a200810532006200920012802182202200128021c220620026b1005417f4704402001200241016a20062002417f736a1066200410a701200821050b2002450d002001200236021c0b200328020c22020440200320023602100b200545044020042007290300370300200441106a200741106a280200360200200441086a200741086a2903003703000b200141406b240020000b953102087f027e230041c0086b22052400200541c0066a10112201200041d00b6a22022903001074100f200120022903001075200041d80b6a2102200128020c200141106a28020047044010000b2001280204210720012802002106200541c0046a10112104200210a8012108200420054180026a10ae01220310af012004200820032802046a20032802006b100f200541a0026a200241106a280000220836020020054198026a200241086a290000220937030020052002290000220a37039002200541b0026a2009370300200541b8026a2008360200200541086a2009370300200541106a20083602002005200a3703a8022005200a370300200541d0026a2008360200200541c8026a20093703002005200a3703c00202402004200541c0026a41141058220228020c200241106a280200460440200241046a2104200228020021080c010b200241046a2104100020022802002108200228020c2002280210460d0010000b20062007200820042802001006200328020022040440200320043602040b200228020c22030440200220033602100b200128020c22020440200120023602100b200541c0066a10112202200041a00b6a22012903001074100f200220012903001075200041a80b6a2104200228020c200241106a28020047044010000b2002280204210820022802002107200541c0046a10112101200410a40121062001200541c0026a10ae01220310af012001200620032802046a20032802006b100f2001200410a5010240200128020c200141106a280200460440200141046a2104200128020021060c010b200141046a2104100020012802002106200128020c2001280210460d0010000b20072008200620042802001006200328020022040440200320043602040b200128020c22030440200120033602100b200228020c22010440200220013602100b200041a80b6a10a301200041900b6a10a301200541a8026a1011220120004188096a22022903001074100f20012002290300107520004190096a2104200128020c200141106a28020047044010000b200128020421082001280200210720054190026a10112102200410a1012106200220054180026a10ae01220310af012002200620032802046a20032802006b100f200520044180021036220541c0026a200541800210361a200541c0046a200541c0026a41800210361a200541c0066a200541c0046a41800210361a02402002200541c0066a4180021058220228020c200241106a280200460440200241046a2104200228020021060c010b200241046a2104100020022802002106200228020c2002280210460d0010000b20072008200620042802001006200328020022040440200320043602040b200228020c22030440200220033602100b200128020c22020440200120023602100b200541c0066a10112202200041f0066a22012903001074100f200220012903001075200041f8066a2104200228020c200241106a28020047044010000b2002280204210820022802002107200541c0046a101121012004109d0121062001200541c0026a10ae01220310af012001200620032802046a20032802006b100f20012004109e010240200128020c200141106a280200460440200141046a2104200128020021060c010b200141046a2104100020012802002106200128020c2001280210460d0010000b20072008200620042802001006200328020022040440200320043602040b200128020c22030440200120033602100b200228020c22010440200220013602100b200541c0066a10112202200041c8066a22012903001074100f200220012903001075200041d0066a2104200228020c200241106a28020047044010000b2002280204210820022802002107200541c0046a101121012004109a0121062001200541c0026a10ae01220310af012001200620032802046a20032802006b100f20012004109b010240200128020c200141106a280200460440200141046a2104200128020021060c010b200141046a2104100020012802002106200128020c2001280210460d0010000b20072008200620042802001006200328020022040440200320043602040b200128020c22030440200120033602100b200228020c22010440200220013602100b200541c0066a10112202200041b8056a22012903001074100f200220012903001075200041c0056a2104200228020c200241106a28020047044010000b2002280204210820022802002107200541c0046a10112101200410960121062001200541c0026a10ae01220310af012001200620032802046a20032802006b100f200120041097010240200128020c200141106a280200460440200141046a2104200128020021060c010b200141046a2104100020012802002106200128020c2001280210460d0010000b20072008200620042802001006200328020022040440200320043602040b200128020c22030440200120033602100b200228020c22010440200220013602100b200541c0066a10112202200041a8046a22012903001074100f200220012903001075200041b0046a2104200228020c200241106a28020047044010000b2002280204210820022802002107200541c0046a1011210120002802b004200041b4046a28020010930121062001200541c0026a10ae01220310af012001200620032802046a20032802006b100f2001200410100240200128020c200141106a280200460440200141046a2104200128020021060c010b200141046a2104100020012802002106200128020c2001280210460d0010000b20072008200620042802001006200328020022040440200320043602040b200128020c22030440200120033602100b200228020c22010440200220013602100b200041b0046a28020022010440200041b4046a20013602000b200028029804220104402000419c046a20013602000b200541c0066a1011220220004180046a22012903001074100f20022001290300107520004188046a2104200228020c200241106a28020047044010000b2002280204210820022802002107200541c0046a10112101200410900121062001200541c0026a10ae01220310af012001200620032802046a20032802006b100f200120041091010240200128020c200141106a280200460440200141046a2104200128020021060c010b200141046a2104100020012802002106200128020c2001280210460d0010000b20072008200620042802001006200328020022040440200320043602040b200128020c22030440200120033602100b200228020c22010440200220013602100b200541c0066a10112202200041d8036a22012903001074100f200220012903001075200041e0036a2104200228020c200241106a28020047044010000b2002280204210820022802002107200541c0046a101121012004108d0121062001200541c0026a10ae01220310af012001200620032802046a20032802006b100f20012004108e010240200128020c200141106a280200460440200141046a2104200128020021060c010b200141046a2104100020012802002106200128020c2001280210460d0010000b20072008200620042802001006200328020022040440200320043602040b200128020c22030440200120033602100b200228020c22010440200220013602100b200041e0036a28020022010440200041e4036a20013602000b20002802c80322010440200041cc036a20013602000b200541c0046a10112202200041b8036a22012903001074100f200220012903001075200228020c200241106a28020047044010000b2002280204210420022802002108200541c0026a10112101200541d8066a4100360200200541d0066a4200370300200541c8066a4200370300200542003703c006200541c0066a20002903c00310b00120052802c0062107200541c0066a41047210152001200541c0066a10ae01220310af012001200720032802046a20032802006b100f200120002903c00310750240200128020c200141106a280200460440200141046a2107200128020021060c010b200141046a2107100020012802002106200128020c2001280210460d0010000b20082004200620072802001006200328020022040440200320043602040b200128020c22030440200120033602100b200228020c22010440200220013602100b200541c0046a10112202200041a0036a22012903001074100f200220012903001075200228020c200241106a28020047044010000b2002280204210420022802002108200541c0026a10112101200541d8066a4100360200200541d0066a4200370300200541c8066a4200370300200542003703c006200541c0066a20002802a803101920052802c0062107200541c0066a41047210152001200541c0066a10ae01220310af012001200720032802046a20032802006b100f200120002802a803101a0240200128020c200141106a280200460440200141046a2107200128020021060c010b200141046a2107100020012802002106200128020c2001280210460d0010000b20082004200620072802001006200328020022040440200320043602040b200128020c22030440200120033602100b200228020c22010440200220013602100b200541c0066a1011220220004188036a22012903001074100f200220012903001075200228020c200241106a28020047044010000b2002280204210420022802002108200541c0046a10112101200029039003108a0121072001200541c0026a10ae01220310af012001200720032802046a20032802006b100f2001200029039003108b010240200128020c200141106a280200460440200141046a2107200128020021060c010b200141046a2107100020012802002106200128020c2001280210460d0010000b20082004200620072802001006200328020022040440200320043602040b200128020c22030440200120033602100b200228020c22010440200220013602100b200541c0066a10112202200041f0026a22012903001074100f200220012903001075200228020c200241106a28020047044010000b2002280204210420022802002108200541c0046a1011210120002802f80210880121072001200541c0026a10ae01220310af012001200720032802046a20032802006b100f200120002802f8021086010240200128020c200141106a280200460440200141046a2107200128020021060c010b200141046a2107100020012802002106200128020c2001280210460d0010000b20082004200620072802001006200328020022040440200320043602040b200128020c22030440200120033602100b200228020c22010440200220013602100b200541c0066a10112202200041d8026a22012903001074100f200220012903001075200228020c200241106a28020047044010000b2002280204210420022802002108200541c0046a1011210120002f01e00210850121072001200541c0026a10ae01220310af012001200720032802046a20032802006b100f200120002e01e0021086010240200128020c200141106a280200460440200141046a2107200128020021060c010b200141046a2107100020012802002106200128020c2001280210460d0010000b20082004200620072802001006200328020022040440200320043602040b200128020c22030440200120033602100b200228020c22010440200220013602100b200041c0026a200041c8026a10b101200541c0066a1011220220004188026a22012903001074100f20022001290300107520004190026a2104200228020c200241106a28020047044010000b2002280204210820022802002107200541c0046a10112101200410820121062001200541c0026a10ae01220310af012001200620032802046a20032802006b100f200120041083010240200128020c200141106a280200460440200141046a2104200128020021060c010b200141046a2104100020012802002106200128020c2001280210460d0010000b20072008200620042802001006200328020022040440200320043602040b200128020c22030440200120033602100b200228020c22010440200220013602100b200541c0066a10112202200041c8016a22012903001074100f200220012903001075200041d0016a2104200228020c200241106a28020047044010000b2002280204210820022802002107200541c0046a101121012004107d21062001200541c0026a10ae01220310af012001200620032802046a20032802006b100f20012004107e0240200128020c200141106a280200460440200141046a2104200128020021060c010b200141046a2104100020012802002106200128020c2001280210460d0010000b20072008200620042802001006200328020022040440200320043602040b200128020c22030440200120033602100b200228020c22010440200220013602100b200041a8016a200041b0016a10b101200541c0066a1011220220004190016a22012903001074100f200220012903001075200228020c200241106a28020047044010000b2002280204210420022802002108200541c0046a1011210120002d009801106f21072001200541c0026a10ae01220310af012001200720032802046a20032802006b100f200120002d009801101a0240200128020c200141106a280200460440200141046a2107200128020021060c010b200141046a2107100020012802002106200128020c2001280210460d0010000b20082004200620072802001006200328020022040440200320043602040b200128020c22030440200120033602100b200228020c22010440200220013602100b200541c0066a10112201200041f0006a22022903001074100f200120022903001075200041f8006a2104200128020c200141106a28020047044010000b2001280204210820012802002107200541c0046a101121022004105221062002200541c0026a10ae01220310af012002200620032802046a20032802006b100f024020022005200410121017220228020c200241106a280200460440200241046a2104200228020021060c010b200241046a2104100020022802002106200228020c2002280210460d0010000b20072008200620042802001006200328020022040440200320043602040b200228020c22030440200220033602100b200128020c22020440200120023602100b200541c0066a10112202200041d0006a22012903001074100f200220012903001075200228020c200241106a28020047044010000b2002280204210420022802002108200541c0046a101121012000290358107421072001200541c0026a10ae01220310af012001200720032802046a20032802006b100f2001200029035810750240200128020c200141106a280200460440200141046a2107200128020021060c010b200141046a2107100020012802002106200128020c2001280210460d0010000b20082004200620072802001006200328020022040440200320043602040b200128020c22030440200120033602100b200228020c22010440200220013602100b200541c0066a10112202200041386a22012903001074100f200220012903001075200228020c200241106a28020047044010000b2002280204210420022802002108200541c0046a101121012000280240107321072001200541c0026a10ae01220310af012001200720032802046a20032802006b100f20012000280240101a0240200128020c200141106a280200460440200141046a2107200128020021060c010b200141046a2107100020012802002106200128020c2001280210460d0010000b20082004200620072802001006200328020022040440200320043602040b200128020c22030440200120033602100b200228020c22010440200220013602100b200541c0066a10112202200041206a22012903001074100f200220012903001075200228020c200241106a28020047044010000b2002280204210420022802002108200541c0046a1011210120002f0128107121072001200541c0026a10ae01220310af012001200720032802046a20032802006b100f200120002f0128101a0240200128020c200141106a280200460440200141046a2107200128020021060c010b200141046a2107100020012802002106200128020c2001280210460d0010000b20082004200620072802001006200328020022040440200320043602040b200128020c22030440200120033602100b200228020c22010440200220013602100b200541c0066a1011220220002903081074100f200220002903081075200228020c200241106a28020047044010000b2002280204210420022802002108200541c0046a1011210120002d0010106f21072001200541c0026a10ae01220310af012001200720032802046a20032802006b100f200120002d0010101a0240200128020c200141106a280200460440200141046a2107200128020021060c010b200141046a2107100020012802002106200128020c2001280210460d0010000b20082004200620072802001006200328020022040440200320043602040b200128020c22030440200120033602100b200228020c22010440200220013602100b200541c0086a24000b2601017f02402000280204450d0020002802002d000041c001490d00200010b20121010b20010b800101037f230041106b22012400200010aa0102400240200010ab01450d002000280204450d0020002802002d000041c001490d010b10000b200141086a200010ac01200128020c220041024f044010000b200128020821020340200004402000417f6a210020022d00002103200241016a21020c010b0b200141106a240020030b5801027f230041206b22012400200141186a4100360200200141106a4200370300200141086a42003703002001420037030020012000ad42ff018342001056210020012802002102200041046a1015200141206a240020020b8b0101037f230041106b22012400200010aa0102400240200010ab01450d002000280204450d0020002802002d000041c001490d010b10000b200141086a200010ac01200128020c220041034f044010000b200128020821030340200004402000417f6a210020032d00002002410874722102200341016a21030c010b0b200141106a2400200241ffff03710b5401017f230041206b22012400200141186a4100360200200141106a4200370300200141086a4200370300200142003703002001200041ffff037110192001280200210020014104721015200141206a240020000b860101037f230041106b22012400200010aa0102400240200010ab01450d002000280204450d0020002802002d000041c001490d010b10000b200141086a200010ac01200128020c220041054f044010000b200128020821030340200004402000417f6a210020032d00002002410874722102200341016a21030c010b0b200141106a240020020b4f01017f230041206b22012400200141186a4100360200200141106a4200370300200141086a4200370300200142003703002001200010192001280200210020014104721015200141206a240020000b5001027f230041206b22012400200141186a4100360200200141106a4200370300200141086a4200370300200142003703002001200010b0012001280200210220014104721015200141206a240020020b0a0020002001420010590b1a0020004200370200200041086a4100360200200010b30120000ba40201057f230041206b22022400024002402000280204044020002802002d000041c001490d010b200241086a10761a0c010b200241186a200010ac01200010b40121030240024002400240200228021822000440200228021c220520034f0d010b41002100200241106a410036020020024200370308410021050c010b200241106a4100360200200242003703082000200520032003417f461b22046a21052004410a4b0d010b200220044101743a0008200241086a41017221030c010b200441106a4170712206103a21032002200436020c20022006410172360208200220033602100b03402000200546450440200320002d00003a0000200341016a2103200041016a21000c010b0b200341003a00000b2001200241086a10b501200241206a24000b0e0020012000106e4100473a00000b4401027f230041f00b6b220224002000106d410247044010000b2002200041011067200210b60121002002106b21032002200020011100002003106c200241f00b6a24000b7b01027f230041900c6b220224002000106a200241086a106b2103200241086a20011101002100200241f80b6a10112201200010b701100f20012000108601200128020c200141106a28020047044010000b200128020020012802041008200128020c22000440200120003602100b2003106c200241900c6a24000b180020004200370200200041086a4100360200200010761a0b2801017f230041206b22022400200241086a200041001067200241086a20011077200241206a24000b5001017f230041206b22012400200141186a4100360200200141106a4200370300200141086a4200370300200142003703002001200010b8012001280200210020014104721015200141206a240020000b6e01027f230041406a220224002000410110162100200241386a4100360200200241306a4200370300200241286a420037030020024200370320200241206a200241106a200110121014210320002002280220100f200020022001101210171a200341046a1015200241406b24000be10201027f02402001450d00200041003a0000200020016a2203417f6a41003a000020014103490d00200041003a0002200041003a00012003417d6a41003a00002003417e6a41003a000020014107490d00200041003a00032003417c6a41003a000020014109490d002000410020006b41037122026a220341003602002003200120026b417c7122026a2201417c6a410036020020024109490d002003410036020820034100360204200141786a4100360200200141746a410036020020024119490d002003410036021820034100360214200341003602102003410036020c200141706a41003602002001416c6a4100360200200141686a4100360200200141646a41003602002002200341047141187222026b2101200220036a2102034020014120490d0120024200370300200241186a4200370300200241106a4200370300200241086a4200370300200241206a2102200141606a21010c000b000b20000b1900200010761a2000410c6a10761a200041186a10761a20000b5601017f230041206b22022400200241086a200041001067200241086a2001107c200241086a200041011067200241086a2001410c6a1077200241086a200041021067200241086a200141186a1077200241206a24000b7a01027f230041406a22012400200141186a4100360200200141106a4200370300200141086a4200370300200142003703002001410010132202200010b8012002200141306a2000410c6a10121014200141206a200041186a1012101441011013210020012802002102200041046a1015200141406b240020020ba30101047f230041e0006b220224002000410310162100200241d8006a4100360200200241d0006a4200370300200241c8006a420037030020024200370340200241406b200110b801200241406b200241306a2001410c6a220310121014200241206a200141186a220410121014210520002002280240100f20002001107e2000200241106a20031012101720022004101210171a200541046a1015200241e0006a24000b3902017f017e230041106b220124002001200010b90120012903002102200141106a2400420020024201837d200242018885a74110744110750b6202027f017e230041206b22012400200141186a4100360200200141106a4200370300200141086a42003703002001420037030020012000ad42308622034230872003423f8710ba01210020012802002102200041046a1015200141206a240020020b1301017e20002001ac22022002423f8710bb010b3302017f017e230041106b220124002001200010b90120012903002102200141106a2400420020024201837d200242018885a70b5201027f230041206b22012400200141186a4100360200200141106a4200370300200141086a4200370300200142003703002001200010bc01210020012802002102200041046a1015200141206a240020020b4202017f027e230041106b220124002001200010b901200141086a290300210320012903002102200141106a2400420020024201837d2003423f86200242018884850b5701037f230041206b22012400200141186a4100360200200141106a4200370300200141086a420037030020014200370300200120002000423f8710ba01210220012802002103200241046a1015200141206a240020030b0e00200020012001423f8710bb010bb10201047f230041d0006b22022400024002402000280204450d0020002802002d000041c001490d002000106d21032001280208200128020022046b4101752003490440200120022003200128020420046b410175200141086a10bd01220310be01200310bf010b200241286a200010c001200241186a200010c101200141086a21050340200228022c200228021c46044020022802302002280220460d030b2002200241286a10c2012002107021030240200128020422002001280208490440200020033b01002001200041026a3602040c010b200241386a2001200020012802006b410175220041016a104f2000200510bd0121002002280240220420033b01002002200441026a3602402001200010be01200010bf010b200241286a10c3010c000b000b10000b200241d0006a24000b9c0101037f230041206b22012400200141186a4100360200200141106a4200370300200141086a420037030020014200370300024020002802002000280204460440200110c4010c010b200141001013210220002802042103200028020021000340200020034604402002410110131a05200220002f01001019200041026a21000c010b0b0b2001280200210020014104721015200141206a240020000b4301017f2000200128020420012802006b410175101621022001280204210020012802002101034020002001470440200220012f0100101a200141026a21010c010b0b0be20201057f23004190016b22022400024002402000280204450d0020002802002d000041c001490d00200241c8006a200010c001200241386a200010c101200241146a21040340200228024c200228023c46044020022802502002280240460d030b200241206a200241c8006a10c201200241086a10762100200410762105200241206a10c501410247044010000b20024180016a10762103200241e8006a200241206a41001067200241e8006a200310772000200310b501200241d8006a10762103200241e8006a200241206a41011067200241e8006a200310772005200310b5012001200241e8006a2000103d22062802004504404128103a22032002290308370210200341186a200241106a280200360200200010b301200341246a200441086a2802003602002003411c6a2004290200370200200510b3012001200228026820062003103f0b200241c8006a10c3010c000b000b10000b20024190016a24000bd00101047f230041e0006b22012400200141206a4100360200200141186a4200370300200141106a42003703002001420037030802402000280208450440200141086a10c4010c010b200041046a2103200141086a410010132102200141346a2104200028020021000340200020034604402002410110131a05200141286a200041106a104b200241001013200141d0006a200141286a10121014200141406b200410121014410110131a2000102a21000c010b0b0b20012802082100200141086a4104721015200141e0006a240020000b6101027f230041206b220224002000200128020810162103200141046a210020012802002101034020002001460440200241206a240005200341021016200241106a200141106a1012101720022001411c6a101210171a2001102a21010c010b0b0bce0101037f230041206b22022400024002402000280204044020002802002d000041c001490d010b20024100360208200242003703000c010b200241186a200010ac0120022802182103200241106a200010ac0120022802102104200010b40121002002410036020820024200370300200020046a20036b2200450d0020022000104520004101480d002002200228020420032000103620006a3602040b2001280200044020014100360208200142003702000b2001200228020036020020012002290204370204200241206a24000b5301017f230041206b22022400200241186a4100360200200241106a4200370300200241086a420037030020024200370300200220002001100e210020022802002101200041046a1015200241206a240020010b2c01037f200041f8006a21022000210103402001107621032001410c6a21012003410c6a2002470d000b20000b6101037f230041306b22022400200010c501410a47044010000b03402003410a460440200241306a240005200241206a10762104200241086a200020031067200241086a200410772001200410b5012001410c6a2101200341016a21030c010b0b0b800101037f230041306b22012400200141186a4100360200200141106a4200370300200141086a42003703002001420037030020014100101321030340200241f800464504402003200141206a200020026a101210141a2002410c6a21020c010b0b200341011013210220012802002103200241046a1015200141306a240020030b4401027f230041106b220224002000410a10162103410021000340200041f800460440200241106a24000520032002200020016a101210171a2000410c6a21000c010b0b0b1000200010761a2000410036020c20000b5d01027f230041306b22022400200010c501410247044010000b200241206a10762103200241086a200041001067200241086a200310772001200310b501200241086a2000410110672001200241086a10870136020c200241306a24000b7301027f230041406a22012400200141286a4100360200200141206a4200370300200141186a4200370300200142003703102001200010322100200141106a41001013200141306a200010121014200028020c10bc0141011013210020012802102102200041046a1015200141406b240020020b2a01017f230041106b220224002000410210162002200110121017200128020c108601200241106a24000bd70101047f230041d0006b22022400024002402000280204450d0020002802002d000041c001490d00200241406b200010c001200241306a200010c101200241106a210403402002280244200228023446044020022802482002280238460d030b200241186a200241406b10c201200241186a200241086a1076220010772001200241cc006a2000103d2205280200450440411c103a22032002290308370210200341186a2004280200360200200010b3012001200228024c20052003103f0b200241406b10c3010c000b000b10000b200241d0006a24000b9e0101037f230041306b22012400200141186a4100360200200141106a4200370300200141086a42003703002001420037030002402000280208450440200110c4010c010b200041046a21032001410010132102200028020021000340200020034604402002410110131a052002200141206a200041106a101210141a2000102a21000c010b0b0b2001280200210020014104721015200141306a240020000b4f01027f230041106b220224002000200128020810162103200141046a210020012802002101034020002001460440200241106a24000520032002200141106a101210171a2001102a21010c010b0b0b2601017f0340200141800246450440200020016a41003a0000200141016a21010c010b0b20000b990101027f23004190046b22022400200010aa0120024188046a200010ac01200228028c042103024002402000280204450d0020034180024b0d0020002802002d000041c001490d010b10000b20024188026a109f0120034180022003418002491b22006b4180026a200228028804200010361a200241086a20024188026a41800210361a2001200241086a41800210361a20024190046a24000bc00101037f230041a0086b2201240020014198026a410036020020014190026a420037030020014188026a42003703002001420037038002200120004180021036220041a0026a200041800210361a200041a0046a200041a0026a41800210361a200041a0066a200041a0046a41800210361a41012103024003402002418002460d01200041a0066a20026a2101200241016a210220012d0000450d000b41830221030b200020033602800220004180026a4104721015200041a0086a240020030bec0101037f230041d0006b22022400024002402000280204450d0020002802002d000041c001490d00200241406b200010c001200241306a200010c101200241106a210403402002280244200228023446044020022802482002280238460d030b200241186a200241406b10c201200241186a200241086a1076220310774114103a2200410036020020002002290308370208200041106a2004280200360200200310b30120002001360204200128020021032001200036020020002003360200200320003602042001200128020841016a360208200241406b10c3010c000b000b10000b200241d0006a24000b4d01037f02402000280208450d00200028020422012802002202200028020022032802043602042000410036020820032802042002360200034020002001460d01200128020421010c000b000b0b9d0101037f230041306b22012400200141186a4100360200200141106a4200370300200141086a42003703002001420037030002402000280208450440200110c4010c010b200041046a2102200141001013210303402002280200220220004604402003410110131a052003200141206a200241086a101210141a200241046a21020c010b0b0b2001280200210220014104721015200141306a240020020b4e01027f230041106b22032400200141046a210220002001280208101621000340200228020022022001460440200341106a24000520002003200241086a101210171a200241046a21020c010b0b0b2501017f03402001411446450440200020016a41003a0000200141016a21010c010b0b20000bbe0102027f027e230041406a22022400200010aa01200241386a200010ac01200228023c2103024002402000280204450d00200341144b0d0020002802002d000041c001490d010b10000b200241206a10a6012003411420034114491b22006b41146a2002280238200010361a200241186a200241306a2802002200360200200241106a200241286a2903002204370300200220022903202205370308200141106a2000360000200141086a200437000020012005370000200241406b24000b850202037f027e23004180016b22012400200141306a4100360200200141286a4200370300200141206a4200370300200141086a200041086a2900002204370300200141106a200041106a280000220236020020014200370318200120002900002205370300200141406b2004370300200141c8006a2002360200200141d8006a2004370300200141e0006a20023602002001200537033820012005370350200141f8006a2002360200200141f0006a200437030020012005370368410121020240034020034114460d01200141e8006a20036a2100200341016a210320002d0000450d000b411521020b20012002360218200141186a410472101520014180016a240020020b750020004200370210200042ffffffff0f370208200020023602042000200136020002402003410871450d00200010c90120024f0d002003410471044010000c010b200042003702000b02402003411071450d00200010c90120024d0d0020034104710440100020000f0b200042003702000b20000b4101017f200028020445044010000b0240200028020022012d0000418101470d00200028020441014d047f100020002802000520010b2c00014100480d0010000b0b990101037f200028020445044041000f0b200010aa01200028020022022c0000220141004e044020014100470f0b027f4101200141807f460d001a200141ff0171220341b7014d0440200028020441014d047f100020002802000520020b2d00014100470f0b4100200341bf014b0d001a2000280204200141ff017141ca7e6a22014d047f100020002802000520020b20016a2d00004100470b0bd60101047f200110b4012204200128020422024b04401000200128020421020b200128020021052000027f02400240200204404100210120052c00002203417f4a0d01027f200341ff0171220141bf014d04404100200341ff017141b801490d011a200141c97e6a0c010b4100200341ff017141f801490d001a200141897e6a0b41016a21010c010b4101210120050d000c010b41002103200120046a20024b0d0020022001490d00410020022004490d011a200120056a2103200220016b20042004417f461b0c010b41000b360204200020033602000bc20101057f230041406a22022400200241286a1011220320002903001075200328020c200341106a28020047044010000b02402003280200220020032802042205100422064504400c010b2002410036022020024200370318200241186a200610532000200520022802182200200228021c220520006b1005417f47044020012002200041016a20052000417f736a106610b6013a0000200621040b2000450d002002200036021c0b200328020c22000440200320003602100b200241406b240020040b30002000410036020820004200370200200041011045200028020441fe013a00002000200028020441016a36020420000b6101037f200028020c200041106a28020047044010000b200028020422022001280204200128020022036b22016a220420002802084b047f20002004105720002802040520020b20002802006a2003200110361a2000200028020420016a3602040b0b0020002001420010561a0b8e0201067f230041406a22042400200441286a1011220220002903001074100f200220002903001075200228020c200241106a28020047044010000b2002280204210620022802002107200441106a1011210020012d000010b70121052000200410ae01220310af012000200520032802046a20032802006b100f200020012c00001086010240200028020c200041106a280200460440200041046a2101200028020021050c010b200041046a2101100020002802002105200028020c2000280210460d0010000b20072006200520012802001006200328020022010440200320013602040b200028020c22030440200020033602100b200228020c22000440200220003602100b200441406b24000b820101047f230041106b2201240002402000280204450d0020002802002d000041c001490d00200141086a200010cd01200128020c210003402000450d0120014100200128020822032003200010cb0122046a20034520002004497222031b3602084100200020046b20031b2100200241016a21020c000b000b200141106a240020020b2201017f03402001410c470440200020016a4100360200200141046a21010c010b0b0b800301037f200028020445044041000f0b200010aa0141012102024020002802002c00002201417f4a0d00200141ff0171220341b7014d0440200341807f6a0f0b02400240200141ff0171220141bf014d0440024020002802042201200341c97e6a22024d047f100020002802040520010b4102490d0020002802002d00010d0010000b200241054f044010000b20002802002d000145044010000b4100210241b7012101034020012003460440200241384f0d030c0405200028020020016a41ca7e6a2d00002002410874722102200141016a21010c010b000b000b200141f7014d0440200341c07e6a0f0b024020002802042201200341897e6a22024d047f100020002802040520010b4102490d0020002802002d00010d0010000b200241054f044010000b20002802002d000145044010000b4100210241f701210103402001200346044020024138490d0305200028020020016a418a7e6a2d00002002410874722102200141016a21010c010b0b0b200241ff7d490d010b10000b20020b5c00024020002d0000410171450440200041003b01000c010b200028020841003a00002000410036020420002d0000410171450d00200041003602000b20002001290200370200200041086a200141086a280200360200200110b3010b3902017f017e230041106b220124002001200010b90120012903002102200141106a2400420020024201837d200242018885a74118744118750b6202027f017e230041206b22012400200141186a4100360200200141106a4200370300200141086a42003703002001420037030020012000ad42388622034238872003423f8710ba01210020012802002102200041046a1015200141206a240020020b2701017f230041106b220224002000410010132002200110121014410110131a200241106a24000ba10102027f027e230041106b22022400200110aa0102400240200110ab01450d002001280204450d0020012802002d000041c001490d010b10000b200241086a200110ac01200228020c220141114f044010000b20022802082103034020010440200542088620044238888421052001417f6a210120033100002004420886842104200341016a21030c010b0b2000200437030020002005370308200241106a24000b2301017e20002002423f87220320014201868520024201862001423f888420038510560b2301017e20002002423f87220320014201868520024201862001423f888420038510590b1301017e20002001ac22022002423f8710ba010b4c01017f2000410036020c200041106a2003360200200104402001104d21040b200020043602002000200420024101746a22023602082000200420014101746a36020c2000200236020420000b870101037f200120012802042000280204200028020022046b22036b2202360204200341004a044020022004200310361a200128020421020b200028020021032000200236020020012003360204200028020421022000200128020836020420012002360208200028020821022000200128020c3602082001200236020c200120012802043602000b2b01027f200028020821012000280204210203402001200247044020002001417e6a22013602080c010b0b0b0b0020002001410110c6010b0b0020002001410010c6010b170020002001280204200141086a280200411c10a9011a0bb70102057f017e230041106b22032400200041046a210102402000280200220204402001280200220504402005200041086a2802006a21040b20002004360204200041086a2002360200200341086a200141002004200210cb0110cc0120002003290308220637020420004100200028020022012006422088a76b2202200220014b1b3602000c010b200020012802002201047f2001200041086a2802006a0541000b360204200041086a41003602000b200341106a24000b3901017f027f200041186a28020022010440200041086a280200200041146a280200200110550c010b20000b2201200128020041016a3602000b220002402000280204044020002802002d000041bf014b0d010b10000b200010b2010be70101037f230041106b2204240020004200370200200041086a410036020020012802042103024002402002450440200321020c010b410021022003450d002003210220012802002d000041c001490d00200441086a200110cd0120004100200428020c220120042802082202200110cb0122032003417f461b20024520012003497222031b220536020820004100200220031b3602042000200120056b3602000c010b20012802002103200128020421012000410036020020004100200220016b20034520022001497222021b36020820004100200120036a20021b3602040b200441106a24000b3501017f230041106b220041908c0436020c41800c200028020c41076a417871220036020041840c200036020041880c3f003602000b10002002044020002001200210361a0b0b3001017f200028020445044041000f0b4101210120002802002c0000417f4c047f200010ca01200010b4016a0520010b0b5b00027f027f41002000280204450d001a410020002802002c0000417f4a0d011a20002802002d0000220041bf014d04404100200041b801490d011a200041c97e6a0c010b4100200041f801490d001a200041897e6a0b41016a0b0b2901017f230041206b22022400200241086a20002001411410a90110c9012100200241206a240020000b5b01027f2000027f0240200128020022054504400c010b200220036a200128020422014b0d0020012002490d00410020012003490d011a200220056a2104200120026b20032003417f461b0c010b41000b360204200020043602000b2401017f200110b401220220012802044b044010000b20002001200110ca01200210cc010b2f002000200210cf01200028020020002802046a2001200210361a2000200028020420026a3602042000200310d0010b1b00200028020420016a220120002802084b04402000200110570b0b830201047f02402001450d00034020002802102202200028020c460d01200241786a28020020014904401000200028021021020b200241786a2203200328020020016b220136020020010d012000200336021020004101200028020422032002417c6a28020022016b22021054220441016a20024138491b220520036a10d101200120002802006a220320056a2003200210490240200241374d0440200028020020016a200241406a3a00000c010b200441f7016a220341ff014d0440200028020020016a20033a00002000280200200120046a6a210103402002450d02200120023a0000200241087621022001417f6a21010c000b000b10000b410121010c000b000b0b0f00200020011057200020013602040b26002000410110cf01200028020020002802046a20013a00002000200028020441016a3602040b6001027f20011054220241b7016a22034180024e044010000b2000200341ff017110d2012000200028020420026a10d101200028020420002802006a417f6a2100034020010440200020013a0000200141087621012000417f6a21000c010b0b0b0bfa0301004180080bf203746f70696331006461746131006a735f636f6e7472616374006576656e740073657455696e7433324576740073657455696e743136457674007472616e7366657200696e69740073657455696e74380067657455696e74380073657455696e7431360067657455696e7431360073657455696e7433320067657455696e7433320073657455696e7436340067657455696e74363400736574537472696e6700676574537472696e6700736574426f6f6c00676574426f6f6c00736574436861720067657443686172007365744d657373616765006765744d657373616765007365744d794d657373616765006765744d794d65737361676500736574496e743800676574496e743800736574496e74313600676574496e74313600736574496e74333200676574496e74333200736574496e74363400676574496e74363400736574566563746f7200676574566563746f72007365744d6170006765744d617000746573744d756c7469506172616d730073657442797465730067657442797465730073657441727261790067657441727261790073657450616972006765745061697200736574536574006765745365740073657446697865644861736800676574466978656448617368007365744c697374006765744c69737400736574416464726573730067657441646472657373'
  cabi = [{"constant": False,"inputs": [{"internalType": "string","name": "_name","type": "string"}],"name": "setName","outputs": [{"internalType": "string","name": "","type": "string"}],"payable": False,"stateMutability": "nonpayable","type": "function"},{"constant": True,"inputs": [],"name": "getName","outputs": [{"internalType": "string","name": "","type": "string"}],"payable": False,"stateMutability": "view","type": "function"}]

  ```

</details>

WASM类型合约通过`alaya.wasmcontract`建立合约实例。

对实例调用方法.constructor()进行合约的构建，通过transact发送交易到链上。

<details>
  <summary><mark><b><font size="3" >部分代码示例：</font></b></mark></summary>

```python
  # Instantiate and deploy contract
Payable = alaya.wasmcontract(abi=abi, bytecode=bytecode,vmtype=1)

tx_hash = Payable.constructor().transact(
      {
          'from':from_address,
          'gas':1500000,
      }
  )

  # Wait for the transaction to be mined, and get the transaction receipt
  tx_receipt = alaya.waitForTransactionReceipt(tx_hash)
  print(tx_receipt)
```

</details>

其中`tx_receipt`为此次部署合约的交易回执。

部署成功后输出如下：

```
  #输出
AttributeDict({'blockHash': HexBytes('0x7a193be2cf86aedcf844c0478c6f64d226affb55779bad1b2056c7e70e8158d6'), 'blockNumber': 2012981, 'contractAddress': 'atp15sh4rpuqr4fvzs4cyj9uea54r5tax7kljqqszk', 'cumulativeGasUsed': 1233168, 'from': 'atx1uqug0zq7rcxddndleq4ux2ft3tv6dqljphydrl', 'gasUsed': 1233168, 'logs': [], 'logsBloom': HexBytes('0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'), 'status': 1, 'to': None, 'transactionHash': HexBytes('0x717a82ea0ef116e271fb02dbb7d456fe9dd41a2dbd07cac81d079e375b5dade1'), 'transactionIndex': 0})

```


##### 对Helloworld合约进行交易发送(WASM合约)

在之前合约部署成功的基础上，对合约中的方法进行调用。

payable是合约部署成功后的实例。

通过调用函数setBool，向链上传送参数false（发送交易）。

<details>
  <summary><mark><b><font size="3" >部分代码示例：</font></b></mark></summary>

```python

payable = alaya.wasmcontract(address=tx_receipt.contractAddress, abi=cabi,vmtype=1)

tx_hash0 = payable.functions.setBool(false).transact(
  {
      'from':from_address,
      'gas':1500000,
  }
)
print(alaya.waitForTransactionReceipt(tx_hash0))
print('get : {}'.format(
  payable.functions.getBool().call()
))

```

</details>

`payable.functions.getBool().call()`，表示通过函数getBool获得链上对应的信息（按照本合约定义，获得setBool上传的参数)。

成功运行后，结果如下：

  ```python

  #输出
  AttributeDict({'blockHash': HexBytes('0x9bcadf4db5d74789901b2176cb7dad3191d2425b61f261966e932f6606d13041'), 'blockNumber': 2018575, 'contractAddress': None, 'cumulativeGasUsed': 426496, 'from': 'atx1uqug0zq7rcxddndleq4ux2ft3tv6dqljphydrl', 'gasUsed': 426496, 'logs': [], 'logsBloom': HexBytes('0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'), 'status': 1, 'to': 'atp1c5h59flven2hzyrylh2tsmn59r5ucms95n5ugc', 'transactionHash': HexBytes('0x4c724e7d1833ade363f51f611293682771318e3c86b533f5a78b580c812eb009'), 'transactionIndex': 0})
  get : False
  ```

##### WASM合约的事件调用

WASM合约中的事件,一般写在合约的函数中。

以wasmcontract合约为例，在方法setUint32含有事件setUint32Evt，可通过setUint32Evt对setUint32的交易结果进行监听和日志记录输出。

greeter是部署成功的WASM类型合约实例。

tx_hash是函数setUint32传参数的交易实例。

<details>
  <summary><mark><b><font size="3" >部分代码示例：</font></b></mark></summary>

  ```python

  greeter = alaya.wasmcontract(address=tx_receipt.contractAddress, abi=abi,vmtype=1)
  tx_hash = greeter.functions.setUint32(1000).transact(
      {
          'from': from_address,
          'gas': 1500000,
      }
  )

  tx_receipt = alaya.waitForTransactionReceipt(tx_hash)
  print(tx_receipt)

  topic_param = greeter.events.setUint32Evt().processReceipt(tx_receipt)

  ```

</details>

`topic_param`是事件setUint32Evt调用的结果。


 其中'args'对应的值中：

 'topic1'为topic值，'arg1'、'arg2'、'arg3'为事件中定义的三个参数值。

​成功运行后，结果如下：

  ```python

  (AttributeDict({'args': AttributeDict({'topic1': 'topic1', 'arg1': 'data1', 'arg2': 1000, 'arg3': 1000}), 'event': 'setUint32Evt', 'logIndex': 0, 'transactionIndex': 0, 'transactionHash': HexBytes('0xabac50c6a9d443d9f89065775f0f3d56ddeabd2f2a5e0e1f36d00db703b14d8b'), 'address': 'atp1sgsp74pce2vkgwqjd3rzmt55p70psmq7qvnqwn', 'blockHash': HexBytes('0x78f15fbacbc745dfd5b35b596d28b61ae2987b6ff9050dc39c716f383e505899'), 'blockNumber': 1477774}),)

  ```



### 内置合约

#### staking

```
from client_sdk_python import Web3, HTTPProvider
from client_sdk_python.ppos import Ppos
w3 = Web3(HTTPProvider("http://47.241.91.2:6789"),chain_id = 201030)
ppos = Ppos(w3)
```

##### 发起质押

调用：

```
ppos.createStaking(benifit_address, node_id, external_id, node_name, website, details, amount,program_version,program_version_sign, bls_pubkey, bls_proof, pri_key, reward_per, type=2, transaction_cfg=None)
```

参数：

- `type`：表示使用账户自由金额还是账户的锁仓金额做质押，0: 自由金额； 1: 锁仓金额。

- `benifit_address`: 用于接受出块奖励和质押奖励的收益账户。

- `node_id`: 被质押的节点Id(也叫候选人的节点Id)。

- `external_id`: 外部Id(有长度限制，给第三方拉取节点描述的Id)。

- `node_name`：被质押节点的名称(有长度限制，表示该节点的名称)。

- `website`: 节点的第三方主页(有长度限制，表示该节点的主页)。

- `details`: 节点的描述(有长度限制，表示该节点的描述)。

- `amount`: 质押金额(unit:von, 1ATP = 10\*\*18 von)。

- `program_version`: 被质押节点的Alaya进程的真实版本号(获取版本号的接口由治理提供)。

- `program_version_sign`: 程序的真实版本签名，治理rpc获取。

- `bls_pubkey`: Bls 公钥。

- `bls_proof`: bls的证明,通过拉取证明接口获取。

- `pri_key`: 交易私钥。

- `reward_per`: 委托所得到的奖励分成比例，采用BasePoint 1BP=0.01%。

- `transaction_cfg`: 交易基础配置。

  ~~~
  type:
    dict
  example:
      cfg = {
           "gas":100000000,
           "gasPrice":2000000000000,
           "nonce":1,
       }
  ~~~



##### 修改质押信息

调用：

```
ppos.editCandidate(benifit_address, node_id, external_id, node_name, website, details, pri_key, reward_per, transaction_cfg=None)
```

参数：

- `benifit_address`: 用于接受出块奖励和质押奖励的收益账户。

- `node_id`: 被质押的节点Id(也叫候选人的节点Id)。

- `external_id`: 外部Id(有长度限制，给第三方拉取节点描述的Id)。

- `node_name`: 被质押节点的名称(有长度限制，表示该节点的名称)。

- `website`: 节点的第三方主页(有长度限制，表示该节点的主页)。

- `details`: 节点的描述(有长度限制，表示该节点的描述)。

- `pri_key`: 交易私钥。

- `reward_per`: 委托所得到的奖励分成比例，采用BasePoint 1BP=0.01%，例：传500就是5%的奖励作为委托奖励。

- `transaction_cfg`: 交易基础配置。

  ~~~
  type:
    dict
  example:
      cfg = {
           "gas":100000000,
           "gasPrice":2000000000000,
           "nonce":1,
       }
  ~~~



##### 增持质押

调用：

```
ppos.increaseStaking(node_id, amount, pri_key, type=2, transaction_cfg=None)
```

参数：

- `type`: 表示使用账户自由金额还是账户的锁仓金额做质押，0: 自由金额； 1: 锁仓金额。

- `node_id`: 被质押的节点Id(也叫候选人的节点Id)。

- `amount`: 增持的von。

- `pri_key`: 交易私钥。

- `transaction_cfg`: 交易基础配置。

  ~~~
  type:
    dict
  example:
      cfg = {
           "gas":100000000,
           "gasPrice":2000000000000,
           "nonce":1,
       }
  ~~~



##### 撤销质押(一次性发起全部撤销，多次到账)

调用：

```
ppos.withdrewStaking(node_id, pri_key, transaction_cfg=None)
```

参数：

- `node_id`: 被质押的节点的NodeId。 **浏览器复制去除0x前缀**。

- `pri_key`: 交易私钥。

- transaction_cfg: 交易基础配置。

  ~~~
  type:
    dict
  example:
      cfg = {
           "gas":100000000,
           "gasPrice":2000000000000,
           "nonce":1,
       }
  ~~~



#### delegate

##### 发起委托

调用：

```
ppos.delegate(type, node_id, amount, pri_key, transaction_cfg=None)
```

参数：

- `type`: 表示使用账户自由金额还是账户的锁仓金额做委托，0: 自由金额； 1: 锁仓金额。

- `node_id`: 被质押节点的NodeId。 **浏览器复制去除0x前缀**。

- `amount`: 委托的金额(按照最小单位算，1ATP = 10\*\*18 von)。

- `pri_key`: 交易私钥。

- `transaction_cfg`: 交易基础配置。

  ~~~
  type:
    dict
  example:
      cfg = {
           "gas":100000000,
           "gasPrice":2000000000000,
           "nonce":1,
       }
  ~~~



##### 减持/撤销委托

调用：

```
ppos.withdrewDelegate(staking_blocknum, node_id, amount, pri_key, transaction_cfg=None)
```

参数：

- `staking_blocknum`: 代表着某个node的某次质押的唯一标示

- `node_id`: 被质押的节点的NodeId。 **浏览器复制去除0x前缀**

- `amount`: 减持生效的委托的金额(按照最小单位算，1ATP = 10\*\*18 von)

- `pri_key`: 交易私钥。

- `transaction_cfg`: 交易基础配置。

  ~~~
  type:
    dict
  example:
      cfg = {
           "gas":100000000,
           "gasPrice":2000000000000,
           "nonce":1,
       }
  ~~~



##### 提取委托奖励

调用：

```
ppos.withdrawDelegateReward(pri_key, transaction_cfg=None)
```

参数：

- `pri_key`: 交易私钥。

- `transaction_cfg`: 交易基础配置。

  ~~~
  type:
    dict
  example:
      cfg = {
           "gas":100000000,
           "gasPrice":2000000000000,
           "nonce":1,
       }
  ~~~



#### query

##### 查询当前结算周期的验证人队列

调用：

```
ppos.getVerifierList(from_address=None)
```

参数：

- `from_address`: 调用rpc接口的from地址。

##### 查询当前共识周期的验证人列表

调用：

```
ppos.getValidatorList(from_address=None)
```

参数：

- `from_address`: 调用rpc接口的from地址。

##### 查询所有实时的候选人列表

调用：

```
ppos.getCandidateList(from_address=None)
```

参数：

- `from_address`: 调用rpc接口的from地址。

##### 查询当前账户地址所委托的节点的NodeID和质押Id

调用：

```
ppos.getRelatedListByDelAddr(del_addr, from_address=None)
```

参数：

- `del_addr`: 委托人账户地址。
- `from_address`: 调用rpc接口的from地址。

##### 查询当前单个节点的委托信息

调用：

```
ppos.getDelegateInfo(staking_blocknum, del_address, node_id, from_address=None)
```

参数：

- `staking_blocknum`: 发起质押时的区块高度。
- `del_address`: 委托人账户地址。
- `node_id`: 验证人的节点Id。
- `from_address`: 调用rpc接口的from地址。

##### 查询当前节点的质押信息

调用：

```
ppos.getCandidateInfo(node_id, from_address=None)
```

参数：

- `node_id`: 验证人的节点Id。
- `from_address`: 调用rpc接口的from地址。

##### 查询当前结算周期的区块奖励

调用：

```
ppos.getPackageReward(from_address=None)
```

参数：

- `from_address`: 调用rpc接口的from地址。

#####  查询当前结算周期的质押奖励

调用：

```
ppos.getStakingReward(from_address=None)
```

参数：

- `from_address`: 调用rpc接口的from地址。

##### 查询打包区块的平均时间

调用：

```
ppos.getAvgPackTime(from_address=None)
```

参数：

- `from_address`: 调用rpc接口的from地址。

##### 查询账户在各节点未提取委托奖励。

调用：

```
ppos.getDelegateReward(address, node_ids=[])
```

参数：

- `address`: 要查询的帐户地址。
- `node_ids`: 要查询的节点ID的字符串数组，如果为空，则查询该帐户委托的所有节点。

##### 举报双签

调用：

```
ppos.reportDuplicateSign(type, data, pri_key, transaction_cfg=None)
```

参数：

- `type`: 双签类型，他有三个可选项 1:prepareBlock, 2: prepareVote, 3:viewChange。

- `data`: 单个证据的json值，格式参照 [RPC接口Evidences](#evidences_interface)。

- `pri_key`: 交易私钥。

- `transaction_cfg`: 交易基础配置。

  ~~~

  type:
    dict
  example:
      cfg = {
           "gas":100000000,
           "gasPrice":2000000000000,
           "nonce":1,
       }

  ~~~



##### 查询节点是否已被举报过多签

调用：

```
ppos.checkDuplicateSign(type, node_id, block_number, from_address=None)
```

参数：

- `type`: 双签类型，他有三个可选项 1:prepareBlock, 2: prepareVote, 3:viewChange。
- `node_id`：待查询节点的ID。
- `block_number`: 重复签名的块高度。
- `from_address`: 调用rpc接口的from地址。

#### 锁仓

##### 创建锁仓计划

调用：

```
ppos.createRestrictingPlan(account, plan, pri_key, transaction_cfg=None)
```

参数：

- `account`：锁仓释放到账账户。

- `plan`：An是RestrictingPlan类型（数组）的列表，并且RestrictingPlan的定义如下:

  ~~~
  type RestrictingPlan struct {
  Epoch uint64
  Amount *big.Int
  }
  ~~~

  - Epoch: 代表结算周期的倍数。每个计费周期的区块数乘积表示锁定的资金s在目标块高度释放。Epoch*每个周期的块数为至少大于最大不可逆块高度。
  - Amount: 指示要在目标块上释放的数量。

- `pri_key`: 交易私钥。

- `transaction_cfg`: 交易基础配置。

  ~~~
  type:
    dict
  example:
      cfg = {
           "gas":100000000,
           "gasPrice":2000000000000,
           "nonce":1,
       }
  ~~~



##### 获取锁仓信息

调用：

```
ppos.getRestrictingInfo(account, from_address=None)
```

参数：

- `account`：锁仓释放到账账户。
- `from_address`: 调用rpc接口的from地址。

#### 治理

```
from client_sdk_python import Web3, HTTPProvider
from client_sdk_python.pip import Pip
w3 = Web3(HTTPProvider("http://47.241.91.2:6789"),chain_id = 201030)
pip = Pip(w3)
```

##### 文本提案

调用：

```
pip.submitText(verifier, pip_id, pri_key, transaction_cfg=None)
```

参数：

- `verifier`: 提交提案的验证人。

- `pip_id`: PIPID。

- `pri_key`: 交易私钥。

- `transaction_cfg`: 交易基础配置。

  ~~~

  type:
    dict
  example:
      cfg = {
           "gas":100000000,
           "gasPrice":2000000000000,
           "nonce":1,
       }

  ~~~



##### 升级提案

调用：

```
pip.submitVersion(verifier, pip_id, new_version, end_voting_rounds, pri_key, transaction_cfg=None)
```

参数：

- `verifier`:  提交提案的验证人。

- `pip_id`:  PIPID。

- `new_version`：新的版本。

- `end_voting_rounds`：从当前提交提案开始到投票截止时需要的共识轮数。0 <end_voting_rounds <= 4840 4840个共识块目前约为2周 实际讨论可根据配置计算）.

- `pri_key`: 交易私钥。

- `transaction_cfg`:交易基础配置。

  ~~~
  type:
    dict
  example:
      cfg = {
           "gas":100000000,
           "gasPrice":2000000000000,
           "nonce":1,
       }
  ~~~



##### 参数提案

调用：

```
pip.submitParam(verifier, pip_id, module, name, new_value, pri_key, transaction_cfg=None)
```

参数：

- `verifier`: 提交提案的验证人。

- `pip_id`: PIPID。

- `module`: 参数模块。

- `name`: 参数名字。

- `new_value`：新参数值。

- `pri_key`: 交易私钥。

- `transaction_cfg`: 交易基础配置。

  ~~~
  type:
    dict
  example:
      cfg = {
           "gas":100000000,
           "gasPrice":2000000000000,
           "nonce":1,
       }
  ~~~



##### 删除提案

调用：

```
pip.submitCancel(verifier, pip_id, end_voting_rounds, tobe_canceled_proposal_id, pri_key, transaction_cfg=None)
```

参数：

- `verifier`：提交提案的验证人。

- `pip_id`: PIPID.

- `end_voting_rounds`：投票共识轮数。请参阅有关提交升级建议的说明 同时，此参数在此接口中的值。 不能大于相应升级建议中的值。

- `tobe_canceled_proposal_id`: 升级建议ID将被取消。

- `pri_key`:交易私钥。

- `transaction_cfg`: 交易基础配置。

  ~~~
  type:
    dict
  example:
      cfg = {
           "gas":100000000,
           "gasPrice":2000000000000,
           "nonce":1,
       }
  ~~~



##### 投票

调用：

```
pip.vote(verifier, proposal_id, option, program_version, version_sign, pri_key, transaction_cfg=None)
```

参数：

- `verifier`:  提交提案的验证人。

- `proposal_id`: 提案ID。

- `option`: 投票选项。

- `program_version`: 节点代码版本，由rpc getProgramVersion接口获取。

- `version_sign`: 通过rpc getProgramVersion接口获得的代码版本签名。

- `pri_key`: 交易私钥。

- `transaction_cfg`: 交易基础配置。

  ~~~
  type:
    dict
  example:
      cfg = {
           "gas":100000000,
           "gasPrice":2000000000000,
           "nonce":1,
       }
  ~~~



##### 版本声明

调用：

```
pip.declareVersion(active_node, program_version, version_sign, pri_key, transaction_cfg=None)
```

参数：

- `active_node`: 声明的节点只能是验证者/候选者。

- `program_version`: 声明的版本，由rpc的getProgramVersion接口获得。

- `version_sign`: 通过rpc的getProgramVersion接口获得的已签名的版本签名。

- `pri_key`: 交易私钥。

- `transaction_cfg`: 交易基础配置。

  ~~~
  type:
    dict
  example:
      cfg = {
           "gas":100000000,
           "gasPrice":2000000000000,
           "nonce":1,
       }
  ~~~



调用：

```
pip.getProposal(proposal_id, from_address=None)
```

参数：

- `proposal_id`: 提案 id。
- `from_address`: 调用rpc接口的from地址。

##### 查询提案结果

调用：

```
pip.getTallyResult(proposal_id, from_address=None)
```

参数：

- `proposal_id`: 提案 id。
- `from_address`: 调用rpc接口的from地址。



##### 查询提案的累积可投票人数

调用：

```
pip.getAccuVerifiersCount(proposal_id, block_hash, from_address=None)
```

参数：

- `proposal_id`:  提案 id。
- `block_hash`：块hash。
- `from_address`: 调用rpc接口的from地址。

##### 查询提案列表

调用：

```
pip.listProposal(from_address=None)
```

参数：

- `from_address`: 调用rpc接口的from地址。

##### 查询节点的链生效版本

调用：

```
pip.getActiveVersion(from_address=None)
```

参数：

- `from_address`: 调用rpc接口的from地址。

##### 查询当前块高的治理参数值

调用：

```
pip.getGovernParamValue(module, name, from_address=None)
```

参数：

- `module`: 参数模块。
- `name`: 参数名字。
- `from_address`：调用rpc接口的from地址。

##### 查询治理参数列表

调用：

```
pip.listGovernParam(self, module=None, from_address=None)
```

参数：

- `module`：参数模块。
- `from_address`: 调用rpc接口的from地址。





*本教程贡献者 @[JeriZhang](https://github.com/zhanglonglongSH)*
