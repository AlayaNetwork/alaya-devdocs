(self.webpackChunkalaya_docs=self.webpackChunkalaya_docs||[]).push([[7818],{3905:function(a,t,e){"use strict";e.d(t,{Zo:function(){return o},kt:function(){return k}});var r=e(7294);function l(a,t,e){return t in a?Object.defineProperty(a,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):a[t]=e,a}function n(a,t){var e=Object.keys(a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(a);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(a,t).enumerable}))),e.push.apply(e,r)}return e}function i(a){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?n(Object(e),!0).forEach((function(t){l(a,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(e)):n(Object(e)).forEach((function(t){Object.defineProperty(a,t,Object.getOwnPropertyDescriptor(e,t))}))}return a}function s(a,t){if(null==a)return{};var e,r,l=function(a,t){if(null==a)return{};var e,r,l={},n=Object.keys(a);for(r=0;r<n.length;r++)e=n[r],t.indexOf(e)>=0||(l[e]=a[e]);return l}(a,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(a);for(r=0;r<n.length;r++)e=n[r],t.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(a,e)&&(l[e]=a[e])}return l}var m=r.createContext({}),u=function(a){var t=r.useContext(m),e=t;return a&&(e="function"==typeof a?a(t):i(i({},t),a)),e},o=function(a){var t=u(a.components);return r.createElement(m.Provider,{value:t},a.children)},p={inlineCode:"code",wrapper:function(a){var t=a.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(a,t){var e=a.components,l=a.mdxType,n=a.originalType,m=a.parentName,o=s(a,["components","mdxType","originalType","parentName"]),c=u(e),k=l,g=c["".concat(m,".").concat(k)]||c[k]||p[k]||n;return e?r.createElement(g,i(i({ref:t},o),{},{components:e})):r.createElement(g,i({ref:t},o))}));function k(a,t){var e=arguments,l=t&&t.mdxType;if("string"==typeof a||l){var n=e.length,i=new Array(n);i[0]=c;var s={};for(var m in t)hasOwnProperty.call(t,m)&&(s[m]=t[m]);s.originalType=a,s.mdxType="string"==typeof a?a:l,i[1]=s;for(var u=2;u<n;u++)i[u]=e[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,e)}c.displayName="MDXCreateElement"},7051:function(a,t,e){"use strict";e.r(t),e.d(t,{frontMatter:function(){return i},contentTitle:function(){return s},metadata:function(){return m},toc:function(){return u},default:function(){return p}});var r=e(2122),l=e(9756),n=(e(7294),e(3905)),i={id:"Samurai_user_manual",title:"Samurai",sidebar_label:"Samurai"},s=void 0,m={unversionedId:"Samurai_user_manual",id:"Samurai_user_manual",isDocsHomePage:!1,title:"Samurai",description:"Samurai\u662f\u4e00\u6b3e\u652f\u6301Alaya\u4e0ePlatON\u7f51\u7edc\u7684\u5f00\u6e90\u6d4f\u89c8\u5668\u63d2\u4ef6\u94b1\u5305\u5de5\u5177\uff0c\u652f\u6301\u94b1\u5305\u521b\u5efa\u3001\u53d1\u9001\u548c\u63a5\u6536ATP\u4e0eLAT\u3001\u4ee5\u53ca\u5141\u8bb8Web DApp\u4e0eAlaya\u6216PlatON\u7f51\u7edc\u8fdb\u884c\u4ea4\u4e92\u3002",source:"@site/i18n/zh-CN/docusaurus-plugin-content-docs/current/Samurai_user_manual.md",sourceDirName:".",slug:"/Samurai_user_manual",permalink:"/alaya-devdocs/zh-CN/Samurai_user_manual",editUrl:"https://github.com/AlayaNetwork/alaya-devdocs/tree/main/website/i18n/zh-CN/docusaurus-plugin-content-docs/current/Samurai_user_manual.md",version:"current",frontMatter:{id:"Samurai_user_manual",title:"Samurai",sidebar_label:"Samurai"},sidebar:"docs",previous:{title:"ATON\u94b1\u5305",permalink:"/alaya-devdocs/zh-CN/ATON_user_manual"},next:{title:"Ledger \u786c\u4ef6\u94b1\u5305",permalink:"/alaya-devdocs/zh-CN/Ledger-hardware-wallet"}},u=[{value:"\u6ce8\u610f\u4e8b\u9879",id:"\u6ce8\u610f\u4e8b\u9879",children:[]},{value:"\u5b89\u88c5",id:"\u5b89\u88c5",children:[]},{value:"\u521d\u59cb\u5316",id:"\u521d\u59cb\u5316",children:[]},{value:"\u4ea4\u6613\u64cd\u4f5c",id:"\u4ea4\u6613\u64cd\u4f5c",children:[{value:"\u53d1\u9001ATP",id:"\u53d1\u9001atp",children:[]},{value:"\u6dfb\u52a0\u5e76\u53d1\u9001\u4ee3\u5e01",id:"\u6dfb\u52a0\u5e76\u53d1\u9001\u4ee3\u5e01",children:[]}]},{value:"\u521b\u5efa\u8d26\u53f7\u4e0e\u7ba1\u7406",id:"\u521b\u5efa\u8d26\u53f7\u4e0e\u7ba1\u7406",children:[{value:"\u521b\u5efa\u8d26\u53f7",id:"\u521b\u5efa\u8d26\u53f7",children:[]},{value:"\u5bfc\u5165\u8d26\u53f7",id:"\u5bfc\u5165\u8d26\u53f7",children:[]}]},{value:"\u7f51\u7edc\u7ba1\u7406",id:"\u7f51\u7edc\u7ba1\u7406",children:[{value:"\u5207\u6362\u7f51\u7edc",id:"\u5207\u6362\u7f51\u7edc",children:[]},{value:"\u6dfb\u52a0\u81ea\u5b9a\u4e49\u7f51\u7edc",id:"\u6dfb\u52a0\u81ea\u5b9a\u4e49\u7f51\u7edc",children:[]}]},{value:"\u8bed\u8a00\u5207\u6362",id:"\u8bed\u8a00\u5207\u6362",children:[]}],o={toc:u};function p(a){var t=a.components,e=(0,l.Z)(a,["components"]);return(0,n.kt)("wrapper",(0,r.Z)({},o,e,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"Samurai\u662f\u4e00\u6b3e\u652f\u6301Alaya\u4e0ePlatON\u7f51\u7edc\u7684\u5f00\u6e90\u6d4f\u89c8\u5668\u63d2\u4ef6\u94b1\u5305\u5de5\u5177\uff0c\u652f\u6301\u94b1\u5305\u521b\u5efa\u3001\u53d1\u9001\u548c\u63a5\u6536ATP\u4e0eLAT\u3001\u4ee5\u53ca\u5141\u8bb8Web DApp\u4e0eAlaya\u6216PlatON\u7f51\u7edc\u8fdb\u884c\u4ea4\u4e92\u3002"),(0,n.kt)("p",null,"Samurai\u4ec5\u5728\u60a8\u7684\u8bbe\u5907\u4e0a\u751f\u6210\u94b1\u5305\u5bc6\u94a5\uff0c\u56e0\u6b64\u53ea\u6709\u60a8\u80fd\u8bbf\u95ee\u60a8\u7684\u94b1\u5305\u8d26\u6237\u548c\u6570\u636e\u3002\u56e0\u6b64\u60a8\u9700\u8981\u5b89\u5168\u4fdd\u7ba1\u94b1\u5305\u5bc6\u94a5\uff08\u79c1\u94a5\u3001\u52a9\u8bb0\u8bcd\uff09\u4ee5\u53ca\u94b1\u5305\u5bc6\u7801\u3002\u76ee\u524dSamurai\u4ec5\u652f\u6301Chrome\u6d4f\u89c8\u5668\u3002"),(0,n.kt)("h2",{id:"\u6ce8\u610f\u4e8b\u9879"},"\u6ce8\u610f\u4e8b\u9879"),(0,n.kt)("p",null,"Samurai\u57fa\u4e8eMetaMask\u76848.0.10\u7248\u672c\u5f00\u6e90\u4ee3\u7801\u4fee\u6539\u7684\u6d4f\u89c8\u5668\u63d2\u4ef6\u94b1\u5305\uff0c\u4e3b\u8981\u662f\u9002\u914dAlaya\u7f51\u7edc\u548cPlatON\u7f51\u7edc\u3002\u7531\u4e8e\u5b98\u65b9MetaMask\u81ea\u8eab\u5b58\u5728\u4e00\u4e9bbug\uff0c\u8bf7\u7528\u6237\u4f7f\u7528Samurai\u65f6\u6ce8\u610f\uff1a"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"\u5728\u4ea4\u6613\u786e\u8ba4\u9875\u9762\u4e0d\u8981\u70b9\u7f16\u8f91\u6309\u94ae\u53bb\u7f16\u8f91\u4ea4\u6613\u76f8\u5173\u4fe1\u606f"),"\u3002"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"\u5728\u4ea4\u6613\u786e\u8ba4\u9875\u9762\uff0c\u70b9\u51fb\u786e\u8ba4\u6309\u94ae\u4e4b\u524d\uff0c\u8bf7\u786e\u8ba4\u63a5\u6536\u5730\u5740\u662f\u5426\u6b63\u786e"),"\u3002")),(0,n.kt)("h2",{id:"\u5b89\u88c5"},"\u5b89\u88c5"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u4ece",(0,n.kt)("a",{parentName:"li",href:"https://github.com/AlayaNetwork/Samurai/releases"},"Release\u5730\u5740"),"\u4e0b\u8f7dSamurai\u63d2\u4ef6\u5305\uff1b"),(0,n.kt)("li",{parentName:"ul"},"\u89e3\u538bSamurai\u63d2\u4ef6\u5305\uff1b"),(0,n.kt)("li",{parentName:"ul"},"\u6253\u5f00Chrome\u6d4f\u89c8\u5668\uff0c\u5728\u5730\u5740\u680f\u8f93\u5165",(0,n.kt)("inlineCode",{parentName:"li"},"chrome://extensions/"),"\u5e76\u56de\u8f66\uff0c\u8fdb\u5165\u5230Chrome\u6269\u5c55\u7a0b\u5e8f\u7ba1\u7406\u9875\u9762\uff1b"),(0,n.kt)("li",{parentName:"ul"},"\u6253\u5f00",(0,n.kt)("strong",{parentName:"li"},"\u5f00\u53d1\u8005\u6a21\u5f0f"),"\u5f00\u5173\uff0c\u9009\u62e9",(0,n.kt)("strong",{parentName:"li"},"\u52a0\u8f7d\u5df2\u89e3\u538b\u7684\u6269\u5c55\u7a0b\u5e8f"),"\uff0c\u5bfc\u5165\u7b2c2\u6b65\u89e3\u538b\u7684\u76ee\u5f55\u5373\u53ef\uff1b")),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/add-chrome.jpg",alt:"\u52a0\u8f7d\u5df2\u89e3\u538b\u7684\u6269\u5c55\u7a0b\u5e8f"}),(0,n.kt)("h2",{id:"\u521d\u59cb\u5316"},"\u521d\u59cb\u5316"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},"\u70b9\u51fb\u6d4f\u89c8\u5668\u5730\u5740\u680f\u53f3\u4fa7Samurai\u7684\u56fe\u6807\uff0c\u7b2c\u4e00\u6b21\u4f7f\u7528\u65f6\uff0c\u4f1a\u6709\u4e00\u4e2a\u63d0\u793a\uff0c\u5982\u4e0b\u56fe\uff1a")),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-welcome.jpg",alt:"\u6b22\u8fce\u9875"}),(0,n.kt)("ol",{start:2},(0,n.kt)("li",{parentName:"ol"},"\u70b9\u51fb",(0,n.kt)("strong",{parentName:"li"},"\u5f00\u59cb\u4f7f\u7528"),"\uff0c\u63a5\u4e0b\u6765\u6709\u4e24\u4e2a\u9009\u62e9\uff0c\u53ef\u4ee5",(0,n.kt)("strong",{parentName:"li"},"\u521b\u5efa\u94b1\u5305"),"\u4e5f\u53ef\u4ee5",(0,n.kt)("strong",{parentName:"li"},"\u5bfc\u5165\u94b1\u5305"),"\u3002")),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-select-action.jpg",alt:"\u9009\u62e9\u94b1\u5305\u521b\u5efa\u65b9\u5f0f"}),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u5bfc\u5165\u94b1\u5305\uff1a")),(0,n.kt)("p",null,"\u70b9\u51fb",(0,n.kt)("strong",{parentName:"p"},"\u5bfc\u5165\u94b1\u5305"),"\uff0c\u8fdb\u5165\u5f15\u5bfc\u9875\uff0c\u70b9\u51fb",(0,n.kt)("strong",{parentName:"p"},"I agree"),"\u8fdb\u5165\u4e0b\u6b65\u5373\u53ef\u3002\u7136\u540e\u8f93\u5165",(0,n.kt)("strong",{parentName:"p"},"\u94b1\u5305\u52a9\u8bb0\u8bcd"),"\u4ee5\u53ca",(0,n.kt)("strong",{parentName:"p"},"\u5bc6\u7801"),"\uff0c\u70b9\u51fb",(0,n.kt)("strong",{parentName:"p"},"\u5bfc\u5165"),"->",(0,n.kt)("strong",{parentName:"p"},"\u5168\u90e8\u5b8c\u6210"),"\u5373\u53ef\u8fdb\u5165\u4e3b\u754c\u9762\u3002"),(0,n.kt)("p",null,"\u6ce8\uff1a\u5f53\u524dSamurai\u52a9\u8bb0\u8bcd\u751f\u6210\u8def\u5f84\u5b58\u5728\u95ee\u9898\uff0c\u4e0d\u652f\u6301\u5916\u90e8\u94b1\u5305\u5e94\u7528\u751f\u6210\u7684\u52a9\u8bb0\u8bcd\u5bfc\u5165\u3002\u5efa\u8bae\u521d\u6b21\u521b\u5efa\u540e\uff0c\u901a\u8fc7\u79c1\u94a5\u5bfc\u5165\u3002"),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-agreement.jpg",alt:"\u7528\u6237\u9690\u79c1\u534f\u8bae"}),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-import-seed.jpg",alt:"\u5bfc\u5165\u79cd\u5b50"}),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-import-end.jpg",alt:"\u5bfc\u5165\u6210\u529f"}),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-import-home.jpg",alt:"\u9996\u9875"}),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u521b\u5efa\u94b1\u5305\uff1a")),(0,n.kt)("p",null,"\u70b9\u51fb",(0,n.kt)("strong",{parentName:"p"},"\u521b\u5efa\u94b1\u5305"),"\uff0c\u8fdb\u5165\u5f15\u5bfc\u9875\uff0c\u70b9\u51fb",(0,n.kt)("strong",{parentName:"p"},"I agree"),"\u8fdb\u5165\u4e0b\u6b65\u5373\u53ef\u3002\u7136\u540e\u8f93\u5165\u65b0\u94b1\u5305\u7684",(0,n.kt)("strong",{parentName:"p"},"\u5bc6\u7801"),"\uff0c\u5e76\u70b9\u51fb",(0,n.kt)("strong",{parentName:"p"},"\u521b\u5efa"),"\u3002"),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-create-password.jpg",alt:"\u521b\u5efa\u5bc6\u7801"}),(0,n.kt)("p",null,"\u8fdb\u5165\u52a9\u8bb0\u8bcd\u5907\u4efd\u754c\u9762\uff0c\u70b9\u51fb\u201c\u70b9\u51fb\u6b64\u5904\u663e\u793a\u5bc6\u8bed\u201d\u53ef\u4ee5\u663e\u793a\u65b0\u5efa\u8d26\u6237\u7684\u52a9\u8bb0\u8bcd(\u52a9\u8bb0\u8bcd\u9700\u8981\u9632\u6b62\u88ab\u5176\u4ed6\u4eba\u770b\u5230, Samurai\u4f7f\u7528\u60a8\u63d0\u4f9b\u7684\u5bc6\u7801\u5728\u672c\u5730\u52a0\u5bc6\u6b64\u4fe1\u606f\uff0c\u4e14\u6c38\u8fdc\u4e0d\u4f1a\u5c06\u5176\u53d1\u9001\u5230\u670d\u52a1\u5668), \u5982\u679c\u70b9\u51fb",(0,n.kt)("strong",{parentName:"p"},"\u7a0d\u540e\u63d0\u9192"),"\u5219\u76f4\u63a5\u5c31\u8fdb\u5165\u65b0\u5efa\u8d26\u6237\u7684Samurai\u4e3b\u754c\u9762\uff08\u4e0d\u5efa\u8bae\u8df3\u8fc7\uff09\u3002"),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-create-seed.jpg",alt:"\u5907\u4efd\u52a9\u8bb0\u8bcd"}),(0,n.kt)("p",null,"\u70b9\u51fb",(0,n.kt)("strong",{parentName:"p"},"\u4e0b\u4e00\u6b65"),"\uff0c\u91cd\u65b0\u8f93\u5165\u6b63\u786e\u7684\u52a9\u8bb0\u8bcd\u987a\u5e8f\uff0c\u70b9\u51fb",(0,n.kt)("strong",{parentName:"p"},"\u786e\u8ba4"),"\u6309\u94ae->",(0,n.kt)("strong",{parentName:"p"},"\u5168\u90e8\u5b8c\u6210"),"\u5373\u53ef\u8fdb\u5165\u4e3b\u754c\u9762\u3002"),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-create-seed-confirm.jpg",alt:"\u786e\u8ba4\u52a9\u8bb0\u8bcd"}),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-import-end.jpg",alt:"\u786e\u8ba4\u6210\u529f"}),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-create-home.jpg",alt:"\u9996\u9875"}),(0,n.kt)("h2",{id:"\u4ea4\u6613\u64cd\u4f5c"},"\u4ea4\u6613\u64cd\u4f5c"),(0,n.kt)("h3",{id:"\u53d1\u9001atp"},"\u53d1\u9001ATP"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Alaya\u4e3b\u7f51\u7edc\u4e0b\uff0c\u5728Samurai\u4e3b\u754c\u9762\u4e0a\u70b9\u51fb",(0,n.kt)("strong",{parentName:"li"},"\u53d1\u9001"),"\u6309\u94ae\uff0c\u5373\u53ef\u5f39\u51fa",(0,n.kt)("strong",{parentName:"li"},"\u6dfb\u52a0\u6536\u4ef6\u4eba"),"\u754c\u9762\u3002")),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-send-address-input.jpg",alt:"\u6dfb\u52a0\u6536\u4ef6\u4eba"}),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u8f93\u5165\u6216\u8005\u9009\u62e9",(0,n.kt)("strong",{parentName:"li"},"\u4e2a\u4eba\u8d26\u6237\u95f4\u8f6c\u8d26"),"\u7684\u5730\u5740\uff0c\u8fdb\u5165\u5230\u4ea4\u6613\u8868\u5355\u754c\u9762\uff1a")),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-send-input.jpg",alt:"\u4ea4\u6613\u8868\u5355"}),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u4ea4\u6613\u8868\u5355\u5fc5\u987b\u586b\u5199\u4ea4\u6613ATP\u7684\u6570\u91cf\uff0c\u7cfb\u7edf\u4f1a\u7ed9\u51fa\u9ed8\u8ba4\u7684\u4ea4\u6613\u8d39\uff0c\u5f53\u7136\u4e5f\u53ef\u4ee5\u81ea\u5df1\u5bf9\u8be5\u503c\u505a\u9002\u5f53\u8c03\u6574\uff0c\u5b8c\u6210\u8868\u5355\u540e\u70b9\u51fb",(0,n.kt)("strong",{parentName:"li"},"\u4e0b\u4e00\u6b65"),"\u8fdb\u5165\u5f85\u786e\u8ba4\u754c\u9762\uff0c\u8be5\u754c\u9762\u4f1a\u663e\u793a\u603b\u5171\u82b1\u8d39\u7684ATP\u6570\u91cf(\u5305\u542b\u624b\u7eed\u8d39)\u3002")),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-send-confirm.jpg",alt:"\u5f85\u786e\u8ba4\u9875\u9762"}),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u70b9\u51fb",(0,n.kt)("strong",{parentName:"li"},"\u786e\u8ba4"),"\u6309\u94ae\u5373\u53ef\u5b8c\u6210ATP\u7684\u53d1\u9001\uff0c\u53ef\u4ee5\u5728\u4e3b\u9875\u9762\u7684",(0,n.kt)("strong",{parentName:"li"},"\u4ea4\u6613\u5217\u8868"),"\u4e2d\u8fdb\u884c\u67e5\u770b\u4ea4\u6613\u72b6\u6001\u3002")),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-tx-detail.jpg",alt:"\u4ea4\u6613\u8be6\u60c5"}),(0,n.kt)("h3",{id:"\u6dfb\u52a0\u5e76\u53d1\u9001\u4ee3\u5e01"},"\u6dfb\u52a0\u5e76\u53d1\u9001\u4ee3\u5e01"),(0,n.kt)("h4",{id:"\u6dfb\u52a0\u4ee3\u5e01"},"\u6dfb\u52a0\u4ee3\u5e01"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u8fdb\u5165\u4e3b\u9875\u9762\uff0c\u70b9\u51fb",(0,n.kt)("strong",{parentName:"li"},"\u8d44\u4ea7\u5217\u8868"),"->",(0,n.kt)("strong",{parentName:"li"},"\u6dfb\u52a0\u4ee3\u5e01"),"\u3002")),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-home-add-token.jpg",alt:"\u6dfb\u52a0\u4ee3\u5e01"}),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u5728\u5f39\u51fa\u6dfb\u52a0\u4ee3\u5e01\u754c\u9762\u6846\u4e2d\uff0c\u6dfb\u52a0\u5df2\u8fde\u63a5\u7684\u7f51\u7edc\u4e2d\u5b58\u5728\u7684",(0,n.kt)("strong",{parentName:"li"},"\u4ee3\u5e01\u5408\u7ea6\u5730\u5740"),"\u5373\u53ef\uff0cSamurai\u4f1a\u6839\u636e\u5408\u7ea6\u5730\u5740\u81ea\u52a8\u53bb\u83b7\u53d6\u4ee3\u5e01\u7684\u7b26\u53f7\u548c\u7cbe\u786e\u5c0f\u6570\u70b9\uff0c\u5b8c\u6210\u540e\u70b9\u51fb",(0,n.kt)("strong",{parentName:"li"},"\u4e0b\u4e00\u6b65"),"\u3002")),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-add-token-input.jpg",alt:"\u6dfb\u52a0\u4ee3\u5e01\u4fe1\u606f"}),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u8fdb\u5165\u6dfb\u52a0\u4ee3\u5e01\u786e\u8ba4\u754c\u9762\uff0c\u754c\u9762\u4f1a\u663e\u793a\u8be5\u8d26\u6237\u4e0b\u8be5\u4ee3\u5e01\u7684\u4f59\u989d\uff0c\u70b9\u51fb",(0,n.kt)("strong",{parentName:"li"},"\u6dfb\u52a0\u4ee3\u5e01"),"\u5373\u53ef\u6dfb\u52a0\u6210\u529f\u3002")),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-add-token-confirm.jpg",alt:"\u786e\u8ba4\u6dfb\u52a0\u4ee3\u5e01"}),(0,n.kt)("p",null,"\u6dfb\u52a0\u6210\u529f\u540e\u8f6c\u5165\u5230\u8be5\u8d26\u6237\u4ee3\u5e01\u8be6\u60c5\u5c55\u793a\u754c\u9762\uff0c\u91cc\u9762\u663e\u793a\u4ee3\u5e01\u7684\u4f59\u989d\uff0c\u4e5f\u53ef\u4ee5\u70b9\u51fb",(0,n.kt)("strong",{parentName:"p"},"\u53d1\u9001"),"\u6309\u94ae\u8fdb\u5165\u4ee3\u5e01\u7684\u8f6c\u8d26\u754c\u9762\uff0c\u540c\u65f6\u4e3b\u754c\u9762\u8d44\u4ea7\u5217\u8868\u4f1a\u663e\u793a\u8be5\u4ee3\u5e01\u8d44\u4ea7\u3002"),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-token-display.jpg",alt:"\u4ee3\u5e01\u663e\u793a"}),(0,n.kt)("h4",{id:"\u4ee3\u5e01\u8f6c\u8d26"},"\u4ee3\u5e01\u8f6c\u8d26"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u53ef\u4ee5\u5728\u8d26\u6237\u4ee3\u5e01\u5c55\u793a\u754c\u9762\u70b9\u51fb",(0,n.kt)("strong",{parentName:"li"},"\u53d1\u9001"),"\u6309\u94ae\u53d1\u8d77\u4ee3\u5e01\u8f6c\u8d26\uff0c\u4e5f\u53ef\u4ee5\u5728\u4e3b\u754c\u9762\u8d44\u4ea7\u5217\u8868\u754c\u9762\u70b9\u51fb\u5bf9\u5e94\u4ee3\u5e01\u7684",(0,n.kt)("strong",{parentName:"li"},"SEND"),"\u6309\u94ae\u53d1\u8d77\u8f6c\u8d26\u3002")),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-assets-list.jpg",alt:"\u53d1\u8d77\u4ee3\u5e01\u8f6c\u8d26"}),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u8fdb\u5165\u6dfb\u52a0\u6536\u4ef6\u4eba\u754c\u9762\uff0c\u540c\u53d1\u9001ATP\u64cd\u4f5c\u4e00\u6837\u8f93\u5165\u6216\u8005\u9009\u62e9",(0,n.kt)("strong",{parentName:"li"},"\u4e2a\u4eba\u8d26\u6237\u95f4\u8f6c\u8d26\u7684\u5730\u5740"),"\uff0c\u8fdb\u5165\u5230\u4ea4\u6613\u8868\u5355\u754c\u9762\u3002")),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-send-token-input.jpg",alt:"\u4ee3\u5e01\u8f6c\u8d26\u8868\u5355"}),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u4ea4\u6613\u8868\u5355\u5fc5\u987b\u586b\u5199\u4ea4\u6613\u7684\u4ee3\u5e01\u6570\u91cf\uff0c\u70b9\u51fb\u4e0b\u4e00\u6b65\u5373\u53ef\u8fdb\u5165\u4ea4\u6613",(0,n.kt)("strong",{parentName:"li"},"\u786e\u8ba4"),"\u754c\u9762:")),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-send-token-confirm.jpg",alt:"\u4ea4\u6613\u786e\u8ba4"}),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u70b9\u51fb",(0,n.kt)("strong",{parentName:"li"},"\u786e\u8ba4"),"\u6309\u94ae\u5373\u53ef\u5b8c\u6210\u4ee3\u5e01\u7684\u53d1\u9001\uff0c\u53ef\u4ee5\u5728\u4e3b\u9875\u9762\u7684\u4ea4\u6613\u5217\u8868\u4e2d\u8fdb\u884c\u67e5\u770b\u4ea4\u6613\u72b6\u6001\u3002")),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-token-tx-detail.jpg",alt:"\u4ee3\u5e01\u4ea4\u6613\u8be6\u60c5"}),(0,n.kt)("h2",{id:"\u521b\u5efa\u8d26\u53f7\u4e0e\u7ba1\u7406"},"\u521b\u5efa\u8d26\u53f7\u4e0e\u7ba1\u7406"),(0,n.kt)("h3",{id:"\u521b\u5efa\u8d26\u53f7"},"\u521b\u5efa\u8d26\u53f7"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u70b9\u51fbSamurai\u4e3b\u9875\u9876\u90e8\u53f3\u4fa7\u94b1\u5305\u5934\u50cf\uff0c\u5728\u663e\u793a\u7684\u4e0b\u62c9\u83dc\u5355\u4e2d\u70b9\u51fb",(0,n.kt)("strong",{parentName:"li"},"\u521b\u5efa\u8d26\u6237"),"\u3002")),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-home-create-account.jpg",alt:"\u53d1\u8d77\u521b\u5efa\u8d26\u6237"}),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u8fdb\u5165\u521b\u5efa\u8d26\u6237\u8868\u5355\u754c\u9762\uff0c\u8f93\u5165",(0,n.kt)("strong",{parentName:"li"},"\u8d26\u6237\u540d\u79f0"),"(\u4e0b\u56fe\u4f8b\u5b50\u662f\u94b1\u53052)\uff0c\u70b9\u51fb",(0,n.kt)("strong",{parentName:"li"},"\u521b\u5efa"),"\u6309\u94ae\u3002")),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-home-create-account-input.jpg",alt:"\u8d26\u6237\u4fe1\u606f"}),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u521b\u5efa\u6210\u529f\u5c06\u8fdb\u5165\u65b0\u521b\u5efa\u7684\u94b1\u5305\u4e3b\u9875\u9762\uff0c\u70b9\u51fb\u9876\u90e8\u53f3\u4fa7\u94b1\u5305\u5934\u50cf\u53ef\u67e5\u770b\u6240\u6709\u94b1\u5305\u8d26\u6237\u5217\u8868\u3002")),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-home-create-account-end.jpg",alt:"\u8d26\u6237\u521b\u5efa\u6210\u529f"}),(0,n.kt)("h3",{id:"\u5bfc\u5165\u8d26\u53f7"},"\u5bfc\u5165\u8d26\u53f7"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u70b9\u51fbSamurai\u4e3b\u9875\u9876\u90e8\u53f3\u4fa7\u94b1\u5305\u5934\u50cf\uff0c\u5728\u663e\u793a\u7684\u4e0b\u62c9\u83dc\u5355\u4e2d\u70b9\u51fb",(0,n.kt)("strong",{parentName:"li"},"\u5bfc\u5165\u8d26\u6237"),"\u3002")),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-home-import-account.jpg",alt:"\u53d1\u8d77\u5bfc\u5165\u8d26\u6237"}),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u8fdb\u5165\u5bfc\u5165\u8d26\u6237\u8868\u5355\u754c\u9762\uff0c\u53ef\u4ee5\u6709\u4e24\u79cd\u5bfc\u5165\u6a21\u5f0f\u9009\u62e9(\u79c1\u94a5/keystore json\u6587\u4ef6)\u3002\u9009\u62e9\u79c1\u94a5\u6a21\u5f0f\uff0c\u5c06\u79c1\u94a5\u7c98\u8d34\u5230\u8868\u5355\u5373\u53ef\uff0c\u7136\u540e\u70b9\u51fb",(0,n.kt)("strong",{parentName:"li"},"\u5bfc\u5165"),"\u6309\u94ae\u3002")),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-home-import-account-privatekey-input.jpg",alt:"\u79c1\u94a5\u5bfc\u5165"}),(0,n.kt)("p",null,"\u9009\u62e9\u5bfc\u5165keystore\u6587\u4ef6\u6a21\u5f0f\uff0c\u9009\u62e9",(0,n.kt)("strong",{parentName:"p"},"JSON\u6587\u4ef6"),"\u7c7b\u578b\uff0c\u70b9\u51fb",(0,n.kt)("strong",{parentName:"p"},"\u9009\u62e9\u6587\u4ef6"),"\uff0c\u4ece\u672c\u5730\u76ee\u5f55\u9009\u53d6keystore\u6587\u4ef6\uff0c\u7136\u540e\u8f93\u5165keystore\u6587\u4ef6\u7684\u5bc6\u7801\uff0c\u6700\u540e\u70b9\u51fb",(0,n.kt)("strong",{parentName:"p"},"\u5bfc\u5165"),"\u6309\u94ae\u3002"),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-home-import-accout-keystore.jpg",alt:"keystore\u5bfc\u5165"}),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u5bfc\u5165\u6210\u529f\u5c31\u8fdb\u5165\u65b0\u5bfc\u5165\u7684\u94b1\u5305\u4e3b\u9875\u9762\uff0c\u70b9\u51fb\u9876\u90e8\u53f3\u4fa7\u94b1\u5305\u5934\u50cf\u53ef\u67e5\u770b\u6240\u6709\u94b1\u5305\u8d26\u6237\u5217\u8868\u3002")),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-home-import-account-end.jpg",alt:"\u5bfc\u5165\u6210\u529f"}),(0,n.kt)("h2",{id:"\u7f51\u7edc\u7ba1\u7406"},"\u7f51\u7edc\u7ba1\u7406"),(0,n.kt)("p",null,"\u9ed8\u8ba4\u60c5\u51b5\u4e0b\uff0cSamurai \u8fde\u63a5\u5230PlatON\u4e3b\u7f51\uff0c\u4e5f\u53ef\u4ee5\u8fde\u63a5\u5230\u5176\u4ed6\u7f51\u7edc\u3002"),(0,n.kt)("h3",{id:"\u5207\u6362\u7f51\u7edc"},"\u5207\u6362\u7f51\u7edc"),(0,n.kt)("p",null,"Samurai\u9ed8\u8ba4\u6dfb\u52a0\u4e86PlatON\u4e3b\u7f51\u3001PlatON\u5f00\u53d1\u6d4b\u8bd5\u7f51\u3001Alaya\u4e3b\u7f51\u3001Alaya\u5f00\u53d1\u6d4b\u8bd5\u7f51\uff0c\u60a8\u53ef\u4ee5\u9009\u62e9\u8fde\u63a5\u7684\u7f51\u7edc\u3002 \u5355\u51fb\u201c\u7f51\u7edc\u201d\u5e76\u4ece\u56db\u4e2a\u7f51\u7edc\u4e2d\u9009\u62e9\u4e00\u4e2a\u7f51\u7edc\u8fdb\u884c\u8fde\u63a5\u3002"),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/choose-network.jpg",alt:"\u9009\u62e9\u7f51\u7edc"}),(0,n.kt)("h3",{id:"\u6dfb\u52a0\u81ea\u5b9a\u4e49\u7f51\u7edc"},"\u6dfb\u52a0\u81ea\u5b9a\u4e49\u7f51\u7edc"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u70b9\u51fb ",(0,n.kt)("strong",{parentName:"li"},"\u7f51\u7edc"),"-> ",(0,n.kt)("strong",{parentName:"li"},"\u81ea\u5b9a\u4e49RPC"),"\u3002")),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/choose-custom-network.jpg",alt:"\u9009\u62e9\u81ea\u5b9a\u4e49\u7f51\u7edc"}),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u8fdb\u5165\u65b0\u7684\u7f51\u7edc\u914d\u7f6e\u754c\u9762\uff0c\u914d\u7f6e\u597d\u8868\u5355\u540e\u70b9\u51fb ",(0,n.kt)("strong",{parentName:"li"},"\u4fdd\u5b58"),"\u3002")),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/custom-network-config.jpg",alt:"\u914d\u7f6e\u81ea\u5b9a\u4e49\u7f51\u7edc"}),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Samurai \u4f1a\u5c1d\u8bd5\u8fde\u63a5\u8282\u70b9\uff0c\u5982\u679c\u8282\u70b9\u8fde\u63a5\u5931\u8d25\uff0c\u4f1a\u5f39\u51fa\u76f8\u5e94\u7684\u5bf9\u8bdd\u6846\u63d0\u793a\u3002")),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/custom-network-connect-failed.jpg",alt:"\u81ea\u5b9a\u4e49\u7f51\u7edc\u8fde\u63a5\u5931\u8d25"}),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u5982\u679c\u8fde\u63a5\u6210\u529f\uff0c\u7f51\u7edc\u5217\u8868\u4e2d\u4f1a\u589e\u52a0\u4e00\u4e2a\u7f51\u7edc\u5217\u8868\u9009\u9879\u3002")),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/custom-network-connect-success.jpg",alt:"\u81ea\u5b9a\u4e49\u7f51\u7edc\u8fde\u63a5\u6210\u529f"}),(0,n.kt)("h2",{id:"\u8bed\u8a00\u5207\u6362"},"\u8bed\u8a00\u5207\u6362"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u70b9\u51fbSamurai\u4e3b\u9875\u9876\u90e8\u53f3\u4fa7\u94b1\u5305\u5934\u50cf\uff0c\u5728\u663e\u793a\u7684\u4e0b\u62c9\u83dc\u5355\u4e2d\u70b9\u51fb",(0,n.kt)("strong",{parentName:"li"},"\u8bbe\u7f6e"),"\u3002")),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-home-setting.jpg",alt:"\u8bbe\u7f6e"}),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u8fdb\u5165\u8bbe\u7f6e\u4e3b\u754c\u9762\uff0c\u7136\u540e\u70b9\u51fb",(0,n.kt)("strong",{parentName:"li"},"\u901a\u7528"),"-> \u8fdb\u5165",(0,n.kt)("strong",{parentName:"li"},"\u5f53\u524d\u8bed\u8a00"),"\u4e0b\u62c9\u6846\u8fdb\u884c\u9009\u62e9(\u652f\u6301\u591a\u79cd\u8bed\u8a00)\u3002")),(0,n.kt)("img",{src:"/alaya-devdocs/img/zh-CN/Samurai.assets/samurai-home-setting-language.jpg",alt:"\u5207\u6362\u8bed\u8a00"}))}p.isMDXComponent=!0}}]);