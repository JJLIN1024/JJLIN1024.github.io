---
title: constexpr
date: 2024-02-10
lastmod: 2024-02-10
author:
  - Jimmy Lin
tags:
  - c_plus_plus
draft: false
---
如何使用 `constexpr` ？就是去思考，你的 program 有哪些部分你想要將他們從 runtiime 移動到 compile time 去執行？

constexpr 是 C++11 引入的一個關鍵字，用於指示編譯器在編譯時計算表達式的值，從而在運行時達到更好的性能和效率。constexpr 的優點包括：

1. 性能優化：constexpr 讓編譯器能夠在**編譯時**計算表達式的值，而不是在運行時計算。這意味著在運行時不需要執行相同的計算，可以節省運行時的計算時間，從而提高了程序的性能。
2. 靜態斷言：當 constexpr 函數中的參數不是常量表達式時，編譯器會生成一個編譯時錯誤，這有助於捕捉潛在的問題。

- constexpr objects are const and are initialized with values known during compilation
- constexpr functions can produce compile-time results when called with arguments whose values are known during compilation
- constexpr objects and functions may be used in a wider range of contexts than non-constexpr objects and functions
- constexpr is part of an object’s or function’s interface

C++ 17 支援在 constexpr 中使用 if else 條件判斷。

```cpp
#include <iostream>

constexpr int fib(int n) {
  if (n == 1)
    return 1;
  if (n == 2)
    return 1;
  return fib(n - 1) + fib(n - 2);
}

int main() { std::cout << fib(4) << std::endl; }

```

## Reference
- [Your New Mental Model of constexpr - Jason Turner - CppCon 2021](https://youtu.be/MdrfPSUtMVM?si=X6f6Lq6v8UjhfJpw)