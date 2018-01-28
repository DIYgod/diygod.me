---
title: BAS 高级弹幕
date: 2018-01-25 23:50:26
tags: 创作集
---
## 写在前面

如果你好奇 B 站的工作有不有趣，或者我来 B 站之后都在做什么，那么这篇文章或许可以解答你的部分疑问。

来 B 站后，除了负责 HTML5 播放器的一些模块、重构和日常维护以外，BAS 高级弹幕算是我半年来负责开发的最大一个项目了。

本文整理自今天在公司的超极电磁波分享（据说我还是有史以来年龄最小的讲师(=・ω・=)，也算是对这个项目的一个阶段性总结。

## 什么是 BAS 弹幕

BAS，全称 Bilibili Animation Script，是新一代 bilibili 高级弹幕脚本语言，是一种用来描述高级弹幕样式、交互和动画的文本。

BAS 弹幕是用 BAS 描述的高级弹幕，由元素和动画组成，元素分为文本对象、交互按钮、path 对象，动画分为简单动画、串联动画、并联动画。

BAS 弹幕主要面向字幕君等高端玩家，可以用于字幕、特效、交互应用、游戏、纯弹幕作品等场景。

目前 Web 端已经上线，移动端也基本开发完成，期望在明年的活动或拜年祭中能够用到。

我们做了几个视频来直观展示 BAS 弹幕：

第一个是毛酱大佬做的弹幕 PV：[https://www.bilibili.com/video/av257649/](https://www.bilibili.com/video/av257649/)

第二个是弹幕实现的烂苹果：[https://www.bilibili.com/video/av18682336/](https://www.bilibili.com/video/av18682336/)

第三个是交互按钮的演示：[https://www.bilibili.com/video/av16558829/index_3.html#page=3](https://www.bilibili.com/video/av16558829/index_3.html#page=3) ，另外像哔哩哔哩排行榜周刊这种也是很好的应用场景

字幕应用方面可以很容易实现一个字幕文件转 BAS 之类的工具，今后会继续做这样的事情。

<!--more-->

### 几种高级弹幕比较

#### mode7

弹幕通过界面设置，不需要编写代码，使用简单但功能比较局限。

![](https://diygod.b0.upaiyun.com/bas1.jpg)

#### mode8

即代码弹幕，功能非常强大但需要编写代码，使用复杂、安全性较差，而且只支持 Flash 平台。

![](https://diygod.b0.upaiyun.com/bas2.jpg)

#### mode9

即 BAS 弹幕，是 mode 7 和 mode 8 的折中方案。

跟 mode 7 相比，mode 9 需要编写脚本，使用稍复杂，但支持交互、图形和更复杂的动画，功能要强大得多。

跟 mode 8 相比，mode 9 简化了语法，改用声明式，使用更简单；更安全，播放器解析实现，不合法脚本不会放行，程序可控，而不是直接操作弹幕；可以跨平台。

![](https://diygod.b0.upaiyun.com/bas3.jpg)

## 使用 BAS 弹幕

### 发送权限

首先权限上对 BAS 弹幕的发送权限有着严格的限制，设计上一般用户需要先用硬币购买，然后等待 UP 主确认之后才可以使用，字幕君等有特殊权限的用户才可以直接使用，但目前只开放给字幕君使用，字幕君使用并完善之后再考虑扩大使用场景。

|         | 硬币购买 | UP 主确认 |
| ------- | ---- | ------ |
| 一般会员    | √    | √      |
| UP 主    | √    | ×      |
| VIP     | ×    | √      |
| 字幕君/管理员 | ×    | ×      |

### 发送入口

1. ![](https://diygod.b0.upaiyun.com/bas4.jpg)
2. ![](https://diygod.b0.upaiyun.com/bas5.jpg)

注意没有发送权限时入口是隐藏的，这时候可以在[试验室](https://bilibili.github.io/bas/#/playground)中进行尝试。

### 编写脚本

下面我们来尝试编写一些简单的脚本，BAS 脚本非常简单，它是一种声明式描述性的脚本，语法易用，保证了对象块和操作块的独立性。

尝试 BAS 弹幕最简单的方法是使用[文档](https://bilibili.github.io/bas)上的例子和试验室，你可以在浏览器新标签页中打开它，跟着例子尝试一些基础用法。

以文本对象为例，一个简单的带渐隐动画的文本对象是这样的：

```
def text demo {
    content = "BAS"
}
set demo {
    alpha = 0
} 5s
```

这样我们就成功创建了一条渐隐的 BAS 弹幕，看起来很简单，但是 js 在背后做了大量工作，js 会先把 BAS 脚本解析成 js 可识别的对象，应用上默认属性，再把它渲染到播放器里，同时开始动画，这时候就可以在播放器左上角看到一个渐隐的白色文本。

#### 定位

定位也非常简单，BAS 弹幕的定位由弹幕锚点（anchorX anchorY）和舞台位置（x y）共同决定。锚点是弹幕的中心点，(0, 0)为弹幕的左上角，(1, 1)为弹幕的右下角。

```
def text tl {
    content = "左上"
    x = 0
    y = 0
    anchorX = 0
    anchorY = 0
}
def text tr {
    content = "右上"
    x = 100%
    y = 0
    anchorX = 1
    anchorY = 0
}
def text bl {
    content = "左下"
    x = 0
    y = 100%
    anchorX = 0
    anchorY = 1
}
def text br {
    content = "右下"
    x = 100%
    y = 100%
    anchorX = 1
    anchorY = 1
}
def text c {
    content = "中心"
    x = 50%
    y = 50%
    anchorX = 0.5
    anchorY = 0.5
}
```

#### 弹幕舞台

弹幕舞台是弹幕的绘制范围，弹幕舞台默认为视频的真实区域，此外文本对象可以通过 parent 属性把其他文本对象指定为父级元素，以父级元素作为舞台进行绘制，父级元素会影响子级元素的定位、缩放等。

```
def text a {
    content = "□"
    fontSize = 40%
    x = 0
    y = 0
    color = 0xffff00
}
def text b {
    parent = "a"
    content = "□"
    fontSize = 20%
    x = 0
    y = 0
    color = 0xff00ff
}
set a {
    x = 50%
    y = 0
} 2s
then set a {} 3s
set b {
    y = 50%
} 3s
then set b {} 3s
```

#### 生命周期

生命周期是 BAS 的另一个重要概念，生命周期是弹幕存活的时间，没有指定 duration 属性时，元素生命周期为动画总时间，没有动画时默认为4s。生命周期结束后元素就会在舞台中被清除。

```
def text a {
    content = "BAS"
}
```

```
def text a {
    content = "BAS"
    duration = 10s
}
```

```
def text a {
    content = "BAS"
}
set a {} 10s
```

#### 自适应

位置和字号为百分比值时可以根据舞台大小自适应，可以实现各个平台、不同播放器大小时弹幕的一致性效果，使弹幕在不同情况下相对于视频的位置和大小是固定的，位置坐标为当前舞台宽高 * 百分比值 px，字号为当前舞台宽度 * 百分比值 px。

```
def text c {
    content = "BAS"
    x = 50%
    y = 50%
    anchorX = 0.5
    anchorY = 0.5
    fontSize = 5%
}
```

这时候改变播放器大小，弹幕大小也会跟随播放器改变，结果是它相对于视频的位置和大小是固定的。

#### 交互

目前只有交互按钮支持一些简单的点击效果，转跳到视频某个时间点、新窗口打开其他视频等。

seek 按钮：

```
def button c {
    text = "跳转到30分钟"
    x = 35%
    y = 45%
    fontSize = 5%
    textColor = 0xffffff
    fillColor = 0x80D8FF
    target = seek {
        time = 30m
    }
}
```

av 跳转按钮：

```
def button c {
    text = "av1714157"
    x = 35%
    y = 45%
    fontSize = 5%
    textColor = 0xffffff
    fillColor = 0x80D8FF
    duration = 2s
    target = av {
        av = 1714157
        page = 1
        time = 20.5s500ms
    }
}
```

bangumi 跳转按钮：

```
def button c {
    text = "第22话 春风"
    x = 35%
    y = 45%
    fontSize = 5%
    textColor = 0xffffff
    fillColor = 0x80D8FF
    duration = 2s
    target = bangumi {
        seasonId = 1699
        episodeId = 80041
        time = 1m30s
    }
}
```

#### 图形

可以使用 path 对象绘制 svg 图形，d 属性对应 svg 的路径。

```
def path p {
    d = "M30.828,30.422 18.997,16.260 Z"
    viewBox="0 0 32 34"
    x = 45%
    y = 45%
    scale = 3
    borderWidth = 1
    borderColor = 0xffffff
    borderAlpha = 0.8
    fillColor = 0x00a1d6
    fillAlpha = 0.8
}
```

#### 动画

动画分为简单动画、串联动画、并联动画。

弹幕的属性有可渐变、不可渐变、不可变之分，只有可渐变属性才有正常的动画效果，对非渐变属性设置新值会立即生效，对不可变的属性设值将被忽略。原则上某一属性在一个 set 语句中最多只能出现一次，在实现上，如果多次出现，以最后一次为准。

串联动画以先后顺序运行。

```
def text a {
  content = "BAS"
}
set a {
    color = 0x000000
} 1s
then set a {
    alpha = 0
} 1s
```

并联动画同时进行，并联相同属性时，以最后一次为准，之前冲突的动画会被忽略，由于技术限制，x y rotateX rotateY rotateZ scale 视为相同属性。

```
def text a {
  content = "BAS"
}
set a {
    color = 0x000000
} 1s
set a {
    alpha = 0
} 1s
```

## BAS 弹幕的前端实现

从 BAS 脚本到渲染在浏览器的 DOM 元素主要有以下步骤：

1. 将 BAS 脚本解析成 js 对象（[https://github.com/aristotle9/as3cc](https://github.com/aristotle9/as3cc)）
2. 应用默认值、计算百分比值
3. 监控生命周期
4. 解决属性冲突
5. 绘制元素、应用样式和动画
6. 绑定交互事件

### 定位

定位由 BAS 脚本的锚点（anchorX anchorY）和位置（x y）共同决定，实现上使用两个嵌套的 DOM 元素，外部元素定位舞台位置，内部元素定位弹幕锚点，比如一个居中的文本对象：

```
def text c {
    content = "BAS"
    x = 50%
    y = 50%
    anchorX = 0.5
    anchorY = 0.5
}
```

渲染出的 DOM 结构大概是这样：

```html
<div style="transform:translate((舞台宽度*50%)px, (舞台高度*50%)px);">
  <div style="transform:translate(-50%,-50%);">BAS弹幕</div>
</div>
```

### 动画

动画上考虑到浏览器兼容性和易用性，CSS3 的 animation 是最佳的选择，其中涉及属性有：

| 属性                        | 描述                  |
| :------------------------ | ------------------- |
| @keyframes                | 定义动画                |
| animation-name            | 对应 @keyframes 动画的名称 |
| animation-duration        | 动画完成一个周期的时间         |
| animation-play-state      | 动画运行或者暂停            |
| animation-timing-function | 动画的速度曲线             |

#### 简单动画

沿用上面的例子：

```
def text demo {
    content = "BAS"
}
set demo {
    alpha = 0
} 5s
```

这样一条 BAS 脚本渲染出的 DOM 结构大概是这样：

```html
<style>
@keyframes a1 {
    100% { opacity:0; }
}</style>
<div style="animation-name:a1;animation-duration:5s;opacity:1;">BAS</div>
```

keyframes 定义动画关键帧，动画结束时透明度为零；animation-duration 对应动画的时间 5s。

#### 并联动画

定义多个keyframes实现多个动画同时运行。

```
def text a {
    content = "BAS"
}
set a {
    color = 0x000000
} 1s
set a {
    alpha = 0
} 1s
```

```html
<style>
@keyframes a1 {
    100% { color:#000000; }
}
@keyframes a2 {
    100% { opacity:0; }
}
</style>
<div style="animation-name:a1,a2;animation-duration:1s,1s;opacity:1;color:#ffffff;">BAS</div>
```

#### 串联动画

使用 animation-delay 错开不同动画开始的时间，实现串联的效果。

```
def text a {
  content = "BAS"
}
set a {
    color = 0x000000
} 1s
then set a {
    alpha = 0
} 1s
```

```html
<style>
@keyframes a1 {
    100% { color:#000000; }
}
@keyframes a2 {
    0% { color:#000000; }
    100% { color:#000000;opacity:0; }
}
</style>
<div style="animation-name:a1,a2;animation-duration:1s,1s;animation-delay:0s,1s;opacity:1;color:#ffffff;">BAS</div>
```

### 状态控制

#### 开始

animation-play-state: running

#### 暂停

animation-play-state: paused

#### 中间状态

设置 animation-delay 为负值就可以实现从某个中间状态开始动画。

比如弹幕的生命周期对应视频的 1s 到 5s，视频跳转到 4s 时，需要设置弹幕 animation-delay 属性为 -1s。

#### 结束

生命周期结束需要及时清除元素，原理是 animation 动画结束会触发 animationend 事件，该事件触发时清除掉元素即可。元素没有动画时需要指定一个空动画。

```html
<style>
@keyframes a1 {
    100% { }
}
</style>
```

End.