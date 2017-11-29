---
title: 一个完整编译器的实现
id: 1751
categories:
  - 创作集
date: 2015-02-01 22:58:26
tags:
permalink: 1751
---

<span style="font-size: 8pt;">_图灵生机器，机器生汇编，汇编生 C，C 生万物
(来自知乎用户 Joy Neop)_</span>

本系列将展示一个完整编译器从无到有的实现过程.

目标是从一个C语言的不完全子集翻译到x86汇编语言, 将借助 Lex Yacc LLVM 等工具, 另外暂定实现垃圾回收及面向对象.

全部代码托管在 [GitHub](https://github.com/DIYgod/Compiler).     各阶段的源代码在 [这里](http://www.anotherhome.net/file/compiler/) 查看.

主要参考 虎书(《现代编译原理--C语言实现》), 根据此书, 暂将实现分为11个阶段: 词法分析 语法分析 语义动作 语义分析 栈帧布局 翻译 规范化 指令选择 控制流分析 数据流分析 寄存器分配 代码流出.

已完成：

[《一个完整编译器的实现—词法分析 | Anotherhome》](http://www.anotherhome.net/1754)

[《一个完整编译器的实现—语法分析 | Anotherhome》](http://www.anotherhome.net/1764)

To be continued...