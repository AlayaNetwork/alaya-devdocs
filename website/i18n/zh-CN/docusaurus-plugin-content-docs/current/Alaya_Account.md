---
id: Alaya_Account
title: Alaya账户
sidebar_label: Alaya账户
---



本篇会介绍账户的相关知识及账户生成的相关操作。本教程分为两大部分，第一部分为账户的基本概念，在这里你能学到一些相关账户的基本概念，以及一些安全方面的建议。如果你对此部分内容比较熟悉或不感兴趣，可以直接跳过第一部分。在第二部分中主要讲操作，本教程会带领大家使用alayakey、CLI、MTool、Samurai、ATON等工具生成账户，参与Alaya网络交易。

## 基本概念

如果你是第一次接触区块链，那么Alaya的账户（Account）的概念对你来说可能难以理解。Alaya的账户与中心化的账户有很大不同。无论你在银行还是其他中心化的应用中，如微信，支付宝等，你都要准备好资料并向中心化的组织来提交你的资料，你才能开户一个账户。但在Alaya中，你可以自行生成一个公私钥对，如果将你的账户地址（Address）分享给大家，大家就可以与你的账户发生交互了。

这里已经出现了账户、公钥、私钥及地址等概念，不要着急，下面我们就慢慢的一一解释这些概念。我们先看下面一张图片：

<img src="/alaya-devdocs/img/zh-CN/account.assets/account.png" alt="Account" style={{zoom: '25%'}} />

### 账户（Accounts）

在进行正式解释之前，我们先做一下类比。Alaya中的**普通账户**和银行账户有很大的相似之外。你的银行账户里面会记录你账户上有多少钱，进行过什么操作等。Alaya中也一样，Alaya网络会维护一棵状态树，该树以账户地址为索引，存储账户的余额（balance）、交易计数（nonce）等。

Alaya还有另外一种账户是**合约账户**，通常我们也直接称之为合约。合约账户和普通账户的信息都存储于同一棵树中，合约也有余额（balance）、交易计数（nonce）等，同时他还具有代码等。

### 地址（Address）

如果类比一下，地址就是你银行账户的银行卡号。在Alaya网络中，一个Alaya地址就代表着一个以太坊账户，地址是账户的标识。如上述【账户】中所说，Alaya中的状态树是以地址为索引的。

与银行账户不同的是，如果别人知道了你的账户地址，那么任何人都可以通过你的地址查询到你的所有交易。

不知大家发现没有，在Alaya网络中，所有地址都是以atp1开头的（在PlatON网络中以lat1开头），这是为什么呢？这是由于为了提高地址的可读性，Alaya网络将原地址（一般使用16进制表示，如常见的0x开头的以太坊地址）经过Bech32编码，形成了现有地址。

>Bech32最早出现在 Bitcoin 中，其组成如下：
>
>hrp(human-readable part)：可读前缀
>seperator：分隔符，永远是“1”。
>data part：数据部分，包含小写字母和数字。但数据部分不可包含字符“1”（被用作了分隔符），“b”、“i”、“o”（可读性不强，容易与其他字符混淆）。这样数据部分每一位都有32位可能取值。
>checksum：校验部分。校验部分为地址的最后 6 位，可用于校验该字符串的正确性。
>
>下图为地址组成部分示意图：
>
><img src="/alaya-devdocs/img/zh-CN/account.assets/18.png" alt="地址组成部分" style={{zoom: '50%'}} />

再进一步的关于如何使用公钥生成地址，将下下文【私钥和公钥】进行解释。

### 私钥（Private Key）和公钥（Public Key）

私钥和公钥是非对称加密中的概念。在非对称加密中，我们通过某种算法来生成一个公私钥对，这个公私钥对有以下特征：

- 知道公钥不可能（或者是非常难）推算出私钥，但知道私钥很容易推算出私钥。
- 用公钥进行加密后的数据只有使用私钥才能对其解密。
- 用私钥对数据进行签名后用公钥可以验证签名的正确性。

那么公私钥前面的账户和地址有什么关系呢？先说结论：

- 私钥的持有者对账户有所有权，可以对账户进行任何Alaya网络支持的操作。
- 地址是由公钥经Hash操作得到的。也就是说由公钥可以容易的获得地址，但有地址却无法推算出公钥。

> 安全提醒：
>
> 1. 由于私钥的持有者可以对账户进行任何Alaya支持的操作，所以如果你的私钥丢失，那么你将完全的失去你的账户，任何人对此都无能为力。
> 2. 有人建议一个账户只要进行过发送操作，就不能再使用了，因为其安全性降低了。账户进行过发送操作，其公钥就会暴露。从某种角度来讲，其安全性确实降低了。但在现有的技术水平下，公钥暴露完全造成的安全影响非常微小。到目前为止，所有区块链项目都没有因为公钥暴露而产生安全问题。

现在大家基本能看懂上面的关于账户、私钥（图中主密钥）、公钥及地址之间的关系了吧？

下面我们再具体说一下公钥和私钥是如何生成的。最常用的非对称加密有：[RSA](https://en.wikipedia.org/wiki/RSA_(cryptosystem))、[Elgamal](https://en.wikipedia.org/wiki/ElGamal_encryption)、背包算法、Rabin、D-H、[ECC](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography)（椭圆曲线加密算法）等。和以太坊一样，Alaya也使用了ECC非对称加密算法。以椭圆曲线理论为基础，在创建密钥时可做到更快、更小，并且更有效。

> ECC：全称Elliptic Curve Crypto，直译为椭圆曲线加密算法，是一系列加密算法的总称。
>
> ECDSA：全称Elliptic Curve Digital Signature Algorithm，直译为椭圆曲线数字签名算法，是ECC的一种具体实现。ECC算法中比较有名的有用于加密的ECDH（Elliptic Curve Diffie-Hellman）和用于数字签名的 ECDSA。
>
> secp256k1：即使ECDSA也是一套方法，对于使用何种椭圆曲线并没有具体规定，而secp256k1则是具体规定了加密算法的各个属性的值，具体可以参照：[Secp256k1 - Bitcoin Wiki](https://en.bitcoin.it/wiki/Secp256k1)。也就是说，如果使用secp256k1一个固定有私钥就可以生成一个固定的公钥。

为了验证，我们可以使用一些在线工具来验证一下后文我们使用一些工具生成的公私钥是否符合我们上面所说的规则：

首先，我们准备了下文中使用alayakey生成一组公私钥对：

```shell
PrivateKey:  d08baac64f52ae1b9c2ea559036650229f07f5d61d869dbb55562a9827fbaeb8
PublicKey :  628f1d4fc711f609c76ea89c7556236fa0df559fa92c074c5c7869eaf8d96adb7b99f5d4da67606f8d27b1b2f377e81396e622cc8559b7643d856a20765caeaa
```

私钥说白了其实是一个很大的随机数，其长度为64位的16进制数（32字节）。然后我们使用在线工具：[Paul Miller — Elliptic curve calculator (paulmillr.com)](https://paulmillr.com/ecc/)，如下图所示：

<img src="/alaya-devdocs/img/zh-CN/account.assets/19.png" alt="在线工具生成公钥" style={{zoom: '50%'}}  />

有人可能会疑问，感觉公钥完全对不上啊。其实x和y是两个10进制的数，而上面给定的是16进制的。我们只要将两个数进制转化一下就完全相同了。

现在我们已经有了公钥，如何用公钥来计算地址呢？

1. 用公钥来进行一次hash，hash算法为 Keccak-256 哈希值（32bytes）：

```shell
391fb49d63d324a64a2e4cfa6d58e500d2453ed27418ce7f1868960fe5d66af8
```

2. 取上一步结果取后20bytes即Alaya地址：


```shell
6d58e500d2453ed27418ce7f1868960fe5d66af8
```

3. 对上面的地址进行Bech32编码：

```shell
atp1d4vw2qxjg5ldyaqceel3s6ykpljav6hc2ey3yc
```

> 注：
>
> 步骤2中使用了在线工具：[Keccak-256 Online (emn178.github.io)](https://emn178.github.io/online-tools/keccak_256.html)
>
> <img src="/alaya-devdocs/img/zh-CN/account.assets/20.png" alt="注意事项" style={{zoom: '50%'}}  />
>
> 步骤3使用的是Alaya的js sdk，使用的代码为：
>
> ```js
> var Web3p = require("web3");
> var adr = Web3p.utils.toBech32Address('atp', '6d58e500d2453ed27418ce7f1868960fe5d66af8');
> console.log(adr);
> ```

地址是如何生成的就介绍完毕了，下面介绍一下最后一个概念-助记词。

### 助记词

助记词从名字就能看出来是干嘛的。之前说过私钥非常非常重要，但私钥又非常非常长（否则容易被破解），私钥也完全没有任何顺序，没有任何意义（否则容易被人破解）。所以为了帮助大家更好的记忆私钥，大家会有一些常用的单词，来代表私钥，这样私钥就容易记录一些了。

也就是说助记词是可以和私钥相互转化，但同时又比较好记的一种私钥保存形式。私钥与助记词的转化一般是周边工具提供的功能，而不是区块链本身的功能。

如果你是一名普通用户，那么看到这里就可以了，你可以直接跳到下一章节，因为你需要了解的助记词的内容只有这些就足够了。但如果你是一名钱包的开发者，那么下面的一些内容可能对你有用。

#### 助记词是如何产生的，有什么规范？

要说明助记词就绕不开比特币。在比特币出现之后，大家对于如何保存比特币的私钥产生了非常多的讨论，这里与我们现在使用的钱包、使用的助记词最相关的有三个讨论：BIP32, BIP39, BIP44

>BIP的全名是 Bitcoin Improvement Proposals，是提出 Bitcoin 的新功能或改进措施的文件。可由任何人提出，经过审核后公布在 bitcoin/bips 上。

而其中的 BIP32, BIP39, BIP44 共同定义了目前被广泛使用的 HD Wallet，包含其设计动机和理念、实作方式、实例等。

[BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)：定义 Hierarchical Deterministic wallet (简称 "HD Wallet")，是一个系统可以从单一个 seed 产生一树状结构储存多组 keypairs（私钥和公钥）。比特币和现在的Alaya有一点不同的是，每一次交易如果交易账户的钱比特币没有全部用完，需要产生新的公私钥对来进行“打零”操作，所以一般情况下需要生成一系列的账户。而HD Wallet很好的解决了这个问题，只需要一个Seed就可以产生大量账户，而且HD Wallet还可以方便的备份、转移到其他相容装置（因为都只需要 seed），以及分层的权限控制等。下图为HD Wallet的结构。

<img src="/alaya-devdocs/img/zh-CN/account.assets/21.png" alt="HD Wallet" style={{zoom: '50%'}}  />

> 在Alaya交易中，每次交易都产生新的账户也是一种更安全的操作，因为公钥泄露也会产生一定的安全风险。这是由于从历史上来看，一种加密算法被破解并不罕见。但如果你只公布了公钥的hash（地址），那么被破解的可能性又小了一大截。

BIP32之后，大家发现seed还不好记，这时提出了BIP39。

[BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)：将 **seed** 用方便记忆和书写的单字表示。一般由 **12 个单字**组成，称为 **mnemonic code(phrase)**，中文称为助记词或助记码。例如：

`hamster all enroll craft achieve analyst success carry choice artefact exit tonight`

有了BIP39之后，大家是不是觉得钱包的定义已经非常完整了，对于Bitcoin来说是的，但后来BIP44给大家提供了一种支持多币种，多账户的方法。

[BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)：基于 BIP32 的系统，赋予树状结构中的各层特殊的意义。让同一个 seed 可以支援**多币种、多帐户**等。各层定义如下：

`m / purpose' / coin_type' / account' / change / address_index`

其中的 `purporse'` 固定是 `44'`，代表使用 BIP44。而 `coin_type'` 用来表示不同币种，例如 Bitcoin 就是 `0'`，Ethereum 是 `60'`，而Alaya为`206'`，Platon为`486'`。举例来说，在一个 Alaya HD Wallet 中，第一个帐户（这里的帐户指 BIP44 中定义的 `account'`）的第一组 keypair，其路径会是 `m/44'/206'/0'/0/0`。

下面我们来实践一下上面的内容：

```js
var bip39 = require('bip39')
var Wallet = require('ethereumjs-wallet')
var Web3p = require('web3')
var secp = require("noble-secp256k1")
var keccak256 = require('keccak256')
async function main(){
    // 产生 mnemonic code
    var mnemonic = bip39.generateMnemonic()
    // 为了使效果更一致，我们这里使用一个之前已经生成好的mneonic，
    // 此mneonic更详细信息可以参照下文使用MTool生成账户部分
    // hamster all enroll craft achieve analyst success carry choice artefact exit tonight
    mnemonic = "hamster all enroll craft achieve analyst success carry choice artefact exit tonight";

    // 产生 HD wallet
    // 先将 mnemonic code 转成 binary 的 seed。
    var seed = await bip39.mnemonicToSeed(mnemonic)

    // 使用 seed 产生 HD Wallet。如果要说更明确，就是产生 Master Key 并记录起来。
    var hdWallet = Wallet.hdkey.fromMasterSeed(seed)
    

    // 产生第一个 Alaya Address
    // 产生 Wallet 中第一个帐户的第一组 keypair。可以从Master Key，根据其路径 m/44'/206'/0'/0/0 推导出来。
    var key1 = hdWallet.derivePath("m/44'/206'/0'/0/0")

    // 使用 keypair 中的公钥产生 address。
    var privateKey = key1._hdkey.privateKey
    var publicKey = Buffer.from(secp.getPublicKey(privateKey))
    publicKey = publicKey.slice(1)

    // publicKey进行keccak256 hash
    var hash = keccak256(publicKey)
    // address取hash的后20个字节
    var address = hash.slice(hash.length - 20)
    // 取得的 Address：685ce4cbdd5c19b64ca008cb85b83947e5318efa
    console.log(address.toString('hex'));

    // Encoding Address
    // Alaya 很贴心，为了避免大家打错 address（导致把钱送错人），Alaya 会对地址再进行编码。
    // 编码的详细过程前文已经说过，不再赘述
    address1 = Web3p.utils.toBech32Address('atp', address.toString('hex'));
    // 最后取得的 Address 会像：0x685ce4CbDd5c19b64CA008cB85b83947e5318EFA
    console.log(address1);
}
main();
```

这一段代码非常复杂，用到了Alaya Js SDK外，还用到了bip39（用于将助记词转化为seed）、ethereumjs-wallet（用于使用seed获得账号privatekey）、noble-secp256k1（用于将privateKey生成publicKey）、keccak256（用于将publicKey进行hash后生成地址）。每一步操作都在代码的注释中进行了详细说明，这里不再赘述。

好，基本概念就讲这么多，下面就开始实操。

## 账户生成

本部分会讲解多个工具如何生成账户，从图形界面到命令行工具。第一个讲解基本独立，大家选择自己喜欢的平台就可以：

|          | 形式                | 支持平台                   |
| -------- | ------------------- | -------------------------- |
| ATON     | 图形界面            | Android、iPhone            |
| alayakey | 命令行工具          | Ubuntu                     |
| MTool    | 命令行工具          | Windows、Ubuntu            |
| Samurai  | 图形界面/浏览器钱包 | 所有支持Chrome浏览器的平台 |

### ATON

ATON是支持PlatON和Alaya网络的手机钱包，相比其他第三方钱包来说，除了一般钱包的功能，还有调用Alaya内置合约的功能，可以进行委托及赎回操作。可以从以下地址下载[ATON 钱包](https://platon.network/wallet)。

<img src="/alaya-devdocs/img/zh-CN/account.assets/1.png" alt="初始界面" style={{zoom: '50%'}}  />

本教程为了安全起见，我们选择“PlatON开发网络”进行账户的相关操作，单击“PlatON开发网络”，可以切换网络，如下图所示：

<img src="/alaya-devdocs/img/zh-CN/account.assets/2.png" alt="切换网络" style={{zoom: '50%'}}  />

> **创建钱包**：新建一个全新的钱包。
>
> **导入钱包**：可以使用助记词、钱包文件或者私钥来导入之前创建的，或使用其他钱包创建的账户。

单击创建钱包，进入以下界面：

<img src="/alaya-devdocs/img/zh-CN/account.assets/3.jpg" alt="创建钱包" style={{zoom: '25%'}}  />

钱包类型可以选择普通或HD。一般情况下选择普通即可，选择HD的话会一次性的创建密码相同的30个钱包，普通用户很少用到。**钱包名称**随意起一个即可，本例中使用“嘎子的钱包”，**密码**建议搞得复杂一点，不要被他人破解。然后点击“创建钱包”即可。现在钱包就创建成功了。进入“钱包创建成功”页面。这时你可以选择备份钱包（也可以直接跳过，后续再进行备份）。

<img src="/alaya-devdocs/img/zh-CN/account.assets/4.jpg" alt="钱包创建成功" style={{zoom: '25%'}}  />

点击开始备份，会显示12个英文单词，请将这12个单词最好记录在纸上，妥善保存。你必须注意的是，**这12个单词和私钥的作用基本是一致的，所以如果丢失，或被别人窃取，你就失去了对当前钱包的所有权，所以对助记词的保存必须十分慎重！**如下图所示：

<img src="/alaya-devdocs/img/zh-CN/account.assets/5.jpg" alt="备份助记词" style={{zoom: '25%'}}  />

然后进行助记词的验证：

<img src="/alaya-devdocs/img/zh-CN/account.assets/6.jpg" alt="验证助记词" style={{zoom: '25%'}}  />

最后完成备份即可。

现在你就可以在ATON钱包里面使用新生成的账户了，你可以将你的地址分享给别人，也可以转账给别人，给自己喜欢的节点投票等操作。

### alayakey

alayakey是一个命令行工具，一般是随节点一起安装，也可以单独安装。

> 注：此教程只在Ubuntu平台上进行了测试，至于其他Linux/Unix平台上是否支持请自行探索。
>
> 在Windows平台上可以使用WSL功能。

- **alayakey的安装**：在命令行中输入以下命令：

```shell
sudo wget https://download.alaya.network/alaya/platon/0.16.0/alayakey -P /usr/bin
sudo chmod +x /usr/bin/alayakey
```

之后就可以使用`alaya --version`来查看alayakey的版本。

- **生成钱包文件**：你可以使用以下命令生成钱包文件：

```shell
alayakey generate
```

之后会提示输入两次密码，最后就会输出创建的钱包的地址。最后输出类似于以下的结果：

```shell
main net Address: atp173gwqattqczz392fea795z7xwltkt2r3rslmcw
other net Address: atx173gwqattqczz392fea795z7xwltkt2r3fkr3ty
```

在当前文件夹下，会产生一个keyfile.json，这个文件就是钱包文件。钱包文件配合你刚才输入的密码就能使用这个账户了。

当然，有了这个文件，也可以在其他钱包中使用钱包文件（如ATON钱包中）。

- **生成公私钥对**：

```shell
alayakey genkeypair
```

输出类似以下结果：

```shell
PrivateKey:  d08baac64f52ae1b9c2ea559036650229f07f5d61d869dbb55562a9827fbaeb8
PublicKey :  628f1d4fc711f609c76ea89c7556236fa0df559fa92c074c5c7869eaf8d96adb7b99f5d4da67606f8d27b1b2f377e81396e622cc8559b7643d856a20765caeaa
```

公私钥的概念也在之前的文档中作了说明，注意你只能将公钥分享给别人。如果你觉得公钥分享不便，可以使用本章节介绍的其他工具生成账户地址。

### MTool

MTool在Windows平台和Ubuntu平台上的安装都非常简单，可以参照：[在线MTool教程 · Alaya](/alaya-devdocs/zh-CN/Online_MTool)。

安装之后就可以使用`alaya_mtool --version`来查看MTool的版本。MTool功能非常强大，这里只介绍**账户生成**的相关操作。

```shell
mtool-client account new staking
```

根据提示输入两遍密码后会产生类似以下输出：

```shell
-name: staking
-type: NORMAL
-address:
 address: atp172w2kpvpj6fjszudgg2py87tajzayqusp23j97
-public key: 0x489085ef457df5c561343442c6a6594e060fa1de88f1e9969f3354cbddf4875662706d4e54b50fbd20636ec04c99ab440d8e18403780dd7d30f472634c36799a


**Important** write this Private Key in a safe place.
It is the important way to recover your account if you ever forget your password.
1196cf2b491f5522565918c5432b9f864f88dd04b92045317da9ffc28ff4020b
**Important** write this mnemonic phrase in a safe place.
It is the important way to recover your account if you ever forget your password.
hamster all enroll craft achieve analyst success carry choice artefact exit tonight
```

注意：这里为了编写教程，将所有信息都贴了出来，但实际上这样做是非常危险的，特别是最后两部分，分别是私钥和助记词，非常重要，不可丢失，也不可泄露。

以上代码不仅仅产生了以上信息，还生成了一个钱包文件，存储于`MTool安装目录\mtool\current\keystore`中，此钱包文件与ATON、alayakey生成的钱包文件作用一致。

MTool除了可以生成钱包外，也可以用私钥来**恢复钱包**，操作如下：

```shell
alaya_mtool account recover -k staking
```

在提示输入两遍密码后会让你输入私钥，会产生类似于以下的输出：

```shell
-name: stakin
-type: NORMAL
-address:
 address: atp172w2kpvpj6fjszudgg2py87tajzayqusp23j97
-public key: 0x489085ef457df5c561343442c6a6594e060fa1de88f1e9969f3354cbddf4875662706d4e54b50fbd20636ec04c99ab440d8e18403780dd7d30f472634c36799a
```

同时也会在`MTool安装目录\mtool\current\keystore`目录下产生一个钱包文件。

MTool功能也非常强大，但并不在本教程的讨论范围内，这里就不再详细讲解，更多细节可以参照：[在线MTool教程 · Alaya](/alaya-devdocs/zh-CN/Online_MTool)。

### Samurai钱包

如果之前你接解过MetaMask钱包，那么你一定会发现Samurai钱包非常熟悉。Samurai是Alaya/PlatON的Web钱包，对于所有支持Chrome浏览器或者以Chromium为内核的浏览器都可以使用Samurai钱包。

> 注：Samurai钱包近期有更新，如果你之前安装过Samurai钱包，删除后重新安装（注意备份钱包私钥）。

**Samurai钱包的安装**：本文以Google Chrome为例，说明Samurai的安装方法。由于Samurai并没有存在于哪个应用商店中，所以需要手动安装。首先到[Samurai Chrome 8.1.0](https://github.com/AlayaNetwork/Samurai/releases/download/v8.1.0/samurai-chrome-8.1.0.zip)下载最新版本的Samurai钱包，将下载的安装包解压。然后打开Google Chrome，选择设置->更多工具->扩展程序，如下图所示：

<img src="/alaya-devdocs/img/zh-CN/account.assets/7.png" style={{zoom: '67%'}}  />

然后打开开发者模式->加载解压的扩展程序->选择刚才解压的文件夹，如下图所示：

<img src="/alaya-devdocs/img/zh-CN/account.assets/8.png" alt="Samurai安装" style={{zoom: '50%'}}  />

安装完成后Samurai会自动运行，单击开始使用：

<img src="/alaya-devdocs/img/zh-CN/account.assets/9.png" alt="欢迎来到Samurai"  style={{zoom: '50%'}}  />

之后你就可以选择导入一个现有的钱包或者新建一个新钱包，这里我们新建一个新钱包：

<img src="/alaya-devdocs/img/zh-CN/account.assets/10.png" alt="导入钱包或新建钱包"  style={{zoom: '50%'}}  />

出现协议界面，直接同意即可：

<img src="/alaya-devdocs/img/zh-CN/account.assets/11.png" alt="协议"  style={{zoom: '50%'}}  />

输入钱包密码：

<img src="/alaya-devdocs/img/zh-CN/account.assets/12.png" alt="输入密码"  style={{zoom: '50%'}}  />

单击“建立”后，会提示是否备份助记词，如果你点击“稍后提醒我”就可以直接使用钱包，这里我们备份一下助记词：先显示助记词，然后将助记词妥善保管好，然后单击下一页：

<img src="/alaya-devdocs/img/zh-CN/account.assets/14.png" alt="助记词"  style={{zoom: '50%'}}  />

然后和其他钱包一样，需要通过选择将助记词完整的还原出来：

<img src="/alaya-devdocs/img/zh-CN/account.assets/15.png" alt="确认助记词"  style={{zoom: '50%'}} />

这样你就完成了钱包的创建：

<img src="/alaya-devdocs/img/zh-CN/account.assets/16.png" alt="恭喜"  style={{zoom: '50%'}}  />

由于最新版本的Samurai是PlatON与Alaya通用的，所以我们需要更换一下网络，才能接入Alaya网络：

<img src="/alaya-devdocs/img/zh-CN/account.assets/17.png" alt="选择网络"  style={{zoom: '50%'}}  />

这样我们就完成了使用Samurai钱包创建账户。

## 总结

本教程从账户的概念到用多种钱包工具进行账户创建指引就全部讲述完了。创建账户只是你参与Alaya网络的第一步，后续你可以在Alaya网络上进行交易、使用SDK或RPC接口与Alaya网络交互，部署智能合约等操作，请尽快享受在Alaya的旅行吧！
