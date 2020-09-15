---
title: Service Workers 实现网站加速和离线缓存
id: 2954
categories:
  - 分享境
date: 2017-03-06 22:42:12
tags:
permalink: /2954
---

最近看到了 Service Workers 这个东西，它可以根据配置为用户缓存网站静态与动态资源：截获用户的所有网络请求，根据缓存配置来决定是从缓存还是网络获取相应资源，从而可以极大提高网页的加载速度。优点有可定制性高、不需要服务端支持、效果显著。

最后的效果就是当你第二次访问我的网站时只会加载大约80k 的资源（除去 AdSense 的情况下），这其中包括了所有图片和音频视频，这 80k 主要是 HTML 和我使用的 [DPlayer](https://github.com/DIYgod/DPlayer) 的 API。

![](/images/sw4.jpg)

甚至可以在断开网络时访问（剪断网线试试吧）：

![](/images/sw2.jpg)

<!--more-->当然局限性也是有的：

只支持 HTTPS，因为可以截获用户的网络请求，需要在一个安全的环境。

兼容性不太好，[点击查看兼容性报告](http://caniuse.com/#search=service%20worker)，目前只有 Chrome Firefox Opera 和部分 Android 浏览器 支持。

![](/images/sw3.jpg)

使用方法网上有很多教程，这里不赘述了，推荐这几篇吧：

[使用service worker+sw-precache实现网站加速](https://metaquant.org/service%20worker-web%20performance-cache.html)

[使用Service worker实现加速/离线访问静态blog网站](https://yangbo.tech/2017/01/15/2017-01-15-speedy-and-offline-site-by-service-worker/)

[Service Workers 与离线缓存](https://segmentfault.com/a/1190000008491458)