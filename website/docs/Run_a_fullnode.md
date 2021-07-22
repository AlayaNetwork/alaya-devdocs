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
  [[ -x /usr/bin/platon ]] && sudo mv /usr/bin/platon /usr/bin/platon_`platon version | grep '^Version:' | awk -F "[ ,:,-]" '{print $3}'`
  [[ -x /usr/bin/alayakey ]] && sudo mv /usr/bin/alayakey /usr/bin/alayakey_`alayakey --version | awk -F "[ ,-]" '{print $3}'`
  ```

- Install binary

  <font color="red">The binary version number of the main network is 0.16.0, and that of the development network is 0.16.0. If you need to join the development network, please change the version number in the download link to 0.16.0.</font>

  ```bash
  sudo wget https://download.alaya.network/alaya/platon/0.16.0/platon -P /usr/bin
  sudo wget https://download.alaya.network/alaya/platon/0.16.0/alayakey -P /usr/bin
  sudo chmod +x /usr/bin/platon  /usr/bin/alayakey
  platon version
  ```

  After executing the commands above, `platon` and ` alayakey` binary should be successfully installed in the `/usr/bin` directory on your system. You can execute corresponding commands in any directory.

## Generate keys

### Public and private keys

Each node in the network has an unique identity to distinguish it from others. This identity is a public and private key pair, generated in the node's working directory ( `~/platon-node`) by the following command:

```bash
mkdir -p ~/platon-node/data && alayakey genkeypair | tee >(grep "PrivateKey" | awk '{print $2}' > ~/platon-node/data/nodekey) >(grep "PublicKey" | awk '{print $3}' > ~/platon-node/data/nodeid)
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

In addition to the public and private keys of the node, the PlatON node also needs a key pair called the BLS public and private key. This key pair will be used in the consensus protocol. The key pair can be generated in the node's working directory (such as `~/platon-node`) by the following command:

```bash
mkdir -p ~/platon-node/data && alayakey genblskeypair | tee >(grep "PrivateKey" | awk '{print $2}' > ~/platon-node/data/blskey) >(grep "PublicKey" | awk '{print $3}' > ~/platon-node/data/blspub)
```

> PrivateKey: f22a785c80bd1095beff1f356811268eae6c94abf0b2b4e2d64918957b74783e
> PublicKey : 4bf873a66df92ada50a8c6bacb132ffd63437bcde7fd338d2d8696170034a6332e404ac3abb50326ee517ec5f63caf12891ce794ed14f8528fa7c54bc0ded7c5291f708116bb8ee8adadf1e88588866325d764230f4a45929d267a9e8f264402

`PrivateKey` is the BLS private key of the node, and` PublicKey` is the BLS public key of the node. The BLS public key is used to quickly verify the signature in the consensus protocol and can be published. The BLS private key cannot be made public and needs to be backed up.

Two files will be generated in the subdirectory `data` under the working directory of the node:

- blspub: Node BLS public key file, which holds the node's BLS public key

- blskey: Node BLS private key file, which holds the node's BLS private key
