(self.webpackChunkalaya_docs=self.webpackChunkalaya_docs||[]).push([[8989],{3905:function(e,t,a){"use strict";a.d(t,{Zo:function(){return d},kt:function(){return u}});var n=a(7294);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var c=n.createContext({}),s=function(e){var t=n.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},d=function(e){var t=s(e.components);return n.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var a=e.components,o=e.mdxType,r=e.originalType,c=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),h=s(a),u=o,m=h["".concat(c,".").concat(u)]||h[u]||p[u]||r;return a?n.createElement(m,i(i({ref:t},d),{},{components:a})):n.createElement(m,i({ref:t},d))}));function u(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=a.length,i=new Array(r);i[0]=h;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var s=2;s<r;s++)i[s]=a[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}h.displayName="MDXCreateElement"},7171:function(e,t,a){"use strict";a.r(t),a.d(t,{frontMatter:function(){return i},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return s},default:function(){return p}});var n=a(2122),o=a(9756),r=(a(7294),a(3905)),i={id:"IDE",title:"IDE",sidebar_label:"IDE"},l=void 0,c={unversionedId:"IDE",id:"IDE",isDocsHomePage:!1,title:"IDE",description:"PlatON Studio is an integrated development environment that helps developers quickly develop smart contracts. It also supports contract development, deployment and debugging on the Alaya Network and the PlatON Network.",source:"@site/docs/Alaya-Studio.md",sourceDirName:".",slug:"/IDE",permalink:"/alaya-devdocs/en/IDE",editUrl:"https://github.com/AlayaNetwork/alaya-devdocs/tree/main/website/docs/Alaya-Studio.md",version:"current",frontMatter:{id:"IDE",title:"IDE",sidebar_label:"IDE"},sidebar:"docs",previous:{title:"Alaya-Truffle",permalink:"/alaya-devdocs/en/Alaya-Truffle"},next:{title:"Getting started",permalink:"/alaya-devdocs/en/Solidity_Getting_started"}},s=[{value:"Download",id:"download",children:[]},{value:"Installation",id:"installation",children:[]},{value:"Feature Preview",id:"feature-preview",children:[{value:"Preparation",id:"preparation",children:[]},{value:"Key manager",id:"key-manager",children:[]},{value:"Local development node",id:"local-development-node",children:[]},{value:"Remote network",id:"remote-network",children:[]},{value:"Block explorer",id:"block-explorer",children:[]},{value:"Create a smart contract project",id:"create-a-smart-contract-project",children:[]},{value:"Compile a smart contract",id:"compile-a-smart-contract",children:[]},{value:"Deploy a smart contract",id:"deploy-a-smart-contract",children:[]},{value:"Contract browser",id:"contract-browser",children:[]},{value:"RPC Client",id:"rpc-client",children:[]}]}],d={toc:s};function p(e){var t=e.components,i=(0,o.Z)(e,["components"]);return(0,r.kt)("wrapper",(0,n.Z)({},d,i,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"PlatON Studio is an integrated development environment that helps developers quickly develop smart contracts. It also supports contract development, deployment and debugging on the ",(0,r.kt)("a",{parentName:"p",href:"https://www.alaya.network/en"},"Alaya Network")," and the ",(0,r.kt)("a",{parentName:"p",href:"https://www.platon.network/en"},"PlatON Network"),"."),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(7880).Z})),(0,r.kt)("h3",{id:"download"},"Download"),(0,r.kt)("p",null,"The PlatON Studio installation package can be downloaded from ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/ObsidianLabs/PlatON-Studio/releases"},"Github Releases"),". Currently PlatON Studio supports macOS, Linux and Windows systems. Please download the corresponding version according to the system (for macOS, download ",(0,r.kt)("inlineCode",{parentName:"p"},".dmg")," or ",(0,r.kt)("inlineCode",{parentName:"p"},".zip"),"; for Linux, download ",(0,r.kt)("inlineCode",{parentName:"p"},".AppImage"),"; for Windows, download ",(0,r.kt)("inlineCode",{parentName:"p"},".exe"),"), or click the link to directly download the installation package of the corresponding operating system:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"macOS: ",(0,r.kt)("a",{parentName:"li",href:"https://app.obsidians.io/platon/mac"},"https://app.obsidians.io/platon/mac")),(0,r.kt)("li",{parentName:"ul"},"Linux: ",(0,r.kt)("a",{parentName:"li",href:"https://app.obsidians.io/platon/linux"},"https://app.obsidians.io/platon/linux")),(0,r.kt)("li",{parentName:"ul"},"Windows: ",(0,r.kt)("a",{parentName:"li",href:"https://app.obsidians.io/platon/win"},"https://app.obsidians.io/platon/win"))),(0,r.kt)("h3",{id:"installation"},"Installation"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"macOS"),": Double-click to open ",(0,r.kt)("inlineCode",{parentName:"li"},"PlatON-Studio-x.x.x.dmg")," and drag ",(0,r.kt)("inlineCode",{parentName:"li"},"PlatON Studio")," to the application folder."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Linux"),": Double-click to open ",(0,r.kt)("inlineCode",{parentName:"li"},"PlatON-Studio-x.x.x.AppImage"),", select ",(0,r.kt)("em",{parentName:"li"},"Properties")," => ",(0,r.kt)("em",{parentName:"li"},"Permissions")," => ",(0,r.kt)("em",{parentName:"li"},"Execute"),", and tick the ",(0,r.kt)("em",{parentName:"li"},"Allow executing file as progrom")," option. Close the properties setting window and double-click to open the application (installation methods may vary for different Linux versions)."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Windows"),": Double-click to open ",(0,r.kt)("inlineCode",{parentName:"li"},"PlatON-Studio-x.x.x.exe"),".")),(0,r.kt)("h2",{id:"feature-preview"},"Feature Preview"),(0,r.kt)("h3",{id:"preparation"},"Preparation"),(0,r.kt)("p",null,"When PlatON Studio is installed correctly and started for the first time, you will see a welcome page with dependencies for PlatON Studio to run normally, including Docker, Alaya Node and Alaya Truffle."),(0,r.kt)("p",{align:"center"},(0,r.kt)("img",{src:"/alaya-devdocs/img/en/Alaya-Studio.assets/welcome.png",width:"720px"})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"PlatON Studio uses ",(0,r.kt)("a",{parentName:"li",href:"https://www.docker.com/"},(0,r.kt)("strong",{parentName:"a"},"Docker"))," to start the PlatON node and compile the project. If you have not installed Docker before, you can click the ",(0,r.kt)("em",{parentName:"li"},"Install Docker")," button to visit the official Docker website and download and install it;"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Alaya Node in Docker")," is an Alaya node image, through which PlatON Studio runs Alaya nodes;"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Alaya Truffle in Docker")," is the Alaya version of Truffle, a toolkit for PlatON Studio to create and compile projects.")),(0,r.kt)("p",null,"When all dependencies are properly installed and running, the gray ",(0,r.kt)("em",{parentName:"p"},"Skip")," button will turn into a blue ",(0,r.kt)("em",{parentName:"p"},"Get Started")," button. Click this button to enter the main interface of PlatON Studio."),(0,r.kt)("h3",{id:"key-manager"},"Key manager"),(0,r.kt)("p",null,"After entering the main interface, we need to create some key pairs first. On any interface of PlatON Studio, click the key icon at the bottom left of the application to open the key manager."),(0,r.kt)("p",{align:"center"},(0,r.kt)("img",{src:"/alaya-devdocs/img/en/Alaya-Studio.assets/keypairs.png",width:"480px"})),(0,r.kt)("p",null,"You can create, import and manage key pairs in the key manager. PlatON Studio supports the storage of key pairs in different address formats for PlatON, Alaya, and local development networks (respectively addresses starting with ",(0,r.kt)("inlineCode",{parentName:"p"},"lat"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"atp"),", and ",(0,r.kt)("inlineCode",{parentName:"p"},"atx")," ). When creating and importing a key pair, you can choose to create it in a private key or a mnemonic phrase. You can also set an alias for the key pair for identification in subsequent use."),(0,r.kt)("p",null,"In addition to storing and managing the key pair, the key manager will also provide the creation address for the genesis block. When creating a new local node instance, all addresses in the key manager will be used as the creation address. ",(0,r.kt)("em",{parentName:"p"},"Before proceeding, please create some key pairs in the key manager as the creation address for node instances.")," "),(0,r.kt)("h3",{id:"local-development-node"},"Local development node"),(0,r.kt)("p",null,"Click the ",(0,r.kt)("em",{parentName:"p"},"Network")," tab at the top, and the main page will switch to the network manager where we can manage the local node version and node instance, including downloading and deleting the local node version, and creating, deleting and running node instances according to different versions."),(0,r.kt)("p",null,"Click the ",(0,r.kt)("em",{parentName:"p"},"New Instance")," button in the upper right corner of the main page to open the pop-up window to create a new instance. Fill in the instance name and select the appropriate version. Click the ",(0,r.kt)("em",{parentName:"p"},"Create")," button to create a node instance. It takes a long time, more than ten seconds in some cases, to create a node instance."),(0,r.kt)("p",{align:"center"},(0,r.kt)("img",{src:"/alaya-devdocs/img/en/Alaya-Studio.assets/new_instance.png",width:"720px"})),(0,r.kt)("p",null,"After it is created, the node instance will be shown in the instance list. Click the green ",(0,r.kt)("em",{parentName:"p"},"Start")," button of the instance to start the local node. After the startup, you can check the node running log in the log viewer below."),(0,r.kt)("p",{align:"center"},(0,r.kt)("img",{src:"/alaya-devdocs/img/en/Alaya-Studio.assets/node_log.png",width:"720px"})),(0,r.kt)("h3",{id:"remote-network"},"Remote network"),(0,r.kt)("p",null,"In addition, PlatON Studio has the PlatON mainnet, testnet, and the connection between the Alaya mainnet and the testnet. Click the drop-down arrow next to the ",(0,r.kt)("em",{parentName:"p"},"Network")," tab, you can directly select the network you want to use, and switch with one click."),(0,r.kt)("h3",{id:"block-explorer"},"Block explorer"),(0,r.kt)("p",null,"After successfully starting the local node or connecting to the remote network, click the ",(0,r.kt)("em",{parentName:"p"},"Explorer")," tab at the top to open the block explorer. In the drop-down menu next to the ",(0,r.kt)("em",{parentName:"p"},"Explorer")," tab, you can directly select the address saved in the key manager. Or, you can enter or paste the address you want to visit in the input box. After clicking Enter, we can see the balance, transaction records and other information of the corresponding address."),(0,r.kt)("p",{align:"center"},(0,r.kt)("img",{src:"/alaya-devdocs/img/en/Alaya-Studio.assets/explorer.png",width:"720px"})),(0,r.kt)("p",null,"On the right side of the address bar are buttons for commonly used tools. For example, you can initiate a transfer after clicking the transfer button (of course, you need to have the private key of the current address). If you are currently connected to the Alaya testnet or PlatON testnet, there will be a Faucet button on the right side of the address bar. After clicking it, you can open the interface for applying for a test token."),(0,r.kt)("h3",{id:"create-a-smart-contract-project"},"Create a smart contract project"),(0,r.kt)("p",null,"Click the ",(0,r.kt)("em",{parentName:"p"},"Project")," tab at the top to switch to the contract project interface. Click the ",(0,r.kt)("em",{parentName:"p"},"New")," button in the upper right corner of the page to open the project creation pop-up window, enter the project name and select the appropriate template. PlatON Studio has provided multiple templates:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/alaya-devdocs/en/Solidity_Getting_started/#create-helloworld-contract"},"Hello World (Solidity)"),": A simple smart contract based on Solidity;"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/alaya-devdocs/en/Solidity_Getting_started/#crowdfunding-contract"},"Crowd Funding (Solidity)"),": A crowdfunding smart contract based on Solidity;"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/alaya-devdocs/en/Wasm_Getting_started#create-helloworld-contract"},"Hello World (WASM)"),": A simple smart contract based on C++.")),(0,r.kt)("p",{align:"center"},(0,r.kt)("img",{src:"/alaya-devdocs/img/en/Alaya-Studio.assets/create_project.png",width:"720px"})),(0,r.kt)("p",null,"After the project is created, PlatON Studio will automatically open the newly created project in the project editor. The project editor is composed of several parts, including a file browser, a code editor, a toolbar, and a terminal."),(0,r.kt)("h3",{id:"compile-a-smart-contract"},"Compile a smart contract"),(0,r.kt)("p",null,"Click the compile button (in a hammer shape) on the toolbar, and PlatON Studio will compile the project. You can view the compilation result through the terminal below. After compilation, the compiled JSON file will be generated in the ",(0,r.kt)("inlineCode",{parentName:"p"},"build/contracts")," folder under the project directory. For the specific data format, please refer to ",(0,r.kt)("a",{parentName:"p",href:"https://docs.soliditylang.org/en/latest/using-the-compiler.html#output-description"},"solc documentation"),"."),(0,r.kt)("p",null,"During the compilation process, you need to download Solc. If you're in the Chinese mainland, you may need to use a network proxy for compilation."),(0,r.kt)("p",{align:"center"},(0,r.kt)("img",{src:"/alaya-devdocs/img/en/Alaya-Studio.assets/compile.png",width:"720px"})),(0,r.kt)("h3",{id:"deploy-a-smart-contract"},"Deploy a smart contract"),(0,r.kt)("p",null,"Click the deployment button (in the boat shape) on the toolbar, and the deployment parameters window will be opened, where you can select the contract to be deployed, enter the parameters of the constructor, and select the signer of the deployment transaction."),(0,r.kt)("p",{align:"center"},(0,r.kt)("img",{src:"/alaya-devdocs/img/en/Alaya-Studio.assets/deploy_parameters.png",width:"720px"})),(0,r.kt)("p",null,"Before deployment, you can click the ",(0,r.kt)("em",{parentName:"p"},"Estimate")," button to estimate the transaction fee (Gas and Gas Price) required for the deployment transaction, and then click the ",(0,r.kt)("em",{parentName:"p"},"Deploy")," button to complete. Sometimes the estimated Gas is insufficient during deployment. If so, you can increase the Gas value and try again."),(0,r.kt)("p",null,"After the contract is successfully deployed, PlatON Studio will pop up the transaction details in a window which shows the result of contract deployment, including transaction hash, the address of the deployed contract, parameters, deployment transaction, receipt, ABI and other related data."),(0,r.kt)("p",{align:"center"},(0,r.kt)("img",{src:"/alaya-devdocs/img/en/Alaya-Studio.assets/deploy.png",width:"720px"})),(0,r.kt)("p",null,"At the same time, you can also click ",(0,r.kt)("em",{parentName:"p"},"Transactions")," in the bottom bar of PlatON Studio to see the deployment transaction just sent, query the execution state of the transaction (pending, mined or executed), or click on the transaction to open the pop-up window of transaction details again."),(0,r.kt)("h3",{id:"contract-browser"},"Contract browser"),(0,r.kt)("p",null,"After successfully deploying the smart contract, click the address next to ",(0,r.kt)("em",{parentName:"p"},"Contract")," in the pop-up window of transaction details, and PlatON Studio will switch to the contract browser and automatically open the smart contract that has just been deployed. You can also click the ",(0,r.kt)("em",{parentName:"p"},"Contract")," tab at the top to switch to the contract browser, and enter the contract address you want to open in the address bar. PlatON Studio supports opening multiple contracts at the same time, facilitating the debugging of multiple contracts."),(0,r.kt)("p",null,"The contract browser page is mainly divided into three parts:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The left column is to call the writing method of the contract: Click the blue drop-down box and select the writing method that you want to call the contract;"),(0,r.kt)("li",{parentName:"ul"},"The middle column is to read the contract data: Click the blue drop-down box and select the reading method that you want to query the contract;"),(0,r.kt)("li",{parentName:"ul"},"The right column is to query the event of the contract. Click the blue drop-down box to select the event you want to query the contract.")),(0,r.kt)("p",null,"PlatON Studio will automatically save the contract ABI after deploying the contract, and read the ABI data when reading the contract, which is used to generate the above writing method, reading method, event query, and their respective parameter forms (for more about the ABI usage, refer to ",(0,r.kt)("a",{parentName:"p",href:"#abi-storage"},"ABI Storage"),")."),(0,r.kt)("p",{align:"center"},(0,r.kt)("img",{src:"/alaya-devdocs/img/en/Alaya-Studio.assets/contract.png",width:"720px"})),(0,r.kt)("p",null,"Next, we will use the just deployed ",(0,r.kt)("inlineCode",{parentName:"p"},"HelloWorld")," contract to demonstrate how to use the writing method, reading method, and event query."),(0,r.kt)("p",null,"In the left column, select the ",(0,r.kt)("em",{parentName:"p"},"setName")," method, and fill in the value of the ",(0,r.kt)("em",{parentName:"p"},"_name")," parameter under ",(0,r.kt)("em",{parentName:"p"},"Parameters"),", such as ",(0,r.kt)("inlineCode",{parentName:"p"},"Hello Alaya"),". Click the ",(0,r.kt)("em",{parentName:"p"},"estimate")," button, and PlatON Studio will automatically estimate the transaction fee required for this transaction. After selecting the address of the transaction signature in ",(0,r.kt)("em",{parentName:"p"},"Authorization"),", click the execute button above to send the transaction calling the writing method. After the transaction is sent, it will also be synchronized to the ",(0,r.kt)("inlineCode",{parentName:"p"},"Transactions")," list in the bottom bar, which is convenient for querying the transaction execution state or later querying transaction details (such as the address, method, parameter, and transaction data of the contract called)."),(0,r.kt)("p",null,"The parameter input form of PlatON Studio supports various parameter formats of Solidity, including (u)int, address, string, bool, bytes, array, structure, etc."),(0,r.kt)("p",null,"In the middle column, select the ",(0,r.kt)("em",{parentName:"p"},"getName")," method and click the execute button to execute the reading method. In the ",(0,r.kt)("em",{parentName:"p"},"Result")," below, you can see that the query result is the just set ",(0,r.kt)("inlineCode",{parentName:"p"},"Hello Alaya"),"."),(0,r.kt)("p",{align:"center"},(0,r.kt)("img",{src:"/alaya-devdocs/img/en/Alaya-Studio.assets/hello.png",width:"720px"})),(0,r.kt)("p",null,"The contract does not set events (Events). If the operating contract has defined events, you can select the event you want to query in the right column, specify the query range (the most recent 10,000 by default), and then query. The results will be presented in the form of a table."),(0,r.kt)("h4",{id:"abi-storage"},"ABI storage"),(0,r.kt)("p",null,"When using the contract browser, PlatON Studio needs to generate the interface for reading and writing methods and query events based on the contract ABI. The ABI Storage in the bottom column is where these contract ABIs are saved. After the contract is successfully deployed, PlatON Studio will automatically save the ABI of the contract. In some cases, if you need to call other contracts (such as online contracts), you need to add the ABI of the contract to ABI Storage. This can be done by using the New button in ABI Storage."),(0,r.kt)("p",{align:"center"},(0,r.kt)("img",{src:"/alaya-devdocs/img/en/Alaya-Studio.assets/new_abi.png",width:"720px"})),(0,r.kt)("p",null,"For ease of use, PlatON Studio will also automatically read the ABI of the compiled contract in the current project, which can be selected from the button in the lower left corner of the Enter New ABI pop-up window."),(0,r.kt)("h3",{id:"rpc-client"},"RPC Client"),(0,r.kt)("p",null,"PlatON Studio also provides the function of calling the PlatON/Alaya node RPC interface directly from the bottom layer. Click the network button in the bottom bar, select and open the RPC Client in the pop-up menu, and you can see all the RPC interfaces of the PlatON/Alaya node. For each RPC interface, PlatON Studio will also generate the corresponding parameter form. Fill in the data and click the run button to complete the call. Then you can view the returned data."),(0,r.kt)("p",{align:"center"},(0,r.kt)("img",{src:"/alaya-devdocs/img/en/Alaya-Studio.assets/rpc_client.png",width:"720px"})))}p.isMDXComponent=!0},7880:function(e,t,a){"use strict";t.Z=a.p+"assets/images/compile-020c21a9c24ef69562dbce4ed5033ac9.png"}}]);