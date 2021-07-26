---
id: Alaya_Account
title: Alaya Account
sidebar_label: Alaya Account
---



This article will introduce the account and how to create an account in two parts. The first part introduces the basic concepts of accounts, where you can learn some basic concepts of related accounts, as well as some security suggestions. If you are familiar with or not interested in this part, just skip it. In the second part, we mainly talk about operations. This tutorial will teach you how to use alyakey, CLI, MTool, Samurai, ATON and other tools to create accounts and trade on the Alaya network.

## Basic Concepts

If you are stranger to the blockchain, the concept of Alaya's account (Account) may sound complex. Alaya accounts are very different from centralized accounts. Whether in a bank or other centralized applications, such as WeChat and Alipay, you must get your information ready and submit it to a centralized organization before you can open an account. But in Alaya, you can generate a public and private key pair by yourself. If you share your account address (Address) with someone else, he or she can interact with your account.

Now  you may have been confused about concepts such as the account, public key, private key and address. Don't worry. We will explain these concepts one by one. Let’s look at the following figure first:

<img src="/alaya-devdocs/img/en/account.assets/account.png" alt="Account" style={{zoom: '25%'}} />



### Account

Before a formal explanation, let's make an analogy. The **ordinary account** in Alaya is very similar to a bank account. Your bank account will record how much money you have in your account, what operations have been performed, and so on. The same is true in Alaya. The Alaya network maintains a state tree, which is indexed by account addresses and stores account balance (balance), transaction counts (nonces), etc.

Alaya also has another type of account called the **contract account**, which is usually called a contract. The information of the contract account and the ordinary account are stored in the same tree. The contract also has a balance (balance), transaction count (nonce), etc., and also codes.

### Address

In the above analogy, the address is the bank card number of your bank account. In the Alaya network, an Alaya address represents an Ethereum account, and the address is the identifier of the account. As mentioned in the above [Account], the state tree in Alaya is indexed by address.

Unlike a bank account, if someone else knows your account address, then he or she can check all your transactions through your address.

You must have noticed that in the Alaya network, all addresses start with atp1 (in the PlatON network, they start with lat1). Why? This is because, in order to improve the readability of the address, the Alaya network encodes the original address (usually expressed in hexadecimal notation, such as the common Ethereum address starting with 0x) to the existing Bech32 address.



>Bech32 first appeared in Bitcoin, and its composition is as follows:
>
>hrp(human-readable part): Readable prefix
>
>Seperator: Separator, always "1".
>
>data part: The data part, including lowercase letters and numbers. But it does not contain the character "1" (used as a separator), "b", "i", or "o" (not very readable and easy to be confused with other characters). In this way, each bit of the data has 32 possible values.
>
>checksum: The check part. It is the last 6 digits of the address, which can be used to check the correctness of the string.
>
>The following figure is a schematic diagram of the components of the address:
>
><img src="/alaya-devdocs/img/en/account.assets/18.png" alt="地址组成部分" style={{zoom: '50%'}} />

How to use the public key to generate an address will be detailed in the following section [Private Key and Public Key].



### Private Key and Public Key

Private key and public key, concepts in asymmetric encryption, are generated with a certain algorithm, and have the following characteristics:

- It is impossible (or very difficult) to deduce the private key from the public key, but it becomes easy the other way around. 
- The data encrypted with the public key can only be decrypted with the private key.
- After the data is signed using the private key, we can use the public key to verify the correctness of the signature.

So what is the relationship between the account and the address in front of the public and private keys?



- The holder of the private key owns the account and can perform all operations supported by the Alaya network on the account.
- The address is obtained through Hash operation from the public key. That is to say, the address can be easily obtained from the public key, but not the other way around.
  



> Security reminder:
>
> 1. Since the holder of the private key can perform all operations supported by Alaya on the account, if your private key is lost, then you will completely lose your account, and no one can do anything about it.
>
> 2. Someone suggested that as long as an account has the sending operation, it should no longer be used because its public key has been exposed and the account therefore becomes less secure. It makes sense from a certain perspective. However, under the protection of the current technology, the security impact caused by public key exposure is negligible. So far, there have been no blockchain security issues due to public key exposure.

Now you must be clear of the relationship between the account, private key (the master key in the figure), public key and address above.

Let's talk about how the public key and private key are generated in detail. The most commonly used asymmetric encryption are: [RSA](https://en.wikipedia.org/wiki/RSA_(cryptosystem)), [Elgamal](https://en.wikipedia.org/wiki/ElGamal_encryption), backpack algorithm, Rabin , DH, [ECC](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) (elliptic curve encryption algorithm), etc. Like Ethereum, Alaya also uses ECC asymmetric encryption algorithm. Based on the elliptic curve theory, the keys can be faster in creation, smaller in size, and more effective in performance. 



> ECC: With the full name Elliptic Curve Crypto, it is the general name of a series of encryption algorithms.
>
> ECDSA: With the full name Elliptic Curve Digital Signature Algorithm, it is a specific implementation of ECC. ECDH (Elliptic Curve Diffie-Hellman) for encryption and ECDSA for digital signature are widely-known among all those ECC algorithms.
>
> secp256k1: Despite being a set of methods, ECDSA does not specify which elliptic curve to use, while secp256k1 specifies the value of each attribute of the encryption algorithm. For details, please refer to: [Secp256k1-Bitcoin Wiki](https:/ /en.bitcoin.it/wiki/Secp256k1). In other words, if you use secp256k1 with a fixed private key, you can generate a fixed public key.

We can use some online tools to verify whether the public and private keys generated by some tools in the following text comply with the rules we mentioned above:

First of all, we have prepared a set of public and private key pairs using aayakey as follows:

```shell
PrivateKey:  d08baac64f52ae1b9c2ea559036650229f07f5d61d869dbb55562a9827fbaeb8
PublicKey :  628f1d4fc711f609c76ea89c7556236fa0df559fa92c074c5c7869eaf8d96adb7b99f5d4da67606f8d27b1b2f377e81396e622cc8559b7643d856a20765caeaa
```

To put it bluntly, the private key is actually a large random number with a length of 64-bit hexadecimal number (32 bytes). Then we use the online tool: [Paul Miller — Elliptic curve calculator (paulmillr.com)](https://paulmillr.com/ecc/), as shown in the following figure:

<img src="/alaya-devdocs/img/en/account.assets/19.png" alt="在线工具生成公钥" style={{zoom: '50%'}} />



Some of you may wonder, that seems totally different from a public key. In fact, x and y are two decimal numbers, and the one given above is hexadecimal. We just need to convert the two digits and they would turn out to be exactly the same.



Now that we have the public key, how do we use it to calculate the address?

1. Use the public key to perform a hash, with the hash algorithm being the Keccak-256 hash value (32bytes):

```shell
391fb49d63d324a64a2e4cfa6d58e500d2453ed27418ce7f1868960fe5d66af8
```

2. Take the last 20 bytes in the result of the previous step, which is the Alaya address:


```shell
6d58e500d2453ed27418ce7f1868960fe5d66af8
```

3. Encode the above address into a Bech32 address:

```shell
atp1d4vw2qxjg5ldyaqceel3s6ykpljav6hc2ey3yc
```



> Note:
>
> Online tools are used in step 2: [Keccak-256 Online (emn178.github.io)](https://emn178.github.io/online-tools/keccak_256.html)
>
> <img src="/alaya-devdocs/img/en/account.assets/20.png" alt="注意事项" style={{zoom: '50%'}} />
>
> In step 3, Alaya's js sdk is utilized, and the code used is:
>
> ```js
>var Web3p = require("web3");
> var adr = Web3p.utils.toBech32Address('atp', '6d58e500d2453ed27418ce7f1868960fe5d66af8');
>console.log(adr);
> ```

In this way, we can create an account. Now let's introduce the last concept—the mnemonic phrase.



### Mnemonic Phrase

The term mnemonic phrase is self-explanatory. As we mentioned before, the private key is very important. But it is too long (so that it won't be cracked easily), and has no order or no meaning at all (so that it won't be cracked easily). To remember the private key better, you will have some commonly used words to represent the private key, making the memorization easier.

In other words, the mnemonic phrase and the private key can be converted into each other, and the former makes it easier to remember the private key. The conversion of private keys and mnemonic phrases is generally a function provided by peripheral tools, rather than the function of the blockchain itself.

If you are an ordinary user, the above is all that you should know and you can skip directly to the next chapter. But if you are a wallet developer, some of the following may be useful to you.



**How are mnemonic phrases generated and what are the specifications?**

To explain the mnemonic phrase, we need to talk about Bitcoin first. After the emergence of Bitcoin, the public has had a lot of discussions on how to save the private key of Bitcoin. There are three discussions that are most relevant to the wallet and mnemonic phrases we use now: BIP32, BIP39, and BIP44.

>The full name of BIP is Bitcoin Improvement Proposals, which is a document that proposes new features or improvements to Bitcoin. It can be proposed by anyone and will be published on bitcoin/bips after review.



Among them, BIP32, BIP39, and BIP44 jointly define the currently widely used HD Wallet, including its design motives and concepts, implementation methods, examples, etc.

[BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki): It defines the Hierarchical Deterministic wallet ("HD Wallet" for short), which is a system that can generate a tree structure from a single seed to store multiple sets of keypairs (private key and public key). One difference between Bitcoin and current Alaya is that if the Bitcoins in the transaction account are not used up in a transaction, a new public and private key pair needs to be generated to create new Unspent Transaction Outputs (UTXOs). So in general, a series of accounts need to be created. HD Wallet comes as a perfect solution to this problem. It only requires one seed to create a large number of accounts, and it can also be easily backed up, transferred to other compatible devices (because only seed is required), and put under hierarchical access control. The figure below shows the structure of an HD Wallet.



<img src="/alaya-devdocs/img/en/account.assets/21.png" alt="HD Wallet" style={{zoom: '50%'}} />



> In Alaya transactions, generating a new account for each transaction is safer, because the public key leakage will also cause a certain security risk, as evidenced by many encryption algorithm cracks in the past. But if you publish the hash (address) of the public key only, the possibility of being cracked is reduced.

With BIP32, people found it still difficult to remember the seed, so BIP39 was proposed.

[BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki): It expresses **seed** with a single word that is easy to remember and write. Generally composed of **12 single characters**, it is called **mnemonic code (phrase)**. E.g.:

`hamster all enroll craft achieve analyst success carry choice artefact exit tonight`

With BIP39, do you think the wallet is completely defined? For Bitcoin, yes, but later BIP44 enables a seed to support multiple currencies and multiple accounts.

[BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki): A system based on BIP32, giving special meaning to each layer in the tree structure. It allows the same seed to support **multiple currencies, multiple accounts**, etc. The layers are defined as follows:

`m / purpose' / coin_type' / account' / change / address_index`

The `purporse'` is fixed to `44'`, which means BIP44 is used. And `coin_type'` is used to indicate different currencies. For example, Bitcoin is `0'`, Ethereum is `60'`, Alaya is `206'`, and Platon is `486'`. In an Alaya HD Wallet, the path of the first keypair of the first account (the account here refers to the `account'` defined in BIP44) will be `m/44'/206'/0' /0/0`.

Let's try it out:

```js
var bip39 = require('bip39')
var Wallet = require('ethereumjs-wallet')
var Web3p = require('web3')
var secp = require("noble-secp256k1")
var keccak256 = require('keccak256')
async function main(){
    // Generate mnemonic code
    var mnemonic = bip39.generateMnemonic()
    // To make the effect more consistent, we use a mneonic that has been generated before,
    // For more detailed information on this mneonic, please refer to the "Using MTool to Generate An Account" section below 
    // hamster all enroll craft achieve analyst success carry choice artefact exit tonight
    mnemonic = "hamster all enroll craft achieve analyst success carry choice artefact exit tonight";

    // Generate HD wallet
    // First convert the mnemonic code into a binary seed.
    var seed = await bip39.mnemonicToSeed(mnemonic)

    // Use seed to generate HD Wallet. To be more specific, it is to generate the Master Key and record it.
    var hdWallet = Wallet.hdkey.fromMasterSeed(seed)
    

    // Generate the first Alaya Address
    // Generate the first keypair of the first account in the Wallet. It can be derived from the Master Key according to its path m/44'/206'/0'/0/0.
    var key1 = hdWallet.derivePath("m/44'/206'/0'/0/0")

    // Use the public key in keypair to generate address.
    var privateKey = key1._hdkey.privateKey
    var publicKey = Buffer.from(secp.getPublicKey(privateKey))
    publicKey = publicKey.slice(1)

    // publicKey for keccak256 hash
    var hash = keccak256(publicKey)
    // Take the last 20 bytes of hash as the address
    var address = hash.slice(hash.length - 20)
    // Address obtained：685ce4cbdd5c19b64ca008cb85b83947e5318efa
    console.log(address.toString('hex'));

    // Encoding Address
    // Alaya is very considerate. To prevent you from typing the wrong address (sending money to the wrong person), Alaya will re-encode the address.
    // The coding process has been detailed before.
    address1 = Web3p.utils.toBech32Address('atp', address.toString('hex'));
    // The final Address would be like 0x685ce4CbDd5c19b64CA008cB85b83947e5318EFA
    console.log(address1);
}
main();
```



The code snippet is very complicated. In addition to Alaya Js SDK, it also uses bip39 (to convert mnemonic phrases into seed), ethereumjs-wallet (to obtain account privatekey with seed), noble-secp256k1 (to convert privateKey into publicKey), keccak256 (to generate an address after hashing the publicKey). Each step of the operation is explained in detail in the code comments, so there will be no more repetition.

That's all about the basic concepts. Let's start the practical operation below.



## Generating An Account



This section will explain how to use multiple tools to generate accounts, from graphical interfaces to command-line tools. Below is an overview. You can choose the platform you like:

|          | Form                                | Platform Supported                                           |
| -------- | ----------------------------------- | ------------------------------------------------------------ |
| ATON     | Graphical interface                 | Android and iPhone                                           |
| alayakey | Command-line tool                   | Ubuntu                                                       |
| MTool    | Command-line tool                   | Windows、Ubuntu                                              |
| Samurai  | Graphical interface/Explorer wallet | 所有支持Chrome浏览器的平台 All platforms that support the Chrome explorer |

### ATON

ATON is a mobile wallet that supports PlatON and Alaya networks. Compared with other third-party wallets, in addition to the functions of ordinary wallets, it also has the function of calling Alaya's built-in contracts, which can be used for delegation and redemption. You can download [ATON Wallet](https://platon.network/wallet) from the following address.

<img src="/alaya-devdocs/img/en/account.assets/1.png" alt="初始界面" style={{zoom: '80%'}} />



For the sake of safety in this tutorial, we select "PlatON Development Network" for account-related operations. Click "PlatON Development Network" to switch the network, as shown in the following figure:

<img src="/alaya-devdocs/img/en/account.assets/2.png" alt="切换网络" style={{zoom: '80%'}} />



> **Create Wallet**: Create a brand new wallet.
>
> **Import wallet**: You can use mnemonic phrases, wallet files or private keys to import previously created accounts, or use other wallets to create accounts.

Click Create Wallet to enter the following interface:

<img src="/alaya-devdocs/img/en/account.assets/3.jpg" alt="创建钱包" style={{zoom: '80%'}} />

Choose ordinary or HD for the wallet type. Under normal circumstances, you can choose ordinary. If you choose HD, you will create 30 wallets with the same password at one time, which is unnecessary for ordinary users. **Wallet name** can be anything you want. In this example, it's "G's Wallet". **Password** is recommended to be complicated so it won't be easily cracked. Then click "Create Wallet". Now the wallet is successfully created. Go to the "Wallet Created Successfully" page. At this time, you can back up your wallet (or skip it directly, and back up later).

<img src="/alaya-devdocs/img/en/account.assets/4.jpg" alt="钱包创建成功" style={{zoom: '80%'}}  />

Click to start backup, and 12 English words will be displayed. Please write down these 12 words on paper and keep them properly. You need to note that **these 12 words play the basically same role as the private key. If they are lost or stolen by others, you will lose the ownership of the current wallet. Be sure to keep the mnemonic phrases properly.** As shown below:

<img src="/alaya-devdocs/img/en/account.assets/5.jpg" alt="备份助记词"style={{zoom: '80%'}}  />



Then verify the mnemonic phrases:

<img src="/alaya-devdocs/img/en/account.assets/6.jpg" alt="验证助记词" style={{zoom: '50%'}}  />

Finally complete the backup.

Now you can use the newly generated account in the ATON wallet. You can share your address with others, transfer money to others, and vote for your favorite nodes.

### alayakey

Alayakey is a command-line tool, which is usually installed with the node or installed separately.

> Note: This tutorial only involves testing on Ubuntu. You need to try it out on Linux/Unix by yourself.
>
> 
>WSL can be used on Windows.

- **Installing alayakey**: Enter the following command in the command line:

```shell
sudo wget https://download.alaya.network/alaya/platon/0.15.0/alayakey -P /usr/bin
sudo chmod +x /usr/bin/alayakey
```

Then you can use `alaya --version` to check the version of alyakey.

- **Generating the wallet file:** You can use the following command to generate a wallet file:

```shell
alayakey generate
```

After that, you will be prompted to enter the password twice, and finally the address of the created wallet will be output. The final output is similar to the following:

```shell
main net Address: atp173gwqattqczz392fea795z7xwltkt2r3rslmcw
other net Address: atx173gwqattqczz392fea795z7xwltkt2r3fkr3ty
```

In the current folder, a keyfile.json will be generated, which is the wallet file. You can use this account by matching the wallet file with the password you just entered.

Of course, with this file, you can also use the wallet file in other wallets (such as the ATON wallet).

- **Generating the public and private key pair**:

```shell
alayakey genkeypair
```

The output is similar to the following:

```shell
PrivateKey:  d08baac64f52ae1b9c2ea559036650229f07f5d61d869dbb55562a9827fbaeb8
PublicKey :  628f1d4fc711f609c76ea89c7556236fa0df559fa92c074c5c7869eaf8d96adb7b99f5d4da67606f8d27b1b2f377e81396e622cc8559b7643d856a20765caeaa
```

The concepts of public and private keys have been mentioned before. Note that you can share only the public key with others. If you find it inconvenient to share public keys, you can use other tools introduced in this chapter to generate account addresses.

### MTool

The installation of MTool on Windows and Ubuntu is very simple. You can refer to: [Online MTool Tutorial · Alaya](/alaya-devdocs/en/Online_MTool).

After installation, you can use `mtool-client --version` to check the version of MTool. Among the versatile functions  of MTool, only the operations related to **account generation** are introduced in this sector.

```shell
mtool-client account new staking
```

After you enter the password twice as prompted, the output is similar to the following:

```shell
-name: staking
-type: NORMAL
-address:
 mainnet: atp172w2kpvpj6fjszudgg2py87tajzayqusp23j97
 testnet: atx172w2kpvpj6fjszudgg2py87tajzayqustvdck5
-public key: 0x489085ef457df5c561343442c6a6594e060fa1de88f1e9969f3354cbddf4875662706d4e54b50fbd20636ec04c99ab440d8e18403780dd7d30f472634c36799a


**Important** write this Private Key in a safe place.
It is the important way to recover your account if you ever forget your password.
1196cf2b491f5522565918c5432b9f864f88dd04b92045317da9ffc28ff4020b
**Important** write this mnemonic phrase in a safe place.
It is the important way to recover your account if you ever forget your password.
hamster all enroll craft achieve analyst success carry choice artefact exit tonight
```

Note: All the information is posted in this tutorial for readers' sake. But in fact it is very dangerous to do so, especially the private key and the mnemonic phrase in the last two parts, both of which are very important and cannot be lost or leaked.

The above code generates not only the above information but also a wallet file, which is stored in the `MTool installation directory\mtool\current\keystore`. This wallet file has the same function as the wallet file generated by ATON and alyakey.

In addition to generating wallets, MTool can also use private keys to **restore wallets**, as follows:

```shell
mtool-client account recover -k staking
```

After being prompted to enter the password twice, you will be asked to enter the private key, and the output will be similar to the following:

```shell
-name: stakin
-type: NORMAL
-address:
 mainnet: atp172w2kpvpj6fjszudgg2py87tajzayqusp23j97
 testnet: atx172w2kpvpj6fjszudgg2py87tajzayqustvdck5
-public key: 0x489085ef457df5c561343442c6a6594e060fa1de88f1e9969f3354cbddf4875662706d4e54b50fbd20636ec04c99ab440d8e18403780dd7d30f472634c36799a
```

At the same time, a wallet file will be generated in the `MTool installation directory\mtool\current\keystore` directory.

MTool is also versatile, but it is not detailed in this tutorial. For more details, please refer to: [Online MTool Tutorial · Alaya](/alaya-devdocs/en/Online_MTool).

### Samurai Wallet

If you have used MetaMask wallet before, you will be familiar with Samurai wallet. Samurai is the web wallet of Alaya/PlatON, and can be used in all explorers that support Chrome explorer or use Chromium as the core.

> Note: The Samurai wallet has been updated recently. If you have installed the Samurai wallet before, delete it and reinstall it (remember to back up the wallet private key).

**Installing Samurai Wallet**: This article uses Google Chrome as an example to explain how to install Samurai. Since Samurai does not exist in any app store, it needs to be installed manually. First go to [Samurai Chrome 8.1.0](https://github.com/AlayaNetwork/Samurai/releases/download/v8.1.0/samurai-chrome-8.1.0.zip) to download the latest version of the Samurai wallet, and unzip the installation package. Then open Google Chrome, select Settings -> More Tools -> Extensions.

Then open the developer mode -> load the unzipped extension -> select the folder just unzipped, as shown in the figure below:

<img src="/alaya-devdocs/img/en/account.assets/8.png" alt="Samurai安装" style={{zoom: '50%'}}  />

After the installation is complete, Samurai will run automatically. Click Start:

<img src="/alaya-devdocs/img/en/account.assets/9.png" alt="欢迎来到Samurai" style={{zoom: '80%'}}  />

Then you can either import an existing wallet or create a new wallet. Here we create a new wallet:

<img src="/alaya-devdocs/img/en/account.assets/10.png" alt="导入钱包或新建钱包" style={{zoom: '100%'}}  />

The agreement interface appears. Click I agree:

<img src="/alaya-devdocs/img/en/account.assets/11.png" alt="协议" style={{zoom: '80%'}}  />

Enter wallet password:

<img src="/alaya-devdocs/img/en/account.assets/12.png" alt="输入密码" style={{zoom: '80%'}}  />

After you click "Create", you will be prompted whether to back up the mnemonic phrases. If you click "Remind me later", you can use the wallet directly. Here, we back up the mnemonic phrases: first display the mnemonic phrases, and then keep the mnemonic phrases properly, and then click Next:

<img src="/alaya-devdocs/img/en/account.assets/14.png" alt="助记词" style={{zoom: '80%'}}  />

Then, like in other wallets, you need to restore the mnemonic phrases completely by choosing them one by one:

<img src="/alaya-devdocs/img/en/account.assets/15.png" alt="确认助记词" style={{zoom: '80%'}}  />

Now you have created a wallet:

<img src="/alaya-devdocs/img/en/account.assets/16.png" alt="恭喜" style={{zoom: '80%'}}  />

Since the latest version of Samurai is common to PlatON and Alaya, we need to switch the network to the Alaya network:

<img src="/alaya-devdocs/img/en/account.assets/17.png" alt="选择网络" style={{zoom: '80%'}}  />

In this way, we have created an account with Samurai Wallet.

## Summary

This tutorial covers everything from the concept of accounts to the guide for creating accounts with various wallet tools. Creating an account is just the first step for you to participate in the Alaya network. In the future, you may trade on the Alaya network, use the SDK or RPC interface to interact with the Alaya network, deploy smart contracts, etc. Enjoy yourself in Alaya!

