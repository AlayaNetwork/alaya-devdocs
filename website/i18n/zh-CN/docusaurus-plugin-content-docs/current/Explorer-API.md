```
id: Explorer_API_Guide
title: Explorer API
sidebar_label: Explorer API
```



PlatEye（Alayascan.com）是Alaya网络上功能强大、应用广泛的区块链浏览器。由于Alaya节点提供的API功能有限，为此PlatEye也提供了API服务，为各种钱包、工具、Dapp等应用提供了稳定实时的链上数据支持。

本文档对PlatEye区块链浏览器（Alayascan.com）提供的API接口功能和使用进行简要归纳说明，方便开发者快速了解和使用。



## 接口使用规范

* 规范原则
  * 接口返回数据即显示：前端仅做渲染逻辑处理
  * 前端关注交互、渲染逻辑，尽量避免业务逻辑处理的出现
  * 请求响应传输数据格式：JSON，JSON数据尽量简单轻量
* 请求格式
  * GET请求、POST请求，必须包含key为body的入参，所有请求数据包装为JSON格式，并存放到入参body中
  * 例: body: {"nodeID": "1423", "pageNo": 0, "pageSize": 0}
* 响应基本格式
  * {code: 200, data: {message: "success", data: {}}}
  * code: 请求处理状态（200为成功）
  * data.message: 请求处理信息 （code=200&data.message="success"，请求处理成功）
  
  
## 公开API配置

* 文档说明: https://api.alayascan.com/file/docs/#/home
* BasePath: https://api.alayascan.com/alaya-api/
* 可以用postman进行接口的测试



## 浏览器公开API使用说明

* 首页接口
  * 基础数据: `/alaya-api/home/chainStatistic`。推送ATP基础数据，如当前高度、出块节点ID等。
  * 出块趋势: `/alaya-api/home/blockStatistic`。推送最新的50条出块趋势数据。
  * 验证人列表: `/alaya-api/home/stakingList`。推送最新8条验证人信息。
* 地址接口
  * 地址详情: `/alaya-api/address/details`。返回指定地址的详细信息。
  * 地址锁仓详情: `/alaya-api/address/rpplanDetail`。查询链上实时锁仓余额信息及锁仓计划。
* 区块接口
  * 区块列表: `/alaya-api/block/blockList`。推送全部出块列表。
  * 节点区块列表: `/alaya-api/block/blockListByNodeId`。指定节点全部出块列表。
  * 节点区块列表导出: `/alaya-api/block/blockListByNodeIdDownload`。根据过滤条件导指定节点的区块列表。
  * 区块详情: `/alaya-api/block/blockDetails`。返回指定区块的详细信息。
* 提案接口
  * 提案列表: `/alaya-api/proposal/proposalList`。返回提案列表。
  * 提案详情: `/alaya-api/proposal/proposalDetails`。返回指定提案的详细信息。
  * 投票列表: `/alaya-api/proposal/voteList`。返回指定提案的投票信息。
* 节点接口
  * 汇总数据: `/alaya-api/staking/statistic`。推送ATP全部节点的汇总数据，5秒推送一次。
  * 实时节点列表: `/alaya-api/staking/aliveStakingList`。推送全部实时验证节点。
  * 历史节点列表: `/alaya-api/staking/historyStakingList`。推送退出节点列表。
  * 已锁定节点列表: `/alaya-api/staking/lockedStakingList`。推送零出块惩罚中节点列表。
  * 节点详情: `/alaya-api/staking/stakingDetails`。提供验证节点详细信息查看功能。
  * 节点操作记录: `/alaya-api/staking/stakingOptRecordList`。提供节点操作记录查询功能，例如创建提案，投票等。
  * 节点委托列表: `/alaya-api/staking/delegationListByStaking`。节点相关的委托列表查询功能。
  * 地址委托列表: `/alaya-api/staking/delegationListByAddress`。地址相关的委托列表查询功能。
* 交易接口
  * 交易列表: `/alaya-api/transaction/transactionList`。推送全部交易列表。
  * 区块交易列表: `/alaya-api/transaction/transactionListByBlock`。推送区块相关的交易列表。
  * 地址交易列表: `/alaya-api/transaction/transactionListByAddress`。推送地址相关的交易列表。
  * 导出地址交易列表: `/alaya-api/transaction/addressTransactionDownload`。根据过滤条件导出指定地址的交易列表。
  * 交易详情: `/alaya-api/transaction/transactionDetails`。返回指定交易的详细信息。
  * 地址领取奖励列表: `/alaya-api/transaction/queryClaimByAddress`。返回当前地址下所有节点领取奖励情况。
  * 节点相关领取奖励列表: `/alaya-api/transaction/queryClaimByStaking`。节点相关的领取奖励列表查询功能。



## 通过shell命令请求api数据
* 基本语法: 
  * 有参数: curl {url} -H "Accept: application/json" -H "Content-Type: application/json" -d '{params}'
  * 无参数: curl -i -X POST -H "'Content-type': 'application/json'" {url}
* 部分重要接口举例
  * 区块详情: curl https://api.alayascan.com/alaya-api/block/blockDetails -H "Accept: application/json" -H "Content-Type: application/json" -d '{"number":"0"}'
  * 节点列表: curl -i -X POST -H "'Content-type': 'application/json'" https://api.alayascan.com/alaya-api/home/stakingList



## 接口使用样例
* 获取节点列表
  * 使用api: /alaya-api/staking/aliveStakingList
  * 请求详细格式:
	`POST https://api.alayascan.com/alaya-api/home/stakingList`
	`Content-Type: application/json`
	`body={'pageNo': 0, 'pageSize': 0, 'queryStatus': 'all'}`
* 地址详情
  * 使用api: /alaya-api/address/details
  * 请求详细格式:
	`POST https://api.alayascan.com/alaya-api/address/details`
	`Content-Type: application/json`
	`body={'address': 'atp14zljtap2lvntcurr4v3rzysyt30t3ww3fnpdvw'}`



## FAQ
* Q: VUE项目请求接口时提示CORS头缺少"Access-Control-Allow-Origin"是什么原因？
  * A: 这是由于跨域请求造成的问题。需要配置proxyTable，如果请求地址以/api,或者/XXapi 开头，则自动加上target。可参考https://www.cnblogs.com/wayneliu007/p/10569429.html。
* Q: Gas station及DApp相关接口后续会有计划吗？
  * A: 我们的alayascan项目正在推进中，后面会陆续上线Gas station及DApp相关接口。
* Q: 一次请求的数据过多导致网站响应很慢怎么解决？
  * A: 我们后台数据库使用了分页的方式，在使用api进行查询时也可以设置pageSize进行分页查询，但是注意要和前端的显示页面配合好。
* Q: API主要用于的项目场景？
  * A: 可以用于第三方钱包的信息展示，比如获取地址的余额和交易信息等；获取链上数据，用于数据分析等。

