---
title: 我藏好了哦
id: 2153
categories:
  - 分享境
date: 2015-11-12 16:51:34
tags:
permalink: /2153
---

![](/images/titlehide.png)

在 [Sonic 853](http://853.bronya.net/) 看到的神奇的一幕，一颗赛艇，果断扒来水一贴

**原作者：**[成天不高兴的栗山未来](http://chitanda.me/)

**什么鬼：**离开和进入页面时改变title

**原理：**

使用了HTML5的Page Visibility API

目前页面可见性API有两个属性，一个事件，如下：

document.hidden: Boolean值，表示当前页面可见还是不可见

document.visibilityState: 返回当前页面的可见状态，取值有 hidden visible prerender preview

visibilitychange: 当可见状态改变时候触发的事件

以前只知道可以通过 iframe + onblur/onfocus事件 来检测页面可见性，有了这个 API 真是方便优雅了很多啊

**代码：**<!--more-->

```js
var OriginTitile = document.title;
var titleTime;
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.title = '(つェ⊂)我藏好了哦~ ' + OriginTitile;
        clearTimeout(titleTime);
    }
    else {
        document.title = '(*´∇｀*) 被你发现啦~ ' + OriginTitile;
        titleTime = setTimeout(function() {
            document.title = OriginTitile;
        }, 2000);
    }
});
```