---
title: C Traps and Pitfalls
date: 2023-05-01
lastmod: 2023-05-01
author: Jimmy Lin
tags: [""]
draft: false
---

## Multi-character Tokens

> If the input stream has been parsed into tokens up to a given character, the next token is taken to include the longest string of characters which could possibly constitute a token

- 根據以上規定，`y = x/*p` 會和 `y = x` 相等，而 `y = x / *p` 或 `y = x /(*p)` 代表 `y` 除以 value pointed py pointer p。
- 對於 `y = x/*p` ，compiler 要如何決定 `/*` 是否為 comment 的開頭，還是 x 除以 value pointed by pointer p？

## Strings and Characters

> A character enclosed in single quotes is just another way of writing an integer

```c
#include <stdio.h>

int main() {
  printf("%d\n", 'a');  // 97
  printf("%d\n", "a");  // 36765619
  // warning: format specifies type 'int' but the argument has type 'char *'
  return 0;
}
```




## Reference
- [C Traps and Pitfalls](http://www.literateprogramming.com/ctraps.pdf)