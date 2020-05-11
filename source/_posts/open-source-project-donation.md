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
                music: list[0]
            });
            window.aplayers || (window.aplayers = []);
            window.aplayers.push(ap);
        }
    })
})
</script>
{% endraw %}

相信没人做开源项目是为了赚钱，因为它还不如去天桥贴膜赚得快。

但即使没有这种想法，维护一个开源项目也会遇到一些很头疼的现实问题，比如服务器和 CDN 的开销。以 DPlayer 为例，弹幕接口服务器每年需要花费 2000 多块，文档里的视频 CDN 费用每年也需要花费 1500 多块，并且随着用户增多这些花费只增不减。

虽然一直在 README 的显著位置挂着赞助方式，但也没抱太大希望，毕竟 DPlayer 用户几乎都是国人，能遇到一个可以描述清楚自己问题的用户就已经很不容易了，结果也不出我所料，一年里零星收到的赞助只不过是杯水车薪。说实话，让我自己承担这些花费我是不乐意的，再加上用户大多是盗版站和小黄站，这曾一度让我产生了弃坑的想法。<!--more-->

后面的事情很多朋友都知道了，[又拍云](https://www.upyun.com/)和[梨享计算](https://pear.hk/)先后赞助了 DPlayer，又拍云赞助了 DPlayer 的全部 CDN 费用，梨享计算则每月提供一笔数量可观的金钱赞助。

一般来说，如果一个团体或企业将开源项目用在商业产品中，那么赞助开源项目有直接的商业上的益处：可以让产品所依赖的框架保持健康并得到积极的维护。不同的是又拍云并没有用到 DPlayer，短期内也不会有任何直接的商业回报，可能更多的是一种情怀，又拍云作为一家商业公司，其不求回报的慷慨赞助是我尤其感动的。

这篇文章当然不是为了号召大家进行赞助或去天桥贴膜，目前两家公司的赞助已经足够人力以外的日常开销，除了赞助，贡献代码、提一个描述清楚的 bug 或意见、一句鼓励、或者仅仅是使用我的开源项目都同样可以让我很开心，这些都是让我继续花时间做开源的动力。

以下硬广：

> [梨享计算](https://pear.hk/)是一家雾计算技术研发商，专注于为用户提供 IaaS 架构、PaaS 平台、SaaS 软件服务。Pear Fog 不仅是跨越网络中心到边缘的资源池，也是新型的 P2P 系统。其中 Fog CDN 在以透明且 Web 友好的方式帮视频厂商降低内容分发成本、提高质量。

> [又拍云](https://www.upyun.com/)是国内知名企业级云服务商，致力于为客户提供一站式的在线业务加速服务，为客户提供对象存储、HTTPS／SSL 证书、多媒体处理（WebP 自适应、H.265 自适应等）、影像识别、文字识别、短视频 SDK、直播 SDK、连麦 SDK 等服务。又拍云拥有 6 个数据处理中心、300 多个国内CDN节点、15 个海外CDN节点、5000 台服务器、5TB 保有带宽，日均请求超过 1000 亿次。