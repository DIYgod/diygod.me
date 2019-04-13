---
title: 我喜欢的音乐
date: 2017-12-06 00:01:30
categories: 分享境
---

{% raw %}
<div class="aplayer" id="aplayer1"></div>
<script>
$(function () {
    $.ajax({
        url: 'https://api.i-meto.com/meting/api?server=netease&type=playlist&id=35798529',
        success: function (list) {
            var ap = new APlayer({
                element: document.getElementById('aplayer1'),
                showlrc: 3,
                theme: '#ad7a86',
                listmaxheight: '280px',
                mode: 'random',
                music: JSON.parse(list)
            });
            window.aplayers || (window.aplayers = []);
            window.aplayers.push(ap);
        }
    })
})
</script>
{% endraw %}

听了几年网易云音乐积累的音乐，女声、日语为主（也可能会有一些奇奇怪怪的歌曲
同步自：[DIYgod喜欢的音乐 - 网易云音乐](http://music.163.com/#/playlist?id=35798529)
自豪地使用 [Meting](https://github.com/metowolf/Meting) 和 [APlayer](https://github.com/MoePlayer/APlayer) 构建