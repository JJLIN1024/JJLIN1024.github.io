---
title: Undefined Behavior
date: 2023-12-11
lastmod: 2023-12-11
author:
  - Jimmy Lin
tags: 
draft: false
---

未定義行為存在的重要目的：無論是 signed integer overflow 或者其他機制，藉由語言標準中的刻意留空，允許更激進最佳化的存在。

```c
#include <stdio.h>

int foo(int a) {
  if (a + 100 > a)
    printf("%d GT %d\n", a + 100, a);
  else
    printf("%d LT %d\n", a + 100, a);
  return 0;
}
int main() {
  foo(100);
  foo(0x7fffffff);
  return 0;
}
```

依據 C 語言規範，overflow of a signed value is undefined behavior，而符合規範的正確 C 程式不應產生 signed overflow。

在這個案例中，(int + 100 > int) 總是成立，自然上述第 6 行就被最佳化處理給移除了。

```
➜  c_playground gcc test.c -O2 -o test.out && ./test.out
200 GT 100
-2147483549 GT 2147483647
➜  c_playground gcc test.c -O0 -o test.out && ./test.out
200 GT 100
-2147483549 LT 2147483647
```

## Reference
- [你所不知道的C語言: 未定義/未指定行為篇](https://hackmd.io/@sysprog/c-undefined-behavior)
- [What Every C Programmer Should Know About Undefined Behavior #1/3](https://blog.llvm.org/2011/05/what-every-c-programmer-should-know.html)
- [What Every C Programmer Should Know About Undefined Behavior #2/3](https://blog.llvm.org/2011/05/what-every-c-programmer-should-know_14.html)
- [What Every C Programmer Should Know About Undefined Behavior #3/3](https://blog.llvm.org/2011/05/what-every-c-programmer-should-know_21.html)