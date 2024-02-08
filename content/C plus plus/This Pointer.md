---
title: This Pointer
date: 2024-01-30
lastmod: 2024-01-30
author:
  - Jimmy Lin
tags:
  - c_plus_plus
draft: false
---

- The "this" pointer is passed as a hidden argument to all non-static member function calls and is available as a local variable within the body of all non-static functions. "this" pointer is not available in static member functions as static member functions can be called without any object (with class name).
- "this" pointer is a r-value
- `delete this;` destroy the object itself
- `return *this;` 常用來讓 member function 回傳自身的 reference
- 


```cpp
#include <iostream>

struct A {
    void printAddress() {std::cout << (void*)this << std::endl;}
};

int main() {
    A a;
    std::cout << (void*)(&a) << std::endl;
    a.printAddress();
    return 0;
}
```
