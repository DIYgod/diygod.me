---
title: DARLING in the FRANXX 博客样式
date: 2018-02-05 00:08:53
categories: 分享境
---
{% raw %}
<div class="aplayer" id="aplayer-darling"></div>
<script>
$(function () {
    $.ajax({
        url: 'https://api.i-meto.com/meting/api?server=netease&type=song&id=531051597',
        success: function (list) {
            var ap = new APlayer({
                element: document.getElementById('aplayer-darling'),
                showlrc: 3,
                theme: '#ad7a86',
                mode: 'random',
                music: list[0]
            });
            window.aplayers || (window.aplayers = []);
            window.aplayers.push(ap);
        }
    })
})
</script>
{% endraw %}
&nbsp;
**点击<a href="javascript:;" id="darling-trigger">这里</a>切换样式**
{% raw %}
<script>
$('#darling-trigger').click(function () {
    var $body = $('body');
    if ($body.hasClass('theme-darling')) {
        $body.removeClass('theme-darling');
    }
    else {
        $body.addClass('theme-darling');
    }
});
</script>
{% endraw %}

救命啊，我被撩到了！
没错，我就是她的 Darling！
天哪，世界上怎么会有那么可爱的女孩子！
我现在只想看 DITF 第五集别的什么都不想干.jpg
![](https://diygod.me/images/header-darling.jpg)