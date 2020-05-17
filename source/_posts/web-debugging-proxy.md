---
title: 科学的 Web 调试代理实践
date: 2020-05-14 15:58:54
tags:
---

前端经常需要一些特殊的调试环境，这时有一个科学的 Web 调试代理工具（以下称代理工具）显得尤其重要<!--more-->

我用的第一个代理工具是 [Charles]([https://www.charlesproxy.com/](https://www.charlesproxy.com/)，功能多但缺点也很明显，笨重、配置麻烦，爬

后来换到了 [Zan Proxy]([https://github.com/youzan/zan-proxy](https://github.com/youzan/zan-proxy)

Zan Proxy 是一个 Node.js 编写的代理工具，跟大杂烩 Charles 不一样，专注于 Web 调试，轻量、配置方便，虽然功能很简单，但对我来说够用了

配置都是在一个 Web 页进行，界面很舒服，我用它做一些简单的转发请求、修改响应头、mock 数据

![](/images/web-debugging2.jpg)

但随着工作内容的发展，需要的调试环境也越来越复杂，Zan Proxy 已经慢慢不能满足我的需求

&nbsp;

[LightProxy]([https://github.com/alibaba/lightproxy](https://github.com/alibaba/lightproxy) 适时地出现在了我的视野

![](/images/web-debugging3.png)

LightProxy 是一款基于 [whistle]([https://github.com/avwo/whistle](https://github.com/avwo/whistle) 的本地代理抓包软件（~~其实直接用 whistle 也差不多~~

下面通过一些我自己使用的规则来介绍它

**请求转发**

```
player.bilibili.com http://127.0.0.1:8080

^*s1.hdslb.com/bfs/static/player/main/video*.js file:///Users/diygod/Code/bilibili/js-common/packages/video/dist/release/video.js
^*s1.hdslb.com/bfs/static/player/main/video*.js.map file:///Users/diygod/Code/bilibili/js-common/packages/video/dist/release/video.js.map
```

（1）项目接口和 CDN 都被限制某些域名可以用，所以需要这样一个东西做开发环境

比用 webpack 开一个 80 端口的 server 再绑 hosts 优雅 80 倍

（2）可以用来代理线上文件

把本地编译好的项目文件代理到真实线上环境，这里用到了通配符来匹配路径

**修改响应内容**

```
m.bilibili.com resAppend://`
<script src="https://cdn.jsdelivr.net/npm/eruda"></script>
<script>eruda.init();</script>
`
```

修改移动端页面的响应内容，让页面加载调试工具 Eruda，方便移动端调试

值得一提的是 whistle 有个很神经病的地方，whistle 本身并不支持这样的行内写法，需要很麻烦地在另一个面板设置 {key} 或者使用本地文件

所以 LightProxy 做了一层转义，把行内代码保存成了一个临时文件，打开 whistle 可以看到实际发给 whistle 的配置是类似这样的

```
m.bilibili.com resAppend:///var/folders/_l/hbcxcqh522s_vls68417h2m40000gn/T/lightproxy/0-152.txt
```

**修改响应头**

```
/.*bilivideo\.com\/.*300(\d){2}\.m4s/ resHeaders://`{
    'x-service-module': 'test-video'
}`
/.*bilivideo\.com\/.*302(\d){2}\.m4s/ resHeaders://`{
    'x-service-module': 'test-audio'
}`
/.*bilivideo\.com\/.*\.flv/ resHeaders://`{
    'x-service-module': 'test-flv'
}`
```

这里用了正则来给不同类型的文件匹配不同的规则

**修改 cookie**

```
m.bilibili.com/video/ resCookies://`{
    ab: '0000test',
}`
```

在移动端修改 cookie 并不是那么方便，所以我用了这个规则，本质上是修改响应头的 `Set-Cookie`

**host 转发**

```
172.22.33.166 s1.hdslb.com player.bilibili.com static.hdslb.com
```

除了支持各种匹配模式，还支持传统 hosts 语法规则，[SwitchHosts](https://github.com/oldj/SwitchHosts) 可以扔掉了

**模拟网络异常**

```
*.bilivideo.com replaceStatus://403 includeFilter://m:get

*.bilivideo.com resSpeed://2000

*.bilivideo.com resDelay://3000
```

各种模拟网络异常的功能深深戳中了我的痛点

例子中的 `*.bilivideo.com` 匹配 bilibili 视频 CDN 地址

（1）模拟 CDN 状态码，用来调试 CDN 地址超时或异常，没有 LightProxy 的日子里只能在代码里 mock 或很蠢地等很久等视频地址超时

（2）模拟慢速，用来调试卡顿或自动清晰度切换，可以用来代替 Chrome Network Throttling

（3）模拟 CDN 请求超时，用来调试 CDN 拉流超时，没有 LightProxy 的时候只能小心翼翼地控制 Chrome Network Throttling，太小了会导致请求失败，太大了超时又不够长

相信大家已经对 LightProxy / whistle 的用法有了自己的理解

&nbsp;

最后还有一个值得一提的事情是，用了这些调试代理工具之后魔法上网怎么办？

调试和魔法上网用的是不同的代理，我是一个面向 Google 编程的人，代理一直切来切去太麻烦，我的做法是系统代理交给 Surge 接管，利用 Surge 分流，新建一个 LightProxy 代理，然后编辑 Surge 规则，只把需要调试的请求分给 LightProxy

![](/images/web-debugging5.png)

![](/images/web-debugging4.png)

以上就是我目前的 Web 调试代理实践