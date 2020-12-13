---
title: 女朋友的微博情绪监控
id: 2920
categories:
  - 创作集
date: 2017-02-09 01:05:40
tags:
permalink: /2920
---

![](/images/weibo-negative.png)

就是这样，代码写好了，就差个女朋友了。

最后的效果就是检测某一微博博主新发的微博，如果判断为消极情绪就发出警告（手机通知、邮件通知、自动发一条上图那样的微博之类的）。

## 项目地址

[https://github.com/DIYgod/Weibo2RSS](https://github.com/DIYgod/Weibo2RSS) 以 RSS 形式输出消极情绪的微博

[https://github.com/DIYgod/Text2Emotion](https://github.com/DIYgod/Text2Emotion) 分析一句话的情绪值<!--more-->

## 使用方法

消极情绪微博 RSS 配合 IFTTT 使用，具体设置如下图，条件是 RSS 出现新内容，行为是发一条微博通知（也可以改成手机通知或者邮件通知等）。

![](/images/negtivewbifttt.png)

&nbsp;

## 开发过程

下面是我的开发过程。

### 一、分词

这东西自己做不来，所以只好找现成的解决方案，找到了下面几个：

[结巴中文分词](https://github.com/fxsjy/jieba)

[哈工大语言技术平台云](http://www.ltp-cloud.com/)

[新浪云中文分词](http://www.sinacloud.com/doc/sae/python/segment.html)

[讯飞语言云](https://www.xfyun.cn/services/ltp)

[腾讯文智](https://www.qcloud.com/document/product/271)

除了腾讯文智其他都是免费或者开源的，简单比较之后选择了锤子 Big Bang 也在用的讯飞。

### 二、情绪分析

这个关键在于词典，也是找现成的：

[中文情感极性词典 NTUSD](http://www.datatang.com/data/44317)

[大连理工情感词汇本体库](http://大连理工情感词汇本体库)

大连理工的本体库标注了超过两万词语，包括这些词语词性种类、情感类别、情感强度及极性等信息，像下面这样：

![](/images/dllgemotion.png)

看起来很不错，就选择了这个。

词典下载下来是一个 excel 表格，把它先另存为成 csv 格式，然后就可以导入到 mongodb 数据库里了。

```sh
mongoimport -d emotion -c emo --type csv --headerline --file emotion.csv
```

### 三、情绪值计算

把要分析的话进行分词处理，再把每个词语的情绪值进行累加，就可以得出一条微博的情绪值。

这里其实还有很多算法工作可以做，但简单起见，我只是进行了累加。

然后写完发现效果很差，原因是词典内容太少，很多词语都没有，所以很多句子根本判断不出来。

&nbsp;

最后废弃了上面的所有东西，直接使用腾讯文智的收费服务。。。

### 四、应用到微博

抓取微博内容的原理很简单，新浪微博的[微博秀](http://service.weibo.com/widget/widget_blog.php?uid=3306934123)是不需要登录就可以访问的，直接使用 Node.js 解析页面就可以拿到微博内容。

然后对微博内容进行情绪值计算，把消极情绪的微博输出成 RSS。

### 五、监控

输出成 RSS，监控也容易了，其中 [IFTTT](https://ifttt.com) 效果最佳，检测到 RSS 有新内容时，可以触发手机通知、邮件通知、发一条微博等行为。

&nbsp;

以上，其实最大的问题还是：我差个女朋友。