---
id: Solidity_Getting_started
title: Getting started
sidebar_label: Getting started
---

## Introduction

This tutorial is mainly to guide users to create a simple HelloWorld smart contract using solidity language on Alaya, compile, deploy, and call this contract through alaya-truffle. If you want to experience a more versatile API, you can refer to  [Java SDK](/alaya-devdocs/en/Java_SDK) and  [JS SDK](/alaya-devdocs/en/JS_SDK) development guide.

- For the syntax of solidity smart contracts, please refer to [Solidity Official Documentation](https://solidity.readthedocs.io/en/develop/)

- Before developing the contract, if you need to build a node to connect to the Alaya network or create a private network, please refer to: [Connect to Alaya Network](/alaya-devdocs/en/Join_Alaya_NetWork)



## Alaya-truffle Introduction

Alaya-truffle is a tool provided by PlatON that can compile, deploy, and call smart contracts locally. For specific installation and usage manuals, refer to:

- Alaya-truffle development tools [installation](https://platon-truffle.readthedocs.io/en/alaya/getting-started/installation.html)
- Alaya-truffle development tool [usage manuals](https://platon-truffle.readthedocs.io/en/alaya/)



## Create HelloWorld Contract

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
    -	`pragma solidity`: Solidity version statement
    -	`0.5.17`：Solidity version
    -	`^` ：Indicates upward compatibility, that is, it can be compiled with a compiler above 0.5.17
- contract HelloWorld
    -	`contract`：The keyword of the contract statement
    -	`HelloWorld`：The name of the current contract
- string name
    -	`name`：State variable of the contract
    -	`string`：It indicates the type of this state variable
- function setName(string memory _name) public returns(string memory)
    -	`function`：The name of this function
    -	`setName`：The name of this function
    -	`memory`： It declares the storage location of the _name parameter (function input parameters and output parameters of string type must be declared as memory）
    -	`\_name` ：Local variable of this function
    -	`public`：It declares the visibility of this function
    -	`name` = \_name： It assigns the local variable passed in from the outside to the state variable
- function getName() public view returns(string memory)
    -	`view`:  If a function has the view keyword, this function will not change the value of the state variable in the contract (mainly used for query)

## Compile HelloWorld Contract

**Step1.**  Create a new directory for the HelloWorld project

```
mkdir HelloWorld && cd HelloWorld
```

> The following commands are carried out in the HelloWorld directory if without special instructions.

**Step2.**  Use alaya-truffle to initialize a project

```
alaya-truffle init
```
After the command is executed, the structure of the project directory is as follows:

- `Contracts/`: Solidity contract directory

- `Migrations/`:  Directory of the depolyment file

- `Test/`: Directory of test scripts

- `Truffle-config.js`: Alaya-truffle configuration files

**Step3.**  Move the HelloWorld contract compiled under `HelloWorld/contracts/`

```
ls contracts/
```
> You will see `HelloWorld.sol`.

**Step4.**  Modify the aaya-truffle configuration file `truffle-config.js`, and modify the compiler version to the version number in the corresponding solidity contract

```
vim truffle-config.js
```

The modified contents of `truffle-config.js` are as follows:
```
compilers: {
      solc: {
            version: "^0.5.17",    // This version number is consistent with the version number declared in HelloWorld.sol
      }
}
```

**Step5.**  Compile contract

```
alaya-truffle compile
```
After the command is executed, the structure of the project directory is as follows:

- `Build/`: The directory where the Solidity contract is compiled

- `Build/contracts/HelloWorld.json`: The compiled file corresponding to `HelloWorld.sol`


## Deploly HelloWorld Contract

**Step1.** Add the contract deployment script file:

```
cd migrations/ && touch 2_initial_helloworld.js
```
It is recommended to name the deployment script file with the contract name for the sake of subsequent maintenance. For example, the deployment script file corresponding to the HelloWorld contract is `2_initial_helloworld.js`, and the content is as follows:
```
const helloWorld = artifacts.require("HelloWorld"); //artifacts.require tells aaya-truffle which contract needs to be deployed. 
	module.exports = function(deployer) {
       deployer.deploy(helloWorld); //Failed to deploy contract with parameters, please refer to FAQ
};
```

**Step2.** Modify the configuration information of `truffle-config.js` in the chain

```
vim truffle-config.js
```
Modify the blockchain-related configuration in `truffle-config.js` to the chain configuration of your real connection:

```
networks: {
	development: {
       host: "10.1.1.6",     // Blockchain server host
       port: 8806,            // Chain port number
       network_id: "*",       // Any network (default: none)
       from: "atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp", //The wallet address of the deployment contract account
       gas: 999999,
       gasPrice: 50000000004,
	},
}
```



**step3.**  Unlock wallet account

Enter the alaya-truffle console:

```
alaya-truffle console
```

Import the private key (you can skip this step if you have already imported it):
```
web3.platon.personal.importRawKey("Your wallet private key","Your wallet password");
```
You will see the address corresponding to the private key after importing it:
```
'atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp'
```

Unlock wallet account
```
 web3.platon.personal.unlockAccount('Your wallet address','Your wallet password',999999);
```
After unlocking it successfully, you will see the following information：
```
ture
```

**Step4.**  Deploy contract

```
alaya-truffle migrate
```

After successful deployment，you will see log info as follows:
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

## Call HelloWorld Contract

**Step1.**  Enter the alaya-truffle console

```
alaya-truffle console
```
You can execute the command in alaya-truffle console

**Step2.**  Create contract object

```json
var abi = [{"constant":false,"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"setName","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getName","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]; //you can refet to HelloWorld/build/contracts/HelloWorld.json

var contractAddr = 'atp1c5xxup4au4pqkgkm6a3p6hj3x0vvekdj52z2la';//contract address
var helloWorld = new web3.platon.Contract(abi,contractAddr);  
```

Description：

- `abi` is the interface provided by the contract for external calls. The abi corresponding to each contract can be found in the compiled file, such as: `HelloWorld/build/contracts/HelloWorld.json`
- `contractAddr`  has a contract address after deploying the contract successfully
- `helloWorld` is the abstraction of contract objects constructed to interact with on-chain contracts

**Step3.**  Call contract

```javascript
helloWorld.methods.setName("hello world").send({from: 'atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp'}).on('receipt', function(receipt) {console.log(receipt);}).on('error', console.error);
```

Description：

- `helloWorld`  is the contract object built before
- `methods`  is the fixed syntax, followed by the method name of the contract
- `setName` is a method in the HelloWorld contract. It has an input parameter of type String, where the input parameter is `hello world`
- `from`  is the wallet address of the caller
- `on` is to monitor the event of the contract processing result. If it succeeds, a receipt will be printed, or an error log will be output if it fails:

After the function call is successful, you will see the log info as below:

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

- `helloWorld` is the contract object built before
- `methods` specifies that the methods in the contract will be obtained
- `getName` is a method in the HelloWorld contract. This method has no input parameters, so the input parameters are empty
- `call`  indicates the query method
- `function`  is a callback function that will process the result of the call. Here we print the execution result through `console.log`



------------------

## Crowdfunding Contract

### Introduction

In the following example, we will use the contract for a crowdfunding. The contract creator initiates crowdfunding and initializes the number of tokens for crowdfunding and the duration of crowdfunding. If completed within the specified time, the crowdfunding is successful, and the crowdfunding access will be closed. As a result, a certain number of tokens obtained according to a fixed exchange rate will be minted and credited in the buyer's name. Otherwise, the crowdfunding fails, and the crowdfunding amount is returned to investors.

Two roles are set in the contract

- Crowdfunders
- Investors

### Crowdfunding Process

- Create a crowdfunding contract, and designate the beneficiary
- Deploy the contract to initialize the number and duration of crowdfunding tokens
- Investors make investments
- Determine whether the crowdfunding is over:
    - If the crowdfunding has reached the target amount before the deadline, the access is closed, and tokens are allocated proportionally to investors. The crowdfunding succeeds.
    - If the crowdfunding has reached the target amount upon the deadline, tokens are allocated proportionally to investors. The crowdfunding succeeds.
    - If the crowdfunding has not reached the target amount upon the deadline, tokens are returned to investors. The crowdfunding fails.

### Crowdfunding Contract

```
pragma solidity ^0.5.17;

contract CrowdFunding {
    address payable public beneficiaryAddress = address(uint160(0)); //Beneficiary address, set as contract creator
    uint256 public fundingGoal = 100 atp;  //Crowdfunding target, with the unit as ATP
    uint256 public amountRaised = 0; //The amount of money raised, the unit is VON
    uint256 public deadline; //Deadline
    uint256 public price;  //token price
    bool public fundingGoalReached = false;  //The crowdfunding target is reached
    bool public crowdsaleClosed = false; //Crowdfunding is closed

    mapping(address => uint256) public balance; //Save the amount donated by crowdfunders
    
    mapping(address => uint256) public tokenMap; //Save the number of tokens owned by the crowdfunder

    //Record received ATP notifications
    event GoalReached(address _beneficiaryAddress, uint _amountRaised);

    //Transfer notification
    event FundTransfer(address _backer, uint _amount, bool _isContribution);
    
    //Check whether the address is empty
    modifier validAddress(address _address) {
        require(_address != address(uint160(0)));
        _;
    }

    /**
     * Initialization constructor
     *
     * @param _fundingGoalInlats: Total crowdfunding amount of ATP
     * @param _durationInMinutes: Crowdfunding deadline, with the unit as minute
     */
    constructor (
        uint _fundingGoalInlats,
        uint _durationInMinutes
    )public {
	    beneficiaryAddress = msg.sender;
        fundingGoal = _fundingGoalInlats * 1 atp;
        deadline = now + _durationInMinutes * 1 minutes;
        price = 500 finney; //You can buy 2 tokens with 1 ATP
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

**Step1.** Create a new directory for a crowdfunding project

```
mkdir myCrowdFunding && cd myCrowdFunding
```

> The following commands are performed in the myCrowdFunding directory if without special instructions

**Step2.** Initialize a project using alaya-truffle 

```
alaya-truffle init
```

After the command is executed, the structure of the project directory is as follows:

- `contracts/`: Solidity contract directory
- `migrations/`: Directory of the depolyment file
- `test/`: Directory of test scripts
- `truffle-config.js`: Alaya-truffle configuration file

**Step3.** Move the crowdfunding contract compiled under `myCrowdFunding/contracts/`

```
ls myCrowdFunding/contracts/
```
> Files in the directory: `crowdFunding.sol`.

**Step4.**  Modify the alaya-truffle configuration file `truffle-config.js` and add the compiled solidity contract version number

```
vim truffle-config.js
```

The modified contents of `truffle-config.js` are as follows:
```
compilers: {
     solc: {
        version: "0.5.17",    //This version number is consistent with the version number declared in CrowdFunding.sol
    }
}
```

**Step5.** Compile contract

```
alaya-truffle compile
```

After the command is executed, the structure of the project directory is as follows:

- `build/`: The directory of the Solidity contract compiled
- `build/contracts/CrowdFunding.json`: Compiled file corresponding to `CrowdFunding.sol`

**Deploly crowdfunding Contract**

**Step1.** Create deploy script

```
cd migrations/ && touch 2_initial_CrowdFunding.js
```

Deploy script 2_initial_crowdFunding.js, content is as follows：

```
const CrowdFunding = artifacts.require("CrowdFunding"); //deployment contract class name
module.exports = function(deployer) {
      deployer.deploy(CrowdFunding,1000000,100);
};
```

**Step2.**  Modify the configuration information of `truffle-config.js` in the chain

```
vim truffle-config.js
```

Modify the blockchain-related configuration in `truffle-config.js` to the chain configuration of your real connection

```
networks: {
	development: {
       host: "10.1.1.6",     // Blockchain server host
       port: 8806,            // Chain port number
       network_id: "*",       // Any network (default: none)
       from: "atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp", //Wallet address of the deployment contract account
       gas: 999999,
       gasPrice: 50000000004,
	},
}
```

**Step3.** Deploy contract

```
alaya-truffle migrate
```

After successful deployment，you will see log info as follows:
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

**Query the crowdfunding progress**：**

**Step1.**  Enter the alaya-truffle console

```
alaya-truffle console
```

> You can execute the command in alaya-truffle console

**Step2.**  Create a crowdfunding contract object

```
var abi = [...]; //The ABI of the crowdfunding contract, accessed from the compiled file
var contractAddr = 'atp1crcjuu9uwa9aukmf5dr5tq4ym6cv2kre0042ya'; //CrowdFundsing contract address
var crowdFunding = new web3.platon.Contract(abi,contractAddr);
```

**Step3.**  Query the amount raised

```
crowdFunding.methods.amountRaised().call(null,function(error,result){console.log("result:" + result);}); //query the amount raised
```

**Step4.**  Crowdfunder judges whether the crowdfunding is successful

```
crowdFunding.methods.safeWithdrawal().send({from:'atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp'}).on('data', function(event){ console.log(event);}).on('error', console.error); 
```

Call contract command description:

- `crowdFunding`  is the contract object we built before
- `methods` is the fixed syntax, specifying the methods in the contract that will be accessed
- `safeWithdrawal` is a method in our crowdfunding contract to recover funds
- `from` is the wallet address of the caller
- `on` is to monitor the event of the contract processing result. If it succeeds, a receipt will be printed, or an error log will be output if it fails

--------------

## FAQ

### About Compile

1. What are the commands of alaya-truffle and how to use them?

   For Alaya-truffle Development Manual, [refer here](https://platon-truffle.readthedocs.io/en/alaya/).

2. Why does the contract fail to pass the syntax verification?

   There are major changes between solidity contract 0.4.x version and 0.5.x version. For the specific syntax, [refer here](https://solidity.readthedocs.io/en/develop/)

3. What if Alaya-truffle failed to execute truffle compile?

   Confirm whether the version number in the compiled contract file is consistent with the version number specified in `truffle-config.js`.
   The syntax may be wrong. You can fix it according to the command line prompts before compiling.

4. What if Alaya-truffle failed to execute truffle migrate deployment contract?

   Confirm whether the configuration information of the connected chain in `truffle-config.js` and the user's wallet address are correct.
   
5. What if truffle failed to deploy a constructor contract with parameters?

   Take the contract A.sol as an example. In the `migrations/2_initial_A.js file`, confirm whether to add the construction parameter information. For example: The A.sol constructor format is as follows:
    ```
    Constructor(uint256 a, string memory b, string memory c) public {}
    ```
   The `2_initial_A.js` file configuration is as follows:
    ```
    const A = artifacts.require("A");  
    module.exports = function(deployer) {
            deployer.deploy(A,100,'PLA','PLAT');//pass the corresponding construction parameters
    };
    ```
