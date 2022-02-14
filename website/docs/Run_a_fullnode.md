---
id: Run_a_fullnode
title: Run a fullnode
sidebar_label: Run a fullnode
---

## Overview

This guide demonstrates how to install the Alaya Node software on Linux.

## System Requirements

- CPU: 4 Cores
- Memory: 8G
- Disk: > 100G

## Installation Overview

It takes three or four steps to install a new node, which depends on the operating system used. The detailed procedures are list below.

- Installing on Ubuntu (18.04)

> **Note: Use the normal user to execute the following command.**

## Installing on Ubuntu (18.04)

### Install and run NTP service

#### Open a terminal and run the following commands

```bash
sudo apt-get update &&
sudo apt-get install -y gnupg2 curl software-properties-common ntp &&
sudo systemctl enable ntp && sudo systemctl start ntp
```

> Notes:
>
> NTP service is used for time synchronization, incorrect system time will affect the normal operation of Alaya

#### Validate the NTP time synchronization

```bash
ntpq -4c rv | grep leap_none
```

> Notes:
>
> Display **associd=0 status=0615 <font color="red">leap_none</font>, sync_ntp, 1 event, clock_sync,** where `leap_none` is red, indicating that the NTP time synchronization is normal.

### Install Alaya

- Backup binaries

  Tip: You can skip this step if you do not need to back up the old version binaries.

  ```bash
  [[ -x /usr/bin/alaya ]] && sudo mv /usr/bin/alaya /usr/bin/alaya_`alaya version | grep '^Version:' | awk -F "[ ,:,-]" '{print $3}'`
  [[ -x /usr/bin/alayakey ]] && sudo mv /usr/bin/alayakey /usr/bin/alayakey_`alayakey --version | awk -F "[ ,-]" '{print $3}'`
  ```

- Install binary

  <font color="red">The binary version number of the main network is 0.16.3, and that of the development network is 0.16.3. If you need to join the development network, please change the version number in the download link to 0.16.3.</font>

  ```bash
  sudo wget https://download.alaya.network/alaya/platon/0.16.3/alaya -P /usr/bin
  sudo wget https://download.alaya.network/alaya/platon/0.16.3/alayakey -P /usr/bin
  sudo chmod +x /usr/bin/alaya  /usr/bin/alayakey
  alaya version
  ```

  After executing the commands above, `alaya` and ` alayakey` binary should be successfully installed in the `/usr/bin` directory on your system. You can execute corresponding commands in any directory.

## Generate keys

### Public and private keys

Each node in the network has an unique identity to distinguish it from others. This identity is a public and private key pair, generated in the node's working directory ( `~/alaya-node`) by the following command:

```bash
mkdir -p ~/alaya-node/data && alayakey genkeypair | tee >(grep "PrivateKey" | awk '{print $2}' > ~/alaya-node/data/nodekey) >(grep "PublicKey" | awk '{print $3}' > ~/alaya-node/data/nodeid)
```

> Remark:
>
> Displays the following, indicating that the key pair has been successfully generated (x stands for number or letter) :
>
> PrivateKey: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
>
> PublicKey: : xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

`PrivateKey` is the private key of the node, and` PublicKey` is the public key of the node. The public key is used to identify the identity of the node and can be made public.

Two files will be generated in the subdirectory `data` under the working directory of the node：

- nodeid: node public key (ID) file, which holds the node's public key
- nodekey: node private key file, which holds the node's private key

### BLS public and private key

In addition to the public and private keys of the node, the Alaya node also needs a key pair called the BLS public and private key. This key pair will be used in the consensus protocol. The key pair can be generated in the node's working directory (such as `~/alaya-node`) by the following command:

```bash
mkdir -p ~/alaya-node/data && alayakey genblskeypair | tee >(grep "PrivateKey" | awk '{print $2}' > ~/alaya-node/data/blskey) >(grep "PublicKey" | awk '{print $3}' > ~/alaya-node/data/blspub)
```

> PrivateKey: f22a785c80bd1095beff1f356811268eae6c94abf0b2b4e2d64918957b74783e
> PublicKey : 4bf873a66df92ada50a8c6bacb132ffd63437bcde7fd338d2d8696170034a6332e404ac3abb50326ee517ec5f63caf12891ce794ed14f8528fa7c54bc0ded7c5291f708116bb8ee8adadf1e88588866325d764230f4a45929d267a9e8f264402

`PrivateKey` is the BLS private key of the node, and` PublicKey` is the BLS public key of the node. The BLS public key is used to quickly verify the signature in the consensus protocol and can be published. The BLS private key cannot be made public and needs to be backed up.

Two files will be generated in the subdirectory `data` under the working directory of the node:

- blspub: Node BLS public key file, which holds the node's BLS public key

- blskey: Node BLS private key file, which holds the node's BLS private key

## Run Full Node

The Alaya mainnet was officially launched on October 24, 2020, Beijing time, and the ChainID is 201018; the other is the Alaya development network that is open to developers, and the ChainID is 201030.

If you need to join the Alaya mainnet, please refer to [Join the Alaya mainnet](#join-the-alaya-mainnet).

If you need to join the Alaya development network, please refer to [Join the Alaya development network](#join-the-alaya-development-network).

- [Alaya Mainnet Blockchain Explorer](https://scan.alaya.network/)
- [Alaya Development Network Blockchain Explorer](https://devnetscan.alaya.network)



### Join the Alaya Mainnet

Run the following command to join the network:

```bash
cd ~/alaya-node/ && nohup alaya --identity alaya-node --datadir ./data --port 16789 --http.port 6789 --http.api "platon,net,web3,admin,personal" --http --nodekey ./data/nodekey --cbft.blskey ./data/blskey --verbosity 1 --http.addr 127.0.0.1 --syncmode "fast" > ./data/alaya.log 2>&1 &
```

Or you can use the `service unit` to manage your `alaya` process:

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
    --http.addr 127.0.0.1 \\
    --http.port 6789 \\
    --http \\
    --http.api "platon,net,web3,admin,personal" \\
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



**Notes:**

| Item          | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| --identity    | Specify network name                                         |
| --datadir     | Specify data directory path                                  |
| --port        | p2p port number                                              |
| --http.addr     | Specify rpc server address                                   |
| --http.port     | pecify rpc protocol communication port                       |
| --http.api      | API's offered over the HTTP-RPC interface                      |
| --http         | Enable the HTTP-RPC server                        |
| --nodekey     | Specify the private key file of the node                     |
| --cbft.blskey | Specify the bls private key file of the node (a non-validator is a full node. This parameter is optional) |
| --verbosity   | Log level, 0: CRIT; 1: ERROR;  2: WARN; 3: INFO; 4: DEBUG; 5: TRACE |
| --syncmode    | fast: fast synchronization mode; full: full synchronization mode |
| –-db.nogc      | Enable the archive mode                                      |
| --allow-insecure-unlock   | Enable unlockAccount function     |

More parameter meanings can be viewed through the `alaya --help` command.



#### Mainnet-related Resources

| Documents or Resources | Address                                                      | Note                                                         |
| ---------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| alaya binary file     | https://download.alaya.network/alaya/platon/0.16.3/alaya    |                                                              |
| alayakey               | https://download.alaya.network/alaya/platon/0.16.3/alayakey  |                                                              |
| mtool windows          | https://download.alaya.network/alaya/mtool/windows/0.16.2/alaya_mtool.exe | You need to modify the chain ID in the configuration file config.properties to the development network chain ID: 201030 |
| mtool linux            | https://download.alaya.network/alaya/mtool/linux/0.16.2/alaya_mtool.zip   | You need to modify the chain ID in the configuration file config.properties to the development network chain ID: 201030 |
| samurai                | https://github.com/AlayaNetwork/Samurai/releases/download/v8.1.0/samurai-chrome-8.1.0.zip |                                                              |
| explorer address       | https://scan.alaya.network/                                  |                                                              |



### View Node State

When Alaya is successfully started, it will automatically establish a connection with the nearest node through the node discovery protocol under normal circumstances. After the connection is successful, block synchronization will be started, so you can check the peers of the node and the increase in the current node block height to determine if you have joined the network.

If the key is not generated in advance, the node is automatically generated in the data directory of the node when it is started. If it is generated automatically, only the private key and the BLS private key of the node will be generated, not any other related public key.

```bash
# Enter the Alaya console
alaya attach http://localhost:6789

## The following commands are executed in the Alaya console
# View peers of the node
admin.peers

# View the current block height
platon.blockNumber

# View synchronization state
platon.syncing

# Exit the console
exit
```

If a series of Alaya network nodes appear in the node list and the block height is increasing, then the connection succeeds! (As the new node needs to be synchronized, there may be a delay).

The fast synchronization makes it impossible to query the current block height. When it is synchronized to the latest height, the full synchronization mode will be automatically enabled, and at that time you can view the latest height.



### Join the Alaya Development Network

If you are deploying a mainnet node, you can skip the following content.

The development network provides a development and test environment for developers or nodes. There may be instability and network reset. The current version of the development network is `0.16.2`.

#### Initialize the Genesis Block

```bash
# Download the genesis block file genesis.json
cd ~/alaya-node && wget https://download.alaya.network/alaya/platon/0.16.1/genesis.json

# Initialize the genesis block file
cd ~/alaya-node && alaya --datadir ./data init genesis.json
```



> Note:
>
> The prompt of `Successfully wrote genesis state` indicates that the genesis information is synchronized.



#### Start the Validator

Execute the following command to make the validator to join the Alaya development network; if you need to become a validator, please apply for a large amount of test ATP through the follow-up instructions (the development network will be reset from time to time according to the test needs, and the test ATP has no actual value).

```shell
cd ~/alaya-node/ && nohup alaya --identity alaya-node --datadir ./data --port 16789 --http.port 6789 --http.api "platon,net,web3,admin,personal" --http --nodekey ./data/nodekey --cbft.blskey ./data/blskey --verbosity 1 --rpcaddr 127.0.0.1 --bootnodes enode://48f9ebd7559b7849f80e00d89d87fb92604c74a541a7d76fcef9f2bcc67043042dfab0cfbaeb5386f921208ed9192c403f438934a0a39f4cad53c55d8272e5fb@devnetnode1.alaya.network:16789 --syncmode "fast" > ./data/alaya.log 2>&1 &
```

**You can also refer to the mainnet configuration `service unit` file to manage the Alaya process.**



#### Resources Related to the Development Network

| Documents or Resources | Address                                                      | Note                                                         |
| ---------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| alaya binary files    | https://download.alaya.network/alaya/platon/0.16.3/alaya     |                                                              |
| alayakey               | https://download.alaya.network/alaya/platon/0.16.2/alayakey  |                                                              |
| mtool windows          | https://download.alaya.network/alaya/mtool/windows/0.16.2/alaya_mtool.exe | You need to modify the chain ID in the configuration file config.properties to the development network chain ID: 201030 |
| mtool linux            | https://download.alaya.network/alaya/mtool/linux/0.16.2/alaya_mtool.zip | You need to modify the chain ID in the configuration file config.properties to the development network chain ID: 201030 |
| Samurai                | https://github.com/AlayaNetwork/Samurai/releases/download/v8.1.0/samurai-chrome-8.1.0.zip |                                                              |
| Open RPC URL           | http://47.241.91.2:6789 and ws://47.241.91.2:6790                                 |                                     |
| explorer address       | https://devnetscan.alaya.network                             |                                                              |




