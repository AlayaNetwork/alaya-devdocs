### 1、PIP-15文本提案节点投票操作手册

>文本提案地址：https://scan.alaya.network/proposal-detail?proposalHash=0x81a704420dfdafb9056ad1b85066d896899186dac4ce5f72753c8e74131841bc
>
>PIP地址：https://github.com/PlatONnetwork/PIPs/blob/master/Alaya/PIP-15.md

请通过区块链浏览器 https://scan.alaya.network 查看当前节点是否是以下状态：

1. 出块中
2. 共识中
3. 活跃中

如果当前节点为上述3中状态的一种，请参考以下命令进行投票，提案id为<0x81a704420dfdafb9056ad1b85066d896899186dac4ce5f72753c8e74131841bc>：

```bash
# 文本提案投票命令示例
# opinion可选项：yes、no、abstain
mtool-client vote_textproposal --proposalid 0x81a704420dfdafb9056ad1b85066d896899186dac4ce5f72753c8e74131841bc --opinion yes --keystore $MTOOLDIR/keystore/staking.json --config $MTOOLDIR/validator/validator_config.json

```

### 2、反馈

任何疑问，可通过以下渠道反馈。

1. 验证人微信群
2. 邮箱 [validator@platon.network](mailto:validator@platon.network)
