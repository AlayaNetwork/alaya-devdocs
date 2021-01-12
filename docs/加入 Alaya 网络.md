---
id: Join_Alaya_NetWork
title: Join the Alaya network
sidebar_label: Join the Alaya network
---

## Overview

The Alaya main network will be officially launched on October 24, 2020 Beijing time, and the ChainID is 201018; The other is the Alaya beta network, which will be available to developers on January 15, 2021 (Chainid 201030).


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
| --alayatestnet | Specify to connect to the Alaya's test network               |
| --syncmode     | fast: Fast synchronization mode, full: All synchronous mode  |
| --db.nogc      | Enable archive mode                                          |

See more parameters with the command `platon --help`£»

## Join the Alaya Test Network

Anyone and any organization can join the Alaya Test network.

### Initialize the genesis block

- Save the genesis block file

  Save the following to the platon.json file:

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

  

- Initialize the genesis block file

   Executive command£º

  ```shell
  cd ~/platon-node && platon --datadir ./data init platon.json
  ```

  > Description:
  >
  > A prompt for `Successfully wrote genesis state` indicates that the initialization creation information is complete.


### Start as a validator node

**Execute the following command to join the Alaya as a validator node**

```bash
cd ~/platon-node/ && nohup platon --identity alaya-node --datadir ./data --port 16789 --rpcport 6789 --rpcapi "db,platon,net,web3,admin,personal" --rpc --nodekey ./data/nodekey --cbft.blskey ./data/blskey --verbosity 1 --rpcaddr 127.0.0.1 --bootnodes enode://48f9ebd7559b7849f80e00d89d87fb92604c74a541a7d76fcef9f2bcc67043042dfab0cfbaeb5386f921208ed9192c403f438934a0a39f4cad53c55d8272e5fb@testnode1.alaya.network:16789 --syncmode "fast" > ./data/platon.log 2>&1 &
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