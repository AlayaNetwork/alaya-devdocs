---
id: Wallet_Guide
title: Wallet Guide
sidebar_label: Wallet Guide
---



In this article, we will introduce the usage of different wallets. 

## What's a Wallet?

A wallet is a device or application that stores a set of keys, which can be used to send, receive, and track digital currency. Wallets can take many forms: software wallets, hardware wallets, and paper wallets. Hardware wallets guarantees security, and software wallets, such as APP wallets, provide a simpler and more user-friendly way to create and manage wallets.

The public address and private key can be generated through the wallet: 

- **A public address** is also called the receiving address of the wallet or **address** for short. **Alaya's address is a string of 42 characters starting with `atp`.** A wallet address can be shared and made public. The receiving address is required for sending a certain number of tokens to a wallet. Based on the implementation of the blockchain, the address can also be used to view relevant information about the wallet, such as the balance.
- **A private Key** is necessary to digitally sign any transaction, to transfer the token or to change account-related data. The private key must **never be made public**. If someone obtains the private key of wallet, he can withdraw all the tokens in it. If the private key is lost, all tokens sent to the wallet address will be **permanently lost**.

**To receive ATP on the Alaya chain, you need to select a wallet and then create an Alaya wallet address. **



## Wallets that Support Alaya

We encourage developers and contributors from all over the world to build wallets based on the Alaya ecosystem.

Alaya currently supports multiple types of software wallets, including web wallets, mobile wallets, and command line wallets to meet the basic needs of developers and ordinary users.

For most users, we recommend using mobile wallets or explorer-based web wallets that are familiar to users and therefore save the trouble of learning. 

The command line wallet may be more suitable for nodes and developers for it meets the demand for intensive development and integration.



### Mobile Wallet

The mobile wallet is the ideal choice for everyday transactions and payments due to its portability, good experience, and the ability to send and receive tokens through QR codes.

#### ATON

ATON is a mobile wallet for iOS and Android that supports both PlatON and Alaya networks. It can be used to send and receive ATP, and at the same time provides convenient ATP delegation services to obtain delegation rewards. 



**ATON security**

All wallet keys created by ATON are stored locally on the user’s mobile phone, and the server will not store any information about the wallet key. Therefore, the security of the token in ATON depends on the device where the application is installed.

For the security of your mobile device, it is recommended that you activate the touch ID/face ID to lock the app and properly back up your private key or mnemonic phrase in case the mobile device is lost or damaged. If necessary, you can also use the hot and cold wallet mode to manage your wallet.

For more tutorials on ATON functions and usage, please refer to [ATON Wallet User Guide](/alaya-devdocs/en/ATON_user_manual).



*We embrace more community wallet applications that can fully support the Alaya and PlatON networks.* 



### Web Wallet

With a web wallet, you can easily access distributed applications (DApp) without downloading or installing another software.

#### Samurai

Samurai is an open-source explorer plug-in wallet that supports the PlatON and Alaya networks. It can be used to send and receive ATP and connect DApps of the PlatON and Alaya ecosystems.

For more tutorials on functions and usage of Samurai, please refer to [Samurai Wallet User Guide](/alaya-devdocs/en/Samurai_user_manual).



### Command Line

Alaya allows users to create wallets with several command line tools.

If you are not familiar with the use of command-line programs and just need to send and receive ATP, it is recommended that you use a **mobile wallet**.



#### MTool

MTool is a command-line tool for node-oriented management. It can be used for ATP sending and staking, as well as governance and other related operations. It also supports online and offline signatures.

For more tutorials on MTool functions and usage, please refer to [MTool User Guide](/alaya-devdocs/en/Online_MTool).



#### **Alaya CLI**

Alaya CLI is a command-line tool that directly interacts with Alaya node programs. It provides the most direct, flexible and secure access to Alaya accounts, and can be used to send and receive ATP and to check the address balance.

For more tutorials on Alaya CLI functions and usage, please refer to [CLI User Guide](/alaya-devdocs/en/Command_Line_Tools). 



*Help us improve this document*

