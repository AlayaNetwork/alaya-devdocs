---
id: JS-Tutorials
title: JS SDK快速入门教程
sidebar_label: JS SDK快速入门教程
---

本教程从alaya js sdk的安装开始，分别讲述了连接Alaya网络并执行基本查询、转账及签名操作及智能合约交互的相关内容。本教程力求翔实的展现了Alaya Js Sdk的使用方法，让开发者能够快速入门Alaya Js Sdk。

## 在nodejs中安装Alaya js sdk

- 安装nodejs，建议使用nodejs的LTS版本。
- 安装`lerna`。安装前可以使用`lerna --version`来验证之前是否已经安装过，如果没有安装请使用`npm i lerna -g`进行全局安装。
- 初始化`nodejs`项目。新建一个项目文件夹，并进入此文件夹，如`mkdir alaya-js-sdk-examples & cd alaya-js-sdk-examples`，然后使用命令`npm init -y`进行项目初始化。此操作会在`alaya-js-sdk-examples`下面新建一个文件`package.json`。
- 安装Alaya的js sdk。仍旧是在之前的文件夹下，使用命令`npm i AlayaNetwork/client-sdk-js#0.15.1-develop`进行js sdk的安装。
- 创建`basic.js`文件。后续可以在此文件中进行开发，在本教程中会在此文件中编写进行基本的RPC查询的代码。

在此部分，我们在basic.js中添加两行代码：

```js
var Web3a = require('web3');
console.log(Web3a.version);
```

> 注：本教程为了便于区分，将原文档中的Web3重命名为Web3a，web3重命名为web3a。这样便于与多数教程中ethereum的Web3与web3进行区分。

- 运行`basic.js`代码。在命令行中使用命令`node basic.js`运行此代码，如果返回类似于以下版本号，说明你已经完成了Alaya js sdk的安装。

```powershell
0.15.1
```

> 注：后面代码在没有特殊说明的前提下，都是在nodejs及网页上可以运行的。



## 连接Alaya区块链并执行基本查询

Alaya的网络分为主网、开发网络和私有网络。为了降低开发成本建议使用开发网络或私有网络进行开发、测试，测试完成后可在主网进行部署。更多的关于网络的说明请参照：[加入 Alaya 网络 · Alaya](/alaya-devdocs/zh-CN/Run_a_fullnode)，开发网的相关信息请参照：[加入 Alaya 网络 · Alaya](/alaya-devdocs/zh-CN/Join_the_dev_network)

为了降低本教程的使用门槛，所以本教程使用开发网络为例进行说明。

### 连接开发网络

```js
var Web3a = require('web3');
var web3a = new Web3('http://47.241.91.2:6789');
console.log(web3a.currentProvider)
```

当然，我们也可以使用`web3.setProvider`及`web3.platon.setProvider`来设置当然网络。

### 查询网络基础信息

后续的开发中会有很多异步的调用的例子，在js语法中最常见的有三种：

- callback，请参照[JavaScript 异步编程与回调 (nodejs.cn)](http://nodejs.cn/learn/javascript-asynchronous-programming-and-callbacks)
- Promises，请参照[了解 JavaScript Promise (nodejs.cn)](http://nodejs.cn/learn/understanding-javascript-promises)
- async/await，请参照[具有 Async 和 Await 的现代异步 JavaScript (nodejs.cn)](http://nodejs.cn/learn/modern-asynchronous-javascript-with-async-and-await)

本文为了简化代码，都是使用的async/await的写法。下面的代码为`basic.js`的全部内容，里面的注释说明了每一段代码的用处。

```js
async function main() {
    var Web3a = require('web3');
    var web3a = new Web3a('http://47.241.91.2:6789');
    // 节点的协议版本，返回结果为16进制字符串
    var version = await web3a.platon.getProtocolVersion();
    console.log("Alaya节点的协议版本:" + web3a.utils.hexToNumber(version));
    // Alaya节点是否正在同步，返回true/false
    var syncing = await web3a.platon.isSyncing();
    console.log("Alaya节点是否正在同步：" + syncing);
    // 当前gas价格，该价格由最近的若干块 的gas价格中值决定。单位为VON
    var gasPrice = await web3a.platon.getGasPrice();
    console.log("Gas Price: " + gasPrice);
    // 返回当前块编号
    var blockNumber = await web3a.platon.getBlockNumber();
    console.log("Block Number: " + blockNumber);
    // 获取指定块中特定账户地址的余额，单位VON
    var address = "atp1td535z2n3c7rjmsxuxdafd9gu8waz5lfx2a3c9";
    var balance = await web3a.platon.getBalance(address);
    console.log("Address Balance: " + balance);
    // 返回指定块编号或块哈希对应的块
    var blockHash = "0x577e9777f0ee1cf1b4d2d45a959ee57a59ebd0927740df4cd483c99eb5c58e83";
    blockNumber = 10418171;
    var blockByHash = await web3a.platon.getBlock(blockHash);
    console.log("Get Block by Hash: " + JSON.stringify(blockByHash));
    var blockByNumber = await web3a.platon.getBlock(blockNumber);
    console.log("Get Block by Number: " + JSON.stringify(blockByNumber));
    // 返回指定块中的交易数量，和上一个函数一样，参数都可以为blockHash或blockNumber
    var transCount = await web3a.platon.getBlockTransactionCount(blockHash);
    console.log("Transaction Number in Block: " + transCount);
    // 返回具有指定哈希值的交易对象
    var transHash = "0xa4414b82479af4dbdf4bab822f46f2414c200152553758678e506195b0fa9cfb";
    var trans = await web3a.platon.getTransaction(transHash);
    console.log("Transaction: " + JSON.stringify(trans));
    // 指定地址发出的交易数量。此函数非常有用，可以用于确定交易的nonce
    var accountTransCount =  await web3a.platon.getTransactionCount(address);
    console.log("Account Transaction Count: " + accountTransCount);
}
main();
```

> 上面的代码只举例了部分比较常用的查询函数，大家可以发现查询函数的使用方法非常单一，以上例子足够说明。

## 转账交易

连接到Alaya网络并获取到Alaya网络的相关信息您已经成功了一半，但实际上如果要进行相关开发的话，账号相关的操作是非常必要的。毕竟如果没有账号，那么只能是Alaya旁观者，如果真要成为Alaya的参与者，账号是必不可少的。下面我们就从创建账号开始说明账号的使用及相关信息的获取。

### 账号

在开始之前，先大致介绍一下账号（Account）的概念：

<img src="/alaya-devdocs/img/zh-CN/JS-SDK_Getting_Started_Guide.assets/account.png" style={{zoom: '25%'}} />



Alaya使用了与以太坊相类似的账号体系，具体可以参照：[Alaya总体方案 · Alaya](/alaya-devdocs/zh-CN/Architecture#账户模型)

**账户：**就像你的一个保险箱。在Alaya中会存储每个账户的状态。

**私钥：**私钥可以完全控制账户，所以私钥要妥善保存。私钥有两种表现形式：助记词（Mnemonic）和主密钥（Master Key）。助记词是12个单词，主要作用是帮助你记住密钥。请注意，如果你的助记词泄露，那么你的密钥就已经泄露。主密钥是一个64位16进制数。这个密钥一般在程序中使用，人为使用或记忆比较难。

**公钥：**可以看成你的账号地址或者银行卡号之类的。公钥进行一次hash操作之后生成地址。别人可以用地址（或者公钥）给你转账，当然也可以查看你的操作流水。

### 转账操作

无论是转账，还是后面其他的操作，一次交易的一般流程如下：

<img src="/alaya-devdocs/img/zh-CN/JS-SDK_Getting_Started_Guide.assets/transaction.png"  style={{zoom: '25%'}} />

转账操作和下一节所述的签名操作是账户最常用的操作。但实际上在转账操作中也涉及了对数据的签名，但关于签名的更多细节不会在此节中展开。

> 注：**!!!!将主网的私钥写到代码上并分享给别人是非常危险的操作!!!!**

下面我们看一下转账的具体代码：

```js
var Web3a = require("web3");
var AlayaAccounts = require("web3/packages/web3-eth-accounts");
async function main() {

    let web3a = new Web3a('http://47.241.91.2:6789');

    // !!!!将主网的私钥写到代码上并分享给别人是非常危险的操作!!!!
    // address for the privatekey below: atp1sznvsju6gjy3kmgnfgm526jf6e8x83twuctefh
    var privateKey="0x5ae02064df442340f861136acbfc4bd62b3d48393903bd6aac77ce0e7aaa9e5e";
    
    var chainId = 201030; //201018 for mainnet
    // // privatekey for the address below: 0x0727b77a246f2c01c1b7b068c26bd71b81700f7ea003dd1ba68a38885a69a1a5
    var toAddress = "atp1jqtmpjme9gvg6wnuyphzqzgphslfmjtxcy8mt2";
    var act = new AlayaAccounts(web3a.currentProvider, "atp");
    act = act.privateKeyToAccount(privateKey);
    
    let from = act.address;
    let nonce = web3a.utils.numberToHex(await web3a.platon.getTransactionCount(from));
    let gasPrice = await web3a.platon.getGasPrice();
    let tx = {
        from: from,
        to: toAddress,
        value: "1000000000000000000",
        chainId: chainId,
        gasPrice: gasPrice, 
        gas: "21000", 
        nonce: nonce,
    };
    // 签名交易
    let signTx = await act.signTransaction(tx);
    // 发送交易
    let receipt = await web3a.platon.sendSignedTransaction(signTx.rawTransaction);
    console.log("The receipt of the transaction is: " + JSON.stringify(receipt));
    console.log("sign tx data:\n", signTx.rawTransaction)
}
main();
```

> 请注意账号act的生成过程，由于Alaya网络的hrp为atp，所以设置过程需要两步：
>
> 1. 指定hrp；
> 2. 设置PrivateKey。
>
> 分别对应上述代码中的第14、15行。

这里有必要对如何创建并填充交易信息来进行一点说明。在JavaScript中，交易可以直接用字典类型，其中有很多字段需要从Alaya网络中查询，如`nonce`，`gasPrice`可以从网络中查找到推荐值，也可以自行设置。

后面的签名也是一个异步操作，但其所有签名操作都是在本地执行的，是**离线签名**。

签名后就是发送交易，交易发送成功会返回交易的收据。收据中包含了大量交易信息，具体可以参照：[JS SDK · Alaya](/alaya-devdocs/zh-CN/JS_SDK/#web3platongettransactionreceipt)

### 签名操作

之前文章中也有说过，签名操作是Alaya应用中最常用的操作之一，所有的交易在被打包到区块链之前都要经过签名。签名的本质是向区块链表明你的身份，你愿意为你签名的交易保证正确性、付出gas等。所以Web3也设计了多种进行签名的方法，下面就两种最常用的签名方法向给大家讲解一下。

#### 解锁（Unlocked）账号签名

大家在文档可以发现`web3a.platon.signTransaction`方法的文档中表示：

> 对交易进行签名，账户必须先解锁。

如何进行解锁，但只字未提。

这里就说明一下什么是解锁账号，如何生成解锁账号。解锁账号一般在以下两种情况下出现：

1. 使用测试网的一些便捷工具，如以太坊中的Ganache（现在Alaya中好像还没有类似的工具），生成私有测试节点时会同时生成若干个测试账户。这些账户就是解锁的账户，此时可以使用此`web3a.platon.signTransaction`进行签名。
2. 一些钱包，如某些硬件钱包、PlatON的Samurai钱包，以太坊的MetaMask等，也可以生成解锁钱包。

其实第2种情况在实际开发比较常见，但关于此部分的内容会放到[Samurai钱包](/alaya-devdocs/zh-CN/Samurai_user_manual)的教程中讲，这里就略过。

#### 使用PrivateKey或KeyStore签名

上面的代码中其实就是使用的PrivateKey进行了签名，使用的方法是`web3a.platon.accounts.signTransaction`方法，这个方法直接接收transaction和privateKey两个参数，返回一个signedTransaction。这种方便其实算一个便捷工具，快速的生成了一个签名的交易。为了使代码逻辑更清楚，我们推荐使用私钥（PrivateKey）或者KeyStore生成一个账号（Account）然后用账号进行签名。如下图所示：

<img src="/alaya-devdocs/img/zh-CN/JS-SDK_Getting_Started_Guide.assets/sign.png" style={{zoom: '25%'}} />

这一段代码和上面一段代码功能上完全一样，只是在交易签名处进行了些许改动：

```js
var Web3a = require("web3");
var AlayaAccounts = require("web3/packages/web3-eth-accounts");
async function main() {

    let web3a = new Web3a('http://47.241.91.2:6789');

    // !!!!将主网的私钥写到代码上并分享给别人是非常危险的操作!!!!
    // address for the privatekey below: atp1sznvsju6gjy3kmgnfgm526jf6e8x83twuctefh
    var privateKey="0x5ae02064df442340f861136acbfc4bd62b3d48393903bd6aac77ce0e7aaa9e5e";
    
    var chainId = 201030; //201018 for mainnet
    // // privatekey for the address below: 0x0727b77a246f2c01c1b7b068c26bd71b81700f7ea003dd1ba68a38885a69a1a5
    var toAddress = "atp1jqtmpjme9gvg6wnuyphzqzgphslfmjtxcy8mt2";
    var act = new AlayaAccounts(web3a.currentProvider, "atp");
    
    let from = act.address;
    let nonce = web3a.utils.numberToHex(await web3a.platon.getTransactionCount(from));
    let gasPrice = await web3a.platon.getGasPrice();
    let tx = {
        from: from,
        to: toAddress,
        value: "1000000000000000000",
        chainId: chainId,
        gasPrice: gasPrice, 
        gas: "21000", 
        nonce: nonce,
    };
    
    //PrivateKey与Account之间转换
    act = act.privateKeyToAccount(privateKey);
    //keystroe与privateKey之间的转换，当然你也可以从文件中读取keystore
    let keystore = web3a.platon.accounts.encrypt(privateKey, "platon12345678");
    //由keystore来恢复Account
    act = act.decrypt(keystore, "platon12345678"); 
    // 签名交易
    let signTx = await act.signTransaction(tx);
    // 发送交易
    let receipt = await web3a.platon.sendSignedTransaction(signTx.rawTransaction);
    console.log("The receipt of the transaction is: " + JSON.stringify(receipt));
    console.log("sign tx data:\n", signTx.rawTransaction)
}
main();
```

这份代码从逻辑上更易懂一些：首先我们用PrivateKey生成一个账号，然后用这个账号对交易进行签名。当然，上面代码其实对act生成了两次，这里只是为了演示PrivateKey和Keystore之间的转换及如何使用PrivateKey和Keystore生成账号。

## 智能合约

在明白了如何进行签名之后，我们就可以再深一步的了解如何使用智能合约了。

> 注：这里并不讨论如何编写智能合约，只讨论如何使用js sdk进行智能合约的相关操作。
>
> 本教程以solidity合约为例。

在使用alaya sdk与智能合约产生交互之前，我们先明确一点，那就是alaya sdk能做什么？

- alaya sdk可以编译智能合约吗？**不能**，现阶段，alaya的智能合约可以通过使用[alaya-truffle](/alaya-devdocs/zh-CN/Alaya-Truffle)，[PlatONStudio](/alaya-devdocs/zh-CN/IDE)来进行编译，具体请参照：[EVM智能合约 · Alaya](/alaya-devdocs/zh-CN/Solidity_Getting_started#编译helloworld合约)
- alaya sdk可以部署智能合约吗？**可以！**后面我们就细讲一下如何用alaya sdk部署智能合约。
- alaya sdk可以与智能合约交互吗？**当然可以！**这个是alaya sdk的主要功能之一。

### 智能合约部署

> 在智能合约部署之前，需要对智能合约进行编译，具体的编译方式可以参照[EVM智能合约 · Alaya](/alaya-devdocs/zh-CN/Solidity_Getting_started#编译helloworld合约)。同时经过测试，使用https://remix.ethereum.org/进行编译，在alaya网络上也能正常运行。编译后会获得abi和bytecode，这些内容在后面的代码中会用到。由于本教程覆盖范围问题，所以不对编译过程作更详细的介绍，本教程中使用[EVM智能合约 · Alaya](/alaya-devdocs/zh-CN/Solidity_Getting_started#创建helloworld合约)此创建的HelloWorld合约，编译后的两个变量分别如下：
>
> ```js
> let bytecode = "0x608060405234801561001057600080fd5b5061036b806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806317d7de7c1461003b578063c47f0027146100b8575b600080fd5b61004361015e565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561007d578181015183820152602001610065565b50505050905090810190601f1680156100aa5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610043600480360360208110156100ce57600080fd5b8101906020810181356401000000008111156100e957600080fd5b8201836020820111156100fb57600080fd5b8035906020019184600183028401116401000000008311171561011d57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295506101f5945050505050565b60008054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156101ea5780601f106101bf576101008083540402835291602001916101ea565b820191906000526020600020905b8154815290600101906020018083116101cd57829003601f168201915b505050505090505b90565b805160609061020b90600090602085019061029e565b506000805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156102925780601f1061026757610100808354040283529160200191610292565b820191906000526020600020905b81548152906001019060200180831161027557829003601f168201915b50505050509050919050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106102df57805160ff191683800117855561030c565b8280016001018555821561030c579182015b8281111561030c5782518255916020019190600101906102f1565b5061031892915061031c565b5090565b6101f291905b80821115610318576000815560010161032256fea265627a7a72315820087868e5d428c0270af7145556516942e16a5db5ec467f7dcdca4cfa9ec099bc64736f6c63430005110032";
> let abi = [
>     {
>         "constant": false,
>         "inputs": [
>             {
>                 "internalType": "string",
>                 "name": "_name",
>                 "type": "string"
>             }
>         ],
>         "name": "setName",
>         "outputs": [
>             {
>                 "internalType": "string",
>                 "name": "",
>                 "type": "string"
>             }
>         ],
>         "payable": false,
>         "stateMutability": "nonpayable",
>         "type": "function"
>     },
>     {
>         "constant": true,
>         "inputs": [],
>         "name": "getName",
>         "outputs": [
>             {
>                 "internalType": "string",
>                 "name": "",
>                 "type": "string"
>             }
>         ],
>         "payable": false,
>         "stateMutability": "view",
>         "type": "function"
>     }
> ];
> ```
>
> 为了缩减代码长度，后续代码中可能会对直接使用这两个变量而不再另外对其进行赋值。

智能合约部署操作其实非常简单，和之前的转账操作非常类似，也遵循**生成交易->签名->发送交易**的顺序。下面我们就直接看一下代码吧！

```js
var Web3a = require("web3");
var AlayaAccounts = require("web3/packages/web3-eth-accounts");
async function main() {
    let web3a = new Web3a('http://47.241.91.2:6789');
    let bytecode = "";

    // !!!!将主网的私钥写到代码上并分享给别人是非常危险的操作!!!!
    // address for the privatekey below: atp1sznvsju6gjy3kmgnfgm526jf6e8x83twuctefh
    var privateKey="0x5ae02064df442340f861136acbfc4bd62b3d48393903bd6aac77ce0e7aaa9e5e";    
    var chainId = 201030; //201018 for mainnet
    var act = new AlayaAccounts(web3a.currentProvider, "atp");
    act = act.privateKeyToAccount(privateKey);
    
    let from = act.address;
    let nonce = web3a.utils.numberToHex(await web3a.platon.getTransactionCount(from));
    let gasPrice = await web3a.platon.getGasPrice();
    let tx = {
        from: from,
        chainId: chainId,
        gasPrice: gasPrice, 
        nonce: nonce,
        data: bytecode
    };
    // 评估此交易所需要的交易费用
    let gas = await web3a.platon.estimateGas(tx);
    tx.gas = gas;
    // 签名交易
    let signTx = await act.signTransaction(tx);
    // 发送交易
    let receipt = await web3a.platon.sendSignedTransaction(signTx.rawTransaction);
    console.log("The receipt of the transaction is: " + JSON.stringify(receipt));    
}
main();
```

**注意：上述代码不可直接运行，代码中使用了bytecode变量但未对其进行赋值，需要对bytecode变量进行赋值后使用。**

是不是对这个交易非常熟悉，和之前转账交易最大两点不同是：

- 没有了to和value两个值
- 增加了data值，data中存储bytecode

### 与智能合约交互

与智能合约的交互是一种经常会遇到的操作，但实际上网络上能将其说明白的，特别是在使用公共节点时将其说明白的教程并不多。我们在看其他教程会产生一种疑问，那就是我不需要privateKey就可以与智能合约进行交互吗？

这个问题的答案其实是不确定的，由于我们与智能合约的交互通常有两种方式，一是**call**，二是**send**。

#### call

有时，我们只需要从区块链上查询一些数据，并不会改变区块链的状态，这时我们就可以使用call的方式来与区块链交互。由于我们没有对区块链进行改变，所以不需要付gas，也不需要私钥签名，所以使用起来非常方便。

```js
var Web3a = require("web3");
async function main() {
    let web3a = new Web3a('http://47.241.91.2:6789');
    // 我已经部署好的智能合约的地址
    let contractAddress = "atp1pcvx85klajfw9mvy3tf07acmqxaek5nanuy5t6";
    console.log("contract address: " + contractAddress);
    let abi = [];
    // 构建一个合约对象
    let contract = new web3a.platon.Contract(abi, contractAddress);
    let name = await contract.methods.getName().call();
    console.log("name before change: " + name);    
}
main();
```

**注意：上述代码不可直接运行，代码中使用了abi变量但未对其进行赋值，需要对abi变量进行赋值后使用。**

大家可以看到，call的形式非常简单，甚至都不需要私钥，就能直接从区块链上查询信息。如果你使用我的合约地址，你会从区块链上查询到name为rileyge，如果你使用自己新部署的合约，那么name为空。

#### send

注意，send只是一种叫法，实际上后面你会看到，在下面的代码中我们并没有用到send函数。什么时候要采用send的方式与区块链进行交互呢？简单的说就是当操作需要改变区块链的状态时，就需要采用send的方式来与区块链进行交互。此时必须对交易进行签名并付gas。

如果你在其他地方看到类似的教程，你会发现他们使用的都是解锁的账号。根据我们前面所说，解锁账号一般只在私有节点或者有相关钱包时使用，而一般的nodejs程序是不会使用钱包的（当然也可以使用），那么如何使用没有解锁的账号与智能合约以send的方式交互呢？

还是之前的套路：**生成交易->签名->发送交易**。交易如何生成是此交易重点。

```js
var Web3a = require("web3");
var AlayaAccounts = require("web3/packages/web3-eth-accounts");
async function main() {
    let web3a = new Web3a('http://47.241.91.2:6789');

    // !!!!将主网的私钥写到代码上并分享给别人是非常危险的操作!!!!
    // address for the privatekey below: atp1sznvsju6gjy3kmgnfgm526jf6e8x83twuctefh
    var privateKey="0x5ae02064df442340f861136acbfc4bd62b3d48393903bd6aac77ce0e7aaa9e5e";    
    var chainId = 201030; //201018 for mainnet  
    var act = new AlayaAccounts(web3a.currentProvider, "atp");
    act = act.privateKeyToAccount(privateKey);
    let from = act.address;
    let gasPrice = await web3a.platon.getGasPrice();
    // 之前已经部署好的智能合约
    let contractAddress = "atp1pcvx85klajfw9mvy3tf07acmqxaek5nanuy5t6";
    let abi = [];
    let contract = new web3a.platon.Contract(abi, contractAddress);
    let name = await contract.methods.getName().call();
    console.log("name before change: " + name);
    let trans = contract.methods.setName("rileyge");
    let options ={
        to      : trans._parent._address, //也可以使用contractAddress
        data    : trans.encodeABI(), //abi的构造方法可以参照
        gas     : await trans.estimateGas({from: from}),
        gasPrice: gasPrice,
        chainId	: chainId
    }
    signTx = await act.signTransaction(options);
    // 发送交易    
    receipt = await web3a.platon.sendSignedTransaction(signTx.rawTransaction);
    name = await contract.methods.getName().call();
    console.log("name after change: " + name);
}
main();
```

**注意：上述代码不可直接运行，代码中使用了abi变量但未对其进行赋值，需要对abi变量进行赋值后使用。**

如果使用已经部署好的智能合约，需要将setName函数中的变量修改后再看效果。上面一段代码有好几处需要注意的点，都集中在options这个变量中。

- trans变量是我们通过Contract这个类构造的关于setName这个方法的交易。这个交易的具体用处下面几点有说明。
- to设置为智能合约的地址，这个十分好理解。
- data里面其实是将函数名及变量进行了abi编码，是个比较复杂的过程，具体编码方式[函数ABI编码规则 (github.com)](https://gist.github.com/RileyGe/d4baaf64a6872fce7d7f8d3ce2b04ac0)。不过好在alaya sdk已经帮我们处理好了这些，只要调用encodeABI()函数就行。
- 最后一个问题应该属于alaya sdk的一个bug，我已经在[alaya sdk的chainId和前缀冲突 · Issue #61 · PlatONnetwork/client-sdk-js (github.com)](https://github.com/AlayaNetwork/client-sdk-js/issues/2)中详细说明了问题，并提供了一种暂时的解决方案。

**交易构建小结**：

- 交易构建时常用的量有：from，to，value，gas，gasPrice，data，chainId等。其实在很多地方一些变量都是有默认值 的，如gas和gasPrice。所以如果你看到哪些交易构建时没有设置这个变量，也不要奇怪。
- 这些变量中chainId是一个比较有趣的变量。此变量一定要设置，而且千万不能设置错误。这个变量的出现其实是了避免在不同的链上进行重放攻击的。
- data变量的构建是构建交易的重点，一些复杂的交易都是将数据以某种编码形式放到了data中。

alaya sdk与智能合约的交互是不是也很简单？其他更多的内容就自己再去探索吧！

## 总结

本教程到此暂时就结束了，关于alaya js sdk还有在浏览器中使用、与内置合约交互两大块内容。但由于现在alaya js sdk可能会进行版本更新，更新后对上述两种操作的影响会比较大，所以暂时搁置上述两项内容教程的编写。待升级完成后再进行编写。



*本教程贡献者 @[RileyGe](https://github.com/RileyGe)*