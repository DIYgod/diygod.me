---
title: 一个完整编译器的实现(二) 语法分析
id: 1764
categories:
  - 创作集
date: 2015-02-16 21:04:12
tags:
permalink: 1764/
---

**<span style="font-size: 14pt;">1 系列说明</span>**

[GitHub地址](https://github.com/DIYgod/Compiler) [各阶段源码](http://www.anotherhome.net/file/compiler/) [各阶段说明集合](http://www.anotherhome.net/1751)

**<span style="font-size: 14pt;">2 语法分析说明</span>**

语法：组合单词以形成词组 从句 或句子的方法。

经过词法分析，我们已经可以将输入文本识别成一个个的单词，本阶段的目标是将这些单词识别成句子，判断单词的这种组合形式是否符合我们定义的语法。

_<span style="font-size: 13pt;">2.1 用文法来定义语法</span>_

语法分析需要由递归而获得的额外的表示能力，显然正则表达式已经不能满足我们的需求。

事实上，文法也可以用来描述词法单词的结构，但正则表达式已经可以满足需求，这时使用正则表达式更为简练。

_<span style="font-size: 13pt;">2.2 LR(1) 分析法</span>_

@%……￥&amp;%#￥太复杂不想说

总之，LR(1) 是一种非常非常强大的分析算法，能够解决很多归约-归约冲突，大多数用上下文无关文法描述其语法的程序设计语言都有一个 LR(1) 文法。<!--more-->

_<span style="font-size: 13pt;">2.3 使用 Yacc 生成语法分析器</span>_

构造LR(1)分析表的算法简单得足以用计算机来自动完成，而且手工构造十分麻烦无趣，所以使用Yacc是一个明智的决定。

类似Lex，Yacc规范分为三部分
<pre class="lang:default decode:true ">%{
...
%}
...
%%
...</pre>
第一部分同Lex，包含include和声明

第二部分定义从词法分析中接收的终结符，开始符号，优先级等

第三部分定义文法及语义动作，语法分析阶段只定义文法，语义动作到语义分析时候再完成。

<span style="font-size: 12pt;">2.3.1 冲突</span>

Yacc 选择移近来解决移进-归约冲突，选择使用在文法中先出现的规则来解决归约-归约冲突。

<span style="font-size: 12pt;">2.3.2 优先级指导</span>

定义优先级是为了解决二义性，这样写文法的时候方便的多。

Yacc在第二部分可以假如优先级指导命令
<pre>%left COMMA
%right PLUSASSIGN MINUSASSIGN TIMESASSIGN DIVIDEASSIGN ASSIGN
%left OR
%left AND
%left EQ NEQ
%left LE GE LT GT
%left PLUS MINUS
%left TIMES DIVIDE MOD
%right INC DEC NOT
%left LPAREN RPAREN LBRACK RBRACK</pre>
自上而下优先级降低，left right 说明单词是左结合还是右结合。

<span style="font-size: 14pt;">**3 具体实现**</span>

语法分析器和改进过的词法分析器源码见文章开头。

进行到本阶段，编译器发展为四个模块：

1.错误处理模块（errormsg.c errormsg.h）：用来产生含文件名和行号的报错信息
2.常用工具模块（util.c util.h）：定义一些常用的函数
3.词法分析模块（simplec.lex）：通过Lex进行词法分析
4.语法分析模块（simplec.yacc）：通过Yacc进行语法分析

其中上一阶段的 token.h 已经不再需要，作为代替，Yacc会根据我们写的文法的单词规范自动生成一个与单词相关的头文件 y.tab.h ；parsetest.c是一个驱动程序，正常情况下会输出 Parsing successful!

附：[ANSI C grammar (Lex)](http://www.lysator.liu.se/c/ANSI-C-grammar-l.html) [ANSI C grammar (Yacc)](http://www.lysator.liu.se/c/ANSI-C-grammar-y.html)

&nbsp;

语法分析 Done.