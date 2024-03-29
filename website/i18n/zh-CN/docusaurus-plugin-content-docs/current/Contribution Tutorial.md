---
id: Contribution_Guidelines
title: 贡献指南
sidebar_label: 贡献指南
---

# 文档贡献指南



首先，非常感谢您考虑为Alaya文档库做出贡献，正是有像您这样优秀的人才使得Alaya技术社区得以持续发展。

本指南将引导您如何在找个一个问题后，修复它，并提交到Github文档存储库。

目前Alaya文档库可能存在很多小问题，修复这些问题对Alaya项目来说是很容易，也很有帮助的贡献。

以下我们将逐步介绍:

1. 发现问题
2. 讨论问题
3. 修复问题
4. 提交一个Pull request
5. 等待审查
6. 合并您的修复

对于一个小问题的修复，上述步骤虽然看起来比较多，为确保文档标准和质量，这些都是有必要的。



## 发现问题

Alaya文档库托管在[Github](https://github.com/AlayaNetwork/alaya-devdocs)上，文档的所有问题都可以在`AlayaNetwork/alaya-devdocs`的【Issue】选项卡下找到。在这里您可以看到当前Open问题。本Repo维护者会尝试给每个问题添加描述性标签，您可以通过标签了解问题难易度来选择可修复的问题。同时，您也可以将在阅读和使用Alaya文档发现的任何问题在`AlayaNetwork/alaya-devdocs`的【Issue】下提交一个新的“Issue”

开始发现问题：

1. 进入Github Alaya文档库 https://github.com/AlayaNetwork/alaya-devdocs
2. 选择【**Issue**】选项卡。
3. 单击**【Label】**下拉菜单并选择**“help wanted”**标签。
4. 选择一个您感兴趣的问题。



## 讨论问题

不同的问题可能改动量会有差异，对于改动很小的问题，可能没有必要讨论或者只需很少的讨论。然而对于一些改动很大需要重写的内容，充分的讨论是必要的，让项目中不同成员能够达成统一的意见。

请注意，结束一个问题讨论可能需要几天或几周的时间。考虑到这一点，尽量在每条信息中涵盖关联人可能需要的所有相关信息。

加入到问题讨论：

1. 通读所有以前的帖子以快速了解该问题。
2. 添加您认为必要的任何评论。
3. 如果您想解决此问题，请发布一条消息，表示您希望修复该问题。

一旦您表明了修复意愿，本Repo维护者就会将这个Issue分配给您。对于一些大的问题修复，社区核心团队会与您进行沟通，确保您能够顺利的解决它。



## 创建修复

如果您对要解决的问题已经有了基本想法和解决方案，接下来您就可以实施您的修复。

这个过程大致是：

1. Fork Alaya文档库仓库https://github.com/AlayaNetwork/alaya-devdocs
2. 在Fork的本地分支上进行修改。
3. Push您的更改。

Fork是将项目复制一份个人副本。您可以随时对此副本进行任意更改，并将您的修改提交，由项目维护者审查并合并您的修改。

以下是创建Alaya文档分支的过程：
 
1. 进入[GitHub](https://github.com/AlayaNetwork/alaya-devdocs)的`AlayaNetwork/alaya-devdocs`存储库。

2. 选择”**Fork**“以创建项目的副本。

3. 将项目副本克隆到本地计算机：

   ```shell
   git clone https://github.com/YOUR_USERNAME/alaya-devdocs.git  && \
   cd docs && \
   cd website   
   ```

4. 在本地计算机进行文档更改。
   - 安装项目依赖
   ```shell
   npm install
   ```
   - 启动项目
   ```shell
   npm run start     # English version
   npm run start:zh  # 中文版本
   ```
   - 在浏览起输入`http://localhost:3000/`预览项目
   

5. 完成所有更改后，请确保将所有内容推送回 GitHub：

   ```shell
   git add .
   git commit -m "What's fixed, issue #ID."
   git push
   ```

6. 预览修改效果
   - 进入github仓库地址
   - 进入【**Setting**】-> 【**Pages**】-> Source。选择`gh-pages`分支，`save`开启预览
   - 等 【**Action**】里面的流程跑完
   - 进入 `https://YOUR_USERNAME.github.io/alaya-devdocs/` 即可预览修改效果

注：提交修复务必对修复的问题进行总结性说明，并引用问题编号，遵循这个规范可以让其他人更容易快速看到您做了什么。



## 创建拉取请求

完成提交并准备好让Repo维护成员对您的工作进行审查后，就可以创建拉取请求了。

1. 进入[GitHub ](https://github.com/AlayaNetwork/alaya-devdocs)的`AlayaNetwork/alaya-devdocs`存储库。
2. 选择【**Pull requests**]选项卡。
3. 单击"**New pull request**"。
4. 单击“**compare across forks**”并从**主存储库**下拉列表中选择您的存储库。
5. 留下您对该pull request的提交说明。
6. 单击“**Create pull request**”。

GitHub 将检查您的更改是否与您尝试合并到的分支产生任何合并冲突。



## 等待审核

来自社区的所有Pull request请求在合并之前必须由至少一名社区核心成员进行审查。根据Pull request请求的大小，审查时间可能需要几分钟到几天的时间。同时，根据Pull request请求的复杂性，可能会需要与您进一步沟通讨论和修改。



## 合并您的修复

一旦您的Pull request请求获得批准，Repo维护者将会完成合并，合并完成后，您会收到Github通知。



## 开始贡献

我们一直在寻找伟大的作家和教育家来帮助我们改进 Alaya文档并使每个人都能更好地使用Alaya，开始您的第一次贡献吧！



### **联系**

如遇问题，您可以在[Discord](https://discord.gg/jAjFzJ3Cff)或者[Forum](https://forum.latticex.foundation/)寻求支持。
