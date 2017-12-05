---
title: 可能是目前最好用的两个 Hexo 播放器插件
date: 2017-11-29 15:14:37
tags:
---

我实在也不是谦虚，这~~可能~~是目前最好用的两个 Hexo 播放器插件，感谢插件作者（给大佬们递女装
本文只作为演示，使用方法和 issue 请移步 GitHub
<!--more-->

# [hexo-tag-aplayer](https://github.com/MoePlayer/hexo-tag-aplayer)

```sh
npm install hexo-tag-aplayer --save
```

Hexo 的 [APlayer](https://github.com/MoePlayer/APlayer) 标签插件，由 [@grzhan](https://github.com/grzhan) 维护

{% aplayerlist %}
{
	"narrow": false,
    "autoplay": false,
    "mode": "circulation",
    "showlrc": 3,
    "mutex": true,
    "theme": "#ad7a86",
	"preload": "metadata",
    "music": [
        {
            "title": "あっちゅ～ま青春!",
            "author": "七森中☆ごらく部",
            "url": "https://dplayer.b0.upaiyun.com/yuruyuri.mp3",
            "pic": "https://dplayer.b0.upaiyun.com/yuruyuri.jpg",
            "lrc": "https://dplayer.b0.upaiyun.com/yuruyuri.lrc"
        },
        {
            "title": "secret base~君がくれたもの~",
            "author": "茅野愛衣",
            "url": "https://dplayer.b0.upaiyun.com/secretbase.mp3",
            "pic": "https://dplayer.b0.upaiyun.com/secretbase.jpg",
            "lrc": "https://dplayer.b0.upaiyun.com/secretbase.lrc"
        },
        {
            "title": "回レ！雪月花",
            "author": "小倉唯",
            "url": "https://dplayer.b0.upaiyun.com/snowmoonflowers.mp3",
            "pic": "https://dplayer.b0.upaiyun.com/snowmoonflowers.jpg",
            "lrc": "https://dplayer.b0.upaiyun.com/snowmoonflowers.lrc"
        }
    ]
}
{% endaplayerlist %}

&nbsp;

# [hexo-tag-dplayer](https://github.com/MoePlayer/hexo-tag-dplayer)

```sh
npm install hexo-tag-dplayer --save
```

Hexo 的 [DPlayer](https://github.com/MoePlayer/DPlayer) 标签插件，由 [@Myer921](https://github.com/Myer921) [@dixyes](https://github.com/dixyes) 维护

{% dplayer "url=https://dplayer.b0.upaiyun.com/hikarunara.mp4" "pic=https://dplayer.b0.upaiyun.com/hikarunara.png" "thumbnails=https://dplayer.b0.upaiyun.com/hikarunara_thumbnails.jpg" "id=diygodme1" "api=https://api.prprpr.me/dplayer/" %}