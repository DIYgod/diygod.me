---
title: 百度前端技术学院编码挑战（TASK 0002）
id: 1982
categories:
  - 创作集
date: 2015-04-24 16:03:06
tags:
permalink: 1982
---

TASK 0002 已经发布，初级班的任务时间是从4月24日至5月7日，中级班为4月18日至4月25日。

TASK 0002 内容：[https://github.com/baidu-ife/ife/tree/master/task/task0002](https://github.com/baidu-ife/ife/tree/master/task/task0002)

我做的：[https://github.com/DIYgod/ife-work/tree/master/task0002](https://github.com/DIYgod/ife-work/tree/master/task0002)

在线Demo： [https://www.anotherhome.net/file/ife/task0002/task0002_1.html](https://www.anotherhome.net/file/ife/task0002/task0002_1.html)

本次任务累计花费时间17天（4.19-5.6 ）

下面是我做 TASK 0002 过程中的一些记录。<!--more-->

* * *

**1. JavaScript 的性能优化 **（参考 [JavaScript 的性能优化：加载和执行](http://www.ibm.com/developerworks/cn/web/1308_caiys_jsload/index.html)）

· Web 开发人员一般习惯在 &lt;head&gt; 中加载外链的 JavaScript，接着用 &lt;link&gt; 标签用来加载外链的 CSS 文件或者其他页面信息。然而这种常规的做法却隐藏着严重的性能问题——脚本会阻塞页面其他资源的下载。因此推荐将所有&lt;script&gt;标签尽可能放到&lt;body&gt;标签的底部，以尽量减少对整个页面下载的影响。

· 由于每个&lt;script&gt;标签初始下载时都会阻塞页面渲染，所以减少页面包含的&lt;script&gt;标签数量有助于改善这一情况。

· 减少 JavaScript 对性能的影响其他方法见参考。

&nbsp;

**2\. `==` 与 `===`** （参考 [Javascript中双等号“==”和三等号“===”的区别](http://www.weste.net/2013/3-1/89405.html) [JavaScript里面三个等号和两个等号的区别](http://www.cnblogs.com/litsword/archive/2010/07/22/1782933.html) [JavaScript编码规范](https://github.com/ecomfe/spec/blob/master/javascript-style-guide.md#%E5%BC%BA%E5%88%B6-%E5%9C%A8-equality-expression-%E4%B8%AD%E4%BD%BF%E7%94%A8%E7%B1%BB%E5%9E%8B%E4%B8%A5%E6%A0%BC%E7%9A%84-%E4%BB%85%E5%BD%93%E5%88%A4%E6%96%AD-null-%E6%88%96-undefined-%E6%97%B6%E5%85%81%E8%AE%B8%E4%BD%BF%E7%94%A8--null)）

`==`：等于运算，但是不比较值的类型；
`===`：完全等于运算，不仅比较值，而且还比较值的类型，只有两者一致才为真。

百度JavaScript编码规范也规定：在 Equality Expression 中强制使用类型严格的 `===`。仅当判断 null 或 undefined 时，允许使用 `== null`。因为使用 `===` 可以避免等于判断中隐式的类型转换。

&nbsp;

**3. 类型检测** （参考 [JavaScript编码规范](https://github.com/ecomfe/spec/blob/master/javascript-style-guide.md#%E5%BC%BA%E5%88%B6-%E5%9C%A8-equality-expression-%E4%B8%AD%E4%BD%BF%E7%94%A8%E7%B1%BB%E5%9E%8B%E4%B8%A5%E6%A0%BC%E7%9A%84-%E4%BB%85%E5%BD%93%E5%88%A4%E6%96%AD-null-%E6%88%96-undefined-%E6%97%B6%E5%85%81%E8%AE%B8%E4%BD%BF%E7%94%A8--null) [Javascript数组类型检测：编写更强壮的isArray函数](http://scriptfans.iteye.com/blog/318821) [Javascript 判断函数类型完美解决方案](http://www.jb51.net/article/19841.htm)）

通用的简易做法：类型检测优先使用 `typeof`。对象类型检测使用 `instanceof`。null 或 undefined 的检测使用 `== null`
<pre class="lang:default decode:true ">// string
typeof variable === 'string'

// number
typeof variable === 'number'

// boolean
typeof variable === 'boolean'

// Function
typeof variable === 'function'

// Object
typeof variable === 'object'

// RegExp
variable instanceof RegExp

// Array
variable instanceof Array

// null
variable === null

// null or undefined
variable == null

// undefined
typeof variable === 'undefined'</pre>
判断数组类型：得到对象的字符串表示，然后对比此字符串是否是'[object Array]'
<pre class="lang:default decode:true ">function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}</pre>
9.20更新：下面这样也可以
<pre class="lang:default decode:true">function isArray(arr) {
    return Array.isArray(arr);
}</pre>
判断函数类型：首先保证测试的对象存在，并将其序列化成含有“function”的字符串，这个是我们检测的基础(fn.constructor != String,fn.constructor != Array, and fn.constructor != RegExp)。另外，我们需要保证声明的函数不是一个DOM节点（fn.nodeName）。然后，我们就可以作toString测试。如果我们将一个函数转换成字符串，在一个浏览器中（fn+""）给我们的结果就像这样“function name(){...}”。现在，判断它是否为函数就很简单，仅仅只需要判断字符串中是否包含单词“function”。这很神奇，对于任何有问题的函数，在所有浏览器中都能得到我们所需要的结果。这个函数较之于传统的方法，运行速度有些不尽人意，作者（John Resig）建议我们保守使用。
<pre class="lang:default decode:true">function isFunction(fn) {
        return !!fn
        &amp;&amp; !fn.nodeName
        &amp;&amp; fn.constructor != String
        &amp;&amp; fn.constructor != RegExp
        &amp;&amp; fn.constructor != Array
        &amp;&amp; /function/i.test(fn + '');
}</pre>
9.20更新：上面那种太麻烦，可以类似Array那样判断
<pre class="lang:default decode:true">function isFunction(fn) {
    return Object.prototype.toString.call(fn) === '[object Function]';
}</pre>
复制Array的简单做法：
<pre class="lang:default decode:true">var a1 = [1, 2, 3]
var a2 = a1.slice(0);</pre>
&nbsp;

**4. 类型转换** （参考 [JavaScript编码规范](https://github.com/ecomfe/spec/blob/master/javascript-style-guide.md#%E5%BC%BA%E5%88%B6-%E5%9C%A8-equality-expression-%E4%B8%AD%E4%BD%BF%E7%94%A8%E7%B1%BB%E5%9E%8B%E4%B8%A5%E6%A0%BC%E7%9A%84-%E4%BB%85%E5%BD%93%E5%88%A4%E6%96%AD-null-%E6%88%96-undefined-%E6%97%B6%E5%85%81%E8%AE%B8%E4%BD%BF%E7%94%A8--null)）

number -&gt; string:
<pre class="lang:default decode:true ">num + '';</pre>
string -&gt; number:
<pre class="lang:default decode:true ">+str;

var width = '200px';  // 要转换的字符串结尾包含非数字并期望忽略时，使用 parseInt
parseInt(width, 10);</pre>
-&gt; boolean:
<pre class="lang:default decode:true ">var num = 3.14;
!!num;</pre>
number 去除小数点:
<pre class="lang:default decode:true ">var num = 3.14;
Math.ceil(num);</pre>
&nbsp;

**5. 对有序集合进行遍历时，缓存 length** （参考 [JavaScript编码规范](https://github.com/ecomfe/spec/blob/master/javascript-style-guide.md#%E5%BC%BA%E5%88%B6-%E5%9C%A8-equality-expression-%E4%B8%AD%E4%BD%BF%E7%94%A8%E7%B1%BB%E5%9E%8B%E4%B8%A5%E6%A0%BC%E7%9A%84-%E4%BB%85%E5%BD%93%E5%88%A4%E6%96%AD-null-%E6%88%96-undefined-%E6%97%B6%E5%85%81%E8%AE%B8%E4%BD%BF%E7%94%A8--null)）

虽然现代浏览器都对数组长度进行了缓存，但对于一些宿主对象和老旧浏览器的数组对象，在每次 length 访问时会动态计算元素个数，此时缓存 length 能有效提高程序性能。
<pre class="lang:default decode:true ">for (var i = 0, len = elements.length; i &lt; len; i++) {
    var element = elements[i];
    // ......
}</pre>
&nbsp;

**6\. document.body.scrollTop与document.documentElement.scrollTop获取滚动条滚动的距离的坑** （参考 [document.body.scrollTop与document.documentElement.scrollTop兼容](http://jo2.org/document-body-scrolltop%E4%B8%8Edocument-documentelement-scrolltop%E5%85%BC%E5%AE%B9/) [用Javascript获取页面元素的位置](http://www.ruanyifeng.com/blog/2009/09/find_element_s_position_using_javascript.html) [火狐、谷歌、IE关于document.body.scrollTop和document.documentElement.scrollTop 以及值为0的问题](http://www.csdn123.com/html/blogs/20130516/13275.htm)）

参考阮一峰的教程写了下面一段：
<pre class="lang:default decode:true">if (document.compatMode == "BackCompat"){
    var elementScrollLeft=document.body.scrollLeft;
} else {
    var elementScrollLeft=document.documentElement.scrollLeft; 
}</pre>
没想到遇到了坑，结果elementScrollLeft总是0，调试结果如下：

![](/images/task0002_1.png)

好坑啊，说好的如果有文档声明（即网页第一句的docType）的情况下，document.compatMode 的值等于 "CSS1compat"，标准浏览器是只认识documentElement.scrollTop的啊。

另外试了一下IE和Firefox，均可认documentElement.scrollTop，chrome的错！

还好document.body.scrollTop与document.documentElement.scrollTop两者有个特点，就是同时只会有一个值生效。比如document.body.scrollTop能取到值的时候，document.documentElement.scrollTop就会始终为0；反之亦然。所以可以这样写：
<pre class="lang:default decode:true">var scrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
var scrollTop = document.body.scrollTop + document.documentElement.scrollTop;</pre>
&nbsp;

**7\. 获取所有DOM元素**

突然脑洞大开想到的
<pre class="lang:default decode:true ">var ele = document.getElementsByTagName('*');</pre>
&nbsp;

**8\. 真假判断**

对象总为true，基础类型看是否为空
<pre class="lang:js decode:true ">!![]    // true
!!{}    // true
!!''    // false
!!0     // false</pre>
容易把空数组误以为是false！

容易把空数组误以为是false！

容易把空数组误以为是false！

重要的事情要说三遍！

&nbsp;

**9. 递归获取所有子元素**

这个是有问题的，只能获取到下一级的子元素：
<pre class="lang:default mark:2 decode:true">var childs = function (element) {
    var allchilds = [];
    var childn = element.childNodes;
    if (childn.length !== 0) {
        for (var i = 0, len = childn.length; i &lt; len; i++) {
            allchilds.push(childn[i]);
            allchilds.concat(childs(childn[i]));
        }
    }
    return allchilds;
}</pre>
但如果改成这样就能获取所有子元素了：
<pre class="lang:default mark:1 decode:true">var allchilds = [];
var childs = function (element) {
    var childn = element.childNodes;
    if (childn.length !== 0) {
        for (var i = 0, len = childn.length; i &lt; len; i++) {
            allchilds.push(childn[i]);
            allchilds.concat(childs(childn[i]));  //或者 childs(childn[i]);
        }
    }
    return allchilds;
}</pre>
<del>第一段代码出现问题的原因未知，已经想一晚上了，并无进展。</del>

另外调试过程中发现的诡异现象：

![](/images/task0002_2.png)

解释下：递归调用时返回值allchilds是正确的，但返回到上一层时并没有加到上一层的allchilds中。

[月月](http://blog.yueyue.moe/archives/17/) 告诉我这句话有问题！
<pre class="lang:default mark:2 decode:true">allchilds.concat(childs(childn[i]));</pre>
w3school如是说：concat() 方法用于连接两个或多个数组。
该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。仅仅会返回被连接数组的一个副本。仅仅会返回被连接数组的一个副本。

一切都说通了。。

所以根本不关allchilds声明位置的事，debug的方向一直都不对，要这样改：
<pre class="lang:default decode:true ">var childs = function (element) {
    var allchilds = [];
    var childn = element.childNodes;
    if (childn.length !== 0) {
        for (var i = 0, len = childn.length; i &lt; len; i++) {
            allchilds.push(childn[i]);
            allchilds = allchilds.concat(childs(childn[i]));
        }
    }
    return allchilds;
}</pre>
万万没想到，在 [月月](http://blog.yueyue.moe/archives/17/) [李胜](http://www.lishengcn.cn/) [蛋炒饭](http://blog.wedc.cc/) 的帮助下千辛万苦终于完成了这个小函数。。。

后续：突然想到这样就能轻易获取到
<pre class="lang:default decode:true ">element.getElementsByTagName('*');</pre>
已吐血

&nbsp;

**10\. 数组合并** （参考 [JavaScript concat() 方法](http://www.w3school.com.cn/jsref/jsref_concat_array.asp)）

重要的事情要另外单独说。因为被坑惨了。

concat() 方法用于连接两个或多个数组。

该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。

该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。

该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。

错误用法：
<pre class="lang:default decode:true">arr1.concat(arr2);</pre>
正确用法：
<pre class="lang:default decode:true">arr1 = arr1.concat(arr2);</pre>
&nbsp;

**11\. 事件代理** （参考 [javascript事件代理](http://www.cnblogs.com/rubylouvre/archive/2009/08/09/1542174.html)）

在编程中，如果我们不想或不能够直接操纵目标对象，我们可以利用delegate创建一个代理对象来调用目标对象的方法，从而达到操纵目标对象的目的。毋庸置疑，代理对象要拥有目标对象的引用。

<del>可以用事件代理的方法来优雅地用一个函数代理另一个函数，比如：</del>
<pre class="lang:default decode:true"><del>var delegate = function (method) {
    return function() {
        return method.apply(null, arguments);
    }
}

var on = delegate(addEvent);
var un = delegate(removeEvent);</del></pre>
<del>这样就能优雅地用 on un 函数代理 addEvent removeEvent 函数了。这样实现了目标对象的隐藏，这对于我们保护一些核心对象是非常有用的。</del>

我错了，直接这样就行了。。

&nbsp;
<pre class="lang:default decode:true ">var on = addEvent;
var un = removeEvent;</pre>
&nbsp;

**12. Object相关** （参考 [js的Object到底是什么呢?](http://www.cnblogs.com/coolicer/archive/2010/10/13/1850131.html)）

Array、Boolean、Date、Function、Number等等对象，其实都是从Object来的，它们的祖先都是Object。它们表现不同的语言特性，比如Array有被自动管理的length属性，Boolean只有true或false取值，Date表示时间结构，Function可以被运行，都是它们的原始类型(valueOf)赋予它们的能力。

所以有些有趣的东西：
<pre class="lang:default decode:true">function f() {
    alert('f1');
}
f.c = function() {
    alert('c1');
}

f();
f.c();</pre>
可以给函数设置一个也是函数的属性。

&nbsp;

**13\. JavaScript正则表达式分组** （参考 [JavaScript 正则表达式 选择、分组和引用](http://www.xiaoxiaozi.com/2009/08/04/1306/)）

例：
<pre class="lang:default decode:true">function getCookie(cookieName) {
    var re = new RegExp(cookieName + '=(.*?)($|;)');
    return re.exec(document.cookie)[1];
}</pre>
其中re.exec(document.cookie)是一个数组，第一个元素是正则式所有匹配出的字符，第二个元素是匹配的第一个分组，即第一个括号里的内容：(.*?)

分组就就是正则表达式中的子表达式，可以用来获取正则式匹配出的字符串中的特定部分。

9.20更新：当使用构造函数创造正则对象时，需要常规的字符转义规则（在前面加反斜杠 \）。比如，以下是等价的：
<pre class="lang:default decode:true ">var re = new RegExp("\\w+");
var re = /\w+/;</pre>
&nbsp;

**14. JavaScript跨域** （参考 [JavaScript跨域总结与解决办法](http://www.cnblogs.com/rainman/archive/2011/02/20/1959325.html)）

JavaScript出于安全方面的考虑，不允许跨域调用其他页面的对象。但在安全限制的同时也给注入iframe或是ajax应用上带来了不少麻烦。

具体限制及解决办法见参考。

&nbsp;

**15\. JavaScript月份多出一** （参考 [JS 中 new Date 怎么就多一个月了？](http://www.cftea.com/c/2010/06/4KJ75KPG9NBFEIA1.asp) [JavaScript——搞甘特图使用 Date 对象时遇到的问题](http://www.cnblogs.com/liuning8023/archive/2012/12/15/2819728.html)）

![](/images/task0002_4.png)

明明设置的时5月，结果却是6月。

实际中，我们数月份不是从 0 开始，但是 JavaScript 却是从 0 开始。JS中的0月是我们的1月，JS中的1月是我们的2月...

所以设置月份时记得减一，获取月份时记得加一。。

&nbsp;

**15\. 计时器不会阻塞代码执行**

如图![](/images/task0002_5.png)

我的本意是执行完 a() 再输出b，没想到b先输出了，从这里也可以推测出，计时器并不会阻塞后面语句的执行。

&nbsp;

☆ﾐ(o*･ω･)ﾉ完结散花 等待review