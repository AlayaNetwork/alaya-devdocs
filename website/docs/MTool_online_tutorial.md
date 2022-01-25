---
id: Online_MTool
title: Online MTool
sidebar_label: Online MTool
---

## Introductory

To facilitate transfer, pledge, delegate, and governance operations, Alaya provides MTool to assist users:

- MTool supports Ubuntu 18.04 and Windows 10. This document describes the installation and use of Windows and Ubuntu, respectively. Users can choose from their own resources.
- MTool provides two signature methods for transactions such as pledge: online signature and offline signature.This document describes online signing operations. For offline signing operations, refer to the [Offline MTool Manual](/alaya-devdocs/en/Offline_MTool)。

## Install MTool

In addition, this document introduces the operation of MTool under Windows and Ubuntu respectively. Users can choose according to their own resources.

### Install MTool under Windows

#### Preparation before installation

execute command:

```
alaya_mtool --version
```

If the execution result shows error message, it indicates that the MTool has not been installed and you can skip the following instructions on how to uninstall the older version.

If the execution result shows the version number, timestamp and other information, it indicates that MTool has been installed. If the MTool is an old version, you need to back up important information at this time, and then manually uninstall the old version. The instructions are as follows:

**Step1. Backup directory**

Back up the `C:\alaya_mtool\mtool\current\keystore` and `C:\alaya_mtool\mtool\current\validator` directories to other directories (do not back them up to `C:\alaya_mtool`). After installing the new version, you need to copy the backup directory back to the `C:\alaya_mtool\mtool\current\` directory. (If the installation directory is a custom directory, the actual one shall prevail)

**Step2. Uninstall old version**

Double-click `C:\alaya_mtool\unins000.exe` to uninstall all old versions of MTool and other business tools.

#### Start installation

**Step1. Download MTool installation package**

On the online machine, copy the link https://download.alaya.network/alaya/mtool/windows/0.16.1/alaya_mtool.exe to the browser and download the MTool installation package.

**Step2. Install MTool**

Double-click alaya_mtool.exe to install it. The default installation directory is C:\alaya_mtool, and it is recommended not to change this installation directory. The pop-up interface displays the message **Completing the mtool Setup Wizard**, indicating that the installation was successful. Click **Finish**.

**Step3. Restart the terminal**

After installation is complete, you need to <font color="red">restart the terminal</font> for the newly added environment variables to take effect.

### Install MTool under Ubuntu

#### Preparation before installation

Back up the `~/alaya_mtool/keystore` and `~/alaya_mtool/validator` directories to other directories (do not back them up to `~/alaya_mtool`). After installing the new version, you need to copy the backup directory back to the `~/alaya_mtool/` directory. (If the installation directory is a custom directory, the actual one shall prevail)

#### start installation

Proceed as follows:

**Step1. Download MTool toolkit**

```bash
wget http://download.alaya.network/alaya/mtool/linux/0.16.1/alaya_mtool.zip
```

**Step2. Extract the MTool toolkit**

```bash
(if ! command -v unzip;then sudo apt install unzip; fi;) && unzip alaya_mtool.zip && cd alaya_mtool
```

**Step3. Download script**

> The script is downloaded to the <font color="red">alaya_mtool</font> directory, otherwise the script cannot find the path of the new version of mtool.

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

## MTool Environment Variable Description

The environment variables of MTool directories under Windows and Ubuntu are different:

- MTool directory
  - Windows: `%ALAYA_MTOOLDIR%`
  - Ubuntu: `$ALAYA_MTOOLDIR`

> Note:Users choose according to their installed system.

## MTool Command Details

> Note: The follow-up command is the command format under Ubuntu. Under Windows, you need to modify `$ALAYA_MTOOLDIR` to `%ALAYA_MTOOLDIR%`.

### Create A Wallet

- Execute the command:

```shell
alaya_mtool account new staking
```

- Parameter description

> staking: The name of the wallet to be created. Once the wallet is created successfully, a wallet file named `staking.json` will be generated in the directory `$ALAYA_MTOOLDIR/keystore`, And print the following information:
>
> ```shell
> -name: staking
> -type: NORMAL
> -address:
> address: atp124xmsmd0uf5cvk7v3s36eytqezqsjfcxscu8yv
> -public key: 0x9521cd81ba28d5d1c23bb7ddb7042d146375203d35000c0289178027abd4dc09bca30257739df166201e73497485242f41d5f50d46bc3c7e4385f81bde560db0
> Important write this Private Key in a safe place.
> It is the important way to recover your account if you ever forget your password.
> 4630b6d86bc74bffd4ca8cfc18bceec562cb40fc5080c258452a04a69bc1ee07
> 
>Important write this mnemonic phrase in a safe place.
> It is the important way to recover your account if you ever forget your password.
> worry jewel penalty jealous expect embark outer eternal verb rebuild rice kidney
> ```
> 
>Wallet address format adjusted to Bech32, among them:
> 
>`atp124xmsmd0uf5cvk7v3s36eytqezqsjfcxscu8yv`: Main network account address, beginning with atp;
> 
>`4630b6d86bc74bffd4ca8cfc18bceec562cb40fc5080c258452a04a69bc1ee07` : the private key of the wallet;
> 
>`worry jewel penalty jealous expect embark outer eternal verb rebuild rice kidney`: the mnemonic words.
> 
>For security reasons, users need to back up the wallet private key or mnemonic words (both can be backed up, or one of them can be backed up). When the wallet is lost, it can be used for recovery. It is recommended that users back up mnemonic words or private keys to a secure storage medium, such as an offline machine.

### Recover wallet file

If the wallet file is lost, you can restore it with the backed up private key or mnemonic as follows:

- Execute the command:

  Recovery via private key:

  ```shell
  alaya_mtool account recover -k staking
  ```

  > Prompt to enter the new wallet password and backup private key, as follows:
  >
  > ```shell
  > Enter a passphrase to encrypt your key to disk:
  > Repeat the passphrase:
  > Enter your 64bit Private Key:
  > 4630b6d86bc74bffd4ca8cfc18bceec562cb40fc5080c258452a04a69bc1ee07
  > ```

  or

  Recovery through mnemonics:

  ```shell
  alaya_mtool account recover -m staking
  ```

  > Prompt to enter a new wallet password and backup mnemonic words, as follows:
  >
  > ```shell
  >  Enter a passphrase to encrypt your key to disk:
  >  Repeat the passphrase:
  >  Enter your bip39 mnemonic:
  >  worry jewel penalty jealous expect embark outer eternal verb rebuild rice kidney
  > ```

- Parameter description

  staking：wallet name.

  After successful restoration, the wallet file staking.json will be generated under the directory `$ALAYA_MTOOLDIR/keystore`.

### Ordinary transfer operation

- Command line

```bash
alaya_mtool tx transfer --keystore $ALAYA_MTOOLDIR/keystore/staking.json --amount "1" --recipient $ to_address --config $ALAYA_MTOOLDIR/validator/validator_config.json
```

- Parameter Description

> keystore: path of the wallet sending the transaction
>
> amount: transfer amount, unit: ATP
>
> recipient: receiving address

### View wallet list

- Command line

```bash
alaya_mtool account list
```

### Query balance based on wallet name

- Command line

```bash
alaya_mtool account balance $keystorename --config $ALAYA_MTOOLDIR/validator/validator_config.json
```

- Parameter description

> $ keystorename: wallet file name，example:staking.json

### Query balance based on address

- Command line

```bash
alaya_mtool account balance -a $address --config $ALAYA_MTOOLDIR/validator/validator_config.json
```

- Parameter description

> a: wallet address

### Create a new restricting plans

Creating a new restricting plan, node's ATPs will be transferred to a specified precompiled contract. The ATPs will be transferred to the specified account multiple times at specified intervals. Before creating a new restricting, you need to create a restricting plan description file in json format.

- restricting plan description file，restricting_plans.json

```json
{
  "account": "atp12jn6835z96ez93flwezrwu4xpv8e4zatwxj7ju",
  "plans": [
    { "epoch": 5000, "amount": 100 },
    { "epoch": 6000, "amount": 100 },
    { "epoch": 7000, "amount": 100 }
  ]
}
```

> account：the specified account that will received ATP from the estricting plan.
>
> epoch：the number of epoch to wait for a transfer plan (Greater than or equal to 1)
>
> amount：the number of ATP to be transferred. Unit: ATP

- command line

```bash
alaya_mtool create_restricting --config $ALAYA_MTOOLDIR/validator/validator_config.json --keystore $ALAYA_MTOOLDIR/keystore/staking.json --file ./restricting_plans.json
```

- Parameter Description

> config：node configuration file
>
> keytore: wallet file
>
> file: restricting plan description file

### Initiate a staking operation

If the deployment of the consensus node is complete and the block has been synchronized successfully, you can use MTool for staking operations. After the staking fund application is completed, ensure that the balance of the staking account is sufficient, and replace the staking amount according to the user's situation. The minimum threshold for staking is ten thousand ATP.

Note: Please keep enough ATP in the staking account, so that the transactions initiated by the subsequent node management have sufficient transaction fees, such as voting for upgrading proposals, and unsecured transactions.

- Command line

```bash
alaya_mtool staking --config $ALAYA_MTOOLDIR/validator/validator_config.json --keystore $ALAYA_MTOOLDIR/keystore/staking.json --amount 10000 --benefit_address xxx196278ns22j23awdfj9f2d4vz0pedld8a2fzwwj --delegated_reward_rate 5000 --node_name myNode --website www.mywebsite.com --details myNodeDescription --external_id 121412312
```

Prompt:**please input keystore password:**Enter the password of the staking wallet and press Enter. If the following information is displayed, the staking is successful:

```bash
operation finished
transaction hash:
0x89b964d27d0caf1d8bf268f721eb123c4af57aed36187bea90b262f4769eeb9b
SUCCESS
```

- Parameters Description

> config：node configuration file
>
> keystore: staking wallet file
>
> amount: staking amount, not less than 10000ATP-staking threshold, no more than 8 decimal places
>
> restrictedamount: not less than 10000ATP-staking threshold, no more than 8 decimal points (staking using locked balance)
>
> autoamount: Not less than 10000ATP-Priority to use the lock-up balance staking, if the lock-up balance is not enough for the staking deposit, then use free amount staking
>
> benefit_address: benefit account to receive block-packing reward and staking reward
>
> delegated_reward_rate：Delegated bonus ratio, type is integer range is \[0,10000\], unit: ten thousand percent, e.g. enter 5000, it means the bonus ratio is 50%
>
> node*name：node name，30 bytes(beginning with a letter, including alphabet, number, space, *, -, #)
>
> website：node website, 30 bytes
>
> details：node description, 280 bytes
>
> external_id：node Icon ID of keybase.io, or identity authentication ID

### Modify validator information operation

- Command line

```bash
alaya_mtool update_validator --config $ALAYA_MTOOLDIR/validator/validator_config.json --keystore $ALAYA_MTOOLDIR/keystore/staking.json --node_name myNode --website www.mywebsite.com --external_id 121412312 --delegated_reward_rate 6000 --benefit_address atp1x0f9xwr9steccekttqvml0d26zgsxwdnt4f55x --details "Modify the verifier information operation"
```

- Parameters Description

> config：node configuration file
>
> keystore: staking wallet file
>
> benefit_address\[option\]: benefit account to receive block-packing reward and staking reward
>
> delegated_reward_rate\[option\]：Delegated bonus ratio, type is integer range is \[0,10000\], unit: ten thousand percent, e.g. enter 5000, it means the bonus ratio is 50%
>
> node*nam\[option\]e：node name，30 bytes(beginning with a letter, including alphabet, number, space, *, -, #)
>
> website\[option\]：node website, 30 bytes
>
> details\[option\]：node description, 280 bytes
>
> external_id\[option\]：node Icon ID of keybase.io, or identity authentication ID

### Decommissioning operation

<font color="red">**It takes 168 settlement cycles to withdraw from the pledge, please be careful!**</font>

- Command line

```bash
alaya_mtool unstaking --keystore $ALAYA_MTOOLDIR/keystore/staking.json --config $ALAYA_MTOOLDIR/validator/validator_config.json
```

- Parameter Description

> None

### Increase staking operation

- Command line

```bash
alaya_mtool increasestaking --amount 5000000 --keystore $ALAYA_MTOOLDIR/keystore/staking.json --config $ALAYA_MTOOLDIR/validator/validator_config.json
```

- Parameters Description

> amount: Use the account balance to increase the staking amount (ATP), the minimum added value is not less than 10, and the decimal point does not exceed 8 digits
>
> restrictedamount: use the account balance to increase the amount of staking, not less than 10 staking threshold, the decimal point does not exceed 8

### Submit Text Proposal

- Command line

```bash
alaya_mtool submit_textproposal --pid_id 100 --keystore $ALAYA_MTOOLDIR/keystore/staking.json --config $ALAYA_MTOOLDIR/validator/validator_config.json
```

- Parameter Description

> pid_id: GitHub ID

### Submit upgrade proposal operation

- Command line

```bash
alaya_mtool submit_versionproposal --newversion 0.16.0 --end_voting_rounds 345 --pid_id 100 --keystore $ALAYA_MTOOLDIR/keystore/staking.json --config $ALAYA_MTOOLDIR/validator/validator_config.json
```

- Parameters Description

> newversion: target upgrade version, x.x.x, number punctuation
>
> end_voting_rounds: the number of voting consensus rounds, the number of voting consensus rounds N, must satisfy 0 < N <= 4838 (about 2 weeks)
>
> pid_id: GitHub ID

### Submit Cancel Proposal

- Command line

```bash
alaya_mtool submit_cancelproposal --proposalid 0x444c3df404bc1ce4d869166623514b370046cd37cdfa6e932971bc2f98afd1a6 --end_voting_rounds 12 --pid_id 100 --keystore $ALAYA_MTOOLDIR/keystore/staking.json --config $ALAYA_MTOOLDIR/validator/validator_config.json
```

- Parameters Description

> proposalid: the ID of the proposal that needs to be cancelled
>
> end_voting_rounds: the number of voting consensus rounds, the number of voting consensus rounds N, must satisfy 0 < N <= 4838 (about 2 weeks)
>
> pid_id: GitHub ID

### Text proposal voting operation

- Command line

```bash
alaya_mtool vote_textproposal --proposalid 0x444c3df404bc1ce4d869166623514b370046cd37cdfa6e932971bc2f98afd1a6 --opinion yes --keystore $ALAYA_MTOOLDIR/keystore/staking.json --config $ALAYA_MTOOLDIR/validator/validator_config.json
```

- Parameters Description

> proposalid: text proposal ID, that is, the hash of the proposal transaction, 66 characters, alphanumeric
>
> opinion: voting options, yes, no, abstain-choose one

### Upgrade proposal voting operation

- Command line

```bash
alaya_mtool vote_versionproposal --proposalid 0x444c3df404bc1ce4d869166623514b370046cd37cdfa6e932971bc2f98afd1a6 --keystore $ALAYA_MTOOLDIR/keystore/staking.json --config $ALAYA_MTOOLDIR/validator/validator_config.json
```

- Parameter Description

> proposalid: upgrade proposal ID, that is, the hash of the proposed transaction, 66 characters, alphanumeric

### Cancel proposal voting

- Command line

```bash
alaya_mtool vote_cancelproposal --proposalid 0x444c3df404bc1ce4d869166623514b370046cd37cdfa6e932971bc2f98afd1a6 --opinion yes --keystore $ALAYA_MTOOLDIR/keystore/staking.json --config $ALAYA_MTOOLDIR/validator/validator_config.json
```

- Parameters Description

> proposalid: Cancel the proposal ID, that is, the hash of the proposed transaction, 66 characters, composed of alphanumeric characters
>
> opinion: voting options, yes, no, abstain-choose one

### Submit parameter proposal operation

- Command line

```bash
alaya_mtool submit_paramproposal --pid_id 200 --module $ module --paramname $ paramname --paramvalue $ paramvalue --keystore $ALAYA_MTOOLDIR/keystore/staking.json --config $ALAYA_MTOOLDIR/validator/validator_config.json
```

- Parameters Description

> module: governance module parameters
>
> paramname: the name of the governance module parameter, pay attention to the case of the letters
>
> paramvalue: Governance module parameter value
>
> pid_id: GitHub ID

### Parameter proposal voting operation

- Command line

```bash
alaya_mtool vote_paramproposal --proposalid 0x444c3df404bc1ce4d869166623514b370046cd37cdfa6e932971bc2f98afd1a6 --opinion yes --keystore $ALAYA_MTOOLDIR/keystore/staking.json --config $ALAYA_MTOOLDIR/validator/validator_config.json
```

- Parameters Description

> proposalid: Cancel the proposal ID, that is, the hash of the proposed transaction, 66 characters, composed of alphanumeric characters
>
> opinion: voting options, yes, no, abstain-choose one

### Version declaration operation

- Command line

```bash
alaya_mtool declare_version --keystore $ALAYA_MTOOLDIR/keystore/staking.json --config $ALAYA_MTOOLDIR/validator/validator_config.json
```

- Parameter Description

> None

### View help

- Command line

```bash
alaya_mtool -h
```

- Parameter Description

> None
