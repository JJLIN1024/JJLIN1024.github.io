---
title: Preprocessor
date: 2023-12-08
lastmod: 2023-12-08
author:
  - Jimmy Lin
tags: 
draft: false
---
- [# and ## in macros](https://stackoverflow.com/questions/4364971/and-in-macros)
	- `#`: stringified what comes after
	- `##`: concatenation
- What is concatenation ?
	- [Concatenation](https://gcc.gnu.org/onlinedocs/cpp/Concatenation.html)
	- It is often useful to merge two tokens into one while expanding macros. This is called token pasting or token concatenation. The ‘##’ preprocessing operator performs token pasting. When a macro is expanded, the two tokens on either side of each ‘##’ operator are combined into a single token, which then replaces the ‘##’ and the two original tokens in the macro expansion.

`##` 將左右兩遍的內容結合起來，例子如下：

```c
struct command
{
  char *name;
  void (*function) (void);
};

struct command commands[] =
{
  { "quit", quit_command },
  { "help", help_command },
  …
};
```

```c
#define COMMAND(NAME)  { #NAME, NAME ## _command }

struct command commands[] =
{
  COMMAND (quit),
  COMMAND (help),
  …
};
```

## container_of()
- [‘weird’ kernel macros — container_of](https://psomas.wordpress.com/2009/07/01/weird-kernel-macros-container_of/)
- [The (char \*) casting in container_of() macro in linux kernel](https://stackoverflow.com/questions/20421910/the-char-casting-in-container-of-macro-in-linux-kernel)

## BUILD_BUD_ON_ZERO(e)
- [C 語言的 bit-field](https://hackmd.io/@sysprog/c-bitfield)
	- zero-width bit field 有個規定是必須 unnamed ，再來 zero-width bit field 宣告不會使用到任何空間，但是會強制 structure 中下一個 bit field 對齊到下一個 unit 的 boundary 
	- [What is zero-width bit field](https://stackoverflow.com/questions/13802728/what-is-zero-width-bit-field)

## Linux 核心原始程式碼巨集: `max`, `min`
- [Linux 核心原始程式碼巨集: max min](https://hackmd.io/@sysprog/linux-macro-minmax)
- [What is the function of (void) (& min1 == & min2) in the min macro in kernel.h?](https://stackoverflow.com/questions/5595593/what-is-the-function-of-void-min1-min2-in-the-min-macro-in-kernel-h)

## Reference
- [你所不知道的 C 語言：前置處理器應用篇](https://hackmd.io/@sysprog/c-preprocessor)