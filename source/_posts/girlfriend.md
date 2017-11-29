---
title: 我们走过的
id: 3207
categories:
  - 闲言语
date: 2017-08-28 02:23:24
tags:
permalink: 3207
---


<style>
    #love-map {
        width: 100%;
    }

    #love-time {
        text-align: center;
        margin-bottom: 20px;
        font-size: 14px;
        color: #EF9A9A;
        display: none;
    }
</style>

<div id="love-time">这是我们共同度过的第<span></span></div>
<div id="love-map"></div>

上面是一些我们一起去过的地方，其中有一个地点标的是 1996 年，这并不是我写错了，那年我 1 岁，我们是邻居，遗憾的是我们对那几年都没有任何记忆了<!--more-->

&nbsp;

之后一晃 13 年，刚上高中，我家搬到了高中旁边的一个小区，一天晚上我妈兴奋地跟我说：你猜我晚上散步遇到了谁？

我肯定是猜不出来的，因为我什么都不记得

再后来发现她跟我一个班，就这样故事继续了

那时候每天放学一起回家，关系很亲密，家长老师都很紧张，以为我们在早恋，但我一直在沉迷学习，实际上什么都没发生，放学路上聊的最多的也是功课，现在想起来甚至有些遗憾

&nbsp;

但有趣的灵魂终会相遇，5 年以后，这个人又被我诱骗成了女票，我们的故事还会继续下去

&nbsp;

回想一下，这些情节居然跟你的名字有一些神似

（是不会放照片的，长相和性格可以脑补扎着单马尾的岁纳京子

<script>
    $('#love-time').show();
    function love_time() {
        window.setTimeout(function () {
            love_time();
        }, 1000);
        var BirthDay = new Date("5/11/2017 00:00:00");
        var today = new Date();
        var timeold = (today.getTime() - BirthDay.getTime());
        var msPerDay = 24 * 60 * 60 * 1000;
        var e_daysold = timeold / msPerDay;
        var daysold = Math.floor(e_daysold);
        var e_hrsold = (e_daysold - daysold) * 24;
        var hrsold = Math.floor(e_hrsold);
        var e_minsold = (e_hrsold - hrsold) * 60;
        var minsold = Math.floor((e_hrsold - hrsold) * 60);
        var seconds = Math.floor((e_minsold - minsold) * 60);
        $('#love-time span').html(daysold + "天" + hrsold + "小时" + minsold + "分" + seconds + "秒");
    }
    love_time();
    function myEcharts() {
        $('#love-map').height($('#love-map').width() * 0.8)
        var myChart = echarts.init(document.getElementById("love-map"));
        var app = {};
        option = null;
        var data = [
                {name: '临沂', value: '1996'},
                {name: '武汉', value: '2015.12'},
                {name: '杭州', value: '2017.01'},
                {name: '上海', value: '2017.02'},
                {name: '昆明', value: '2017.05'},
                {name: '大理', value: '2017.05'},
                {name: '济南', value: '2017.05'}
        ];
        var geoCoordMap = {
            '临沂':[118.35,35.05],
            '武汉':[114.31,30.52],
            '杭州':[120.19,30.26],
            '上海':[121.48,31.22],
            '昆明':[102.73,25.04],
            '大理':[100.225668,25.589449],
            '济南':[117,36.65]
        };
        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            return res;
        };
        option = {
            backgroundColor: '#A7B1CA',
            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: false,
                itemStyle: {
                    normal: {
                        areaColor: '#fff',
                        borderColor: '#C9CED9'
                    },
                    emphasis: {
                        areaColor: '#DFE0E3'
                    }
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return params.name + ' - ' + params.value[2];
                }
            },
            series : [
                {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(data),
                    symbolSize: 8,
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            fontSize: 14,
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#FD8888',
                            // shadowBlur: 10,
                            // shadowColor: '#333'
                        }
                    }
                }
            ]
        };
        myChart.setOption(option, true);
    }
    if (!window.echarts) {
        $.getScript('https://cdn.bootcss.com/echarts/3.8.5/echarts.min.js', function () {
            $.getScript('https://cdn.jsdelivr.net/npm/echarts@3.8.5/map/js/china.js', function () {
                myEcharts();
            });
        });
    }
    else {
        myEcharts();
    }
</script>