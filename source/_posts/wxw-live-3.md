---
title: 微小微直播回放第三弹
id: 2889
categories:
  - 分享境
date: 2016-12-16 02:10:44
tags:
permalink: 2889
---

![](https://dplayer.b0.upaiyun.com/wxwlive/1216/1/poster.png)

老婆真是越来越可爱了，啊啊啊我要死了。

<!--more-->

直播中间断了一次，所以分成两个视频。

<style>
.dplayer-time {
    display: inline-block !important;
}
</style>

<div id="dplayer7" class="dplayer"></div>

&nbsp;

<div id="dplayer8" class="dplayer"></div>

&nbsp;

第一弹：[https://www.anotherhome.net/2805](https://www.anotherhome.net/2805)
第二弹：[https://www.anotherhome.net/2847](https://www.anotherhome.net/2847)

<script src="https://cdn.bootcss.com/hls.js/0.8.7/hls.min.js"></script>
<script>
$(function () {
    function myDPlayer () {
        var dp7 = new DPlayer({
            element: document.getElementById('dplayer7'),
            autoplay: true,
            theme: '#FADFA3',
            loop: true,
            screenshot: true,
            video: {
                url: 'https://dplayer.b0.upaiyun.com/wxwlive/1216/1/index.m3u8',
                pic: 'https://dplayer.b0.upaiyun.com/wxwlive/1216/1/poster.png'
            },
            danmaku: {
                id: '8810755617f77d00',
                api: 'https://api.prprpr.me/dplayer/',
                token: 'tokendemo',
                addition: ['https://dplayer.b0.upaiyun.com/wxwlive/1216/1/danmaku.json']
            }
        });
        var dp8 = new DPlayer({
            element: document.getElementById('dplayer8'),
            autoplay: false,
            theme: '#FADFA3',
            loop: true,
            screenshot: true,
            video: {
                url: 'https://dplayer.b0.upaiyun.com/wxwlive/1216/2/index.m3u8',
                pic: 'https://dplayer.b0.upaiyun.com/wxwlive/1216/1/poster.png'
            },
            danmaku: {
                id: 'f9e80f1d90cd12f5',
                api: 'https://api.prprpr.me/dplayer/',
                token: 'tokendemo',
                addition: ['https://dplayer.b0.upaiyun.com/wxwlive/1216/2/danmaku.json']
            }
        });
        window.dplayers || (window.dplayers = []);
        window.dplayers.push(dp7);
        window.dplayers.push(dp8);
    }

    if (!window.Hls || !window.DPlayer) {
        $.getScript('https://cdn.bootcss.com/hls.js/0.8.7/hls.min.js', function () {
            myDPlayer();
        });
    }
    else {
        myDPlayer();
    }
});
</script>