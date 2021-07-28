---
id: Become_Validator
title: Staking
sidebar_label: Staking
---



This document will describe how to become a validator through staking after the node is deployed.

## Overview

Alaya is a blockchain project that implements democratic governance. Validator nodes are jointly selected by all ATP holders to maintain and develop the Alaya network. The 101 nodes with the most votes will become candidate nodes, from which 25 validator nodes will be randomly selected using VRF to participate in the management of the entire Alaya network.

This section describes how to operate as a validator node.

## Preparation

Before becoming a validator, make sure that the server has the following conditions:

- The Alaya node has been installed and synchronized according to the instructions of [Installing a Node](/alaya-devdocs/en/Run_a_fullnode/)

## Configure Nginx

For security reasons, it is not recommended to open the rpc port of the node directly (the node server defaults to Ubuntu 18.04). You can consider using Nginx for reverse proxy, and strengthen the security of Nginx ports through user authentication and HTTPS. If the user changes the node data directory when installing Alaya, the nginx_conf.sh script also needs to be modified to the same node data directory.

### Switch to normal user

- View current user

  ```shell
  whoami
  ```

  > If it is displayed as a `root` user, you need to switch to a normal user.

- Switch to normal user

  ```shell
  su user
  ```

  > <font color="red">`user`: Indicates a normal user name, please modify it according to the actual user name.</font>

### Download nginx_conf.sh

```bash
wget https://download.alaya.network/alaya/scripts/nginx_conf.sh
```

### Execute the script

```bash
chmod +x nginx_conf.sh && ./nginx_conf.sh
```

> **Notes**
>
> - When the prompt shows `[sudo] password for`, enter the password of the current account.
> - When the prompt shows `Enter your name:`, enter the user name; when the prompt shows `Enter your password:`, enter the password. Be sure to keep in mind the user name and password (it is recommended not to include spaces in the password), and you will need to fill in the information in subsequent MTool configuration of validator information.
> - When the prompt shows `nginx conf succeed`, it means that nginx has been successfully configured. If not, please feed back specific problems to our customer service.

## Install MTool

Proceed as follows:

**Step1. Download MTool Toolkit**

```bash
wget http://download.alaya.network/alaya/mtool/linux/0.15.0/mtool-client.zip
```

**Step2. Unzip the MTool toolkit**

```bash
(if ! command -v unzip;then sudo apt install unzip; fi;) && unzip mtool-client.zip && cd mtool-client
```

**Step3. Download script**

> The script is downloaded to the <font color="red">mtool-client</font> directory, otherwise the script cannot find the path of the new version of mtool.

```bash
wget https://download.alaya.network/alaya/scripts/mtool_install.sh
```

**Step4. Execute the command to install Mtool**

```bash
chmod +x mtool_install.sh && ./mtool_install.sh
```

> - When the prompt shows  <font color="red">Install mtool succeed</font>, it means that MTool has been successfully installed. If not, please feed back specific problems to our official customer service.

**Step5. Restart the session window**

After the installation is complete, you need to <font color="red">restart the session window</font> to make the newly added environment variables take effect.



## Configure MTool

### Generate wallet

In Alaya, two wallets are created for staking as a validator to generate blocks. If you already have a wallet, you can skip this step by copying the wallet file to the `$ALAYA_MTOOLDIR/keystore` directory.

- Staking wallet: The staking wallet is used to stake tokens. Only after the staking is successful can a node becomes an alternative validator candidate. Run the following command to create a staking wallet:

```bash
mtool-client account new staking
```

Enter the password once and enter it again for confirmation to create a wallet file. After the wallet file is created, a staking wallet file `staking.json` will be generated in the directory `$ALAYA_MTOOLDIR/keystore`.

- Reward wallet: It is used to collect block rewards and staking rewards. Staking rewards are uniformly distributed to validators, which are distributed by the validators themselves. Run the following command to create a reward wallet:

```bash
mtool-client account new reward
```

Enter the password once and enter it again for confirmation to create a wallet file. After the wallet file is created, a staking wallet file `staking.json` will be generated in the directory `$ALAYA_MTOOLDIR/keystore`.



### Configure validator information

#### Download the script

```bash
cd $ALAYA_MTOOLDIR && wget https://download.alaya.network/alaya/scripts/validator_conf.sh
```

#### Run the script configuration

```bash
$ chmod +x validator_conf.sh && ./validator_conf.sh
```

> **Notes:**
>
> - When the prompt shows "Please enter the platon node IP address:", please enter the Alaya node server ip address.
> - When the prompt shows "Enter your name:", please enter the username when configuring Alaya node nginx.
> - When the prompt shows "Enter your password:", please enter the password when configuring Alaya node nginx.
> - When the prompt shows "validator conf success", and when the validator_config.json content printed at the end is normal, it means that the script is executed successfully. If the script is not executed successfully, please contact our official customer service to feed back specific questions or use the non-http configuration below.

#### Description of validator information configuration file 

After the validator information is configured, the validator information file validator_config.json will be generated in the validator subdirectory of the MTool installation directory. The file content is as follows:

```json
{
  "nodePublicKey": "0abaf3219f454f3d07b6cbcf3c10b6b4ccf605202868e2043b6f5db12b745df0604ef01ef4cb523adc6d9e14b83a76dd09f862e3fe77205d8ac83df707969b47",
  "blsPubKey": "82d740cbc0314ec558c5426f88fdad6f07a07f9846c6be4e40cd628b74b9f641ddad01e4c281a2c3693f8ff2a73a410297aff379ee0575127d51de99b97acc9a1b7bc8ca132ef6f0379a3ec9d76a603d623176e49e1c53e87fead36317895099",
  "nodeAddress": "https://dd:dolphin2@domain3",
  "nodePort": "16789",
  "nodeRpcPort": "443",
  "certificate": "/home/dolphintwo/mtool-client/ca.crt"
}
```

> If you don’t need https encryption for intranet access, you don’t need to perform the two operations of <font color="red">configuring Nginx</font> or <font color="red">configuring validator information</font>, and write manually in the `$ALAYA_MTOOLDIR/validator/validator_config.json` file (the content of the file can be modified according to the actual situation).

```
{
  "nodePublicKey": "Content in platon-node/data/nodekey",
  "blsPubKey": "Content in platon-node/data/blskey",
  "nodeAddress": "http://127.0.0.1 or other IP address of this machine",
  "nodePort": "16789",
  "nodeRpcPort": "6789",
}
```



> **Parameter description:**
>
> - nodePublicKey: Node ID, which can be viewed in the nodeid file under the node data directory data.
> - blsPubKey: BLS public key, which can be viewed in the blspub file under the node data directory data.
> - nodeAddress: The node address is divided into two cases: using Nginx and not using Nginx:
>   - If you use Nginx, you need to use **https** protocol whose format is: `https://test:test@domain3`. Domain3 points to the IP address filled in when `validator_conf.sh` is executed in the hosts file.
>   - If you do not use Nginx, you need to use the **http** protocol. If MTool and the node are on the same machine or in the same local area network, you can use the intranet IP, otherwise use the public IP whose format is: `http://18.238.183.12`.
> - nodePort: Node P2P port. The default is 16789.
> - nodeRpcPort: The node address is divided into two cases: using Nginx and not using Nginx:
>   - If Nginx is used, the default port is 443.
>   - If Nginx is not used, the default port is 6789.
> - certificate: ca certificate address, which can be deleted if Nginx reverse proxy is not used.

## Custom AlayaScan avatar

If users do not need to display their specified avatar on AlayaScan, they can skip this step. Otherwise, the following operations are required:

- **Register a keybase account**

  Users first need to register on the official website of [keybase.io](https://keybase.io/) . If they have already registered, they can log on the official website of keybase.

- **Upload specified avatar**

  Click the user avatar to upload the avatar.

- **Generate PGP key**

  If the user has a `PGP key`, after a successful login, a series of 16-bit public keys will be displayed next to the user's avatar, such as: `EB621920A48D0699`; if the user does not have a `PGP key`, click `add a PGP key` next to the user's avatar to generate.

- **Specify the externalId value**

  When initiating the staking operation, specify the `--external_id` parameter to be the `PGP key` generated in the previous step.

> Tip: After the user completes the staking, the avatar customized by the user can be displayed on AlayaScan.



## Initiate a staking operation

If the consensus node is deployed and is catching up the block height of [AlayaScan](https://scan.alaya.network/), you can use MTool for staking. Please ensure that the balance of the staking account is sufficient before staking. The minimum threshold for staking is 10,000 ATP.

Please do not stake all the ATP of the staking account. Keep at least 1 ATP for the payment of the transaction fees for initiating node management, such as voting for upgrade proposals, unstaking and other transactions.

Excuting command

```bash
mtool-client staking --config $ALAYA_MTOOLDIR/validator/validator_config.json --keystore $ALAYA_MTOOLDIR/keystore/staking.json --amount 10000 --benefit_address xxx196278ns22j23awdfj9f2d4vz0pedld8a2fzwwj --delegated_reward_rate 8500 --node_name myNode --website www.mywebsite.com --details myNodeDescription --external_id 121412312
```

Enter the password of the staking wallet and press Enter. If the following information is displayed, the staking is successful:

```bash
operation finished
transaction hash:
0x89b964d27d0caf1d8bf268f721eb123c4af57aed36187bea90b262f4769eeb9b
SUCCESS
```

> **Parameter description:**
>
> - config: The path of the validator information file.
> - keystore: The path of the cold wallet for sending transactions.
> - amount: Staking amount, not less than the staking threshold of 10,000 ATP, no more than 8 decimal places (unlocked balance is staked).
> - restrictedamount: Not less than the staking threshold of 10,000 ATP, no more than 8 decimal places (lock-up balance is staked).
> - autoamount: Not less than 10,000 ATP — The lock-up balance will be staked first; if the lock-up balance is not enough, then the unlocked balance will be staked.
> - benefit_address: The account to receive staking reward.
> - delegated_reward_rate: The proportion of delegation reward, unit: per ten thousand, integer, range \[0,10000]. For example, enter 8,500, and it means that the reward rate is 85%, and the node income is 15%.
> - node_name: Validator name, no more than 30 bytes, beginning with a letter, including letters, numbers, space, -, _, and #).
> - website: Official website path, no more than 70 bytes, composed of numbers and letters.
> - details: A brief introduction of the validator, no more than 280 bytes. English is recommended.
> - external_id: The ID of the node avatar icon in keybase.io, or the ID of external system authentication.
