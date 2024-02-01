---
title: goto statement
date: 2023-12-13
lastmod: 2023-12-13
author:
  - Jimmy Lin
tags:
  - switch
  - goto
draft: false
---
C++ 對於 goto 有更嚴格的限制
> goto 可以跳到同一個 function 內的同一個地方，無視 scope，但不能跳過變數的宣告，除非這個變數符合下面其中一個條件：
> 1. 變數的型態是 scalar type 且沒有初始化器
> 2. 變數的型態是一個有 trivial default constructors and destructor 的 class type，且沒有初始化器
> 3. 上面兩個的 cv-qualified 版本
> 4. 元素為 1、2 點的變數的 array

舉例：

```c
#include <stdio.h>

int main()
{
  goto end;
begin:
  int a = 5;
  printf("Hello begin!\n");
end:
  printf("Hello end!\n");
}
```

這段 code 用 `gcc` compile 是沒問題的，但是用 `g++` 就會跳出錯誤訊息：
```console
main.cpp:17:1: error: jump to label ‘end’
```

不過我們可以利用 compound statement 來修正：

```cpp
#include <stdio.h>

int main()
{
  goto end;
begin: {
  int a = 5;
  printf("Hello begin!\n");
}
end:
  printf("Hello end!\n");
}
```

`g++` 就會編譯通過了。


同樣的情況發生在 switch statement，在 C 中可以但是在 C++ 中不行跳過變數的宣告：

```c
#include <stdio.h>

int main()
{
  int x = 1;
  switch (x) {
  case 0:
    int a = 2;
    printf("0\n");
  case 1:
    printf("1\n");
  }
}
```
這段 code 用 `gcc` compile 是沒問題的，但是用 `g++` 就會跳出錯誤訊息。

## Reference
- [C goto statement](https://en.cppreference.com/w/c/language/goto)
- [C++ goto statement](https://en.cppreference.com/w/cpp/language/goto)
- [C++ 教學系列 Object、Expression、Statement](https://hackmd.io/@Mes/Cpp_Miner/https%3A%2F%2Fhackmd.io%2F%40Mes%2FMinerT_Object_Expression_Statement)