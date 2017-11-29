---
title: 百度前端技术学院编码挑战（TASK 0003）
id: 1989
categories:
  - 创作集
date: 2015-05-08 00:44:09
tags:
permalink: 1989
---

任务3已经发布，初级班的任务时间是从5月7日至5月18日，中级班为4月30日至5月10日。

TASK 0003 内容：[https://github.com/baidu-ife/ife/tree/master/task/task0003](https://github.com/baidu-ife/ife/tree/master/task/task0003)

我做的：[https://github.com/DIYgod/ife-work/tree/master/task0003](https://github.com/DIYgod/ife-work/tree/master/task0003)

在线Demo： [https://www.anotherhome.net/file/ife/task0003/](https://www.anotherhome.net/file/ife/task0003/)

本次任务累计花费时间10天（5.6-5.16 ）

下面是我做 TASK 0003 过程中的一些记录。<!--more-->

* * *

**1. JavaScript作用域** （参考 [鸟哥：Javascript作用域原理](http://www.laruence.com/2009/05/28/863.html) [理解 JavaScript 作用域和作用域链](http://www.cnblogs.com/lhb25/archive/2011/09/06/javascript-scope-chain.html)）

JavaScript中的函数运行在它们被定义的作用域里,而不是它们被执行的作用域里。

JS 是有预编译的过程的, JS在执行每一段JS代码之前, 都会首先处理var关键字和function定义式(函数定义式和函数表达式)。
在调用函数执行之前, 会首先创建一个活动对象, 然后搜寻这个函数中的局部变量定义,和函数定义, 将变量名和函数名都做为这个活动对象的同名属性, 对于局部变量定义,变量的值会在真正执行的时候才计算, 此时只是简单的赋为undefined。

对代码优化的启示：

从作用域链的结构可以看出，在运行期上下文的作用域链中，标识符所在的位置越深，读写速度就会越慢。因为全局变量总是存在于运行期上下文作用域链的最末端，因此在标识符解析的时候，查找全局变量是最慢的。所以，在编写代码的时候应尽量少使用全局变量，尽可能使用局部变量。一个好的经验法则是：如果一个跨作用域的对象被引用了一次以上，则先把它存储到局部变量里再使用。

例如下面的代码：
<pre class="lang:default decode:true ">function changeColor(){
    document.getElementById("btnChange").onclick=function(){
        document.getElementById("targetCanvas").style.backgroundColor="red";
    };
}</pre>
这个函数引用了两次全局变量document，查找该变量必须遍历整个作用域链，直到最后在全局对象中才能找到。这段代码可以重写如下：
<pre class="lang:default decode:true ">function changeColor(){
    var doc=document;
    doc.getElementById("btnChange").onclick=function(){
        doc.getElementById("targetCanvas").style.backgroundColor="red";
    };
}</pre>
这段代码比较简单，重写后不会显示出巨大的性能提升，但是如果程序中有大量的全局变量被从反复访问，那么重写后的代码性能会有显著改善。

&nbsp;

**2. 高度自适应** （参考 [CSS布局奇淫技巧之-高度自适应](http://www.cnblogs.com/2050/archive/2012/07/30/2615260.html)）

高度自适应不像宽度自适应那样简单，在兼容浏览器方面也稍微复杂一些。

然而直接写 height: 100%; 并没有什么卵用，要这样做：
<pre class="lang:default decode:true ">position: absolute;
top: 60px;
bottom: 0;</pre>
&nbsp;

**3\. 莫名其妙出现又莫名其妙自己消失的空隙**

事情是这样的，昨天（5月12日）页面一切正常，今天早上起床后并没改动代码，刷新了一下页面，页面居然变了，设置 overflow: scroll CSS属性的元素右侧和下侧都出现了空隙，如图所示：![](/images/task0003_1.png)

![](/images/task0003_2.png)

而如果把overflow: scroll属性去掉空隙就消失。测试 Chrome Safari 均出现了这种情况，而且尝试了清空缓存，无解。于是将此时的代码commit并push到了github。

到了下午，同一标签页，同一页面，刷新，bug自己消失了，而此时代码与上午相比只有很少且无关紧要的改动，再次commit并push到github（所有改动[在github有记录](https://github.com/DIYgod/ife-work/commit/df0e0bf051852bb1e4593c6dae3ff11cfa9c34ce)），再次截图：![](/images/task0003_3.png)

注意：两次出现变化后都尝试测试了Chrome和Safari浏览器并清空了缓存。

到此为止毫无头绪并无法重现，实在没办法再深究下去。

猜测是Mac的Bug。

&nbsp;

**4. JavaScript对象与JSON文本的相互转换** （参考 [JavaScript对象与JSON字符串的相互转换](http://blog.csdn.net/yaerfeng/article/details/7292000) [JSON 教程 - W3CSCHOOL](http://www.w3cschool.cc/json/json-tutorial.html)）

eval函数：JSON文本转换为JavaScript对象；调用JavaScript编辑器；非常快速，但可能会出现安全性问题
<pre class="lang:js decode:true">var obj = eval('(' + JSONTest + ')');</pre>
使用JSON解析器：

JSON.parse 函数：将JSON文本转换为JavaScript对象
<pre class="lang:js decode:true">JSON.parse(text[, reviver])</pre>
JSON.stringify 函数：将JavaScript对象转换为JSON文本
<pre class="lang:js decode:true">JSON.stringify(value[, replacer[, space]])</pre>
&nbsp;

**5. textarea 和 input 大小比预期大了一些**

多谢[李胜](http://www.lishengcn.cn/)的帮助

这个问题其实很简单但我没想到，刚开始挺莫名其妙的，如下：

See the Pen [RPaJpb](http://codepen.io/DIYgod/pen/RPaJpb/) by DIYgod ([@DIYgod](http://codepen.io/DIYgod)) on [CodePen](http://codepen.io).

<script src="//assets.codepen.io/assets/embed/ei.js" async=""></script>

问题是textarea和input比设置的宽度多了6px，强迫症看了浑身难受。实际上是因为这两个元素有默认的 2px padding和 1px border，在这两个元素的CSS部分加上
<pre class="lang:default decode:true ">padding: 0;
border: 0;</pre>
或者更优雅一些
<pre class="lang:default decode:true ">-webkit-box-sizing: border-box;
-moz-box-sizing: border-box;
box-sizing: border-box;</pre>
就好了。

&nbsp;

☆ﾐ(o*･ω･)ﾉ完结散花 等待review