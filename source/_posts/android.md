---
title: 我家 Android 初养成
date: 2019-11-24 02:13:22
tags: 分享境
---
最近把用了两年的 iPhone X 换成了 Redmi K20 Pro，体验一下 Android 自由香甜的空气

<p><img style="max-width: 300px" src="/images/android1.jpg"></p>
<!--more-->

## 解锁 Bootloader

小米手机出厂都是锁 Bootloader 的，需要到[官网](http://www.miui.com/unlock/index.html)下载解锁工具解锁

刷机、ROOT 都需要解锁 Bootloader，这是折腾所有东西的第一步

所以我一拿到手机第一件事就是兴冲冲地连接电脑、下载解锁工具、运行解锁程序：

![](/images/android2.jpg)

![](/images/android3.png)

游戏结束

———————————————————————

7 天后：

![](/images/android4.png)

## 刷入 TWRP

Recovery 是安卓的恢复系统，类似 [Windows 的 PE](https://docs.microsoft.com/zh-cn/windows-hardware/manufacture/desktop/winpe-intro) 和 [macOS 的恢复功能](https://support.apple.com/zh-cn/HT201314)，可以用来系统升级和重置手机

刷入第三方的 Recovery 可以获得更多的功能，比如 Root 和 刷入第三方 ROM

其中 [TWRP](https://twrp.me/) 是一个著名的开源 Recovery 映像，在 TWRP 官网搜索 `Redmi K20` 可以看到 TWRP 官方已经提供了对 Redmi K20 Pro 的支持

![](/images/android5.jpg)

但是因为这篇文章咕咕太久了，我刷 TWRP 的时候官方还没有支持 Redmi K20 Pro，我用的是一位国内开发者 [wzsx150](https://weibo.com/u/6033736159) 适配的 [TWRP 映像](https://weibo.com/ttarticle/p/show?id=2309404160776561631202)

![](/images/android6.png)

wzsx150 团队提供了非常方便的一键刷入工具，打开 `recovery-twrp一键刷入工具`

![](/images/android7.png)

根据提示下一步下一步

![](/images/android8.png)

![](/images/android9.png)

期间手机重启一次，再启动自动进入了 TWRP，证明刷入成功

![](/images/android10.jpg)

## 刷入 Magisk

Magisk 是一个兼具稳定性和可玩性的神器：作为一个 Root 方案，它能不破坏系统实现无痛 OTA，作为一个插件扩展平台，它又能提供丰富的自定义模块来满足多样化的定制需求

参考阅读：[少数派 - 每个 Android 玩家都不可错过的神器](https://sspai.com/post/53043)

Magisk 同样也是开源项目，在 [GitHub](https://github.com/topjohnwu/Magisk/releases) 上下载最新版的 Magisk 安装包导入手机中，然后点击 TWRP 的 `安装` 按钮，找到 Magisk 安装包，就可以刷入了

![](/images/android11.jpg)

重启系统后，会发现桌面多了一个 `Magisk Manager`，证明刷入成功

![](/images/android12.jpg)

## Magisk

前面准备了那么多，终于可以安装 Magisk 模块了，Magisk 模块非常丰富，网上资料也很多，所以这里只介绍一下我使用的几个模块

<p><img style="max-width: 400px" src="/images/android13.png"></p>

筑紫A丸：全局替换系统字体，字体名叫筑紫A丸ゴシック，效果就如图所示，很可爱，介绍和下载在[这里](https://mp.weixin.qq.com/s/zGaX15vRE-ZPoHtAiXawhQ)

Google Lens Enabler：欺骗 Google 相册这个设备是一台 Pixel 设备，来开启 Google 智能镜头的功能，然后还有一个重要的额外效果：让 Google 相册拥有无限空间

<p><img style="max-width: 400px" src="/images/android14.jpg"></p>

Riru - Core：Riru 是一个系列模块，使用 Riru 模块都需要先安装 Riru - Core

Riru - Storage Redirect：存储重定向，几乎所有的 Android 应用都会在我们的手机中储存信息，为此，Android 系统提供了 `/data` 和 `sdcard/Android/data` 这两个目录来进行应用数据文件存放，遗憾的是，很多应用开发者并不会遵从这个规范，这让手机内部储存目录显得极为杂乱且文件管理效率低下，使用 Storage Redirect 能很好地解决上述问题，它将散落于各处的应用私有文件夹重新定位到指定的位置，[这里](https://sr.rikka.app/zh-hans/)有它的官方介绍和文档

<p><img style="max-width: 400px" src="/images/android15.jpg"></p>

Tai Chi：太极模块，见下一节

## 太极

介绍太极要先从 Xposed 框架开始

很多人都对 Xposed 的大名有所耳闻，它通过对系统框架的偷天换日，可以修改系统与应用的各种数据，籍此实现无数种可能性，同时也大大地提升了 Android 系统的可玩性，而且有比 Magisk 更丰富的模块

但是 Xposed 框架没有像 Android 系统版本一样能够快速的更新，最新版本停留在了 Android 8.0/8.1 beta3 版本，对于 Android 9.0/10.0 用户，只能选择第三方实现，现在常用的有[太极](https://taichi.cool/README_CN.html)和 [Edxposed](https://github.com/ElderDrivers/EdXposed) 两种方案

我一开始装的是 Edxposed，但是貌似跟 MIUI 11 有兼容性问题无法使用，所以换了太极

下面是我使用的几个模块：

<p><img style="max-width: 400px" src="/images/android16.jpg"></p>

大圣净化和去你大爷的内置浏览器非常香

## Google 相机

Redmi K20 Pro 支持 Camera2 API，所以不需要额外折腾就可以安装 Google 相机

国内开发者[阿狗酱](https://weibo.com/u/5213532617)有分享专门为 Redmi K20 Pro 调教的谷歌相机

<p><img style="max-width: 400px" src="/images/android17.jpg"></p>

得益于 HDR+ 算法，提升非常明显，Google 真的太强了

MIUI 自带相机 vs Google 相机

![](/images/android18.jpg)

iPhone 11 自带相机 vs Google 相机

![](/images/android19.jpg)

综上所述，Android 上很多黑科技确实很香，但整个系统的精致程度、设计感、人性化和软件生态还是跟 iOS 有非常大的差距，这让我痛苦地适应了一个多星期才开始慢慢可以接受，要不是拼多多拆封不给退我可能第二天就换回 iPhone 了

但一旦接受了这种设定，香