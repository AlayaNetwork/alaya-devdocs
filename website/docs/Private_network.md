---
id: Private_network
title: Private network
sidebar_label: Private network
---

## Overview

This document describes how to quickly deploy a personal private blockchain, which requires certain development/operation and maintenance skills of the reader. 

- Before building a private chain, you need to compile the binary file. Please refer to [Alaya Installation](/alaya-devdocs/en/Install_Alaya/).
- Takes Ubuntu as an example to illustrate how to deploy a private chain, including single node and cluster deployment. The deployment method on Windows is similar.

If it is inconvenient for you to connect to an external network, you can build your own private network. `Alaya` supports the single node mode and cluster mode to run private network. Take the Ubuntu environment as an example, and suppose the node data directory is: `~/alaya-node/data` (users can adjust it by themselves).



## Private Network of A Single Node

### Generate nodekey and blskey and other related files

```shell
mkdir -p ~/alaya-node/data \ 
    && alayakey genkeypair | tee >(grep "PrivateKey" | awk '{print $2}' > ~/alaya-node/data/nodekey) >(grep "PublicKey" | awk '{print $3}' > ~/alaya-node/data/nodeid) \ 
    && alayakey genblskeypair | tee >(grep "PrivateKey" | awk '{print $2}' > ~/alaya-node/data/blskey) >(grep "PublicKey" | awk '{print $3}' > ~/alaya-node/data/blspub)
```

>Description:
>
>- nodeid: The node public key (ID) file, to save the node public key and identify its identity
>- nodekey: The node private key file, to save the node private key. It cannot be made public and needs to be backed up.
>- blspub: The node BLS public key file, to save the node BLS public key and quickly verify the signature in the consensus protocol.
>- blskey: The node BLS private key file, to save the node BLS private key. It cannot be made public and needs to be backed up. 

### Create a genesis wallet

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
>
> Note:
>
> The wallet file and password are very important to the generated account address. Loss of the wallet file or forgetting the password will result in the loss of the token in the account. Please make a backup of the wallet file and remember the password. 

### Edit the genesis block configuration file

Create the genesis block configuration file `alaya.json` in the ~/alaya-node directory 

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
        "addressHRP": "atp",
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
            "platonFundAccount": "atp10spacq8cz76y2n60pl7sg5yazncmjuus7n6hw2",
            "platonFundBalance": 0,
            "cdfAccount": "atp17tfkaghs4vded6mz6k53xyv5cvqsl63h5gq7cw",
            "cdfBalance": 4000000000000000000000000
        }
    },
    "nonce": "0x0376e56dffd12ab53bb149bda4e0cbce2b6aabe4cccc0df0b5a39e12977a2fcd23",
    "timestamp": "0x5bc94a8a",
    "extraData": "0xd782070186706c61746f6e86676f312e3131856c696e757800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "gasLimit": "4712388",
    "alloc": {
        "atp1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr75cqxf": {
            "balance": "1000000000000000000000000"
        },
        "atp1zkrxx6rf358jcvr7nruhyvr9hxpwv9unj58er9": {
            "balance": "9718188019000000000000000000"
        }
    },
    "number": "0x0",
    "gasUsed": "0x0",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```

Modify `your-node-pubkey` to the previously generated ***node public key (nodeid)*** and `your-node-blspubkey` to ***node bls public key (blspub)***. `your- account-address` is the address for creating the wallet (multiple initial accounts can be configured):

```txt
# Here is a snippet
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

### Initialize the genesis block 

```bash
cd ~/alaya-node && alaya --datadir ./data init alaya.json
```

>Description:
>
>A prompt of `Successfully wrote genesis state` indicates the genesis information has been initialized.

### Start the node

In general, the alaya process is always in the foreground, so we can't perform other operations. If we exit the terminal halfway, the program will exit. The program can be started in nohup mode under Ubuntu:

```bash
cd ~/alaya-node && nohup alaya --identity "alaya" --datadir ./data --port 16789 --rpcaddr 127.0.0.1 --rpcport 6789 --rpcapi "db,platon,net,web3,admin,personal" --rpc --nodiscover --nodekey ./data/nodekey --cbft.blskey ./data/blskey & > ./data/alaya.log 2>&1 &
```

When the shell prompts that nohup is successful, press Enter again to ensure that the process will not exit due to closing the terminal by mistake. 

### Check the running state of the node

```shell
alaya attach http://localhost:6789 --exec platon.blockNumber
```

Execute the above command several times. If the block height keeps increasing, it means that the single-node private chain is deployed successfully.

## Alaya Cluster Private Network

`Alaya cluster private network` is a network environment with multiple nodes participating. Here we assume that you can build an Alaya single node. And, we will build a network of two nodes on one server. More nodes share the similar operation flow. 

 To run Alaya multi-node locally, you need to ensure:

- Each node instance has a separate data directory (--datadir)
- Each instance runs on a different port, whether it is a p2p port or an rpc port (--port and --rpcport) 
- Nodes can be interconnected with each other
- RPC server port is not occupied

### Create a directory

> Let's take a two-node cluster as an example below

Create directories data0 and data1 in the alaya-node directory as the data directories for the two nodes. Generate coinbase accounts for two nodes respectively. 

```shell
mkdir -p ~/alaya-node/data0 ~/alaya-node/data1
```

### Create a key pair

Save the nodekey and blskey of the two nodes to'data0' and'data1' respectively 

```bash
cd ~/alaya-node/data0 \
    && alayakey genkeypair | tee >(grep "PrivateKey" | awk '{print $2}' > ./nodekey) >(grep "PublicKey" | awk '{print $3}' > ./nodeid) \ 
    && alayakey genblskeypair | tee >(grep "PrivateKey" | awk '{print $2}' > ./blskey) >(grep "PublicKey" | awk '{print $3}' > ./blspub)

cd ~/alaya-node/data1 \
    && alayakey genkeypair | tee >(grep "PrivateKey" | awk '{print $2}' > ./nodekey) >(grep "PublicKey" | awk '{print $3}' > ./nodeid) \
    && alayakey genblskeypair | tee >(grep "PrivateKey" | awk '{print $2}' > ./blskey) >(grep "PublicKey" | awk '{print $3}' > ./blspub)
```

### Edit the genesis file

Modify the genesis block configuration file `alaya.json`. For the template file, refer to the single-node template.

Add the node information of the two nodes to the `initialNodes` array. Since we are generating a cluster environment composed of two nodes, the length of the array is 2.

Modify the `alaya.json` file:

Please replace the contents of the following files `node0-nodekey`, `node1-nodekey`, `node0-blspubkey`, and `node1-blspubkey` with the node public key and node bls public key generated in the previous step, respectively.

Replace `your-account-address` with the wallet address (multiple initial accounts can be configured).

```json
# Here is a snippet
……
  "cbft": {
  "initialNodes": [{
        "node": "enode://node0-pubkey@127.0.0.1:16789",
        "blsPubKey": "node0-blspubkey"
    },{
        "node": "enode://node1-pubkey@127.0.0.1:16790",
        "blsPubKey": "node1-blspubkey"
    }],
   ……
  "alloc": {
    "your-account-address": {
        "balance": "999000000000000000000"
    }
  },
……
```

### Initialization and startup

Initialize the genesis block information for node 0 and node 1: 

```bash
alaya --datadir ~/alaya-node/data0 init alaya.json && alaya --datadir ~/alaya-node/data1 init alaya.json
```

After the initialization is successful, start node 0 and node 1 in nohup mode: 

```bash
cd ~/alaya-node && nohup alaya --identity "alaya0" --datadir ./data0 --port 16789 --rpcaddr 0.0.0.0 --rpcport 6789 --rpcapi "db,platon,net,web3,admin,personal" --rpc --nodiscover --nodekey ./data0/nodekey --cbft.blskey ./data0/blskey > ./data0/alaya.log 2>&1 &

cd ~/alaya-node && nohup alaya --identity "alaya1" --datadir ./data1 --port 16790 --rpcaddr 0.0.0.0 --rpcport 6790 --rpcapi "db,platon,net,web3,admin,personal" --rpc --nodiscover --nodekey ./data1/nodekey --cbft.blskey ./data1/blskey  > ./data1/alaya.log 2>&1 &
```

### Check

Enter the alaya console of any node through the method described above, and check whether the node has established a connection with the opposite end and whether the cluster has been successfully started by seeing whether the blockNumber keeps increasing. 

```shell
alaya attach http://localhost:6789 --exec platon.blockNumber
alaya attach http://localhost:6790 --exec platon.blockNumber
```

Do the above a few more times and observe the growth of the block height. 
