---
title: 微小微直播回放第二弹
id: 2847
categories:
  - 分享境
date: 2016-11-03 01:36:18
tags:
permalink: 2847
---

![](https://dplayer.b0.upaiyun.com/wxwlive/1102/poster.png)

本次弹幕总计 11156 条、弹幕文件 1.2 MB。

<!--more-->

<link href="https://cdn.bootcss.com/dplayer/1.16.0/DPlayer.min.css" rel="stylesheet">
<style>
.dplayer-time {
    display: inline-block !important;
}
</style>

<div class="dplayer" id="dplayer5"></div>

&nbsp;

第一弹：[https://www.anotherhome.net/2805](https://www.anotherhome.net/2805)

<script>
    function myDPlayer() {
        var dp5 = new DPlayer({
            element: document.getElementById('dplayer5'),
            autoplay: true,
            theme: '#FADFA3',
            loop: true,
            screenshot: true,
            video: {
                url: 'https://dplayer.b0.upaiyun.com/wxwlive/1102/index.m3u8',
                pic: 'https://dplayer.b0.upaiyun.com/wxwlive/1102/poster.png'
            },
            danmaku: {
                id: 'f171a0b104c1fd55',
                api: 'https://api.prprpr.me/dplayer/',
                token: 'tokendemo',
                maximum: 3000,
                addition: ['https://dplayer.b0.upaiyun.com/wxwlive/1102/danmaku.json']
            }
        });
        window.dplayerInstances = [dp5];
    }
    if (!window.Hls || !window.DPlayer) {
        $.getScript('https://cdn.bootcss.com/hls.js/0.8.7/hls.min.js', function () {
            $.getScript('https://cdn.bootcss.com/dplayer/1.16.0/DPlayer.min.js', function () {
                myDPlayer();
            });
        });
    }
    else {
        myDPlayer();
    }
</script>