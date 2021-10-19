(self.webpackChunkalaya_docs=self.webpackChunkalaya_docs||[]).push([[2435],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return p},kt:function(){return h}});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(n),h=o,m=u["".concat(s,".").concat(h)]||u[h]||d[h]||r;return n?a.createElement(m,i(i({ref:t},p),{},{components:n})):a.createElement(m,i({ref:t},p))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var c=2;c<r;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},7728:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return l},metadata:function(){return s},toc:function(){return c},default:function(){return d}});var a=n(2122),o=n(9756),r=(n(7294),n(3905)),i={id:"DApp_migrate",title:"DApp Quick Migration Tutorial",sidebar_label:"DApp Quick Migration Tutorial"},l=void 0,s={unversionedId:"DApp_migrate",id:"DApp_migrate",isDocsHomePage:!1,title:"DApp Quick Migration Tutorial",description:"To help developers migrate their Ethereum DApps onto the Alaya network, we will introduce the differences between the two networks and the general outline of DApp migration from the perspective of developers. Furthermore, we will also offer a specific illustration of how DApp contracts and front-end interfaces can be migrated through the existing Ethereum development tools through the example of Uniswap.",source:"@site/docs/DApp_Migration_Tutorial.md",sourceDirName:".",slug:"/DApp_migrate",permalink:"/alaya-devdocs/en/DApp_migrate",editUrl:"https://github.com/AlayaNetwork/alaya-devdocs/tree/main/website/docs/DApp_Migration_Tutorial.md",version:"current",frontMatter:{id:"DApp_migrate",title:"DApp Quick Migration Tutorial",sidebar_label:"DApp Quick Migration Tutorial"},sidebar:"docs",previous:{title:"Getting Started with JS SDK",permalink:"/alaya-devdocs/en/JS-Tutorials"},next:{title:"AlayScan",permalink:"/alaya-devdocs/en/AlayScan"}},c=[{value:"Differences Between Alaya and Ethereum",id:"differences-between-alaya-and-ethereum",children:[]},{value:"An Outline of DApp Migration",id:"an-outline-of-dapp-migration",children:[]},{value:"An Example of DApp migration",id:"an-example-of-dapp-migration",children:[{value:"Uniswap Migration",id:"uniswap-migration",children:[]}]},{value:"Conclusion for DApp migration",id:"conclusion-for-dapp-migration",children:[]}],p={toc:c};function d(e){var t=e.components,n=(0,o.Z)(e,["components"]);return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"To help developers migrate their Ethereum DApps onto the Alaya network, we will introduce the differences between the two networks and the general outline of DApp migration from the perspective of developers. Furthermore, we will also offer a specific illustration of how DApp contracts and front-end interfaces can be migrated through the existing Ethereum development tools through the example of Uniswap."),(0,r.kt)("h2",{id:"differences-between-alaya-and-ethereum"},"Differences Between Alaya and Ethereum"),(0,r.kt)("p",null,"On Alaya, for DApp developers, the amount of work involved in migration has been significantly reduced and the migration process has become smoother because the network has made adjustments for Ethereum."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The Alaya network generates one block in about 1 second, which is faster than Ethereum. As such, the unit of block timestamp on Alaya is millisecond, whereas Ethereum\u2019s block timestamp is measured in seconds."),(0,r.kt)("li",{parentName:"ul"},"Token unit: Alaya has replaced Ethereum\u2019s wei and ether with von and atp."),(0,r.kt)("li",{parentName:"ul"},"The format of account address: PlatON and Alaya support EIP55 as well as Bech32."),(0,r.kt)("li",{parentName:"ul"},"Currently, the Alaya network does not offer any infrua-like service, and there is only one interface service available to the public: ",(0,r.kt)("a",{parentName:"li",href:"https://openapi.alaya.network/rpc"},"https://openapi.alaya.network/rpc"))),(0,r.kt)("h2",{id:"an-outline-of-dapp-migration"},"An Outline of DApp Migration"),(0,r.kt)("p",null,"To successfully migrate your DApps, please refer to the below outline:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Before getting started, you should first identify the primary functions of the DApp to be migrated and order them into a sequence based on their functional dependency. In the case of Uniswap, the functional dependency is as follows: **Add the configuration of the Alaya (test) network to Metamask (",(0,r.kt)("a",{parentName:"p",href:"https://devdocs.alaya.network/alaya-devdocs/zh-CN/Join_the_dev_network"},"node information"),")-> connect to the Metamask wallet -> displays tokens and balances on the swap UI -> create trading pairs and add liquidity -> successfully swap -> remove liquidity."),(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"The configuration of Alaya development test network nodes for Metamask:")),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"Network Name: Alaya development test network\nNew PRC URL: http://47.241.91.2:6789\nChain ID: 201030\nSymbol (optional): ATP\nBlockchain explorer URL (optional): https://devnetscan.alaya.network/\n"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Please follow the steps specified in the section \u201cMigration of Uniswap Contracts\u201d below to migrate the DApp-related contracts and deploy them on your Alaya test network.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"You should sort out the functional dependencies according to the above process and go through the \u201cUniswap front-end migration\u201d, and debug through each function."))),(0,r.kt)("h2",{id:"an-example-of-dapp-migration"},"An Example of DApp migration"),(0,r.kt)("h3",{id:"uniswap-migration"},"Uniswap Migration"),(0,r.kt)("h4",{id:"introduction-to-uniswap-migration"},"Introduction to Uniswap Migration"),(0,r.kt)("p",null,"To help developers carry out DApp migration, we have worked out a specific illustration of the migration process and modification points using Uniswap as an example. Compared with other DApps. Therefore, an example of Uniswap migration covers most of the procedures involved in DApp migration."),(0,r.kt)("h4",{id:"the-operation-process-of-uniswap"},"The operation process of Uniswap"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Firstly, you should connect to the Metamask wallet and select the account to be connected through authorization. Once you have successfully connected to Metamask, the front-end interface of Uniswap will display your account and the native token balance of the account."),(0,r.kt)("li",{parentName:"ul"},"On the swap interface, you can click \u201cSelect a token\u201d to check the account balance of different tokens."),(0,r.kt)("li",{parentName:"ul"},"On the pool interface, you can create trading pairs and add liquidity, which requires authorization such as Metamask permission and signature. Afterward, the interface will display the trading pairs and add liquidity you created. Next, you can click \u201cremove\u201d on the page of liquidity specifics and reduce a certain proportion of the liquidity."),(0,r.kt)("li",{parentName:"ul"},"Then, you can switch back to the swap interface and swap the tokens included in the trading pairs you created, which requires Metamask signature.")),(0,r.kt)("h4",{id:"migration-of-uniswap-contracts"},"Migration of Uniswap contracts"),(0,r.kt)("p",null,"For the migration of contract code, please refer to: ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/treelaketreelake/swap-contracts"},"https://github.com/treelaketreelake/swap-contracts")),(0,r.kt)("p",null,"The specific procedures of contract deployment are as follows:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Install nodejs"))),(0,r.kt)("p",null,"Install nodejs by executing the following commands:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"$ wget https://nodejs.org/download/release/v10.18.1/node-v10.18.1-linux-x64.tar.gz\n$ sudo tar -zxvf node-v10.18.1-linux-x64.tar.gz -C /usr/local\n$ sudo ln -s /usr/local/node-v10.18.1-linux-x64/bin/* /usr/bin/\n$ node -v\n$ sudo chmod -R 777 /usr/local/node-v10.18.1-linux-x64/bin\n$ sudo chmod -R 777 /usr/local/node-v10.18.1-linux-x64/lib/node_modules/\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Install truffle"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"npm install -g truffle\ntruffle -version\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Modify the chain-relevant configurations"))),(0,r.kt)("p",null,"Modify the config file in the package: Change the value of feeToSetter in migrations/2_deploy_contracts.js into the contract deployer:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"const feeToSetter='0xef8ff83e1510DDaD35Db33efa6735F0a9C94ca74'; // Entitled to modify the account of the feeTo address and is the current contract deployer\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Modify the chain-relevant configurations"))),(0,r.kt)("p",null,"Change the chain-relevant configurations in uniswap-apt/truffle-config.js:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},'const HDWalletProvider = require(\'@truffle/hdwallet-provider\');\nmodule.exports = {\n    networks: {\n        development: {\n            provider: () => new HDWalletProvider("bdbcca45b8af0b751bb39657a005c9ed4341ed7bc15ac6eb37a84b7fd12fcc07", `http://47.241.91.2:6789`),\n            network_id: "*",       // Any network (default: none)\n         },\n  },\n  // Set default mocha options here, use special reporters etc.\n  mocha: {\n    // timeout: 100000\n  },\n  // Configure your compilers\n  compilers: {\n    solc: {\n        version: "^0.5.17",    // Fetch exact version from solc-bin (default: truffle\'s version)\n      // docker: true,        // Use "0.5.1" you\'ve installed locally with docker (default: false)\n        settings: {          // See the solidity docs for advice about optimization and evmVersion\n          optimizer: {\n            enabled: false,\n            runs: 200\n          }\n      //  evmVersion: "byzantium"\n        }\n    }\n  }\n}\n')),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Compile the relevant contracts of Uniswap"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"truffle compile\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Note: Considering that the underlying code of the Alaya network currently supports solidity 0.8.6, we recommend the use of 0.8.6 or older solidity versions when compiling relevant operation contracts")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Deploy contracts that relate to the Uniswap trading pairs"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"truffle migrate --f 2 --to 2 --skip-dry-run\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Note: You may need to modify the field of init code hash in the pairFor function that is within the libraries/UniswapV2Library.sol contract. The field may differ according to the different user addresses that have been deployed. However, for the same address, it will remain the same during multiple deployments. init code hash is needed when generating the pair address. Additionally, as the field exists in both the Uniswap code and the @uniswap/sdk dependency library, it must be consistent, otherwise, the subsequent operation logic invocation of the contract will be affected and trigger bugs.")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Record and deploy the contract address information"))),(0,r.kt)("p",null,"Below is the output information from testing in actual deployment:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"uniswapV2Factory at: 0xB5bDf1dDf5a4Cfa3C534fFaBD201643093775889\nWETH at: 0xE90A2e39255A3879607b77b652d80aAC89D3A18a\nuniswapV2Router02 at: 0x6E5a8fd360b5f3c6cA51F20d3bbC93C862A7b9CF\nMulticall  at: 0x6E7C672457bBea5fA0b8815944C9575Bd52385Ca\ninitHash is at: 0x2d2546605b9f2d8c64755e6b9c29cc742d5f0b74bad6d7b8c188c2ccd0822fad\n")),(0,r.kt)("h4",{id:"modification-of-the-uniswap-dependency-library"},"Modification of the Uniswap dependency library"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Package name: uniswap-sdk"),(0,r.kt)("li",{parentName:"ul"},"Source code address: ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/Uniswap/v2-sdk/tree/a88048e9c4198a5bdaea00883ca00c8c8e582605"},"https://github.com/Uniswap/v2-sdk/tree/a88048e9c4198a5bdaea00883ca00c8c8e582605"))),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Modification points:"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"src/constants.ts (line 7/28)"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"export const FACTORY_ADDRESS = '0xB5bDf1dDf5a4Cfa3C534fFaBD201643093775889'\nexport const INIT_CODE_HASH = '0x2d2546605b9f2d8c64755e6b9c29cc742d5f0b74bad6d7b8c188c2ccd0822fad'\n")))),(0,r.kt)("p",{parentName:"li"},"Replace the above FACTORY_ADDRESS and INIT_CODE_HASH with the corresponding data generated from the new deployment"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"}," export enum ChainId {\n    MAINNET = 1,\n    ROPSTEN = 3,\n    RINKEBY = 4,\n    G\xd6RLI = 5,\n    KOVAN = 42\n  ALAYA = 201030\n  } \n")),(0,r.kt)("p",null,"  Add the chainId enumerators of the Alaya development test network to the above ChianId"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"src/entities/token.ts(63\u884c)"),(0,r.kt)("li",{parentName:"ul"},"src/entities/token.ts (line 63)")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"export const WETH = {\n  [ChainId.ALAYA]: new Token(\n    ChainId.ALAYA,\n    '0xE90A2e39255A3879607b77b652d80aAC89D3A18a',\n    18,\n    'WETH',\n    'Wrapped ETH'\n  ),\n")),(0,r.kt)("p",null,"Replace the above address with the WETH token address generated in the new deployment."),(0,r.kt)("p",null,"The modification process will be completed once the dist directory of dependencies previously installed has been replaced with the dist directory generated through compilation, which takes place after the code of the dependency packages is modified."),(0,r.kt)("h4",{id:"modification-of-uniswaps-front-end-code"},"Modification of Uniswap\u2019s front-end code"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"src/connectors/index.ts (line 30)")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"export const injected = new InjectedConnector({\n  supportedChainIds: [1, 3, 4, 5, 42, 201030]\n})\n")),(0,r.kt)("p",null,"Add the corresponding chainId of the Alaya development test network to supportedChainIds."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"src/constants/index.ts (line 6/29/30/32)")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"export const ROUTER_ADDRESS = '0x6E5a8fd360b5f3c6cA51F20d3bbC93C862A7b9CF'\n")),(0,r.kt)("p",null,"Replace the above ROUTER_ADDRESS with the router contract address generated from the new deployment."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"src/constants/multicall/index.ts (line 10)")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"[ChainId.ALAYA]: '0x6E7C672457bBea5fA0b8815944C9575Bd52385Ca'\n")),(0,r.kt)("p",null,"Add the Alaya development test network and the corresponding multicall contract address to MULTICALL_NETWORKS."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"src/constants/list.ts (line 2)")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"export const DEFAULT_TOKEN_LIST_URL = 'http://10.1.1.50:8080/token-list.json'\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"src/hooks/useTimestampFromBlock.ts (line 11)")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"blockData && setTimestamp(blockData.timestamp / 1000)\n")),(0,r.kt)("p",null,"The timestamp in block info should be divided by 1,000 as the unit of block timestamp on Alaya is millisecond, whereas Ethereum\u2019s block timestamp is measured in seconds."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"src/hooks/useTransactionDeadline.ts (line 12)")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"if (blockTimestamp && ttl) return blockTimestamp.add(ttl * 1000)\n")),(0,r.kt)("p",null,"blockTimeStamp should be multiplied by 1,000 as the unit of block timestamp on Alaya is millisecond, whereas Ethereum\u2019s block timestamp is measured in seconds."),(0,r.kt)("h4",{id:"conclusion-for-uniswap-migration"},"Conclusion for Uniswap migration"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Add the Alaya network configuration to the swap source code and the @uniswap/sdk dependency library, which makes Uniswap support the Alaya development test network with the chainId of 201030."),(0,r.kt)("li",{parentName:"ul"},"Modify the corresponding code for init code hash in UniswapV2Library, which is the dependency contract of operation-relevant contracts, and then deploy the operation-relevant contracts (uniswapV2Factory/WETH/uniswapV2Router/multicall) to get the address of the relevant contracts (special attention should be paid to the solidity version)."),(0,r.kt)("li",{parentName:"ul"},"Replace the relevant operation contract address in the swap source code (uniswapV2Factory/WETH/uniswapV2Router/multicall/initHash)."),(0,r.kt)("li",{parentName:"ul"},"Replace the relevant operation contract address in the @uniswap/sdk code (uniswapV2Factory/WETH/uniswapV2Router/multicall/initHash)."),(0,r.kt)("li",{parentName:"ul"},"The required changes in swap source code that relates to blocktimestamp.")),(0,r.kt)("h2",{id:"conclusion-for-dapp-migration"},"Conclusion for DApp migration"),(0,r.kt)("p",null,"According to the above modification points of Uniswap, we can teel that most of the changes adopted for DApp operations. For instance, this includes the necessary changes of network configuration for supporting the new network in terms of code. Another example of this is that the operation-relevant contract address should also be modified due to the differences caused by redeployment. Of course, you can always deploy and generate fixed contract addresses using fixed accounts in the actual production environment, which requires no replacement. Considering the strong correlation between the above modifications and DApp operations, it is essential for you to learn more about the operation logic of DApps, which can be very helpful for debugging when certain modifications have been omitted. Additionaly, you should also be very careful with the unit difference between Alaya and Ethereum in terms of blocktimestamp (if it is involved in the operation code). Overall, the migration process is pretty smooth. As long as you have learned about the operation logic of DApps in advance, the relevant modifications during migration should be effortless."),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"English Translation Contributors @",(0,r.kt)("a",{parentName:"em",href:"https://github.com/WillXing"},"WillXing"))))}d.isMDXComponent=!0}}]);