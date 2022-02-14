---
id: Build_Private_Chain
title: Deploy Your Own Private Testnet
sidebar_label: Deploy Your Own Private Testnet
---

This document describes how to quickly deploy a private blockchain.

- Before building the private chain, you need to compile the binary. You can refer to the [Install Alaya document](/alaya-devdocs/en/Install_Alaya).

- Take the private chain deployment under Ubuntu as an example, including single node and cluster deployment. The deployment procedures under Windows is similar to Ubuntu.

If you can't easily connect to an external network, you can choose to build your own private network.Alaya supports single node mode and cluster mode to run private networks.Take the Ubuntu environment as an example and suppose the node data directory is **`~/alaya-node/data`** , which the users should modify accordingly:

## Standalone or Single Node Mode

- **Generate nodekey and blskey files**

```shell
mkdir -p ~/alaya-node/data && alayakey genkeypair | tee >(grep "PrivateKey" | awk '{print $2}' > ~/alaya-node/data/nodekey) >(grep "PublicKey" | awk '{print $3}' > ~/alaya-node/data/nodeid) && alayakey genblskeypair | tee >(grep "PrivateKey" | awk '{print $2}' > ~/alaya-node/data/blskey) >(grep "PublicKey" | awk '{print $3}' > ~/alaya-node/data/blspub)
```

> Note:
>
> - nodeid: node public key (ID) file, which stores the public key of the node and is used to identify the node
> - nodekey: node private key file which stores the node's private key and can not be public and need to do a backup.
> - blspub: node BLS public key file which stores the BLS public key of the node, and is used for fast verification of signatures in the consensus protocol.
> - blskey: node BLS private key file which stores the node's BLS private key, cannot be published and need to make a backup.

- **Generate wallet file**

```shell
mkdir -p ~/alaya-node/data && alaya --datadir ~/alaya-node/data account new
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
> **Note：**
>
> The wallet file and password are very important for the generated account address. Losing the wallet file or forgetting the password will cause the token in the account to be lost. Please make a backup of the wallet file and remember the password.

- **Editing the genesis block configuration file `alaya.json`**

Create the genesis block configuration file alaya.json in the `~/alaya-node` directory, then copy the following genesis block configuration file template content to alaya.json file, modify `your-node-pubkey` as the previously generated **_node public key (nodeid)_**, `your-node-blspubkey` as **_node BLS public key (blspub)_**, `your-account-address` as **_the wallet address_**:

```json
……
    "cbft": {
    "initialNodes": [{
  		"node": "enode://your-node-pubkey@127.0.0.1:16789",
  		"blsPubKey": "your-node-blspubkey"
  	}],
  	……
    "alloc": {
      "your-account-address": {
        	"balance": "999000000000000000000"
      }
    },
……
```

- **Genesis block configuration file template**

```json
{
  "config": {
    "chainId": 201030,
    "eip155Block": 3,
    "cbft": {
      "initialNodes": [
        {
          "node": "enode://4fcc251cf6bf3ea53a748971a223f5676225ee4380b65c7889a2b491e1551d45fe9fcc19c6af54dcf0d5323b5aa8ee1d919791695082bae1f86dd282dba4150f@127.0.0.1:16789",
          "blsPubKey": "d341a0c485c9ec00cecf7ea16323c547900f6a1bacb9daacb00c2b8bacee631f75d5d31b75814b7f1ae3a4e18b71c617bc2f230daa0c893746ed87b08b2df93ca4ddde2816b3ac410b9980bcc048521562a3b2d00e900fd777d3cf88ce678719"
        }
      ],
      "amount": 10,
      "period": 20000,
      "validatorMode": "ppos"
    },
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

- **Initialize the genesis block**

```shell
cd ~/alaya-node && alaya --datadir ./data init alaya.json
```

> Note:
>
> The **Successfully genesis state** prompt appears to indicate that the initialization of the genesis information is complete.

- **Start Node**

  In general, the alaya process is always in the foreground, so we cannot do anything else, and if we exit the terminal in the middle, the program will exit.Ubuntu can launch programs in nohup mode:

```shell
cd ~/alaya-node && nohup alaya --identity "alaya" --datadir ./data --port 16789 --http.addr 127.0.0.1 --http.port 6789 --http.api "platon,net,web3,admin,personal" --http --nodiscover --nodekey ./data/nodekey --cbft.blskey ./data/blskey & > ./data/alaya.log 2>&1 &
```

When succeed in excuting the command of nohup, press enter again to ensure that the process does not exit because the terminal is closed by mistake.

- **Check the running status of the node**

```shell
alaya attach http://localhost:6789 --exec platon.blockNumber
```

Execute the above command several times. If the block height keeps growing, the single-node private chain deployment is successful.

## Cluster Deployment

`Alaya cluster` is a private chain with multiple nodes. Here we assume that you can already build a single node. And we will build a network of two nodes on one server.The deployment of more than two nodes is similar.U:

- Each node instance has a separate data directory (--datadir)
- Each instance runs on a different port, whether it is a p2p port or an rpc port (--port and --http.port)
- Nodes can be interconnected with each other
- RPC server port is not occupied

**1.Create directory**

Create directories data0 and data1 under the alaya-node directory as the data directories for the two nodes. Generate two coinbase accounts for each node.

```shell
mkdir -p ~/alaya-node/data0 ~/alaya-node/data1
```

**2. Generate key pair**

Save the nodekey and blskey of the two nodes to 'data0' and 'data1' respectively.

```shell
cd ~/alaya-node/data0 && alayakey genkeypair | tee >(grep "PrivateKey" | awk '{print $2}' > ./nodekey) >(grep "PublicKey" | awk '{print $3}' > ./nodeid) && alayakey genblskeypair | tee >(grep "PrivateKey" | awk '{print $2}' > ./blskey) >(grep "PublicKey" | awk '{print $3}' > ./blspub)

cd ~/alaya-node/data1 && alayakey genkeypair | tee >(grep "PrivateKey" | awk '{print $2}' > ./nodekey) >(grep "PublicKey" | awk '{print $3}' > ./nodeid) && alayakey genblskeypair | tee >(grep "PrivateKey" | awk '{print $2}' > ./blskey) >(grep "PublicKey" | awk '{print $3}' > ./blspub)
```

**3. Editing genesis files**

Modify the genesis block configuration file `alaya.json`.

Add the node information of the two nodes to the initialNodes array, which is 2 because we are generating a two-node cluster environment.The alaya.json file needs to be modified: please replace the contents of the following files 'node0-nodekey ', 'node1-nodekey', 'node0-blspubkey' and 'node1-blspubkey' with the node public key and node BLS public key generated in the previous step.Replace 'your account-address' with the wallet address.

```
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

**4. Initialization and startup**

Initialize genesis block information for node 0 and node 1, respectively:

```
alaya --datadir ~/alaya-node/data0 init alaya.json && alaya --datadir ~/alaya-node/data1 init alaya.json
```

After successful initialization, start node 0 and node 1 in nohup mode:

```shell
cd ~/alaya-node && nohup alaya --identity "alaya0" --datadir ./data0 --port 16789 --http.addr 0.0.0.0 --http.port 6789 --http.api "platon,net,web3,admin,personal" --http --nodiscover --nodekey ./data0/nodekey --cbft.blskey ./data0/blskey > ./data0/alaya.log 2>&1 &

cd ~/alaya-node && nohup alaya --identity "alaya1" --datadir ./data1 --port 16790 --http.addr 0.0.0.0 --http.port 6790 --http.api "platon,net,web3,admin,personal" --http --nodiscover --nodekey ./data1/nodekey --cbft.blskey ./data1/blskey  > ./data1/alaya.log 2>&1 &
```

**5. Check**

Go to the alaya console for any node as described above to see if the node is connected to its counterpart and to see if the cluster has started successfully by seeing if blockNumber continues to grow.

```shell
alaya attach http://localhost:6789 --exec platon.blockNumber
alaya attach http://localhost:6790 --exec platon.blockNumber
```

Do this multiple times and watch if the block height increases.
