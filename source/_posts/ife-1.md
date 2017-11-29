---
title: 百度前端技术学院编码挑战（TASK 0001）
id: 1969
categories:
  - 创作集
date: 2015-04-14 00:03:56
tags:
permalink: 1969
---

[百度Web前端技术学院](https://github.com/baidu-ife/ife)（Baidu Institute of Front-End Technology简称IFE）是一个由百度EFE团队、百度人力资源部校园招聘组联合出品的、面向在校大学生的前端培训组织，借助百度大量优秀的前端工程师以及丰富的前端知识积累，帮助大学生们更加高效、系统地学习Web前端技术。

百度Web前端技术学院已正式开学，我有幸成为了第一期的初级班学员，可以和菊苣们一起玩耍啦～

想一起学但是没录取的可以加群：438966405

* * *

TASK 0001 发布，初级班Review提交截止时间为4月23日，中级班为4月16日。

TASK 0001 内容：[https://github.com/baidu-ife/ife/tree/master/task/task0001](https://github.com/baidu-ife/ife/tree/master/task/task0001)（还设置了1-6小节照顾我这样的弱菜，大赞～）

我做的：[https://github.com/DIYgod/ife-work/tree/master/task0001](https://github.com/DIYgod/ife-work/tree/master/task0001)

在线Demo： [https://www.anotherhome.net/file/ife/task0001/](https://www.anotherhome.net/file/ife/task0001/)

本次任务累计花费时间6天（4.13-4.19 ）

下面是我做 TASK 0001 过程中的一些记录。

<!--more-->

&nbsp;

**1. position 属性**（参考 [CSS 定位-W3School](http://www.w3school.com.cn/css/css_positioning.asp)、[CSS+DIV布局中absolute和relative](http://selfcontroller.iteye.com/blog/1826119)）

position 属性比较重要，但自己看的时候没看很明白，马马虎虎略过了，于是做任务的时候就出了莫名其妙的问题，在蛋炒饭的帮助才发现是因为 position 属性没搞懂。

用自己的话简单总结一下：position属性有四个属性值：static relative absolute fixed。 static 为默认，元素框正常生成，出现在 normal flow 中；relative 使元素框偏移某个距离，原本所占的空间仍保留，也是出现在 normal flow 中；absolute 使元素框跳出 normal flow 完全删除，并相对于其包含块定位，原本所占的空间消失；fixed 同样使元素框跳出 normal flow，相对于浏览器窗口进行定位。

&nbsp;

**2\. 浮动元素及其后续非浮动元素填充的位置**（参考 [CSS float 浮动属性](http://www.cnblogs.com/polk6/archive/2013/07/25/3142187.html)）

当时的情况是这样的：HTML部分：
<pre class="lang:default decode:true">&lt;div id="div6"&gt;
    &lt;div class="div6-a"&gt;&lt;/div&gt;
    &lt;div class="div6-b"&gt;&lt;/div&gt;
    &lt;div class="div6-c"&gt;&lt;/div&gt;
&lt;/div&gt;</pre>
CSS部分：
<pre class="lang:css decode:true">#div6 {
    margin-bottom: 10px;
}
.div6-a {
    float: left;
    width: 50px;
    height: 50px;
    background: #f00;
}
.div6-b {
    margin: 0 50px;
    height: 50px;
    background: #00f;
}
.div6-c {
    float: right;
    width: 50px;
    height: 50px;
    background: #ff0;
}</pre>
结果出现问题：![](/images/TASK0001_2.png)

黄色的C元素跑到下一行去了

尝试了下先把C元素flow到右侧再填充B元素，即：

HTML部分：
<pre class="lang:default decode:true">&lt;div id="div6"&gt;
    &lt;div class="div6-a"&gt;&lt;/div&gt;
    &lt;div class="div6-c"&gt;&lt;/div&gt;
    &lt;div class="div6-b"&gt;&lt;/div&gt;
&lt;/div&gt;</pre>
达到预期结果： ![](/images/TASK0001_1.png)

原因：浮动元素在文档流空出的位置，由后续的(非浮动)元素填充上去：块级元素直接填充上去，若跟浮动元素的范围发生重叠，浮动元素覆盖块级元素；内联元素则有空隙就插入。

所以加入C元素后再加入B元素时，B元素直接填充到A C元素的同一行；加入B元素后再加入C元素时，由于B元素一行没有空隙，C元素浮动到下一行。

&nbsp;

**3\. 负边距(negative margin)**（参考 [CSS布局奇淫巧计之-强大的负边距](http://www.cnblogs.com/2050/archive/2012/08/13/2636467.html)）

[圣杯布局、双飞翼布局](http://www.imooc.com/wenda/detail/254035)都用了负边距对浮动元素的影响的原理，某个元素虽然写在了后面，但可以通过负边距让它在浏览器显示的时候是在前面的，具体见参考，写得非常好。

&nbsp;

**4. 清除浮动**（参考 [那些年我们一起清除过的浮动](http://www.iyunlu.com/view/css-xhtml/55.html)）

做浮动布局那题时，装蓝色方块的红色容器总是显示不出来，用F12看到红色容器的高度不知道为什么变成了0，于是参考双飞翼布局的代码，发现双飞翼布局在父级元素设置了一个 overflow: hidden 的属性，我尝试了一下给红色容器也加上 overflow: hidden 属性，高度居然神奇地可以自适应了，十分不理解。

经过蛋炒饭的指点知道了，子级元素都是 flow 属性的时候，会造成父级元素没有高度，而 overflow: hidden 有清除浮动的效果，所以加上后会使父级恢复高度（overflow: hidden 清除浮动的原理见参考）。

&nbsp;

到此为止，花了两天时间，已经完成了1-6节实战小练习的内容，成果见：[https://www.anotherhome.net/file/ife/task0001-16/task0001.html](https://www.anotherhome.net/file/ife/task0001-16/task0001.html)

下面就是综合练习了，看起来就好难。。

&nbsp;

**5. absolute 元素的定位**（参考 [CSS 中，为什么绝对定位（absolute）的父级元素必须是相对定位（relative）？-知乎](http://www.zhihu.com/question/19926700)）

写第七题中导航栏的时候需要用到绝对定位，但绝对定位是相对谁定位呢？之前一直没搞清楚。

absolute 元素的定位是上溯父级元素，找第一个不是 static 的元素，以其为 absolute 的基准。如果父级元素全都没有设置（static），则里面的绝对定位以 body 定位。

所以一般的做法是将想作为基准的父级元素加上 position: relative 属性。

&nbsp;

**6. 图片的 4px 空白间距**（参考 [Why does container div insist on being slightly larger than its content? -stackoverflow](http://stackoverflow.com/questions/11126685/why-does-container-div-insist-on-being-slightly-larger-than-its-content)）

插入顶部图片时候发现了一个很诡异的问题，见图：

图片高度500px![](/images/TASK0001_3.png)

父级高度504px![](/images/TASK0001_4.png)

多出来4px。。。

网上搜了下基本上都是因为设置[inline-block元素才出现的空白间距](http://www.w3cplus.com/css/fighting-the-space-between-inline-block-elements)，但我没有inline-block元素呀。但是可以通过类似的方法消除4px间距，我用了设置父元素的字体大小为0的方法解决。

我已经将上述问题的代码化简后传到了服务器上，有兴趣的可以帮我看一下：[https://www.anotherhome.net/file/ife/task0001-7_problem/](https://www.anotherhome.net/file/ife/task0001-7_problem/)

Update：多谢 [天然傲娇](http://saintwinkle.com/)，原因已了解，&lt;img&gt; 默认是inline元素（内联元素、行内元素），计算高度时要加上 line-height 的默认值（4px）。

来自stackoverflow：
> Since an &lt;img&gt; is an inline element by default, it's height is calculated differently as related to the default line-height value.
> 
> 
> On inline elements, the line-height CSS property specifies the height that is used in the calculation of the line box height.
> 
> 
> On block level elements, line-height specifies the minimal height of line boxes within the element.
&nbsp;

**7. CSS控制DIV两列左右高度一致**（参考 [CSS控制DIV两列左右高度一致](http://www.l3c.cn/plus/view.php?aid=8)）

content为父级元素，多个post作为子级元素，目的是使post高度保持一致。
<pre class="lang:default decode:true">.content {
    width: 980px;
    overflow: hidden;
}

.post {
    width: 320px;
    float: left;
    margin-bottom: -10000px;
    padding-bottom: 10000px;
    background: #fff;
}</pre>
我是这样理解的：通过 padding-bottom: 10000px，外边距和内边距同时加10000px，再通过 margin: -10000px，内边距同时减10000px，然后，在没达到同一高度时，较长的元素的外边距跟着减小，而较短的元素外边距不变，达到同一高度后，较长元素和较短元素外边距同时减小。结果就高度一致了。

&nbsp;

**8. tr边框**（参考 [CSS如何修改tr边框属性](http://blog.csdn.net/chenssy/article/details/8453495)）

像这样在CSS中直接给tr设置边框不起作用，而如果指定td的边框又会有间断的现象出现
<pre class="lang:default decode:true">tr {
    border: 1px  solid #000;
}</pre>
如果同时给table设置border-collapse属性，tr设置的边框就能出现了
<pre class="lang:default decode:true">table {  
    border-collapse: collapse;
}

tr {
    border: 1px  solid #000;
}</pre>
原因见参考

&nbsp;

**TASK0001 全部完成：**

第七题 Demo：[https://www.anotherhome.net/file/ife/task0001/](https://www.anotherhome.net/file/ife/task0001/)

1-6题 Demo：[https://www.anotherhome.net/file/ife/task0001-16/task0001.html](https://www.anotherhome.net/file/ife/task0001-16/task0001.html)

&nbsp;

☆ﾐ(o*･ω･)ﾉ完结散花 等待review

&nbsp;

Review结束，根据导师的建议修改及总结如下：

**9\. 删除 lang="zh-CN"** （参考 [网页头部的声明应该是用 lang="zh" 还是 lang="zh-cn"？](http://www.zhihu.com/question/20797118)）

修改：
<pre class="lang:default decode:true ">&lt;head lang="zh-CN"&gt;

&lt;head&gt;</pre>
单一的 zh 和 zh-CN 均属于废弃用法。

看了下百度 淘宝 微博等网站均没有写lang属性，可以放心删掉啦。

&nbsp;

**10\. 使用h1标签** （参考 [HTML之h1 h2 h3 h4标签知识经验篇 - DIVCSS5](http://www.divcss5.com/html/h328.shtml)）

修改：
<pre class="lang:default decode:true">&lt;div class="logo"&gt;
    &lt;a href="index.html"&gt;&lt;img src="img/logo.png" alt="logo" width="200px"&gt;&lt;/a&gt;
&lt;/div&gt;

&lt;h1 class="logo"&gt;
    &lt;a href="index.html"&gt;&lt;img src="img/logo.png" alt="logo" width="200px"&gt;&lt;/a&gt;
&lt;/h1&gt;</pre>
h1 h2 h3 h4 标题标签常常使用在一个网页中唯一标题、重要栏目、重要标题等情形下。

其中 h1 在一个网页中最好只使用一次，如对一个网页唯一标题使用。

在一个网页中可以适当使用h1 h2 h3 h4标签，有利于网页的重点部分突出，同时也利于搜索引擎排名。

看到淘宝也是这样做的，在logo的代码外包了一个h1标签。

&nbsp;

**11\. 其他修改**

没想到在a标签上用class，多套了一层div：
<pre class="lang:default decode:true ">&lt;div class="icon-github"&gt;
    &lt;a href="https://github.com/DIYgod" target="_blank"&gt;&lt;img src="img/icon-github.png"&gt;&lt;/a&gt;
&lt;/div&gt;

&lt;a class="icon-github" href="https://github.com/DIYgod" target="_blank"&gt;&lt;img src="img/icon-github.png"&gt;&lt;/a&gt;</pre>
命名：
<pre class="lang:default decode:true">&lt;div class="description"&gt;

&lt;div class="banner"&gt;</pre>
将&lt;hr&gt;用border代替：
“不推荐&lt;hr&gt;，用上下容器的border来代替吧
当我不需要这条线的时候，只需要改变样式即可，不需要改动html”

使用ul li或者dl之类的列表语义的dom。

&nbsp;