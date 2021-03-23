---
id: Join_Alaya_NetWork
title: Join the Alaya network
sidebar_label: Join the Alaya network
---

## Overview

The Alaya main network will be officially launched on October 24, 2020 Beijing time, and the ChainID is 201018; The other is the Alaya develop network(Chainid 201030).


## Preparation

Before joining the Alaya public network, please ensure that the server has the following conditions:

- The Alaya node has been installed and the wallet file and node key have been created according to the instructions of [Installing a Node](/alaya-devdocs/en/Install_Node).

This section assumes that the server is Ubuntu 18.04, and the working directory of the executable file is `~/platon-node`. Note that all subsequent commands should be run under the same working directory.




## Join the Alaya Main Network

Anyone and any organization can join the Alaya main network.


### Start as a validator node

**Execute the following command to join the Alaya as a validator node**

```bash
cd ~/platon-node/ && nohup platon --identity alaya-node --datadir ./data --port 16789 --alaya --rpcport 6789 --rpcapi "db,platon,net,web3,admin,personal" --rpc --nodekey ./data/nodekey --cbft.blskey ./data/blskey --verbosity 1 --rpcaddr 127.0.0.1 --syncmode "fast" > ./data/platon.log 2>&1 &
```

**Prompt:**

| **Parameters** | **Description**                                              |
| -------------- | ------------------------------------------------------------ |
| --identity     | Specify the network name                                     |
| --datadir      | Specify the data directory path                              |
| --port         | Specifying the P2P protocol communication port               |
| --rpcaddr      | Specify rpc server address                                   |
| --rpcport      | Specifying the RPC protocol communication port               |
| --rpcapi       | Specify the rpcapi name open by the node                     |
| --rpc          | Specify http-rpc communication method                        |
| --nodekey      | Specify the node private key file                            |
| --cbft.blskey  | Specify the node bls private key file                        |
| --verbosity    | The level of logging, 0: CRIT;  1: ERROR; 2: WARN;  3: INFO;  4: DEBUG; 5: TRACE |
| --alaya        | Specify to connect to the Alaya's main network               |
| --syncmode     | fast: Fast synchronization mode, full: All synchronous mode  |
| --db.nogc      | Enable archive mode                                          |

See more parameters with the command `platon --help`;

## Join the Alaya Develop Network

The development network provides a development test environment for the developer or node.There may be instability and a network reset.The current version of the development network is 0.15.1.

### Develop network related resources

> - platon：https://download.alaya.network/alaya/platon/0.15.1/platon
>
> - alayakey：https://download.alaya.network/alaya/platon/0.15.1/alayakey
>
> - mtool windows：https://download.alaya.network/alaya/mtool/windows/0.15.1/alaya_mtool.exe
>
> - mtool linux：https://download.alaya.network/alaya/mtool/linux/0.15.1/alaya_mtool.zip
>
>   > You need to change the chain ID in the configuration file config.properties to the development network chain ID: 201030；
>
> - samurai：https://github.com/AlayaNetwork/Samurai/raw/develop/devnet/samurai-devnet-chrome-8.0.11.zip
>
> - Open the RPC URL: http://47.241.91.2:6789
>
> - Scan Browser Address: https://devnetscan.alaya.network



### Initialize the genesis block

- Save the genesis block file

  Save the following to the genesis.json file:

  ```bash
  cd ~/platon-node && wget https://download.alaya.network/alaya/platon/0.15.1/genesis.json 
  ```
  
- Initialize the genesis block file

   Executive command:

  ```shell
  cd ~/platon-node && platon --datadir ./data init genesis.json
  ```

  > Description:
  >
  > A prompt for `Successfully wrote genesis state` indicates that the initialization creation information is complete.


### Start as a validator node

Please refer to [Install node](/alaya-devdocs/en/Install_Node) section to create a nodekey: nodekey, blskey, and then execute the following command to start the verification node to join the Alaya development network;If you need to become a verification node, please apply for a large test ATP by following instructions (the development network will be reset irregularly according to the test needs, and the ATP of the test network has no practical value).

```bash
cd ~/platon-node/ && nohup platon --identity alaya-node --datadir ./data --port 16789 --rpcport 6789 --rpcapi "db,platon,net,web3,admin,personal" --rpc --nodekey ./data/nodekey --cbft.blskey ./data/blskey --verbosity 1 --rpcaddr 127.0.0.1 --bootnodes enode://48f9ebd7559b7849f80e00d89d87fb92604c74a541a7d76fcef9f2bcc67043042dfab0cfbaeb5386f921208ed9192c403f438934a0a39f4cad53c55d8272e5fb@devnetnode1.alaya.network:16789 --syncmode "fast" > ./data/platon.log 2>&1 &
```

### Other

If you need to receive large amount of test ATP, please send an email to support@latticex.foundation according to the format requirements. The email requirements are:

```toml
Title: Alaya Test Network Token Application
Name:
Contact Information:
WeChat ID (or other instant messaging software) :
Application amount:
USES:
Receipt account:
Remark:
```

## View node status

When Alaya is successfully started, under normal circumstances, it will automatically establish a connection with the node closest to it through the node discovery protocol. After the connection is successful, block synchronization will be started. You can determine whether joining the network successfully by looking at the peers of the node and confirming whether the block height of the node is increasing.

If the key is not generated in advance, the node is automatically generated in the node's data directory at startup. If it is automatically generated, only the node private key and BLS private key will be generated, and the relevant public key will not be automatically generated.



### Enter `Alaya` console

```bash
platon attach http://localhost:6789
```

### View peers of a node

```bash
admin.peers
```



### View the current block height

You can get the block height of the current node by executing the following command in the `Alaya` console.

```bash
platon.blockNumber
```

A series of Alaya network nodes appear in the node list and the block height is increasing, which means the connection is successful! (Since the new node needs to be synchronized, there may be a delay)

Type exit to exit the console.