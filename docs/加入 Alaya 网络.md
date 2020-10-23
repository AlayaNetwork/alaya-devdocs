---
id: Join_Alaya_NetWork
title: Join the Alaya network
sidebar_label: Join the Alaya network
---

## Overview

The Alaya main network will be officially launched on October 24, 2020 Beijing time, and the ChainID is 201018.


## Preparation

Before joining the Alaya public network, please ensure that the server has the following conditions:

- The Alaya node has been installed and the wallet file and node key have been created according to the instructions of [Installing a Node](/alaya-devdocs/en/Install_Node).

This section assumes that the server is Ubuntu 18.04, and the working directory of the executable file is `~/platon-node`. Note that all subsequent commands should be run under the same working directory.




## Join the Alaya Main Network

Anyone and any organization can join the Alaya main network.


### Start as a validator node

**Execute the following command to join the Alaya as a validator node**

```bash
cd ~/platon-node/ && nohup platon --identity alaya-node --datadir ./data --port 16789 --alaya --rpcport 6789 --rpcapi "db,platon,net,web3,admin,personal" --rpc --nodekey ./data/nodekey --cbft.blskey ./data/blskey --verbosity 3 --rpcaddr 127.0.0.1 --syncmode "fast" > ./data/platon.log 2>&1 &
```

**Prompt:**

| **Parameters** | **Description**                                             |
| -------------- | ----------------------------------------------------------- |
| --identity     | Specify the network name                                    |
| --datadir      | Specify the data directory path                             |
| --rpcaddr      | Specify rpc server address                                  |
| --rpcport      | Specifying the RPC protocol communication port              |
| --rpcapi       | Specify the rpcapi name open by the node                    |
| --rpc          | Specify http-rpc communication method                       |
| --nodekey      | Specify the node private key file                           |
| --cbft.blskey  | Specify the node bls private key file                       |
| --alaya        | Specify to connect to the Alaya's main network              |
| --alayatestnet | Specify to connect to the Alaya's test network              |
| --syncmode     | fast: Fast synchronization mode, full: All synchronous mode |
| --db.nogc      | Enable archive mode                                         |

See more parameters with the command `platon --help`

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