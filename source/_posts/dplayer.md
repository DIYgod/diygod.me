---
title: DPlayer – 最好看的弹幕播放器送给最好看的宫园薰
id: 2648
categories:
  - 创作集
date: 2016-08-20 00:47:07
tags:
permalink: 2648
---

<link href="https://cdn.bootcss.com/dplayer/1.16.0/DPlayer.min.css" rel="stylesheet">

<div id="dplayer1" class="dplayer"></div>

最好看的HTML5弹幕播放器送给最好看的宫园薰。

DPlayer来源于我的毕业设计，DPlayer发布后，我的学生生涯也随之结束。<!--more-->

&nbsp;

**Q：**当初为什么要做一个这么好看的弹幕播放器？

**A：**毕业设计选到的题目。

&nbsp;

**Q：**5月底就在GitHub发布了，为什么直到现在（8月底）才发博客？

**A：**刚开始觉得DPlayer还不太完善，不适合用在生产环境，就没写博客。

&nbsp;

**Q：**所以是又经过了3个月的完善才在博客正式发布的么？

**A：**不是，主要是因为我买了守望先锋...

&nbsp;

**Q：**我也很好看，为什么不送给我？

**A：**可以，那同时送给爱我的70亿人类吧。

&nbsp;

GitHub：

[https://github.com/DIYgod/DPlayer](https://github.com/DIYgod/DPlayer)

Demo：

[http://dplayer.js.org](http://dplayer.js.org/)

&nbsp;

**Q：**还有什么想说的么？

**A：**差点忘了最重要的事情：我的战网ID **DIYgod#5922**，加我一起屁股开黑呀！

<script>
    var dp1 = new DPlayer({
        element: document.getElementById('dplayer1'),
        autoplay: false,
        theme: '#FADFA3',
        loop: true,
        screenshot: false,
        preload: 'none',
        video: {
            url: 'https://dplayer.b0.upaiyun.com/若能绽放光芒.mp4',
            pic: 'https://dplayer.b0.upaiyun.com/若能绽放光芒.png'
        },
        danmaku: {
            id: '9E2E3368B56CDBB4',
            api: 'https://dplayer.prprpr.me/',
            token: 'tokendemo',
            maximum: 3000
        }
    });
    window.dplayers || (window.dplayers = []);
    window.dplayers.push(dp);
</script>