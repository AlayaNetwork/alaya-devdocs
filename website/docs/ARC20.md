---
id: ARC20
title: ARC20
sidebar_label: ARC20
---

## Abstract

The ARC-20 standard allows for the implementation of a standard API for tokens within smart contracts. This standard provides basic functionality to transfer tokens, as well as allow tokens to be approved so they can be spent by another on-chain third party. It is fully compatible with [ERC-20](https://eips.ethereum.org/EIPS/eip-20).

## Token Standards

ARC-20 is a standard for convertible fungible tokens. The contract standard specifies contract-defined functions, events, etc. All contracts written in compliance with this standard are considered to be an ARC-20 contract.


``` solidity
contract ARC20 {

	  //required
    function totalSupply() constant returns (uint theTotalSupply);
    function balanceOf(address _owner) constant returns (uint balance);
    function transfer(address _to, uint _value) returns (bool success);
    function transferFrom(address _from, address _to, uint _value) returns (bool success);
    function approve(address _spender, uint _value) returns (bool success);
    function allowance(address _owner, address _spender) constant returns (uint remaining);
	
	  //optional
	  function name() public view returns (string);
	  function symbol() public view returns (string);
	  function decimals() public view returns (uint8);
	
	  //events
    event Transfer(address indexed _from, address indexed _to, uint _value);
    event Approval(address indexed _owner, address indexed _spender, uint _value);
}
```

### Required interfaces

- totalSupply

Returns the total token supply.

- balanceOf

Returns the account balance of another account with address _owner.

- transfer

Transfers _value amount of tokens to address _to, and MUST fire the Transfer event. The function SHOULD throw if the message caller’s account balance does not have enough tokens to spend.

- approve

MUST trigger on any successful call to approve(address _spender, uint256 _value).

- transferFrom

Transfers _value amount of tokens from address _from to address _to, and MUST fire the Transfer event.

- allowance

Allows _spender to withdraw from your account multiple times, up to the _value amount. If this function is called again it overwrites the current allowance with _value.

### Optionally interfaces

- name

Return the name of the token.

- symbol

Return token symbol.

- decimals

Return Token Accuracy.

### Event

- Transfer

MUST trigger when tokens are transferred, including zero value transfers.
A token contract which creates new tokens SHOULD trigger a Transfer event with the _from address set to 0x0 when tokens are created.

- Approval

MUST trigger on any successful call to approve(address _spender, uint256 _value).

## Example

ARC-20 standard is fully compatible with ERC-20, examples are available [here](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/9b3710465583284b8c4c5d2245749246bb2e0094/contracts/token/ERC20)。

## View Token

You can view ARC20 Token and transaction history in [Alaya Explorer](https://scan.alaya.network/tokens/tokensTranfer/arc20) and [ATON Wallet](/alaya-devdocs/en/ATON_user_manual/).

## Deploy

Please refer to [Solidity Getting started](/alaya-devdocs/en/Solidity_Getting_started).

## Method call

The following is an example of how Python is used.

### Install the dependencies

Use the following command to install the `python library`, Python version 3.7.5+ is recommended:

``` shell
pip install client-sdk-python
```
During the installation process, some dependency packages will require `c++14` compilation, please download [cppbuildtools](http://go.microsoft.com/fwlink/?LinkId=691126) after you see the relevant prompt, use the default value to install it, and then re-execute the pip install command.

### Instantiation

``` python
from client_sdk_python import Web3, HTTPProvider

rpc, chain_id, hrp = 'http://127.0.0.1:6789', 201030, 'ATP'
w3 = Web3(HTTPProvider(rpc), chain_id=chain_id, hrp_type=hrp)
abi = [
  {
    "inputs":[
      {"internalType":"uint256", "name":"initialSupply", "type":"uint256"},
      {"internalType":"string", "name":"tokenName", "type":"string"},
      {"internalType":"string", "name":"tokenSymbol", "type":"string"}
	],
    "stateMutability":"nonpayable",
    "type":"constructor"
  },
  {
    "inputs":[],
    "name":"totalSupply",
    "outputs":[{"internalType":"uint256", "name":"", "type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"address", "name":"", "type":"address"}],
    "name":"balanceOf",
    "outputs":[{"internalType":"uint256", "name":"", "type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[
      {"internalType":"address", "name":"_to", "type":"address"},
      {"internalType":"uint256", "name":"_value", "type":"uint256"}
	],
    "name":"transfer",
    "outputs":[{"internalType":"bool", "name":"success", "type":"bool"}],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "anonymous":false,
    "inputs":[
      {"indexed":true, "internalType":"address", "name":"from", "type":"address"},
      {"indexed":true, "internalType":"address", "name":"to", "type":"address"},
      {"indexed":false, "internalType":"uint256", "name":"value", "type":"uint256"}
	],
    "name":"Transfer",
    "type":"event"
  }
]	
arc20 = w3.eth.contract(address='contract address', abi=abi)

print([func for func in arc20.functions])
print([event for event in arc20.events])
```

### Query Contract Information

The following is an example of totalSupply, balanceOf, other query methods are similar to this.

``` python
# Query the total number of tokens issued
arc20.functions.totalSupply().call()
# Query the token balance of the specified address
arc20.functions.balanceOf('your address').call()
```

### Sending a contract transaction

The following is an example of a transfer call.

``` python
# Transfer the token to the specified account
tx = {
    'chainId': w3.chain_id,
    'nonce': w3.eth.getTransactionCount('your address'),
    'gas': 4012388,
    'value': 0,
    'gasPrice': 1000000000,
}
txn = arc20.functions.transfer(to='to address', value=1 * 10 ** 18).buildTransaction(tx)
signed_txn = w3.eth.account.signTransaction(txn, private_key='your private key')
tx_hash = w3.eth.sendRawTransaction(signed_txn.rawTransaction).hex()
receipt = w3.eth.waitForTransactionReceipt(tx_hash)
```

### Get contract events

As an example of a transfer transaction event.

``` python
events = arc20.events.Transfer().processReceipt(receipt)
```


