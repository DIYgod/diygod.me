---
title: Polymer 初体验
date: 2018-05-30 23:45:43
categories: 分享境
---

作为开发者，我们都知道组件化、标准化和代码复用的重要性，前端也从未停止过对前端组件化的尝试，产生了各式各样的组件化技术，从 Vue React 等前端框架，到 webpack 这样的全站打包工具

但前端一直缺乏这样一个模块化标准和浏览器级别的原生组件化方案

Web Components 是 WHATWG 和 W3C 正在尝试的 Web 组件化方案，为组件化的前端开发提供浏览器级别的支持。它由四项主要技术组成：Shadow DOM、Custom Elements、HTML Import、HTML Template

Polymer 项目是 Google 的基于 Web Components 机制的框架，定位于简单的 Polyfill 和易用性封装，包括数据绑定，模板声明，事件系统等。Google 在去年就已经将其应用到了 YouTube 上

Polymer 3.0 在 20 天前刚刚发布，正好 B 站播放器近期需要重构所有 UI 组件，所以做了这样的一个调研，下文所有 demo 托管在 [polymer-demos](https://github.com/DIYgod/polymer-demos)，这些小 demo 只作为一些简单体验，想了解 Polymer 的完整功能建议阅读[官方文档](https://www.polymer-project.org/3.0/docs/devguide/feature-overview)

<!--more-->

## 浏览器支持

目前使用 Web Components 的最大阻碍就是浏览器支持程度低，且 Polyfills 体积相对偏大（90+kb）

目前只有新版 Chrome Opera 和 Safari 可以提供完整的原生支持，具体支持情况可以参考 [caniuse.com](https://caniuse.com/#search=web%20components)，使用 [Polyfills](https://github.com/webcomponents/webcomponentsjs) 后可以支持到 Edge IE11+	Firefox Safari9+

Polyfills 有三个主要的文件：

- `webcomponents-bundle.js`: 包含了所有 polyfills
- `webcomponents-loader.js`: 可以检测浏览器支持情况，然后去加载对应的 polyfills，对有原生支持的浏览器可以减少不必要的浪费
- `custom-elements-es5-adapter.js`: 注册 Custom Elements 时需要使用 ES6 语法，所以当浏览器不支持 ES6 时需要做额外的处理，再引用这个文件就好了

总的来说兼容最多浏览器的最佳实践是这样的：

```html
<scirpt src="webcompoments-loader.js"></scirpt>
<scirpt src="custom-elements-es5-adapter.js"></scirpt>
<script src="index.js"></script>
```

其中 `webcompoments-loader.js` 必须单独引用，`custom-elements-es5-adapter.js` 可以跟 `polymer` 和你的代码用 Webpack 合到一起，但注意 `custom-elements-es5-adapter.js` 不要做额外的编译，其他代码用 babel 编译成 ES5，完整实践可以参考 [polymer-demos](https://github.com/DIYgod/polymer-demos)

## Custom elements

下面尝试定义一个最简单的自定义元素，从 `PolymerElement` 继承一个类，然后传给 `window.customElements.define`

**效果**

{% raw %}
<demo-custom-elements></demo-custom-elements>
{% endraw %}

**HTML 代码**

```html
<demo-custom-elements></demo-custom-elements>
```

**JS 代码**

```js
import { PolymerElement } from '@polymer/polymer';

class DemoCustomElements extends PolymerElement {
    constructor() {
        super();
        this.textContent = `I'm a custom element.`;
    }
}

window.customElements.define('demo-custom-elements', DemoCustomElements);
```

## Shadow dom

Shadow dom 是一个隐藏、独立的 DOM，它的 HTML CSS 和行为与常规的 DOM 树分离，这样不同的功能不会混在一起，内外的 CSS 也互不影响

Shadow dom 不是一个新事物，一直以来，浏览器用它来封装一个元素的内部结构。以 `<video>` 元素为例。你所能看到的只是一个 `<video>` 标签，实际上，在它的 Shadow dom 中包含一系列的按钮和控制器

下面例子中，Shadow dom 里的 p 标签定义了 CSS 属性 `color`，它不会泄露到外部

**效果**

{% raw %}
<style>
    html {
        --my-background: #eee;
    }
</style>
<demo-shadow-dom></demo-shadow-dom>
<p>I am outside of demo-shadow-dom. Because of encapsulation, demo-shadow-dom's styles won't leak to me.</p>
{% endraw %}

**HTML 代码**

```html
<style>
    html {
        --my-background: #eee;
    }
</style>
<demo-shadow-dom></demo-shadow-dom>
<p>I am outside of demo-shadow-dom. Because of encapsulation, demo-shadow-dom's styles won't leak to me.</p>
```

**JS 代码**

```js
import { PolymerElement, html } from '@polymer/polymer';

export class DemoShadowDom extends PolymerElement {
    static get template () {
        return html`
            <style>
                p {
                    color: #F5712C;
                    background-color: var(--my-background);
                }
            </style>
            <p>I'm a DOM element.</p>
            <p>This is my shadow DOM!</p>
        `;
      }
}

window.customElements.define('demo-shadow-dom', DemoShadowDom);
```

## HTML templates

使用 `<template>` 和 `<slot>` 组成 shadow DOM

**效果**

{% raw %}
<demo-html-template>
    <p>I'm a custom slot.</p>
</demo-html-template>
{% endraw %}

**HTML 代码**

```html
<demo-html-template>
    <p>I'm a custom slot.</p>
</demo-html-template>
```

**JS 代码**

```js
import { PolymerElement, html } from '@polymer/polymer';
import '@polymer/polymer/lib/elements/dom-repeat.js'
import { DemoShadowDom } from './demo-shadow-dom';

class DemoHTMLTemplate extends DemoShadowDom {
    constructor() {
        super();

        this.employees = [
            {
                name: 'Blog',
                link: 'https://diygod.me'
            },
            {
                name: 'GitHub',
                link: 'https://github.com/DIYgod'
            },
        ];
    }
    static get template () {
        return html`
            <strong>Template:</strong>
            <template is="dom-repeat" items="{{employees}}">
                <p><a href="{{item.link}}">{{item.name}}</a></p>
            </template>
            <strong>Slot:</strong>
            <slot></slot>
            <strong>Super template:</strong>
            ${super.template}
        `;
      }
}

window.customElements.define('demo-html-template', DemoHTMLTemplate);
```

## 数据绑定

支持双向的数据绑定，你可以尝试编辑下面的输入框，或者直接在控制台修改属性 `document.querySelector('demo-data').owner1 = 'DIYgay'`，属性改变会即时反映到 DOM 里

**效果**

{% raw %}
<demo-data owner1="DIYgod1"></demo-data>
{% endraw %}

**HTML 代码**

```html
<demo-data owner1="DIYgod1"></demo-data>
```

**JS 代码**

```js
import { PolymerElement, html } from '@polymer/polymer';
import '@polymer/iron-input';

class DemoData extends PolymerElement {
    constructor() {
        super();
        this.owner3 = 'DIYgod3';
    }

    static get properties () {
        return {
            owner1: {
                type: String,
                value: 'DIYgod',
            },
            owner2: {
                type: String,
                value: 'DIYgod2',
            }
        };
    }
    
    static get template () {
        return html`
            <p>This is <b>[[owner1]]</b>'s element.</p>
            <p>This is <b>[[owner2]]</b>'s element.</p>
            <p>This is <b>{{owner3}}</b>'s element.</p>
            <iron-input bind-value="{{owner1}}">
                <input is="iron-input" placeholder="Your name here...">
            </iron-input>
        `;
    }
}

window.customElements.define('demo-data', DemoData);
```

## 自定义事件

下面我们来给我们的自定义元素定义一个名为 `diygod` 的事件，绑定事件回调的方法跟正常事件一样

**效果**

{% raw %}
<demo-events></demo-events>
<script>
    document.querySelector('demo-events').addEventListener('diygod', function (e) {
        alert(e.detail.msg);
    });
</script>
{% endraw %}

**HTML 代码**

```html
<demo-events></demo-events>
<script>
    document.querySelector('demo-events').addEventListener('diygod', function (e) {
        alert(e.detail.msg);
    });
</script>
```

**JS 代码**

```js
import { PolymerElement, html } from '@polymer/polymer';

export class DemoEvents extends PolymerElement {
    static get template () {
        return html`
            <button on-click="handleClick">Kick Me</button>
        `;
    }

    handleClick(e) {
        this.dispatchEvent(new CustomEvent('diygod', {
            detail: {
                msg: 'diygod event fired'
            }
        }));
    }
}

window.customElements.define('demo-events', DemoEvents);
```

<scirpt src="https://cdn.jsdelivr.net/gh/DIYgod/polymer-demos@0.0.1/dist/webcomponents-loader.js"></scirpt>
<script src="https://cdn.jsdelivr.net/gh/DIYgod/polymer-demos@0.0.1/dist/polymer-demos.js"></script>