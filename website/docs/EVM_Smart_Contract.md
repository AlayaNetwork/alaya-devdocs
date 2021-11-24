---
id: EVM_Smart_Contract
title: EVM Smart Contract
sidebar_label: EVM Smart Contract
---



This guide introduces the development process of smart contracts and issues should be noticed during development process from the perspective of the developer. It guides developers to quickly develop high-quality smart contracts on the Alaya network. Mainly from the following aspects to explain：

- [Development Manual](#development-manual)
- [Migrate Contract](#migrate-contract)
- [Crowdfunding Contract](#crowdfunding-contract)
- [Development Costs](#development-costs)
- [Best Practice](#best-practice)
- [Contract Security Development Guide](#contract-security-development-guide)
- [FAQ](#faq)

## Development Manual

### Introduction

This tutorial is mainly to guide users to create a simple HelloWorld smart contract using solidity language on Alaya, compile, deploy, and call this contract through alaya-truffle. If you want to use a richer API you can refer to [Java SDK](/alaya-devdocs/en/Java_SDK) and  [JS SDK](/alaya-devdocs/en/JS_SDK)

### alaya-truffle Introduction 

alaya-truffle is a tool provided by Alaya that can compile, deploy, and invoke smart contracts locally. For specific installation and usage manuals, refer to:

- alaya-truffle develop tools [specific installation](https://platon-truffle.readthedocs.io/en/alaya/getting-started/installation.html)
- alaya-truffle develop tools [usage manuals](https://platon-truffle.readthedocs.io/en/alaya/)

### Create HelloWorld Contract

```
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

Contract Files Description:

- pragma solidity ^0.5.17
  -	`pragma solidity`: solidity version description
     `0.5.17`：solidity version
     	`^` ：Indicates upward compatibility, that is, it can be compiled with a compiler above 0.5.17
- contract HelloWorld
  -	`contract`：contract keyword
     `HelloWorld`：contract name
- string name
  -	`name`：contract state variables
     `string`：the type of contract state variables 
- function setName(string memory _name) public returns(string memory)
  -	`function`：function keyword
     `setName`：function name
     	`memory`：declare the storage location of param name（ function input parameters and output parameters  must be declared as memory when the parameters type is string）
     	`_name`：the  local variables
     	`public`：declare the visibility of the function
     	`name` = _name：Assignment the local variable to state variable
- function getName() public view returns(string memory)
  -	`view`: this keyword means the function cannot change the blockchain state, which mainly used for query

### Compile HelloWorld Contract 

**Step1.**  Creat new directory for HelloWorld project 

```
mkdir HelloWorld && cd HelloWorld
```

**Step2.**  Init project

```
alaya-truffle init
```
After the command is executed, project directory structure is as follows:

- `Contracts/`: solidity contract directory

- `Migrations/`:  depoly file directory

- `Test/`: test script directory

- `Truffle-config.js`: alaya-truffle config

**Step3.**  Move HelloWorld contract compiled in to HelloWorld/contracts/

```
ls contracts/
```
- HelloWorld.sol 

**Step4.**  Fix compile version same as the version setted  in truffle-config.js

```
vim truffle-config.js
```

Truffle-config.js content is  as follows:
```
compilers: {
      solc: {
            version: "^0.5.17",    // same as the version declared in HelloWorld.sol
      }
}
```

**Step5.**  Compile contract

```
alaya-truffle compile
```
After the command is executed, project directory structure is as follows:

- `Build/`: solidity contract directory after compiled

- `Build/contracts/HelloWorld.json`:the compiled file corresponding with HelloWorld.sol  


### Deploly HelloWorld Contract

**Step1.** Create deploy script 

```
cd migrations/ && touch 2_initial_helloworld.js
```
Suggest replacing script  name  with contract name, for example the deploy script  of HelloWorld contract :2_initial_helloworld.js,content is as follows：
```
const helloWorld = artifacts.require("HelloWorld"); //artifacts.require specify deployment contract
	module.exports = function(deployer) {
       deployer.deploy(helloWorld); //Failed to deploy contract with parameters, please refer to FAQ
};
```

**Step2.** Setting config  information for blockchain in truffle-config.js

```
vim truffle-config.js
```
Set blockchain network  info
```
networks: {
	development: {
       host: "10.1.1.6",     // blockchain server address
       port: 8806,            // server port
       network_id: "*",       // Any network (default: none)
       from: "atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp", //the accout address of deploying contract
       gas: 999999,
       gasPrice: 50000000004,
	},
}
```

**step3.**  Unlock wallet account

Enter the alaya-truffle console

```
alaya-truffle console
```

Import the private key (you can skip this step if you have already imported it)
```
web3.platon.personal.importRawKey("Your wallet private key","Your wallet password");
```
After importing successfully, you will see the address corresponding to the private key as follows：
```
'atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp'
```

Unlock wallet account
```
 web3.platon.personal.unlockAccount('Your wallet address','Your wallet password',999999);
```
After unlocking successfully, you will see the following information：
```
ture
```

**Step4.**  Deploy contract

```
alaya-truffle migrate
```

After deploying successfully, you will see log info as follows:
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

### Call HelloWorld Contract

**Step1.**  Enter the alaya-truffle console

```
alaya-truffle console
```
- You can execute command in alaya-truffle console

**Step2.**  Create contract object

```json
var abi = [{"constant":false,"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"setName","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getName","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]; //you can refet to HelloWorld/build/contracts/HelloWorld.json

var contractAddr = 'atp1c5xxup4au4pqkgkm6a3p6hj3x0vvekdj52z2la';//contract address
var helloWorld = new web3.platon.Contract(abi,contractAddr);  
```

Description： 

- `abi` the interface provided by the contract to external calls, the abi  in the file compiled ：`HelloWorld/build/contracts/HelloWorld.json` 
- `contractAddr` contract address
- `helloWorld`  contract object created

**Step3.**  Call contract

```javascript
helloWorld.methods.setName("hello world").send({from: 'atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp'}).on('receipt', function(receipt) {console.log(receipt);}).on('error', console.error);

```

Description：

- `helloWorld` the contract object created
- `methods`  specify the call method
- `setName` the function of the HelloWorld contract, which has a parameter as `hello world`
- `from` the address of caller 
- `on` listen to the result of the contract method executed. If failed, it will print the error info. If succeeds ,the console will print the receipt as belows:

```
{ 
  blockHash:'0x3ae287d1e745e30d0d6c95d5220cc7816cda955e7b2f013c6a531ed95028a794', //the hash of block the transaction located
  blockNumber: 159726, 
  contractAddress: null,
  cumulativeGasUsed: 44820,
  from: 'atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp', //the address of caller
  gasUsed: 44820, //gas cost
  logsBloom:
   '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: 'atp1c5xxup4au4pqkgkm6a3p6hj3x0vvekdj52z2la', //contract address
  transactionHash:'0xb7a41f72d555d4a2d9f2954fbdc5bbbb4c5ce89c836f8704276419ed416b3866', 
  transactionIndex: 0,
  events: {} 
}
```

**Step4.**  Query contract

```javascript
helloWorld.methods.getName().call(null,function(error,result){console.log("name is:" + result);})  
```
Description：

- `helloWorld` the contract object created
- `methods` specify the call method
- `getName` the function of the HelloWorld contract, which has no  parameter 
- `call` specify query method
- `function` callback result,we can use console.log to print info.

------------------

## Migrate Contract

### Introduction 

Alaya supports four versions of solidity: 0.4.26, 0.5.17, 0.6.12, and 0.7.1. If you migrate contracts with versions above 0.7.1, you need to reduce the version number and remove the syntax related to the higher version.

If you want to migrate Ethereum's smart contract to Alaya, you can do this with the `alaya-truffle` development tool. First, to make sure have `alaya-truffle` installed correctly, just follow these steps.

The migration of Ethereum's ERC200513Token contract to Alaya is demonstrated below，`ERC200513Token.sol` contract are as follows:
```
pragma solidity 0.5.17;

contract ERC200513Token {
    string public name; 
    string public symbol; 
    uint8 public decimals = 18;  //18 decimals is the strongly suggested default, avoid changing it
    uint256 public totalSupply = 10000000000000000000 ether; 

    // This creates an array with all balances
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    //This generates a public event on the blockchain that will notify clients
    event Transfer(address indexed from, address indexed to, uint256 value);

    // This notifies clients about the amount burnt
    event Burn(address indexed from, uint256 value);

    /**
     * Constructor function
     */
    constructor(uint256 initialSupply, string memory tokenName, string memory tokenSymbol) public {
        totalSupply = initialSupply * 10 ** uint256(decimals); // Update total supply with the decimal amount
        balanceOf[msg.sender] = totalSupply; // Give the creator all initial tokens
        name = tokenName; // Set the name for display purposes    
        symbol = tokenSymbol; 
    }
    /**
     * get the name for display purposes
     */
    function getName() view public returns (string memory){
        return name;
    }

    /**
     * get token symbol
     */
    function getSymbol() view public returns (string memory){
        return symbol;
    }
 
    function getDecimals() public view returns (uint8){
        return decimals;
    }

    function getTotalSupply() public view returns (uint256 theTotalSupply) {
        theTotalSupply = totalSupply;
        return theTotalSupply;
    }

    function getBalanceOf(address _owner) public view returns (uint256 balance) {
        //get _owner's balance
        return balanceOf[_owner];
    }
    /**
     * Transfer tokens from other address
     */
    function _transfer(address _from, address _to, uint _value) internal returns (bool success){
        // Make sure the destination address is not 0x0, Because address 0x0 represents destruction
        require(_to != address(0x0));
        // Check the sender balance
        require(balanceOf[_from] >= _value);
        // Make sure _value>0
        require(balanceOf[_to] + _value > balanceOf[_to]);

        uint previousBalances = balanceOf[_from] + balanceOf[_to];
        // Subtract from the sender
        balanceOf[_from] -= _value;
        // Add the same to the recipient
        balanceOf[_to] += _value;
        emit Transfer(_from, _to, _value);

        return (balanceOf[_from] + balanceOf[_to] == previousBalances);
    }

    /**
     *  Transfer tokens from other address
	 *
     *  Send `_value` tokens to `_to` on behalf of `_from`
	 *
     * @param _to The address of the recipient
     * @param _value the amount to send
     */
    function transfer(address _to, uint256 _value) public returns (bool success){
        return _transfer(msg.sender, _to, _value);
    }

    /**
     * Transfer tokens from other address
     *
     * @param _from The address of the sender
     * @param _to The address of the recipient
     * @param _value the amount to send
     */
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= allowance[_from][msg.sender]);
        // Check allowance
        allowance[_from][msg.sender] -= _value;
        _transfer(_from, _to, _value);
        return true;
    }

    /**
     * Set allowance for other address
     *
     * Allows `_spender` to spend no more than `_value` tokens on your behalf
     * 
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
     * Gets the remaining number of tokens that _spender can issue from account _owner
     */
    function getAllowance(address _owner, address _spender) public view returns (uint remaining){
        return allowance[_owner][_spender];
    }

    /**
	 * Destroy tokens
	 *
     * Remove `_value` tokens from the system irreversibly
     *
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
     * Destroy tokens from other account
     *
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

### Operation Procedure

**Step1.** Create new directory for example project 

```
mkdir example && cd example
```

> After the command is executed,project directory structure is as follows:

**Step2.**  Init project

```
alaya-truffle init
```

After the command is executed,project directory structure is as follows:

- `contracts/`: solidity contract directory

- `migrations/`: depoly file directory

- `test/`: test script directory

- `truffle-config.js`: alaya-truffle config

**Step3.** Move ERC200513Token contract compiled in to example/contracts

```
ls contracts/
```

- ERC200513Token.sol
- Alaya's smart contract unit is ATP,VON. To migrate the Ethereum smart contract to Alaya,please change the Ethereum denomination to Alaya denomination.also note the ether /ATP market rate（for this contract, we assume the market exchange rate1:1,uint256 public totalSupply = 10000000000000000000 ether; change to uint256 public totalSupply = 10000000000000000000 atp; ）
- The compiled version modifies the version supported by Alaya.
- Alaya's smart contract block.timestamp is current block timestamp as milliseconds since unix epoch, and Ethereum smart contract is seconds.

**Step4.** Modify the compilation version number and chain-dependent configuration in truffle-config.js

```
module.exports = {
  networks: {
     development: {
      host: "10.1.1.6",     // chain address
      port: 8806,            // chain rpc port
      network_id: "*",       // Any network (default: none)
      from: "atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp", // the wallet address of deployment contract 
      gas: 999999,
      gasPrice: 50000000004,	     
     },
  },

  compilers: {
    solc: {
       version: "0.5.17",    // the version number used in compiling the contract is the same as the contract definition
       docker: false,        // Use "0.5.1" you've installed locally with docker
    }
  }
}
```

**Step5.** Compile contract

```
alaya-truffle compile
```
The following is the output of the successful compilation：
```
Compiling your contracts...
Compiling ./contracts/ERC200513Token.sol
Compiling ./contracts/Migrations.sol
  compilation warnings encountered:

Warning: This is a pre-release compiler version, please do not use it in production.
Artifacts written to /home/guest/example/build/contracts
Compiled successfully using: 
  solc: 0.5.17+commit.d117da36.Emscripten.clang
```

**Step6.** Create deploy script 

```
cd migrations && touch 2_initial_ERC200513Token.js
```

Deploy script 2_initial_ERC200513Token.js content is as follows：
```
const ERC200513Token = artifacts.require("ERC200513Token"); //contract class name
module.exports = function(deployer) {
  deployer.deploy(ERC200513Token,100,'PLA','PLAT'); //ERC200513Token abstract and constructor params
};  
```

**Step7.** Deploy contract

```
alaya-truffle migrate
```

After deploying successfully, you will see log info as follows:

```
Compiling your contracts...
Everything is up to date, there is nothing to compile.
2_initial_ERC200513Token.js
   Deploying 'ERC200513Token'
     transaction hash:    0xa1770aecf4cffb0e75a172e06e75a9e9cb2d36bf89291b57d504e8c054985e99
     Blocks: 0            Seconds: 0
     contract address:    atp1kekwl4v2q0qc0g9cr6c8adsx0p2n7c90ygp5tv//new contract address
     block number:        265657
     block timestamp:     1581742216965
     account:             atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp
     balance:             90000000.826385379994114416
     gas used:            638876
     gas price:           50.000000004 gVON
     value sent:          0 ATP
     total cost:          0.031943800002555504 ATP
     Saving migration to chain.
     Saving artifacts
     Total cost:     0.031943800002555504 ATP
Summary
 Total deployments:   2
 Final cost:          0.037844150003027532 ATP
```



---------

## Crowdfunding Contract

### Introduction

In the following example, we will use smart contract for a crowdfunding campaign. The creator of the contract started crowdfunding, and initialized the number of tokens and the duration of the crowdfunding. If the crowdfunding is completed within a specified time, the crowdfunding will be successful. If the crowdfunding switch is turned off, a certain number of tokens based on a fixed exchange rate will be cast and credited to the name of the investor. Otherwise, the crowdfunding fails and the amount of the crowdfunding is returned to the investors.

There are two roles in the contract

- Crowdfunder
- Investor

### Crowdfunding Process

- 1.Creating a crowdfunding contract refers to the beneficiary.
- 2.Deployment crowdfunding contract initializes the number and duration of crowdfunding tokens.
- 3.Investors invest.
- 4.Determine if crowdfunding is over.
  - If the crowdfunding time is not up and the number of crowdfunding tokens has been completed, turn off the crowdfunding switch, investors will be allocated tokens in proportion. Crowdfunding success.
  - If the crowdfunding time is up and the amount of crowdfunding tokens has been completed, investors will be allocated tokens in proportion. Crowdfunding success.
  - If the crowdfunding time is up and the number of crowdfunding tokens is not completed, the investor tokens will be returned. Crowdfunding failure.

### Crowdfunding Contract

```
pragma solidity ^0.5.17;

contract CrowdFunding {
    address payable public beneficiaryAddress = address(0x0); //Beneficiary address, set as contract creator
    uint256 public fundingGoal = 100 atp;  //Crowdfunding target, unit is ATP
    uint256 public amountRaised = 0; //The amount of money raised,the unit is VON
    uint256 public deadline; 
    uint256 public price;  //token price
    bool public fundingGoalReached = false;  //Achieving crowdfunding goals flag
    bool public crowdsaleClosed = false; //Crowdfunding closed

    mapping(address => uint256) public balance; //Save the amount raised by the investor
    
    mapping(address => uint256) public tokenMap; //Save the number of tokens owned by the investor

    //Record received ATP notifications
    event GoalReached(address _beneficiaryAddress, uint _amountRaised);

    //Transfer notice
    event FundTransfer(address _backer, uint _amount, bool _isContribution);
    
    //Check if the address is empty
    modifier validAddress(address _address) {
        require(_address != address(0x0));
        _;
    }

    /**
     * Initialization constructor
     *
     * @param _fundingGoalInlats: Total crowdfunding ATP coin
     * @param _durationInMinutes: Crowdfunding deadline, unit is minute
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
     * fallback functioin
     *
     * you can send money directly to the contract
     */
    function () payable external {

        //check whether to close crowdfunding
        require(!crowdsaleClosed);
        uint amount = msg.value;

        //investor amount accumulated
        balance[msg.sender] += amount;

        //Total invest accumulated
        amountRaised += amount;

        //Transfer operation, how many tokens are transferred to the investor
        tokenMap[msg.sender]  += amount / price;
        
        emit FundTransfer(msg.sender, amount, true);
    }

    /**
     * Determine if the crowdfunding deadline has passed
     */
    modifier afterDeadline() { if (now >= deadline) _; }

    /**
     * Check if the crowdfunding goal has been reached
     */
    function checkGoalReached() public afterDeadline payable{
        if (amountRaised >= fundingGoal){
            //crowdfunding goal has been reached
            fundingGoalReached = true;
            emit GoalReached(beneficiaryAddress, amountRaised);
        }

        //Closing crowdfunding
        crowdsaleClosed = true;
    }


    /**
     * Recover funds
     *
	 * Check if the target or time limit has been reached, and if so, send the full amount to the beneficiary.
     * If the goal is not reached, each investor can return the amount they invested
     */
    function safeWithdrawal() public afterDeadline {

        //If the crowdfunding goal is not reached
        if (!fundingGoalReached) {
            //Get the contracted caller's donated balance
            uint amount = balance[msg.sender];

            if (amount > 0) {
                //Returns all balances of the contract initiator
                msg.sender.transfer(amount);
                emit FundTransfer(msg.sender, amount, false);
                balance[msg.sender] = 0;
            }
        }

        //f the crowdfunding goal is achieved and the contract caller is the beneficiary
        if (fundingGoalReached && beneficiaryAddress == msg.sender) {

            //Give all donations from the contract to the beneficiary
            beneficiaryAddress.transfer(amountRaised);
            
            emit FundTransfer(beneficiaryAddress, amountRaised, false);
        }
    }
}
```

**Compile Crowdfunding Contract**

**Step1.** Create new directory for Crowdfunding project 

```
mkdir myCrowdFunding && cd myCrowdFunding
```

> The following commands are performed in the myCrowdFunding directory without special instructions.

**Step2.** Init project

```
alaya-truffle init
```

After the command is executed, project directory structure is as follows:

- `contracts/`: solidity contract directory
- `migrations/`: depoly file directory
- `test/`: test script directory
- `truffle-config.js`: alaya-truffle config

**Step3.** Move crowdfunding contract compiled in to `myCrowdFunding/contracts/`

```
ls myCrowdFunding/contracts/
```
> Files in the directory: `crowdFunding.sol`.

**Step4.** Fix compile version same as the version setted  in truffle-config.js

```
vim truffle-config.js
```

Truffle-config.js content is  as follows:
```
compilers: {
     solc: {
        version: "0.5.17",    //same as the version declared in CrowdFunding.sol
    }
}
```

**Step5.** Compile contract

```
alaya-truffle compile
```

After the command is executed, project directory structure is as follows:

- `build/`: solidity contract directory after compiled
- `build/contracts/CrowdFunding.json`: the compiled file corresponding with CrowdFunding.sol

**Deploly crowdfunding Contract**

**Step1.** Create deploy script 

```
cd migrations/ && touch 2_initial_CrowdFunding.js
```

Deploy script 2_initial_crowdFunding.js,content is as follows：

```
const CrowdFunding = artifacts.require("CrowdFunding"); //deployment contract class name
module.exports = function(deployer) {
      deployer.deploy(CrowdFunding,1000000,100);
};
```

**Step2.** Setting config  information for blockchain in truffle-config.js

```
vim truffle-config.js
```

Set blockchain network  info

```
networks: {
	development: {
       host: "10.1.1.6",     // blockchain server address
       port: 8806,            // server port
       network_id: "*",       // Any network (default: none)
       from: "atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp", //the accout address of deploying contract
       gas: 999999,
       gasPrice: 50000000004,
	},
}
```

**Step3.** Deploy contract

```
alaya-truffle migrate
```

After deploying successfully, you will see log info as follows:
```
Compiling your contracts...
 Everything is up to date, there is nothing to compile.
 3_initial_CrowdFunding.js
 
    Deploying 'CrowdFunding'
     transaction hash:    0x3a6419cd4169d7cfb430a1fc5632239ac4a01845827f20df9b3229a334c5488b
     Blocks: 0            Seconds: 0
     contract address:    atp1crcjuu9uwa9aukmf5dr5tq4ym6cv2kre0042ya //contract address
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


**Crowdfounding Query：**

**Step1.**  Enter the alaya-truffle console

```
alaya-truffle console
```

> You can execute command in alaya-truffle console

**Step2.**  Create contract object

```
var abi = [...]; //ABI of CrowdFunding contract,can get from build/contracts/CrowdFunding.json
var contractAddr = 'atp1crcjuu9uwa9aukmf5dr5tq4ym6cv2kre0042ya'; //CrowdFundsing contract address
var crowdFunding = new web3.platon.Contract(abi,contractAddr);
```

**Step3.**  Query the amount raised

```
crowdFunding.methods.amountRaised().call(null,function(error,result){console.log("result:" + result);}); //query the amount raised
```

**Step4.**  Crowdfunder judge the success of crowdfunding

```
crowdFunding.methods.safeWithdrawal().send({from:'atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp'}).on('data', function(event){ console.log(event);}).on('error', console.error); 
```

Call contract command description:

- `crowdFunding` is the contract object we built earlier
- `methods` fixed syntax specifying that methods in the contract will be obtained
- `safeWithdrawal` is a method in our crowdfunding contract to recover funds
- `from` caller's wallet address
- `on` listen for contract processing result events, and output error logs for failures

--------------

## Development Costs

### Introduction

In a blockchain system, developing smart contracts based on any public chain system involves the development cost of resource expenditure. For example, deploying/calling smart contracts on the network, performing energy conversion, pledge/delegation and other operations all require a certain cost. Different blockchain network development costs are different. The cost of developing smart contracts on the Alaya network is similar to that of developing on Ethereum. This manual will analyze and compare in an intuitive format, allowing users to have a clearer understanding of development costs.

### Summary

This article will use a table to compare different development costs of small, medium and large contracts, and compare Alaya with Ethereum. In terms of contracts, a simple `SET/GET` function contract is used as a small test contract. The medium-sized contract example will use an open source([eth-tweet](https://github.com/yep/eth-tweet)) contract The large contract is a smart contract that complies with the ERC20 standard.


#### Data Overview

**Simple Storage Contract**

| Platform | Contract Level | Size   | GasUsed | GasPrice            | Amount        | Remark            |
| :------- | :------------- | :----- | :------ | :------------------ | :------------ | :---------------- |
| Alaya   | Small-sized    | 0.3 kb | 76953   | 5,000,000,000 `VON` | 384765 `gVON` | 0.000384765 `ATP` |
| Ethereum | Small-sized    | 0.3 kb | 127173  | 5,000,000,000 `wei` | 635865 `Gwei` | 0.000635865 `ETH` |


**eth-tweet Contract**

| Platform | Contract Level | Size    | GasUsed | GasPrice            | Amount         | Remark            |
| :------- | :------------- | :------ | :------ | :------------------ | :------------- | :---------------- |
| Alaya   | Medium-sized   | 2.08 kb | 257065  | 5,000,000,000 `VON` | 1285325 `gVON` | 0.001285325 `ATP` |
| Ethereum | Medium-sized   | 2.08 kb | 621385  | 5,000,000,000 `wei` | 3106925 `Gwei` | 0.003106925 `ETH` |


**ERC20 Token Contract**

| Platform | Contract Level | Size    | GasUsed | GasPrice            | Amount          | Remark            |
| :------- | :------------- | :------ | :------ | :------------------ | :-------------- | :---------------- |
| Alaya   | Large-sized    | 4.45 kb | 552823  | 5,000,000,000 `VON` | 2764115  `gVON` | 0.002764115 `ATP` |
| Ethereum | Large-sized    | 4.45 kb | 1282171 | 5,000,000,000 `wei` | 6410855  `Gwei` | 0.006410855 `ETH` |


### Small-sized Contract

#### Simple Storage Contract

**Sample Code**

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

ByteCode

```
608060405234801561001057600080fd5b50610117806100206000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063262a9dff146058578063967e6e65146080578063d5dcf1271460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e1565b005b60005481565b60008054905090565b80600081905550505600a165627a7a7230582079e51340567895e1097e1c9115e778c3d982b8e71b6997c57f1ba497c56c8b3b0029
```

ByteSize：`311 byte => 0.3 kb`

###### Cost

Alaya

* GasUsed: 76953
* GasPrice: 5,000,000,000 (5 `gVON`)
* Costs:  384765 `gVON`（0.000384765 `ATP`）

Ethereum

* GasUsed: 127173 
* GasPrice: 5,000,000,000 (5 `Gwei`)
* Costs:  635865 `Gwei`（0.000635865 `ETH`）

-----------------------------------

### Medium-sized Contract 

#### Eth-Tweet

**Sample Code**

[Click to view code](https://github.com/PlatONnetwork/alaya-devdocs/blob/master/alaya-devdocs/SmartDevelopment.assets/account.sol)


ByteCode

```
6060604052341561000f57600080fd5b5b600060018190555033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b6107e88061006a6000396000f3006060604052361561008c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630c4f65bd146100915780633e450fff146100e65780635c3e426c146100fb578063ae978f0814610134578063b6db75a0146101d1578063c3ad5ecb146101fe578063ca7dc5b1146102a2578063fb46d4c5146102cb575b600080fd5b341561009c57600080fd5b6100a461033c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100f157600080fd5b6100f9610367565b005b341561010657600080fd5b610132600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506103b2565b005b341561013f57600080fd5b610147610411565b6040518080602001848152602001838152602001828103825285818151815260200191508051906020019080838360005b838110156101945780820151818401525b602081019050610178565b50505050905090810190601f1680156101c15780820380516001836020036101000a031916815260200191505b5094505050505060405180910390f35b34156101dc57600080fd5b6101e46104f7565b604051808215151515815260200191505060405180910390f35b341561020957600080fd5b61021f6004808035906020019091905050610550565b6040518080602001838152602001828103825284818151815260200191508051906020019080838360005b838110156102665780820151818401525b60208101905061024a565b50505050905090810190601f1680156102935780820380516001836020036101000a031916815260200191505b50935050505060405180910390f35b34156102ad57600080fd5b6102b5610628565b6040518082815260200191505060405180910390f35b34156102d657600080fd5b610326600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610633565b6040518082815260200191505060405180910390f35b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b90565b61036f6104f7565b156103af57600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b6103ba6104f7565b1561040d578073ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051600060405180830381858888f19350505050505b5b50565b610419610703565b600080600080600180540381526020019081526020016000206001018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104c95780601f1061049e576101008083540402835291602001916104c9565b820191906000526020600020905b8154815290600101906020018083116104ac57829003601f168201915b505050505092506000806001805403815260200190815260200160002060000154915060015490505b909192565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161490505b90565b610558610703565b60008060008481526020019081526020016000206001018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156106035780601f106105d857610100808354040283529160200191610603565b820191906000526020600020905b8154815290600101906020018083116105e657829003601f168201915b505050505091506000808481526020019081526020016000206000015490505b915091565b600060015490505b90565b600061063d6104f7565b151561066b577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90506106fd565b60a08251111561069d577ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe90506106fc565b4260008060015481526020019081526020016000206000018190555081600080600154815260200190815260200160002060010190805190602001906106e4929190610717565b50600160008154809291906001019190505550600090505b5b5b919050565b602060405190810160405280600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061075857805160ff1916838001178555610786565b82800160010185558215610786579182015b8281111561078557825182559160200191906001019061076a565b5b5090506107939190610797565b5090565b6107b991905b808211156107b557600081600090555060010161079d565b5090565b905600a165627a7a7230582004bd291e77dd5f2bfd4822ec9590d7da613bf3ef8cb6270dc7d553fa687ab1780029
```

ByteSize： `2130.5 byte => 2.08 kb`

###### Cost

Alaya

* GasUsed: 257065
* GasPrice: 5,000,000,000 (5 `gVON`)
* Costs:  1285325 `gVON`（0.001285325 `ATP`）

Ethereum

* GasUsed: 621385 
* GasPrice: 5,000,000,000 (5 `Gwei`)
* Costs:  3106925 `Gwei`（0.003106925 `ETH`）

------------------------

### Large-sized Contract 

#### ERC20 Token Contract

**Sample Code**

[Click to view code](https://github.com/PlatONnetwork/alaya-devdocs/blob/master/alaya-devdocs/SmartDevelopment.assets/token.sol)


ByteCode

```
6060604052604060405190810160405280600481526020017f56302e3100000000000000000000000000000000000000000000000000000000815250600690805190602001906200005292919062000139565b5034156200005c57fe5b604051620011cd380380620011cd833981016040528080519060200190919080518201919060200180519060200190919080518201919050505b83600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550836000819055508260039080519060200190620000f992919062000139565b5081600460006101000a81548160ff021916908360ff16021790555080600590805190602001906200012d92919062000139565b505b50505050620001e8565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200017c57805160ff1916838001178555620001ad565b82800160010185558215620001ad579182015b82811115620001ac5782518255916020019190600101906200018f565b5b509050620001bc9190620001c0565b5090565b620001e591905b80821115620001e1576000816000905550600101620001c7565b5090565b90565b610fd580620001f86000396000f300606060405236156100ad576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100c3578063095ea7b31461015c57806318160ddd146101b357806323b872dd146101d9578063313ce5671461024f57806354fd4d501461027b57806370a082311461031457806395d89b411461035e578063a9059cbb146103f7578063cae9ca511461044e578063dd62ed3e146104e8575b34156100b557fe5b6100c15b60006000fd5b565b005b34156100cb57fe5b6100d3610551565b6040518080602001828103825283818151815260200191508051906020019080838360008314610122575b805182526020831115610122576020820191506020810190506020830392506100fe565b505050905090810190601f16801561014e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561016457fe5b610199600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506105ef565b604051808215151515815260200191505060405180910390f35b34156101bb57fe5b6101c36106e2565b6040518082815260200191505060405180910390f35b34156101e157fe5b610235600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506106e8565b604051808215151515815260200191505060405180910390f35b341561025757fe5b61025f610969565b604051808260ff1660ff16815260200191505060405180910390f35b341561028357fe5b61028b61097c565b60405180806020018281038252838181518152602001915080519060200190808383600083146102da575b8051825260208311156102da576020820191506020810190506020830392506102b6565b505050905090810190601f1680156103065780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561031c57fe5b610348600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610a1a565b6040518082815260200191505060405180910390f35b341561036657fe5b61036e610a64565b60405180806020018281038252838181518152602001915080519060200190808383600083146103bd575b8051825260208311156103bd57602082019150602081019050602083039250610399565b505050905090810190601f1680156103e95780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156103ff57fe5b610434600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610b02565b604051808215151515815260200191505060405180910390f35b341561045657fe5b6104ce600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610c70565b604051808215151515815260200191505060405180910390f35b34156104f057fe5b61053b600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610f21565b6040518082815260200191505060405180910390f35b60038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105e75780601f106105bc576101008083540402835291602001916105e7565b820191906000526020600020905b8154815290600101906020018083116105ca57829003601f168201915b505050505081565b600081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a3600190505b92915050565b60005481565b600081600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101580156107b5575081600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410155b80156107c15750600082115b156109585781600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254019250508190555081600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050610962565b60009050610962565b5b9392505050565b600460009054906101000a900460ff1681565b60068054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610a125780601f106109e757610100808354040283529160200191610a12565b820191906000526020600020905b8154815290600101906020018083116109f557829003601f168201915b505050505081565b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b919050565b60058054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610afa5780601f10610acf57610100808354040283529160200191610afa565b820191906000526020600020905b815481529060010190602001808311610add57829003601f168201915b505050505081565b600081600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410158015610b535750600082115b15610c605781600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050610c6a565b60009050610c6a565b5b92915050565b600082600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925856040518082815260200191505060405180910390a38373ffffffffffffffffffffffffffffffffffffffff1660405180807f72656365697665417070726f76616c28616464726573732c75696e743235362c81526020017f616464726573732c627974657329000000000000000000000000000000000000815250602e01905060405180910390207c01000000000000000000000000000000000000000000000000000000009004338530866040518563ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001828051906020019080838360008314610ec0575b805182526020831115610ec057602082019150602081019050602083039250610e9c565b505050905090810190601f168015610eec5780820380516001836020036101000a031916815260200191505b5094505050505060006040518083038160008761646e5a03f1925050501515610f155760006000fd5b600190505b9392505050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b929150505600a165627a7a723058200cefa2ee536584300e6123cee2abeafcf9ab9388caf67ee95580f02e5587008d0029
```

ByteSize： `4557.5 byte => 4.45 kb`

###### Cost

Alaya

* GasUsed: 552823
* GasPrice: 5,000,000,000 (5 `gVON`)
* Costs:  2764115 `gVON`（0.002764115 `ATP`）

Ethereum

* GasUsed: 1282171 
* GasPrice: 5,000,000,000 (5 `Gwei`)
* Costs:  6410855 `Gwei`（0.006410855 `ETH`）

------------------------

## Best Practice

### Introduction 

This guide introduces users with some key points that need to be paid attention in the development of smart contracts, mainly in the practice of actual development. Users can use this guide to quickly understand how to set a reasonable fee for a transaction, how to avoid losing the fee due to transaction failure, and how to encode a more standardized smart contract.


### Reasonable Cost Setting

When you need to deploy a contract on the main network of Alaya, you need to set a reasonable fee limit. The fee limit refers to the upper limit of the energy consumption cost of smart contract deployment/execution in Alaya. This restriction is mainly accomplished through Gas. Gas is the fuel value of the Alaya network world, which determines the normal operation of the Alaya network ecosystem. Gas is usually used to measure how much "work" is required to perform certain actions, and these workloads are the amount of fees that need to be paid to the Alaya network in order to perform the action. In a simple understanding, Gas is the commission for network miners, and is paid by ATP. Any transaction, contract execution, and data storage on the network need to use Gas.

Alaya is similar to Ethereum's blockchain system. It uses `ATP` for payment and maintenance networks. One ATP is divided into:`mATP/uATP/gVON/mVON/kVON/VON`, and `VON` is the smallest unit.

Gas consists of two parts: GasLimit and GasPrice. `GasLimit` is the maximum` Gas` consumption (minimum 21,000) that a user is willing to pay to perform an operation or confirm a transaction. GasPrice is the unit price of each Gas.

When a user sends a transaction, GasLimit and GasPrice are set. `GasLimit * GasPrice` is the user's transaction cost, and the cost is rewarded to the miner as a commission.

The higher the GasPrice of the transaction, the higher the execution priority of the transaction and the greater the transaction cost. After each transaction is completed, the remaining unused Gas will be returned to the sender's address account. It is important to note that if the execution of the transaction fails due to the GasLimit is too low, the Gas will not be returned to the user's address at this time, and the user still needs to pay the energy cost for the failed transaction. Therefore, regardless of whether the transaction is executed successfully, the transaction sender needs to pay a certain calculation fee to the miner.

In the `Alaya` network, the maximum gas limit is` 4,700,000` and the minimum is `22,000`. Too low or too high will cause transaction failure. When deploying large contracts or calling complex functions in contracts, you can increase the gas limit, for example: `1,000,000`. If it is a normal transfer, set it to the lowest value. The specific value needs to be estimated according to the size and complexity of the contract. Before the contract is released, the interface `platon_estimateGas` can be called for approximate estimation to avoid failure due to insufficient Gas. [Click to view JSON-RPC reference documentation](/alaya-devdocs/en/Json_Rpc).

**ATP Unit Conversion**

| Unit | VON Value | VON                                   |
| :--- | :-------- | :------------------------------------ |
| VON  | 1         | 1 VON                                 |
| kVON | 1e3 VON   | 1,000                                 |
| mVON | 1e6 VON   | 1,000,000                             |
| gVON | 1e9 VON   | 1,000,000,000                         |
| ATP  | 1e18 VON  | 1,000,000,000,000,000,000             |
| mATP | 1e24 VON  | 1,000,000,000,000,000,000,000,000     |
| gATP | 1e27 VON  | 1,000,000,000,000,000,000,000,000,000 |

### Avoid Timeouts 

Sending transactions on the Alaya network does not have the concept of timeout, but it will eventually stop according to the set gas limit value. If the limit value is lower than the consumption required for contract deployment, the transaction execution fails and the corresponding processing fee will be deducted. The fee setting cannot be infinite, because in the network, the block itself has a maximum `GasLimit` value. When the GasLimit of the transaction exceeds this value, the transaction will not be accepted.

If the call function of a published contract is called (a call is a stateless operation in the contract logic), there is a 5s timeout limit. If the contract logic is not executed within 5s, a timeout will occur and the virtual machine will forcely exit , causing the query to fail.

To avoid contract-related transaction failures, try breaking large contracts into smaller pieces and referencing each other as needed. To avoid infinite loops, be aware of common pitfalls and recursive calls.

### Punishment For Illegal Operations

If the smart contract is not compiled by a standard valid compiler, or the instruction code is changed at will, the opcode will be invalid. This type of contract not only fails to be deployed and executed successfully, but also generates a full amount (`GasLimit * GasPrice`) penalty. The transaction fee for the current transaction will be deducted. This is a very strong penalty. If the operator does not pay attention to this point and keep retrying, then the cost will be higher and the cost will be heavier.

In general, invalid opcodes have the following conditions:

1. Manually changed the instruction code for the normally compiled contract;
2. The contract compiler version is not consistent with the contract version supported by the network lock;

When operating a contract in the Alaya network. First, you must confirm the smart contract version supported by the current network, and then select the compiler of the corresponding version pair.

The normal operation is to use the latest `Truffle`/`PlatON-CDT` officially provided by Alaya to compile/deploy/execute the contract. At the same time, before switching to the main network, it must be validated on the test network.


### Coding Standards

#### Naming Rules

Basic Rules:

* Use complete descriptive information that accurately describes variables, fields, classes, interfaces, etc.
* Use mixed case (except special characters) to improve the readability of the name.
* Use terminology within the blockchain industry.
* Use as few abbreviations as possible. If you must use them, it is recommended to use public abbreviations and custom abbreviations.
* Avoid using names that are similar or just distinguish between upper and lower case.
* The directory uses lowercase uniformly, without special symbols.
* For smart contracts, the file name is consistent with the contract name.
* The naming suggestion is to use the hump name uniformly.


#### Document Format For Smart Contracts

File Layout Rules:

* Generally more than 1000 lines of program code is difficult to read, try to avoid the situation that the number of lines of code in a file is too long. Each contract document should contain only a single contract class or contract interface.

Order Of Files:

* Notes on files: All contract source files have a note at the beginning, which lists the copyright statement, file name, function description, and creation and modification records of the file.
* File/Package reference: In the contract source file, the first non-comment line is the compiler version, followed by the reference statement.
* Remarks for class or interface: Comments should be made before class and interface definitions, including descriptions of classes and interfaces, latest modifiers, version numbers, reference links, etc.
* The order of member variables: first the public level, then the protection level, and finally the private level.
* Functions: Functions within a contract should be grouped by module, not by scope or access permissions.


#### Suggestions

* In the smart contract, to get the value of the state variable modified by the public, there is no need to write a function of `get`.
* In a smart contract, if an anonymous function modified by payable is added to the contract, the contract address can accept ATP transfers.

-----------------

## Contract Security Development Guide

In Solidity, you can use smart contracts to handle tokens or, possibly, even more valuable things. Furthermore, every execution of a smart contract happens in public and, in addition to that, the source code is often available. In the blockchain world, contracts have always been the main point of attack for hackers, and they have also caused very large losses. Therefore, the security development of the contract is very important. You can consider the following aspects to improve the security of the contract.

### Compiler Bug

First, you must understand the bugs of the Solidity compiler itself, and try to avoid the version of the compiler in question or the use of the problem. Solidity compiler bug list: https://solidity.readthedocs.io/en/latest/bugs.html.

### Standard Contract Development Process

If you want to solve the security problem of smart contracts, you must develop contracts according to standard processes.

1. The detailed design must be completed first, taking into account various scenarios and abnormal situations. Avoid unclear and incompletely introduced bugs.
2. During development, to be modular and concise, complexity will increase the risk of errors.
3. Before the contract is deployed to the mainnet, the contract must be adequately reviewed and tested.
4. Keep an eye on the operation status of the contract. In an emergency, you can destroy the contract or provide a similar emergency freeze function.

### Common Pitfalls

#### Private Information and Randomness

Everything you use in a smart contract is publicly visible, even local variables and state variables marked `private`.

Using random numbers in smart contracts is quite tricky if you do not want miners to be able to cheat(The use of random numbers in smart contracts is difficult to ensure that nodes do not cheat. This is because random numbers in smart contracts generally rely on the local time of the computing node, and local time can be forged by malicious nodes. Therefore, this method is not safe. A common practice is to use off-chain third-party services such as Oraclize to obtain random numbers).

#### Re-Entrancy

Any interaction from a contract (A) with another contract (B) and any transfer of Ether hands over control to that contract (B). This makes it possible for B to call back into A before this interaction is completed. To give an example, the following code contains a bug (it is just a snippet and not a complete contract):

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

The problem is not too serious here because of the limited gas as part of `send`, but it still exposes a weakness: Ether transfer can always include code execution, so the recipient could be a contract that calls back into `withdraw`. This would let it get multiple refunds and basically retrieve all the Ether in the contract. In particular, the following contract will allow an attacker to refund multiple times as it uses `call` which forwards all remaining gas by default:

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

To avoid re-entrancy, you can use the Checks-Effects-Interactions pattern as outlined further below:

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

Note that re-entrancy is not only an effect of Ether transfer but of any function call on another contract. Furthermore, you also have to take multi-contract situations into account. A called contract could modify the state of another contract you depend on.

#### Gas Limit and Loops

Loops that do not have a fixed number of iterations, for example, loops that depend on storage values, have to be used carefully: Due to the block gas limit, transactions can only consume a certain amount of gas. Either explicitly or just due to normal operation, the number of iterations in a loop can grow beyond the block gas limit which can cause the complete contract to be stalled at a certain point. This may not apply to `view` functions that are only executed to read data from the blockchain. Still, such functions may be called by other contracts as part of on-chain operations and stall those. Please be explicit about such cases in the documentation of your contracts.

#### Sending and Receiving Ether

- Neither contracts nor “external accounts” are currently able to prevent that someone sends them Ether. Contracts can react on and reject a regular transfer, but there are ways to move Ether without creating a message call. One way is to simply “mine to” the contract address and the second way is using `selfdestruct(x)`.
- If a contract receives Ether (without a function being called), either the receive Ether or the fallback function is executed. If it does not have a receive nor a fallback function, the Ether will be rejected (by throwing an exception). During the execution of one of these functions, the contract can only rely on the “gas stipend” it is passed (2300 gas) being available to it at that time. This stipend is not enough to modify storage (do not take this for granted though, the stipend might change with future hard forks). To be sure that your contract can receive Ether in that way, check the gas requirements of the receive and fallback functions.
- There is a way to forward more gas to the receiving contract using `addr.call{value: x}("")`. This is essentially the same as `addr.transfer(x)`, only that it forwards all remaining gas and opens up the ability for the recipient to perform more expensive actions (and it returns a failure code instead of automatically propagating the error). This might include calling back into the sending contract or other state changes you might not have thought of. So it allows for great flexibility for honest users but also for malicious actors.
- Use the most precise units to represent the wei amount as possible, as you lose any that is rounded due to a lack of precision.
- If you want to send Ether using `address.transfer`, there are certain details to be aware of:
  1. If the recipient is a contract, it causes its receive or fallback function to be executed which can, in turn, call back the sending contract.
  2. Sending Ether can fail due to the call depth going above 1024. Since the caller is in total control of the call depth, they can force the transfer to fail; take this possibility into account or use `send` and make sure to always check its return value. Better yet, write your contract using a pattern where the recipient can withdraw Ether instead.
  3. Sending Ether can also fail because the execution of the recipient contract requires more than the allotted amount of gas (explicitly by using `require`, `assert`, `revert` or because the operation is too expensive) - it “runs out of gas” (OOG). If you use `transfer` or `send` with a return value check, this might provide a means for the recipient to block progress in the sending contract. Again, the best practice here is to use a [“withdraw” pattern instead of a “send” pattern](https://solidity.readthedocs.io/en/latest/common-patterns.html#withdrawal-pattern)。

#### Callstack Depth

External function calls can fail any time because they exceed the maximum call stack of 1024. In such situations, Solidity throws an exception. Malicious actors might be able to force the call stack to a high value before they interact with your contract.

Note that `.send()` does **not** throw an exception if the call stack is depleted but rather returns `false` in that case. The low-level functions `.call()`, `.delegatecall()` and `.staticcall()` behave in the same way.

#### tx.origin

Never use tx.origin for authorization. Let’s say you have a wallet contract like this:

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

Now someone tricks you into sending Ether to the address of this attack wallet:

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

If your wallet had checked `msg.sender` for authorization, it would get the address of the attack wallet, instead of the owner address. But by checking `tx.origin`, it gets the original address that kicked off the transaction, which is still the owner address. The attack wallet instantly drains all your funds.

#### Two’s Complement / Underflows / Overflows

As in many programming languages, Solidity’s integer types are not actually integers. They resemble integers when the values are small, but behave differently if the numbers are larger. For example, the following is true: `uint8(255) + uint8(1) == 0`. This situation is called an *overflow*. It occurs when an operation is performed that requires a fixed size variable to store a number (or piece of data) that is outside the range of the variable’s data type. An *underflow* is the converse situation: `uint8(0) - uint8(1) == 255`.

In general, read about the limits of two’s complement representation, which even has some more special edge cases for signed numbers.

Try to use `require` to limit the size of inputs to a reasonable range and use the [SMT checker](https://solidity.readthedocs.io/en/latest/layout-of-source-files.html#smt-checker) to find potential overflows, or use a library like [SafeMath](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/math/SafeMath.sol) if you want all overflows to cause a revert.

Code such as `require((balanceOf[_to] + _value) >= balanceOf[_to])` can also help you check if values are what you expect.

#### Clearing Mappings

The Solidity type `mapping` (see [Mapping Types](https://solidity.readthedocs.io/en/latest/types.html#mapping-types)) is a storage-only key-value data structure that does not keep track of the keys that were assigned a non-zero value. Because of that, cleaning a mapping without extra information about the written keys is not possible. If a `mapping` is used as the base type of a dynamic storage array, deleting or popping the array will have no effect over the `mapping` elements. The same happens, for example, if a `mapping` is used as the type of a member field of a `struct` that is the base type of a dynamic storage array. The `mapping` is also ignored in assignments of structs or arrays that containing a `mapping`.

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

Consider the example above and the following sequence of calls: `allocate(10)`, `writeMap(4, 128, 256)`. At this point, calling `readMap(4, 128)` returns 256. If we call `eraseMaps`, the length of state variable `array` is zeroed, but since its `mapping` elements cannot be zeroed, their information stays alive in the contract’s storage. After deleting `array`, calling `allocate(5)` allows us to access `array[4]` again, and calling `readMap(4, 128)` returns 256 even without another call to `writeMap`.

If your `mapping` information must be deleted, consider using a library similar to [iterable mapping](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol), which allows you to traverse the keys and delete their values in the appropriate `mapping`.

#### Permission Control Error

In smart contracts, contract developers usually set some permission for the contract owner, but if the developer negligently writes wrong function permissions, it may lead to serious consequences such as transfer of the owner.

```
function initContract() public {
    owner = msg.reader;
}
```

The above code function needs to be set onlyOwner.

Reasonable permissions should be set for different functions in the contract.

#### Address Initialization Problem

In EVM, all address-related initializations are given an initial value of 0.

If an address variable is equal to 0, the variable may not be initialized or an unknown error may occur.

If the developer initializes an address variable in the code but does not assign an initial value, or the user does not assign the address variable by mistake when initiating an operation, but this variable needs to be handled in the following code, it is possible Cause unnecessary security risks.

For functions that involve addresses, it is recommended to add require (_to! = Address (0)) verification to effectively avoid unnecessary losses caused by user misoperations or unknown errors.

#### Transaction Order Dependent

Since transactions are first stored in mempool in a short period of time, it is possible to know what action will take place before miners package them into blocks. This is troublesome for a decentralized market, because the transaction information of the token can be viewed, and the transaction order can be changed before it is packaged into a block. Avoiding this is difficult because it comes down to the specific contract itself.

For example, in the market, it is best to implement batch auctions (this also prevents high frequency trading issues). Another method is using a pre-commit scheme.

#### Minor Details

Types that do not occupy the full 32 bytes might contain “dirty higher order bits”. This is especially important if you access `msg.data` - it poses a malleability risk: You can craft transactions that call a function `f(uint8 x)` with a raw byte argument of `0xff000001` and with `0x00000001`. Both are fed to the contract and both will look like the number `1` as far as `x` is concerned, but `msg.data` will be different, so if you use `keccak256(msg.data)` for anything, you will get different results.

### Security Recommendations

#### Take Warnings Seriously

If the compiler warns you about something, you should better change it. Even if you do not think that this particular warning has security implications, there might be another issue buried beneath it. Any compiler warning we issue can be silenced by slight changes to the code.

Always use the latest version of the compiler to be notified about all recently introduced warnings.

#### Restrict the Amount of Ether

Restrict the amount of Ether (or other tokens) that can be stored in a smart contract. If your source code, the compiler or the platform has a bug, these funds may be lost. If you want to limit your loss, limit the amount of Ether.

#### Simple and Modular 

Keep your contracts small and easily understandable. Single out unrelated functionality in other contracts or into libraries. General recommendations about source code quality of course apply: Limit the amount of local variables, the length of functions and so on. Document your functions so that others can see what your intention was and whether it is different than what the code does.

#### Use the Checks-Effects-Interactions Pattern

Most functions will first perform some checks (who called the function, are the arguments in range, did they send enough Ether, does the person have tokens, etc.). These checks should be done first.

As the second step, if all checks passed, effects to the state variables of the current contract should be made. Interaction with other contracts should be the very last step in any function.

Early contracts delayed some effects and waited for external function calls to return in a non-error state. This is often a serious mistake because of the re-entrancy problem explained above.

Note that, also, calls to known contracts might in turn cause calls to unknown contracts, so it is probably better to just always apply this pattern.

#### Include a Fail-Safe Mode

While making your system fully decentralised will remove any intermediary, it might be a good idea, especially for new code, to include some kind of fail-safe mechanism:

You can add a function in your smart contract that performs some self-checks like “Has any Ether leaked?”, “Is the sum of the tokens equal to the balance of the contract?” or similar things. Keep in mind that you cannot use too much gas for that, so help through off-chain computations might be needed there.

If the self-check fails, the contract automatically switches into some kind of “failsafe” mode, which, for example, disables most of the features, hands over control to a fixed and trusted third party or just converts the contract into a simple “give me back my money” contract.

#### Check Function Permissions Carefully

Reasonable permissions should be set for different functions in the contract.

Check whether the functions in the contract use public and private keywords for visibility modification. Check whether the contract is correctly defined and uses modifiers to restrict access to key functions to avoid problems caused by unauthorized use.

```
function initContract() public OnlyOwner {
    owner = msg.reader;
}
```

#### Ask for Peer Review

The more people examine a piece of code, the more issues are found. Asking people to review your code also helps as a cross-check to find out whether your code is easy to understand - a very important criterion for good smart contracts.

#### Other

1. [More Security Recommendations ](https://github.com/guylando/KnowledgeLists/blob/master/EthereumSmartContracts.md)
2. [Contract Best Practices](https://consensys.github.io/smart-contract-best-practices/)

### Security Tools

1. Ethereum formal verification tool [SMT checker](https://solidity.readthedocs.io/en/latest/layout-of-source-files.html#smt-checker) .
2. Formal verification tools: [offline VS Code plugin](https://marketplace.visualstudio.com/items?itemName=Beosin.beosin-vaas-eth)，and [Online version](https://beosin.com/vaas/index.html#/audit/ptsj) .
3. Remix integrated security scan plugin: [MythX](https://docs.mythx.io/en/latest/)。

### Third Party Audit

You can find a professional third-party audit company for security audits, such as：[slow mist](https://www.slowmist.com/en/service-smart-contract-security-audit.html)。

---

## FAQ

### About Compile

1. How many commands in alaya-truffle？

   Refer to  alaya-truffle develop guide [Reference here](https://platon-truffle.readthedocs.io/en/alaya/).

2. Why contract syntax cannot be verified?

   Solidity 0.4.x has a great different with 0.5.x, detail info refer to [Reference here](https://solidity.readthedocs.io/en/develop/).

3. Why truffle doesn't compile?

   Confirm the contract version same as the version specified in the truffle-config.js.
   Contract syntax be writed in a wrong way.

4. Why the contract can not be deployed by truffle migrate?

   Confrim the blockchain network info be configured correctly.
   Confirm the account address be configured correctly.

5. Deploying a contract with a parameter constructor using the command `truffle migrate` failed.

    For example, A.sol 
    ```
    Constructor(uint256 a, string memory b, string memory c) public {}
    ```
    2_initial_A.js configured as follow：
    ```
    const A = artifacts.require("A");  
    module.exports = function(deployer) {
            deployer.deploy(A,100,'PLA','PLAT');//pass the corresponding construction parameters
    };
    ```




