---
title: 基于 Obsidian 的生活记录系统
date: 2022-07-09 18:23:52
tags:
---

正如我在 [2020 年终总结](/2020) 中提到，我一直在用 Notion 写子弹笔记，现在它有了亿点点不一样，现在我们就来重新窥探一下我目前的生活记录系统

**日记**
![](/images/obsidian-1.png)

<!--more-->

**周记**和**月记**
![](/images/obsidian-8.png)

**年记**
![](/images/obsidian-9.png)

原 Notion 子弹笔记
<img src="/images/2020-1.jpg" width="50%" />

受益于 Obsidian 强大的自动化能力和极高的自由度，日/周/月/年笔记通过预设模板自动生成，互相联动，需要手动处理的部分很少

全部文件已上传至 GitHub：<https://github.com/DIYgod/DIYgod-Obsidian-Starter>，包括主题、插件、配置文件、自己定制的样式、模板文件、示例文件等，只是作为一个示例，请根据自己实际情况修改

这些东西乍一看是有一些复杂，但其实用起来很简单，自由度和可扩展性也很强，下面我来详细介绍

## 结构

目录结构如日记图左侧栏所示

```
├── OKR.md
└── Journal
    └── 2022
        ├── W1
        |   └── 2022-01-01.md
        |   └── 2022-W1.md
        ├── 2022-01.md
        └── 2022.md
```

每天会自动在本周的文件夹中生成当天的日记文件 `YYYY-MM-DD.md`，每周会自动新建一个周文件夹 `[W]ww` 和周记 `YYYY-[W]ww.md`，每月会自动生成月记 `YYYY-MM.md`，每年会自动新建一个年文件夹 `YYYY` 和年记 `YYYY.md`（更正：不是自动，仍然需要命令面板手动触发）

这些文件的内容也都是模板预设好的，已经自动填充了日期、本周期 OKR 分数和图表，甚至当天的位置、天气、月相等信息，还留出了记录当天状态和动态的位置

外面有一个 OKR 文件，大概半年更新一次，里面记录这半年的人生目标，其中有一些目标是需要每天持续努力的，日记系统的很大部分就是围绕这些目标来构建的

目录结构主要通过 [Periodic Notes](https://github.com/liamcain/obsidian-periodic-notes) 实现，模板主要通过 [Templater](https://github.com/SilentVoid13/Templater) 和 [Dataview](https://github.com/blacksmithgu/obsidian-dataview) 和核心插件 Templates 实现

## 日记

![](/images/obsidian-1.png)

### Info

Info 是自动生成的当天信息，包括指向年月周记和 OKR 的链接，位置、天气、月相等信息

位置、天气、月相信息来自 Templater 的调用系统命令功能

获取位置和天气

```sh
curl wttr.in/"$(curl -s --header "user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36" https://api.ip.sb/geoip | /opt/homebrew/bin/jq -r ".city" | sed 's/ /%20/')"\?format="%l+%c%t"
```

获取月相

```sh
curl wttr.in/"$(curl -s --header "user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36" https://api.ip.sb/geoip | /opt/homebrew/bin/jq -r ".city" | sed 's/ /%20/')"\?format="%m"
```

### OKR Tracker

OKR Tracke 跟踪记录当天当前阶段的 OKR 完成状况，比如 `Sleep:: 10.3` 代表今天睡了 10.3 小时，`Healthy Eating:: 5` 代表今天吃得很健康，`::` 是 Dataview 语法，会给当前页面增加

```js
page = {
    ...
    "Sleep": 10.3,
    "Healthy Eating": 5,
}
```

这样的属性，方便接下来在周月年记中做分析和处理

其中 O1 KR2 下有一个特殊的列表，通过 API 展示了当天 Toggl Track 数据， Toggl Track 是一个时间记录应用，记录我每天在各项事务中花费的时间，比如看番时间、刷B站时间、工作时间等，这些数据同样可以反映我今天的生产力是否符合预期

### Notes

这里是真正写日记的地方，多数是一些流水账，来弥补我天生糟糕的记忆力，偶尔也会写一些想法

## 周记和月记

![](/images/obsidian-8.png)

### Jornal List

Jornal List 是自动生成的本周/月全部日记的列表，通过 Dataview 实现

获取全部日记

```js
// Week
window.pages = dv.pages(`"${dv.current().file.folder}"`).where(p => p.file.name.match(new RegExp(`${dv.current().file.name.split('-')[0]}-\\d{2}-\\d{2}`))).sort(p => p.file.name);

// Month
window.pages = dv.pages().where(p => p.file.name.match(new RegExp(`${dv.current().file.name}-\\d{2}`))).sort(p => p.file.name);
```

渲染列表

```js
dv.paragraph(window.pages.file.link.join(', '))
```

### Summary

这里是月末做总结和反思的地方，对应日记里的 Notes

### OKR Tracker

在这里处理和分析全部日记里的 OKR 数据，最后生成分数，对应日记里的 OKR Tracker

它通过 Dataview 实现，以睡眠为例，≥ 6.5 小时且 ≤ 8.5 小时计为有效睡眠，有效睡眠天数占总天数的百分比即为得分

```js
let count = 0;
let total = 0;
for (let page of window.pages) {
    if (page['Sleep']) {
        count++;
        if (page['Sleep'] >= 6.5 && page['Sleep'] <= 8.5) {
            total++;
        }
    }
}
const score = (total / count * 100).toFixed(2);
dv.el('div', score + '%', {
    cls: score > 80 ? 'score-class1' : score > 50 ? 'score-class2' : 'score-class3'
});
```

再自己加一点 CSS，> 80 分显示为绿色，50-80 分显示为黄色，< 50 分显示为红色，这样就可以很清楚看出本周/月的睡觉情况，图里是黄色区间，不太好但还可以接受，下个月需要多留意

### Statistics

在这里把睡眠和运动数据生成统计图，可以清楚看出睡眠时长还是挺不稳定的，运动天数和时长都很少

统计图通过 [Obsidian Charts](https://github.com/phibr0/obsidian-charts) 绘制，睡眠统计图代码如下

```js
const times = [];
for (let page of window.pages) {
    times.push(page['Sleep']);
}

const chartData = {
    type: 'line',
    data: {
        labels: window.pages.file.name.array(),
        datasets: [{
            label: 'Sleep Time',
            data: times,
            pointBackgroundColor: '#6c40d6',
            borderColor: '#6c40d65c',
            tension: 0.4,
            spanGaps: true,
        }],
    },
    options: {
        scales: {
            y: {
                type: 'linear',
                min: 2,
                max: 13
            }
        }
    }
}

window.renderChart(chartData, this.container);
```

### Finance

本月的财务数据饼状图，通过 MoneyWiz 生成

## 年记

![](/images/obsidian-9.png)

年记与周记月记相似度也很高，但通过扩大时间尺度，可以得出很多新的有用结论

比如同样的睡眠和运动统计图，在年的尺度里就可以看出我是在 5 月底睡眠开始失控，在这期间运动也中断了，又从 6 月中旬得到缓解

还有新的体重体脂统计图，可以看出我的体重和体脂都在稳步下降，健康状况有明显改善

年记还出现了新的一种热图，记录达到目标的日子，通过 [Heatmap Calendar](https://github.com/Richardsl/heatmap-calendar-obsidian) 绘制，以睡眠为例

```js
const calendarData = { 
    entries: [],
}

const pages = window.pages
    .where(p => p.Sleep && p.Sleep >= 6.5 && p.Sleep <= 8.5)
    .sort(p => p.file.name);

for(let page of pages){ 
    calendarData.entries.push({
        date: page.file.name,
        intensity: page.Sleep,
    })
}

renderHeatmapCalendar(this.container, calendarData);
```

## 局限

子弹笔记有一个很重要的任务清单模块，如上面子弹笔记截图所示，我之前会把一周的任务清单都提前写在笔记里，但现在日记都是当天自动生成，无法提前计划，所以我把任务清单都改用了滴答清单来管理，滴答清单当然也很好用，但是这样就少了与日记的联动，手动添加又会造成很多重复工作，就不是很爽

最后需要注意的是，即使有这样的生活管理系统也不意味着生活就会一切按照预期，就像上面举例的 5 月底睡眠失控事件，一旦放松失控仍会发生，笔记会告诉我生活正在失控，但如何回到正轨和追赶上 OKR 还是要靠自控力和坚持的定期总结、反思和改进
