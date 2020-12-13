---
title: 论 IFTTT 的正确食用姿势
id: 2125
categories:
  - 分享境
date: 2015-11-08 14:19:15
tags:
permalink: /2125
---

### 什么是IFTTT

官网：[https://ifttt.com](https://ifttt.com)

这是一个2011年在美国上线的网站，IFTTT 是 _If This Then That_ 的缩写。通俗的来讲，IFTTT 的作用就是如果触发了一件事，则执行设定好的另一件事。

![](/images/ifttt.png)

结合上图，Recipes 的目的是打通 「this」 和 「that」 两个网络服务，网络服务在这里称为 Channels (频道)，前者称为 Trigger Channel (触发器频道)，后者称为 Action Channel (动作频道)，当触发器频道满足触发条件，那么就会执行动作频道指定的动作。

所以，IFTTT 创建一个「Recipes 流程」的流程如下：选择一个触发器频道，设置它的触发条件，再选择一个动作频道，然后设置它要执行的动作，OK，这样就搞定了。

比如我设置了这样一个Recipes：

![](/images/ifttt1.png)

整个Recipe的意思是 _"**If** new feed item from https://www.anotherhome.net/feed, **then** publish a post to @DIYgod酱"_。

这样等我这篇文章发布之后，一条微博就会自动发送了。

然而还没完，我还有两个涉及微博的 Recipes：<!--more-->![](/images/ifttt2.png)

不出意外的话我的 Facebook 和 Twitter 马上都会出现这篇文章的推送。

#### IFTTT可以做什么

目前 IFTTT 所支持的 Channels 也算比较丰富了，如 Feed (RSS)、GitHub、微博、印象笔记、Dropbox、邮件、SMS、Gmail、Instagram、Pocket、WordPress、OneDrive、OneNote、Twitter、Facebook、天气预报等等，总数多达230多个。它们之中大多数既可以当触发器，也能作为动作来使用的。

![](/images/ifttt3.png)

这里要吐槽一下，230 多个频道里只有一个中国应用，新浪微博，可想国内应用有多么小气，“诶，我干嘛要提供接口哇，你把你的服务接到我的平台里就好了”，诺，大家都是这么想的。

另外得益于发布的 Android 版以及 iOS 版的客户端，现在 IFTTT 的频道里不仅仅是一些互联网服务了，它还新增了诸如等手机的联系人、照片、短信、地理位置、通知推送等「频道」，这让 IFTTT 变得更加的实用。

### IFTTT的有趣玩法

这是一个很酷且具有高自由度的服务，你可以利用它做很多很多有趣的事情。而且虽然国内很多服务没有开放API，但我们可以用 RSS 让很多事情变成可能。

- [明天下雨/下雪/低于0摄氏度/高于35摄氏度，给我发一条iOS系统通知](https://ifttt.com/connect/weather/if_notifications)

- 如果[在Facebook上标记](https://ifttt.com/connect/facebook/dropbox)、[在Instagram上点了“喜欢”一张照片](https://ifttt.com/connect/instagram/dropbox)，则保存到Dropbox相应文件夹

- [如果有人给我发了一封带附件的Gmail，则把附件保存在Dropbox](https://ifttt.com/recipes/98759-save-all-your-gmail-attachments-to-dropbox)

- YouTube上喜欢了一个视频，则[分享到Facebook](https://ifttt.com/connect/youtube/facebook)、 [Twitter](https://ifttt.com/connect/youtube/twitter)上并且[保存链接到印象笔记](https://ifttt.com/connect/youtube/evernote)

- [把手机截图图片自动归类到“截图”相册中](https://ifttt.com/recipes/140665-organize-screenshots-in-an-ios-photo-album)

- [每当添加一张照片时，把照片上传到Dropbox](https://ifttt.com/connect/ios_photos/dropbox)

- [当添加一个Google Calendar 事件时，添加一个同样的iPhone 日历事件](https://ifttt.com/connect/google_calendar/ios_reminders)

- 每天晚上提醒我睡觉

&nbsp;

另外IFTTT 网站上也有很多网友分享出来的 Recipes 可以供你参考或直接使用。

### 扩展阅读

- [IFTTT - 热门问答 - 知乎](http://www.zhihu.com/topic/19607376)

- [触发你的智能生活：IFTTT 入门 - 少数派](http://sspai.com/25270)

- [iFTTT 入门介绍与简单使用设置教程 - 让互联网服务更加智能自动化地为你工作！ | 异次元软件下载](http://www.iplaysoft.com/ifttt.html)

- [你不知道这个叫IFTTT的东西到底有多好玩](http://mp.weixin.qq.com/s?__biz=MzA3NDYwMjk5NQ==&amp;mid=204868306&amp;idx=1&amp;sn=f6f78d5858b6f50cc3c32886b2b74cb3&amp;scene=2&amp;from=timeline&amp;isappinstalled=0#rd)