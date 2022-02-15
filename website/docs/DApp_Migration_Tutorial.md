---
id: DApp_migrate
title: DApp Quick Migration Tutorial
sidebar_label: DApp Quick Migration Tutorial
---



To help developers migrate their Ethereum DApps onto the Alaya network, we will introduce the differences between the two networks and the general outline of DApp migration from the perspective of developers. Furthermore, we will also offer a specific illustration of how DApp contracts and front-end interfaces can be migrated through the existing Ethereum development tools through the example of Uniswap.



## Differences Between Alaya and Ethereum

On Alaya, for DApp developers, the amount of work involved in migration has been significantly reduced and the migration process has become smoother because the network has made adjustments for Ethereum.

+ The Alaya network generates one block in about 1 second, which is faster than Ethereum. As such, the unit of block timestamp on Alaya is millisecond, whereas Ethereum’s block timestamp is measured in seconds.
+ Token unit: Alaya has replaced Ethereum’s wei and ether with von and atp.
+ The format of account address: PlatON and Alaya support EIP55 as well as Bech32.
+ Currently, the Alaya network does not offer any infrua-like service, and The following interface services are currently available: http://47.241.91.2:6789; http://47.245.14.190:6789/; http://8.220.31.172:6789



## An Outline of DApp Migration

To successfully migrate your DApps, please refer to the below outline:

1. Before getting started, you should first identify the primary functions of the DApp to be migrated and order them into a sequence based on their functional dependency. In the case of Uniswap, the functional dependency is as follows: **Add the configuration of the Alaya (test) network to Metamask ([node information](https://devdocs.alaya.network/alaya-devdocs/zh-CN/Join_the_dev_network))-> connect to the Metamask wallet -> displays tokens and balances on the swap UI -> create trading pairs and add liquidity -> successfully swap -> remove liquidity.

   **The configuration of Alaya development test network nodes for Metamask:**

   ```javascript
   Network Name: Alaya development test network
   New PRC URL: http://47.241.91.2:6789; http://47.245.14.190:6789/; http://8.220.31.172:6789
   Chain ID: 201030
   Symbol (optional): ATP
   Blockchain explorer URL (optional): https://devnetscan.alaya.network/
   ```
   
2. Please follow the steps specified in the section “Migration of Uniswap Contracts” below to migrate the DApp-related contracts and deploy them on your Alaya test network.

3. You should sort out the functional dependencies according to the above process and go through the “Uniswap front-end migration”, and debug through each function.



## An Example of DApp migration

### Uniswap Migration

#### Introduction to Uniswap Migration

To help developers carry out DApp migration, we have worked out a specific illustration of the migration process and modification points using Uniswap as an example. Compared with other DApps. Therefore, an example of Uniswap migration covers most of the procedures involved in DApp migration.



#### The operation process of Uniswap

+ Firstly, you should connect to the Metamask wallet and select the account to be connected through authorization. Once you have successfully connected to Metamask, the front-end interface of Uniswap will display your account and the native token balance of the account.
+ On the swap interface, you can click “Select a token” to check the account balance of different tokens.
+ On the pool interface, you can create trading pairs and add liquidity, which requires authorization such as Metamask permission and signature. Afterward, the interface will display the trading pairs and add liquidity you created. Next, you can click “remove” on the page of liquidity specifics and reduce a certain proportion of the liquidity.
+ Then, you can switch back to the swap interface and swap the tokens included in the trading pairs you created, which requires Metamask signature.



#### Migration of Uniswap contracts

For the migration of contract code, please refer to: https://github.com/treelaketreelake/swap-contracts

The specific procedures of contract deployment are as follows:

+ **Install nodejs**

Install nodejs by executing the following commands:

```shell
$ wget https://nodejs.org/download/release/v10.18.1/node-v10.18.1-linux-x64.tar.gz
$ sudo tar -zxvf node-v10.18.1-linux-x64.tar.gz -C /usr/local
$ sudo ln -s /usr/local/node-v10.18.1-linux-x64/bin/* /usr/bin/
$ node -v
$ sudo chmod -R 777 /usr/local/node-v10.18.1-linux-x64/bin
$ sudo chmod -R 777 /usr/local/node-v10.18.1-linux-x64/lib/node_modules/
```

+ **Install truffle**

```shell
npm install -g truffle
truffle -version
```

+ **Modify the chain-relevant configurations**

Modify the config file in the package: Change the value of feeToSetter in migrations/2_deploy_contracts.js into the contract deployer:

```javascript
const feeToSetter='0xef8ff83e1510DDaD35Db33efa6735F0a9C94ca74'; // Entitled to modify the account of the feeTo address and is the current contract deployer
```

+ __Modify the chain-relevant configurations__

Change the chain-relevant configurations in uniswap-apt/truffle-config.js:

```javascript
const HDWalletProvider = require('@truffle/hdwallet-provider');
module.exports = {
	networks: {
        development: {
            provider: () => new HDWalletProvider("bdbcca45b8af0b751bb39657a005c9ed4341ed7bc15ac6eb37a84b7fd12fcc07", `http://47.241.91.2:6789`),
            network_id: "*",       // Any network (default: none)
         },
  },
  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },
  // Configure your compilers
  compilers: {
    solc: {
        version: "^0.5.17",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
        settings: {          // See the solidity docs for advice about optimization and evmVersion
          optimizer: {
            enabled: false,
            runs: 200
          }
      //  evmVersion: "byzantium"
        }
    }
  }
}
```



+ __Compile the relevant contracts of Uniswap__

```shell
truffle compile
```

**Note: Considering that the underlying code of the Alaya network currently supports solidity 0.8.6, we recommend the use of 0.8.6 or older solidity versions when compiling relevant operation contracts**

+ **Deploy contracts that relate to the Uniswap trading pairs**

```shell
truffle migrate --f 2 --to 2 --skip-dry-run
```

**Note: You may need to modify the field of init code hash in the pairFor function that is within the libraries/UniswapV2Library.sol contract. The field may differ according to the different user addresses that have been deployed. However, for the same address, it will remain the same during multiple deployments. init code hash is needed when generating the pair address. Additionally, as the field exists in both the Uniswap code and the @uniswap/sdk dependency library, it must be consistent, otherwise, the subsequent operation logic invocation of the contract will be affected and trigger bugs.**

+ **Record and deploy the contract address information**

Below is the output information from testing in actual deployment:

```
uniswapV2Factory at: 0xB5bDf1dDf5a4Cfa3C534fFaBD201643093775889
WETH at: 0xE90A2e39255A3879607b77b652d80aAC89D3A18a
uniswapV2Router02 at: 0x6E5a8fd360b5f3c6cA51F20d3bbC93C862A7b9CF
Multicall  at: 0x6E7C672457bBea5fA0b8815944C9575Bd52385Ca
initHash is at: 0x2d2546605b9f2d8c64755e6b9c29cc742d5f0b74bad6d7b8c188c2ccd0822fad
```



#### Modification of the Uniswap dependency library



* Package name: uniswap-sdk
* Source code address: https://github.com/Uniswap/v2-sdk/tree/a88048e9c4198a5bdaea00883ca00c8c8e582605

+ Modification points:

  + src/constants.ts (line 7/28)

  ```javascript
  export const FACTORY_ADDRESS = '0xB5bDf1dDf5a4Cfa3C534fFaBD201643093775889'
  export const INIT_CODE_HASH = '0x2d2546605b9f2d8c64755e6b9c29cc742d5f0b74bad6d7b8c188c2ccd0822fad'
  ```

 Replace the above FACTORY_ADDRESS and INIT_CODE_HASH with the corresponding data generated from the new deployment

```javascript
 export enum ChainId {
    MAINNET = 1,
    ROPSTEN = 3,
    RINKEBY = 4,
    GÖRLI = 5,
    KOVAN = 42
  ALAYA = 201030
  } 
```

  Add the chainId enumerators of the Alaya development test network to the above ChianId

  + src/entities/token.ts(63行)
  + src/entities/token.ts (line 63)

```javascript
export const WETH = {
  [ChainId.ALAYA]: new Token(
    ChainId.ALAYA,
    '0xE90A2e39255A3879607b77b652d80aAC89D3A18a',
    18,
    'WETH',
    'Wrapped ETH'
  ),
```

Replace the above address with the WETH token address generated in the new deployment.

The modification process will be completed once the dist directory of dependencies previously installed has been replaced with the dist directory generated through compilation, which takes place after the code of the dependency packages is modified.



#### Modification of Uniswap’s front-end code

+ src/connectors/index.ts (line 30)

```javascript
export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 201030]
})
```

Add the corresponding chainId of the Alaya development test network to supportedChainIds.

- src/constants/index.ts (line 6/29/30/32)

```javascript
export const ROUTER_ADDRESS = '0x6E5a8fd360b5f3c6cA51F20d3bbC93C862A7b9CF'
```

Replace the above ROUTER_ADDRESS with the router contract address generated from the new deployment.

- src/constants/multicall/index.ts (line 10)

```javascript
[ChainId.ALAYA]: '0x6E7C672457bBea5fA0b8815944C9575Bd52385Ca'
```

Add the Alaya development test network and the corresponding multicall contract address to MULTICALL_NETWORKS.

- src/constants/list.ts (line 2)

```javascript
export const DEFAULT_TOKEN_LIST_URL = 'http://10.1.1.50:8080/token-list.json'
```

+ src/hooks/useTimestampFromBlock.ts (line 11)

```javascript
blockData && setTimestamp(blockData.timestamp / 1000)
```

The timestamp in block info should be divided by 1,000 as the unit of block timestamp on Alaya is millisecond, whereas Ethereum’s block timestamp is measured in seconds.

+ src/hooks/useTransactionDeadline.ts (line 12)

```javascript
if (blockTimestamp && ttl) return blockTimestamp.add(ttl * 1000)
```

blockTimeStamp should be multiplied by 1,000 as the unit of block timestamp on Alaya is millisecond, whereas Ethereum’s block timestamp is measured in seconds.



#### Conclusion for Uniswap migration

+ Add the Alaya network configuration to the swap source code and the @uniswap/sdk dependency library, which makes Uniswap support the Alaya development test network with the chainId of 201030.
+ Modify the corresponding code for init code hash in UniswapV2Library, which is the dependency contract of operation-relevant contracts, and then deploy the operation-relevant contracts (uniswapV2Factory/WETH/uniswapV2Router/multicall) to get the address of the relevant contracts (special attention should be paid to the solidity version).
+ Replace the relevant operation contract address in the swap source code (uniswapV2Factory/WETH/uniswapV2Router/multicall/initHash).
+ Replace the relevant operation contract address in the @uniswap/sdk code (uniswapV2Factory/WETH/uniswapV2Router/multicall/initHash).
+ The required changes in swap source code that relates to blocktimestamp.





## Conclusion for DApp migration

According to the above modification points of Uniswap, we can teel that most of the changes adopted for DApp operations. For instance, this includes the necessary changes of network configuration for supporting the new network in terms of code. Another example of this is that the operation-relevant contract address should also be modified due to the differences caused by redeployment. Of course, you can always deploy and generate fixed contract addresses using fixed accounts in the actual production environment, which requires no replacement. Considering the strong correlation between the above modifications and DApp operations, it is essential for you to learn more about the operation logic of DApps, which can be very helpful for debugging when certain modifications have been omitted. Additionaly, you should also be very careful with the unit difference between Alaya and Ethereum in terms of blocktimestamp (if it is involved in the operation code). Overall, the migration process is pretty smooth. As long as you have learned about the operation logic of DApps in advance, the relevant modifications during migration should be effortless.



*English Translation Contributors @[WillXing](https://github.com/WillXing)*

