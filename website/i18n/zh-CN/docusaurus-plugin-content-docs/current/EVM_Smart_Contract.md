---
id: EVM_Smart_Contract
title: EVM智能合约
sidebar_label: EVM智能合约
---



本开发指南是从开发者角度介绍智能合约的开发流程和开发过程中需要注意的常见问题。引导开发者可以在Alaya网络快速开发出高质量的智能合约。主要从以下几个方面进行讲解：

- [合约开发入门手册](#合约开发入门手册)
- [合约迁移](#合约迁移)
- [众筹合约](#众筹合约)
- [合约开发成本](#合约开发成本)
- [最佳实践](#最佳实践)
- [合约安全开发指南](#合约安全开发指南)
- [FAQ](#faq)

## 合约开发入门手册

### 简介

本教程主要是指导用户在Alaya上使用solidity语言创建简单的HelloWorld智能合约，通过alaya-truffle编译，部署，调用此合约。如果您想使用更加丰富的API可以参考[Java SDK开发指南](/alaya-devdocs/zh-CN/Java_SDK) 或者 [JS SDK开发指南](/alaya-devdocs/zh-CN/JS_SDK)

- solidity智能合约语法请参考[Solidity官方文档](https://solidity.readthedocs.io/en/develop/)
- 在开发合约前，如果需要搭建节点连接到Alaya网络或者创建私有网络请参考：[连接 Alaya 网络](/alaya-devdocs/zh-CN/Join_Alaya_NetWork)

### alaya-truffle开发工具介绍

alaya-truffle是PlatON提供的一款能够在本地编译、部署、调用智能合约的工具，具体的安装及使用手册参见

- alaya-truffle开发工具[安装参考](https://platon-truffle.readthedocs.io/en/alaya/getting-started/installation.html)
- alaya-truffle开发工具[使用手册](https://platon-truffle.readthedocs.io/en/alaya/)


### 创建HelloWorld合约

```solidity
pragma solidity ^0.5.17;

contract HelloWorld {
    
    string name;
    
    function setName(string memory _name) public returns(string memory){
        name = _name;
        return name;
    }
    
    function getName() public view returns(string memory){
        return name;
    }
}
```

合约文件说明

- pragma solidity ^0.5.17
  -	pragma solidity：是solidity版本声明
     0.5.17：代表solidity版本
     	^ ：表示向上兼容,即可以用0.5.17以上版本编译器进行编译
- contract HelloWorld
  -	contract：合约声明的关键字
     HelloWorld：当前合约的名称
- string name
  -	name：合约的状态变量
     string：指明此状态变量的类型
- function setName(string memory _name) public returns(string memory)
  -	function：合约中函数声明关键字
     setName：此函数的名称
     	memory：声明_name参数的存储位置（字符串类型的函数输入参数与输出参数必须声明为memory）
     	_name：为此函数的局部变量
     	public：声明此函数的可见性
     	name = _name：此操作将外部传进来的局部变量赋值给状态变量
- function getName() public view returns(string memory)
  -	view:如果一个函数带有view关键字，此函数将不会改变合约中状态变量的值（主要用于查询）		


### 编译HelloWorld合约 

**step1.** 为HelloWorld项目创建新目录

```
mkdir HelloWorld && cd HelloWorld
```
- 以下命令如果没有特殊说明都在HelloWorld目录下进行

**step2.** 使用alaya-truffle初始化一个工程

```
alaya-truffle init
```
在操作完成之后，就有如下项目结构：

- contracts/: Solidity合约目录

- migrations/: 部署脚本文件目录

- test/: 测试脚本目录

- truffle-config.js: alaya-truffle 配置文件

**step3.** 将之前编写好的HelloWorld合约放至HelloWorld/contracts/目录下
```
ls contracts/
```
- 将看到HelloWorld.sol 

**step4.** 修改alaya-truffle 配置文件truffle-config.js，将编译器版本修改对应的solidity合约中的版本号

```
vim truffle-config.js
```

truffle-config.js 修改部分内容如下：
```
compilers: {
      solc: {
            version: "^0.5.17",    // 此版本号与HelloWorld.sol中声明的版本号保持一致
      }
}
```

**step5.** 编译合约

```
alaya-truffle compile
```
在操作完成之后，生成如下目录结构：

- build/: Solidity合约编译后的目录

- build/contracts/HelloWorld.json  HelloWorld.sol对应的编译文件

### 部署HelloWorld合约

**step1.** 新增合约部署脚本文件

```
cd migrations/ && touch 2_initial_helloworld.js
```
部署脚本文件名建议使用合约名称便于后面维护,如HelloWorld合约对应的部署脚本文件为2_initial_helloworld.js，内容如下所示：
```
const helloWorld = artifacts.require("HelloWorld"); //artifacts.require告诉alaya-truffle需要部署哪个合约，HelloWorld即之前写的合约类名
	module.exports = function(deployer) {
       deployer.deploy(helloWorld); //helloWorld即之前定义的合约抽象（部署带参数的合约失败，请参考FAQ部署带参数合约失败说明）
};
```
**step2.** 修改truffle-config.js中链的配置信息

```
vim truffle-config.js
```
将truffle-config.js中的区块链相关配置修改成您真实连接的链配置
```
networks: {
	development: {
       host: "10.1.1.6",     // 区块链所在服务器主机
       port: 8806,            // 链端口号
       network_id: "*",       // Any network (default: none)
       from: "atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp", //部署合约账号的钱包地址
       gas: 999999,
       gasPrice: 50000000004,
	},
}
```

**step3.**  解锁钱包账户

进入alaya-truffle控制台
```
alaya-truffle console
```

导入私钥（如果之前已导入可以跳过此步骤）
```
web3.platon.personal.importRawKey("您的钱包私钥","您的钱包密码");
```
导入成功将看到私钥对应的地址：
```
'atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp'
```

解锁钱包账户
```
 web3.platon.personal.unlockAccount('您的钱包地址','您的钱包密码',999999);
```
解锁成功将看到如下信息：
```
ture
```

**step4.**  部署合约

```
alaya-truffle migrate
```

部署成功后，将看到类似如下信息：
```
2_initial_helloworld.js
======================

   Deploying 'HelloWorld'
   ----------------------
   > transaction hash:    0x87cd48cc467f9bc943fd096c57c8a7e7b7fa941380538d9e59797800c6c4292c
   > Blocks: 0            Seconds: 0
   > contract address:    atp1c5xxup4au4pqkgkm6a3p6hj3x0vvekdj52z2la
   > block number:        282520
   > block timestamp:     1585535169200
   > account:             atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp
   > balance:             16447231233352977496646259638377769924557918764752765436645.336513079692286014
   > gas used:            145569
   > gas price:           1 gvon
   > value sent:          0 ATP
   > total cost:          0.000145569 ATP


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.000145569 ATP

Summary
=======
> Total deployments:   2
> Final cost:          0.000259892 ATP
```

### 调用HelloWorld合约

**step1.**  进入alaya-truffle控制台

```
alaya-truffle console
```
- 以下调用查询将在truffle控制台中进行

**step2.**  构建合约对象

```json
var abi = [{"constant":false,"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"setName","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getName","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]; //可以从HelloWorld/build/contracts/HelloWorld.json文件中获取到

var contractAddr = 'atp1c5xxup4au4pqkgkm6a3p6hj3x0vvekdj52z2la';//部署合约时的获取的地址
var helloWorld = new web3.platon.Contract(abi,contractAddr); 
```

说明： 
- `abi` 是合约提供给外部调用时的接口，每个合约对应的abi在编译后的文件中，如：`HelloWorld/build/contracts/HelloWorld.json` 中可以找到
- `contractAddr` 在部署合约成功后有一个contract address
- `helloWorld` 就是构建出来与链上合约交互的合约对象抽象

**step3.**  调用合约

```javascript
helloWorld.methods.setName("hello world").send({from: 'atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp'}).on('receipt', function(receipt) {console.log(receipt);}).on('error', console.error);
 
```

调用合约命令说明：
- `helloWorld` 是之前构建的合约对象
- `methods` 固定语法,指量后面紧跟合约的方法名
- `setName` 是我们HelloWorld合约中的一个方法，有一个String类型的入参，此处入参为`hello world`
- `from` 调用者的钱包地址 
- `on` 是监听合约处理结果事件，此处如果成功将打印回执，失败输出错误日志

函数调用成功，将会看到如下信息：

```
{ blockHash:
  '0xe592a4f203ed058df7515205717f167848b1a56b8bb143f9eba512facae22aa1',
  blockNumber: 283911,
  contractAddress: null,
  cumulativeGasUsed: 44820,
  from: 'atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp',
  gasUsed: 44820,
  logsBloom:
'0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: 'atp1c5xxup4au4pqkgkm6a3p6hj3x0vvekdj52z2la',//交易调用的合约地址
  transactionHash:
   '0x2b381a8efab4774ae029fdf2e2585b48c03c033c64d543c9c606c925689fca31',//交易hash
  transactionIndex: 0,
  events: {} }
```

**step4.**  合约查询

```javascript
helloWorld.methods.getName().call(null,function(error,result){console.log("name is:" + result);})  
```
查询合约命令说明：

- `helloWorld` 是之前构建的合约对象
- `methods` 指定将获取合约中的方法
- `getName` 是我们HelloWorld合约中的一个方法，该方法没有入参，故入参为空
- `call` 指明是查询方法
- `function` 是一个回调函数，将处理调用后的结果，此处我们通过console.log打印出执行结果

------------------

## 合约迁移

### 简介 

Alaya支持的solidity是0.4.26、0.5.17、0.6.12、0.7.1 四个版本，如果迁移0.7.1以上版本的合约，需要降低版本号，去除高版本相关语法。

如果您希望将以太坊的智能合约迁移到Alaya上，可以通过alaya-truffle开发工具来进行。首先确保您正确安装了alaya-truffle,只需按照以下步骤操作即可。

以下将演示将以太坊的ERC200513Token合约迁移至Alaya上，ERC200513Token.sol合约文件如下
```
pragma solidity 0.5.17;

contract ERC200513Token {
    string public name; // ERC20标准--代币名称
    string public symbol; // ERC20标准——代币简称
    uint8 public decimals = 18;  // ERC20标准，decimals 可以有的小数点个数，最小的代币单位。18 是建议的默认值
    uint256 public totalSupply = 10000000000000000000 ether; // ERC20标准 总供应量

    // 用mapping保存每个地址对应的余额 ERC20标准
    mapping(address => uint256) public balanceOf;
    // 存储对账号的控制 ERC20标准
    mapping(address => mapping(address => uint256)) public allowance;

    // 事件，用来通知客户端交易发生 ERC20标准
    event Transfer(address indexed from, address indexed to, uint256 value);

    // 事件，用来通知客户端代币被消费 ERC20标准
    event Burn(address indexed from, uint256 value);

    /**
     * 初始化构造
     */
    constructor(uint256 initialSupply, string memory tokenName, string memory tokenSymbol) public {
        totalSupply = initialSupply * 10 ** uint256(decimals);
        // 供应的份额，份额跟最小的代币单位有关，份额 = 币数 * 10 ** decimals。
        balanceOf[msg.sender] = totalSupply;
        // 创建者拥有所有的代币
        name = tokenName;
        // 代币名称
        symbol = tokenSymbol;
        // 代币符号
    }
    /**
     * 返回代币的名称
     */
    function getName() view public returns (string memory){
        return name;
    }

    /**
     * 返回代币的简称
     */
    function getSymbol() view public returns (string memory){
        return symbol;
    }
    /**
      * 返回代币最小分割量
      */
    function getDecimals() public view returns (uint8){
        return decimals;
    }

    function getTotalSupply() public view returns (uint256 theTotalSupply) {
        //函数声明中已经定义了返回变量theTotalSupply
        theTotalSupply = totalSupply;
        return theTotalSupply;
    }

    function getBalanceOf(address _owner) public view returns (uint256 balance) {
        //返回指定地址的通证余额
        return balanceOf[_owner];
    }
    /**
     * 代币交易转移的内部实现
     */
    function _transfer(address _from, address _to, uint _value) internal returns (bool success){
        // 确保目标地址不为0x0，因为0x0地址代表销毁
        require(_to != address(0x0));
        // 检查发送者余额
        require(balanceOf[_from] >= _value);
        // 确保转移为正数个
        require(balanceOf[_to] + _value > balanceOf[_to]);

        // 以下用来检查交易，
        uint previousBalances = balanceOf[_from] + balanceOf[_to];
        // Subtract from the sender
        balanceOf[_from] -= _value;
        // Add the same to the recipient
        balanceOf[_to] += _value;
        emit Transfer(_from, _to, _value);

        // 用assert来检查代码逻辑。
        return (balanceOf[_from] + balanceOf[_to] == previousBalances);
    }

    /**
     *  代币交易转移
     *  从自己（创建交易者）账号发送`_value`个代币到 `_to`账号
     * ERC20标准
     * @param _to 接收者地址
     * @param _value 转移数额
     */
    function transfer(address _to, uint256 _value) public returns (bool success){
        return _transfer(msg.sender, _to, _value);
    }

    /**
     * 账号之间代币交易转移
     * ERC20标准
     * @param _from 发送者地址
     * @param _to 接收者地址
     * @param _value 转移数额
     */
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= allowance[_from][msg.sender]);
        // Check allowance
        allowance[_from][msg.sender] -= _value;
        _transfer(_from, _to, _value);
        return true;
    }

    /**
     * 设置某个地址（合约）可以创建交易者名义花费的代币数。
     *
     * 允许发送者`_spender` 花费不多于 `_value` 个代币
     * ERC20标准
     * @param _spender The address authorized to spend
     * @param _value the max amount they can spend
     */
    function approve(address _spender, uint256 _value) public
    returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        return true;
    }


    /**
     *
     * 获取_spender可以从账户_owner中转出token的剩余数量
     */
    function getAllowance(address _owner, address _spender) public view returns (uint remaining){
        return allowance[_owner][_spender];
    }

    /**
     * 销毁我（创建交易者）账户中指定个代币
     *-非ERC20标准
     */
    function burn(uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        // Check if the sender has enough
        balanceOf[msg.sender] -= _value;
        // Subtract from the sender
        totalSupply -= _value;
        // Updates totalSupply
        emit Burn(msg.sender, _value);
        return true;
    }

    /**
     * 销毁用户账户中指定个代币
     *-非ERC20标准
     * Remove `_value` tokens from the system irreversibly on behalf of `_from`.
     *
     * @param _from the address of the sender
     * @param _value the amount of money to burn
     */
    function burnFrom(address _from, uint256 _value) public returns (bool success) {
        require(balanceOf[_from] >= _value);
        // Check if the targeted balance is enough
        require(_value <= allowance[_from][msg.sender]);
        // Check allowance
        balanceOf[_from] -= _value;
        // Subtract from the targeted balance
        allowance[_from][msg.sender] -= _value;
        // Subtract from the sender's allowance
        totalSupply -= _value;
        // Update totalSupply
        emit Burn(_from, _value);
        return true;
    }
}
```

### 操作步聚

**step1.** 创建一个新的工作目录如example

```
mkdir example && cd example
```
- 以下命令如果没有特殊说明都在example目录下进行

**step2.** 使用alaya-truffle初始化一个工程

```
alaya-truffle init
```

在操作完成之后，就有这样的一个项目结构：

- contracts/: Solidity合约目录

- migrations/: 部署脚本文件目录

- test/: 测试脚本目录

- truffle-config.js: alaya-truffle 配置文件

**step3.** 将以太坊合约文件ERC200513Token.sol放至example/contracts目录下

```
ls contracts/
```

- 将看到 ERC200513Token.sol
- Alaya智能合约中的货币单位为ATP和VON。要将以太坊智能合约迁移至Alaya，请将以太币面额更改为Alaya面额。同时注意以太/ATP市场汇率（此合约我们假设市场汇率1:1，将uint256 public totalSupply = 10000000000000000000 ether; 修改成uint256 public totalSupply = 10000000000000000000 atp; ）
- 编译版本修改Alaya支持的版本。
- 地址修改：把require(_to != address(0x0))修改为require( _to != address("atp1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqdruy9j"))
- Alaya智能合约中block.timestamp表示的是当前区块以毫秒为单位的时间戳，以太坊是以秒为单位。

**step4.** 修改truffle-config.js中的编译版本号及链相关配置

```
module.exports = {
  networks: {
     development: {
      host: "10.1.1.6",     // 链地址
      port: 8806,            // 链使用的rpc端口
      network_id: "*",       // Any network (default: none)
      from: "atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp", //部署合约所使用的钱包地址
      gas: 999999,
      gasPrice: 50000000004,	     
     },
  },

  compilers: {
    solc: {
       version: "^0.5.17",    // 编译合约所使用的solidity版本号，与合约定义版本一致
       docker: false,        // Use "0.5.1" you've installed locally with docker
    }
  }
}
```

**step5.** 编译合约

```
alaya-truffle compile
```
编译成功输出如下信息：
```
Compiling your contracts...
Compiling ./contracts/ERC200513Token.sol
Compiling ./contracts/Migrations.sol
  compilation warnings encountered:

Warning: This is a pre-release compiler version, please do not use it in production.
Artifacts written to /home/guest/example/build/contracts
Compiled successfully using: //表示编译成功
  -solc: 0.5.17+commit.d117da36.Emscripten.clang
```

**step6.** 添加合约部署配置文件

```
cd migrations && touch 2_initial_ERC200513Token.js
```

合约部署配置文件2_initial_ERC200513Token.js内容如下：
```
const ERC200513Token = artifacts.require("ERC200513Token"); //括号中为迁移合约类名
module.exports = function(deployer) {
  deployer.deploy(ERC200513Token,100,'PLA','PLAT'); //ERC200513Token后面三个参数为合约构造函数参数
};  
```

**step7.** 部署合约

```
alaya-truffle migrate
```

输出结果如下，表示迁移成功

```
Compiling your contracts...
Everything is up to date, there is nothing to compile.
2_initial_ERC200513Token.js
===========================

   Deploying 'ERC200513Token'
   --------------------------
   > transaction hash:    0x5667101234fcd3b9dadf96a19bce20d1b94d742e0fd8f3528c641fa587b17eb3
   > Blocks: 0            Seconds: 0
   > contract address:    atp1kekwl4v2q0qc0g9cr6c8adsx0p2n7c90ygp5tv
   > block number:        2153
   > block timestamp:     1585538899787
   > account:             atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp
   > balance:             4499992.02433
   > gas used:            641243
   > gas price:           1 gvon
   > value sent:          0 ATP
   > total cost:          0.000641243 ATP

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.000641243 ATP

Summary
=======
> Total deployments:   2
> Final cost:          0.000755566 ATP
```
---------

## 众筹合约

### 简介

​        在下面的例子中，我们将使用合约进行一次众筹。合约创建者发起众筹，并初始化众筹的代币数量及众筹持续的时间。如果在指定时间内众筹完成则此次众筹成功。并关闭众筹开关，根据一个固定兑换比率得到的一定数量的token会被铸造出来，并且会被计入在买方名下。否则众筹失败，把众筹的金额返还给投资者。

在合约中设置了两个角色

- 众筹者
- 投资者

### 众筹的流程

- 1.创建众筹合约指受益人
- 2.部署合约初始化众筹代币数量及持续时间
- 3.投资者进行投资
- 4.判断众筹是否结束
- 如果众筹时间未到，众筹代币数量已完成，关闭众筹开关。给投资者按比例分配token。众筹成功
- 如果众筹时间已到，众筹代币数量已完成，给投资者按比例分配token。众筹成功
- 如果众筹时间已到，众筹代币数量未完成，返还投资者代币。众筹失败

### 众筹合约

```
pragma solidity ^0.5.17;

contract CrowdFunding {
    address payable public beneficiaryAddress = address(0x0); //受益人地址，设置为合约创建者
    uint256 public fundingGoal = 100 atp;  //众筹目标，单位是ATP
    uint256 public amountRaised = 0; //已筹集金额数量， 单位是VON
    uint256 public deadline; //截止时间
    uint256 public price;  //代币价格
    bool public fundingGoalReached = false;  //达成众筹目标
    bool public crowdsaleClosed = false; //众筹关闭

    mapping(address => uint256) public balance; //保存众筹者对捐赈的金额
    
    mapping(address => uint256) public tokenMap; //保存众筹者所拥有的代币数量

    //记录已接收的ATP通知
    event GoalReached(address _beneficiaryAddress, uint _amountRaised);

    //转帐通知
    event FundTransfer(address _backer, uint _amount, bool _isContribution);
    
    //校验地址是否为空
    modifier validAddress(address _address) {
        require(_address != address("atp1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqdruy9j"));
        _;
    }

    /**
     * 初始化构造函数
     *
     * @param _fundingGoalInlats 众筹ATP币总量
     * @param _durationInMinutes 众筹截止,单位是分钟
     */
    constructor (
        uint _fundingGoalInlats,
        uint _durationInMinutes
    )public {
	    beneficiaryAddress = msg.sender;
        fundingGoal = _fundingGoalInlats * 1 atp;
        deadline = now + _durationInMinutes * 1 minutes;
        price = 500 finney; //1个ATP币可以买 2 个代币
    }


    /**
     * 默认函数
     *
     * 默认函数，可以向合约直接打款
     */
    function () payable external {

        //判断是否关闭众筹
        require(!crowdsaleClosed);
        uint amount = msg.value;

        //捐款人的金额累加
        balance[msg.sender] += amount;

        //捐款总额累加
        amountRaised += amount;

        //转帐操作，转多少代币给捐款人
        tokenMap[msg.sender]  += amount / price;
        
        emit FundTransfer(msg.sender, amount, true);
    }

    /**
     * 判断是否已经过了众筹截止限期
     */
    modifier afterDeadline() { if (now >= deadline) _; }

    /**
     * 检测众筹目标是否已经达到
     */
    function checkGoalReached() public afterDeadline payable{
        if (amountRaised >= fundingGoal){
            //达成众筹目标
            fundingGoalReached = true;
            emit GoalReached(beneficiaryAddress, amountRaised);
        }

        //关闭众筹
        crowdsaleClosed = true;
    }


    /**
     * 收回资金
     *
     * 检查是否达到了目标或时间限制，如果有，并且达到了资金目标，
     * 将全部金额发送给受益人。如果没有达到目标，每个贡献者都可以退回
     * 他们贡献的金额
     */
    function safeWithdrawal() public afterDeadline {

        //如果没有达成众筹目标
        if (!fundingGoalReached) {
            //获取合约调用者已捐款余额
            uint amount = balance[msg.sender];

            if (amount > 0) {
                //返回合约发起者所有余额
                msg.sender.transfer(amount);
                emit FundTransfer(msg.sender, amount, false);
                balance[msg.sender] = 0;
            }
        }

        //如果达成众筹目标，并且合约调用者是受益人
        if (fundingGoalReached && beneficiaryAddress == msg.sender) {

            //将所有捐款从合约中给受益人
            beneficiaryAddress.transfer(amountRaised);
            
            emit FundTransfer(beneficiaryAddress, amountRaised, false);
        }
    }
}
```

**编译众筹合约：**

**step1.** 为众筹合约创建新目录

```
mkdir myCrowdFunding && cd myCrowdFunding
```
- 以下命令如果没有特殊说明都在myCrowdFunding目录下进行

**step2.** 使用alaya-truffle初始化一个工程

```
alaya-truffle init
```

在操作完成之后，就有这样的一个项目结构：

- contracts/: Solidity合约目录
- migrations/: 部署脚本文件目录
- test/: 测试脚本目录
- truffle-config.js: alaya-truffle 配置文件

**step3.** 将编写好的众筹合约放至myCrowdFunding/contracts/目录下

```
ls myCrowdFunding/contracts/
```
- 将看到 CrowdFunding.sol

**step4.** 修改alaya-truffle 配置文件truffle-config.js，将编译器版本修改对应的solidity合约中的版本号

```
vim truffle-config.js
```

truffle-config.js 修改部分内容如下
```
compilers: {
     solc: {
        version: "0.5.17",    // 此版本号与CrowdFunding.sol中声明的版本号保持一致
    }
}
```

**step5.** 编译合约

```
alaya-truffle compile
```

在操作完成之后，就有这样的一个目录结构：

- build/: Solidity合约编译后的目录
- build/contracts/CrowdFunding.json CrowdFunding.sol对应的编译文件

**部署众筹合约：**

**step1.** 添加部署脚本文件

```
cd migrations/ && touch 2_initial_CrowdFunding.js
```

部署脚本文件为:2_initial_crowdFunding.js，内容如下所示：

```
const CrowdFunding = artifacts.require("CrowdFunding"); //需要部署的合约名称 
module.exports = function(deployer) {
      deployer.deploy(CrowdFunding,1000000,100);
};
```

**step2.** 修改truffle-config.js中链的配置信息

```
vim truffle-config.js
```

将truffle-config.js中的区块链相关配置修改成您真实连接的链配置

```
networks: {
	development: {
       host: "10.1.1.6",     // 区块链所在服务器主机
       port: 8806,            // 链端口号
       network_id: "*",       // Any network (default: none)
       from: "atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp", //部署合约账号的钱包地址
       gas: 999999,
       gasPrice: 50000000004,
	},
}
```

**step3.**  部署合约

```
alaya-truffle migrate
```

部署成功将输出如下信息：
```
Compiling your contracts...
 Everything is up to date, there is nothing to compile.
 3_initial_CrowdFunding.js
 
    Deploying 'CrowdFunding'
     transaction hash:    0x3a6419cd4169d7cfb430a1fc5632239ac4a01845827f20df9b3229a334c5488b
     Blocks: 0            Seconds: 0
     contract address:    atp1crcjuu9uwa9aukmf5dr5tq4ym6cv2kre0042ya //部署后的合约地址
     block number:        280532
     block timestamp:     1581751224032
     account:             atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp
     balance:             90000000.806077629992489796
     gas used:            379154
     gas price:           50.000000004 gVON
     value sent:          0 ATP
     total cost:          0.018957700001516616 ATP
 
     Saving migration to chain.
     Saving artifacts
     Total cost:     0.018957700001516616 ATP
```


**众筹者查询众筹情况：**

**step1.**  进入alaya-truffle控制台

```
alaya-truffle console
```
- 以下调用查询将在truffle控制台中进行

**step2.**  构建的众筹合约对象
```
var abi = [...]; //众筹合约的ABI，从编译后的文件获取
var contractAddr = 'atp1crcjuu9uwa9aukmf5dr5tq4ym6cv2kre0042ya'; //众筹合约地址
var crowdFunding = new web3.platon.Contract(abi,contractAddr);  
```

**step3.**  查询已筹集金额
```
crowdFunding.methods.amountRaised().call(null,function(error,result){console.log("result:" + result);}); //查询已筹集金额
```

**step4.**  众筹者判断众筹是否成功
```
crowdFunding.methods.safeWithdrawal().send({from:'atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp'}).on('data', function(event){ console.log(event);}).on('error', console.error); 
```

调用合约命令说明：

- `crowdFunding` 是我们之前构建的合约对象
- `methods` 固定语法，指定将获取合约中的方法
- `safeWithdrawal` 是我们众筹合约中的一个方法，用于收回资金
- `from` 调用者的钱包地址 
- `on` 是监听合约处理结果事件，失败输出错误日志

--------------

## 合约开发成本

### 介绍

在区块链系统中，基于任何一条公链系统开发智能合约都涉及资源支出的开发成本。例如在网络上部署/调用智能合约，进行能量转换，质押/委托等操作都是需要花费一定的成本，不同区块链网络开发成本各不相同，在 `Alaya` 网络上开发智能合约的成本与以太坊及类似协议相近。本手册将以直观的格式进行分析比较，让用户对开发成本有一个比较清晰的认识。

### 概要

本文将用表格的形式对比小型合约、中型合约和大型合约的不同开发成本，同时对 `Alaya` 与以太坊之间进行对比。在合约方面，使用一个简单的`SET/GET`功能的合约作为小型测试合约，中型合约示例将使用一个开源的[微博客](https://github.com/yep/eth-tweet)合约，而大型合约则是一个符合 `ERC20` 标准的智能合约。


#### 资源消耗

**简单set/get合约**

| 系统     | 合约级别 | 合约大小 | 消耗Gas | Gas 单价            | 能量损耗      | 备注              |
| :------- | :------- | :------- | :------ | :------------------ | :------------ | :---------------- |
| Alaya    | 小型合约 | 0.3 kb   | 76953   | 5,000,000,000 `VON` | 384765 `gVON` | 0.000384765 `ATP` |
| Ethereum | 小型合约 | 0.3 kb   | 127173  | 5,000,000,000 `wei` | 635865 `Gwei` | 0.000635865 `ETH` |


**微博客**

| 系统     | 合约级别 | 合约大小 | 消耗Gas | Gas 单价            | 能量损耗       | 备注              |
| :------- | :------- | :------- | :------ | :------------------ | :------------- | :---------------- |
| Alaya    | 中型合约 | 2.08 kb  | 257065  | 5,000,000,000 `VON` | 1285325 `gVON` | 0.001285325 `ATP` |
| Ethereum | 中型合约 | 2.08 kb  | 621385  | 5,000,000,000 `wei` | 3106925 `Gwei` | 0.003106925 `ETH` |

**ERC20标准Token**

| 系统     | 合约级别 | 合约大小 | 消耗Gas | Gas 单价            | 能量损耗        | 备注              |
| :------- | :------- | :------- | :------ | :------------------ | :-------------- | :---------------- |
| Alaya    | 大型合约 | 4.45 kb  | 552823  | 5,000,000,000 `VON` | 2764115  `gVON` | 0.002764115 `ATP` |
| Ethereum | 大型合约 | 4.45 kb  | 1282171 | 5,000,000,000 `wei` | 6410855  `Gwei` | 0.006410855 `ETH` |


### 小型合约示例

#### 简单set/get合约 

**示例代码**

```
pragma solidity ^0.4.12;

contract SimpleTest {
    
	uint public age;
 
	function setAge(uint _input) public {
		age = _input;
	}
 
	function getAge() public constant returns (uint) {
		return age;
	}
}
```

字节码

```
608060405234801561001057600080fd5b50610117806100206000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063262a9dff146058578063967e6e65146080578063d5dcf1271460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e1565b005b60005481565b60008054905090565b80600081905550505600a165627a7a7230582079e51340567895e1097e1c9115e778c3d982b8e71b6997c57f1ba497c56c8b3b0029
```

字节大小：`311 byte => 0.3 kb`

- 创建&部署合约成本

Alaya

* Gas消耗: 76953
* Gas单价: 5,000,000,000 (5 `gVON`)
* 总成本:  384765 `gVON`（0.000384765 `ATP`）

以太坊

* Gas消耗: 127173 
* Gas单价: 5,000,000,000 (5 `Gwei`)
* 总成本:  635865 `Gwei`（0.000635865 `ETH`）

-----------------------------------

### 中型合约示例 

#### 微博客合约

**示例代码**

[点击查看微博客账户合约](https://github.com/PlatONnetwork/alaya-devdocs/blob/master/zh-cn/Development/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/account.sol)


字节码

```
6060604052341561000f57600080fd5b5b600060018190555033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b6107e88061006a6000396000f3006060604052361561008c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630c4f65bd146100915780633e450fff146100e65780635c3e426c146100fb578063ae978f0814610134578063b6db75a0146101d1578063c3ad5ecb146101fe578063ca7dc5b1146102a2578063fb46d4c5146102cb575b600080fd5b341561009c57600080fd5b6100a461033c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100f157600080fd5b6100f9610367565b005b341561010657600080fd5b610132600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506103b2565b005b341561013f57600080fd5b610147610411565b6040518080602001848152602001838152602001828103825285818151815260200191508051906020019080838360005b838110156101945780820151818401525b602081019050610178565b50505050905090810190601f1680156101c15780820380516001836020036101000a031916815260200191505b5094505050505060405180910390f35b34156101dc57600080fd5b6101e46104f7565b604051808215151515815260200191505060405180910390f35b341561020957600080fd5b61021f6004808035906020019091905050610550565b6040518080602001838152602001828103825284818151815260200191508051906020019080838360005b838110156102665780820151818401525b60208101905061024a565b50505050905090810190601f1680156102935780820380516001836020036101000a031916815260200191505b50935050505060405180910390f35b34156102ad57600080fd5b6102b5610628565b6040518082815260200191505060405180910390f35b34156102d657600080fd5b610326600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610633565b6040518082815260200191505060405180910390f35b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b90565b61036f6104f7565b156103af57600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b6103ba6104f7565b1561040d578073ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051600060405180830381858888f19350505050505b5b50565b610419610703565b600080600080600180540381526020019081526020016000206001018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104c95780601f1061049e576101008083540402835291602001916104c9565b820191906000526020600020905b8154815290600101906020018083116104ac57829003601f168201915b505050505092506000806001805403815260200190815260200160002060000154915060015490505b909192565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161490505b90565b610558610703565b60008060008481526020019081526020016000206001018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156106035780601f106105d857610100808354040283529160200191610603565b820191906000526020600020905b8154815290600101906020018083116105e657829003601f168201915b505050505091506000808481526020019081526020016000206000015490505b915091565b600060015490505b90565b600061063d6104f7565b151561066b577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90506106fd565b60a08251111561069d577ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe90506106fc565b4260008060015481526020019081526020016000206000018190555081600080600154815260200190815260200160002060010190805190602001906106e4929190610717565b50600160008154809291906001019190505550600090505b5b5b919050565b602060405190810160405280600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061075857805160ff1916838001178555610786565b82800160010185558215610786579182015b8281111561078557825182559160200191906001019061076a565b5b5090506107939190610797565b5090565b6107b991905b808211156107b557600081600090555060010161079d565b5090565b905600a165627a7a7230582004bd291e77dd5f2bfd4822ec9590d7da613bf3ef8cb6270dc7d553fa687ab1780029
```

字节大小： `2130.5 byte => 2.08 kb`

###### 创建&部署合约成本

Alaya

* Gas消耗: 257065
* Gas单价: 5,000,000,000 (5 `gVON`)
* 总成本:  1285325 `gVON`（0.001285325 `ATP`）

以太坊

* Gas消耗: 621385 
* Gas单价: 5,000,000,000 (5 `Gwei`)
* 总成本:  3106925 `Gwei`（0.003106925 `ETH`）

------------------------

### 大型合约示例 

#### ERC20标准token合约

**示例代码**

[点击查看ERC20标准的智能合约](https://github.com/PlatONnetwork/alaya-devdocs/blob/master/zh-cn/Development/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/token.sol)


字节码

```
6060604052604060405190810160405280600481526020017f56302e3100000000000000000000000000000000000000000000000000000000815250600690805190602001906200005292919062000139565b5034156200005c57fe5b604051620011cd380380620011cd833981016040528080519060200190919080518201919060200180519060200190919080518201919050505b83600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550836000819055508260039080519060200190620000f992919062000139565b5081600460006101000a81548160ff021916908360ff16021790555080600590805190602001906200012d92919062000139565b505b50505050620001e8565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200017c57805160ff1916838001178555620001ad565b82800160010185558215620001ad579182015b82811115620001ac5782518255916020019190600101906200018f565b5b509050620001bc9190620001c0565b5090565b620001e591905b80821115620001e1576000816000905550600101620001c7565b5090565b90565b610fd580620001f86000396000f300606060405236156100ad576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100c3578063095ea7b31461015c57806318160ddd146101b357806323b872dd146101d9578063313ce5671461024f57806354fd4d501461027b57806370a082311461031457806395d89b411461035e578063a9059cbb146103f7578063cae9ca511461044e578063dd62ed3e146104e8575b34156100b557fe5b6100c15b60006000fd5b565b005b34156100cb57fe5b6100d3610551565b6040518080602001828103825283818151815260200191508051906020019080838360008314610122575b805182526020831115610122576020820191506020810190506020830392506100fe565b505050905090810190601f16801561014e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561016457fe5b610199600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506105ef565b604051808215151515815260200191505060405180910390f35b34156101bb57fe5b6101c36106e2565b6040518082815260200191505060405180910390f35b34156101e157fe5b610235600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506106e8565b604051808215151515815260200191505060405180910390f35b341561025757fe5b61025f610969565b604051808260ff1660ff16815260200191505060405180910390f35b341561028357fe5b61028b61097c565b60405180806020018281038252838181518152602001915080519060200190808383600083146102da575b8051825260208311156102da576020820191506020810190506020830392506102b6565b505050905090810190601f1680156103065780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561031c57fe5b610348600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610a1a565b6040518082815260200191505060405180910390f35b341561036657fe5b61036e610a64565b60405180806020018281038252838181518152602001915080519060200190808383600083146103bd575b8051825260208311156103bd57602082019150602081019050602083039250610399565b505050905090810190601f1680156103e95780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156103ff57fe5b610434600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610b02565b604051808215151515815260200191505060405180910390f35b341561045657fe5b6104ce600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610c70565b604051808215151515815260200191505060405180910390f35b34156104f057fe5b61053b600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610f21565b6040518082815260200191505060405180910390f35b60038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105e75780601f106105bc576101008083540402835291602001916105e7565b820191906000526020600020905b8154815290600101906020018083116105ca57829003601f168201915b505050505081565b600081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a3600190505b92915050565b60005481565b600081600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101580156107b5575081600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410155b80156107c15750600082115b156109585781600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254019250508190555081600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050610962565b60009050610962565b5b9392505050565b600460009054906101000a900460ff1681565b60068054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610a125780601f106109e757610100808354040283529160200191610a12565b820191906000526020600020905b8154815290600101906020018083116109f557829003601f168201915b505050505081565b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b919050565b60058054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610afa5780601f10610acf57610100808354040283529160200191610afa565b820191906000526020600020905b815481529060010190602001808311610add57829003601f168201915b505050505081565b600081600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410158015610b535750600082115b15610c605781600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050610c6a565b60009050610c6a565b5b92915050565b600082600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925856040518082815260200191505060405180910390a38373ffffffffffffffffffffffffffffffffffffffff1660405180807f72656365697665417070726f76616c28616464726573732c75696e743235362c81526020017f616464726573732c627974657329000000000000000000000000000000000000815250602e01905060405180910390207c01000000000000000000000000000000000000000000000000000000009004338530866040518563ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001828051906020019080838360008314610ec0575b805182526020831115610ec057602082019150602081019050602083039250610e9c565b505050905090810190601f168015610eec5780820380516001836020036101000a031916815260200191505b5094505050505060006040518083038160008761646e5a03f1925050501515610f155760006000fd5b600190505b9392505050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b929150505600a165627a7a723058200cefa2ee536584300e6123cee2abeafcf9ab9388caf67ee95580f02e5587008d0029
```

字节大小： `4557.5 byte => 4.45 kb`

- 创建&部署合约成本

Alaya

* Gas消耗: 552823
* Gas单价: 5,000,000,000 (5 `gVON`)
* 总成本:  2764115 `gVON`（0.002764115 `ATP`）

以太坊

* Gas消耗: 1282171 
* Gas单价: 5,000,000,000 (5 `Gwei`)
* 总成本:  6410855 `Gwei`（0.006410855 `ETH`）

------------------------

## 最佳实践

### 介绍 

本指南向用户介绍智能合约开发中需要关注的一些关键点，主要偏向于在实际开发中的实践。用户可以通过本指南快速了解针对一笔交易如何合理的设置手续费、如何避免被因交易失败的同时损失手续费以及如何编码更加规范的智能合约。


### 费用合理设置

当需要在`Alaya`上部署合约时，需要设置一个合理的费用限制。费用限制是指 `Alaya` 中智能合约部署/执行的能源消耗成本的上限。该限制主要通过 `Gas` 完成，`Gas` 是 Alaya 网络世界的燃料值，它决定了 Alaya 网络生态系统的正常运行。通常使用 Gas 来衡量执行某些动作需要多少"工作量"，这些工作量就是为了执行该动作所需要支付给 Alaya 网络的费用额度。简单理解， Gas 是网络旷工的佣金，并通过 `ATP` 的方式支付，在网络上的任何交易、合约执行，数据存储，都需要使用到 Gas。

Alaya与以太坊区块链系统类似，使用 `ATP` 进行支付和维护网络，一枚 ATP 分为：`mATP/uATP/gVON/mVON/kVON/VON`，其中`VON`是最小单位。

Gas 主要由两个部分组成：GasLimit(限制)和GasPrice(单价)。其中 `GasLimit` 是用户愿意为执行某个操作或确认交易支付的最大 `Gas` 消耗量（最少21,000）。GasPrice是 `gVON` 的数量，用于愿意为每个 `Gas` 所支付的单价。

用户发送一笔交易时，会设定 `GasLimit` 和 `GasPrice`，二者的乘积（`GasLimit * GasPrice`）是用户的交易成本，同时该成本会作为佣金奖励给旷工。

交易设置的 `GasPrice` 越高，则交易的执行优先级更高，交易成本也会更大。每笔交易在完成后，剩余未使用的Gas都会退回到发送者的地址账户中。有一点要特别注意，如果因为 `GasLimit` 设置过低导致交易执行失败，此时的 Gas 不会被回退到用户地址，用户依然需要为这次失败的交易支付能量成本。因此，无论交易是否执行成功，交易发送者都需要向旷工支付一定的计算费用。

在 `Alaya` 网络中，最高 Gas 的限制为 `4,700,000`，最低为 `22,000`，过低或者过高都会导致交易失败。在部署大型合约或者运行复杂功能时，可以将Gas的限制调高，例如：`1,000,000`。如果是普通转账则设置为最低值即可。具体的值需要根据合约的规模及复杂度进行估算，在合约发布前可以调用接口 `platon_estimateGas` 进行大概估算，避免因不足而导致失败。 [点击查看JSON-RPC参考文档](/alaya-devdocs/zh-CN/Json_Rpc)。

**ATP 单位转换**

| 单位 | VON值    | VON                                   |
| :--- | :------- | :------------------------------------ |
| VON  | 1        | 1 VON                                 |
| kVON | 1e3 VON  | 1,000                                 |
| mVON | 1e6 VON  | 1,000,000                             |
| gVON | 1e9 VON  | 1,000,000,000                         |
| ATP  | 1e18 VON | 1,000,000,000,000,000,000             |
| mATP | 1e24 VON | 1,000,000,000,000,000,000,000,000     |
| gATP | 1e27 VON | 1,000,000,000,000,000,000,000,000,000 |

### 避免超时 

在 `Alaya` 网络上发送交易，没有超时的概念，但是最终会根据所设置的 Gas 限制值停止，如果限制值低于合约部署所需要的消耗，则交易发送失败，同时会扣除对应的手续费。手续费的设定不可能无限大，因为在网络中，区块本身有一个最大的Gas上限，当交易的 `GasLimit` 超过该值时，交易将无法被接收。

如果是针对已发布的合约执行 `call` 调用（call调用指合约逻辑内无状态变更操作），存在 5s 超时的限制，如果在 `5s` 内合约逻辑没有执行完成，虚拟机会超时强制退出，导致查询失败。

为避免部署合约交易失败，请尝试将大型合约分成较小的块，并根据需要相互引用。 为了避免无限循环，请注意常见的陷阱和递归调用。


### 非法操作处罚

如果智能合约不是通过标准有效的编译器编译合约或者随意的更改指令码，都会导致操作码无效。此类合约不仅无法部署和执行成功，而且还会产生 `GasLimit*GasPrice` 的全额惩罚，当次交易的手续费会全部被扣除，这是一个力度很大的惩罚，如果操作者没注意该点，不断重试，那么付出的成本会更高，代价更重。

一般产生无效操作码有以下情况：

1.对正常已编译出的合约手动更改了指令码；        
2.合约编译器版本与网络锁支持的合约版本不一致；

在 `Alaya` 网络中操作合约时，请务必先确认当前网络所支持的智能合约版本，然后选择对应版本对的编译器。

常规操作是使用 `Alaya` 官方提供的最新的`Truffle`/`PlatON-CDT`来编译/部署/执行合约，同时在切换到主网操作前，务必在开发测试网进行有效的验证。


### 编码规范

#### 命名规范

基本规则：

* 使用能准确说明变量、字段、类、接口等完整的描述信息；
* 采用大小写混合（特殊字符除外），提高命名的可读性；
* 采用区块链行业内的术语；
* 尽可能少的使用缩写，如果一定使用，则推荐使用公共缩写和习惯缩写等；
* 避免使用相似或者仅仅是大小上有区分的命名；
* 目录统一使用小写，无特殊符号；
* EVM智能合约，文件名与合约名保持一致；
* 命名建议统一使用驼峰规则；


#### 智能合约文件组织

文件组织规则：

* 一般超过1000行的程序代码就比较难以阅读，尽量避免出现一个文件内代码行数过长的情况。每个合约文件应只包含一个单一的合约类或合约接口。

文件组织顺序：

* 文件注释：所有合约源文件在开头有一个注释，其中列出文件的版权声明、文件名、功能描述及创建、修改记录；
* 文件/包引用：在合约源文件中，第一个非注释行是编译器版本，之后跟上引用语句；
* 类或接口注释：在类、接口定义之前应该进行注释，包括类、接口的描述、最新修改者、版本号、参考链接等；
* 实例变量：首先是公共级别的，随后是保护级别的，最后是私有级别；
* 普通方法：合约内的函数应该按功能分组，而不应该按作用域或访问权限进行分组；


#### 几点建议 

* 在智能合约中，获取 public 修饰的状态变量的值，不需要编写 `get` 函数；
* 在智能合约中，在合约中加入 `payable` 修饰的匿名函数，则合约地址可接受 ATP 转账；

-----------------

## 合约安全开发指南

在Solidity合约中，可以来处理代币，甚至是更值钱的东西。此外，合约的每次执行都是公开的，源代码通常也是公开的。在区块链世界里，合约一直都是黑客的主要攻击点，同时也造成了非常大的损失。所以合约的安全开发非常重要，可以考虑从以下几个方面来提高合约的安全性。

### 编译器bug

首先必须了解Solidity编译器本身的bug，尽量规避有问题的编译器版本或者存在问题的使用方式。Solidity编译器bug列表：https://solidity.readthedocs.io/en/latest/bugs.html 。

### 标准合约开发流程

如果想解决智能合约的安全问题，必须按照标准流程来开发合约。

1. 必须先完成详细的设计，充分考虑各种场景和异常情况。避免考虑不清楚，不全面引入的bug。
2. 开发过程中，要做到模块化和简洁化，复杂性会增加出错的风险。
3. 合约必须经过足够充分的review和测试才能发布到主网。
4. 保持对合约运行状态的关注，紧急状态下可以销毁合约或者提供类似紧急冻结的功能。

### 常见漏洞

#### 私有信息和随机性

智能合约中使用的所有内容都是公开可见的，即使是标记了局部变量和状态变量 `private` 。

如果你不想让矿工作弊，那么在智能合约中使用随机数就相当困难（在智能合约中使用随机数很难保证节点不作弊， 这是因为智能合约中的随机数一般要依赖计算节点的本地时间得到， 而本地时间是可以被恶意节点伪造的，因此这种方法并不安全。 通行的做法是采用链外off-chain 的第三方服务，比如 Oraclize 来获取随机数）。

#### 重入

任何从合约 A 到合约 B 的交互以及任何从合约 A 到合约 B 的 以太币的转移。都会将控制权交给合约 B。这使得合约 B 能够在交互结束前回调 A 中的代码。举个例子，下面的代码包含一个bug（它只是一个片段，而不是一个完整的契约）：

```
pragma solidity >=0.4.0 <0.7.0;

// THIS CONTRACT CONTAINS A BUG - DO NOT USE
contract Fund {
    /// Mapping of ether shares of the contract.
    mapping(address => uint) shares;
    /// Withdraw your share.
    function withdraw() public {
        if (msg.sender.send(shares[msg.sender]))
            shares[msg.sender] = 0;
    }
}
```

这里的问题不是很严重，因为有限的 gas 也作为 `send` 的一部分，但仍然暴露了一个缺陷：以太币的传输过程中总是可以包含代码执行，所以接收者可以是一个回调进入 `withdraw` 的合约。 这就会使其多次得到退款，从而将合约中的全部以太币提取。 特别地，下面的合约将允许一个攻击者多次得到退款，因为它使用了 `call` ，默认发送所有剩余的 gas：

```
pragma solidity >=0.4.0 <0.7.0;

// THIS CONTRACT CONTAINS A BUG - DO NOT USE
contract Fund {
    /// Mapping of ether shares of the contract.
    mapping(address => uint) shares;
    /// Withdraw your share.
    function withdraw() public {
        (bool success,) = msg.sender.call.value(shares[msg.sender])("");
        if (success)
            shares[msg.sender] = 0;
    }
}
```

为了避免重入，你可以使用下面撰写的“检查-生效-交互”（Checks-Effects-Interactions）模式：

```
pragma solidity >=0.4.11 <0.7.0;

contract Fund {
    /// Mapping of ether shares of the contract.
    mapping(address => uint) shares;
    /// Withdraw your share.
    function withdraw() public {
        uint share = shares[msg.sender];
        shares[msg.sender] = 0;
        msg.sender.transfer(share);
    }
}
```

请注意重入不仅是以太币传输的其中一个影响，还包括任何对另一个合约的函数调用。 更进一步说，你也不得不考虑多合约的情况。 一个被调用的合约可以修改你所依赖的另一个合约的状态。

#### gas 限制和循环

必须谨慎使用没有固定迭代次数的循环，例如依赖于存储 storage 值的循环：由于区块 gas 有限，交易只能消耗一定数量的 gas。无论是明确指出的还是正常运行过程中的，循环中的数次迭代操作所消耗的 gas 都有可能超出区块的 gas 限制，从而导致整个合约在某个时刻骤然停止。这可能不适用于只被用来从区块链中读取数据的 `view` 函数。 尽管如此，这些函数仍然可能会被其它合约当作链上on-chain操作的一部分来调用，并使那些操作骤然停止。 请在合约代码的说明文档中明确说明这些情况。

#### 发送和接收以太币

- 目前无论是合约还是“外部账户”都不能阻止有人给它们发送 以太币Ether。 合约可以对一个正常的转账做出反应并拒绝它，但还有些方法可以不通过创建消息来发送 以太币Ether。 其中一种方法就是单纯地向合约地址“挖矿”，另一种方法就是使用 `selfdestruct(x)` 。
- 如果一个合约收到了以太币（且没有函数被调用），就会执行 fallback 函数。 如果没有 fallback 函数，那么以太币 Ether 会被拒收（同时会抛出异常）。 在 fallback 函数执行过程中，合约只能依靠此时可用的“gas 津贴”（2300 gas）来执行。 这笔津贴并不足以用来完成任何方式的存储 storage 访问。 为了确保你的合约可以通过这种方式收到 以太币，请你核对 fallback 函数所需的 gas 数量。
- 有一种方法可以通过使用 `addr.call.value(x)("")` 向接收合约发送更多的 gas。 这本质上跟 `addr.transfer(x)` 是一样的， 只不过前者发送所有剩余的 gas，并且使得接收者有能力执行更加昂贵的操作（它只会返回一个错误代码，而且也不会自动传播这个错误）。 这可能包括回调发送合约或者你想不到的其它状态改变的情况。因此这种方法无论是给诚实用户还是恶意行为者都提供了极大的灵活性。
- 尽可能地使用最精确的单位来表示wei的数量，因为您会丢失由于缺乏精确性而舍入的任何值。
- 如果你想要使用 `address.transfer`以太币，你需要注意以下几个细节：
  1. 如果接收者是一个合约，它会执行自己的 fallback 函数，从而可以回调发送以太币的合约。
  2. 如果调用的深度超过 1024，发送以太币也会失败。由于调用者对调用深度有完全的控制权，他们可以强制使这次发送失败； 请考虑这种可能性，或者使用 `send` 并且确保每次都核对它的返回值。 更好的方法是使用一种接收者可以取回以太币的方式编写你的合约。
  3. 发送以太币也可能因为接收方合约的执行所需的 gas 多于分配的 gas 数量而失败（确切地说，是使用了 `require` ， `assert`， `revert` 或者因为这个操作过于昂贵） - “gas 不够用了”。 如果你使用 `transfer` 或者 `send` 的同时带有返回值检查，这就为接收者提供了在发送合约中阻断进程的方法。 再次说明，最佳实践是使用 [“取回”模式而不是“发送”模式](https://solidity.readthedocs.io/en/latest/common-patterns.html#withdrawal-pattern)。

#### 调用栈深度

外部函数调用随时会失败，因为它们超过了调用栈的上限 1024。 在这种情况下，Solidity 会抛出一个异常。 恶意行为者也许能够在与你的合约交互之前强制将调用栈设置成一个比较高的值。

请注意，使用 `.send()` 时如果超出调用栈 **并不会** 抛出异常，而是会返回 `false`。 低级的函数比如 `.call()`，`.delegatecall()` 和 `.staticcall()` 也都是这样的。

#### tx.origin

永远不要使用 tx.origin 做身份认证。假设你有一个如下的钱包合约：

```
pragma solidity >=0.5.0 <0.7.0;

// THIS CONTRACT CONTAINS A BUG - DO NOT USE
contract TxUserWallet {
    address owner;

    constructor() public {
        owner = msg.sender;
    }

    function transferTo(address payable dest, uint amount) public {
        require(tx.origin == owner);
        dest.transfer(amount);
    }
}
```

现在有人欺骗你，将以太币发送到了这个恶意钱包的地址：

```
pragma solidity >=0.5.0 <0.7.0;

interface TxUserWallet {
    function transferTo(address payable dest, uint amount) external;
}

contract TxAttackWallet {
    address payable owner;

    constructor() public {
        owner = msg.sender;
    }

    function() external {
        TxUserWallet(msg.sender).transferTo(owner, msg.sender.balance);
    }
}
```

如果你的钱包检查过 `msg.sender` 为了获得授权，它将获取攻击钱包的地址，而不是所有者地址。但是通过检查 `tx.origin` ，它获取启动事务的原始地址，该地址仍然是所有者地址。攻击钱包会立即耗尽你所有的资金。

#### 二的补码/下溢/上溢

与许多编程语言一样，solidity的整数类型实际上不是整数。当值很小时，它们类似于整数，但如果数值较大，则表现不同。例如，以下是正确的： `uint8(255) + uint8(1) == 0` .这种情况被称为上溢。当执行的操作需要固定大小的变量来存储超出变量数据类型范围的数值（或数据块）时，就会发生这种情况。一个下溢的情况是： `uint8(0) - uint8(1) == 255` .

一般来说，阅读关于二的补码表示的限制，它甚至对有符号数有一些更特殊的边界情况。

尝试使用 `require` 将输入的大小限制在合理的范围内，并使用 [SMT checker](https://solidity.readthedocs.io/en/latest/layout-of-source-files.html#smt-checker) 查找潜在的溢出，或使用类似的库 [SafeMath](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol) ，如果希望所有溢出都能还原。

代码 `require((balanceOf[_to] + _value) >= balanceOf[_to])` 还可以检查值是否符合期望。

#### 清理Mappings

Solidity `mapping` 类型(参考 [Mapping Types](https://solidity.readthedocs.io/en/latest/types.html#mapping-types)) 是仅存储键值的数据结构，不会跟踪分配了非零值的键索引。因此，在没有键索引信息的情况下，无法清除`mapping`。如果将`mapping`用作动态存储数组的基本类型，则删除或弹出该数组将不会对`mapping`元素产生影响。例如，如果将`mapping`用作 struct 的成员字段的类型，同时struct作为动态存储数组的基本类型，则会发生相同的情况。在包含`mapping`的结构或数组的分配中，也将忽略`mapping`。

```
pragma solidity >=0.5.0 <0.7.0;

contract Map {
    mapping (uint => uint)[] array;

    function allocate(uint _newMaps) public {
        for (uint i = 0; i < _newMaps; i++)
            array.push();
    }

    function writeMap(uint _map, uint _key, uint _value) public {
        array[_map][_key] = _value;
    }

    function readMap(uint _map, uint _key) public view returns (uint) {
        return array[_map][_key];
    }

    function eraseMaps() public {
        delete array;
    }
}
```

考虑上面的示例和以下调用顺序: `allocate(10)`, `writeMap(4, 128, 256)`. 此时, 调用 `readMap(4, 128)` 返回256。如果调用 `eraseMaps`，状态变量 `array` 的长度是0, 但它的 `mapping` 元素没有清零, 它们的信息仍然存储在合约的存储区。删除数组之后, 调用 `allocate(5)` 允许我们再次访问 `array[4]` , 此时即使不调用 `writeMap`，当调用 `readMap(4, 128)` 仍然会返回256。

如果必须删除`mapping`信息, 可以考虑使用类似 [iterable mapping](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol)库，从而允许遍历键并在适当的`mapping`中删除其值。 

#### 权限控制错误

在智能合约中，合约开发者一般都会设置一些用于合约所有者，但如果开发者疏忽写错了函数权限，就有可能导致所有者转移等严重后果。

```
function initContract() public {
    owner = msg.reader;
}
```

上述代码函数就需要设置onlyOwner。

合约中不同函数应设置合理的权限。

#### 地址初始化问题

在EVM中，所有与地址有关的初始化时，都会赋予初值0。

如果一个address变量与0相等时，说明该变量可能未初始化或出现了未知的错误。

如果开发者在代码中初始化了某个address变量，但未赋予初值，或用户在发起某种操作时，误操作未赋予address变量，但在下面的代码中需要对这个变量做处理，就可能导致不必要的安全风险。

涉及到地址的函数中，建议加入require(_to!=address(0))验证，有效避免用户误操作或未知错误导致的不必要的损失。

#### 交易顺序依赖

由于交易在短暂的时间内会先存放到mempool中，所以在矿工将其打包进block之前，是可以知道会发生什么动作的。这对于一个去中心化的市场来说是麻烦的，因为可以查看到代币的交易信息，并且可以在它被打包进block之前改变交易顺序。避免这一点很困难，因为它归结为具体的合同本身。

例如，在市场上，最好实施批量拍卖（这也可以防止高频交易问题）。另一种使用预提交方案的方法。

#### 其他

不占满32个字节的类型可能包含“脏的高阶位”。如果访问 `msg.data` ，这尤其重要-这会造成延展性风险：那么可以设计使用原始字节参数0xff000001和0x00000001调用函数 f(uint8 x) 的交易。两者都输入了合约，就x而言，两者看起来都像数字1，但是msg.data会有所不同，因此，如果对任何内容使用keccak256(msg.data)，将获得不同的结果。

### 安全建议

#### 认真对待警告

如果编译器警告了你什么事，你最好修改一下，即使你不认为这个特定的警告不会产生安全隐患，因为那也有可能埋藏着其他的问题。 我们给出的任何编译器警告，都可以通过轻微的修改来去掉。

始终使用最新版本的编译器来通知所有最近引入的警告。

#### 限定以太币的数量

限定存储storage 在一个智能合约中以太币（或者其它tokens）的数量。 如果你的源代码、编译器或者平台出现了 bug，可能会导致这些资产丢失。 如果你想控制你的损失，就要限定以太币的数量。

#### 保持合约简练且模块化

保持你的合约短小精炼且易于理解。找出无关于其它合约或库的功能。 有关源码质量可以采用的一般建议： 限制局部变量的数量以及函数的长度等等。 将实现的函数文档化，这样别人看到代码的时候就可以理解你的意图，并判断代码是否按照正确的意图实现。

#### 使用“检查-生效-交互”（Checks-Effects-Interactions）模式

大多数函数会首先做一些检查工作（例如谁调用了函数，参数是否在取值范围之内，它们是否发送了足够的以太币，用户是否具有tokens等等）。这些检查工作应该首先被完成。

第二步，如果所有检查都通过了，应该接着进行会影响当前合约状态变量的那些处理。 与其它合约的交互应该是任何函数的最后一步。

早期合约延迟了一些效果的产生，为了等待外部函数调用以非错误状态返回。 由于上文所述的重入问题，这通常会导致严重的后果。

请注意，对已知合约的调用反过来也可能导致对未知合约的调用，所以最好是一直保持使用这个模式编写代码。

#### 包含故障-安全（Fail-Safe）模式

尽管将系统完全去中心化可以省去许多中间环节，但包含某种故障-安全模式仍然是好的做法，尤其是对于新的代码来说：

你可以在你的智能合约中增加一个函数实现某种程度上的自检查，比如“ 以太币是否会泄露？”， “通证的总和是否与合约的余额相等？”等等。 请记住，你不能使用太多的 gas，所以可能需要通过链外off-chain 计算来辅助。

如果自检查没有通过，合约就会自动切换到某种“故障安全”模式， 例如，关闭大部分功能，将控制权交给某个固定的可信第三方，或者将合约转换成一个简单的“退回我的钱”合约。

#### 认真检查函数权限

合约中不同函数应设置合理的权限。

检查合约中各函数是否正确使用了public、private等关键词进行可见性修饰，检查合约是否正确定义并使用了modifier对关键函数进行访问限制，避免越权导致的问题。

```
function initContract() public OnlyOwner {
    owner = msg.reader;
}
```

#### 要求同行评审

检查一段代码的人越多，发现的问题就越多。让检查者检查您的代码也有助于交叉检查您的代码是否易于理解——这是良好智能合约的一个非常重要的标准。

#### 其他

1. [更多安全建议](https://github.com/guylando/KnowledgeLists/blob/master/EthereumSmartContracts.md)
2. [合约最佳实践](https://consensys.github.io/smart-contract-best-practices/)

### 安全工具

1. 以太坊形式化验证工具 [SMT checker](https://solidity.readthedocs.io/en/latest/layout-of-source-files.html#smt-checker)。
2. 形式化验证工具：提供[离线VS Code插件](https://marketplace.visualstudio.com/items?itemName=Beosin.beosin-vaas-eth)，和[在线版](https://beosin.com/vaas/index.html#/audit/ptsj)。
3. 使用remix集成的安全扫描插件[MythX](https://docs.mythx.io/en/latest/)。

### 第三方审计

可以找专业的第三方审计公司进行安全审计如：[慢雾](https://www.slowmist.com/service-smart-contract-security-audit.html)。

---

## FAQ

### 编译相关

1. alaya-truffle有哪些命令如何使用？

   alaya-truffle开发使用手册[参考这里](https://platon-truffle.readthedocs.io/en/alaya/)。

2. 合约为什么语法校验通不过？

   solidity合约0.4.x版本与0.5.x版本有重大变更，具体语法[参考这里](https://solidity.readthedocs.io/en/develop/)。

3. alaya-truffle执行truffle compile 失败?

   1.确认编译的合约文件中的版本号与truffle-config.js中指定的版本号是否一致。
   2.可能语法有误，可以根据命令行提示修复后再进行编译。

4. alaya-truffle执行truffle migrate部署合约失败?

  1.确认truffle-config.js中连接的链的配置信息及用户的钱包地址是否正确。

5. truffle migrate部署带参数的构造函数合约失败?

  以合约A.sol为例，在migrations/2_initial_A.js文件中，确认是否添加构造参数信息如：
  A.sol构造函数格式如下：
  ```
  constructor(uint256 a, string memory b, string memory c) public {}
  ```

  2_initial_A.js文件配置如下：
  ```
   const A = artifacts.require("A");  
   module.exports = function(deployer) {
        deployer.deploy(A,100,'PLA','PLAT');//需要传入对应构造函数参数
   };   
  ```




