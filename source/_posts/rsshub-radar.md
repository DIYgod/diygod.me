---
title: RSSHub Radar — 订阅一个 RSS 源不应该这么难
date: 2019-08-06 11:40:33
categories: 创作集
---
![](/images/rsshub-radar5.jpg)

> 如果你问我，RSSHub 能否改变 RSS 的命运，我也不晓得，但我晓得，不认命，就是 RSSHub 的命。 ——《哪吒之魔童降世》

如果你还不知道 RSS：[《我有特别的 RSS 使用技巧》](https://diygod.me/ohmyrss/)
如果你还不知道 RSSHub：[《通过 RSSHub 订阅不支持 RSS 的网站》](https://sspai.com/post/47100)

首先最大的 respect 献给 RSSHub 的 [244 名参与者](https://docs.rsshub.app/#contributors)

## 订阅一个 RSS 源太难了

首先需要网站提供了 RSS（这一前提通常就无法满足）；然后我们要随缘在页面中找到 RSS 链接；然后复制链接、打开如 Feedly Inoreader 的 RSS 服务、点击添加订阅、粘贴链接、添加

看，顺利订阅一个 RSS 源需要天时（随缘找到了 RSS）地利（网站提供了 RSS）人和（不因为订阅步骤过于麻烦而中途放弃），缺一不可

都 9102 年了，世界不应该这样

<!--more-->

## 解决这个问题

为了解决这个问题，RSSHub Radar 诞生了

[Chrome Web Store](https://chrome.google.com/webstore/detail/rsshub-radar/kefjpfngnndepjbopdmoebkipbgkggaa) | [GitHub](https://github.com/DIYgod/RSSHub-Radar)

RSSHub Radar 是 RSSHub 的衍生项目，她是一个可以帮助你快速发现和订阅当前网站 RSS 和 RSSHub 的浏览器扩展

![](/images/rsshub-radar1.jpg)

使用很简单，我们在进入一个新页面时，RSSHub Radar 会**自动检测**当前页面有没有 RSS 和 RSSHub 支持，检测到则会在右下角显示一个角标，如果我们想订阅当前页面的 RSS，点击扩展图标，会弹出一个列表，如图所示，列表有三项内容：**当前页面上的 RSS、适用于当前页面的 RSSHub、适用于当前网站的 RSSHub**，你可以选择复制链接或**一键订阅**到 Feedly Inoreader TinyTinyRSS

![](/images/rsshub-radar2.jpg)

设置页允许你使用自建的 RSSHub 域名、设置快捷键、立即更新规则、选择一键订阅到 TinyTinyRSS 还是 Feedly Inoreader、选择是否开启角标提醒等

![](/images/rsshub-radar3.jpg)

支持列表列出了当前支持的 RSSHub 规则

## RSSHub Radar 是如何工作的

RSSHub Radar 是开源的，你可以直接去 [GitHub](https://github.com/DIYgod/RSSHub-Radar) 看源码

当我们进入一个新页面时，RSSHub Radar 开始检测当前页面的 RSS 和 RSSHub

**当前页面自带的 RSS**

分析页面中的每个链接显然是不现实的，好在标准中指定了一种特殊 MIME 类型的 link 标签来指明 RSS 链接，`link[type="application/rss+xml"]` 和 `link[type="application/atom+xml"]`，RSSHub Radar 正是通过这个标签来检测页面是否有自带 RSS，具体实现在[这里](https://github.com/DIYgod/RSSHub-Radar/blob/master/src/js/content/utils.js#L14)

**适用于当前页面的 RSSHub**

使用[给定规则](https://github.com/DIYgod/RSSHub/blob/master/assets/radar-rules.js)，根据当前页面的 URL 或 DOM 来获取 RSSHub 链接，规则各个字段的具体含义见[文档](https://docs.rsshub.app/joinus/#%E6%8F%90%E4%BA%A4%E6%96%B0%E7%9A%84-rsshub-radar-%E8%A7%84%E5%88%99)，具体实现在[这里](https://github.com/DIYgod/RSSHub-Radar/blob/master/src/js/background/utils.js#L111)

每隔 5 个小时从 GitHub 远程更新一次规则

**一键订阅**

Feedly Inoreader TinyTinyRSS 都提供了用于订阅的接口，不同的是 Feedly 需要进入页面确认一下，而另外两个会直接订阅上

比如访问这个 URL 可以快速使用 Feedly 订阅我的博客（需要点 FOLLOW 确认）：
https://feedly.com/i/subscription/feed/https://diygod.me/atom.xml

这个 URL 可以快速使用 Inoreader 订阅我的博客：
https://www.inoreader.com/feed/https://diygod.me/atom.xml

## 参与我们

如果你对 RSSHub 感兴趣，欢迎[参与](https://docs.rsshub.app/joinus/)或[支持](https://docs.rsshub.app/support/)我们

最后祝哪吒票房破 50 亿，还没看的一定要去看嗷！

![](/images/rsshub-radar4.gif)
