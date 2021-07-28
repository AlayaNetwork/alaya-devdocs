---
id: Wasm_Getting_started
title: Getting started
sidebar_label: Getting started
---

## Overview

This tutorial is mainly to guide users to create a simple HelloWorld smart contract using wasm language on Alaya, compile, deploy, and call this contract through alaya-truffle.

## alaya-truffle Introduction

Alaya-truffle is a tool provided by PlatON that can compile, deploy, and call smart contracts locally. For specific installation and usage manuals, refer to:

- Alaya-truffle development tools [installation](https://platon-truffle.readthedocs.io/en/alaya/getting-started/installation.html)

  If the wasm compiler always fails to download due to network problems, you can go directly to github [link address](https://github.com/PlatONnetwork/PlatON-CDT/releases/download/v0.13.2/platon-cdt.tar.gz ) to download the compiled compressed file, then unzip it to the ~/.config/alaya-truffle/compilers directory, and soft link platon-cdt/bin/wasm-opt to the /usr/bin directory

- Alaya-truffle development tool [usage manuals](https://platon-truffle.readthedocs.io/en/alaya/)https://platon-truffle.readthedocs.io/en/alaya/)

## Create HelloWorld Contract

```c++
#include <platon/platon.hpp>
#include <string>
using namespace platon;

class message {
   public:
      std::string head;
      PLATON_SERIALIZE(message, (head))
};

class my_message : public message {
   public:
      std::string body;
      std::string end;
      PLATON_SERIALIZE_DERIVED(my_message, message, (body)(end))
};

CONTRACT HelloWorld : public platon::Contract{
   public:
      ACTION void init(const my_message &one_message){
        info.self().push_back(one_message);
      }

      ACTION void add_message(const my_message &one_message){
          info.self().push_back(one_message);
      }

      CONST uint8_t get_message_size(){
          return info.self().size();
      }

      CONST std::string get_message_body(const uint8_t index){
          return info.self()[index].body;
      }

   private:
      platon::StorageType<"myvector"_n, std::vector<my_message>> info;
};

PLATON_DISPATCH(HelloWorld, (init)(add_message)(get_message_size)(get_message_body))

```

Contract Files Description:

- Each contract file has only one contract class. The contract class is decorated with Contract. It must be publicly inherited from platon :: Contract and must have an init function.
- ACTION and CONST qualified member functions represent callable functions, and such member functions cannot be overloaded. The ACTION function will modify the data on the chain. The CONST function just queries the attributes and does not modify the data on the chain.
- The type in the callable function parameter list is a custom type. In this type definition, you need to add the PLATON_SERIALIZE macro to declare the serialization function. This type inherits from other types. You need to add the PLATON_SERIALIZE_DERIVED macro to declare the serialization function.
- Callable functions can only be called externally if the unified entry function is defined in the PLATON_DISPATCH macro.
- At present, platon will persistently store member variables of the contract class. The member variables must be of type platon :: StorageType. The first parameter string of the platon :: StorageType template is followed by \_n, and the string must come from the 32 characters of .12345abcdefghijklmnopqrstuvwxyz. The second parameter is the concrete type of the actual storage. To modify member variables, member functions need to obtain specific types of instances through the self() function, and then execute the corresponding instance functions.
- The second parameter type of the platon :: StorageType template is a custom type. A PLATON_SERIALIZE macro must be added to this type definition to declare a serialization function. This type inherits from other types. A PLATON_SERIALIZE_DERIVED macro must be added to declare a serialization function.

## Compile HelloWorld Contract

**Step1.** Create a new directory for a HelloWorld project

```
mkdir HelloWorld && cd HelloWorld
```

> The following commands are performed in the HelloWorld directory if without special instructions



**Step2.** Initialize a project using alaya-truffle 

```
alaya-truffle init
```

After the command is executed, the structure of the project directory is as follows:

- `contracts/` Wasm contract directory

- `migrations/` dDirectory of the depolyment file

- `test/` Directory of test scripts

- `truffle-config.js` Alaya-truffle configuration file

**Step3.** Move the HelloWorld contract compiled under `HelloWorld/contracts/`

```
ls contracts/
```

> You will see `HelloWorld.cpp`

**Step4.** Modify the alaya-truffle configuration file `truffle-config.js` and add the compiled wasm contract version number

```
vim truffle-config.js
```

The modified contents of `truffle-config.js` are as follows:

```
compilers: {
     wasm: {
           version: "1.0.0"
     }
}
```

**Step5.** Compile contract

```
alaya-truffle compile
```

After the command is executed, the structure of the project directory is as follows:

- `build/` wasm: The directory of the wasm contract compiled
- `build/contracts/HelloWorld.abi.json`: the ABI interface file of the HelloWorld contract compiled 
- `build/contracts/HelloWorld.wasm`: The binary file of the HelloWorld contract compiled 

## Deploly HelloWorld Contract

**Step1.** Modify the configuration information of `truffle-config.js` in the chain

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
       from: "atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp",
       gas: 999999,
       gasPrice: 50000000004,
	},
}
```

```
networks: {
	development: {
       host: "10.1.1.6",     // blockchain server address
       port: 8806,            // server port
       network_id: "*",       // Any network (default: none)
       from: "atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp",
       gas: 999999,
       gasPrice: 1000000000,
	},
}
```

**step2.** Unlock wallet account

Enter the alaya-truffle console

```
alaya-truffle console
```

Import the private key (you can skip this step if you have already imported it)

```
web3.platon.personal.importRawKey("Your wallet private key","Your wallet password");
```

```
web3.platon.personal.importRawKey("Your wallet private key","Your wallet password");
```

You will see the address corresponding to the private key after importing it：

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

**Step3.** Deploy the HelloWorld contract

```
alaya-truffle deploy --wasm --contract-name HelloWorld --params '[[["1"], "2", "3"]]'
```

- `HelloWorld`: Contract to be deployed
- `params`: Parameters of contract init function

After successful deployment, you will see log info as follows:

```
receipt:  { blockHash:
   '0x266733b693ba650315a59c34e72804c06ca3e27fab145625797bd42259b572c5',
  blockNumber: 70441,
  contractAddress: 'atp12ts3s0zd7s8hm2vwv8wxe3rpvrwpv6tpsx8shx',
  cumulativeGasUsed: 291314,
  from: 'atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp',
  gasUsed: 291314,
  logs: [],
  logsBloom:
   '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: null,
  transactionHash:
   '0x60946ebf0ccddc76a0234353435de73e7901888227fb2f03922fb0ce265a4e9d',
  transactionIndex: 0 }
  contract HelloWorld deployed successfully
======================

   > transactionHash:     0x60946ebf0ccddc76a0234353435de73e7901888227fb2f03922fb0ce265a4e9d
   > contract address:    atp12ts3s0zd7s8hm2vwv8wxe3rpvrwpv6tpsx8shx
   > block number:        70441
   > block timestamp:     1583247148341
   > account:             atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp
   > balance:             3533694129556768659166595001485837031654967793751237866225582808584074296
   > gas limit:           100000000
   > gas used:            291314
   > gas price:           0.000000050000000004 ATP
   > total cost:          0.014565700001165256 ATP
```

## Call HelloWorld Contract

**Step1.** Enter the alaya-truffle console

```
alaya-truffle console
```

> You can execute the command in alaya-truffle console

**Step2.** Create contract object

```json
var abi = [{"baseclass":[],"fields":[{"name":"head","type":"string"}],"name":"message","type":"struct"},{"baseclass":["message"],"fields":[{"name":"body","type":"string"},{"name":"end","type":"string"}],"name":"my_message","type":"struct"},{"constant":false,"input":[{"name":"one_message","type":"my_message"}],"name":"init","output":"void","type":"Action"},{"constant":false,"input":[{"name":"one_message","type":"my_message"}],"name":"add_message","output":"void","type":"Action"},{"constant":true,"input":[],"name":"get_message_size","output":"uint8","type":"Action"},{"constant":true,"input":[{"name":"index","type":"uint8"}],"name":"get_message_body","output":"string","type":"Action"}];
var contractAddr = 'atp12ts3s0zd7s8hm2vwv8wxe3rpvrwpv6tpsx8shx';

var helloworld = new web3.platon.Contract(abi,contractAddr,{vmType: 1 });
```

Description：

- `abi` is the interface provided by the contract for external calls. The abi corresponding to each contract can be found in the compiled file, such as: `HelloWorld/build/contracts/HelloWorld.json`
- `contractAddr`: There is a contract address after the contract is successfully deployed
- `helloWorld` is the abstraction of contract objects constructed to interact with on-chain contracts

**Step3.** Call contract

```javascript
helloworld.methods
  .add_message('[[["5"], "6", "7"]]')
  .send({
    from: 'atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp',
    gas: 999999
  })
  .on('receipt', function (receipt) {
    console.log(receipt)
  })
  .on('error', console.error)
```

Description：

- `helloWorld` is the contract object built before
- `methods` is the fixed syntax, followed by the method name of the contract
- `add_message` is a method in the HelloWorld contract, with an input parameter of custom my_message type
- `from` is the wallet address of the caller
- `gas` is the gas amount
- `on` 是监听合约处理结果事件，此处如果成功将打印回执，失败输出错误日志
- `on` is to monitor the event of the contract processing result. If it succeeds, a receipt will be printed, or an error log will be output if it fails

After the function call is successful, you will see the log info as below:

```
{ blockHash:
   '0x669c7b8cb938cc30845e08dc4ceda08f2e17207c267ade97dc5458b445405736',
  blockNumber: 74665,
  contractAddress: null,
  cumulativeGasUsed: 108549,
  from: 'atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp',
  gasUsed: 108549,
  logsBloom:
   '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: 'atp12ts3s0zd7s8hm2vwv8wxe3rpvrwpv6tpsx8shx',
  transactionHash:
   '0x2b5e590df7e70ad428b1ccb06bda5dcce47f84c4d981c2fb475aca9ec9d0000a',
  transactionIndex: 0,
  events: {} }
{ blockHash:
   '0x669c7b8cb938cc30845e08dc4ceda08f2e17207c267ade97dc5458b445405736',
  blockNumber: 74665,
  contractAddress: null,
  cumulativeGasUsed: 108549,
  from: 'atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp',
  gasUsed: 108549,
  logsBloom:
   '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: 'atp12ts3s0zd7s8hm2vwv8wxe3rpvrwpv6tpsx8shx',
  transactionHash:
   '0x2b5e590df7e70ad428b1ccb06bda5dcce47f84c4d981c2fb475aca9ec9d0000a',
  transactionIndex: 0,
  events: {} }
```

```
{ blockHash:
   '0x669c7b8cb938cc30845e08dc4ceda08f2e17207c267ade97dc5458b445405736',
  blockNumber: 74665,
  contractAddress: null,
  cumulativeGasUsed: 108549,
  from: 'atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp',
  gasUsed: 108549,
  logsBloom:
   '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: 'atp12ts3s0zd7s8hm2vwv8wxe3rpvrwpv6tpsx8shx',
  transactionHash:
   '0x2b5e590df7e70ad428b1ccb06bda5dcce47f84c4d981c2fb475aca9ec9d0000a',
  transactionIndex: 0,
  events: {} }
{ blockHash:
   '0x669c7b8cb938cc30845e08dc4ceda08f2e17207c267ade97dc5458b445405736',
  blockNumber: 74665,
  contractAddress: null,
  cumulativeGasUsed: 108549,
  from: 'atp1jtfqqqr6436ppj6ccnrh8xjg7qals3ctnnmurp',
  gasUsed: 108549,
  logsBloom:
   '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: 'atp12ts3s0zd7s8hm2vwv8wxe3rpvrwpv6tpsx8shx',
  transactionHash:
   '0x2b5e590df7e70ad428b1ccb06bda5dcce47f84c4d981c2fb475aca9ec9d0000a',
  transactionIndex: 0,
  events: {} }
```

**Step4.** Query contract

```javascript
helloworld.methods.get_message_body(0).call()
```

Description：

- `helloWorld` is the contract object built before
- `methods` specifies the methods in the contract that will be accessed
- `get_message_body` is a method in the HelloWorld contract, which has an input parameter of type int
- `call` indicates the query method

---

## FAQ

### About Compile

1. How to use `platon-cpp` for compile multiple `cpp` files?

   ```shell
   platon-cpp ./test.cpp ./test1.cpp
   ```

   Only allowing exists one contract class.

2. How to specified the output directory and file name when using `platon-cpp` to compile a contract?
   
Use the `-o` parameter, and you must also specify the file name when specifying the directory:
   
   ```shell
platon-cpp ./test.cpp -o ./out/test.wasm
   ```
   
3. What if Alaya-truffle failed to execute truffle deploy deployment contract?

   Confirm whether the configuration information of the connected chain in truffle-config.js and the user's wallet address are correct, and whether the wallet is unlocked.

4. What if truffle failed to deploy a constructor contract with parameters?

   If the init function in the contract has parameters, you need to specify the params parameter when deploying the contract.

5. What data types does ABI support?

   The types and conversion rules supported by the generated ABI are as follows:

| Type                  | ABI                |
| --------------------- | ------------------ |
| bool                  | bool               |
| uint8_t               | uint8              |
| uint16_t              | uint16             |
| uint32_t              | uint32             |
| uint64_t              | uint64             |
| int8_t                | int8               |
| int16_t               | int16              |
| int32_t               | int32              |
| int64_t               | int64              |
| bytes                 | uint8\[\]          |
| std::string           | string             |
| std::vector&lt;T&gt;  | T\[\]              |
| std::array\[T, N\]    | T\[N\]             |
| std::pair&lt;T, U&gt; | pair&lt;T, U       |
| std::set&lt;T&gt;     | set&lt;T&gt;       |
| std::map&lt;T, V&gt;  | map&lt;T, V&gt;    |
| std::list&lt;T&gt;    | list&lt;T&gt;      |
| FixedHash&lt;N&gt;    | FixedHash&lt;N&gt; |
| u128                  | uint128            |
| bigint                | uint128            |

### About Contract

1. How to output contract debug logs in the `platon` process?

    - Add `#undef NDEBUG` at the first line of contract codes, and it must come before the header file include.
      
```cpp
      #undef NDEBUG
       
#include <platon/platon.hpp>
       
//...
      ```
      
- `Alaya` start command specifies log level 4, and turn on the `debug` flag
    
  ```cpp
      ./platon --debug --verbosity 4 ...
      ```
    
2. How to write a contract to effectively reduce the gas used?

    - Use reference parameters

      ```cpp
      void test(const std::string& str) {}
      ```

    - Return rvalue reference

   ```cpp
   std::vector<std::string>&& test() {
       std::vector<std::string> v;
       // ...
       return std::move(v);
   }
   ```

    - Try not to apply for a large block of memory

3. What should I pay attention to when using `StorageType`?

    - Should be initialized in `init()`
      ```cpp
       CONTRAT Hello : public Contract {
       public:
         ACTION void init() {
             s_.self() = "test";
         }
       private:
         StorageType<"test"_n, std::string> s_;
       };
      ```

   ```

   - It is recommended to use a specialized type of `StorageType` directly

     + Uint8
     + Int8
     + Uint16
     + Int16
     + Uint
     + Int
     + Uint64
     + Int64
     + String
     + Vector
     + Set
     + Map
     + Array
     + Tuple
   ```

4. What is the difference between `StorageType` and `platon::db::Map`, `platon::db::Array`?
   
From the perspective of the underlying storage level, the implementation of `StorageType` is serialized as a whole and then stored in the database. And `platon::db::Map` and `platon::db::Array`, after each element is serialized, are stored in the database as K/V. For large-scale data, `platon::db::Map` and `platon::db::Array` perform better.
   
   When implementing the contract, the appropriate storage structure should be selected according to the scale of the data.
   
5. Which C++ standard library types are supported by RLP serialization/deserialization?
   
The following C++ standard library types are supported:
   
 - std::string
    - std::vector
    - std::map
    - std::list
    - std::array
    - std::set
    - std::pair
    - std::tuple
   
6. How does custom type support RLP serialization/deserialization?

    - Use macro `PLATON_SERIALIZE` for common types

   ```cpp
      struct Base {
      int a;
      std::string b;

      PLATON_SERIALIZE(Base, (a)(b));
      };
   ```

    - For the derived class, use the macro `PLATON_SERIALIZE_DERIVED`, and for the base class, use the macro `PLATON_SERIALIZE` as well.

   ```cpp
   struct Derived : public Base {
     int c;
     int d;

     PLATON_SERIALIZE_DERIVED(Derived, Base, (c)(d));
   };
   ```
