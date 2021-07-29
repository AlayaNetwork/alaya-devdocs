---
id: Solidity_Migration_tutorial
title: 迁移教程
sidebar_label: 迁移教程
---

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
        require(_to != address(uint160(0)));
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
- 地址修改：把require(_to != address(0x0))修改为require(_to != address(uint160(0)))
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
