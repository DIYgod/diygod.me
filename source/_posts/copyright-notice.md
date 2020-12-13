---
title: 版权狗退散 — 仿知乎复制文本自带版权声明
id: 2298
categories:
  - 分享境
date: 2015-12-26 20:49:52
tags:
permalink: 2298/
---

### 什么鬼？

版权狗退散，妈妈再也不用担心我被侵权了（其实只防君子不防小人）。

类似知乎，在网站复制长度大于42的文本时自动加上这样的版权声明：

著作权归作者所有。
商业转载请联系作者获得授权，非商业转载请注明出处。
作者：DIYgod
链接：https://www.anotherhome.net/
来源：Anotherhome

### 原理

- 监听copy事件

- 使用 window.getSelection() 获取选中的文本

- 使用 clipboardData.setData 操作剪贴板的内容<!--more-->

### 代码

```js
document.body.addEventListener('copy', function (e) {
    if (window.getSelection().toString() &amp;&amp; window.getSelection().toString().length &gt; 42) {
        setClipboardText(e);
        alert('商业转载请联系作者获得授权，非商业转载请注明出处，谢谢合作。');
    }
});

function setClipboardText(event) {
    var clipboardData = event.clipboardData || window.clipboardData;
    if (clipboardData) {
        event.preventDefault();

        var htmlData = ''
            + '著作权归作者所有。&lt;br&gt;'
            + '商业转载请联系作者获得授权，非商业转载请注明出处。&lt;br&gt;'
            + '作者：DIYgod&lt;br&gt;'
            + '链接：' + window.location.href + '&lt;br&gt;'
            + '来源：Anotherhome&lt;br&gt;&lt;br&gt;'
            + window.getSelection().toString();
        var textData = ''
            + '著作权归作者所有。\n'
            + '商业转载请联系作者获得授权，非商业转载请注明出处。\n'
            + '作者：DIYgod\n'
            + '链接：' + window.location.href + '\n'
            + '来源：Anotherhome\n\n'
            + window.getSelection().toString();

        clipboardData.setData('text/html', htmlData);
        clipboardData.setData('text/plain',textData);
    }
}
```

### 已知问题

iOS Safari 不兼容 clipboardData.setData() 方法，所以在 iOS Safari 上无效

### 知乎原版

另附知乎原版关键代码，原理类似，感兴趣也可以看看：

```js
var lz = function (a, b, c) {
    function d(a, b) {
        return ["著作权归作者所有。", "商业转载请联系作者获得授权，非商业转载请注明出处。", "作者：" + b, "链接：" + a, "来源：知乎", "", ""]
    }

    function f(a, b, c) {
        return "\x3cdiv\x3e" + d(b, c).join("\x3cbr /\x3e") + a + "\x3c/div\x3e"
    }

    function g(a) {
        var g = z.Wq(), m = g &amp;&amp; (0, z.ib)(g.Ed());
        if (m &amp;&amp; !(42 &gt; m.length)) {
            if ("object" === typeof a.originalEvent.clipboardData &amp;&amp; (a.originalEvent.clipboardData.setData("text/html", f(g.Of(), b, c)), a.originalEvent.clipboardData.setData("text/plain", d(b, c).join("\n") + m), 0 &lt; a.originalEvent.clipboardData.getData("text/plain").length)) {
                a.preventDefault();
                return
            }
            if (window.getSelection) {
                a = g.Of();
                var n = (0, window.$)(f(a, b, c)).css({position: "fixed", left: "-9999px"}).appendTo("body");
                window.getSelection().selectAllChildren(n.get(0));
                (0, window.setTimeout)(function () {
                    g.select();
                    n.remove()
                }, 200)
            }
        }
    }

    a &amp;&amp; b &amp;&amp; c &amp;&amp; (z.Fa(b, "http") || (b = window.location.protocol + "//" + window.location.host + b), a.on("copy", g))
};
```