---
title: 关于开源项目赞助这件事
date: 2018-03-05 23:21:21
categories: 闲言语
---
{% raw %}
<div class="aplayer" id="aplayer-open-source"></div>
<script>
$(function () {
    $.ajax({
        url: 'https://api.i-meto.com/meting/api?server=netease&type=song&id=536622447',
        success: function (list) {
            var ap = new APlayer({
                element: document.getElementById('aplayer-open-source'),
                showlrc: 3,
                theme: '#ad7a86',
                mode: 'random',
                music: JSON.parse(list)[0]
            });
            window.aplayers || (window.aplayers = []);
            window.aplayers.push(ap);
        }
    })
})
</script>
{% endraw %}
&nbsp;
相信没人做开源项目是为了赚钱，因为它还不如去天桥贴膜赚得快。

但即使没有这种想法，维护一个开源项目也会遇到一些很头疼的现实问题，比如服务器和 CDN 的开销。以 DPlayer 为例，弹幕接口服务器每年需要花费 2000 多块，文档里的视频 CDN 费用每年也需要花费 1500 多块，并且随着用户增多这些花费只增不减。

虽然一直在 README 的显著位置挂着赞助方式，但也没抱太大希望，毕竟 DPlayer 用户几乎都是国人，能遇到一个可以描述清楚自己问题的用户就已经很不容易了，结果也不出我所料，一年里零星收到的赞助加起来没有超过 50 块，这只不过是杯水车薪。说实话，让我自己承担这些花费我是不乐意的，这曾一度让我产生了弃坑的想法。

后面的事情很多朋友都知道了，[又拍云](https://www.upyun.com/)和[梨享计算](https://pear.hk/)先后赞助了 DPlayer，又拍云赞助了 DPlayer 的全部 CDN 费用，梨享计算则每月提供一笔数量可观的金钱赞助。

一般来说，如果一个团体或企业将开源项目用在商业产品中，那么赞助开源项目有直接的商业上的益处：可以让产品所依赖的框架保持健康并得到积极的维护。不同的是又拍云并没有用到 DPlayer，短期内也不会有任何直接的商业回报，可能更多的是一种情怀，又拍云作为一家商业公司，其不求回报的慷慨赞助是我尤其感动的。

这篇文章当然不是为了号召大家进行赞助，除了赞助，贡献代码、提一个描述清楚的 bug 或建议、使用我的开源项目、甚至一句鼓励都同样可以让我很开心，这些都是让我继续花时间做开源的动力。