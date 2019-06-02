---
title: 优雅地下载我的B站投币视频
date: 2019-06-02 16:51:16
categories: 创作集
---
{% raw %}
<style>
twitter-widget {
    margin: 0 auto !important;
}
</style>
<blockquote class="twitter-tweet" data-cards="hidden" data-lang="zh-cn"><p lang="zh" dir="ltr">B站收藏夹一堆失效视频，想做一个收藏后自动下载的小工具🤔<br><br>RSS+IFTTT+Webhooks+ffmpeg?</p><a href="https://twitter.com/DIYgod/status/1131898671111450625?ref_src=twsrc%5Etfw">&mdash; DIYgod (@DIYgod) 2019年5月24日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
{% endraw %}

&nbsp;

下载B站视频很简单，you-get 一行命令的事，但我已经懒到命令都不想输了，如果投币之后 NAS 可以自己去下载就好了<!--more-->

## 设想

整个设想是这样的：投币操作 -> RSS 更新 -> IFTTT 触发 Webhook -> 服务器下载

投币到 RSS 更新可以直接用 [RSSHub](https://docs.rsshub.app/social-media.html#up-%E4%B8%BB%E6%8A%95%E5%B8%81%E8%A7%86%E9%A2%91) 实现，RSS 更新到触发 Webhook 也可以直接在 IFTTT 里配置，整个多米诺骨牌就只缺少 Webhook 到下载这一块

## 行动

于是写了一个简单的小工具 —— [download-webhook](https://github.com/DIYgod/download-webhook)，它可以通过一个简单的 post 请求，触发服务器执行 you-get，下载视频到指定目录

## 效果

1. 给咬人猫投币

 ![](/images/download-webhook1.jpg)

2. RSS 更新

 ![](/images/download-webhook2.jpg)

3. IFTTT 触发

 ![](/images/download-webhook3.jpg)

4. download-webhook 收到下载请求

 ![](/images/download-webhook4.jpg)

5. 下载完成

 ![](/images/download-webhook5.png)

## 进一步

以上同样适用于自动下载 YouTube \ Instagram \ Tumblr 视频、网易云音乐歌曲等，只要 RSSHub 和 you-get 支持

另外对于图片，Webhook URL 参数直接传入图片地址也可以下载，所以也可以轻松实现自动下载 Bing 每日壁纸、甚至 Telegram 的涩图频道（这里就不做推荐了）