(self.webpackChunkalaya_docs=self.webpackChunkalaya_docs||[]).push([[4114],{3905:function(e,t,a){"use strict";a.d(t,{Zo:function(){return c},kt:function(){return h}});var n=a(7294);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var s=n.createContext({}),d=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},c=function(e){var t=d(e.components);return n.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=d(a),h=o,m=u["".concat(s,".").concat(h)]||u[h]||p[h]||r;return a?n.createElement(m,i(i({ref:t},c),{},{components:a})):n.createElement(m,i({ref:t},c))}));function h(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=a.length,i=new Array(r);i[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var d=2;d<r;d++)i[d]=a[d];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},8796:function(e,t,a){"use strict";a.r(t),a.d(t,{frontMatter:function(){return i},contentTitle:function(){return l},metadata:function(){return s},toc:function(){return d},default:function(){return p}});var n=a(2122),o=a(9756),r=(a(7294),a(3905)),i={id:"Become_Validator",title:"Staking",sidebar_label:"Staking"},l=void 0,s={unversionedId:"Become_Validator",id:"Become_Validator",isDocsHomePage:!1,title:"Staking",description:"This document will describe how to become a validator through staking after the node is deployed.",source:"@site/docs/Become_Validator.md",sourceDirName:".",slug:"/Become_Validator",permalink:"/alaya-devdocs/Become_Validator",editUrl:"https://github.com/AlayaNetwork/alaya-devdocs/tree/main/website/docs/Become_Validator.md",version:"current",frontMatter:{id:"Become_Validator",title:"Staking",sidebar_label:"Staking"},sidebar:"docs",previous:{title:"Run a fullnode",permalink:"/alaya-devdocs/Run_a_fullnode"},next:{title:"Data snapshot",permalink:"/alaya-devdocs/Data_snapshot"}},d=[{value:"Overview",id:"overview",children:[]},{value:"Preparation",id:"preparation",children:[]},{value:"Configure Nginx",id:"configure-nginx",children:[{value:"Switch to normal user",id:"switch-to-normal-user",children:[]},{value:"Download nginx_conf.sh",id:"download-nginx_confsh",children:[]},{value:"Execute the script",id:"execute-the-script",children:[]}]},{value:"Install MTool",id:"install-mtool",children:[]},{value:"Configure MTool",id:"configure-mtool",children:[{value:"Generate wallet",id:"generate-wallet",children:[]},{value:"Configure validator information",id:"configure-validator-information",children:[]}]},{value:"Custom AlayaScan avatar",id:"custom-alayascan-avatar",children:[]},{value:"Initiate a staking operation",id:"initiate-a-staking-operation",children:[]}],c={toc:d};function p(e){var t=e.components,a=(0,o.Z)(e,["components"]);return(0,r.kt)("wrapper",(0,n.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"This document will describe how to become a validator through staking after the node is deployed."),(0,r.kt)("h2",{id:"overview"},"Overview"),(0,r.kt)("p",null,"Alaya is a blockchain project that implements democratic governance. Validator nodes are jointly selected by all ATP holders to maintain and develop the Alaya network. The 101 nodes with the most votes will become candidate nodes, from which 25 validator nodes will be randomly selected using VRF to participate in the management of the entire Alaya network."),(0,r.kt)("p",null,"This section describes how to operate as a validator node."),(0,r.kt)("h2",{id:"preparation"},"Preparation"),(0,r.kt)("p",null,"Before becoming a validator, make sure that the server has the following conditions:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The Alaya node has been installed and synchronized according to the instructions of ",(0,r.kt)("a",{parentName:"li",href:"/alaya-devdocs/en/Run_a_fullnode/"},"Installing a Node"))),(0,r.kt)("h2",{id:"configure-nginx"},"Configure Nginx"),(0,r.kt)("p",null,"For security reasons, it is not recommended to open the rpc port of the node directly (the node server defaults to Ubuntu 18.04). You can consider using Nginx for reverse proxy, and strengthen the security of Nginx ports through user authentication and HTTPS. If the user changes the node data directory when installing Alaya, the nginx_conf.sh script also needs to be modified to the same node data directory."),(0,r.kt)("h3",{id:"switch-to-normal-user"},"Switch to normal user"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"View current user"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"whoami\n")),(0,r.kt)("blockquote",{parentName:"li"},(0,r.kt)("p",{parentName:"blockquote"},"If it is displayed as a ",(0,r.kt)("inlineCode",{parentName:"p"},"root")," user, you need to switch to a normal user."))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Switch to normal user"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"su user\n")),(0,r.kt)("blockquote",{parentName:"li"},(0,r.kt)("font",{color:"red"},"`user`: Indicates a normal user name, please modify it according to the actual user name.")))),(0,r.kt)("h3",{id:"download-nginx_confsh"},"Download nginx_conf.sh"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"wget https://download.alaya.network/alaya/scripts/nginx_conf.sh\n")),(0,r.kt)("h3",{id:"execute-the-script"},"Execute the script"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"chmod +x nginx_conf.sh && ./nginx_conf.sh\n")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"Notes")),(0,r.kt)("ul",{parentName:"blockquote"},(0,r.kt)("li",{parentName:"ul"},"When the prompt shows ",(0,r.kt)("inlineCode",{parentName:"li"},"[sudo] password for"),", enter the password of the current account."),(0,r.kt)("li",{parentName:"ul"},"When the prompt shows ",(0,r.kt)("inlineCode",{parentName:"li"},"Enter your name:"),", enter the user name; when the prompt shows ",(0,r.kt)("inlineCode",{parentName:"li"},"Enter your password:"),", enter the password. Be sure to keep in mind the user name and password (it is recommended not to include spaces in the password), and you will need to fill in the information in subsequent MTool configuration of validator information."),(0,r.kt)("li",{parentName:"ul"},"When the prompt shows ",(0,r.kt)("inlineCode",{parentName:"li"},"nginx conf succeed"),", it means that nginx has been successfully configured. If not, please feed back specific problems to our customer service."))),(0,r.kt)("h2",{id:"install-mtool"},"Install MTool"),(0,r.kt)("p",null,"Proceed as follows:"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Step1. Download MTool Toolkit")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"wget http://download.alaya.network/alaya/mtool/linux/0.16.1/alaya_mtool.zip\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Step2. Unzip the MTool toolkit")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"(if ! command -v unzip;then sudo apt install unzip; fi;) && unzip alaya_mtool.zip && cd alaya_mtool\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Step3. Download script")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"The script is downloaded to the ",(0,r.kt)("font",{color:"red"},"mtool-client")," directory, otherwise the script cannot find the path of the new version of mtool.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"wget https://download.alaya.network/alaya/scripts/mtool_install.sh\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Step4. Execute the command to install Mtool")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"chmod +x mtool_install.sh && ./mtool_install.sh\n")),(0,r.kt)("blockquote",null,(0,r.kt)("ul",{parentName:"blockquote"},(0,r.kt)("li",{parentName:"ul"},"When the prompt shows  ",(0,r.kt)("font",{color:"red"},"Install mtool succeed"),", it means that MTool has been successfully installed. If not, please feed back specific problems to our official customer service."))),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Step5. Restart the session window")),(0,r.kt)("p",null,"After the installation is complete, you need to ",(0,r.kt)("font",{color:"red"},"restart the session window")," to make the newly added environment variables take effect."),(0,r.kt)("h2",{id:"configure-mtool"},"Configure MTool"),(0,r.kt)("h3",{id:"generate-wallet"},"Generate wallet"),(0,r.kt)("p",null,"In Alaya, two wallets are created for staking as a validator to generate blocks. If you already have a wallet, you can skip this step by copying the wallet file to the ",(0,r.kt)("inlineCode",{parentName:"p"},"$ALAYA_MTOOLDIR/keystore")," directory."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Staking wallet: The staking wallet is used to stake tokens. Only after the staking is successful can a node becomes an alternative validator candidate. Run the following command to create a staking wallet:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"alaya_mtool account new staking\n")),(0,r.kt)("p",null,"Enter the password once and enter it again for confirmation to create a wallet file. After the wallet file is created, a staking wallet file ",(0,r.kt)("inlineCode",{parentName:"p"},"staking.json")," will be generated in the directory ",(0,r.kt)("inlineCode",{parentName:"p"},"$ALAYA_MTOOLDIR/keystore"),"."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Reward wallet: It is used to collect block rewards and staking rewards. Staking rewards are uniformly distributed to validators, which are distributed by the validators themselves. Run the following command to create a reward wallet:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"alaya_mtool account new reward\n")),(0,r.kt)("p",null,"Enter the password once and enter it again for confirmation to create a wallet file. After the wallet file is created, a staking wallet file ",(0,r.kt)("inlineCode",{parentName:"p"},"staking.json")," will be generated in the directory ",(0,r.kt)("inlineCode",{parentName:"p"},"$ALAYA_MTOOLDIR/keystore"),"."),(0,r.kt)("h3",{id:"configure-validator-information"},"Configure validator information"),(0,r.kt)("h4",{id:"download-the-script"},"Download the script"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"cd $ALAYA_MTOOLDIR && wget https://download.alaya.network/alaya/scripts/validator_conf.sh\n")),(0,r.kt)("h4",{id:"run-the-script-configuration"},"Run the script configuration"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ chmod +x validator_conf.sh && ./validator_conf.sh\n")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"Notes:")),(0,r.kt)("ul",{parentName:"blockquote"},(0,r.kt)("li",{parentName:"ul"},'When the prompt shows "Please enter the platon node IP address:", please enter the Alaya node server ip address.'),(0,r.kt)("li",{parentName:"ul"},'When the prompt shows "Enter your name:", please enter the username when configuring Alaya node nginx.'),(0,r.kt)("li",{parentName:"ul"},'When the prompt shows "Enter your password:", please enter the password when configuring Alaya node nginx.'),(0,r.kt)("li",{parentName:"ul"},'When the prompt shows "validator conf success", and when the validator_config.json content printed at the end is normal, it means that the script is executed successfully. If the script is not executed successfully, please contact our official customer service to feed back specific questions or use the non-http configuration below.'))),(0,r.kt)("h4",{id:"description-of-validator-information-configuration-file"},"Description of validator information configuration file"),(0,r.kt)("p",null,"After the validator information is configured, the validator information file validator_config.json will be generated in the validator subdirectory of the MTool installation directory. The file content is as follows:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "nodePublicKey": "0abaf3219f454f3d07b6cbcf3c10b6b4ccf605202868e2043b6f5db12b745df0604ef01ef4cb523adc6d9e14b83a76dd09f862e3fe77205d8ac83df707969b47",\n  "blsPubKey": "82d740cbc0314ec558c5426f88fdad6f07a07f9846c6be4e40cd628b74b9f641ddad01e4c281a2c3693f8ff2a73a410297aff379ee0575127d51de99b97acc9a1b7bc8ca132ef6f0379a3ec9d76a603d623176e49e1c53e87fead36317895099",\n  "nodeAddress": "https://dd:dolphin2@domain3",\n  "nodePort": "16789",\n  "nodeRpcPort": "443",\n  "certificate": "/home/dolphintwo/mtool-client/ca.crt"\n}\n')),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"If you don\u2019t need https encryption for intranet access, you don\u2019t need to perform the two operations of ",(0,r.kt)("font",{color:"red"},"configuring Nginx")," or ",(0,r.kt)("font",{color:"red"},"configuring validator information"),", and write manually in the ",(0,r.kt)("inlineCode",{parentName:"p"},"$ALAYA_MTOOLDIR/validator/validator_config.json")," file (the content of the file can be modified according to the actual situation).")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'{\n  "nodePublicKey": "Content in platon-node/data/nodeid",\n  "blsPubKey": "Content in platon-node/data/blspub",\n  "nodeAddress": "http://127.0.0.1 or other IP address of this machine",\n  "nodePort": "16789",\n  "nodeRpcPort": "6789",\n}\n')),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"Parameter description:")),(0,r.kt)("ul",{parentName:"blockquote"},(0,r.kt)("li",{parentName:"ul"},"nodePublicKey: Node ID, which can be viewed in the nodeid file under the node data directory data."),(0,r.kt)("li",{parentName:"ul"},"blsPubKey: BLS public key, which can be viewed in the blspub file under the node data directory data."),(0,r.kt)("li",{parentName:"ul"},"nodeAddress: The node address is divided into two cases: using Nginx and not using Nginx:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"If you use Nginx, you need to use ",(0,r.kt)("strong",{parentName:"li"},"https")," protocol whose format is: ",(0,r.kt)("inlineCode",{parentName:"li"},"https://test:test@domain3"),". Domain3 points to the IP address filled in when ",(0,r.kt)("inlineCode",{parentName:"li"},"validator_conf.sh")," is executed in the hosts file."),(0,r.kt)("li",{parentName:"ul"},"If you do not use Nginx, you need to use the ",(0,r.kt)("strong",{parentName:"li"},"http")," protocol. If MTool and the node are on the same machine or in the same local area network, you can use the intranet IP, otherwise use the public IP whose format is: ",(0,r.kt)("inlineCode",{parentName:"li"},"http://18.238.183.12"),"."))),(0,r.kt)("li",{parentName:"ul"},"nodePort: Node P2P port. The default is 16789."),(0,r.kt)("li",{parentName:"ul"},"nodeRpcPort: The node address is divided into two cases: using Nginx and not using Nginx:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"If Nginx is used, the default port is 443."),(0,r.kt)("li",{parentName:"ul"},"If Nginx is not used, the default port is 6789."))),(0,r.kt)("li",{parentName:"ul"},"certificate: ca certificate address, which can be deleted if Nginx reverse proxy is not used."))),(0,r.kt)("h2",{id:"custom-alayascan-avatar"},"Custom AlayaScan avatar"),(0,r.kt)("p",null,"If users do not need to display their specified avatar on AlayaScan, they can skip this step. Otherwise, the following operations are required:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Register a keybase account")),(0,r.kt)("p",{parentName:"li"},"Users first need to register on the official website of ",(0,r.kt)("a",{parentName:"p",href:"https://keybase.io/"},"keybase.io")," . If they have already registered, they can log on the official website of keybase.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Upload specified avatar")),(0,r.kt)("p",{parentName:"li"},"Click the user avatar to upload the avatar.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Generate PGP key")),(0,r.kt)("p",{parentName:"li"},"If the user has a ",(0,r.kt)("inlineCode",{parentName:"p"},"PGP key"),", after a successful login, a series of 16-bit public keys will be displayed next to the user's avatar, such as: ",(0,r.kt)("inlineCode",{parentName:"p"},"EB621920A48D0699"),"; if the user does not have a ",(0,r.kt)("inlineCode",{parentName:"p"},"PGP key"),", click ",(0,r.kt)("inlineCode",{parentName:"p"},"add a PGP key")," next to the user's avatar to generate.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Specify the externalId value")),(0,r.kt)("p",{parentName:"li"},"When initiating the staking operation, specify the ",(0,r.kt)("inlineCode",{parentName:"p"},"--external_id")," parameter to be the ",(0,r.kt)("inlineCode",{parentName:"p"},"PGP key")," generated in the previous step."))),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Tip: After the user completes the staking, the avatar customized by the user can be displayed on AlayaScan.")),(0,r.kt)("h2",{id:"initiate-a-staking-operation"},"Initiate a staking operation"),(0,r.kt)("p",null,"If the consensus node is deployed and is catching up the block height of ",(0,r.kt)("a",{parentName:"p",href:"https://scan.alaya.network/"},"AlayaScan"),", you can use MTool for staking. Please ensure that the balance of the staking account is sufficient before staking. The minimum threshold for staking is 10,000 ATP."),(0,r.kt)("p",null,"Please do not stake all the ATP of the staking account. Keep at least 1 ATP for the payment of the transaction fees for initiating node management, such as voting for upgrade proposals, unstaking and other transactions."),(0,r.kt)("p",null,"Excuting command"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"alaya_mtool staking --config $ALAYA_MTOOLDIR/validator/validator_config.json --keystore $ALAYA_MTOOLDIR/keystore/staking.json --amount 10000 --benefit_address xxx196278ns22j23awdfj9f2d4vz0pedld8a2fzwwj --delegated_reward_rate 8500 --node_name myNode --website www.mywebsite.com --details myNodeDescription --external_id 121412312\n")),(0,r.kt)("p",null,"Enter the password of the staking wallet and press Enter. If the following information is displayed, the staking is successful:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"operation finished\ntransaction hash:\n0x89b964d27d0caf1d8bf268f721eb123c4af57aed36187bea90b262f4769eeb9b\nSUCCESS\n")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"Parameter description:")),(0,r.kt)("ul",{parentName:"blockquote"},(0,r.kt)("li",{parentName:"ul"},"config: The path of the validator information file."),(0,r.kt)("li",{parentName:"ul"},"keystore: The path of the cold wallet for sending transactions."),(0,r.kt)("li",{parentName:"ul"},"amount: Staking amount, not less than the staking threshold of 10,000 ATP, no more than 8 decimal places (unlocked balance is staked)."),(0,r.kt)("li",{parentName:"ul"},"restrictedamount: Not less than the staking threshold of 10,000 ATP, no more than 8 decimal places (lock-up balance is staked)."),(0,r.kt)("li",{parentName:"ul"},"autoamount: Not less than 10,000 ATP \u2014 The lock-up balance will be staked first; if the lock-up balance is not enough, then the unlocked balance will be staked."),(0,r.kt)("li",{parentName:"ul"},"benefit_address: The account to receive staking reward."),(0,r.kt)("li",{parentName:"ul"},"delegated_reward_rate: The proportion of delegation reward, unit: per ten thousand, integer, range ","[","0,10000]. For example, enter 8,500, and it means that the reward rate is 85%, and the node income is 15%."),(0,r.kt)("li",{parentName:"ul"},"node",(0,r.kt)("em",{parentName:"li"},"name: Validator name, no more than 30 bytes, beginning with a letter, including letters, numbers, space, -, "),", and #)."),(0,r.kt)("li",{parentName:"ul"},"website: Official website path, no more than 70 bytes, composed of numbers and letters."),(0,r.kt)("li",{parentName:"ul"},"details: A brief introduction of the validator, no more than 280 bytes. English is recommended."),(0,r.kt)("li",{parentName:"ul"},"external_id: The ID of the node avatar icon in keybase.io, or the ID of external system authentication."))))}p.isMDXComponent=!0}}]);