---
id: Python_SDK
title: Python SDK
sidebar_label: Python SDK
---

Client-sdk-python is a python sdk that serves the underlying chain of Alaya, and it interacts with the underlying chain through the web3 object. At the bottom level, it communicates with local nodes through RPC calls. Client-sdk-python can connect to any Alaya node that exposes the RPC interface.

It is mainly used to obtain block data, send transactions, interact with smart contracts, etc.

[Download client-sdk-python](https://github.com/AlayaNetwork/client-sdk-python)



## Getting Started

#### Python Environment Requirements

Python 3.6+ version is supported.

#### Installation

You can either use pip to install or download the source code.

- Directly install with pip

  ```python
   pip install client-sdk-python
  ```

- Download the source code

  ```python
  git clone -b 0.15.1-develop https://github.com/AlayaNetwork/client-sdk-python.git
  ```

  > `0.15.1-develop` is the currently used branch.



### Usage

#### Web3 Module

Alaya nodes communicate with each other through P2PMessage. In the case of the communication between nodes and python sdk, the built-in Web3 module is used to send JSON-RPC requests and connect to the node through HTTP, websocket, IPC and other methods. **ChainID of the mainnet is 201018, and the ChainID of Alaya development network open to developers is 201030.**

#### Node Connection

- Take HTTP connection as an example to connect to an Alaya node. For details, see [Join Alaya Network](https://devdocs.alaya.network/alaya-devdocs/en/Join_Alaya_NetWork/).

  ```python
  w3 = Web3(HTTPProvider("http://47.241.91.2:6789"),chain_id = 201030)
  // alaya is an instance of the PlatON class
  alaya = PlatON(w3) 
  print(w3.isConnected())
  ```

  ` http://47.241.91.2:6789` is a node Url of Alaya. Please enter the Url of the accessible Alaya node.

- Take Websocket connection as an example.

  Code is shown as below:

  ```python
  # websockets Versions>= 8.0
    w3 = Web3(WebsocketProvider("ws://47.241.91.2:6790"),chain_id =201030)
    alaya = PlatON(w3)
    print(w3.isConnected())
  ```


- Take IPC connection as an example.

  Code is shown as below:
  
  ```python
  # platon.ipc in the node directory ~/platon-node/data/ 下
    w3 = Web3(IPCProvider("./platon.ipc"),chain_id = 201030)
    alaya = PlatON(w3)
    print(w3.isConnected())
  ```
  
    



#### Basic API

##### Basic Types of Coding and Encoding

  - **Web3.toBytes()**

    It converts the input parameters to Bytes.

    Method:

    ```python
    >>> Web3.toBytes(0)
    b'\x00'
    >>> Web3.toBytes(0x000F)
    b'\x0f'
    ```

  - **Web3.toHex()**

    It converts the input parameter to a hexadecimal parameter.

    Method:

    ```python
    >>> Web3.toHex(b'\x00\x0F')
    '0x000f'
    >>> Web3.toHex(False)
    '0x0'
    ```

  - **Web3.toInt()**

    It converts the input parameter to an integer.

    Method:

    ```python
    >>> Web3.toInt(0x000F)
    15
    >>> Web3.toInt(b'\x00\x0F')
    15
    ```



  - **Web3.toJSON()**

    It converts the input parameter to an integer.

    Method:

    ```python
    >>> Web3.toJSON(3)
    '3'
    >>> Web3.toJSON({'one': 1})
    '{"one": 1}'
    ```



  - **Web3.toText()**

    It converts the input parameters to json format.

    Method:

    ```python
    >>> Web3.toText(b'cowm\xc3\xb6')
    'cowmö'
    >>> Web3.toText(hexstr='0x636f776dc3b6')
    'cowmö'
    ```



##### Address Detection

  - **Web3.isAddress()**

    It checks whether the input parameter is an approved address format.

    Method:

    ```python
    >>> Web3.isAddress('0xd3CdA913deB6f67967B99D67aCDFa1712C293601')
    True
    ```

##### Hash Encryption

  - **Web3.sha3()**

    It compiles the input parameters to Keccak-256.

    Method:
    
    ```python
    >>> Web3.sha3(0x678901)
        HexBytes('0x77cf3b4c68ccdb65991397e7b93111e0f7d863df3b26ebb053d0857e26486e6a')
    >>> Web3.sha3(text='txt')
        HexBytes('0xd7278090a36507640ea6b7a0034b69b0d240766fa3f98e3722be93c613b29d2e')
    ```
    
    

  - **Web3.soliditySha3()**

    It compiles the input abi_type and value into Keccak-256.

    Parameters:

    - value: the true value.
    - abi_type: A string list in solidity format equal to value.
    
    Method:
    
    ```python
    >>> Web3.solidityKeccak(['uint8[]'], [[97, 98, 99]])
    HexBytes("0x233002c671295529bcc50b76a2ef2b0de2dac2d93945fca745255de1a9e4017e")
    
    >>> Web3.solidityKeccak(['address'], ["0x49EdDD3769c0712032808D86597B84ac5c2F5614"])
    HexBytes("0x2ff37b5607484cd4eecf6d13292e22bd6e5401eaffcc07e279583bc742c68882")
    ```
    
    

#### Query API on Chain

After successfully connecting with the nodes on the Alaya chain, you can query the relevant information of the nodes on the chain through the api in `alaya`.

##### alaya.blockNumber 

It returns the current block number.

Return value:

An AttributeDict object whose resolved value is the number of the most recent block, in the type of `Number`.



##### alaya.syncing

It checks whether the node is currently synchronized with the network.

Return value:

An AttributeDict object with a resolved value of `Object` or `Bool`. If the node has not been synchronized with the network, it returns `false`; otherwise it returns a synchronization object with the following properties:

  - `startingBlock`-Number: Number of starting block in synchronization
  - `currentBlock`-Number: Number of the currently synchronized block
  - `highestBlock`-Number: Estimated number of the target synchronization block
  - `knownStates`-Number: Estimated state to be downloaded.
  - `pulledStates`-Number: The states that have been downloaded.

    

##### alaya.gasPrice

It gets the current gas price, which is determined by the median gas price of several recent blocks.

Return value:

An AttributeDict object whose resolved value is a string representing the current gas price, in VON.



##### alaya.accounts

It returns the list of accounts controlled by the current node.

Return value:

An AttributeDict object whose resolved value is an array of account addresses.

  

##### alaya.evidences

It returns the storage content at the specified location of the account address.

Return value:

An AttributeDict object whose resolved value is the stored content of an account address.

  

##### alaya.consensusStatus

It returns the consensus state information of the block tree where the current node is located.

Return value:

An AttributeDict object whose value is the public state information of all the blocks in the block tree.



##### alaya.getBalance(address)

To get the balance of a specific account address in the specified block.

Parameters:

  - `address`: String-The address of the account whose balance is to be checked, in bech32 address format. In the Alaya network, addresses starting with `atx` are on the testnest, and those starting with `atp` are on the mainnet (ChainID: 201018) or the development network (ChainID: 201030). In the PlatON network, the ones starting with `lax` are on the testnet, and those starting with `lat` are on the mainnet (ChainID: 100) or the development network (ChainID: 210309).

Return value:

An AttributeDict object whose resolved value is the balance string of the specified account address, in the unit of `VON`.

**Example:**

```python
from client_sdk_python import Web3, HTTPProvider
from client_sdk_python.eth import PlatON
from hexbytes import HexBytes

# get blockNumber syncing gasPrice accounts evidences consensusStatus

w3 = Web3(HTTPProvider("http://47.241.91.2:6789"),chain_id = 201030)
alaya = PlatON(w3)
block_number = alaya.blockNumber
print(block_number)
print(alaya.syncing)a
print(alaya.gasPrice)
print(alaya.accounts)
print(alaya.evidences)
print(alaya.consensusStatus)

# get Balance

address = 'atp1ft2fuhh6q8pvpwe4jl3vqc2qhmhqs6ktl7e7g5'
balance = alaya.getBalance(address)
print(balance) 

#Output
11524411
False
1000000000
[]
{}
AttributeDict({'blockTree': AttributeDict({'root': AttributeDict({'viewNumber': 16, 'blockHash': '0x5070404fbfaeb199ed29aee0723bb8f0de12391606235d4bfe61865bd8fa994e', 'blockNumber': 11524412, 'receiveTime': '2021-08-04T04:02:29.295222897Z', 'qc': AttributeDict({'epoch': 46098, 'viewNumber': 16, 'blockHash': '0x5070404fbfaeb199ed29aee0723bb8f0de12391606235d4bfe61865bd8fa994e', 'blockNumber': 11524412, 'blockIndex': 1, 'signature': '0x4da9acd9b911905d4f9275b7256a76aa254bfc5930903b015e05de6af48e021c8a49d5bd430dc27073d13c246c31b90100000000000000000000000000000000', 'validatorSet': 'xxx_xx'}), 'parentHash': '0x0000000000000000000000000000000000000000000000000000000000000000', 'childrenHash': ['0x83d225f2f00bce603ee85b7b963c31ceefe6df131c232e2ef12c40ca58496119']}), 'blocks': AttributeDict({'11524412': AttributeDict({'0x5070404fbfaeb199ed29aee0723bb8f0de12391606235d4bfe61865bd8fa994e': AttributeDict({'viewNumber': 16, 'blockHash': '0x5070404fbfaeb199ed29aee0723bb8f0de12391606235d4bfe61865bd8fa994e', 'blockNumber': 11524412, 'receiveTime': '2021-08-04T04:02:29.295222897Z'
```



##### alaya.getStorageAt()

It returns the storage content in the specified location of an address.

Method:

```
  alaya.getStorageAt(address, position [, defaultBlock] )
```

Parameters:

  - `address`: String-The address to be read.
  - `position`: Number-The index number in the storage.
  - `defaultBlock`: Number|String-Optional. This parameter can be used to overwrite the value of `alaya.defaultBlock`.

Return value:

An AttributeDict object whose resolved value is the content of the specified location in the storage.

##### alaya.getCode()

It returns the code at the specified address.

Method:

```python
  alaya.getCode(address [, defaultBlock] )
```

Parameters:

  - `address`: String-The address of the code to be read.
  - `defaultBlock`: Number|String-Optional. This parameter can be used to overwrite the value of `alaya.defaultBlock`.

Return value:

An AttributeDict object whose resolved value is the code string at the specified address.



##### alaya.getBlock()

It returns the block corresponding to the specified block number or block hash.

Method:

  ```python
 alaya.getBlock(blockHashOrBlockNumber [, returnTransactionObjects] )
  ```
Parameters:

  - `blockHashOrBlockNumber`: String|Number-Block number or block hash value. Or you can use the following string: "genesis", "latest" or "pending".
  - `returnTransactionObjects`: Boolean-Optional. The default value is `false`. When it is set to `true`, all transaction details will be included in the return block; otherwise only the transaction hash will be returned.

Return value:

An AttributeDict object whose resolved value is a block object that meets the search conditions and has the following fields:

- `number`-Number: Block number, or `null` if it is a pending block.
- `hash 32 Bytes`-String: Block hash, or `null` if it is a pending block.
- `parentHash 32 Bytes`-String: The hash of the parent block.
- `nonce 8 Bytes`-String: The hash of the generated proof-of-work, or `null` if it is a pending block.
- `sha3Uncles 32 Bytes`-String: `SHA3` value of the uncle data in the block.
- `logsBloom 256 Bytes`-String: The bloom filter of the log in the block, `null` if it is a pending block.
- `transactionsRoot 32 Bytes`-String: The root node of the transaction tree in the block.
- `stateRoot 32 Bytes`-String: The root node of the final state tree in the block.
- `miner`-String: The address of the miner who receives the reward.
- `difficulty`-String: The difficulty value of the block.
- `totalDifficulty`-String: The total difficulty value of the whole chain until this block.
- `extraData`-String: The "extra data" field of the block.
- `size`-Number: The block size in bytes.
- `gasLimit`-Number: The maximum gas allowed in this block.
- `gasUsed`-Number: The total amount of gas used by all transactions in this block.
- `timestamp`-Number: The unix timestamp at which the block was generated.
- `transactions`-Array: Transaction object array, or 32-byte transaction hash value, depending on the setting of `returnTransactionObjects`.
- `uncles`-Array: Array of uncle block hashes

  

##### alaya.getBlockTransactionCount()

It returns the number of transaction in a given block.

Method:

  ```python
 alaya.getBlockTransactionCount(blockHashOrBlockNumber)
  ```

Parameters:

  - `blockHashOrBlockNumber` - `String|Number`: The block number or hash. Or the string "genesis", "latest", "earliest", or "pending" as in the default block parameter.

Return value:

 An AttributeDict object whose resolved value is the number of transactions in the specified block, in the type of Number.



##### alaya.getTransaction()

It returns a transaction matching the given transaction hash.

Method:

```python
  alaya.getTransaction(transactionHash)
```


Parameters:

  - `transactionHash` - `String`: The transaction hash.

Return value:

An AttributeDict object whose resolved value is a transaction object with a given hash value. For the specific description of this object, see: `alaya.waitForTransactionReceipt`.

  

##### alaya.getRawTransaction()

It returns the HexBytes value of the transaction object with the specified hash value.

Method:

```python
  alaya.getRawTransaction(transactionHash )
```


Parameters:

  - `transactionHash` - `String`: The transaction hash.

Return value:

An object of HexBytes.

  

##### alaya.getTransactionFromBlock()

It returns a transaction based on a block hash or number and the transactions index position.

Method:

```python
  getTransactionFromBlock(hashStringOrNumber, indexNumber )
```


Parameters:

  - `hashStringOrNumber`: String-Block number or hash value of the block. Or the string "genesis", "latest", "earliest", or "pending" as in the default block parameter.
  - `indexNumber`: Number-Transaction index position.

Return value:

A Promise object whose resolved value is a transaction object. For a description of the specific content of the object, see alaya.getTransaction()

  

#### Sending Transactions API on chain

##### sendTransaction(transactionObject)

It submits a transaction to the Alaya chain (a transaction that has been signed by the node and has not yet been submitted).

Parameters:

  - `transactionObject`: Object-The transaction object to be sent, including the following fields:
    - `from`-String|Number: The account address of the transaction sender. If this field is not set, the `platon.defaultAccount` property will be used. It can be set to an address or the index number in the local wallet platon.accounts.wallet.
    - `to`-String: Optional, the destination address of the message. For transactions to create a contract, this field is null.
    - `value`-Number|String|BN|BigNumber: (optional) The value transferred for the transaction in VON, also the endowment if it’s a transaction to create a contract.
    - `gas`-Number: Optional, default value: to be determined. The total amount of gas used for the transaction (unused gas is refunded).
    - `gasPrice`-Number|String|BN|BigNumber: Optional. The gas price of the transaction, in VON, defaulting to `platon.gasPrice`.
    - `data`-String: Optional. Either an ABI string containing the data of the function call on a contract, or the initialization code in the case of a transaction to create a contract.
    - `nonce`-Number: Optional. This field allows overwriting the pending transactions that use the same nonce.

Return value:

`alaya.sendTransaction()` returns the 32-byte transaction hash.

  

##### waitForTransactionReceipt(transaction_hash, timeout)

It returns the receipt of a specific transaction within the specific time.

Parameters:

  - `hash`：String - The transaction hash.
  - `timeout`: Number- Optional. The length of waiting time, in seconds. The default is 120.

Return value:

An AttributeDict object whose resolved value is the receipt of the transaction or null. The receipt object has the following fields:

- `blockHash` 32 Bytes - `String`: Hash of the block where this transaction is in.
- `blockNumber` - `Number`: Block number where this transaction is in.
- `transactionHash` 32 Bytes - `String`: Hash of the transaction.
- `transactionIndex`- `Number`: Index position of the transaction in the block.
- `from` - `String`: Address of the sender.
- `to` - `String`: Address of the receiver. null when it's a transaction to create a contract.
- `contractAddress` - `String`: The contract address created, if the transaction is to create a contract, or null otherwise.
- `cumulativeGasUsed` - `Number`: The total amount of gas used when this transaction is executed in the block.
- `gasUsed` - `Number`: The amount of gas used by this specific transaction alone.
- `logs` - `Array`: Array of log objects, which were generated by this transaction.

  

Examples of how to use `sendTransaction` and `waitForTransactionReceipt` are as follows:

```python
# sendtransaction
to = 'atp1ft2fuhh6q8pvpwe4jl3vqc2qhmhqs6ktl7e7g5'  #Address of the receiver
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

#Output
AttributeDict({'blockHash': HexBytes('0x7bfe17689560c773b1cade579f1bd2cf85aeea9f75177e0e06bcdb4aeebd31a8'), 'blockNumber': 385507, 'contractAddress': None, 'cumulativeGasUsed': 21000, 'from': 'atp1ft2fuhh6q8pvpwe4jl3vqc2qhmhqs6ktl7e7g5', 'gasUsed': 21000, 'logs': [], 'logsBloom': HexBytes('0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'), 'status': 1, 'to': 'atp1ft2fuhh6q8pvpwe4jl3vqc2qhmhqs6ktl7e7g5', 'transactionHash': HexBytes('0x377fcd0dfb5e294041fe4274175ed7fce253973fac7abf4e4ff808b5099a454c'), 'transactionIndex': 0})
```



##### alaya.getTransactionReceipt()

It  returns the receipt of a transaction by transaction hash.

It returns `null` if the transaction is pending.

Method:

  ```python
  alaya.getTransactionReceipt(hash)：
  ```

Parameters:

  - `hash`：String - The transaction hash.

Return value:

A Promise object whose resolved value is the receipt object of the transaction or `null`. For details of the object description, see `alaya.waitForTransactionReceipt`.



##### alaya.getTransactionCount()

It returns the numbers of transactions sent from this address.

Method:

  ```python
  alaya.getTransactionCount(address [, defaultBlock] )
  ```

Parameters:

  - `address`：String - The address to get the numbers of transactions from.
- `defaultBlock`：Number|String - (optional) Set this parameter to overwrite the alaya.defaultBlock property value.

Return value:

A Promise object whose resolved value is the number of transactions issued by the specified address.

  

##### alaya.sendRawTransaction()

It submits a signed serialized transaction to the alaya chain

  ```python
alaya.sendRawTransaction(signTransaction，private_key)
  ```

Parameters:

  - `transactionObject`：`Object` - The transaction object to send, including the following fields:
    - `from` - `String|Number`: The address of the sending account, which uses the `alaya.defaultAccount` property, if not specified; or an address or index of a local wallet in alaya.accounts.wallet.
    - `to` - `String`: (optional) The destination address of the message, or `null` for a transaction to create a contract.
    - `value` - `Number|String|BN|BigNumber`: (optional) The value transferred for the transaction in VON, also the endowment if it’s a transaction to create a contract.
    - `gas` - `Number`: (optional, default: to be determined) The amount of gas to use for the transaction (unused gas is refunded).
    - `gasPrice` - `Number|String|BN|BigNumber`: (optional) The price of gas for this transaction in `VON`, defaulting to `alaya.gasPrice`.
    - `data` - `String`: (optional) Either an ABI byte string containing the data of the function call on a contract, or the initialisation code in the case of a transaction to create a contract.
    - `nonce` - `Number`: (optional). This allows to overwrite the pending transactions that use the same nonce.
  - `private_key`: The private key for signature.

Return value:

It returns the HexBytes of the 32-byte transaction hash.

  

##### alaya.replaceTransaction()

It sends a new transaction `new_transaction` to replace the original transaction `transaction_hash` (in the pending state).

Method:

  ```python
  alaya.replaceTransaction`(transaction_hash,new_transaction)
  ```

Parameters:

  - transaction_hash-string: The hash value of the transaction in the pending state.
  - new_transaction-dict: Transaction object, including fields consistent with transactionObject in sendTransaction.

Return value:

Hash of new_transaction.

  

##### alaya.generateGasPrice()

It uses the selected gas price strategy to calculate a gas price.

Method:

  ```python
  alaya.generateGasPrice(gas_price_strategy)
  ```

Return value:

The value of gas price in wei.



##### alaya.setGasPriceStrategy()

It sets the selected gas price strategy.

Method:

  ```python
  alaya.setGasPriceStrategy(gas_price_strategy)
  ```

Parameters:

- gas_price_strategy: (web3, transaction_params), which must be a signature method.

Return value:

The value of gas price in wei.

##### alaya.modifyTransaction()

It sends new parameters to modify the transaction in the pending state.

Method:

  ```python
  alaya.modifyTransaction(transaction_hash, **transaction_params)
  ```

Parameters:

  - transaction_hash -string: The hash value of the transaction in the pending state.
  - transaction_params: Keyword statements corresponding to the parameters of transaction_hash. For example, if value=1000, change the value in the original transaction to 1000.

Return value:

The hash value of the modified transaction.

  

##### alaya.sign()

It signs data using a specific account. This account needs to be unlocked first.

Method:

  ```python
  alaya.sign(dataToSign, address )
  ```

Parameters:

  - `dataToSign`: String-The data to be signed. For the string, first use utils.utf8ToHex() to convert it to a hexadecimal
- `address`：String|Number - Address to sign data. Or an address or index of a local wallet in alaya.accounts.wallet.

Return value:

The signature result string.

  

##### alaya.estimateGas()

It executes a message call or transaction and returns the amount of the gas used.

Method:

  ```python
  alaya.estimateGas(callObject)
  ```

Parameters:

  - `callObject`：Object - Transaction object, whose from property is optional

Return value

Gas used in the simulated call.



#### Other API

##### alaya.filter

It generates a new filter. The type of the filter generated depends on the parameters. 

Method:

  ```python
  alaya.filter(params)
  ```

Parameters:

- `latest`. It creates a filter in the node for notification when a new block is generated. Remember to check whether the state has changed.
- `pending`. It creates a filter in the node for notification when a pending transaction occurs. Remember to check whether the state has changed.
- Dictionary data. It creates a filter for notification when the client receives a matching whisper message.

  ```python
  >>> alaya.filter('latest')
  <client_sdk_python.utils.filters.BlockFilter object at 0x0000020640DA1048>
  >>> alaya.filter('pending')
  <client_sdk_python.utils.filters.TransactionFilter object at 0x0000020640DA7C08>
  >>> alaya.filter({'fromBlock': 11529962,  'address': 'atp1ft2fuhh6q8pvpwe4jl3vqc2qhmhqs6ktl7e7g5'})
  <client_sdk_python.eth.PlatON object at 0x10c608220>
  ```

##### alaya.getFilterChanges()

It polls the specified filter and returns the newly generated log array since the last poll.

Method:

  ```python
  alaya.getFilterChanges(filter_id)
  ```

Parameters:

  - `filter_id`: Filter_id of the specified filter.

  

Example:

  ```python
  >>>filt=alaya.filter('latest')
  >>>alaya.getFilterChanges(filt.filter_id)
[HexBytes('0x54502fa45a69e787187b1033a892b047313818c48ce85bfe1b2a2bf2151ca383'), HexBytes('0x8c3ba2aeba07a2bdfda558f7aaeaadadffd19b4a4e1d940dae3c6844ee0e1102')]
  ```

##### alaya.getFilterLogs()

It polls the specified filter and returns the corresponding log array.

Method:

  ```python
  alaya.getFilterLogs(filter_id)
  ```

Parameters:

  - `filter_id`: filter_id of the specified filter.



##### alaya.uninstallFilter()

It uninstalls the specified filter and returns the bool value of success or failure.

Method:

  ```python
  alaya.getFilterLogs(filter_id)
  ```

Parameters:

- `filter_id`: filter_id of the specified filter.

Example:

  ```python
  >>> alaya.uninstallFilter(filt.filter_id)
  True
  ```

  

##### alaya.getLogs()

It returns all logs according to the specified options

Method:

  ```python
 alaya.getLogs(options)
  ```

Parameters:

  - `options`: Object-Filter object, including the following fields:
    - fromBlock - Number|String: The number of the earliest block ("latest" may be given to mean the most recent and "pending" currently mining, block). By default "latest".
    - toBlock - Number|String: The number of the latest block ("latest" may be given to mean the most recent and "pending" currently mining, block). By default "latest".
    - address - String|Array: An address or a list of addresses to only get logs from particular account(s).
    - topics - Array: An array of values which must each appear in the log entries. The order is important, if you want to leave topics out use null, e.g. [null, '0x12...']. You can also pass an array for each topic with options for that topic, e.g. [null, ['option1', 'option2']]

Return value:

An AttributeDict object whose resolved value is an array of log objects.

The structure of the events in the array looks as follows:

  - `address` - `String`: Address where this event originated.
  - `data` -String: This field contains unindexed log parameters
  - `topics` -Array: Up to four 32-byte-long subject string arrays can be stored. Subjects 1-3 include index parameters for events
  - `transactionIndex` - `Number`: Index position of the transaction in the block.
  - `transactionIndex`-Number: Index position of the transaction containing the event.
- `blockHash 32 Bytes`-String: The hash value of the block containing the event, or `null` if it is pending.
- `blockNumber`-Number: The block number containing the event, or  `null` if it is pending.



##### functions()

The entry point for calling the contract function.

Method:

  ```python
  myContract.functions.myMethod([param1[, param2[, ...]]]).transact(options)
  ```

Parameters:

  - `options`-Object: Options, including the following fields:

    - `from` - String (optional): The address the call “transaction” should be made from.

    - `gasPrice` - String (optional): The gas price in VON to use for this call “transaction”.

    - `gas` - Number (optional): The maximum gas provided for this call “transaction” (gas limit).

      

##### call()

It calls a contract and executes the method directly in the contract without sending any transactions. Therefore, the state of the contract will not be changed.

Method:

  ```python
  myContract.functions.myMethod([param1[, param2[, ...]]]).call()
  ```

Parameters:

  - [param1[, param2[, ...]]]: Parameters input according to the data type defined in myMethod.

Return value:

The resolved value is the contract method, in the Mixed type. If it returns multiple values, the resolved value is an object.

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
  
  #Output
  get : -9223372036854775808
  ```

  

##### events

It subscribes to the specified contract event.

Method:

  ```python
  myContract.events.MyEvent([options])
  ```

Parameters:

  - `options`-Object: Optional, options for deployment, including the following fields:
    - `filter`-Object: Optional, which filters events by index parameter. For example, {filter: {myNumber: [12,13]}} means all events whose "myNumber" is 12 or 13.
    - `fromBlock`-Number: Optional, which only listens to events that occur in the block with the number specified by this option.
    - `topics`-Array: Optional, used to manually set topics for event filters. If the filter attribute and event signature have been set, then (topic[0]) will not be set automatically.

Return value:

EventEmitter: The event emitter declares the following events:

  - "data" returns Object: Triggered when a new event is received. The parameter is the event object
- "changed" returns Object: Triggered when the event is removed from the blockchain. The event object will be added with an additional property "removed: true"
- "error" returns Object: Triggered when an error occurs


The structure of the returned event looks as follows:

  - `event` - `String`: The event name.
- `signature` - `String|Null`: The event signature; null if it’s an anonymous event.
- `address` - `String`: Address where this event originated.
- `returnValues` - `Object`: The return values from the event, e.g. {myVar: 1, myVar2: '0x234...'}.
- `logIndex` - `Number`: The index position of the event in the block.
- `transactionIndex` - `Number`: The index position of the event in a transaction.
- `transactionHash 32 Bytes`  - `String` Hash of the transaction where this event was created.
- `blockHash 32 Bytes` - `String`: Hash of the block where this event was created. null when it’s still pending.
- `blockNumber` - `Number`: The number of block where this log was created. null when it's still pending.
- `raw.data` -String: This field contains unindexed log parameters
- `raw.topics` -Array: Up to four 32-byte long subject string arrays can be stored. Subjects 1-3 include index parameters for events

Example:

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
  
  #Output：
  AttributeDict({'blockHash': HexBytes('0x78fb61da83dae555c8a8a87fc3296f466afeb7f90e9a3b0ac5689e8b34435174'), 'blockNumber': 2014683, 'contractAddress': None, 'cumulativeGasUsed': 43148, 'from': 'atx1uqug0zq7rcxddndleq4ux2ft3tv6dqljphydrl', 'gasUsed': 43148, 'logs': [AttributeDict({'address': 'atp1plhafce07ymacurudqdrewhtrrx4r2nxrju39h', 'topics': [HexBytes('0x6c2b4666ba8da5a95717621d879a77de725f3d816709b9cbe9f059b8f875e284'), HexBytes('0x0000000000000000000000000000000000000000000000000000000000000064')], 'data': '0x', 'blockNumber': 2014683, 'transactionHash': HexBytes('0xe36b5d2b679d5635ab6dd2b620caa50a476fa84bd93bf7b6c8de807f3a9da483'), 'transactionIndex': 0, 'blockHash': HexBytes('0x78fb61da83dae555c8a8a87fc3296f466afeb7f90e9a3b0ac5689e8b34435174'), 'logIndex': 0, 'removed': False})], 'logsBloom': HexBytes('0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000020080000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000004000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000008000000000000000'), 'status': 1, 'to': 'atp1plhafce07ymacurudqdrewhtrrx4r2nxrju39h', 'transactionHash': HexBytes('0xe36b5d2b679d5635ab6dd2b620caa50a476fa84bd93bf7b6c8de807f3a9da483'), 'transactionIndex': 0})
  (AttributeDict({'args': AttributeDict({'_var': 100}), 'event': 'MyEvent', 'logIndex': 0, 'transactionIndex': 0, 'transactionHash': HexBytes('0xe36b5d2b679d5635ab6dd2b620caa50a476fa84bd93bf7b6c8de807f3a9da483'), 'address': 'atp1plhafce07ymacurudqdrewhtrrx4r2nxrju39h', 'blockHash': HexBytes('0x78fb61da83dae555c8a8a87fc3296f466afeb7f90e9a3b0ac5689e8b34435174'), 'blockNumber': 2014683}),)
  
  ```

  

 #### Get hrp

```python
w3 = Web3(HTTPProvider("http://47.241.91.2:6789"),chain_id = 201030)
alaya = PlatON(w3)
# client-sdk-python 1.0.0.2 Version not adapted.
print(alaya.getAddressHrp)
```



### Contract

#### About contract

The Alaya blockchain supports smart contracts (EVM) created using the solidity language and also WebAssembly (WASM) to execute smart contracts written by users. Among them, WASM is a binary instruction set designed for stack virtual machines. WASM is designed as a target for platform compilation of high-level languages like C/C++/Rust to solve the performance problem of JavaScript. WASM is a Web standard that is being promoted by W3C and is supported by browser vendors such as Google, Microsoft, and Mozilla.
For details on the introduction, creation, and compilation of EVM and WASM contracts, please refer to [Alaya EVM Smart Contract](https://devdocs.alaya.network/alaya-devdocs/en/EVM_Smart_Contract/) and [Alaya WASM Smart Contract] ](https://devdocs.alaya.network/alaya-devdocs/en/WASM_Smart_Contract/).



#### Contract Compilation

The python sdk currently supports the bin and abi formed after the compilation of EVM and WASM contracts as contract data to interact with the Alaya blockchain.

- EVM contracts (created in solidity language) can be compiled, deployed, and called using `platon-truffle`. For details, please refer to [Solidity Compiler](https://github.com/AlayaNetwork/solidity) and [Platon-truffle](https://platon-truffle.readthedocs.io/en/v0.13.1/getting-started/ installation.html).
- WASM contracts (created in C/C++/Rust and other languages) can be compiled, deployed, and called using `PlatON-CDT` or `platon-truffle`. For details, please refer to [PlatON-CDT Compiler](https://github.com/AlayaNetwork/PlatON-CDT/tree/feature/WASM).





#### Calling EVM Contracts via SDK

##### Compile EVM contracts locally using platon-truffle

Obtain bin and abi. Take the Helloworld contract as an example. After compiling Helloworld.sol with `platon-truffle`, get the abi and bytecode (bin) in the generated build/contracts/HelloWorld.json. 

##### Deploy Helloworld contract via python SDK

First, connect to the node through Web3. `from_address` is the account address on the node, and bytecode and abi are the bin and abi after the EVM contract is compiled.

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

  from_address = "atx1yjjzvjph3tw4h2quw6mse25y492xy7fzwdtqja"

  bytecode = '608060405234801561001057600080fd5b50610c28806100206000396000f3fe608060405234801561001057600080fd5b50600436106101375760003560e01......'

  abi = [{"constant":false,"inputs":[],"name":"doWhileControl","outputs"......]

  #Output
  True
  atp1yjjzvjph3tw4h2quw6mse25y492xy7fzwdtqja
```



Then use the function `contract_deploy(bytecode, fromAddress)` to deploy the EVM contract on the nodes of the Alaya blockchain by sending transactions, and the transaction hash `transactionHash` is returned.

`tx_receipt` is the deployment receipt obtained by `alaya.waitForTransactionReceipt` after resolving `transactionHash` (deployment is also a kind of transaction, and `alaya.waitForTransactionReceipt` returns the transaction receipt).

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
  print(contractAddress)
  
  ```



**platon.sendTransaction (parameter)**

Parameters:

- `from`: The address of the account that sent the transaction
- `data`: Data sent to the chain
- `gas`: The amount of gas for the transaction
- `gasPrice`: The gas price, which should be reasonable

If the deployment is successful, the output results are as follows

```python

#Output
0x143efc88f581c4356156519cde51064222ec5a42fcb4d83400a8b11893a95074
AttributeDict({'blockHash': HexBytes('0xf73097d8e7b2cc385910a4af3a4dbc7588774bad3f2b6589052503b649af1525'), 'blockNumber': 305798, 'contractAddress': 'atx1ws7m2tqr55h8xs7e3jg5svlyu0lk9ktpx03cke', 'cumulativeGasUsed': 319449, 'from': 'atx1yjjzvjph3tw4h2quw6mse25y492xy7fzwdtqja', 'gasUsed': 319449, 'logs': [], 'logsBloom': HexBytes('0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'), 'status': 1, 'to': None, 'transactionHash': HexBytes('0x143efc88f581c4356156519cde51064222ec5a42fcb4d83400a8b11893a95074'), 'transactionIndex': 0})
atp1ws7m2tqr55h8xs7e3jg5svlyu0lk9ktpx03cke
```

- The first line of data is the transaction result of alaya.sendTransaction in the function contract_deploy.
- The second line of data is the transaction receipt obtained through alaya.waitForTransactionReceipt.
- The third line is the contract address where the contract is deployed successfully.



##### Call the Helloworld Contract (Send a Transaction)

After the successful deployment of the previous contract, the transaction is sent.

First define a function `SendTxn(txn)`.

It involves: 

Signing a transaction via `alaya.account.signTransaction` (signing with the private key).

Sending a transaction via `alaya.sendRawTransaction`.

Getting a transaction receipt via `alaya.waitForTransactionReceipt`.

  ```python
  send_privatekey = "b7a7372e78160f71a1a75e03c4aa72705806a05cf14ef39c87fdee93d108588c"
  def SendTxn(txn):
      signed_txn = alaya.account.signTransaction(txn,private_key=send_privatekey)
      res = alaya.sendRawTransaction(signed_txn.rawTransaction).hex()
      txn_receipt = alaya.waitForTransactionReceipt(res)
      print(res)
      return txn_receipt
  ```

Create a contract instance contract_instance. Since it is an EVM contract, the function contract is used. If it is a WASM contract, the function wasmcontract is used.

Call ifControl through functions, input parameter 20, and send transaction information through buildTransaction

  ```python
  contract_instance = alaya.contract(address=contractAddress, abi=abi)
  
  txn = contract_instance.functions.ifControl(20).buildTransaction(
      {
          'chainId':200,
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



Parameters:

- `chainId`: Chain id

- `nonce`: Serial number

- `gas`: Gas

- `value`: Value (starting balance of the newly created contract account)

- `gasPrice`: Gas price

  You need to write a reasonable value, call `ifControl`, and successfully pass the parameter 20 to the chain. Then get the corresponding information and data on the chain through the corresponding `getIfControlResult`.

  Below is the output:

  

  ```python
  0x16c76387cdd06ab82a4beb330b36369a5cfa22b8cf6ddfff58c72aaae4a39df9
  AttributeDict({'blockHash': HexBytes('0xbb1d1c3a7abecac9910509ed3ff2ca97cebdba1e88db0b909ffd646a86d69597'), 'blockNumber': 305801, 'contractAddress': None, 'cumulativeGasUsed': 42382, 'from': 'atx1yjjzvjph3tw4h2quw6mse25y492xy7fzwdtqja', 'gasUsed': 42382, 'logs': [], 'logsBloom': HexBytes('0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'), 'status': 1, 'to': 'atp1ws7m2tqr55h8xs7e3jg5svlyu0lk9ktpx03cke', 'transactionHash': HexBytes('0x16c76387cdd06ab82a4beb330b36369a5cfa22b8cf6ddfff58c72aaae4a39df9'), 'transactionIndex': 0})
  ```
  
  
  
- The first line of data is the transaction result of `platon.sendRawTransaction` in the function `SendTxn`.

- The second line of data is the transaction result of `ifControl.
  `
  
-  The third line of data is the transaction result of `getIfControlResult`.



##### Event Call for EVM Contract

The EVM contract can listen to and log the detailed information of related transactions through events. Take the evmevent contract as an example: it adds the event type MyEvent to the method setVar.

Greeter is the successfully deployed EVM contract.

First call setVar through functions, pass the parameters to the chain, and then call the event to return the detailed log of the transaction through greeter.events.MyEvent().

The events method is the event api dedicated to the contract.

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

Output after successful operation:

  ```python
  AttributeDict({'blockHash': HexBytes('0x78fb61da83dae555c8a8a87fc3296f466afeb7f90e9a3b0ac5689e8b34435174'), 'blockNumber': 2014683, 'contractAddress': None, 'cumulativeGasUsed': 43148, 'from': 'atp1uqug0zq7rcxddndleq4ux2ft3tv6dqljphydrl', 'gasUsed': 43148, 'logs': [AttributeDict({'address': 'atp1vc6phdxhdkmztpznv5ueduw6cae3swe40whlsn', 'topics': [HexBytes('0x6c2b4666ba8da5a95717621d879a77de725f3d816709b9cbe9f059b8f875e284'), HexBytes('0x0000000000000000000000000000000000000000000000000000000000000064')], 'data': '0x', 'blockNumber': 2014683, 'transactionHash': HexBytes('0xe36b5d2b679d5635ab6dd2b620caa50a476fa84bd93bf7b6c8de807f3a9da483'), 'transactionIndex': 0, 'blockHash': HexBytes('0x78fb61da83dae555c8a8a87fc3296f466afeb7f90e9a3b0ac5689e8b34435174'), 'logIndex': 0, 'removed': False})], 'logsBloom': HexBytes('0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000020080000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000004000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000008000000000000000'), 'status': 1, 'to': 'atp1vc6phdxhdkmztpznv5ueduw6cae3swe40whlsn', 'transactionHash': HexBytes('0xe36b5d2b679d5635ab6dd2b620caa50a476fa84bd93bf7b6c8de807f3a9da483'), 'transactionIndex': 0})
  (AttributeDict({'args': AttributeDict({'_var': 100}), 'event': 'MyEvent', 'logIndex': 0, 'transactionIndex': 0, 'transactionHash': HexBytes('0xe36b5d2b679d5635ab6dd2b620caa50a476fa84bd93bf7b6c8de807f3a9da483'), 'address': 'atx1vc6phdxhdkmztpznv5ueduw6cae3swe40whlsn', 'blockHash': HexBytes('0x78fb61da83dae555c8a8a87fc3296f466afeb7f90e9a3b0ac5689e8b34435174'), 'blockNumber': 2014683}),)

  ```

The first line is the transaction receipt returned after the function `setVar` is successfully called.

The second line is the transaction log returned after the event `MyEvent()` is called.

Among the values corresponding to'args':

  '_var' is the only parameter value, and in the event of the EVM contract, the basic types of data are `uint`, `int`, `bool`, `address`, and `bytex`.

  



#### SDK Call for WASM Contracts:

##### Compile WASM contracts locally using PlatON-CDT

Take wasmcontract.cpp as an example. After installing PlatON-CDT on this machine, enter the code in PlatON-CDT/build/bin.

  ```python
  platon-cpp wasmcontract.cpp
  ```

After successful compilation, there are two files in wasmcontract/build/contracts.

wasmcontract.abi.json and wasmcontract.WASM, where wasmcontract.abi.json is abi data (in json format), and wasmcontract.WASM is bin data (in binary format).

  ```python
   import binascii
   f = open('D:/wasmcontract.WASM','rb')
   contents=f.read()
   bytecode=binascii.b2a_hex(contents)
  ```

Because what our chain recognizes is hexadecimal data, we need to convert the binary .WASM to hexadecimal bytecode using methods similar to `binascii.b2a_hex` for the sake of identification on the chain.

##### Deploy Helloworld contract (WASM type) through python SDK

After obtaining the bin and abi of the WASM contract, deploy on the chain through Web3.

In the code below, bytecode is the bin data of the contract, and cabi is the abi data of the contract.

  ```python
  from client_sdk_python import Web3, HTTPProvider
  from client_sdk_python.eth import PlatON

  ```python
  
  true = True
  false = False
  
  w3 = Web3(HTTPProvider("http://47.241.91.2:6789"),chain_id = 201030)
  alaya = PlatON(w3)
  print(w3.isConnected())
  from_address = "atp1uqug0zq7rcxddndleq4ux2ft3tv6dqljphydrl"
  
  bytecode='0061736d01000000015c1060027f7f0060017f017f60027f7f017f60017f0060037f7f7f017f60037f7f7f0060047f7f7f7f0060000060047f7f7f......'
  cabi = [{"constant":false,"input":[{"name":"input","type":"string[10]"}],"name":"setArray","output":"void","type":"Action"}......]
  
  ```


WASM contracts create contract instances through `alaya.wasmcontract`.

The .constructor() method is called on the instance to construct the contract, and the transaction is sent to the chain through transact.

```python
  # Instantiate and deploy contract
Payable = alaya.wasmcontract(abi=cabi, bytecode=bytecode,vmtype=1)
  
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

Among them, `tx_receipt` is the transaction receipt of the deployed contract.

After the deployment is successful, the output is as follows:

```python
  #Output
AttributeDict({'blockHash': HexBytes('0x7a193be2cf86aedcf844c0478c6f64d226affb55779bad1b2056c7e70e8158d6'), 'blockNumber': 2012981, 'contractAddress': 'atp15sh4rpuqr4fvzs4cyj9uea54r5tax7kljqqszk', 'cumulativeGasUsed': 1233168, 'from': 'atx1uqug0zq7rcxddndleq4ux2ft3tv6dqljphydrl', 'gasUsed': 1233168, 'logs': [], 'logsBloom': HexBytes('0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'), 'status': 1, 'to': None, 'transactionHash': HexBytes('0x717a82ea0ef116e271fb02dbb7d456fe9dd41a2dbd07cac81d079e375b5dade1'), 'transactionIndex': 0})
  
```



##### Send Transaction to Helloworld Contract (WASM Contract)

After the contract is successfully deployed, call the method in the contract.

payable is an instance after the contract is successfully deployed.

By calling the function setBool, the parameter false is sent to the chain (send a transaction).

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

`payable.functions.getBool().call()` means that the corresponding information on the chain is obtained through the function getBool (according to the definition of this contract, the parameters uploaded by setBool are obtained).

After successful operation, the results are as follows:

  ```python
  #Output
  AttributeDict({'blockHash': HexBytes('0x9bcadf4db5d74789901b2176cb7dad3191d2425b61f261966e932f6606d13041'), 'blockNumber': 2018575, 'contractAddress': None, 'cumulativeGasUsed': 426496, 'from': 'atx1uqug0zq7rcxddndleq4ux2ft3tv6dqljphydrl', 'gasUsed': 426496, 'logs': [], 'logsBloom': HexBytes('0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'), 'status': 1, 'to': 'atp1c5h59flven2hzyrylh2tsmn59r5ucms95n5ugc', 'transactionHash': HexBytes('0x4c724e7d1833ade363f51f611293682771318e3c86b533f5a78b580c812eb009'), 'transactionIndex': 0})
  ```



##### Event Call of WASM Contracts

The events in the WASM contract are generally written in the function of the contract.

Taking the wasmcontract contract as an example, the method setUint32 contains the event setUint32Evt, and setUint32Evt can be used to listen to the transaction results of setUint32 and output logs.

Greeter is an example of a successfully deployed WASM contract.

tx_hash is a transaction instance of passing parameters via the function setUint32.

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
  print(topic_param)

  ```

`topic_param` is the result of the event setUint32Evt call.

The output after successful operation is as follows:

  ```python

  (AttributeDict({'args': AttributeDict({'topic1': 'topic1', 'arg1': 'data1', 'arg2': 1000, 'arg3': 1000}), 'event': 'setUint32Evt', 'logIndex': 0, 'transactionIndex': 0, 'transactionHash': HexBytes('0xabac50c6a9d443d9f89065775f0f3d56ddeabd2f2a5e0e1f36d00db703b14d8b'), 'address': 'atp1sgsp74pce2vkgwqjd3rzmt55p70psmq7qvnqwn', 'blockHash': HexBytes('0x78f15fbacbc745dfd5b35b596d28b61ae2987b6ff9050dc39c716f383e505899'), 'blockNumber': 1477774}),)

  ```

Among the values corresponding to'args':

'topic1' is the topic value, and 'arg1','arg2', and'arg3' are the three parameter values defined in the event.
           





### Built-in Contracts

#### staking

```python
from client_sdk_python import Web3, HTTPProvider
from client_sdk_python.ppos import Ppos
w3 = Web3(HTTPProvider("http://47.241.91.2:6789"),chain_id = 201030)
ppos = Ppos(w3)
```



##### Initiate a staking

Method:

```python
ppos.createStaking(benifit_address, node_id, external_id, node_name, website, details, amount,program_version,program_version_sign, bls_pubkey, bls_proof, pri_key, reward_per, type=2, transaction_cfg=None)
```

Parameters:

- `type`: It indicates whether the free amount of the account or the locked-up amount of the account is used for staking. 0: free amount, 1: locked-up amount.

- `benifit_address`: It indicates the income account, which is used to receive block rewards and staking rewards.

- `node_id`: Id of the node being staked (also called node Id of the candidate).

- `external_id`: External ID (with a length limit, the Id that brings the node description for a third party).

- `node_name`: The name of the staked node (with a length limit, indicating the name of the node).

- `website`: It indicates the third-party homepage of the node (with a length limit, indicating the homepage of the node)

- `details`: It indicates the description of the node (with a length limit, indicating the description of the node)

- `amount`: Staking amount (unit:von, 1ATP = 10\*\*18 von).

- `program_version`: The real version number of the PlatON process of the staked node, accessed through the management rpc

- `program_version_sign`: The real version signature of the program, which can be obtained through the governance rpc.

- `bls_pubkey`: Bls public key.

- `bls_proof`: The proof of bls, obtained through interface that provides the proof.

- `pri_key`: Private key of the transaction.

- `reward_per`: It indicates the the proportion of rewards for the delegation, BasePoint 1BP=0.01%.

- `transaction_cfg`: Basic transaction configuration.

  
   ```python
   type: 
   	dict
   example:
       cfg = {
            "gas":100000000,
            "gasPrice":2000000000000,
            "nonce":1,
        }
   ```


##### Modify Staking Information

Method:

```python
ppos.editCandidate(benifit_address, node_id, external_id, node_name, website, details, pri_key, reward_per, transaction_cfg=None)
```

Parameters:

- `benifit_address`: It indicates the income account, which is used to receive block rewards and staking rewards.

- `node_id`: Id of the node being staked (also called node Id of the candidate).

- `external_id`: External ID (with a length limit, the Id that brings the node description for a third party).

- `node_name`: The name of the staked node (with a length limit, indicating the name of the node).

- `website`: It indicates the third-party homepage of the node (with a length limit, indicating the homepage of the node)

- `details`: It indicates the description of the node (with a length limit, indicating the description of the node)

- `pri_key`: Private key of the transaction.

- `reward_per`: It indicates the the proportion of rewards for the delegation, BasePoint 1BP=0.01%. E.g.: If you pass 500, 5% will be the delegation reward。

- `transaction_cfg`: Basic transaction configuration.

  ~~~python
  
  type: 
  	dict
  example:
      cfg = {
           "gas":100000000,
           "gasPrice":2000000000000,
           "nonce":1,
       }
  ~~~
  


##### Increase Staking

Method:

```python
ppos.increaseStaking(node_id, amount, pri_key, type=2, transaction_cfg=None)
```

Parameters:

- `type`: It indicates whether the free amount of the account or the locked-up amount of the account is used for staking. 0: free amount, 1: locked-up amount.

- `node_id`: Id of the node being staked (also called node Id of the candidate).

- `amount`: von increased.

- `pri_key`: Private key of the transaction.

- `transaction_cfg`: Basic transaction configuration.

     ~~~python
  type: 
  	dict
  example:
      cfg = {
           "gas":100000000,
           "gasPrice":2000000000000,
           "nonce":1,
       }
  ~~~

  



##### Cancel Staking (all cancellations are initiated at one time, and the staking is credited to the account by multiple times)

Method:

```python
ppos.withdrewStaking(node_id, pri_key, transaction_cfg=None)
```

Parameters:

- `node_id`: NodeId of the node staked. **Copy the node ID in an explorer and remove the 0x prefix**.

- `pri_key`: Private key of the transaction.

- `transaction_cfg`: Basic transaction configuration.

     ~~~python
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

##### Initiate a Delegation

Method:

```python
ppos.delegate(type, node_id, amount, pri_key, transaction_cfg=None)
```

Parameters:

- `type`: It indicates whether the free amount of the account or the locked-up amount of the account is used for staking. 0: free amount, 1: locked-up amount.

- `node_id`: NodeId of the node staked. **Copy the node ID in an explorer and remove the 0x prefix**.

- `amount`: The delegation amount (based on the smallest unit, 1ATP = 10\*\*18 von).

- `pri_key`: Private key of the transaction.

- `transaction_cfg`: Basic transaction configuration.

    ~~~python
    type: 
    	dict
    example:
        cfg = {
             "gas":100000000,
             "gasPrice":2000000000000,
             "nonce":1,
         }
    ~~~

    

##### Decrease/Cancel a Delegation

Method:

```
ppos.withdrewDelegate(staking_blocknum, node_id, amount, pri_key, transaction_cfg=None)
```

Parameters:

- `staking_blocknum`: The only sign that represents a certain staking of a certain node

- `node_id`: NodeId of the node staked. **Copy the node ID in an explorer and remove the 0x prefix**.

- `amount`: The delegation amount effectively decreased (based on the smallest unit, 1ATP = 10\*\*18 von).

- `pri_key`: Private key of the transaction.

- `transaction_cfg`: Basic transaction configuration.

  ~~~python
  type: 
  	dict
  example:
      cfg = {
           "gas":100000000,
           "gasPrice":2000000000000,
           "nonce":1,
       }
  ~~~

  

##### Withdraw Delegation Reward

Method:

```python
ppos.withdrawDelegateReward(pri_key, transaction_cfg=None)
```

Parameters:

- `pri_key`: Private key of the transaction.

- `transaction_cfg`: Basic transaction configuration.

  ~~~python
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

##### Query the Validator Queue of the Current Epoch

Method:

```python
ppos.getVerifierList(from_address=None)
```

Parameters:

- `from_address`: The from address that calls the rpc interface.



##### Query the Validator Queue of the Current Round

Method:

```python
ppos.getValidatorList(from_address=None)
```

Parameters:

- `from_address`: The from address that calls the rpc interface.



##### Query All Real-time Candidate Lists

Method:

```python
ppos.getCandidateList(from_address=None)
```

Parameters:

- `from_address`: The from address that calls the rpc interface.



##### Query NodeID and Staking ID of the Node Delegated by the Current Account Address

Method:

```python
ppos.getRelatedListByDelAddr(del_addr, from_address=None)
```

Parameters:

- `del_addr`: Client's account address.
- `from_address`: The from address that calls the rpc interface.



##### Query the Delegation Information of Current Single Node

Method:

```python
ppos.getDelegateInfo(staking_blocknum, del_address, node_id, from_address=None)
```

Parameters:

- `staking_blocknum`: The block height when the staking is initiated
- `del_addr`: Client's account address.
- `node_id`: Validator ID. 
- `from_address`: The from address that calls the rpc interface.



##### Query the Information of the Current Node

Method:

```python
ppos.getCandidateInfo(node_id, from_address=None)
```

Parameters:

- `node_id`: Validator ID. 
- `from_address`: The from address that calls the rpc interface.



##### Query the Block Reward of the Current Epoch

Method:

```python
ppos.getPackageReward(from_address=None)
```

Parameters:

- `from_address`: The from address that calls the rpc interface.



#####  Query the Staking Reward of the Current Epoch

Method:

```python
ppos.getStakingReward(from_address=None)
```

Parameters:

- `from_address`: The from address that calls the rpc interface.



##### Query the Average Time of Packaging Block

Method:

```python
ppos.getAvgPackTime(from_address=None)
```

Parameters:

- `from_address`: The from address that calls the rpc interface.



##### Query the Unwithdrawn Delegation Reward of an Account at Various Nodes

Method:

```python
ppos.getDelegateReward(address, node_ids=[])
```

Parameters:

- `address`: The account address to be queried.
- `node_ids`: A string array of node IDs to be queried. If it is null, all nodes delegated by the account will be queried.



##### Report Double Signing

Method:

```python
ppos.reportDuplicateSign(type, data, pri_key, transaction_cfg=None)
```

Parameters:

- `type`: Type of double signing, which has three options 1: prepareBlock, 2: prepareVote, and 3: viewChange.

- `data`: The json value of a single evidence. For the format, refers to [RPC interface Evidences](#evidences_interface).

- `pri_key`: Private key of the transaction.

- `transaction_cfg`: Basic transaction configuration.

  ```python
  type: 
    	dict
  example:
      cfg = {
           "gas":100000000,
           "gasPrice":2000000000000,
           "nonce":1,
       }
  ```

  

##### Query Whether a Node Has Been Reported to Have Double Signing

Method:

```python
ppos.checkDuplicateSign(type, node_id, block_number, from_address=None)
```

Parameters:

- `type`: Type of double signing, which has three options 1: prepareBlock, 2: prepareVote, and 3: viewChange.
- `node_id`: The ID of the node to be queried.
- `block_number`: The block height of the repeated signature.
- `from_address`: The from address that calls the rpc interface.



#### Lockup



##### Create a Lock-up Plan

Method:

```python
ppos.createRestrictingPlan(account, plan, pri_key, transaction_cfg=None)
```

Parameters:

- `account`: The account that receives the unlocked amount

- `plan`: An is a list of RestrictingPlan (array), and the definition of RestrictingPlan is as follows:

  ~~~python
  type RestrictingPlan struct {
  Epoch uint64
  Amount *big.Int
  }
  ~~~

  

  - Epoch: The multiple of the epoch. The product of the number of blocks in each epoch indicates that the locked funds s are released at the height of the target block. Epoch* the number of blocks per epoch is at least greater than the maximum irreversible block height.
  - Amount: Indicates the amount to be released on the target block.

- `pri_key`: Private key of the transaction.

- `transaction_cfg`: Basic transaction configuration.

  ~~~python
  type: 
  	dict
  example:
      cfg = {
           "gas":100000000,
           "gasPrice":2000000000000,
           "nonce":1,
       }
  ~~~

  



##### Get Lock-up Information

Method:

```python
ppos.getRestrictingInfo(account, from_address=None)
```

Parameters:

- `account`: The account that receives the unlocked amount
- `from_address`: The from address that calls the rpc interface.



#### Governance

```python
from client_sdk_python import Web3, HTTPProvider
from client_sdk_python.pip import Pip
w3 = Web3(HTTPProvider("http://47.241.91.2:6789"),chain_id = 201030)
pip = Pip(w3)
```



##### Text Proposal

Method:

```python
pip.submitText(verifier, pip_id, pri_key, transaction_cfg=None)
```

Parameters:

- `verifier`: The validator who submitted the proposal.
- `pip_id`: PIPID.
- `pri_key`: Private key of the transaction.
- `transaction_cfg`: Basic transaction configuration.

  ```python
  type: 
  	dict
  example:
      cfg = {
           "gas":100000000,
           "gasPrice":2000000000000,
           "nonce":1,
       }
  ```





##### Upgrade Proposal

Method:

```python
pip.submitVersion(verifier, pip_id, new_version, end_voting_rounds, pri_key, transaction_cfg=None)
```

Parameters:

- `verifier`: The validator who submitted the proposal.

- `pip_id`: PIPID.

- `new_version`: A new version.

- `end_voting_rounds`: The number of voting rounds.

- Note: Specify the number of rounds for voting. The voting on the proposal will end in the 230th block of the last round. If the vote is passed, it will take effect after the round is completed. The value this parameter is an integer ranging from 0 <endVotingRounds <= 4840, which is approximately 2 weeks.

- `pri_key`: Private key of the transaction.

- `transaction_cfg`: Basic transaction configuration.

    ```python
    type: 
    	dict
    example:
        cfg = {
             "gas":100000000,
             "gasPrice":2000000000000,
             "nonce":1,
         }
    ```

    

##### Parameter Proposal

Method:

```python
pip.submitParam(verifier, pip_id, module, name, new_value, pri_key, transaction_cfg=None)
```

Parameters:

- `verifier`: The validator who submitted the proposal.

- `pip_id`: PIPID.

- `module`: Parameter module.

- `name`: Parameter name.

- `new_value`: New parameter value.

- `pri_key`: Private key of the transaction.

- `transaction_cfg`: Basic transaction configuration.

    ```python
    type: 
    	dict
    example:
        cfg = {
             "gas":100000000,
             "gasPrice":2000000000000,
             "nonce":1,
         }
    ```

    

##### Delete a Proposal

Method:

```python
pip.submitCancel(verifier, pip_id, end_voting_rounds, tobe_canceled_proposal_id, pri_key, transaction_cfg=None)
```

Parameters:

- `verifier`: The validator who submitted the proposal.

- `pip_id`: PIPID.

- `end_voting_rounds`: The number of voting rounds. Please refer to the instructions on submitting the upgrade proposal. At the same time, the value of this parameter in this interface cannot be greater than the value in the corresponding upgrade proposal.

- `tobe_canceled_proposal_id`: The upgrade proposal ID will be cancelled.

- `pri_key`: Private key of the transaction.

- `transaction_cfg`: Basic transaction configuration.

  ```python
  type: 
  	dict
  example:
      cfg = {
           "gas":100000000,
           "gasPrice":2000000000000,
           "nonce":1,
       }
  ```

  



##### Vote

Method:

```python
pip.vote(verifier, proposal_id, option, program_version, version_sign, pri_key, transaction_cfg=None)
```

Parameters:

- `verifier`: The validator who submitted the proposal.

- `proposal_id`: Proposal ID.

- `option`: Voting options.

- `program_version`: Node code version, obtained through the rpc getProgramVersion interface.

- `version_sign`: The code version signature obtained through the rpc getProgramVersion interface.

- `pri_key`: Private key of the transaction.

- `transaction_cfg`: Basic transaction configuration.

    ```python
    type: 
    	dict
    example:
        cfg = {
             "gas":100000000,
             "gasPrice":2000000000000,
             "nonce":1,
         }
    ```

    

##### Version Statement

Method:

```
pip.declareVersion(active_node, program_version, version_sign, pri_key, transaction_cfg=None)
```

Parameters:

- `active_node`: The declared node can only be a validator/candidate

- `program_version`: The declared version, obtained via the getProgramVersion interface of rpc

- `version_sign`: The version signature, obtained via the getProgramVersion interface of rpc

- `pri_key`: Private key of the transaction.

- `transaction_cfg`: Basic transaction configuration.

     ```python
     type: 
     	dict
     example:
         cfg = {
              "gas":100000000,
              "gasPrice":2000000000000,
              "nonce":1,
          }
     ```

     

Method:

```python
pip.getProposal(proposal_id, from_address=None)
```

Parameters:

- `proposal_id`: Proposal ID.
- `from_address`: The from address that calls the rpc interface.



##### Query Proposal Results

Method:

```python
pip.getTallyResult(proposal_id, from_address=None)
```

Parameters:

- `proposal_id`: Proposal ID.
- `from_address`: The from address that calls the rpc interface.



##### Query the Cumulative Number of Validators

Method:

```python
pip.getAccuVerifiersCount(proposal_id, block_hash, from_address=None)
```

Parameters:

- `proposal_id`:  Proposal ID.
- `block_hash`：Block hash.
- `from_address`: The from address that calls the rpc interface.



##### Query Proposal List

Method:

```python
pip.listProposal(from_address=None)
```

Parameters:

- `from_address`: The from address that calls the rpc interface.



##### Query the Effective Version of the Chain 

Method:

```python
pip.getActiveVersion(from_address=None)
```

Parameters:

- `from_address`: The from address that calls the rpc interface.



##### Query the Governance Parameter Value at the Current Block Height

Method:

```python
pip.getGovernParamValue(module, name, from_address=None)
```

Parameters:

- `module`: Parameter module.
- `name`: Parameter name.
- `from_address`: The from address that calls the rpc interface.



##### Query the Governance Parameter List

Method:

```python
pip.listGovernParam(self, module=None, from_address=None)
```

Parameters:

- `module`: Parameter module.
- `from_address`: The from address that calls the rpc interface.
