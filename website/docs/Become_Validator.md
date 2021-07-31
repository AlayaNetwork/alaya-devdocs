---
id: Become_Validator
title: Staking
sidebar_label: Staking
---

## Overview

Alaya is a blockchain project that implements democratic governance. Verification nodes are jointly selected by all ATP holders to maintain and develop the Alaya network. The 101 nodes with the most votes will become candidate nodes, from which 25 verification nodes will be randomly selected using VRF to participate in the management of the entire Alaya network.

This section describes how to operate as a validator node.

## _Preparation_

Before becoming a validator node, please ensure that the server meets the following requirements:

- The Alaya node has been installed and the node key have been created according to the instructions of [Installing a Node](/alaya-devdocs/en/Run_a_fullnode/)
- Start the node and [join the Alaya network](/alaya-devdocs/en/Join_Alaya_NetWork)

## Configure Nginx

For security reasons, it is not recommended to open the rpc port of the node directly (the node server defaults to Ubuntu 18.04).

You can consider using Nginx for reverse proxy, and strengthen the security of Nginx ports through user authentication and HTTPS. If the user changes the node data directory when installing Alaya, the nginx_conf.sh script also needs to be modified to the same node data directory.

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

> Note
>
> - When the prompt shows `[sudo] password for`, enter the current account password.
> - When the prompt shows `Enter your name`: enter your username，When prompted `Enter your password: ` enter your password. Be sure to keep the username and password in mind(It is recommended not to include spaces in the password), and you will need to fill in the MTool configuration to verify the node information.
> - The prompt `nginx conf succeed` means that nginx is configured successfully. If the configuration is not successful, please contact our customer service to report specific issues.

## Install MTool

Proceed as follows:

**Step1. Download MTool toolkit**

```bash
wget http://download.alaya.network/alaya/mtool/linux/0.16.0/alaya_mtool.zip
```

**Step2. Extract the MTool toolkit**

```bash
(if ! command -v unzip;then sudo apt install unzip; fi;) && unzip alaya_mtool.zip && cd alaya_mtool
```

**Step3. Download script**

> The script is downloaded to the <font color="red">mtool-client</font> directory, otherwise the script cannot find the path of the new version of mtool.

```bash
wget https://download.alaya.network/alaya/scripts/mtool_install.sh
```

**Step4. Execute command**

```bash
chmod +x mtool_install.sh && ./mtool_install.sh
```

> - When the message <font color="red">Install mtool succeed.</font> is displayed, MTool is successfully installed. If it is not successfully installed, please contact our official customer service to provide feedback on specific issues.

**Step5. Restart the session window**

After installation is complete, you need to <font color="red">restart the session window</font> for the newly added environment variables to take effect.

## Configure MTool

### Generate wallet

To participate in the verification node to produce blocks, two wallets must be created. If you already have a wallet, you can skip this step by copying the wallet file to the `$MTOOLDIR/keystore` directory.

- Staking wallet: The staking wallet is used to stake tokens. To become a candidate node, you must stake successfully. Run the following command to create a staking wallet:

```bash
alaya_mtool account new staking
```

Enter the password once and confirm the password again to create a wallet file. After the creation is successful, a staking wallet file `staking.json` will be generated in the directory` $MTOOLDIR/keystore`.

- Reward wallet: It is used to collect block rewards and staking rewards. Staking rewards are uniformly distributed to verification nodes, which are distributed by the verification nodes themselves. Run the following command to create a reward wallet

```bash
alaya_mtool account new reward
```

Enter the password once and confirm the password again to create the wallet file. After the creation is successful, the staking wallet file `reward.json` will be generated in the directory` $MTOOLDIR/keystore`.

### Configure verification node information

#### Download the script

```bash
cd $MTOOLDIR && wget https://download.alaya.network/alaya/scripts/validator_conf.sh
```

#### Run the script configuration

```bash
$ chmod +x validator_conf.sh && ./validator_conf.sh
```

> **Note:**
>
> - When the prompt shows "Please enter the platon node IP address:", please enter the Alaya node server ip address.
> - When the prompt shows "Enter your name:", please enter the username when configuring Alaya node.
> - When the prompt shows "Enter your password:", please enter the password when configuring Alaya node.
> - When the prompt shows "validator conf success", and when the validator_config.json content printed at the end is normal, it means that the script is executed successfully. If the script is not executed successfully, please contact our official customer service to feedback specific questions.

#### Validator node information configuration file description

After the configuration of the validator node information is completed, the validator node information file validator_config.json will be generated in the validator subdirectory of the MTool installation directory. The file content is as follows:

```json
{
  "nodePublicKey": "0abaf3219f454f3d07b6cbcf3c10b6b4ccf605202868e2043b6f5db12b745df0604ef01ef4cb523adc6d9e14b83a76dd09f862e3fe77205d8ac83df707969b47",
  "blsPubKey": "82d740cbc0314ec558c5426f88fdad6f07a07f9846c6be4e40cd628b74b9f641ddad01e4c281a2c3693f8ff2a73a410297aff379ee0575127d51de99b97acc9a1b7bc8ca132ef6f0379a3ec9d76a603d623176e49e1c53e87fead36317895099",
  "nodeAddress": "http://192.168.120.146",
  "nodePort": "16789",
  "nodeRpcPort": "6789",
  "certificate": "/path/to/ssl_ca"
}
```

> **Parameter description:**
>
> - nodePublicKey: Node ID, which can be viewed in the nodeid file under the node data directory data
> - blsPubKey: BLS public key, which can be viewed in the blspub file under the node data directory data.
> - nodeAddress:
>   - If you use Nginx, you need to use **https** protocol whose format is: `https://test:test@domain3`.
>   - If you do not use Nginx, you need to use the **http** protocol. If MTool and the node are on the same machine or in the same local area network, you can use the intranet IP, otherwise use the public IP whose format is: `http://18.238.183.12`.
> - nodePort: Node P2P port, default is 16789.
> - nodeRpcPort:
>   - If Nginx is used, the default port is 443.
>   - If Nginx is not used, the default port is 6789.
> - certificate: ca certificate address, which can be deleted if Nginx reverse proxy is not used.

#### Custom AlayaScan avatar

If users do not need to display their specified avatar on AlayaScan, they can skip this step. Otherwise, the following operations are required:

- **Register a keybase account**

  Users first need to register on the official website of [keybase.io](https://keybase.io/) . If they have already registered, they can log on the official website of keybase.

- **Upload specified avatar**

  Click the user avatar to upload the avatar.

- **Generate PGP key**

  If the user has a `PGP key`, after a successful login, a series of 16-bit public keys will be displayed next to the user's avatar, such as: `EB621920A48D0699`; if the user does not already have a `PGP key`, click `add a PGP key` next to the user's avatar to generate.

- **Specify the externalId value**

  When issuing the staking operation, specify the `--external_id` parameter to be the PGP key generated in the previous step.

> Note: After the user completes the staking operation, the avatar customized by the user can be displayed on AlayaScan.

## Initiate a staking operation

If the consensus node deployment is complete and is catching up the blocknumber of [AlayaScan](https://scan.alaya.network/), you can use MTool for staking operations. Please ensure that the balance of the staking account is sufficient before staking. The minimum threshold for staking is ten thousand ATP.

Excuting command

```bash
alaya_mtool staking --config $MTOOLDIR/validator/validator_config.json --keystore $MTOOLDIR/keystore/staking.json --amount 10000 --benefit_address xxx196278ns22j23awdfj9f2d4vz0pedld8a2fzwwj --delegated_reward_rate 5000 --node_name myNode --website www.mywebsite.com --details myNodeDescription --external_id 121412312
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
> - config：node configuration file
> - keystore: staking wallet file
> - amount: staking amount, not less than 10000ATP-staking threshold, no more than 8 decimal places
> - restrictedamount: not less than 10000ATP-staking threshold, no more than 8 decimal points (staking using locked balance)
> - autoamount: Not less than 10000ATP-Priority to use the lock-up balance staking, if the lock-up balance is not enough for the staking deposit, then use free amount staking
> - benefit_address: benefit account to receive block-packing reward and staking reward
> - delegated_reward_rate：Delegated bonus ratio, type is integer range is \[0,10000\], unit: ten thousand percent, e.g. enter 5000, it means the bonus ratio is 50%
> - node*name：node name，30 bytes(beginning with a letter, including alphabet, number, space, *, -, #)
> - website：node website, 30 bytes
> - details：node description, 280 bytes
> - external_id：node Icon ID of keybase.io, or identity authentication ID
