---
id: DApp_migrate
title: DApp Migrate
sidebar_label: DApp Migrate
---


In order to better support developers in migrating Ethereum DApp to Alaya, This article will first introduce the difference between Alaya and Ethereum from the perspective of developers, then introduce the general idea of ​​migrating DApp, and finally will make specific introduction about DApp contract migration and front-end migration.

## Difference between Alaya and Ethereum

Dapp developers no need to pay attention to the differences in the underlying technology. But only need to note following differences:

+ The RPC methods exposed by Alaya and Ethereum are basically the same. The difference is the prefix of the rpc method name. The prefix of the Alaya network is `platon_`
+ The address type of the Alaya network is the `bech32` address type, it is a string prefixed with `atp`, which is different from the `0x` prefix address of Ethereum
+ Alaya's block generation is faster than Ethereum, which is about 1 second for a block, so the timestamp of the block in Alaya is in milliseconds, and the timestamp of the block in Ethereum is in seconds.
+ Alaya network currently does not have infrua similar services, currently there is only one https://openapi.alaya.network/rpc interface service externally

## DApp migration ideas

In order to successfully migrate DApp, you can refer to the following migration ideas:

1. First find out the main functions of the DApp itself, and sort the functions base on the function dependency relationship. Taking uniswap as an example, founctions dependency order is: connect to the samurai wallet -> swap UI able to display tokens and display balance -> able to create trading pairs and add liquidity -> able to swap successfully -> able to remove liquidity.
2. Follow the "DApp contract migration" section below to migrate DApp related contracts and deploy them to your Alaya test network.
3. According to the first step, sort out the functional dependencies and the following "DApp front-end migration", and debug through each function.

## DApp contract migration

The contract migration and modification points mainly are:

1. Alaya supports four versions of solidity: 0.4.26, 0.5.17, 0.6.12, and 0.7.1. If you are migrating a contract with a version above 0.7.1, you need to reduce the version number and remove the syntax from the higher version. For example, you can use the 0.5.17 version with the following statement:

   ```
   pragma solidity ^0.5.17;
   ```

2. The currency units in Alaya smart contracts are ATP and VON. To migrate Ethereum smart contracts to Alaya, change the currency of Ether to Alaya currency. And pay attention to the Ether/ATP market exchange rate.

3. The 0x address is able to converted to the ATP address by the `keytool`, and the 0x address is replacable by the atp address. Addresses to replaced is base on the business logic. Also use `address(uint160(0))` instead of `address(0)`. E.g:

   Change following statement:

   ```
   if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
       ...
   }
   ```

   Into:

   ```
   if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) ==
       address(uint160(0))) 
   {
       ...
   }
   ```

4. In the Alaya smart contract, `block.timestamp` represents the timestamp of the current block in milliseconds, while Ethereum uses seconds as the unit. Whether `block.timestamp` needs to be modified or not is base on business logic. In the uniswap migration, the timestamp in the contract is not modified, but in front-end, the timeout period changed from seconds to milliseconds.

5. For contract development guidelines, please refer to [EVM Smart Contract](https://devdocs.alaya.network/alaya-devdocs/zh-CN/EVM_Smart_Contract/)

## DApp front-end interface migration

### Update the way to connect to the wallet

Samurai use `window.alaya` in order not to conflict with the `window.ethereum` of metamask. In addition, the interface with prefix of `eth_` was changed to `platon_`, for example: `eth_requestAccounts` was changed to `platon_requestAccounts`. Therefore, the code to connect to the wallet needs to be modified. For Samurai developer documentation, please refer to: https://github.com/AlayaNetwork/Samurai/blob/main/docs/develop-manual.md 。

在uniswap的迁移过程中，修改了项目 https://github.com/NoahZinsmeister/web3-react 的injected-connector包，具体修改请参考github提交 https://github.com/AlayaNetwork/aswap-web3-react/commits/alaya-v6.1.1 。

### Update dependencies

* If the application itself is connected to the Ethereum node, in order to find problems in time, it needs to be modified to connect to the Alaya node.

* After connected to the Samurai wallet, debug each function according to the function business dependencies order, and locate the dependent packages that need to be modified according to the error output of the Chrome devtool console.

+ Many Dapp developments will need third-party npm packages of Ethereum. These packages may involve address related or rpc call related functions. These packages may not able to support your migration successfully. During the migration process of samurai and uniswap, we have modified and released some npm packages. You may consider replacing those packages with packages that support the Alaya network. If there's no existing package to use, you may need to consider making some modifications before publishing. Alaya's released dependency packages can be found in [Alaya github](https://github.com/AlayaNetwork) and [Alaya npm repository](https://www.npmjs.com/search?q=%40alayanetwork).

  The list of released packages is as follows:

  1. [@alayanetwork/eth-method-registry](https://www.npmjs.com/package/@alayanetwork/eth-method-registry)
  2. [@alayanetwork/ethjs-ens](https://www.npmjs.com/package/@alayanetwork/ethjs-ens)
  3. [@alayanetwork/eth-simple-keyring](https://www.npmjs.com/package/@alayanetwork/eth-simple-keyring)
  4. [@alayanetwork/eth-hd-keyring](https://www.npmjs.com/package/@alayanetwork/eth-hd-keyring)
  5. [@alayanetwork/ethjs-query](https://www.npmjs.com/package/@alayanetwork/ethjs-query)
  6. [@alayanetwork/eth-block-tracker](https://www.npmjs.com/package/@alayanetwork/eth-block-tracker)
  7. [@alayanetwork/ethjs-contract](https://www.npmjs.com/package/@alayanetwork/ethjs-contract)
  8. [@alayanetwork/ethjs](https://www.npmjs.com/package/@alayanetwork/ethjs)
  9. [@alayanetwork/ethjs-format](https://www.npmjs.com/package/@alayanetwork/ethjs-format)
  10. [@alayanetwork/eth-json-rpc-filters](https://www.npmjs.com/package/@alayanetwork/eth-json-rpc-filters)
  11. [@alayanetwork/nonce-tracker](https://www.npmjs.com/package/@alayanetwork/nonce-tracker)
  12. [@alayanetwork/web3-provider-engine](https://www.npmjs.com/package/@alayanetwork/web3-provider-engine)
  13. [@alayanetwork/ethjs-abi](https://www.npmjs.com/package/@alayanetwork/ethjs-abi)
  14. [@alayanetwork/web3-providers-http](https://www.npmjs.com/package/@alayanetwork/web3-providers-http)
  15. [@alayanetwork/web3-net](https://www.npmjs.com/package/@alayanetwork/web3-net)
  16. [@alayanetwork/web3-providers-ws](https://www.npmjs.com/package/@alayanetwork/web3-providers-ws)
  17. [@alayanetwork/web3-utils](https://www.npmjs.com/package/@alayanetwork/web3-utils)
  18. [@alayanetwork/web3-core-helpers](https://www.npmjs.com/package/@alayanetwork/web3-core-helpers)
  19. [@alayanetwork/ethereumjs-util](https://www.npmjs.com/package/@alayanetwork/ethereumjs-util)
  20. [@alayanetwork/web3-eth-contract](https://www.npmjs.com/package/@alayanetwork/web3-eth-contract)
  21. [@alayanetwork/eth-keyring-controller](https://www.npmjs.com/package/@alayanetwork/eth-keyring-controller)
  22. [@alayanetwork/web3-core-subscriptions](https://www.npmjs.com/package/@alayanetwork/web3-core-subscriptions)
  23. [@alayanetwork/web3-eth-abi](https://www.npmjs.com/package/@alayanetwork/web3-eth-abi)
  24. [@alayanetwork/web3-eth](https://www.npmjs.com/package/@alayanetwork/web3-eth)
  25. [@alayanetwork/ethereumjs-tx](https://www.npmjs.com/package/@alayanetwork/ethereumjs-tx)
  26. [@alayanetwork/web3-eth-iban](https://www.npmjs.com/package/@alayanetwork/web3-eth-iban)
  27. [@alayanetwork/web3-providers-ipc](https://www.npmjs.com/package/@alayanetwork/web3-providers-ipc)
  28. [@alayanetwork/web3-eth-accounts](https://www.npmjs.com/package/@alayanetwork/web3-eth-accounts)
  29. [@alayanetwork/web3-eth-personal](https://www.npmjs.com/package/@alayanetwork/web3-eth-personal)
  30. [@alayanetwork/web3-eth-ens](https://www.npmjs.com/package/@alayanetwork/web3-eth-ens)
  31. [@alayanetwork/eth-sig-util](https://www.npmjs.com/package/@alayanetwork/eth-sig-util)
  32. [@alayanetwork/ethjs-schema](https://www.npmjs.com/package/@alayanetwork/ethjs-schema)
  33. [@alayanetwork/rpc-cap](https://www.npmjs.com/package/@alayanetwork/rpc-cap)
  34. [@alayanetwork/eth-token-tracker](https://www.npmjs.com/package/@alayanetwork/eth-token-tracker)
  35. [@alayanetwork/etherscan-link](https://www.npmjs.com/package/@alayanetwork/etherscan-link)
  36. [@alayanetwork/uniswap-v2-periphery](https://www.npmjs.com/package/@alayanetwork/uniswap-v2-periphery)
  37. [@alayanetwork/eth-query](https://www.npmjs.com/package/@alayanetwork/eth-query)
  38. [@alayanetwork/controllers](https://www.npmjs.com/package/@alayanetwork/controllers)
  39. [@alayanetwork/inpage-provider](https://www.npmjs.com/package/@alayanetwork/inpage-provider)
  40. [@alayanetwork/forwarder](https://www.npmjs.com/package/@alayanetwork/forwarder)
  41. [@alayanetwork/eth-json-rpc-middleware](https://www.npmjs.com/package/@alayanetwork/eth-json-rpc-middleware)
  42. [@alayanetwork/uniswap-sdk](https://www.npmjs.com/package/@alayanetwork/uniswap-sdk)
  43. [@alayanetwork/ganache-core](https://www.npmjs.com/package/@alayanetwork/ganache-core)
  44. [@alayanetwork/web3-core-promievent](https://www.npmjs.com/package/@alayanetwork/web3-core-promievent)
  45. [@alayanetwork/web3-core-requestmanager](https://www.npmjs.com/package/@alayanetwork/web3-core-requestmanager)
  46. [@alayanetwork/web3-core-method](https://www.npmjs.com/package/@alayanetwork/web3-core-method)
  47. [@alayanetwork/web3-core](https://www.npmjs.com/package/@alayanetwork/web3-core)
  48. [@alayanetwork/web3](https://www.npmjs.com/package/@alayanetwork/web3)
  49. [@alayanetwork/web3-react-core](https://www.npmjs.com/package/@alayanetwork/web3-react-core)
  50. [@alayanetwork/web3-react-injected-connector](https://www.npmjs.com/package/@alayanetwork/web3-react-injected-connector)
  51. [@alayanetwork/ethers-solidity](https://www.npmjs.com/package/@alayanetwork/ethers-solidity)
  52. [@alayanetwork/ethers-contracts](https://www.npmjs.com/package/@alayanetwork/ethers-contracts)
  53. [@alayanetwork/ethers-bytes](https://www.npmjs.com/package/@alayanetwork/ethers-bytes)
  54. [@alayanetwork/ethers-abi](https://www.npmjs.com/package/@alayanetwork/ethers-abi)
  55. [@alayanetwork/ethers-providers](https://www.npmjs.com/package/@alayanetwork/ethers-providers)
  56. [@alayanetwork/ethers-address](https://www.npmjs.com/package/@alayanetwork/ethers-address)
  57. [@alayanetwork/token-lists](https://www.npmjs.com/package/@alayanetwork/token-lists)

### Modification of DApp own code

#### RPC method and parameters of Alaya backend

+ The RPC method supported by the Alaya network starts with platon_ (such as: platon\_sendTransaction)
+ The parameter types of some specific rpc interfaces may be inconsistent, especially the address type. Best thing to do is to refer to Alaya's [Developer Documentation] when developing(https://devdocs.alaya.network/alaya-devdocs/zh-CN/Json_Rpc/)

#### About Address

+ When calling RPC, if the parameter is an address type, you need to make sure to use bech32 address type. For example, if a contract address of 0x is obtained in the program, it needs to be converted into a bech32 address before use, as shown in the following code:

  ```
  if (pair?.liquidityToken?.address) {
      const hrp = chainId.toString() === '201018'? 'atp': 'atx';
      contractAddress = toBech32Address(hrp,pair.liquidityToken.address)
  }
  ```

+ When it comes to encoding parameters (such as encodeParam method), you may need to consider converting the bech32 address type parameter to 0x type before encoding, the address check also needs to be modified. For example, the following logic is added when encoding uniswap contract parameters:

  ```
  if (callInputs) {
      callInputs = callInputs.map(callInput => {
        if (typeof callInput === 'string' && isBech32Address(callInput))       {
          return decodeBech32Address(callInput)
        } else {
          return callInput
        }
      })
  }
  ```

## Alaya development and debugging tools

Please refer to [Alaya Development Documentation](https://devdocs.alaya.network/alaya-devdocs/zh-CN/)

## Metamask and uniswap migration experience summary

+ Dapp generally has some feature sets. We can divide milestones according to these features. For example, for metamask:

  + Successfully import mnemonic words or create a wallet to enter the main UI
  + Enter the main UI, the address shows the bech32 address and the balance can be successfully obtained and displayed
  + Able to successfully send native tokens from one account to another account
  + Able to search for tokens and add them successfully, displaying the balance of tokens
  + Token can be sent successfully

  In each of these milestones, most of the problems that appear may be the problems mentioned above that require attention. We can directly modify the source code of packages to make the whole process working, and then save the modification of packages for release packages later.

+ Normally, the core business process of Dapp are no need to change, but we still have to try to understand the basic business flow, which is beneficial for debugging.
+ Observe whether there are any network requests and the result of the network requests in the browser developer tool
+ In some cases, the actual error may be intercepted and processed in a certain place. The error finally seen is not the error originally thrown. In this case, you will need to debug to find out the initial error message and stack trace before processing.
+ Some errors may be tricky if you don’t have enough understanding of the alaya network or even the underlying knowledge. In this case, it is recommended to consult or discuss with experienced developers in the community.

### uniswap migration reference

Uniswap migration reference front-end project：https://github.com/treelaketreelake/swap-frontend

Uniswap migration reference contract project：https://github.com/treelaketreelake/swap-contracts
