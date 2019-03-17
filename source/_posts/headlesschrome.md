---
title: HeadlessChrome 自动化测试探索
date: 2019-03-18 01:38:38
tags: 创作集
---
埋点一直是B站 HTML5 播放器开发和测试过程中的一个痛点，埋点的种类和接口参数很多，测试很麻烦也很容易出错

虽然测试很麻烦，但它们的规则都很简单，比如点击或 hover 一个按钮、错误上报、播放和性能上报，那么能不能通过自动化的 E2E 测试来代替这些又繁琐又机械化又容易出错的测试工作呢？

在一次埋点线上事故后，我花了一天时间做了一些探索，最后效果还不错，在这里做一下简单的总结

<!--more-->

## 编写测试脚本

模拟用户操作就需要用到无头浏览器，我采用了 Jest + Puppeteer 的组合

Jest 是一个测试框架，Puppeteer 是用来控制 Chrome 或 Chromium

选择 Jest 是因为我对 Jest 最熟悉，然后又找到了一个 preset: [jest-puppeteer](https://github.com/smooth-code/jest-puppeteer)，不是必需的，但它可以简化很多 Puppeteer 操作

安装依赖：

```bash
npm install --save-dev jest jest-puppeteer puppeteer
```

测试脚本很简单：

```js
describe('log', () => {
    beforeAll(async () => {
        page.goto('https://www.bilibili.com/video/av44890855');
    });

    it('play_screen', async (done) => {
        page.on('request', (request) => {
            if (request.url().match(/^https:\/\/data\.bilibili\.com\/log\/web\?play_screen...参数参数/)) {
                done();
            }
        });
        page.click('video');
    });
});
```

让 HeadlessChrome 打开一个播放页，监控页面请求的接口，模拟点击 video 元素，监控到浏览器请求了 play_screen 埋点即测试成功

看起来没什么问题，开开心心地执行了测试，结果 failed

发生了什么？配置 `headless: false` 观看了一下测试过程

![](/images/headlesschrome1.jpg)

发现是因为检测到浏览器不支持 HTML5 播放器，加载了 Flash 播放器

Puppeteer [文档里说道](https://github.com/GoogleChrome/puppeteer#q-what-features-does-puppeteer-not-support)

> Puppeteer is bundled with Chromium--not Chrome...Puppeteer does not support licensed formats such as AAC or H.264

解决方法也很简单，把 Puppeteer 自带的 Chromium 换成本地的 Chrome

```js
launch: {
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
}
```

测试通过

![](/images/headlesschrome2.jpg)

## Chrome as a service

刚才使用了本地的 Chrome，会依赖本地环境，而且想作为自动化测试跑在测试机上也是不行的

所以我又在测试机上跑了一个 docker 容器：[browserless/chrome](https://hub.docker.com/r/browserless/chrome)，它可以把 Chrome 当做一个 service，测试脚本使用 websocket 协议操作 docker 里的 Chrome，这样就避免了依赖本地 Chrome

启动容器：

```bash
docker pull browserless/chrome:release-chrome-stable
docker run -d -p 3000:3000 browserless/chrome:release-chrome-stable
```

使用：

```js
connect: {
    browserWSEndpoint: 'ws://localhost:3000'
}
```

## 劫持 js

这样用的是线上版本，根本没有测试本地代码啊！

哦，忘了说了，还需要把线上 js 劫持为本地版本

```js
await page.setRequestInterception(true);

page.goto('https://www.bilibili.com/video/av44890855');
page.on('request', (request) => {
    if (request.url().match(/player\.js/)) {
        request.respond({
            status: 200,
            contentType: 'application/javascript',
            body: fs.readFileSync('dist/release/player.js').toString()
        });
    } else {
        request.continue();
    }
});
```