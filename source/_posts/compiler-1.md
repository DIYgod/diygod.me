---
title: 一个完整编译器的实现(一) 词法分析
id: 1754
categories:
  - 创作集
date: 2015-02-05 16:27:28
tags:
permalink: 1754/
---

[GitHub地址](https://github.com/DIYgod/Compiler) [各阶段源码](http://www.anotherhome.net/file/compiler/) [各阶段说明集合](http://www.anotherhome.net/1751)

为了将一个程序从一种语言翻译成另一种语言，编译器必须首先把程序的各种成分拆开，并搞清其结构和含义，然后再用另一种方式把这些成分组合起来。编译器的前端执行分析，后端进行合成。

而分析一般分为3种：词法分析 语法分析 语义分析

本阶段进行的是词法分析，目的是将输入文件分解成一个个独立的词法符号，即单词。

**根据虎书的提示，在本阶段分了三个模块：**

1.错误处理模块（errormsg.c errormsg.h）：用来产生含文件名和行号的报错信息
2.词法分析模块（lexical.lex token.h）：通过Lex进行词法分析
3.常用工具模块（util.c util.h）：定义一些常用的函数

词法分析模块与错误处理模块：两者通过 errormsg.h 中声明的变量和函数进行通信：EM_tokPos 变量传递每个单词以字符为单位的位置；EM_newline()函数记录行号；EM_error() 输出报错信息。

错误处理模块与常用工具模块：错误处理模块使用 util.h 中声明的 checked_malloc() 分配内存函数

另外还包含了 驱动程序（driver.c）测试文件（test.c） makefile<!--more-->

**下面主要介绍本阶段最重要的词法分析模块。**

**tokens.h**：定义词法单词常量以及yylval
<pre class="lang:default decode:true">typedef union  {
	int ival;
    	char cval;
    	double dval;
	string sval;
	} YYSTYPE;
extern YYSTYPE yylval;</pre>
上述代码定义了yylval，yylval是一个表示不同语义值的集合，其中的ival cval dval sval 分别用来保存 整数 字符 浮点数 字符串 单词的语义值。
<pre class="lang:default decode:true "># define ID 128
# define STRING 129
# define COMMA 130
# define COLON 131
# define SEMICOLON 132
# define LPAREN 133
# define RPAREN 134
# define LBRACK 135
# define RBRACK 136
# define LBRACE 137
# define RBRACE 138
# define DOT 139
# define PLUS 140
# define MINUS 141
# define TIMES 142
# define DIVIDE 143
... ... ... ...</pre>
这段定义了一些常数，这些常数供 lexical.lex 使用，它们指明被匹配的是何种类型的单词。

**lexical.lex**：Lex的源文件，可以通过Lex生成一个词法分析器

Lex是一个可以将正则表达式转换城词法分析器的生成器，它由词法规范生成一个C程序（lex.yy.c）。该规范包含一个正则表达式和一个动作。这个动作将单词类型（可能和其他信息一起）传给编译器的下一处理阶段。
<pre class="lang:default decode:true ">%{
#include &lt;string.h&gt;
#include "util.h"
#include "tokens.h"
#include "errormsg.h"

int charPos=1;              //记录每个单词的位置

int yywrap(void)            //Lex函数, 返回1就停止解析, 可以用来解析多个文件
{
    charPos=1;
    return 1;
}

void adjust(void)           //计算单词位置, 并通过EM_tokPos传给错误信息模块
{
    EM_tokPos=charPos;
    charPos+=yyleng;
}

%}

%%
[" ""\t"]                   {adjust(); continue;}
"\n"                        {adjust(); EM_newline(); continue;}
(\")([A-Za-z0-9])*(\")      {adjust(); yylval.sval = yytext; return STRING_V;}
string                      {adjust(); return STRING;}
'[A-Za-z0-9]'               {adjust(); yylval.cval = yytext[1]; return CHAR_V;}
char                        {adjust(); return CHAR;}
short                       {adjust(); EM_error(EM_tokPos, "暂不支持short类型");}
-?[0-9]+                    {adjust(); yylval.ival=atoi(yytext); return INT_V;}
int                         {adjust(); return INT;}
unsigned                    {adjust(); EM_error(EM_tokPos, "暂不支持unsigned类型");}
long                        {adjust(); EM_error(EM_tokPos, "暂不支持long类型");}
float                       {adjust(); EM_error(EM_tokPos, "暂不支持float类型");}
-?[0-9]+(\.[0-9]+)?         {adjust(); yylval.dval = atof(yytext); return DOUBLE_V;}
do                          {adjust(); return DO;}
double                      {adjust(); return DOUBLE;}
struct                      {adjust(); return STRUCT;}
union                       {adjust(); return UNION;}
void                        {adjust(); return VOID;}
enum                        {adjust(); return ENUM;}
signed                      {adjust(); EM_error(EM_tokPos, "暂不支持signed类型");}
conust                      {adjust(); return CONUST;}
volatile                    {adjust(); EM_error(EM_tokPos, "暂不支持volatile");}
typedef                     {adjust(); return TYPEDEF;}
auto                        {adjust(); EM_error(EM_tokPos, "暂不支持auto");}
register                    {adjust(); EM_error(EM_tokPos, "暂不支持register");}
static                      {adjust(); return STATIC;}
extern                      {adjust(); return EXTERN;}
break                       {adjust(); return BREAK;}
case                        {adjust(); return CASE;}
continue                    {adjust(); return CONTINUE;}
default                     {adjust(); return DEFAULT;}
else                        {adjust(); return ELSE;}
for                         {adjust(); return FOR;}
goto                        {adjust(); return GOTO;}
if                          {adjust(); return IF;}
return                      {adjust(); return RETURN;}
switch                      {adjust(); return SWITCH;}
while                       {adjust(); return WHILE;}
sizeof                      {adjust(); return SIZEOF;}
[A-Za-z]+\[[0-9]+\]         {adjust(); return ARRAY;}
[A-Za-z_]([A-Za-z0-9_])*    {adjust(); yylval.sval = yytext; return ID;}
","                         {adjust(); return COMMA;}
":"                         {adjust(); return COLON;}
";"                         {adjust(); return SEMICOLON;}
"("                         {adjust(); return LPAREN;}
")"                         {adjust(); return RPAREN;}
"["                         {adjust(); return LBRACK;}
"]"                         {adjust(); return RBRACK;}
"{"                         {adjust(); return LBRACE;}
"}"                         {adjust(); return RBRACE;}
"."                         {adjust(); return DOT;}
"+"                         {adjust(); return PLUS;}
"-"                         {adjust(); return MINUS;}
"*"                         {adjust(); return TIMES;}
"/"                         {adjust(); return DIVIDE;}
"!="                        {adjust(); return NEQ;}
"=="                        {adjust(); return ASSIGN;}
"="                         {adjust(); return EQ;}
"&lt;="                        {adjust(); return LE;}
"&lt;"                         {adjust(); return LT;}
"&gt;="                        {adjust(); return GE;}
"&gt;"                         {adjust(); return GT;}
"&amp;"                         {adjust(); return AND;}
"|"                         {adjust(); return OR;}</pre>
第一部分，即位于%{...%}之间的部分，包含有若干由此文件其余部分C代码使用的include和声明。

第二部分，即位于%}...%%之间的部分，包含正则表达式的简写形式和状态说明，比如你可以写上
<pre class="lang:default decode:true ">digits    [0-9]+</pre>
那么第三部分中就可以用{digits}代替[0-9]+了。

第三部分，即位于%%后面的部分，包含正则表达式和动作。每个动作返回一个 int 类型的值（token.h定义的常数），指出匹配的是哪一种单词。
其中有两条匹配的原则来消除二义性：
规则优先：对于一个特定的最长初始子串，第一个与之匹配的正则式决定这个子串的单词类型；
最长匹配：通过规则优先确定正则式之后，子串取与正则式匹配的最长的字符串。

几个变量：yytext是正则式匹配的字符串；yyleng是所匹配的字符串的长度；charPos追踪每一个单词的位置，并告知EM_tokPos。

&nbsp;

词法分析 Done.