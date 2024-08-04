---
title: std function
date: 2024-04-17
lastmod: 2024-04-17
author:
  - Jimmy Lin
tags: 
draft: false
---
就是 C 的 function pointer 的 wrapper！可以用來把 [[lambdas]] 傳來傳去，不過要注意，lambdas 可能不是 copyable 的，要看他是否有 capture unique pointer 之類的東西。lambda 其實底層就是 class，所以是否是 copyable，其實就等價於底層的 class 是否是 copyable 的。

`std::function` 是 C++11 中引入的一個模板類，用於封裝可呼叫對象（callable object），例如函數指針、函數對象、lambda 函數等。

C++11 `std::function` 是一種通用、多型的函數封裝， 它的實例可以對任何可以呼叫的目標實體進行儲存、複製和呼叫操作， 它也是對 C++ 中現有的可呼叫實體的一種類型安全的包裹（相對來說，函數指針的呼叫不是類型安全的）， 換句話說，就是函數的容器。當我們有了函數的容器之後便能夠更加方便的將函數、函數指針作為對象進行處理。

```cpp
#include <functional>
#include <iostream>

int foo(int para) {
    return para;
}

int main() {
    // std::function 包装了一个返回值为 int, 参数为 int 的函数
    std::function<int(int)> func = foo;

    int important = 10;
    std::function<int(int)> func2 = [&](int value) -> int {
        return 1+value+important;
    };
    std::cout << func(10) << std::endl;
    std::cout << func2(10) << std::endl;
}
```


## Referece
- [C++11 std::function](https://github.com/changkun/modern-cpp-tutorial/blob/master/book/zh-cn/03-runtime.md)