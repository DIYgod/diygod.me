---
title: 《JavaScript高级程序设计》读书笔记
id: 2073
categories:
  - 创作集
date: 2015-08-19 00:29:33
tags:
permalink: 2073
---

莎士比亚曾经说过：“好记性不如烂笔头。”

## 第一章 JavaScript简介

### 1.1 JavaScript简史

### 1.2 JavaScript实现

1. 一个完整的JavaScript实现应该由三个不同的部分组成：核心（ECMAScript）、文档对象模型（DOM）、浏览器对象模型（BOM）。

2. ECMAScript：提供核心语言功能；DOM：提供访问和操作网页内容的方法和接口；BOM：提供与浏览器交互的方法和接口。

### 1.3 JavaScript版本

&nbsp;

## 第二章 在HTML中使用JavaScript

### 2.1 script元素

1. 标签的位置：为了避免浏览器在呈现页面时出现明显的延迟，现代Web应用程序一般都把全部JavaScript引用放在&lt;body&gt;元素中页面内容的后面。

2. 延迟脚本：defer属性表明脚本在执行时不会影响页面的构造，脚本会被延迟到整个页面都解析完毕后再运行；只适用于外部脚本文件。

```html
<script defer="defer" src="example.js"></script>
```
3. 异步脚本：async属性表示当前脚本不必等待其他脚本，也不必阻塞文档呈现，告诉浏览器立即下载文件，且并不保证标记为async的脚本按照他们的先后顺序执行；只适用于外部脚本文件。

```html
<script async src="example1.js"></script>
<script async src="example2.js"></script>
```

### 2.2 嵌入代码与外部文件

### 2.3 文档模式

4. 混杂模式与标准模式；开启标准模式：

```html
<!-- HTML 5 -->
<!DOCTYPE html>
```

### 2.4 noscript元素

&nbsp;

## 第三章 基本概念

### 3.1 语法

1. 区分大小写：ECMAScript中的一切都区分大小写。

2. 严格模式：在严格模式下，ECMAScript 3 中的一些不确定的行为将得到处理，而且对某些不安全的操作也会抛出错误。在顶部添加如下代码：

```js
"use strict"
```

### 3.2 关键字和保留字

### 3.3 变量

3. 给未经声明的变量赋值在严格模式下会导致抛出 ReferenceError 错误。

### 3.4 数据类型

4. typeof操作符，用来检测变量的数据类型。

5. 5种简单数据类型：Undefined、Null、Boolean、Number、String；1种复杂数据类型（引用类型）：Object。

+ Undefined类型：使用var声明变量但未对其加以初始化时，这个变量的值就是undefined。

+ Null类型：null值表示一个空对象指针；只要意在保存对象的变量还没有真正保存对象，就应该明确地让该变量保存null值。

+ Boolean类型：其他类型转换为Boolean类型，使用函数Boolean()。

+ Number类型：其他类型转换为Number类型，常用函数parseInt()，转换字符串时，如果第一个字符不是数字字符或者负号，会返回NaN，第二个参数可选，表示进制

+ String类型：字符串是不可变的；其他类型转换为String类型，使用函数toString()或String()或加一个空字符串（1+''）。

+ Object类型

创建对象的方法：

```js
var o = new Object();
```

创建Object对象的实例并为其添加属性或方法，就可以创建自定义对象；

Object类型是所有它的实例的基础，具有下列属性和方法：

- constructor：保留着用于创建当前对象的函数即构造函数；

- hasOwnProperty(propertyName)：用于检查给定的属性在当前对象实例中是否存在；

- isPrototypeOf(object)：用于检查传入的对象是否是传入对象的原型；

- propertyIsEnumerable()；toLocaleString()；

- toString()：返回对象的字符串表示；

- valueOf()：返回对象的字符串、数值或布尔值表示；

### 3.5 操作符

6. 在比较字符串时，实际比较的是两个字符串中对应位置的每个字符的字符编码值。

```js
"23" < "3"   // true
```
7. 在比较数值和字符串时，字符串都会被被转换成数值，然后再以数值方式与另一个数值比较；如果不能转换成数值，就转换成NaN。

8. 任何操作数与NaN进行比较，结果都是false。

```js
NaN == NaN  // false
NaN === NaN  // false
NaN &gt; NaN  // false
NaN &lt; NaN  // false
```

9. 相等（==） 全等（===）：全等只在两个操作数未经转换就相等的情况下返回true。

```js
"55" == 55  // true
"55" === 55  // false
```

10. 条件操作符

```js
variable = boolean_expression ? true_value : false_value;
```

### 3.6 语句

11. 由于ECMAScript中不存在块级作用域，因此在循环内部定义的变量也可以在外部访问到：

```js
for (var i = 0; i &lt; 10; i++) {
	var j = 1;
}
console.log(i, j);  // 10 1
```

12. for-in 语句可以用来枚举对象的属性。

```js
for (property in expression) {
  ...
}
```

13. break 和 continue 语句与 label 语句联合使用：多发生在循环嵌套的情况下。

```js
var num = 0;

outermost:
for (var i = 0; i &lt; 10; i++) {
	for (var j = 0; j &lt; 10; j++) {
		if (i == 5 &amp;&amp; j ==5) {
			break outermost;
		}
		num++;
	}
}

console.log(num);  // 55
```

### 3.7 函数

14. 函数参数：参数在内部是用一个数组来表示的，函数接收到的始终都是这个数组，而不关心数组中包含哪些函数；通过arguments对象来访问这个参数数组；命名的参数只提供便利，但不是必需的；arguments对象中的值与对应的命名参数的内存空间是独立的，但它们的值会同步。

```js
function example(name, age) {
	console.log('arguments:', arguments);
	console.log('name:', name, 'age:', age);
	name = 'DIYgod';
	console.log(arguments[0]);
}
example('Anotherhome', '556', 'www.anotherhome.net');

// arguments: ["Anotherhome", "556", "www.anotherhome.net"]
// name: Anotherhome age: 556
// DIYgod
```

&nbsp;

## 第四章 变量、作用域和内存问题

### 4.1 基本类型和引用类型的值

1. 在操作对象时，实际上是在操作对象的引用而不是实际的对象。

2.从一个变量向另一个变量复制基本类型的值时，会创建这个值的一个副本；从一个变量向另一个变量复制引用类型的值时，复制的是指向存储在堆中的一个对象的指针，复制之后两个变量指向同一个对象。

```js
var o1 = {};
var o2 = o1;
o1.name = 'DIYgod';
console.log(o2.name);  // DIYgod

var n1 = 1;
var n2 = n1;
n1 = 2;
console.log(n2);  // 1
```

3. 传递参数：参数只能按值传递，参数为对象时，在函数内部访问的是同一个对象。

```js
function setName(o) {
	o.name = 'DIYgod';
	o = {};
	o.name = 'Anotherhome';
}

var p = {};
setName(p);
console.log(p.name);  // DIYgod
```

4. 确定一个值是哪种基本类型可以使用typeof操作符，而确定一个值是哪种引用类型可以使用instanceof操作符。

### 4.2 执行环境及作用域

5. 执行环境有全局执行环境和函数执行环境之分；每个执行环境都有一个与之关联的变量对象；每次进入一个新执行环境，都会创建一个用于搜索变量和函数的作用域链，作用链的前端是当前执行的代码所在的变量环境，最后一个对象是全局执行环境的变量对象。

6. 查询标识符：从作用域链的前端开始，向上逐级查询，找到后搜索结果停止，没有找到则一直追溯到全局环境的变量对象。

### 4.3 垃圾回收

7. 最常用的垃圾搜集方式是标记清除：垃圾回收器在运行时会给存储在内存中的所有变量都加上标记，然后去掉环境中的变量以及被环境中的变量引用的变量的标记，而在此之后还有标记的变量被视为准备删除的变量，因为这些变量无法被访问到了。

8. 优化内存占用：为执行中的代码只保存必要的数据；一旦数据不再有用，最好通过将其值设置为null来释放其引用——解除引用；解除引用的作用是让其值脱离执行环境，以便垃圾搜集器下次运行时将其回收。

&nbsp;

## 第五章 引用类型

### 5.1 Object类型

1. 创建Object实例：使用Object构造函数；对象字面量。

```js
// new 操作符法
var o1 = new Object();
o1.name = 'DIYgod';
o1.age = 20;

// 对象字面量表示法
var o1 = {
  name: 'DIYgod',
  age: 20
}
```

2. 访问对象属性：点表示法；方括号表示法。建议使用点表示法。

```js
// 点表示法
console.log(o.name);

// 方括号表示法
console.log(o['name']);

var n = 'name';
console.log(o[n]);

console.log(o['first name'];
```


### 5.2 Array类型

3. 创建数组：使用Array构造函数；使用数组字面量表示法。

```js
var a1 = new Array();
var a2 = new Array(20);
var a3 = new Array('red', 'blue', 'green');

var a4 = [];
var a5 = ['red', 'blue', 'green'];
```

4. 利用length在末尾添加新项。

```js
var a = ['a', 'b'];
a[a.length] = 'c';
```

5. 检测数组：Array.isArray()（解决了存在两个以上全局执行环境时instanceof检测结果出错的情况）。

6. 栈方法和队列方法：push()添加一项到数组末尾；pop()移除数组末尾一项；shift()移除数组第一项；unshift()；添加一项到数组前端。

7. 重排序

+ reverse()：反转数组项的顺序。

+ sort()：默认将数组项转换成字符串然后升序排列。可以接收一个比较函数作为参数。

比较函数接收两个参数，如果第一个参数位于第二个参数之前则返回一个负数，相等则返回0，第二个参数位于第一个参数之前则返回一个负数。

```js
var a = [0, 1, 15, 10, 5];
a.sort();
console.log(a)  // [0, 1, 10, 15, 5]

function compare(value1, value2) {
	return value1 - value2;
}
a.sort(compare);
console.log(a)  // [0, 1, 5, 10, 15]
```

8. 操作方法

+ concat()：添加项

```js
var a1 = ['red', 'green', 'blue'];
var a2 = a1.concat('yellow', ['black', 'brown']);
console.log(a2)  // ["red", "green", "blue", "yellow", "black", "brown"]
```

+ slice()：截取

```js
var a = ["red", "green", "blue", "yellow", "black", "brown"];
console.log(a.slice(1), a.slice(1, 4))  // ["green", "blue", "yellow", "black", "brown"] ["green", "blue", "yellow"]
```

+ splice()：删除插入替换

```js
var a = ["red", "green", "blue", "yellow", "black", "brown"];
console.log(a.splice(2, 1), a);  // 删除项; ["blue"] ["red", "green", "yellow", "black", "brown"]
console.log(a.splice(1, 0, 'yellow', 'orange'), a);  // 插入项; [] ["red", "yellow", "orange", "green", "yellow", "black", "brown"]
console.log(a.splice(1, 1, 'red', 'purple'), a);  // 替换项; ["yellow"] ["red", "red", "purple", "orange", "green", "yellow", "black", "brown"]
```

9. 位置方法：indexOf() lastIndexOf() 接收两个参数：要查找的项和（可选）查找起点位置的索引；indexOf()从前往后查找，lastIndexOf()从后往前查找；返回要查找的项的位置，没找到则返回-1。

```js
var a = ["red", "purple", "orange", "green", "red", "yellow", "black", "brown"];
console.log(a.indexOf('red'));  // 0
console.log(a.lastIndexOf('red'));  // 4
console.log(a.indexOf('red', 1));  // 4
console.log(a.lastIndexOf('red', 1));  // 0
```

10. 迭代方法：every() some() filter() map() forEach()。

```js
var a = [1, 2, 3, 4, 5, 4, 3, 2, 1];

var everyResult = a.every(function (item, index, array) {
	return (item &gt; 2);
});
console.log(everyResult);  // false

var someResult = a.some(function (item, index, array) {
	return (item &gt; 2);
});
console.log(someResult);  // true

var filterResult = a.filter(function (item, index, array) {
	return (item &gt; 2);
});
console.log(filterResult);  // [3, 4, 5, 4, 3]

var mapResult = a.map(function (item, index, array) {
	return (item * 2);
});
console.log(mapResult);  // [2, 4, 6, 8, 10, 8, 6, 4, 2]

var forEachResult = a.forEach(function (item, index, array) {
	console.log(item);
});
console.log(forEachResult);  // undefined
```

11. 归并方法

```js
var a = [1, 2, 3, 2, 1];

var sum1 = a.reduce(function (prev, cur, index, array) {
	console.log(index);  // 1 2 3 4
	return prev + cur;
});
console.log(sum1);  // 9

var sum2 = a.reduceRight(function (prev, cur, index, array) {
	console.log(index);  // 3 2 1 0
	return prev + cur;
});
console.log(sum2);  // 9
```


### 5.3 Date类型

1. 创建日期对象：月份基于0（一月是0，二月是1...）。

```js
var d1 = new Date();

var d2 = new Date(2015, 2, 5, 17, 55, 55);  // 2015年3月5日下午5点55分55秒
```

2. 获取调用时的日期和时间和毫秒数，可以用来分析代码。

```js
var start = Date.now();
doSomething();
var stop = Date.now();
var result = stop - start;
```

3. 日期格式化方法：local表示以特定于地区的格式显示。

```js
var d2 = new Date(2015, 2, 5, 17, 55, 55);
d2.toString();  // "Thu Mar 05 2015 17:55:55 GMT+0800 (CST)"
d2.toDateString();  // "Thu Mar 05 2015"
d2.toTimeString();  // "17:55:55 GMT+0800 (CST)"
d2.toLocaleString();  // "2015/3/5 下午5:55:55"
d2.toLocaleDateString();  // "2015/3/5"
d2.toLocaleTimeString();  // "下午5:55:55"
```


### 5.4 RegExp类型

1. 创建一个正则表达式：

pattern部分是正则表达式

flags，标志，标明正则表达式的行为：g 全局模式；i 不区分大小写；m 多行模式

```js
var exp1 = / pattern / flags
var exp2 = new RegExp('pattern', 'flags');
```

2. 实例方法：

+ exec()：返回第一个匹配项信息的数组，数组第一项是与整个模式匹配的字符串，其他项是与模式中的捕获组匹配的字符串；还包含两个额外的属性，index 和 input。

```js
var text = "I'm DIYgod, and this is Anotherhome";
var pattern = /and( this( is)?)?/gi;
var matches = pattern.exec(text);
console.log(matches.index);  // 12
console.log(matches.input);  // I'm DIYgod, and this is Anotherhome
console.log(matches[0]);  // and this is
console.log(matches[1]);  //  this is
console.log(matches[2]);  //  is
```

+ test()：在模式与该参数匹配的情况下返回true，否则返回false。

```js
var text = "I'm DIYgod, and this is Anotherhome";
var pattern = /DIYgod/;
var matches = pattern.test(text);
console.log(matches);  // true
```

3. RegExp构造函数包含一些属性，适用于作用域中的所有正则表达式，记录一些最近一次正则表达式操作的信息。

### 5.5 Function类型

1. 定义函数，函数实际上是 Function 类型的实例，因此函数也是对象。

```js
// 使用函数声明语法
function f1 (n1, n2) {
	return n1 + n2;
}

// 使用函数表达式
var f2 = function (n1, n2) {
	return n1 + n2;
};

// 使用构造函数，不推荐
var f3 = new Function('n1', 'n2', 'return n1 + n2');
```

2. 函数名是一个指向函数对象的指针。

```js
function f1 (n1, n2) {
	return n1 + n2;
}
var f2 = f1;
f1 = null;
console.log(f2(1, 1));  // 2
```

3. ECMAScript中没有函数重载。

4. 函数声明与函数表达式的区别：解释器会率先读取函数声明，并使其在执行任何代码之前可用（函数声明提升）；函数表达式必须等到解释器执行到它所在行才会真正被解释执行。

```js
console.log(f1(1, 1));  // 2
function f1 (n1, n2) {
	return n1 + n2;
}

console.log(f2(1, 1));  // Uncaught TypeError: f2 is not a function
var f2 = function(n1, n2) {
	return n1 + n2;
}
```

5. 函数内部属性

+ 函数的arguments对象的callee属性：是一个指针，指向拥有这个arguments对象的函数。可以在递归时减小函数和函数名的耦合。

```js
// 明显第二种写法更好一些

function factorial1 (num) {
	if (num &lt;= 1) {
		return 1;
	}
	else {
		return num * factorial1(num - 1);
	}
}

function factorial2 (num) {
	if (num &lt;= 1) {
		return 1;
	}
	else {
		return num * arguments.callee(num - 1);
	}
}
```

+ caller属性：保存着当前函数的函数的引用。

```js
function outer() {
	inner();
}
function inner() {
	console.log(arguments.callee.caller);  // function outer()...
}
outer();
```

6. 函数属性和方法

+ length属性：表示函数希望接收的命名参数的个数。

```js
function f (n1, n2) {
	return n1 + n2;
}
console.log(f.length);  // 2
```

+ apply() call()：用来改变函数的this对象的值。

```js
window.color = 'red';
var o = {
	color: 'blue'
};

function sayColor (n1, n2) {
	console.log(this.color);
	return n1 + n2;
}

sayColor(1, 1);  // red
o.sayColor = sayColor;
o.sayColor();  // blue

// 使用call和apply可以消除对象与方法的耦合关系
sayColor.call(window, 1, 1);  // red
sayColor.call(o, 1, 1);  // blue

sayColor.apply(window, [1, 1]);  // red
sayColor.apply(o, [1, 1]);  // blue
```


### 5.6 基本包装类型

Boolean类型、Number类型、String类型

暂时跳过

### 5.7 单体内置对象

Global对象、Math对象

暂时跳过

&nbsp;

## 第六章 面向对象的程序设计

### 6.1 理解对象

1. 两种属性：数据属性和访问器属性。特性：描述属性的各种特征，是为了实现JavaScript引擎用的，不能直接访问。

+ 数据属性，有4个特性：

- [[Configurable]]：表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特性，能否把属性修改为访问器属性。

- [[Enumerable]]：表示能否通过 for-in 循环返回属性。

- [[Writeable]]：表示能否修改属性的值。

- [[Value]]：包含这个属性的数据值。

+ 访问器属性，有4个特性：

- [[Configurable]]：表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特性，能否把属性修改为数据属性。

- [[Enumerable]]：表示能否通过 for-in 循环返回属性。

- [[Get]]：在读取属性时调用的函数。

- [[Set]]：在写入属性时调用的函数。

2. 定义及读取特性：Object.defineProperty() Object.defineProperties() Object.getOwnPropertyDescriptor()

### 6.2 创建对象

1. 工厂模式：虽然解决了创建多个相似对象的问题，但却没有解决对象识别的问题。

```js
function createPerson(name, age, job) {
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function () {
		console.log(this.name);
	}
	return o;
}
var p1 = createPerson('DIYgod', 20, 'Software Engineer');
var p2 = createPerson('Anotherhome', 2, 'Website');
```

2. 构造函数模式。（构造函数应该以大写字母开头）

```js
function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = function () {
		console.log(this.name);
	}
}
var p1 = new Person('DIYgod', 20, 'Software Engineer');
var p2 = new Person('Anotherhome', 2, 'Website');

// p1 p2 分别保存着 Person 的一个不同的实例，这两个对象都有一个 constructor 属性，该属性指向Person
console.log(p1.constructor);  // function Person(name, age, job) {...

console.log(p1 instanceof Object);  // true
console.log(p1 instanceof Person);  // true
```

这种方法会经历4个步骤：

+ 创建一个新对象

+ 将构造函数的作用域赋给新对象（this指向这个新对象）

+ 执行构造函数中的代码（为新对象添加属性）

+ 返回新对象

构造函数的问题：每个方法都要在每个实例上重新创建一遍。

```js
console.log(p1.sayName === p2.sayName);  // false
```

3. 原型模式：每个函数都有一个 prototype 属性，这个属性是一个指针，指向一个对象（函数的原型对象），这个对象包含可以由该类型的所有实例共享的属性和方法。

```js
// 组合使用构造函数模式与原型模式
function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
}
Person.prototype.sayName = function () {
	console.log(this.name);
}
var p1 = new Person('DIYgod', 20, 'Software Engineer');
var p2 = new Person('Anotherhome', 2, 'Website');

console.log(p1.sayName === p2.sayName);  // true
```

+ 理解原型对象：

- 只要创建一个新函数，就会根据一组特定的规则为该函数创建一个 prototype 属性，指向原型对象

- 默认所有原型对象都会获得一个 constructor 属性，指向 prototype 属性所在函数

- 调用构造函数创建新实例后，实例将有一个 __proto__ 属性，指向构造函数的原型对象，指针叫[[Prototype]]，默认原型指向Object

- 实例与构造函数没有直接关系

- 读取属性：搜索先从对象实例本身开始，如果没找到，搜索原型对象

- 使用 isPrototype() 来检测构造函数和实例之间是否有关系

- 使用 hasOwnProperty() 来检测属性存在于实例中还是原型中

+ 原型与 in 操作符

```js
// in操作符会在通过对象能够访问到属性时返回true
console.log('name' in p1);  // true

// 枚举属性
for (var prop in p1) {
	console.log(prop);  // name age job sayName
}
```

+ 用对象字面量重写原型对象

```js
function Person() {
}
Person.prototype = {
	constructor: Person,  // 这里重写了prototype，不再默认有constructor属性
	name: 'DIYgod',
	age: 20
};
```

4. 动态原型模式、寄生构造函数模式、稳妥构造函数模式

### 6.3 继承

5. JavaScript中最常用的继承：组合继承。融合了原型链和构造函数的优点。

```js
function SuperType(name) {
	this.name = name;
	this.color = ['red', 'blue', 'green'];
}
SuperType.prototype.sayName = function () {
	console.log(this.name);
}

function SubType(name, age) {
	SuperType.call(this, name);  // 借用构造函数
	this.age = age;
}
SubType.prototype = new SuperType();  // 原型链
SubType.prototype.constructor = SubType;  // construcotr在上一句中被重写
SubType.prototype.sayAge = function () {
	console.log(this.age);
}

var instance = new SubType('DIYgod', 20);
instance.sayName();  // DIYgod
instance.sayAge();  // 20
```

6. 确定原型和实例的关系。接上例：

```js
console.log(instance instanceof SuperType);  // true
console.log(SuperType.prototype.isPrototypeOf(instance));  // true
```

7. 原型式继承、寄生式继承、寄生组合式继承

## 第七章 函数表达式

### 7.1 递归

### 7.2 闭包

1. 闭包是有权访问另一个函数作用域中的变量的函数。

2. （作用域链见4.2）在外部函数内部定义的内部函数将包含外部函数的活动对象添加到它的作用域中；外部函数执行完毕后，其活动对象不会被销毁，因为内部函数的作用域链仍然在引用这个活动对象；外部函数执行完毕后，内部函数仍然可以访问到其定义的所有变量。

```js
function outer () {
	var name = 'DIYgod';
	return function () {
		console.log(name);
	}
}
var inner = outer();
inner();  // DIYgod
inner = null;  // 解除对outer内部的匿名函数的引用，以便释放内存
```

3. 闭包只能取得包含函数中任何变量的最后一个值。

```js
function createFunction () {
	var result = [];
	for (var i = 0; i &lt; 10; i++) {
		result[i] = function () {
			return i;
		}
	}
	return result;
}
console.log(createFunction()[0]());  // 10
console.log(createFunction()[1]());  // 10
// 返回的都是同一个变量i
```

4. 匿名函数的this通常会指向window。

```js
var name = 'The Window';
var object = {
	name: 'My Object',
	getNameFunc: function () {
		return function () {
			return this.name;
		}
	}
}
console.log(object.getNameFunc()());  // The Window
```


### 7.3 模仿块级作用域

5. 用匿名函数来模仿块级作用域：第一个括号的作用是将函数声明转换成函数表达式（函数声明不能通过后面加括号来调用），第二个括号来调用这个函数。

```js
(function () {
	var i = 9;
	console.log(i);  // 9
})();
console.log(i);  // Uncaught ReferenceError: i is not defined
```


### 7.4 静态对象

6. 任何在函数中定义的变量，都可以认为是私有变量。

7. 有权访问私有变量和私有函数的公有方法称为特权方法。

```js
function MyObject() {
	// 私有变量和私有函数
	var privateVariable = 'DIYgod';
	function privateFunction() {
		console.log('lalala');
	}

	// 特权方法
	this.publicMethod = function () {
		console.log(privateVariable);
		privateFunction();
	};
}
var o = new MyObject();
o.publicMethod();  // DIYgod lalala
o.privateFunction();  // Uncaught TypeError: o.privateFunction is not a function

```

...

## 第十三章 事件

### 13.1事件流

1. 事件冒泡：事件开始时由最具体的元素接收，然后逐级向上传播到较为不具体的节点；IE9、FireFox、Chrome 和 Safari 将事件一直冒泡到 window 对象。

2. 事件捕获：由于老版本的浏览器不支持，因此很少有人使用事件捕获。

3. “DOM2级事件”规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。

### 13.2 事件处理程序

4. HTML事件处理程序：扩展作用域，在函数内部可以像访问局部变量一样访问document及该元素本身的成员，栗子：

```js
&lt;input type="button" value="Click Me" onclick="alert(value)"&gt;
```

如果是一个表单输入元素，则作用域中还会包含访问表单元素的入口，栗子：

```js
&lt;form method="post"&gt;
    &lt;input type="text" name="username" value=""&gt;
    &lt;input type="button" value="Echo username" onclick="alert(username.value)"&gt;
&lt;/form&gt;
```

缺点：①存在时差问题，解析函数之前就触发事件会引发错误 ②扩展处理程序的作用域链在不同浏览器中会导致不同结果 ③导致HTML和JavaScript代码紧密耦合。

5. DOM0级事件处理程序

```js
// 绑定事件处理程序
var btn = document.getElementById('myButton');
btn.onclick = function () {
	console.log(this.id);    // myButton
}

// 删除事件处理程序
btn.onclick = null;
```

以这种方式添加的事件处理程序会在事件流的冒泡阶段被处理。

6. DOM2级事件处理程序

addEventListener() 和 removeEventListener()

三个参数：要处理的事件名、作为事件处理程序的函数、在捕获阶段调用函数(true)还是在冒泡阶段调用函数(false，默认)

好处是可以添加多个事件处理程序，使用 addEventListener 添加的事件处理程序只能使用 removeEventListener移除，匿名函数无法移除。

7. IE事件处理程序

attachEvent() 和 detachEvent()

```js
var btn = document.getElementById('myButton');
btn.attachEvent('onclick', function () {
	console.log(this === window);    // myButton
});
```

以这种方式添加的事件处理程序会在事件流的冒泡阶段被处理。

### 13.3 事件对象

8. 在触发DOM上的某个事件时，会产生一个事件对象event，这个对象包含着所有与事件有关的信息。只有在事件处理程序执行期间，event对象才会存在，一旦事件处理程序执行完成，event对象就会被销毁。

9. 属性/方法：

currentTarget：正在处理事件的那个元素

target：事件的目标

type：事件类型

cancelable：可以阻止特定事件的默认行为

preventDefault()：阻止特定事件的默认行为

stopPropagation()：停止事件在DOM层次中的传播，即取消进一步的事件捕获或冒泡

eventPhase：事件出于事件流的阶段 捕获阶段为1 处于目标对象为2 冒泡阶段为3

### 13.4 事件类型

10. UI事件、焦点事件、鼠标事件、滚轮事件、文本事件、键盘事件、合成事件、变动事件。

&nbsp;

...

## 第二十一章 Ajax与Comet

### 21.1 XMLHttpRequest对象

1. 用法

```js
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
	if (xhr.readState === 4) {
		if (xhr.status &gt;= 200 &amp;&amp; xhr.status &lt; 300 || xhr.status === 304) {
			console.log(xhr.responseText);
		}
		else {
			console.log('Request was unsuccessful: ' + xhr.status);
		}
	}
};
xhr.open('get', 'example.php', true);
xhr.send(null);
```

+ 创建XHR对象：new XMLHttpRequest();

+ open()：启动一个请求以备发送；3个参数：请求类型、请求的URL、是否异步发送请求（同步必须等到服务器响应后再继续执行）；不会真正发送请求。

+ send()：发送请求；1个参数：发送的数据；不需要发送数据则必须传入null。

+ XHR对象的属性：

- responseText 返回的文本

- status 响应的HTTP状态。

+ HTTP状态码：

- 2xx 成功

- 3xx 重定向，304 Not Modified 表示请求的资源没有被修改，可以直接用浏览器中缓存的版本，302 Found 表示请求的资源现在临时从不同的URI响应请求

- 4xx 客户端错误，403 Forbidden，404 Not Found

- 5xx 服务器错误，500 Internal Server Error，503 Service Unavailable。

+ XHR的readyState属性：

- 0：未初始化

- 1：启动，已调用open()

- 2：发送，已调用send()

- 3：接收到部分响应数据

- 4：接收到全部响应数据

+ readystatechange事件：readystate属性的值由一个值变成另一个值，都会触发readystatechange事件。

### 21.4 跨域资源共享

1. CORS：使用自定义的HTTP头部让浏览器与服务器进行沟通，从而决定请求或响应是应该成功还是应该失败。IE中要使用XDR对象实现，其他浏览器XHR对象原生支持。

2. 图像Ping：只能发送GET请求；无法访问服务器的响应文本。

```js
var img = new Image();
img.onload = img.onerror = function () {
	console.log('Done!');
};
img.src = 'http://api.hitokoto.us/rand?encode=jsc';
```

3. JSONP：两部分组成 回调函数和数据。

```js
function myCallBack (data) {
	console.log(data.hitokoto);  // 像平常的你一样引发奇迹吧-
}
var script = document.createElement('script');
script.src = 'http://api.hitokoto.us/rand?encode=jsc&amp;fun=myCallBack';  // 返回一个包含在函数调用中的JSON，调用了myCallBack函数：myCallBack({"hitokoto":"...","author":"...",....});
document.body.insertBefore(script, document.body.firstChild);
```

缺点：安全性不可靠；不容易判断请求失败。

&nbsp;

&nbsp;

To Be Continued...