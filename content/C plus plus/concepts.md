---
title: concepts
date: 2024-02-10
lastmod: 2024-02-10
author:
  - Jimmy Lin
tags: 
draft: false
---
## Before Concepts

```cpp
template<typename T>
T myMax(T a, T b) {
    return a < b ? a : b;
}

int main() {
    auto m = myMax(1, 2);
    auto m2 = myMax(1, 2.9);
    // error: no matching function for call to 'myMax(int, double)'
    // note:  deduced conflicting types for parameter 'T' ('int' and 'double')
}
```

## After Concepts

- [Constraints and concepts (since C++20)](https://en.cppreference.com/w/cpp/language/constraints)

We get a better error message, 讓我們知道到底出了什麼問題。

```cpp
#include <concepts>

template<typename T>
concept supportLessThan = requires (T x) {x < x;};

template<typename T>
requires std::copyable<T> && supportLessThan<T>
T myMax(T a, T b) {
    return a < b ? a : b;
}

int main() {
    auto m = myMax(1, 2);
    auto m2 = myMax(1, 2.9);
    // error: no matching function for call to 'myMax(int, double)'
    // note: candidate: 'template<class T>  requires (copyable<T>) && (supportLessThan<T>) T myMax(T, T)'
}
```


```cpp
#include <iostream>

auto is_even(std::integral auto n) {
    return n % 2 == 0;
}

int main() {
    std::cout << is_even(30000000000000);
}
```
