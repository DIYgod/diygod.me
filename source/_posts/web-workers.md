---
title: Web Workers 初体验
date: 2018-01-30 22:24:15
categories: 创作集
---
[这个视频](https://www.bilibili.com/video/av18682336/)有 15+MB 的 BAS 弹幕脚本需要解析，这会导致页面卡死 7 秒左右的时间，期间 UI 被冻结，体验很糟糕，如果使用 Web Workers 进行优化，把解析放入 Web Workers 执行，就可以避免 UI 线程阻塞造成的页面冻结。

<!--more-->

## 单线程

使用 parse 来模拟解析函数

**index.js**

```js
function parse (time) {
    const start = new Date();
    while(new Date() - start < time) {}
    return 'DIYgod'
}
console.log(parse(1000));
```

此时页面会卡死 1s，然后输出一个 'DIYgod'。

## 使用 Web Workers

**index.js**

```js
const wk = new Worker('worker.js');
wk.postMessage(1000);
wk.addEventListener('message', (e) => {
    console.log(e.data);
});
```

**worker.js**

```js
function parse (time) {
    const start = new Date();
    while(new Date() - start < time) {}
    return 'DIYgod';
}

onmessage = function (e) {
    postMessage(parse(e.data));
}
```

这是 Web Workers 的一个最基础用法，index.js 把 1000 传给 worker.js，worker.js 在后台解析 1000 ms，再把结果 'DIYgod' 传回 index.js，这样解析就不会再占用 js 主线程，避免了页面卡死。

## 内嵌 Worker

上一步我们加载了两个 js 文件，index.js 和 worker.js，在 HTML 里引用 index.js，然后 index.js 会加载 worker.js，那么不想创建单独的 Worker 文件怎么办呢？

**index.js**

```js
const workerBlob = new Blob([`function parse (time) {
    const start = new Date();
    while(new Date() - start < time) {}
    return 'DIYgod';
}

onmessage = function (e) {
    postMessage(parse(e.data));
}`], { type: 'application/javascript' });
const workerURL = URL.createObjectURL(workerBlob);

const wk = new Worker(workerURL);
wk.postMessage(1000);
wk.addEventListener('message', (e) => {
    console.log(e.data);
});
```

URL.createObjectURL(blob) 会创建一个 DOMString，它包含一个表示 blob 的 URL。

打开控制台的 Network 标签页，你会看到浏览器加载了一个形如 `blob:http://example.com/16215a1e-21d4-450c-b441-070e1981b69d` 的奇怪链接的 js 文件，这个 js 文件的内容正是我们传给 workerBlob 的字符串内容。

这个 URL 是唯一的，且它的生命周期和创建它的窗口中的 document 绑定，只要页面存在，该网址就会一直有效。

## 使用 webpack worker-loader

上一步中我们把 js 代码放在了字符串里，它不能拆分模块，也不利于后期维护，如果项目正在使用 webpack，安装 [worker-loader](https://github.com/webpack-contrib/worker-loader) 可以解决这个问题。

**index.js**

```js
import WK from 'worker-loader?inline=true&fallback=false!./worker.js';

const wk = new WK();
wk.postMessage(1000);
wk.addEventListener('message', (e) => {
    console.log(e.data);
});
```

**worker.js**

```js
import Parse from './parse.js';

self.addEventListener('message', (e) => {
    self.postMessage(Parse(e.data));
});
```

**parse.js**

```js
function Parse (time) {
    const start = new Date();
    while(new Date() - start < time) {}
    return 'DIYgod';
}

export default Parse;
```

只需要使用 worker-loader 引用 worker.js 模块，剩下的 worker-loader 会帮我们自动处理，最后编译的结果类似我们上一步的代码。

对比不使用 Web Workers 时：

**index.js**

```js
import Parse from './parse.js';

console.log(Parse(1000));
```

**parse.js（不变）**

```js
function Parse (time) {
    const start = new Date();
    while(new Date() - start < time) {}
    return 'DIYgod';
}
export default Parse;
```

这样不用修改原有的解析模块，非侵入式，只需要加个 worker.js 中转模块，再改下调用方法即可，维护起来也很方便。

## 性能

如果我把一个计算放入 4 个 Worker，那么这个计算会快 4 倍？

不，它不仅不会快 4 倍，而且会变得更慢。

Web Workers 不是为了缩短计算时间，而是为了避免 UI 线程冻结。创建线程、线程调度、传输数据等行为会导致计算变得比单线程稍微更慢一点。

我记录了开头那个视频在不同 Worker 数量下解析 100 条弹幕的时间，7 次记录取平均值：

| Worker 数量 | 0    | 1    | 2    | 3    | 4    | 5    | 6    | 10   |
| --------- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 平均时间(ms)  | 6085 | 8216 | 6310 | 6388 | 6483 | 6317 | 6475 | 7233 |

不使用 Worker 的解析速度最快，1 个 Worker 的速度比其他明显更慢，2 3 4 5 6 个 Worker 速度没有明显差异，但 Worker 数量一直增加速度又会逐渐变慢。

另外又测试了弹幕比较少的视频，结果是 1 2 3 4 5 个 Worker 的速度都差不多。

最后不靠谱地决定使用 2 个 Worker 进行解析。

优化结果妙不可言，不需要等待解析完成才能进行其他操作，也可以一边播放视频一边解析，区别只是播放到没解析好的弹幕不会显示，解析完成才会显示。