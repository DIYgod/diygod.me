---
title: 百度前端技术学院编码挑战（TASK 0004）
id: 2024
categories:
  - 创作集
date: 2015-05-24 11:48:44
tags:
---

任务4（最终挑战）已经发布，任务deadline是6月10日至6月30日。

TASK 0004 内容：[https://github.com/baidu-ife/ife/tree/master/task/task0004](https://github.com/baidu-ife/ife/tree/master/task/task0004)

我做的：[https://github.com/DIYgod/ife-work/tree/master/task0004](https://github.com/DIYgod/ife-work/tree/master/task0004)

在线Demo： [https://www.anotherhome.net/file/ife/task0004](https://www.anotherhome.net/file/ife/task0004)

本次任务断断续续花费了20天（5.20-6.9）的时间。

下面是我做 TASK 0004 过程中的一些记录。<!--more-->

* * *

### 移动端适配

“往前推2到3年，前端工程师还在忧心忡忡地想，移动互联网时代下，前端是不是没有生存空间了。但今天一看，在我们团队，前端工程师超过一半的工作都是在做移动端的Web或者APP的开发。移动Web或者APP在技术本质上是和做桌面端Web没有本质区别，但是移动端的坑那是非常的多，通过学习这部分内容，让你成为一名桌面移动通吃的前端开发工程师。”

要求整个产品为SPA，刚开始完全没思路，看了两天AngularJS，最后还是决定自己实现。

参考Gmail：

![](/images/task0004_1.jpg) ![](/images/task0004_2.jpg)

切换到另一个锚点的时候，只显示这个锚点对应的部分，其他部分用 display:none 隐藏起来。但是没看懂具体是怎么实现的。在console里执行 `location.href = '#mn';` 也可以自动修改display，说明是绑定了锚点而不是通过点击事件来切换的。

李胜菊苣告诉我是它通过监听url实现，类似MVC中的路由。感觉自己实现起来挺困难的。。。但是想到了另外一种方法，简单地说就是利用CSS3里的target伪类，demo如下：

See the Pen [jPMgre](http://codepen.io/DIYgod/pen/jPMgre/) by DIYgod ([@DIYgod](http://codepen.io/DIYgod)) on [CodePen](http://codepen.io).

<script src="//assets.codepen.io/assets/embed/ei.js" async=""></script>

于是再改改CSS，就轻松实现了移动端的适配。

![](/images/task0004_3.png) ![](/images/task0004_4.png) ![](/images/task0004_5.png)

![](/images/task0004_6.png)

又是李胜菊苣带我飞，通过分析张鑫旭菊苣的Mobilebone框架（[官网](http://www.mobilebone.org/)），我找到了更好的实现，以上实现作废23333。

原理是这样的：切换锚点时会触发onhashchange事件，所以我就在onhashchange事件上绑定了一个函数，这个函数会记录切换前的锚点和切换后的锚点，通过判断前后锚点来做相应的动作，在切换过程中会给子页面加上 slide out in reverse 中的某几个class，通过这几个class实现滑动效果，具体实现见下面的CSS部分，切换完成后隐藏不需要显示的子页面和清除之前加上的class。就这样。

JS部分：

```js
/* 滑动效果 */
window.onhashchange = function () {
    var newHash = location.hash;
    var oldEle = $('.' + oldHash.substr(1));
    var newEle = $('.' + newHash.substr(1));
    if ((oldHash == '#type' &amp;&amp; newHash == '#task') || (oldHash == '#task' &amp;&amp; newHash == '#details') ) {
        oldEle.className += ' slide out';
        newEle.className += ' slide in';
        newEle.style.display = 'block';
        oldEle.style.display = 'block';
        setTimeout(function () {
            newEle.style.display = 'block';
            oldEle.style.display = 'none';
            oldEle.className = oldEle.className.replace(/ slide out/, '');
            newEle.className = newEle.className.replace(/ slide in/, '');
        }, 225);
    }
    else if ((oldHash == '#task' &amp;&amp; newHash == '#type') || (oldHash == '#details' &amp;&amp; newHash == '#task')) {
        newEle.className += ' slide reverse in';
        oldEle.className += ' slide reverse out';
        oldEle.style.display = 'block';
        newEle.style.display = 'block';
        setTimeout(function () {
            oldEle.style.display = 'none';
            newEle.style.display = 'block';
            newEle.className = newEle.className.replace(/ slide reverse in/, '');
            oldEle.className = oldEle.className.replace(/ slide reverse out/, '');
        }, 225);
    }
    oldHash = newHash;
}
```

CSS部分：

```css
/* 滑动效果 from mobilebone */
.slide.out, .slide.in {
    animation-timing-function: ease-out;
    animation-duration: 225ms;
}

.slide.in {
    animation-name: slideinfromright;
}

.slide.out {
    animation-name: slideouttoleft;
}

.slide.reverse.out {
    animation-name: slideouttoright;
}

.slide.reverse.in {
    animation-name: slideinfromleft;
}

/* keyframes for slidein from sides */
@-webkit-keyframes slideinfromright {
    from {
        -webkit-transform: translate3d(100%, 0, 0);
    }
    to {
        -webkit-transform: translate3d(0, 0, 0);
    }
}

@keyframes slideinfromright {
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(0);
    }
}

@-webkit-keyframes slideinfromleft {
    from {
        -webkit-transform: translate3d(-100%, 0, 0);
    }
    to {
        -webkit-transform: translate3d(0, 0, 0);
    }
}

@keyframes slideinfromleft {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
}

/* keyframes for slideout to sides */
@-webkit-keyframes slideouttoleft {
    from {
        -webkit-transform: translate3d(0, 0, 0);
    }
    to {
        -webkit-transform: translate3d(-100%, 0, 0);
    }
}

@keyframes slideouttoleft {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-100%);
    }
}

@-webkit-keyframes slideouttoright {
    from {
        -webkit-transform: translate3d(0, 0, 0);
    }
    to {
        -webkit-transform: translate3d(100%, 0, 0);
    }
}

@keyframes slideouttoright {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(100%);
    }
}
```

更新：实测这种方法在Safari下表现并不好。

再更新：补充上面：这种方法在貌似在移动端的Safari表现并不好，但在Mac端的Safari表现正常。

&nbsp;

### CSS Processing

“CSS语言由于其自身语言设计的问题，加上一些浏览器兼容性问题，往往会使得我们在写它的时候，要写很多冗余代码，或者为了兼容性对同一个样式设定写好几遍。针对这些问题，诞生了CSS预处理和后处理的概念及相关方法、工具。

这些工具和方法帮助我们能够更加高效地书写可维护性更强的CSS代码。”

经过调研，我最后决定使用更广泛的Less。

根据慕课网教程（[less即学即用](http://www.imooc.com/learn/102)）整理的Less思维导图：![](/images/less.png)

CSS部分重构完毕，终于可以复用了，DRY (Don't repeat yourself)。

另外结合Grunt使用autoprefixer处理浏览器前缀，简直不能再爽。

&nbsp;

### 安全

“安全是大家经常容易忽视，但其实一旦出现影响会非常大的问题，尤其对于没有经历过企业开发，或者没有踩过坑的同学，如果等到公司工作，做实际项目后非常容易发生安全问题。”

现有程序存在漏洞，比如在任务内容里输入以下内容然后保存，就会执行我们自定义的script脚本。

```html
<iframe src=javascript:alert('xss');height=0 width=0></iframe>
```

或

```html
<img src="1" onerror=eval("\x61\x6c\x65\x72\x74\x28\x27\x78\x73\x73\x27\x29")>
```

所以要简单做下 XSS 防护：

大多数情况对用户的输入进行处理，只允许输入合法的值，其它值一概过滤掉。然而更进一步的话，可以对标签进行转换。

对输入的内容做Html encode处理：

```js
function htmlEncode(str) {
    return str.replace(/&amp;/g, "&amp;amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&amp;quot;")
              .replace(/'/g, "&amp;#x27;")
              .replace(/\//g, "&amp;#x2f;")
              .replace(/\n/g, "<br>");
}
```
比如用户输入：

```html
<iframe src=javascript:alert('xss');height=0 width=0></iframe>
```

保存后最终存储的会是：

```html
<iframe src=javascript:alert(&amp;#x27;xss&amp;#x27;);height=0 width=0></iframe>
```

之后在展现时浏览器会对这些字符转换成文本内容显示，而不是一段可执行的代码。

另外自带SSL加成2333

&nbsp;

### 性能优化

“在自己做一些小项目时，可能是学校的一些网站项目，流量可能日均都不超过500，而且大多是校园局域网内访问；或者是开发一些实验室的MIS系统，这辈子你都不会去使用你开发的这个系统。在这样一些项目中，性能优化往往会被你忽略。

但是如果你是做一个日均PV数万、数十万、甚至更大的量级，开发的页面会被全国各地，不同网络条件的用户来进行访问。这个时候，性能问题就无法忽视了。在当今的网络条件下，如果你的页面3秒都无法完成首屏渲染，一定会让你的网站流失很多用户。

整个网站的性能优化有很多的环节和工作，大多数时候，不是前端工程师单独就能完成的，尤其在职能划分明确的公司中，往往需要前后端、运维、DBA等多个职位协同完成。所以，在我们的课程中，主要让你了解整个性能优化都涉及哪些方面的工作，同时，我们会专注介绍一些在前端领域可以重点关注的技术点。”

&nbsp;

### 模块化

“对于一个复杂项目，特别是多人协作的复杂项目，如何合理划分模块，如何更加方便地进行模块加载，如何管理模块之间的依赖，是一个项目团队都会面临的问题，目前业界已经有了一些较为普遍的解决方案，如AMD。这个部分希望你能够通过学习JavaScript的模块化，学习如何合理地规划项目模块，合理使用模块化工具来优化你的项目代码结构。”

经过调研，我决定使用RequireJS来实现。

将JS的引用方式改成这样

```html
<script src="scripts/require.js" data-main="scripts/main"></script>
```

再改写下JS，把JS分为四个模块：主模块 gtd util selector。但总感觉分得不太好。。。只能准备答辩时候问下导师了。

其中遇到了一个问题：

有这样一个HTML结构
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Demo</title>
    <style>
        div {
            height: 100px;
            width: 100px;
            background: #eee;
            margin: 10px;
        }
    </style>
</head>
<body>
    <div onclick="myClick();"></div>
    <div onclick="myClick();"></div>
    <div onclick="myClick();"></div>
    <script src="js/main.js"></script>
</body>
</html>
```

对其进行模块化改造之后，显而易见的myClick不会再是全局函数，所以无法这样调用。

于是我尝试在模块里进行click事件绑定：

```js
define(function () {
    function init() {
        var myDiv = document.getElementsByTagName('div');
        for (var i = 0; i < myDiv.length; i++) {
            myDiv[i].addEventListener('click', myClick(myDiv[i]));
        }
        myDiv[0].click();
    }

    function myClick(ele) {
        ele.innerHTML = ele.innerHTML + 'click';
    }

    return {
        init: init
    }
});
```

然而喜闻乐见地绑定错了，你们肯定看出来了，但是我当时没看出来，而且由于第5行那句间接调用了myClick(myDiv[i])，让我误以为是第10行调用的结果（这只是个Demo，当时的情况比这个复杂一些，这两句调用的结果的确差不多）。

这样的结果就是click绑定的函数在模块内可以调用（误以为），但在页面中点击却没反应。

然后我自作聪明地进行了一番推理：click事件绑定的myClick函数不是全局函数，只在模块内有效，而在页面中点击时会在全局调用myClick函数，所以没反应。

看似有道理却不是这样的，[在V2EX发帖询问](https://www.v2ex.com/t/196957)之后，热心网友 [7anshuai](http://7anshuai.js.org/) 看出了绑定有误的问题。。

然后改成这样就好了：

```js
define(function () {
    function init() {
        var myDiv = document.getElementsByTagName('div');
        for (var i = 0; i < myDiv.length; i++) {
            myDiv[i].addEventListener('click', myClick);
        }
        myDiv[0].click();
    }

    function myClick() {
        this.innerHTML = this.innerHTML + 'click';
    }

    return {
        init: init
    }
});
```

期间我还尝试过在模块里主动将函数暴露在全局空间里，像这样：

```js
window.myClick = myClick;
```

虽然有效，但真是烂爆了，幸亏没就这样算了。。。

&nbsp;

**6. 前端工程化**

“业界目前有非常多的前端开发工具，完成一些开发过程中可以自动化完成的工作，提高研发效率，并且可以提高多人协作时的开发过程一致性，提高整个项目的运维效率。”

经过调研，最终决定采用 Yeoman, Bower, Grunt 三个工具结合来进行工程化改造。

根据慕课网教程（[Grunt-beginner前端自动化工具](http://www.imooc.com/learn/30)）整理的思维导图：![](/images/grunt.png)

用 Yeoman 新建一个 webapp 项目（需翻墙），安装其他需要的包，改改配置文件，然后就可以享受各种自动化工具带来的无比高效、震撼的体验啦~

我这里主要对代码做了 less编译 处理CSS前缀 HTML、CSS、JS压缩 文件名添加md5值 这几个处理，其中处理前的文件在app文件夹，处理后的文件在disk文件夹。

&nbsp;

Done，等待毕业答辩喽~