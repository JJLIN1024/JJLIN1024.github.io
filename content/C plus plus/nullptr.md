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
nullptr 可以被 implicit convert to other type of pointer。

在 C 中，空指標（`NULL`）被定義為 `void*(0)`，但是在 C++ 中，implicit conversion from a `void *` to other pointer type is not allowed，因此若 `NULL` 被 compiler 定義為 `void*(0)`，則 `FILE* fp = NULL` 會是 compile time error，所以在 C++ 中（C++98） compiler 只能將 `NULL` 定義為 `0`。

但因為 C++ 有 function overload ，因此會造成混亂。

考慮以下例子，我們原本設計了一個 function 接受 `char *` 當作 parameter，但是同時又定義了一個接受  `int` 當作 parameter 的 overloaded function。

當 `NULL` 被傳入時，先考慮 `#define NULL (void*)(0)` 的情況：

因為 C++ 不允許 `void*(0)` 被 implicit 的轉成其他 pointer to some type（如果可以轉的話應該要轉成 pointer to char），所以 compiler 會把 `NULL` 轉成 `0`，這就會造成真正被 call 的 function 是 `void foo(int i)` ，而非原本設計要被 call 的 `void foo(char *)`。

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

## Reference
- [wiki - nullptr](https://zh.wikipedia.org/zh-tw/Nullptr)