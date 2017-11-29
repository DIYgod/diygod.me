---
title: WordPress 反垃圾评论大作战
id: 2770
categories:
  - 分享境
date: 2016-10-10 01:21:05
tags:
permalink: 2770
---

WordPress 垃圾评论一直是超级多超级烦人的，如果没有有效的拦截方案，网站就会瞬间被每天几百条的垃圾评论淹没。

因为是每个 WordPress 站点都无法避免的问题，大家各显神通，做出的解决方案也挺多的，这里总结一下每种方法的特点和利弊：<!--more-->

### 识别垃圾评论

以 Akismet 插件为代表，根据评论内容或评论者的信息判断评论是否为垃圾评论，再决定是否拦截。开启后能拦截掉几乎所有垃圾评论，但这种方法最大的缺陷是**误判**，本站之前一直在用 Akismet 插件，误判的概率还是挺大的，即使经常去垃圾箱查看，偶尔一条的正常评论和一大堆垃圾评论一起混在垃圾箱也很容易被遗漏；其次会拖慢提交评论的速度，因为每条评论都要先被发到 Akismet 的国外服务器做识别。

&nbsp;

### 禁止非中文评论

90%以上的垃圾评论都来自国外，所以这种方法可以拦截掉90%以上的垃圾评论，但缺点是无法发送纯表情和类似“2333”、“Thanks”这种正常评论了，而且中文的垃圾评论也无法拦截掉。

&nbsp;

### 修改评论 post 地址

这种方法虽然看起来有点自欺欺人，但效果出奇地好，因为绝大部分的垃圾评论都是智障一样只知道通过 post 网站根目录的 wp-comments-post.php 来提交垃圾评论的。稍微麻烦一点的是 WordPress 每次升级都要重新修改。

&nbsp;

### 人工验证插件

比如拖动解锁、拼图、验证码，效果是不错，但牺牲了用户体验，对小站来说没必要。

&nbsp;

### 设置 token

本站现在换用了这种方法，原理是每次刷新页面，后端都会返回一个不同的 token 放到页面上任意位置，然后在合适的时机用 JavaScript 将 token 填充到一个隐藏的 input 里面，提交评论时将隐藏 input 的值（正常情况是 token）一起提交，后端通过判断该值是否合法来判断评论是不是通过正常途径提交的。虽然这种方法也是可以破解的，但破解难度明显高了很多，更重要的是 token 算法和隐藏 input 的结构容易更改，每次简单的小修改都可以让破解失效。

使用也很简单，将如下代码放到主题的 function.php 即可，代码如下：

```php
$leonax_magic_lower = 328;  // token 最小值，自己随意修改
$leonax_magic_upper = 3450709;  // token 最大值，自己随意修改
function leonax_anti_spam_form($fields){
    global $leonax_magic_lower, $leonax_magic_upper;
    $leonax_magic = mt_rand($leonax_magic_lower, $leonax_magic_upper);  // 放在页面的token值，是一个随机数，每次都不同
    $fields['leonax_magic'] = &lt;&lt;&lt;EOT
        &lt;input type="hidden" id="leonax-magic" name="leonax-magic" value="0"&gt;  // 隐藏的 input
        &lt;script&gt;
            $(function() {
                $("#comment-content").on("keyup", function() {  // js 检测到触发 keyup、click 或 touch 事件时填充 token
                    $("#leonax-magic").val("$leonax_magic");
                });
                $('body').on('click touch', function () {
                    $("#leonax-magic").val("$leonax_magic");
                });
            })
        &lt;/script&gt;
EOT;
    return $fields;
}
add_filter('comment_form_default_fields', 'leonax_anti_spam_form');

function leonax_anit_spam_caught() {
    wp_die('&lt;strong&gt;评论失败&lt;/strong&gt;: 垃圾评论什么的去死吧！');
}

function leonax_anti_spam_check( $commentdata ) {
    $comment_type = '';
    if ( isset($commentdata['comment_type']) ) {
        $comment_type = trim($commentdata['comment_type']);
    }

    if ( ($comment_type == 'pingback') || ($comment_type == 'trackback') ) {
        return $commentdata;
    }
    $content = '';
    if ( isset($commentdata['comment_content']) ) {
        $content = trim($commentdata['comment_content']);
    }
    if (!strlen($content)) {
        leonax_anit_spam_caught();
    }

    global $leonax_magic_lower, $leonax_magic_upper;

    if ( isset($commentdata['user_ID']) &amp;&amp; $commentdata['user_ID'] ) { // 登陆用户不做判断
        return $commentdata;
    }

    if ( !isset($_POST['leonax-magic']) ) {
        leonax_anit_spam_caught();
    }
    $magic = intval($_POST['leonax-magic']);
    if ($magic &lt; $leonax_magic_lower || $magic &gt; $leonax_magic_upper) {  // token 值在上面设置的最大值和最小值之间才合法
        leonax_anit_spam_caught();
    }
    return $commentdata;
}

add_filter( 'preprocess_comment' , 'leonax_anti_spam_check' );
```

以上代码来自 [LEONA+](https://leonax.net/p/6732/block-spam-comments-from-web-page/) 和 [JustYY.com](https://justyy.com/archives/1558)。

&nbsp;

目前只找到这几种方法，欢迎补充。