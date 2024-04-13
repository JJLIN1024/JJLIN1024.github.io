---
title: nullptr
date: 2024-04-11
lastmod: 2024-04-11
author:
  - Jimmy Lin
tags:
  - nullptr
draft: false
---
之所以要使用 nullptr 而非 NULL 的原因是因為 compiler 定義的 NULL 可能會是 0 或是 `void*(0)` 或是其他，這在 function overload 的情況下會造成混亂。

考慮以下例子，我們原本設計了一個 function 接受 `char *` 當作 parameter，但是同時又定義了一個 int 的 function overload。

當 NULL 被傳入時，先考慮 `#define NULL (void*)(0)` 的情況：

因為 C++ 不允許 `void*(0)` 被 implicit 的轉成其他 pointer to some type，在此例可能的 type 為 pointer to char，所以 NULL 會被轉成 0，這就會造成真正被 call 的 function 是 `void foo(int i)` ，而非原本設計要被 call 的 `void foo(char *)`。

考慮第二個 case `define NULL 0`，`void foo(int i)` 會被 call 就顯而易見了。

```cpp
#include <iostream>
// #define NULL 0
#define NULL (void*)(0)

void foo(char *);
void foo(int);

int main() {
  foo(NULL); 
  return 0;
}

void foo(char *) {
    std::cout << "foo(char*) is called" << std::endl;
}
void foo(int i) {
    std::cout << "foo(int) is called" << std::endl;
}
```
>  Output: foo(int) is called
