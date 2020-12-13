---
title: 让咕咕机再次伟大
id: 3116
categories:
  - 创作集
date: 2017-08-11 02:11:43
tags:
---


<style>
    .gugu-print {
        display: none;
        margin-top: 20px;
    }
    .gugu-btn {
        cursor: pointer;
        border: 1px solid #eee;
        display: inline-block;
        padding: 5px 10px;
        background: #fff;
        border-radius: 4px;
    }
    .gugu-login-btn-wrap {
        text-align: center;
    }
    .gugu-login-btn {
        cursor: pointer;
    }
    .gugu-user {
        display: none;
        text-align: center;
    }
    .gugu-avatar {
        display: inline-block;
        height: 50px;
        width: 50px;
        background-size: contain;
        border-radius: 50%;
    }
    .gugu-info {
        padding-top: 25px;
        font-weight: bold;
        line-height: 25px;
    }
    .gugu-name {
        font-size: 18px;
    }
    .gugu-textarea {
        width: 100%;
        height: 100px;
        font-size: 14px;
        padding: 10px;
        box-sizing: border-box;
    }
    .gugu-input {
        width: 100%;
        font-size: 14px;
        padding: 10px;
        box-sizing: border-box;
    }
</style>

咕咕机的官方发送平台非常反人类，发送接口没有任何长度和频率限制，又可以匿名发送...所以经常被人刷垃圾信息...群里经常有人反馈但官方就是不改...好在咕咕机是开发接口的

就这样我封装了一个增强版 API，开源在 GitHub： [https://github.com/DIYgod/gugu-node-api](https://github.com/DIYgod/gugu-node-api)

特性：强制微博登录、不允许匿名、长度限制、发送频率限制、跨域限制、黑名单机制

好了，点击下面按钮，登录后继续跟我表白吧！

<div class="gugu-login-btn-wrap"><img class="no-fancybox gugu-login-btn" src="/images/weibo2login.png"></div>
<div class="gugu-user">
    <div class="gugu-info">
        <div class="gugu-avatar"></div>
        <div class="gugu-name"></div>
    </div>
    <div class="gugu-btn gugu-logout-btn">退出登录</div>
</div>
<div class="gugu-print">
    <textarea class="gugu-textarea" placeholder="输入文本内容"></textarea>
    <div class="gugu-btn gugu-send-btn-text">咕咕文字</div>
    <input type="text" class="gugu-input" placeholder="输入图片地址">
    <div class="gugu-btn gugu-send-btn-pic">咕咕图片</div>
</div>
<script>
function gugushow (data) {
    $.ajax({
        url: 'https://api.anotherhome.net/gugu/account',
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            if (data) {
                $('.gugu-avatar').css('background-image', 'url(' + data._json.avatar_large.replace('http', 'https') + ')');
                $('.gugu-name').html('Hi, ' + data.displayName);
                $('.gugu-user').show();
                $('.gugu-print').show();
                $('.gugu-login-btn-wrap').hide();
            }
        }
    });
}
gugushow();
$('.gugu-login-btn').click(function () {
    window.location.href = 'https://api.anotherhome.net/gugu/login';
});
$('.gugu-logout-btn').click(function () {
    window.location.href = 'https://api.anotherhome.net/gugu/logout';
});
$('.gugu-send-btn-text').click(function () {
    if ($('.gugu-textarea').val()) {
    $.ajax({
        url: 'https://api.anotherhome.net/gugu/print',
        type: 'post',
        data: JSON.stringify({
            type: '1',
            content: $('.gugu-textarea').val()
        }),
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            if (data) {
                if (data.code && data.msg) {
                    notie('error', data.msg);
                }
                else if (data.msg) {
                    notie('success', data.msg);
                }
                else {
                    notie('error', '打印失败');
                }
            }
            else {
                notie('error', '打印失败');
            }
        },
        error: function () {
            notie('error', '打印失败');
        }
    });
    }
});
$('.gugu-send-btn-pic').click(function () {
    $.ajax({
        url: 'https://api.anotherhome.net/gugu/print',
        type: 'post',
        data: JSON.stringify({
            type: '2',
            content: $('.gugu-input').val()
        }),
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            if (data) {
                if (data.code && data.msg) {
                    notie('error', data.msg);
                }
                else if (data.msg) {
                    notie('success', data.msg);
                }
                else {
                    notie('error', '打印失败');
                }
            }
            else {
                notie('error', '打印失败');
            }
        },
        error: function () {
            notie('error', '打印失败');
        }
    });
});
</script>