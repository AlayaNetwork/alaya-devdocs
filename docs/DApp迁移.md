---
id: DApp_migrate
title: DApp Migrate
sidebar_label: DApp Migrate
---


为了更好的支持开发者迁移以太坊DApp到Alaya，本文将从开发者角度，首先介绍Alaya与以太坊的差异，然后介绍迁移DApp的大体思路，最后针对DApp合约迁移和前端界面迁移进行具体的介绍。

## Alaya和以太坊的差异

对于Dapp开发者来说，无需关注底层技术上的差异。以下是针对开发者来说需要注意的差异点：

+ Alaya和以太坊暴露的RPC方法基本都是一致的，区别在于rpc method名称的前缀不一样，Alaya网络的前缀是platon_
+ Alaya网络的地址类型是bech32 地址类型，以atp为前缀的字符串，区别于以太坊的0x前缀地址
+ Alaya的出块要比以太坊快，大约是1s出一个区块，所以block的timestamp是以毫秒为单位，以太坊的block的timestamp是以秒为单位
+ Alaya网络目前没有infrua类似的服务，目前对外的只有一个 https://openapi.alaya.network/rpc 接口服务

## DApp迁移思路

要成功迁移DApp可以参考下面的迁移思路：

1. 先搞清楚DApp自身的主要功能，按功能依赖关系给功能做个依赖关系排序。以uniswap为例，功能依赖关系为：连上samurai 钱包->swap界面能够展示代币及显示余额->能够创建交易对并添加流动性->能够操作swap成功->能够移除流动性。
2. 根据下文的“DApp合约迁移”章节迁移好DApp相关合约，部署到自己的Alaya测试网络。
3. 根据第1步梳理功能依赖和下文的“DApp前端界面迁移”，依次调试通过每一个功能。

## DApp合约迁移

合约迁移修改点主要包含：

1. Alaya支持的solidity是0.4.26、0.5.17、0.6.12、0.7.1 四个版本，如果迁移0.7.1以上版本的合约，需要降低版本号，去除高版本相关语法。例如，可以通过下面语句使用0.5.17的版本：

   ```
   pragma solidity ^0.5.17;
   ```

2. Alaya智能合约中的货币单位为ATP和VON。要将以太坊智能合约迁移至Alaya，请将以太币面额更改为Alaya面额。同时注意以太/ATP市场汇率。

3. 0x地址通过keytool工具转换成ATP地址，用atp地址替换0x地址，具体替换成什么地址需要根据业务逻辑决定。同时用address(uint160(0))代替address(0)。例如：

   把下面语句：

   ```
   if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
       ...
   }
   ```

   修改为：

   ```
   if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) ==
       address(uint160(0))) 
   {
       ...
   }
   ```

4. Alaya智能合约中block.timestamp表示的是当前区块以毫秒为单位的时间戳，以太坊是以秒为单位。block.timestamp需不需要修改需要根据业务逻辑来决定。在uniswap移植中合约的timestamp没有修改，但是前端把超时的时间由秒改成了毫秒。

5. 合约开发指南请参考[EVM智能合约](https://devdocs.alaya.network/alaya-devdocs/zh-CN/EVM_Smart_Contract/)

## DApp前端界面迁移

### 修改连接钱包的方式

Samurai为了跟metamask命名不冲突，把metamask的window.ethereum修改成了window.alaya，另外，`eth_`开头的接口改成了`platon_`，例如：eth_requestAccounts修改成了platon_requestAccounts。所以连接钱包的代码需要修改相对应的代码。Samurai开发者文档请参考：https://github.com/AlayaNetwork/Samurai/blob/main/docs/develop-manual.md 。

在uniswap的迁移过程中，修改了项目https://github.com/NoahZinsmeister/web3-react的injected-connector包，具体修改请参考github提交 https://github.com/AlayaNetwork/aswap-web3-react/commits/alaya-v6.1.1 。

### 依赖包的修改

* 如果应用自身有连接以太坊节点，需要修改为连接Alaya节点，这样能够及时发现问题。

* 连上Samurai钱包后，根据业务的功能依赖，依次调试每一个功能，根据chrome调试的console控制台错误输出定位需要修改的依赖包。

+ 很多Dapp的开发不可避免的会引用以太坊的第三方npm包，这些包中可能涉及地址相关或者rpc调用相关，这些被引用的包很大可能是没法支持顺利迁移的，在samurai和uniswap的Dapp的迁移过程中，我们已经修改并发布了一些npm包，可以考虑用支持Alaya网络的npm包进行替换，如果不存在的话可能需要考虑作适当修改后再发布。Alaya已经发布的依赖包可以参看[Alaya github](https://github.com/AlayaNetwork)和[Alaya npm仓库](https://www.npmjs.com/search?q=%40alayanetwork)。

  已发布依赖包列表如下：

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

### 应用自身代码的修改

#### 调用到alaya后端的rpc method及参数

+ alaya网络支持的rpc method是以platon_开头的(如: platon\_sendTransaction)
+ 个别rpc接口的参数类型等可能有不一致的，特别是地址类型需要注意。在开发的时候最好参考Alaya的[开发者文档](https://devdocs.alaya.network/alaya-devdocs/zh-CN/Json_Rpc/)

#### 地址相关

+ 调用rpc的时候参数如果是地址类型的话需要注意传入bech32地址类型。例如，如果程序中拿到了一个0x的合约地址，需要转换成bech32地址再调用，如下面代码所示：

  ```
  if (pair?.liquidityToken?.address) {
      const hrp = chainId.toString() === '201018'? 'atp': 'atx';
      contractAddress = toBech32Address(hrp,pair.liquidityToken.address)
  }
  ```

+ 在涉及参数做编码(如encodeParam方法)的时候，可能需要考虑将bech32地址类型参数转换成0x类型再做编码，包括地址判断也需要修改。例如，uniswap合约参数编码的时候增加了下面逻辑：

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

## Alaya开发调试工具

请参考[Alaya开发者文档](https://devdocs.alaya.network/alaya-devdocs/zh-CN/)

## Metamask及uniswap迁移的经验总结

+ Dapp一般都有一些功能集，我们可以按照这些功能级划分一个个milestone，比如针对metamask就是：

  + 成功导入助记词或创建钱包进入主界面
  + 进入主界面，地址显示的是bech32地址并能成功获取并展示余额
  + 能从一个账户成功发送原生的token到另一个账户
  + 能搜索代币并添加成功，展示代币的余额
  + 代币交易能发送成功

  在这一个个milestone过程中，出现的绝大部分问题可能就是以上提到的需要注意的问题，我们可以先直接修改依赖包的源码，能够让流程跑通，跑通后可以记录依赖包的修改点以利于后面依赖包的改动发布

+ 正常来说Dapp的核心业务流程是基本不用改动的，但是我们依然还是要尝试去理解基本的业务流，这对于debug是有好处的
+ 适当的在浏览器开发者模式下Network上观察是否有网络请求以及网络请求的结果
+ 在某些情况下，真实的错误异常可能在某个地方被截获作处理了导致最终看到的错误并不是最初抛出的错误信息，这个时候需要进行debug找到处理前的最初的错误信息及堆栈
+ 某些错误如果对alaya网络甚至底层知识掌握不多的话，可能也会很棘手，这种情况下建议可以在社区向有经验的开发者请教或讨论

