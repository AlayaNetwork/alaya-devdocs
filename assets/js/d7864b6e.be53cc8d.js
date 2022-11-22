(self.webpackChunkalaya_docs=self.webpackChunkalaya_docs||[]).push([[5437],{3905:function(e,a,t){"use strict";t.d(a,{Zo:function(){return s},kt:function(){return k}});var n=t(7294);function o(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function r(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function l(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?r(Object(t),!0).forEach((function(a){o(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function i(e,a){if(null==e)return{};var t,n,o=function(e,a){if(null==e)return{};var t,n,o={},r=Object.keys(e);for(n=0;n<r.length;n++)t=r[n],a.indexOf(t)>=0||(o[t]=e[t]);return o}(e,a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)t=r[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var d=n.createContext({}),p=function(e){var a=n.useContext(d),t=a;return e&&(t="function"==typeof e?e(a):l(l({},a),e)),t},s=function(e){var a=p(e.components);return n.createElement(d.Provider,{value:a},e.children)},c={inlineCode:"code",wrapper:function(e){var a=e.children;return n.createElement(n.Fragment,{},a)}},u=n.forwardRef((function(e,a){var t=e.components,o=e.mdxType,r=e.originalType,d=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),u=p(t),k=o,y=u["".concat(d,".").concat(k)]||u[k]||c[k]||r;return t?n.createElement(y,l(l({ref:a},s),{},{components:t})):n.createElement(y,l({ref:a},s))}));function k(e,a){var t=arguments,o=a&&a.mdxType;if("string"==typeof e||o){var r=t.length,l=new Array(r);l[0]=u;var i={};for(var d in a)hasOwnProperty.call(a,d)&&(i[d]=a[d]);i.originalType=e,i.mdxType="string"==typeof e?e:o,l[1]=i;for(var p=2;p<r;p++)l[p]=t[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,t)}u.displayName="MDXCreateElement"},7396:function(e,a,t){"use strict";t.r(a),t.d(a,{frontMatter:function(){return l},contentTitle:function(){return i},metadata:function(){return d},toc:function(){return p},default:function(){return c}});var n=t(2122),o=t(9756),r=(t(7294),t(3905)),l={id:"Build_Private_Chain",title:"Deploy Your Own Private Testnet",sidebar_label:"Deploy Your Own Private Testnet"},i=void 0,d={unversionedId:"Build_Private_Chain",id:"Build_Private_Chain",isDocsHomePage:!1,title:"Deploy Your Own Private Testnet",description:"This document describes how to quickly deploy a private blockchain.",source:"@site/docs/Build_Private_Chain.md",sourceDirName:".",slug:"/Build_Private_Chain",permalink:"/alaya-devdocs/Build_Private_Chain",editUrl:"https://github.com/AlayaNetwork/alaya-devdocs/tree/main/website/docs/Build_Private_Chain.md",version:"current",frontMatter:{id:"Build_Private_Chain",title:"Deploy Your Own Private Testnet",sidebar_label:"Deploy Your Own Private Testnet"}},p=[{value:"Standalone or Single Node Mode",id:"standalone-or-single-node-mode",children:[]},{value:"Cluster Deployment",id:"cluster-deployment",children:[]}],s={toc:p};function c(e){var a=e.components,t=(0,o.Z)(e,["components"]);return(0,r.kt)("wrapper",(0,n.Z)({},s,t,{components:a,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"This document describes how to quickly deploy a private blockchain."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Before building the private chain, you need to compile the binary. You can refer to the ",(0,r.kt)("a",{parentName:"p",href:"/alaya-devdocs/en/Install_Alaya"},"Install Alaya document"),".")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Take the private chain deployment under Ubuntu as an example, including single node and cluster deployment. The deployment procedures under Windows is similar to Ubuntu."))),(0,r.kt)("p",null,"If you can't easily connect to an external network, you can choose to build your own private network.Alaya supports single node mode and cluster mode to run private networks.Take the Ubuntu environment as an example and suppose the node data directory is ",(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"~/alaya-node/data"))," , which the users should modify accordingly:"),(0,r.kt)("h2",{id:"standalone-or-single-node-mode"},"Standalone or Single Node Mode"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Generate nodekey and blskey files"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"mkdir -p ~/alaya-node/data && alayakey genkeypair | tee >(grep \"PrivateKey\" | awk '{print $2}' > ~/alaya-node/data/nodekey) >(grep \"PublicKey\" | awk '{print $3}' > ~/alaya-node/data/nodeid) && alayakey genblskeypair | tee >(grep \"PrivateKey\" | awk '{print $2}' > ~/alaya-node/data/blskey) >(grep \"PublicKey\" | awk '{print $3}' > ~/alaya-node/data/blspub)\n")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Note:"),(0,r.kt)("ul",{parentName:"blockquote"},(0,r.kt)("li",{parentName:"ul"},"nodeid: node public key (ID) file, which stores the public key of the node and is used to identify the node"),(0,r.kt)("li",{parentName:"ul"},"nodekey: node private key file which stores the node's private key and can not be public and need to do a backup."),(0,r.kt)("li",{parentName:"ul"},"blspub: node BLS public key file which stores the BLS public key of the node, and is used for fast verification of signatures in the consensus protocol."),(0,r.kt)("li",{parentName:"ul"},"blskey: node BLS private key file which stores the node's BLS private key, cannot be published and need to make a backup."))),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Generate wallet file"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"mkdir -p ~/alaya-node/data && alaya --datadir ~/alaya-node/data account new\n")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Your new account is locked with a password. Please give a password. Do not forget this password."),(0,r.kt)("p",{parentName:"blockquote"},"Passphrase:"),(0,r.kt)("p",{parentName:"blockquote"},"Repeat passphrase:"),(0,r.kt)("p",{parentName:"blockquote"},"main net Address: atp16h5jr7t72das7jdtctsumzugygt55mvapqqvzp"),(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"Note\uff1a")),(0,r.kt)("p",{parentName:"blockquote"},"The wallet file and password are very important for the generated account address. Losing the wallet file or forgetting the password will cause the token in the account to be lost. Please make a backup of the wallet file and remember the password.")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Editing the genesis block configuration file ",(0,r.kt)("inlineCode",{parentName:"strong"},"alaya.json")))),(0,r.kt)("p",null,"Create the genesis block configuration file alaya.json in the ",(0,r.kt)("inlineCode",{parentName:"p"},"~/alaya-node")," directory, then copy the following genesis block configuration file template content to alaya.json file, modify ",(0,r.kt)("inlineCode",{parentName:"p"},"your-node-pubkey")," as the previously generated ",(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("em",{parentName:"strong"},"node public key (nodeid)")),", ",(0,r.kt)("inlineCode",{parentName:"p"},"your-node-blspubkey")," as ",(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("em",{parentName:"strong"},"node BLS public key (blspub)")),", ",(0,r.kt)("inlineCode",{parentName:"p"},"your-account-address")," as ",(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("em",{parentName:"strong"},"the wallet address")),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'\u2026\u2026\n    "cbft": {\n    "initialNodes": [{\n        "node": "enode://your-node-pubkey@127.0.0.1:16789",\n        "blsPubKey": "your-node-blspubkey"\n    }],\n    \u2026\u2026\n    "alloc": {\n      "your-account-address": {\n            "balance": "999000000000000000000"\n      }\n    },\n\u2026\u2026\n')),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Genesis block configuration file template"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "config": {\n    "chainId": 201030,\n    "eip155Block": 3,\n    "cbft": {\n      "initialNodes": [\n        {\n          "node": "enode://4fcc251cf6bf3ea53a748971a223f5676225ee4380b65c7889a2b491e1551d45fe9fcc19c6af54dcf0d5323b5aa8ee1d919791695082bae1f86dd282dba4150f@127.0.0.1:16789",\n          "blsPubKey": "d341a0c485c9ec00cecf7ea16323c547900f6a1bacb9daacb00c2b8bacee631f75d5d31b75814b7f1ae3a4e18b71c617bc2f230daa0c893746ed87b08b2df93ca4ddde2816b3ac410b9980bcc048521562a3b2d00e900fd777d3cf88ce678719"\n        }\n      ],\n      "amount": 10,\n      "period": 20000,\n      "validatorMode": "ppos"\n    },\n    "genesisVersion": 3328\n  },\n  "economicModel": {\n    "common": {\n      "maxEpochMinutes": 360,\n      "maxConsensusVals": 25,\n      "additionalCycleTime": 525960\n    },\n    "staking": {\n      "stakeThreshold": 10000000000000000000000,\n      "operatingThreshold": 1000000000000000000,\n      "maxValidators": 101,\n      "unStakeFreezeDuration": 8,\n      "rewardPerMaxChangeRange": 500,\n      "rewardPerChangeInterval": 10\n    },\n    "slashing": {\n      "slashFractionDuplicateSign": 10,\n      "duplicateSignReportReward": 50,\n      "maxEvidenceAge": 7,\n      "slashBlocksReward": 250,\n      "zeroProduceCumulativeTime": 30,\n      "zeroProduceNumberThreshold": 1,\n      "zeroProduceFreezeDuration": 7\n    },\n    "gov": {\n      "versionProposalVoteDurationSeconds": 1209600,\n      "versionProposalSupportRate": 6670,\n      "textProposalVoteDurationSeconds": 1209600,\n      "textProposalVoteRate": 5000,\n      "textProposalSupportRate": 6670,\n      "cancelProposalVoteRate": 5000,\n      "cancelProposalSupportRate": 6670,\n      "paramProposalVoteDurationSeconds": 1209600,\n      "paramProposalVoteRate": 5000,\n      "paramProposalSupportRate": 6670\n    },\n    "reward": {\n      "newBlockRate": 50,\n      "platonFoundationYear": 2,\n      "increaseIssuanceRatio": 500\n    },\n    "innerAcc": {\n      "platonFundAccount": "atp10spacq8cz76y2n60pl7sg5yazncmjuus7n6hw2",\n      "platonFundBalance": 0,\n      "cdfAccount": "atp17tfkaghs4vded6mz6k53xyv5cvqsl63h5gq7cw",\n      "cdfBalance": 4000000000000000000000000\n    }\n  },\n  "nonce": "0x0376e56dffd12ab53bb149bda4e0cbce2b6aabe4cccc0df0b5a39e12977a2fcd23",\n  "timestamp": "0x5bc94a8a",\n  "extraData": "0xd782070186706c61746f6e86676f312e3131856c696e757800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",\n  "gasLimit": "4712388",\n  "alloc": {\n    "atp1zqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr75cqxf": {\n      "balance": "1000000000000000000000000"\n    },\n    "atp1zkrxx6rf358jcvr7nruhyvr9hxpwv9unj58er9": {\n      "balance": "9718188019000000000000000000"\n    }\n  },\n  "number": "0x0",\n  "gasUsed": "0x0",\n  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"\n}\n')),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Initialize the genesis block"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"cd ~/alaya-node && alaya --datadir ./data init alaya.json\n")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Note:"),(0,r.kt)("p",{parentName:"blockquote"},"The ",(0,r.kt)("strong",{parentName:"p"},"Successfully genesis state")," prompt appears to indicate that the initialization of the genesis information is complete.")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Start Node")),(0,r.kt)("p",{parentName:"li"},"In general, the alaya process is always in the foreground, so we cannot do anything else, and if we exit the terminal in the middle, the program will exit.Ubuntu can launch programs in nohup mode:"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'cd ~/alaya-node && nohup alaya --identity "alaya" --datadir ./data --port 16789 --http.addr 127.0.0.1 --http.port 6789 --http.api "platon,net,web3,admin,personal" --http --nodiscover --nodekey ./data/nodekey --cbft.blskey ./data/blskey & > ./data/alaya.log 2>&1 &\n')),(0,r.kt)("p",null,"When succeed in excuting the command of nohup, press enter again to ensure that the process does not exit because the terminal is closed by mistake."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Check the running status of the node"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"alaya attach http://localhost:6789 --exec platon.blockNumber\n")),(0,r.kt)("p",null,"Execute the above command several times. If the block height keeps growing, the single-node private chain deployment is successful."),(0,r.kt)("h2",{id:"cluster-deployment"},"Cluster Deployment"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"Alaya cluster")," is a private chain with multiple nodes. Here we assume that you can already build a single node. And we will build a network of two nodes on one server.The deployment of more than two nodes is similar.U:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Each node instance has a separate data directory (--datadir)"),(0,r.kt)("li",{parentName:"ul"},"Each instance runs on a different port, whether it is a p2p port or an rpc port (--port and --http.port)"),(0,r.kt)("li",{parentName:"ul"},"Nodes can be interconnected with each other"),(0,r.kt)("li",{parentName:"ul"},"RPC server port is not occupied")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"1.Create directory")),(0,r.kt)("p",null,"Create directories data0 and data1 under the alaya-node directory as the data directories for the two nodes. Generate two coinbase accounts for each node."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"mkdir -p ~/alaya-node/data0 ~/alaya-node/data1\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"2. Generate key pair")),(0,r.kt)("p",null,"Save the nodekey and blskey of the two nodes to 'data0' and 'data1' respectively."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"cd ~/alaya-node/data0 && alayakey genkeypair | tee >(grep \"PrivateKey\" | awk '{print $2}' > ./nodekey) >(grep \"PublicKey\" | awk '{print $3}' > ./nodeid) && alayakey genblskeypair | tee >(grep \"PrivateKey\" | awk '{print $2}' > ./blskey) >(grep \"PublicKey\" | awk '{print $3}' > ./blspub)\n\ncd ~/alaya-node/data1 && alayakey genkeypair | tee >(grep \"PrivateKey\" | awk '{print $2}' > ./nodekey) >(grep \"PublicKey\" | awk '{print $3}' > ./nodeid) && alayakey genblskeypair | tee >(grep \"PrivateKey\" | awk '{print $2}' > ./blskey) >(grep \"PublicKey\" | awk '{print $3}' > ./blspub)\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"3. Editing genesis files")),(0,r.kt)("p",null,"Modify the genesis block configuration file ",(0,r.kt)("inlineCode",{parentName:"p"},"alaya.json"),"."),(0,r.kt)("p",null,"Add the node information of the two nodes to the initialNodes array, which is 2 because we are generating a two-node cluster environment.The alaya.json file needs to be modified: please replace the contents of the following files 'node0-nodekey ', 'node1-nodekey', 'node0-blspubkey' and 'node1-blspubkey' with the node public key and node BLS public key generated in the previous step.Replace 'your account-address' with the wallet address."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'\u2026\u2026\n  "cbft": {\n  "initialNodes": [{\n        "node": "enode://node0-pubkey@127.0.0.1:16789",\n        "blsPubKey": "node0-blspubkey"\n    },{\n        "node": "enode://node1-pubkey@127.0.0.1:16790",\n        "blsPubKey": "node1-blspubkey"\n    }],\n    \u2026\u2026\n  "alloc": {\n    "your-account-address": {\n        "balance": "999000000000000000000"\n    }\n  },\n\u2026\u2026\n')),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"4. Initialization and startup")),(0,r.kt)("p",null,"Initialize genesis block information for node 0 and node 1, respectively:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"alaya --datadir ~/alaya-node/data0 init alaya.json && alaya --datadir ~/alaya-node/data1 init alaya.json\n")),(0,r.kt)("p",null,"After successful initialization, start node 0 and node 1 in nohup mode:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'cd ~/alaya-node && nohup alaya --identity "alaya0" --datadir ./data0 --port 16789 --http.addr 0.0.0.0 --http.port 6789 --http.api "platon,net,web3,admin,personal" --http --nodiscover --nodekey ./data0/nodekey --cbft.blskey ./data0/blskey > ./data0/alaya.log 2>&1 &\n\ncd ~/alaya-node && nohup alaya --identity "alaya1" --datadir ./data1 --port 16790 --http.addr 0.0.0.0 --http.port 6790 --http.api "platon,net,web3,admin,personal" --http --nodiscover --nodekey ./data1/nodekey --cbft.blskey ./data1/blskey  > ./data1/alaya.log 2>&1 &\n')),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"5. Check")),(0,r.kt)("p",null,"Go to the alaya console for any node as described above to see if the node is connected to its counterpart and to see if the cluster has started successfully by seeing if blockNumber continues to grow."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"alaya attach http://localhost:6789 --exec platon.blockNumber\nalaya attach http://localhost:6790 --exec platon.blockNumber\n")),(0,r.kt)("p",null,"Do this multiple times and watch if the block height increases."))}c.isMDXComponent=!0}}]);