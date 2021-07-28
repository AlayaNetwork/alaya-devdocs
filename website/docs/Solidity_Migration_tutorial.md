---
id: Solidity_Migration_tutorial
title: Migration tutorial
sidebar_label: Migration tutorial
---

### Introduction

Alaya supports four versions of solidity: 0.4.26, 0.5.17, 0.6.12, and 0.7.1. If you migrate contracts with versions above 0.7.1, you need to reduce the version number and remove the syntax related to the higher version.

If you want to migrate Ethereum's smart contract to Alaya, you can do this with the alaya-truffle development tool. First, to make sure have alaya-truffle installed correctly, just follow these steps.

The migration of Ethereum's ERC200513Token contract to Alaya is demonstrated below. ERC200513Token.sol contract are as follows:
```
pragma solidity 0.5.17;

contract ERC200513Token {
    string public name; // ERC20 token name
    string public symbol; // ERC20 token abbreviation
    uint8 public decimals = 18;  //18 decimals is the strongly suggested default, avoid changing it
    uint256 public totalSupply = 10000000000000000000 ether; // total supply

    // Use mapping to save the balance corresponding to each address
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    //This generates a public event on the blockchain that will notify clients
    event Transfer(address indexed from, address indexed to, uint256 value);

    // Event, used to notify the client that the token is burned
    event Burn(address indexed from, uint256 value);

    /**
     * Initialization structure
     */
    constructor(uint256 initialSupply, string memory tokenName, string memory tokenSymbol) public {
        totalSupply = initialSupply * 10 ** uint256(decimals); // Update total supply with the decimal amount
        balanceOf[msg.sender] = totalSupply; // Give the creator all initial tokens
        name = tokenName; // Set the name for display purposes    
        symbol = tokenSymbol; 
    }
    /**
     * Return token name
     */
    function getName() view public returns (string memory){
        return name;
    }

    /**
     * Return token symbol
     */
    function getSymbol() view public returns (string memory){
        return symbol;
    }
    
   /**
      * Return the minimum split amount of the token
      */
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

> The following commands are carried out in the example directory if without special instructions

**Step2.**  Use alaya-truffle to initialize a project

```
alaya-truffle init
```

After the command is executed, the structure of the project directory is as follows:

- `contracts/`: Solidity contract directory

- `migrations/`: Directory of script files deployed

- `test/`: Directory of test scripts

- `truffle-config.js`: alaya-truffle configuration file

**Step3.** Put the Ethereum contract file `ERC200513Token.sol` into the `example/contract`s directory

```
ls contracts/
```

- You will see `ERC200513Token.sol`
- The currency units in the Alaya smart contract are ATP and VON. To migrate the Ethereum smart contract to Alaya, change the denomination of Ether to Alaya denomination. At the same time pay attention to the ether/ATP market exchange rate (in this contract we assume that the market exchange rate is 1:1, and change uint256 public totalSupply = 10000000000000000000 ether to uint256 public totalSupply = 10000000000000000000 atp;)
- The compiled version modifies the version supported by Alaya.
- modify address: `require(_to != address(0x0)` modify to `require(_to != address("atx1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq89qwkc") || _to != address("atp1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqdruy9j"))`
- In the Alaya smart contract, block.timestamp represents the timestamp of the current block in milliseconds, and Ethereum uses seconds as the unit.

**Step4.** Modify the compiled version number and chain related configuration in `truffle-config.js`

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

Deploy `script 2_initial_ERC200513Token.js` content is as follows：
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
