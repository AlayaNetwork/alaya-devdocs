(self.webpackChunkalaya_docs=self.webpackChunkalaya_docs||[]).push([[8403],{3905:function(e,t,a){"use strict";a.d(t,{Zo:function(){return u},kt:function(){return h}});var n=a(7294);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var s=n.createContext({}),c=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},u=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,o=e.mdxType,l=e.originalType,s=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),d=c(a),h=o,m=d["".concat(s,".").concat(h)]||d[h]||p[h]||l;return a?n.createElement(m,r(r({ref:t},u),{},{components:a})):n.createElement(m,r({ref:t},u))}));function h(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=a.length,r=new Array(l);r[0]=d;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:o,r[1]=i;for(var c=2;c<l;c++)r[c]=a[c];return n.createElement.apply(null,r)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},3798:function(e,t,a){"use strict";a.r(t),a.d(t,{frontMatter:function(){return r},contentTitle:function(){return i},metadata:function(){return s},toc:function(){return c},default:function(){return p}});var n=a(2122),o=a(9756),l=(a(7294),a(3905)),r={id:"Alaya_Account",title:"Alaya Account",sidebar_label:"Alaya Account"},i=void 0,s={unversionedId:"Alaya_Account",id:"Alaya_Account",isDocsHomePage:!1,title:"Alaya Account",description:"This article will introduce the account and how to create an account in two parts. The first part introduces the basic concepts of accounts, where you can learn some basic concepts of related accounts, as well as some security suggestions. If you are familiar with or not interested in this part, just skip it. In the second part, we mainly talk about operations. This tutorial will teach you how to use alyakey, CLI, MTool, Samurai, ATON and other tools to create accounts and trade on the Alaya network.",source:"@site/docs/Alaya_Account.md",sourceDirName:".",slug:"/Alaya_Account",permalink:"/alaya-devdocs/Alaya_Account",editUrl:"https://github.com/AlayaNetwork/alaya-devdocs/tree/main/website/docs/Alaya_Account.md",version:"current",frontMatter:{id:"Alaya_Account",title:"Alaya Account",sidebar_label:"Alaya Account"},sidebar:"docs",previous:{title:"Networks",permalink:"/alaya-devdocs/Networks"},next:{title:"Architecture",permalink:"/alaya-devdocs/Architecture"}},c=[{value:"Basic Concepts",id:"basic-concepts",children:[{value:"Account",id:"account",children:[]},{value:"Address",id:"address",children:[]},{value:"Private Key and Public Key",id:"private-key-and-public-key",children:[]},{value:"Mnemonic Phrase",id:"mnemonic-phrase",children:[]}]},{value:"Generating An Account",id:"generating-an-account",children:[{value:"ATON",id:"aton",children:[]},{value:"alayakey",id:"alayakey",children:[]},{value:"MTool",id:"mtool",children:[]},{value:"Samurai Wallet",id:"samurai-wallet",children:[]}]},{value:"Summary",id:"summary",children:[]}],u={toc:c};function p(e){var t=e.components,a=(0,o.Z)(e,["components"]);return(0,l.kt)("wrapper",(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"This article will introduce the account and how to create an account in two parts. The first part introduces the basic concepts of accounts, where you can learn some basic concepts of related accounts, as well as some security suggestions. If you are familiar with or not interested in this part, just skip it. In the second part, we mainly talk about operations. This tutorial will teach you how to use alyakey, CLI, MTool, Samurai, ATON and other tools to create accounts and trade on the Alaya network."),(0,l.kt)("h2",{id:"basic-concepts"},"Basic Concepts"),(0,l.kt)("p",null,"If you are stranger to the blockchain, the concept of Alaya's account (Account) may sound complex. Alaya accounts are very different from centralized accounts. Whether in a bank or other centralized applications, such as WeChat and Alipay, you must get your information ready and submit it to a centralized organization before you can open an account. But in Alaya, you can generate a public and private key pair by yourself. If you share your account address (Address) with someone else, he or she can interact with your account."),(0,l.kt)("p",null,"Now  you may have been confused about concepts such as the account, public key, private key and address. Don't worry. We will explain these concepts one by one. Let\u2019s look at the following figure first:"),(0,l.kt)("img",{src:"/alaya-devdocs/img/en/account.assets/account.png",alt:"Account",style:{zoom:"25%"}}),(0,l.kt)("h3",{id:"account"},"Account"),(0,l.kt)("p",null,"Before a formal explanation, let's make an analogy. The ",(0,l.kt)("strong",{parentName:"p"},"ordinary account")," in Alaya is very similar to a bank account. Your bank account will record how much money you have in your account, what operations have been performed, and so on. The same is true in Alaya. The Alaya network maintains a state tree, which is indexed by account addresses and stores account balance (balance), transaction counts (nonces), etc."),(0,l.kt)("p",null,"Alaya also has another type of account called the ",(0,l.kt)("strong",{parentName:"p"},"contract account"),", which is usually called a contract. The information of the contract account and the ordinary account are stored in the same tree. The contract also has a balance (balance), transaction count (nonce), etc., and also codes."),(0,l.kt)("h3",{id:"address"},"Address"),(0,l.kt)("p",null,"In the above analogy, the address is the bank card number of your bank account. In the Alaya network, an Alaya address represents an Ethereum account, and the address is the identifier of the account. As mentioned in the above ","[Account]",", the state tree in Alaya is indexed by address."),(0,l.kt)("p",null,"Unlike a bank account, if someone else knows your account address, then he or she can check all your transactions through your address."),(0,l.kt)("p",null,"You must have noticed that in the Alaya network, all addresses start with atp1 (in the PlatON network, they start with lat1). Why? This is because, in order to improve the readability of the address, the Alaya network encodes the original address (usually expressed in hexadecimal notation, such as the common Ethereum address starting with 0x) to the existing Bech32 address."),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"Bech32 first appeared in Bitcoin, and its composition is as follows:"),(0,l.kt)("p",{parentName:"blockquote"},"hrp(human-readable part): Readable prefix"),(0,l.kt)("p",{parentName:"blockquote"},'Seperator: Separator, always "1".'),(0,l.kt)("p",{parentName:"blockquote"},'data part: The data part, including lowercase letters and numbers. But it does not contain the character "1" (used as a separator), "b", "i", or "o" (not very readable and easy to be confused with other characters). In this way, each bit of the data has 32 possible values.'),(0,l.kt)("p",{parentName:"blockquote"},"checksum: The check part. It is the last 6 digits of the address, which can be used to check the correctness of the string."),(0,l.kt)("p",{parentName:"blockquote"},"The following figure is a schematic diagram of the components of the address:"),(0,l.kt)("img",{src:"/alaya-devdocs/img/en/account.assets/18.png",alt:"\u5730\u5740\u7ec4\u6210\u90e8\u5206",style:{zoom:"50%"}})),(0,l.kt)("p",null,"How to use the public key to generate an address will be detailed in the following section ","[Private Key and Public Key]","."),(0,l.kt)("h3",{id:"private-key-and-public-key"},"Private Key and Public Key"),(0,l.kt)("p",null,"Private key and public key, concepts in asymmetric encryption, are generated with a certain algorithm, and have the following characteristics:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"It is impossible (or very difficult) to deduce the private key from the public key, but it becomes easy the other way around. "),(0,l.kt)("li",{parentName:"ul"},"The data encrypted with the public key can only be decrypted with the private key."),(0,l.kt)("li",{parentName:"ul"},"After the data is signed using the private key, we can use the public key to verify the correctness of the signature.")),(0,l.kt)("p",null,"So what is the relationship between the account and the address in front of the public and private keys?"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"The holder of the private key owns the account and can perform all operations supported by the Alaya network on the account."),(0,l.kt)("li",{parentName:"ul"},"The address is obtained through Hash operation from the public key. That is to say, the address can be easily obtained from the public key, but not the other way around.")),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"Security reminder:"),(0,l.kt)("ol",{parentName:"blockquote"},(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Since the holder of the private key can perform all operations supported by Alaya on the account, if your private key is lost, then you will completely lose your account, and no one can do anything about it.")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Someone suggested that as long as an account has the sending operation, it should no longer be used because its public key has been exposed and the account therefore becomes less secure. It makes sense from a certain perspective. However, under the protection of the current technology, the security impact caused by public key exposure is negligible. So far, there have been no blockchain security issues due to public key exposure.")))),(0,l.kt)("p",null,"Now you must be clear of the relationship between the account, private key (the master key in the figure), public key and address above."),(0,l.kt)("p",null,"Let's talk about how the public key and private key are generated in detail. The most commonly used asymmetric encryption are: ",(0,l.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/RSA_(cryptosystem)"},"RSA"),", ",(0,l.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/ElGamal_encryption"},"Elgamal"),", backpack algorithm, Rabin , DH, ",(0,l.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Elliptic-curve_cryptography"},"ECC")," (elliptic curve encryption algorithm), etc. Like Ethereum, Alaya also uses ECC asymmetric encryption algorithm. Based on the elliptic curve theory, the keys can be faster in creation, smaller in size, and more effective in performance. "),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"ECC: With the full name Elliptic Curve Crypto, it is the general name of a series of encryption algorithms."),(0,l.kt)("p",{parentName:"blockquote"},"ECDSA: With the full name Elliptic Curve Digital Signature Algorithm, it is a specific implementation of ECC. ECDH (Elliptic Curve Diffie-Hellman) for encryption and ECDSA for digital signature are widely-known among all those ECC algorithms."),(0,l.kt)("p",{parentName:"blockquote"},"secp256k1: Despite being a set of methods, ECDSA does not specify which elliptic curve to use, while secp256k1 specifies the value of each attribute of the encryption algorithm. For details, please refer to: ","[Secp256k1-Bitcoin Wiki]","(https:/ /en.bitcoin.it/wiki/Secp256k1). In other words, if you use secp256k1 with a fixed private key, you can generate a fixed public key.")),(0,l.kt)("p",null,"We can use some online tools to verify whether the public and private keys generated by some tools in the following text comply with the rules we mentioned above:"),(0,l.kt)("p",null,"First of all, we have prepared a set of public and private key pairs using aayakey as follows:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"PrivateKey:  d08baac64f52ae1b9c2ea559036650229f07f5d61d869dbb55562a9827fbaeb8\nPublicKey :  628f1d4fc711f609c76ea89c7556236fa0df559fa92c074c5c7869eaf8d96adb7b99f5d4da67606f8d27b1b2f377e81396e622cc8559b7643d856a20765caeaa\n")),(0,l.kt)("p",null,"To put it bluntly, the private key is actually a large random number with a length of 64-bit hexadecimal number (32 bytes). Then we use the online tool: ",(0,l.kt)("a",{parentName:"p",href:"https://paulmillr.com/ecc/"},"Paul Miller \u2014 Elliptic curve calculator (paulmillr.com)"),", as shown in the following figure:"),(0,l.kt)("img",{src:"/alaya-devdocs/img/en/account.assets/19.png",alt:"\u5728\u7ebf\u5de5\u5177\u751f\u6210\u516c\u94a5",style:{zoom:"50%"}}),(0,l.kt)("p",null,"Some of you may wonder, that seems totally different from a public key. In fact, x and y are two decimal numbers, and the one given above is hexadecimal. We just need to convert the two digits and they would turn out to be exactly the same."),(0,l.kt)("p",null,"Now that we have the public key, how do we use it to calculate the address?"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"Use the public key to perform a hash, with the hash algorithm being the Keccak-256 hash value (32bytes):")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"391fb49d63d324a64a2e4cfa6d58e500d2453ed27418ce7f1868960fe5d66af8\n")),(0,l.kt)("ol",{start:2},(0,l.kt)("li",{parentName:"ol"},"Take the last 20 bytes in the result of the previous step, which is the Alaya address:")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"6d58e500d2453ed27418ce7f1868960fe5d66af8\n")),(0,l.kt)("ol",{start:3},(0,l.kt)("li",{parentName:"ol"},"Encode the above address into a Bech32 address:")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"atp1d4vw2qxjg5ldyaqceel3s6ykpljav6hc2ey3yc\n")),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"Note:"),(0,l.kt)("p",{parentName:"blockquote"},"Online tools are used in step 2: ",(0,l.kt)("a",{parentName:"p",href:"https://emn178.github.io/online-tools/keccak_256.html"},"Keccak-256 Online (emn178.github.io)")),(0,l.kt)("img",{src:"/alaya-devdocs/img/en/account.assets/20.png",alt:"\u6ce8\u610f\u4e8b\u9879",style:{zoom:"50%"}}),(0,l.kt)("p",{parentName:"blockquote"},"In step 3, Alaya's js sdk is utilized, and the code used is:"),(0,l.kt)("pre",{parentName:"blockquote"},(0,l.kt)("code",{parentName:"pre",className:"language-js"},"var Web3p = require(\"web3\");\nvar adr = Web3p.utils.toBech32Address('atp', '6d58e500d2453ed27418ce7f1868960fe5d66af8');\nconsole.log(adr);\n"))),(0,l.kt)("p",null,"In this way, we can create an account. Now let's introduce the last concept\u2014the mnemonic phrase."),(0,l.kt)("h3",{id:"mnemonic-phrase"},"Mnemonic Phrase"),(0,l.kt)("p",null,"The term mnemonic phrase is self-explanatory. As we mentioned before, the private key is very important. But it is too long (so that it won't be cracked easily), and has no order or no meaning at all (so that it won't be cracked easily). To remember the private key better, you will have some commonly used words to represent the private key, making the memorization easier."),(0,l.kt)("p",null,"In other words, the mnemonic phrase and the private key can be converted into each other, and the former makes it easier to remember the private key. The conversion of private keys and mnemonic phrases is generally a function provided by peripheral tools, rather than the function of the blockchain itself."),(0,l.kt)("p",null,"If you are an ordinary user, the above is all that you should know and you can skip directly to the next chapter. But if you are a wallet developer, some of the following may be useful to you."),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"How are mnemonic phrases generated and what are the specifications?")),(0,l.kt)("p",null,"To explain the mnemonic phrase, we need to talk about Bitcoin first. After the emergence of Bitcoin, the public has had a lot of discussions on how to save the private key of Bitcoin. There are three discussions that are most relevant to the wallet and mnemonic phrases we use now: BIP32, BIP39, and BIP44."),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"The full name of BIP is Bitcoin Improvement Proposals, which is a document that proposes new features or improvements to Bitcoin. It can be proposed by anyone and will be published on bitcoin/bips after review.")),(0,l.kt)("p",null,"Among them, BIP32, BIP39, and BIP44 jointly define the currently widely used HD Wallet, including its design motives and concepts, implementation methods, examples, etc."),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki"},"BIP32"),': It defines the Hierarchical Deterministic wallet ("HD Wallet" for short), which is a system that can generate a tree structure from a single seed to store multiple sets of keypairs (private key and public key). One difference between Bitcoin and current Alaya is that if the Bitcoins in the transaction account are not used up in a transaction, a new public and private key pair needs to be generated to create new Unspent Transaction Outputs (UTXOs). So in general, a series of accounts need to be created. HD Wallet comes as a perfect solution to this problem. It only requires one seed to create a large number of accounts, and it can also be easily backed up, transferred to other compatible devices (because only seed is required), and put under hierarchical access control. The figure below shows the structure of an HD Wallet.'),(0,l.kt)("img",{src:"/alaya-devdocs/img/en/account.assets/21.png",alt:"HD Wallet",style:{zoom:"50%"}}),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"In Alaya transactions, generating a new account for each transaction is safer, because the public key leakage will also cause a certain security risk, as evidenced by many encryption algorithm cracks in the past. But if you publish the hash (address) of the public key only, the possibility of being cracked is reduced.")),(0,l.kt)("p",null,"With BIP32, people found it still difficult to remember the seed, so BIP39 was proposed."),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki"},"BIP39"),": It expresses ",(0,l.kt)("strong",{parentName:"p"},"seed")," with a single word that is easy to remember and write. Generally composed of ",(0,l.kt)("strong",{parentName:"p"},"12 single characters"),", it is called ",(0,l.kt)("strong",{parentName:"p"},"mnemonic code (phrase)"),". E.g.:"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"hamster all enroll craft achieve analyst success carry choice artefact exit tonight")),(0,l.kt)("p",null,"With BIP39, do you think the wallet is completely defined? For Bitcoin, yes, but later BIP44 enables a seed to support multiple currencies and multiple accounts."),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki"},"BIP44"),": A system based on BIP32, giving special meaning to each layer in the tree structure. It allows the same seed to support ",(0,l.kt)("strong",{parentName:"p"},"multiple currencies, multiple accounts"),", etc. The layers are defined as follows:"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"m / purpose' / coin_type' / account' / change / address_index")),(0,l.kt)("p",null,"The ",(0,l.kt)("inlineCode",{parentName:"p"},"purporse'")," is fixed to ",(0,l.kt)("inlineCode",{parentName:"p"},"44'"),", which means BIP44 is used. And ",(0,l.kt)("inlineCode",{parentName:"p"},"coin_type'")," is used to indicate different currencies. For example, Bitcoin is ",(0,l.kt)("inlineCode",{parentName:"p"},"0'"),", Ethereum is ",(0,l.kt)("inlineCode",{parentName:"p"},"60'"),", Alaya is ",(0,l.kt)("inlineCode",{parentName:"p"},"206'"),", and Platon is ",(0,l.kt)("inlineCode",{parentName:"p"},"486'"),". In an Alaya HD Wallet, the path of the first keypair of the first account (the account here refers to the ",(0,l.kt)("inlineCode",{parentName:"p"},"account'")," defined in BIP44) will be ",(0,l.kt)("inlineCode",{parentName:"p"},"m/44'/206'/0' /0/0"),"."),(0,l.kt)("p",null,"Let's try it out:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"var bip39 = require('bip39')\nvar Wallet = require('ethereumjs-wallet')\nvar Web3p = require('web3')\nvar secp = require(\"noble-secp256k1\")\nvar keccak256 = require('keccak256')\nasync function main(){\n    // Generate mnemonic code\n    var mnemonic = bip39.generateMnemonic()\n    // To make the effect more consistent, we use a mneonic that has been generated before,\n    // For more detailed information on this mneonic, please refer to the \"Using MTool to Generate An Account\" section below \n    // hamster all enroll craft achieve analyst success carry choice artefact exit tonight\n    mnemonic = \"hamster all enroll craft achieve analyst success carry choice artefact exit tonight\";\n\n    // Generate HD wallet\n    // First convert the mnemonic code into a binary seed.\n    var seed = await bip39.mnemonicToSeed(mnemonic)\n\n    // Use seed to generate HD Wallet. To be more specific, it is to generate the Master Key and record it.\n    var hdWallet = Wallet.hdkey.fromMasterSeed(seed)\n    \n\n    // Generate the first Alaya Address\n    // Generate the first keypair of the first account in the Wallet. It can be derived from the Master Key according to its path m/44'/206'/0'/0/0.\n    var key1 = hdWallet.derivePath(\"m/44'/206'/0'/0/0\")\n\n    // Use the public key in keypair to generate address.\n    var privateKey = key1._hdkey.privateKey\n    var publicKey = Buffer.from(secp.getPublicKey(privateKey))\n    publicKey = publicKey.slice(1)\n\n    // publicKey for keccak256 hash\n    var hash = keccak256(publicKey)\n    // Take the last 20 bytes of hash as the address\n    var address = hash.slice(hash.length - 20)\n    // Address obtained\uff1a685ce4cbdd5c19b64ca008cb85b83947e5318efa\n    console.log(address.toString('hex'));\n\n    // Encoding Address\n    // Alaya is very considerate. To prevent you from typing the wrong address (sending money to the wrong person), Alaya will re-encode the address.\n    // The coding process has been detailed before.\n    address1 = Web3p.utils.toBech32Address('atp', address.toString('hex'));\n    // The final Address would be like 0x685ce4CbDd5c19b64CA008cB85b83947e5318EFA\n    console.log(address1);\n}\nmain();\n")),(0,l.kt)("p",null,"The code snippet is very complicated. In addition to Alaya Js SDK, it also uses bip39 (to convert mnemonic phrases into seed), ethereumjs-wallet (to obtain account privatekey with seed), noble-secp256k1 (to convert privateKey into publicKey), keccak256 (to generate an address after hashing the publicKey). Each step of the operation is explained in detail in the code comments, so there will be no more repetition."),(0,l.kt)("p",null,"That's all about the basic concepts. Let's start the practical operation below."),(0,l.kt)("h2",{id:"generating-an-account"},"Generating An Account"),(0,l.kt)("p",null,"This section will explain how to use multiple tools to generate accounts, from graphical interfaces to command-line tools. Below is an overview. You can choose the platform you like:"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null}),(0,l.kt)("th",{parentName:"tr",align:null},"Form"),(0,l.kt)("th",{parentName:"tr",align:null},"Platform Supported"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"ATON"),(0,l.kt)("td",{parentName:"tr",align:null},"Graphical interface"),(0,l.kt)("td",{parentName:"tr",align:null},"Android and iPhone")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"alayakey"),(0,l.kt)("td",{parentName:"tr",align:null},"Command-line tool"),(0,l.kt)("td",{parentName:"tr",align:null},"Ubuntu")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"MTool"),(0,l.kt)("td",{parentName:"tr",align:null},"Command-line tool"),(0,l.kt)("td",{parentName:"tr",align:null},"Windows\u3001Ubuntu")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"Samurai"),(0,l.kt)("td",{parentName:"tr",align:null},"Graphical interface/Explorer wallet"),(0,l.kt)("td",{parentName:"tr",align:null},"\u6240\u6709\u652f\u6301Chrome\u6d4f\u89c8\u5668\u7684\u5e73\u53f0 All platforms that support the Chrome explorer")))),(0,l.kt)("h3",{id:"aton"},"ATON"),(0,l.kt)("p",null,"ATON is a mobile wallet that supports PlatON and Alaya networks. Compared with other third-party wallets, in addition to the functions of ordinary wallets, it also has the function of calling Alaya's built-in contracts, which can be used for delegation and redemption. You can download ",(0,l.kt)("a",{parentName:"p",href:"https://platon.network/wallet"},"ATON Wallet")," from the following address."),(0,l.kt)("img",{src:"/alaya-devdocs/img/en/account.assets/1.png",alt:"\u521d\u59cb\u754c\u9762",style:{zoom:"80%"}}),(0,l.kt)("p",null,'For the sake of safety in this tutorial, we select "PlatON Development Network" for account-related operations. Click "PlatON Development Network" to switch the network, as shown in the following figure:'),(0,l.kt)("img",{src:"/alaya-devdocs/img/en/account.assets/2.png",alt:"\u5207\u6362\u7f51\u7edc",style:{zoom:"80%"}}),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},(0,l.kt)("strong",{parentName:"p"},"Create Wallet"),": Create a brand new wallet."),(0,l.kt)("p",{parentName:"blockquote"},(0,l.kt)("strong",{parentName:"p"},"Import wallet"),": You can use mnemonic phrases, wallet files or private keys to import previously created accounts, or use other wallets to create accounts.")),(0,l.kt)("p",null,"Click Create Wallet to enter the following interface:"),(0,l.kt)("img",{src:"/alaya-devdocs/img/en/account.assets/3.jpg",alt:"\u521b\u5efa\u94b1\u5305",style:{zoom:"80%"}}),(0,l.kt)("p",null,"Choose ordinary or HD for the wallet type. Under normal circumstances, you can choose ordinary. If you choose HD, you will create 30 wallets with the same password at one time, which is unnecessary for ordinary users. ",(0,l.kt)("strong",{parentName:"p"},"Wallet name")," can be anything you want. In this example, it's \"G's Wallet\". ",(0,l.kt)("strong",{parentName:"p"},"Password"),' is recommended to be complicated so it won\'t be easily cracked. Then click "Create Wallet". Now the wallet is successfully created. Go to the "Wallet Created Successfully" page. At this time, you can back up your wallet (or skip it directly, and back up later).'),(0,l.kt)("img",{src:"/alaya-devdocs/img/en/account.assets/4.jpg",alt:"\u94b1\u5305\u521b\u5efa\u6210\u529f",style:{zoom:"80%"}}),(0,l.kt)("p",null,"Click to start backup, and 12 English words will be displayed. Please write down these 12 words on paper and keep them properly. You need to note that ",(0,l.kt)("strong",{parentName:"p"},"these 12 words play the basically same role as the private key. If they are lost or stolen by others, you will lose the ownership of the current wallet. Be sure to keep the mnemonic phrases properly.")," As shown below:"),(0,l.kt)("img",{src:"/alaya-devdocs/img/en/account.assets/5.jpg",alt:"\u5907\u4efd\u52a9\u8bb0\u8bcd",style:{zoom:"80%"}}),(0,l.kt)("p",null,"Then verify the mnemonic phrases:"),(0,l.kt)("img",{src:"/alaya-devdocs/img/en/account.assets/6.jpg",alt:"\u9a8c\u8bc1\u52a9\u8bb0\u8bcd",style:{zoom:"50%"}}),(0,l.kt)("p",null,"Finally complete the backup."),(0,l.kt)("p",null,"Now you can use the newly generated account in the ATON wallet. You can share your address with others, transfer money to others, and vote for your favorite nodes."),(0,l.kt)("h3",{id:"alayakey"},"alayakey"),(0,l.kt)("p",null,"Alayakey is a command-line tool, which is usually installed with the node or installed separately."),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"Note: This tutorial only involves testing on Ubuntu. You need to try it out on Linux/Unix by yourself."),(0,l.kt)("p",{parentName:"blockquote"},"WSL can be used on Windows.")),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"Installing alayakey"),": Enter the following command in the command line:")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"sudo wget https://download.alaya.network/alaya/platon/0.16.2/alayakey -P /usr/bin\nsudo chmod +x /usr/bin/alayakey\n")),(0,l.kt)("p",null,"Then you can use ",(0,l.kt)("inlineCode",{parentName:"p"},"alaya --version")," to check the version of alyakey."),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"Generating the wallet file:")," You can use the following command to generate a wallet file:")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"alayakey generate\n")),(0,l.kt)("p",null,"After that, you will be prompted to enter the password twice, and finally the address of the created wallet will be output. The final output is similar to the following:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"main net Address: atp173gwqattqczz392fea795z7xwltkt2r3rslmcw\n")),(0,l.kt)("p",null,"In the current folder, a keyfile.json will be generated, which is the wallet file. You can use this account by matching the wallet file with the password you just entered."),(0,l.kt)("p",null,"Of course, with this file, you can also use the wallet file in other wallets (such as the ATON wallet)."),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"Generating the public and private key pair"),":")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"alayakey genkeypair\n")),(0,l.kt)("p",null,"The output is similar to the following:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"PrivateKey:  d08baac64f52ae1b9c2ea559036650229f07f5d61d869dbb55562a9827fbaeb8\nPublicKey :  628f1d4fc711f609c76ea89c7556236fa0df559fa92c074c5c7869eaf8d96adb7b99f5d4da67606f8d27b1b2f377e81396e622cc8559b7643d856a20765caeaa\n")),(0,l.kt)("p",null,"The concepts of public and private keys have been mentioned before. Note that you can share only the public key with others. If you find it inconvenient to share public keys, you can use other tools introduced in this chapter to generate account addresses."),(0,l.kt)("h3",{id:"mtool"},"MTool"),(0,l.kt)("p",null,"The installation of MTool on Windows and Ubuntu is very simple. You can refer to: ",(0,l.kt)("a",{parentName:"p",href:"/alaya-devdocs/en/Online_MTool"},"Online MTool Tutorial \xb7 Alaya"),"."),(0,l.kt)("p",null,"After installation, you can use ",(0,l.kt)("inlineCode",{parentName:"p"},"alaya_mtool --version")," to check the version of MTool. Among the versatile functions  of MTool, only the operations related to ",(0,l.kt)("strong",{parentName:"p"},"account generation")," are introduced in this sector."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"alaya_mtool account new staking\n")),(0,l.kt)("p",null,"After you enter the password twice as prompted, the output is similar to the following:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"-name: staking\n-type: NORMAL\n-address:\n address: atp172w2kpvpj6fjszudgg2py87tajzayqusp23j97\n-public key: 0x489085ef457df5c561343442c6a6594e060fa1de88f1e9969f3354cbddf4875662706d4e54b50fbd20636ec04c99ab440d8e18403780dd7d30f472634c36799a\n\n\n**Important** write this Private Key in a safe place.\nIt is the important way to recover your account if you ever forget your password.\n1196cf2b491f5522565918c5432b9f864f88dd04b92045317da9ffc28ff4020b\n**Important** write this mnemonic phrase in a safe place.\nIt is the important way to recover your account if you ever forget your password.\nhamster all enroll craft achieve analyst success carry choice artefact exit tonight\n")),(0,l.kt)("p",null,"Note: All the information is posted in this tutorial for readers' sake. But in fact it is very dangerous to do so, especially the private key and the mnemonic phrase in the last two parts, both of which are very important and cannot be lost or leaked."),(0,l.kt)("p",null,"The above code generates not only the above information but also a wallet file, which is stored in the ",(0,l.kt)("inlineCode",{parentName:"p"},"MTool installation directory\\mtool\\current\\keystore"),". This wallet file has the same function as the wallet file generated by ATON and alyakey."),(0,l.kt)("p",null,"In addition to generating wallets, MTool can also use private keys to ",(0,l.kt)("strong",{parentName:"p"},"restore wallets"),", as follows:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"alaya_mtool account recover -k staking\n")),(0,l.kt)("p",null,"After being prompted to enter the password twice, you will be asked to enter the private key, and the output will be similar to the following:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"-name: stakin\n-type: NORMAL\n-address:\n address: atp172w2kpvpj6fjszudgg2py87tajzayqusp23j97\n-public key: 0x489085ef457df5c561343442c6a6594e060fa1de88f1e9969f3354cbddf4875662706d4e54b50fbd20636ec04c99ab440d8e18403780dd7d30f472634c36799a\n")),(0,l.kt)("p",null,"At the same time, a wallet file will be generated in the ",(0,l.kt)("inlineCode",{parentName:"p"},"MTool installation directory\\mtool\\current\\keystore")," directory."),(0,l.kt)("p",null,"MTool is also versatile, but it is not detailed in this tutorial. For more details, please refer to: ",(0,l.kt)("a",{parentName:"p",href:"/alaya-devdocs/en/Online_MTool"},"Online MTool Tutorial \xb7 Alaya"),"."),(0,l.kt)("h3",{id:"samurai-wallet"},"Samurai Wallet"),(0,l.kt)("p",null,"If you have used MetaMask wallet before, you will be familiar with Samurai wallet. Samurai is the web wallet of Alaya/PlatON, and can be used in all explorers that support Chrome explorer or use Chromium as the core."),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"Note: The Samurai wallet has been updated recently. If you have installed the Samurai wallet before, delete it and reinstall it (remember to back up the wallet private key).")),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Installing Samurai Wallet"),": This article uses Google Chrome as an example to explain how to install Samurai. Since Samurai does not exist in any app store, it needs to be installed manually. First go to ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/AlayaNetwork/Samurai/releases"},"Samurai Github")," to download the latest version of the Samurai wallet, and unzip the installation package. Then open Google Chrome, select Settings -> More Tools -> Extensions."),(0,l.kt)("p",null,"Then open the developer mode -> load the unzipped extension -> select the folder just unzipped, as shown in the figure below:"),(0,l.kt)("img",{src:"/alaya-devdocs/img/en/account.assets/8.png",alt:"Samurai\u5b89\u88c5",style:{zoom:"50%"}}),(0,l.kt)("p",null,"After the installation is complete, Samurai will run automatically. Click Start:"),(0,l.kt)("img",{src:"/alaya-devdocs/img/en/account.assets/9.png",alt:"\u6b22\u8fce\u6765\u5230Samurai",style:{zoom:"80%"}}),(0,l.kt)("p",null,"Then you can either import an existing wallet or create a new wallet. Here we create a new wallet:"),(0,l.kt)("img",{src:"/alaya-devdocs/img/en/account.assets/10.png",alt:"\u5bfc\u5165\u94b1\u5305\u6216\u65b0\u5efa\u94b1\u5305",style:{zoom:"100%"}}),(0,l.kt)("p",null,"The agreement interface appears. Click I agree:"),(0,l.kt)("img",{src:"/alaya-devdocs/img/en/account.assets/11.png",alt:"\u534f\u8bae",style:{zoom:"80%"}}),(0,l.kt)("p",null,"Enter wallet password:"),(0,l.kt)("img",{src:"/alaya-devdocs/img/en/account.assets/12.png",alt:"\u8f93\u5165\u5bc6\u7801",style:{zoom:"80%"}}),(0,l.kt)("p",null,'After you click "Create", you will be prompted whether to back up the mnemonic phrases. If you click "Remind me later", you can use the wallet directly. Here, we back up the mnemonic phrases: first display the mnemonic phrases, and then keep the mnemonic phrases properly, and then click Next:'),(0,l.kt)("img",{src:"/alaya-devdocs/img/en/account.assets/14.png",alt:"\u52a9\u8bb0\u8bcd",style:{zoom:"80%"}}),(0,l.kt)("p",null,"Then, like in other wallets, you need to restore the mnemonic phrases completely by choosing them one by one:"),(0,l.kt)("img",{src:"/alaya-devdocs/img/en/account.assets/15.png",alt:"\u786e\u8ba4\u52a9\u8bb0\u8bcd",style:{zoom:"80%"}}),(0,l.kt)("p",null,"Now you have created a wallet:"),(0,l.kt)("img",{src:"/alaya-devdocs/img/en/account.assets/16.png",alt:"\u606d\u559c",style:{zoom:"80%"}}),(0,l.kt)("p",null,"Since the latest version of Samurai is common to PlatON and Alaya, we need to switch the network to the Alaya network:"),(0,l.kt)("img",{src:"/alaya-devdocs/img/en/account.assets/17.png",alt:"\u9009\u62e9\u7f51\u7edc",style:{zoom:"80%"}}),(0,l.kt)("p",null,"In this way, we have created an account with Samurai Wallet."),(0,l.kt)("h2",{id:"summary"},"Summary"),(0,l.kt)("p",null,"This tutorial covers everything from the concept of accounts to the guide for creating accounts with various wallet tools. Creating an account is just the first step for you to participate in the Alaya network. In the future, you may trade on the Alaya network, use the SDK or RPC interface to interact with the Alaya network, deploy smart contracts, etc. Enjoy yourself in Alaya!"))}p.isMDXComponent=!0}}]);