---
id: Run_a_dev_node
title: 成为开发网验证节点
sidebar_label: 成为开发网验证节点
---

## 简介

Alaya开发网络和主网功能一致，在版本上可能超前于主网。可用于主网上线前的测试，也可以给开发者或节点提供开发测试环境。

本节描述如何操作成为开发网验证节点。

## 安装开发网全节点

按照[全节点部署](/alaya-devdocs/zh-CN/Run_a_fullnode)指引安装好 Alaya 开发网节点并同步完成。

## 抵押成为验证人

该部分与[成为验证节点](/alaya-devdocs/zh-CN/Become_Verification_Node)操作几乎一致，唯一区别Mtool使用0.16.0版本（[下载链接](https://download.alaya.network/alaya/mtool/linux/0.16.0/alaya_mtool.zip)），且需要修改配置文件`$ALAYA_MTOOLDIR/config.properties`中的`chainId`为开发网络链ID：201030

## 开发网络水龙头

如果您有在开发网络上使用测试`ATP`的需求，您需要通过水龙头来领取，领取地址：<https://faucet.alaya.network/faucet/?id=f93426c0887f11eb83b900163e06151c>

> **提示**：开发网络上的ATP没有实际价值，仅用于开发测试使用！

如果您有领取大额测试ATP的需求，比如创建开发网验证人节点请您按照格式要求发送邮件至：[support@latticex.foundation](mailto:support@latticex.foundation)，邮件要求：

```toml
 标题：Alaya测试网Token申请
 姓名：
 联系方式：
 微信号（或其他即时通讯软件）：
 申请金额：
 用途：
 收款账户：
 备注：
```
