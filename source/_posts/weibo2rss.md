---
title: Weibo2RSS — 使用 RSS 订阅喜欢的微博博主
id: 2837
categories:
  - 创作集
date: 2016-11-02 13:41:01
tags:
permalink: 2837
---

使用 RSS 订阅喜欢的微博博主（比如我）吧~

Demo：[https://api.prprpr.me/weibo/rss/3306934123](https://api.prprpr.me/weibo/rss/3306934123)

RSS 格式输出一个微博博主最新的 15 条微博，可以使用 RSS 阅读器来获取及时推送，配合 [IFTTT](https://ifttt.com/) 还可以实现更多好玩的功能。

原理：新浪微博的[微博秀](http://service.weibo.com/widget/widget_blog.php?uid=3306934123)是不需要登录就可以访问的，使用 Node.js 解析页面，然后输出 RSS 格式。

使用及搭建方法：见 [GitHub](https://github.com/DIYgod/Weibo2RSS)。