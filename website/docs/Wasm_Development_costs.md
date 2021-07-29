---
id: Wasm_Development_costs
title: Development costs
sidebar_label: Development costs
---

## Summary

In a blockchain system, developing smart contracts based on any public chain system involves the development cost of resource expenditure. For example, deploying/calling smart contracts on the network, staking/delegation and other operations all require a certain cost. Development costs vary among blockchain networks. There are two types of virtual machines running in the Alaya network, `EVM` and `WASM`, and the costs of developing smart contracts on different virtual machines vary from each other. This document is mainly to in introduce the costs involved in the usage of  `WASN` virtual machine. This document will compare the development costs of small contracts, medium contracts and large contracts in the form of a table, and compare the `EVM`/`WASM` virtual machines on `Alaya` with Ethereum Virtual Machine. A simple `SET/GET` contract is used as a test sample for small contracts. An open source [Eth-Tweet](https://github.com/yep/eth-tweet) contract is used as the example of medium contracts. The example for large contracts is a smart contract that complies with the `ERC20` standard.

## Resource Consumption

**Simple set/get contract**

| System     | Contract Level | Contract Size | Gas Used | Gas Price           | Total Cost    | Note              |
| :--------- | :------------- | :------------ | :------- | :------------------ | :------------ | :---------------- |
| Alaya-EVM  | Small-sized    | 0.3 kb        | 76953    | 5,000,000,000 `VON` | 384765 `gVON` | 0.000384765 `ATP` |
| Ethereum   | Small-sized    | 0.3 kb        | 127173   | 5,000,000,000 `wei` | 635865 `Gwei` | 0.000635865 `ETH` |
| Alaya-WASM | Small-sized    | 13.55 kb      | 184043   | 5,000,000,000 `VON` | 920215 `gVON` | 0.000920215 `ATP` |

**Eth-tweet Contract**

| System     | Contract Level | Contract Size | Gas Used | Gas Price           | Total Cost     | Note              |
| :--------- | :------------- | :------------ | :------- | :------------------ | :------------- | :---------------- |
| Alaya-EVM  | Medium-sized   | 2.08 kb       | 257065   | 5,000,000,000 `VON` | 1285325 `gVON` | 0.001285325 `ATP` |
| Ethereum   | Medium-sized   | 2.08 kb       | 621385   | 5,000,000,000 `wei` | 3106925 `Gwei` | 0.003106925 `ETH` |
| Alaya-WASM | Medium-sized   | 30.07 kb      | 349713   | 5,000,000,000 `VON` | 1748565 `gVON` | 0.001748565 `ATP` |

**ERC20 Token Contract**

| System     | Contract Level | Contract Size | Gas Used | Gas Price           | Total Cost     | Note              |
| :--------- | :------------- | :------------ | :------- | :------------------ | :------------- | :---------------- |
| Alaya-EVM  | Large-sized    | 4.45 kb       | 552823   | 5,000,000,000 `VON` | 2764115 `gVON` | 0.002764115 `ATP` |
| Ethereum   | Large-sized    | 4.45 kb       | 1282171  | 5,000,000,000 `wei` | 6410855 `Gwei` | 0.006410855 `ETH` |
| Alaya-WASM | Large-sized    | 35.9 kb       | 486274   | 5,000,000,000 `VON` | 2431370 `gVON` | 0.00243137 `ATP`  |

## Small-sized Contract

### Simple Set/Get Contract

#### **EVM Sample Code**

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

Byte Size：`311 byte => 0.3 kb`

-------------------

#### **WASM Sample Code**

```
#include <platon/platon.hpp>
#include <string>
using namespace platon;

CONTRACT SimpleStorage: public platon::Contract
{
	public:
		ACTION void init(){}

		ACTION void set(uint64_t input)
		{
			storedData.self() = input;
		}

		CONST uint64_t get()
		{
			return storedData.self();
		}

	private:
		platon::StorageType<"sstored"_n, uint64_t> storedData;
};

PLATON_DISPATCH(SimpleStorage,(init)(set)(get))
```

ByteCode

[Click to view bincode](https://github.com/AlayaNetwork/alaya-devdocs/tree/main/website/i18n/zh-CN/docusaurus-plugin-content-docs/current/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/SimpleStorage_wasm.bin)

Byte Size: `13882 byte => 13.55 kb`

-------------------

#### Cost

Alaya-EVM

- Gas Used: 76953
- Gas Price: 5,000,000,000 (5 `gVON`)
- Total cost: 384,765 `gVON`（0.000384765 `ATP`）

Ethereum

- GasUsed: 127173
- GasPrice: 5,000,000,000 (5 `Gwei`)
- Total cost: 635,865 `Gwei`（0.000635865 `ATP`）

Alaya-WASM

- Gas Used: 184043
- Gas Price: 5,000,000,000 (5 `gVON`)
- Total cost: 920,215 `gVON`（0.000920215 `ATP`）

-----------------------------------

## Medium-sized Contract

### Eth-Tweet Contract

#### **EVM Sample Code**

[Click to view code](https://github.com/AlayaNetwork/alaya-devdocs/tree/main/website/i18n/zh-CN/docusaurus-plugin-content-docs/current/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/account.sol)

ByteCode

[Click to view bincode](https://github.com/AlayaNetwork/alaya-devdocs/tree/main/website/i18n/zh-CN/docusaurus-plugin-content-docs/current/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/Tweet_evm.bin)

Byte Size: `2130.5 byte => 2.08 kb`

---------------

#### **WASM Sample Code**

```
#include <platon/platon.hpp>
#include <string>
using namespace platon;

// data structure of a single tweet.
struct Tweet{

	public:
		uint64_t timestamp;
		std::string tweetString;

	public:
		Tweet(){}
		Tweet(uint64_t &timestamp, const std::string &tweet):timestamp(timestamp), tweetString(tweet) {
		}

	public:
		PLATON_SERIALIZE(Tweet, (timestamp)(tweetString))
};

CONTRACT TweetAccount: public platon::Contract
{
	private:
		// "array" of all tweets of this account: maps the tweet id to the actual tweet.
		platon::StorageType<"smapping"_n, std::map<std::uint64_t, Tweet>> _tweets;
		// total number of tweets in the above _tweets mapping.
		platon::StorageType<"suint"_n, uint64_t> _numberOfTweets;
		// "owner" of this account: only admin is allowed to tweet.
		platon::StorageType<"saddress"_n, Address> _adminAddress;

	public:
		ACTION void init()
		{
			_numberOfTweets.self() = 0;
			_adminAddress.self() = platon::platon_caller();
		}

		// returns true if caller of function("sender") is admin.
		CONST bool isAdmin(){
			return platon::platon_caller() == _adminAddress.self();
		}

		// create new tweet
		ACTION int64_t tweet(const std::string& tweetString) {
			int64_t result = 0;
			if(!isAdmin()){
				// only owner is allowed to create tweets for this account.
				result = -1;
			} else if (tweetString.length() > 160) {
				// tweet contains more than 160 bytes.
				result = -2;
			} else {
				_tweets.self()[_numberOfTweets].timestamp = platon_timestamp();
				_tweets.self()[_numberOfTweets].tweetString = tweetString;
				_numberOfTweets.self() = _numberOfTweets.self() + 1;
				result = 0; // success.
			}
			return result;
		}

		CONST std::string getTweet(uint64_t tweetId){
			// returns two values
			std::string tweetString = _tweets.self()[tweetId].tweetString;
			uint64_t timestamp = _tweets.self()[tweetId].timestamp;
			return tweetString;
		}

		CONST std::string getLatestTweet() {
			// returns three values.
			std::string tweetString = _tweets.self()[_numberOfTweets.self() - 1].tweetString;
			uint64_t timestamp = _tweets.self()[_numberOfTweets.self() - 1].timestamp;
			uint64_t numberOfTweets = _numberOfTweets.self();
			return tweetString;
		}

		CONST Address getOwnerAddress() {
			return _adminAddress.self();
		}

		CONST uint64_t getNumberOfTweets() {
			return _numberOfTweets.self();
		}

		ACTION void adminRetrieveDonations(const Address& receiver) {
			if(isAdmin()){
				Address caddr = platon_address();
				Energon e = platon_balance(caddr);
				platon_transfer(receiver, e);
			}
		}

		CONST Address caddr(){
			return platon_address();
		}

		CONST std::string caddrBalance(Address receiver){
			//Address caddr = platon_address();
			Energon e = platon_balance(receiver);
			return std::to_string(e.Get());
		}

		ACTION void adminDeleteAccount(){
			if(isAdmin()){
				// this is a predefined function, it deletes theh contract and returns all funds to the owner.
				platon_destroy(_adminAddress.self());
			}
		}
};

PLATON_DISPATCH(TweetAccount,(init)(isAdmin)(tweet)(getTweet)(getLatestTweet)
(getOwnerAddress)(getNumberOfTweets)(adminRetrieveDonations)(adminDeleteAccount)
(caddr)(caddrBalance))
```

ByteCode

[Click to view bincode](https://github.com/AlayaNetwork/alaya-devdocs/tree/main/website/i18n/zh-CN/docusaurus-plugin-content-docs/current/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/Tweet_wasm.bin)

Byte Size: `30788` byte => 30.07 kb`

---------------

#### Costs

Alaya-EVM

- Gas Used: 257065
- Gas Price: 5,000,000,000 (5 `gVON`)
- Total cost: 1,285,325 `gVON`（0.001285325 `ATP`）

Ethereum

- Gas Used: 621385
- Gas Price: 5,000,000,000 (5 `Gwei`)
- Total cost: 3,106,925 `Gwei`（0.003106925 `ETH`）

Alaya-WASM

- Gas Used: 349713
- Gas Price: 5,000,000,000 (5 `gVON`)
- Total cost: 1,748,565 `gVON`（0.001748565 `ATP`）

------------------------

## Large-sized Contract

### ERC20 Token Contract

#### **EVM Sample Code**

[Click to view code](https://github.com/AlayaNetwork/alaya-devdocs/tree/main/website/i18n/zh-CN/docusaurus-plugin-content-docs/current/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/token.sol)

ByteCode

[Click to view bincode](https://github.com/AlayaNetwork/alaya-devdocs/tree/main/website/i18n/zh-CN/docusaurus-plugin-content-docs/current/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/Token_evm.bin)

Byte Size: `4557.5 byte => 4.45 kb`

-----------------------------

#### **WASM Sample Code**

```
#include <platon/platon.hpp>
#include <string>
using namespace platon;

class Token {
	public:
		// total amount of tokens
		platon::StorageType<"totalsupply"_n, uint64_t> totalSupply;

	public: // event
		// define: _from, _to, _value
		PLATON_EVENT2(Transfer, Address, Address, uint64_t);
		// define: _owner, _spender, _value
		PLATON_EVENT2(Approval, Address, Address, uint64_t);

	public:
		// @param _owner The address from which the balance will be retrieved
		// @return The balance.
		virtual uint64_t balanceOf(Address _owner) = 0;

		// @notice send '_value' token to `_to` from `msg.sender`
		// @param _to THe address of the recipient.
 		// @param _value The amount of token to be transferred.
		// @return Whether the transfer was successful or not.
		virtual bool transfer(Address _to, uint64_t _value) = 0;

		// @notice send `_value` token to `_to` from `_from` on the condition it is approved by `_from`
		// @param _from The address of the sender.
		// @param _to The address of the recepient.
		// @param _value The amount of token to be transferred.
		// @return Whether the transfer was successful or not.
		virtual bool transferFrom(Address _from, Address _to, uint64_t _value) = 0;

		// @notice `msg.sender` approves `_spender` to spend `_value` tokens
		// @param _spender The address of the account able to transfer the tokens
		// @param _value The amount of tokens to be approved for transfer
		// @return Whether thee approval was successful or not.
		virtual bool approve(Address _spender, uint64_t _value) = 0;

		// @param _owner The address of the account owning tokens
		// @param _spender The address of the account able to transfer the tokens
		// @return Amount of remaining tokens allowed to spent.
		virtual uint64_t allowance(Address _owner, Address _spender) = 0;
};

// You should inherit from StandardTOken or, for a token like you would want
// to deploy in something like MIst, see HumanStandardToken.cpp.
// (This implements ONLY the standard functions and NOTHING else.
// If you deploy this, you won't have anthing useful.)
class StandardToken: public Token
{
	protected:
		platon::StorageType<"balances"_n, std::map<Address, uint64_t>> balances;
		platon::StorageType<"allowed"_n, std::map<Address, std::map<Address, uint64_t>>> allowed;

	public:
		CONST uint64_t balanceOf(Address _owner) {
			return balances.self()[_owner];
		}

		ACTION bool transfer(Address _to, uint64_t _value){
			// Default assumes totalSupply can't be over max(2^64 - 1)
			// If your token leaves out totalSupply and can issue more tokens as time goes on,
			// you need to check if it doesn't wrap.
			// Replace the if with this on instead.
			Address sender = platon_caller();
			if (balances.self()[sender] >= _value && _value > 0) {
				balances.self()[sender] -= _value;
				balances.self()[_to] += _value;
				PLATON_EMIT_EVENT2(Transfer, sender, _to, _value);
				return true;
			} else {
				return false;
			}
		}

		ACTION bool transferFrom(Address _from, Address _to, uint64_t _value) {
			// same as above. Replace this line with the following if you want to protect against
			// wrapping uints.
			Address sender = platon_caller();
			if(balances.self()[_from] >= _value
				&& allowed.self()[_from][sender] >= _value && _value > 0){
				balances.self()[_to] += _value;
				balances.self()[_from] -= _value;
				PLATON_EMIT_EVENT2(Transfer, _from, _to, _value);
				return true;
			} else {
				return false;
			}
		}

		ACTION bool approve(Address _spender, uint64_t _value){
			Address sender = platon_caller();
			allowed.self()[sender][_spender] = _value;
			PLATON_EMIT_EVENT2(Approval, sender, _spender, _value);
			return true;
		}

		CONST uint64_t allowance(Address _owner, Address _spender){
			return allowed.self()[_owner][_spender];
		}
};


CONTRACT LATToken: public platon::Contract, public StandardToken
{

	public:
		platon::StorageType<"name"_n, std::string> name;		// fancy name: eg Alaya Token
		platon::StorageType<"decimals"_n, uint8_t> decimals;	// HOw many decimals to show.
		platon::StorageType<"symbol"_n, std::string> symbol;	// An identifier: eg LTT
		platon::StorageType<"version"_n, std::string> version;	// 0.1 standard. Just an arbitrary versioning scheme.

	public:
		ACTION void init(uint64_t _initialAmount, const std::string& _tokenName,
			uint8_t _decimalUnits, const std::string& _tokenSymbol)
		{
			Address sender = platon_caller();
			balances.self()[sender] = _initialAmount;		// Give the creator all initial tokens.
			totalSupply.self() = _initialAmount;			// Update total supply.
			name.self() = _tokenName;						// Set the name for display purposes
			decimals.self() = _decimalUnits;				// Amount of decimals for display purposes
			symbol.self() = _tokenSymbol;					// Set the symbol for display purposes.
		}

		CONST std::string getName(){
			return name.self();
		}

		CONST uint8_t getDecimals(){
			return decimals.self();
		}

		CONST std::string getSymbol(){
			return symbol.self();
		}

		CONST uint64_t getTotalSupply(){
			return totalSupply.self();
		}

		// Approves and then calls the receiving contract.
		ACTION bool approveAndCall(Address _spender, uint64_t _value, const bytes& _extraData) {
			Address sender = platon_caller();
			allowed.self()[sender][_spender] = _value;
			PLATON_EMIT_EVENT2(Approval, sender, _spender, _value);
			// call the receiveApproval function on the contract you want to be notified. This
			// crafts the function signature manually so one doesn't have to include a contract
			// in here just for this.
			// define: receiveApproval(Address _from, uint64_t _value, Address _tokenContract, bytes& _extraDaa)
			// it is assumed that when does this that the call should succeed.
			return true;
		}
};

PLATON_DISPATCH(LATToken,(init)(balanceOf)(transfer)(transferFrom)(approve)(allowance)
(getName)(getDecimals)(getSymbol)(getTotalSupply)(approveAndCall))
```

ByteCode

[Click to view bincode](https://github.com/AlayaNetwork/alaya-devdocs/tree/main/website/i18n/zh-CN/docusaurus-plugin-content-docs/current/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%BC%80%E5%8F%91.assets/Token_wasm.bin)

Byte Size: `36764 byte => 35.9 kb`

#### Costs

Alaya-EVM

- GasUsed: 552823
- GasPrice: 5,000,000,000 (5 `gVON`)
- Total cost: 2,764,115 `gVON`（0.002764115 `ATP`）

Ethereum

- GasUsed: 1282171
- GasPrice: 5,000,000,000 (5 `Gwei`)
- Total cost: 6,410,855 `Gwei`（0.006410855 `ETH`）

Alaya-WASM

- GasUsed: 486274
- GasPrice: 5,000,000,000 (5 `gVON`)
- Total cost: 2,431,370 `gVON`（0.00243137 `ATP`）

