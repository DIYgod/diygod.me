---
title: 微小微直播回放的 DPlayer 实现
id: 2805
categories:
  - 分享境
date: 2016-10-20 20:15:18
tags:
permalink: 2805/
---

以下为10月19日[微小微](http://weibo.com/u/2025479687)在[一直播](http://m.yizhibo.com/l/n6VHhuJoCbMf41Nx.html)的直播回放（迷妹脸，弹幕也成功扒下来转成 [DPlayer](https://github.com/DIYgod/DPlayer) 可以识别的格式啦。

视频有时出现卡顿是直播的原因；弹幕总计 15768 条、弹幕文件 1.7 MB，第一条弹幕在 13 秒出现。

一直播弹幕池与 DPlayer 弹幕池互不影响，也可以在下面发弹幕哟。

<!--more-->

<style>
.dplayer-time {
    display: inline-block !important;
}
</style>

<div class="dplayer" id="dplayer4"></div>

&nbsp;

## 视频及弹幕搬运

直播第二天发现一直播有昨天的回放，开心到晕掉，醒过来之后开始想办法下载视频和弹幕。

### 视频

网上找不到下载一直播视频的工具，只好自己动手，浏览器开发者工具看到页面加载了一个 m3u8 文件，然后就是下载 m3u8 文件里的 354 个视频片段就好了。

写了个 shell 脚本批量下载：

```sh
#!/bin/bash
for k in $( seq 1 354 )
do
   wget http://xxx/${k}.ts
done
```

DPlayer 早就做了对 m3u8 格式的支持，不用对视频片段做任何后续处理。

视频下载完成。

### 弹幕

同样用开发者工具抓包，找到弹幕文件请求的规律。

第一个弹幕片段是 http://xxx?ts=1 ，其他的弹幕片段也只有ts参数不同。然后ts参数的规律是这样的：下一个片段的参数是上一个片段返回值里的最后一个ts值。

知道规律后就写了个 js 脚本来下载弹幕和把弹幕转换成 DPlayer 的格式。

```js
function ajaxDan(ts) {
    $.ajax({
        url: `http://xxx?ts=${ts}`,
        success: function (data) {
            var tli = parseInt(data.data.list[data.data.list.length - 1].ts)+1;
            console.log(tli);
            data.data.list.map(function (i) {
                dan[index] = {
                    author: "yizhibon" + i.nickname,
                    time: parseInt(i.ts) / 1000,
                    text: i.content,
                    color: '#fff',
                    type: 'right'
                }
                index++;
            });
            ajaxDan(tli)}
    })
}
var dan = [];
var index = 0;
ajaxDan(1);
```

运行结果：536 个视频片段，15768 条弹幕

![](/images/wxwlive1.jpg)

然后把弹幕对象字符串化，复制到 json 文件里。

完成。

<script src="https://cdn.bootcss.com/hls.js/0.8.7/hls.min.js"></script>
<script>
$(function () {
    function myDPlayer() {
        var dp4 = new DPlayer({
            element: document.getElementById('dplayer4'),
            autoplay: true,
            theme: '#FADFA3',
            loop: true,
            screenshot: true,
            video: {
                url: 'https://cdn1.diygod.me/wxwlive/1019/index.m3u8',
                pic: 'https://cdn1.diygod.me/wxwlive/1019/poster.png'
            },
            danmaku: {
                id: '02d53ea190dc8583',
                api: 'https://api.diygod.me/dplayer/',
                token: 'tokendemo',
                maximum: 3000,
                addition: ['https://cdn1.diygod.me/wxwlive/1019/danmaku.json']
            }
        });
        window.dplayers || (window.dplayers = []);
        window.dplayers.push(dp4);
    }
    if (!window.Hls) {
        $.getScript('https://cdn.bootcss.com/hls.js/0.8.7/hls.min.js', function () {
            myDPlayer();
        });
    }
    else {
        myDPlayer();
    }
});
</script>